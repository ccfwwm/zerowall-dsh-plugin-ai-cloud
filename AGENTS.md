# AI Cloud development

- Work in the canonical `C:\codekg\scienceproject\zerowall-dsh-plugin-ai-cloud` checkout on `main`. Do not create duplicate `-check`, `-iconfix`, or persistent worktree directories. Inspect and preserve local changes before pulling; use fast-forward pulls and normal pushes.
- Keep account, credentials, model discovery, and managed cloud calls in this plugin. Ship its artwork inside the plugin; never depend on desktop resource paths. Keep account access in the sidebar footer and settings.
- Run `npm ci --no-audit --no-fund`, `npm run check`, and `npm run test:package` for implementation changes. Review and commit rebuilt `lib/` artifacts with source changes because Git installs do not run lifecycle scripts. Never commit credentials or local diagnostics.
- Test consumers and profiles in temporary or ignored output locations, not extra source checkouts. Validate real cloud calls separately with an authorized test account.
- The desktop pins a tested Git commit. Plugin pushes do not update that pin automatically. Follow the shared [development and migration guide](https://github.com/ccfwwm/zerowallscience-newui/blob/main/docs/developer/zerowall/README.zh.md) for integration and packaging.
