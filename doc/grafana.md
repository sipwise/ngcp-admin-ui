# Grafana Dashboards

The Monitoring & Statistics pages are Grafana dashboards embedded in the Admin UI.
The Admin UI does not talk to the Grafana API: it builds a URL, loads it in an iframe
and provides the credentials as cookies. Everything else (proxying `/grafana`, user
mapping, dashboards) is handled outside this repository.

## Table of Contents

- [Key files](#key-files)
- [How it works](#how-it-works)
- [Routes](#routes)
- [Adding a dashboard](#adding-a-dashboard)
- [Authentication](#authentication)
- [Access control](#access-control)
- [Development setup](#development-setup)

## Key files

- `src/pages/AuiGrafana.vue` - the page that renders the iframe
- `src/helpers/grafana.js` - cookie handling and URL building
- `src/router/routes.js` - Grafana routes and their `meta`
- `src/auth.js` - removes the Grafana cookies together with the JWT
- `quasar.config.js` - dev server proxy for `/grafana`

## How it works

`AuiGrafana` loads Grafana from `/grafana/<path>` on the same origin as the Admin UI,
in kiosk mode (`kiosk=tv`, which hides the Grafana navigation). In a deployed system a
reverse proxy forwards `/grafana` to Grafana, so no cross-origin setup is needed.

- The URL is built only once the current user is loaded.
- The iframe is hidden and a spinner is shown until its `load` event fires.
- The iframe is re-created (`:key`) when the URL changes, e.g. when switching between
  dashboards, and the loading state is reset.

## Routes

Route `meta` drives the page:

| Meta key | Meaning |
|---|---|
| `grafanaPath` | Path appended to `/grafana/`, e.g. `d/sip-statistics`. `''` is the Grafana root. |
| `grafanaAdmin` | `true` for the Statistics Administration page (see [Authentication](#authentication)). |

| Route name | Path | `grafanaPath` |
|---|---|---|
| `systemStatistics` | `/system-statistics` | `d/system-statistics` |
| `processStatistics` | `/system-processes` | `d/system-processes` |
| `rtpStatistics` | `/rtp-statistics` | `d/rtp-statistics` |
| `sipStatistics` | `/sip-statistics` | `d/sip-statistics` |
| `sqlDbStatistics` | `/db-sql-statistics` | `d/db-sql-statistics` |
| `keyValueDBStatistic` | `/db-keyvalue-statistics` | `d/db-keyvalue-statistics` |
| `victoriametricsStatistics` | `/victoriametrics` | `d/victoriametrics` |
| `kamStatistics` | `/kam-statistics` | `d/kam-statistics` |
| `websocketStatistics` | `/websocket-statistics` | `d/websocket-statistics` |
| `clusterOverview` | `/cluster-overview` | `d/cluster-overview` |
| `statisticsAdministration` | `/statistics-administration` | `''` (`grafanaAdmin: true`) |

A catch-all route, `proxyGrafana` (`/grafana/:pathMatch(.*)`), opens any other Grafana
path inside the Admin UI. `AuiGrafana` uses `$route.params.pathMatch` when the route has
no `grafanaPath`.

## Adding a dashboard

1. Add a route using `pages/AuiGrafana` with `grafanaPath`
   and the `$p` permission for the matching `statistic.*` resource.
2. Add the route name to `monitoringChildItems` in `src/components/MainMenu.vue`.
3. Add the label to the translations.

## Authentication

The Admin UI passes its session to the reverse proxy through two cookies, set by
`setGrafanaAuthCookies`:

| Cookie | Value |
|---|---|
| `grafana_jwt` | The Admin UI JWT |
| `grafana_admin` | `yes` on the Statistics Administration page, otherwise `no` |

Both are scoped to `path=/grafana`, `SameSite=Strict` (plus `Secure` on https) and
expire after 5 minutes. `deleteJwt()` removes them together with the JWT.

### Why the cookies are refreshed

The cookies are short-lived on purpose, so the JWT does not stay in the browser long
after the user leaves the Grafana pages. A dashboard, however, keeps sending requests
to `/grafana` for as long as it is open (panel queries, auto-refresh, navigation inside
Grafana), and each request needs a valid cookie. To keep Grafana logged in, `AuiGrafana`
renews the cookies every 2 minutes (`GRAFANA_COOKIE_REFRESH_INTERVAL`), well below the
5 minute lifetime (`GRAFANA_COOKIE_MAX_AGE`) so a delayed timer tick in a background tab
does not let them expire. They are also renewed whenever the displayed URL changes.
Without the refresh, a dashboard left open would start failing authentication after
about 5 minutes: the browser drops the expired cookies, so later requests to `/grafana`
reach the reverse proxy without a JWT and it can no longer verify the user against the
NGCP API. When the user leaves the page the timer stops and the cookies expire.

The proxy uses the JWT to check the user's access against the NGCP API and to select the
Grafana user, and it grants edit rights only when `grafana_admin` is `yes`.

## Access control

- Dashboards require `read` on their `statistic.*` resource, and the menu group requires
  `read` on `statistic.$hasChildTrue`.
- Statistics Administration requires `statistic.statisticsadministration`. It is denied
  to the read-only superuser roles (`adminSuperuserReadOnly`,
  `adminSuperuserMasterReadOnly`), because it allows editing in Grafana.
- The catch-all route requires `read` on `statistic`.

See [Routing & Access Control](routing-and-access-control.md) for how `$p` is evaluated.

## Development setup

The Quasar dev server proxies `/grafana` to the NGCP host configured as
`proxyAPIFromURL`. It sets a fixed `X-WEBAUTH-USER: admin` header, so in dev you are
always the Grafana `admin` user, and it removes the `X-Frame-Options` response header
that would otherwise block the iframe. Per-user behaviour can only be tested against a
deployed system.
