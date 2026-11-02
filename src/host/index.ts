import type { Context } from '@deepseek-ai/cordis'
import * as account from '../account/host/index.js'
import * as cloud from '../cloud/host/index.js'
export const name = 'zerowall-ai-cloud'
export const inject = ['credentials', 'llm']
/** Compose the account provider before the managed inference service. */
export function apply(ctx: Context): void {
  ctx.plugin(account)
  ctx.plugin(cloud)
}
export default { name, inject, apply }
export { AiCloudClient } from '../account/host/index.js'
export type { AccountSecretStore } from '../account/host/index.js'
