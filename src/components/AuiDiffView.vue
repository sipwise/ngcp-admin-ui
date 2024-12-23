<template>
    <div
        class="vjs-tree"
    >
        <template
            v-if="newObject && oldObject"
        >
            <div
                v-for="(line, index) in lines"
                :key="index"
                style="display: inline; white-space: pre"
                :class="[
                    'vjs-tree__node no-margin no-padding',
                    ...(line.added ? ['text-primary'] : []),
                    ...(line.removed ? ['text-negative'] : []),
                    ...((line !== '{' || line !== '}') ? ['q-ml-md'] : [])
                ]"
            >
                {{ line.value + '\n' }}
            </div>
        </template>
        <template
            v-else
        >
            {{ $t('Can not create diff view, due to missing permissions') }}
        </template>
    </div>
</template>

<script>
import { diffJson } from 'diff'
export default {
    props: {
        oldObject: {
            type: Object,
            required: true
        },
        newObject: {
            type: Object,
            required: true
        }
    },
    computed: {
        lines () {
            const diff = diffJson(this.oldObject, this.newObject)
            let lines = []
            diff.forEach((item) => {
                lines = lines.concat(item.value.split('\n').filter((line) => line !== '').map((line) => {
                    let linePrefix = ''
                    if (item.added) {
                        linePrefix = '+'
                    } else if (item.removed) {
                        linePrefix = '-'
                    }
                    return {
                        value: linePrefix + line,
                        added: item.added,
                        removed: item.removed
                    }
                }))
            })
            return lines
        }
    }
}
</script>
