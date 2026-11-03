// @vitest-environment jsdom
import { act, type ComponentProps } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AiCloudAccountButton, type AiCloudAccountView } from '../src/account/client/AiCloudAccountButton.js'
import { zh } from '../src/account/client/locales.js'

type Props = ComponentProps<typeof AiCloudAccountButton>
const signedOut: AiCloudAccountView = { status: 'signedOut', balanceFreshness: 'current', lowBalance: false, models: [] }
const signedIn = (balance: number, balanceFreshness: 'current' | 'stale' = 'current'): AiCloudAccountView => ({
  ...signedOut, status: 'signedIn', email: 'test@example.com', balance, balanceFreshness, currency: 'CNY',
})
let root: Root
let container: HTMLDivElement
let dialogDescriptor: PropertyDescriptor | undefined

function actions(getAccount: Props['getAccount']): Props {
  const dictionary: Record<string, string> = zh
  return {
    wide: true, t: key => dictionary[key] ?? key, getAccount,
    savedLogin: vi.fn(async () => undefined), forgetLogin: vi.fn(async () => {}),
    relogin: vi.fn(async () => signedIn(20)),
    getPublicConfig: vi.fn(async () => ({ registrationEnabled: true, emailVerifyEnabled: true, invitationCodeEnabled: false, captchaEnabled: false })),
    gateways: vi.fn(async () => []), selectGateway: vi.fn(async () => signedOut),
    login: vi.fn(async () => signedIn(20)), register: vi.fn(async () => signedIn(0)),
    sendCode: vi.fn(async () => ({ countdown: 60, gatewayBaseUrl: 'https://example.com' })), forgotPassword: vi.fn(async () => {}),
    logout: vi.fn(async () => {}), discoverModels: vi.fn(async () => signedIn(20)),
    checkoutInfo: vi.fn(async () => ({ enabled: false, minimumAmount: 10, paymentTypes: [] })),
    listOrders: vi.fn(async () => []), createOrder: vi.fn(), getOrder: vi.fn(), verifyOrder: vi.fn(),
  }
}
const buttons = () => [...document.querySelectorAll<HTMLButtonElement>('button')]
async function click(text: string) {
  const button = buttons().find(node => node.textContent === text)
  expect(button, text).toBeDefined()
  await act(async () => button!.click())
}
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  dialogDescriptor = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal')
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value(this: HTMLDialogElement) { this.open = true } })
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
})
afterEach(async () => {
  await act(async () => root.unmount())
  container.remove()
  if (dialogDescriptor) Object.defineProperty(HTMLDialogElement.prototype, 'showModal', dialogDescriptor)
  else Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('AI Cloud startup and sidebar balance', () => {
  it('opens sign-in automatically and lets the user skip without reopening it', async () => {
    const props = actions(vi.fn(async () => signedOut))
    await act(async () => root.render(<AiCloudAccountButton {...props} />))
    expect(document.querySelector('[role="dialog"]')).not.toBeNull()
    expect(document.querySelector<HTMLInputElement>('input[type="checkbox"]')?.checked).toBe(true)
    await click('暂时跳过')
    await act(async () => window.dispatchEvent(new Event('focus')))
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    expect(props.getAccount).toHaveBeenCalledOnce()
  })

  it('waits for saved-session restoration and enters directly when it succeeds', async () => {
    let resolve!: (value: AiCloudAccountView) => void
    const restored = new Promise<AiCloudAccountView>(done => { resolve = done })
    const props = actions(vi.fn(() => restored))
    await act(async () => root.render(<AiCloudAccountButton {...props} />))
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    await act(async () => resolve(signedIn(20)))
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    expect(document.querySelector('[data-zerowall-footer-action]')?.textContent).toContain('20.00')
    expect(props.login).not.toHaveBeenCalled()
  })

  it('shows a current balance below five, offers recharge, and refreshes after returning', async () => {
    let account = signedIn(4.99)
    const read = vi.fn(async () => account)
    const props = actions(read)
    await act(async () => root.render(<AiCloudAccountButton {...props} />))
    const footer = () => document.querySelector('[data-zerowall-footer-action]')!
    expect(footer().textContent).toContain('4.99')
    expect(footer().textContent).toContain('充值')
    expect(document.querySelector('dialog[open]')?.textContent).toContain('低于 5 元')
    await click('余额充值')
    expect(document.querySelector('[role="dialog"]')).not.toBeNull()
    expect(props.createOrder).not.toHaveBeenCalled()
    await act(async () => document.querySelector<HTMLButtonElement>('button[aria-label="关闭"]')!.click())
    account = signedIn(5)
    await act(async () => window.dispatchEvent(new Event('focus')))
    expect(footer().textContent).toContain('5.00')
    expect(footer().getAttribute('data-low-balance')).toBe('false')
    expect(document.querySelector('dialog')).toBeNull()
    account = signedIn(3)
    await act(async () => window.dispatchEvent(new Event('focus')))
    expect(document.querySelector('dialog[open]')).not.toBeNull()
    await click('稍后再说')
    await act(async () => window.dispatchEvent(new Event('focus')))
    expect(document.querySelector('dialog')).toBeNull()
  })

  it('labels an offline balance as the last balance and avoids an automatic recharge prompt', async () => {
    await act(async () => root.render(<AiCloudAccountButton {...actions(async () => signedIn(2, 'stale'))} />))
    expect(document.querySelector('[data-zerowall-footer-action]')?.textContent).toContain('最近一次余额')
    expect(document.querySelector('dialog')).toBeNull()
  })

  it('removes background balance listeners when the footer unmounts', async () => {
    const read = vi.fn(async () => signedIn(20))
    await act(async () => root.render(<AiCloudAccountButton {...actions(read)} />))
    await act(async () => root.unmount())
    const count = read.mock.calls.length
    window.dispatchEvent(new Event('focus'))
    window.dispatchEvent(new Event('online'))
    expect(read).toHaveBeenCalledTimes(count)
    root = createRoot(container)
  })
})
