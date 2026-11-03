import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { MainPanelId } from '@deepseek-ai/dsh-client-ui-layout/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { TypertClientRemote } from '@deepseek-ai/dsh-typert-protocol'
import type { CloudImageModel, CloudImageTask } from '../cloud/shared/images.js'
import { useEffect, useState } from 'react'
import { Image } from 'lucide-react'
import { unwrapRemoteResult } from '../base-client-helpers.js'

const en = { title: 'AI Cloud images', refresh: 'Refresh models', model: 'Model', prompt: 'Describe an image', size: 'Size', quality: 'Quality', automatic: 'Default', generate: 'Generate image', billing: 'Generation is billed by your AI Cloud platform.', status: 'Refresh task', preview: 'Load image', download: 'Download image', empty: 'Sign in using AI Cloud in the sidebar, then refresh models.', busy: 'Working…' }
const zh: Record<keyof typeof en, string> = { title: 'AI 云生图', refresh: '刷新模型', model: '模型', prompt: '描述要生成的图片', size: '尺寸', quality: '质量', automatic: '默认', generate: '生成图片', billing: '生成图片将按 AI 云平台规则计费。', status: '刷新任务状态', preview: '加载图片', download: '下载图片', empty: '请先通过侧栏 AI 云平台登录，然后刷新模型。', busy: '处理中…' }
const NS = 'zerowallImages'
declare module '@deepseek-ai/dsh-client-ui-slots' { interface LocaleNamespaceMap { zerowallImages: keyof typeof en } }
interface ImageProps extends PropsLocale<typeof NS> { api: TypertClientRemote['zerowallImages'] }
const errorText = (error: unknown) => error instanceof Error ? error.message : String(error)

function ImagesPage({ api, t }: ImageProps) {
  const [models, setModels] = useState<CloudImageModel[]>([])
  const [index, setIndex] = useState(0)
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('')
  const [quality, setQuality] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [requestId, setRequestId] = useState('')
  const [task, setTask] = useState<CloudImageTask>()
  const [images, setImages] = useState<Record<string, string>>({})
  useEffect(() => { let active = true; void api.models().then(result => { if (active) setModels(unwrapRemoteResult('images.models', result)) }).catch(error => { if (active) setError(errorText(error)) }); return () => { active = false } }, [api])
  const run = async (action: () => Promise<void>) => { setBusy(true); setError(''); try { await action() } catch (error) { setError(errorText(error)) } finally { setBusy(false) } }
  const selected = models[index]
  return <section style={{ padding: 24, overflow: 'auto', height: '100%', display: 'grid', alignContent: 'start', gap: 16, maxWidth: 1000, margin: 'auto' }}>
    <h1>{t('title')}</h1>
    <button disabled={busy} onClick={() => void run(async () => { setModels(unwrapRemoteResult('images.models', await api.models())); setIndex(0); setSize(''); setQuality('') })}>{t('refresh')}</button>
    {models.length === 0 ? <p>{t('empty')}</p> : <>
      <label>{t('model')} <select value={index} onChange={event => { setIndex(Number(event.target.value)); setSize(''); setQuality('') }}>{models.map((model, i) => <option key={`${model.groupId}:${model.profileId}:${model.modelId}`} value={i}>{model.groupName} / {model.modelId}</option>)}</select></label>
      <label>{t('size')} <select value={size} onChange={event => setSize(event.target.value)}><option value="">{t('automatic')}</option>{selected?.sizes.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>{t('quality')} <select value={quality} onChange={event => setQuality(event.target.value)}><option value="">{t('automatic')}</option>{selected?.qualities.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>{t('prompt')}<textarea rows={5} value={prompt} onChange={event => setPrompt(event.target.value)} style={{ display: 'block', width: '100%' }} /></label>
      <small>{t('billing')}</small>
      <button disabled={busy || !prompt.trim() || !selected} onClick={() => void run(async () => { if (!selected) return; const id = crypto.randomUUID(); setRequestId(id); setTask(undefined); setImages({}); setTask(unwrapRemoteResult('images.generate', await api.generate({ ...selected, requestId: id, prompt, ...(size ? { size } : {}), ...(quality ? { quality } : {}) }))) })}>{busy ? t('busy') : t('generate')}</button>
    </>}
    {requestId && <div><code>{requestId}</code> <span>{task?.status}</span> <button disabled={busy} onClick={() => void run(async () => setTask(unwrapRemoteResult('images.query', await api.query(requestId))))}>{t('status')}</button></div>}
    {(error || task?.error) && <p role="alert">{error || task?.error}</p>}
    {task?.artifacts.map(artifact => <figure key={artifact.key}>{images[artifact.key] ? <><img alt={prompt} src={images[artifact.key]} style={{ maxWidth: '100%', maxHeight: 600 }} /><figcaption><a href={images[artifact.key]} download={`zerowall-${requestId}.${artifact.mediaType === 'image/jpeg' ? 'jpg' : artifact.mediaType.split('/')[1]}`}>{t('download')}</a></figcaption></> : <button disabled={busy} onClick={() => void run(async () => { const data = unwrapRemoteResult('images.imageData', await api.imageData(requestId, artifact.key)); setImages(previous => ({ ...previous, [artifact.key]: `data:${data.mediaType};base64,${data.base64}` })) })}>{t('preview')}</button>}</figure>)}
  </section>
}

export const inject = ['slots', 'locale', 'layout', 'remote.zerowallImages']
/** Register an independent global panel through the public sidebar and main slots. */
export function apply(ctx: Context): void {
  const id = 'zerowall-images' as MainPanelId
  const api = ctx.get('remote.zerowallImages')
  ctx.effect(() => ctx.locale.register(NS, { en, zh }))
  const t = ctx.locale.bind(NS)
  ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, locale: NS, inject: () => ({ api }) }, ImagesPage))
  ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order: 20, locale: NS, label: () => t('title') }, ({ size }) => <Image size={size} />))
}
