# ZeroWall Science AI Cloud for DSH

This preview DSH plugin adds ZeroWall account sign-in, secure credential storage, model discovery, managed chat routes, and image/media cloud calls. It targets DSH `>=0.2.2-alpha.2 <0.3.0-0` and is maintained independently from the desktop repository.

## Install

In DSH, open **Settings → Plugins → Install from Git** and enter:

```text
https://github.com/ccfwwm/zerowall-dsh-plugin-ai-cloud
```

Restart DSH after installation. The plugin is also listed by the ZeroWall Science preview Discover index when that index is configured.

## Account and network access

The first sign-in needs network access to one of the ZeroWall AI Cloud gateways:

- `https://hkcode.aicodeme.xyz`
- `https://code.aicodeme.xyz`
- `https://code.aicodeme.cn`

The plugin uses the account session to discover available groups and models. Per-group API credentials are stored through DSH's credential provider and are never sent through the client UI. Chat and image/media requests go to the selected gateway or its credential-backed CDN endpoint.

Use **Sign out** to remove the active session. Disable or uninstall the plugin to stop its routes and media services. Network failures leave the last account state marked stale and do not print credentials in diagnostics.

## Compatibility and development

Requires Node.js 24.9 or later and npm for local development. The published bundle declares DSH `>=0.2.2-alpha.2 <0.3.0-0`.

```sh
npm ci
npm run check
npm pack
```

The resulting tarball contains only the built DSH bundle, locales, patch manifest, license, and this README. `node_modules`, tests, caches, and credentials are excluded.

## Distribution

This repository is public and uses the DSH bundle/manifest contract. DSH Discover indexes pin the Git commit before installation. ZeroWall's signed resource catalog is a separate channel: it verifies a signed catalog, immutable archive digest, and desktop/DSH compatibility before activation. The current `0.1.0-preview.1` release is intended for preview-channel validation; stable promotion requires a ZeroWall signing key and a successful clean-profile install test.
