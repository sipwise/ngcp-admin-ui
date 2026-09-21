# Call Flow Diagram

## Table of Contents

- [What this feature does](#what-this-feature-does)
- [Why parsing happens in the browser](#why-parsing-happens-in-the-browser)
- [How it fits together](#how-it-fits-together)
- [The parsing pipeline](#the-parsing-pipeline)
- [The B2B/PBX leg merge](#the-b2bpbx-leg-merge)
- [Automatic element-role labels](#automatic-element-role-labels)
- [Testing](#testing)
- [Backend follow-ups](#backend-follow-ups)

## What this feature does

When a call is captured by the platform's SIP capture agent, every SIP message
exchanged for that call is stored server-side. The Call Flow page lets an admin
pick one call (by its Call-ID) and see a sequence diagram of every SIP message in
that call, in order, with each participant (SIP element) as a vertical lane and
each message as an arrow between two lanes. Clicking an arrow shows the raw SIP
message text. There's also a "Download PCAP" button to save the raw capture, and
a "Node Editor" to rename a lane's raw `ip:port` label to something readable
(e.g. "SBC" instead of `10.0.0.5:5062`).

## Why parsing happens in the browser

The only way to get at the actual SIP message content (method, request-URI,
full payload text) through the REST API is to fetch the raw pcap and parse it
ourselves. That's what `src/lib/callFlow/callFlowFrames.js` does: it turns a pcap
byte buffer into the frame objects the diagram code needs, using
`src/helpers/sip-pcap-parser.js` (a general-purpose PCAP-to-SIP parser, not
call-flow-specific - see below) to do the actual Ethernet/IP/TCP/UDP/SIP
decoding.

The diagram is a translation in more modern JS of the diagram built in ngcp-panel.

## How it fits together

```
GET /api/sipcaptures/{call_id}   (x3, one per call leg - see below)
        │  ArrayBuffer (raw pcap bytes)
        ▼
src/lib/callFlow/callFlowFrames.js   (orchestrates the pipeline below)
        │  Array<frame>  { id, timestamp, src_ip, src_port, dst_ip, dst_port,
        │                  method, request_uri, transport, call_id, payload, ... }
        ▼
src/store/callFlow/   (Vuex module: loadCallFlow action, frames in state)
        │
        ▼
src/pages/subscriber-details/AuiSubscriberDetailsCallFlow.vue
        │
        ├── src/components/callFlow/AuiCallFlowDiagram.vue      (D3 sequence diagram)
        ├── src/components/callFlow/AuiCallFlowNodeEditor.vue   (manual node alias editor)
        └── src/components/callFlow/AuiCallFlowPacketDetail.vue (selected message's raw payload)
```

## The parsing pipeline

`src/lib/callFlow/callFlowFrames.js` is a thin adapter, not a parser:

1. **`src/helpers/sip-pcap-parser.js`** does the actual decoding: it uses the
   `pcap-parser` npm package to walk the `.pcap` container (global header +
   packet records), then hand-decodes each packet itself - link-layer framing
   (Ethernet II, Linux SLL/SLL2), IPv4/IPv6, UDP/TCP (with stream
   reassembly), down to SIP request/response parsing. It's general-purpose
   and usable outside this feature (see its own doc comment for the
   `[ok, result]` contract).
2. **`callFlowFrames.js`**'s `extractCallFlowFrames` calls it and maps each
   parsed message onto a frame object (deriving `request_uri`, which
   `sip-pcap-parser.js` doesn't expose itself). It also runs a second,
   independent `pcap-parser` pass to count all raw packets, so anything
   `sip-pcap-parser.js` didn't turn into a frame (ARP/ICMP/non-SIP traffic,
   fragments) still shows up as `skippedCount` (`skippedPacketCount` in the
   store, shown as a warning banner). It also exports `mergePcapBuffers`
   (used for the B2B/PBX leg merge and "Download PCAP") and
   `computeCallFlowNodes`/`callFlowNodeKey` - the node-keying logic
   (`ip:port`, or bare `ip` with "Consider Ports" off) shared by the
   `callFlow/callFlowNodes` getter and `AuiCallFlowDiagram.vue`, so nodes and
   aliases stay consistent between them.

Because the underlying parsing runs on binary data straight from the network in
a user's browser, a header lying about its own length must never be able to
read out of bounds or throw an uncaught exception that blanks the whole page -
`sip-pcap-parser.js` resolves `[false, message]` rather than throwing, and a
single malformed packet is skipped rather than aborting the whole capture.

## The B2B/PBX leg merge

A single logical call can be split into multiple `call_id`s server-side: a B2B
(back-to-back user agent) leg is stored as `<call_id>_b2b-1`, and a PBX leg as
`<call_id>_pbx-1`. The REST `sipcaptures` resource only matches the exact
`call_id` it's given, so fetching just the plain `call_id` misses those legs
entirely.

`src/store/callFlow/actions.js`'s `loadCallFlow` works around this by fetching
all three call-id variants (`callId`, `callId_b2b-1`, `callId_pbx-1`) and
merging what comes back:

- A 404 on any variant is expected and not an error - most calls have no B2B or
  PBX leg at all.
- Any other error (5xx, network failure) propagates and fails the load.
- Frames from every leg that did return data are merged and sorted by
  timestamp (`mergeFramesByTimestamp`).
- Each leg's raw pcap buffer is kept separately (`legBuffers`) and only merged
  (`mergePcapBuffers`) later, when "Download PCAP" is actually clicked
  (`downloadCallFlowPcap`) - so the download covers the whole call, not just
  the primary leg.

This is a real limitation: if the platform ever introduces another leg-suffix
convention besides `_b2b-1`/`_pbx-1`, this list needs a corresponding update in
`CALL_ID_LEG_SUFFIXES` (`src/store/callFlow/actions.js`).

## Automatic element-role labels

`GET /api/platforminfo` includes a `call_flow` object mapping role name to
`ip:port` (e.g. `{ "sbc": "127.0.0.1:5080", "proxy": "127.0.0.1:5062", ... }`).
`computeCallFlowRoleLabels` (`src/lib/callFlow/callFlowFrames.js`) inverts that
map into node-key -> label(s) (keyed the same way as `computeCallFlowNodes`, so
it lines up with the diagram's own lanes regardless of the "Consider Ports"
toggle), sourced via the `user/callFlowRoles` Vuex getter and exposed by
`useCallFlow()`. Two or more roles can share one endpoint (e.g. a single-box
deployment, or any two roles once `considerPorts` folds their ports away) -
those are joined with `/` (e.g. `B2B/PBX/SBC`) rather than one overwriting the
other.

A role label is only a default: the manual Node Editor still exists to
override it (e.g. give a lane a deployment-specific name the platform doesn't
know), or to label anything platform info doesn't cover at all (a role with no
`call_flow` entry still starts labelled with its raw `ip:port`, exactly as
before this).
