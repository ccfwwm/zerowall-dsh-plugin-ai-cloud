var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name3, symbol) => (symbol = Symbol[name3]) ? symbol : Symbol.for("Symbol." + name3);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name3 in all)
    __defProp(target, name3, { get: all[name3], enumerable: true });
};
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name3, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name: name3, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name3, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name3]() {
    return __privateGet(this, extra);
  }, set [name3](x) {
    return __privateSet(this, extra, x);
  } }, name3));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name3) : __name(target, name3);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name3, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name3 in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name3];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name3] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name3, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/account/host/index.ts
var host_exports = {};
__export(host_exports, {
  AiCloudClient: () => AiCloudClient,
  ZeroWallAccountService: () => ZeroWallAccountService,
  apply: () => apply,
  default: () => host_default,
  uniqueMediaModels: () => uniqueMediaModels
});

// src/account/host/reasoning-default.ts
function installDefaultReasoning(ctx) {
  ctx.on("agent/request", async ({ signal }, next) => {
    const config = await next();
    if (config.reasoningEffort !== void 0 || !config.provider || !config.model) return config;
    try {
      const info = await ctx.llm.resolveModelInfo(config.provider, config.model, signal);
      const high = info.reasoning?.efforts.find((effort) => effort.id === "high");
      if (high) return { ...config, reasoningEffort: high.id };
    } catch {
      signal.throwIfAborted();
    }
    return config;
  }, { prepend: true });
}

// src/account/host/index.ts
import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";

// src/secrets/host/index.ts
import { credentialKey } from "@deepseek-ai/dsh-credentials";
var DshSecretStore = class {
  constructor(credentials) {
    this.credentials = credentials;
  }
  key(id) {
    return credentialKey("zerowall-ai-cloud", "secret-" + Buffer.from(id).toString("hex"));
  }
  async get(id) {
    const record = await this.credentials.readRecord(this.key(id));
    if (record === void 0) return void 0;
    if (record.kind !== "grant" || typeof record.payload !== "string") throw new Error("AI Cloud credential record is invalid.");
    return record.payload;
  }
  async set(id, value) {
    await this.credentials.modifyRecord(this.key(id), async () => ({ kind: "grant", payload: value }));
  }
  async delete(id) {
    await this.credentials.deleteRecord(this.key(id));
  }
};

// src/account/shared/types.ts
function accountGroupCatalog(account) {
  if (account.status !== "signedIn") return { groups: [], routes: [] };
  const groups = new Map((account.groups ?? []).map((group) => [group.groupId, group]));
  for (const model of [...account.models, ...account.mediaModels ?? []]) {
    if (!groups.has(model.groupId)) groups.set(model.groupId, { groupId: model.groupId, groupName: model.groupName, protocol: model.imageProtocol ?? "openai" });
  }
  return {
    ...account.gatewayBaseUrl ? { gatewayBaseUrl: account.gatewayBaseUrl } : {},
    groups: [...groups.values()],
    routes: account.models.map(({ providerId, groupId, modelId }) => ({ providerId, groupId, modelId }))
  };
}
function normalizeImageProtocol(value) {
  if (typeof value === "string" && ["gemini", "gemini-native", "google-gemini"].includes(value.trim().toLowerCase())) return "gemini";
  return "openai";
}
function imageQualityChoices(_modelId, declared, _groupName) {
  return declared;
}
function mediaModelIdentity(model) {
  return JSON.stringify([model.providerId, model.groupId, model.modelId, model.profileId]);
}
function uniqueMediaModels(models) {
  return [...new Map(models.map((model) => [mediaModelIdentity(model), model])).values()];
}

// src/account/host/models-dev-context.ts
var MODELS_DEV_CONTEXT = {
  "@cf/aisingapore/gemma-sea-lion-v4-27b-it": {
    "context": 128e3,
    "output": 128e3
  },
  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b": {
    "context": 8e4,
    "output": 8e4
  },
  "@cf/deepseek-ai/deepseek-v4-flash-0731": {
    "context": 1048576,
    "output": 1048576
  },
  "@cf/deepseek-ai/deepseek-v4-pro-0813": {
    "context": 1048576,
    "output": 1048576
  },
  "@cf/deepseek-ai/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 1048576
  },
  "@cf/google/gemma-4-26b-a4b-it": {
    "context": 256e3,
    "output": 16384
  },
  "@cf/ibm-granite/granite-4.0-h-micro": {
    "context": 131e3,
    "output": 131e3
  },
  "@cf/meta/llama-3.1-8b-instruct-fp8": {
    "context": 32e3,
    "output": 32e3
  },
  "@cf/meta/llama-3.2-11b-vision-instruct": {
    "context": 128e3,
    "output": 128e3
  },
  "@cf/meta/llama-3.2-1b-instruct": {
    "context": 6e4,
    "output": 6e4
  },
  "@cf/meta/llama-3.2-3b-instruct": {
    "context": 8e4,
    "output": 8e4
  },
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast": {
    "context": 24e3,
    "output": 24e3
  },
  "@cf/meta/llama-4-scout-17b-16e-instruct": {
    "context": 131e3,
    "output": 16384
  },
  "@cf/meta/llama-guard-3-8b": {
    "context": 131072,
    "output": 131072
  },
  "@cf/mistralai/mistral-small-3.1-24b-instruct": {
    "context": 128e3,
    "output": 128e3
  },
  "@cf/moonshotai/kimi-k2.6": {
    "context": 262144,
    "output": 256e3
  },
  "@cf/moonshotai/kimi-k2.7-code": {
    "context": 262144,
    "output": 262144
  },
  "@cf/nvidia/nemotron-3-120b-a12b": {
    "context": 256e3,
    "output": 256e3
  },
  "@cf/openai/gpt-oss-120b": {
    "context": 128e3,
    "output": 16384
  },
  "@cf/openai/gpt-oss-20b": {
    "context": 128e3,
    "output": 16384
  },
  "@cf/qwen/qwen2.5-coder-32b-instruct": {
    "context": 32768,
    "output": 32768
  },
  "@cf/qwen/qwen3-30b-a3b-fp8": {
    "context": 32768,
    "output": 32768
  },
  "@cf/qwen/qwen3.8-27b": {
    "context": 262144,
    "output": 262144
  },
  "@cf/qwen/qwq-32b": {
    "context": 24e3,
    "output": 24e3
  },
  "@cf/zai-org/glm-4.7-flash": {
    "context": 131072,
    "output": 131072
  },
  "@cf/zai-org/glm-5.2": {
    "context": 262144,
    "output": 256e3
  },
  "@cf/zai-org/glm-5.3": {
    "context": 1048576,
    "output": 1048576
  },
  "@cf/zai-org/glm-5.3-flash": {
    "context": 1048576,
    "output": 1048576
  },
  "~anthropic/claude-fable-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "~anthropic/claude-haiku-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "~anthropic/claude-opus-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "~anthropic/claude-sonnet-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "~deepseek/deepseek-flash-latest": {
    "context": 1048576,
    "output": 943718
  },
  "~deepseek/deepseek-pro-latest": {
    "context": 1048576,
    "output": 393216
  },
  "~deepseek/deepseek-v4-flash-latest": {
    "context": 1048576,
    "output": 943718
  },
  "~google/gemini-flash-latest": {
    "context": 1048576,
    "output": 65536
  },
  "~google/gemini-pro-latest": {
    "context": 1048576,
    "output": 943718
  },
  "~moonshotai/kimi-latest": {
    "context": 1048576,
    "output": 943718
  },
  "~openai/gpt-astra-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "~openai/gpt-luna-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "~openai/gpt-mini-latest": {
    "context": 4e5,
    "output": 128e3
  },
  "~openai/gpt-sol-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "~openai/gpt-terra-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "~unbiased/pareto-latest": {
    "context": 1048576,
    "output": 131072
  },
  "~x-ai/grok-latest": {
    "context": 5e5,
    "output": 45e4
  },
  "~z-ai/glm-flash-latest": {
    "context": 1048576,
    "output": 943718
  },
  "~z-ai/glm-latest": {
    "context": 1048576,
    "output": 943718
  },
  "abacusai/Dracarys-72B-Instruct": {
    "context": 32768,
    "output": 8192
  },
  "abliterated-model": {
    "context": 15e4,
    "output": 8192
  },
  "abliterated-model-large": {
    "context": 1e6,
    "output": 999990
  },
  "abliterated-model-large-v2": {
    "context": 1e6,
    "output": 999990
  },
  "abliteration-abliterated-model-large-flash": {
    "context": 1e6,
    "output": 131072
  },
  "abliteration-abliterated-model-large-v2": {
    "context": 1e6,
    "output": 32768
  },
  "abliteration-ai/abliterated-model": {
    "context": 262144,
    "output": 262134
  },
  "abliteration-ai/abliterated-model-large": {
    "context": 1e6,
    "output": 999990
  },
  "abliteration-ai/abliterated-model-large-flash": {
    "context": 1048576,
    "output": 262144
  },
  "abliteration-ai/abliterated-model-large-v2": {
    "context": 1048576,
    "output": 999990
  },
  "accounts/fireworks/models/deepseek-v4p1-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "accounts/fireworks/models/deepseek-v4p1-flash-1017": {
    "context": 1e6,
    "output": 384e3
  },
  "accounts/fireworks/models/ember-1": {
    "context": 1048576,
    "output": 131072
  },
  "accounts/fireworks/models/glm-5p3": {
    "context": 1048573,
    "output": 262144
  },
  "accounts/fireworks/models/glm-5p3-flash": {
    "context": 1048573,
    "output": 131072
  },
  "accounts/fireworks/models/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "accounts/fireworks/models/inkling": {
    "context": 1048576,
    "output": 1048576
  },
  "accounts/fireworks/models/kimi-k3": {
    "context": 1048576,
    "output": 131072
  },
  "accounts/fireworks/models/minimax-m3": {
    "context": 512e3,
    "output": 512e3
  },
  "accounts/fireworks/models/minimax-m3p1-flash": {
    "context": 1e6,
    "output": 512e3
  },
  "accounts/fireworks/models/muse-spark-open": {
    "context": 1048576,
    "output": 131072
  },
  "accounts/fireworks/models/nemotron-3-ultra-nvfp4": {
    "context": 262144,
    "output": 128e3
  },
  "accounts/fireworks/models/nemotron-lightning-3p5-30b-a3b": {
    "context": 262144,
    "output": 262144
  },
  "accounts/fireworks/models/qwen3p8-2p4t-a95b": {
    "context": 262144,
    "output": 131072
  },
  "accounts/fireworks/models/qwen3p8-max": {
    "context": 262144,
    "output": 131072
  },
  "accounts/fireworks/routers/deepseek-flash-latest": {
    "context": 1e6,
    "output": 384e3
  },
  "accounts/fireworks/routers/deepseek-v4p1-flash-1017-spot": {
    "context": 1e6,
    "output": 384e3
  },
  "accounts/fireworks/routers/deepseek-v4p1-flash-spot": {
    "context": 1e6,
    "output": 384e3
  },
  "accounts/fireworks/routers/glm-5p3-fast": {
    "context": 1048572,
    "output": 262144
  },
  "accounts/fireworks/routers/glm-5p3-spot": {
    "context": 1048573,
    "output": 262144
  },
  "accounts/fireworks/routers/glm-fast-latest": {
    "context": 1048572,
    "output": 262144
  },
  "accounts/fireworks/routers/glm-flash-latest": {
    "context": 1048573,
    "output": 131072
  },
  "accounts/fireworks/routers/glm-latest": {
    "context": 1048573,
    "output": 262144
  },
  "accounts/fireworks/routers/kimi-fast-latest": {
    "context": 1048576,
    "output": 131072
  },
  "accounts/fireworks/routers/kimi-k3-fast": {
    "context": 1048576,
    "output": 131072
  },
  "accounts/fireworks/routers/kimi-k3-spot": {
    "context": 1048576,
    "output": 131072
  },
  "accounts/fireworks/routers/kimi-latest": {
    "context": 1048576,
    "output": 131072
  },
  "accounts/fireworks/routers/minimax-latest": {
    "context": 512e3,
    "output": 512e3
  },
  "accounts/fireworks/routers/qwen-max-latest": {
    "context": 262144,
    "output": 131072
  },
  "agent-max": {
    "context": 1e6,
    "output": 128e3
  },
  "agent-prime": {
    "context": 196608,
    "output": 131072
  },
  "agent-standard": {
    "context": 128e3,
    "output": 65536
  },
  "Agents-A1": {
    "context": 262e3,
    "output": 1e5
  },
  "agnes-2.0-flash": {
    "context": 512e3,
    "output": 65536
  },
  "agnes-2.5-flash": {
    "context": 512e3,
    "output": 65536
  },
  "agnes-2.5-pro-alpha": {
    "context": 1e6,
    "output": 65536
  },
  "aion-labs-aion-3-0": {
    "context": 128e3,
    "output": 32768
  },
  "aion-labs-aion-3-0-mini": {
    "context": 128e3,
    "output": 32768
  },
  "aion-labs-aion-3-5": {
    "context": 262144,
    "output": 32768
  },
  "aion-labs-aion-3-5-mini": {
    "context": 262144,
    "output": 32768
  },
  "aion-labs/aion-2.0": {
    "context": 131072,
    "output": 32768
  },
  "aion-labs/aion-3.0": {
    "context": 131072,
    "output": 32768
  },
  "aion-labs/aion-3.0-mini": {
    "context": 131072,
    "output": 32768
  },
  "aion-labs/aion-3.5": {
    "context": 262144,
    "output": 32768
  },
  "aion-labs/aion-3.5-mini": {
    "context": 262144,
    "output": 32768
  },
  "aion-labs/aion-rp-llama-3.1-8b": {
    "context": 32768
  },
  "aisingapore/gemma-sea-lion-v4-27b-it": {
    "context": 131072,
    "output": 128e3
  },
  "aisingapore/qwen-sea-lion-v4-32b-it": {
    "context": 131072,
    "output": 131072
  },
  "aleph-alpha/kolibri-1": {
    "context": 1048576,
    "output": 943718
  },
  "alibaba/deepseek-v4-flash": {
    "context": 1e6,
    "output": 393216
  },
  "alibaba/deepseek-v4-pro": {
    "context": 1e6,
    "output": 393216
  },
  "alibaba/deepseek-v4.1-flash": {
    "context": 1e6,
    "output": 393216
  },
  "alibaba/deepseek-v4.1-flash-1017": {
    "context": 1e6,
    "output": 393216
  },
  "alibaba/glm-5": {
    "context": 202752,
    "output": 16384
  },
  "alibaba/glm-5.2": {
    "context": 1e6,
    "output": 131072
  },
  "alibaba/glm-5.3": {
    "context": 1048576,
    "output": 131072
  },
  "alibaba/kimi-k2.5": {
    "context": 262144,
    "output": 98304
  },
  "alibaba/kimi-k3": {
    "context": 1048576,
    "output": 1048576
  },
  "alibaba/qwen-3-14b": {
    "context": 40960,
    "output": 16384
  },
  "alibaba/qwen-3-235b": {
    "context": 262144,
    "output": 16384
  },
  "alibaba/qwen-3-30b": {
    "context": 40960,
    "output": 16384
  },
  "alibaba/qwen-3-32b": {
    "context": 128e3,
    "output": 8192
  },
  "alibaba/qwen-flash": {
    "context": 1e6,
    "output": 32e3
  },
  "alibaba/qwen-plus-latest": {
    "context": 1e6,
    "output": 32e3
  },
  "alibaba/qwen3-coder": {
    "context": 262144,
    "output": 32768
  },
  "alibaba/qwen3-coder-30b-a3b": {
    "context": 262144,
    "output": 8192
  },
  "alibaba/qwen3-coder-480b-a35b-instruct": {
    "context": 262e3,
    "output": 65536
  },
  "alibaba/qwen3-coder-flash": {
    "context": 997952,
    "output": 65536
  },
  "alibaba/qwen3-coder-next": {
    "context": 256e3,
    "output": 256e3
  },
  "alibaba/qwen3-embedding-0.6b": {
    "context": 32768
  },
  "alibaba/qwen3-embedding-4b": {
    "context": 32768
  },
  "alibaba/qwen3-embedding-8b": {
    "context": 32768
  },
  "alibaba/qwen3-max": {
    "context": 262144,
    "output": 65536
  },
  "alibaba/qwen3-max-thinking": {
    "context": 256e3,
    "output": 65536
  },
  "alibaba/qwen3-next-80b-a3b-thinking": {
    "context": 262144,
    "output": 262144
  },
  "alibaba/qwen3-vl-instruct": {
    "context": 262144,
    "output": 262144
  },
  "alibaba/qwen3-vl-plus": {
    "context": 262144,
    "output": 32768
  },
  "alibaba/qwen3.5-122b-a10b": {
    "context": 262144,
    "output": 65536
  },
  "alibaba/qwen3.5-27b": {
    "context": 262144,
    "output": 65536
  },
  "alibaba/qwen3.5-35b-a3b": {
    "context": 262144,
    "output": 65536
  },
  "alibaba/qwen3.5-397b-a17b": {
    "context": 262144,
    "output": 65536
  },
  "alibaba/qwen3.5-flash": {
    "context": 1e6,
    "output": 64e3
  },
  "alibaba/qwen3.5-plus": {
    "context": 1e6,
    "output": 64e3
  },
  "alibaba/qwen3.6-27b": {
    "context": 256e3,
    "output": 65536
  },
  "alibaba/qwen3.6-35b-a3b": {
    "context": 262144,
    "output": 65536
  },
  "alibaba/qwen3.6-flash": {
    "context": 983616,
    "output": 65536
  },
  "alibaba/qwen3.8-2.4t-a95b": {
    "context": 262144
  },
  "alibaba/qwen3.8-max-0902": {
    "context": 991e3,
    "output": 128e3
  },
  "alibaba/qwen3.8-max-prime": {
    "context": 1e6,
    "output": 131072
  },
  "alibaba/qwen35-397b-a17b": {
    "context": 262144,
    "output": 65536
  },
  "alicloud-deepseek-v4-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "alicloud-deepseek-v4-pro": {
    "context": 1e6,
    "output": 384e3
  },
  "alicloud-glm-5.1": {
    "context": 2e5,
    "output": 128e3
  },
  "all-mini-lm-l6-v2": {
    "context": 256,
    "output": 384
  },
  "allam-2-7b": {
    "context": 4096,
    "output": 4096
  },
  "amazon--nova-lite": {
    "context": 1e6,
    "output": 64e3
  },
  "amazon--nova-micro": {
    "context": 128e3,
    "output": 8192
  },
  "amazon--nova-pro": {
    "context": 3e5,
    "output": 8192
  },
  "amazon--titan-embed-text": {
    "context": 8192,
    "output": 1536
  },
  "amazon.nova-2-lite-v1:0": {
    "context": 1e6,
    "output": 65535
  },
  "amazon.nova-lite-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "amazon.nova-micro-v1:0": {
    "context": 128e3,
    "output": 1e4
  },
  "amazon.nova-pro-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "amazon/amazon.nova-lite-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "amazon/amazon.nova-lite-v1:0@us": {
    "context": 3e5,
    "output": 1e4
  },
  "amazon/amazon.nova-micro-v1:0": {
    "context": 128e3,
    "output": 1e4
  },
  "amazon/amazon.nova-micro-v1:0@us": {
    "context": 128e3,
    "output": 1e4
  },
  "amazon/amazon.nova-pro-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "amazon/amazon.nova-pro-v1:0@us": {
    "context": 3e5,
    "output": 1e4
  },
  "amazon/google.gemma-3-12b-it": {
    "context": 128e3,
    "output": 131072
  },
  "amazon/google.gemma-3-12b-it@us": {
    "context": 128e3,
    "output": 131072
  },
  "amazon/google.gemma-3-27b-it": {
    "context": 128e3,
    "output": 131072
  },
  "amazon/google.gemma-3-27b-it@us": {
    "context": 128e3,
    "output": 131072
  },
  "amazon/google.gemma-3-4b-it": {
    "context": 128e3,
    "output": 131072
  },
  "amazon/google.gemma-3-4b-it@us": {
    "context": 128e3,
    "output": 131072
  },
  "amazon/mistral.pixtral-large-2502-v1:0": {
    "context": 128e3,
    "output": 8192
  },
  "amazon/mistral.pixtral-large-2502-v1:0@us": {
    "context": 128e3,
    "output": 8192
  },
  "amazon/mistral.voxtral-mini-3b-2507": {
    "context": 32768,
    "output": 32768
  },
  "amazon/mistral.voxtral-mini-3b-2507@us": {
    "context": 32768,
    "output": 32768
  },
  "amazon/mistral.voxtral-small-24b-2507": {
    "context": 32768,
    "output": 32768
  },
  "amazon/mistral.voxtral-small-24b-2507@us": {
    "context": 32768,
    "output": 32768
  },
  "amazon/moonshot.kimi-k2-thinking": {
    "context": 256e3,
    "output": 262144
  },
  "amazon/moonshotai.kimi-k2.5": {
    "context": 262144,
    "output": 262144
  },
  "amazon/nova-2-lite": {
    "context": 1e6,
    "output": 65535
  },
  "amazon/nova-2-lite-v1": {
    "context": 1e6,
    "output": 65535
  },
  "amazon/nova-lite": {
    "context": 3e5,
    "output": 1e4
  },
  "amazon/nova-lite-v1": {
    "context": 3e5,
    "output": 5120
  },
  "amazon/nova-micro": {
    "context": 128e3,
    "output": 1e4
  },
  "amazon/nova-micro-v1": {
    "context": 128e3,
    "output": 5120
  },
  "amazon/nova-premier-v1": {
    "context": 1e6,
    "output": 32e3
  },
  "amazon/nova-pro": {
    "context": 3e5,
    "output": 1e4
  },
  "amazon/nova-pro-v1": {
    "context": 3e5
  },
  "amazon/openai.gpt-oss-safeguard-20b": {
    "context": 128e3,
    "output": 131072
  },
  "amazon/openai.gpt-oss-safeguard-20b@us": {
    "context": 128e3,
    "output": 131072
  },
  "amazon/qwen.qwen3-coder-next": {
    "context": 262144,
    "output": 65536
  },
  "amazon/titan-embed-text-v2": {
    "context": 8192
  },
  "amazon/zai.glm-4.7-flash": {
    "context": 203e3,
    "output": 131072
  },
  "amazon/zai.glm-4.7-flash@us": {
    "context": 203e3,
    "output": 131072
  },
  "ambient/large": {
    "context": 202752,
    "output": 202752
  },
  "ambient/small": {
    "context": 101072,
    "output": 101072
  },
  "anthracite-org/magnum-v2-72b": {
    "context": 16384,
    "output": 8192
  },
  "anthropic--claude-3-haiku": {
    "context": 2e5,
    "output": 4096
  },
  "anthropic--claude-4-opus": {
    "context": 2e5,
    "output": 32e3
  },
  "anthropic--claude-4-sonnet": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic--claude-4.5-haiku": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic--claude-4.5-opus": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic--claude-4.5-sonnet": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic--claude-4.6-opus": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic--claude-4.6-sonnet": {
    "context": 1e6,
    "output": 64e3
  },
  "anthropic--claude-4.7-opus": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic--claude-4.8-opus": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic-claude-4.5-sonnet": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic-claude-4.6-sonnet": {
    "context": 2e5,
    "output": 8192
  },
  "anthropic-claude-5-sonnet": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic-claude-5.5-haiku": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic-claude-fable-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic-claude-fable-5.1": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic-claude-haiku-4.5": {
    "context": 2e5,
    "output": 8192
  },
  "anthropic-claude-opus-4.5": {
    "context": 2e5,
    "output": 8192
  },
  "anthropic-claude-opus-4.6": {
    "context": 2e5,
    "output": 8192
  },
  "anthropic-claude-opus-4.7": {
    "context": 2e5,
    "output": 8192
  },
  "anthropic-claude-opus-4.8": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic-claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic-claude-opus-5.5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic-claude-sonnet-5.5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-fable-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-fable-5-1": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-haiku-4-5-20251001-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic.claude-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-opus-4-1-20250805-v1:0": {
    "context": 2e5,
    "output": 32e3
  },
  "anthropic.claude-opus-4-5-20251101-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic.claude-opus-4-6-v1": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-sonnet-4-5-20250929-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic.claude-sonnet-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic.claude-sonnet-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-fable-5": {
    "context": 1e6
  },
  "anthropic/claude-fable-5-1": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-fable-5.1": {
    "context": 1e6
  },
  "anthropic/claude-fable-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-haiku-3": {
    "context": 189096,
    "output": 8192
  },
  "anthropic/claude-haiku-3.5": {
    "context": 189096,
    "output": 8192
  },
  "anthropic/claude-haiku-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic/claude-haiku-4-5-20251001": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic/claude-haiku-4.5:thinking": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic/claude-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-haiku-5.5": {
    "context": 1e6
  },
  "anthropic/claude-haiku-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-4": {
    "context": 192512,
    "output": 28672
  },
  "anthropic/claude-opus-4-1-20250805": {
    "context": 2e5,
    "output": 32e3
  },
  "anthropic/claude-opus-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic/claude-opus-4-5-20251101": {
    "context": 2e5
  },
  "anthropic/claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-4.1:thinking": {
    "context": 2e5,
    "output": 32e3
  },
  "anthropic/claude-opus-4.1:thinking:1024": {
    "context": 2e5,
    "output": 32e3
  },
  "anthropic/claude-opus-4.1:thinking:32768": {
    "context": 2e5,
    "output": 32e3
  },
  "anthropic/claude-opus-4.1:thinking:8192": {
    "context": 2e5,
    "output": 32e3
  },
  "anthropic/claude-opus-4.5:thinking": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic/claude-opus-4.6:thinking": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-4.6:thinking:low": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-4.6:thinking:max": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-4.6:thinking:medium": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-4.7:thinking": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-4.8-fast": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-4.8:thinking": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-5": {
    "context": 1e6
  },
  "anthropic/claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-5-fast": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-5.5": {
    "context": 1e6
  },
  "anthropic/claude-opus-5.5-fast": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-opus-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-sonnet-3.5": {
    "context": 189096,
    "output": 8192
  },
  "anthropic/claude-sonnet-3.5-june": {
    "context": 189096,
    "output": 8192
  },
  "anthropic/claude-sonnet-3.7": {
    "context": 196608,
    "output": 128e3
  },
  "anthropic/claude-sonnet-4": {
    "context": 983040,
    "output": 64e3
  },
  "anthropic/claude-sonnet-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic/claude-sonnet-4-5-20250929": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic/claude-sonnet-4.5:thinking": {
    "context": 2e5,
    "output": 64e3
  },
  "anthropic/claude-sonnet-4.6:thinking": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-sonnet-5": {
    "context": 1e6
  },
  "anthropic/claude-sonnet-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-sonnet-5:thinking": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-sonnet-5.5": {
    "context": 1e6
  },
  "anthropic/claude-sonnet-5.5:thinking": {
    "context": 1e6,
    "output": 128e3
  },
  "anthropic/claude-sonnet-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "apac.amazon.nova-lite-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "apac.amazon.nova-micro-v1:0": {
    "context": 128e3,
    "output": 1e4
  },
  "apac.amazon.nova-pro-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "apac.anthropic.claude-sonnet-4-20250514-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "apodex/apodex-1.1-mini": {
    "context": 262144,
    "output": 262144
  },
  "arcee_ai/AFM/models/trinity-mini": {
    "context": 131072,
    "output": 131072
  },
  "arcee-trinity-large-thinking": {
    "context": 128e3,
    "output": 32e3
  },
  "arkanecloud/deepseek-ai/DeepSeek-V4-Flash-0731": {
    "context": 1048576,
    "output": 384e3
  },
  "arkanecloud/deepseek-ai/DeepSeek-V4.1-Flash": {
    "context": 1048576,
    "output": 384e3
  },
  "arkanecloud/deepseek-ai/DeepSeek-V4.1-Flash-1017": {
    "context": 1048576,
    "output": 384e3
  },
  "arkanecloud/meta-llama/Llama-3.1-70B-Instruct": {
    "context": 131072,
    "output": 4096
  },
  "arkanecloud/meta-llama/Llama-3.1-8B-Instruct": {
    "context": 131072,
    "output": 4096
  },
  "arkanecloud/meta-llama/Llama-3.3-70B-Instruct": {
    "context": 128e3,
    "output": 4096
  },
  "arkanecloud/ministral-14b": {
    "context": 32768,
    "output": 262144
  },
  "arkanecloud/nvidia/nemotron-3-super-120b-a12b": {
    "context": 256e3,
    "output": 262144
  },
  "arkanecloud/nvidia/nemotron-3-ultra-550b-a55b": {
    "context": 512288,
    "output": 128e3
  },
  "arkanecloud/openai/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "arkanecloud/openai/gpt-oss-20b": {
    "context": 131072,
    "output": 32768
  },
  "arkanecloud/Qwen/Qwen3-235B-A22B-Instruct-2507": {
    "context": 262e3,
    "output": 16384
  },
  "asi1-mini": {
    "context": 128e3,
    "output": 16384
  },
  "au.anthropic.claude-haiku-4-5-20251001-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "au.anthropic.claude-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "au.anthropic.claude-opus-4-6-v1": {
    "context": 1e6,
    "output": 128e3
  },
  "au.anthropic.claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "au.anthropic.claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "au.anthropic.claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "au.anthropic.claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "au.anthropic.claude-sonnet-4-5-20250929-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "au.anthropic.claude-sonnet-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "au.anthropic.claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "au.anthropic.claude-sonnet-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "auto-model": {
    "context": 1e6,
    "output": 1e6
  },
  "auto-model-basic": {
    "context": 1e6,
    "output": 1e6
  },
  "auto-model-premium": {
    "context": 1e6,
    "output": 1e6
  },
  "auto-model-standard": {
    "context": 1e6,
    "output": 1e6
  },
  "auto/mistralai/codestral-2508": {
    "context": 128e3,
    "output": 8192
  },
  "auto/mistralai/ministral-14b-2512": {
    "context": 262144,
    "output": 262144
  },
  "auto/mistralai/ministral-3b-2512": {
    "context": 262144,
    "output": 262144
  },
  "auto/mistralai/ministral-8b-2512": {
    "context": 262144,
    "output": 262144
  },
  "auto/mistralai/mistral-large-2512": {
    "context": 262144,
    "output": 262144
  },
  "auto/mistralai/mistral-large-4": {
    "context": 524288,
    "output": 262144
  },
  "auto/mistralai/mistral-medium-3.5": {
    "context": 262144,
    "output": 262144
  },
  "auto/mistralai/mistral-small-2603": {
    "context": 256e3,
    "output": 256e3
  },
  "auto/openai/gpt-4.1": {
    "context": 1047576,
    "output": 32768
  },
  "auto/openai/gpt-4.1-mini": {
    "context": 1047576,
    "output": 32768
  },
  "auto/openai/gpt-4o": {
    "context": 128e3,
    "output": 16384
  },
  "auto/openai/gpt-4o-mini": {
    "context": 128e3,
    "output": 16384
  },
  "auto/openai/gpt-5": {
    "context": 4e5,
    "output": 128e3
  },
  "auto/openai/gpt-5-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "auto/openai/gpt-5-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "auto/openai/gpt-5.2": {
    "context": 4e5,
    "output": 128e3
  },
  "auto/openai/gpt-5.4": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-5.4-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "auto/openai/gpt-5.5": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-5.6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-5.6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-5.6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-6-astra": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-6.1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-6.1-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "auto/openai/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "auto/openai/gpt-oss-20b": {
    "context": 131072,
    "output": 32768
  },
  "auto/openai/gpt-oss-safeguard-120b": {
    "context": 131072,
    "output": 32768
  },
  "auto/openai/gpt-oss-safeguard-20b": {
    "context": 131072,
    "output": 131072
  },
  "auto/openai/o3": {
    "context": 2e5,
    "output": 1e5
  },
  "aws-bedrock/claude-fable-5": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/claude-fable-5-1": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/claude-haiku-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "aws-bedrock/claude-haiku-4-5-20251001": {
    "context": 2e5,
    "output": 64e3
  },
  "aws-bedrock/claude-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/claude-opus-4-5-20251101": {
    "context": 2e5,
    "output": 32e3
  },
  "aws-bedrock/claude-opus-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/claude-sonnet-4-5": {
    "context": 2e5,
    "output": 8192
  },
  "aws-bedrock/claude-sonnet-4-5-20250929": {
    "context": 2e5,
    "output": 8192
  },
  "aws-bedrock/claude-sonnet-4-6": {
    "context": 1e6,
    "output": 64e3
  },
  "aws-bedrock/claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/claude-sonnet-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "aws-bedrock/grok-4-3": {
    "context": 1e6,
    "output": 131072
  },
  "aws-bedrock/grok-4-6": {
    "context": 5e5,
    "output": 5e5
  },
  "aws-bedrock/grok-4-7": {
    "context": 524288,
    "output": 524288
  },
  "aws-bedrock/kimi-k3": {
    "context": 1048576,
    "output": 1048576
  },
  "aws-bedrock/llama-3.1-70b-instruct": {
    "context": 128e3,
    "output": 2048
  },
  "aws-bedrock/llama-4-maverick-17b-instruct": {
    "context": 8192,
    "output": 2048
  },
  "aws-bedrock/llama-4-scout-17b-instruct": {
    "context": 8192,
    "output": 2048
  },
  "aws-mantle/gpt-5.6-luna": {
    "context": 921600,
    "output": 128e3
  },
  "aws-mantle/gpt-5.6-sol": {
    "context": 921600,
    "output": 128e3
  },
  "aws-mantle/gpt-5.6-terra": {
    "context": 921600,
    "output": 128e3
  },
  "aws-mantle/gpt-6-astra": {
    "context": 105e4,
    "output": 128e3
  },
  "azure-ai-foundry/grok-4-1-fast-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "azure-ai-foundry/grok-4-3": {
    "context": 2e4,
    "output": 8192
  },
  "azure-anthropic/claude-fable-5": {
    "context": 1e6,
    "output": 128e3
  },
  "azure-anthropic/claude-fable-5-1": {
    "context": 1e6,
    "output": 128e3
  },
  "azure-anthropic/claude-opus-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "azure-anthropic/claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "azure-anthropic/claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "azure-anthropic/claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "azure-anthropic/claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "azure-anthropic/claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "azure-anthropic/claude-sonnet-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "azure/gpt-4.1": {
    "context": 1e6,
    "output": 32768
  },
  "azure/gpt-4.1-mini": {
    "context": 1e6,
    "output": 32768
  },
  "azure/gpt-4.1-nano": {
    "context": 1047576,
    "output": 32768
  },
  "azure/gpt-4.1-nano@eu": {
    "context": 1047576,
    "output": 32768
  },
  "azure/gpt-4o": {
    "context": 128e3,
    "output": 16384
  },
  "azure/gpt-5": {
    "context": 4e5,
    "output": 128e3
  },
  "azure/gpt-5-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "azure/gpt-5-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "azure/gpt-5.1": {
    "context": 4e5,
    "output": 128e3
  },
  "azure/gpt-5.1-codex-max": {
    "context": 272e3,
    "output": 128e3
  },
  "azure/gpt-5.2": {
    "context": 4e5,
    "output": 128e3
  },
  "azure/gpt-5.3-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "azure/gpt-5.4": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-5.4-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "azure/gpt-5.4-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "azure/gpt-5.4-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-5.5": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-5.6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-5.6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-5.6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-6-astra": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-6.1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "azure/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "baai/bge-m3": {
    "context": 8192
  },
  "baai/bge-reranker-v2-m3": {
    "context": 8e3
  },
  "baichuan/baichuan-m2-32b": {
    "context": 131072,
    "output": 131072
  },
  "baidu/cobuddy": {
    "context": 131072,
    "output": 65536
  },
  "baidu/deepseek-v4-flash": {
    "context": 1048576,
    "output": 131072
  },
  "baidu/deepseek-v4-pro": {
    "context": 1048576,
    "output": 131072
  },
  "baidu/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 393216
  },
  "baidu/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 393216
  },
  "baidu/ernie-4.5-21B-a3b": {
    "context": 12e4,
    "output": 8e3
  },
  "baidu/ernie-4.5-300b-a47b-paddle": {
    "context": 123e3,
    "output": 12e3
  },
  "baidu/ernie-4.5-vl-424b-a47b": {
    "context": 123e3,
    "output": 16e3
  },
  "baidu/ernie-5.0-thinking-preview": {
    "context": 128e3,
    "output": 64e3
  },
  "baidu/glm-5.1": {
    "context": 202752,
    "output": 131072
  },
  "baidu/glm-5.2": {
    "context": 1048576,
    "output": 131072
  },
  "baidu/glm-5.3": {
    "context": 1048576,
    "output": 131072
  },
  "baidu/glm-5.3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "bailian/qwen-flash": {
    "context": 1e6,
    "output": 32768
  },
  "bailian/qwen-max": {
    "context": 32768,
    "output": 8192
  },
  "bailian/qwen-plus": {
    "context": 1e6,
    "output": 32768
  },
  "bailian/qwen-turbo": {
    "context": 128e3,
    "output": 16384
  },
  "bailian/qwen-vl-max": {
    "context": 131072,
    "output": 8192
  },
  "bailian/qwen3-coder-flash": {
    "context": 1e6,
    "output": 65536
  },
  "bailian/qwen3-coder-next": {
    "context": 262144,
    "output": 65536
  },
  "bailian/qwen3-coder-plus": {
    "context": 1048576,
    "output": 65536
  },
  "bailian/qwen3-max": {
    "context": 262144,
    "output": 65536
  },
  "bailian/qwen3.5-122b-a10b": {
    "context": 256e3,
    "output": 64e3
  },
  "bailian/qwen3.5-27b": {
    "context": 262144,
    "output": 65536
  },
  "bailian/qwen3.5-35b-a3b": {
    "context": 262144,
    "output": 65536
  },
  "bailian/qwen3.5-397b-a17b": {
    "context": 256e3,
    "output": 64e3
  },
  "bailian/qwen3.5-flash": {
    "context": 1e6,
    "output": 65536
  },
  "bailian/qwen3.5-plus": {
    "context": 1e6,
    "output": 65536
  },
  "bailian/qwen3.6-27b": {
    "context": 256e3,
    "output": 64e3
  },
  "bailian/qwen3.6-flash": {
    "context": 1e6,
    "output": 65536
  },
  "bailian/qwen3.6-max-preview": {
    "context": 262144,
    "output": 65536
  },
  "bailian/qwen3.6-plus": {
    "context": 1e6,
    "output": 65536
  },
  "bailian/qwen3.7-max": {
    "context": 1e6,
    "output": 131072
  },
  "bailian/qwen3.7-plus": {
    "context": 1e6,
    "output": 64e3
  },
  "bailian/qwen3.8-27b": {
    "context": 1131072,
    "output": 131072
  },
  "bailian/qwen3.8-flash": {
    "context": 1e6,
    "output": 131072
  },
  "bailian/qwen3.8-max": {
    "context": 1e6,
    "output": 131072
  },
  "bailian/qwen3.8-max-0902": {
    "context": 1e6,
    "output": 131072
  },
  "baseten/Kimi-K2-Instruct-FP4": {
    "context": 131072,
    "output": 131072
  },
  "beam": {
    "context": 1048576,
    "output": 131072
  },
  "Beam-1.0-501B-A23B": {
    "context": 1048576,
    "output": 131072
  },
  "beam-free": {
    "context": 1048576,
    "output": 131072
  },
  "bee-brood": {
    "context": 262144,
    "output": 16384
  },
  "bee-buzz": {
    "context": 262144,
    "output": 24576
  },
  "bee-cell": {
    "context": 131072,
    "output": 8192
  },
  "bee-comb": {
    "context": 262144,
    "output": 16384
  },
  "bee-hive": {
    "context": 262144,
    "output": 32768
  },
  "bee-swarm": {
    "context": 1e6,
    "output": 64e3
  },
  "bfl/flux-2-max": {
    "context": 67300,
    "output": 67300
  },
  "bfl/flux-2-pro": {
    "context": 67300,
    "output": 67300
  },
  "bfl/flux-kontext-max": {
    "context": 512
  },
  "bfl/flux-kontext-pro": {
    "context": 512
  },
  "bfl/flux-pro-1.0-fill": {
    "context": 512
  },
  "bfl/flux-pro-1.1": {
    "context": 512
  },
  "bfl/flux-pro-1.1-ultra": {
    "context": 512
  },
  "bge_multilingual_gemma2": {
    "context": 8e3,
    "output": 3584
  },
  "bge-m3": {
    "context": 8192,
    "output": 1024
  },
  "bge-multilingual-gemma2": {
    "context": 8191
  },
  "bge-reranker-v2-m3": {
    "context": 8192,
    "output": 1
  },
  "big-pickle": {
    "context": 2e5,
    "output": 32e3
  },
  "brick-complexity-pro": {
    "context": 1e5,
    "output": 15e3
  },
  "brick-v1-beta": {
    "context": 1e5,
    "output": 15e3
  },
  "bytedance-pro-latest": {
    "context": 262144,
    "output": 131072
  },
  "bytedance-seed/seed-1.6": {
    "context": 262144,
    "output": 32768
  },
  "bytedance-seed/seed-1.6-flash": {
    "context": 262144,
    "output": 32768
  },
  "bytedance-seed/seed-2-1-turbo": {
    "context": 262144,
    "output": 235929
  },
  "bytedance-seed/seed-2.0-code": {
    "context": 262144,
    "output": 131072
  },
  "bytedance-seed/seed-2.0-lite": {
    "context": 262144,
    "output": 131072
  },
  "bytedance-seed/seed-2.0-mini": {
    "context": 262144,
    "output": 131072
  },
  "ByteDance-Seed/Seed-OSS-36B-Instruct": {
    "context": 262e3,
    "output": 262e3
  },
  "bytedance/deepseek-v3.2": {
    "context": 131072,
    "output": 32768
  },
  "bytedance/deepseek-v4-flash": {
    "context": 1048576,
    "output": 393216
  },
  "bytedance/deepseek-v4-pro": {
    "context": 1048576,
    "output": 393216
  },
  "bytedance/dola-seed-2.0-code": {
    "context": 256e3,
    "output": 128e3
  },
  "bytedance/dola-seed-2.0-code-preview": {
    "context": 131072,
    "output": 32768
  },
  "bytedance/dola-seed-2.0-lite": {
    "context": 256e3,
    "output": 128e3
  },
  "bytedance/dola-seed-2.0-mini": {
    "context": 256e3,
    "output": 128e3
  },
  "bytedance/dola-seed-2.0-pro": {
    "context": 256e3,
    "output": 128e3
  },
  "bytedance/doubao-seed-1.8": {
    "context": 256e3,
    "output": 32e3
  },
  "bytedance/doubao-seed-2.0-code": {
    "context": 256e3,
    "output": 32e3
  },
  "bytedance/doubao-seed-2.0-lite": {
    "context": 256e3,
    "output": 32e3
  },
  "bytedance/doubao-seed-2.0-mini": {
    "context": 256e3,
    "output": 32e3
  },
  "bytedance/doubao-seed-2.0-pro": {
    "context": 256e3,
    "output": 32e3
  },
  "bytedance/doubao-seed-2.1-pro": {
    "context": 256e3,
    "output": 128e3
  },
  "bytedance/doubao-seed-2.1-turbo": {
    "context": 256e3,
    "output": 128e3
  },
  "bytedance/doubao-seed-character": {
    "context": 128e3,
    "output": 32768
  },
  "bytedance/doubao-seed-code": {
    "context": 256e3,
    "output": 32e3
  },
  "bytedance/glm-4.7": {
    "context": 2e5,
    "output": 128e3
  },
  "bytedance/glm-5.2": {
    "context": 1024e3,
    "output": 128e3
  },
  "bytedance/gpt-oss-120b": {
    "context": 128e3,
    "output": 32e3
  },
  "bytedance/seed-1-6-250615": {
    "context": 256e3,
    "output": 256e3
  },
  "bytedance/seed-1-6-250915": {
    "context": 256e3,
    "output": 256e3
  },
  "bytedance/seed-1-6-flash-250715": {
    "context": 256e3,
    "output": 256e3
  },
  "bytedance/seed-1-8-251228": {
    "context": 256e3,
    "output": 256e3
  },
  "bytedance/seed-1.6": {
    "context": 256e3,
    "output": 32e3
  },
  "bytedance/seed-1.8": {
    "context": 256e3,
    "output": 32768
  },
  "bytedance/seed-2-0-code-preview-260328": {
    "context": 262144,
    "output": 131072
  },
  "bytedance/seed-2-0-lite-260428": {
    "context": 262144,
    "output": 131072
  },
  "bytedance/seed-2-0-mini-260428": {
    "context": 262144,
    "output": 131072
  },
  "bytedance/seed-2-0-pro-260328": {
    "context": 262144,
    "output": 131072
  },
  "ByteDance/Seed-2.0-code": {
    "context": 256e3,
    "output": 131072
  },
  "ByteDance/Seed-2.0-mini": {
    "context": 256e3,
    "output": 32e3
  },
  "ByteDance/Seed-2.0-pro": {
    "context": 256e3,
    "output": 128e3
  },
  "bytedance/seed-2.1-turbo": {
    "context": 262144,
    "output": 262144
  },
  "bytedance/seedance-2": {
    "context": 4096
  },
  "bytedance/ui-tars-1.5-7b": {
    "context": 128e3,
    "output": 2048
  },
  "c4ai-aya-expanse-32b": {
    "context": 128e3,
    "output": 4e3
  },
  "c4ai-aya-vision-32b": {
    "context": 16e3,
    "output": 4e3
  },
  "ca.amazon.nova-lite-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "callstack/apex": {
    "context": 262144,
    "output": 131072
  },
  "canopylabs/orpheus-arabic-saudi": {
    "context": 4e3,
    "output": 5e4
  },
  "canopylabs/orpheus-v1-english": {
    "context": 4e3,
    "output": 5e4
  },
  "canopywave/deepseek-v4-flash": {
    "context": 1e6,
    "output": 393216
  },
  "canopywave/deepseek-v4-pro": {
    "context": 1e6,
    "output": 393216
  },
  "canopywave/glm-5.2": {
    "context": 2e5,
    "output": 32768
  },
  "canopywave/kimi-k2.6": {
    "context": 262144,
    "output": 32768
  },
  "canopywave/kimi-k3": {
    "context": 1048576,
    "output": 1048576
  },
  "cat-jam-free": {
    "context": 1048576,
    "output": 131072
  },
  "celeris-1": {
    "context": 8192,
    "output": 8192
  },
  "cerebras/gpt-oss-120b": {
    "context": 131072
  },
  "cerebras/gpt-oss-120b-cs": {
    "context": 128e3
  },
  "cerebras/llama-3.1-8b-cs": {
    "context": 128e3
  },
  "cerebras/qwen-3.8-27b": {
    "context": 131072,
    "output": 40960
  },
  "chatgpt-4o-latest": {
    "context": 128e3,
    "output": 16384
  },
  "clarifai/main/models/mm-poly-8b": {
    "context": 32768,
    "output": 4096
  },
  "claude-3-5-haiku": {
    "context": 2e5,
    "output": 8192
  },
  "claude-3-7-sonnet-20250219": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-3-haiku-20240307": {
    "context": 2e5,
    "output": 4096
  },
  "claude-3.5-haiku": {
    "context": 2e5,
    "output": 8192
  },
  "claude-3.5-sonnet": {
    "context": 2e5,
    "output": 8192
  },
  "claude-3.5-sonnet-v2": {
    "context": 2e5,
    "output": 8192
  },
  "claude-3.7-sonnet": {
    "context": 2e5
  },
  "claude-4-5-sonnet": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-4-6-sonnet": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-4.0-opus": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-4.0-sonnet": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-4.1-opus": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-4.5-haiku": {
    "context": 2e5
  },
  "claude-4.5-opus": {
    "context": 2e5
  },
  "claude-4.5-sonnet": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-fable-5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-fable-5-1": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-fable-5-1@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-fable-5.1@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-fable-5@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-fable-5@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-haiku-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-haiku-4-5-20251001": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-haiku-4-5@20251001": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-haiku-4-5@eu": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-haiku-4.5": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-haiku-5-5@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-haiku-5-5@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-haiku-5.5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-mythos-5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-opus-4-1": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-opus-4-1-20250805": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-opus-4-1-20250805-thinking": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-opus-4-1@20250805": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-opus-4-20250514": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-opus-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-opus-4-5-20251101": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-opus-4-5-think": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-opus-4-5@20251101": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-opus-4-5@eu": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-opus-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-6-think": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-6@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-6@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-7-think": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-7-thinking": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-7@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-7@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-8-fast": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-8-think": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-8@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4-8@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-4.7": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-opus-4@20250514": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-5-5-fast": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-5-5@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-5-5@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-5-fast": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-5-thinking": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-5.5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-5@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-5@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-opus4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-opus4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-sonnet-4-20250514": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-sonnet-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-sonnet-4-5-20250929": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-sonnet-4-5-20250929-thinking": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-sonnet-4-5-think": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-sonnet-4-5@20250929": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-sonnet-4-5@eu": {
    "context": 1e6,
    "output": 64e3
  },
  "claude-sonnet-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-sonnet-4-6-think": {
    "context": 1e6,
    "output": 64e3
  },
  "claude-sonnet-4-6-thinking": {
    "context": 1e6,
    "output": 64e3
  },
  "claude-sonnet-4-6@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-sonnet-4-6@eu": {
    "context": 1e6,
    "output": 64e3
  },
  "claude-sonnet-4.6": {
    "context": 2e5,
    "output": 32e3
  },
  "claude-sonnet-4@20250514": {
    "context": 2e5,
    "output": 64e3
  },
  "claude-sonnet-4@eu": {
    "context": 1e6,
    "output": 64e3
  },
  "claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-sonnet-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-sonnet-5-5@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-sonnet-5-5@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-sonnet-5.5": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-sonnet-5@default": {
    "context": 1e6,
    "output": 128e3
  },
  "claude-sonnet-5@eu": {
    "context": 1e6,
    "output": 128e3
  },
  "claudinio": {
    "context": 256e3,
    "output": 64e3
  },
  "claudius": {
    "context": 256e3,
    "output": 64e3
  },
  "claw-high": {
    "context": 1048576,
    "output": 131072
  },
  "claw-low": {
    "context": 1048576,
    "output": 131072
  },
  "claw-medium": {
    "context": 1048576,
    "output": 131072
  },
  "cline-pass/deepseek-v4-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "cline-pass/deepseek-v4-pro": {
    "context": 1e6,
    "output": 384e3
  },
  "cline-pass/deepseek-v4.1-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "cline-pass/glm-5.2": {
    "context": 1e6,
    "output": 131072
  },
  "cline-pass/glm-5.3": {
    "context": 1e6,
    "output": 131072
  },
  "cline-pass/glm-5.3-flash": {
    "context": 1e6,
    "output": 131072
  },
  "cline-pass/kimi-k2.6": {
    "context": 262144,
    "output": 262144
  },
  "cline-pass/kimi-k2.7-code": {
    "context": 262144,
    "output": 262144
  },
  "cline-pass/kimi-k3": {
    "context": 1048576,
    "output": 131072
  },
  "cline-pass/mimo-v2.5": {
    "context": 1048576,
    "output": 131072
  },
  "cline-pass/mimo-v2.5-pro": {
    "context": 1048576,
    "output": 131072
  },
  "cline-pass/mimo-v2.6-flash": {
    "context": 1048576,
    "output": 131072
  },
  "cline-pass/mimo-v2.6-pro": {
    "context": 1048576,
    "output": 131072
  },
  "cline-pass/minimax-m3": {
    "context": 1048576,
    "output": 512e3
  },
  "cline-pass/muse-spark-1.3-contributor": {
    "context": 1048576,
    "output": 131072
  },
  "cline-pass/qwen3.7-max": {
    "context": 1e6,
    "output": 131072
  },
  "cline-pass/qwen3.7-plus": {
    "context": 1e6,
    "output": 64e3
  },
  "cline-pass/qwen3.8-max": {
    "context": 1e6,
    "output": 131072
  },
  "cloudflare/@cf/aisingapore/gemma-sea-lion-v4-27b-it": {
    "context": 128e3,
    "output": 128e3
  },
  "cloudflare/@cf/deepseek-ai/deepseek-v4-flash-0731": {
    "context": 1048576,
    "output": 384e3
  },
  "cloudflare/@cf/deepseek-ai/deepseek-v4-pro-0813": {
    "context": 1048576,
    "output": 384e3
  },
  "cloudflare/@cf/deepseek-ai/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 384e3
  },
  "cloudflare/@cf/meta/llama-3.2-1b-instruct": {
    "context": 6e4,
    "output": 32e3
  },
  "cloudflare/@cf/meta/llama-3.2-3b-instruct": {
    "context": 8e4,
    "output": 131072
  },
  "cloudflare/@cf/meta/llama-guard-3-8b": {
    "context": 131072,
    "output": 4096
  },
  "cloudflare/@cf/mistralai/mistral-small-3.1-24b-instruct": {
    "context": 128e3,
    "output": 102400
  },
  "cloudflare/@cf/openai/gpt-oss-120b": {
    "context": 128e3,
    "output": 32768
  },
  "cloudflare/@cf/openai/gpt-oss-20b": {
    "context": 128e3,
    "output": 32768
  },
  "cloudflare/@cf/qwen/qwen2.5-coder-32b-instruct": {
    "context": 32768,
    "output": 8192
  },
  "cloudflare/@cf/zai-org/glm-4.7-flash": {
    "context": 131072,
    "output": 131072
  },
  "cloudflare/deepseek-v4-flash": {
    "context": 1048576,
    "output": 393216
  },
  "cloudflare/deepseek-v4-pro": {
    "context": 1048576,
    "output": 393216
  },
  "cloudflare/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 393216
  },
  "cloudflare/glm-5.3": {
    "context": 1048576,
    "output": 131072
  },
  "cloudflare/glm-5.3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "code-max": {
    "context": 1e6,
    "output": 128e3
  },
  "code-prime": {
    "context": 196608,
    "output": 131072
  },
  "code-standard": {
    "context": 128e3,
    "output": 65536
  },
  "codestral-2": {
    "context": 128e3,
    "output": 8192
  },
  "codestral-2501": {
    "context": 256e3,
    "output": 256e3
  },
  "codestral-2508": {
    "context": 256e3
  },
  "codestral-latest": {
    "context": 256e3,
    "output": 4096
  },
  "codex-mini": {
    "context": 2e5,
    "output": 1e5
  },
  "coding-glm-5.1": {
    "context": 2e5,
    "output": 131072
  },
  "coding-glm-5.1-free": {
    "context": 2e5,
    "output": 131072
  },
  "coding-glm-5.2-free": {
    "context": 1e6,
    "output": 131072
  },
  "coding-glm-5.3-flash-free": {
    "context": 1e6,
    "output": 131072
  },
  "coding-glm-5.3-free": {
    "context": 1e6,
    "output": 131072
  },
  "coding-minimax-m2.7": {
    "context": 204800,
    "output": 128100
  },
  "coding-minimax-m2.7-free": {
    "context": 204800,
    "output": 128100
  },
  "coding-minimax-m2.7-highspeed": {
    "context": 204800,
    "output": 128100
  },
  "coding-xiaomi-mimo-v2.5": {
    "context": 1048576,
    "output": 131072
  },
  "coding-xiaomi-mimo-v2.5-pro": {
    "context": 1048576,
    "output": 131072
  },
  "cognitivecomputations/dolphin-mistral-24b-venice-edition": {
    "context": 128e3,
    "output": 8192
  },
  "cohere--command-a-reasoning": {
    "context": 256e3,
    "output": 32e3
  },
  "cohere-command-a": {
    "context": 131072,
    "output": 8192
  },
  "cohere-embed-v-4-0": {
    "context": 128e3,
    "output": 1536
  },
  "cohere-embed-v3-english": {
    "context": 512,
    "output": 1024
  },
  "cohere-embed-v3-multilingual": {
    "context": 512,
    "output": 1024
  },
  "cohere/c4ai-aya-expanse-32b": {
    "context": 128e3,
    "output": 4e3
  },
  "cohere/command-a": {
    "context": 256e3
  },
  "cohere/command-a-plus": {
    "context": 192e3,
    "output": 64e3
  },
  "cohere/command-r-08-2024": {
    "context": 128e3,
    "output": 4e3
  },
  "cohere/command-r-plus-08-2024": {
    "context": 128e3
  },
  "cohere/embed-v4.0": {
    "context": 128e3,
    "output": 1536
  },
  "cohere/embed-v5.0-fast": {
    "context": 128e3,
    "output": 2048
  },
  "cohere/embed-v5.0-pro": {
    "context": 128e3,
    "output": 2048
  },
  "cohere/north-mini-code:free": {
    "context": 256e3,
    "output": 64e3
  },
  "cohere/rerank-v3.5": {
    "context": 4096
  },
  "cohere/rerank-v4-fast": {
    "context": 32e3
  },
  "cohere/rerank-v4-pro": {
    "context": 32e3
  },
  "cohere/rerank-v5-fast": {
    "context": 32768
  },
  "cohere/rerank-v5-pro": {
    "context": 32768
  },
  "command-a-03-2025": {
    "context": 256e3,
    "output": 8e3
  },
  "command-a-plus-05-2026": {
    "context": 128e3,
    "output": 64e3
  },
  "command-a-reasoning-08-2025": {
    "context": 256e3
  },
  "command-a-translate-08-2025": {
    "context": 8e3,
    "output": 8e3
  },
  "command-a-vision-07-2025": {
    "context": 128e3,
    "output": 8e3
  },
  "command-r-08-2024": {
    "context": 128e3,
    "output": 4e3
  },
  "command-r-plus-08-2024": {
    "context": 128e3,
    "output": 4e3
  },
  "command-r7b-12-2024": {
    "context": 128e3,
    "output": 4e3
  },
  "command-r7b-arabic-02-2025": {
    "context": 128e3,
    "output": 4e3
  },
  "consensusprotocol/deepseek-v4-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "consensusprotocol/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 384e3
  },
  "consensusprotocol/gemma-4-31b-it": {
    "context": 262144,
    "output": 32768
  },
  "consensusprotocol/glm-5.3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "consensusprotocol/gpt-oss-20b": {
    "context": 128e3,
    "output": 32768
  },
  "consensusprotocol/mimo-v2.6-flash": {
    "context": 1048576,
    "output": 131072
  },
  "consensusprotocol/minimax-m3": {
    "context": 1048576,
    "output": 512e3
  },
  "consensusprotocol/Qwen3.8-27B": {
    "context": 262e3,
    "output": 32768
  },
  "cortecs/Llama-3.3-70B-Instruct-FP8-Dynamic": {
    "context": 128e3,
    "output": 4096
  },
  "custom": {
    "context": 128e3,
    "output": 16384
  },
  "databricks-claude-haiku-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "databricks-claude-opus-4-1": {
    "context": 2e5,
    "output": 32e3
  },
  "databricks-claude-opus-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "databricks-claude-opus-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "databricks-claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "databricks-claude-sonnet-4": {
    "context": 2e5,
    "output": 64e3
  },
  "databricks-claude-sonnet-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "databricks-claude-sonnet-4-6": {
    "context": 1e6,
    "output": 64e3
  },
  "databricks-gemini-2-5-flash": {
    "context": 1048576,
    "output": 65536
  },
  "databricks-gemini-2-5-pro": {
    "context": 1048576,
    "output": 65536
  },
  "databricks-gemini-3-1-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "databricks-gemini-3-1-pro": {
    "context": 1048576,
    "output": 65536
  },
  "databricks-gemini-3-5-flash": {
    "context": 1048576,
    "output": 65536
  },
  "databricks-gemini-3-flash": {
    "context": 1048576,
    "output": 65536
  },
  "databricks-gemini-3-pro": {
    "context": 1048576,
    "output": 65536
  },
  "databricks-glm-5-2": {
    "context": 1e6,
    "output": 131072
  },
  "databricks-gpt-5": {
    "context": 4e5,
    "output": 128e3
  },
  "databricks-gpt-5-1": {
    "context": 4e5,
    "output": 128e3
  },
  "databricks-gpt-5-2": {
    "context": 4e5,
    "output": 128e3
  },
  "databricks-gpt-5-4": {
    "context": 105e4,
    "output": 128e3
  },
  "databricks-gpt-5-4-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "databricks-gpt-5-4-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "databricks-gpt-5-5": {
    "context": 105e4,
    "output": 128e3
  },
  "databricks-gpt-5-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "databricks-gpt-5-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "databricks-gpt-5-6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "databricks-gpt-5-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "databricks-gpt-5-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "databricks-gpt-oss-120b": {
    "context": 131072,
    "output": 25e3
  },
  "databricks-gpt-oss-20b": {
    "context": 131072,
    "output": 25e3
  },
  "databricks-kimi-k2-7-code": {
    "context": 262144,
    "output": 262144
  },
  "databricks/databricks-deepseek-v4-flash-0731": {
    "context": 1e6,
    "output": 384e3
  },
  "databricks/databricks-deepseek-v4-pro-0813": {
    "context": 1e6,
    "output": 384e3
  },
  "databricks/databricks-gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "databricks/databricks-gpt-oss-120b@eu": {
    "context": 131072,
    "output": 32768
  },
  "databricks/databricks-gpt-oss-20b": {
    "context": 131072,
    "output": 32768
  },
  "databricks/databricks-gpt-oss-20b@eu": {
    "context": 131072,
    "output": 32768
  },
  "databricks/databricks-inkling": {
    "context": 1e6,
    "output": 1048576
  },
  "databricks/databricks-qwen3-next-80b-a3b-instruct": {
    "context": 262144,
    "output": 32768
  },
  "databricks/databricks-qwen3-next-80b-a3b-instruct@eu": {
    "context": 262144,
    "output": 32768
  },
  "deep-deepseek-v4-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "deep-deepseek-v4-pro": {
    "context": 1e6,
    "output": 384e3
  },
  "deep-research-max-preview-04-2026": {
    "context": 131072,
    "output": 65536
  },
  "deep-research-preview-04-2026": {
    "context": 131072,
    "output": 65536
  },
  "deepcogito/cogito-v1-preview-qwen-32B": {
    "context": 128e3,
    "output": 32768
  },
  "deepinfra/ByteDance/Seed-2.0-code": {
    "context": 256e3,
    "output": 131072
  },
  "deepinfra/ByteDance/Seed-2.0-mini": {
    "context": 256e3,
    "output": 32e3
  },
  "deepinfra/deepseek-ai/DeepSeek-R1": {
    "context": 163840,
    "output": 32768
  },
  "deepinfra/deepseek-ai/DeepSeek-R1-0528": {
    "context": 163840,
    "output": 32768
  },
  "deepinfra/deepseek-ai/DeepSeek-V3": {
    "context": 163840,
    "output": 8192
  },
  "deepinfra/deepseek-ai/DeepSeek-V3-0324": {
    "context": 163840,
    "output": 163840
  },
  "deepinfra/deepseek-ai/DeepSeek-V4-Flash-0731": {
    "context": 1048576,
    "output": 384e3
  },
  "deepinfra/deepseek-ai/DeepSeek-V4-Pro-0813": {
    "context": 1048576,
    "output": 384e3
  },
  "deepinfra/deepseek-ai/DeepSeek-V4.1-Flash": {
    "context": 1048576,
    "output": 384e3
  },
  "deepinfra/deepseek-ai/DeepSeek-V4.1-Flash-1017": {
    "context": 1048576,
    "output": 384e3
  },
  "deepinfra/deepseek-v3.2": {
    "context": 16e4,
    "output": 65536
  },
  "deepinfra/deepseek-v4-flash": {
    "context": 1e6,
    "output": 393216
  },
  "deepinfra/deepseek-v4-pro": {
    "context": 1048576,
    "output": 64e3
  },
  "deepinfra/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 393216
  },
  "deepinfra/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 393216
  },
  "deepinfra/gemma-4-26b-a4b-it": {
    "context": 262144,
    "output": 32768
  },
  "deepinfra/gemma-4-31b-it": {
    "context": 262144,
    "output": 32768
  },
  "deepinfra/google/gemma-3-12b-it": {
    "context": 131072,
    "output": 131072
  },
  "deepinfra/google/gemma-3-27b-it": {
    "context": 131072,
    "output": 131072
  },
  "deepinfra/google/gemma-3-4b-it": {
    "context": 131072,
    "output": 131072
  },
  "deepinfra/granite-4.2-8b": {
    "context": 131072,
    "output": 117964
  },
  "deepinfra/Gryphe/MythoMax-L2-13b": {
    "context": 4096,
    "output": 3200
  },
  "deepinfra/ibm-granite/granite-4.2-8b": {
    "context": 131072,
    "output": 117964
  },
  "deepinfra/ling-3.0-flash": {
    "context": 262144,
    "output": 32768
  },
  "deepinfra/ling-3.0-flash-vl": {
    "context": 131072,
    "output": 32768
  },
  "deepinfra/meta-llama/Llama-3.2-11B-Vision-Instruct": {
    "context": 131072,
    "output": 4096
  },
  "deepinfra/meta-llama/Llama-3.2-3B-Instruct": {
    "context": 131072,
    "output": 131072
  },
  "deepinfra/meta-llama/Llama-3.3-70B-Instruct": {
    "context": 131072,
    "output": 4096
  },
  "deepinfra/meta-llama/Llama-Guard-3-8B": {
    "context": 131072,
    "output": 4096
  },
  "deepinfra/meta-llama/Llama-Guard-4-12B": {
    "context": 163840,
    "output": 163840
  },
  "deepinfra/meta-models/Muse-Glimmer-30B": {
    "context": 131072,
    "output": 131072
  },
  "deepinfra/microsoft/WizardLM-2-8x22B": {
    "context": 65536,
    "output": 8e3
  },
  "deepinfra/mimo-v2.6-flash": {
    "context": 1048576,
    "output": 65536
  },
  "deepinfra/mimo-v2.6-pro": {
    "context": 1048576,
    "output": 65536
  },
  "deepinfra/mistralai/Mistral-Small-24B-Instruct-2501": {
    "context": 32768,
    "output": 16384
  },
  "deepinfra/mistralai/Mixtral-8x7B-Instruct-v0.1": {
    "context": 32768,
    "output": 32768
  },
  "deepinfra/moonshotai/Kimi-K2-Instruct": {
    "context": 131072,
    "output": 32768
  },
  "deepinfra/moonshotai/Kimi-K2.5": {
    "context": 262144,
    "output": 262144
  },
  "deepinfra/muse-glimmer-30b": {
    "context": 131072,
    "output": 16384
  },
  "deepinfra/nemotron-3-super-120b-a12b": {
    "context": 262144,
    "output": 262144
  },
  "deepinfra/nemotron-3-ultra-550b": {
    "context": 262144,
    "output": 262144
  },
  "deepinfra/nemotron-3-ultra-550b-a55b": {
    "context": 262144,
    "output": 128e3
  },
  "deepinfra/NousResearch/Hermes-3-Llama-3.1-405B": {
    "context": 131072,
    "output": 16384
  },
  "deepinfra/NousResearch/Hermes-3-Llama-3.1-70B": {
    "context": 131072,
    "output": 16384
  },
  "deepinfra/nvidia/Llama-3.1-Nemotron-70B-Instruct": {
    "context": 131072,
    "output": 8192
  },
  "deepinfra/nvidia/Nemotron-3-Nano-30B-A3B": {
    "context": 262144,
    "output": 262144
  },
  "deepinfra/openai/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "deepinfra/openai/gpt-oss-20b": {
    "context": 131072,
    "output": 32768
  },
  "deepinfra/Qwen/Qwen2.5-7B-Instruct": {
    "context": 32768,
    "output": 8192
  },
  "deepinfra/Qwen/Qwen3-235B-A22B-Instruct-2507": {
    "context": 262144,
    "output": 16384
  },
  "deepinfra/Qwen/Qwen3-235B-A22B-Thinking-2507": {
    "context": 262144,
    "output": 81920
  },
  "deepinfra/Qwen/Qwen3-Coder-480B-A35B-Instruct": {
    "context": 262144,
    "output": 65536
  },
  "deepinfra/Qwen/Qwen3-Max": {
    "context": 256e3,
    "output": 65536
  },
  "deepinfra/Qwen/Qwen3-Next-80B-A3B-Instruct": {
    "context": 262144,
    "output": 32768
  },
  "deepinfra/Qwen/Qwen3-VL-235B-A22B-Instruct": {
    "context": 262144,
    "output": 32768
  },
  "deepinfra/Qwen/Qwen3-VL-30B-A3B-Instruct": {
    "context": 262144,
    "output": 32768
  },
  "deepinfra/qwen3-vl-235b-a22b-instruct": {
    "context": 262144,
    "output": 32768
  },
  "deepinfra/qwen3-vl-30b-a3b-instruct": {
    "context": 262144,
    "output": 32768
  },
  "deepinfra/qwen3.5-9b": {
    "context": 262144,
    "output": 32768
  },
  "deepinfra/stepfun-ai/Step-3.5-Flash": {
    "context": 262144,
    "output": 256e3
  },
  "deepinfra/stepfun-ai/Step-3.7-Flash": {
    "context": 262144,
    "output": 256e3
  },
  "deepinfra/stepfun-ai/Step-5-Preview": {
    "context": 1048576,
    "output": 1e6
  },
  "deepinfra/tencent/Hy3": {
    "context": 262144,
    "output": 128e3
  },
  "deepinfra/tencent/Hy4-preview": {
    "context": 1048576,
    "output": 64e3
  },
  "deepinfra/thinkingmachines/Inkling": {
    "context": 524288,
    "output": 1048576
  },
  "deepinfra/thinkingmachines/Inkling-Small": {
    "context": 524288,
    "output": 1048576
  },
  "deepinfra/zai-org/GLM-4.7-Flash": {
    "context": 202752,
    "output": 131072
  },
  "deepseek-3.2": {
    "context": 163840,
    "output": 163840
  },
  "deepseek-4-flash": {
    "context": 1048576,
    "output": 384e3
  },
  "deepseek-ai/DeepSeek-OCR": {
    "context": 8192,
    "output": 8192
  },
  "deepseek-ai/deepseek-ocr/models/DeepSeek-OCR": {
    "context": 8192,
    "output": 8192
  },
  "deepseek-ai/DeepSeek-V3-1": {
    "context": 131072,
    "output": 131072
  },
  "deepseek-ai/deepseek-v3.1-maas": {
    "context": 163840,
    "output": 32768
  },
  "deepseek-ai/DeepSeek-V3.1-Terminus:thinking": {
    "context": 128e3,
    "output": 65536
  },
  "deepseek-ai/DeepSeek-V3.1:thinking": {
    "context": 128e3,
    "output": 65536
  },
  "deepseek-ai/deepseek-v3.2-exp": {
    "context": 163840,
    "output": 65536
  },
  "deepseek-ai/DeepSeek-V3.2-Exp": {
    "context": 164e3,
    "output": 164e3
  },
  "deepseek-ai/deepseek-v3.2-exp-thinking": {
    "context": 163840,
    "output": 65536
  },
  "deepseek-ai/deepseek-v3.2-maas": {
    "context": 163840,
    "output": 65536
  },
  "deepseek-ai/DeepSeek-V3.2-TEE": {
    "context": 131072,
    "output": 65536
  },
  "deepseek-ai/deepseek-v4-flash": {
    "context": 1048576,
    "output": 943718
  },
  "deepseek-ai/deepseek-v4-flash-0731": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-ai/DeepSeek-V4-Flash-0731-TEE": {
    "context": 1048576,
    "output": 131072
  },
  "deepseek-ai/deepseek-v4-pro": {
    "context": 1048576,
    "output": 384e3
  },
  "deepseek-ai/deepseek-v4.1-flash-1017": {
    "context": 1048576
  },
  "deepseek-ai/DeepSeek-V4.1-Flash-1017-abliterated": {
    "context": 1048576,
    "output": 384e3
  },
  "deepseek-ai/DeepSeek-V4.1-Flash-1017-Fast": {
    "context": 1048576,
    "output": 262144
  },
  "deepseek-ai/DeepSeek-V4.1-Flash-1017:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "deepseek-ai/DeepSeek-V4.1-Flash-Fast": {
    "context": 1048576,
    "output": 32768
  },
  "deepseek-ai/DeepSeek-V4.1-Flash:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "deepseek-chat": {
    "context": 128e3,
    "output": 8192
  },
  "deepseek-chat-cheaper": {
    "context": 128e3,
    "output": 8192
  },
  "deepseek-flash": {
    "context": 1048576,
    "output": 393216
  },
  "deepseek-pro-latest": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-r1-distill-llama-8b": {
    "context": 32768,
    "output": 16384
  },
  "deepseek-r1-distill-qwen-1-5b": {
    "context": 32768,
    "output": 16384
  },
  "deepseek-r1-distill-qwen-14b": {
    "context": 32768,
    "output": 16384
  },
  "deepseek-r1-distill-qwen-32b": {
    "context": 32768,
    "output": 16384
  },
  "deepseek-r1-distill-qwen-7b": {
    "context": 32768,
    "output": 16384
  },
  "deepseek-reasoner": {
    "context": 128e3,
    "output": 64e3
  },
  "deepseek-tng-r1t2-chimera": {
    "context": 13e4,
    "output": 163840
  },
  "deepseek-v3-0324": {
    "context": 128e3,
    "output": 8192
  },
  "deepseek-v3-1": {
    "context": 131072,
    "output": 65536
  },
  "deepseek-v3-2-exp": {
    "context": 131072,
    "output": 65536
  },
  "deepseek-v3.1": {
    "context": 128e3,
    "output": 32e3
  },
  "DeepSeek-V3.1": {
    "context": 131072,
    "output": 7168
  },
  "deepseek-v3.1-terminus": {
    "context": 128e3,
    "output": 16384
  },
  "DeepSeek-V3.2": {
    "context": 32768,
    "output": 7168
  },
  "deepseek-v3.2-speciale": {
    "context": 128e3,
    "output": 128e3
  },
  "deepseek-v3.2-thinking": {
    "context": 128e3,
    "output": 128e3
  },
  "deepseek-v4-1-flash-1017-uncensored": {
    "context": 1e6,
    "output": 131072
  },
  "deepseek-v4-1-flash-uncensored": {
    "context": 1e6,
    "output": 131072
  },
  "deepseek-v4-flash": {
    "context": 1048576,
    "output": 393216
  },
  "DeepSeek-V4-Flash-0731": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-v4-flash-0731-fast": {
    "context": 1e6
  },
  "deepseek-v4-flash-0731@eu": {
    "context": 1048576,
    "output": 131072
  },
  "deepseek-v4-flash-flex": {
    "context": 1048560,
    "output": 393216
  },
  "deepseek-v4-flash-free": {
    "context": 2e5,
    "output": 128e3
  },
  "deepseek-v4-flash-ga-260731": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-v4-flash-speed": {
    "context": 1048560,
    "output": 393216
  },
  "deepseek-v4-flash-vision-exp": {
    "context": 1048576,
    "output": 393216
  },
  "DeepSeek-V4-Flash-Vision-Exp": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-v4-flash:free": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-v4-pro": {
    "context": 1048576,
    "output": 393216
  },
  "DeepSeek-V4-Pro-0813": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-v4-pro-0813@eu": {
    "context": 1048576,
    "output": 65536
  },
  "deepseek-v4-pro-ga-260813": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-v4-pro:0813": {
    "context": 1048576,
    "output": 1048576
  },
  "deepseek-v4-pro:free": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-v4-pro@eu": {
    "context": 1048576,
    "output": 1048576
  },
  "deepseek-v4.1-flash-1017@eu": {
    "context": 1048576,
    "output": 393216
  },
  "deepseek-v4.1-flash-552b": {
    "context": 1048576,
    "output": 81920
  },
  "deepseek-v4.1-flash-cyber": {
    "context": 104e4,
    "output": 104e4
  },
  "deepseek-v4.1-flash-fast": {
    "context": 1048576,
    "output": 393216
  },
  "deepseek-v4.1-flash-flex": {
    "context": 1048560,
    "output": 393216
  },
  "deepseek-v4.1-flash-free": {
    "context": 2e5,
    "output": 32e3
  },
  "deepseek-v4.1-flash:1017": {
    "context": 1048576,
    "output": 384e3
  },
  "deepseek-v4.1-flash:fast": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek-v4.1-flash@eu": {
    "context": 1048576,
    "output": 393216
  },
  "deepseek.r1-v1:0": {
    "context": 128e3,
    "output": 32768
  },
  "deepseek.v3-v1:0": {
    "context": 163840,
    "output": 81920
  },
  "deepseek.v3.2": {
    "context": 163840,
    "output": 81920
  },
  "deepseek/deepseek_v3": {
    "context": 64e3,
    "output": 16e3
  },
  "deepseek/deepseek-chat-v3.1": {
    "context": 163840,
    "output": 147456
  },
  "deepseek/deepseek-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek/deepseek-latest": {
    "context": 1048576,
    "output": 384e3
  },
  "deepseek/deepseek-math-v2": {
    "context": 16e4,
    "output": 16e4
  },
  "deepseek/deepseek-ocr-2": {
    "context": 8192,
    "output": 8192
  },
  "deepseek/deepseek-r1-0528-qwen3-8b": {
    "context": 128e3,
    "output": 32e3
  },
  "deepseek/deepseek-r1-turbo": {
    "context": 64e3,
    "output": 16e3
  },
  "deepseek/deepseek-reasoner": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek/deepseek-v3": {
    "context": 163840,
    "output": 81920
  },
  "deepseek/deepseek-v3-0324": {
    "context": 163840,
    "output": 163840
  },
  "deepseek/deepseek-v3.1-terminus-thinking": {
    "context": 128e3,
    "output": 32e3
  },
  "deepseek/deepseek-v3.2-251201": {
    "context": 128e3,
    "output": 32e3
  },
  "deepseek/deepseek-v3.2-exp-thinking": {
    "context": 128e3,
    "output": 32e3
  },
  "deepseek/deepseek-v3.2-thinking": {
    "context": 128e3,
    "output": 8e3
  },
  "deepseek/deepseek-v3.2:thinking": {
    "context": 163e3,
    "output": 65536
  },
  "deepseek/deepseek-v4-flash-0423:thinking": {
    "context": 1048576,
    "output": 384e3
  },
  "deepseek/deepseek-v4-flash-0731-fast": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek/deepseek-v4-flash-0731:thinking": {
    "context": 1048576,
    "output": 131072
  },
  "deepseek/deepseek-v4-flash-fast": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek/deepseek-v4-flash-free": {
    "context": 1e6,
    "output": 384e3
  },
  "deepseek/deepseek-v4-flash-latest": {
    "context": 1048576
  },
  "deepseek/deepseek-v4-flash:thinking": {
    "context": 1048576,
    "output": 384e3
  },
  "deepseek/deepseek-v4-pro-0423": {
    "context": 1e6
  },
  "deepseek/deepseek-v4-pro-0813:thinking": {
    "context": 1048576,
    "output": 384e3
  },
  "deepseek/deepseek-v4-pro:thinking": {
    "context": 1048576,
    "output": 384e3
  },
  "deepseek/deepseek-v4.1-flash-0910-uncensored": {
    "context": 524288,
    "output": 32768
  },
  "deepseek/deepseek-v4.1-flash-0910-uncensored:thinking": {
    "context": 524288,
    "output": 32768
  },
  "deepseek/deepseek-v4.1-flash-1017-fast": {
    "context": 1048576,
    "output": 262144
  },
  "deepseek/deepseek-v4.1-flash-1017-uncensored": {
    "context": 1048576,
    "output": 393216
  },
  "deepseek/deepseek-v4.1-flash-1017-uncensored:thinking": {
    "context": 1048576,
    "output": 393216
  },
  "deepseek/deepseek-v4.1-flash-1017:thinking": {
    "context": 1048576,
    "output": 393216
  },
  "deepseek/deepseek-v4.1-flash-uncensored": {
    "context": 1048576,
    "output": 393216
  },
  "deepseek/deepseek-v4.1-flash-uncensored:thinking": {
    "context": 1048576,
    "output": 393216
  },
  "deepseek/deepseek-v4.1-flash:thinking": {
    "context": 1e6,
    "output": 384e3
  },
  "devstral-2-123b-instruct-2512": {
    "context": 2e5,
    "output": 16384
  },
  "Devstral-2-123B-Instruct-2512-int4-AutoRound": {
    "context": 128e3,
    "output": 128e3
  },
  "devstral-latest@eu": {
    "context": 256e3,
    "output": 256e3
  },
  "devstral-medium-latest": {
    "context": 262144,
    "output": 262144
  },
  "Doctor-Shotgun/MS3.2-24B-Magnum-Diamond": {
    "context": 32768,
    "output": 32768
  },
  "dots-studio/dots-3-note-preview:free": {
    "context": 512e3,
    "output": 460800
  },
  "doubao-1.5-pro-32k": {
    "context": 128e3,
    "output": 12e3
  },
  "doubao-1.5-thinking-pro": {
    "context": 128e3,
    "output": 16e3
  },
  "doubao-1.5-vision-pro": {
    "context": 128e3,
    "output": 16e3
  },
  "doubao-seed-1-6-251015": {
    "context": 256e3,
    "output": 64e3
  },
  "doubao-seed-1-6-flash-250828": {
    "context": 256e3,
    "output": 32e3
  },
  "doubao-seed-1-6-thinking-250715": {
    "context": 256e3,
    "output": 16e3
  },
  "doubao-seed-1-6-vision-250815": {
    "context": 256e3,
    "output": 32e3
  },
  "doubao-seed-1-8-251215": {
    "context": 224e3,
    "output": 64e3
  },
  "doubao-seed-1-8-251228": {
    "context": 256e3,
    "output": 64e3
  },
  "doubao-seed-1.6": {
    "context": 256e3,
    "output": 32e3
  },
  "doubao-seed-1.6-flash": {
    "context": 256e3,
    "output": 32e3
  },
  "doubao-seed-1.6-thinking": {
    "context": 256e3,
    "output": 32e3
  },
  "doubao-seed-2-0-code-preview": {
    "context": 256e3,
    "output": 128e3
  },
  "doubao-seed-2-0-lite-260215": {
    "context": 256e3,
    "output": 32e3
  },
  "doubao-seed-2-0-lite-260428": {
    "context": 256e3
  },
  "doubao-seed-2-0-mini-260215": {
    "context": 256e3,
    "output": 32e3
  },
  "doubao-seed-2-0-mini-260428": {
    "context": 256e3
  },
  "doubao-seed-2-0-pro": {
    "context": 256e3,
    "output": 128e3
  },
  "doubao-seed-2-0-pro-260215": {
    "context": 256e3,
    "output": 128e3
  },
  "doubao-seed-2-1-pro-260628": {
    "context": 256e3,
    "output": 256e3
  },
  "doubao-seed-2-1-turbo-260628": {
    "context": 256e3,
    "output": 256e3
  },
  "doubao-seed-2.0-code": {
    "context": 256e3,
    "output": 128e3
  },
  "doubao-seed-2.0-lite": {
    "context": 256e3,
    "output": 32e3
  },
  "doubao-seed-2.0-mini": {
    "context": 256e3,
    "output": 32e3
  },
  "doubao-seed-2.0-pro": {
    "context": 256e3,
    "output": 128e3
  },
  "doubao-seed-2.1-turbo": {
    "context": 256e3,
    "output": 256e3
  },
  "doubao-seed-character-260628": {
    "context": 256e3,
    "output": 256e3
  },
  "doubao-seed-evolving": {
    "context": 256e3,
    "output": 256e3
  },
  "dsv4": {
    "context": 1048576,
    "output": 384e3
  },
  "duo-chat-fable-5": {
    "context": 1e6,
    "output": 128e3
  },
  "duo-chat-fable-5-1": {
    "context": 1e6,
    "output": 128e3
  },
  "duo-chat-gpt-5-1": {
    "context": 4e5,
    "output": 128e3
  },
  "duo-chat-gpt-5-2": {
    "context": 4e5,
    "output": 128e3
  },
  "duo-chat-gpt-5-2-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "duo-chat-gpt-5-3-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "duo-chat-gpt-5-4": {
    "context": 105e4,
    "output": 128e3
  },
  "duo-chat-gpt-5-4-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "duo-chat-gpt-5-4-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "duo-chat-gpt-5-5": {
    "context": 105e4,
    "output": 128e3
  },
  "duo-chat-gpt-5-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "duo-chat-gpt-5-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "duo-chat-gpt-5-6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "duo-chat-gpt-5-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "duo-chat-gpt-5-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "duo-chat-gpt-6-1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "duo-chat-gpt-6-astra": {
    "context": 105e4,
    "output": 128e3
  },
  "duo-chat-gpt-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "duo-chat-gpt-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "duo-chat-haiku-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "duo-chat-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "duo-chat-opus-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "duo-chat-opus-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "duo-chat-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "duo-chat-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "duo-chat-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "duo-chat-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "duo-chat-sonnet-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "duo-chat-sonnet-4-6": {
    "context": 1e6,
    "output": 64e3
  },
  "duo-chat-sonnet-5": {
    "context": 1e6,
    "output": 64e3
  },
  "duo-chat-sonnet-5-5": {
    "context": 1e6,
    "output": 64e3
  },
  "e5-large-v2": {
    "context": 512,
    "output": 1024
  },
  "echo": {
    "context": 262144,
    "output": 65536
  },
  "elevenlabs/elevenlabs-music": {
    "context": 2e3
  },
  "elevenlabs/elevenlabs-v2.5-turbo": {
    "context": 128e3
  },
  "elevenlabs/elevenlabs-v3": {
    "context": 128e3
  },
  "empiriolabs/deepseek-v4-flash-el": {
    "context": 1e6,
    "output": 384e3
  },
  "empiriolabs/deepseek-v4-pro-el": {
    "context": 1e6,
    "output": 384e3
  },
  "entrim/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 384e3
  },
  "entrim/glm-5.3": {
    "context": 1048576,
    "output": 131072
  },
  "entrim/glm-5.3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "Envoid/Llama-3.05-Nemotron-Tenyxchat-Storybreaker-70B": {
    "context": 16384,
    "output": 8192
  },
  "Envoid/Llama-3.05-NT-Storybreaker-Ministral-70B": {
    "context": 16384,
    "output": 8192
  },
  "ernie-4.5-21b-a3b-thinking": {
    "context": 128e3,
    "output": 8e3
  },
  "ernie-5.0-thinking-preview": {
    "context": 128e3,
    "output": 16384
  },
  "ernie-5.1": {
    "context": 119e3,
    "output": 64e3
  },
  "ernie-5.1:thinking": {
    "context": 119e3,
    "output": 64e3
  },
  "essentialai/Rnj-1-Instruct": {
    "context": 32768,
    "output": 32768
  },
  "eu.amazon.nova-2-lite-v1:0": {
    "context": 1e6,
    "output": 65535
  },
  "eu.amazon.nova-lite-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "eu.amazon.nova-micro-v1:0": {
    "context": 128e3,
    "output": 1e4
  },
  "eu.amazon.nova-pro-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "eu.anthropic.claude-fable-5": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.anthropic.claude-haiku-4-5-20251001-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "eu.anthropic.claude-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.anthropic.claude-opus-4-5-20251101-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "eu.anthropic.claude-opus-4-6-v1": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.anthropic.claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.anthropic.claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.anthropic.claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.anthropic.claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.anthropic.claude-sonnet-4-20250514-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "eu.anthropic.claude-sonnet-4-5-20250929-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "eu.anthropic.claude-sonnet-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.anthropic.claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.anthropic.claude-sonnet-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "eu.mistral.pixtral-large-2502-v1:0": {
    "context": 128e3,
    "output": 8192
  },
  "EVA-UNIT-01/EVA-LLaMA-3.33-70B-v0.0": {
    "context": 32768,
    "output": 16384
  },
  "EVA-UNIT-01/EVA-LLaMA-3.33-70B-v0.1": {
    "context": 32768,
    "output": 16384
  },
  "EVA-UNIT-01/EVA-Qwen2.5-32B-v0.2": {
    "context": 16384,
    "output": 8192
  },
  "EVA-UNIT-01/EVA-Qwen2.5-72B-v0.2": {
    "context": 16384,
    "output": 8192
  },
  "evroc/roc": {
    "context": 262144,
    "output": 262144
  },
  "exo-free": {
    "context": 1048576,
    "output": 131072
  },
  "failspy/Meta-Llama-3-70B-Instruct-abliterated-v3.5": {
    "context": 8192,
    "output": 8192
  },
  "faster-whisper-large-v3": {
    "context": 448,
    "output": 4096
  },
  "fastgpt": {
    "context": 32768,
    "output": 32768
  },
  "fastino/gliguard-LLMGuardrails-300M": {
    "context": 8192,
    "output": 8192
  },
  "fastino/gliguard-PII-multi": {
    "context": 8192,
    "output": 8192
  },
  "fastino/GLiNER-2.5-Decide": {
    "context": 8192,
    "output": 8192
  },
  "fastino/gliner2-base-v1": {
    "context": 2048,
    "output": 2048
  },
  "fastino/gliner2-large-v1": {
    "context": 8192,
    "output": 8192
  },
  "fastino/gliner2-multi-large-v1": {
    "context": 8192,
    "output": 8192
  },
  "fastino/gliner2-multi-v1": {
    "context": 8192,
    "output": 8192
  },
  "fastino/gliner2-privacy-filter-PII-multi": {
    "context": 8192,
    "output": 8192
  },
  "fastino/gliner2.5-base-v1": {
    "context": 4096,
    "output": 4096
  },
  "fastino/gliner2.5-multi-v1": {
    "context": 4096,
    "output": 4096
  },
  "featherless-ai/Qwerky-72B": {
    "context": 32e3,
    "output": 8192
  },
  "fireworks_ai/accounts/fireworks/models/ember-1": {
    "context": 1048576,
    "output": 131072
  },
  "fireworks_ai/accounts/fireworks/models/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "fireworks_ai/accounts/fireworks/models/inkling": {
    "context": 1048576,
    "output": 1048576
  },
  "fireworks_ai/accounts/fireworks/models/muse-spark-open": {
    "context": 1048576,
    "output": 131072
  },
  "fireworks_ai/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "fireworks-ai/kimi-k2.5-fw": {
    "context": 262144,
    "output": 16384
  },
  "fireworks/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 393216
  },
  "fireworks/glm-5.2": {
    "context": 1e6,
    "output": 131072
  },
  "fireworks/glm-5.3": {
    "context": 1048576,
    "output": 131072
  },
  "fireworks/glm-5.3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "fireworks/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "fireworks/gpt-oss-20b": {
    "context": 131072,
    "output": 32768
  },
  "fireworks/kimi-k3": {
    "context": 1040384,
    "output": 1040384
  },
  "fireworks/kimi-k3-fast": {
    "context": 1040384,
    "output": 1040384
  },
  "fledge-alpha-free": {
    "context": 1048576,
    "output": 131072
  },
  "flexai/DeepSeek-V4-Flash-0731": {
    "context": 1048576,
    "output": 384e3
  },
  "flexai/DeepSeek-V4-Flash-0731@eu": {
    "context": 1048576,
    "output": 384e3
  },
  "flexai/DeepSeek-V4.1-Flash-1017": {
    "context": 1048576,
    "output": 384e3
  },
  "flexai/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "flexai/gpt-oss-20b": {
    "context": 131072,
    "output": 32768
  },
  "flexai/Muse-Glimmer-30B": {
    "context": 131072,
    "output": 131072
  },
  "flexai/Step-3.7-Flash": {
    "context": 262144,
    "output": 256e3
  },
  "flint-40b-free": {
    "context": 262144,
    "output": 65536
  },
  "fugu": {
    "context": 1e6,
    "output": 1e6
  },
  "fugu-max": {
    "context": 1e6
  },
  "fugu-ultra-20260615": {
    "context": 1e6,
    "output": 1e6
  },
  "fugu-ultra-v1-0": {
    "context": 1e6,
    "output": 131072
  },
  "fugu-ultra-v1-1": {
    "context": 1e6,
    "output": 131072
  },
  "fugu-ultra-v2-0": {
    "context": 1e6,
    "output": 131072
  },
  "fugu-ultra-v2.0": {
    "context": 1e6,
    "output": 1e6
  },
  "GalrionSoftworks/MN-LooseCannon-12B-v1": {
    "context": 16384,
    "output": 8192
  },
  "gemini-2-5-flash": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2-5-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.0-flash": {
    "context": 1048576,
    "output": 8192
  },
  "gemini-2.0-pro-exp-02-05": {
    "context": 2097152,
    "output": 8192
  },
  "gemini-2.0-pro-reasoner": {
    "context": 128e3,
    "output": 65536
  },
  "gemini-2.5-computer-use-preview-10-2025": {
    "context": 128e3,
    "output": 64e3
  },
  "gemini-2.5-flash-image": {
    "context": 32768
  },
  "gemini-2.5-flash-lite": {
    "context": 1048576
  },
  "gemini-2.5-flash-lite-preview-06-17": {
    "context": 1048576
  },
  "gemini-2.5-flash-lite-preview-09-2025-thinking": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.5-flash-lite@eu": {
    "context": 1048576,
    "output": 65535
  },
  "gemini-2.5-flash-nothink": {
    "context": 1e6,
    "output": 65536
  },
  "gemini-2.5-flash-nothinking": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.5-flash-preview-04-17": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.5-flash-preview-04-17:thinking": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.5-flash-preview-05-20:thinking": {
    "context": 1048e3,
    "output": 65536
  },
  "gemini-2.5-flash-preview-09-2025-thinking": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.5-flash-preview-tts": {
    "context": 8192,
    "output": 16384
  },
  "gemini-2.5-flash-tts": {
    "context": 32768,
    "output": 16384
  },
  "gemini-2.5-flash@eu": {
    "context": 1048576,
    "output": 65535
  },
  "gemini-2.5-pro-exp-03-25": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.5-pro-preview-03-25": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.5-pro-preview-05-06": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.5-pro-preview-06-05": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-2.5-pro-preview-tts": {
    "context": 8192,
    "output": 16384
  },
  "gemini-2.5-pro-tts": {
    "context": 32768,
    "output": 16384
  },
  "gemini-2.5-pro@eu": {
    "context": 1048576,
    "output": 65535
  },
  "gemini-3-1-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-3-1-flash-tts": {
    "context": 8192,
    "output": 16384
  },
  "gemini-3-1-pro": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-3-1-pro-preview": {
    "context": 1e6
  },
  "gemini-3-flash": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-3-pro": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-3.0-flash-preview": {
    "context": 1e6,
    "output": 64e3
  },
  "gemini-3.0-pro-image-preview": {
    "context": 32768,
    "output": 8192
  },
  "gemini-3.0-pro-preview": {
    "context": 1e6,
    "output": 64e3
  },
  "gemini-3.1-flash-lite": {
    "context": 1048576
  },
  "gemini-3.1-flash-lite-image": {
    "context": 65536,
    "output": 4096
  },
  "gemini-3.1-flash-lite-preview": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-3.1-flash-lite@eu": {
    "context": 1048576,
    "output": 65535
  },
  "gemini-3.1-flash-live-preview": {
    "context": 131072,
    "output": 65536
  },
  "gemini-3.1-flash-tts-preview": {
    "context": 8192,
    "output": 16384
  },
  "gemini-3.1-pro-preview": {
    "context": 1048576
  },
  "gemini-3.1-pro-preview-customtools": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-3.5-flash-lite": {
    "context": 1048576
  },
  "gemini-3.5-flash-lite@eu": {
    "context": 1048576,
    "output": 65535
  },
  "gemini-3.5-flash-thinking": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-3.5-flash@eu": {
    "context": 1048576,
    "output": 65535
  },
  "gemini-3.5-live-translate-preview": {
    "context": 16384,
    "output": 32768
  },
  "gemini-3.7-flash@eu": {
    "context": 1048576,
    "output": 65535
  },
  "gemini-3.8-flash@eu": {
    "context": 1048576,
    "output": 65535
  },
  "gemini-4-argon-contributor": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-4-argon@eu": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-embedding": {
    "context": 2048,
    "output": 1
  },
  "gemini-embedding-001": {
    "context": 2048,
    "output": 1
  },
  "gemini-embedding-2": {
    "context": 8192
  },
  "gemini-exp-1206": {
    "context": 2097152,
    "output": 8192
  },
  "gemini-flash-latest": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-flash-lite-latest": {
    "context": 1048576,
    "output": 65536
  },
  "gemini-nano-banana-2.1": {
    "context": 131072,
    "output": 32768
  },
  "gemini-omni-flash-preview": {
    "context": 131072,
    "output": 65536
  },
  "gemini/gemini-2.5-flash": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-2.5-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-2.5-pro": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-3-flash-preview": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-3.1-pro-preview": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-3.5-flash": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-3.5-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-3.6-flash": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-3.7-flash": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-3.8-flash": {
    "context": 1048576,
    "output": 65536
  },
  "gemini/gemini-4-argon": {
    "context": 1048576
  },
  "gemma-3-12b": {
    "context": 131072,
    "output": 8192
  },
  "gemma-3-12b-it": {
    "context": 131072,
    "output": 8192
  },
  "gemma-3-27b": {
    "context": 128e3,
    "output": 16384
  },
  "gemma-4": {
    "context": 131072,
    "output": 131072
  },
  "gemma-4-12b-it": {
    "context": 131072,
    "output": 32768
  },
  "gemma-4-12b-it-semancer": {
    "context": 131072,
    "output": 32768
  },
  "gemma-4-12b-it-starry-ocean": {
    "context": 131072,
    "output": 131072
  },
  "gemma-4-12b-it-station-keeper": {
    "context": 131072,
    "output": 32768
  },
  "gemma-4-26b-a4b": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-26b-a4b-it-chimerax": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-26b-a4b-it-chimeraxheretic": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-26b-a4b-it-darksoul": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-26b-a4b-it-luminous": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-26b-a4b-it-moonlight": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-26b-a4b-it-musica": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-26b-a4b-it-opusdistill": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-26b-a4b-it-shadowsiren": {
    "context": 262144,
    "output": 32768
  },
  "Gemma-4-26B-A4B-MeroMero": {
    "context": 262144,
    "output": 32768
  },
  "Gemma-4-26B-A4B-MeroMero:thinking": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b": {
    "context": 262128,
    "output": 16384
  },
  "Gemma-4-31B-Agares-v1": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-Animus-V14.1": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-AssGuard": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-Claude-4.6-Opus-Reasoning-Distilled": {
    "context": 262144,
    "output": 16384
  },
  "Gemma-4-31B-Cognitive-Unshackled": {
    "context": 262144,
    "output": 16384
  },
  "Gemma-4-31B-Dark-Gemistry": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-DarkIdol": {
    "context": 262144,
    "output": 16384
  },
  "Gemma-4-31B-Fabled": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-GarnetV2": {
    "context": 262144,
    "output": 16384
  },
  "Gemma-4-31B-Gembrain-uncensored-heretic": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-Gembrain-X-Core": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-Isometry-RP": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-IT": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b-it-darkidol": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b-it-fabled": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31B-it-fp8": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b-it-garnet": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b-it-gembrain": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b-it-gemsicle": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b-it-isometry": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b-it-novelist": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b-it-scarlet": {
    "context": 262144,
    "output": 32768
  },
  "gemma-4-31b-it:free": {
    "context": 262144,
    "output": 32768
  },
  "Gemma-4-31B-K1-v5": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-MeroMero": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-MeroMero-v2": {
    "context": 262144,
    "output": 32768
  },
  "Gemma-4-31B-MeroMero-v2:thinking": {
    "context": 262144,
    "output": 32768
  },
  "Gemma-4-31B-Novelist": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-Queen": {
    "context": 262144,
    "output": 16384
  },
  "Gemma-4-31B-SDFT-Heretic-RP": {
    "context": 262144,
    "output": 262144
  },
  "Gemma-4-31B-StyleTune": {
    "context": 262144,
    "output": 262144
  },
  "gemma-4-E4B-it-IQ4_XS": {
    "context": 32768,
    "output": 8192
  },
  "gemma-4-E4B-it-MLX-4bit": {
    "context": 32768,
    "output": 8192
  },
  "gemma-4-uncensored": {
    "context": 256e3,
    "output": 8192
  },
  "gemma2-9b-it": {
    "context": 8192,
    "output": 8192
  },
  "gemma4": {
    "context": 262144,
    "output": 32768
  },
  "gemma4-26b": {
    "context": 256e3,
    "output": 32768
  },
  "gemma4:31b": {
    "context": 262144,
    "output": 262144
  },
  "glm-4-32b-0414-128k": {
    "context": 128e3,
    "output": 16384
  },
  "glm-4-5-flash": {
    "context": 2e5,
    "output": 98304
  },
  "glm-4-6v-flash": {
    "context": 128e3,
    "output": 32768
  },
  "glm-4-7-flash": {
    "context": 2e5,
    "output": 131072
  },
  "glm-4-7-flash:free": {
    "context": 2e5,
    "output": 131072
  },
  "glm-4-7-flashx": {
    "context": 2e5,
    "output": 131072
  },
  "glm-4-long": {
    "context": 1e6,
    "output": 4095
  },
  "glm-4.5-airx": {
    "context": 128e3,
    "output": 16384
  },
  "glm-4.5-flash": {
    "context": 131072,
    "output": 98304
  },
  "glm-4.5-flash:free": {
    "context": 131072,
    "output": 98304
  },
  "glm-4.5-x": {
    "context": 128e3,
    "output": 16384
  },
  "GLM-4.6-Derestricted-v5": {
    "context": 131072,
    "output": 8192
  },
  "glm-4.6v-flash": {
    "context": 128e3,
    "output": 32768
  },
  "glm-4.6v-flashx": {
    "context": 128e3,
    "output": 16e3
  },
  "GLM-4.7": {
    "context": 204800,
    "output": 131072
  },
  "glm-4.7-flash-free": {
    "context": 2e5,
    "output": 131072
  },
  "glm-4.7-flashx": {
    "context": 2e5,
    "output": 131072
  },
  "glm-4.7-free": {
    "context": 204800,
    "output": 131072
  },
  "GLM-5": {
    "context": 204800,
    "output": 131072
  },
  "glm-5-2-260617": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5-3-flash-260828": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5-free": {
    "context": 204800,
    "output": 131072
  },
  "glm-5-turbo": {
    "context": 2e5,
    "output": 131072
  },
  "glm-5.1@eu": {
    "context": 2e5,
    "output": 131072
  },
  "glm-5.2-caveman": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-caveman-lite": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-caveman-ultra": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-fast": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-highspeed": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-honey": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-honey-lite": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-honey-ultra": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-nitro": {
    "context": 2e5,
    "output": 32e3
  },
  "glm-5.2-ponytail": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-ponytail-lite": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2-ponytail-ultra": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2:free": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.2@eu": {
    "context": 1048576,
    "output": 131072
  },
  "GLM-5.3": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.3-fast": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.3-flash-flex": {
    "context": 1048560,
    "output": 1048560
  },
  "glm-5.3-flash-free": {
    "context": 2e5,
    "output": 32e3
  },
  "glm-5.3-flash:fast": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.3-flash@eu": {
    "context": 1e6,
    "output": 262144
  },
  "glm-5.3-flashx": {
    "context": 1e6
  },
  "glm-5.3-flex": {
    "context": 1048560,
    "output": 1048560
  },
  "glm-5.3-highspeed": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.3:fast": {
    "context": 1e6,
    "output": 131072
  },
  "glm-5.3@eu": {
    "context": 1048576,
    "output": 1048576
  },
  "glm-5.x-menthol": {
    "context": 202752,
    "output": 131072
  },
  "glm-5v-turbo": {
    "context": 2e5,
    "output": 131072
  },
  "glm-flash-latest": {
    "context": 1e6,
    "output": 131072
  },
  "glm5.2": {
    "context": 96e3,
    "output": 96e3
  },
  "glm5.2-fast": {
    "context": 1048576,
    "output": 131072
  },
  "glm5.3": {
    "context": 1e6,
    "output": 131072
  },
  "glm5.3-754b": {
    "context": 524288,
    "output": 81920
  },
  "glm5.3-flash": {
    "context": 1e6,
    "output": 131072
  },
  "global.amazon.nova-2-lite-v1:0": {
    "context": 1e6,
    "output": 65535
  },
  "global.anthropic.claude-fable-5": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-fable-5-1": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-haiku-4-5-20251001-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "global.anthropic.claude-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-opus-4-5-20251101-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "global.anthropic.claude-opus-4-6-v1": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-sonnet-4-20250514-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "global.anthropic.claude-sonnet-4-5-20250929-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "global.anthropic.claude-sonnet-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "global.anthropic.claude-sonnet-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "global.moonshotai.kimi-k3": {
    "context": 1048576,
    "output": 128e3
  },
  "global.openai.gpt-5.6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "global.openai.gpt-5.6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "global.openai.gpt-5.6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "global.openai.gpt-6-astra": {
    "context": 105e4,
    "output": 128e3
  },
  "global.openai.gpt-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "global.openai.gpt-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "global.openai.gpt-6.1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "global.openai.gpt-6.1-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "global.xai.grok-4.6": {
    "context": 5e5,
    "output": 5e5
  },
  "global.xai.grok-4.7": {
    "context": 5e5,
    "output": 5e5
  },
  "global.zai.glm-5.3": {
    "context": 1e6,
    "output": 128e3
  },
  "google-ai-studio/gemini-3-flash-preview": {
    "context": 1048576,
    "output": 65535
  },
  "google-ai-studio/gemini-3.1-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "google-ai-studio/gemini-3.1-pro-preview": {
    "context": 1048576,
    "output": 65536
  },
  "google-ai-studio/gemini-3.5-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "google-ai-studio/gemini-3.6-flash": {
    "context": 1048576,
    "output": 65536
  },
  "google-ai-studio/gemini-3.8-flash": {
    "context": 1048576,
    "output": 65536
  },
  "google-ai-studio/gemini-4-argon": {
    "context": 1048576,
    "output": 1048576
  },
  "google-ai-studio/gemini-pro-latest": {
    "context": 1048576,
    "output": 65536
  },
  "google-gemma-3-27b-it": {
    "context": 198e3,
    "output": 16384
  },
  "google-gemma-4-26b-a4b-it": {
    "context": 256e3,
    "output": 8192
  },
  "google-gemma-4-31b-it": {
    "context": 256e3,
    "output": 8192
  },
  "google-vertex/gemini-3-flash-preview": {
    "context": 1048576,
    "output": 65535
  },
  "google-vertex/gemini-3.1-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "google-vertex/gemini-3.1-pro-preview": {
    "context": 1048576,
    "output": 65536
  },
  "google-vertex/gemini-3.5-flash": {
    "context": 1048576,
    "output": 65536
  },
  "google-vertex/gemini-3.5-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "google-vertex/gemini-3.6-flash": {
    "context": 1048576,
    "output": 65536
  },
  "google-vertex/gemini-3.7-flash": {
    "context": 1048576,
    "output": 65536
  },
  "google-vertex/gemini-3.8-flash": {
    "context": 1048576,
    "output": 65536
  },
  "google-vertex/gemini-4-argon": {
    "context": 1048576,
    "output": 1048576
  },
  "google.gemma-3-12b-it": {
    "context": 131072,
    "output": 8192
  },
  "google.gemma-3-27b-it": {
    "context": 131072,
    "output": 8192
  },
  "google.gemma-3-4b-it": {
    "context": 131072,
    "output": 4096
  },
  "google.gemma-4-26b-a4b": {
    "context": 262144,
    "output": 32768
  },
  "google.gemma-4-31b": {
    "context": 262144,
    "output": 32768
  },
  "google.gemma-4-e2b": {
    "context": 131072,
    "output": 8192
  },
  "google/deep-research-max-preview-04-2026": {
    "context": 1048576,
    "output": 65536
  },
  "google/deep-research-preview-04-2026": {
    "context": 1048576,
    "output": 65536
  },
  "google/diffusiongemma": {
    "context": 262144,
    "output": 32768
  },
  "google/diffusiongemma-26b-a4b-it": {
    "context": 25e4,
    "output": 32768
  },
  "google/gemini-2.0-flash": {
    "context": 99e4,
    "output": 8192
  },
  "google/gemini-2.0-flash-lite": {
    "context": 99e4,
    "output": 8192
  },
  "google/gemini-2.5-computer-use-preview-10-2025": {
    "context": 128e3,
    "output": 64e3
  },
  "google/gemini-2.5-flash-image": {
    "context": 32768
  },
  "google/gemini-2.5-pro-preview": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-3-8-flash": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-3-flash-preview-thinking": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-3-pro-image-preview": {
    "context": 65536,
    "output": 32768
  },
  "google/gemini-3-pro-preview": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-3.1-flash-lite-image": {
    "context": 65536
  },
  "google/gemini-3.1-pro-preview-high": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-3.1-pro-preview-low": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-3.5-flash-thinking": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-3.5-transcribe": {
    "context": 98304,
    "output": 32768
  },
  "google/gemini-3.8-flash-lite-tts": {
    "context": 8192,
    "output": 16384
  },
  "google/gemini-3.8-flash-tts": {
    "context": 8192,
    "output": 16384
  },
  "google/gemini-3.8-live": {
    "context": 131072,
    "output": 65536
  },
  "google/gemini-3.8-live-extended-thinking": {
    "context": 131072,
    "output": 65536
  },
  "google/gemini-deep-research": {
    "context": 1048576
  },
  "google/gemini-embedding-001": {
    "context": 2048
  },
  "google/gemini-embedding-2": {
    "context": 8192
  },
  "google/gemini-flash-latest": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-flash-lite-latest": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-omni-1.1-flash": {
    "context": 131072,
    "output": 57920
  },
  "google/gemini-omni-flash-preview": {
    "context": 1e6,
    "output": 57920
  },
  "google/gemini-pro-latest": {
    "context": 1048576,
    "output": 65536
  },
  "google/gemini-robotics-er-1.6-preview": {
    "context": 131072,
    "output": 65536
  },
  "google/gemini-robotics-er-2-preview": {
    "context": 131072,
    "output": 65536
  },
  "google/gemma-2-27b-it": {
    "context": 8192,
    "output": 2048
  },
  "google/gemma-3": {
    "context": 125e3,
    "output": 4096
  },
  "google/gemma-4-12B-it": {
    "context": 262144,
    "output": 262144
  },
  "google/gemma-4-26b-a4b-it": {
    "context": 262144
  },
  "google/gemma-4-26B-A4B-it": {
    "context": 262144
  },
  "google/gemma-4-26b-a4b-it-cybersecurity": {
    "context": 262144,
    "output": 32768
  },
  "google/gemma-4-26b-a4b-it-maas": {
    "context": 262144,
    "output": 128e3
  },
  "google/gemma-4-26b-a4b-it:free": {
    "context": 262144,
    "output": 32768
  },
  "google/gemma-4-26b-a4b-it:thinking": {
    "context": 262144,
    "output": 131072
  },
  "google/gemma-4-31b": {
    "context": 262144,
    "output": 8192
  },
  "google/gemma-4-31b-it:free": {
    "context": 262144,
    "output": 32768
  },
  "google/gemma-4-31b-it:thinking": {
    "context": 262144,
    "output": 131072
  },
  "google/gemma-4-31B-turbo-TEE": {
    "context": 131072,
    "output": 65536
  },
  "google/gemma-4-E4B-it": {
    "context": 131072,
    "output": 8192
  },
  "google/gemma4-31b-splituntied": {
    "context": 262144,
    "output": 32768
  },
  "google/google-paligemma": {
    "context": 128e3,
    "output": 8192
  },
  "google/imagen-3": {
    "context": 480
  },
  "google/imagen-3-fast": {
    "context": 480
  },
  "google/imagen-4": {
    "context": 480
  },
  "google/imagen-4-fast": {
    "context": 480
  },
  "google/imagen-4-ultra": {
    "context": 480
  },
  "google/lyria-3-clip-preview": {
    "context": 1048576,
    "output": 65536
  },
  "google/lyria-3-pro-preview": {
    "context": 1048576,
    "output": 65536
  },
  "google/nano-banana": {
    "context": 65536
  },
  "google/nano-banana-pro": {
    "context": 65536
  },
  "google/text-embedding-005": {
    "context": 8192
  },
  "google/text-multilingual-embedding-002": {
    "context": 8192
  },
  "google/veo-2": {
    "context": 480
  },
  "google/veo-3": {
    "context": 480
  },
  "google/veo-3-fast": {
    "context": 480
  },
  "google/veo-3.1": {
    "context": 480
  },
  "google/veo-3.1-fast": {
    "context": 480
  },
  "google/veo3.1": {
    "context": 4e5
  },
  "google/veo3.1-fast": {
    "context": 4e5
  },
  "google/veo3.1-lite": {
    "context": 4e5
  },
  "gpt-3.5-turbo": {
    "context": 16385,
    "output": 4096
  },
  "gpt-3.5-turbo-0125": {
    "context": 16384,
    "output": 4096
  },
  "gpt-3.5-turbo-1106": {
    "context": 16384,
    "output": 4096
  },
  "gpt-3.5-turbo-instruct": {
    "context": 4096,
    "output": 4096
  },
  "gpt-4": {
    "context": 8192,
    "output": 8192
  },
  "gpt-4-turbo": {
    "context": 128e3,
    "output": 4096
  },
  "gpt-4-turbo-vision": {
    "context": 128e3,
    "output": 4096
  },
  "gpt-4.1": {
    "context": 1047576,
    "output": 32768
  },
  "gpt-4.1-mini": {
    "context": 1047576,
    "output": 32768
  },
  "gpt-4.1-mini-2025-04-14": {
    "context": 1047576,
    "output": 32768
  },
  "gpt-4.1-mini@eu": {
    "context": 1047576,
    "output": 32768
  },
  "gpt-4.1-nano": {
    "context": 1047576,
    "output": 32768
  },
  "gpt-4.1-nano@eu": {
    "context": 1047576,
    "output": 32768
  },
  "gpt-4.1@eu": {
    "context": 1047576,
    "output": 32768
  },
  "gpt-4o": {
    "context": 128e3,
    "output": 16384
  },
  "gpt-4o-2024-05-13": {
    "context": 128e3,
    "output": 4096
  },
  "gpt-4o-2024-08-06": {
    "context": 128e3,
    "output": 16384
  },
  "gpt-4o-2024-11-20": {
    "context": 128e3,
    "output": 16384
  },
  "gpt-4o-mini": {
    "context": 128e3,
    "output": 16384
  },
  "gpt-4o-mini-transcribe": {
    "context": 16e3,
    "output": 16e3
  },
  "gpt-4o-mini@eu": {
    "context": 128e3,
    "output": 16e3
  },
  "gpt-4o-transcribe": {
    "context": 16e3,
    "output": 16e3
  },
  "gpt-5": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5-1": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5-2": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5-3-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5-4": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5-4-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5-4-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5-5-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5-6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5-mini@eu": {
    "context": 2e5,
    "output": 1e5
  },
  "gpt-5-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5-nano@eu": {
    "context": 2e5,
    "output": 1e5
  },
  "gpt-5-pro": {
    "context": 4e5,
    "output": 272e3
  },
  "gpt-5-thinking": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.1": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.1-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.1-codex-max": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.1-codex-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.1@eu": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.2": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.2-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.2-pro": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.3-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.3-codex-spark": {
    "context": 128e3,
    "output": 32e3
  },
  "gpt-5.3-codex-xhigh": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.4": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.4-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.4-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-5.4-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.4:free": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.4@eu": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.5": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.5-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.5:free": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.5@eu": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6-luna-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6-luna@eu": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6-sol-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6-sol@eu": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6-terra-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5.6-terra@eu": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-5@eu": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-6-1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-6-astra": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-6-luna@eu": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-6-sol@eu": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-6.1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-6.1-sol@eu": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-6.1-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-6.1-terra@eu": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-chat-latest": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-daybreak-blue-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "gpt-daybreak-red-latest": {
    "context": 4e5,
    "output": 128e3
  },
  "gpt-image-2": {
    "context": 272e3,
    "output": 16384
  },
  "gpt-oss:120b": {
    "context": 131072,
    "output": 32768
  },
  "gpt-oss:20b": {
    "context": 131072,
    "output": 32768
  },
  "gpt-realtime-2.1": {
    "context": 128e3,
    "output": 32e3
  },
  "gpt-sol-latest": {
    "context": 1e6,
    "output": 128e3
  },
  "granite-4.2-8b": {
    "context": 131072,
    "output": 131072
  },
  "green-l": {
    "context": 128e3,
    "output": 32768
  },
  "green-l-raw": {
    "context": 128e3,
    "output": 32768
  },
  "green-r": {
    "context": 131072,
    "output": 32768
  },
  "green-r-raw": {
    "context": 131072,
    "output": 32768
  },
  "greenference/glm-5.3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "greenference/gpt-oss-20b": {
    "context": 131072,
    "output": 32768
  },
  "greenference/qwen3-14b": {
    "context": 16384,
    "output": 8192
  },
  "greenference/qwen3-30b-a3b": {
    "context": 8192,
    "output": 4096
  },
  "greenference/qwen3.6-27b": {
    "context": 16384,
    "output": 8192
  },
  "greenpt/deepseek-v4-flash-0731": {
    "context": 1e6,
    "output": 384e3
  },
  "greenpt/deepseek-v4.1-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "greenpt/gpt-oss-120b": {
    "context": 128e3,
    "output": 32768
  },
  "greenpt/llama-3.3-70b-instruct": {
    "context": 128e3,
    "output": 4096
  },
  "greenpt/qwen3-235b-a22b-instruct-2507": {
    "context": 25e4,
    "output": 16384
  },
  "grok-3": {
    "context": 131072,
    "output": 131072
  },
  "grok-3-mini": {
    "context": 131072,
    "output": 131072
  },
  "grok-4": {
    "context": 256e3,
    "output": 256e3
  },
  "grok-4-0709": {
    "context": 256e3
  },
  "grok-4-20": {
    "context": 2e6,
    "output": 128e3
  },
  "grok-4-20-beta-0309-non-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "grok-4-20-beta-0309-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "grok-4-20-multi-agent": {
    "context": 2e6,
    "output": 128e3
  },
  "grok-4-3": {
    "context": 1e6
  },
  "grok-4-5": {
    "context": 5e5
  },
  "grok-4-6": {
    "context": 5e5
  },
  "grok-4-fast-non-reasoning": {
    "context": 2e6
  },
  "grok-4-fast-reasoning": {
    "context": 2e6
  },
  "grok-4.1": {
    "context": 2e5,
    "output": 64e3
  },
  "grok-4.2-beta": {
    "context": 2e6,
    "output": 3e4
  },
  "grok-4.20-0309-non-reasoning": {
    "context": 1e6,
    "output": 3e4
  },
  "grok-4.20-0309-reasoning": {
    "context": 1e6,
    "output": 3e4
  },
  "grok-4.20-beta-0309-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "grok-4.20-multi-agent-0309": {
    "context": 1e6,
    "output": 3e4
  },
  "grok-4.3": {
    "context": 1e6
  },
  "grok-4.5": {
    "context": 5e5
  },
  "grok-4.7": {
    "context": 5e5
  },
  "grok-build-0-1": {
    "context": 256e3
  },
  "grok-build-0.1": {
    "context": 256e3,
    "output": 256e3
  },
  "grok-code": {
    "context": 256e3,
    "output": 256e3
  },
  "grok-code-fast-1": {
    "context": 256e3
  },
  "grok-imagine-image": {
    "context": 16e3
  },
  "grok-imagine-image-2-0": {
    "context": 64e3
  },
  "grok-imagine-image-quality": {
    "context": 16e3
  },
  "grok-imagine-video": {
    "context": 1024
  },
  "grok-imagine-video-1.5": {
    "context": 1024
  },
  "grok-imagine-video-1.5-lite": {
    "context": 1024
  },
  "grok/grok-4.3": {
    "context": 1e6,
    "output": 3e4
  },
  "grok/grok-4.5": {
    "context": 5e5,
    "output": 5e5
  },
  "grok/grok-4.6": {
    "context": 5e5,
    "output": 5e5
  },
  "groq/allam-2-7b": {
    "context": 4096,
    "output": 4096
  },
  "groq/gpt-oss-120b": {
    "context": 131072
  },
  "groq/gpt-oss-20b": {
    "context": 131072
  },
  "groq/meta-llama/llama-prompt-guard-2-22m": {
    "context": 512,
    "output": 512
  },
  "groq/meta-llama/llama-prompt-guard-2-86m": {
    "context": 512,
    "output": 512
  },
  "groq/openai/gpt-oss-120b": {
    "context": 131072
  },
  "groq/openai/gpt-oss-20b": {
    "context": 131072
  },
  "groq/openai/gpt-oss-safeguard-20b": {
    "context": 131072,
    "output": 131072
  },
  "groq/qwen/qwen3.8-27b": {
    "context": 131042,
    "output": 16384
  },
  "Gryphe/MythoMax-L2-13b": {
    "context": 4096,
    "output": 3686
  },
  "gte-large-en-v1.5": {
    "context": 8192,
    "output": 1024
  },
  "heabsy/cyberheabsy": {
    "context": 1048576,
    "output": 65536
  },
  "heabsy/qwen3.8-27b-uncensored-fast": {
    "context": 524288,
    "output": 235929
  },
  "hermes-2-pro-llama-3-8b": {
    "context": 131072,
    "output": 131072
  },
  "hermes-3-llama-3.1-405b": {
    "context": 128e3,
    "output": 16384
  },
  "hermes-4-405b": {
    "context": 128e3,
    "output": 128e3
  },
  "hermes-high": {
    "context": 1048576,
    "output": 131072
  },
  "hermes-low": {
    "context": 1048576,
    "output": 131072
  },
  "hermes-medium": {
    "context": 1048576,
    "output": 131072
  },
  "hf:deepseek-ai/DeepSeek-V4.1-Flash": {
    "context": 524288,
    "output": 65536
  },
  "hf:deepseek-ai/DeepSeek-V4.1-Flash-1017": {
    "context": 524288,
    "output": 65536
  },
  "hf:MiniMaxAI/MiniMax-M3": {
    "context": 524288,
    "output": 65536
  },
  "hf:moonshotai/Kimi-K2.7-Code": {
    "context": 262144,
    "output": 65536
  },
  "hf:moonshotai/Kimi-K3": {
    "context": 524288,
    "output": 65536
  },
  "hf:nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-NVFP4": {
    "context": 262144,
    "output": 65536
  },
  "hf:openai/gpt-oss-120b": {
    "context": 131072,
    "output": 65536
  },
  "hf:Qwen/Qwen3.6-27B": {
    "context": 262144,
    "output": 65536
  },
  "hf:zai-org/GLM-4.7-Flash": {
    "context": 196608,
    "output": 65536
  },
  "hf:zai-org/GLM-5.2": {
    "context": 524288,
    "output": 65536
  },
  "hf:zai-org/GLM-5.3": {
    "context": 524288,
    "output": 65536
  },
  "hf:zai-org/GLM-5.3-Flash": {
    "context": 524288,
    "output": 65536
  },
  "holo2-30b-a3b": {
    "context": 22016,
    "output": 16384
  },
  "holo3-35b-a3b": {
    "context": 65536,
    "output": 8192
  },
  "holo3-35b-a3b:thinking": {
    "context": 65536,
    "output": 8192
  },
  "huihui-ai/DeepSeek-R1-Distill-Llama-70B-abliterated": {
    "context": 16384,
    "output": 8192
  },
  "huihui-ai/DeepSeek-R1-Distill-Qwen-32B-abliterated": {
    "context": 16384,
    "output": 8192
  },
  "huihui-ai/Llama-3.3-70B-Instruct-abliterated": {
    "context": 32768,
    "output": 16384
  },
  "huihui-ai/Qwen2.5-32B-Instruct-abliterated": {
    "context": 32768,
    "output": 8192
  },
  "hunyuan-2.0-instruct": {
    "context": 131072,
    "output": 16384
  },
  "hunyuan-2.0-thinking": {
    "context": 131072,
    "output": 16384
  },
  "hunyuan-t1": {
    "context": 131072,
    "output": 16384
  },
  "hunyuan-turbos": {
    "context": 131072,
    "output": 16384
  },
  "hy-mt2-plus": {
    "context": 8192,
    "output": 8192
  },
  "Hy3": {
    "context": 202752,
    "output": 128e3
  },
  "hy3-free": {
    "context": 19e4,
    "output": 64e3
  },
  "hy3-preview": {
    "context": 256e3
  },
  "hy3-preview-free": {
    "context": 256e3,
    "output": 64e3
  },
  "hy3:free": {
    "context": 256e3,
    "output": 128e3
  },
  "ibm-granite/granite-4.0-h-micro": {
    "context": 131e3,
    "output": 131e3
  },
  "ibm-granite/granite-4.2-8b": {
    "context": 131072
  },
  "ibm/granite-4-h-small": {
    "context": 131072,
    "output": 131072
  },
  "iceman-contributor-free": {
    "context": 262144,
    "output": 131072
  },
  "ideogramai/ideogram": {
    "context": 150
  },
  "ideogramai/ideogram-v2": {
    "context": 150
  },
  "ideogramai/ideogram-v2a": {
    "context": 150
  },
  "ideogramai/ideogram-v2a-turbo": {
    "context": 150
  },
  "in.anthropic.claude-haiku-4-5-20251001-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "in.anthropic.claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "in.anthropic.claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "in.openai.gpt-5.6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "in.openai.gpt-5.6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "inception/mercury-2": {
    "context": 128e3,
    "output": 5e4
  },
  "inception/mercury-2.5": {
    "context": 26e4,
    "output": 65536
  },
  "inception/mercury-2.5-preview": {
    "context": 26e4,
    "output": 65536
  },
  "inception/mercury-3": {
    "context": 1e6,
    "output": 131072
  },
  "inception/mercury-coder-small": {
    "context": 32e3,
    "output": 16384
  },
  "inclusionai/ling-3.0-flash:thinking": {
    "context": 262144,
    "output": 32768
  },
  "inclusionai/ling-3.1-flash:free": {
    "context": 262144,
    "output": 32768
  },
  "inclusionAI/Ling-flash-2.0": {
    "context": 131e3,
    "output": 131e3
  },
  "inclusionai/ring-2.6-1t": {
    "context": 262e3,
    "output": 65e3
  },
  "infer/gpt-5.6-sol:official": {
    "context": 271999,
    "output": 128e3
  },
  "infer/gpt-6-astra:official": {
    "context": 271999,
    "output": 128e3
  },
  "Inferact/Qwen3.8-2.4T-A95B-NVFP4": {
    "context": 262144,
    "output": 32768
  },
  "inference-net/schematron-v2-small": {
    "context": 128e3,
    "output": 4096
  },
  "inference-net/schematron-v2-turbo": {
    "context": 128e3,
    "output": 8192
  },
  "inference.net/deepseek-v4.1-flash-1017": {
    "context": 262144,
    "output": 131072
  },
  "inference.net/deepseek-v4.1-flash-cyber": {
    "context": 104e4,
    "output": 393216
  },
  "inference.net/glm-5.3": {
    "context": 1048576,
    "output": 131072
  },
  "inference.net/glm-5.3-flash": {
    "context": 1048576,
    "output": 128e3
  },
  "inference.net/llama-3.2-11b-instruct": {
    "context": 128e3,
    "output": 128e3
  },
  "inference.net/minimax-m3.1-flash": {
    "context": 1e6,
    "output": 524288
  },
  "inflatebot/MN-12B-Mag-Mell-R1": {
    "context": 16384,
    "output": 8192
  },
  "infomaniak/mistralai/Ministral-3-14B-Instruct-2512": {
    "context": 1e5,
    "output": 262144
  },
  "inkling-256k": {
    "context": 262144,
    "output": 32768
  },
  "Intel/Qwen3-Coder-480B-A35B-Instruct-int4-mixed-ar": {
    "context": 106e3,
    "output": 4096
  },
  "interfaze/interfaze-beta": {
    "context": 1e6,
    "output": 32e3
  },
  "intfloat/e5-mistral-7b-instruct": {
    "context": 4096,
    "output": 4096
  },
  "intfloat/multilingual-e5-large-instruct": {
    "context": 512,
    "output": 512
  },
  "ionos/meta-llama/Llama-3.3-70B-Instruct": {
    "context": 128e3,
    "output": 4096
  },
  "ionos/openai/gpt-oss-120b": {
    "context": 128e3,
    "output": 32768
  },
  "ionos/Qwen/Qwen3-Coder-Next": {
    "context": 128e3,
    "output": 65536
  },
  "jamba-large": {
    "context": 256e3,
    "output": 4096
  },
  "jamba-mini": {
    "context": 256e3,
    "output": 4096
  },
  "jp.amazon.nova-2-lite-v1:0": {
    "context": 1e6,
    "output": 65535
  },
  "jp.anthropic.claude-haiku-4-5-20251001-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "jp.anthropic.claude-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "jp.anthropic.claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "jp.anthropic.claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "jp.anthropic.claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "jp.anthropic.claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "jp.anthropic.claude-sonnet-4-5-20250929-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "jp.anthropic.claude-sonnet-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "jp.anthropic.claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "k3": {
    "context": 1048576,
    "output": 131072
  },
  "k3-256k": {
    "context": 262144,
    "output": 131072
  },
  "k3.1-pro": {
    "context": 1048576,
    "output": 131072
  },
  "k3.1-pro-highspeed": {
    "context": 1048576,
    "output": 131072
  },
  "kat-coder-pro": {
    "context": 256e3,
    "output": 256e3
  },
  "KBLab/kb-whisper-large": {
    "context": 448,
    "output": 448
  },
  "kilo-auto/balanced": {
    "context": 1e6,
    "output": 65536
  },
  "kilo-auto/efficient": {
    "context": 1e6,
    "output": 65536
  },
  "kilo-auto/free": {
    "context": 256e3,
    "output": 32768
  },
  "kilo-auto/frontier": {
    "context": 1e6,
    "output": 128e3
  },
  "kilo-auto/small": {
    "context": 262144,
    "output": 32768
  },
  "kimi-for-coding": {
    "context": 1048576,
    "output": 32768
  },
  "kimi-for-coding-highspeed": {
    "context": 262144,
    "output": 32768
  },
  "kimi-k2-0711": {
    "context": 131072,
    "output": 16384
  },
  "kimi-k2-0905": {
    "context": 262144,
    "output": 16384
  },
  "kimi-k2-0905-preview": {
    "context": 262144,
    "output": 262144
  },
  "kimi-k2-5": {
    "context": 256e3,
    "output": 65536
  },
  "kimi-k2-6:free": {
    "context": 262144,
    "output": 262144
  },
  "kimi-k2-7-code-highspeed": {
    "context": 256e3,
    "output": 131072
  },
  "kimi-k2-7-code:free": {
    "context": 262144,
    "output": 262144
  },
  "kimi-k2-instruct-fast": {
    "context": 131072,
    "output": 16384
  },
  "kimi-k2-turbo-preview": {
    "context": 256e3,
    "output": 8192
  },
  "Kimi-K2.5": {
    "context": 262144
  },
  "kimi-k2.5-free": {
    "context": 262144,
    "output": 262144
  },
  "kimi-k2.5@eu": {
    "context": 128e3,
    "output": 16e3
  },
  "Kimi-K2.6": {
    "context": 262144
  },
  "kimi-k2.6-fast": {
    "context": 262144,
    "output": 262144
  },
  "kimi-k2.6-nitro": {
    "context": 2e5,
    "output": 32e3
  },
  "kimi-k2.6@eu": {
    "context": 256e3,
    "output": 128e3
  },
  "kimi-k2.7-code-fast": {
    "context": 262128,
    "output": 262128
  },
  "kimi-k2.7-code-flex": {
    "context": 262128,
    "output": 262128
  },
  "kimi-k2.7-code-highspeed": {
    "context": 262144
  },
  "kimi-k2.7-code-nitro": {
    "context": 2e5,
    "output": 32e3
  },
  "kimi-k2.7-code@eu": {
    "context": 262144,
    "output": 262144
  },
  "kimi-k2.8-preview": {
    "context": 1e6,
    "output": 1e6
  },
  "kimi-k3-1-pro": {
    "context": 1e6,
    "output": 131072
  },
  "kimi-k3-1-pro-highspeed": {
    "context": 1e6,
    "output": 131072
  },
  "kimi-k3-fast-api": {
    "context": 1e6,
    "output": 131072
  },
  "kimi-k3-flex": {
    "context": 1048560,
    "output": 1048560
  },
  "kimi-k3:fast": {
    "context": 1048576,
    "output": 131072
  },
  "kimi-k3.1-pro": {
    "context": 1048576
  },
  "kimi-k3.1-pro-highspeed": {
    "context": 1048576,
    "output": 1048576
  },
  "kimi-k3@eu": {
    "context": 1048576,
    "output": 262144
  },
  "kimi/kimi-k2.5": {
    "context": 262144
  },
  "kimi/kimi-k2.6": {
    "context": 262144,
    "output": 32768
  },
  "kimi/kimi-k2.7-code": {
    "context": 262144,
    "output": 262144
  },
  "kimi/kimi-k3": {
    "context": 1048576,
    "output": 131072
  },
  "kling-v2-6": {
    "context": 99999999,
    "output": 99999999
  },
  "Kloker": {
    "context": 2e5,
    "output": 5e4
  },
  "Kloker-Integration-Architect": {
    "context": 2e5,
    "output": 5e4
  },
  "Kloker-Integration-Developer": {
    "context": 2e5,
    "output": 5e4
  },
  "kolibri-1": {
    "context": 262144,
    "output": 81920
  },
  "labs-devstral-small-2512": {
    "context": 256e3,
    "output": 256e3
  },
  "labs-leanstral-1-5-1": {
    "context": 262144,
    "output": 128e3
  },
  "laguna-m.1": {
    "context": 32768,
    "output": 32768
  },
  "laguna-s-2.1": {
    "context": 1048576,
    "output": 32768
  },
  "laguna-s-2.1-free": {
    "context": 256e3,
    "output": 32e3
  },
  "laguna-xs.2": {
    "context": 32768,
    "output": 32768
  },
  "LatitudeGames/Wayfarer-Large-70B-Llama-3.3": {
    "context": 32768,
    "output": 16384
  },
  "leanstral-1-5": {
    "context": 262144,
    "output": 32768
  },
  "leanstral-1-5@eu": {
    "context": 262144,
    "output": 32768
  },
  "leonardo-ai/lucid-origin": {
    "context": 4096
  },
  "leonardo-ai/lucid-realism": {
    "context": 4096
  },
  "lightonai/LightOnOCR-2-1B": {
    "context": 32768,
    "output": 8192
  },
  "lightonocr-3-0.8b": {
    "context": 262144,
    "output": 16384
  },
  "Ling-1T": {
    "context": 128e3,
    "output": 32e3
  },
  "ling-2.6-1t": {
    "context": 262144,
    "output": 262144
  },
  "ling-2.6-flash": {
    "context": 262144,
    "output": 262144
  },
  "ling-2.6-flash-free": {
    "context": 262100,
    "output": 32800
  },
  "ling-3.0-flash": {
    "context": 262144,
    "output": 262144
  },
  "ling-3.0-flash-fin-free": {
    "context": 262144,
    "output": 32768
  },
  "ling-3.0-flash-free": {
    "context": 262144,
    "output": 32768
  },
  "ling-3.0-flash-vl": {
    "context": 131072,
    "output": 131072
  },
  "ling-3.0-tiny": {
    "context": 262144,
    "output": 32768
  },
  "ling-3.0-tiny-free": {
    "context": 262144,
    "output": 32768
  },
  "ling-3.1-flash-free": {
    "context": 262144,
    "output": 32768
  },
  "liquid.auto": {
    "context": 1e7,
    "output": 1048576
  },
  "liquid/lfm-2.5-2.6b": {
    "context": 128e3
  },
  "liquid/lfm-2.5-2.6b:free": {
    "context": 65536,
    "output": 8192
  },
  "liquid/lfm-2.5-24b-a2b": {
    "context": 128e3,
    "output": 8192
  },
  "liquid/lfm2.5-24b-a2b": {
    "context": 128e3,
    "output": 8200
  },
  "LiquidAI/LFM2-24B-A2B": {
    "context": 32768,
    "output": 32768
  },
  "ll-alpha-free": {
    "context": 262144,
    "output": 65536
  },
  "llama-3.1-70b-instruct": {
    "context": 128e3,
    "output": 2048
  },
  "llama-3.1-8b-instant": {
    "context": 131072
  },
  "llama-3.1-8b-instruct": {
    "context": 16384,
    "output": 16384
  },
  "llama-3.1-8b-instruct-turbo": {
    "context": 128e3,
    "output": 128e3
  },
  "llama-3.2-11b-instruct": {
    "context": 128e3,
    "output": 8192
  },
  "llama-3.2-3b": {
    "context": 128e3,
    "output": 4096
  },
  "llama-3.3-70b": {
    "context": 128e3,
    "output": 4096
  },
  "llama-4-maverick-17b-128e-instruct-fp8": {
    "context": 1e6,
    "output": 16384
  },
  "llama-4-maverick-17b-instruct": {
    "context": 1048576,
    "output": 2048
  },
  "llama-4-scout": {
    "context": 131072,
    "output": 8192
  },
  "llama-4-scout-17b-16e-instruct": {
    "context": 128e3,
    "output": 8192
  },
  "llama-4-scout-17b-instruct": {
    "context": 131072,
    "output": 2048
  },
  "llama-guard-4": {
    "context": 131072,
    "output": 1024
  },
  "llama-prompt-guard-2-22m": {
    "context": 512,
    "output": 2
  },
  "llama-prompt-guard-2-86m": {
    "context": 512,
    "output": 2
  },
  "llama3-3-70b": {
    "context": 131072,
    "output": 4096
  },
  "llama3.3:70b": {
    "context": 128e3,
    "output": 4096
  },
  "LLM360/K2-Think": {
    "context": 128e3,
    "output": 32768
  },
  "longcat-2.0": {
    "context": 1e6,
    "output": 131072
  },
  "LongCat-2.0": {
    "context": 1048576,
    "output": 131072
  },
  "longcat-2.0-free": {
    "context": 1e6,
    "output": 131072
  },
  "longcat-2.0:thinking": {
    "context": 1e6,
    "output": 131072
  },
  "LongCat-2.5-Preview": {
    "context": 1048576,
    "output": 262144
  },
  "longcat-2.5-preview-free": {
    "context": 1e6,
    "output": 131072
  },
  "lucidnova-rf1-100b": {
    "context": 12e4,
    "output": 8e3
  },
  "lucidquery-agi-01-frontier": {
    "context": 3e5,
    "output": 12e4
  },
  "lucidquery-agi-01-swift": {
    "context": 3e5,
    "output": 12e4
  },
  "lucidquery-nexus-coder": {
    "context": 25e4,
    "output": 6e4
  },
  "lumalabs/ray2": {
    "context": 5e3
  },
  "luminal/deepseek-v4.1-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "lynkr-auto": {
    "context": 128e3,
    "output": 8192
  },
  "lyria-3-clip-preview": {
    "context": 1048576,
    "output": 65536
  },
  "lyria-3-pro-preview": {
    "context": 1048576,
    "output": 65536
  },
  "magibu-11b-v8": {
    "context": 8192,
    "output": 8192
  },
  "magistral-medium-latest": {
    "context": 262144,
    "output": 16384
  },
  "mai-code-1.1-flash": {
    "context": 256e3,
    "output": 128e3
  },
  "mancer/weaver": {
    "context": 8e3
  },
  "MarinaraSpaghetti/NemoMix-Unleashed-12B": {
    "context": 32768,
    "output": 8192
  },
  "medgemma-4b": {
    "context": 8192,
    "output": 8192
  },
  "meganova-ai/manta-flash-1.0": {
    "context": 16384,
    "output": 16384
  },
  "meganova-ai/manta-mini-1.0": {
    "context": 8192,
    "output": 8192
  },
  "meganova-ai/manta-pro-1.0": {
    "context": 65536,
    "output": 32768
  },
  "meituan-longcat/LongCat-2.0": {
    "context": 1049e3,
    "output": 131072
  },
  "meituan/longcat-2.0": {
    "context": 1048756,
    "output": 262144
  },
  "meituan/longcat-flash-chat": {
    "context": 131072,
    "output": 131072
  },
  "meituan/longcat-flash-lite": {
    "context": 256e3,
    "output": 32e4
  },
  "mercury-2": {
    "context": 128e3,
    "output": 5e4
  },
  "mercury-2-5": {
    "context": 26e4,
    "output": 65536
  },
  "mercury-2.5": {
    "context": 26e4,
    "output": 65536
  },
  "mercury-3": {
    "context": 1e6,
    "output": 131072
  },
  "mercury-coder-small": {
    "context": 32768,
    "output": 16384
  },
  "mercury-edit-2": {
    "context": 32e3,
    "output": 8192
  },
  "meta-contributor/muse-spark-1.2-contributor": {
    "context": 1048576,
    "output": 131072
  },
  "meta-contributor/muse-spark-1.3-contributor": {
    "context": 1048576,
    "output": 1048576
  },
  "Meta-Llama-3_1-8B-Instruct-GGUF": {
    "context": 131072,
    "output": 4096
  },
  "meta-llama-3_3-70b-instruct": {
    "context": 131072,
    "output": 131072
  },
  "meta-llama-3-1-8b-instruct": {
    "context": 131072,
    "output": 8192
  },
  "Meta-Llama-3-1-8B-Instruct-FP8": {
    "context": 128e3,
    "output": 16384
  },
  "meta-llama-3-3-70b-instruct": {
    "context": 128e3,
    "output": 8192
  },
  "Meta-Llama-3.3-70B-Instruct": {
    "context": 131072,
    "output": 3072
  },
  "meta-llama/llama-3-3-70b-instruct": {
    "context": 131072,
    "output": 4096
  },
  "meta-llama/llama-3.1-70b-instruct": {
    "context": 131072,
    "output": 16384
  },
  "meta-llama/Llama-3.1-8B-Instruct": {
    "context": 131072
  },
  "meta-llama/llama-3.2-3b-instruct": {
    "context": 131072
  },
  "meta-llama/Llama-3.2-90B-Vision-Instruct": {
    "context": 16e3,
    "output": 4096
  },
  "meta-llama/llama-4-scout-17b-16e-instruct": {
    "context": 131072,
    "output": 131072
  },
  "meta-llama/Llama-4-Scout-17B-16E-Instruct": {
    "context": 327680,
    "output": 16384
  },
  "meta-llama/llama-guard-4-12b": {
    "context": 163840,
    "output": 16384
  },
  "meta-llama/Llama-Guard-4-12B": {
    "context": 163840,
    "output": 163840
  },
  "meta-llama/llama-prompt-guard-2-22m": {
    "context": 512,
    "output": 512
  },
  "meta-llama/llama-prompt-guard-2-86m": {
    "context": 512,
    "output": 512
  },
  "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo": {
    "context": 128e3,
    "output": 4096
  },
  "meta-llama/Meta-Llama-3.1-8B-Instruct": {
    "context": 128e3,
    "output": 4096
  },
  "meta-llama/Meta-Llama-3.3-70B-Instruct": {
    "context": 131072,
    "output": 8192
  },
  "meta-models/muse-spark-open": {
    "context": 1048576,
    "output": 1048576
  },
  "meta-models/Muse-Spark-Open-816B-A42B": {
    "context": 1048576,
    "output": 131072
  },
  "meta.llama-3.3-70b-instruct": {
    "context": 128e3,
    "output": 4096
  },
  "meta.llama-4-maverick-17b-128e-instruct-fp8": {
    "context": 512e3,
    "output": 16384
  },
  "meta.llama-4-scout-17b-16e-instruct": {
    "context": 192e3,
    "output": 16384
  },
  "meta.llama3-1-70b-instruct-v1:0": {
    "context": 128e3,
    "output": 4096
  },
  "meta.llama3-1-8b-instruct-v1:0": {
    "context": 128e3,
    "output": 4096
  },
  "meta.llama3-3-70b-instruct-v1:0": {
    "context": 128e3,
    "output": 4096
  },
  "meta.llama4-maverick-17b-instruct-v1:0": {
    "context": 1e6,
    "output": 8192
  },
  "meta.llama4-scout-17b-instruct-v1:0": {
    "context": 1e7,
    "output": 8192
  },
  "meta/llama-3.1-70b": {
    "context": 128e3,
    "output": 8192
  },
  "meta/llama-3.1-70b-instruct": {
    "context": 128e3,
    "output": 2048
  },
  "meta/llama-3.1-8b": {
    "context": 128e3,
    "output": 8192
  },
  "meta/llama-3.2-1b-instruct": {
    "context": 16e3,
    "output": 4096
  },
  "meta/llama-3.2-3b-instruct": {
    "context": 16e3,
    "output": 4096
  },
  "meta/llama-3.2-90b-vision-instruct": {
    "context": 128e3,
    "output": 8192
  },
  "meta/llama-3.3-70b": {
    "context": 128e3,
    "output": 8192
  },
  "meta/llama-3.3-70b-instruct": {
    "context": 131072,
    "output": 32768
  },
  "meta/llama-3.3-70b-instruct-maas": {
    "context": 128e3,
    "output": 8192
  },
  "meta/llama-4-maverick": {
    "context": 128e3,
    "output": 8192
  },
  "meta/llama-4-maverick-17b-128e-instruct-maas": {
    "context": 524288,
    "output": 8192
  },
  "meta/llama-4-scout": {
    "context": 128e3,
    "output": 8192
  },
  "meta/llama-4-scout-17b-16e-instruct-maas": {
    "context": 1310720,
    "output": 8192
  },
  "meta/llama-guard-4-12b": {
    "context": 163840,
    "output": 16384
  },
  "meta/muse-glimmer-30b": {
    "context": 131072
  },
  "meta/muse-spark-1.3": {
    "context": 1048576
  },
  "meta/muse-spark-1.3-contributor": {
    "context": 1048576
  },
  "meta/muse-wonder": {
    "context": 1048576
  },
  "meta/muse-wonder-1.0": {
    "context": 1048576
  },
  "microsoft/gpt-4": {
    "context": 8191,
    "output": 8192
  },
  "microsoft/o3-mini": {
    "context": 2e5,
    "output": 1e5
  },
  "microsoft/phi-4": {
    "context": 16384,
    "output": 14745
  },
  "mimo-v2-5": {
    "context": 1048576,
    "output": 131072
  },
  "mimo-v2-5-pro": {
    "context": 1048576,
    "output": 131072
  },
  "mimo-v2-5:free": {
    "context": 1048576,
    "output": 131072
  },
  "mimo-v2-6-flash": {
    "context": 1e6,
    "output": 131072
  },
  "mimo-v2-6-pro": {
    "context": 1e6,
    "output": 131072
  },
  "mimo-v2-6-pro-ultraspeed": {
    "context": 1e6,
    "output": 131072
  },
  "mimo-v2-flash": {
    "context": 256e3,
    "output": 256e3
  },
  "mimo-v2-flash-free": {
    "context": 262144,
    "output": 65536
  },
  "mimo-v2-omni-free": {
    "context": 262144,
    "output": 64e3
  },
  "mimo-v2-pro": {
    "context": 1048576,
    "output": 131072
  },
  "mimo-v2-pro-free": {
    "context": 1048576,
    "output": 64e3
  },
  "mimo-v2.5-free": {
    "context": 2e5,
    "output": 32e3
  },
  "mimo-v2.5-pro-ultraspeed": {
    "context": 1048576,
    "output": 131072
  },
  "mimo-v2.5-tts": {
    "context": 8192,
    "output": 8192
  },
  "mimo-v2.5-tts-voiceclone": {
    "context": 8192,
    "output": 8192
  },
  "mimo-v2.5-tts-voicedesign": {
    "context": 8192,
    "output": 8192
  },
  "mimo-v2.6-flash": {
    "context": 1048576,
    "output": 131072
  },
  "MiMo-V2.6-Flash": {
    "context": 1048576,
    "output": 131072
  },
  "mimo-v2.6-flash-free": {
    "context": 2e5,
    "output": 32e3
  },
  "mimo-v2.6-flash-rl": {
    "context": 1048576,
    "output": 131072
  },
  "mimo-v2.6-pro-flex": {
    "context": 1048560,
    "output": 393216
  },
  "mimo-v2.6-pro-rl": {
    "context": 1048576,
    "output": 131072
  },
  "mimo-v2.6-pro-ultraspeed": {
    "context": 1048576,
    "output": 131072
  },
  "mimo-v25": {
    "context": 1e6,
    "output": 1e5
  },
  "mimo/mimo-v2.5": {
    "context": 1e6,
    "output": 131072
  },
  "mimo/mimo-v2.5-pro": {
    "context": 1e6,
    "output": 131072
  },
  "mindai/macaron-v1-tall": {
    "context": 262144,
    "output": 32768
  },
  "mindai/macaron-v1-venti": {
    "context": 1048576,
    "output": 131072
  },
  "mini_lm_l12_v2": {
    "context": 128,
    "output": 384
  },
  "minicpm-v-4.5": {
    "context": 32e3,
    "output": 32e3
  },
  "MiniCPM-V-4.7-1B": {
    "context": 262144,
    "output": 262144
  },
  "MiniCPM-V-4.7-35B-A3B": {
    "context": 262144,
    "output": 262144
  },
  "MiniCPM5-2B": {
    "context": 131072,
    "output": 131072
  },
  "minimax-latest": {
    "context": 1e6,
    "output": 512e3
  },
  "MiniMax-M1": {
    "context": 1e6
  },
  "minimax-m2-5": {
    "context": 192e3,
    "output": 8192
  },
  "MiniMax-M2.1": {
    "context": 204800,
    "output": 131072
  },
  "minimax-m2.1-free": {
    "context": 204800,
    "output": 131072
  },
  "minimax-m2.1-lightning": {
    "context": 196608,
    "output": 131072
  },
  "minimax-m2.5-free": {
    "context": 204800,
    "output": 131072
  },
  "minimax-m2.5-highspeed": {
    "context": 204800,
    "output": 131072
  },
  "MiniMax-M2.5-highspeed": {
    "context": 204800,
    "output": 131072
  },
  "MiniMax-M2.7-highspeed": {
    "context": 204800,
    "output": 131072
  },
  "minimax-m2.7:free": {
    "context": 204800,
    "output": 131072
  },
  "minimax-m25": {
    "context": 198e3,
    "output": 32768
  },
  "minimax-m27": {
    "context": 198e3,
    "output": 32768
  },
  "minimax-m3-1-flash": {
    "context": 1e6
  },
  "minimax-m3-free": {
    "context": 2e5,
    "output": 32e3
  },
  "minimax-m3-preview": {
    "context": 524288,
    "output": 65536
  },
  "minimax-m3:fast": {
    "context": 1048576,
    "output": 512e3
  },
  "MiniMax-M3.1-Flash": {
    "context": 1e6,
    "output": 524288
  },
  "minimax-m3.1-flash-free": {
    "context": 1e6,
    "output": 512e3
  },
  "MiniMax-M3.1-Flash-Preview": {
    "context": 1e6,
    "output": 512e3
  },
  "minimax-m3.1-flash@eu": {
    "context": 1048576,
    "output": 1048576
  },
  "minimax-m3@eu": {
    "context": 1048576,
    "output": 1048576
  },
  "minimax-text-01": {
    "context": 1e6,
    "output": 131072
  },
  "minimax.minimax-m2": {
    "context": 204608,
    "output": 128e3
  },
  "minimax.minimax-m2.1": {
    "context": 196608,
    "output": 131072
  },
  "minimax.minimax-m2.5": {
    "context": 196608,
    "output": 98304
  },
  "minimax/m2-her": {
    "context": 65536,
    "output": 2048
  },
  "minimax/m3.1-flash": {
    "context": 1e6,
    "output": 512e3
  },
  "minimax/minimax-01": {
    "context": 1000192
  },
  "minimax/minimax-latest": {
    "context": 512e3,
    "output": 8e4
  },
  "minimax/minimax-m1": {
    "context": 1e6,
    "output": 4e4
  },
  "minimax/MiniMax-M2": {
    "context": 204800,
    "output": 131072
  },
  "minimax/MiniMax-M2.1": {
    "context": 204800,
    "output": 131072
  },
  "minimax/MiniMax-M2.5": {
    "context": 204800,
    "output": 131072
  },
  "minimax/minimax-m2.5-highspeed": {
    "context": 204800
  },
  "minimax/minimax-m2.5-lightning": {
    "context": 204800,
    "output": 131072
  },
  "minimax/minimax-m2.7": {
    "context": 204800
  },
  "minimax/MiniMax-M2.7": {
    "context": 204800,
    "output": 131072
  },
  "MiniMax/MiniMax-M2.7": {
    "context": 204800,
    "output": 131072
  },
  "minimax/minimax-m2.7-highspeed": {
    "context": 204800
  },
  "minimax/MiniMax-M2.7-highspeed": {
    "context": 204800,
    "output": 131072
  },
  "minimax/minimax-m2.7-turbo": {
    "context": 204800,
    "output": 131072
  },
  "minimax/minimax-m3:thinking": {
    "context": 512e3,
    "output": 8e4
  },
  "minimax/MiniMax-M3.1-Flash": {
    "context": 1048576,
    "output": 512e3
  },
  "minimax/minimax-text-01": {
    "context": 1e6,
    "output": 131072
  },
  "minimaxai/chat-completion/models/MiniMax-M2_5-high-throughput": {
    "context": 204800,
    "output": 131072
  },
  "minimaxai/minimax-m1-80k": {
    "context": 1e6,
    "output": 4e4
  },
  "MiniMaxAI/MiniMax-M1-80k": {
    "context": 1e6
  },
  "MiniMaxAI/MiniMax-M2": {
    "context": 204800,
    "output": 131072
  },
  "minimaxai/minimax-m3": {
    "context": 1048576,
    "output": 1048576
  },
  "minimaxai/minimax-m3.1-flash": {
    "context": 262144,
    "output": 262144
  },
  "ministral-3b": {
    "context": 128e3,
    "output": 8192
  },
  "ministral-3b-latest": {
    "context": 131072,
    "output": 128e3
  },
  "ministral-8b-latest": {
    "context": 262144,
    "output": 128e3
  },
  "mistral-3-14B": {
    "context": 262144,
    "output": 128e3
  },
  "mistral-7b-instruct-v0.2": {
    "context": 32e3,
    "output": 8192
  },
  "mistral-code-agent-latest": {
    "context": 262144,
    "output": 32768
  },
  "mistral-code-latest": {
    "context": 256e3,
    "output": 32768
  },
  "mistral-embed": {
    "context": 8e3,
    "output": 3072
  },
  "mistral-large-2402": {
    "context": 32e3,
    "output": 8192
  },
  "mistral-large-2411": {
    "context": 128e3,
    "output": 32768
  },
  "mistral-large-3:675b": {
    "context": 262144,
    "output": 262144
  },
  "mistral-large-4-0": {
    "context": 1e6,
    "output": 262144
  },
  "mistral-large-4-0-8": {
    "context": 1048576,
    "output": 262144
  },
  "mistral-large-4@eu": {
    "context": 524288,
    "output": 262144
  },
  "mistral-large:free": {
    "context": 262144,
    "output": 262144
  },
  "mistral-large2": {
    "context": 128e3,
    "output": 8192
  },
  "mistral-medium-2508": {
    "context": 262144,
    "output": 262144
  },
  "mistral-medium-2604": {
    "context": 262144,
    "output": 262144
  },
  "mistral-medium-3": {
    "context": 131072,
    "output": 131072
  },
  "mistral-medium-3-5": {
    "context": 262144
  },
  "mistral-medium-3-5:free": {
    "context": 262144,
    "output": 262144
  },
  "mistral-medium-3-5@eu": {
    "context": 262144,
    "output": 209715
  },
  "mistral-medium-3.5": {
    "context": 256e3,
    "output": 256e3
  },
  "mistral-medium-latest@eu": {
    "context": 131072,
    "output": 131072
  },
  "mistral-nemo": {
    "context": 128e3,
    "output": 16400
  },
  "mistral-small": {
    "context": 128e3,
    "output": 16384
  },
  "mistral-small-2503": {
    "context": 128e3
  },
  "mistral-small-2506": {
    "context": 128e3,
    "output": 16384
  },
  "mistral-small-2603@eu": {
    "context": 256e3,
    "output": 256e3
  },
  "mistral-small-3-2-24b-instruct": {
    "context": 256e3,
    "output": 16384
  },
  "mistral-small-4": {
    "context": 256e3,
    "output": 65536
  },
  "mistral-small-4-119b": {
    "context": 256e3,
    "output": 16384
  },
  "mistral-small-latest": {
    "context": 262144,
    "output": 256e3
  },
  "mistral.devstral-2-123b": {
    "context": 262144,
    "output": 8192
  },
  "mistral.magistral-small-2509": {
    "context": 128e3,
    "output": 4e4
  },
  "mistral.ministral-3-14b-instruct": {
    "context": 128e3,
    "output": 4096
  },
  "mistral.ministral-3-3b-instruct": {
    "context": 256e3,
    "output": 8192
  },
  "mistral.ministral-3-8b-instruct": {
    "context": 128e3,
    "output": 4096
  },
  "mistral.mistral-large-3-675b-instruct": {
    "context": 262144,
    "output": 8192
  },
  "mistral.pixtral-large-2502-v1:0": {
    "context": 128e3,
    "output": 8192
  },
  "mistral.voxtral-mini-3b-2507": {
    "context": 32768,
    "output": 4096
  },
  "mistral.voxtral-small-24b-2507": {
    "context": 32768,
    "output": 8192
  },
  "mistral/codestral": {
    "context": 128e3,
    "output": 4e3
  },
  "mistral/codestral-2508": {
    "context": 256e3
  },
  "mistral/codestral-2508@eu": {
    "context": 256e3,
    "output": 8192
  },
  "mistral/codestral-embed": {
    "context": 8192,
    "output": 3072
  },
  "mistral/codestral-latest": {
    "context": 256e3,
    "output": 4096
  },
  "mistral/codestral-latest@eu": {
    "context": 256e3,
    "output": 4096
  },
  "mistral/devstral-2512@eu": {
    "context": 262144,
    "output": 262144
  },
  "mistral/devstral-medium-latest": {
    "context": 262144,
    "output": 262144
  },
  "mistral/devstral-medium-latest@eu": {
    "context": 262144,
    "output": 262144
  },
  "mistral/glm-5.3": {
    "context": 1048576,
    "output": 131072
  },
  "mistral/magistral-medium-latest@eu": {
    "context": 262144,
    "output": 16384
  },
  "mistral/ministral-14b": {
    "context": 262144,
    "output": 256e3
  },
  "mistral/ministral-14b-2512": {
    "context": 262144
  },
  "mistral/ministral-14b-2512@eu": {
    "context": 262144,
    "output": 209715
  },
  "mistral/ministral-3b": {
    "context": 131072,
    "output": 4e3
  },
  "mistral/ministral-3b-2512": {
    "context": 131072
  },
  "mistral/ministral-3b-2512@eu": {
    "context": 131072,
    "output": 104857
  },
  "mistral/ministral-8b": {
    "context": 262144,
    "output": 4e3
  },
  "mistral/ministral-8b-2512": {
    "context": 262144
  },
  "mistral/ministral-8b-2512@eu": {
    "context": 262144,
    "output": 209715
  },
  "mistral/mistral-embed": {
    "context": 8e3,
    "output": 3072
  },
  "mistral/mistral-large-2407": {
    "context": 131072,
    "output": 104857
  },
  "mistral/mistral-large-2407@eu": {
    "context": 131072,
    "output": 104857
  },
  "mistral/mistral-large-2512@eu": {
    "context": 262144,
    "output": 262144
  },
  "mistral/mistral-large-3": {
    "context": 262144,
    "output": 256e3
  },
  "mistral/mistral-large-4@eu": {
    "context": 524288,
    "output": 262144
  },
  "mistral/mistral-large-latest@eu": {
    "context": 262144,
    "output": 262144
  },
  "mistral/mistral-medium-2505@eu": {
    "context": 131072,
    "output": 131072
  },
  "mistral/mistral-medium-2604": {
    "context": 262144,
    "output": 262144
  },
  "mistral/mistral-medium-2604@eu": {
    "context": 262144,
    "output": 262144
  },
  "mistral/mistral-medium-3": {
    "context": 262144,
    "output": 104857
  },
  "mistral/mistral-medium-3-5": {
    "context": 262144
  },
  "mistral/mistral-medium-3-5@eu": {
    "context": 262144,
    "output": 209715
  },
  "mistral/mistral-medium-3.5": {
    "context": 262144,
    "output": 256e3
  },
  "mistral/mistral-medium-3@eu": {
    "context": 262144,
    "output": 104857
  },
  "mistral/mistral-medium-latest": {
    "context": 262144,
    "output": 262144
  },
  "mistral/mistral-medium-latest@eu": {
    "context": 262144,
    "output": 262144
  },
  "mistral/mistral-nemo": {
    "context": 131072,
    "output": 131072
  },
  "mistral/mistral-nemo-12b-instruct": {
    "context": 16e3,
    "output": 4096
  },
  "mistral/mistral-small": {
    "context": 262144,
    "output": 4e3
  },
  "mistral/mistral-small-2506": {
    "context": 128e3,
    "output": 16384
  },
  "mistral/mistral-small-2603@eu": {
    "context": 262144,
    "output": 256e3
  },
  "mistral/mistral-small-latest@eu": {
    "context": 262144,
    "output": 256e3
  },
  "mistral/pixtral-large-latest": {
    "context": 128e3,
    "output": 128e3
  },
  "mistral/voxtral-small-latest@eu": {
    "context": 32768,
    "output": 32e3
  },
  "mistral/zai-glm-5-2": {
    "context": 1e6,
    "output": 131072
  },
  "mistral/zai-glm-5-3": {
    "context": 1e6,
    "output": 131072
  },
  "mistral4-119b": {
    "context": 262144,
    "output": 81920
  },
  "mistralai--mistral-medium": {
    "context": 262144,
    "output": 262144
  },
  "mistralai--mistral-medium-instruct": {
    "context": 128e3,
    "output": 128e3
  },
  "mistralai--mistral-small": {
    "context": 128e3,
    "output": 128e3
  },
  "mistralai/codestral-2508": {
    "context": 256e3
  },
  "mistralai/completion/models/Ministral-3-14B-Reasoning-2512": {
    "context": 262144,
    "output": 262144
  },
  "mistralai/completion/models/Ministral-3-3B-Reasoning-2512": {
    "context": 262144,
    "output": 262144
  },
  "mistralai/devstral-2-123b-instruct-2512": {
    "context": 262144,
    "output": 65536
  },
  "mistralai/devstral-2512": {
    "context": 262144
  },
  "mistralai/devstral-small-2505": {
    "context": 32768,
    "output": 8192
  },
  "mistralai/Devstral-Small-2505": {
    "context": 128e3,
    "output": 4096
  },
  "mistralai/magistral-small-2506": {
    "context": 32768,
    "output": 32768
  },
  "mistralai/Magistral-Small-2506": {
    "context": 128e3,
    "output": 4096
  },
  "mistralai/ministral-14b-2512": {
    "context": 262144
  },
  "mistralai/ministral-14b-instruct-2512": {
    "context": 262144,
    "output": 32768
  },
  "mistralai/Ministral-3-14B-Instruct-2512": {
    "context": 1e5,
    "output": 25600
  },
  "mistralai/ministral-3b-2512": {
    "context": 131072
  },
  "mistralai/ministral-8b-2512": {
    "context": 262144
  },
  "mistralai/mistral-7b-instruct-v0.3": {
    "context": 65536,
    "output": 65536
  },
  "mistralai/mistral-large": {
    "context": 128e3,
    "output": 102400
  },
  "mistralai/mistral-large-2407": {
    "context": 131072,
    "output": 104857
  },
  "mistralai/mistral-large-2512": {
    "context": 262144
  },
  "mistralai/mistral-large-4": {
    "context": 524288,
    "output": 262144
  },
  "mistralai/mistral-large-4-0": {
    "context": 1048576
  },
  "mistralai/Mistral-Large-Instruct-2411": {
    "context": 128e3,
    "output": 4096
  },
  "mistralai/mistral-medium-3": {
    "context": 131072
  },
  "mistralai/mistral-medium-3-5": {
    "context": 262144,
    "output": 209715
  },
  "mistralai/mistral-medium-3-instruct": {
    "context": 131072,
    "output": 32768
  },
  "mistralai/mistral-medium-3.1": {
    "context": 131072
  },
  "mistralai/mistral-medium-3.5": {
    "context": 256e3,
    "output": 32768
  },
  "mistralai/Mistral-Medium-3.5-128B": {
    "context": 262144,
    "output": 262144
  },
  "mistralai/mistral-medium-3.5:thinking": {
    "context": 256e3,
    "output": 32768
  },
  "mistralai/mistral-nemo-instruct-2407": {
    "context": 16384,
    "output": 8192
  },
  "mistralai/mistral-saba": {
    "context": 32768,
    "output": 26214
  },
  "mistralai/mistral-small-24b-instruct-2501": {
    "context": 32768
  },
  "mistralai/Mistral-Small-24B-Instruct-2501": {
    "context": 32768,
    "output": 16384
  },
  "mistralai/mistral-small-2603": {
    "context": 262144
  },
  "mistralai/mistral-small-3-1-24b-instruct-2503": {
    "context": 131072,
    "output": 16384
  },
  "mistralai/mistral-small-3.1-24b-instruct": {
    "context": 128e3
  },
  "mistralai/mistral-small-4-119b-2603": {
    "context": 262144,
    "output": 16384
  },
  "mistralai/Mistral-Small-4-119B-2603": {
    "context": 256e3,
    "output": 256e3
  },
  "mistralai/mistral-small-4-119b-2603:thinking": {
    "context": 262144,
    "output": 16384
  },
  "mistralai/mixtral-8x22b-instruct": {
    "context": 65536,
    "output": 52428
  },
  "mistralai/mixtral-8x22b-instruct-v0.1": {
    "context": 65536,
    "output": 52428
  },
  "mistralai/Voxtral-Small-24B-2507": {
    "context": 32e3,
    "output": 32e3
  },
  "mixedbread/toast-1": {
    "context": 131e3,
    "output": 4e3
  },
  "mixtral-8x7B-instruct-v0.1": {
    "context": 32e3,
    "output": 4096
  },
  "mlabonne/NeuralDaredevil-8B-abliterated": {
    "context": 8192,
    "output": 8192
  },
  "model-router": {
    "context": 2e5,
    "output": 16384
  },
  "moondream/moondream3-preview": {
    "context": 32e3,
    "output": 4096
  },
  "moondream/moondream3.1-9b-a2b": {
    "context": 32e3,
    "output": 4096
  },
  "moonshot-ai/kimi-k2.7-code": {
    "context": 262144,
    "output": 262144
  },
  "moonshot-ai/kimi-k3": {
    "context": 1048576,
    "output": 131072
  },
  "moonshot-kimi-k2-instruct": {
    "context": 131072,
    "output": 8192
  },
  "moonshot.kimi-k2-thinking": {
    "context": 262144,
    "output": 16e3
  },
  "moonshot/kimi-k2.5": {
    "context": 262144
  },
  "moonshot/kimi-k2.7-code-highspeed": {
    "context": 262144
  },
  "moonshot/kimi-k3": {
    "context": 1048576
  },
  "moonshot/kimi-k3.1-pro": {
    "context": 1048576
  },
  "moonshot/kimi-k3.1-pro-highspeed": {
    "context": 1048576,
    "output": 1048576
  },
  "moonshotai.kimi-k2.5": {
    "context": 262144,
    "output": 16384
  },
  "moonshotai/chat-completion/models/Kimi-K2_6": {
    "context": 262144,
    "output": 262144
  },
  "moonshotai/kimi-k2": {
    "context": 131072
  },
  "moonshotai/Kimi-K2-Instruct": {
    "context": 131072,
    "output": 16384
  },
  "moonshotai/kimi-k2-instruct-0711": {
    "context": 128e3,
    "output": 8192
  },
  "moonshotai/kimi-k2-thinking-maas": {
    "context": 262144,
    "output": 262144
  },
  "moonshotai/kimi-k2.5:thinking": {
    "context": 262144,
    "output": 65536
  },
  "moonshotai/Kimi-K2.6-TEE": {
    "context": 262144,
    "output": 65535
  },
  "moonshotai/Kimi-K2.6:peft:131072": {
    "context": 131072,
    "output": 131072
  },
  "moonshotai/kimi-k2.6:thinking": {
    "context": 262144,
    "output": 65536
  },
  "moonshotai/kimi-k2.7-code-highspeed": {
    "context": 262144
  },
  "moonshotai/Kimi-K2.7-Code-Highspeed": {
    "context": 262e3,
    "output": 262e3
  },
  "moonshotai/kimi-k3-fast": {
    "context": 1e6,
    "output": 131072
  },
  "moonshotai/Kimi-K3-Fast": {
    "context": 1e6,
    "output": 131072
  },
  "moonshotai/Kimi-K3-TEE": {
    "context": 1048576,
    "output": 65535
  },
  "moonshotai/kimi-k3.1-pro": {
    "context": 1048576
  },
  "moonshotai/kimi-k3.1-pro-highspeed": {
    "context": 1048576,
    "output": 1048576
  },
  "moonshotai/kimi-latest": {
    "context": 1048576,
    "output": 943718
  },
  "morph-dsv41flash": {
    "context": 1048576,
    "output": 1048576
  },
  "morph-dsv41flash-1017": {
    "context": 1048576,
    "output": 1048576
  },
  "morph-dsv4flash": {
    "context": 1048576,
    "output": 1048576
  },
  "morph-glm52-744b": {
    "context": 1048576,
    "output": 1048576
  },
  "morph-glm53-744b": {
    "context": 1048576,
    "output": 1048576
  },
  "morph-glm53flash": {
    "context": 1048576,
    "output": 1048576
  },
  "morph-kimik3": {
    "context": 1048576,
    "output": 1048576
  },
  "morph-kimik3-fast": {
    "context": 1048576,
    "output": 1048576
  },
  "morph-v3-fast": {
    "context": 262144,
    "output": 131072
  },
  "morph-v3-large": {
    "context": 262144,
    "output": 131072
  },
  "morph/morph-v3-large": {
    "context": 262144,
    "output": 131072
  },
  "motif-technologies/motif-3": {
    "context": 262144,
    "output": 262144
  },
  "multi-qa-mpnet-base-dot-v1": {
    "context": 512,
    "output": 768
  },
  "muse-glimmer-30b": {
    "context": 131072
  },
  "muse-glimmer-30b-tr": {
    "context": 131072,
    "output": 131072
  },
  "muse-spark-1-1": {
    "context": 1048576,
    "output": 131072
  },
  "muse-spark-1-2": {
    "context": 1048576,
    "output": 131072
  },
  "muse-spark-1-3": {
    "context": 1048576,
    "output": 131072
  },
  "muse-spark-1.2": {
    "context": 1048576,
    "output": 131072
  },
  "muse-spark-1.2-contributor": {
    "context": 1048576
  },
  "muse-spark-1.2-contributor-free": {
    "context": 1048576,
    "output": 131072
  },
  "muse-spark-1.3": {
    "context": 1048576
  },
  "muse-spark-1.3-contributor": {
    "context": 1048576
  },
  "muse-spark-1.3-contributor-free": {
    "context": 1048576,
    "output": 131072
  },
  "muse-spark-open": {
    "context": 1048576,
    "output": 131072
  },
  "muse-wonder": {
    "context": 1048576,
    "output": 131072
  },
  "muse-wonder-1.0": {
    "context": 1048576
  },
  "nano-banana-2": {
    "context": 131072,
    "output": 32768
  },
  "nano-banana-2-lite": {
    "context": 65536,
    "output": 4096
  },
  "nano-banana-pro": {
    "context": 65536,
    "output": 32768
  },
  "nano-gpt-help": {
    "context": 6e3,
    "output": 512
  },
  "nanogpt/coding-router": {
    "context": 1e6,
    "output": 128e3
  },
  "nanogpt/coding-router:high": {
    "context": 1e6,
    "output": 128e3
  },
  "nanogpt/coding-router:low": {
    "context": 1e6,
    "output": 128e3
  },
  "nanogpt/coding-router:max": {
    "context": 1e6,
    "output": 128e3
  },
  "nanogpt/coding-router:medium": {
    "context": 1e6,
    "output": 128e3
  },
  "nebius/deepseek-ai/DeepSeek-V4-Flash-0731": {
    "context": 1024e3,
    "output": 384e3
  },
  "nebius/deepseek-ai/DeepSeek-V4-Pro-0813": {
    "context": 979e3,
    "output": 384e3
  },
  "nebius/deepseek-ai/DeepSeek-V4.1-Flash": {
    "context": 1048e3,
    "output": 384e3
  },
  "nebius/deepseek-ai/DeepSeek-V4.1-Flash-1017": {
    "context": 1048576,
    "output": 384e3
  },
  "nebius/google/gemma-3-27b-it": {
    "context": 11e4,
    "output": 131072
  },
  "nebius/meta-models/muse-spark-open": {
    "context": 1048576,
    "output": 131072
  },
  "nebius/minimax-m3.1-flash": {
    "context": 1048576,
    "output": 1048576
  },
  "nebius/nvidia/nemotron-3-super-120b-a12b": {
    "context": 262144,
    "output": 262144
  },
  "nebius/nvidia/Nemotron-3-Ultra-550b-a55b": {
    "context": 1048576,
    "output": 128e3
  },
  "nebius/openai/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "nebius/Qwen/Qwen3-235B-A22B-Instruct-2507": {
    "context": 262144,
    "output": 16384
  },
  "nebius/Qwen/Qwen3-30B-A3B-Instruct-2507": {
    "context": 262144,
    "output": 16384
  },
  "nemotron-3-nano-30b-a3b": {
    "context": 262144,
    "output": 262144
  },
  "nemotron-3-nano-omni-30b-a3b-reasoning-free": {
    "context": 256e3,
    "output": 65536
  },
  "nemotron-3-nano-omni@eu": {
    "context": 3e5,
    "output": 3e5
  },
  "nemotron-3-nano:30b": {
    "context": 1048576,
    "output": 131072
  },
  "nemotron-3-super": {
    "context": 262144,
    "output": 65536
  },
  "nemotron-3-super-120b-a12b-free": {
    "context": 262144,
    "output": 262144
  },
  "nemotron-3-super-120b-a12b:free": {
    "context": 262144,
    "output": 262144
  },
  "nemotron-3-super-free": {
    "context": 204800,
    "output": 128e3
  },
  "nemotron-3-ultra-550b-a55b-free": {
    "context": 1e6,
    "output": 128e3
  },
  "nemotron-3-ultra-550b-a55b:free": {
    "context": 1e6,
    "output": 128e3
  },
  "nemotron-3-ultra-free": {
    "context": 1e6,
    "output": 128e3
  },
  "nemotron-3-ultra-nvfp4": {
    "context": 262144,
    "output": 262144
  },
  "nemotron-3.5-content-safety": {
    "context": 131072,
    "output": 8192
  },
  "nemotron-3.5-content-safety-free": {
    "context": 128e3,
    "output": 8192
  },
  "nemotron-3.5-lightning-30b-a3b": {
    "context": 1048576,
    "output": 65536
  },
  "nemotron-3.5-lightning-free": {
    "context": 262144,
    "output": 262144
  },
  "nemotron-3.5-super-vl": {
    "context": 1048576,
    "output": 1048576
  },
  "nemotron-3.5-super-vl-free": {
    "context": 1048576,
    "output": 131072
  },
  "nemotron-lightning-3.5-30b-a3b": {
    "context": 262144,
    "output": 262144
  },
  "nemotron-nano-12b-v2-vl": {
    "context": 128e3,
    "output": 16384
  },
  "nemotron-nano-v2-12b": {
    "context": 128e3,
    "output": 128e3
  },
  "nemotron3-super": {
    "context": 262144,
    "output": 262144
  },
  "neosmith.intelligent-basic": {
    "context": 1e6,
    "output": 128e3
  },
  "neosmith.intelligent-maestro": {
    "context": 1e6,
    "output": 128e3
  },
  "neosmith.intelligent-pro": {
    "context": 1e6,
    "output": 128e3
  },
  "neosmith.neolite": {
    "context": 512e3,
    "output": 64e3
  },
  "NeverSleep/Lumimaid-v0.2-70B": {
    "context": 16384,
    "output": 8192
  },
  "nex-agi/Nex-N2-Pro": {
    "context": 262144,
    "output": 256e3
  },
  "nex-agi/nex-n2.5-mini": {
    "context": 262144
  },
  "nex-agi/nex-n2.5-pro": {
    "context": 262144
  },
  "nomic-embed-text": {
    "context": 8192,
    "output": 768
  },
  "north-mini-code-1-0": {
    "context": 256e3,
    "output": 64e3
  },
  "north-mini-code-free": {
    "context": 256e3,
    "output": 64e3
  },
  "north-small-translate-09-2026": {
    "context": 32768,
    "output": 16e3
  },
  "nothingiisreal/L3.1-70B-Celeste-V0.1-BF16": {
    "context": 32768,
    "output": 16384
  },
  "nousresearch/hermes-2-pro-llama-3-8b": {
    "context": 8192,
    "output": 8192
  },
  "nousresearch/hermes-3-llama-3.1-405b": {
    "context": 131072,
    "output": 16384
  },
  "nousresearch/hermes-3-llama-3.1-70b": {
    "context": 131072,
    "output": 16384
  },
  "NousResearch/hermes-3-llama-3.1-70b": {
    "context": 65536,
    "output": 8192
  },
  "nousresearch/hermes-4-405b": {
    "context": 131072,
    "output": 117964
  },
  "NousResearch/hermes-4-405b": {
    "context": 128e3,
    "output": 8192
  },
  "NousResearch/Hermes-4-405B": {
    "context": 131072,
    "output": 8192
  },
  "NousResearch/hermes-4-405b:thinking": {
    "context": 128e3,
    "output": 8192
  },
  "nova-2-lite": {
    "context": 1e6,
    "output": 65535
  },
  "nova-2-lite-v1": {
    "context": 1e6,
    "output": 64e3
  },
  "nova-2-pro-v1": {
    "context": 1e6,
    "output": 64e3
  },
  "nova-lite-v1": {
    "context": 3e5,
    "output": 1e4
  },
  "nova-micro-v1": {
    "context": 128e3,
    "output": 1e4
  },
  "nova-pro-v1": {
    "context": 3e5,
    "output": 1e4
  },
  "novita/deepseek-v3.2": {
    "context": 128e3
  },
  "novita/deepseek-v4-flash": {
    "context": 105e4,
    "output": 393216
  },
  "novita/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 393216
  },
  "novita/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 393216
  },
  "novita/gemma-4-26b-a4b-it": {
    "context": 262144,
    "output": 32768
  },
  "novita/gemma-4-31b-it": {
    "context": 262144,
    "output": 32768
  },
  "novita/glm-4.5v": {
    "context": 65536,
    "output": 16e3
  },
  "novita/glm-4.6": {
    "context": 204800,
    "output": 131072
  },
  "novita/glm-4.7-flash": {
    "context": 2e5,
    "output": 65500
  },
  "novita/glm-4.7-n": {
    "context": 205e3,
    "output": 131072
  },
  "novita/glm-5.1": {
    "context": 204800,
    "output": 131072
  },
  "novita/glm-5.2": {
    "context": 1048576,
    "output": 131072
  },
  "novita/glm-5.3": {
    "context": 1048576,
    "output": 131072
  },
  "novita/glm-5.3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "novita/hy3": {
    "context": 262144,
    "output": 262144
  },
  "novita/kimi-k2": {
    "context": 131072,
    "output": 131072
  },
  "novita/kimi-k2-thinking": {
    "context": 256e3
  },
  "novita/kimi-k2.5": {
    "context": 128e3,
    "output": 262144
  },
  "novita/kimi-k2.6": {
    "context": 262144,
    "output": 262144
  },
  "novita/kimi-k2.7-code": {
    "context": 262144,
    "output": 262144
  },
  "novita/kimi-k3": {
    "context": 1048576,
    "output": 1048576
  },
  "novita/ling-3.0-flash": {
    "context": 262144,
    "output": 32768
  },
  "novita/llama-3.3-70b-instruct": {
    "context": 131072,
    "output": 12e4
  },
  "novita/llama-4-maverick-17b-instruct": {
    "context": 1048576,
    "output": 8192
  },
  "novita/llama-4-scout-17b-instruct": {
    "context": 131072,
    "output": 131072
  },
  "novita/minimax-m2.1": {
    "context": 205e3,
    "output": 131072
  },
  "novita/minimax-m2.5": {
    "context": 204800,
    "output": 131100
  },
  "novita/minimax-m2.7": {
    "context": 204800,
    "output": 131100
  },
  "novita/minimax-m3.1-flash": {
    "context": 1e6,
    "output": 524288
  },
  "novita/qwen3-vl-30b-a3b-instruct": {
    "context": 131072,
    "output": 32768
  },
  "novita/qwen3.5-122b-a10b": {
    "context": 262144,
    "output": 65536
  },
  "novita/qwen3.6-35b-a3b": {
    "context": 262144,
    "output": 64e3
  },
  "novita/qwen3.7-max": {
    "context": 1e6,
    "output": 65536
  },
  "novita/qwen3.8-2.4t-a95b": {
    "context": 1e6,
    "output": 131072
  },
  "novita/qwen3.8-27b": {
    "context": 1e6,
    "output": 131072
  },
  "novita/qwen3.8-flash": {
    "context": 1e6,
    "output": 131072
  },
  "novita/qwen3.8-max": {
    "context": 1e6,
    "output": 131072
  },
  "novita/qwen35-397b-a17b": {
    "context": 262144,
    "output": 64e3
  },
  "novita/step-3.7-flash": {
    "context": 262144,
    "output": 256e3
  },
  "nvidia--llama-3.2-nv-embedqa-1b": {
    "context": 8192,
    "output": 4096
  },
  "nvidia--llama-nemotron-embed-1b": {
    "context": 8192,
    "output": 2048
  },
  "nvidia-nemotron-3-5-super-vl-120b-a12b": {
    "context": 262144,
    "output": 32768
  },
  "nvidia-nemotron-3-super-120b-a12b": {
    "context": 262144,
    "output": 262144
  },
  "nvidia-nemotron-3-ultra": {
    "context": 262144,
    "output": 131072
  },
  "nvidia-nemotron-3-ultra-550b-a55b": {
    "context": 256e3,
    "output": 32768
  },
  "nvidia.nemotron-nano-12b-v2": {
    "context": 131072,
    "output": 8192
  },
  "nvidia.nemotron-nano-3-30b": {
    "context": 262144,
    "output": 8192
  },
  "nvidia.nemotron-nano-9b-v2": {
    "context": 131072,
    "output": 8192
  },
  "nvidia.nemotron-super-3-120b": {
    "context": 262144,
    "output": 131072
  },
  "nvidia/bevformer": {
    "context": 128e3,
    "output": 8192
  },
  "nvidia/cosmos-reason2-8b": {
    "context": 131072,
    "output": 16384
  },
  "nvidia/GLM-5.3-Flash-NVFP4": {
    "context": 1e6,
    "output": 131072
  },
  "nvidia/llama-3.1-nemotron-70b-instruct": {
    "context": 128e3,
    "output": 8192
  },
  "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF": {
    "context": 16384,
    "output": 8192
  },
  "nvidia/llama-3.1-nemotron-safety-guard-8b-v3": {
    "context": 128e3,
    "output": 4096
  },
  "nvidia/llama-3.1-nemotron-ultra-253b-v1": {
    "context": 128e3,
    "output": 16384
  },
  "nvidia/Llama-3.3-70B-Instruct-FP8": {
    "context": 128e3,
    "output": 4096
  },
  "nvidia/Llama-3.3-Nemotron-Super-49B-v1": {
    "context": 128e3,
    "output": 16384
  },
  "nvidia/Llama-3.3-Nemotron-Super-49B-v1.5": {
    "context": 131072,
    "output": 131072
  },
  "nvidia/llama-nemotron-embed-vl-1b-v2": {
    "context": 8192,
    "output": 2048
  },
  "nvidia/llama-nemotron-rerank-vl-1b-v2": {
    "context": 10240,
    "output": 4096
  },
  "nvidia/Nemotron-3_5-Lightning": {
    "context": 1048576,
    "output": 1048576
  },
  "nvidia/Nemotron-3-Nano-30B-A3B": {
    "context": 262144,
    "output": 262144
  },
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning": {
    "context": 256e3,
    "output": 65536
  },
  "nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning": {
    "context": 262144,
    "output": 65536
  },
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free": {
    "context": 256e3,
    "output": 65536
  },
  "nvidia/Nemotron-3-Nano-Omni-Reasoning-30B-A3B": {
    "context": 256e3,
    "output": 65536
  },
  "nvidia/nemotron-3-super-120b-a12b:thinking": {
    "context": 262144,
    "output": 16384
  },
  "nvidia/Nemotron-3-Ultra-550b-a55b": {
    "context": 1048576,
    "output": 1048576
  },
  "nvidia/nemotron-3-ultra-550b-a55b:free": {
    "context": 1e6,
    "output": 65536
  },
  "nvidia/nemotron-3-ultra-550b-a55b:thinking": {
    "context": 1e6,
    "output": 65536
  },
  "nvidia/nemotron-3.5-content-safety:free": {
    "context": 128e3,
    "output": 8192
  },
  "nvidia/nemotron-3.5-lightning-free": {
    "context": 1e6,
    "output": 65e3
  },
  "nvidia/nemotron-3.5-lightning:free": {
    "context": 1e6,
    "output": 65536
  },
  "nvidia/nemotron-3.5-lightning:thinking": {
    "context": 1e6,
    "output": 65536
  },
  "nvidia/Nemotron-3.5-Super-VL": {
    "context": 1048576,
    "output": 1048576
  },
  "nvidia/nemotron-3.5-super-vl-120b-a12b": {
    "context": 1048576,
    "output": 8192
  },
  "nvidia/nemotron-3.5-super-vl:free": {
    "context": 1e6,
    "output": 131072
  },
  "nvidia/nemotron-nano-12b-v2-vl": {
    "context": 131072,
    "output": 131072
  },
  "nvidia/nemotron-voicechat": {
    "context": 128e3,
    "output": 8192
  },
  "nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B": {
    "context": 262144,
    "output": 262144
  },
  "nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16": {
    "context": 65536,
    "output": 65536
  },
  "nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-FP8": {
    "context": 1e6,
    "output": 262144
  },
  "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B": {
    "context": 262144,
    "output": 262144
  },
  "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16": {
    "context": 65536,
    "output": 65536
  },
  "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16": {
    "context": 65536,
    "output": 65536
  },
  "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B": {
    "context": 262144,
    "output": 262144
  },
  "nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "nvidia/NVIDIA-Nemotron-3.5-Super-VL": {
    "context": 262144,
    "output": 262144
  },
  "nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B": {
    "context": 1048576,
    "output": 1048576
  },
  "nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16": {
    "context": 65536,
    "output": 65536
  },
  "nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4": {
    "context": 262144,
    "output": 4096
  },
  "nvidia/Qwen3.8-27B-NVFP4": {
    "context": 262144,
    "output": 32768
  },
  "nvidia/rerank-qa-mistral-4b": {
    "context": 128e3,
    "output": 4096
  },
  "nvidia/riva-translate-4b-instruct-v1.1": {
    "context": 128e3,
    "output": 4096
  },
  "nvidia/sparsedrive": {
    "context": 128e3,
    "output": 8192
  },
  "nvidia/streampetr": {
    "context": 128e3,
    "output": 8192
  },
  "nvidia/usdcode": {
    "context": 128e3,
    "output": 4096
  },
  "o1": {
    "context": 2e5,
    "output": 1e5
  },
  "o1-mini": {
    "context": 128e3,
    "output": 65536
  },
  "o1-pro": {
    "context": 2e5,
    "output": 1e5
  },
  "o3": {
    "context": 2e5,
    "output": 1e5
  },
  "o3-mini": {
    "context": 2e5,
    "output": 1e5
  },
  "o3-pro": {
    "context": 2e5,
    "output": 1e5
  },
  "o4-mini": {
    "context": 2e5,
    "output": 1e5
  },
  "o4-mini@eu": {
    "context": 2e5,
    "output": 1e5
  },
  "olafangensan-glm-4.7-flash-heretic": {
    "context": 2e5,
    "output": 24e3
  },
  "open-mistral-nemo": {
    "context": 128e3,
    "output": 128e3
  },
  "openai-gpt-4o": {
    "context": 128e3,
    "output": 16384
  },
  "openai-gpt-4o-2024-11-20": {
    "context": 128e3,
    "output": 16384
  },
  "openai-gpt-4o-mini": {
    "context": 128e3,
    "output": 16384
  },
  "openai-gpt-4o-mini-2024-07-18": {
    "context": 128e3,
    "output": 16384
  },
  "openai-gpt-5.1": {
    "context": 272e3,
    "output": 8192
  },
  "openai-gpt-5.2": {
    "context": 4e5,
    "output": 128e3
  },
  "openai-gpt-5.2-pro": {
    "context": 4e5,
    "output": 128e3
  },
  "openai-gpt-5.3-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "openai-gpt-5.4-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "openai-gpt-5.4-nano": {
    "context": 4e5,
    "output": 128e3
  },
  "openai-gpt-5.4-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-5.6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-5.6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-5.6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-52": {
    "context": 256e3,
    "output": 65536
  },
  "openai-gpt-53-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "openai-gpt-54": {
    "context": 1e6,
    "output": 131072
  },
  "openai-gpt-54-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "openai-gpt-54-pro": {
    "context": 1e6,
    "output": 128e3
  },
  "openai-gpt-55": {
    "context": 1e6,
    "output": 131072
  },
  "openai-gpt-55-pro": {
    "context": 1e6,
    "output": 128e3
  },
  "openai-gpt-56-luna": {
    "context": 1e6,
    "output": 128e3
  },
  "openai-gpt-56-luna-pro": {
    "context": 1e6,
    "output": 128e3
  },
  "openai-gpt-56-sol": {
    "context": 1e6,
    "output": 128e3
  },
  "openai-gpt-56-sol-pro": {
    "context": 1e6,
    "output": 128e3
  },
  "openai-gpt-56-terra": {
    "context": 1e6,
    "output": 128e3
  },
  "openai-gpt-56-terra-pro": {
    "context": 1e6,
    "output": 128e3
  },
  "openai-gpt-6-1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-6-astra": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-6-astra-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-61-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-61-sol-ultrafast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-61-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "openai-gpt-oss-120b": {
    "context": 128e3
  },
  "openai-gpt-oss-20b": {
    "context": 128e3,
    "output": 4096
  },
  "openai-o1": {
    "context": 2e5,
    "output": 1e5
  },
  "openai-o3": {
    "context": 2e5,
    "output": 1e5
  },
  "openai-o3-mini": {
    "context": 2e5,
    "output": 1e5
  },
  "openai.gpt-5.4": {
    "context": 1e6,
    "output": 128e3
  },
  "openai.gpt-5.5": {
    "context": 1e6,
    "output": 128e3
  },
  "openai.gpt-5.6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "openai.gpt-5.6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "openai.gpt-5.6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "openai.gpt-6-astra": {
    "context": 105e4,
    "output": 128e3
  },
  "openai.gpt-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "openai.gpt-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "openai.gpt-6.1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "openai.gpt-6.1-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "openai.gpt-oss-120b-1:0": {
    "context": 131072,
    "output": 128e3
  },
  "openai.gpt-oss-20b-1:0": {
    "context": 131072,
    "output": 128e3
  },
  "openai.gpt-oss-safeguard-120b": {
    "context": 128e3,
    "output": 16384
  },
  "openai.gpt-oss-safeguard-20b": {
    "context": 128e3,
    "output": 16384
  },
  "openai/chat-completion/models/gpt-oss-120b-high-throughput": {
    "context": 131072,
    "output": 16384
  },
  "openai/chat-completion/models/gpt-oss-20b": {
    "context": 131072,
    "output": 16384
  },
  "openai/chat-latest": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/chatgpt-4o-latest": {
    "context": 128e3,
    "output": 8192
  },
  "openai/dall-e-3": {
    "context": 800
  },
  "openai/gpt-3.5-turbo-0613": {
    "context": 4095,
    "output": 3685
  },
  "openai/gpt-3.5-turbo-16k": {
    "context": 16385,
    "output": 4096
  },
  "openai/gpt-3.5-turbo-instruct": {
    "context": 3500,
    "output": 1024
  },
  "openai/gpt-3.5-turbo-raw": {
    "context": 4524,
    "output": 2048
  },
  "openai/gpt-4-turbo": {
    "context": 128e3,
    "output": 4096
  },
  "openai/gpt-4.1-fast": {
    "context": 1047576,
    "output": 32768
  },
  "openai/gpt-4.1-mini-fast": {
    "context": 1047576,
    "output": 32768
  },
  "openai/gpt-4o": {
    "context": 128e3
  },
  "openai/gpt-4o-2024-05-13": {
    "context": 128e3
  },
  "openai/gpt-4o-2024-08-06": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-4o-2024-11-20": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-4o-aug": {
    "context": 128e3,
    "output": 8192
  },
  "openai/gpt-4o-fast": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-4o-mini-2024-07-18": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-4o-mini-fast": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-4o-mini-search": {
    "context": 128e3,
    "output": 8192
  },
  "openai/gpt-4o-mini-transcribe": {
    "context": 16e3,
    "output": 2e3
  },
  "openai/gpt-4o-search": {
    "context": 128e3,
    "output": 8192
  },
  "openai/gpt-4o-transcribe": {
    "context": 16e3,
    "output": 2e3
  },
  "openai/gpt-5-1": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5-2": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5-4": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-5-5": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-5-chat": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-5-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5-fast": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5-image": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5-image-mini": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5-mini-fast": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5-pro": {
    "context": 4e5
  },
  "openai/gpt-5-search-api": {
    "context": 272e3
  },
  "openai/gpt-5.1-2025-11-13": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.1-chat-latest": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-5.1-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.1-instant": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-5.1-thinking": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.1-thinking-fast": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.2": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.2-chat-latest": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-5.2-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.2-fast": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.2-instant": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-5.2-pro": {
    "context": 4e5
  },
  "openai/gpt-5.3-chat-latest": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-5.3-codex": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.3-codex-fast": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.3-codex-spark": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-5.3-instant": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-5.4-fast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-5.4-image-2": {
    "context": 272e3,
    "output": 128e3
  },
  "openai/gpt-5.4-mini-fast": {
    "context": 4e5,
    "output": 128e3
  },
  "openai/gpt-5.5-fast": {
    "context": 1e6,
    "output": 128e3
  },
  "openai/gpt-5.6-luna": {
    "context": 105e4
  },
  "openai/gpt-5.6-luna-fast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-5.6-luna-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-5.6-sol": {
    "context": 105e4
  },
  "openai/gpt-5.6-sol-fast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-5.6-sol-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-5.6-terra": {
    "context": 105e4
  },
  "openai/gpt-5.6-terra-fast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-5.6-terra-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6-astra": {
    "context": 105e4
  },
  "openai/gpt-6-astra-fast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6-astra-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6-luna": {
    "context": 105e4
  },
  "openai/gpt-6-luna-fast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6-luna-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6-sol-fast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6-sol-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6.1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6.1-sol-fast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6.1-sol-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6.1-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6.1-terra-fast": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-6.1-terra-pro": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-astra-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-audio": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-audio-mini": {
    "context": 128e3,
    "output": 16384
  },
  "openai/gpt-image-1": {
    "context": 128e3
  },
  "openai/gpt-image-1.5": {
    "context": 128e3
  },
  "openai/gpt-image-2": {
    "context": 128e3
  },
  "openai/gpt-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-luna-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-mini-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-oss-120b-maas": {
    "context": 131072,
    "output": 131072
  },
  "openai/gpt-oss-120b:peft:131072": {
    "context": 131072,
    "output": 131072
  },
  "openai/gpt-oss-20b-maas": {
    "context": 131072,
    "output": 32768
  },
  "openai/gpt-pro-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-realtime-1.5": {
    "context": 32e3,
    "output": 4096
  },
  "openai/gpt-realtime-2": {
    "context": 128e3,
    "output": 32e3
  },
  "openai/gpt-realtime-2.1": {
    "context": 128e3,
    "output": 32e3
  },
  "openai/gpt-realtime-mini": {
    "context": 32e3,
    "output": 4096
  },
  "openai/gpt-realtime-whisper": {
    "context": 16e3,
    "output": 2e3
  },
  "openai/gpt-sol-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/gpt-terra-latest": {
    "context": 105e4,
    "output": 128e3
  },
  "openai/o1": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o1-pro": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o3": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o3-deep-research": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o3-fast": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o3-mini": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o3-mini-high": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o3-mini-low": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o3-pro": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o3-pro-2025-06-10": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o4-mini": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o4-mini-deep-research": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/o4-mini-high": {
    "context": 2e5,
    "output": 1e5
  },
  "openai/text-embedding-3-large": {
    "context": 8192
  },
  "openai/text-embedding-3-small": {
    "context": 8192
  },
  "openai/text-embedding-ada-002": {
    "context": 8192
  },
  "openai/whisper-1": {
    "context": 448e3,
    "output": 4096
  },
  "openai/whisper-large-v3": {
    "context": 448
  },
  "openai/whisper-large-v3-turbo": {
    "context": 448,
    "output": 448
  },
  "openrouter/auto": {
    "context": 2e6
  },
  "openrouter/bodybuilder": {
    "context": 128e3
  },
  "openrouter/free": {
    "context": 2e5
  },
  "openrouter/fusion": {
    "context": 1e6,
    "output": 128e3
  },
  "orcarouter/auto": {
    "context": 128e3,
    "output": 16384
  },
  "orcarouter/free": {
    "context": 65536,
    "output": 32768
  },
  "orcarouter/fusion": {
    "context": 1e6,
    "output": 128e3
  },
  "orcarouter/fusion-flash": {
    "context": 2e5,
    "output": 128e3
  },
  "orcarouter/fusion-mini": {
    "context": 1e6,
    "output": 128e3
  },
  "Ornith-1.0-35B-FP8": {
    "context": 262e3,
    "output": 1e5
  },
  "ornith-ai/ornith-1.5-122b": {
    "context": 262144,
    "output": 32768
  },
  "ornith-ai/ornith-1.5-35b-a3b": {
    "context": 262144,
    "output": 32768
  },
  "ornith-ai/Ornith-1.5-35B-A3B": {
    "context": 262144,
    "output": 32768
  },
  "ornith-ai/ornith-1.5-35b-a3b:thinking": {
    "context": 262144,
    "output": 32768
  },
  "osmosis/osmosis-structure-0.6b": {
    "context": 4e3,
    "output": 2048
  },
  "ovhcloud/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "ovhcloud/gpt-oss-20b": {
    "context": 131072,
    "output": 32768
  },
  "paddlepaddle/paddleocr-vl": {
    "context": 16384,
    "output": 16384
  },
  "PaddlePaddle/PaddleOCR-VL-1.5": {
    "context": 16384,
    "output": 16384
  },
  "pamanseau/OpenReasoning-Nemotron-32B": {
    "context": 32768,
    "output": 65536
  },
  "particle-ai/particle-1": {
    "context": 1048576,
    "output": 131072
  },
  "particle/particle-1": {
    "context": 1048576,
    "output": 131072
  },
  "perceptron/perceptron-mk1": {
    "context": 32768,
    "output": 8192
  },
  "perceptron/perceptron-mk1.5": {
    "context": 36864,
    "output": 8192
  },
  "perplexity/deepseek-v4-pro-0813": {
    "context": 1e6,
    "output": 384e3
  },
  "perplexity/glm-5.3": {
    "context": 1e6,
    "output": 131072
  },
  "perplexity/glm-5.3-flash": {
    "context": 1e6,
    "output": 131072
  },
  "perplexity/kimi-k3": {
    "context": 1048576,
    "output": 131072
  },
  "perplexity/nemotron-3.5-super-120b-a12b": {
    "context": 1048576,
    "output": 131072
  },
  "perplexity/pplx-embed-v1-0.6b": {
    "context": 32e3
  },
  "perplexity/pplx-embed-v1-4b": {
    "context": 32e3
  },
  "perplexity/sonar-deep-research": {
    "context": 128e3
  },
  "perplexity/sonar-pro": {
    "context": 2e5
  },
  "perplexity/sonar-pro-search": {
    "context": 2e5,
    "output": 8e3
  },
  "perplexity/sonar-reasoning-pro": {
    "context": 128e3
  },
  "perplexityai/sonar": {
    "context": 127072,
    "output": 4096
  },
  "perplexityai/sonar-deep-research": {
    "context": 128e3,
    "output": 32768
  },
  "perplexityai/sonar-pro": {
    "context": 2e5,
    "output": 8192
  },
  "perplexityai/sonar-reasoning-pro": {
    "context": 128e3,
    "output": 4096
  },
  "phi-4": {
    "context": 128e3,
    "output": 4096
  },
  "phi-4-mini": {
    "context": 128e3,
    "output": 4096
  },
  "phi-4-mini-instruct": {
    "context": 128e3,
    "output": 16384
  },
  "phi-4-mini-reasoning": {
    "context": 128e3,
    "output": 4096
  },
  "phi-4-multimodal": {
    "context": 128e3,
    "output": 4096
  },
  "phi-4-multimodal-instruct": {
    "context": 128e3,
    "output": 16384
  },
  "phi-4-reasoning": {
    "context": 32e3,
    "output": 4096
  },
  "phi-4-reasoning-plus": {
    "context": 32e3,
    "output": 4096
  },
  "pixtral-12b": {
    "context": 128e3,
    "output": 128e3
  },
  "pixtral-12b-2409": {
    "context": 128e3,
    "output": 4096
  },
  "pixtral-large-2502": {
    "context": 128e3,
    "output": 128e3
  },
  "pokee-isaac": {
    "context": 1e7,
    "output": 6e4
  },
  "poolside/laguna-m.1": {
    "context": 262144,
    "output": 32768
  },
  "poolside/laguna-s-2.1-free": {
    "context": 256e3,
    "output": 32768
  },
  "poolside/laguna-s-2.1:free": {
    "context": 262144,
    "output": 32768
  },
  "poolside/laguna-s-2.1:thinking": {
    "context": 1048576,
    "output": 131072
  },
  "poolside/laguna-xs-2.1": {
    "context": 262144
  },
  "poolside/laguna-xs-2.1:free": {
    "context": 262144,
    "output": 32768
  },
  "prism": {
    "context": 1e6,
    "output": 16e3
  },
  "prism-ml/ternary-bonsai-2-27b": {
    "context": 262144,
    "output": 32768
  },
  "prism-ml/ternary-bonsai-2-9b": {
    "context": 262144,
    "output": 65536
  },
  "Pro/deepseek-ai/DeepSeek-R1": {
    "context": 164e3,
    "output": 164e3
  },
  "Pro/deepseek-ai/DeepSeek-V3": {
    "context": 164e3,
    "output": 164e3
  },
  "Pro/deepseek-ai/DeepSeek-V3.1-Terminus": {
    "context": 164e3,
    "output": 164e3
  },
  "Pro/deepseek-ai/DeepSeek-V3.2": {
    "context": 164e3,
    "output": 164e3
  },
  "Pro/moonshotai/Kimi-K2.5": {
    "context": 262e3,
    "output": 262e3
  },
  "Pro/moonshotai/Kimi-K2.6": {
    "context": 262e3,
    "output": 262e3
  },
  "Pro/zai-org/GLM-5": {
    "context": 205e3,
    "output": 205e3
  },
  "Pro/zai-org/GLM-5.1": {
    "context": 205e3,
    "output": 205e3
  },
  "public/deepseek-r1": {
    "context": 131072,
    "output": 32e3
  },
  "public/deepseek-v3": {
    "context": 131072,
    "output": 8192
  },
  "public/minimax-m25": {
    "context": 204800,
    "output": 131072
  },
  "publicai/apertus-70b-instruct": {
    "context": 65536,
    "output": 8192
  },
  "publicai/apertus-8b-instruct": {
    "context": 65536,
    "output": 8192
  },
  "quartz/gemini-3.1-pro-preview": {
    "context": 1048576,
    "output": 65536
  },
  "quiverai/arrow-2": {
    "context": 131072,
    "output": 65536
  },
  "quiverai/arrow-2-telos": {
    "context": 131072,
    "output": 65536
  },
  "qvq-max": {
    "context": 131072,
    "output": 8192
  },
  "qwen-2.5-coder-32b": {
    "context": 128e3,
    "output": 8192
  },
  "qwen-3-6-plus": {
    "context": 1e6
  },
  "qwen-3-7-max": {
    "context": 1e6,
    "output": 65536
  },
  "qwen-3-7-plus": {
    "context": 1e6,
    "output": 65536
  },
  "qwen-3-8-2-4t-a95b": {
    "context": 262144,
    "output": 65536
  },
  "qwen-3-8-27b": {
    "context": 262144,
    "output": 65536
  },
  "qwen-3-8-flash": {
    "context": 1e6,
    "output": 131072
  },
  "qwen-3-8-max": {
    "context": 1e6,
    "output": 131072
  },
  "qwen-3.6-plus": {
    "context": 1e6,
    "output": 65536
  },
  "qwen-3.8-27b-flex": {
    "context": 262128,
    "output": 131072
  },
  "qwen-deep-research": {
    "context": 1e6,
    "output": 32768
  },
  "qwen-doc-turbo": {
    "context": 131072,
    "output": 8192
  },
  "qwen-flash": {
    "context": 1e6,
    "output": 32768
  },
  "qwen-image": {
    "context": 8192,
    "output": 4096
  },
  "qwen-image-2.0": {
    "context": 8192
  },
  "qwen-image-2.0-pro": {
    "context": 8192
  },
  "qwen-image-2.1": {
    "context": 8192
  },
  "qwen-long": {
    "context": 1e7,
    "output": 8192
  },
  "qwen-math-plus": {
    "context": 4096,
    "output": 3072
  },
  "qwen-math-turbo": {
    "context": 4096,
    "output": 3072
  },
  "qwen-max-2025-01-25": {
    "context": 128e3,
    "output": 4096
  },
  "qwen-mt-plus": {
    "context": 16384,
    "output": 8192
  },
  "qwen-mt-turbo": {
    "context": 16384,
    "output": 8192
  },
  "qwen-omni-turbo": {
    "context": 32768,
    "output": 2048
  },
  "qwen-omni-turbo-realtime": {
    "context": 32768,
    "output": 2048
  },
  "qwen-plus-character": {
    "context": 32768,
    "output": 4096
  },
  "qwen-plus-character-ja": {
    "context": 8192,
    "output": 512
  },
  "qwen-plus-latest": {
    "context": 1e6,
    "output": 8192
  },
  "qwen-turbo": {
    "context": 1e6
  },
  "qwen-vl-max": {
    "context": 131072,
    "output": 8192
  },
  "qwen-vl-max-2025-01-25": {
    "context": 128e3,
    "output": 4096
  },
  "qwen-vl-ocr": {
    "context": 34096,
    "output": 4096
  },
  "qwen-vl-plus": {
    "context": 131072,
    "output": 8192
  },
  "qwen.qwen3-235b-a22b-2507-v1:0": {
    "context": 262144,
    "output": 131072
  },
  "qwen.qwen3-32b-v1:0": {
    "context": 32768,
    "output": 16384
  },
  "qwen.qwen3-coder-30b-a3b-v1:0": {
    "context": 262144,
    "output": 131072
  },
  "qwen.qwen3-coder-480b-a35b-v1:0": {
    "context": 131072,
    "output": 65536
  },
  "qwen.qwen3-coder-next": {
    "context": 262144,
    "output": 65536
  },
  "qwen.qwen3-next-80b-a3b": {
    "context": 262144,
    "output": 262e3
  },
  "qwen.qwen3-vl-235b-a22b": {
    "context": 262144,
    "output": 262e3
  },
  "qwen/deepseek-v4-flash-0731": {
    "context": 1e6,
    "output": 384e3
  },
  "qwen/deepseek-v4-pro-0813": {
    "context": 1e6,
    "output": 384e3
  },
  "qwen/deepseek-v4.1-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "qwen/deepseek-v4.1-flash-1017": {
    "context": 1e6,
    "output": 384e3
  },
  "qwen/qwen-2.5-7b-instruct": {
    "context": 32768,
    "output": 29491
  },
  "qwen/qwen-2.5-7b-vision-instruct": {
    "context": 125e3,
    "output": 4096
  },
  "qwen/qwen-2.5-coder-32b-instruct": {
    "context": 32768,
    "output": 29491
  },
  "qwen/qwen-flash": {
    "context": 1e6
  },
  "qwen/qwen-long": {
    "context": 1e7,
    "output": 8192
  },
  "qwen/qwen-vl-max": {
    "context": 128e3,
    "output": 8e3
  },
  "Qwen/Qwen2.5-7B-Instruct": {
    "context": 33e3,
    "output": 4e3
  },
  "Qwen/Qwen2.5-7B-Instruct-Turbo": {
    "context": 32768,
    "output": 32768
  },
  "qwen/qwen2.5-coder-32b-instruct": {
    "context": 32e3,
    "output": 8192
  },
  "Qwen/Qwen2.5-Coder-32B-Instruct": {
    "context": 131072,
    "output": 8192
  },
  "Qwen/Qwen3-14B": {
    "context": 131e3,
    "output": 131e3
  },
  "Qwen/Qwen3-235B-A22B": {
    "context": 40960,
    "output": 16384
  },
  "qwen/qwen3-235b-a22b-fp8": {
    "context": 40960,
    "output": 2e4
  },
  "qwen/qwen3-235b-a22b-instruct-2507-maas": {
    "context": 262144,
    "output": 16384
  },
  "Qwen/Qwen3-235B-A22B-Instruct-2507-tput": {
    "context": 262144,
    "output": 262144
  },
  "Qwen/Qwen3-235B-A22B-Thinking-2507": {
    "context": 262144
  },
  "Qwen/Qwen3-30B-A3B": {
    "context": 40960,
    "output": 16384
  },
  "qwen/qwen3-30b-a3b-2507": {
    "context": 262144,
    "output": 16384
  },
  "qwen/qwen3-30b-a3b-fp8": {
    "context": 40960,
    "output": 2e4
  },
  "Qwen/Qwen3-30B-A3B-Thinking-2507": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3-32b-fp8": {
    "context": 40960,
    "output": 2e4
  },
  "qwen/qwen3-8b": {
    "context": 41e3,
    "output": 32768
  },
  "qwen/qwen3-coder-30b": {
    "context": 262144,
    "output": 65536
  },
  "Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8": {
    "context": 262144,
    "output": 262144
  },
  "Qwen/Qwen3-Coder-480B-A35B-Instruct-Turbo": {
    "context": 262144,
    "output": 66536
  },
  "Qwen/Qwen3-Coder-Next": {
    "context": 262144,
    "output": 65536
  },
  "Qwen/Qwen3-Coder-Next-FP8": {
    "context": 262144,
    "output": 262144
  },
  "qwen/qwen3-coder-plus": {
    "context": 1e6
  },
  "Qwen/Qwen3-Embedding-0.6B": {
    "context": 32768,
    "output": 1024
  },
  "qwen/qwen3-embedding-4b": {
    "context": 32e3,
    "output": 2048
  },
  "Qwen/Qwen3-Embedding-4B": {
    "context": 32768
  },
  "qwen/qwen3-embedding-8b": {
    "context": 32768
  },
  "Qwen/Qwen3-Max": {
    "context": 256e3,
    "output": 65536
  },
  "qwen/qwen3-max-preview": {
    "context": 256e3,
    "output": 65536
  },
  "Qwen/Qwen3-Next-80B-A3B-Instruct": {
    "context": 262144
  },
  "qwen/qwen3-omni-30b-a3b-thinking": {
    "context": 65536,
    "output": 16384
  },
  "Qwen/Qwen3-Reranker-0.6B": {
    "context": 40960,
    "output": 1024
  },
  "Qwen/Qwen3-Reranker-4B": {
    "context": 32e3,
    "output": 4096
  },
  "qwen/qwen3-reranker-8b": {
    "context": 32768
  },
  "Qwen/Qwen3-VL-235B-A22B-Instruct-FP8": {
    "context": 218e3,
    "output": 16384
  },
  "qwen/qwen3-vl-235b-a22b-thinking": {
    "context": 131072
  },
  "Qwen/Qwen3-VL-235B-A22B-Thinking": {
    "context": 131072,
    "output": 32768
  },
  "qwen/qwen3-vl-30b-a3b-thinking": {
    "context": 262144,
    "output": 235929
  },
  "Qwen/Qwen3-VL-30B-A3B-Thinking": {
    "context": 262e3,
    "output": 262e3
  },
  "Qwen/Qwen3-VL-32B-Instruct": {
    "context": 262e3,
    "output": 262e3
  },
  "Qwen/Qwen3-VL-32B-Thinking": {
    "context": 262e3,
    "output": 262e3
  },
  "qwen/qwen3-vl-8b-instruct": {
    "context": 262144,
    "output": 235929
  },
  "Qwen/Qwen3-VL-8B-Instruct": {
    "context": 262e3,
    "output": 262e3
  },
  "Qwen/Qwen3-VL-Embedding-8B": {
    "context": 32e3,
    "output": 4096
  },
  "qwen/qwen3-vl-flash": {
    "context": 262144,
    "output": 65536
  },
  "Qwen/Qwen3.5-122B-A10B": {
    "context": 262144
  },
  "Qwen/Qwen3.5-122B-A10B-FP8": {
    "context": 2e5,
    "output": 65536
  },
  "qwen/qwen3.5-122b-a10b:thinking": {
    "context": 262144,
    "output": 32768
  },
  "Qwen/Qwen3.5-27B": {
    "context": 262144
  },
  "qwen/qwen3.5-27b:thinking": {
    "context": 260096,
    "output": 65536
  },
  "Qwen/Qwen3.5-35B-A3B": {
    "context": 262144
  },
  "Qwen/Qwen3.5-35B-A3B-Base": {
    "context": 65536,
    "output": 65536
  },
  "qwen/qwen3.5-35b-a3b:thinking": {
    "context": 260096,
    "output": 65536
  },
  "Qwen/Qwen3.5-397B-A17B-FP8": {
    "context": 2e5,
    "output": 65536
  },
  "Qwen/Qwen3.5-397B-A17B-TEE": {
    "context": 262144,
    "output": 65536
  },
  "Qwen/Qwen3.5-397B-A17B:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "qwen/qwen3.5-397b-a17b:thinking": {
    "context": 262144,
    "output": 65536
  },
  "qwen/qwen3.5-4b": {
    "context": 262144,
    "output": 32768
  },
  "Qwen/Qwen3.5-4B:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "qwen/qwen3.5-9b": {
    "context": 262144
  },
  "Qwen/Qwen3.5-9B-Base": {
    "context": 65536,
    "output": 65536
  },
  "qwen/qwen3.5-flash-02-23": {
    "context": 1e6,
    "output": 65536
  },
  "qwen/qwen3.5-flash:thinking": {
    "context": 991808,
    "output": 65536
  },
  "qwen/qwen3.5-omni-flash": {
    "context": 49152,
    "output": 16384
  },
  "qwen/qwen3.5-omni-plus": {
    "context": 983616,
    "output": 65536
  },
  "Qwen/Qwen3.5-Plus": {
    "context": 1e6,
    "output": 65536
  },
  "qwen/qwen3.5-plus-02-15": {
    "context": 1e6,
    "output": 65536
  },
  "qwen/qwen3.5-plus-20260420": {
    "context": 1e6,
    "output": 65536
  },
  "qwen/qwen3.5-plus:thinking": {
    "context": 983616,
    "output": 65536
  },
  "Qwen/Qwen3.6-27B-TEE": {
    "context": 262144,
    "output": 65536
  },
  "qwen/qwen3.6-27b:thinking": {
    "context": 262144,
    "output": 65536
  },
  "Qwen/Qwen3.6-35B-A3B-FP8": {
    "context": 262144
  },
  "Qwen/Qwen3.6-35B-A3B:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "qwen/qwen3.6-35b-a3b:thinking": {
    "context": 1048576,
    "output": 16384
  },
  "Qwen/Qwen3.6-Plus": {
    "context": 1e6,
    "output": 65536
  },
  "qwen/qwen3.7-flash:thinking": {
    "context": 983616,
    "output": 65536
  },
  "qwen/qwen3.7-max:thinking": {
    "context": 1e6,
    "output": 65536
  },
  "qwen/qwen3.7-plus:thinking": {
    "context": 983616,
    "output": 65536
  },
  "Qwen/Qwen3.8-27B-abliterated": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3.8-27b-antislop": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3.8-27b-cybersecurity": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3.8-27b-darkidol": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3.8-27b-fable": {
    "context": 524288,
    "output": 32768
  },
  "qwen/qwen3.8-27b-fimi": {
    "context": 262144,
    "output": 32768
  },
  "Qwen/Qwen3.8-27B-FP8": {
    "context": 262144,
    "output": 65536
  },
  "qwen/qwen3.8-27b-hemmingway": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3.8-27b-kimiko": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3.8-27b-kiwen": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3.8-27b-novelist": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3.8-27b-queen": {
    "context": 524288,
    "output": 32768
  },
  "qwen/qwen3.8-27b-swift": {
    "context": 262144,
    "output": 32768
  },
  "qwen/qwen3.8-27b-synthia": {
    "context": 262144,
    "output": 32768
  },
  "Qwen/Qwen3.8-27B-TEE": {
    "context": 262144,
    "output": 65536
  },
  "qwen/qwen3.8-27b-uncensored": {
    "context": 1048576,
    "output": 65536
  },
  "qwen/qwen3.8-27b-uncensored:thinking": {
    "context": 1048576,
    "output": 65536
  },
  "Qwen/Qwen3.8-27B:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "qwen/qwen3.8-27b:thinking": {
    "context": 1048576,
    "output": 32768
  },
  "qwen/qwen3.8-flash-next": {
    "context": 262144,
    "output": 64e3
  },
  "Qwen/Qwen3.8-Max-0902": {
    "context": 1e6,
    "output": 131072
  },
  "qwen/qwen3.8-max-preview": {
    "context": 1e6,
    "output": 131072
  },
  "qwen/qwen3.8-max-prime": {
    "context": 1e6,
    "output": 131072
  },
  "qwen/qwen3.8-max:thinking": {
    "context": 991e3,
    "output": 131072
  },
  "Qwen/Qwen3.8-Omni-Flash": {
    "context": 1e6,
    "output": 131072
  },
  "qwen/qwenCoder/models/Qwen3-Coder-30B-A3B-Instruct": {
    "context": 262144,
    "output": 65536
  },
  "qwen/qwenLM/models/Qwen3-30B-A3B-Instruct-2507": {
    "context": 262144,
    "output": 262144
  },
  "qwen/qwenLM/models/Qwen3-30B-A3B-Thinking-2507": {
    "context": 262144,
    "output": 131072
  },
  "Qwen/QwQ-32B": {
    "context": 32768,
    "output": 32768
  },
  "qwen2-5-omni-7b": {
    "context": 32768,
    "output": 2048
  },
  "qwen2.5-coder-7b-fast": {
    "context": 32e3,
    "output": 8192
  },
  "Qwen3_5-9B-MLX-4bit": {
    "context": 32768,
    "output": 8192
  },
  "Qwen3_5-9B-Q4_K_M": {
    "context": 32768,
    "output": 8192
  },
  "qwen3-235b-a22b-thinking": {
    "context": 262144,
    "output": 81920
  },
  "qwen3-30b-a3b-thinking-2507": {
    "context": 126e3,
    "output": 32e3
  },
  "qwen3-5-122b-a10b": {
    "context": 256e3,
    "output": 64e3
  },
  "qwen3-5-27b": {
    "context": 256e3,
    "output": 64e3
  },
  "qwen3-5-35b-a3b": {
    "context": 256e3
  },
  "qwen3-5-4b": {
    "context": 262144,
    "output": 32768
  },
  "qwen3-5-9b": {
    "context": 262144,
    "output": 32768
  },
  "qwen3-5-flash": {
    "context": 1e6,
    "output": 32768
  },
  "qwen3-5-plus": {
    "context": 1e6,
    "output": 65536
  },
  "qwen3-6-27b": {
    "context": 256e3
  },
  "qwen3-6-35b": {
    "context": 16384,
    "output": 16384
  },
  "qwen3-6-flash": {
    "context": 1e6,
    "output": 65536
  },
  "qwen3-6-plus": {
    "context": 1e6,
    "output": 65536
  },
  "qwen3-7-flash": {
    "context": 1e6,
    "output": 65536
  },
  "qwen3-7-max": {
    "context": 1e6,
    "output": 65536
  },
  "qwen3-7-plus": {
    "context": 1e6
  },
  "qwen3-8-27b": {
    "context": 262144,
    "output": 32768
  },
  "qwen3-8-flash": {
    "context": 1e6,
    "output": 131072
  },
  "qwen3-8-max": {
    "context": 1e6,
    "output": 131072
  },
  "qwen3-8-max-0902": {
    "context": 1e6,
    "output": 131072
  },
  "qwen3-8-omni-flash": {
    "context": 1e6,
    "output": 131072
  },
  "qwen3-8b": {
    "context": 131072,
    "output": 8192
  },
  "qwen3-asr-flash": {
    "context": 53248,
    "output": 4096
  },
  "qwen3-coder": {
    "context": 262144
  },
  "qwen3-coder-480b-a35b-instruct-turbo": {
    "context": 256e3,
    "output": 65536
  },
  "Qwen3-Coder-Next-FP8": {
    "context": 256144,
    "output": 65536
  },
  "Qwen3-Coder-Next-FP8-no-thinking": {
    "context": 26e4,
    "output": 65536
  },
  "qwen3-coder:30b": {
    "context": 262144,
    "output": 65536
  },
  "qwen3-embedding-0.6b": {
    "context": 8e3,
    "output": 1024
  },
  "qwen3-embedding-4b": {
    "context": 32e3,
    "output": 2560
  },
  "qwen3-embedding-8b": {
    "context": 32768,
    "output": 8192
  },
  "Qwen3-Embedding-8B": {
    "context": 32768
  },
  "qwen3-livetranslate-flash-realtime": {
    "context": 53248,
    "output": 4096
  },
  "qwen3-max-2025-09-23": {
    "context": 258048,
    "output": 65536
  },
  "qwen3-max-2026-01-23": {
    "context": 262144,
    "output": 32768
  },
  "qwen3-max-preview": {
    "context": 256e3,
    "output": 64e3
  },
  "qwen3-next-80b": {
    "context": 256e3,
    "output": 16384
  },
  "Qwen3-Next-80B-A3B-Instruct": {
    "context": 129024,
    "output": 32768
  },
  "qwen3-next-80b-a3b-thinking": {
    "context": 131072,
    "output": 32768
  },
  "Qwen3-Next-80B-A3B-Thinking": {
    "context": 262144,
    "output": 32768
  },
  "qwen3-omni-flash": {
    "context": 65536,
    "output": 16384
  },
  "qwen3-omni-flash-realtime": {
    "context": 65536,
    "output": 16384
  },
  "qwen3-reranker-4b": {
    "context": 32768,
    "output": 8192
  },
  "qwen3-tts-voicedesign": {
    "context": 32768,
    "output": 1
  },
  "Qwen3-VL-235B-A22B-Instruct": {
    "context": 129024,
    "output": 32768
  },
  "qwen3-vl-235b-a22b-instruct-original": {
    "context": 32768,
    "output": 32768
  },
  "Qwen3-VL-235B-A22B-Thinking": {
    "context": 131072,
    "output": 32768
  },
  "qwen3-vl-30b-a3b": {
    "context": 131072,
    "output": 32768
  },
  "qwen3-vl-30b-a3b-instruct": {
    "context": 262144,
    "output": 8192
  },
  "qwen3-vl-30b-a3b-thinking": {
    "context": 128e3,
    "output": 32e3
  },
  "qwen3-vl-plus": {
    "context": 262144,
    "output": 32768
  },
  "qwen3.5-0.8b": {
    "context": 32768,
    "output": 8192
  },
  "qwen3.5-122b": {
    "context": 262144,
    "output": 16384
  },
  "qwen3.5-122b-a10b": {
    "context": 262144,
    "output": 65536
  },
  "Qwen3.5-122B-A10B": {
    "context": 262144,
    "output": 65536
  },
  "qwen3.5-27b": {
    "context": 262144,
    "output": 65536
  },
  "Qwen3.5-27B": {
    "context": 262144,
    "output": 65536
  },
  "Qwen3.5-27B-Blossom-V6.4-Derestricted": {
    "context": 262144,
    "output": 262144
  },
  "Qwen3.5-27B-BlueStar-v3-Derestricted": {
    "context": 262144,
    "output": 16384
  },
  "Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-Derestricted": {
    "context": 262144,
    "output": 262144
  },
  "Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-Derestricted-Lite": {
    "context": 262144,
    "output": 262144
  },
  "Qwen3.5-27B-Queen-Derestricted": {
    "context": 262144,
    "output": 16384
  },
  "qwen3.5-35b-a3b": {
    "context": 262144,
    "output": 65536
  },
  "Qwen3.5-35B-A3B": {
    "context": 262144,
    "output": 65536
  },
  "Qwen3.5-397B-A17B": {
    "context": 262144,
    "output": 65536
  },
  "qwen3.5-397b-a17b:free": {
    "context": 262144,
    "output": 65536
  },
  "qwen3.5-4b": {
    "context": 32768,
    "output": 8192
  },
  "qwen3.5-flash": {
    "context": 1e6,
    "output": 65536
  },
  "qwen3.6": {
    "context": 262144,
    "output": 65536
  },
  "Qwen3.6-27B-FP8": {
    "context": 262144,
    "output": 65536
  },
  "Qwen3.6-35B-A3B-FP8": {
    "context": 262e3,
    "output": 65536
  },
  "Qwen3.6-35B-A3B-fp8-no-thinking": {
    "context": 262e3,
    "output": 65536
  },
  "qwen3.6-35b-fast": {
    "context": 131056,
    "output": 131056
  },
  "qwen3.6-35b-flex": {
    "context": 131056,
    "output": 131056
  },
  "Qwen3.6-Flash": {
    "context": 1e6,
    "output": 65536
  },
  "qwen3.6-plus-free": {
    "context": 262144,
    "output": 65536
  },
  "qwen3.6:27b": {
    "context": 262144,
    "output": 65536
  },
  "qwen3.7-max-2026-06-08": {
    "context": 1e6,
    "output": 131072
  },
  "qwen3.8-2.4T-A95B": {
    "context": 262144,
    "output": 262144
  },
  "qwen3.8-2.4T-A95B@eu": {
    "context": 1e6,
    "output": 262144
  },
  "Qwen3.8-Flash": {
    "context": 1e6,
    "output": 131072
  },
  "qwen3.8-flash-free": {
    "context": 1e6,
    "output": 131072
  },
  "qwen3.8-flash-next": {
    "context": 262144
  },
  "Qwen3.8-Flash-Next": {
    "context": 262144,
    "output": 131072
  },
  "qwen3.8-flash-next@eu": {
    "context": 262144,
    "output": 262144
  },
  "Qwen3.8-Max": {
    "context": 1e6,
    "output": 131072
  },
  "qwen3.8-max-free": {
    "context": 1e6,
    "output": 131072
  },
  "qwen3.8-max-preview": {
    "context": 1e6,
    "output": 131072
  },
  "qwen35-122b-a10b": {
    "context": 262144,
    "output": 25e3
  },
  "qwen35-397b-a17b": {
    "context": 262144,
    "output": 65536
  },
  "qwq-plus": {
    "context": 131072,
    "output": 8192
  },
  "ranoai/deepseek-v4-flash": {
    "context": 1e6,
    "output": 393216
  },
  "ReadyArt/MS3.2-The-Omega-Directive-24B-Unslop-v2.0": {
    "context": 32768,
    "output": 32768
  },
  "recraft/recraft-v2": {
    "context": 512
  },
  "recraft/recraft-v3": {
    "context": 512
  },
  "recursive/flint-v1.0:free": {
    "context": 262144,
    "output": 235929
  },
  "reflection-ai/beam-1.0-501b-a23b": {
    "context": 262144,
    "output": 131072
  },
  "reflection-beam": {
    "context": 1048576,
    "output": 1048576
  },
  "reflection/beam": {
    "context": 1048576,
    "output": 131072
  },
  "reflection/beam-1.0": {
    "context": 1048576,
    "output": 131072
  },
  "reflection/beam-1.0-501b-a23b": {
    "context": 1048576,
    "output": 131072
  },
  "reflection/Beam-1.0-501B-A23B": {
    "context": 1048576
  },
  "reflection/beam-free": {
    "context": 1048576,
    "output": 131072
  },
  "reka-ai/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 393216
  },
  "reka-ai/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 393216
  },
  "reka-ai/glm-5.3": {
    "context": 1048576,
    "output": 262144
  },
  "reka-ai/glm-5.3-flash": {
    "context": 1048576,
    "output": 262144
  },
  "reka-ai/reka-edge-2603": {
    "context": 16384,
    "output": 16384
  },
  "reka-edge-2603": {
    "context": 16384,
    "output": 16384
  },
  "reka/reka-edge-2603": {
    "context": 16384,
    "output": 16384
  },
  "reka/reka-flash-3": {
    "context": 65536,
    "output": 65536
  },
  "rekaai/reka-edge": {
    "context": 16384
  },
  "rekaai/reka-flash-3": {
    "context": 65536,
    "output": 58982
  },
  "relace/relace-apply-3": {
    "context": 256e3,
    "output": 128e3
  },
  "relace/relace-search": {
    "context": 256e3,
    "output": 128e3
  },
  "Ring-1T": {
    "context": 128e3,
    "output": 32e3
  },
  "ring-2.6-1t": {
    "context": 262144,
    "output": 262144
  },
  "ring-2.6-1t-free": {
    "context": 262e3,
    "output": 66e3
  },
  "route-llm": {
    "context": 128e3,
    "output": 64e3
  },
  "runpod/kimi-k3": {
    "context": 1048576,
    "output": 1048576
  },
  "runware/deepseek-v4-flash": {
    "context": 1048576,
    "output": 384e3
  },
  "runware/deepseek-v4-pro": {
    "context": 1048576,
    "output": 384e3
  },
  "runware/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 384e3
  },
  "runware/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 1048576
  },
  "runware/gemma-4-31b-it": {
    "context": 262144,
    "output": 65536
  },
  "runware/glm-5.2": {
    "context": 1024e3,
    "output": 128e3
  },
  "runware/glm-5.3": {
    "context": 1e6,
    "output": 131072
  },
  "runware/glm-5.3-flash": {
    "context": 1e6,
    "output": 131072
  },
  "runware/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "runware/kimi-k2.6": {
    "context": 262144,
    "output": 131072
  },
  "runware/kimi-k3": {
    "context": 1048576,
    "output": 1048576
  },
  "runwayml/runway": {
    "context": 256
  },
  "runwayml/runway-gen-4-turbo": {
    "context": 256
  },
  "sakana-namazu": {
    "context": 262144,
    "output": 65536
  },
  "sakana/fugu-max": {
    "context": 1e6
  },
  "sakana/fugu-ultra": {
    "context": 1e6
  },
  "sakana/fugu-ultra-v1.1": {
    "context": 1e6,
    "output": 16384
  },
  "sakana/fugu-ultra-v2": {
    "context": 1e6
  },
  "sakana/fugu-ultra-v2.0": {
    "context": 1e6,
    "output": 1e6
  },
  "sakana/namazu": {
    "context": 256e3,
    "output": 256e3
  },
  "sakana/sakana-namazu": {
    "context": 262144,
    "output": 65536
  },
  "Salesforce/Llama-xLAM-2-70b-fc-r": {
    "context": 128e3,
    "output": 16384
  },
  "Sao10K/L3-8B-Stheno-v3.2": {
    "context": 16384,
    "output": 8192
  },
  "sao10k/l3-lunaris-8b": {
    "context": 8192,
    "output": 7372
  },
  "Sao10K/L3.1-70B-Euryale-v2.2": {
    "context": 20480,
    "output": 16384
  },
  "Sao10K/L3.1-70B-Hanami-x1": {
    "context": 32768,
    "output": 16384
  },
  "sao10k/l3.1-euryale-70b": {
    "context": 131072,
    "output": 16384
  },
  "Sao10K/L3.3-70B-Euryale-v2.3": {
    "context": 20480,
    "output": 16384
  },
  "sao10k/l3.3-euryale-70b": {
    "context": 131072,
    "output": 16384
  },
  "sap-abap-1": {
    "context": 32768,
    "output": 4096
  },
  "sarvam-105b": {
    "context": 131072
  },
  "sarvam-30b": {
    "context": 65536,
    "output": 65536
  },
  "sarvam/sarvam-105b": {
    "context": 131072,
    "output": 131072
  },
  "scaledown/extract": {
    "context": 1e6,
    "output": 9e5
  },
  "scaledown/scaledown-extract-1": {
    "context": 1e6,
    "output": 1e6
  },
  "scaledown/scaledown-summarize-1": {
    "context": 1e6,
    "output": 1e3
  },
  "scaledown/summarize": {
    "context": 1e6,
    "output": 4e3
  },
  "scaleway/deepseek-v4-flash-0731": {
    "context": 256e3,
    "output": 384e3
  },
  "scaleway/deepseek-v4.1-flash": {
    "context": 256e3,
    "output": 384e3
  },
  "scaleway/deepseek-v4.1-flash-1017": {
    "context": 1e6,
    "output": 384e3
  },
  "scaleway/gemma-3-27b-it": {
    "context": 4e4,
    "output": 131072
  },
  "scaleway/gpt-oss-120b": {
    "context": 128e3,
    "output": 32768
  },
  "scaleway/llama-3.3-70b-instruct": {
    "context": 128e3,
    "output": 4096
  },
  "scaleway/qwen3-235b-a22b-instruct-2507": {
    "context": 25e4,
    "output": 16384
  },
  "scaleway/qwen3-coder-30b-a3b-instruct": {
    "context": 128e3,
    "output": 65536
  },
  "sciforium/deepseek-v4.1-flash-1017": {
    "context": 1056784,
    "output": 384e3
  },
  "scx-ai-gp/deepseek-v4.1-flash": {
    "context": 1e6,
    "output": 384e3
  },
  "scx-ai-gp/glm-5.2": {
    "context": 1e6,
    "output": 131072
  },
  "scx-ai-gp/glm-5.2-fast": {
    "context": 1e6,
    "output": 131072
  },
  "scx-ai-gp/glm-5.3": {
    "context": 1e6,
    "output": 128e3
  },
  "scx-ai-gp/glm-5.3-fast": {
    "context": 1e6,
    "output": 128e3
  },
  "scx-ai-gp/glm-5.3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "scx-ai-gp/kimi-k2.7-code": {
    "context": 262144,
    "output": 262144
  },
  "scx-ai-gp/kimi-k3": {
    "context": 1048576,
    "output": 1048576
  },
  "scx-ai-gp/qwen3.8-max": {
    "context": 1e6,
    "output": 131072
  },
  "scx-ai/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "scx-ai/minimax-m2.7": {
    "context": 196608,
    "output": 196608
  },
  "scx-ai/qwen3-32b": {
    "context": 32768,
    "output": 8192
  },
  "seed-1-6-250615": {
    "context": 256e3,
    "output": 8192
  },
  "seed-1-6-250915": {
    "context": 256e3,
    "output": 8192
  },
  "seed-1-6-flash-250715": {
    "context": 256e3,
    "output": 8192
  },
  "seed-1-8-251228": {
    "context": 256e3,
    "output": 8192
  },
  "seed-1.8": {
    "context": 256e3,
    "output": 64e3
  },
  "seed-2-0-code": {
    "context": 256e3,
    "output": 128e3
  },
  "seed-2-0-code-preview-260328": {
    "context": 262144,
    "output": 262144
  },
  "seed-2-0-lite": {
    "context": 256e3,
    "output": 128e3
  },
  "seed-2-0-lite-260428": {
    "context": 262144,
    "output": 262144
  },
  "seed-2-0-mini": {
    "context": 256e3,
    "output": 128e3
  },
  "seed-2-0-mini-260428": {
    "context": 262144,
    "output": 262144
  },
  "seed-2-0-pro": {
    "context": 256e3,
    "output": 128e3
  },
  "seed-2-0-pro-260328": {
    "context": 262144,
    "output": 262144
  },
  "seed-2-1-turbo": {
    "context": 256e3,
    "output": 65536
  },
  "seed-2.0-code": {
    "context": 256e3,
    "output": 131072
  },
  "seed-2.0-mini": {
    "context": 256e3,
    "output": 32e3
  },
  "seed-2.0-pro": {
    "context": 256e3,
    "output": 128e3
  },
  "sensenova-6.8-flash-lite": {
    "context": 262144,
    "output": 65536
  },
  "sference/deepseek-ai/DeepSeek-V4-Flash-0731": {
    "context": 1048576,
    "output": 384e3
  },
  "sference/deepseek-ai/DeepSeek-V4.1-Flash-1017": {
    "context": 1048576,
    "output": 384e3
  },
  "shisa-ai/shisa-v2-llama3.3-70b": {
    "context": 128e3,
    "output": 16384
  },
  "shisa-ai/shisa-v2.1-llama3.3-70b": {
    "context": 32768,
    "output": 4096
  },
  "siliconflow/deepseek-r1-0528": {
    "context": 163840,
    "output": 32768
  },
  "siliconflow/deepseek-v3-0324": {
    "context": 163840,
    "output": 163840
  },
  "siliconflow/deepseek-v3.1-terminus": {
    "context": 163840,
    "output": 65536
  },
  "siliconflow/deepseek-v3.2": {
    "context": 163840,
    "output": 65536
  },
  "snowflake-llama3.3-70b": {
    "context": 128e3,
    "output": 4096
  },
  "solar-mini": {
    "context": 32768,
    "output": 4096
  },
  "solar-mini4": {
    "context": 524288,
    "output": 131072
  },
  "solar-pro2": {
    "context": 65536,
    "output": 8192
  },
  "solar-pro3": {
    "context": 131072,
    "output": 8192
  },
  "solar-pro4": {
    "context": 524288,
    "output": 131072
  },
  "sonar-pro": {
    "context": 2e5
  },
  "sonar-reasoning": {
    "context": 127e3,
    "output": 4096
  },
  "soob3123/amoral-gemma3-27B-v2": {
    "context": 32768,
    "output": 8192
  },
  "soob3123/Veiled-Calla-12B": {
    "context": 32768,
    "output": 8192
  },
  "space-bunny": {
    "context": 1048576,
    "output": 524288
  },
  "space-bunny-free": {
    "context": 1048576,
    "output": 524288
  },
  "spacexai/grok-4.20-multi-agent": {
    "context": 2e6,
    "output": 2e6
  },
  "spacexai/grok-4.20-multi-agent-beta": {
    "context": 2e6,
    "output": 2e6
  },
  "spacexai/grok-4.20-non-reasoning": {
    "context": 2e6,
    "output": 2e6
  },
  "spacexai/grok-4.20-non-reasoning-beta": {
    "context": 2e6,
    "output": 2e6
  },
  "spacexai/grok-4.20-reasoning": {
    "context": 2e6,
    "output": 2e6
  },
  "spacexai/grok-4.20-reasoning-beta": {
    "context": 2e6,
    "output": 2e6
  },
  "spacexai/grok-4.3": {
    "context": 1e6,
    "output": 1e6
  },
  "spacexai/grok-4.5": {
    "context": 5e5,
    "output": 5e5
  },
  "spacexai/grok-4.6": {
    "context": 5e5,
    "output": 5e5
  },
  "spacexai/grok-4.7": {
    "context": 5e5,
    "output": 5e5
  },
  "spacexai/grok-build-0.1": {
    "context": 256e3,
    "output": 256e3
  },
  "spacexai/grok-imagine-image": {
    "context": 16e3
  },
  "spacexai/grok-imagine-image-2.0": {
    "context": 64e3
  },
  "spacexai/grok-imagine-video-1.5": {
    "context": 1024
  },
  "spacexai/grok-imagine-video-1.5-lite": {
    "context": 1024
  },
  "spacexai/grok-tts": {
    "context": 15e3,
    "output": 15e3
  },
  "speakleash/bielik-11b-v3.0-instruct": {
    "context": 32768,
    "output": 32768
  },
  "speakleash/Bielik-11B-v3.0-Instruct": {
    "context": 32e3,
    "output": 32e3
  },
  "stabilityai/stablediffusionxl": {
    "context": 200
  },
  "stable-diffusion-3.5-large": {
    "context": 256,
    "output": 1
  },
  "standardcompute": {
    "context": 1e6,
    "output": 5e4
  },
  "stealth/glyph-cluster": {
    "context": 256e3,
    "output": 256e3
  },
  "Steelskull/L3.3-Cu-Mai-R1-70b": {
    "context": 32768,
    "output": 16384
  },
  "Steelskull/L3.3-Electra-R1-70b": {
    "context": 32768,
    "output": 16384
  },
  "Steelskull/L3.3-MS-Nevoria-70b": {
    "context": 32768,
    "output": 16384
  },
  "Steelskull/L3.3-Nevoria-R1-70b": {
    "context": 32768,
    "output": 16384
  },
  "step-3-5-flash": {
    "context": 256e3,
    "output": 131072
  },
  "step-3-5-flash-2603": {
    "context": 256e3,
    "output": 131072
  },
  "step-3-7-flash": {
    "context": 256e3
  },
  "step-3-7-flash:free": {
    "context": 256e3,
    "output": 256e3
  },
  "step-3.5-flash": {
    "context": 256e3,
    "output": 256e3
  },
  "step-3.5-flash-2603": {
    "context": 256e3,
    "output": 256e3
  },
  "step-3.7-flash:free": {
    "context": 256e3,
    "output": 256e3
  },
  "step-5-preview-free": {
    "context": 1e6,
    "output": 65536
  },
  "step-router-v1": {
    "context": 256e3,
    "output": 256e3
  },
  "stepfun-ai/gelab-zero-4b-preview": {
    "context": 8192,
    "output": 4096
  },
  "stepfun-ai/step-3.5-flash": {
    "context": 262144,
    "output": 65536
  },
  "stepfun-ai/step-3.5-flash-2603": {
    "context": 262144,
    "output": 65536
  },
  "stepfun-ai/Step-3.7-Flash": {
    "context": 262144,
    "output": 256e3
  },
  "stepfun-ai/step-5-preview": {
    "context": 1048576,
    "output": 1048576
  },
  "stepfun-ai/Step-5-Preview": {
    "context": 1048576,
    "output": 1e6
  },
  "stepfun/Step-3.5-Flash": {
    "context": 256e3,
    "output": 256e3
  },
  "stepfun/Step-3.7-Flash": {
    "context": 256e3,
    "output": 256e3
  },
  "stepfun/step-3.7-flash:thinking": {
    "context": 262144,
    "output": 256e3
  },
  "stepfun/Step-5-Preview": {
    "context": 1e6,
    "output": 1e6
  },
  "subconscious/deepseek-v4.1-flash-marathon": {
    "context": 5e6,
    "output": 384e3
  },
  "subconscious/glm-5.3-marathon": {
    "context": 5e6,
    "output": 131072
  },
  "swiss-ai/Apertus-v1.5-70B": {
    "context": 1e5,
    "output": 8192
  },
  "synth-2.5-flash": {
    "context": 3e4,
    "output": 3e4
  },
  "synth-2.5-pro": {
    "context": 3e4,
    "output": 3e4
  },
  "tc-code-latest": {
    "context": 131072,
    "output": 16384
  },
  "TEE/deepseek-v3.2": {
    "context": 164e3,
    "output": 65536
  },
  "TEE/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 384e3
  },
  "TEE/gemma-4-26b-a4b-uncensored": {
    "context": 65536,
    "output": 65536
  },
  "TEE/gemma-4-31b-it": {
    "context": 262144,
    "output": 262144
  },
  "TEE/gemma4-31b": {
    "context": 262144,
    "output": 131072
  },
  "TEE/gemma4-31b:thinking": {
    "context": 262144,
    "output": 131072
  },
  "TEE/glm-5.1": {
    "context": 202752,
    "output": 65535
  },
  "TEE/glm-5.1-thinking": {
    "context": 202752,
    "output": 65535
  },
  "TEE/glm-5.2": {
    "context": 1048576,
    "output": 131072
  },
  "TEE/glm-5.2:thinking": {
    "context": 1048576,
    "output": 131072
  },
  "TEE/glm-5.3": {
    "context": 1048576,
    "output": 131072
  },
  "TEE/glm-5.3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "TEE/gpt-oss-120b": {
    "context": 131072,
    "output": 16384
  },
  "TEE/kimi-k2.6": {
    "context": 262144,
    "output": 65536
  },
  "TEE/kimi-k2.7-code": {
    "context": 262144,
    "output": 65536
  },
  "TEE/kimi-k3": {
    "context": 1048576,
    "output": 65535
  },
  "TEE/llama3-3-70b": {
    "context": 128e3,
    "output": 16384
  },
  "TEE/nemotron-3.5-lightning": {
    "context": 262144,
    "output": 65536
  },
  "TEE/qwen2.5-vl-72b-instruct": {
    "context": 65536,
    "output": 8192
  },
  "TEE/qwen3.5-27b": {
    "context": 262144,
    "output": 65536
  },
  "TEE/qwen3.5-397b-a17b": {
    "context": 262144,
    "output": 65536
  },
  "TEE/qwen3.6-27b": {
    "context": 262144,
    "output": 65536
  },
  "TEE/qwen3.6-35b-a3b": {
    "context": 262144,
    "output": 262144
  },
  "TEE/qwen3.8-27b": {
    "context": 262144,
    "output": 262144
  },
  "tencent/deepseek-v4-flash": {
    "context": 1e6,
    "output": 393216
  },
  "tencent/deepseek-v4-pro": {
    "context": 1e6,
    "output": 393216
  },
  "tencent/deepseek-v4-pro-0813": {
    "context": 1e6,
    "output": 384e3
  },
  "tencent/deepseek-v4.1-flash": {
    "context": 1e6
  },
  "tencent/deepseek-v4.1-flash-1017": {
    "context": 1e6
  },
  "tencent/glm-5": {
    "context": 2e5,
    "output": 128e3
  },
  "tencent/glm-5-turbo": {
    "context": 2e5,
    "output": 128e3
  },
  "tencent/glm-5.1": {
    "context": 2e5,
    "output": 128e3
  },
  "tencent/glm-5.2": {
    "context": 1e6,
    "output": 128e3
  },
  "tencent/glm-5.3": {
    "context": 1e6,
    "output": 128e3
  },
  "tencent/glm-5.3-flash": {
    "context": 1e6,
    "output": 131072
  },
  "tencent/glm-5.3-flashx": {
    "context": 1e6,
    "output": 131072
  },
  "tencent/glm-5v-turbo": {
    "context": 2e5,
    "output": 128e3
  },
  "tencent/hunyuan-a13b-instruct": {
    "context": 131072,
    "output": 117964
  },
  "tencent/Hunyuan-A13B-Instruct": {
    "context": 131e3,
    "output": 131e3
  },
  "tencent/hy-mt2-1.8b": {
    "context": 8192,
    "output": 4096
  },
  "tencent/hy-mt2-30b-a3b": {
    "context": 8192,
    "output": 4096
  },
  "tencent/hy-mt2-7b": {
    "context": 8192,
    "output": 4096
  },
  "tencent/hy-mt2-lite": {
    "context": 8e3,
    "output": 4e3
  },
  "tencent/hy-mt2-pro": {
    "context": 8e3,
    "output": 4e3
  },
  "tencent/Hy3": {
    "context": 262144
  },
  "tencent/hy3-free": {
    "context": 256e3,
    "output": 128e3
  },
  "tencent/hy3-paid": {
    "context": 256e3,
    "output": 128e3
  },
  "tencent/hy3-preview": {
    "context": 262144,
    "output": 235929
  },
  "tencent/kimi-k2.6": {
    "context": 262144,
    "output": 262144
  },
  "tencent/kimi-k2.7-code": {
    "context": 262144,
    "output": 262144
  },
  "tencent/kimi-k2.7-code-highspeed": {
    "context": 262144,
    "output": 262144
  },
  "tencent/kimi-k2.8-preview": {
    "context": 1e6,
    "output": 1e6
  },
  "tencent/kimi-k3": {
    "context": 1048576,
    "output": 1048576
  },
  "tencent/mimo-v2.6-flash": {
    "context": 1e6,
    "output": 131072
  },
  "tencent/mimo-v2.6-pro": {
    "context": 1e6,
    "output": 131072
  },
  "tencent/minimax-m2.7": {
    "context": 2e5,
    "output": 128e3
  },
  "tencent/minimax-m3": {
    "context": 1e6,
    "output": 131072
  },
  "tencent/step-5-preview": {
    "context": 1e6
  },
  "tensorx/deepseek/deepseek-r1-0528": {
    "context": 164e3,
    "output": 32768
  },
  "tensorx/deepseek/deepseek-v4-flash-0731": {
    "context": 1048576,
    "output": 384e3
  },
  "tensorx/deepseek/deepseek-v4-pro-0813": {
    "context": 1048576,
    "output": 384e3
  },
  "tensorx/deepseek/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 384e3
  },
  "tensorx/deepseek/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 384e3
  },
  "tensorx/moonshotai/kimi-k2.5": {
    "context": 262144,
    "output": 262144
  },
  "text-embedding-3-large": {
    "context": 8191,
    "output": 3072
  },
  "text-embedding-3-small": {
    "context": 8191,
    "output": 1536
  },
  "text-embedding-ada-002": {
    "context": 8192,
    "output": 1536
  },
  "text-max": {
    "context": 1e6,
    "output": 128e3
  },
  "text-prime": {
    "context": 196608,
    "output": 131072
  },
  "text-standard": {
    "context": 128e3,
    "output": 65536
  },
  "TheDrummer/Anubis-70B-v1": {
    "context": 65536,
    "output": 16384
  },
  "TheDrummer/Anubis-70B-v1.1": {
    "context": 32e3,
    "output": 16384
  },
  "TheDrummer/Artemis-v1.1": {
    "context": 262144,
    "output": 32768
  },
  "TheDrummer/Cydonia-24B-v2": {
    "context": 32768,
    "output": 32768
  },
  "TheDrummer/Cydonia-24B-v4": {
    "context": 32768,
    "output": 32768
  },
  "thedrummer/cydonia-24b-v4.1": {
    "context": 131072
  },
  "TheDrummer/Cydonia-24B-v4.1": {
    "context": 131072,
    "output": 117964
  },
  "TheDrummer/Cydonia-24B-v4.3": {
    "context": 131072,
    "output": 32768
  },
  "TheDrummer/Magidonia-24B-v4.3": {
    "context": 32768,
    "output": 32768
  },
  "TheDrummer/Rocinante-12B-v1.1": {
    "context": 16384,
    "output": 8192
  },
  "thedrummer/skyfall-36b-v2": {
    "context": 32768
  },
  "TheDrummer/skyfall-36b-v2": {
    "context": 32768,
    "output": 29491
  },
  "TheDrummer/UnslopNemo-12B-v4.1": {
    "context": 8192,
    "output": 26214
  },
  "thinkingmachines/Inkling-NVFP4": {
    "context": 1048576,
    "output": 262144
  },
  "thinkingmachines/inkling-small:free": {
    "context": 1048576,
    "output": 262144
  },
  "thinkingmachines/Inkling-Small:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "thinkingmachines/Inkling-Small:peft:262144:sampling-nvfp4": {
    "context": 262144,
    "output": 262144
  },
  "thinkingmachines/Inkling-Small:thinking": {
    "context": 524288,
    "output": 32768
  },
  "thinkingmachines/inkling:free": {
    "context": 1048576,
    "output": 262144
  },
  "thinkingmachines/Inkling:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "thinkingmachines/Inkling:peft:262144:sampling-nvfp4": {
    "context": 262144,
    "output": 262144
  },
  "thinkingmachines/inkling:thinking": {
    "context": 104e4,
    "output": 32768
  },
  "tiny-aya-earth": {
    "context": 8e3,
    "output": 8e3
  },
  "tiny-aya-fire": {
    "context": 8e3,
    "output": 8e3
  },
  "tiny-aya-global": {
    "context": 8e3,
    "output": 8e3
  },
  "tiny-aya-water": {
    "context": 8e3,
    "output": 8e3
  },
  "together_ai/deepseek-ai/DeepSeek-V4-Pro-0813": {
    "context": 1048576,
    "output": 384e3
  },
  "together_ai/deepseek-ai/DeepSeek-V4.1-Flash": {
    "context": 1048576,
    "output": 384e3
  },
  "together_ai/deepseek-ai/DeepSeek-V4.1-Flash-1017": {
    "context": 1048576,
    "output": 384e3
  },
  "together_ai/meta-models/Muse-Glimmer-30B": {
    "context": 131072,
    "output": 131072
  },
  "together_ai/openai/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "together_ai/reflection/Beam-1.0-501B-A23B": {
    "context": 1048576,
    "output": 131072
  },
  "together_ai/thinkingmachines/Inkling": {
    "context": 524288,
    "output": 1048576
  },
  "together-ai/deepseek-v4-pro": {
    "context": 1048576,
    "output": 163840
  },
  "together-ai/deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 393216
  },
  "together-ai/deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 393216
  },
  "together-ai/glm-4.7": {
    "context": 202752,
    "output": 128e3
  },
  "together-ai/glm-5.3": {
    "context": 1048576,
    "output": 943717
  },
  "together-ai/glm-5.3-flash": {
    "context": 1048576,
    "output": 943717
  },
  "together-ai/gpt-oss-120b": {
    "context": 131072,
    "output": 32768
  },
  "together-ai/kimi-k3": {
    "context": 1e6,
    "output": 1e6
  },
  "together-ai/minimax-m3": {
    "context": 524288,
    "output": 131072
  },
  "together-ai/minimax-m3.1-flash": {
    "context": 1048576,
    "output": 1048576
  },
  "together-ai/muse-glimmer-30b": {
    "context": 131072,
    "output": 117964
  },
  "together-ai/qwen3.8-2.4t-a95b": {
    "context": 101e4,
    "output": 909e3
  },
  "tongyi-intent-detect-v3": {
    "context": 8192,
    "output": 1024
  },
  "topazlabs-co/topazlabs": {
    "context": 204
  },
  "trendyol-asure-12b": {
    "context": 40960,
    "output": 40960
  },
  "trinity-large-preview-free": {
    "context": 131072,
    "output": 131072
  },
  "trinity-large-thinking": {
    "context": 262144,
    "output": 8e4
  },
  "trustedrouter/auto": {
    "context": 1e6,
    "output": 131072
  },
  "trustedrouter/cheap": {
    "context": 1e6,
    "output": 131072
  },
  "trustedrouter/e2e": {
    "context": 1e6,
    "output": 131072
  },
  "trustedrouter/fast": {
    "context": 1e6,
    "output": 131072
  },
  "trustedrouter/synth": {
    "context": 1e6,
    "output": 131072
  },
  "trustedrouter/synth-code": {
    "context": 1e6,
    "output": 131072
  },
  "trustedrouter/zdr": {
    "context": 1e6,
    "output": 131072
  },
  "trytako/tako": {
    "context": 2048
  },
  "umans-coder": {
    "context": 1048576,
    "output": 131071
  },
  "umans-deepseek-v4-flash-0731": {
    "context": 1048576,
    "output": 393215
  },
  "umans-deepseek-v4.1-flash": {
    "context": 1048576,
    "output": 393215
  },
  "umans-deepseek-v4.1-flash-1017": {
    "context": 1048576,
    "output": 393215
  },
  "umans-flash": {
    "context": 262144
  },
  "umans-glm-5.3": {
    "context": 1048576,
    "output": 131071
  },
  "umans-glm-5.3-flash": {
    "context": 1048576,
    "output": 131071
  },
  "umans-kimi-k3": {
    "context": 1048576,
    "output": 131072
  },
  "umans-qwen3.6-35b-a3b": {
    "context": 262144,
    "output": 262144
  },
  "unbiased/pareto": {
    "context": 262144,
    "output": 131072
  },
  "unbiased/pareto-26.10": {
    "context": 1048576,
    "output": 131072
  },
  "unbiased/pareto-26.9": {
    "context": 262144,
    "output": 131072
  },
  "undi95/remm-slerp-l2-13b": {
    "context": 6144
  },
  "universal-summarizer": {
    "context": 32768,
    "output": 32768
  },
  "unsloth/gemma-3-12b-it": {
    "context": 131072,
    "output": 16384
  },
  "unsloth/gemma-3-27b-it": {
    "context": 128e3,
    "output": 96e3
  },
  "unsloth/gemma-3-4b-it": {
    "context": 128e3,
    "output": 8192
  },
  "unsloth/qwen3.8-27b-gguf": {
    "context": 101072,
    "output": 101072
  },
  "upstage/solar-mini4": {
    "context": 524288,
    "output": 131072
  },
  "upstage/solar-mini4:thinking": {
    "context": 524288,
    "output": 131072
  },
  "upstage/solar-pro2": {
    "context": 65536,
    "output": 8192
  },
  "upstage/solar-pro3": {
    "context": 131072,
    "output": 8192
  },
  "upstage/solar-pro4": {
    "context": 524288,
    "output": 131072
  },
  "upstage/solar-pro4:thinking": {
    "context": 524288,
    "output": 131072
  },
  "us-gov.openai.gpt-oss-120b-1:0": {
    "context": 128e3,
    "output": 16384
  },
  "us-gov.openai.gpt-oss-20b-1:0": {
    "context": 128e3,
    "output": 16384
  },
  "us.amazon.nova-2-lite-v1:0": {
    "context": 1e6,
    "output": 65535
  },
  "us.amazon.nova-lite-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "us.amazon.nova-micro-v1:0": {
    "context": 128e3,
    "output": 1e4
  },
  "us.amazon.nova-premier-v1:0": {
    "context": 1e6,
    "output": 1e4
  },
  "us.amazon.nova-pro-v1:0": {
    "context": 3e5,
    "output": 1e4
  },
  "us.anthropic.claude-fable-5": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-fable-5-1": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-haiku-4-5-20251001-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "us.anthropic.claude-haiku-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-opus-4-1-20250805-v1:0": {
    "context": 2e5,
    "output": 32e3
  },
  "us.anthropic.claude-opus-4-5-20251101-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "us.anthropic.claude-opus-4-6-v1": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-opus-4-8": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-opus-5": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-opus-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-sonnet-4-20250514-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "us.anthropic.claude-sonnet-4-5-20250929-v1:0": {
    "context": 2e5,
    "output": 64e3
  },
  "us.anthropic.claude-sonnet-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "us.anthropic.claude-sonnet-5-5": {
    "context": 1e6,
    "output": 128e3
  },
  "us.deepseek.r1-v1:0": {
    "context": 128e3,
    "output": 32768
  },
  "us.meta.llama3-1-70b-instruct-v1:0": {
    "context": 128e3,
    "output": 4096
  },
  "us.meta.llama3-1-8b-instruct-v1:0": {
    "context": 128e3,
    "output": 4096
  },
  "us.meta.llama3-3-70b-instruct-v1:0": {
    "context": 128e3,
    "output": 4096
  },
  "us.meta.llama4-maverick-17b-instruct-v1:0": {
    "context": 1e6,
    "output": 8192
  },
  "us.meta.llama4-scout-17b-instruct-v1:0": {
    "context": 1e7,
    "output": 8192
  },
  "us.mistral.pixtral-large-2502-v1:0": {
    "context": 128e3,
    "output": 8192
  },
  "us.moonshotai.kimi-k3": {
    "context": 1048576,
    "output": 128e3
  },
  "us.openai.gpt-5.6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "us.openai.gpt-5.6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "us.openai.gpt-5.6-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "us.openai.gpt-6-astra": {
    "context": 105e4,
    "output": 128e3
  },
  "us.openai.gpt-6-luna": {
    "context": 105e4,
    "output": 128e3
  },
  "us.openai.gpt-6-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "us.openai.gpt-6.1-sol": {
    "context": 105e4,
    "output": 128e3
  },
  "us.openai.gpt-6.1-terra": {
    "context": 105e4,
    "output": 128e3
  },
  "us.writer.palmyra-x4-v1:0": {
    "context": 122880,
    "output": 8192
  },
  "us.writer.palmyra-x5-v1:0": {
    "context": 104e4,
    "output": 8192
  },
  "us.xai.grok-4.6": {
    "context": 5e5,
    "output": 5e5
  },
  "us.xai.grok-4.7": {
    "context": 5e5,
    "output": 5e5
  },
  "us.zai.glm-5.3": {
    "context": 1e6,
    "output": 128e3
  },
  "venice-uncensored": {
    "context": 128e3,
    "output": 8192
  },
  "venice-uncensored-1-2": {
    "context": 128e3,
    "output": 8192
  },
  "venice-uncensored-role-play": {
    "context": 128e3,
    "output": 4096
  },
  "vertex-anthropic/claude-haiku-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "vertex-anthropic/claude-opus-4-5-20251101": {
    "context": 2e5,
    "output": 32e3
  },
  "vertex-anthropic/claude-opus-4-6": {
    "context": 1e6,
    "output": 128e3
  },
  "vertex-anthropic/claude-opus-4-7": {
    "context": 1e6,
    "output": 128e3
  },
  "vertex-anthropic/claude-sonnet-4-5": {
    "context": 2e5,
    "output": 64e3
  },
  "vertex-anthropic/claude-sonnet-4-6": {
    "context": 1e6,
    "output": 64e3
  },
  "vertex-anthropic/claude-sonnet-5": {
    "context": 1e6,
    "output": 128e3
  },
  "vertex-openai/grok-4-20-non-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "vertex-openai/grok-4-20-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "vertex-openai/grok-4-6": {
    "context": 5e5,
    "output": 5e5
  },
  "vertex-openai/grok-4-7": {
    "context": 524288,
    "output": 524288
  },
  "vertex/gemini-2.5-flash-image": {
    "context": 32768,
    "output": 32768
  },
  "vertex/gemini-3-flash-preview": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3-pro-image": {
    "context": 65536,
    "output": 32768
  },
  "vertex/gemini-3.1-flash-image": {
    "context": 131072,
    "output": 32768
  },
  "vertex/gemini-3.1-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.1-flash-lite-image": {
    "context": 65536,
    "output": 4096
  },
  "vertex/gemini-3.1-flash-lite@eu": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.1-flash-lite@us": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.1-pro-preview": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.5-flash": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.5-flash-lite": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.5-flash-lite@eu": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.5-flash-lite@us": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.5-flash@eu": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.5-flash@us": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.6-flash": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.6-flash@eu": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.6-flash@us": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.7-flash": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.7-flash@eu": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.7-flash@us": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.8-flash": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.8-flash@eu": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-3.8-flash@us": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-4-argon": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-4-argon@eu": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-4-argon@us": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-flash-latest": {
    "context": 1048576,
    "output": 65536
  },
  "vertex/gemini-nano-banana-2.1": {
    "context": 131072,
    "output": 32768
  },
  "vertex/gemini-pro-latest": {
    "context": 1048576,
    "output": 65536
  },
  "vispark/vision-large": {
    "context": 1e6,
    "output": 65536
  },
  "vispark/vision-medium": {
    "context": 1e6,
    "output": 65536
  },
  "vispark/vision-small": {
    "context": 1e6,
    "output": 65536
  },
  "viv-fast": {
    "context": 1e6,
    "output": 256e3
  },
  "volcengine/doubao-seed-1.8": {
    "context": 256e3,
    "output": 64e3
  },
  "volcengine/doubao-seed-2.0-code": {
    "context": 256e3
  },
  "volcengine/doubao-seed-2.0-lite": {
    "context": 256e3
  },
  "volcengine/doubao-seed-2.0-mini": {
    "context": 256e3
  },
  "volcengine/doubao-seed-2.0-pro": {
    "context": 256e3
  },
  "volcengine/doubao-seed-2.1-pro": {
    "context": 256e3,
    "output": 256e3
  },
  "volcengine/doubao-seed-2.1-turbo": {
    "context": 256e3,
    "output": 256e3
  },
  "volcengine/doubao-seed-character": {
    "context": 256e3,
    "output": 256e3
  },
  "volcengine/doubao-seed-code": {
    "context": 256e3,
    "output": 64e3
  },
  "volcengine/doubao-seed-evolving": {
    "context": 256e3,
    "output": 256e3
  },
  "VongolaChouko/Starcannon-Unleashed-12B-v1.0": {
    "context": 16384,
    "output": 8192
  },
  "voxtral-mini-3b": {
    "context": 32e3,
    "output": 32e3
  },
  "voxtral-small-24b-2507": {
    "context": 32768,
    "output": 16384
  },
  "voxtral-small-latest": {
    "context": 32768,
    "output": 32e3
  },
  "voyage/rerank-2.5": {
    "context": 32e3
  },
  "voyage/rerank-2.5-lite": {
    "context": 32e3
  },
  "voyage/rerank-3": {
    "context": 32e3
  },
  "voyage/rerank-3-lite": {
    "context": 32e3
  },
  "voyage/voyage-3-large": {
    "context": 32e3
  },
  "voyage/voyage-3.5": {
    "context": 32e3
  },
  "voyage/voyage-3.5-lite": {
    "context": 32e3
  },
  "voyage/voyage-4": {
    "context": 32e3
  },
  "voyage/voyage-4-large": {
    "context": 32e3
  },
  "voyage/voyage-4-lite": {
    "context": 32e3
  },
  "voyage/voyage-code-2": {
    "context": 16e3
  },
  "voyage/voyage-code-3": {
    "context": 32e3
  },
  "voyage/voyage-finance-2": {
    "context": 32e3
  },
  "voyage/voyage-law-2": {
    "context": 16e3
  },
  "wan2-2-t2v-a14b": {
    "context": 100,
    "output": 1
  },
  "wan2.7-image": {
    "context": 8192
  },
  "wan2.7-image-pro": {
    "context": 8192
  },
  "wanx/wan-v2-6": {
    "context": 4e5
  },
  "whisper-large-v3": {
    "context": 448
  },
  "whisper-large-v3-turbo": {
    "context": 448,
    "output": 448
  },
  "writer.palmyra-x4-v1:0": {
    "context": 122880,
    "output": 8192
  },
  "writer.palmyra-x5-v1:0": {
    "context": 104e4,
    "output": 8192
  },
  "writer/palmyra-x4": {
    "context": 128e3,
    "output": 32e3
  },
  "x-ai/grok-4": {
    "context": 256e3,
    "output": 64e3
  },
  "x-ai/grok-4-20-0309-non-reasoning": {
    "context": 2e6,
    "output": 1999e3
  },
  "x-ai/grok-4-fast": {
    "context": 2e6,
    "output": 2e6
  },
  "x-ai/grok-4-fast-non-reasoning": {
    "context": 2e6
  },
  "x-ai/grok-4-fast-reasoning": {
    "context": 2e6,
    "output": 2e6
  },
  "x-ai/grok-4.1-fast": {
    "context": 2e6
  },
  "x-ai/grok-4.1-fast-non-reasoning": {
    "context": 2e6,
    "output": 2e6
  },
  "x-ai/grok-4.1-fast-reasoning": {
    "context": 2e7,
    "output": 2e6
  },
  "x-ai/grok-4.2-fast": {
    "context": 2e6,
    "output": 3e4
  },
  "x-ai/grok-4.2-fast-non-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "x-ai/grok-4.20": {
    "context": 2e6
  },
  "x-ai/grok-4.20-multi-agent": {
    "context": 2e6
  },
  "x-ai/grok-4.3": {
    "context": 1e6
  },
  "x-ai/grok-4.5": {
    "context": 5e5
  },
  "x-ai/grok-4.6": {
    "context": 5e5
  },
  "x-ai/grok-4.7": {
    "context": 5e5
  },
  "x-ai/grok-build-0.1": {
    "context": 256e3
  },
  "x-ai/grok-code-fast-1": {
    "context": 256e3,
    "output": 1e4
  },
  "x-ai/grok-imagine-image-2.0": {
    "context": 66e3
  },
  "x-ai/grok-latest": {
    "context": 5e5,
    "output": 45e4
  },
  "x-ai/grok-voice-stt-1.0": {
    "context": 15e3,
    "output": 15e3
  },
  "x-ai/grok-voice-tts-1.0": {
    "context": 15e3,
    "output": 15e3
  },
  "x-preview-f-free": {
    "context": 1e6,
    "output": 131072
  },
  "xai.grok-4.20-non-reasoning": {
    "context": 1e6,
    "output": 3e4
  },
  "xai.grok-4.20-reasoning": {
    "context": 1e6,
    "output": 3e4
  },
  "xai.grok-4.3": {
    "context": 1e6
  },
  "xai.grok-4.6": {
    "context": 5e5,
    "output": 5e5
  },
  "xai/grok-3": {
    "context": 131072,
    "output": 8192
  },
  "xai/grok-3-mini": {
    "context": 131072,
    "output": 8192
  },
  "xai/grok-4": {
    "context": 256e3
  },
  "xai/grok-4-1-fast-non-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "xai/grok-4-20-beta-0309-non-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "xai/grok-4-20-beta-0309-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "xai/grok-4-3": {
    "context": 1e6,
    "output": 1e6
  },
  "xai/grok-4-5": {
    "context": 5e5,
    "output": 5e5
  },
  "xai/grok-4-6": {
    "context": 5e5,
    "output": 5e5
  },
  "xai/grok-4-7": {
    "context": 5e5,
    "output": 5e5
  },
  "xai/grok-4-fast-non-reasoning": {
    "context": 2e6
  },
  "xai/grok-4-fast-reasoning": {
    "context": 2e6,
    "output": 128e3
  },
  "xai/grok-4.20-multi-agent": {
    "context": 128e3
  },
  "xai/grok-4.20-non-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "xai/grok-4.20-reasoning": {
    "context": 2e6,
    "output": 3e4
  },
  "xai/grok-4.5": {
    "context": 5e5,
    "output": 5e5
  },
  "xai/grok-build-0-1": {
    "context": 256e3,
    "output": 256e3
  },
  "xai/grok-build-0.1": {
    "context": 256e3,
    "output": 256e3
  },
  "xai/grok-code-fast-1": {
    "context": 256e3,
    "output": 128e3
  },
  "xai/grok-latest": {
    "context": 5e5,
    "output": 5e5
  },
  "xiaomi-mimo-v2-5": {
    "context": 1e6,
    "output": 65536
  },
  "xiaomi-mimo-v2-6-flash": {
    "context": 1e6,
    "output": 131072
  },
  "xiaomi-mimo-v2.5": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomi-mimo-v2.5-free": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomi-mimo-v2.5-pro": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomi-mimo-v2.5-pro-free": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomi-mimo/mimo-v2.6-flash": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomi-mimo/mimo-v2.6-pro": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomi-mimo/mimo-v2.6-pro-ultraspeed": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomi/mimo-v2.5-pro:thinking": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomi/mimo-v2.5:thinking": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomi/mimo-v2.6-flash-abliterated": {
    "context": 1048576,
    "output": 65536
  },
  "xiaomi/mimo-v2.6-flash-uncensored": {
    "context": 1048576,
    "output": 65536
  },
  "xiaomi/mimo-v2.6-flash-uncensored:thinking": {
    "context": 1048576,
    "output": 65536
  },
  "xiaomi/mimo-v2.6-pro-ultraspeed": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomimimo/mimo-v2-flash": {
    "context": 262144,
    "output": 131072
  },
  "XiaomiMiMo/MiMo-V2-Flash": {
    "context": 262144,
    "output": 32e3
  },
  "xiaomimimo/mimo-v2.5": {
    "context": 1048576,
    "output": 131072
  },
  "XiaomiMiMo/MiMo-V2.5": {
    "context": 262144
  },
  "xiaomimimo/mimo-v2.5-pro": {
    "context": 1048576,
    "output": 131072
  },
  "XiaomiMiMo/MiMo-V2.5-Pro": {
    "context": 1048576
  },
  "xiaomimimo/mimo-v2.6-flash": {
    "context": 1048576,
    "output": 131072
  },
  "XiaomiMiMo/MiMo-V2.6-Flash": {
    "context": 1048576,
    "output": 131072
  },
  "xiaomimimo/mimo-v2.6-pro": {
    "context": 1048576,
    "output": 131072
  },
  "XiaomiMiMo/MiMo-V2.6-Pro": {
    "context": 1048576,
    "output": 131072
  },
  "xingchen-agi/xing4.0-29b-a4b": {
    "context": 262144,
    "output": 262144
  },
  "xingchen-agi/xing4.0-29b-a4b:free": {
    "context": 262144,
    "output": 235929
  },
  "xpersona-frieren-coder": {
    "context": 1e6,
    "output": 384e3
  },
  "xpersona-gpt-5.5": {
    "context": 1e6,
    "output": 128e3
  },
  "z-ai-glm-5-3": {
    "context": 1e6,
    "output": 131072
  },
  "z-ai-glm-5-3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "z-ai-glm-5-turbo": {
    "context": 2e5,
    "output": 32768
  },
  "z-ai-glm-5v-turbo": {
    "context": 2e5,
    "output": 32768
  },
  "z-ai/autoglm-phone-9b": {
    "context": 12800,
    "output": 4096
  },
  "z-ai/GLM-4.5-Air": {
    "context": 128e3,
    "output": 98304
  },
  "z-ai/GLM-4.5-Air:thinking": {
    "context": 128e3,
    "output": 98304
  },
  "z-ai/GLM-4.5:thinking": {
    "context": 128e3,
    "output": 65536
  },
  "z-ai/glm-4.5v": {
    "context": 65536,
    "output": 16384
  },
  "z-ai/glm-4.5v:thinking": {
    "context": 65536,
    "output": 16384
  },
  "z-ai/glm-4.6-original": {
    "context": 256e3,
    "output": 65535
  },
  "z-ai/GLM-4.6-turbo": {
    "context": 204800,
    "output": 131072
  },
  "z-ai/GLM-4.6-turbo:thinking": {
    "context": 204800,
    "output": 131072
  },
  "z-ai/glm-4.6:thinking": {
    "context": 2e5,
    "output": 65535
  },
  "z-ai/glm-4.6v-flash": {
    "context": 2e5,
    "output": 128e3
  },
  "z-ai/glm-4.6v-flash-free": {
    "context": 2e5,
    "output": 128e3
  },
  "z-ai/glm-4.6v-original": {
    "context": 128e3,
    "output": 24e3
  },
  "z-ai/glm-4.7-flash-free": {
    "context": 2e5,
    "output": 128e3
  },
  "z-ai/glm-4.7-flash:thinking": {
    "context": 2e5,
    "output": 128e3
  },
  "z-ai/glm-4.7-flashx": {
    "context": 2e5,
    "output": 128e3
  },
  "z-ai/glm-4.7-original": {
    "context": 2e5,
    "output": 65535
  },
  "z-ai/glm-4.7-original:thinking": {
    "context": 2e5,
    "output": 65535
  },
  "z-ai/glm-4.7:thinking": {
    "context": 2e5,
    "output": 65535
  },
  "z-ai/glm-5-original": {
    "context": 2e5,
    "output": 128e3
  },
  "z-ai/glm-5-original:thinking": {
    "context": 2e5,
    "output": 128e3
  },
  "z-ai/glm-5:thinking": {
    "context": 2e5,
    "output": 128e3
  },
  "z-ai/glm-5.1:thinking": {
    "context": 2e5,
    "output": 131072
  },
  "z-ai/glm-5.2:thinking": {
    "context": 1048576,
    "output": 131072
  },
  "z-ai/glm-5.3-flash-apex": {
    "context": 1048576,
    "output": 32768
  },
  "z-ai/glm-5.3-flash-apex-abliterated": {
    "context": 1048576,
    "output": 32768
  },
  "z-ai/glm-5.3-flash-cybersecurity": {
    "context": 1048576,
    "output": 32768
  },
  "z-ai/glm-5.3-flash-free": {
    "context": 1e6,
    "output": 128e3
  },
  "z-ai/glm-5.3-flash-uncensored": {
    "context": 1048576,
    "output": 32768
  },
  "z-ai/glm-5.3-free": {
    "context": 1e6,
    "output": 131072
  },
  "z-ai/glm-5.3-prime": {
    "context": 1e6,
    "output": 131072
  },
  "z-ai/glm-5.3-uncensored": {
    "context": 1048576,
    "output": 131072
  },
  "z-ai/glm-5.3:thinking": {
    "context": 1048576,
    "output": 131072
  },
  "z-ai/glm-5v-turbo:thinking": {
    "context": 202800,
    "output": 131072
  },
  "z-ai/glm-image": {
    "context": 10240
  },
  "z-ai/glm-latest": {
    "context": 1048576,
    "output": 131072
  },
  "zai-glm-5-1": {
    "context": 198e3,
    "output": 8192
  },
  "zai-glm-5-2": {
    "context": 1048576,
    "output": 131072
  },
  "zai-glm-5-3": {
    "context": 1048576,
    "output": 131072
  },
  "zai-glm-5-3-flash": {
    "context": 1048576,
    "output": 131072
  },
  "zai-glm-5.1": {
    "context": 2e5,
    "output": 128e3
  },
  "zai-org-glm-4.6": {
    "context": 198e3,
    "output": 16384
  },
  "zai-org-glm-4.7": {
    "context": 198e3,
    "output": 16384
  },
  "zai-org-glm-5": {
    "context": 198e3,
    "output": 32e3
  },
  "zai-org-glm-5-1": {
    "context": 2e5,
    "output": 8e4
  },
  "zai-org-glm-5-2": {
    "context": 1e6,
    "output": 131072
  },
  "zai-org/autoglm-phone-9b-multilingual": {
    "context": 65536,
    "output": 65536
  },
  "zai-org/AutoGLM-Phone-9B-Multilingual": {
    "context": 65536,
    "output": 65536
  },
  "zai-org/glm-4.5": {
    "context": 131072,
    "output": 98304
  },
  "zai-org/GLM-4.5": {
    "context": 131072,
    "output": 96e3
  },
  "zai-org/glm-4.5-air": {
    "context": 131072,
    "output": 98304
  },
  "zai-org/GLM-4.5-FP8": {
    "context": 131072,
    "output": 131072
  },
  "zai-org/glm-4.5v": {
    "context": 65536,
    "output": 16384
  },
  "zai-org/GLM-4.5V": {
    "context": 65536,
    "output": 16384
  },
  "zai-org/glm-4.6": {
    "context": 204800,
    "output": 131072
  },
  "zai-org/glm-4.6v": {
    "context": 131072,
    "output": 32768
  },
  "zai-org/GLM-4.6V-Flash": {
    "context": 131072,
    "output": 32768
  },
  "zai-org/glm-4.7": {
    "context": 204800,
    "output": 131072
  },
  "zai-org/glm-4.7-flash": {
    "context": 2e5,
    "output": 128e3
  },
  "zai-org/glm-4.7-maas": {
    "context": 2e5,
    "output": 128e3
  },
  "zai-org/glm-5": {
    "context": 202800,
    "output": 131072
  },
  "zai-org/GLM-5-FP8": {
    "context": 202752,
    "output": 131072
  },
  "zai-org/glm-5-maas": {
    "context": 2e5,
    "output": 128e3
  },
  "zai-org/GLM-5.1-FP8": {
    "context": 202752,
    "output": 131072
  },
  "zai-org/GLM-5.1-TEE": {
    "context": 202752,
    "output": 65535
  },
  "zai-org/glm-5.2-maas": {
    "context": 1e6,
    "output": 64e3
  },
  "zai-org/GLM-5.2-TEE": {
    "context": 1048576,
    "output": 65535
  },
  "zai-org/GLM-5.3-Fast": {
    "context": 1048576,
    "output": 262144
  },
  "zai-org/GLM-5.3-Flash:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "zai-org/GLM-5.3:peft:262144": {
    "context": 262144,
    "output": 262144
  },
  "zai-org/GLM-5V-Turbo": {
    "context": 2e5,
    "output": 131072
  },
  "zai.glm-4.7": {
    "context": 202752,
    "output": 131072
  },
  "zai.glm-4.7-flash": {
    "context": 202752,
    "output": 131072
  },
  "zai.glm-5": {
    "context": 202752,
    "output": 131072
  },
  "zai/glm-4-32b-0414-128k": {
    "context": 128e3,
    "output": 128e3
  },
  "zai/glm-4.5-airx": {
    "context": 128e3,
    "output": 128e3
  },
  "zai/glm-4.5-flash": {
    "context": 131072,
    "output": 98304
  },
  "zai/glm-4.5-x": {
    "context": 128e3,
    "output": 128e3
  },
  "zai/glm-4.6v-flash": {
    "context": 128e3,
    "output": 32768
  },
  "zai/glm-4.6v-flashx": {
    "context": 128e3,
    "output": 16e3
  },
  "zai/glm-4.7-flash": {
    "context": 2e5
  },
  "zai/glm-4.7-flashx": {
    "context": 2e5
  },
  "zai/GLM-5.1": {
    "context": 2e5,
    "output": 131072
  },
  "zai/GLM-5.2": {
    "context": 1e6,
    "output": 131072
  },
  "zai/glm-5.2-fast": {
    "context": 1e6,
    "output": 128e3
  },
  "zai/glm-5.3-fast": {
    "context": 1048576,
    "output": 262144
  },
  "zai/glm-5.3-flashx": {
    "context": 1e6,
    "output": 131072
  },
  "zdev": {
    "context": 1e6,
    "output": 131072
  },
  "zhipu/glm-5.2": {
    "context": 1e6,
    "output": 131072
  },
  "zhipu/glm-5.3": {
    "context": 1024e3,
    "output": 131072
  },
  "ZhipuAI/GLM-4.5": {
    "context": 131072,
    "output": 98304
  },
  "ZhipuAI/GLM-4.6": {
    "context": 202752,
    "output": 98304
  }
};

// src/account/host/index.ts
var PRIMARY_BASE = "https://hkcode.aicodeme.xyz";
var BACKUP_BASES = ["https://code.aicodeme.xyz", "https://code.aicodeme.cn"];
var DEFAULT_BASES = [PRIMARY_BASE, ...BACKUP_BASES];
var SESSION_KEY = "zerowall.ai-cloud.session";
var LOGIN_KEY = "zerowall.ai-cloud.login";
var MANUAL_SIGNOUT_KEY = "zerowall.ai-cloud.manual-signout";
var PREFERRED_BASE_KEY = "zerowall.ai-cloud.preferred-base";
var KEY_PREFIX = "zerowall.ai-cloud.group.";
var KEYS_PATH = "/keys?page=1&page_size=1000&sort_by=created_at&sort_order=desc";
var AiCloudClient = class {
  identityRevision = 0;
  secretWrites = Promise.resolve();
  discoveredGroups = /* @__PURE__ */ new Set();
  modelDiscovery;
  currentOperation;
  identityAction;
  secrets;
  fetcher;
  bases;
  constructor(options = {}) {
    if (!options.secrets) throw new Error("AI Cloud requires a DSH credential store.");
    this.secrets = options.secrets;
    this.fetcher = options.fetch ?? fetch;
    this.bases = options.bases ?? [...DEFAULT_BASES];
  }
  async gateways() {
    const preferred = await this.preferredBase();
    return this.bases.map((baseUrl) => ({
      baseUrl,
      label: gatewayLabel(baseUrl),
      preferred: baseUrl === preferred
    }));
  }
  /** Persist a selected supported endpoint without exposing account credentials. */
  async selectGateway(baseUrl) {
    const revision = ++this.identityRevision;
    return this.trackIdentityAction(revision, this.selectGatewayAtRevision(baseUrl, revision));
  }
  async selectGatewayAtRevision(baseUrl, revision) {
    const selected = this.requireBase(baseUrl);
    await this.mutateSecrets(revision, () => this.secrets.set(PREFERRED_BASE_KEY, selected));
    const login = await this.loadLogin(revision);
    if (login === void 0 || await this.isManuallySignedOut()) return signedOut(selected);
    const authenticated = await this.authenticate(login.email, login.password, [selected]);
    const account = await this.finishAuthentication(authenticated.baseUrl, login.email, login.password, authenticated.accessToken, void 0, true, revision);
    try {
      return { ...await this.discoverModels(), balanceFreshness: account.balanceFreshness };
    } catch {
      if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
      return this.catalogFailure(account, revision);
    }
  }
  async publicConfig(gatewayBaseUrl) {
    const base = gatewayBaseUrl === void 0 ? await this.preferredBase() : this.requireBase(gatewayBaseUrl);
    const { body } = await this.request(base, "/settings/public");
    return parsePublicConfig(body);
  }
  async sendCode(input) {
    const email = normalizedEmail(input.email);
    const base = input.gatewayBaseUrl === void 0 ? await this.preferredBase() : this.requireBase(input.gatewayBaseUrl);
    const sent = await this.request(base, "/auth/send-verify-code", {
      method: "POST",
      body: { email }
    });
    return { countdown: parseSendCodeResult(sent.body), gatewayBaseUrl: base };
  }
  async forgotPassword(input) {
    const email = normalizedEmail(input.email);
    const base = input.gatewayBaseUrl === void 0 ? await this.preferredBase() : this.requireBase(input.gatewayBaseUrl);
    await this.request(base, "/auth/forgot-password", {
      method: "POST",
      body: { email }
    });
  }
  async login(input) {
    const revision = ++this.identityRevision;
    return this.trackIdentityAction(revision, this.loginAtRevision(input, revision));
  }
  async loginAtRevision(input, revision) {
    const email = normalizedEmail(input.email);
    const password = requiredPassword(input.password);
    const authenticated = await this.authenticate(email, password);
    const account = await this.finishAuthentication(authenticated.baseUrl, email, password, authenticated.accessToken, void 0, input.rememberPassword !== false, revision);
    try {
      return { ...await this.discoverModels(), balanceFreshness: account.balanceFreshness };
    } catch {
      return this.catalogFailure(account, revision);
    }
  }
  async register(input) {
    const revision = ++this.identityRevision;
    return this.trackIdentityAction(revision, this.registerAtRevision(input, revision));
  }
  async registerAtRevision(input, revision) {
    const base = input.gatewayBaseUrl === void 0 ? await this.preferredBase() : this.requireBase(input.gatewayBaseUrl);
    const config = await this.publicConfig(base);
    if (!config.registrationEnabled || !config.emailVerifyEnabled || config.captchaEnabled || config.invitationCodeEnabled) {
      throw new Error("AI Cloud native registration is not available with the current server policy.");
    }
    const email = normalizedEmail(input.email);
    const password = requiredPassword(input.password);
    const verificationCode = required(input.verificationCode, "Verification code");
    const registered = { ...await this.request(base, "/auth/register", {
      method: "POST",
      body: { email, password, verify_code: verificationCode }
    }), base };
    let token = optionalAccessToken(registered.body);
    if (token === void 0) {
      const login = await this.request(registered.base, "/auth/login", { method: "POST", body: { email, password } });
      token = accessToken(login.body);
    }
    const account = await this.finishAuthentication(registered.base, email, password, token, config, input.rememberPassword !== false, revision);
    try {
      return { ...await this.discoverModels(), balanceFreshness: account.balanceFreshness };
    } catch {
      return this.catalogFailure(account, revision);
    }
  }
  async current() {
    const revision = this.identityRevision;
    if (this.currentOperation?.revision === revision) return this.currentOperation.operation;
    const operation = this.readCurrent(revision);
    this.currentOperation = { revision, operation };
    try {
      return await operation;
    } finally {
      if (this.currentOperation?.operation === operation) this.currentOperation = void 0;
    }
  }
  async readCurrent(revision) {
    const action = this.identityAction;
    if (action?.revision === revision) await action.settled;
    if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    if (await this.isManuallySignedOut()) {
      if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
      return signedOut();
    }
    const session = await this.loadSession();
    if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    if (session === void 0) return await this.restoreSavedLogin("signedOut", revision);
    try {
      const { body } = await this.request(session.baseUrl, "/auth/me", { token: session.accessToken });
      const funds = accountFunds(body);
      const refreshed = { ...session, ...funds };
      if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
      await this.storeSession(refreshed, revision);
      return snapshot(refreshed, "current");
    } catch (error) {
      if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
      if (error instanceof GatewayHttpError && (error.status === 401 || error.status === 403)) {
        await this.mutateSecrets(revision, () => this.clearSession(session, false));
        return await this.restoreSavedLogin("authExpired", revision, session);
      }
      return snapshot(session, "stale");
    }
  }
  async logout() {
    const revision = ++this.identityRevision;
    return this.trackIdentityAction(revision, this.finishLogout(revision));
  }
  async finishLogout(revision) {
    await this.secretWrites.catch(() => {
    });
    if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    const session = await this.loadSession();
    if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    await this.mutateSecrets(revision, async () => {
      for (const groupId of this.discoveredGroups) await this.secrets.delete(`${KEY_PREFIX}${groupId}`);
      if (session !== void 0) await this.clearSession(session, false);
      else await this.secrets.delete(SESSION_KEY);
      await this.secrets.set(MANUAL_SIGNOUT_KEY, "1");
    });
    this.discoveredGroups.clear();
  }
  async trackIdentityAction(revision, operation) {
    const action = { revision, settled: operation.then(() => void 0, () => void 0) };
    this.identityAction = action;
    try {
      return await operation;
    } finally {
      if (this.identityAction === action) this.identityAction = void 0;
    }
  }
  async forgetLogin() {
    await this.secrets.delete(LOGIN_KEY);
  }
  async savedLogin() {
    const login = await this.loadLogin();
    return login === void 0 ? void 0 : { ...login, rememberPassword: true };
  }
  /** Re-authenticate with the encrypted login record without asking for input again. */
  async relogin() {
    const revision = ++this.identityRevision;
    return this.trackIdentityAction(revision, (async () => {
      await this.mutateSecrets(revision, () => this.secrets.delete(MANUAL_SIGNOUT_KEY));
      const state = await this.restoreSavedLogin("authExpired", revision);
      if (state.status !== "signedIn") throw new Error("Saved AI Cloud login is unavailable or expired.");
      return state;
    })());
  }
  /** Read synchronized metadata without network requests, login restoration, or secret writes. */
  async groupCatalog() {
    if (await this.isManuallySignedOut()) return { groups: [], routes: [] };
    const session = await this.loadSession();
    if (session === void 0) return { groups: [], routes: [] };
    return accountGroupCatalog(snapshot(session, "stale"));
  }
  async discoverModels() {
    const revision = this.identityRevision;
    const session = await this.requireSession();
    const key = `${revision}:${session.baseUrl}:${session.email}`;
    if (this.modelDiscovery?.key === key) return this.modelDiscovery.operation;
    const operation = this.discoverSessionModels(session, revision);
    this.modelDiscovery = { key, operation };
    try {
      return await operation;
    } finally {
      if (this.modelDiscovery?.operation === operation) this.modelDiscovery = void 0;
    }
  }
  async discoverSessionModels(session, revision) {
    const assertCurrent = () => {
      if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    };
    assertCurrent();
    const groupsReply = await this.request(session.baseUrl, "/groups/available", { token: session.accessToken });
    const keysReply = await this.request(session.baseUrl, KEYS_PATH, { token: session.accessToken });
    const groups = availableGroups(groupsReply.body);
    const keys = existingKeys(keysReply.body);
    const models = [];
    const mediaModels = [];
    const mediaResults = [];
    const checkedAt = (/* @__PURE__ */ new Date()).toISOString();
    const results = [];
    const groupIds = [];
    const previousModels = /* @__PURE__ */ new Map();
    for (const model of session.models) {
      const entries = previousModels.get(model.groupId) ?? [];
      entries.push(model);
      previousModels.set(model.groupId, entries);
    }
    for (const group of groups) {
      assertCurrent();
      const groupId = String(group.id);
      groupIds.push(groupId);
      try {
        let apiKey = keys.find((candidate) => candidate.groupId === group.id)?.key;
        if (apiKey === void 0) {
          const created = await this.request(session.baseUrl, "/keys", {
            method: "POST",
            token: session.accessToken,
            body: { name: "ZeroWall Science", group_id: group.id }
          });
          apiKey = createdKey(created.body);
        }
        assertCurrent();
        this.discoveredGroups.add(groupId);
        await this.mutateSecrets(revision, () => this.secrets.set(`${KEY_PREFIX}${groupId}`, apiKey));
        if (group.platform === "imagevideo") {
          const reply = await this.request(session.baseUrl, `/media/capabilities?group_id=${groupId}`, { token: session.accessToken });
          assertCurrent();
          const entries = parseMediaCapabilities(reply.body, group, session.baseUrl);
          mediaModels.push(...entries);
          mediaResults.push({ groupId, groupName: group.name, status: "succeeded", count: entries.length, checkedAt });
          continue;
        }
        const modelReply = await this.rawRequest(`${session.baseUrl}/v1/models`, { token: apiKey });
        assertCurrent();
        for (const modelId of modelIds(modelReply)) {
          const image = modelImageCapability(modelReply, modelId, group.imageCapability === true);
          models.push({
            // pi-ai owns one streaming implementation per provider route. A
            // managed group can expose OpenAI, Anthropic, and compatibility
            // models together, so make the route protocol-homogeneous instead
            // of letting its first model decide every request's wire format.
            providerId: managedProviderId(groupId, modelId),
            groupId,
            groupName: group.name,
            modelId,
            ...image ? {
              capability: "image-generation",
              imageProtocol: group.protocol,
              imageProtocolSource: group.protocolSource,
              qualities: modelQualities(modelReply, modelId),
              resolutions: image.resolutions,
              aspectRatios: image.aspectRatios,
              imageSizes: image.imageSizes,
              supportsImageEdit: image.supportsImageEdit,
              supportsImageReferences: image.supportsImageReferences,
              supportsImageMask: image.supportsImageMask,
              ...image.responseFormats?.length ? { imageResponseFormats: image.responseFormats } : {}
            } : {},
            ...modelCapacity(modelReply, modelId),
            // OpenAI-compatible transports append their resource path to a
            // `/v1` base URL, while the Anthropic SDK appends `/v1/messages`
            // itself. Keeping the protocol-specific base here avoids the
            // erroneous `/v1/v1/messages` URL for Claude routes.
            baseUrl: modelBaseUrl(session.baseUrl, modelId)
          });
        }
        results.push({ groupId, groupName: group.name, status: "succeeded", count: models.filter((model) => model.groupId === groupId).length, checkedAt });
      } catch (error) {
        assertCurrent();
        if (group.platform === "imagevideo") {
          const old2 = (session.mediaModels ?? []).filter((model) => model.groupId === groupId).map((model) => ({ ...model, stale: true }));
          mediaModels.push(...old2);
          mediaResults.push({ groupId, groupName: group.name, status: "failed", count: old2.length, checkedAt, error: error instanceof GatewayHttpError ? `HTTP ${error.status}` : "MEDIA_SYNC_FAILED" });
          continue;
        }
        const old = (previousModels.get(groupId) ?? []).map((model) => ({ ...model, stale: true }));
        models.push(...old);
        results.push({ groupId, groupName: group.name, status: "failed", count: old.length, checkedAt, error: error instanceof GatewayHttpError ? `HTTP ${error.status}` : "MODEL_SYNC_FAILED: \u6A21\u578B\u76EE\u5F55\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u5173\u8FDE\u63A5\u540E\u91CD\u8BD5\u3002" });
      }
    }
    assertCurrent();
    const live = await this.loadSession();
    if (live?.accessToken !== session.accessToken || live?.baseUrl !== session.baseUrl) throw new Error("ACCOUNT_STATE_CHANGED");
    const failures = results.filter((group) => group.status === "failed").length;
    const modelSync = { checkedAt, status: failures === 0 ? "succeeded" : failures === results.length ? "failed" : "partial", groups: results };
    const mediaFailures = mediaResults.filter((group) => group.status === "failed").length;
    const mediaSync = { checkedAt, status: mediaFailures === 0 ? "succeeded" : mediaFailures === mediaResults.length ? "failed" : "partial", groups: mediaResults };
    const groupMetadata = groups.map(({ id, name: name3, ...metadata }) => ({ groupId: String(id), groupName: name3, ...metadata }));
    const updated = { ...live, models, groupIds, groups: groupMetadata, modelSync, mediaModels: uniqueMediaModels(mediaModels), mediaSync };
    await this.storeSession(updated, revision);
    return snapshot(updated, "current");
  }
  async listOrders() {
    const session = await this.requireSession();
    const { body } = await this.request(session.baseUrl, "/payment/orders/my?page=1&page_size=10", { token: session.accessToken });
    return paymentOrders(body);
  }
  async checkoutInfo() {
    const session = await this.requireSession();
    const { body } = await this.request(session.baseUrl, "/payment/checkout-info", { token: session.accessToken });
    return checkoutInfo(body, session.rechargeUrl);
  }
  async createOrder(input) {
    if (!Number.isFinite(input.amount) || input.amount < 10) throw new Error("Recharge amount must be at least 10.");
    const paymentType = normalizePaymentType(input.paymentType);
    const session = await this.requireSession();
    const { body } = await this.request(session.baseUrl, "/payment/orders", {
      method: "POST",
      token: session.accessToken,
      body: { amount: input.amount, payment_type: paymentType, order_type: "balance", payment_source: "zerowallscience-desktop", is_mobile: false }
    });
    return paymentOrder(paymentOrderPayload(JSON.parse(body)));
  }
  async getOrder(input) {
    if (!Number.isSafeInteger(input.orderId) || input.orderId <= 0) throw new Error("Invalid payment order id.");
    const session = await this.requireSession();
    const { body } = await this.request(session.baseUrl, `/payment/orders/${input.orderId}`, { token: session.accessToken });
    return paymentOrder(paymentOrderPayload(JSON.parse(body)));
  }
  async verifyOrder(input) {
    const outTradeNo = required(input.outTradeNo, "Payment order number");
    if (outTradeNo.length > 160) throw new Error("Invalid payment order number.");
    const session = await this.requireSession();
    const { body } = await this.request(session.baseUrl, "/payment/orders/verify", {
      method: "POST",
      token: session.accessToken,
      body: { out_trade_no: outTradeNo }
    });
    const payload = paymentOrderPayload(JSON.parse(body));
    try {
      return paymentOrder(payload);
    } catch {
      const existing = (await this.listOrders()).find((order) => order.outTradeNo === outTradeNo);
      if (existing === void 0) throw new Error("AI Cloud returned an invalid payment order.");
      return paymentOrder({
        id: existing.id,
        out_trade_no: existing.outTradeNo,
        amount: existing.amount,
        payment_type: existing.paymentType,
        ...existing.paymentUrl === void 0 ? {} : { payment_url: existing.paymentUrl },
        ...existing.qrCode === void 0 ? {} : { qr_code: existing.qrCode },
        ...existing.createdAt === void 0 ? {} : { created_at: existing.createdAt },
        ...payload
      });
    }
  }
  async finishAuthentication(baseUrl, email, password, accessToken2, config, rememberPassword = true, revision = this.identityRevision, previous) {
    const prior = previous ?? await this.loadSession().catch(() => void 0);
    const retained = prior?.email.toLowerCase() === email.toLowerCase() && prior.baseUrl === baseUrl ? prior : void 0;
    let balance = retained?.balance ?? 0;
    let currency = retained?.currency ?? "CNY";
    let freshness = "stale";
    try {
      const me = await this.request(baseUrl, "/auth/me", { token: accessToken2 });
      ({ balance, currency } = accountFunds(me.body));
      freshness = "current";
    } catch {
    }
    const session = {
      ...retained,
      baseUrl,
      email,
      accessToken: accessToken2,
      balance,
      currency,
      models: [],
      groupIds: [],
      ...retained === void 0 ? {} : { models: retained.models, groupIds: retained.groupIds },
      ...config?.rechargeUrl === void 0 ? {} : { rechargeUrl: config.rechargeUrl },
      ...config?.lowBalanceThreshold === void 0 ? {} : { lowBalanceThreshold: config.lowBalanceThreshold }
    };
    await this.storeSession(session, revision);
    if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    await this.mutateSecrets(revision, async () => {
      await this.secrets.delete(MANUAL_SIGNOUT_KEY);
      if (rememberPassword) await this.storeLogin({ baseUrl, email, password });
      else await this.secrets.delete(LOGIN_KEY);
    });
    return snapshot(session, freshness);
  }
  async authenticate(email, password, bases) {
    const authenticated = await this.withFailover(async (base) => {
      const { body } = await this.request(base, "/auth/login", { method: "POST", body: { email, password } });
      return { body: accessToken(body) };
    }, bases);
    return { baseUrl: authenticated.base, accessToken: authenticated.body };
  }
  async restoreSavedLogin(fallback, revision = this.identityRevision, previous) {
    if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    const manuallySignedOut = await this.isManuallySignedOut();
    if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    if (manuallySignedOut) return fallback === "authExpired" ? { ...signedOut(), status: "authExpired" } : signedOut();
    const login = await this.loadLogin(revision);
    if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    if (login === void 0) return fallback === "authExpired" ? { ...signedOut(), status: "authExpired" } : signedOut();
    try {
      const authenticated = await this.authenticate(login.email, login.password, [
        login.baseUrl,
        ...this.bases.filter((base) => base !== login.baseUrl)
      ]);
      const account = await this.finishAuthentication(
        authenticated.baseUrl,
        login.email,
        login.password,
        authenticated.accessToken,
        void 0,
        true,
        revision,
        previous
      );
      try {
        return { ...await this.discoverModels(), balanceFreshness: account.balanceFreshness };
      } catch {
        if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
        return this.catalogFailure(account, revision);
      }
    } catch (error) {
      if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
      if (error instanceof GatewayHttpError && (error.status === 401 || error.status === 403)) {
        return { ...signedOut(), status: "authExpired" };
      }
      return { ...signedOut(), status: fallback, autoLoginRetryable: !(error instanceof GatewayHttpError) || error.status === 429 || error.status >= 500 };
    }
  }
  async catalogFailure(account, revision) {
    if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    const session = await this.loadSession();
    if (session === void 0) return account;
    const checkedAt = (/* @__PURE__ */ new Date()).toISOString();
    const failed = (models) => ({
      checkedAt,
      status: "failed",
      groups: [...new Map(models.map((model) => [model.groupId, model])).values()].map((model) => ({
        groupId: model.groupId,
        groupName: model.groupName,
        status: "failed",
        count: models.filter((entry) => entry.groupId === model.groupId).length,
        checkedAt,
        error: "MODEL_SYNC_FAILED"
      }))
    });
    const retained = {
      ...session,
      models: session.models.map((model) => ({ ...model, stale: true })),
      mediaModels: (session.mediaModels ?? []).map((model) => ({ ...model, stale: true })),
      modelSync: failed(session.models),
      mediaSync: failed(session.mediaModels ?? [])
    };
    await this.storeSession(retained, revision);
    return snapshot(retained, account.balanceFreshness);
  }
  async loadSession() {
    const raw = await this.secrets.get(SESSION_KEY);
    if (raw === void 0) return void 0;
    const parsed = JSON.parse(raw);
    if (!this.bases.includes(parsed.baseUrl) || typeof parsed.accessToken !== "string" || parsed.accessToken.length === 0) {
      throw new Error("Stored AI Cloud session is invalid.");
    }
    const groups = (parsed.groups ?? []).map((group) => ({
      ...group,
      protocol: normalizeImageProtocol(group.protocolSource === "group-type" ? group.protocol : group.platform ?? group.protocol),
      protocolSource: group.protocolSource === "group-type" || ["openai", "gemini"].includes(group.platform ?? "") ? "group-type" : "openai-default"
    }));
    const groupProtocols = new Map(groups.map((group) => [group.groupId, group.protocol]));
    return {
      ...parsed,
      groups,
      models: parsed.models.filter((model) => model.capability !== "media").map((model) => ({
        ...model,
        providerId: managedProviderId(model.groupId, model.modelId),
        ...model.capability === "image-generation" || model.capability !== "chat" && (isKnownImageModel(model.modelId) || isImageGenerationGroup(model.groupName)) ? {
          capability: "image-generation",
          imageProtocol: groupProtocols.get(model.groupId) ?? model.imageProtocol ?? "openai",
          imageProtocolSource: groups.find((group) => group.groupId === model.groupId)?.protocolSource ?? model.imageProtocolSource ?? "openai-default",
          qualities: imageQualityChoices(model.modelId, model.qualities ?? [])
        } : {}
      })),
      mediaModels: (parsed.mediaModels ?? []).map((model) => ({ ...model, imageProtocol: model.imageProtocol ?? groupProtocols.get(model.groupId) ?? "openai", imageProtocolSource: model.imageProtocolSource ?? groups.find((group) => group.groupId === model.groupId)?.protocolSource ?? "openai-default" }))
    };
  }
  async loadLogin(revision = this.identityRevision) {
    const raw = await this.secrets.get(LOGIN_KEY);
    if (raw === void 0) return void 0;
    const parsed = JSON.parse(raw);
    if (!this.bases.includes(parsed.baseUrl ?? "") || typeof parsed.email !== "string" || !parsed.email.trim() || typeof parsed.password !== "string" || parsed.password.length === 0) {
      await this.mutateSecrets(revision, () => this.secrets.delete(LOGIN_KEY));
      return void 0;
    }
    return { baseUrl: parsed.baseUrl, email: parsed.email.trim(), password: parsed.password };
  }
  async requireSession() {
    const session = await this.loadSession();
    if (session === void 0) throw new Error("Sign in to AI Cloud first.");
    return session;
  }
  async mutateSecrets(revision, action) {
    const next = this.secretWrites.catch(() => {
    }).then(async () => {
      if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
      await action();
      if (revision !== this.identityRevision) throw new Error("ACCOUNT_STATE_CHANGED");
    });
    this.secretWrites = next;
    await next;
  }
  storeSession(session, revision = this.identityRevision) {
    return this.mutateSecrets(revision, () => this.secrets.set(SESSION_KEY, JSON.stringify(session)));
  }
  async storeLogin(login) {
    await this.secrets.set(LOGIN_KEY, JSON.stringify(login));
  }
  async isManuallySignedOut() {
    return await this.secrets.get(MANUAL_SIGNOUT_KEY) === "1";
  }
  async clearSession(session, clearLogin) {
    await Promise.all([
      this.secrets.delete(SESSION_KEY),
      ...session.groupIds.map((id) => this.secrets.delete(`${KEY_PREFIX}${id}`)),
      ...clearLogin ? [this.secrets.delete(LOGIN_KEY), this.secrets.delete(PREFERRED_BASE_KEY)] : []
    ]);
  }
  async preferredBase() {
    const stored = await this.secrets.get(PREFERRED_BASE_KEY);
    return stored === void 0 ? this.bases[0] : this.requireBase(stored);
  }
  requireBase(value) {
    const base = value.trim().replace(/\/$/, "");
    if (!this.bases.includes(base)) throw new Error("Unsupported AI Cloud gateway.");
    return base;
  }
  async orderedBases() {
    const preferred = await this.preferredBase();
    return [preferred, ...this.bases.filter((base) => base !== preferred)];
  }
  async withFailover(operation, bases) {
    let lastError;
    for (const base of bases ?? await this.orderedBases()) {
      try {
        return { ...await operation(base), base };
      } catch (error) {
        if (error instanceof GatewayHttpError) throw error;
        lastError = error;
      }
    }
    throw lastError instanceof Error ? lastError : new Error("AI Cloud is unreachable.");
  }
  async request(base, path, options = {}) {
    return { body: await this.rawRequest(`${base}/api/v1${path}`, options) };
  }
  async rawRequest(url, options = {}) {
    const response = await this.fetcher(url, {
      method: options.method ?? "GET",
      headers: {
        ...options.body === void 0 ? {} : { "content-type": "application/json" },
        ...options.token === void 0 ? {} : { authorization: `Bearer ${options.token}` }
      },
      ...options.body === void 0 ? {} : { body: JSON.stringify(options.body) },
      signal: AbortSignal.timeout(2e4)
    });
    const body = await response.text();
    if (!response.ok) throw new GatewayHttpError(response.status, errorMessage(response.status, body));
    return body;
  }
};
function parseMediaCapabilities(body, group, baseUrl) {
  const value = envelope(body);
  if (Number(value.group_id) !== group.id || value.platform !== "imagevideo" || !Array.isArray(value.models)) throw new Error("INVALID_MEDIA_CATALOG");
  const strings = (v) => Array.isArray(v) ? v.filter((x) => typeof x === "string" && x.length > 0) : [];
  return value.models.map((raw) => {
    if (!isRecord(raw) || typeof raw.model !== "string" || !raw.model || typeof raw.profile_id !== "string" || !["image", "video", "audio"].includes(String(raw.media_type))) throw new Error("INVALID_MEDIA_CAPABILITY");
    const duration = isRecord(raw.duration) ? raw.duration : {};
    const materials = {};
    if (isRecord(raw.materials)) {
      for (const [key, v] of Object.entries(raw.materials)) if (isRecord(v)) materials[key] = {
        formats: strings(v.formats),
        ...typeof v.reference_field === "string" ? { reference_field: v.reference_field } : {},
        ...typeof v.max_count === "number" ? { max_count: v.max_count } : {},
        ...typeof v.max_file_bytes === "number" ? { max_file_bytes: v.max_file_bytes } : {},
        ...typeof v.max_duration_seconds === "string" ? { max_duration_seconds: v.max_duration_seconds } : {}
      };
    }
    return {
      providerId: `zerowall-ai-cloud-${group.id}`,
      groupId: String(group.id),
      groupName: group.name,
      baseUrl: `${baseUrl}/v1`,
      modelId: raw.model,
      capability: "media",
      imageProtocol: group.protocol,
      imageProtocolSource: group.protocolSource,
      profileId: raw.profile_id,
      version: typeof raw.version === "string" ? raw.version : "",
      mediaType: raw.media_type,
      operations: strings(raw.operations),
      ...typeof raw.reference_field === "string" ? { referenceField: raw.reference_field } : {},
      ...typeof raw.reference_shape === "string" ? { referenceShape: raw.reference_shape } : {},
      requestFormat: raw.request_format === void 0 || raw.request_format === "legacy" ? "legacy" : raw.request_format === "unified" || raw.request_format === "yunfei_multimodal" || raw.request_format === "v6k_url" ? raw.request_format : (() => {
        throw new Error("INVALID_MEDIA_REQUEST_FORMAT");
      })(),
      duration: {
        ...typeof duration.mode === "string" ? { mode: duration.mode } : {},
        values: Array.isArray(duration.values) ? duration.values.filter((x) => typeof x === "number") : [],
        ...Object.fromEntries(["min", "max", "default", "required"].filter((key) => ["number", "boolean"].includes(typeof duration[key])).map((key) => [key, duration[key]]))
      },
      sizes: strings(raw.sizes),
      resolutions: strings(raw.resolutions),
      aspectRatios: strings(raw.aspect_ratios),
      qualities: strings(raw.qualities),
      formats: strings(raw.formats),
      materials,
      pollSeconds: typeof raw.poll_seconds === "number" ? Math.max(1, raw.poll_seconds) : 5,
      ...typeof raw.max_request_bytes === "number" ? { maxRequestBytes: raw.max_request_bytes } : {},
      ...typeof raw.observation_seconds === "number" ? { observationSeconds: raw.observation_seconds } : {}
    };
  });
}
var GatewayHttpError = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
var _verifyOrder_dec, _getOrder_dec, _createOrder_dec, _checkoutInfo_dec, _listOrders_dec, _discoverModels_dec, _logout_dec, _relogin_dec, _savedLogin_dec, _forgetLogin_dec, _current_dec, _register_dec, _login_dec, _forgotPassword_dec, _sendCode_dec, _selectGateway_dec, _groupCatalog_dec, _gateways_dec, _publicConfig_dec, _a, _init;
var ZeroWallAccountService = class extends (_a = TypertRemoteService, _publicConfig_dec = [Remote("publicConfig")], _gateways_dec = [Remote("gateways")], _groupCatalog_dec = [Remote("groupCatalog")], _selectGateway_dec = [Remote("selectGateway")], _sendCode_dec = [Remote("sendCode")], _forgotPassword_dec = [Remote("forgotPassword")], _login_dec = [Remote("login")], _register_dec = [Remote("register")], _current_dec = [Remote("current")], _forgetLogin_dec = [Remote("forgetLogin")], _savedLogin_dec = [Remote("savedLogin")], _relogin_dec = [Remote("relogin")], _logout_dec = [Remote("logout")], _discoverModels_dec = [Remote("discoverModels")], _listOrders_dec = [Remote("listOrders")], _checkoutInfo_dec = [Remote("checkoutInfo")], _createOrder_dec = [Remote("createOrder")], _getOrder_dec = [Remote("getOrder")], _verifyOrder_dec = [Remote("verifyOrder")], _a) {
  constructor(runtimeCtx) {
    super(runtimeCtx, "zerowallAccount");
    this.runtimeCtx = runtimeCtx;
    __runInitializers(_init, 5, this);
    __publicField(this, "client");
    this.client = new AiCloudClient({ secrets: new DshSecretStore(runtimeCtx.credentials) });
    runtimeCtx.inject(["llm"], (scope) => installDefaultReasoning(scope));
  }
  publicConfig(gatewayBaseUrl) {
    return this.client.publicConfig(gatewayBaseUrl);
  }
  gateways() {
    return this.client.gateways();
  }
  groupCatalog() {
    return this.client.groupCatalog();
  }
  async selectGateway(baseUrl) {
    return this.publish(await this.client.selectGateway(baseUrl));
  }
  sendCode(input) {
    return this.client.sendCode(input);
  }
  forgotPassword(input) {
    return this.client.forgotPassword(input);
  }
  async login(input) {
    return this.publish(await this.client.login(input));
  }
  async register(input) {
    return this.publish(await this.client.register(input));
  }
  async current() {
    let state = await this.client.current();
    if (state.status === "signedIn" && state.mediaSync === void 0) {
      try {
        state = await this.client.discoverModels();
      } catch {
      }
    }
    return this.publish(state);
  }
  forgetLogin() {
    return this.client.forgetLogin();
  }
  savedLogin() {
    return this.client.savedLogin();
  }
  async relogin() {
    return this.publish(await this.client.relogin());
  }
  async logout() {
    await this.client.logout();
    this.publish(signedOut());
  }
  async discoverModels() {
    const snapshot2 = await this.client.discoverModels();
    await this.runtimeCtx.parallel("zerowall/account-updated", snapshot2);
    return snapshot2;
  }
  listOrders() {
    return this.client.listOrders();
  }
  checkoutInfo() {
    return this.client.checkoutInfo();
  }
  createOrder(input) {
    return this.client.createOrder(input);
  }
  getOrder(input) {
    return this.client.getOrder(input);
  }
  verifyOrder(input) {
    return this.client.verifyOrder(input);
  }
  publish(snapshot2) {
    this.runtimeCtx.emit("zerowall/account-updated", snapshot2);
    return snapshot2;
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "publicConfig", _publicConfig_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "gateways", _gateways_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "groupCatalog", _groupCatalog_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "selectGateway", _selectGateway_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "sendCode", _sendCode_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "forgotPassword", _forgotPassword_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "login", _login_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "register", _register_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "current", _current_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "forgetLogin", _forgetLogin_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "savedLogin", _savedLogin_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "relogin", _relogin_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "logout", _logout_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "discoverModels", _discoverModels_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "listOrders", _listOrders_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "checkoutInfo", _checkoutInfo_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "createOrder", _createOrder_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "getOrder", _getOrder_dec, ZeroWallAccountService);
__decorateElement(_init, 1, "verifyOrder", _verifyOrder_dec, ZeroWallAccountService);
__decoratorMetadata(_init, ZeroWallAccountService);
__publicField(ZeroWallAccountService, "inject", ["credentials"]);
function required(value, label) {
  const out = value.trim();
  if (!out) throw new Error(`${label} is required.`);
  return out;
}
function normalizedEmail(value) {
  const email = required(value, "Email").toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("ACCOUNT_INVALID_EMAIL");
  return email;
}
function requiredPassword(value) {
  if (!value) throw new Error("Password is required.");
  return value;
}
function parseSendCodeResult(body) {
  const data = envelope(body);
  return Math.max(1, Math.floor(numberField(data, ["countdown", "count_down", "cooldown"]) ?? 60));
}
function managedProviderId(groupId, modelId) {
  return `zerowall-ai-cloud-${groupId}-${managedProtocol(modelId)}`;
}
function managedProtocol(modelId) {
  if (/^(?:gpt|o[1-9]|o3|o4|chatgpt)/iu.test(modelId)) return "responses";
  if (/^(?:claude|anthropic)/iu.test(modelId)) return "messages";
  return "completions";
}
function modelBaseUrl(baseUrl, modelId) {
  return managedProtocol(modelId) === "messages" ? baseUrl : `${baseUrl}/v1`;
}
function envelope(body) {
  const root = JSON.parse(body);
  return isRecord(root.data) ? root.data : root;
}
function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function stringField(value, names) {
  for (const name3 of names) {
    const hit = value[name3];
    if (typeof hit === "string" && hit.trim()) return hit.trim();
  }
  return void 0;
}
function numberField(value, names) {
  const hit = stringField(value, names) ?? names.map((name3) => value[name3]).find((item) => typeof item === "number");
  const parsed = Number(hit);
  return Number.isFinite(parsed) ? parsed : void 0;
}
function booleanField(value, names) {
  for (const name3 of names) {
    const hit = value[name3];
    if (typeof hit === "boolean") return hit;
    if (hit === 1 || hit === "1" || hit === "true") return true;
  }
  return false;
}
function optionalAccessToken(body) {
  return stringField(envelope(body), ["access_token", "accessToken", "token"]);
}
function accessToken(body) {
  const token = optionalAccessToken(body);
  if (!token) throw new Error("AI Cloud returned no access token.");
  return token;
}
function accountFunds(body) {
  const data = envelope(body);
  const account = isRecord(data.user) ? data.user : isRecord(data.account) ? data.account : data;
  return { balance: numberField(account, ["balance", "credit", "amount"]) ?? 0, currency: stringField(account, ["currency", "currency_code", "unit"]) ?? "CNY" };
}
function parsePublicConfig(body) {
  const data = envelope(body);
  const recharge = stringField(data, ["rechargeUrl", "recharge_url"]);
  const lowBalanceThreshold = numberField(data, ["lowBalanceThreshold", "low_balance_threshold"]);
  return { registrationEnabled: booleanField(data, ["registrationEnabled", "registration_enabled"]), emailVerifyEnabled: booleanField(data, ["emailVerifyEnabled", "email_verify_enabled"]), invitationCodeEnabled: booleanField(data, ["invitationCodeEnabled", "invitation_code_enabled"]), captchaEnabled: ["captchaEnabled", "captcha_enabled", "turnstile_enabled", "tencent_captcha_enabled", "aliyun_captcha_enabled"].some((key) => booleanField(data, [key])), passwordResetEnabled: booleanField(data, ["passwordResetEnabled", "password_reset_enabled"]), ...recharge === void 0 ? {} : { rechargeUrl: validateRechargeUrl(recharge) }, ...lowBalanceThreshold === void 0 ? {} : { lowBalanceThreshold } };
}
function validateRechargeUrl(raw) {
  const url = new URL(raw);
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.hash || !["aicodeme.cn", "aicodeme.xyz"].some((root) => url.hostname === root || url.hostname.endsWith(`.${root}`))) throw new Error("AI Cloud returned an unsafe recharge URL.");
  return raw;
}
function list(body) {
  const root = JSON.parse(body);
  if (Array.isArray(root)) return root;
  if (!isRecord(root)) return [];
  const data = root.data;
  if (Array.isArray(data)) return data;
  if (isRecord(data) && Array.isArray(data.items)) return data.items;
  return Array.isArray(root.items) ? root.items : [];
}
function availableGroups(body) {
  return list(body).flatMap((item) => {
    if (!isRecord(item)) return [];
    const id = Number(item.id);
    const name3 = typeof item.name === "string" ? item.name.trim() : "";
    const rawProtocol = [item.protocol, item.group_type, item.groupType, item.provider_type, item.type, item.platform].find((value) => typeof value === "string" && ["openai", "openai-compatible", "openai_images", "gemini", "gemini-native", "google-gemini"].includes(value.trim().toLowerCase()));
    const protocol = normalizeImageProtocol(rawProtocol);
    const protocolSource = typeof rawProtocol === "string" && ["openai", "openai-compatible", "openai_images", "gemini", "gemini-native", "google-gemini"].includes(rawProtocol.trim().toLowerCase()) ? "group-type" : "openai-default";
    const imageCapability = item.image_capability === true || item.imageCapability === true || item.capability === "image-generation" || item.capability === "image_generation" || item.media_type === "image" || item.platform === "image" || item.platform === "imagevideo" || isImageGenerationGroup(name3);
    const disabled = [item.visible, item.available, item.enabled, item.is_visible, item.is_available].includes(false) || ["disabled", "inactive", "unavailable", "closed"].includes(String(item.status ?? "").toLowerCase());
    if (!Number.isInteger(id) || id <= 0 || !name3 || disabled) return [];
    const rawRate = item.rate_multiplier;
    const rate = typeof rawRate === "number" ? rawRate : typeof rawRate === "string" && rawRate.trim() ? Number(rawRate) : void 0;
    return [{
      id,
      name: name3,
      protocol,
      protocolSource,
      ...imageCapability ? { imageCapability: true } : {},
      ...typeof item.platform === "string" ? { platform: item.platform } : {},
      ...typeof item.description === "string" && item.description.trim() ? { description: item.description.trim() } : {},
      ...rate !== void 0 && Number.isFinite(rate) && rate >= 0 ? { rateMultiplier: rate } : {}
    }];
  });
}
function isImageGenerationGroup(name3) {
  return /生图|图片|image[\s_-]*(?:generation|gen)(?:\b|_)/iu.test(name3);
}
function isKnownImageModel(id) {
  return /^(?:gpt-image-|dall-e(?:-|$))|^gemini-.*(?:-image(?:-|$)|-nano-banana(?:-|$))/iu.test(id);
}
function existingKeys(body) {
  return list(body).flatMap((item) => {
    if (!isRecord(item) || item.enabled === false) return [];
    const key = stringField(item, ["key", "token", "api_key"]);
    const groupId = Number(item.group_id ?? (isRecord(item.group) ? item.group.id : void 0));
    return key === void 0 ? [] : [{ key, ...Number.isInteger(groupId) ? { groupId } : {} }];
  });
}
function createdKey(body) {
  const key = stringField(envelope(body), ["key", "token", "api_key"]);
  if (!key) throw new Error("AI Cloud created a key but returned no credential.");
  return key;
}
function modelIds(body) {
  const root = JSON.parse(body);
  const values = Array.isArray(root.data) ? root.data : Array.isArray(root) ? root : [];
  const ids = values.flatMap((item) => isRecord(item) && typeof item.id === "string" && item.id ? [item.id] : []);
  if (ids.length === 0) throw new Error("AI Cloud listed no models for a managed group.");
  return ids;
}
function signedOut(gatewayBaseUrl) {
  return { status: "signedOut", balanceFreshness: "current", lowBalance: false, ...gatewayBaseUrl === void 0 ? {} : { gatewayBaseUrl }, models: [] };
}
function modelCapacity(body, id) {
  const data = JSON.parse(body).data;
  const entry = Array.isArray(data) ? data.find((row) => row.id === id) : void 0;
  const positive = (value) => Number.isSafeInteger(value) && Number(value) > 0;
  const context = entry?.context_window ?? entry?.contextWindow;
  const output = entry?.max_output_tokens ?? entry?.maxOutputTokens;
  const local = MODELS_DEV_CONTEXT[id];
  const resolvedContext = positive(context) ? context : local?.context;
  const resolvedOutput = positive(output) ? output : local?.output;
  const source = positive(context) || positive(output) ? "gateway" : local === void 0 ? void 0 : "models-dev";
  return {
    ...positive(resolvedContext) ? { contextWindow: resolvedContext } : {},
    ...positive(resolvedOutput) ? { maxOutputTokens: resolvedOutput } : {},
    ...source === void 0 ? {} : { capacitySource: source }
  };
}
function modelQualities(body, id) {
  const value = JSON.parse(body);
  const rows = Array.isArray(value) ? value : value.data;
  const entry = Array.isArray(rows) ? rows.find((row) => row.id === id) : void 0;
  return Array.isArray(entry?.qualities) ? entry.qualities.filter((quality) => typeof quality === "string") : [];
}
function modelImageCapability(body, id, imageGroup = false) {
  const value = JSON.parse(body), rows = Array.isArray(value) ? value : value.data;
  const entry = Array.isArray(rows) ? rows.find((row) => row.id === id) : void 0;
  if (!isRecord(entry)) return void 0;
  const capabilityValues = [entry.capability, entry.type, ...Array.isArray(entry.capabilities) ? entry.capabilities : [], ...Array.isArray(entry.modalities) ? entry.modalities : [], ...Array.isArray(entry.output_modalities) ? entry.output_modalities : [], ...Array.isArray(entry.supported_generation_methods) ? entry.supported_generation_methods : [], ...Array.isArray(entry.supportedGenerationMethods) ? entry.supportedGenerationMethods : []];
  const capabilities = capabilityValues.map((item) => String(item).trim().toLowerCase());
  const image = capabilities.some((item) => ["image", "images", "image_generation", "image-generation", "image_generation_edit", "generatecontent", "generate_content"].includes(item));
  const chat = capabilities.some((value2) => ["chat", "text", "text-generation"].includes(value2));
  if (!image && !imageGroup && (chat || !isKnownImageModel(id))) return void 0;
  const strings = (value2) => typeof value2 === "string" && value2.trim().length > 0 ? [value2.trim()] : Array.isArray(value2) ? value2.filter((item) => typeof item === "string" && item.trim().length > 0) : [];
  const operations = strings(entry.operations).map((value2) => value2.toLowerCase());
  const imageConfig = isRecord(entry.image_config) ? entry.image_config : isRecord(entry.imageConfig) ? entry.imageConfig : {};
  const responseFormats = strings(entry.response_formats ?? entry.responseFormats ?? entry.response_format).map((value2) => value2.toLowerCase()).filter((value2) => value2 === "url" || value2 === "b64_json");
  return {
    resolutions: strings(entry.resolutions ?? entry.resolution ?? imageConfig.resolutions),
    aspectRatios: strings(entry.aspect_ratios ?? entry.aspectRatios ?? imageConfig.aspect_ratios ?? imageConfig.aspectRatios),
    imageSizes: strings(entry.image_sizes ?? entry.imageSizes ?? imageConfig.image_sizes ?? imageConfig.imageSizes ?? imageConfig.resolution),
    supportsImageEdit: entry.supports_image_edit === true || operations.includes("image_edit") || operations.includes("edit"),
    supportsImageReferences: entry.supports_image_references === true || operations.includes("image_edit") || operations.includes("edit") || entry.supports_references === true,
    supportsImageMask: entry.supports_image_mask === true || operations.includes("image_edit_mask"),
    responseFormats
  };
}
function snapshot(session, freshness) {
  return { status: "signedIn", email: session.email, balance: session.balance, currency: session.currency, balanceFreshness: freshness, gatewayBaseUrl: session.baseUrl, ...session.groups ? { groups: session.groups } : {}, ...session.rechargeUrl === void 0 ? {} : { rechargeUrl: session.rechargeUrl }, lowBalance: session.lowBalanceThreshold !== void 0 && session.balance <= session.lowBalanceThreshold, models: session.models, mediaModels: session.mediaModels ?? [], ...session.mediaSync ? { mediaSync: session.mediaSync } : {}, ...session.modelSync ? { modelSync: session.modelSync } : {} };
}
function gatewayLabel(baseUrl) {
  return baseUrl === PRIMARY_BASE ? "Hong Kong (default)" : baseUrl.includes(".xyz") ? "Global XYZ backup" : "Global CN backup";
}
function normalizePaymentType(value) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "wechat" || normalized === "wechat_pay") return "wxpay";
  if (["alipay", "alipay_direct", "wxpay", "wxpay_direct"].includes(normalized)) return normalized;
  throw new Error("Unsupported payment type.");
}
function paymentOrderPayload(value) {
  if (!isRecord(value)) throw new Error("AI Cloud returned an invalid payment order.");
  const data = isRecord(value.data) ? value.data : void 0;
  for (const candidate of [data?.order, data?.payment_order, data, value.order, value.payment_order, value]) {
    if (isRecord(candidate)) return candidate;
  }
  throw new Error("AI Cloud returned an invalid payment order.");
}
function paymentOrder(value) {
  const id = Number(value.order_id ?? value.orderId ?? value.id);
  const amount = Number(value.amount ?? value.pay_amount ?? value.actual_amount ?? value.payment_amount);
  if (!Number.isSafeInteger(id) || id <= 0 || !Number.isFinite(amount)) throw new Error("AI Cloud returned an invalid payment order.");
  const outTradeNo = stringField(value, ["out_trade_no", "outTradeNo"]) ?? "";
  const status = (stringField(value, ["status", "payment_status"]) ?? "PENDING").toUpperCase();
  const paymentType = stringField(value, ["payment_type", "paymentType", "channel"]) ?? "";
  const rawPaymentUrl = stringField(value, ["payment_url", "paymentUrl", "pay_url", "payUrl"]);
  const paymentUrl = rawPaymentUrl === void 0 ? void 0 : validatePaymentUrl(rawPaymentUrl);
  const qrCode = stringField(value, ["qr_code", "qrCode", "code_url", "codeUrl"]);
  const createdAt = stringField(value, ["created_at", "createdAt"]);
  return { id, outTradeNo, status, amount, paymentType, ...paymentUrl === void 0 ? {} : { paymentUrl }, ...qrCode === void 0 ? {} : { qrCode }, ...createdAt === void 0 ? {} : { createdAt } };
}
function paymentOrders(body) {
  const root = JSON.parse(body);
  const candidates = paymentOrderList(root);
  return candidates.flatMap((item) => {
    try {
      return isRecord(item) ? [paymentOrder(paymentOrderPayload(item))] : [];
    } catch {
      return [];
    }
  });
}
function paymentOrderList(value) {
  if (Array.isArray(value)) return value;
  if (!isRecord(value)) return [];
  for (const candidate of [value.data, value.orders, value.items, value.list]) {
    if (Array.isArray(candidate)) return candidate;
    if (isRecord(candidate)) {
      for (const nested of [candidate.orders, candidate.items, candidate.list, candidate.records]) {
        if (Array.isArray(nested)) return nested;
      }
    }
  }
  return [];
}
function checkoutInfo(body, fallbackUrl) {
  const data = envelope(body);
  const methods = isRecord(data.methods) ? data.methods : void 0;
  const methodMinimums = methods === void 0 ? [] : Object.values(methods).flatMap((entry) => {
    if (!isRecord(entry)) return [];
    const minimum = numberField(entry, ["single_min", "singleMin", "minimum_amount", "minimumAmount"]);
    return minimum === void 0 || minimum <= 0 ? [] : [minimum];
  });
  const configuredMinimum = numberField(data, ["global_min", "globalMin", "minimum_amount", "minimumAmount", "min_amount", "minAmount"]);
  const minimumAmount = Math.max(10, configuredMinimum ?? 0, ...methodMinimums);
  const rawTypes = data.payment_types ?? data.paymentTypes ?? data.channels ?? (methods === void 0 ? void 0 : Object.keys(methods));
  const paymentTypes = Array.isArray(rawTypes) ? rawTypes.flatMap((entry) => typeof entry === "string" && entry.trim() ? [normalizePaymentType(entry)] : []) : ["alipay", "wxpay"];
  const rawRechargeUrl = stringField(data, ["recharge_url", "rechargeUrl"]) ?? fallbackUrl;
  return {
    enabled: data.enabled !== false && data.available !== false && data.balance_disabled !== true && data.balanceDisabled !== true,
    minimumAmount,
    paymentTypes: [...new Set(paymentTypes)],
    ...rawRechargeUrl === void 0 ? {} : { rechargeUrl: validateRechargeUrl(rawRechargeUrl) }
  };
}
function validatePaymentUrl(raw) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password) return void 0;
    return raw;
  } catch {
    return void 0;
  }
}
function errorMessage(status, body) {
  try {
    const value = JSON.parse(body);
    return stringField(value, ["message", "error"]) ?? `AI Cloud returned HTTP ${status}.`;
  } catch {
    return body.trim() ? `HTTP ${status}: ${body.trim()}` : `AI Cloud returned HTTP ${status}.`;
  }
}
function apply(ctx) {
  ctx.plugin(ZeroWallAccountService);
}
var host_default = { apply };

// src/cloud/host/index.ts
var host_exports2 = {};
__export(host_exports2, {
  AiCloudLlmController: () => AiCloudLlmController,
  AiCloudMediaService: () => AiCloudMediaService,
  apply: () => apply2,
  default: () => host_default2,
  downloadImageBytes: () => downloadImageBytes,
  inject: () => inject,
  mediaTarget: () => mediaTarget,
  name: () => name,
  normalizeGeminiImageSize: () => normalizeGeminiImageSize,
  normalizeMediaReferences: () => normalizeMediaReferences,
  publicReferenceURL: () => publicReferenceURL
});
import { LlmError as LlmError2 } from "@deepseek-ai/dsh-llm";

// src/cloud/host/profile-resolver.ts
import { createProvider } from "@earendil-works/pi-ai";
import { openAICompletionsApi } from "@earendil-works/pi-ai/api/openai-completions.lazy";
import { openAIResponsesApi } from "@earendil-works/pi-ai/api/openai-responses.lazy";
import { anthropicMessagesApi } from "@earendil-works/pi-ai/api/anthropic-messages.lazy";
import { resolveRetryPolicy as resolveRetryPolicy2 } from "@deepseek-ai/dsh-llm";

// src/cloud/host/managed-adapter.ts
import { LlmError, resolveRetryPolicy } from "@deepseek-ai/dsh-llm";
import { PiAiAdapter } from "@deepseek-ai/dsh-llm-pi-ai";
var defaults = resolveRetryPolicy(void 0, "ZeroWall AI Cloud retry policy");
var managedRetryPolicy = {
  mode: "normal",
  maxRetries: 5,
  retryableCodes: [...defaults.mode === "normal" ? defaults.retryableCodes : [], "STREAM_CLOSED", "PI_AI_ERROR"]
};
function normalizeFailure(failure) {
  if (!["INVALID_REQUEST", "PI_AI_ERROR"].includes(failure.code)) return failure;
  if (failure.code === "PI_AI_ERROR" && /^(?:Unsupported (?:parameter|model|protocol)|Invalid (?:parameter|argument|request)|pi-ai deferred response for model ".*" is not supported)/iu.test(failure.message)) return { ...failure, code: "INVALID_REQUEST" };
  if (failure.code === "PI_AI_ERROR" && /^(?:Unexpected end of JSON input|(?:Unexpected non-whitespace character after JSON|Unterminated string in JSON) at position \d+(?: \(line \d+ column \d+\))?)$/u.test(failure.message)) return { ...failure, code: "TRANSPORT" };
  if (/^\s*upstream_error\s*:/u.test(failure.message)) return { ...failure, code: "SERVER" };
  const start = failure.message.indexOf("{");
  if (start < 0) return failure;
  try {
    const body = JSON.parse(failure.message.slice(start));
    const error = body?.error ?? body;
    if (error?.type === "upstream_error") return { ...failure, code: "SERVER" };
    if (failure.code === "PI_AI_ERROR") {
      if (["authentication_error", "invalid_api_key", "permission_error"].includes(error?.type ?? error?.code)) return { ...failure, code: "AUTH" };
      if (["invalid_request_error", "model_not_found", "unsupported_parameter", "content_policy_violation"].includes(error?.type ?? error?.code)) return { ...failure, code: "INVALID_REQUEST" };
    }
  } catch {
  }
  return failure;
}
async function* managedStream(source) {
  try {
    for await (const chunk of source) {
      if (chunk.type === "finish" && chunk.reason.kind === "error") {
        yield { ...chunk, reason: { ...chunk.reason, failure: normalizeFailure(chunk.reason.failure) } };
      } else yield chunk;
    }
  } catch (error) {
    if (!(error instanceof LlmError)) throw error;
    const failure = normalizeFailure(error.failure);
    if (failure.code === error.code) throw error;
    throw new LlmError(error.message, failure.code, { ...failure, cause: error });
  }
}
var ManagedPiAiAdapter = class extends PiAiAdapter {
  async prepareCall(provider, model, signal) {
    const call = await super.prepareCall(provider, model, signal);
    return { ...call, stream: (options) => managedStream(call.stream(options)) };
  }
  stream(options) {
    return managedStream(super.stream(options));
  }
};

// src/cloud/host/profile-resolver.ts
var DEFAULT_CONTEXT_WINDOW = 1e6;
var DEFAULT_MAX_TOKENS = 128e3;
var DEFAULT_STREAM_IDLE_TIMEOUT_MS = 3e5;
var DEFAULT_MAX_REQUEST_IMAGE_BYTES = 20 * 1024 * 1024;
var DEFAULT_REQUEST_IMAGE_PIXEL_BUDGET = 2048 * 2048;
var DEFAULT_REQUEST_IMAGE_MAX_BYTES = 1024 * 1024;
function resolveManagedProfiles(routes) {
  const profiles = /* @__PURE__ */ new Map();
  for (const [provider, route] of Object.entries(routes)) {
    if (provider.length === 0) throw new Error("Managed AI Cloud provider names must not be empty.");
    if (!route.api || !route.baseURL || !route.models?.length) throw new Error(`Managed AI Cloud route "${provider}" is incomplete.`);
    const baseUrl = route.baseURL;
    for (const profile of route.models) {
      if (!profile.id.trim()) throw new Error(`Managed AI Cloud route "${provider}" contains an empty model id.`);
    }
    const api = route.api;
    const models = route.models.map((profile) => toPiModel(provider, baseUrl, api, profile));
    const displayName = route.displayName ?? provider;
    const piProvider = createProvider({
      id: provider,
      name: displayName,
      baseUrl,
      auth: {
        apiKey: {
          name: "ZeroWall AI Cloud",
          resolve: async ({ credential }) => credential?.key ? { auth: { apiKey: credential.key }, source: "ZeroWall AI Cloud" } : { auth: {} }
        }
      },
      models,
      api: apiFor(api)
    });
    const configuredMaxTokens = /* @__PURE__ */ new Map();
    for (const profile of route.models) if (profile.maxTokens !== void 0) configuredMaxTokens.set(profile.id, profile.maxTokens);
    const resolved = {
      provider,
      displayName,
      api,
      baseURL: baseUrl,
      ...route.compat === void 0 ? {} : { compat: route.compat },
      defaultInput: route.defaultInput ?? ["text", "image"],
      streamIdleTimeoutMs: DEFAULT_STREAM_IDLE_TIMEOUT_MS,
      maxRequestImageBytes: DEFAULT_MAX_REQUEST_IMAGE_BYTES,
      requestImagePixelBudget: DEFAULT_REQUEST_IMAGE_PIXEL_BUDGET,
      requestImageMaxBytes: DEFAULT_REQUEST_IMAGE_MAX_BYTES,
      retryPolicy: resolveRetryPolicy2(route.retryPolicy ?? managedRetryPolicy, `ZeroWall AI Cloud route "${provider}"`),
      configuredMaxTokens,
      modelErrors: /* @__PURE__ */ new Map(),
      piProvider
    };
    profiles.set(provider, resolved);
  }
  return profiles;
}
function toPiModel(provider, baseUrl, api, profile) {
  const efforts = profile.reasoningEfforts === false ? void 0 : profile.reasoningEfforts;
  const thinkingLevelMap = efforts ? { ...efforts } : void 0;
  return {
    id: profile.id,
    name: profile.name ?? profile.id,
    api,
    provider,
    baseUrl,
    input: profile.input?.length ? [...profile.input] : ["text", "image"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    reasoning: efforts !== void 0 && Object.keys(efforts).some((level) => level !== "off"),
    ...thinkingLevelMap ? { thinkingLevelMap } : {},
    contextWindow: profile.contextWindow ?? DEFAULT_CONTEXT_WINDOW,
    maxTokens: profile.maxTokens ?? DEFAULT_MAX_TOKENS,
    compat: profile.compat ?? void 0
  };
}
function apiFor(api) {
  switch (api) {
    case "anthropic-messages":
      return anthropicMessagesApi();
    case "openai-responses":
      return openAIResponsesApi();
    case "openai-completions":
      return openAICompletionsApi();
    default:
      throw new Error(`Unsupported ZeroWall AI Cloud protocol "${api}".`);
  }
}

// src/cloud/host/media-jobs.ts
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rename, writeFile, lstat, realpath, unlink } from "node:fs/promises";
import { isAbsolute, join, relative, resolve } from "node:path";
import { homedir } from "node:os";
import { setTimeout as delay } from "node:timers/promises";

// src/cloud/host/artifact-format.ts
function artifactFormat(data) {
  const bytes2 = Buffer.from(data);
  if (bytes2.length >= 24 && bytes2.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) && bytes2.toString("ascii", 12, 16) === "IHDR") return { mediaType: "image/png" };
  if (bytes2.length > 3 && bytes2[0] === 255 && bytes2[1] === 216 && bytes2[2] === 255) return { mediaType: "image/jpeg" };
  if (bytes2.length >= 12 && bytes2.toString("ascii", 0, 4) === "RIFF") {
    if (bytes2.toString("ascii", 8, 12) === "WEBP") return { mediaType: "image/webp" };
    if (bytes2.toString("ascii", 8, 12) === "WAVE") {
      let byteRate = 0, size = 0;
      for (let p = 12; p + 8 <= bytes2.length; ) {
        const n = bytes2.readUInt32LE(p + 4), end = p + 8 + n;
        if (end > bytes2.length) throw new Error("MEDIA_TRUNCATED_ARTIFACT");
        if (bytes2.toString("ascii", p, p + 4) === "fmt " && n >= 16) byteRate = bytes2.readUInt32LE(p + 16);
        if (bytes2.toString("ascii", p, p + 4) === "data") size = n;
        p = end + n % 2;
      }
      if (!byteRate || !size) throw new Error("MEDIA_INVALID_WAV");
      return { mediaType: "audio/wav", duration: size / byteRate };
    }
  }
  if (bytes2.length >= 12 && bytes2.toString("ascii", 4, 8) === "ftyp") {
    let audio = false, video = false, duration;
    const boxes = (start, end, depth) => {
      for (let p = start; p < end; ) {
        if (p + 8 > end) throw new Error("MEDIA_TRUNCATED_ARTIFACT");
        let size = bytes2.readUInt32BE(p), header = 8;
        if (size === 1) {
          if (p + 16 > end) throw new Error("MEDIA_TRUNCATED_ARTIFACT");
          const extended = bytes2.readBigUInt64BE(p + 8);
          if (extended > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("MEDIA_INVALID_MP4");
          size = Number(extended);
          header = 16;
        } else if (size === 0) size = end - p;
        if (size < header || size > end - p) throw new Error("MEDIA_TRUNCATED_ARTIFACT");
        const type = bytes2.toString("ascii", p + 4, p + 8), body = p + header;
        if (["moov", "trak", "mdia"].includes(type) && depth < 3) boxes(body, p + size, depth + 1);
        if (type === "hdlr" && depth === 3 && size >= header + 12) {
          const handler = bytes2.toString("ascii", body + 8, body + 12);
          audio ||= handler === "soun";
          video ||= handler === "vide";
        }
        if (type === "mvhd" && depth === 1) {
          const version = bytes2[body], scaleOffset = version === 0 ? 12 : 20, durationOffset = version === 0 ? 16 : 24;
          if ((version === 0 || version === 1) && size >= header + durationOffset + (version === 0 ? 4 : 8)) {
            const scale = bytes2.readUInt32BE(body + scaleOffset);
            const ticks = version === 0 ? bytes2.readUInt32BE(body + durationOffset) : Number(bytes2.readBigUInt64BE(body + durationOffset));
            if (scale && Number.isSafeInteger(ticks) && ticks > 0) duration = ticks / scale;
          }
        }
        p += size;
      }
    };
    boxes(0, bytes2.length, 0);
    if (!audio && !video) throw new Error("MEDIA_INVALID_MP4");
    return { mediaType: video ? "video/mp4" : "audio/mp4", ...duration !== void 0 ? { duration } : {} };
  }
  if (bytes2.length >= 32 && bytes2.subarray(0, 4).equals(Buffer.from([26, 69, 223, 163])) && bytes2.subarray(0, 4096).includes(Buffer.from("webm"))) return { mediaType: "video/webm" };
  if (bytes2.length >= 7 && bytes2[0] === 255 && (bytes2[1] & 246) === 240) return { mediaType: "audio/aac" };
  if (bytes2.length >= 4 && bytes2.toString("ascii", 0, 4) === "fLaC") return { mediaType: "audio/flac" };
  if (bytes2.length >= 3 && (bytes2.toString("ascii", 0, 3) === "ID3" || bytes2[0] === 255 && (bytes2[1] & 224) === 224)) return { mediaType: "audio/mpeg" };
  if (bytes2.length >= 4 && bytes2.toString("ascii", 0, 4) === "OggS") return { mediaType: "audio/ogg" };
  throw new Error("MEDIA_UNRECOGNIZED_ARTIFACT_FORMAT");
}

// src/cloud/host/media-reference.ts
var MAX_REFERENCE_BYTES = 50 * 1024 * 1024;
var MAX_MEDIA_REQUEST_BYTES = 256 * 1024 * 1024;
function publicReferenceURL(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("MEDIA_PUBLIC_URL_REQUIRED: \u8BF7\u63D0\u4F9B\u53EF\u76F4\u63A5\u8BBF\u95EE\u7684 HTTPS \u7D20\u6750\u94FE\u63A5\u3002");
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.hash || url.hostname.endsWith(".") || !url.hostname.includes(".") || /^[\d.]+$/.test(url.hostname) || url.hostname.includes(":") || /(^|\.)(localhost|local|internal|test|invalid)$/.test(url.hostname)) throw new Error("MEDIA_PUBLIC_URL_REQUIRED: \u8BF7\u63D0\u4F9B\u516C\u7F51 HTTPS \u7D20\u6750\u76F4\u94FE\u3002");
  return raw;
}
function referenceValue(ref) {
  return ref.url !== void 0 ? publicReferenceURL(ref.url) : `data:${ref.mediaType};base64,${ref.base64}`;
}
function referenceBytes(ref) {
  if (!/^(image\/(png|jpeg|webp)|video\/(mp4|quicktime|webm)|audio\/(mp4|aac|wav|mpeg|ogg|flac))$/.test(ref.mediaType) || ref.url !== void 0 === (ref.base64 !== void 0)) throw new Error("MEDIA_REFERENCE_INVALID");
  if ((ref.role === "first_frame" || ref.role === "last_frame") && !ref.mediaType.startsWith("image/")) throw new Error("MEDIA_REFERENCE_ROLE_UNSUPPORTED");
  if (ref.url !== void 0) {
    publicReferenceURL(ref.url);
    return void 0;
  }
  const encoded = ref.base64;
  if (!encoded.length || encoded.length > Math.ceil(MAX_REFERENCE_BYTES / 3) * 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) throw new Error("MEDIA_REFERENCE_INVALID");
  const bytes2 = Buffer.from(encoded, "base64");
  if (bytes2.length > MAX_REFERENCE_BYTES || bytes2.toString("base64") !== encoded) throw new Error("MEDIA_REFERENCE_INVALID");
  const actual = artifactFormat(bytes2);
  if (actual.mediaType !== ref.mediaType && !(actual.mediaType === "video/mp4" && ref.mediaType === "video/quicktime")) throw new Error("MEDIA_REFERENCE_INVALID");
  return bytes2;
}
function decodeBase64Reference(encoded) {
  if (!encoded.length || encoded.length > Math.ceil(MAX_REFERENCE_BYTES / 3) * 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) throw new Error("MEDIA_REFERENCE_INVALID");
  const bytes2 = Buffer.from(encoded, "base64");
  if (bytes2.length > MAX_REFERENCE_BYTES || bytes2.toString("base64") !== encoded) throw new Error("MEDIA_REFERENCE_INVALID");
  try {
    return { mediaType: artifactFormat(bytes2).mediaType, base64: encoded };
  } catch {
    throw new Error("MEDIA_REFERENCE_INVALID");
  }
}
function validateFrameReferences(refs) {
  const images = refs.filter((ref) => ref.mediaType.startsWith("image/"));
  const frames = images.filter((ref) => ref.role === "first_frame" || ref.role === "last_frame");
  if (frames.length && (frames.length !== images.length || new Set(frames.map((ref) => ref.role)).size !== frames.length)) throw new Error("MEDIA_FRAME_REFERENCE_CONFLICT: \u9996\u5C3E\u5E27\u4E0D\u80FD\u4E0E\u666E\u901A\u56FE\u7247\u53C2\u8003\u6DF7\u7528\uFF0C\u6BCF\u4E2A\u89D2\u8272\u6700\u591A\u4E00\u5F20\u3002");
}
function normalizeMediaReferences(input) {
  const parameters = structuredClone(input.parameters ?? {}), references = structuredClone(input.references ?? []);
  for (const kind of ["image", "video", "audio"]) {
    let selected;
    for (const field of [kind + "s", "reference_" + kind + "s", "reference_" + kind + "_urls"]) {
      if (parameters[field] === void 0) continue;
      const list2 = parameters[field];
      if (!Array.isArray(list2)) throw new Error("MEDIA_REFERENCES_INVALID: " + field);
      const refs = list2.map((value) => {
        const object = typeof value === "string" ? { url: value } : value;
        if (!object || typeof object !== "object" || Array.isArray(object)) throw new Error("MEDIA_REFERENCE_INVALID");
        const { url, b64_json, media_type, ...properties } = object;
        if (url !== void 0 === (b64_json !== void 0)) throw new Error("MEDIA_REFERENCE_ONE_SOURCE_REQUIRED");
        const source = url ?? b64_json;
        if (typeof source !== "string") throw new Error("MEDIA_REFERENCE_INVALID");
        const encoded = /^data:([a-z0-9.+-]+\/[a-z0-9.+-]+)(?:;[^,]*)?;base64,([A-Za-z0-9+/]+={0,2})$/i.exec(source);
        const declaredType = typeof media_type === "string" ? media_type.toLowerCase() : encoded?.[1]?.toLowerCase();
        let normalized;
        if (encoded || b64_json !== void 0 || /^[A-Za-z0-9+/]+={0,2}$/.test(source)) {
          const decoded = decodeBase64Reference(encoded?.[2] ?? source);
          if (declaredType && declaredType !== decoded.mediaType && !(decoded.mediaType === "video/mp4" && declaredType === "video/quicktime")) throw new Error("MEDIA_REFERENCE_INVALID");
          normalized = { mediaType: declaredType ?? decoded.mediaType, base64: decoded.base64 };
        } else {
          if (declaredType && !declaredType.startsWith(kind + "/")) throw new Error("MEDIA_REFERENCE_MIME_MISMATCH");
          normalized = { mediaType: declaredType ?? (kind === "image" ? "image/png" : kind === "video" ? "video/mp4" : "audio/mpeg"), url: publicReferenceURL(source) };
        }
        const mediaType = normalized.mediaType;
        if (!mediaType.startsWith(kind + "/")) throw new Error("MEDIA_REFERENCE_MIME_MISMATCH");
        const ref = { mediaType, properties, ...typeof properties.role === "string" ? { role: properties.role } : {}, ...normalized.base64 !== void 0 ? { base64: normalized.base64 } : { url: normalized.url } };
        referenceBytes(ref);
        return ref;
      });
      if (selected && referenceSignature(selected) !== referenceSignature(refs)) throw new Error("MEDIA_REFERENCE_INPUT_CONFLICT: " + kind);
      selected = refs;
      delete parameters[field];
    }
    if (selected) {
      const explicit = references.filter((ref) => ref.mediaType.startsWith(kind + "/"));
      if (explicit.length && referenceSignature(explicit) !== referenceSignature(selected)) throw new Error("MEDIA_REFERENCE_INPUT_CONFLICT: " + kind);
      if (!explicit.length) references.push(...selected);
    }
  }
  return { ...input, parameters, ...input.references !== void 0 || references.length ? { references } : {} };
}
function referenceSignature(refs) {
  const canonical2 = (value) => Array.isArray(value) ? value.map(canonical2) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, canonical2(v)])) : value;
  return JSON.stringify(refs.map((ref) => canonical2({ source: referenceValue(ref), properties: referenceProperties(ref) })));
}
function referenceProperties(ref) {
  const props = { ...ref.properties, ...ref.role ? { role: ref.role } : {}, ...ref.duration !== void 0 ? { duration_seconds: ref.duration } : {} };
  delete props.url;
  delete props.b64_json;
  return props;
}

// src/cloud/host/media-abort.ts
function mediaAbortable(operation, signal) {
  if (signal.aborted) return Promise.reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
  return new Promise((resolve2, reject) => {
    const abort = () => reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
    signal.addEventListener("abort", abort, { once: true });
    operation.then(resolve2, reject).finally(() => signal.removeEventListener("abort", abort));
  });
}

// src/cloud/host/media-retry.ts
function mediaHttpError(prefix, response) {
  const raw = response.headers.get("retry-after")?.trim();
  const seconds = raw && /^\d+(?:\.\d+)?$/.test(raw) ? Number(raw) : void 0;
  const date = raw && seconds === void 0 ? Date.parse(raw) : NaN;
  const retryAfterMs = seconds !== void 0 ? seconds * 1e3 : Number.isFinite(date) ? Math.max(0, date - Date.now()) : void 0;
  return Object.assign(new Error(`${prefix}_${response.status}`), typeof retryAfterMs === "number" && Number.isFinite(retryAfterMs) ? { retryAfterMs } : {});
}
function retryableMediaError(error) {
  return error instanceof TypeError || error instanceof Error && (error.name === "TimeoutError" || /^MEDIA_(RESULT_NOT_READY|DOWNLOAD_NETWORK_ERROR|(?:DOWNLOAD_)?HTTP_(404|408|409|425|429|500|502|503|504))$/.test(error.message));
}
function mediaRetryAfter(error) {
  const value = error?.retryAfterMs;
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
}

// src/cloud/host/media-jobs.ts
var digest = (value) => createHash("sha256").update(typeof value === "string" || value instanceof Uint8Array ? value : JSON.stringify(value)).digest("hex");
var extensions = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif", "video/mp4": "mp4", "video/webm": "webm", "audio/mp4": "m4a", "audio/aac": "aac", "audio/mpeg": "mp3", "audio/wav": "wav", "audio/ogg": "ogg", "audio/flac": "flac" };
var MEDIA_COLLECTION_MAX_BACKOFF_MS = 3e4;
var MEDIA_COLLECTION_POLL_MS = 5e3;
var TERMINAL_STATES = ["failed", "rejected", "cancelled", "manual_review", "submission-uncertain"];
async function mediaTarget(cwd, path, create = false) {
  const root = await realpath(cwd), target = resolve(root, path), sub = relative(root, target);
  if (!sub || sub === ".." || sub.startsWith("../") || sub.startsWith("..\\") || isAbsolute(sub)) throw new Error("MEDIA_PATH_OUTSIDE_WORKSPACE");
  let current = root;
  const segments = sub.split(/[\\/]/);
  for (const [i, part] of segments.entries()) {
    current = join(current, part);
    let info = await lstat(current).catch((e) => {
      if (e.code !== "ENOENT") throw e;
      return void 0;
    });
    if (info?.isSymbolicLink()) throw new Error("MEDIA_SYMLINK_REJECTED");
    if (i < segments.length - 1) {
      if (!info && create) {
        await mkdir(current);
        info = await lstat(current);
      }
      if (info && !info.isDirectory()) throw new Error("MEDIA_PARENT_INVALID");
    }
  }
  return target;
}
var MediaJobLedger = class {
  constructor(media, owner, root = join(process.env.DSH_HOME || join(homedir(), ".zerowall"), "media-jobs"), runtime = {}) {
    this.media = media;
    this.owner = owner;
    this.root = root;
    this.runtime = runtime;
  }
  serial = Promise.resolve();
  mutations = /* @__PURE__ */ new Map();
  running = /* @__PURE__ */ new Set();
  collections = /* @__PURE__ */ new Map();
  disposed = false;
  now() {
    return this.runtime.now?.() ?? Date.now();
  }
  suspend() {
    for (const active of this.collections.values()) active.controller.abort();
    this.collections.clear();
  }
  async dispose() {
    this.disposed = true;
    this.suspend();
    await this.serial;
  }
  /** Restore only eligible account-owned work; persisted manual stops remain authoritative. */
  async resumePending() {
    if (this.disposed) return;
    const owner = await this.owner(), names = await readdir(this.root).catch((error) => {
      if (error.code !== "ENOENT") throw error;
      return [];
    });
    for (const name3 of names.filter((name4) => name4.endsWith(".json"))) {
      if (this.disposed) return;
      const value = await this.read(name3.slice(0, -5));
      if (value.owner !== owner || !value.submitted || ["paused", "failed", "ready"].includes(value.job.collection ?? "") || TERMINAL_STATES.includes(value.job.state)) continue;
      await this.refresh(value.scope, value.job.id, { background: true, automatic: true });
    }
  }
  lock(fn) {
    const next = this.serial.then(fn, fn);
    this.serial = next.catch(() => {
    });
    return next;
  }
  mutate(ids, fn) {
    const keys = [...new Set(ids)].sort();
    const enter = (index) => {
      const key = keys[index];
      if (key === void 0) return fn();
      const prior = this.mutations.get(key) ?? Promise.resolve(), next = prior.then(() => enter(index + 1), () => enter(index + 1));
      const settled = next.catch(() => {
      });
      this.mutations.set(key, settled);
      void settled.finally(() => {
        if (this.mutations.get(key) === settled) this.mutations.delete(key);
      });
      return next;
    };
    return enter(0);
  }
  path(id) {
    if (!/^[a-zA-Z0-9_-]{8,128}$/.test(id)) throw new Error("MEDIA_JOB_ID_INVALID");
    return join(this.root, id + ".json");
  }
  async read(id) {
    return JSON.parse(await readFile(this.path(id), "utf8"));
  }
  async save(value) {
    await mkdir(this.root, { recursive: true });
    const target = this.path(value.job.id), temp = target + "." + randomUUID() + ".tmp";
    await writeFile(temp, JSON.stringify(value), { mode: 384, flag: "wx" });
    try {
      for (let attempt = 0; ; attempt++) {
        try {
          await rename(temp, target);
          break;
        } catch (error) {
          if (process.platform !== "win32" || attempt >= 7 || !["EPERM", "EBUSY", "EACCES"].includes(error.code)) throw error;
          await delay(Math.min(100, 10 * 2 ** attempt));
        }
      }
    } finally {
      await unlink(temp).catch((error) => {
        if (error.code !== "ENOENT") throw error;
      });
    }
  }
  async check(value, scope) {
    if (value.scope.sessionId !== scope.sessionId || resolve(value.scope.cwd) !== resolve(scope.cwd) || value.owner !== await this.owner()) throw new Error("MEDIA_JOB_OWNER_MISMATCH");
  }
  async prepare(scope, draft, id = randomUUID()) {
    return this.mutate([id], async () => {
      if (!/^[a-zA-Z0-9_-]{1,80}$/.test(scope.projectId) || !scope.sessionId || !["image", "video", "music", "speech"].includes(draft.kind) || !draft.prompt?.trim()) throw new Error("MEDIA_DRAFT_INVALID");
      await mediaTarget(scope.cwd, `media-projects/${scope.projectId}/project.json`);
      if (draft.kind === "video") draft = normalizeMediaReferences(draft);
      for (const ref of [...draft.references ?? [], ...draft.mask ? [draft.mask] : []]) referenceBytes(ref);
      validateFrameReferences(draft.references ?? []);
      if ((draft.references?.length ?? 0) > 16) throw new Error("MEDIA_REFERENCE_LIMIT");
      const owner = await this.owner();
      const old = await this.read(id).catch((e) => {
        if (e.code !== "ENOENT") throw e;
        return void 0;
      });
      if (old) {
        await this.check(old, scope);
        if (old.submitted && old.job.state !== "rejected") throw new Error("MEDIA_JOB_ALREADY_SUBMITTED");
        if (old.scope.projectId !== scope.projectId) throw new Error("MEDIA_JOB_OWNER_MISMATCH");
      }
      if (old?.draft.references?.length && draft.references !== void 0 && referenceSignature(draft.references) !== referenceSignature(old.draft.references) && !draft.clearReferences && !draft.references.length) throw new Error("MEDIA_REFERENCES_CLEAR_REQUIRED: \u8BF7\u4F7F\u7528\u660E\u786E\u6E05\u9664\u53C2\u8003\u64CD\u4F5C\u3002");
      if (old?.draft.references?.length && draft.references && !draft.clearReferences && !draft.replaceReferences) for (const kind of ["image", "video", "audio"]) {
        if (draft.references.filter((ref) => ref.mediaType.startsWith(kind + "/")).length < old.draft.references.filter((ref) => ref.mediaType.startsWith(kind + "/")).length) throw new Error("MEDIA_REFERENCE_INTENT_MISMATCH: " + kind);
      }
      delete draft.replaceReferences;
      if (draft.clearReferences) {
        draft.references = [];
        delete draft.clearReferences;
      }
      if (old && draft.references === void 0 && old.draft.references) draft.references = old.draft.references;
      if (old && draft.mask === void 0 && old.draft.mask) draft.mask = old.draft.mask;
      if (draft.selection) {
        const allowed = draft.kind === "image" ? ["image", "image_edit", "gemini_image"] : draft.kind === "video" ? ["video"] : draft.kind === "speech" ? ["speech"] : ["chat_music", "audio"];
        if (!allowed.includes(draft.selection.operation)) throw new Error("MEDIA_OPERATION_KIND_MISMATCH");
      }
      const correctedFrom = old?.submitted ? old.job.id : void 0;
      if (correctedFrom) id = randomUUID();
      const now = (/* @__PURE__ */ new Date()).toISOString(), revision = (old?.job.revision ?? 0) + 1;
      const frozen = structuredClone(draft), requestId = "media-" + digest({ scope, id, revision, draft });
      const job = { id, sessionId: scope.sessionId, projectId: scope.projectId, revision, kind: draft.kind, prompt: draft.prompt, ...draft.selection ? { selection: draft.selection } : {}, parameters: draft.parameters ?? {}, references: [...draft.references ?? [], ...draft.mask ? [draft.mask] : []].map((ref) => ({ name: ref.name ?? "\u53C2\u8003\u7D20\u6750", mediaType: ref.mediaType, bytes: ref.url !== void 0 ? 0 : Buffer.byteLength(ref.base64, "base64"), sha256: digest(ref.url !== void 0 ? referenceValue(ref) : Buffer.from(ref.base64, "base64")), source: ref.url !== void 0 ? "url" : "base64", ...ref.role ? { role: ref.role } : {}, ...ref === draft.mask ? { mask: true } : {} })), ...correctedFrom ? { correctedFrom } : {}, state: draft.selection ? "validation-failed" : "model-required", requestId, assets: [], createdAt: old?.job.createdAt ?? now, updatedAt: now };
      const stored = { scope, owner, draft: frozen, job, submitted: false };
      await this.lock(() => this.save(stored));
      if (draft.selection) {
        try {
          if (this.media.preview) job.diagnostics = await this.media.preview(this.request(stored));
          const estimate = await this.media.estimate(this.request(stored));
          if (!estimate.currency || !Number.isFinite(Number(estimate.maximumCharge ?? estimate.total)) || Number(estimate.maximumCharge ?? estimate.total) < 0) throw new Error("MEDIA_ESTIMATE_UNAVAILABLE");
          if (owner !== await this.owner()) throw new Error("MEDIA_ACCOUNT_CHANGED");
          job.estimate = estimate;
          job.state = "prepared";
        } catch (error) {
          if (owner !== await this.owner()) throw new Error("MEDIA_ACCOUNT_CHANGED");
          job.error = error instanceof Error ? error.message : "MEDIA_ESTIMATE_FAILED";
        }
        await this.lock(() => this.save(stored));
      }
      return structuredClone(job);
    });
  }
  async recordValidationFailure(scope, draft, error, id = randomUUID(), recoveryInput) {
    return this.mutate([id], async () => {
      if (!/^[a-zA-Z0-9_-]{1,80}$/.test(scope.projectId) || !scope.sessionId || !["image", "video", "music", "speech"].includes(draft.kind) || !draft.prompt?.trim()) throw new Error("MEDIA_DRAFT_INVALID");
      await mediaTarget(scope.cwd, `media-projects/${scope.projectId}/project.json`);
      for (const ref of [...draft.references ?? [], ...draft.mask ? [draft.mask] : []]) referenceBytes(ref);
      validateFrameReferences(draft.references ?? []);
      if ((draft.references?.length ?? 0) > 16) throw new Error("MEDIA_REFERENCE_LIMIT");
      const owner = await this.owner();
      const old = await this.read(id).catch((e) => {
        if (e.code !== "ENOENT") throw e;
        return void 0;
      });
      if (old) {
        await this.check(old, scope);
        if (old.submitted && old.job.state !== "rejected") throw new Error("MEDIA_JOB_ALREADY_SUBMITTED");
        if (old.scope.projectId !== scope.projectId) throw new Error("MEDIA_JOB_OWNER_MISMATCH");
      }
      if (old && draft.references === void 0 && old.draft.references) draft.references = old.draft.references;
      if (old && draft.mask === void 0 && old.draft.mask) draft.mask = old.draft.mask;
      const correctedFrom = old?.submitted ? old.job.id : void 0;
      if (correctedFrom) id = randomUUID();
      const now = (/* @__PURE__ */ new Date()).toISOString(), revision = (old?.job.revision ?? 0) + 1;
      const frozen = structuredClone(draft), requestId = "media-" + digest({ scope, id, revision, draft: frozen, validationError: error });
      const message = String(error || "MEDIA_VALIDATION_FAILED").replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, 1e3);
      const job = {
        id,
        sessionId: scope.sessionId,
        projectId: scope.projectId,
        revision,
        kind: draft.kind,
        prompt: draft.prompt,
        ...draft.selection ? { selection: draft.selection } : {},
        parameters: draft.parameters ?? {},
        references: [...draft.references ?? [], ...draft.mask ? [draft.mask] : []].map((ref) => ({ name: ref.name ?? "\u53C2\u8003\u7D20\u6750", mediaType: ref.mediaType, bytes: ref.url !== void 0 ? 0 : Buffer.byteLength(ref.base64, "base64"), sha256: digest(ref.url !== void 0 ? referenceValue(ref) : Buffer.from(ref.base64, "base64")), source: ref.url !== void 0 ? "url" : "base64", ...ref.role ? { role: ref.role } : {}, ...ref === draft.mask ? { mask: true } : {} })),
        ...correctedFrom ? { correctedFrom } : {},
        state: "validation-failed",
        error: message,
        requestId,
        assets: [],
        createdAt: old?.job.createdAt ?? now,
        updatedAt: now
      };
      await this.lock(() => this.save({ scope, owner, draft: frozen, job, submitted: false, ...recoveryInput ? { recoveryInput: structuredClone(recoveryInput) } : {} }));
      return structuredClone(job);
    });
  }
  async preparationInput(scope, id) {
    const value = await this.read(id);
    await this.check(value, scope);
    if (value.scope.projectId !== scope.projectId || value.job.state !== "validation-failed") return void 0;
    return value.recoveryInput ? structuredClone(value.recoveryInput) : void 0;
  }
  async references(scope, id) {
    const value = await this.read(id);
    await this.check(value, scope);
    if (value.scope.projectId !== scope.projectId) throw new Error("MEDIA_JOB_OWNER_MISMATCH");
    return structuredClone(value.draft.references ?? []);
  }
  async list(scope) {
    const owner = await this.owner(), names = await readdir(this.root).catch((e) => {
      if (e.code !== "ENOENT") throw e;
      return [];
    });
    const results = [];
    for (const name3 of names.filter((n) => n.endsWith(".json"))) {
      const value = await this.read(name3.slice(0, -5));
      if (value.scope.sessionId === scope.sessionId && resolve(value.scope.cwd) === resolve(scope.cwd) && value.owner === owner) results.push(value.job);
    }
    return results.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }
  async recover(scope, requestId) {
    if (!/^[a-zA-Z0-9_-]{8,128}$/.test(requestId) || !/^[a-zA-Z0-9_-]{1,80}$/.test(scope.projectId) || !scope.sessionId) throw new Error("MEDIA_LEGACY_TASK_NOT_FOUND");
    await mediaTarget(scope.cwd, `media-projects/${scope.projectId}/project.json`);
    const owner = await this.owner();
    const tasks = await mediaAbortable(this.media.list(), AbortSignal.timeout(3e4));
    const task = tasks.find((task2) => task2.requestId === requestId);
    if (!task) throw new Error("MEDIA_LEGACY_TASK_NOT_FOUND");
    if (owner !== await this.owner()) throw new Error("MEDIA_ACCOUNT_CHANGED");
    const id = "recovered-" + digest({ owner, scope, requestId });
    const job = await this.mutate([id], async () => {
      const existing = (await this.list(scope)).find((job3) => job3.requestId === requestId);
      if (existing) return existing;
      if (owner !== await this.owner()) throw new Error("MEDIA_ACCOUNT_CHANGED");
      const now = (/* @__PURE__ */ new Date()).toISOString(), kind = task.selection.operation === "video" ? "video" : task.selection.operation === "speech" ? "speech" : ["chat_music", "audio"].includes(task.selection.operation) ? "music" : "image";
      const draft = { kind, prompt: kind === "video" ? "\u6062\u590D\u5386\u53F2\u89C6\u9891\u4EFB\u52A1" : kind === "music" ? "\u6062\u590D\u5386\u53F2\u97F3\u4E50\u4EFB\u52A1" : "\u6062\u590D\u5386\u53F2\u56FE\u7247\u4EFB\u52A1", selection: structuredClone(task.selection), parameters: {} };
      const job2 = { id, sessionId: scope.sessionId, projectId: scope.projectId, revision: 1, kind, prompt: draft.prompt, selection: structuredClone(task.selection), parameters: {}, references: [], state: task.status, requestId: task.requestId, ...task.taskId ? { taskId: task.taskId } : {}, assets: [], createdAt: now, updatedAt: now };
      await this.lock(() => this.save({ scope, owner, draft, job: job2, submitted: true }));
      return structuredClone(job2);
    });
    return this.refresh({ ...scope, projectId: job.projectId }, job.id, { background: true });
  }
  /** Host-only: the authenticated review route issues this token, never a model tool. */
  async authorize(scope, id, revision) {
    return this.mutate([id], async () => {
      const value = await this.read(id);
      await this.check(value, scope);
      if (value.submitted || value.job.revision !== revision || !value.job.estimate || !value.draft.selection) throw new Error("MEDIA_REVIEW_STALE");
      const token = randomUUID() + randomUUID();
      value.authorizationHash = digest(token);
      value.authorizationExpires = Date.now() + 3e5;
      await this.lock(() => this.save(value));
      return token;
    });
  }
  async submitReviewed(scope, reviews) {
    return this.mutate(reviews.map((review) => review.id), async () => {
      if (!reviews.length || reviews.length > 50 || new Set(reviews.map((r) => r.id)).size !== reviews.length) throw new Error("MEDIA_REVIEW_INVALID");
      const values = [];
      for (const review of reviews) {
        const value = await this.read(review.id);
        await this.check(value, scope);
        if (value.job.revision !== review.revision) throw new Error("MEDIA_REVIEW_STALE");
        if (!review.authorization || value.authorizationHash !== digest(review.authorization) || !value.submitted && (value.authorizationExpires ?? 0) < Date.now()) throw new Error("MEDIA_AUTHORIZATION_REQUIRED");
        if (!value.submitted) {
          if (!value.draft.selection || !value.job.estimate) throw new Error("MEDIA_SELECT_MODEL_FIRST");
          const estimate = await this.media.estimate(this.request(value));
          if (JSON.stringify(estimate) !== JSON.stringify(value.job.estimate)) {
            value.job.estimate = estimate;
            value.job.revision++;
            value.job.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
            await this.lock(() => this.save(value));
            throw new Error("MEDIA_COST_CHANGED: \u8BF7\u91CD\u65B0\u67E5\u770B\u8D39\u7528\u5E76\u786E\u8BA4\u3002");
          }
        }
        values.push(value);
      }
      const fresh = values.filter((v) => !v.submitted);
      for (const value of fresh) {
        value.submitted = true;
        value.job.state = "submitting";
        await this.lock(() => this.save(value));
      }
      for (const value of fresh) this.start(value);
      return values.map((v) => structuredClone(v.job));
    });
  }
  request(value) {
    if (!value.draft.selection) throw new Error("MEDIA_SELECT_MODEL_FIRST");
    return { ...value.draft.selection, requestId: value.job.requestId, prompt: value.draft.prompt, parameters: value.draft.parameters ?? {}, ...value.draft.references ? { references: value.draft.references } : {}, ...value.draft.mask ? { mask: value.draft.mask } : {}, async: true };
  }
  async submitRequested(scope, id, revision) {
    return this.mutate([id], async () => {
      const value = await this.read(id);
      await this.check(value, scope);
      if (value.job.revision !== revision) throw new Error("MEDIA_REQUEST_STALE");
      if (value.submitted) return structuredClone(value.job);
      if (!value.draft.selection) throw new Error("MEDIA_SELECT_MODEL_FIRST");
      value.job.estimate = await this.media.estimate(this.request(value));
      const estimate = value.job.estimate;
      if (!estimate.currency || !Number.isFinite(Number(estimate.maximumCharge ?? estimate.total)) || Number(estimate.maximumCharge ?? estimate.total) < 0) throw new Error("MEDIA_ESTIMATE_UNAVAILABLE");
      await this.check(value, scope);
      value.submitted = true;
      value.job.state = "submitting";
      value.job.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      await this.lock(() => this.save(value));
      this.start(value);
      return structuredClone(value.job);
    });
  }
  start(value) {
    this.running.add(value.job.id);
    void (async () => {
      try {
        if (value.owner !== await this.owner()) throw new Error("MEDIA_JOB_OWNER_MISMATCH");
        const task = await this.media.submit(this.request(value));
        if (this.disposed) return;
        const latest = await this.read(value.job.id);
        await this.check(latest, value.scope);
        value = latest;
        value.job.state = task.status;
        if (task.diagnostics) value.job.diagnostics = task.diagnostics;
        if (task.error) value.job.error = task.error;
        else if (task.status === "rejected") value.job.error = "\u670D\u52A1\u7AEF\u660E\u786E\u62D2\u7EDD\u8BF7\u6C42\uFF0C\u8BF7\u6838\u5BF9\u8BCA\u65AD\u4FE1\u606F\u5E76\u4FEE\u6B63\u540E\u91CD\u8BD5\u3002";
        if (task.taskId) value.job.taskId = task.taskId;
      } catch (error) {
        if (this.disposed) return;
        value = await this.read(value.job.id);
        const rejected = error?.rejected === true;
        value.job.state = rejected ? "rejected" : "submission-uncertain";
        value.job.error = rejected ? error instanceof Error && error.message.startsWith("MEDIA_REFERENCE_URL_REQUIRED") ? "\u670D\u52A1\u7AEF\u660E\u786E\u62D2\u7EDD\u4E86\u53C2\u8003\u7D20\u6750\u683C\u5F0F\uFF1B\u8BF7\u63D0\u4F9B\u5BF9\u5E94\u7D20\u6750\u7684\u516C\u7F51 HTTPS \u76F4\u94FE\uFF0C\u4FEE\u6B63\u540E\u63D0\u4EA4\u65B0\u8BF7\u6C42\u3002" : error instanceof Error ? error.message : "MEDIA_REQUEST_REJECTED" : "\u63D0\u4EA4\u72B6\u6001\u5F85\u6838\u67E5\uFF1B\u8BF7\u6062\u590D\u539F\u4EFB\u52A1\uFF0C\u4E0D\u8981\u91CD\u65B0\u751F\u6210\u3002";
      }
      value.job.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      await this.lock(async () => {
        if (!this.disposed) await this.save(value);
      });
    })().catch(() => {
    }).finally(() => {
      this.running.delete(value.job.id);
      if (!this.disposed && this.runtime.autoCollect !== false) void this.refresh(value.scope, value.job.id, { background: true, automatic: true }).catch(() => {
      });
    });
  }
  async refresh(scope, id, options = {}) {
    if (this.disposed) throw new Error("MEDIA_COLLECTOR_DISPOSED");
    options.signal?.throwIfAborted();
    const transfer = await this.mutate([id], async () => {
      options.signal?.throwIfAborted();
      if (this.disposed) throw new Error("MEDIA_COLLECTOR_DISPOSED");
      const value = await this.read(id);
      await this.check(value, scope);
      if (this.disposed) throw new Error("MEDIA_COLLECTOR_DISPOSED");
      if (scope.projectId !== value.scope.projectId) throw new Error("MEDIA_JOB_OWNER_MISMATCH");
      if (!value.submitted || this.running.has(id) || options.automatic && (["paused", "failed", "ready"].includes(value.job.collection ?? "") || TERMINAL_STATES.includes(value.job.state))) return { job: structuredClone(value.job) };
      let active2 = this.collections.get(id);
      if (!active2) {
        if (!options.automatic && ["paused", "failed", "ready"].includes(value.job.collection ?? "")) delete value.job.collectionRetry;
        const controller = new AbortController();
        const promise = this.refreshOnce(value, scope, controller.signal);
        active2 = { controller, promise };
        this.collections.set(id, active2);
        void promise.catch(() => {
        }).finally(() => {
          if (this.collections.get(id)?.promise === promise) this.collections.delete(id);
        });
      }
      const job = { ...value.job, collection: value.job.collection === "waiting" || value.job.collection === "downloading" ? value.job.collection : "querying" };
      return { job: structuredClone(job), active: active2 };
    });
    const active = transfer.active;
    if (!active || options.background) return transfer.job;
    const abort = () => active.controller.abort(options.signal?.reason);
    options.signal?.addEventListener("abort", abort, { once: true });
    if (options.signal?.aborted) abort();
    try {
      return await active.promise;
    } finally {
      options.signal?.removeEventListener("abort", abort);
    }
  }
  async pause(scope, id) {
    return this.mutate([id], async () => {
      const value = await this.read(id);
      await this.check(value, scope);
      if (scope.projectId !== value.scope.projectId) throw new Error("MEDIA_JOB_OWNER_MISMATCH");
      this.collections.get(id)?.controller.abort();
      this.collections.delete(id);
      return this.lock(async () => {
        const latest = await this.read(id);
        await this.check(latest, scope);
        latest.job.collection = "paused";
        latest.job.error = "\u5DF2\u505C\u6B62\u672C\u5730\u67E5\u8BE2\u548C\u4E0B\u8F7D\uFF1B\u4E0A\u6E38\u4EFB\u52A1\u672A\u53D6\u6D88\uFF0C\u53EF\u6062\u590D\u539F\u4EFB\u52A1\u3002";
        latest.job.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        await this.save(latest);
        return structuredClone(latest.job);
      });
    });
  }
  async refreshOnce(value, scope, signal) {
    const id = value.job.id;
    const persist = async () => {
      signal.throwIfAborted();
      if (this.disposed) throw new DOMException("Aborted", "AbortError");
      await this.check(value, scope);
      await this.lock(async () => {
        signal.throwIfAborted();
        if (this.disposed) throw new DOMException("Aborted", "AbortError");
        await this.save(value);
      });
    };
    try {
      value.job.collectionRetry ??= { attempts: 0, startedAt: this.now(), nextAttemptAt: this.now() };
      const retry = value.job.collectionRetry;
      if (![retry.attempts, retry.startedAt, retry.nextAttemptAt].every(Number.isSafeInteger) || retry.attempts < 0) throw new Error("MEDIA_COLLECTION_RETRY_INVALID");
      delete retry.deadlineAt;
      delete value.job.error;
      for (; ; ) {
        signal.throwIfAborted();
        const waitMs = Math.min(Math.max(0, retry.nextAttemptAt - this.now()), MEDIA_COLLECTION_MAX_BACKOFF_MS);
        if (waitMs > 0) {
          value.job.collection = "waiting";
          value.job.updatedAt = new Date(this.now()).toISOString();
          await persist();
          await mediaAbortable(this.runtime.sleep ? this.runtime.sleep(waitMs, signal) : delay(waitMs, void 0, { signal }), signal);
          if (this.now() < retry.nextAttemptAt) continue;
        }
        retry.attempts = Math.min(Number.MAX_SAFE_INTEGER, retry.attempts + 1);
        value.job.collection = "querying";
        value.job.updatedAt = new Date(this.now()).toISOString();
        await persist();
        try {
          const querySignal = AbortSignal.any([signal, AbortSignal.timeout(3e4)]);
          const task = await mediaAbortable(this.media.query(value.job.requestId, querySignal), querySignal);
          signal.throwIfAborted();
          if (task.diagnostics) value.job.diagnostics = task.diagnostics;
          if (task.requestId !== value.job.requestId || value.job.taskId && task.taskId !== value.job.taskId) throw new Error("MEDIA_TASK_IDENTITY_MISMATCH");
          value.job.state = task.status;
          if (task.diagnostics) value.job.diagnostics = task.diagnostics;
          if (task.error) value.job.error = task.error;
          else if (task.status === "rejected") value.job.error = "\u670D\u52A1\u7AEF\u660E\u786E\u62D2\u7EDD\u8BF7\u6C42\uFF0C\u8BF7\u6838\u5BF9\u8BCA\u65AD\u4FE1\u606F\u5E76\u4FEE\u6B63\u540E\u91CD\u8BD5\u3002";
          if (task.taskId) value.job.taskId = task.taskId;
          if (!["completed", "succeeded"].includes(task.status)) {
            if (TERMINAL_STATES.includes(task.status)) {
              delete value.job.collection;
              delete value.job.collectionRetry;
              value.job.updatedAt = new Date(this.now()).toISOString();
              await persist();
              return structuredClone(value.job);
            }
            retry.backoff = 0;
            retry.nextAttemptAt = this.now() + MEDIA_COLLECTION_POLL_MS;
            retry.reason = "provider-pending";
            value.job.collection = "waiting";
            value.job.updatedAt = new Date(this.now()).toISOString();
            await persist();
            continue;
          }
          if (!task.artifacts.length) throw new Error("MEDIA_RESULT_NOT_READY");
          value.job.collection = "downloading";
          await persist();
          for (const artifact of task.artifacts) {
            const existing = value.job.assets.find((a) => a.id === artifact.key);
            if (existing) {
              const current = await readFile(await mediaTarget(scope.cwd, existing.path)).catch((error) => {
                if (error.code !== "ENOENT") throw error;
                return void 0;
              });
              if (current && digest(current) === existing.sha256) continue;
              value.job.assets = value.job.assets.filter((a) => a.id !== artifact.key);
            }
            const data = await mediaAbortable(this.media.download(task.requestId, artifact.key, signal), signal), ext = extensions[data.mediaType];
            signal.throwIfAborted();
            await this.check(value, scope);
            if (!ext || !/^[\w-]+$/.test(artifact.key) || digest(data.bytes) !== data.sha256) throw new Error("MEDIA_ARTIFACT_INVALID");
            const path = `media-projects/${scope.projectId}/assets/${id}-${artifact.key}.${ext}`, target = await mediaTarget(scope.cwd, path, true);
            try {
              await writeFile(target, data.bytes, { flag: "wx" });
            } catch (e) {
              if (e.code !== "EEXIST" || digest(await readFile(target)) !== data.sha256) throw e;
            }
            value.job.assets.push({ id: artifact.key, projectId: scope.projectId, sessionId: scope.sessionId, path, bytes: data.bytes.length, mediaType: data.mediaType, sha256: data.sha256, ...(data.duration ?? artifact.duration) !== void 0 ? { duration: data.duration ?? artifact.duration } : {} });
            await persist();
          }
          if (task.artifactsPending) throw new Error("MEDIA_RESULT_NOT_READY");
          value.job.collection = "ready";
          delete value.job.collectionRetry;
          value.job.updatedAt = new Date(this.now()).toISOString();
          await persist();
          return structuredClone(value.job);
        } catch (error) {
          signal.throwIfAborted();
          if (!retryableMediaError(error)) throw error;
          retry.backoff = Math.min(5, (retry.backoff ?? 0) + 1);
          const delayMs = Math.min(MEDIA_COLLECTION_MAX_BACKOFF_MS, Math.max(1e3 * 2 ** retry.backoff, mediaRetryAfter(error)));
          retry.nextAttemptAt = this.now() + delayMs;
          retry.reason = error instanceof Error && error.message === "MEDIA_RESULT_NOT_READY" ? "result-not-ready" : "temporary-error";
          value.job.collection = "waiting";
          value.job.updatedAt = new Date(this.now()).toISOString();
          await persist();
        }
      }
    } catch (error) {
      if (!signal.aborted) {
        value.job.collection = "failed";
        value.job.error = "\u539F\u4EFB\u52A1\u7ED3\u679C\u6536\u96C6\u5931\u8D25\uFF0C\u53EF\u6062\u590D\u91CD\u8BD5\uFF0C\u4E0D\u4F1A\u91CD\u65B0\u751F\u6210\u3002" + (error instanceof Error && /^MEDIA_[A-Z0-9_]+$/.test(error.message) ? " " + error.message : "");
        value.job.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        await persist();
      }
      throw error;
    }
  }
};

// src/cloud/host/index.ts
import { createHash as createHash3 } from "node:crypto";

// src/cloud/host/media.ts
import { createHash as createHash2, randomUUID as randomUUID2 } from "node:crypto";
import { mkdir as mkdir2, readFile as readFile2, rename as rename2, writeFile as writeFile2, unlink as unlink2 } from "node:fs/promises";
import { homedir as homedir2 } from "node:os";
import { join as join2 } from "node:path";
import { setTimeout as delay2 } from "node:timers/promises";

// src/cloud/host/media-diagnostics.ts
function safeMediaValue(value, secrets = [], depth = 0) {
  if (depth > 10) return "[nested content omitted]";
  if (typeof value === "string") {
    let text = value;
    for (const secret of secrets.filter(Boolean)) text = text.split(secret).join("[credential omitted]");
    if (text.startsWith("data:") || text.length > 4096 || /^[A-Za-z0-9+/]{128,}={0,2}$/.test(text)) return "[encoded or long content omitted]";
    if (/[A-Za-z]:\\|(?:file|ftp):\/\//i.test(text) || text.startsWith("/") && !text.startsWith("/v1/")) return "[internal path omitted]";
    text = text.replace(/Bearer\s+\S+|\bsk-[A-Za-z0-9_-]+/gi, "[credential omitted]");
    return text.replace(/https?:\/\/[^\s"<>]+/g, (raw) => {
      try {
        const url = new URL(raw);
        url.username = "";
        url.password = "";
        url.search = "";
        url.hash = "";
        return url.href;
      } catch {
        return "[location omitted]";
      }
    });
  }
  if (Array.isArray(value)) return value.slice(0, 100).map((v) => safeMediaValue(v, secrets, depth + 1));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).slice(0, 200).map(([k, v]) => [k, /secret|token|password|authorization|cookie|api.?key|b64|base64|credential|private.?key/i.test(k) ? "[redacted]" : safeMediaValue(v, secrets, depth + 1)]));
  return value;
}
function safeMediaResponse(value, secrets) {
  const clean = safeMediaValue(value, secrets);
  const removeLocations = (v) => Array.isArray(v) ? v.map(removeLocations) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).filter(([k]) => !["content_url", "submission", "upstream_model", "execution_template", "template_rules", "binding_versions", "account_id", "upstream_request"].includes(k)).map(([k, item]) => [k, removeLocations(item)])) : v;
  return removeLocations(clean);
}

// src/cloud/host/artifact-network.ts
import { lookup } from "node:dns/promises";
import { request } from "node:https";
import { Readable } from "node:stream";
function publicIPv4(address) {
  const p = address.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return false;
  const [a, b] = p;
  return a !== 0 && a !== 10 && a !== 127 && a < 224 && !(a === 100 && b >= 64 && b <= 127) && !(a === 169 && b === 254) && !(a === 172 && b >= 16 && b <= 31) && !(a === 192 && (b === 168 || b === 0 || b === 2)) && !(a === 198 && (b === 18 || b === 19 || b === 51)) && !(a === 203 && b === 0);
}
async function externalArtifact(url, signal, requestHeaders) {
  const addresses = await lookup(url.hostname, { family: 4, all: true }).catch(() => {
    throw new Error("MEDIA_DOWNLOAD_NETWORK_ERROR");
  });
  if (!addresses.length || addresses.some((a) => !publicIPv4(a.address))) throw new Error("MEDIA_UNSAFE_ARTIFACT_HOST");
  const address = addresses[0].address;
  return new Promise((accept, reject) => {
    const req = request(url, { signal, headers: requestHeaders, lookup: (_host, options, callback) => {
      if (typeof options === "object" && options.all) callback(null, [{ address, family: 4 }]);
      else callback(null, address, 4);
    } }, (response) => {
      const headers = new Headers();
      for (const name3 of ["content-type", "content-length", "content-range", "accept-ranges", "etag", "last-modified", "content-encoding", "retry-after"]) if (typeof response.headers[name3] === "string") headers.set(name3, response.headers[name3]);
      if (response.statusCode !== 200 && response.statusCode !== 206) {
        response.destroy();
        reject(mediaHttpError("MEDIA_DOWNLOAD_HTTP", new Response(null, { status: response.statusCode ?? 502, headers })));
        return;
      }
      accept(new Response(Readable.toWeb(response), { status: response.statusCode, headers }));
    });
    req.once("error", (error) => reject(new Error(/CERT|TLS|SSL/.test(error.code ?? "") ? "MEDIA_ARTIFACT_TLS_ERROR" : "MEDIA_DOWNLOAD_NETWORK_ERROR")));
    req.end();
  });
}

// src/cloud/host/image-download.ts
var LIMIT = 64 * 1024 * 1024;
var RANGE_BYTES = 256 * 1024;
function abortable(promise, signal) {
  signal.throwIfAborted();
  return new Promise((resolve2, reject) => {
    const abort = () => {
      cleanup();
      reject(signal.reason);
    };
    const cleanup = () => signal.removeEventListener("abort", abort);
    signal.addEventListener("abort", abort, { once: true });
    promise.then((value) => {
      cleanup();
      resolve2(value);
    }, (error) => {
      cleanup();
      reject(error);
    });
  });
}
async function downloadImageBytes(url, options = {}) {
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.hash) throw new Error("IMAGE_UNSAFE_DOWNLOAD_URL");
  const signal = AbortSignal.any([...options.signal ? [options.signal] : [], AbortSignal.timeout(options.timeoutMs ?? 6e5)]);
  const fetcher = options.fetch ?? externalArtifact;
  let attempts = 0;
  const request2 = async (headers, requestSignal) => {
    attempts++;
    return abortable(fetcher(url, requestSignal, { "Accept-Encoding": "identity", ...headers }), requestSignal);
  };
  const single = async (allowRange) => {
    const controller = new AbortController();
    const transferSignal = AbortSignal.any([signal, controller.signal]);
    const response = await request2({}, transferSignal);
    if (!response.ok || response.status === 206 || !response.body) {
      void response.body?.cancel();
      throw new Error(`IMAGE_DOWNLOAD_HTTP_${response.status}`);
    }
    const total = Number(response.headers.get("content-length"));
    if (total > LIMIT) {
      void response.body.cancel();
      throw new Error("IMAGE_DOWNLOAD_TOO_LARGE");
    }
    const canRange = allowRange && Number.isSafeInteger(total) && total > RANGE_BYTES * 2 && (!response.headers.get("content-encoding") || response.headers.get("content-encoding") === "identity");
    const validator = response.headers.get("etag")?.replace(/^W\/.*$/, "") || response.headers.get("last-modified") || void 0;
    const reader = response.body.getReader(), chunks = [];
    let size = 0, slowTimer;
    const slow = new Promise((resolve2) => {
      if (canRange) slowTimer = setTimeout(() => resolve2("slow"), options.slowAfterMs ?? 5e3);
    });
    try {
      for (; ; ) {
        const read = abortable(reader.read(), transferSignal);
        const next = canRange ? await Promise.race([read, slow]) : await read;
        if (next === "slow") {
          if (size < 512 * 1024) {
            controller.abort();
            void reader.cancel().catch(() => {
            });
            try {
              return await ranged(total, Buffer.concat(chunks), validator);
            } catch (error) {
              signal.throwIfAborted();
              if (!(error instanceof RangeUnavailable)) throw error;
              return single(false);
            }
          }
          const pending = await read;
          if (pending.done) break;
          size += pending.value.length;
          chunks.push(pending.value);
        } else {
          if (next.done) break;
          size += next.value.length;
          chunks.push(next.value);
        }
        if (size > LIMIT) throw new Error("IMAGE_DOWNLOAD_TOO_LARGE");
        if (slowTimer && size >= 512 * 1024) {
          clearTimeout(slowTimer);
          slowTimer = void 0;
        }
      }
      if (total > 0 && size !== total && !response.headers.get("content-encoding")) {
        if (canRange && size < total) return ranged(total, Buffer.concat(chunks), validator);
        throw new Error("IMAGE_DOWNLOAD_TRUNCATED");
      }
      return { bytes: Buffer.concat(chunks), transport: "single", attempts };
    } finally {
      if (slowTimer) clearTimeout(slowTimer);
      controller.abort();
      void reader.cancel().catch(() => {
      });
    }
  };
  const ranged = async (total, prefix, validator) => {
    const bytes2 = Buffer.alloc(total);
    prefix.copy(bytes2);
    const controller = new AbortController(), rangeSignal = AbortSignal.any([signal, controller.signal]);
    let next = prefix.length;
    const worker = async () => {
      while (next < total) {
        let offset = next;
        const end = Math.min(total - 1, next + RANGE_BYTES - 1);
        next = end + 1;
        for (let retry = 0; offset <= end; retry++) {
          const partSignal = AbortSignal.any([rangeSignal, AbortSignal.timeout(75e3)]);
          let reader;
          try {
            const response = await request2({ Range: `bytes=${offset}-${end}`, ...validator ? { "If-Range": validator } : {} }, partSignal);
            if (response.status !== 206 || response.headers.get("content-range") !== `bytes ${offset}-${end}/${total}` || response.headers.get("content-encoding") && response.headers.get("content-encoding") !== "identity") {
              void response.body?.cancel();
              throw new RangeUnavailable();
            }
            if (!response.body) throw new Error("IMAGE_DOWNLOAD_EMPTY");
            reader = response.body.getReader();
            for (; ; ) {
              const chunk = await abortable(reader.read(), partSignal);
              if (chunk.done) break;
              if (chunk.value.length > end - offset + 1) throw new RangeUnavailable();
              bytes2.set(chunk.value, offset);
              offset += chunk.value.length;
            }
            if (offset <= end) throw new Error("IMAGE_DOWNLOAD_TRUNCATED");
          } catch (error) {
            rangeSignal.throwIfAborted();
            if (error instanceof RangeUnavailable || retry >= 2) throw error;
          } finally {
            void reader?.cancel().catch(() => {
            });
          }
        }
      }
    };
    try {
      await Promise.all(Array.from({ length: Math.min(8, Math.ceil((total - prefix.length) / RANGE_BYTES)) }, worker));
    } finally {
      controller.abort();
    }
    return { bytes: bytes2, transport: "range", attempts };
  };
  try {
    return await single(true);
  } catch (error) {
    if (options.signal?.aborted) throw options.signal.reason;
    if (signal.aborted) throw new Error("IMAGE_DOWNLOAD_TIMEOUT: \u5DF2\u751F\u6210\u7684\u56FE\u7247\u4ECD\u53EF\u7528\u539F\u8BF7\u6C42\u6062\u590D\u4E0B\u8F7D\u3002");
    throw new Error("IMAGE_DOWNLOAD_FAILED: \u8BF7\u7528\u76F8\u540C\u63D0\u793A\u8BCD\u3001\u8F93\u51FA\u8DEF\u5F84\u548C\u53C2\u6570\u6062\u590D\u4E0B\u8F7D\uFF0C\u4E0D\u8981\u91CD\u65B0\u751F\u6210\u3002", { cause: error });
  }
}
var RangeUnavailable = class extends Error {
};

// src/cloud/host/media-download.ts
var MAX_BYTES = 256 * 1024 * 1024;
var CHUNK = 1024 * 1024;
async function bytes(response, limit, signal) {
  if (!response.ok || !response.body) {
    void response.body?.cancel().catch(() => {
    });
    throw mediaHttpError("MEDIA_DOWNLOAD_HTTP", response);
  }
  if (Number(response.headers.get("content-length")) > limit) {
    void response.body.cancel().catch(() => {
    });
    throw new Error("MEDIA_ARTIFACT_TOO_LARGE");
  }
  const reader = response.body.getReader(), parts = [];
  let size = 0;
  try {
    for (; ; ) {
      const next = await mediaAbortable(reader.read(), signal);
      if (next.done) break;
      size += next.value.byteLength;
      if (size > limit) throw new Error("MEDIA_ARTIFACT_TOO_LARGE");
      parts.push(next.value);
    }
    return Buffer.concat(parts);
  } finally {
    void reader.cancel().catch(() => {
    });
    reader.releaseLock();
  }
}
async function downloadMediaBytes(fetchPart, signal, ranged) {
  const transfer = new AbortController();
  const transferSignal = AbortSignal.any([signal, transfer.signal]);
  const readPart = async (start, end) => {
    for (let attempt = 0; ; attempt++) {
      transferSignal.throwIfAborted();
      try {
        const partSignal = AbortSignal.any([transferSignal, AbortSignal.timeout(3e4)]);
        const response = await mediaAbortable(fetchPart(ranged ? { range: `bytes=${start}-${end}` } : {}, partSignal), partSignal);
        if (!response.ok) {
          void response.body?.cancel().catch(() => {
          });
          throw mediaHttpError("MEDIA_DOWNLOAD_HTTP", response);
        }
        if (response.status !== 206) {
          if (start !== 0) {
            void response.body?.cancel().catch(() => {
            });
            throw new Error("MEDIA_INVALID_CONTENT_RANGE");
          }
          return { data: await bytes(response, MAX_BYTES, partSignal) };
        }
        const match = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(response.headers.get("content-range") ?? "");
        const from = Number(match?.[1]), to = Number(match?.[2]), total = Number(match?.[3]);
        if (!match || from !== start || to !== Math.min(end, total - 1) || !Number.isSafeInteger(total) || total < 1 || total > MAX_BYTES) {
          void response.body?.cancel().catch(() => {
          });
          throw new Error("MEDIA_INVALID_CONTENT_RANGE");
        }
        const data = await bytes(response, to - from + 1, partSignal);
        if (data.length !== to - from + 1) throw new Error("MEDIA_TRUNCATED_ARTIFACT");
        return { data, total };
      } catch (error) {
        transferSignal.throwIfAborted();
        if (attempt >= 1 || !(error instanceof TypeError || error instanceof Error && error.name === "TimeoutError")) throw error;
      }
    }
  };
  try {
    const first = await readPart(0, CHUNK - 1);
    if (first.total === void 0 || first.data.length === first.total) return first.data;
    const total = first.total, parts = [first.data];
    const count = Math.ceil(total / CHUNK);
    let cursor = 1;
    await Promise.all(Array.from({ length: Math.min(4, count - 1) }, async () => {
      for (; ; ) {
        const index = cursor++;
        if (index >= count) return;
        const part = await readPart(index * CHUNK, Math.min(total - 1, (index + 1) * CHUNK - 1));
        if (part.total !== total) throw new Error("MEDIA_INVALID_CONTENT_RANGE");
        parts[index] = part.data;
      }
    }));
    return Buffer.concat(parts);
  } finally {
    transfer.abort();
  }
}

// src/cloud/host/media.ts
var JOURNAL = "zerowall.ai-cloud.media-journal.v1";
var MAX_BYTES2 = 256 * 1024 * 1024;
var TRUSTED = ["hkcode.aicodeme.xyz", "code.aicodeme.xyz", "code.aicodeme.cn"];
var hash = (value) => createHash2("sha256").update(value).digest("hex");
function normalizeGeminiImageSize(raw) {
  const value = raw.trim().toUpperCase();
  const aliases = { "512": "512", "1024": "1K", "1K": "1K", "2048": "2K", "2K": "2K", "4096": "4K", "4K": "4K" };
  if (!aliases[value]) throw new Error("Gemini imageSize must be 512, 1K, 2K or 4K.");
  return aliases[value];
}
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, v]) => [key, canonical(v)]));
  return value;
}
function gateway(raw) {
  const url = new URL(raw);
  if (url.protocol !== "https:" || !TRUSTED.includes(url.hostname) || url.port || url.username || url.password || url.search || url.hash || !["", "/", "/v1"].includes(url.pathname)) throw new Error("MEDIA_UNTRUSTED_GATEWAY");
  return url.origin;
}
function dto(task) {
  return {
    requestId: task.requestId,
    ...task.taskId ? { taskId: task.taskId } : {},
    account: task.account,
    gateway: task.gateway,
    selection: { groupId: task.selection.groupId, profileId: task.selection.profileId, modelId: task.selection.modelId, operation: task.selection.operation },
    parametersHash: task.parametersHash,
    ...task.diagnostics ? { diagnostics: task.diagnostics } : {},
    ...task.error ? { error: task.error } : {},
    status: task.status,
    ...task.artifactsPending ? { artifactsPending: true } : {},
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    artifacts: task.artifacts.map((a) => ({ key: a.key, mediaType: a.mediaType, ...a.bytes !== void 0 ? { bytes: a.bytes } : {}, ...a.duration !== void 0 ? { duration: a.duration } : {}, ...a.sha256 ? { sha256: a.sha256 } : {}, ...a.revisedPrompt ? { revisedPrompt: a.revisedPrompt } : {}, ...a.quality ? { quality: a.quality } : {} }))
  };
}
var AiCloudMediaService = class {
  constructor(account, secrets, options = {}) {
    this.account = account;
    this.secrets = secrets;
    this.fetcher = options.fetch ?? fetch;
    this.cacheDir = options.cacheDir ?? join2(process.env.DSH_HOME || join2(homedir2(), ".zerowall"), "media");
    this.externalFetch = options.fetch ? (url, signal, headers) => options.fetch(url, { redirect: "error", signal, ...headers ? { headers } : {} }) : externalArtifact;
  }
  fetcher;
  cacheDir;
  externalFetch;
  operations = /* @__PURE__ */ new Map();
  writes = Promise.resolve();
  async catalog(refresh = false) {
    const snapshot2 = await (refresh ? this.account.discoverModels() : this.account.current());
    if (snapshot2.status !== "signedIn") return { models: [], status: "signedOut", error: "\u8BF7\u767B\u5F55 AI \u4E91\u5E73\u53F0\u3002" };
    const status = snapshot2.mediaSync?.status ?? "unavailable";
    return { models: uniqueMediaModels(snapshot2.mediaModels ?? []), status, ...status === "succeeded" ? {} : { error: "\u5A92\u4F53\u80FD\u529B\u76EE\u5F55\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5237\u65B0\u8D26\u53F7\u76EE\u5F55\u3002" } };
  }
  async resolve(input) {
    const snapshot2 = await this.account.current();
    if (snapshot2.status !== "signedIn") throw new Error("MEDIA_SIGN_IN_REQUIRED");
    const candidates = uniqueMediaModels(snapshot2.mediaModels ?? []).filter((m) => m.groupId === input.groupId && m.modelId === input.modelId && m.profileId === input.profileId && m.operations.includes(input.operation));
    let model = candidates.length === 1 ? candidates[0] : void 0;
    const group = snapshot2.groups?.find((item) => item.groupId === input.groupId);
    if (!model || model.stale || group?.protocol && model.imageProtocol && model.imageProtocol !== group.protocol || !snapshot2.mediaSync?.groups.some((g) => g.groupId === input.groupId && g.status === "succeeded")) throw new Error("MEDIA_SELECTION_INVALID: \u8BF7\u5237\u65B0\u5206\u7EC4\u76EE\u5F55\u5E76\u91CD\u65B0\u9009\u62E9\u5F53\u524D\u6A21\u578B\u3002");
    if (!model.imageProtocol) model = { ...model, imageProtocol: group?.protocol ?? "openai", imageProtocolSource: group?.protocolSource ?? "openai-default" };
    const key = await this.secrets.get(`zerowall.ai-cloud.group.${model.groupId}`);
    if (!key?.trim()) throw new Error("MEDIA_CREDENTIAL_UNAVAILABLE: \u8BF7\u5237\u65B0\u8D26\u53F7\u3002");
    return { model, key: key.trim(), snapshot: snapshot2, base: gateway(model.baseUrl) };
  }
  validate(input, model) {
    if (!/^[a-zA-Z0-9_-]{8,128}$/.test(input.requestId)) throw new Error("MEDIA_INVALID_REQUEST_ID");
    if (!input.prompt?.trim() || input.prompt.length > 1e5) throw new Error("MEDIA_PROMPT_REQUIRED");
    const p = input.parameters ?? {};
    if (p.duration !== void 0 && (!Number.isSafeInteger(p.duration) || p.duration <= 0)) throw new Error("MEDIA_UNSUPPORTED_DURATION");
    if (p.duration === void 0 && p.seconds === void 0 && model.duration.required && model.duration.mode !== "fixed") throw new Error("MEDIA_DURATION_REQUIRED");
    for (const key of ["model", "public_profile_id", "prompt", "requestId"]) if (p[key] !== void 0) throw new Error("MEDIA_RESERVED_PARAMETER: " + key);
    if (p.n !== void 0 && (!Number.isSafeInteger(p.n) || Number(p.n) < 1)) throw new Error("MEDIA_INVALID_OUTPUT_COUNT");
    if (p.seed !== void 0 && (!Number.isSafeInteger(p.seed) || p.seed < 0)) throw new Error("MEDIA_INVALID_SEED");
    const references = input.references ?? [];
    if (references.length > 16) throw new Error("MEDIA_REFERENCE_LIMIT");
    validateFrameReferences(references);
    for (const ref of [...references, ...input.mask ? [input.mask] : []]) {
      referenceBytes(ref);
      const isMask = ref === input.mask;
      if (isMask && ref.mediaType !== "image/png") throw new Error("MEDIA_INVALID_REFERENCE");
      if (!/^(image|video|audio)\//.test(ref.mediaType)) throw new Error("MEDIA_REFERENCE_FORMAT");
    }
    if (input.mask && input.operation !== "image_edit") throw new Error("MEDIA_MASK_UNSUPPORTED");
  }
  wire(input, model) {
    const parameters = input.parameters ?? {};
    const imageOperation = ["image", "image_edit", "gemini_image"].includes(input.operation);
    if (imageOperation && model.imageProtocol === "gemini") {
      const parts = [{ text: input.prompt }];
      for (const ref of input.references ?? []) {
        if (ref.base64 === void 0) throw new Error("MEDIA_GEMINI_REFERENCE_BASE64_REQUIRED");
        parts.push({ inlineData: { mimeType: ref.mediaType, data: ref.base64 } });
      }
      const imageConfig = {};
      const ratio = typeof parameters.aspect_ratio === "string" ? parameters.aspect_ratio.trim() : void 0;
      const rawSize = parameters.image_size ?? parameters.resolution ?? "4K";
      if (typeof rawSize !== "string") throw new Error("MEDIA_INVALID_GEMINI_IMAGE_SIZE");
      const imageSize = normalizeGeminiImageSize(rawSize);
      const declaredSizes = model.imageSizes?.length ? model.imageSizes : model.resolutions;
      const supportedSizes = declaredSizes.flatMap((value) => {
        try {
          return [normalizeGeminiImageSize(value)];
        } catch {
          return [];
        }
      });
      if (declaredSizes.length && !supportedSizes.includes(imageSize)) throw new Error("MEDIA_UNSUPPORTED_GEMINI_IMAGE_SIZE: " + imageSize);
      if (ratio && model.aspectRatios.length && !model.aspectRatios.includes(ratio)) throw new Error("MEDIA_UNSUPPORTED_GEMINI_ASPECT_RATIO: " + ratio);
      if (ratio) imageConfig.aspectRatio = ratio;
      imageConfig.imageSize = imageSize;
      const generationConfig = { candidateCount: 1, responseModalities: ["IMAGE", "TEXT"], ...Object.keys(imageConfig).length ? { imageConfig } : {} };
      const payload2 = { contents: [{ role: "user", parts }], generationConfig };
      const body2 = JSON.stringify(payload2);
      if (Buffer.byteLength(body2) > Math.min(MAX_MEDIA_REQUEST_BYTES, model.maxRequestBytes ?? MAX_MEDIA_REQUEST_BYTES)) throw new Error("MEDIA_REQUEST_TOO_LARGE");
      return { path: "/v1beta/models/" + encodeURIComponent(input.modelId) + ":generateContent", payload: payload2, body: body2 };
    }
    const payload = { ...parameters, model: input.modelId, public_profile_id: input.profileId, prompt: input.prompt, async: input.async ?? true };
    const paths = {
      image: "/v1/images/generations",
      image_edit: "/v1/images/edits",
      gemini_image: "/v1beta/models/" + encodeURIComponent(input.modelId) + ":generateContent",
      video: "/v1/videos",
      chat_music: "/v1/chat/completions",
      audio: "/v1/audio/generations",
      speech: "/v1/audio/speech"
    };
    const path = paths[input.operation];
    if (!path) throw new Error("MEDIA_OPERATION_UNAVAILABLE");
    if (input.operation === "image_edit" && !input.references?.length) throw new Error("MEDIA_EDIT_REQUIRES_REFERENCE");
    if (input.operation === "speech") payload.input = input.prompt;
    if (input.operation === "video") {
      for (const [canonicalField, alias] of [["seconds", "duration"], ["ratio", "aspect_ratio"]]) {
        if (payload[alias] !== void 0) {
          if (payload[canonicalField] !== void 0 && payload[canonicalField] !== payload[alias]) throw new Error("MEDIA_ALIAS_CONFLICT: " + alias + "/" + canonicalField);
          payload[canonicalField] = payload[alias];
          delete payload[alias];
        }
      }
    }
    for (const kind of ["image", "video", "audio"]) {
      const refs = (input.references ?? []).filter((ref) => ref.mediaType.startsWith(kind + "/"));
      if (!refs.length) continue;
      const field = kind + "s", values = refs.map((ref) => Object.keys(referenceProperties(ref)).length ? { ...referenceProperties(ref), url: referenceValue(ref) } : referenceValue(ref));
      if (payload[field] !== void 0 && JSON.stringify(canonical(payload[field])) !== JSON.stringify(canonical(values))) throw new Error("MEDIA_REFERENCE_INPUT_CONFLICT: " + field);
      payload[field] = values;
    }
    if (input.mask) payload.masks = [{ ...referenceProperties(input.mask), url: referenceValue(input.mask) }];
    for (const kind of ["image", "video", "audio"]) {
      const expected = (input.references ?? []).filter((ref) => ref.mediaType.startsWith(kind + "/"));
      const sent = payload[kind + "s"];
      if (expected.length && ((sent?.length ?? 0) !== expected.length || expected.some((ref, i) => (typeof sent[i] === "string" ? sent[i] : sent[i].url) !== referenceValue(ref)))) throw new Error("MEDIA_REFERENCE_INTENT_MISMATCH: " + kind + "s");
    }
    const body = JSON.stringify(payload);
    if (Math.max(Buffer.byteLength(body), Buffer.byteLength(JSON.stringify({ operation: input.operation, request: payload }))) > Math.min(MAX_MEDIA_REQUEST_BYTES, model.maxRequestBytes ?? MAX_MEDIA_REQUEST_BYTES)) throw new Error("MEDIA_REQUEST_TOO_LARGE");
    return { path, payload, body };
  }
  async json(base, path, key, init = {}) {
    const timeout = AbortSignal.timeout(init.method === "POST" && !path.endsWith("/estimates") ? 185e3 : 3e4);
    const signal = init.signal ? AbortSignal.any([init.signal, timeout]) : timeout;
    const response = await mediaAbortable(this.fetcher(base + path, { ...init, redirect: "error", headers: { ...typeof init.body === "string" ? { "content-type": "application/json" } : {}, ...init.headers, authorization: `Bearer ${key}` }, signal }), signal);
    if (!response.ok) {
      const error = mediaHttpError("MEDIA_HTTP", response);
      let raw = "", total = 0;
      const reader = response.body?.getReader();
      try {
        if (reader) for (; ; ) {
          const part = await reader.read();
          if (part.done) break;
          total += part.value.length;
          if (total > 8192) break;
          raw += new TextDecoder().decode(part.value);
        }
      } finally {
        await reader?.cancel().catch(() => {
        });
      }
      try {
        const value2 = JSON.parse(raw), code2 = value2.error?.code ?? value2.error?.type ?? value2.code;
        if ([400, 415, 422].includes(response.status) && ["unsupported_reference_format", "base64_not_supported", "reference_url_required"].includes(code2)) throw Object.assign(new Error("MEDIA_REFERENCE_URL_REQUIRED: \u670D\u52A1\u7AEF\u660E\u786E\u62D2\u7EDD\u4E86\u53C2\u8003\u7D20\u6750\u683C\u5F0F\uFF1B\u8BF7\u4E3A\u76F8\u5E94\u7D20\u6750\u63D0\u4F9B\u516C\u7F51 HTTPS \u76F4\u94FE\u3002"), { rejected: true });
      } catch (cause) {
        if (cause?.rejected) throw cause;
      }
      const value = (() => {
        try {
          return JSON.parse(raw);
        } catch {
          return {};
        }
      })();
      const detail = safeMediaValue(value.error ?? value, [key]);
      Object.assign(error, { response: { status: response.status, error: detail } });
      const code = typeof detail?.code === "string" ? detail.code : typeof detail?.type === "string" ? detail.type : "";
      const message = typeof detail?.message === "string" ? detail.message : "";
      if (code || message) error.message += ": " + [code, message].filter(Boolean).join(" \u2014 ").slice(0, 1e3);
      if ([400, 409].includes(response.status) && ["invalid_public_profile", "estimate_configuration_changed"].includes(code)) {
        error.message += "\uFF1B\u8BF7\u5237\u65B0\u540C\u4E00\u5206\u7EC4\u548C\u6A21\u578B\u7684\u80FD\u529B\u540E\u91CD\u65B0\u4F30\u4EF7\uFF0C\u672C\u6B21\u4E0D\u4F1A\u81EA\u52A8\u91CD\u65B0\u63D0\u4EA4\u3002";
      }
      throw error;
    }
    return mediaAbortable(response.json(), signal);
  }
  async preview(input) {
    if (input.operation === "video") input = normalizeMediaReferences(input);
    const { model, key } = await this.resolve(input);
    this.validate(input, model);
    const { payload } = this.wire(input, model);
    return { stage: "prepared", requestHash: hash(JSON.stringify(canonical(payload))), request: safeMediaValue(payload, [key]), references: Object.fromEntries(["image", "video", "audio"].map((kind) => [kind, (input.references ?? []).filter((ref) => ref.mediaType.startsWith(kind + "/")).length])) };
  }
  async estimate(input) {
    if (input.operation === "video") input = normalizeMediaReferences(input);
    const { model, key, base } = await this.resolve(input);
    this.validate(input, model);
    const reply = await this.json(base, "/v1/sub2api/estimates", key, { method: "POST", body: JSON.stringify({ operation: input.operation, request: this.wire(input, model).payload }) });
    return { currency: String(reply.currency ?? ""), ...reply.maximum_charge != null ? { maximumCharge: String(reply.maximum_charge) } : {}, ...reply.calculation?.total != null ? { total: String(reply.calculation.total) } : {} };
  }
  async submit(input, signal) {
    if (input.operation === "video") input = normalizeMediaReferences(input);
    const parametersHash = hash(JSON.stringify(canonical(input)));
    const previous = this.operations.get(input.requestId);
    if (previous) {
      const result = await previous;
      if (result.parametersHash !== parametersHash) throw new Error("MEDIA_IDEMPOTENCY_CONFLICT");
      return result;
    }
    const operation = this.submitOnce(input, parametersHash, signal);
    this.operations.set(input.requestId, operation);
    try {
      return await operation;
    } finally {
      this.operations.delete(input.requestId);
    }
  }
  async submitOnce(input, parametersHash, signal) {
    const { model, key, snapshot: snapshot2, base } = await this.resolve(input);
    this.validate(input, model);
    const { path, payload, body } = this.wire(input, model);
    if (model.maxRequestBytes && Buffer.byteLength(typeof body === "string" ? body : JSON.stringify(payload)) > model.maxRequestBytes) throw new Error("MEDIA_REQUEST_TOO_LARGE");
    const old = await this.get(input.requestId);
    if (old) {
      await this.assertOwner(old, snapshot2, key);
      if (old.parametersHash !== parametersHash) throw new Error("MEDIA_IDEMPOTENCY_CONFLICT");
      if (old.status === "rejected") throw Object.assign(new Error("MEDIA_REQUEST_REJECTED: \u4FEE\u6B63\u7D20\u6750\u6216\u53C2\u6570\u540E\u8BF7\u4F7F\u7528\u65B0\u8BF7\u6C42\u3002"), { rejected: true });
      if (old.taskId || old.status === "completed") return old.taskId ? this.query(old.requestId, signal) : dto(old);
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const task = old ?? { requestId: input.requestId, parametersHash, account: snapshot2.email ?? "", gateway: base, keyHash: hash(key), selection: { groupId: input.groupId, modelId: input.modelId, profileId: input.profileId, operation: input.operation }, status: "submitting", artifacts: [], createdAt: now, updatedAt: now };
    task.diagnostics = { stage: "attempted", requestHash: hash(JSON.stringify(canonical(payload))), request: safeMediaValue(payload, [key]), references: Object.fromEntries(["image", "video", "audio"].map((kind) => [kind, (input.references ?? []).filter((ref) => ref.mediaType.startsWith(kind + "/")).length])) };
    await this.save(task);
    try {
      const reply = await this.json(base, path, key, { method: "POST", body, headers: { "Idempotency-Key": input.requestId }, ...signal ? { signal } : {} });
      task.diagnostics.response = safeMediaResponse(reply, [key]);
      task.diagnostics.upstream = safeMediaResponse(reply.inputs, [key]);
      await this.accept(task, reply);
      return dto(task);
    } catch (error) {
      if (error?.response) task.diagnostics.response = error.response;
      if (error instanceof Error && (/^MEDIA_HTTP_(400|401|403|404|409|413|415|422|429)(:|$)/.test(error.message) || error.rejected)) {
        task.status = "rejected";
        await this.save(task);
        throw Object.assign(new Error(error.message + ": \u8BF7\u68C0\u67E5\u6A21\u578B\u3001\u53C2\u6570\u3001\u8D39\u7528\u548C\u8D26\u53F7\u72B6\u6001\u540E\u91CD\u8BD5\u3002"), { rejected: true });
      }
      task.status = "submission-uncertain";
      await this.save(task);
      throw new Error(`MEDIA_SUBMISSION_UNCERTAIN: ${input.requestId}; \u8BF7\u7528\u539F\u8BF7\u6C42\u6062\u590D\u3002${error instanceof Error && /^MEDIA_HTTP_/.test(error.message) ? " " + error.message : ""}`, { cause: error instanceof Error && /^MEDIA_HTTP_\d+$/.test(error.message) ? new Error(error.message) : void 0 });
    }
  }
  async accept(task, reply) {
    if (reply?.status === "in_progress") reply = { ...reply, status: "running" };
    if (!reply || typeof reply !== "object" || reply.status !== void 0 && (typeof reply.status !== "string" || !/^[a-z][a-z0-9_-]{0,63}$/.test(reply.status))) throw new Error("MEDIA_INVALID_TASK_RESPONSE");
    if (reply.error && !["failed", "rejected", "cancelled", "manual_review"].includes(reply.status)) throw new Error("MEDIA_PROVIDER_REPORTED_ERROR");
    if (reply.model && reply.model !== task.selection.modelId) throw new Error("MEDIA_TASK_IDENTITY_MISMATCH");
    if (reply.status !== void 0 && (typeof reply.id !== "string" || !/^mt_[A-Za-z0-9_-]+$/.test(reply.id))) throw new Error("MEDIA_INVALID_TASK_RESPONSE");
    if (typeof reply.id === "string" && /^mt_[A-Za-z0-9_-]+$/.test(reply.id)) task.taskId = reply.id;
    task.status = reply.status === "failed" && reply.diagnostic === "reference_url_required" ? "rejected" : typeof reply.status === "string" ? reply.status : "completed";
    if (!task.taskId && !["completed", "succeeded"].includes(task.status)) throw new Error("MEDIA_INVALID_TASK_RESPONSE");
    const entries = Array.isArray(reply.data) && reply.data.length ? [...reply.data] : Array.isArray(reply.artifacts) ? [...reply.artifacts] : [];
    if (!entries.length) {
      for (const candidate of reply.candidates ?? []) for (const part of candidate.content?.parts ?? []) if (part.inlineData?.data) entries.push({ b64_json: part.inlineData.data, mime_type: part.inlineData.mimeType });
      for (const choice of reply.choices ?? []) if (choice.message?.audio?.data) entries.push({ b64_json: choice.message.audio.data, mime_type: "audio/wav" });
    }
    const artifacts = [];
    let pending = !entries.length;
    for (const [index, entry] of entries.entries()) {
      if (entry.available === false) {
        pending = true;
        continue;
      }
      const key = typeof entry.key === "string" && /^[\w-]+$/.test(entry.key) ? entry.key : String(index);
      const fallback = task.selection.operation === "video" ? "video/mp4" : ["chat_music", "audio", "speech"].includes(task.selection.operation) ? "audio/wav" : "image/png";
      const artifact = {
        key,
        mediaType: typeof entry.mime_type === "string" ? entry.mime_type : fallback,
        ...typeof entry.revised_prompt === "string" ? { revisedPrompt: entry.revised_prompt } : {},
        ...typeof entry.quality === "string" ? { quality: entry.quality } : {},
        ...Number.isFinite(Number(entry.duration_seconds ?? entry.duration)) && Number(entry.duration_seconds ?? entry.duration) > 0 ? { duration: Number(entry.duration_seconds ?? entry.duration) } : {},
        ...Number.isSafeInteger(entry.size_bytes) && entry.size_bytes > 0 ? { bytes: entry.size_bytes } : {}
      };
      const existing = task.artifacts.find((a) => a.key === key && a.file);
      if (existing) Object.assign(artifact, { file: existing.file, sha256: existing.sha256, bytes: existing.bytes });
      if (typeof entry.b64_json === "string") {
        if (entry.b64_json.length > MAX_BYTES2 * 1.4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(entry.b64_json)) throw new Error("MEDIA_INVALID_BASE64_RESULT");
        await this.cache(task, artifact, Buffer.from(entry.b64_json, "base64"));
      } else if (typeof (entry.content_url ?? entry.url) === "string") {
        artifact.source = this.artifactURL(task.gateway, entry.content_url ?? entry.url).href;
      }
      if (artifact.file || artifact.source) artifacts.push(artifact);
      else pending = true;
    }
    task.artifactsPending = pending;
    if (artifacts.length) task.artifacts = artifacts;
    if (!task.taskId && !task.artifacts.length) throw new Error("MEDIA_EMPTY_RESULT");
    if (task.diagnostics) task.diagnostics.stage = "accepted";
    if (["failed", "rejected", "cancelled", "manual_review", "unknown"].includes(task.status)) {
      const key = await this.secrets.get(`zerowall.ai-cloud.group.${task.selection.groupId}`);
      const reason = reply.diagnostic || reply.error?.message || reply.error?.code;
      if (typeof reason === "string") task.error = safeMediaValue(reason, key ? [key] : []);
      else if (task.status !== "unknown") task.error = `MEDIA_TASK_${task.status.toUpperCase()}`;
      else delete task.error;
    } else delete task.error;
    await this.save(task);
  }
  artifactURL(base, raw) {
    const url = new URL(raw, base);
    if (url.protocol !== "https:" || url.username || url.password || url.port || url.hash) throw new Error("MEDIA_UNSAFE_ARTIFACT_URL");
    if (url.origin === base && !/^\/v1\/tasks\/mt_[\w-]+\/artifacts\/[\w-]+\/content$/.test(url.pathname)) throw new Error("MEDIA_INVALID_AUTHENTICATED_ARTIFACT");
    if (url.origin !== base && (url.hostname === "localhost" || /^[\d.]+$/.test(url.hostname) || url.hostname.includes(":") || !url.hostname.includes("."))) throw new Error("MEDIA_UNSAFE_ARTIFACT_HOST");
    return url;
  }
  async assertOwner(task, snapshot2, key) {
    if (snapshot2.status !== "signedIn" || task.account !== snapshot2.email || task.gateway !== gateway(snapshot2.gatewayBaseUrl ?? "") || task.keyHash !== hash(key)) throw new Error("MEDIA_TASK_ACCOUNT_MISMATCH");
  }
  async owner(task) {
    const snapshot2 = await this.account.current();
    const key = await this.secrets.get(`zerowall.ai-cloud.group.${task.selection.groupId}`);
    if (!key) throw new Error("MEDIA_CREDENTIAL_UNAVAILABLE");
    await this.assertOwner(task, snapshot2, key);
    return key;
  }
  async query(requestId, signal) {
    const task = await this.get(requestId);
    if (!task) throw new Error("MEDIA_TASK_NOT_FOUND");
    const key = await this.owner(task);
    if (!task.taskId) {
      if (task.status === "completed") return dto(task);
      throw new Error("MEDIA_SUBMISSION_UNCERTAIN: \u8BF7\u4F7F\u7528\u539F\u8BF7\u6C42\u53CA\u540C\u4E00 requestId \u6062\u590D\u3002");
    }
    const reply = await this.json(task.gateway, `/v1/tasks/${encodeURIComponent(task.taskId)}`, key, signal ? { signal } : {});
    if (reply.id !== task.taskId || reply.model !== task.selection.modelId) throw new Error("MEDIA_TASK_IDENTITY_MISMATCH");
    if (task.diagnostics) {
      task.diagnostics.response = safeMediaResponse(reply, [key]);
      task.diagnostics.upstream = safeMediaResponse(reply.inputs, [key]);
    }
    await this.accept(task, reply);
    return dto(task);
  }
  async wait(requestId, timeoutMs = 6e5, signal) {
    const end = Date.now() + Math.min(Math.max(timeoutMs, 1), 36e5);
    for (; ; ) {
      const task = await this.query(requestId, signal);
      if (["completed", "succeeded", "failed", "cancelled", "manual_review", "unknown"].includes(task.status)) return task;
      if (Date.now() >= end) return task;
      const catalog = await this.catalog();
      const interval = catalog.models.find((m) => m.profileId === task.selection.profileId)?.pollSeconds ?? 5;
      await delay2(Math.min(Math.max(interval, 1) * 1e3, end - Date.now()), void 0, signal ? { signal } : {});
    }
  }
  async download(requestId, artifactKey, signal) {
    const task = await this.get(requestId);
    if (!task) throw new Error("MEDIA_TASK_NOT_FOUND");
    const key = await this.owner(task);
    const artifact = task.artifacts.find((a) => a.key === artifactKey);
    if (!artifact) throw new Error("MEDIA_ARTIFACT_NOT_FOUND");
    if (artifact.file) {
      if (!/^[a-f0-9]{64}-[a-f0-9]{64}-[a-f0-9]{64}\.bin$/.test(artifact.file)) throw new Error("MEDIA_INVALID_CACHE_PATH");
      const bytes3 = await readFile2(join2(this.cacheDir, artifact.file));
      if (hash(bytes3) !== artifact.sha256) throw new Error("MEDIA_CACHE_HASH_MISMATCH");
      const actual = artifactFormat(bytes3);
      if (actual.mediaType.split("/")[0] !== artifact.mediaType.split("/")[0]) throw new Error("MEDIA_ARTIFACT_TYPE_MISMATCH");
      Object.assign(artifact, actual);
      await this.save(task);
      return { bytes: bytes3, mediaType: artifact.mediaType, sha256: artifact.sha256, ...artifact.duration !== void 0 ? { duration: artifact.duration } : {} };
    }
    if (!artifact.source) throw new Error("MEDIA_ARTIFACT_UNAVAILABLE");
    const url = this.artifactURL(task.gateway, artifact.source);
    if (artifact.mediaType.startsWith("image/")) {
      const result = await downloadImageBytes(url, { ...signal ? { signal } : {}, fetch: url.origin === task.gateway ? (url2, signal2, headers) => this.fetcher(url2, { redirect: "error", headers: { ...headers, authorization: `Bearer ${key}` }, signal: signal2 }) : this.externalFetch });
      await this.cache(task, artifact, result.bytes);
      await this.save(task);
      return { bytes: result.bytes, mediaType: artifact.mediaType, sha256: artifact.sha256 };
    }
    const downloadSignal = signal ?? new AbortController().signal;
    const authenticated = url.origin === task.gateway;
    const bytes2 = await downloadMediaBytes((headers, partSignal) => authenticated ? this.fetcher(url, { redirect: "error", headers: { ...headers, authorization: `Bearer ${key}` }, signal: partSignal }) : this.externalFetch(url, partSignal), downloadSignal, authenticated);
    if (artifact.bytes !== void 0 && artifact.bytes !== bytes2.length) throw new Error("MEDIA_TRUNCATED_ARTIFACT");
    await this.cache(task, artifact, bytes2);
    await this.save(task);
    return { bytes: bytes2, mediaType: artifact.mediaType, sha256: artifact.sha256, ...artifact.duration !== void 0 ? { duration: artifact.duration } : {} };
  }
  async cache(task, artifact, bytes2) {
    if (!bytes2.length || bytes2.length > MAX_BYTES2) throw new Error("MEDIA_INVALID_ARTIFACT_SIZE");
    const digest2 = hash(bytes2);
    const actual = artifactFormat(bytes2);
    if (actual.mediaType.split("/")[0] !== artifact.mediaType.split("/")[0]) throw new Error("MEDIA_ARTIFACT_TYPE_MISMATCH");
    Object.assign(artifact, actual);
    await mkdir2(this.cacheDir, { recursive: true, mode: 448 });
    const file = `${hash(task.requestId)}-${hash(artifact.key)}-${digest2}.bin`;
    const temporary = join2(this.cacheDir, `${file}.${randomUUID2()}.tmp`);
    try {
      await writeFile2(temporary, bytes2, { mode: 384, flag: "wx" });
      await rename2(temporary, join2(this.cacheDir, file));
    } finally {
      await unlink2(temporary).catch((error) => {
        if (error.code !== "ENOENT") throw error;
      });
    }
    Object.assign(artifact, { file, sha256: digest2, bytes: bytes2.length });
  }
  async all() {
    const value = await this.secrets.get(JOURNAL);
    if (!value) return [];
    try {
      const tasks = JSON.parse(value);
      const seen = /* @__PURE__ */ new Set();
      if (!Array.isArray(tasks)) throw new Error();
      for (const task of tasks) {
        if (!task || !/^[a-zA-Z0-9_-]{8,128}$/.test(task.requestId) || seen.has(task.requestId) || !/^[a-f0-9]{64}$/.test(task.keyHash) || !/^[a-f0-9]{64}$/.test(task.parametersHash) || typeof task.account !== "string" || gateway(task.gateway) !== task.gateway || !task.selection || !["groupId", "modelId", "profileId", "operation"].every((k) => typeof task.selection[k] === "string") || !Array.isArray(task.artifacts) || typeof task.status !== "string") throw new Error();
        seen.add(task.requestId);
        if (task.taskId && !/^mt_[A-Za-z0-9_-]+$/.test(task.taskId)) throw new Error();
        for (const artifact of task.artifacts) {
          if (!artifact || !/^[\w-]+$/.test(artifact.key) || !/^(image|audio|video)\/[a-z0-9.+-]+$/.test(artifact.mediaType)) throw new Error();
          if (artifact.source) this.artifactURL(task.gateway, artifact.source);
        }
      }
      return tasks;
    } catch {
      throw new Error("MEDIA_JOURNAL_INVALID: \u4EFB\u52A1\u8BB0\u5F55\u635F\u574F\uFF0C\u8BF7\u4FDD\u7559\u8BB0\u5F55\u5E76\u4FEE\u590D\uFF1B\u4E0D\u4F1A\u91CD\u65B0\u63D0\u4EA4\u3002");
    }
  }
  async get(id) {
    await this.writes;
    return (await this.all()).find((t) => t.requestId === id);
  }
  async save(task) {
    task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    const operation = this.writes.catch(() => {
    }).then(async () => {
      const tasks = (await this.all()).filter((t) => t.requestId !== task.requestId);
      tasks.push(task);
      await this.secrets.set(JOURNAL, JSON.stringify(tasks));
    });
    this.writes = operation;
    await operation;
  }
  async list() {
    const signal = AbortSignal.timeout(3e4);
    const snapshot2 = await mediaAbortable(this.account.current(), signal);
    if (snapshot2.status !== "signedIn") return [];
    await mediaAbortable(this.writes, signal);
    return (await mediaAbortable(this.all(), signal)).filter((t) => t.account === snapshot2.email && t.gateway === gateway(snapshot2.gatewayBaseUrl ?? "")).map(dto);
  }
};

// src/cloud/host/index.ts
var KEY_PREFIX2 = "zerowall.ai-cloud.group.";
var ROUTE_PREFIX = "zerowall-ai-cloud-";
var AiCloudLlmController = class {
  constructor(ctx, options = {}) {
    this.ctx = ctx;
    ctx.llm.registerConfigurableProviders([{ provider: "zerowall-ai-cloud", displayName: "ZeroWall AI \u4E91\u5E73\u53F0", settingsNs: "zerowall-ai-cloud", settingsPath: [] }]);
    this.secrets = options.secrets ?? new DshSecretStore(ctx.credentials);
    this.adapter = (options.createAdapter ?? ((adapterOptions) => new ManagedPiAiAdapter(adapterOptions)))({
      profiles: () => this.profiles,
      resolveApiKey: async (provider) => {
        const groupId = groupIdOf(provider);
        const secretName = `${KEY_PREFIX2}${groupId}`;
        let key = await this.secrets.get(secretName);
        if (key === void 0 || key.trim().length === 0) {
          try {
            await this.refreshManagedCredentials();
          } catch {
            this.ctx.logger.warn(`ZeroWall AI Cloud credential refresh failed for managed route "${provider}".`);
          }
          key = await this.secrets.get(secretName);
        }
        if (key === void 0 || key.trim().length === 0) {
          throw new LlmError2(`ZeroWall AI Cloud has no credential for managed route "${provider}". Sign in again or refresh the account model list.`, "MISSING_CREDENTIAL");
        }
        return key.trim();
      },
      // Managed routes are hand-declared API-key routes. Credentials stay in
      // the broker; if a restored session lost a group key, the account
      // catalog is refreshed once before failing the request.
      auth: {
        credentials: {
          read: async () => void 0,
          list: async () => [],
          modify: async () => {
            throw new Error("ZeroWall AI Cloud routes do not support provider-native login.");
          },
          delete: async () => {
          }
        },
        authContext: {
          env: async () => void 0,
          fileExists: async () => false
        }
      },
      resolveAttachments: () => this.ctx.get("attachments")
    });
    this.ctx.provide("zerowallMcpRouteResolver", {
      resolve: async (provider, model) => {
        if (!provider.startsWith(ROUTE_PREFIX)) return void 0;
        const profile = this.profiles.get(provider);
        if (profile === void 0) return void 0;
        const groupId = groupIdOf(provider);
        let apiKey;
        try {
          const value = await this.secrets.get(`${KEY_PREFIX2}${groupId}`);
          if (typeof value === "string" && value.trim().length > 0) apiKey = value.trim();
        } catch {
        }
        return {
          provider,
          model,
          ...profile.api === void 0 ? {} : { api: profile.api },
          ...profile.baseURL === void 0 ? {} : { baseUrl: profile.baseURL },
          ...apiKey === void 0 ? {} : { apiKey }
        };
      }
    });
    this.ctx.provide("zerowallAiCloudCredentialResolver", {
      resolve: async (provider, _model) => {
        if (!provider.startsWith(ROUTE_PREFIX)) return void 0;
        const groupId = groupIdOf(provider);
        const secretName = `${KEY_PREFIX2}${groupId}`;
        let key = await this.secrets.get(secretName);
        if (key === void 0 || key.trim().length === 0) {
          try {
            await this.refreshManagedCredentials();
          } catch {
            this.ctx.logger.warn(`ZeroWall AI Cloud credential refresh failed for managed route "${provider}".`);
          }
          key = await this.secrets.get(secretName);
        }
        return typeof key === "string" && key.trim().length > 0 ? key.trim() : void 0;
      }
    });
  }
  secrets;
  adapter;
  profiles = /* @__PURE__ */ new Map();
  registration;
  // A missing group key usually means the account catalog was restored without
  // its per-group credentials. Refresh lazily on the first request and share
  // the in-flight operation across concurrent model/tool calls. The cooldown
  // prevents a broken gateway from turning every request into a catalog storm.
  credentialRefresh;
  credentialRefreshAt = 0;
  async refreshManagedCredentials() {
    const now = Date.now();
    if (now - this.credentialRefreshAt < 5e3) return;
    if (this.credentialRefresh !== void 0) return this.credentialRefresh;
    let account;
    try {
      account = this.ctx.get("zerowallAccount");
    } catch {
      return;
    }
    if (account === void 0 || typeof account.discoverModels !== "function") return;
    const refresh = account.discoverModels().then(() => {
      this.credentialRefreshAt = Date.now();
    }).finally(() => {
      this.credentialRefresh = void 0;
    });
    this.credentialRefresh = refresh;
    await refresh;
  }
  async update(snapshot2) {
    const chatModels = snapshot2.models.filter((model) => model.capability !== "image-generation" && model.capability !== "media");
    const next = snapshot2.status === "signedIn" ? managedProfiles(chatModels) : /* @__PURE__ */ new Map();
    this.profiles = next;
    const routes = [...next.keys()];
    if (this.registration === void 0) {
      if (routes.length === 0) {
        return;
      }
      this.registration = this.ctx.llm.registerAdapter(routes, this.adapter);
    } else {
      this.registration.replace(routes);
    }
  }
};
var name = "zerowall-ai-cloud-llm";
var inject = ["llm", "zerowallAccount", "credentials"];
function apply2(ctx) {
  const secrets = new DshSecretStore(ctx.credentials);
  const controller = new AiCloudLlmController(ctx, { secrets });
  let mediaIdentityKnown = false, mediaOwner;
  const rememberAccount = (snapshot2) => {
    mediaIdentityKnown = true;
    mediaOwner = snapshot2.status === "signedIn" && snapshot2.email && snapshot2.gatewayBaseUrl ? createHash3("sha256").update(snapshot2.email.toLowerCase() + "\0" + snapshot2.gatewayBaseUrl).digest("hex") : void 0;
    return snapshot2;
  };
  let mediaJobs;
  ctx.on("zerowall/account-updated", (snapshot2) => {
    const previousOwner = mediaOwner;
    rememberAccount(snapshot2);
    if (previousOwner !== mediaOwner) mediaJobs?.suspend();
    if (mediaOwner) void mediaJobs?.resumePending().catch(() => {
    });
    return controller.update(snapshot2);
  });
  const account = ctx.get("zerowallAccount");
  const initialAccount = account.current().then((snapshot2) => {
    if (mediaIdentityKnown) return;
    rememberAccount(snapshot2);
    return controller.update(snapshot2);
  });
  const media = new AiCloudMediaService(ctx.get("zerowallAccount"), secrets);
  ctx.provide("zerowallMedia", media);
  mediaJobs = new MediaJobLedger(media, async () => {
    if (!mediaIdentityKnown) await mediaAbortable(initialAccount, AbortSignal.timeout(3e4));
    if (!mediaOwner) throw new Error("MEDIA_SIGN_IN_REQUIRED");
    return mediaOwner;
  });
  ctx.provide("zerowallMediaJobs", mediaJobs);
  ctx.effect(() => () => mediaJobs?.dispose());
  void initialAccount.then(() => mediaJobs?.resumePending()).catch(() => {
  });
  void initialAccount.catch((error) => {
    ctx.logger.warn("ZeroWall AI Cloud model routes could not be restored.");
    ctx.logger.warn(error);
  });
}
function managedProfiles(models) {
  const grouped = /* @__PURE__ */ new Map();
  for (const model of models) {
    const groupId = groupIdOf(model.providerId);
    if (model.groupId !== groupId) throw new Error(`Managed route "${model.providerId}" does not match group "${model.groupId}".`);
    const api = managedApi(model.modelId);
    const baseURL = trustedBaseUrl(model.baseUrl, api);
    const current = grouped.get(model.providerId);
    if (current !== void 0 && (current.baseURL !== baseURL || current.groupName !== model.groupName)) {
      throw new Error(`Managed route "${model.providerId}" has inconsistent metadata.`);
    }
    const entry = current ?? { groupName: model.groupName, baseURL, models: /* @__PURE__ */ new Map() };
    if (model.modelId.trim().length === 0) throw new Error(`Managed route "${model.providerId}" contains an empty model id.`);
    entry.models.set(model.modelId, model);
    grouped.set(model.providerId, entry);
  }
  const providers = {};
  for (const [provider, entry] of grouped) {
    const api = managedApi([...entry.models.keys()][0] ?? "");
    providers[provider] = {
      displayName: `ZeroWall AI Cloud - ${entry.groupName}`,
      api,
      baseURL: entry.baseURL,
      compat: managedCompat(api),
      retryPolicy: managedRetryPolicy,
      // Model availability comes from the account catalog. Input modalities
      // stay part of the route contract; they are not discovered by making a
      // probe request to the provider.
      defaultInput: ["text", "image"],
      models: [...entry.models.keys()].map((id) => {
        const managedModel = entry.models.get(id);
        return {
          id,
          name: id,
          api: managedApi(id),
          input: ["text", "image"],
          ...managedModel.contextWindow ? { contextWindow: managedModel.contextWindow } : {},
          ...managedModel.maxOutputTokens ? { maxTokens: managedModel.maxOutputTokens } : {},
          ...managedReasoning(id)
        };
      })
    };
  }
  return resolveManagedProfiles(providers);
}
function managedCompat(api) {
  if (api === "anthropic-messages") return { supportsStrictTools: false };
  return { supportsDeveloperRole: false, supportsStrictMode: false };
}
function managedApi(modelId) {
  if (/^(?:gpt|o[1-9]|chatgpt|codex|openai)/iu.test(modelId)) return "openai-responses";
  if (/^(?:claude|anthropic)/iu.test(modelId)) return "anthropic-messages";
  return "openai-completions";
}
function managedReasoning(modelId) {
  const id = modelId.toLowerCase();
  const isGpt = /^gpt-[5-9](?:\.\d+)?(?:[._-].*)?$/.test(id);
  const isLegacyGpt = /^gpt-[5-9](?:\.\d+)?[._-](?:chat|mini|nano|turbo|instruct)$/.test(id);
  const isDeepSeek = /(?:deepseek.*(?:reasoner|r1|v4)|(?:reasoner|r1).*deepseek)/.test(id);
  const isAnthropic = /^(?:claude|anthropic)/u.test(id);
  if ((!isGpt || isLegacyGpt) && !isDeepSeek || isAnthropic) return {};
  if (isDeepSeek) {
    return {
      reasoningEfforts: { off: null, low: "low", medium: "medium", high: "high", max: "max" }
    };
  }
  return {
    reasoningEfforts: {
      off: null,
      minimal: "minimal",
      low: "low",
      medium: "medium",
      high: "high",
      xhigh: "xhigh",
      max: "max"
    }
  };
}
function groupIdOf(provider) {
  if (!provider.startsWith(ROUTE_PREFIX)) throw new Error(`ZeroWall AI Cloud does not own provider route "${provider}".`);
  const match = /^zerowall-ai-cloud-([1-9]\d*)(?:-(?:responses|messages|completions))?$/u.exec(provider);
  if (match?.[1] === void 0) throw new Error(`Invalid ZeroWall AI Cloud provider route "${provider}".`);
  return match[1];
}
function trustedBaseUrl(raw, api) {
  const url = new URL(raw);
  const trustedHost = ["hkcode.aicodeme.xyz", "code.aicodeme.xyz", "code.aicodeme.cn"].includes(url.hostname);
  const path = url.pathname.replace(/\/+$/u, "");
  if (url.protocol !== "https:" || !trustedHost || url.username || url.password || url.port || url.search || url.hash || !["", "/v1"].includes(path)) {
    throw new Error(`Managed model endpoint is not a trusted ZeroWall AI Cloud URL: ${raw}`);
  }
  const root = `${url.protocol}//${url.host}`;
  return api === "anthropic-messages" ? root : `${root}/v1`;
}
var host_default2 = { name, inject, apply: apply2 };

// src/host/index.ts
var name2 = "zerowall-ai-cloud";
var inject2 = ["credentials", "llm"];
function apply3(ctx) {
  ctx.plugin(host_exports);
  ctx.plugin(host_exports2);
}
var index_default = { name: name2, inject: inject2, apply: apply3 };
export {
  AiCloudClient,
  apply3 as apply,
  index_default as default,
  inject2 as inject,
  name2 as name
};
