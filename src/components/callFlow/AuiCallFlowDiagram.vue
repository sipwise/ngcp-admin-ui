<template>
    <div
        ref="containerRef"
        class="aui-call-flow-diagram"
    />
</template>

<script setup>
import { select } from 'd3'
import { callFlowNodeKey, computeCallFlowNodes } from 'src/lib/callFlow/callFlowFrames'
import {
    onBeforeUnmount,
    onMounted,
    ref,
    watch
} from 'vue'

const NODE_LANE_WIDTH = 200
const NODE_LABEL_WIDTH = 130
const NODE_LABEL_HEIGHT = 24
const HEADER_HEIGHT = 40
const INDEX_COLUMN_WIDTH = 32
const TIMESTAMP_COLUMN_WIDTH = 120
// Reserves space on the left, before the node lanes, for the per-row packet
// number and capture timestamp.
const LEFT_MARGIN = INDEX_COLUMN_WIDTH + TIMESTAMP_COLUMN_WIDTH
const MESSAGE_ROW_HEIGHT = 32
// Below this, rows look cramped - the diagram scrolls instead of compressing further.
const MIN_MESSAGE_ROW_HEIGHT = 22
// Caps the diagram at 65% of viewport height (scrolling internally past that)
// so the packet-detail panel below it stays on screen without a page scroll.
const DIAGRAM_HEIGHT_RATIO = 0.65

const props = defineProps({
    frames: { type: Array, default: () => [] },
    aliases: { type: Object, default: () => ({}) },
    autoLabels: { type: Object, default: () => ({}) },
    considerPorts: { type: Boolean, default: true }
})

const emit = defineEmits(['packet-select', 'node-toggle'])

const containerRef = ref(null)
const hiddenNodes = ref(new Set())

const nodeKey = (ip, port) => {
    return callFlowNodeKey(ip, port, { considerPorts: props.considerPorts })
}

const nodeLabel = (key) => {
    return props.aliases[key] || props.autoLabels[key] || key
}

const computeNodes = () => {
    return computeCallFlowNodes(props.frames, { considerPorts: props.considerPorts })
}

// A frame where sender and receiver are the same node (e.g. a call-forwarding
// loopback) has nothing meaningful to draw as an arrow.
const drawableFrames = () => {
    return props.frames.filter((frame) => nodeKey(frame.src_ip, frame.src_port) !== nodeKey(frame.dst_ip, frame.dst_port))
}

const frameLabel = (frame) => {
    if (frame.method) {
        return `${frame.method} ${frame.request_uri || ''}`.trim()
    }
    return `${frame.status_code || ''} ${frame.reason_phrase || ''}`.trim()
}

// `frame.timestamp` is a raw "seconds.microseconds" capture time - shown here
// as a readable date-time. Built from local time components (not `toISOString()`,
// which is always UTC).
const frameDateTime = (frame) => {
    const seconds = Number(String(frame.timestamp).split('.')[0])
    if (!Number.isFinite(seconds)) {
        return ''
    }
    const date = new Date(seconds * 1000)
    const pad = (value) => String(value).padStart(2, '0')
    const datePart = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
    const timePart = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    return `${datePart}T${timePart}`
}

const statusClass = (frame) => {
    const code = Number(frame.status_code)
    if (!code) {
        return null
    }
    if (code < 200) {
        return 'aui-call-flow-message-label--provisional'
    }
    if (code < 300) {
        return 'aui-call-flow-message-label--success'
    }
    if (code < 400) {
        return 'aui-call-flow-message-label--redirect'
    }
    return 'aui-call-flow-message-label--failure'
}

const toggleNode = (node) => {
    const next = new Set(hiddenNodes.value)
    if (next.has(node)) {
        next.delete(node)
    } else {
        next.add(node)
    }
    hiddenNodes.value = next
    emit('node-toggle', node)
    render()
}

const render = () => {
    if (!containerRef.value) {
        return
    }
    const container = select(containerRef.value)
    container.selectAll('*').remove()

    const nodes = computeNodes()
    if (nodes.length === 0) {
        return
    }
    const frames = drawableFrames()

    const laneWidth = Math.max(NODE_LANE_WIDTH, (containerRef.value.clientWidth - LEFT_MARGIN) / nodes.length)
    const laneX = (index) => LEFT_MARGIN + laneWidth / 2 + index * laneWidth
    const width = LEFT_MARGIN + laneWidth * nodes.length

    const availableHeight = window.innerHeight * DIAGRAM_HEIGHT_RATIO
    const rowHeight = Math.max(
        MIN_MESSAGE_ROW_HEIGHT,
        Math.min(MESSAGE_ROW_HEIGHT, (availableHeight - HEADER_HEIGHT) / (frames.length + 1))
    )
    const bodyHeight = (frames.length + 1) * rowHeight

    // Cap the container height and let it scroll internally, keeping the
    // sticky header and the packet-detail panel below on screen.
    containerRef.value.style.maxHeight = `${Math.max(availableHeight, HEADER_HEIGHT + rowHeight)}px`

    // Header is a separate svg in its own `position: sticky` wrapper, so node
    // labels stay visible while message rows scroll underneath.
    const headerSvg = container.append('div')
        .attr('class', 'aui-call-flow-diagram-header')
        .append('svg')
        .attr('width', width)
        .attr('height', HEADER_HEIGHT)

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', bodyHeight)
        .attr('class', 'aui-call-flow-diagram-svg')

    svg.append('defs')
        .append('marker')
        .attr('id', 'aui-call-flow-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 9)
        .attr('refY', 0)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .append('path')
        .attr('class', 'aui-call-flow-arrow-head')
        .attr('d', 'M0,-5L10,0L0,5')

    svg.append('defs')
        .append('marker')
        .attr('id', 'aui-call-flow-arrow-hidden')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 9)
        .attr('refY', 0)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .append('path')
        .attr('class', 'aui-call-flow-arrow-head aui-call-flow-arrow-head--hidden')
        .attr('d', 'M0,-5L10,0L0,5')

    nodes.forEach((node, index) => {
        svg.append('line')
            .attr('class', 'aui-call-flow-lifeline')
            .attr('x1', laneX(index))
            .attr('x2', laneX(index))
            .attr('y1', 0)
            .attr('y2', bodyHeight)
    })

    nodes.forEach((node, index) => {
        const group = headerSvg.append('g')
            .attr('class', 'aui-call-flow-node')
            .attr('transform', `translate(${laneX(index)}, 4)`)
            .on('click', () => toggleNode(node))

        group.append('rect')
            .attr('x', -NODE_LABEL_WIDTH / 2)
            .attr('y', 0)
            .attr('width', NODE_LABEL_WIDTH)
            .attr('height', NODE_LABEL_HEIGHT)
            .attr('class', 'aui-call-flow-node-rect')

        group.append('text')
            .attr('class', 'aui-call-flow-node-label')
            .attr('text-anchor', 'middle')
            .attr('dy', '16px')
            .text(nodeLabel(node))
    })

    frames.forEach((frame, index) => {
        const y = (index + 1) * rowHeight
        const srcKey = nodeKey(frame.src_ip, frame.src_port)
        const dstKey = nodeKey(frame.dst_ip, frame.dst_port)
        const x1 = laneX(nodes.indexOf(srcKey))
        const x2 = laneX(nodes.indexOf(dstKey))
        const isHidden = hiddenNodes.value.has(srcKey) || hiddenNodes.value.has(dstKey)
        const lineClass = isHidden ? 'aui-call-flow-message-line aui-call-flow-message-line--hidden' : 'aui-call-flow-message-line'
        const markerId = isHidden ? 'aui-call-flow-arrow-hidden' : 'aui-call-flow-arrow'

        svg.append('line')
            .attr('class', lineClass)
            .attr('x1', x1)
            .attr('x2', x2)
            .attr('y1', y)
            .attr('y2', y)
            .attr('marker-end', `url(#${markerId})`)
            .on('click', () => emit('packet-select', frame))

        const labelClass = isHidden
            ? 'aui-call-flow-message-label aui-call-flow-message-label--hidden'
            : ['aui-call-flow-message-label', statusClass(frame)].filter(Boolean).join(' ')

        svg.append('text')
            .attr('class', labelClass)
            .attr('x', (x1 + x2) / 2)
            .attr('y', y - 4)
            .attr('text-anchor', 'middle')
            .on('click', () => emit('packet-select', frame))
            .text(frameLabel(frame))

        svg.append('text')
            .attr('class', 'aui-call-flow-row-index')
            .attr('x', INDEX_COLUMN_WIDTH / 2)
            .attr('y', y - 4)
            .attr('text-anchor', 'middle')
            .on('click', () => emit('packet-select', frame))
            .text(index)

        svg.append('text')
            .attr('class', 'aui-call-flow-row-timestamp')
            .attr('x', INDEX_COLUMN_WIDTH + 4)
            .attr('y', y - 4)
            .attr('text-anchor', 'start')
            .on('click', () => emit('packet-select', frame))
            .text(frameDateTime(frame))
    })
}

onMounted(render)
watch(() => [props.frames, props.aliases, props.autoLabels, props.considerPorts], render, { deep: true })
onBeforeUnmount(() => {
    if (containerRef.value) {
        select(containerRef.value).selectAll('*').remove()
    }
})
</script>

<style scoped lang="sass">
.aui-call-flow-diagram
    width: 100%
    overflow-x: auto
    overflow-y: auto

    :deep(.aui-call-flow-diagram-header)
        position: sticky
        top: 0
        z-index: 1
        // Opaque so message rows scrolling up underneath don't show through
        // the header while it's pinned.
        background: white

        svg
            display: block

    :deep(.aui-call-flow-diagram-svg)
        display: block

    :deep(.aui-call-flow-lifeline)
        stroke: #888

    :deep(.aui-call-flow-node-rect)
        fill: white
        stroke: black
        stroke-width: 1px

    :deep(.aui-call-flow-node)
        cursor: pointer

    :deep(.aui-call-flow-node-label), :deep(.aui-call-flow-message-label), :deep(.aui-call-flow-row-index), :deep(.aui-call-flow-row-timestamp)
        font-size: 11px
        font-family: monospace

    :deep(.aui-call-flow-message-label)
        cursor: pointer
        // SVG text only registers clicks on painted glyphs by default -
        // "all" makes the whole label clickable, not just character ink.
        pointer-events: all

    :deep(.aui-call-flow-message-label:hover)
        font-weight: bold

    :deep(.aui-call-flow-message-label--provisional)
        fill: var(--q-warning)

    :deep(.aui-call-flow-message-label--success)
        fill: var(--q-positive)

    :deep(.aui-call-flow-message-label--redirect)
        // Purple rather than blue so it doesn't blend into the (blue) arrow line.
        fill: #6a1b9a

    :deep(.aui-call-flow-message-label--failure)
        fill: var(--q-negative)

    :deep(.aui-call-flow-message-label--hidden)
        fill: lightgrey

    :deep(.aui-call-flow-row-index)
        fill: #666
        cursor: pointer

    :deep(.aui-call-flow-row-timestamp)
        fill: #666
        cursor: pointer

    :deep(.aui-call-flow-message-line)
        stroke: var(--q-info)
        cursor: pointer

    :deep(.aui-call-flow-message-line--hidden)
        stroke: lightgrey

    :deep(.aui-call-flow-arrow-head)
        fill: var(--q-info)
        stroke: var(--q-info)

    :deep(.aui-call-flow-arrow-head--hidden)
        fill: lightgrey
        stroke: lightgrey
</style>
