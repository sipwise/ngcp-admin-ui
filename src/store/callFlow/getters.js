import { computeCallFlowNodes } from 'src/lib/callFlow/callFlowFrames'

/**
 * Unique list of nodes ("ip:port", or bare "ip" when considerPorts is false)
 * that appear as either sender or receiver across all frames, in first-seen
 * order - the vertical lanes of the sequence diagram, and the rows of the node
 * alias editor. Returns a function so callers can pass the diagram's current
 * considerPorts setting; keyed the same way as AuiCallFlowDiagram.vue so node
 * aliases keep matching regardless of that setting.
 */
export function callFlowNodes (state) {
    return (considerPorts = true) => computeCallFlowNodes(state.frames, { considerPorts })
}

export function callFlowHasLegBuffer (state) {
    return (leg) => Boolean(state.legBuffers?.[leg])
}
