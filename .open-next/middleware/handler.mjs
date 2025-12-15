
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.9.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__65c55606._.js
var require_root_of_the_server_65c55606 = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__65c55606._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__65c55606._.js", 51615, (e, s, t) => {
      s.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 347, (e) => {
      e.v({ name: "next", version: "16.0.8", description: "The React Framework", main: "./dist/server/next.js", license: "MIT", repository: "vercel/next.js", bugs: "https://github.com/vercel/next.js/issues", homepage: "https://nextjs.org", types: "index.d.ts", files: ["dist", "app.js", "app.d.ts", "babel.js", "babel.d.ts", "client.js", "client.d.ts", "compat", "cache.js", "cache.d.ts", "constants.js", "constants.d.ts", "document.js", "document.d.ts", "dynamic.js", "dynamic.d.ts", "error.js", "error.d.ts", "future", "legacy", "script.js", "script.d.ts", "server.js", "server.d.ts", "head.js", "head.d.ts", "image.js", "image.d.ts", "link.js", "link.d.ts", "form.js", "form.d.ts", "router.js", "router.d.ts", "jest.js", "jest.d.ts", "og.js", "og.d.ts", "root-params.js", "root-params.d.ts", "types.d.ts", "types.js", "index.d.ts", "types/global.d.ts", "types/compiled.d.ts", "image-types/global.d.ts", "navigation-types/navigation.d.ts", "navigation-types/compat/navigation.d.ts", "font", "navigation.js", "navigation.d.ts", "headers.js", "headers.d.ts", "navigation-types", "web-vitals.js", "web-vitals.d.ts", "experimental/testing/server.js", "experimental/testing/server.d.ts", "experimental/testmode/playwright.js", "experimental/testmode/playwright.d.ts", "experimental/testmode/playwright/msw.js", "experimental/testmode/playwright/msw.d.ts", "experimental/testmode/proxy.js", "experimental/testmode/proxy.d.ts"], bin: { next: "./dist/bin/next" }, scripts: { dev: "cross-env NEXT_SERVER_NO_MANGLE=1 taskr", release: "taskr release", build: "pnpm release", prepublishOnly: "cd ../../ && turbo run build", types: "tsc --project tsconfig.build.json --declaration --emitDeclarationOnly --stripInternal --declarationDir dist", typescript: "tsec --noEmit", "ncc-compiled": "taskr ncc", storybook: "BROWSER=none storybook dev -p 6006", "build-storybook": "storybook build", "test-storybook": "test-storybook" }, taskr: { requires: ["./taskfile-webpack.js", "./taskfile-ncc.js", "./taskfile-swc.js", "./taskfile-watch.js"] }, dependencies: { "@next/env": "16.0.8", "@swc/helpers": "0.5.15", "caniuse-lite": "^1.0.30001579", postcss: "8.4.31", "styled-jsx": "5.1.6" }, peerDependencies: { "@opentelemetry/api": "^1.1.0", "@playwright/test": "^1.51.1", "babel-plugin-react-compiler": "*", react: "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0", "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0", sass: "^1.3.0" }, peerDependenciesMeta: { "babel-plugin-react-compiler": { optional: true }, sass: { optional: true }, "@opentelemetry/api": { optional: true }, "@playwright/test": { optional: true } }, optionalDependencies: { sharp: "^0.34.4", "@next/swc-darwin-arm64": "16.0.8", "@next/swc-darwin-x64": "16.0.8", "@next/swc-linux-arm64-gnu": "16.0.8", "@next/swc-linux-arm64-musl": "16.0.8", "@next/swc-linux-x64-gnu": "16.0.8", "@next/swc-linux-x64-musl": "16.0.8", "@next/swc-win32-arm64-msvc": "16.0.8", "@next/swc-win32-x64-msvc": "16.0.8" }, devDependencies: { "@babel/code-frame": "7.26.2", "@babel/core": "7.26.10", "@babel/eslint-parser": "7.24.6", "@babel/generator": "7.27.0", "@babel/plugin-syntax-bigint": "7.8.3", "@babel/plugin-syntax-dynamic-import": "7.8.3", "@babel/plugin-syntax-import-attributes": "7.26.0", "@babel/plugin-syntax-jsx": "7.25.9", "@babel/plugin-syntax-typescript": "7.25.4", "@babel/plugin-transform-class-properties": "7.25.9", "@babel/plugin-transform-export-namespace-from": "7.25.9", "@babel/plugin-transform-modules-commonjs": "7.26.3", "@babel/plugin-transform-numeric-separator": "7.25.9", "@babel/plugin-transform-object-rest-spread": "7.25.9", "@babel/plugin-transform-runtime": "7.26.10", "@babel/preset-env": "7.26.9", "@babel/preset-react": "7.26.3", "@babel/preset-typescript": "7.27.0", "@babel/runtime": "7.27.0", "@babel/traverse": "7.27.0", "@babel/types": "7.27.0", "@base-ui-components/react": "1.0.0-beta.2", "@capsizecss/metrics": "3.4.0", "@edge-runtime/cookies": "6.0.0", "@edge-runtime/ponyfill": "4.0.0", "@edge-runtime/primitives": "6.0.0", "@hapi/accept": "5.0.2", "@jest/transform": "29.5.0", "@jest/types": "29.5.0", "@modelcontextprotocol/sdk": "1.18.1", "@mswjs/interceptors": "0.23.0", "@napi-rs/triples": "1.2.0", "@next/font": "16.0.8", "@next/polyfill-module": "16.0.8", "@next/polyfill-nomodule": "16.0.8", "@next/react-refresh-utils": "16.0.8", "@next/swc": "16.0.8", "@opentelemetry/api": "1.6.0", "@playwright/test": "1.51.1", "@rspack/core": "1.6.0", "@storybook/addon-a11y": "8.6.0", "@storybook/addon-essentials": "8.6.0", "@storybook/addon-interactions": "8.6.0", "@storybook/addon-webpack5-compiler-swc": "3.0.0", "@storybook/blocks": "8.6.0", "@storybook/react": "8.6.0", "@storybook/react-webpack5": "8.6.0", "@storybook/test": "8.6.0", "@storybook/test-runner": "0.21.0", "@swc/core": "1.11.24", "@swc/types": "0.1.7", "@taskr/clear": "1.1.0", "@taskr/esnext": "1.1.0", "@types/babel__code-frame": "7.0.6", "@types/babel__core": "7.20.5", "@types/babel__generator": "7.27.0", "@types/babel__template": "7.4.4", "@types/babel__traverse": "7.20.7", "@types/bytes": "3.1.1", "@types/ci-info": "2.0.0", "@types/compression": "0.0.36", "@types/content-disposition": "0.5.4", "@types/content-type": "1.1.3", "@types/cookie": "0.3.3", "@types/cross-spawn": "6.0.0", "@types/debug": "4.1.5", "@types/express-serve-static-core": "4.17.33", "@types/fresh": "0.5.0", "@types/glob": "7.1.1", "@types/jsonwebtoken": "9.0.0", "@types/lodash": "4.14.198", "@types/lodash.curry": "4.1.6", "@types/path-to-regexp": "1.7.0", "@types/picomatch": "2.3.3", "@types/platform": "1.3.4", "@types/react": "19.0.8", "@types/react-dom": "19.0.3", "@types/react-is": "18.2.4", "@types/semver": "7.3.1", "@types/send": "0.14.4", "@types/shell-quote": "1.7.1", "@types/tar": "6.1.5", "@types/text-table": "0.2.1", "@types/ua-parser-js": "0.7.36", "@types/webpack-sources1": "npm:@types/webpack-sources@0.1.5", "@types/ws": "8.2.0", "@vercel/ncc": "0.34.0", "@vercel/nft": "0.27.1", "@vercel/routing-utils": "5.2.0", "@vercel/turbopack-ecmascript-runtime": "*", acorn: "8.14.0", anser: "1.4.9", arg: "4.1.0", assert: "2.0.0", "async-retry": "1.2.3", "async-sema": "3.0.0", "axe-playwright": "2.0.3", "babel-loader": "10.0.0", "babel-plugin-react-compiler": "0.0.0-experimental-3fde738-20250918", "babel-plugin-transform-define": "2.0.0", "babel-plugin-transform-react-remove-prop-types": "0.4.24", "browserify-zlib": "0.2.0", browserslist: "4.28.0", buffer: "5.6.0", busboy: "1.6.0", bytes: "3.1.1", "ci-info": "watson/ci-info#f43f6a1cefff47fb361c88cf4b943fdbcaafe540", "cli-select": "1.1.2", "client-only": "0.0.1", commander: "12.1.0", "comment-json": "3.0.3", compression: "1.7.4", conf: "5.0.0", "constants-browserify": "1.0.0", "content-disposition": "0.5.3", "content-type": "1.0.4", cookie: "0.4.1", "cross-env": "6.0.3", "cross-spawn": "7.0.3", "crypto-browserify": "3.12.0", "css-loader": "7.1.2", "css.escape": "1.5.1", "cssnano-preset-default": "7.0.6", "data-uri-to-buffer": "3.0.1", debug: "4.1.1", devalue: "2.0.1", "domain-browser": "4.19.0", "edge-runtime": "4.0.1", events: "3.3.0", "find-up": "4.1.0", fresh: "0.5.2", glob: "7.1.7", "gzip-size": "5.1.1", "http-proxy": "1.18.1", "http-proxy-agent": "5.0.0", "https-browserify": "1.0.0", "https-proxy-agent": "5.0.1", "icss-utils": "5.1.0", "ignore-loader": "0.1.2", "image-size": "1.2.1", "ipaddr.js": "2.2.0", "is-docker": "2.0.0", "is-wsl": "2.2.0", "jest-worker": "27.5.1", json5: "2.2.3", jsonwebtoken: "9.0.0", "loader-runner": "4.3.0", "loader-utils2": "npm:loader-utils@2.0.4", "loader-utils3": "npm:loader-utils@3.1.3", "lodash.curry": "4.1.1", "mini-css-extract-plugin": "2.4.4", msw: "2.3.0", nanoid: "3.1.32", "native-url": "0.3.4", "neo-async": "2.6.1", "node-html-parser": "5.3.3", ora: "4.0.4", "os-browserify": "0.3.0", "p-limit": "3.1.0", "p-queue": "6.6.2", "path-browserify": "1.0.1", "path-to-regexp": "6.3.0", picomatch: "4.0.1", "postcss-flexbugs-fixes": "5.0.2", "postcss-modules-extract-imports": "3.0.0", "postcss-modules-local-by-default": "4.2.0", "postcss-modules-scope": "3.0.0", "postcss-modules-values": "4.0.0", "postcss-preset-env": "7.4.3", "postcss-safe-parser": "6.0.0", "postcss-scss": "4.0.3", "postcss-value-parser": "4.2.0", process: "0.11.10", punycode: "2.1.1", "querystring-es3": "0.2.1", "raw-body": "2.4.1", "react-refresh": "0.12.0", recast: "0.23.11", "regenerator-runtime": "0.13.4", "safe-stable-stringify": "2.5.0", "sass-loader": "16.0.5", "schema-utils2": "npm:schema-utils@2.7.1", "schema-utils3": "npm:schema-utils@3.0.0", semver: "7.3.2", send: "0.18.0", "server-only": "0.0.1", setimmediate: "1.0.5", "shell-quote": "1.7.3", "source-map": "0.6.1", "source-map-loader": "5.0.0", "source-map08": "npm:source-map@0.8.0-beta.0", "stacktrace-parser": "0.1.10", storybook: "8.6.0", "stream-browserify": "3.0.0", "stream-http": "3.1.1", "strict-event-emitter": "0.5.0", "string-hash": "1.1.3", string_decoder: "1.3.0", "strip-ansi": "6.0.0", "style-loader": "4.0.0", superstruct: "1.0.3", tar: "6.1.15", taskr: "1.1.0", terser: "5.27.0", "terser-webpack-plugin": "5.3.9", "text-table": "0.2.0", "timers-browserify": "2.0.12", "tty-browserify": "0.0.1", typescript: "5.9.2", "ua-parser-js": "1.0.35", unistore: "3.4.1", util: "0.12.4", "vm-browserify": "1.1.2", watchpack: "2.4.0", "web-vitals": "4.2.1", webpack: "5.98.0", "webpack-sources1": "npm:webpack-sources@1.4.3", "webpack-sources3": "npm:webpack-sources@3.2.3", ws: "8.2.3", zod: "3.25.76", "zod-validation-error": "3.4.0" }, keywords: ["react", "framework", "nextjs", "web", "server", "node", "front-end", "backend", "cli", "vercel"], engines: { node: ">=20.9.0" } });
    }, 78500, (e, s, t) => {
      s.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 88912, (e, s, t) => {
      self._ENTRIES ||= {};
      let r = Promise.resolve().then(() => e.i(58217));
      r.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(r, { get(e2, s2) {
        if ("then" === s2) return (s3, t3) => e2.then(s3, t3);
        let t2 = (...t3) => e2.then((e3) => (0, e3[s2])(...t3));
        return t2.then = (t3, r2) => e2.then((e3) => e3[s2]).then(t3, r2), t2;
      } });
    }]);
  }
});

// .next/server/edge/chunks/node_modules_next_dist_esm_api_headers_95aeb203.js
var require_node_modules_next_dist_esm_api_headers_95aeb203 = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_esm_api_headers_95aeb203.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_esm_api_headers_95aeb203.js", 40415, (e) => {
      "use strict";
      var r = e.i(53065);
      e.i(65664);
      var t = e.i(28042);
      e.i(7754);
      var a = e.i(90460), n = e.i(53835), i = e.i(82453), s = e.i(63072), o = e.i(80082), c = e.i(72117), u = e.i(37560);
      let d = { current: null }, l = "function" == typeof u.cache ? u.cache : (e2) => e2, h = console.warn;
      function p(e2) {
        return function(...r2) {
          h(e2(...r2));
        };
      }
      l((e2) => {
        try {
          h(d.current);
        } finally {
          d.current = null;
        }
      });
      var f = e.i(65179), b = e.i(25753);
      function g() {
        let e2 = "cookies", u2 = a.workAsyncStorage.getStore(), d2 = i.workUnitAsyncStorage.getStore();
        if (u2) {
          if (d2 && "after" === d2.phase && !(0, f.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(Error(`Route ${u2.route} used \`cookies()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`cookies()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E843", enumerable: false, configurable: true });
          if (u2.forceStatic) return E(r.RequestCookiesAdapter.seal(new t.RequestCookies(new Headers({}))));
          if (u2.dynamicShouldError) throw Object.defineProperty(new o.StaticGenBailoutError(`Route ${u2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E849", enumerable: false, configurable: true });
          if (d2) switch (d2.type) {
            case "cache":
              let a2 = Object.defineProperty(Error(`Route ${u2.route} used \`cookies()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E831", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a2, g), u2.invalidDynamicUsageError ??= a2, a2;
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${u2.route} used \`cookies()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`cookies()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E846", enumerable: false, configurable: true });
            case "prerender":
              var l2 = u2, h2 = d2;
              let n2 = m.get(h2);
              if (n2) return n2;
              let i2 = (0, c.makeHangingPromise)(h2.renderSignal, l2.route, "`cookies()`");
              return m.set(h2, i2), i2;
            case "prerender-client":
              let p2 = "`cookies`";
              throw Object.defineProperty(new b.InvariantError(`${p2} must not be used within a Client Component. Next.js should be preventing ${p2} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E832", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, s.postponeWithTracking)(u2.route, e2, d2.dynamicTracking);
            case "prerender-legacy":
              return (0, s.throwToInterruptStaticGeneration)(e2, u2, d2);
            case "prerender-runtime":
              return (0, s.delayUntilRuntimeStage)(d2, E(d2.cookies));
            case "private-cache":
              return E(d2.cookies);
            case "request":
              return (0, s.trackDynamicDataInDynamicRender)(d2), E((0, r.areCookiesMutableInCurrentPhase)(d2) ? d2.userspaceMutableCookies : d2.cookies);
          }
        }
        (0, n.throwForMissingRequestStore)(e2);
      }
      e.i(38174);
      let m = /* @__PURE__ */ new WeakMap();
      function E(e2) {
        let r2 = m.get(e2);
        if (r2) return r2;
        let t2 = Promise.resolve(e2);
        return m.set(e2, t2), t2;
      }
      p(function(e2, r2) {
        let t2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${t2}used ${r2}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E830", enumerable: false, configurable: true });
      }), e.s(["cookies", () => g], 94447);
      var y = e.i(48047);
      function _() {
        let e2 = "headers", r2 = a.workAsyncStorage.getStore(), t2 = i.workUnitAsyncStorage.getStore();
        if (r2) {
          if (t2 && "after" === t2.phase && !(0, f.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(Error(`Route ${r2.route} used \`headers()\` inside \`after()\`. This is not supported. If you need this data inside an \`after()\` callback, use \`headers()\` outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E839", enumerable: false, configurable: true });
          if (r2.forceStatic) return w(y.HeadersAdapter.seal(new Headers({})));
          if (t2) switch (t2.type) {
            case "cache": {
              let e3 = Object.defineProperty(Error(`Route ${r2.route} used \`headers()\` inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E833", enumerable: false, configurable: true });
              throw Error.captureStackTrace(e3, _), r2.invalidDynamicUsageError ??= e3, e3;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${r2.route} used \`headers()\` inside a function cached with \`unstable_cache()\`. Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use \`headers()\` outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E838", enumerable: false, configurable: true });
          }
          if (r2.dynamicShouldError) throw Object.defineProperty(new o.StaticGenBailoutError(`Route ${r2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E828", enumerable: false, configurable: true });
          if (t2) switch (t2.type) {
            case "prerender":
              var u2 = r2, d2 = t2;
              let a2 = R.get(d2);
              if (a2) return a2;
              let n2 = (0, c.makeHangingPromise)(d2.renderSignal, u2.route, "`headers()`");
              return R.set(d2, n2), n2;
            case "prerender-client":
              let i2 = "`headers`";
              throw Object.defineProperty(new b.InvariantError(`${i2} must not be used within a client component. Next.js should be preventing ${i2} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, s.postponeWithTracking)(r2.route, e2, t2.dynamicTracking);
            case "prerender-legacy":
              return (0, s.throwToInterruptStaticGeneration)(e2, r2, t2);
            case "prerender-runtime":
              return (0, s.delayUntilRuntimeStage)(t2, w(t2.headers));
            case "private-cache":
              return w(t2.headers);
            case "request":
              return (0, s.trackDynamicDataInDynamicRender)(t2), w(t2.headers);
          }
        }
        (0, n.throwForMissingRequestStore)(e2);
      }
      let R = /* @__PURE__ */ new WeakMap();
      function w(e2) {
        let r2 = R.get(e2);
        if (r2) return r2;
        let t2 = Promise.resolve(e2);
        return R.set(e2, t2), t2;
      }
      p(function(e2, r2) {
        let t2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${t2}used ${r2}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E836", enumerable: false, configurable: true });
      }), e.s(["headers", () => _], 28620);
      var O = e.i(18368);
      function v() {
        let e2 = a.workAsyncStorage.getStore(), r2 = i.workUnitAsyncStorage.getStore();
        switch ((!e2 || !r2) && (0, n.throwForMissingRequestStore)("draftMode"), r2.type) {
          case "prerender-runtime":
            return (0, s.delayUntilRuntimeStage)(r2, S(r2.draftMode, e2));
          case "request":
            return S(r2.draftMode, e2);
          case "cache":
          case "private-cache":
          case "unstable-cache":
            let t2 = (0, n.getDraftModeProviderForCacheScope)(e2, r2);
            if (t2) return S(t2, e2);
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
            return S(null, e2);
          default:
            return r2;
        }
      }
      function S(e2, r2) {
        let t2 = T.get(e2 ?? k);
        return t2 || Promise.resolve(new j(e2));
      }
      e.i(17536);
      let k = {}, T = /* @__PURE__ */ new WeakMap();
      class j {
        constructor(e2) {
          this._provider = e2;
        }
        get isEnabled() {
          return null !== this._provider && this._provider.isEnabled;
        }
        enable() {
          D("draftMode().enable()", this.enable), null !== this._provider && this._provider.enable();
        }
        disable() {
          D("draftMode().disable()", this.disable), null !== this._provider && this._provider.disable();
        }
      }
      function D(e2, r2) {
        let t2 = a.workAsyncStorage.getStore(), n2 = i.workUnitAsyncStorage.getStore();
        if (t2) {
          if ((null == n2 ? void 0 : n2.phase) === "after") throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside \`after()\`. The enabled status of \`draftMode()\` can be read inside \`after()\` but you cannot enable or disable \`draftMode()\`. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E845", enumerable: false, configurable: true });
          if (t2.dynamicShouldError) throw Object.defineProperty(new o.StaticGenBailoutError(`Route ${t2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E553", enumerable: false, configurable: true });
          if (n2) switch (n2.type) {
            case "cache":
            case "private-cache": {
              let a3 = Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside "use cache". The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E829", enumerable: false, configurable: true });
              throw Error.captureStackTrace(a3, r2), t2.invalidDynamicUsageError ??= a3, a3;
            }
            case "unstable-cache":
              throw Object.defineProperty(Error(`Route ${t2.route} used "${e2}" inside a function cached with \`unstable_cache()\`. The enabled status of \`draftMode()\` can be read in caches but you must not enable or disable \`draftMode()\` inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E844", enumerable: false, configurable: true });
            case "prerender":
            case "prerender-runtime": {
              let r3 = Object.defineProperty(Error(`Route ${t2.route} used ${e2} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", { value: "E126", enumerable: false, configurable: true });
              return (0, s.abortAndThrowOnSynchronousRequestDataAccess)(t2.route, e2, r3, n2);
            }
            case "prerender-client":
              let a2 = "`draftMode`";
              throw Object.defineProperty(new b.InvariantError(`${a2} must not be used within a Client Component. Next.js should be preventing ${a2} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E832", enumerable: false, configurable: true });
            case "prerender-ppr":
              return (0, s.postponeWithTracking)(t2.route, e2, n2.dynamicTracking);
            case "prerender-legacy":
              n2.revalidate = 0;
              let i2 = Object.defineProperty(new O.DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
              throw t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = i2.stack, i2;
            case "request":
              (0, s.trackDynamicDataInDynamicRender)(n2);
          }
        }
      }
      p(function(e2, r2) {
        let t2 = e2 ? `Route "${e2}" ` : "This route ";
        return Object.defineProperty(Error(`${t2}used ${r2}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E835", enumerable: false, configurable: true });
      }), e.s(["draftMode", () => v], 99304), e.s([], 11189), e.i(11189), e.i(94447), e.i(28620), e.i(99304), e.s(["cookies", () => g, "draftMode", () => v, "headers", () => _], 40415);
    }]);
  }
});

// .next/server/edge/chunks/node_modules_3554f982._.js
var require_node_modules_3554f982 = __commonJS({
  ".next/server/edge/chunks/node_modules_3554f982._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_3554f982._.js", 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, i, n, s, a;
        var o, l, c, u, d, h, p, f, g, m, y, _, v, b, w, k, S = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let i2 = r3(223), n2 = r3(172), s2 = r3(930), a2 = "context", o2 = new i2.NoopContextManager();
          class l2 {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, n2.registerGlobal)(a2, e3, s2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...i3) {
              return this._getContextManager().with(e3, t3, r4, ...i3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, n2.getGlobal)(a2) || o2;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(a2, s2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let i2 = r3(56), n2 = r3(912), s2 = r3(957), a2 = r3(172);
          class o2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, a2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: s2.DiagLogLevel.INFO }) => {
                var i3, o3, l2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (i3 = e5.stack) ? i3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, a2.getGlobal)("diag"), u2 = (0, n2.createLogLevelDiagLogger)(null != (o3 = r4.logLevel) ? o3 : s2.DiagLogLevel.INFO, e4);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e5}`), u2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, a2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new i2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o2()), this._instance;
            }
          }
          t2.DiagAPI = o2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let i2 = r3(660), n2 = r3(172), s2 = r3(930), a2 = "metrics";
          class o2 {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, n2.registerGlobal)(a2, e3, s2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(a2) || i2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, n2.unregisterGlobal)(a2, s2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = o2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let i2 = r3(172), n2 = r3(874), s2 = r3(194), a2 = r3(277), o2 = r3(369), l2 = r3(930), c2 = "propagation", u2 = new n2.NoopTextMapPropagator();
          class d2 {
            constructor() {
              this.createBaggage = o2.createBaggage, this.getBaggage = a2.getBaggage, this.getActiveBaggage = a2.getActiveBaggage, this.setBaggage = a2.setBaggage, this.deleteBaggage = a2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, i2.registerGlobal)(c2, e3, l2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = s2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = s2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, i2.unregisterGlobal)(c2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, i2.getGlobal)(c2) || u2;
            }
          }
          t2.PropagationAPI = d2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let i2 = r3(172), n2 = r3(846), s2 = r3(139), a2 = r3(607), o2 = r3(930), l2 = "trace";
          class c2 {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = s2.wrapSpanContext, this.isSpanContextValid = s2.isSpanContextValid, this.deleteSpan = a2.deleteSpan, this.getSpan = a2.getSpan, this.getActiveSpan = a2.getActiveSpan, this.getSpanContext = a2.getSpanContext, this.setSpan = a2.setSpan, this.setSpanContext = a2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, i2.registerGlobal)(l2, this._proxyTracerProvider, o2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, i2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, i2.unregisterGlobal)(l2, o2.DiagAPI.instance()), this._proxyTracerProvider = new n2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = c2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let i2 = r3(491), n2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function s2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t2.getBaggage = s2, t2.getActiveBaggage = function() {
            return s2(i2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(n2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(n2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let i2 = new r3(this._entries);
              return i2._entries.set(e3, t3), i2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let i2 = r3(930), n2 = r3(993), s2 = r3(830), a2 = i2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: s2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let i2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return i2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...i3) {
              return t3.call(r4, ...i3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, i2) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.set(e4, i2), n2;
              }, t3.deleteValue = (e4) => {
                let i2 = new r3(t3._currentContext);
                return i2._currentContext.delete(e4), i2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let i2 = r3(172);
          function n2(e3, t3, r4) {
            let n3 = (0, i2.getGlobal)("diag");
            if (n3) return r4.unshift(t3), n3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let i2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, i3) {
              let n2 = t3[r5];
              return "function" == typeof n2 && e3 >= i3 ? n2.bind(t3) : function() {
              };
            }
            return e3 < i2.DiagLogLevel.NONE ? e3 = i2.DiagLogLevel.NONE : e3 > i2.DiagLogLevel.ALL && (e3 = i2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", i2.DiagLogLevel.ERROR), warn: r4("warn", i2.DiagLogLevel.WARN), info: r4("info", i2.DiagLogLevel.INFO), debug: r4("debug", i2.DiagLogLevel.DEBUG), verbose: r4("verbose", i2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let i2 = r3(200), n2 = r3(521), s2 = r3(130), a2 = n2.VERSION.split(".")[0], o2 = Symbol.for(`opentelemetry.js.api.${a2}`), l2 = i2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, i3 = false) {
            var s3;
            let a3 = l2[o2] = null != (s3 = l2[o2]) ? s3 : { version: n2.VERSION };
            if (!i3 && a3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (a3.version !== n2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${a3.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return a3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let i3 = null == (t3 = l2[o2]) ? void 0 : t3.version;
            if (i3 && (0, s2.isCompatible)(i3)) return null == (r4 = l2[o2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r4 = l2[o2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let i2 = r3(521), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function s2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), i3 = e3.match(n2);
            if (!i3) return () => false;
            let s3 = { major: +i3[1], minor: +i3[2], patch: +i3[3], prerelease: i3[4] };
            if (null != s3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function a2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let i4 = e4.match(n2);
              if (!i4) return a2(e4);
              let o2 = { major: +i4[1], minor: +i4[2], patch: +i4[3], prerelease: i4[4] };
              if (null != o2.prerelease || s3.major !== o2.major) return a2(e4);
              if (0 === s3.major) return s3.minor === o2.minor && s3.patch <= o2.patch ? (t3.add(e4), true) : a2(e4);
              return s3.minor <= o2.minor ? (t3.add(e4), true) : a2(e4);
            };
          }
          t2._makeCompatibilityCheck = s2, t2.isCompatible = s2(i2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            constructor() {
            }
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class i2 {
          }
          t2.NoopMetric = i2;
          class n2 extends i2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = n2;
          class s2 extends i2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = s2;
          class a2 extends i2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = a2;
          class o2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = o2;
          class l2 extends o2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class c2 extends o2 {
          }
          t2.NoopObservableGaugeMetric = c2;
          class u2 extends o2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new n2(), t2.NOOP_HISTOGRAM_METRIC = new a2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new s2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let i2 = r3(102);
          class n2 {
            getMeter(e3, t3, r4) {
              return i2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = n2, t2.NOOP_METER_PROVIDER = new n2();
        }, 200: function(e2, t2, r3) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), e3[i3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || i2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, i3) {
            void 0 === i3 && (i3 = r4), e3[i3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || i2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let i2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = i2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let i2 = r3(491), n2 = r3(607), s2 = r3(403), a2 = r3(139), o2 = i2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = o2.active()) {
              var i3;
              if (null == t3 ? void 0 : t3.root) return new s2.NonRecordingSpan();
              let l2 = r4 && (0, n2.getSpanContext)(r4);
              return "object" == typeof (i3 = l2) && "string" == typeof i3.spanId && "string" == typeof i3.traceId && "number" == typeof i3.traceFlags && (0, a2.isSpanContextValid)(l2) ? new s2.NonRecordingSpan(l2) : new s2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, i3) {
              let s3, a3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (s3 = t3, l2 = r4) : (s3 = t3, a3 = r4, l2 = i3);
              let c2 = null != a3 ? a3 : o2.active(), u2 = this.startSpan(e3, s3, c2), d2 = (0, n2.setSpan)(c2, u2);
              return o2.with(d2, l2, void 0, u2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let i2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new i2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let i2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, i3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = i3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, i3) {
              let n2 = this._getTracer();
              return Reflect.apply(n2.startActiveSpan, n2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : i2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let i2 = r3(125), n2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var n3;
              return null != (n3 = this.getDelegateTracer(e3, t3, r4)) ? n3 : new i2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : n2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var i3;
              return null == (i3 = this._delegate) ? void 0 : i3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let i2 = r3(780), n2 = r3(403), s2 = r3(491), a2 = (0, i2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o2(e3) {
            return e3.getValue(a2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(a2, t3);
          }
          t2.getSpan = o2, t2.getActiveSpan = function() {
            return o2(s2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(a2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new n2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = o2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let i2 = r3(564);
          class n2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), n3 = r4.indexOf("=");
                if (-1 !== n3) {
                  let s2 = r4.slice(0, n3), a2 = r4.slice(n3 + 1, t3.length);
                  (0, i2.validateKey)(s2) && (0, i2.validateValue)(a2) && e4.set(s2, a2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new n2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = n2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", i2 = `[a-z]${r3}{0,255}`, n2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, s2 = RegExp(`^(?:${i2}|${n2})$`), a2 = /^[ -~]{0,255}[!-~]$/, o2 = /,|=/;
          t2.validateKey = function(e3) {
            return s2.test(e3);
          }, t2.validateValue = function(e3) {
            return a2.test(e3) && !o2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let i2 = r3(325);
          t2.createTraceState = function(e3) {
            return new i2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let i2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: i2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let i2 = r3(476), n2 = r3(403), s2 = /^([0-9a-f]{32})$/i, a2 = /^[0-9a-f]{16}$/i;
          function o2(e3) {
            return s2.test(e3) && e3 !== i2.INVALID_TRACEID;
          }
          function l2(e3) {
            return a2.test(e3) && e3 !== i2.INVALID_SPANID;
          }
          t2.isValidTraceId = o2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return o2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new n2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, E = {};
        function T(e2) {
          var t2 = E[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = E[e2] = { exports: {} }, i2 = true;
          try {
            S[e2].call(r3.exports, r3, r3.exports, T), i2 = false;
          } finally {
            i2 && delete E[e2];
          }
          return r3.exports;
        }
        T.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var x = {};
        Object.defineProperty(x, "__esModule", { value: true }), x.trace = x.propagation = x.metrics = x.diag = x.context = x.INVALID_SPAN_CONTEXT = x.INVALID_TRACEID = x.INVALID_SPANID = x.isValidSpanId = x.isValidTraceId = x.isSpanContextValid = x.createTraceState = x.TraceFlags = x.SpanStatusCode = x.SpanKind = x.SamplingDecision = x.ProxyTracerProvider = x.ProxyTracer = x.defaultTextMapSetter = x.defaultTextMapGetter = x.ValueType = x.createNoopMeter = x.DiagLogLevel = x.DiagConsoleLogger = x.ROOT_CONTEXT = x.createContextKey = x.baggageEntryMetadataFromString = void 0, o = T(369), Object.defineProperty(x, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return o.baggageEntryMetadataFromString;
        } }), l = T(780), Object.defineProperty(x, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(x, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = T(972), Object.defineProperty(x, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), u = T(957), Object.defineProperty(x, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = T(102), Object.defineProperty(x, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), h = T(901), Object.defineProperty(x, "ValueType", { enumerable: true, get: function() {
          return h.ValueType;
        } }), p = T(194), Object.defineProperty(x, "defaultTextMapGetter", { enumerable: true, get: function() {
          return p.defaultTextMapGetter;
        } }), Object.defineProperty(x, "defaultTextMapSetter", { enumerable: true, get: function() {
          return p.defaultTextMapSetter;
        } }), f = T(125), Object.defineProperty(x, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = T(846), Object.defineProperty(x, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = T(996), Object.defineProperty(x, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), y = T(357), Object.defineProperty(x, "SpanKind", { enumerable: true, get: function() {
          return y.SpanKind;
        } }), _ = T(847), Object.defineProperty(x, "SpanStatusCode", { enumerable: true, get: function() {
          return _.SpanStatusCode;
        } }), v = T(475), Object.defineProperty(x, "TraceFlags", { enumerable: true, get: function() {
          return v.TraceFlags;
        } }), b = T(98), Object.defineProperty(x, "createTraceState", { enumerable: true, get: function() {
          return b.createTraceState;
        } }), w = T(139), Object.defineProperty(x, "isSpanContextValid", { enumerable: true, get: function() {
          return w.isSpanContextValid;
        } }), Object.defineProperty(x, "isValidTraceId", { enumerable: true, get: function() {
          return w.isValidTraceId;
        } }), Object.defineProperty(x, "isValidSpanId", { enumerable: true, get: function() {
          return w.isValidSpanId;
        } }), k = T(476), Object.defineProperty(x, "INVALID_SPANID", { enumerable: true, get: function() {
          return k.INVALID_SPANID;
        } }), Object.defineProperty(x, "INVALID_TRACEID", { enumerable: true, get: function() {
          return k.INVALID_TRACEID;
        } }), Object.defineProperty(x, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return k.INVALID_SPAN_CONTEXT;
        } }), r2 = T(67), Object.defineProperty(x, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), i = T(506), Object.defineProperty(x, "diag", { enumerable: true, get: function() {
          return i.diag;
        } }), n = T(886), Object.defineProperty(x, "metrics", { enumerable: true, get: function() {
          return n.metrics;
        } }), s = T(939), Object.defineProperty(x, "propagation", { enumerable: true, get: function() {
          return s.propagation;
        } }), a = T(845), Object.defineProperty(x, "trace", { enumerable: true, get: function() {
          return a.trace;
        } }), x.default = { context: r2.context, diag: i.diag, metrics: n.metrics, propagation: s.propagation, trace: a.trace }, t.exports = x;
      })();
    }, 41424, (e, t, r) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, i, n, s = {};
        s.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var n2 = {}, s2 = t2.split(i), a = (r3 || {}).decode || e2, o = 0; o < s2.length; o++) {
            var l = s2[o], c = l.indexOf("=");
            if (!(c < 0)) {
              var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == n2[u] && (n2[u] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, a));
            }
          }
          return n2;
        }, s.serialize = function(e3, t2, i2) {
          var s2 = i2 || {}, a = s2.encode || r2;
          if ("function" != typeof a) throw TypeError("option encode is invalid");
          if (!n.test(e3)) throw TypeError("argument name is invalid");
          var o = a(t2);
          if (o && !n.test(o)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + o;
          if (null != s2.maxAge) {
            var c = s2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (s2.domain) {
            if (!n.test(s2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + s2.domain;
          }
          if (s2.path) {
            if (!n.test(s2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + s2.path;
          }
          if (s2.expires) {
            if ("function" != typeof s2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + s2.expires.toUTCString();
          }
          if (s2.httpOnly && (l += "; HttpOnly"), s2.secure && (l += "; Secure"), s2.sameSite) switch ("string" == typeof s2.sameSite ? s2.sameSite.toLowerCase() : s2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, i = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = s;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, i, n, s;
        var a = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function i2() {
          }
          function n2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function s2(e4, t3, i3, s3, a3) {
            if ("function" != typeof i3) throw TypeError("The listener must be a function");
            var o3 = new n2(i3, s3 || e4, a3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], o3] : e4._events[l2].push(o3) : (e4._events[l2] = o3, e4._eventsCount++), e4;
          }
          function a2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new i2() : delete e4._events[t3];
          }
          function o2() {
            this._events = new i2(), this._eventsCount = 0;
          }
          Object.create && (i2.prototype = /* @__PURE__ */ Object.create(null), new i2().__proto__ || (r3 = false)), o2.prototype.eventNames = function() {
            var e4, i3, n3 = [];
            if (0 === this._eventsCount) return n3;
            for (i3 in e4 = this._events) t2.call(e4, i3) && n3.push(r3 ? i3.slice(1) : i3);
            return Object.getOwnPropertySymbols ? n3.concat(Object.getOwnPropertySymbols(e4)) : n3;
          }, o2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, i3 = this._events[t3];
            if (!i3) return [];
            if (i3.fn) return [i3.fn];
            for (var n3 = 0, s3 = i3.length, a3 = Array(s3); n3 < s3; n3++) a3[n3] = i3[n3].fn;
            return a3;
          }, o2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, i3 = this._events[t3];
            return i3 ? i3.fn ? 1 : i3.length : 0;
          }, o2.prototype.emit = function(e4, t3, i3, n3, s3, a3) {
            var o3 = r3 ? r3 + e4 : e4;
            if (!this._events[o3]) return false;
            var l2, c2, u = this._events[o3], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, i3), true;
                case 4:
                  return u.fn.call(u.context, t3, i3, n3), true;
                case 5:
                  return u.fn.call(u.context, t3, i3, n3, s3), true;
                case 6:
                  return u.fn.call(u.context, t3, i3, n3, s3, a3), true;
              }
              for (c2 = 1, l2 = Array(d - 1); c2 < d; c2++) l2[c2 - 1] = arguments[c2];
              u.fn.apply(u.context, l2);
            } else {
              var h, p = u.length;
              for (c2 = 0; c2 < p; c2++) switch (u[c2].once && this.removeListener(e4, u[c2].fn, void 0, true), d) {
                case 1:
                  u[c2].fn.call(u[c2].context);
                  break;
                case 2:
                  u[c2].fn.call(u[c2].context, t3);
                  break;
                case 3:
                  u[c2].fn.call(u[c2].context, t3, i3);
                  break;
                case 4:
                  u[c2].fn.call(u[c2].context, t3, i3, n3);
                  break;
                default:
                  if (!l2) for (h = 1, l2 = Array(d - 1); h < d; h++) l2[h - 1] = arguments[h];
                  u[c2].fn.apply(u[c2].context, l2);
              }
            }
            return true;
          }, o2.prototype.on = function(e4, t3, r4) {
            return s2(this, e4, t3, r4, false);
          }, o2.prototype.once = function(e4, t3, r4) {
            return s2(this, e4, t3, r4, true);
          }, o2.prototype.removeListener = function(e4, t3, i3, n3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return this;
            if (!t3) return a2(this, s3), this;
            var o3 = this._events[s3];
            if (o3.fn) o3.fn !== t3 || n3 && !o3.once || i3 && o3.context !== i3 || a2(this, s3);
            else {
              for (var l2 = 0, c2 = [], u = o3.length; l2 < u; l2++) (o3[l2].fn !== t3 || n3 && !o3[l2].once || i3 && o3[l2].context !== i3) && c2.push(o3[l2]);
              c2.length ? this._events[s3] = 1 === c2.length ? c2[0] : c2 : a2(this, s3);
            }
            return this;
          }, o2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && a2(this, t3)) : (this._events = new i2(), this._eventsCount = 0), this;
          }, o2.prototype.off = o2.prototype.removeListener, o2.prototype.addListener = o2.prototype.on, o2.prefixed = r3, o2.EventEmitter = o2, e3.exports = o2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let i2 = 0, n2 = e4.length;
            for (; n2 > 0; ) {
              let s2 = n2 / 2 | 0, a2 = i2 + s2;
              0 >= r3(e4[a2], t3) ? (i2 = ++a2, n2 -= s2 + 1) : n2 = s2;
            }
            return i2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let i2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let n2 = i2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(n2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let i2 = r3(213);
          class n2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let s2 = (e4, t3, r4) => new Promise((s3, a2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void s3(e4);
            let o2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  s3(r4());
                } catch (e5) {
                  a2(e5);
                }
                return;
              }
              let i3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, o3 = r4 instanceof Error ? r4 : new n2(i3);
              "function" == typeof e4.cancel && e4.cancel(), a2(o3);
            }, t3);
            i2(e4.then(s3, a2), () => {
              clearTimeout(o2);
            });
          });
          e3.exports = s2, e3.exports.default = s2, e3.exports.TimeoutError = n2;
        } }, o = {};
        function l(e3) {
          var t2 = o[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = o[e3] = { exports: {} }, i2 = true;
          try {
            a[e3](r3, r3.exports, l), i2 = false;
          } finally {
            i2 && delete o[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(993), r2 = l(816), i = l(821), n = () => {
        }, s = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, s2, a2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = n, this._resolveIdle = n, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: i.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (a2 = null == (s2 = e3.interval) ? void 0 : s2.toString()) ? a2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = n, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = n, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((i2, n2) => {
              let a2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let a3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && n2(s);
                  });
                  i2(await a3);
                } catch (e4) {
                  n2(e4);
                }
                this._next();
              };
              this._queue.enqueue(a2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = c;
      })();
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return o;
      } };
      for (var n in i) Object.defineProperty(r, n, { enumerable: true, get: i[n] });
      let s = new (e.r(78500)).AsyncLocalStorage();
      function a(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let i2 = t2.url(e2);
        return { url: i2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function o(e2, t2, r2) {
        let i2 = a(e2, t2);
        return i2 ? s.run(i2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = s.getStore();
        return r2 || (e2 && t2 ? a(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var i = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { handleFetch: function() {
        return c;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return o;
      } };
      for (var s in n) Object.defineProperty(r, s, { enumerable: true, get: n[s] });
      let a = e.r(25085), o = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: n2, headers: s2, body: a2, cache: o2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(s2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? i.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function c(e2, t2) {
        let r2 = (0, a.getTestReqInfo)(t2, o);
        if (!r2) return e2(t2);
        let { testData: n2, proxyPort: s2 } = r2, c2 = await l(n2, t2), u2 = await e2(`http://localhost:${s2}`, { method: "POST", body: JSON.stringify(c2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u2.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: n3 } = e3.response;
              return new Response(n3 ? i.Buffer.from(n3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(d);
          default:
            return h;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var i2;
          return (null == r2 || null == (i2 = r2.next) ? void 0 : i2.internal) ? t2(e2, r2) : c(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { interceptTestApis: function() {
        return o;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var n in i) Object.defineProperty(r, n, { enumerable: true, get: i[n] });
      let s = e.r(25085), a = e.r(28325);
      function o() {
        return (0, a.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, s.withRequest)(t2, a.reader, () => e2(t2, r2));
      }
    }, 42280, (e, t, r) => {
      "use strict";
      let i;
      Object.defineProperty(r, "__esModule", { value: true }), r.parse = function(e2, t2) {
        let r2 = new c(), i2 = e2.length;
        if (i2 < 2) return r2;
        let n2 = t2?.decode || h, s2 = 0;
        do {
          let t3 = e2.indexOf("=", s2);
          if (-1 === t3) break;
          let a2 = e2.indexOf(";", s2), o2 = -1 === a2 ? i2 : a2;
          if (t3 > o2) {
            s2 = e2.lastIndexOf(";", t3 - 1) + 1;
            continue;
          }
          let l2 = u(e2, s2, t3), c2 = d(e2, t3, l2), h2 = e2.slice(l2, c2);
          if (void 0 === r2[h2]) {
            let i3 = u(e2, t3 + 1, o2), s3 = d(e2, o2, i3), a3 = n2(e2.slice(i3, s3));
            r2[h2] = a3;
          }
          s2 = o2 + 1;
        } while (s2 < i2);
        return r2;
      }, r.serialize = function(e2, t2, r2) {
        let i2 = r2?.encode || encodeURIComponent;
        if (!n.test(e2)) throw TypeError(`argument name is invalid: ${e2}`);
        let c2 = i2(t2);
        if (!s.test(c2)) throw TypeError(`argument val is invalid: ${t2}`);
        let u2 = e2 + "=" + c2;
        if (!r2) return u2;
        if (void 0 !== r2.maxAge) {
          if (!Number.isInteger(r2.maxAge)) throw TypeError(`option maxAge is invalid: ${r2.maxAge}`);
          u2 += "; Max-Age=" + r2.maxAge;
        }
        if (r2.domain) {
          if (!a.test(r2.domain)) throw TypeError(`option domain is invalid: ${r2.domain}`);
          u2 += "; Domain=" + r2.domain;
        }
        if (r2.path) {
          if (!o.test(r2.path)) throw TypeError(`option path is invalid: ${r2.path}`);
          u2 += "; Path=" + r2.path;
        }
        if (r2.expires) {
          var d2;
          if (d2 = r2.expires, "[object Date]" !== l.call(d2) || !Number.isFinite(r2.expires.valueOf())) throw TypeError(`option expires is invalid: ${r2.expires}`);
          u2 += "; Expires=" + r2.expires.toUTCString();
        }
        if (r2.httpOnly && (u2 += "; HttpOnly"), r2.secure && (u2 += "; Secure"), r2.partitioned && (u2 += "; Partitioned"), r2.priority) switch ("string" == typeof r2.priority ? r2.priority.toLowerCase() : void 0) {
          case "low":
            u2 += "; Priority=Low";
            break;
          case "medium":
            u2 += "; Priority=Medium";
            break;
          case "high":
            u2 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${r2.priority}`);
        }
        if (r2.sameSite) switch ("string" == typeof r2.sameSite ? r2.sameSite.toLowerCase() : r2.sameSite) {
          case true:
          case "strict":
            u2 += "; SameSite=Strict";
            break;
          case "lax":
            u2 += "; SameSite=Lax";
            break;
          case "none":
            u2 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${r2.sameSite}`);
        }
        return u2;
      };
      let n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, s = /^[\u0021-\u003A\u003C-\u007E]*$/, a = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, o = /^[\u0020-\u003A\u003D-\u007E]*$/, l = Object.prototype.toString, c = ((i = function() {
      }).prototype = /* @__PURE__ */ Object.create(null), i);
      function u(e2, t2, r2) {
        do {
          let r3 = e2.charCodeAt(t2);
          if (32 !== r3 && 9 !== r3) return t2;
        } while (++t2 < r2);
        return r2;
      }
      function d(e2, t2, r2) {
        for (; t2 > r2; ) {
          let r3 = e2.charCodeAt(--t2);
          if (32 !== r3 && 9 !== r3) return t2 + 1;
        }
        return r2;
      }
      function h(e2) {
        if (-1 === e2.indexOf("%")) return e2;
        try {
          return decodeURIComponent(e2);
        } catch (t2) {
          return e2;
        }
      }
    }, 91375, (e) => {
      "use strict";
      let t = (0, e.i(90044).createAsyncLocalStorage)();
      e.s([], 92999), e.i(92999), e.s(["actionAsyncStorage", 0, t], 91375);
    }, 16852, 75982, 68585, 96588, (e) => {
      "use strict";
      var t, r, i = ((t = {})[t.SeeOther = 303] = "SeeOther", t[t.TemporaryRedirect = 307] = "TemporaryRedirect", t[t.PermanentRedirect = 308] = "PermanentRedirect", t);
      e.s(["RedirectStatusCode", () => i], 16852);
      let n = "NEXT_REDIRECT";
      var s = ((r = {}).push = "push", r.replace = "replace", r);
      function a(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let t2 = e2.digest.split(";"), [r2, s2] = t2, a2 = t2.slice(2, -2).join(";"), o2 = Number(t2.at(-2));
        return r2 === n && ("replace" === s2 || "push" === s2) && "string" == typeof a2 && !isNaN(o2) && o2 in i;
      }
      e.s(["REDIRECT_ERROR_CODE", 0, n, "RedirectType", () => s, "isRedirectError", () => a], 75982);
      let o = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), l = "NEXT_HTTP_ERROR_FALLBACK";
      function c(e2) {
        if ("object" != typeof e2 || null === e2 || !("digest" in e2) || "string" != typeof e2.digest) return false;
        let [t2, r2] = e2.digest.split(";");
        return t2 === l && o.has(Number(r2));
      }
      function u(e2) {
        return a(e2) || c(e2);
      }
      e.s(["HTTP_ERROR_FALLBACK_ERROR_CODE", 0, l, "isHTTPAccessFallbackError", () => c], 68585), e.s(["isNextRouterError", () => u], 96588);
    }, 82748, (e) => {
      "use strict";
      var t = e.i(72117);
      let r = Symbol.for("react.postpone");
      var i = e.i(81828), n = e.i(96588), s = e.i(63072), a = e.i(18368);
      e.s(["unstable_rethrow", () => function e2(o) {
        if ((0, n.isNextRouterError)(o) || (0, i.isBailoutToCSRError)(o) || (0, a.isDynamicServerError)(o) || (0, s.isDynamicPostpone)(o) || "object" == typeof o && null !== o && o.$$typeof === r || (0, t.isHangingPromiseRejectionError)(o) || (0, s.isPrerenderInterruptedError)(o)) throw o;
        o instanceof Error && "cause" in o && e2(o.cause);
      }], 82748);
    }, 64445, (e, t, r) => {
      var i = { 226: function(t2, r2) {
        !function(i2, n2) {
          "use strict";
          var s2 = "function", a = "undefined", o = "object", l = "string", c = "major", u = "model", d = "name", h = "type", p = "vendor", f = "version", g = "architecture", m = "console", y = "mobile", _ = "tablet", v = "smarttv", b = "wearable", w = "embedded", k = "Amazon", S = "Apple", E = "ASUS", T = "BlackBerry", x = "Browser", O = "Chrome", C = "Firefox", P = "Google", R = "Huawei", I = "Microsoft", N = "Motorola", A = "Opera", U = "Samsung", M = "Sharp", q = "Sony", L = "Xiaomi", D = "Zebra", j = "Facebook", B = "Chromium OS", $ = "Mac OS", z = function(e2, t3) {
            var r3 = {};
            for (var i3 in e2) t3[i3] && t3[i3].length % 2 == 0 ? r3[i3] = t3[i3].concat(e2[i3]) : r3[i3] = e2[i3];
            return r3;
          }, K = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, H = function(e2, t3) {
            return typeof e2 === l && -1 !== J(t3).indexOf(J(e2));
          }, J = function(e2) {
            return e2.toLowerCase();
          }, V = function(e2, t3) {
            if (typeof e2 === l) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a ? e2 : e2.substring(0, 350);
          }, F = function(e2, t3) {
            for (var r3, i3, n3, a2, l2, c2, u2 = 0; u2 < t3.length && !l2; ) {
              var d2 = t3[u2], h2 = t3[u2 + 1];
              for (r3 = i3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (n3 = 0; n3 < h2.length; n3++) c2 = l2[++i3], typeof (a2 = h2[n3]) === o && a2.length > 0 ? 2 === a2.length ? typeof a2[1] == s2 ? this[a2[0]] = a2[1].call(this, c2) : this[a2[0]] = a2[1] : 3 === a2.length ? typeof a2[1] !== s2 || a2[1].exec && a2[1].test ? this[a2[0]] = c2 ? c2.replace(a2[1], a2[2]) : void 0 : this[a2[0]] = c2 ? a2[1].call(this, c2, a2[2]) : void 0 : 4 === a2.length && (this[a2[0]] = c2 ? a2[3].call(this, c2.replace(a2[1], a2[2])) : void 0) : this[a2] = c2 || void 0;
              u2 += 2;
            }
          }, W = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var i3 = 0; i3 < t3[r3].length; i3++) if (H(t3[r3][i3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (H(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, G = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, f], [/opios[\/ ]+([\w\.]+)/i], [f, [d, A + " Mini"]], [/\bopr\/([\w\.]+)/i], [f, [d, A]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [d, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [d, "UC" + x]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [f, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [f, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [d, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure " + x], f], [/\bfocus\/([\w\.]+)/i], [f, [d, C + " Focus"]], [/\bopt\/([\w\.]+)/i], [f, [d, A + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [f, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [d, A + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [f, [d, "MIUI " + x]], [/fxios\/([-\w\.]+)/i], [f, [d, C]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 " + x]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 " + x], f], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, f], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, j], f], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [d, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [d, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [d, O + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, O + " WebView"], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [d, "Android " + x]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [f, W, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [d, C + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [d, f], [/(cobalt)\/([\w\.]+)/i], [d, [f, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[g, "amd64"]], [/(ia32(?=;))/i], [[g, J]], [/((?:i[346]|x)86)[;\)]/i], [[g, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[g, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[g, "armhf"]], [/windows (ce|mobile); ppc;/i], [[g, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[g, /ower/, "", J]], [/(sun4\w)[;\)]/i], [[g, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[g, J]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [p, U], [h, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [p, U], [h, y]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [p, S], [h, y]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [p, S], [h, _]], [/(macintosh);/i], [u, [p, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [p, M], [h, y]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [p, R], [h, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [p, R], [h, y]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [p, L], [h, y]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [p, L], [h, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [p, "OPPO"], [h, y]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [p, "Vivo"], [h, y]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [p, "Realme"], [h, y]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [p, N], [h, y]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [p, N], [h, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [p, "LG"], [h, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [p, "LG"], [h, y]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [p, "Lenovo"], [h, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [p, "Nokia"], [h, y]], [/(pixel c)\b/i], [u, [p, P], [h, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [p, P], [h, y]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [p, q], [h, y]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [p, q], [h, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [p, "OnePlus"], [h, y]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [p, k], [h, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [p, k], [h, y]], [/(playbook);[-\w\),; ]+(rim)/i], [u, p, [h, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [p, T], [h, y]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [p, E], [h, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [p, E], [h, y]], [/(nexus 9)/i], [u, [p, "HTC"], [h, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [p, [u, /_/g, " "], [h, y]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [p, "Acer"], [h, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [p, "Meizu"], [h, y]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [p, u, [h, y]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [p, u, [h, _]], [/(surface duo)/i], [u, [p, I], [h, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [p, "Fairphone"], [h, y]], [/(u304aa)/i], [u, [p, "AT&T"], [h, y]], [/\bsie-(\w*)/i], [u, [p, "Siemens"], [h, y]], [/\b(rct\w+) b/i], [u, [p, "RCA"], [h, _]], [/\b(venue[\d ]{2,7}) b/i], [u, [p, "Dell"], [h, _]], [/\b(q(?:mv|ta)\w+) b/i], [u, [p, "Verizon"], [h, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [p, "Barnes & Noble"], [h, _]], [/\b(tm\d{3}\w+) b/i], [u, [p, "NuVision"], [h, _]], [/\b(k88) b/i], [u, [p, "ZTE"], [h, _]], [/\b(nx\d{3}j) b/i], [u, [p, "ZTE"], [h, y]], [/\b(gen\d{3}) b.+49h/i], [u, [p, "Swiss"], [h, y]], [/\b(zur\d{3}) b/i], [u, [p, "Swiss"], [h, _]], [/\b((zeki)?tb.*\b) b/i], [u, [p, "Zeki"], [h, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[p, "Dragon Touch"], u, [h, _]], [/\b(ns-?\w{0,9}) b/i], [u, [p, "Insignia"], [h, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [p, "NextBook"], [h, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[p, "Voice"], u, [h, y]], [/\b(lvtel\-)?(v1[12]) b/i], [[p, "LvTel"], u, [h, y]], [/\b(ph-1) /i], [u, [p, "Essential"], [h, y]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [p, "Envizen"], [h, _]], [/\b(trio[-\w\. ]+) b/i], [u, [p, "MachSpeed"], [h, _]], [/\btu_(1491) b/i], [u, [p, "Rotor"], [h, _]], [/(shield[\w ]+) b/i], [u, [p, "Nvidia"], [h, _]], [/(sprint) (\w+)/i], [p, u, [h, y]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [p, I], [h, y]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [p, D], [h, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [p, D], [h, y]], [/smart-tv.+(samsung)/i], [p, [h, v]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [p, U], [h, v]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[p, "LG"], [h, v]], [/(apple) ?tv/i], [p, [u, S + " TV"], [h, v]], [/crkey/i], [[u, O + "cast"], [p, P], [h, v]], [/droid.+aft(\w)( bui|\))/i], [u, [p, k], [h, v]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [p, M], [h, v]], [/(bravia[\w ]+)( bui|\))/i], [u, [p, q], [h, v]], [/(mitv-\w{5}) bui/i], [u, [p, L], [h, v]], [/Hbbtv.*(technisat) (.*);/i], [p, u, [h, v]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[p, V], [u, V], [h, v]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, v]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [p, u, [h, m]], [/droid.+; (shield) bui/i], [u, [p, "Nvidia"], [h, m]], [/(playstation [345portablevi]+)/i], [u, [p, q], [h, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [p, I], [h, m]], [/((pebble))app/i], [p, u, [h, b]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [p, S], [h, b]], [/droid.+; (glass) \d/i], [u, [p, P], [h, b]], [/droid.+; (wt63?0{2,3})\)/i], [u, [p, D], [h, b]], [/(quest( 2| pro)?)/i], [u, [p, j], [h, b]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [p, [h, w]], [/(aeobc)\b/i], [u, [p, k], [h, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [h, y]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [h, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, y]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [p, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [d, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, d]], os: [[/microsoft (windows) (vista|xp)/i], [d, f], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [f, W, G]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [f, W, G]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, $], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, f], [/\(bb(10);/i], [f, [d, T]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [d, C + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [d, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [d, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [d, O + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[d, B], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, f], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [d, f]] }, Y = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof Y)) return new Y(e2, t3).getResult();
            var r3 = typeof i2 !== a && i2.navigator ? i2.navigator : void 0, n3 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), m2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, v2 = t3 ? z(X, t3) : X, b2 = r3 && r3.userAgent == n3;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[d] = void 0, t4[f] = void 0, F.call(t4, n3, v2.browser), t4[c] = typeof (e3 = t4[f]) === l ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, b2 && r3 && r3.brave && typeof r3.brave.isBrave == s2 && (t4[d] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[g] = void 0, F.call(e3, n3, v2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[p] = void 0, e3[u] = void 0, e3[h] = void 0, F.call(e3, n3, v2.device), b2 && !e3[h] && m2 && m2.mobile && (e3[h] = y), b2 && "Macintosh" == e3[u] && r3 && typeof r3.standalone !== a && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[u] = "iPad", e3[h] = _), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[d] = void 0, e3[f] = void 0, F.call(e3, n3, v2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[d] = void 0, e3[f] = void 0, F.call(e3, n3, v2.os), b2 && !e3[d] && m2 && "Unknown" != m2.platform && (e3[d] = m2.platform.replace(/chrome os/i, B).replace(/macos/i, $)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return n3;
            }, this.setUA = function(e3) {
              return n3 = typeof e3 === l && e3.length > 350 ? V(e3, 350) : e3, this;
            }, this.setUA(n3), this;
          };
          if (Y.VERSION = "1.0.35", Y.BROWSER = K([d, f, c]), Y.CPU = K([g]), Y.DEVICE = K([u, p, h, m, y, v, _, b, w]), Y.ENGINE = Y.OS = K([d, f]), typeof r2 !== a) t2.exports && (r2 = t2.exports = Y), r2.UAParser = Y;
          else if (typeof define === s2 && define.amd) e.r, void 0 !== Y && e.v(Y);
          else typeof i2 !== a && (i2.UAParser = Y);
          var Q = typeof i2 !== a && (i2.jQuery || i2.Zepto);
          if (Q && !Q.ua) {
            var Z = new Y();
            Q.ua = Z.getResult(), Q.ua.get = function() {
              return Z.getUA();
            }, Q.ua.set = function(e2) {
              Z.setUA(e2);
              var t3 = Z.getResult();
              for (var r3 in t3) Q.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, n = {};
      function s(e2) {
        var t2 = n[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = n[e2] = { exports: {} }, a = true;
        try {
          i[e2].call(r2.exports, r2, r2.exports, s), a = false;
        } finally {
          a && delete n[e2];
        }
        return r2.exports;
      }
      s.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = s(226);
    }, 58217, (e) => {
      "use strict";
      let t, r, i, n, s;
      async function a() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      let o = null;
      async function l() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        o || (o = a());
        let e10 = await o;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function c(...e10) {
        let t10 = await a();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let u = null;
      function d() {
        return u || (u = l()), u;
      }
      function h(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(h(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(h(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, i10, n10) {
            if ("function" == typeof n10[0]) return n10[0](t10);
            throw Object.defineProperty(Error(h(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      d();
      class p extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class f extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class g extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let m = "_N_T_", y = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function _(e10) {
        var t10, r10, i10, n10, s10, a10 = [], o3 = 0;
        function l2() {
          for (; o3 < e10.length && /\s/.test(e10.charAt(o3)); ) o3 += 1;
          return o3 < e10.length;
        }
        for (; o3 < e10.length; ) {
          for (t10 = o3, s10 = false; l2(); ) if ("," === (r10 = e10.charAt(o3))) {
            for (i10 = o3, o3 += 1, l2(), n10 = o3; o3 < e10.length && "=" !== (r10 = e10.charAt(o3)) && ";" !== r10 && "," !== r10; ) o3 += 1;
            o3 < e10.length && "=" === e10.charAt(o3) ? (s10 = true, o3 = n10, a10.push(e10.substring(t10, i10)), t10 = o3) : o3 = i10 + 1;
          } else o3 += 1;
          (!s10 || o3 >= e10.length) && a10.push(e10.substring(t10, e10.length));
        }
        return a10;
      }
      function v(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [i10, n10] of e10.entries()) "set-cookie" === i10.toLowerCase() ? (r10.push(..._(n10)), t10[i10] = 1 === r10.length ? r10[0] : r10) : t10[i10] = n10;
        return t10;
      }
      function b(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...y, GROUP: { builtinReact: [y.reactServerComponents, y.actionBrowser], serverOnly: [y.reactServerComponents, y.actionBrowser, y.instrument, y.middleware], neutralTarget: [y.apiNode, y.apiEdge], clientOnly: [y.serverSideRendering, y.appPagesBrowser], bundled: [y.reactServerComponents, y.actionBrowser, y.serverSideRendering, y.appPagesBrowser, y.shared, y.instrument, y.middleware], appPages: [y.reactServerComponents, y.serverSideRendering, y.appPagesBrowser, y.actionBrowser] } });
      let w = Symbol("response"), k = Symbol("passThrough"), S = Symbol("waitUntil");
      class E {
        constructor(e10, t10) {
          this[k] = false, this[S] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[w] || (this[w] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[k] = true;
        }
        waitUntil(e10) {
          if ("external" === this[S].kind) return (0, this[S].function)(e10);
          this[S].promises.push(e10);
        }
      }
      class T extends E {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new p({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new p({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function x(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function O(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), i10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return i10 || t10 > -1 ? { pathname: e10.substring(0, i10 ? r10 : t10), query: i10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function C(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: i10, hash: n10 } = O(e10);
        return `${t10}${r10}${i10}${n10}`;
      }
      function P(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: i10, hash: n10 } = O(e10);
        return `${r10}${t10}${i10}${n10}`;
      }
      function R(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = O(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let I = /* @__PURE__ */ new WeakMap();
      function N(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let i10 = I.get(t10);
        i10 || (i10 = t10.map((e11) => e11.toLowerCase()), I.set(t10, i10));
        let n10 = e10.split("/", 2);
        if (!n10[1]) return { pathname: e10 };
        let s10 = n10[1].toLowerCase(), a10 = i10.indexOf(s10);
        return a10 < 0 ? { pathname: e10 } : (r10 = t10[a10], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let A = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function U(e10, t10) {
        return new URL(String(e10).replace(A, "localhost"), t10 && String(t10).replace(A, "localhost"));
      }
      let M = Symbol("NextURLInternal");
      class q {
        constructor(e10, t10, r10) {
          let i10, n10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (i10 = t10, n10 = r10 || {}) : n10 = r10 || t10 || {}, this[M] = { url: U(e10, i10 ?? n10.base), options: n10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, i10, n10;
          let s10 = function(e11, t11) {
            let { basePath: r11, i18n: i11, trailingSlash: n11 } = t11.nextConfig ?? {}, s11 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : n11 };
            r11 && R(s11.pathname, r11) && (s11.pathname = function(e12, t12) {
              if (!R(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(s11.pathname, r11), s11.basePath = r11);
            let a11 = s11.pathname;
            if (s11.pathname.startsWith("/_next/data/") && s11.pathname.endsWith(".json")) {
              let e12 = s11.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              s11.buildId = e12[0], a11 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (s11.pathname = a11);
            }
            if (i11) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(s11.pathname) : N(s11.pathname, i11.locales);
              s11.locale = e12.detectedLocale, s11.pathname = e12.pathname ?? s11.pathname, !e12.detectedLocale && s11.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a11) : N(a11, i11.locales)).detectedLocale && (s11.locale = e12.detectedLocale);
            }
            return s11;
          }(this[M].url.pathname, { nextConfig: this[M].options.nextConfig, parseData: true, i18nProvider: this[M].options.i18nProvider }), a10 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[M].url, this[M].options.headers);
          this[M].domainLocale = this[M].options.i18nProvider ? this[M].options.i18nProvider.detectDomainLocale(a10) : function(e11, t11, r11) {
            if (e11) {
              for (let i11 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === i11.domain?.split(":", 1)[0].toLowerCase() || r11 === i11.defaultLocale.toLowerCase() || i11.locales?.some((e12) => e12.toLowerCase() === r11)) return i11;
            }
          }(null == (t10 = this[M].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, a10);
          let o3 = (null == (r10 = this[M].domainLocale) ? void 0 : r10.defaultLocale) || (null == (n10 = this[M].options.nextConfig) || null == (i10 = n10.i18n) ? void 0 : i10.defaultLocale);
          this[M].url.pathname = s10.pathname, this[M].defaultLocale = o3, this[M].basePath = s10.basePath ?? "", this[M].buildId = s10.buildId, this[M].locale = s10.locale ?? o3, this[M].trailingSlash = s10.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, i10) {
            if (!t11 || t11 === r10) return e11;
            let n10 = e11.toLowerCase();
            return !i10 && (R(n10, "/api") || R(n10, `/${t11.toLowerCase()}`)) ? e11 : C(e11, `/${t11}`);
          }((e10 = { basePath: this[M].basePath, buildId: this[M].buildId, defaultLocale: this[M].options.forceLocale ? void 0 : this[M].defaultLocale, locale: this[M].locale, pathname: this[M].url.pathname, trailingSlash: this[M].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = x(t10)), e10.buildId && (t10 = P(C(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = C(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : P(t10, "/") : x(t10);
        }
        formatSearch() {
          return this[M].url.search;
        }
        get buildId() {
          return this[M].buildId;
        }
        set buildId(e10) {
          this[M].buildId = e10;
        }
        get locale() {
          return this[M].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[M].locale || !(null == (r10 = this[M].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[M].locale = e10;
        }
        get defaultLocale() {
          return this[M].defaultLocale;
        }
        get domainLocale() {
          return this[M].domainLocale;
        }
        get searchParams() {
          return this[M].url.searchParams;
        }
        get host() {
          return this[M].url.host;
        }
        set host(e10) {
          this[M].url.host = e10;
        }
        get hostname() {
          return this[M].url.hostname;
        }
        set hostname(e10) {
          this[M].url.hostname = e10;
        }
        get port() {
          return this[M].url.port;
        }
        set port(e10) {
          this[M].url.port = e10;
        }
        get protocol() {
          return this[M].url.protocol;
        }
        set protocol(e10) {
          this[M].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[M].url = U(e10), this.analyze();
        }
        get origin() {
          return this[M].url.origin;
        }
        get pathname() {
          return this[M].url.pathname;
        }
        set pathname(e10) {
          this[M].url.pathname = e10;
        }
        get hash() {
          return this[M].url.hash;
        }
        set hash(e10) {
          this[M].url.hash = e10;
        }
        get search() {
          return this[M].url.search;
        }
        set search(e10) {
          this[M].url.search = e10;
        }
        get password() {
          return this[M].url.password;
        }
        set password(e10) {
          this[M].url.password = e10;
        }
        get username() {
          return this[M].url.username;
        }
        set username(e10) {
          this[M].url.username = e10;
        }
        get basePath() {
          return this[M].basePath;
        }
        set basePath(e10) {
          this[M].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new q(String(this), this[M].options);
        }
      }
      e.i(65664);
      var L, D = e.i(28042);
      let j = Symbol("internal request");
      class B extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          b(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const i10 = new q(r10, { headers: v(this.headers), nextConfig: t10.nextConfig });
          this[j] = { cookies: new D.RequestCookies(this.headers), nextUrl: i10, url: i10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[j].cookies;
        }
        get nextUrl() {
          return this[j].nextUrl;
        }
        get page() {
          throw new f();
        }
        get ua() {
          throw new g();
        }
        get url() {
          return this[j].url;
        }
      }
      var $ = e.i(17536);
      let z = Symbol("internal response"), K = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function H(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [i10, n10] of e10.request.headers) t10.set("x-middleware-request-" + i10, n10), r11.push(i10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class J extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, i10 = new Proxy(new D.ResponseCookies(r10), { get(e11, i11, n10) {
            switch (i11) {
              case "delete":
              case "set":
                return (...n11) => {
                  let s10 = Reflect.apply(e11[i11], e11, n11), a10 = new Headers(r10);
                  return s10 instanceof D.ResponseCookies && r10.set("x-middleware-set-cookie", s10.getAll().map((e12) => (0, D.stringifyCookie)(e12)).join(",")), H(t10, a10), s10;
                };
              default:
                return $.ReflectAdapter.get(e11, i11, n10);
            }
          } });
          this[z] = { cookies: i10, url: t10.url ? new q(t10.url, { headers: v(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[z].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new J(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!K.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let i10 = "object" == typeof t10 ? t10 : {}, n10 = new Headers(null == i10 ? void 0 : i10.headers);
          return n10.set("Location", b(e10)), new J(null, { ...i10, headers: n10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", b(e10)), H(t10, r10), new J(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), H(e10, t10), new J(null, { ...e10, headers: t10 });
        }
      }
      function V(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, i10 = new URL(e10, t10), n10 = i10.origin === r10.origin;
        return { url: n10 ? i10.toString().slice(r10.origin.length) : i10.toString(), isRelative: n10 };
      }
      var F = e.i(24628);
      F.NEXT_RSC_UNION_QUERY;
      var W = e.i(48047), G = e.i(53065), X = ((am = X || {}).handleRequest = "BaseServer.handleRequest", am.run = "BaseServer.run", am.pipe = "BaseServer.pipe", am.getStaticHTML = "BaseServer.getStaticHTML", am.render = "BaseServer.render", am.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", am.renderToResponse = "BaseServer.renderToResponse", am.renderToHTML = "BaseServer.renderToHTML", am.renderError = "BaseServer.renderError", am.renderErrorToResponse = "BaseServer.renderErrorToResponse", am.renderErrorToHTML = "BaseServer.renderErrorToHTML", am.render404 = "BaseServer.render404", am), Y = ((ay = Y || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", ay.loadComponents = "LoadComponents.loadComponents", ay), Q = ((a_ = Q || {}).getRequestHandler = "NextServer.getRequestHandler", a_.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", a_.getServer = "NextServer.getServer", a_.getServerRequestHandler = "NextServer.getServerRequestHandler", a_.createServer = "createServer.createServer", a_), Z = ((av = Z || {}).compression = "NextNodeServer.compression", av.getBuildId = "NextNodeServer.getBuildId", av.createComponentTree = "NextNodeServer.createComponentTree", av.clientComponentLoading = "NextNodeServer.clientComponentLoading", av.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", av.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", av.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", av.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", av.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", av.sendRenderResult = "NextNodeServer.sendRenderResult", av.proxyRequest = "NextNodeServer.proxyRequest", av.runApi = "NextNodeServer.runApi", av.render = "NextNodeServer.render", av.renderHTML = "NextNodeServer.renderHTML", av.imageOptimizer = "NextNodeServer.imageOptimizer", av.getPagePath = "NextNodeServer.getPagePath", av.getRoutesManifest = "NextNodeServer.getRoutesManifest", av.findPageComponents = "NextNodeServer.findPageComponents", av.getFontManifest = "NextNodeServer.getFontManifest", av.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", av.getRequestHandler = "NextNodeServer.getRequestHandler", av.renderToHTML = "NextNodeServer.renderToHTML", av.renderError = "NextNodeServer.renderError", av.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", av.render404 = "NextNodeServer.render404", av.startResponse = "NextNodeServer.startResponse", av.route = "route", av.onProxyReq = "onProxyReq", av.apiResolver = "apiResolver", av.internalFetch = "internalFetch", av), ee = ((ab = ee || {}).startServer = "startServer.startServer", ab), et = ((aw = et || {}).getServerSideProps = "Render.getServerSideProps", aw.getStaticProps = "Render.getStaticProps", aw.renderToString = "Render.renderToString", aw.renderDocument = "Render.renderDocument", aw.createBodyResult = "Render.createBodyResult", aw), er = ((ak = er || {}).renderToString = "AppRender.renderToString", ak.renderToReadableStream = "AppRender.renderToReadableStream", ak.getBodyResult = "AppRender.getBodyResult", ak.fetch = "AppRender.fetch", ak), ei = ((aS = ei || {}).executeRoute = "Router.executeRoute", aS), en = ((aE = en || {}).runHandler = "Node.runHandler", aE), es = ((aT = es || {}).runHandler = "AppRouteRouteHandlers.runHandler", aT), ea = ((ax = ea || {}).generateMetadata = "ResolveMetadata.generateMetadata", ax.generateViewport = "ResolveMetadata.generateViewport", ax), eo = ((aO = eo || {}).execute = "Middleware.execute", aO);
      let el = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), ec = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eu(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let ed = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eh, propagation: ep, trace: ef, SpanStatusCode: eg, SpanKind: em, ROOT_CONTEXT: ey } = t = e.r(59110);
      class e_ extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let ev = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof e_ && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eg.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eb = /* @__PURE__ */ new Map(), ew = t.createContextKey("next.rootSpanId"), ek = 0, eS = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, eE = (r = new class e {
        getTracerInstance() {
          return ef.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eh;
        }
        getTracePropagationData() {
          let e10 = eh.active(), t10 = [];
          return ep.inject(e10, t10, eS), t10;
        }
        getActiveScopeSpan() {
          return ef.getSpan(null == eh ? void 0 : eh.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let i10 = eh.active();
          if (ef.getSpanContext(i10)) return t10();
          let n10 = ep.extract(i10, e10, r10);
          return eh.with(n10, t10);
        }
        trace(...e10) {
          let [t10, r10, i10] = e10, { fn: n10, options: s10 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: i10, options: { ...r10 } }, a10 = s10.spanName ?? t10;
          if (!el.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || s10.hideSpan) return n10();
          let o3 = this.getSpanContext((null == s10 ? void 0 : s10.parentSpan) ?? this.getActiveScopeSpan());
          o3 || (o3 = (null == eh ? void 0 : eh.active()) ?? ey);
          let l2 = o3.getValue(ew), c2 = "number" != typeof l2 || !eb.has(l2), u2 = ek++;
          return s10.attributes = { "next.span_name": a10, "next.span_type": t10, ...s10.attributes }, eh.with(o3.setValue(ew, u2), () => this.getTracerInstance().startActiveSpan(a10, s10, (e11) => {
            let r11;
            ed && t10 && ec.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let i11 = false, a11 = () => {
              !i11 && (i11 = true, eb.delete(u2), r11 && performance.measure(`${ed}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (c2 && eb.set(u2, new Map(Object.entries(s10.attributes ?? {}))), n10.length > 1) try {
              return n10(e11, (t11) => ev(e11, t11));
            } catch (t11) {
              throw ev(e11, t11), t11;
            } finally {
              a11();
            }
            try {
              let t11 = n10(e11);
              if (eu(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw ev(e11, t12), t12;
              }).finally(a11);
              return e11.end(), a11(), t11;
            } catch (t11) {
              throw ev(e11, t11), a11(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, i10, n10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return el.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = i10;
            "function" == typeof e11 && "function" == typeof n10 && (e11 = e11.apply(this, arguments));
            let s10 = arguments.length - 1, a10 = arguments[s10];
            if ("function" != typeof a10) return t10.trace(r10, e11, () => n10.apply(this, arguments));
            {
              let i11 = t10.getContext().bind(eh.active(), a10);
              return t10.trace(r10, e11, (e12, t11) => (arguments[s10] = function(e13) {
                return null == t11 || t11(e13), i11.apply(this, arguments);
              }, n10.apply(this, arguments)));
            }
          } : n10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, i10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, i10);
        }
        getSpanContext(e10) {
          return e10 ? ef.setSpan(eh.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eh.active().getValue(ew);
          return eb.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eh.active().getValue(ew), i10 = eb.get(r10);
          i10 && !i10.has(e10) && i10.set(e10, t10);
        }
      }(), () => r), eT = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eT);
      class ex {
        constructor(e10, t10, r10, i10) {
          var n10;
          const s10 = e10 && function(e11, t11) {
            let r11 = W.HeadersAdapter.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a10 = null == (n10 = r10.get(eT)) ? void 0 : n10.value;
          this._isEnabled = !!(!s10 && a10 && e10 && a10 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = i10;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eT, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eT, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function eO(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], i10 = new Headers();
          for (let e11 of _(r10)) i10.append("set-cookie", e11);
          for (let e11 of new D.ResponseCookies(i10).getAll()) t10.set(e11);
        }
      }
      e.i(53835);
      var eC = e.i(82453), eP = e.i(99734), eR = e.i(25753);
      e.i(7754);
      var eI = e.i(90460);
      e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE && ((e10, ...t10) => {
        console.log(`use-cache: ${e10}`, ...t10);
      }), Symbol.for("@next/cache-handlers");
      let eN = Symbol.for("@next/cache-handlers-map"), eA = Symbol.for("@next/cache-handlers-set"), eU = globalThis;
      function eM() {
        if (eU[eN]) return eU[eN].entries();
      }
      async function eq(e10, t10) {
        if (!e10) return t10();
        let r10 = eL(e10);
        try {
          return await t10();
        } finally {
          var i10, n10;
          let t11, s10, a10 = (i10 = r10, n10 = eL(e10), t11 = new Set(i10.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), s10 = new Set(i10.pendingRevalidateWrites), { pendingRevalidatedTags: n10.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(n10.pendingRevalidates).filter(([e11]) => !(e11 in i10.pendingRevalidates))), pendingRevalidateWrites: n10.pendingRevalidateWrites.filter((e11) => !s10.has(e11)) });
          await ej(e10, a10);
        }
      }
      function eL(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function eD(e10, t10, r10) {
        if (0 === e10.length) return;
        let i10 = function() {
          if (eU[eA]) return eU[eA].values();
        }(), n10 = [], s10 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of s10) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let i11 = e11 || r11;
          s10.has(i11) || s10.set(i11, []), s10.get(i11).push(t11.tag);
        }
        for (let [e11, o3] of s10) {
          let s11;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var a10;
              if (!(t11 = null == r10 || null == (a10 = r10.cacheLifeProfiles) ? void 0 : a10[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (s11 = { expire: t11.expire });
          }
          for (let t11 of i10 || []) e11 ? n10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o3, s11)) : n10.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o3));
          t10 && n10.push(t10.revalidateTag(o3, s11));
        }
        await Promise.all(n10);
      }
      async function ej(e10, t10) {
        let r10 = (null == t10 ? void 0 : t10.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], i10 = (null == t10 ? void 0 : t10.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, n10 = (null == t10 ? void 0 : t10.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([eD(r10, e10.incrementalCache, e10), ...Object.values(i10), ...n10]);
      }
      var eB = e.i(90044);
      e.i(44789);
      var e$ = e.i(69487);
      class ez {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new eP.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eu(e10)) this.waitUntil || eK(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          this.waitUntil || eK();
          let t10 = eC.workUnitAsyncStorage.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = e$.afterTaskAsyncStorage.getStore(), i10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let n10 = (0, eB.bindSnapshot)(async () => {
            try {
              await e$.afterTaskAsyncStorage.run({ rootTaskSpawnPhase: i10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(n10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eI.workAsyncStorage.getStore();
          if (!e10) throw Object.defineProperty(new eR.InvariantError("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return eq(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eR.InvariantError("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function eK() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function eH(e10) {
        let t10, r10 = { then: (i10, n10) => (t10 || (t10 = e10()), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(i10, n10)) };
        return r10;
      }
      class eJ {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function eV() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let eF = Symbol.for("@next/request-context");
      async function eW(e10, t10, r10) {
        let i10 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let i11 = r11.slice(0, e12).join("/");
              i11 && (i11.endsWith("/page") || i11.endsWith("/route") || (i11 = `${i11}${!i11.endsWith("/") ? "/" : ""}layout`), t12.push(i11));
            }
          }
          return t12;
        })(e10)) t11 = `${m}${t11}`, i10.add(t11);
        if (t10.pathname && (!r10 || 0 === r10.size)) {
          let e11 = `${m}${t10.pathname}`;
          i10.add(e11);
        }
        i10.has(`${m}/`) && i10.add(`${m}/index`), i10.has(`${m}/index`) && i10.add(`${m}/`);
        let n10 = Array.from(i10);
        return { tags: n10, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = eM();
          if (r11) for (let [i11, n11] of r11) "getExpiration" in n11 && t11.set(i11, eH(async () => n11.getExpiration(e11)));
          return t11;
        }(n10) };
      }
      class eG extends B {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new p({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new p({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new p({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let eX = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, eY = (e10, t10) => eE().withPropagatedContext(e10.headers, t10, eX), eQ = false;
      async function eZ(t10) {
        var r10, i10, n10, s10;
        let a10, o3, l2, c2, u2;
        !function() {
          if (!eQ && (eQ = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), eY = r11(eY);
          }
        }(), await d();
        let h2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let p2 = t10.bypassNextUrl ? new URL(t10.request.url) : new q(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...p2.searchParams.keys()]) {
          let t11 = p2.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (p2.searchParams.delete(r11), t11)) p2.searchParams.append(r11, e11);
            p2.searchParams.delete(e10);
          }
        }
        let f2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p2 && (f2 = p2.buildId || "", p2.buildId = "");
        let g2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, i11] of Object.entries(e10)) for (let e11 of Array.isArray(i11) ? i11 : [i11]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), m2 = g2.has("x-nextjs-data"), y2 = "1" === g2.get(F.RSC_HEADER);
        m2 && "/index" === p2.pathname && (p2.pathname = "/");
        let _2 = /* @__PURE__ */ new Map();
        if (!h2) for (let e10 of F.FLIGHT_HEADERS) {
          let t11 = g2.get(e10);
          null !== t11 && (_2.set(e10, t11), g2.delete(e10));
        }
        let v2 = p2.searchParams.get(F.NEXT_RSC_UNION_QUERY), b2 = new eG({ page: t10.page, input: ((c2 = (l2 = "string" == typeof p2) ? new URL(p2) : p2).searchParams.delete(F.NEXT_RSC_UNION_QUERY), l2 ? c2.toString() : c2).toString(), init: { body: t10.request.body, headers: g2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        m2 && Object.defineProperty(b2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: eV() }) }));
        let w2 = t10.request.waitUntil ?? (null == (r10 = null == (u2 = globalThis[eF]) ? void 0 : u2.get()) ? void 0 : r10.waitUntil), k2 = new T({ request: b2, page: t10.page, context: w2 ? { waitUntil: w2 } : void 0 });
        if ((a10 = await eY(b2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = k2.waitUntil.bind(k2), r11 = new eJ();
            return eE().trace(eo.execute, { spanName: `middleware ${b2.method}`, attributes: { "http.target": b2.nextUrl.pathname, "http.method": b2.method } }, async () => {
              try {
                var i11, n11, s11, a11, l3, c3;
                let u3 = eV(), d2 = await eW("/", b2.nextUrl, null), h3 = (l3 = b2.nextUrl, c3 = (e11) => {
                  o3 = e11;
                }, function(e11, t11, r12, i12, n12, s12, a12, o4, l4, c4, u4, d3) {
                  function h4(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let p4 = {};
                  return { type: "request", phase: e11, implicitTags: s12, url: { pathname: i12.pathname, search: i12.search ?? "" }, rootParams: n12, get headers() {
                    return p4.headers || (p4.headers = function(e12) {
                      let t12 = W.HeadersAdapter.from(e12);
                      for (let e13 of F.FLIGHT_HEADERS) t12.delete(e13);
                      return W.HeadersAdapter.seal(t12);
                    }(t11.headers)), p4.headers;
                  }, get cookies() {
                    if (!p4.cookies) {
                      let e12 = new D.RequestCookies(W.HeadersAdapter.from(t11.headers));
                      eO(t11, e12), p4.cookies = G.RequestCookiesAdapter.seal(e12);
                    }
                    return p4.cookies;
                  }, set cookies(value) {
                    p4.cookies = value;
                  }, get mutableCookies() {
                    if (!p4.mutableCookies) {
                      var f3, g3;
                      let e12, i13 = (f3 = t11.headers, g3 = a12 || (r12 ? h4 : void 0), e12 = new D.RequestCookies(W.HeadersAdapter.from(f3)), G.MutableRequestCookiesAdapter.wrap(e12, g3));
                      eO(t11, i13), p4.mutableCookies = i13;
                    }
                    return p4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return p4.userspaceMutableCookies || (p4.userspaceMutableCookies = (0, G.createCookiesWithMutableAccessCheck)(this)), p4.userspaceMutableCookies;
                  }, get draftMode() {
                    return p4.draftMode || (p4.draftMode = new ex(l4, t11, this.cookies, this.mutableCookies)), p4.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: c4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                }("action", b2, void 0, l3, {}, d2, c3, null, u3, false, void 0, null)), p3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: i12, previouslyRevalidatedTags: n12, nonce: s12 }) {
                  var a12;
                  let o4 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l4 = t11.dev ?? false, c4 = l4 || o4 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), u4 = { isStaticGeneration: o4, page: e11, route: (a12 = e11.split("/").reduce((e12, t12, r13, i13) => t12 ? "(" === t12[0] && t12.endsWith(")") || "@" === t12[0] || ("page" === t12 || "route" === t12) && r13 === i13.length - 1 ? e12 : `${e12}/${t12}` : e12, "")).startsWith("/") ? a12 : `/${a12}`, incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.nextExport, hasReadableErrorStacks: t11.hasReadableErrorStacks, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: i12, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: s12, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: i13 } = e12;
                    return new ez({ waitUntil: t12, onClose: r13, onTaskError: i13 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, dev: l4, previouslyRevalidatedTags: n12, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = eM();
                    if (t12) for (let [r13, i13] of t12) "refreshTags" in i13 && e12.set(r13, eH(async () => i13.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: (0, eB.createSnapshot)(), shouldTrackFetchMetrics: c4 };
                  return t11.store = u4, u4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (n11 = t10.request.nextConfig) || null == (i11 = n11.experimental) ? void 0 : i11.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (a11 = t10.request.nextConfig) || null == (s11 = a11.experimental) ? void 0 : s11.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === b2.headers.get(F.NEXT_ROUTER_PREFETCH_HEADER), buildId: f2 ?? "", previouslyRevalidatedTags: [] });
                return await eI.workAsyncStorage.run(p3, () => eC.workUnitAsyncStorage.run(h3, t10.handler, b2, k2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(b2, k2);
        })) && !(a10 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        a10 && o3 && a10.headers.set("set-cookie", o3);
        let E2 = null == a10 ? void 0 : a10.headers.get("x-middleware-rewrite");
        if (a10 && E2 && (y2 || !h2)) {
          let e10 = new q(E2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          h2 || e10.host !== b2.nextUrl.host || (e10.buildId = f2 || e10.buildId, a10.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: o4 } = V(e10.toString(), p2.toString());
          !h2 && m2 && a10.headers.set("x-nextjs-rewrite", r11);
          let l3 = !o4 && (null == (s10 = t10.request.nextConfig) || null == (n10 = s10.experimental) || null == (i10 = n10.clientParamParsingOrigins) ? void 0 : i10.some((t11) => new RegExp(t11).test(e10.origin)));
          y2 && (o4 || l3) && (p2.pathname !== e10.pathname && a10.headers.set(F.NEXT_REWRITTEN_PATH_HEADER, e10.pathname), p2.search !== e10.search && a10.headers.set(F.NEXT_REWRITTEN_QUERY_HEADER, e10.search.slice(1)));
        }
        if (a10 && E2 && y2 && v2) {
          let e10 = new URL(E2);
          e10.searchParams.has(F.NEXT_RSC_UNION_QUERY) || (e10.searchParams.set(F.NEXT_RSC_UNION_QUERY, v2), a10.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let x2 = null == a10 ? void 0 : a10.headers.get("Location");
        if (a10 && x2 && !h2) {
          let e10 = new q(x2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          a10 = new Response(a10.body, a10), e10.host === p2.host && (e10.buildId = f2 || e10.buildId, a10.headers.set("Location", e10.toString())), m2 && (a10.headers.delete("Location"), a10.headers.set("x-nextjs-redirect", V(e10.toString(), p2.toString()).url));
        }
        let O2 = a10 || J.next(), C2 = O2.headers.get("x-middleware-override-headers"), P2 = [];
        if (C2) {
          for (let [e10, t11] of _2) O2.headers.set(`x-middleware-request-${e10}`, t11), P2.push(e10);
          P2.length > 0 && O2.headers.set("x-middleware-override-headers", C2 + "," + P2.join(","));
        }
        return { response: O2, waitUntil: ("internal" === k2[S].kind ? Promise.all(k2[S].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: b2.fetchMetrics };
      }
      let e0 = () => {
        try {
          return true;
        } catch {
        }
        return false;
      }, e1 = /* @__PURE__ */ new Set(), e2 = (e10, t10, r10) => {
        let i10 = e0(), n10 = r10 ?? e10;
        e1.has(n10) || i10 || (e1.add(n10), console.warn(`Clerk - DEPRECATION WARNING: "${e10}" is deprecated and will be removed in the next major release.
${t10}`));
      }, e4 = [".lcl.dev", ".lclstage.dev", ".lclclerk.com"], e5 = [".accounts.dev", ".accountsstage.dev", ".accounts.lclclerk.com"], e3 = [".lcl.dev", ".stg.dev", ".lclstage.dev", ".stgstage.dev", ".dev.lclclerk.com", ".stg.lclclerk.com", ".accounts.lclclerk.com", "accountsstage.dev", "accounts.dev"], e6 = "https://api.clerk.com", e8 = (t10) => "undefined" != typeof atob && "function" == typeof atob ? atob(t10) : e.g.Buffer ? new e.g.Buffer(t10, "base64").toString() : t10, e9 = "pk_live_";
      function e7(e10) {
        if (!e10.endsWith("$")) return false;
        let t10 = e10.slice(0, -1);
        return !t10.includes("$") && t10.includes(".");
      }
      function te(e10, t10 = {}) {
        let r10;
        if (!(e10 = e10 || "") || !tt(e10)) {
          if (t10.fatal && !e10) throw Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
          if (t10.fatal && !tt(e10)) throw Error("Publishable key not valid.");
          return null;
        }
        let i10 = e10.startsWith(e9) ? "production" : "development";
        try {
          r10 = e8(e10.split("_")[2]);
        } catch {
          if (t10.fatal) throw Error("Publishable key not valid: Failed to decode key.");
          return null;
        }
        if (!e7(r10)) {
          if (t10.fatal) throw Error("Publishable key not valid: Decoded key has invalid format.");
          return null;
        }
        let n10 = r10.slice(0, -1);
        return t10.proxyUrl ? n10 = t10.proxyUrl : "development" !== i10 && t10.domain && t10.isSatellite && (n10 = `clerk.${t10.domain}`), { instanceType: i10, frontendApi: n10 };
      }
      function tt(e10 = "") {
        try {
          if (!(e10.startsWith(e9) || e10.startsWith("pk_test_"))) return false;
          let t10 = e10.split("_");
          if (3 !== t10.length) return false;
          let r10 = t10[2];
          if (!r10) return false;
          return e7(e8(r10));
        } catch {
          return false;
        }
      }
      function tr(e10) {
        return e10.startsWith("test_") || e10.startsWith("sk_test_");
      }
      async function ti(t10, r10 = globalThis.crypto.subtle) {
        var i10;
        let n10 = new TextEncoder().encode(t10);
        return (i10 = String.fromCharCode(...new Uint8Array(await r10.digest("sha-1", n10))), "undefined" != typeof btoa && "function" == typeof btoa ? btoa(i10) : e.g.Buffer ? new e.g.Buffer(i10).toString("base64") : i10).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
      }
      let tn = { initialDelay: 125, maxDelayBetweenRetries: 0, factor: 2, shouldRetry: (e10, t10) => t10 < 5, retryImmediately: false, jitter: true }, ts = async (e10) => new Promise((t10) => setTimeout(t10, e10)), ta = (e10, t10) => t10 ? e10 * (1 + Math.random()) : e10, to = async (e10, t10 = {}) => {
        var r10;
        let i10, n10 = 0, { shouldRetry: s10, initialDelay: a10, maxDelayBetweenRetries: o3, factor: l2, retryImmediately: c2, jitter: u2, onBeforeRetry: d2 } = { ...tn, ...t10 }, h2 = (r10 = { initialDelay: a10, maxDelayBetweenRetries: o3, factor: l2, jitter: u2 }, i10 = 0, async () => {
          let e11;
          await ts((e11 = ta(e11 = r10.initialDelay * Math.pow(r10.factor, i10), r10.jitter), Math.min(r10.maxDelayBetweenRetries || e11, e11))), i10++;
        });
        for (; ; ) try {
          return await e10();
        } catch (e11) {
          if (!s10(e11, ++n10)) throw e11;
          d2 && await d2(n10), c2 && 1 === n10 ? await ts(ta(100, u2)) : await h2();
        }
      };
      function tl(e10) {
        return function(t10) {
          let r10 = t10 ?? this;
          if (!r10) throw TypeError(`${e10.kind || e10.name} type guard requires an error object`);
          return r10 instanceof e10;
        };
      }
      var tc = class {
        static kind = "ClerkApiError";
        code;
        message;
        longMessage;
        meta;
        constructor(e10) {
          const t10 = { code: e10.code, message: e10.message, longMessage: e10.long_message, meta: { paramName: e10.meta?.param_name, sessionId: e10.meta?.session_id, emailAddresses: e10.meta?.email_addresses, identifiers: e10.meta?.identifiers, zxcvbn: e10.meta?.zxcvbn, plan: e10.meta?.plan, isPlanUpgradePossible: e10.meta?.is_plan_upgrade_possible } };
          this.code = t10.code, this.message = t10.message, this.longMessage = t10.longMessage, this.meta = t10.meta;
        }
      };
      function tu(e10) {
        return new tc(e10);
      }
      tl(tc);
      var td = class e10 extends Error {
        static kind = "ClerkError";
        clerkError = true;
        code;
        longMessage;
        docsUrl;
        cause;
        get name() {
          return this.constructor.name;
        }
        constructor(t10) {
          super(new.target.formatMessage(new.target.kind, t10.message, t10.code, t10.docsUrl), { cause: t10.cause }), Object.setPrototypeOf(this, e10.prototype), this.code = t10.code, this.docsUrl = t10.docsUrl, this.longMessage = t10.longMessage, this.cause = t10.cause;
        }
        toString() {
          return `[${this.name}]
Message:${this.message}`;
        }
        static formatMessage(e11, t10, r10, i10) {
          let n10 = "Clerk:", s10 = RegExp(n10.replace(" ", "\\s*"), "i");
          return t10 = t10.replace(s10, ""), t10 = `${n10} ${t10.trim()}

(code="${r10}")

`, i10 && (t10 += `

Docs: ${i10}`), t10;
        }
      }, th = class e10 extends td {
        static kind = "ClerkAPIResponseError";
        status;
        clerkTraceId;
        retryAfter;
        errors;
        constructor(t10, r10) {
          const { data: i10, status: n10, clerkTraceId: s10, retryAfter: a10 } = r10;
          super({ ...r10, message: t10, code: "api_response_error" }), Object.setPrototypeOf(this, e10.prototype), this.status = n10, this.clerkTraceId = s10, this.retryAfter = a10, this.errors = (i10 || []).map((e11) => new tc(e11));
        }
        toString() {
          let e11 = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e12) => JSON.stringify(e12))}`;
          return this.clerkTraceId && (e11 += `
Clerk Trace ID: ${this.clerkTraceId}`), e11;
        }
        static formatMessage(e11, t10, r10, i10) {
          return t10;
        }
      };
      tl(th);
      let tp = Object.freeze({ InvalidProxyUrlErrorMessage: "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})", InvalidPublishableKeyErrorMessage: "The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})", MissingPublishableKeyErrorMessage: "Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingSecretKeyErrorMessage: "Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingClerkProvider: "{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider" });
      function tf({ packageName: e10, customMessages: t10 }) {
        let r10 = e10;
        function i10(e11, t11) {
          if (!t11) return `${r10}: ${e11}`;
          let i11 = e11;
          for (let r11 of e11.matchAll(/{{([a-zA-Z0-9-_]+)}}/g)) {
            let e12 = (t11[r11[1]] || "").toString();
            i11 = i11.replace(`{{${r11[1]}}}`, e12);
          }
          return `${r10}: ${i11}`;
        }
        let n10 = { ...tp, ...t10 };
        return { setPackageName({ packageName: e11 }) {
          return "string" == typeof e11 && (r10 = e11), this;
        }, setMessages({ customMessages: e11 }) {
          return Object.assign(n10, e11 || {}), this;
        }, throwInvalidPublishableKeyError(e11) {
          throw Error(i10(n10.InvalidPublishableKeyErrorMessage, e11));
        }, throwInvalidProxyUrl(e11) {
          throw Error(i10(n10.InvalidProxyUrlErrorMessage, e11));
        }, throwMissingPublishableKeyError() {
          throw Error(i10(n10.MissingPublishableKeyErrorMessage));
        }, throwMissingSecretKeyError() {
          throw Error(i10(n10.MissingSecretKeyErrorMessage));
        }, throwMissingClerkProviderError(e11) {
          throw Error(i10(n10.MissingClerkProvider, e11));
        }, throw(e11) {
          throw Error(i10(e11));
        } };
      }
      tl(class e10 extends td {
        static kind = "ClerkRuntimeError";
        clerkRuntimeError = true;
        constructor(t10, r10) {
          super({ ...r10, message: t10 }), Object.setPrototypeOf(this, e10.prototype);
        }
      });
      var tg = tf({ packageName: "@clerk/backend" }), { isDevOrStagingUrl: tm } = (i = /* @__PURE__ */ new Map(), { isDevOrStagingUrl: (e10) => {
        if (!e10) return false;
        let t10 = "string" == typeof e10 ? e10 : e10.hostname, r10 = i.get(t10);
        return void 0 === r10 && (r10 = e3.some((e11) => t10.endsWith(e11)), i.set(t10, r10)), r10;
      } }), ty = "token-expired", t_ = "token-invalid", tv = "token-invalid-signature", tb = "token-not-active-yet", tw = "token-iat-in-the-future", tk = "token-verification-failed", tS = "jwk-remote-failed-to-load", tE = "jwk-failed-to-resolve", tT = "Contact support@clerk.com", tx = "Make sure that this is a valid Clerk-generated JWT.", tO = "Set the CLERK_JWT_KEY environment variable.", tC = class e10 extends Error {
        constructor({ action: t10, message: r10, reason: i10 }) {
          super(r10), Object.setPrototypeOf(this, e10.prototype), this.reason = i10, this.message = r10, this.action = t10;
        }
        getFullMessage() {
          return `${[this.message, this.action].filter((e11) => e11).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
        }
      }, tP = "token-invalid", tR = "unexpected-error", tI = "token-verification-failed", tN = class e10 extends Error {
        constructor({ message: t10, code: r10, status: i10, action: n10 }) {
          super(t10), Object.setPrototypeOf(this, e10.prototype), this.code = r10, this.status = i10, this.action = n10;
        }
        getFullMessage() {
          return `${this.message} (code=${this.code}, status=${this.status || "n/a"})`;
        }
      };
      let tA = crypto;
      var tU = fetch.bind(globalThis), tM = { crypto: tA, get fetch() {
        return tU;
      }, AbortController: globalThis.AbortController, Blob: globalThis.Blob, FormData: globalThis.FormData, Headers: globalThis.Headers, Request: globalThis.Request, Response: globalThis.Response }, tq = (e10, t10) => function(e11, t11, r10 = {}) {
        if (!t11.codes) {
          t11.codes = {};
          for (let e12 = 0; e12 < t11.chars.length; ++e12) t11.codes[t11.chars[e12]] = e12;
        }
        if (!r10.loose && e11.length * t11.bits & 7) throw SyntaxError("Invalid padding");
        let i10 = e11.length;
        for (; "=" === e11[i10 - 1]; ) if (--i10, !r10.loose && !((e11.length - i10) * t11.bits & 7)) throw SyntaxError("Invalid padding");
        let n10 = new (r10.out ?? Uint8Array)(i10 * t11.bits / 8 | 0), s10 = 0, a10 = 0, o3 = 0;
        for (let r11 = 0; r11 < i10; ++r11) {
          let i11 = t11.codes[e11[r11]];
          if (void 0 === i11) throw SyntaxError("Invalid character " + e11[r11]);
          a10 = a10 << t11.bits | i11, (s10 += t11.bits) >= 8 && (s10 -= 8, n10[o3++] = 255 & a10 >> s10);
        }
        if (s10 >= t11.bits || 255 & a10 << 8 - s10) throw SyntaxError("Unexpected end of data");
        return n10;
      }(e10, tL, t10), tL = { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bits: 6 }, tD = { RS256: "SHA-256", RS384: "SHA-384", RS512: "SHA-512" }, tj = "RSASSA-PKCS1-v1_5", tB = { RS256: tj, RS384: tj, RS512: tj }, t$ = Object.keys(tD), tz = (e10, t10 = "JWT") => {
        if (void 0 === e10) return;
        let r10 = Array.isArray(t10) ? t10 : [t10];
        if (!r10.includes(e10)) throw new tC({ action: tx, reason: t_, message: `Invalid JWT type ${JSON.stringify(e10)}. Expected "${r10.join(", ")}".` });
      }, tK = (e10) => {
        if (!t$.includes(e10)) throw new tC({ action: tx, reason: "token-invalid-algorithm", message: `Invalid JWT algorithm ${JSON.stringify(e10)}. Supported: ${t$}.` });
      };
      async function tH(e10, t10) {
        let { header: r10, signature: i10, raw: n10 } = e10, s10 = new TextEncoder().encode([n10.header, n10.payload].join(".")), a10 = function(e11) {
          let t11 = tD[e11], r11 = tB[e11];
          if (!t11 || !r11) throw Error(`Unsupported algorithm ${e11}, expected one of ${t$.join(",")}.`);
          return { hash: { name: tD[e11] }, name: tB[e11] };
        }(r10.alg);
        try {
          let e11 = await function(e12, t11, r11) {
            if ("object" == typeof e12) return tM.crypto.subtle.importKey("jwk", e12, t11, false, [r11]);
            let i11 = function(e13) {
              let t12 = e8(e13.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "")), r12 = new Uint8Array(new ArrayBuffer(t12.length));
              for (let e14 = 0, i12 = t12.length; e14 < i12; e14++) r12[e14] = t12.charCodeAt(e14);
              return r12;
            }(e12), n11 = "sign" === r11 ? "pkcs8" : "spki";
            return tM.crypto.subtle.importKey(n11, i11, t11, false, [r11]);
          }(t10, a10, "verify");
          return { data: await tM.crypto.subtle.verify(a10.name, e11, i10, s10) };
        } catch (e11) {
          return { errors: [new tC({ reason: tv, message: e11?.message })] };
        }
      }
      function tJ(e10) {
        let t10 = (e10 || "").toString().split(".");
        if (3 !== t10.length) return { errors: [new tC({ reason: t_, message: "Invalid JWT form. A JWT consists of three parts separated by dots." })] };
        let [r10, i10, n10] = t10, s10 = new TextDecoder(), a10 = JSON.parse(s10.decode(tq(r10, { loose: true }))), o3 = JSON.parse(s10.decode(tq(i10, { loose: true })));
        return { data: { header: a10, payload: o3, signature: tq(n10, { loose: true }), raw: { header: r10, payload: i10, signature: n10, text: e10 } } };
      }
      async function tV(e10, t10) {
        let { audience: r10, authorizedParties: i10, clockSkewInMs: n10, key: s10, headerType: a10 } = t10, o3 = n10 || 5e3, { data: l2, errors: c2 } = tJ(e10);
        if (c2) return { errors: c2 };
        let { header: u2, payload: d2 } = l2;
        try {
          let { typ: e11, alg: t11 } = u2;
          tz(e11, a10), tK(t11);
          let { azp: n11, sub: s11, aud: l3, iat: c3, exp: h3, nbf: p3 } = d2;
          if ("string" != typeof s11) throw new tC({ action: tx, reason: tk, message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(s11)}.` });
          ((e12, t12) => {
            let r11 = [t12].flat().filter((e13) => !!e13), i11 = [e12].flat().filter((e13) => !!e13);
            if (r11.length > 0 && i11.length > 0) {
              if ("string" == typeof e12) {
                if (!r11.includes(e12)) throw new tC({ action: tx, reason: tk, message: `Invalid JWT audience claim (aud) ${JSON.stringify(e12)}. Is not included in "${JSON.stringify(r11)}".` });
              } else if (Array.isArray(e12) && e12.length > 0 && e12.every((e13) => "string" == typeof e13) && !e12.some((e13) => r11.includes(e13))) throw new tC({ action: tx, reason: tk, message: `Invalid JWT audience claim array (aud) ${JSON.stringify(e12)}. Is not included in "${JSON.stringify(r11)}".` });
            }
          })([l3], [r10]);
          if (n11 && i10 && 0 !== i10.length && !i10.includes(n11)) throw new tC({ reason: "token-invalid-authorized-parties", message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(n11)}. Expected "${i10}".` });
          if ("number" != typeof h3) throw new tC({ action: tx, reason: tk, message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(h3)}. Expected number.` });
          let f2 = new Date(Date.now()), g2 = /* @__PURE__ */ new Date(0);
          if (g2.setUTCSeconds(h3), g2.getTime() <= f2.getTime() - o3) throw new tC({ reason: ty, message: `JWT is expired. Expiry date: ${g2.toUTCString()}, Current date: ${f2.toUTCString()}.` });
          ((e12, t12) => {
            if (void 0 === e12) return;
            if ("number" != typeof e12) throw new tC({ action: tx, reason: tk, message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(e12)}. Expected number.` });
            let r11 = new Date(Date.now()), i11 = /* @__PURE__ */ new Date(0);
            if (i11.setUTCSeconds(e12), i11.getTime() > r11.getTime() + t12) throw new tC({ reason: tb, message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${i11.toUTCString()}; Current date: ${r11.toUTCString()};` });
          })(p3, o3), ((e12, t12) => {
            if (void 0 === e12) return;
            if ("number" != typeof e12) throw new tC({ action: tx, reason: tk, message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(e12)}. Expected number.` });
            let r11 = new Date(Date.now()), i11 = /* @__PURE__ */ new Date(0);
            if (i11.setUTCSeconds(e12), i11.getTime() > r11.getTime() + t12) throw new tC({ reason: tw, message: `JWT issued at date claim (iat) is in the future. Issued at date: ${i11.toUTCString()}; Current date: ${r11.toUTCString()};` });
          })(c3, o3);
        } catch (e11) {
          return { errors: [e11] };
        }
        let { data: h2, errors: p2 } = await tH(l2, s10);
        return p2 ? { errors: [new tC({ action: tx, reason: tk, message: `Error verifying JWT signature. ${p2[0]}` })] } : h2 ? { data: d2 } : { errors: [new tC({ reason: tv, message: "JWT signature is invalid." })] };
      }
      var tF = (e10) => {
        throw TypeError(e10);
      }, tW = (e10, t10, r10) => (t10.has(e10) || tF("Cannot access private method"), r10);
      function tG(e10) {
        return e10 ? `https://${e10.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.")}` : "";
      }
      let tX = { strict_mfa: { afterMinutes: 10, level: "multi_factor" }, strict: { afterMinutes: 10, level: "second_factor" }, moderate: { afterMinutes: 60, level: "second_factor" }, lax: { afterMinutes: 1440, level: "second_factor" } }, tY = /* @__PURE__ */ new Set(["first_factor", "second_factor", "multi_factor"]), tQ = /* @__PURE__ */ new Set(["strict_mfa", "strict", "moderate", "lax"]), tZ = (e10, t10) => {
        let { org: r10, user: i10 } = t0(e10), [n10, s10] = t10.split(":"), a10 = s10 || n10;
        return "org" === n10 ? r10.includes(a10) : "user" === n10 ? i10.includes(a10) : [...r10, ...i10].includes(a10);
      }, t0 = (e10) => {
        let t10 = e10 ? e10.split(",").map((e11) => e11.trim()) : [];
        return { org: t10.filter((e11) => e11.split(":")[0].includes("o")).map((e11) => e11.split(":")[1]), user: t10.filter((e11) => e11.split(":")[0].includes("u")).map((e11) => e11.split(":")[1]) };
      };
      var t1 = e.i(42280);
      function t2(e10) {
        return e10.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }
      function t4(e10) {
        return e10 && e10.sensitive ? "" : "i";
      }
      function t5(e10, t10, r10) {
        var i10;
        return e10 instanceof RegExp ? function(e11, t11) {
          if (!t11) return e11;
          for (var r11 = /\((?:\?<(.*?)>)?(?!\?)/g, i11 = 0, n10 = r11.exec(e11.source); n10; ) t11.push({ name: n10[1] || i11++, prefix: "", suffix: "", modifier: "", pattern: "" }), n10 = r11.exec(e11.source);
          return e11;
        }(e10, t10) : Array.isArray(e10) ? (i10 = e10.map(function(e11) {
          return t5(e11, t10, r10).source;
        }), new RegExp("(?:".concat(i10.join("|"), ")"), t4(r10))) : function(e11, t11, r11) {
          void 0 === r11 && (r11 = {});
          for (var i11 = r11.strict, n10 = void 0 !== i11 && i11, s10 = r11.start, a10 = r11.end, o3 = r11.encode, l2 = void 0 === o3 ? function(e12) {
            return e12;
          } : o3, c2 = r11.delimiter, u2 = r11.endsWith, d2 = "[".concat(t2(void 0 === u2 ? "" : u2), "]|$"), h2 = "[".concat(t2(void 0 === c2 ? "/#?" : c2), "]"), p2 = void 0 === s10 || s10 ? "^" : "", f2 = 0; f2 < e11.length; f2++) {
            var g2 = e11[f2];
            if ("string" == typeof g2) p2 += t2(l2(g2));
            else {
              var m2 = t2(l2(g2.prefix)), y2 = t2(l2(g2.suffix));
              if (g2.pattern) if (t11 && t11.push(g2), m2 || y2) if ("+" === g2.modifier || "*" === g2.modifier) {
                var _2 = "*" === g2.modifier ? "?" : "";
                p2 += "(?:".concat(m2, "((?:").concat(g2.pattern, ")(?:").concat(y2).concat(m2, "(?:").concat(g2.pattern, "))*)").concat(y2, ")").concat(_2);
              } else p2 += "(?:".concat(m2, "(").concat(g2.pattern, ")").concat(y2, ")").concat(g2.modifier);
              else {
                if ("+" === g2.modifier || "*" === g2.modifier) throw TypeError('Can not repeat "'.concat(g2.name, '" without a prefix and suffix'));
                p2 += "(".concat(g2.pattern, ")").concat(g2.modifier);
              }
              else p2 += "(?:".concat(m2).concat(y2, ")").concat(g2.modifier);
            }
          }
          if (void 0 === a10 || a10) n10 || (p2 += "".concat(h2, "?")), p2 += r11.endsWith ? "(?=".concat(d2, ")") : "$";
          else {
            var v2 = e11[e11.length - 1], b2 = "string" == typeof v2 ? h2.indexOf(v2[v2.length - 1]) > -1 : void 0 === v2;
            n10 || (p2 += "(?:".concat(h2, "(?=").concat(d2, "))?")), b2 || (p2 += "(?=".concat(h2, "|").concat(d2, ")"));
          }
          return new RegExp(p2, t4(r11));
        }(function(e11, t11) {
          void 0 === t11 && (t11 = {});
          for (var r11 = function(e12) {
            for (var t12 = [], r12 = 0; r12 < e12.length; ) {
              var i12 = e12[r12];
              if ("*" === i12 || "+" === i12 || "?" === i12) {
                t12.push({ type: "MODIFIER", index: r12, value: e12[r12++] });
                continue;
              }
              if ("\\" === i12) {
                t12.push({ type: "ESCAPED_CHAR", index: r12++, value: e12[r12++] });
                continue;
              }
              if ("{" === i12) {
                t12.push({ type: "OPEN", index: r12, value: e12[r12++] });
                continue;
              }
              if ("}" === i12) {
                t12.push({ type: "CLOSE", index: r12, value: e12[r12++] });
                continue;
              }
              if (":" === i12) {
                for (var n11 = "", s11 = r12 + 1; s11 < e12.length; ) {
                  var a11 = e12.charCodeAt(s11);
                  if (a11 >= 48 && a11 <= 57 || a11 >= 65 && a11 <= 90 || a11 >= 97 && a11 <= 122 || 95 === a11) {
                    n11 += e12[s11++];
                    continue;
                  }
                  break;
                }
                if (!n11) throw TypeError("Missing parameter name at ".concat(r12));
                t12.push({ type: "NAME", index: r12, value: n11 }), r12 = s11;
                continue;
              }
              if ("(" === i12) {
                var o4 = 1, l3 = "", s11 = r12 + 1;
                if ("?" === e12[s11]) throw TypeError('Pattern cannot start with "?" at '.concat(s11));
                for (; s11 < e12.length; ) {
                  if ("\\" === e12[s11]) {
                    l3 += e12[s11++] + e12[s11++];
                    continue;
                  }
                  if (")" === e12[s11]) {
                    if (0 == --o4) {
                      s11++;
                      break;
                    }
                  } else if ("(" === e12[s11] && (o4++, "?" !== e12[s11 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(s11));
                  l3 += e12[s11++];
                }
                if (o4) throw TypeError("Unbalanced pattern at ".concat(r12));
                if (!l3) throw TypeError("Missing pattern at ".concat(r12));
                t12.push({ type: "PATTERN", index: r12, value: l3 }), r12 = s11;
                continue;
              }
              t12.push({ type: "CHAR", index: r12, value: e12[r12++] });
            }
            return t12.push({ type: "END", index: r12, value: "" }), t12;
          }(e11), i11 = t11.prefixes, n10 = void 0 === i11 ? "./" : i11, s10 = t11.delimiter, a10 = void 0 === s10 ? "/#?" : s10, o3 = [], l2 = 0, c2 = 0, u2 = "", d2 = function(e12) {
            if (c2 < r11.length && r11[c2].type === e12) return r11[c2++].value;
          }, h2 = function(e12) {
            var t12 = d2(e12);
            if (void 0 !== t12) return t12;
            var i12 = r11[c2], n11 = i12.type, s11 = i12.index;
            throw TypeError("Unexpected ".concat(n11, " at ").concat(s11, ", expected ").concat(e12));
          }, p2 = function() {
            for (var e12, t12 = ""; e12 = d2("CHAR") || d2("ESCAPED_CHAR"); ) t12 += e12;
            return t12;
          }, f2 = function(e12) {
            for (var t12 = 0; t12 < a10.length; t12++) {
              var r12 = a10[t12];
              if (e12.indexOf(r12) > -1) return true;
            }
            return false;
          }, g2 = function(e12) {
            var t12 = o3[o3.length - 1], r12 = e12 || (t12 && "string" == typeof t12 ? t12 : "");
            if (t12 && !r12) throw TypeError('Must have text between two parameters, missing text after "'.concat(t12.name, '"'));
            return !r12 || f2(r12) ? "[^".concat(t2(a10), "]+?") : "(?:(?!".concat(t2(r12), ")[^").concat(t2(a10), "])+?");
          }; c2 < r11.length; ) {
            var m2 = d2("CHAR"), y2 = d2("NAME"), _2 = d2("PATTERN");
            if (y2 || _2) {
              var v2 = m2 || "";
              -1 === n10.indexOf(v2) && (u2 += v2, v2 = ""), u2 && (o3.push(u2), u2 = ""), o3.push({ name: y2 || l2++, prefix: v2, suffix: "", pattern: _2 || g2(v2), modifier: d2("MODIFIER") || "" });
              continue;
            }
            var b2 = m2 || d2("ESCAPED_CHAR");
            if (b2) {
              u2 += b2;
              continue;
            }
            if (u2 && (o3.push(u2), u2 = ""), d2("OPEN")) {
              var v2 = p2(), w2 = d2("NAME") || "", k2 = d2("PATTERN") || "", S2 = p2();
              h2("CLOSE"), o3.push({ name: w2 || (k2 ? l2++ : ""), pattern: w2 && !k2 ? g2(v2) : k2, prefix: v2, suffix: S2, modifier: d2("MODIFIER") || "" });
              continue;
            }
            h2("END");
          }
          return o3;
        }(e10, r10), t10, r10);
      }
      var t3 = "https://api.clerk.com", t6 = "@clerk/backend@2.27.0", t8 = "2025-11-10", t9 = { Session: "__session", Refresh: "__refresh", ClientUat: "__client_uat", Handshake: "__clerk_handshake", DevBrowser: "__clerk_db_jwt", RedirectCount: "__clerk_redirect_count", HandshakeNonce: "__clerk_handshake_nonce" }, t7 = { ClerkSynced: "__clerk_synced", SuffixedCookies: "suffixed_cookies", ClerkRedirectUrl: "__clerk_redirect_url", DevBrowser: t9.DevBrowser, Handshake: t9.Handshake, HandshakeHelp: "__clerk_help", LegacyDevBrowser: "__dev_session", HandshakeReason: "__clerk_hs_reason", HandshakeNonce: t9.HandshakeNonce, HandshakeFormat: "format" }, re = "accept", rt = "x-clerk-auth-message", rr = "authorization", ri = "x-clerk-auth-reason", rn = "x-clerk-auth-signature", rs = "x-clerk-auth-status", ra = "x-clerk-auth-token", ro = "cache-control", rl = "x-clerk-redirect-to", rc = "x-clerk-request-data", ru = "x-clerk-clerk-url", rd = "cloudfront-forwarded-proto", rh = "content-type", rp = "content-security-policy", rf = "content-security-policy-report-only", rg = "x-clerk-debug", rm = "x-forwarded-host", ry = "x-forwarded-proto", r_ = "host", rv = "location", rb = "x-nonce", rw = "origin", rk = "referer", rS = "sec-fetch-dest", rE = "user-agent", rT = "reporting-endpoints", rx = "application/json", rO = (e10, t10, r10, i10) => {
        if ("" === e10) return rC(t10.toString(), r10?.toString());
        let n10 = new URL(e10), s10 = r10 ? new URL(r10, n10) : void 0, a10 = new URL(t10, n10), o3 = `${n10.hostname}:${n10.port}` != `${a10.hostname}:${a10.port}`;
        return s10 && (o3 && s10.searchParams.delete(t7.ClerkSynced), a10.searchParams.set("redirect_url", s10.toString())), o3 && i10 && a10.searchParams.set(t7.DevBrowser, i10), a10.toString();
      }, rC = (e10, t10) => {
        let r10;
        if (e10.startsWith("http")) r10 = new URL(e10);
        else {
          if (!t10 || !t10.startsWith("http")) throw Error("destination url or return back url should be an absolute path url!");
          let i10 = new URL(t10);
          r10 = new URL(e10, i10.origin);
        }
        return t10 && r10.searchParams.set("redirect_url", t10), r10.toString();
      };
      function rP(e10, t10) {
        return Object.keys(e10).reduce((e11, r10) => ({ ...e11, [r10]: t10[r10] || e11[r10] }), { ...e10 });
      }
      function rR(e10) {
        if (!e10 || "string" != typeof e10) throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
      }
      var rI = "session_token", rN = "api_key", rA = "m2m_token", rU = "oauth_token", rM = class {
        constructor(e10, t10, r10) {
          this.cookieSuffix = e10, this.clerkRequest = t10, this.originalFrontendApi = "", r10.acceptsToken === rA || r10.acceptsToken === rN ? this.initHeaderValues() : (this.initPublishableKeyValues(r10), this.initHeaderValues(), this.initCookieValues(), this.initHandshakeValues()), Object.assign(this, r10), this.clerkUrl = this.clerkRequest.clerkUrl;
        }
        get sessionToken() {
          return this.sessionTokenInCookie || this.tokenInHeader;
        }
        usesSuffixedCookies() {
          let e10 = this.getSuffixedCookie(t9.ClientUat), t10 = this.getCookie(t9.ClientUat), r10 = this.getSuffixedCookie(t9.Session) || "", i10 = this.getCookie(t9.Session) || "";
          if (i10 && !this.tokenHasIssuer(i10)) return false;
          if (i10 && !this.tokenBelongsToInstance(i10)) return true;
          if (!e10 && !r10) return false;
          let { data: n10 } = tJ(i10), s10 = n10?.payload.iat || 0, { data: a10 } = tJ(r10), o3 = a10?.payload.iat || 0;
          if ("0" !== e10 && "0" !== t10 && s10 > o3 || "0" === e10 && "0" !== t10) return false;
          if ("production" !== this.instanceType) {
            let r11 = this.sessionExpired(a10);
            if ("0" !== e10 && "0" === t10 && r11) return false;
          }
          return !!e10 || !r10;
        }
        isCrossOriginReferrer() {
          if (!this.referrer || !this.clerkUrl.origin) return false;
          try {
            return new URL(this.referrer).origin !== this.clerkUrl.origin;
          } catch {
            return false;
          }
        }
        isKnownClerkReferrer() {
          if (!this.referrer) return false;
          try {
            let e10 = new URL(this.referrer), t10 = e10.hostname;
            if (this.frontendApi) {
              let e11 = this.frontendApi.startsWith("http") ? new URL(this.frontendApi).hostname : this.frontendApi;
              if (t10 === e11) return true;
            }
            if (e4.some((e11) => t10.startsWith("accounts.") && t10.endsWith(e11)) || e5.some((e11) => t10.endsWith(e11) && !t10.endsWith(".clerk" + e11))) return true;
            let r10 = tG(this.frontendApi);
            if (r10) {
              let t11 = new URL(r10).origin;
              if (e10.origin === t11) return true;
            }
            if (t10.startsWith("accounts.")) return true;
            return false;
          } catch {
            return false;
          }
        }
        initPublishableKeyValues(e10) {
          te(e10.publishableKey, { fatal: true }), this.publishableKey = e10.publishableKey;
          let t10 = te(this.publishableKey, { fatal: true, domain: e10.domain, isSatellite: e10.isSatellite });
          this.originalFrontendApi = t10.frontendApi;
          let r10 = te(this.publishableKey, { fatal: true, proxyUrl: e10.proxyUrl, domain: e10.domain, isSatellite: e10.isSatellite });
          this.instanceType = r10.instanceType, this.frontendApi = r10.frontendApi;
        }
        initHeaderValues() {
          this.tokenInHeader = this.parseAuthorizationHeader(this.getHeader(rr)), this.origin = this.getHeader(rw), this.host = this.getHeader(r_), this.forwardedHost = this.getHeader(rm), this.forwardedProto = this.getHeader(rd) || this.getHeader(ry), this.referrer = this.getHeader(rk), this.userAgent = this.getHeader(rE), this.secFetchDest = this.getHeader(rS), this.accept = this.getHeader(re);
        }
        initCookieValues() {
          this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(t9.Session), this.refreshTokenInCookie = this.getSuffixedCookie(t9.Refresh), this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(t9.ClientUat) || "") || 0;
        }
        initHandshakeValues() {
          this.devBrowserToken = this.getQueryParam(t7.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(t9.DevBrowser), this.handshakeToken = this.getQueryParam(t7.Handshake) || this.getCookie(t9.Handshake), this.handshakeRedirectLoopCounter = Number(this.getCookie(t9.RedirectCount)) || 0, this.handshakeNonce = this.getQueryParam(t7.HandshakeNonce) || this.getCookie(t9.HandshakeNonce);
        }
        getQueryParam(e10) {
          return this.clerkRequest.clerkUrl.searchParams.get(e10);
        }
        getHeader(e10) {
          return this.clerkRequest.headers.get(e10) || void 0;
        }
        getCookie(e10) {
          return this.clerkRequest.cookies.get(e10) || void 0;
        }
        getSuffixedCookie(e10) {
          let t10;
          return this.getCookie((t10 = this.cookieSuffix, `${e10}_${t10}`)) || void 0;
        }
        getSuffixedOrUnSuffixedCookie(e10) {
          return this.usesSuffixedCookies() ? this.getSuffixedCookie(e10) : this.getCookie(e10);
        }
        parseAuthorizationHeader(e10) {
          if (!e10) return;
          let [t10, r10] = e10.split(" ", 2);
          return r10 ? "Bearer" === t10 ? r10 : void 0 : t10;
        }
        tokenHasIssuer(e10) {
          let { data: t10, errors: r10 } = tJ(e10);
          return !r10 && !!t10.payload.iss;
        }
        tokenBelongsToInstance(e10) {
          if (!e10) return false;
          let { data: t10, errors: r10 } = tJ(e10);
          if (r10) return false;
          let i10 = t10.payload.iss.replace(/https?:\/\//gi, "");
          return this.originalFrontendApi === i10;
        }
        sessionExpired(e10) {
          return !!e10 && e10?.payload.exp <= (Date.now() / 1e3 | 0);
        }
      }, rq = async (e10, t10) => new rM(t10.publishableKey ? await ti(t10.publishableKey, tM.crypto.subtle) : "", e10, t10), rL = RegExp("(?<!:)/{1,}", "g");
      function rD(...e10) {
        return e10.filter((e11) => e11).join("/").replace(rL, "/");
      }
      var rj = class {
        constructor(e10) {
          this.request = e10;
        }
        requireId(e10) {
          if (!e10) throw Error("A valid resource ID is required.");
        }
      }, rB = "/actor_tokens", r$ = class extends rj {
        async create(e10) {
          return this.request({ method: "POST", path: rB, bodyParams: e10 });
        }
        async revoke(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(rB, e10, "revoke") });
        }
      }, rz = "/accountless_applications", rK = class extends rj {
        async createAccountlessApplication(e10) {
          let t10 = e10?.requestHeaders ? Object.fromEntries(e10.requestHeaders.entries()) : void 0;
          return this.request({ method: "POST", path: rz, headerParams: t10 });
        }
        async completeAccountlessApplicationOnboarding(e10) {
          let t10 = e10?.requestHeaders ? Object.fromEntries(e10.requestHeaders.entries()) : void 0;
          return this.request({ method: "POST", path: rD(rz, "complete"), headerParams: t10 });
        }
      }, rH = "/allowlist_identifiers", rJ = class extends rj {
        async getAllowlistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: rH, queryParams: { ...e10, paginated: true } });
        }
        async createAllowlistIdentifier(e10) {
          return this.request({ method: "POST", path: rH, bodyParams: e10 });
        }
        async deleteAllowlistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(rH, e10) });
        }
      }, rV = "/api_keys", rF = class extends rj {
        async list(e10) {
          return this.request({ method: "GET", path: rV, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: rV, bodyParams: e10 });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(rV, e10) });
        }
        async update(e10) {
          let { apiKeyId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rD(rV, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(rV, e10) });
        }
        async revoke(e10) {
          let { apiKeyId: t10, revocationReason: r10 = null } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rD(rV, t10, "revoke"), bodyParams: { revocationReason: r10 } });
        }
        async getSecret(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(rV, e10, "secret") });
        }
        async verify(e10) {
          return this.request({ method: "POST", path: rD(rV, "verify"), bodyParams: { secret: e10 } });
        }
        async verifySecret(e10) {
          return e2("apiKeys.verifySecret()", "Use `apiKeys.verify()` instead."), this.verify(e10);
        }
      }, rW = class extends rj {
        async changeDomain(e10) {
          return this.request({ method: "POST", path: rD("/beta_features", "change_domain"), bodyParams: e10 });
        }
      }, rG = "/blocklist_identifiers", rX = class extends rj {
        async getBlocklistIdentifierList(e10 = {}) {
          return this.request({ method: "GET", path: rG, queryParams: e10 });
        }
        async createBlocklistIdentifier(e10) {
          return this.request({ method: "POST", path: rG, bodyParams: e10 });
        }
        async deleteBlocklistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(rG, e10) });
        }
      }, rY = "/clients", rQ = class extends rj {
        async getClientList(e10 = {}) {
          return this.request({ method: "GET", path: rY, queryParams: { ...e10, paginated: true } });
        }
        async getClient(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(rY, e10) });
        }
        verifyClient(e10) {
          return this.request({ method: "POST", path: rD(rY, "verify"), bodyParams: { token: e10 } });
        }
        async getHandshakePayload(e10) {
          return this.request({ method: "GET", path: rD(rY, "handshake_payload"), queryParams: e10 });
        }
      }, rZ = "/domains", r0 = class extends rj {
        async list() {
          return this.request({ method: "GET", path: rZ });
        }
        async add(e10) {
          return this.request({ method: "POST", path: rZ, bodyParams: e10 });
        }
        async update(e10) {
          let { domainId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rD(rZ, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.deleteDomain(e10);
        }
        async deleteDomain(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(rZ, e10) });
        }
      }, r1 = "/email_addresses", r2 = class extends rj {
        async getEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(r1, e10) });
        }
        async createEmailAddress(e10) {
          return this.request({ method: "POST", path: r1, bodyParams: e10 });
        }
        async updateEmailAddress(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rD(r1, e10), bodyParams: t10 });
        }
        async deleteEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(r1, e10) });
        }
      }, r4 = class extends rj {
        async verify(e10) {
          return this.request({ method: "POST", path: rD("/oauth_applications/access_tokens", "verify"), bodyParams: { access_token: e10 } });
        }
        async verifyAccessToken(e10) {
          return e2("idPOAuthAccessToken.verifyAccessToken()", "Use `idPOAuthAccessToken.verify()` instead."), this.verify(e10);
        }
      }, r5 = "/instance", r3 = class extends rj {
        async get() {
          return this.request({ method: "GET", path: r5 });
        }
        async update(e10) {
          return this.request({ method: "PATCH", path: r5, bodyParams: e10 });
        }
        async updateRestrictions(e10) {
          return this.request({ method: "PATCH", path: rD(r5, "restrictions"), bodyParams: e10 });
        }
        async updateOrganizationSettings(e10) {
          return this.request({ method: "PATCH", path: rD(r5, "organization_settings"), bodyParams: e10 });
        }
      }, r6 = "/invitations", r8 = class extends rj {
        async getInvitationList(e10 = {}) {
          return this.request({ method: "GET", path: r6, queryParams: { ...e10, paginated: true } });
        }
        async createInvitation(e10) {
          return this.request({ method: "POST", path: r6, bodyParams: e10 });
        }
        async createInvitationBulk(e10) {
          return this.request({ method: "POST", path: rD(r6, "bulk"), bodyParams: e10 });
        }
        async revokeInvitation(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(r6, e10, "revoke") });
        }
      }, r9 = "/machines", r7 = class extends rj {
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(r9, e10) });
        }
        async list(e10 = {}) {
          return this.request({ method: "GET", path: r9, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: r9, bodyParams: e10 });
        }
        async update(e10) {
          let { machineId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rD(r9, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(r9, e10) });
        }
        async getSecretKey(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(r9, e10, "secret_key") });
        }
        async rotateSecretKey(e10) {
          let { machineId: t10, previousTokenTtl: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rD(r9, t10, "secret_key", "rotate"), bodyParams: { previousTokenTtl: r10 } });
        }
        async createScope(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(r9, e10, "scopes"), bodyParams: { toMachineId: t10 } });
        }
        async deleteScope(e10, t10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(r9, e10, "scopes", t10) });
        }
      }, ie = "/m2m_tokens", it = class extends rj {
        constructor() {
          super(...arguments), ((e10, t10, r10) => t10.has(e10) ? tF("Cannot add the same private member more than once") : t10 instanceof WeakSet ? t10.add(e10) : t10.set(e10, r10))(this, aC);
        }
        async createToken(e10) {
          let { claims: t10 = null, machineSecretKey: r10, secondsUntilExpiration: i10 = null } = e10 || {}, n10 = tW(this, aC, aP).call(this, { method: "POST", path: ie, bodyParams: { secondsUntilExpiration: i10, claims: t10 } }, r10);
          return this.request(n10);
        }
        async revokeToken(e10) {
          let { m2mTokenId: t10, revocationReason: r10 = null, machineSecretKey: i10 } = e10;
          this.requireId(t10);
          let n10 = tW(this, aC, aP).call(this, { method: "POST", path: rD(ie, t10, "revoke"), bodyParams: { revocationReason: r10 } }, i10);
          return this.request(n10);
        }
        async verify(e10) {
          let { token: t10, machineSecretKey: r10 } = e10, i10 = tW(this, aC, aP).call(this, { method: "POST", path: rD(ie, "verify"), bodyParams: { token: t10 } }, r10);
          return this.request(i10);
        }
        async verifyToken(e10) {
          return e2("m2m.verifyToken()", "Use `m2m.verify()` instead."), this.verify(e10);
        }
      };
      aC = /* @__PURE__ */ new WeakSet(), aP = function(e10, t10) {
        return t10 ? { ...e10, headerParams: { ...e10.headerParams, Authorization: `Bearer ${t10}` } } : e10;
      };
      var ir = class extends rj {
        async getJwks() {
          return this.request({ method: "GET", path: "/jwks" });
        }
      }, ii = "/jwt_templates", is = class extends rj {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: ii, queryParams: { ...e10, paginated: true } });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(ii, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: ii, bodyParams: e10 });
        }
        async update(e10) {
          let { templateId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rD(ii, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(ii, e10) });
        }
      }, ia = "/organizations", io = class extends rj {
        async getOrganizationList(e10) {
          return this.request({ method: "GET", path: ia, queryParams: e10 });
        }
        async createOrganization(e10) {
          return this.request({ method: "POST", path: ia, bodyParams: e10 });
        }
        async getOrganization(e10) {
          let { includeMembersCount: t10 } = e10, r10 = "organizationId" in e10 ? e10.organizationId : e10.slug;
          return this.requireId(r10), this.request({ method: "GET", path: rD(ia, r10), queryParams: { includeMembersCount: t10 } });
        }
        async updateOrganization(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rD(ia, e10), bodyParams: t10 });
        }
        async updateOrganizationLogo(e10, t10) {
          this.requireId(e10);
          let r10 = new tM.FormData();
          return r10.append("file", t10?.file), t10?.uploaderUserId && r10.append("uploader_user_id", t10?.uploaderUserId), this.request({ method: "PUT", path: rD(ia, e10, "logo"), formData: r10 });
        }
        async deleteOrganizationLogo(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(ia, e10, "logo") });
        }
        async updateOrganizationMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rD(ia, e10, "metadata"), bodyParams: t10 });
        }
        async deleteOrganization(e10) {
          return this.request({ method: "DELETE", path: rD(ia, e10) });
        }
        async getOrganizationMembershipList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rD(ia, t10, "memberships"), queryParams: r10 });
        }
        async getInstanceOrganizationMembershipList(e10) {
          return this.request({ method: "GET", path: "/organization_memberships", queryParams: e10 });
        }
        async createOrganizationMembership(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rD(ia, t10, "memberships"), bodyParams: r10 });
        }
        async updateOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10, ...i10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rD(ia, t10, "memberships", r10), bodyParams: i10 });
        }
        async updateOrganizationMembershipMetadata(e10) {
          let { organizationId: t10, userId: r10, ...i10 } = e10;
          return this.request({ method: "PATCH", path: rD(ia, t10, "memberships", r10, "metadata"), bodyParams: i10 });
        }
        async deleteOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10 } = e10;
          return this.requireId(t10), this.request({ method: "DELETE", path: rD(ia, t10, "memberships", r10) });
        }
        async getOrganizationInvitationList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rD(ia, t10, "invitations"), queryParams: r10 });
        }
        async createOrganizationInvitation(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rD(ia, t10, "invitations"), bodyParams: r10 });
        }
        async createOrganizationInvitationBulk(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(ia, e10, "invitations", "bulk"), bodyParams: t10 });
        }
        async getOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "GET", path: rD(ia, t10, "invitations", r10) });
        }
        async revokeOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10, ...i10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rD(ia, t10, "invitations", r10, "revoke"), bodyParams: i10 });
        }
        async getOrganizationDomainList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rD(ia, t10, "domains"), queryParams: r10 });
        }
        async createOrganizationDomain(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rD(ia, t10, "domains"), bodyParams: { ...r10, verified: r10.verified ?? true } });
        }
        async updateOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10, ...i10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "PATCH", path: rD(ia, t10, "domains", r10), bodyParams: i10 });
        }
        async deleteOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "DELETE", path: rD(ia, t10, "domains", r10) });
        }
      }, il = "/oauth_applications", ic = class extends rj {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: il, queryParams: e10 });
        }
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(il, e10) });
        }
        async create(e10) {
          return this.request({ method: "POST", path: il, bodyParams: e10 });
        }
        async update(e10) {
          let { oauthApplicationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rD(il, t10), bodyParams: r10 });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(il, e10) });
        }
        async rotateSecret(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(il, e10, "rotate_secret") });
        }
      }, iu = "/phone_numbers", id = class extends rj {
        async getPhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(iu, e10) });
        }
        async createPhoneNumber(e10) {
          return this.request({ method: "POST", path: iu, bodyParams: e10 });
        }
        async updatePhoneNumber(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rD(iu, e10), bodyParams: t10 });
        }
        async deletePhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(iu, e10) });
        }
      }, ih = class extends rj {
        async verify(e10) {
          return this.request({ method: "POST", path: "/proxy_checks", bodyParams: e10 });
        }
      }, ip = "/redirect_urls", ig = class extends rj {
        async getRedirectUrlList() {
          return this.request({ method: "GET", path: ip, queryParams: { paginated: true } });
        }
        async getRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(ip, e10) });
        }
        async createRedirectUrl(e10) {
          return this.request({ method: "POST", path: ip, bodyParams: e10 });
        }
        async deleteRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(ip, e10) });
        }
      }, im = "/saml_connections", iy = class extends rj {
        async getSamlConnectionList(e10 = {}) {
          return this.request({ method: "GET", path: im, queryParams: e10 });
        }
        async createSamlConnection(e10) {
          return this.request({ method: "POST", path: im, bodyParams: e10, options: { deepSnakecaseBodyParamKeys: true } });
        }
        async getSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(im, e10) });
        }
        async updateSamlConnection(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rD(im, e10), bodyParams: t10, options: { deepSnakecaseBodyParamKeys: true } });
        }
        async deleteSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(im, e10) });
        }
      }, i_ = "/sessions", iv = class extends rj {
        async getSessionList(e10 = {}) {
          return this.request({ method: "GET", path: i_, queryParams: { ...e10, paginated: true } });
        }
        async getSession(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(i_, e10) });
        }
        async createSession(e10) {
          return this.request({ method: "POST", path: i_, bodyParams: e10 });
        }
        async revokeSession(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(i_, e10, "revoke") });
        }
        async verifySession(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(i_, e10, "verify"), bodyParams: { token: t10 } });
        }
        async getToken(e10, t10, r10) {
          this.requireId(e10);
          let i10 = { method: "POST", path: t10 ? rD(i_, e10, "tokens", t10) : rD(i_, e10, "tokens") };
          return void 0 !== r10 && (i10.bodyParams = { expires_in_seconds: r10 }), this.request(i10);
        }
        async refreshSession(e10, t10) {
          this.requireId(e10);
          let { suffixed_cookies: r10, ...i10 } = t10;
          return this.request({ method: "POST", path: rD(i_, e10, "refresh"), bodyParams: i10, queryParams: { suffixed_cookies: r10 } });
        }
      }, ib = "/sign_in_tokens", iw = class extends rj {
        async createSignInToken(e10) {
          return this.request({ method: "POST", path: ib, bodyParams: e10 });
        }
        async revokeSignInToken(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(ib, e10, "revoke") });
        }
      }, ik = "/sign_ups", iS = class extends rj {
        async get(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(ik, e10) });
        }
        async update(e10) {
          let { signUpAttemptId: t10, ...r10 } = e10;
          return this.request({ method: "PATCH", path: rD(ik, t10), bodyParams: r10 });
        }
      }, iE = class extends rj {
        async createTestingToken() {
          return this.request({ method: "POST", path: "/testing_tokens" });
        }
      }, iT = "/users", ix = class extends rj {
        async getUserList(e10 = {}) {
          let { limit: t10, offset: r10, orderBy: i10, ...n10 } = e10, [s10, a10] = await Promise.all([this.request({ method: "GET", path: iT, queryParams: e10 }), this.getCount(n10)]);
          return { data: s10, totalCount: a10 };
        }
        async getUser(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD(iT, e10) });
        }
        async createUser(e10) {
          return this.request({ method: "POST", path: iT, bodyParams: e10 });
        }
        async updateUser(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rD(iT, e10), bodyParams: t10 });
        }
        async updateUserProfileImage(e10, t10) {
          this.requireId(e10);
          let r10 = new tM.FormData();
          return r10.append("file", t10?.file), this.request({ method: "POST", path: rD(iT, e10, "profile_image"), formData: r10 });
        }
        async updateUserMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rD(iT, e10, "metadata"), bodyParams: t10 });
        }
        async deleteUser(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(iT, e10) });
        }
        async getCount(e10 = {}) {
          return this.request({ method: "GET", path: rD(iT, "count"), queryParams: e10 });
        }
        async getUserOauthAccessToken(e10, t10) {
          this.requireId(e10);
          let r10 = t10.startsWith("oauth_"), i10 = r10 ? t10 : `oauth_${t10}`;
          return r10 && e2("getUserOauthAccessToken(userId, provider)", "Remove the `oauth_` prefix from the `provider` argument."), this.request({ method: "GET", path: rD(iT, e10, "oauth_access_tokens", i10), queryParams: { paginated: true } });
        }
        async disableUserMFA(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(iT, e10, "mfa") });
        }
        async getOrganizationMembershipList(e10) {
          let { userId: t10, limit: r10, offset: i10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rD(iT, t10, "organization_memberships"), queryParams: { limit: r10, offset: i10 } });
        }
        async getOrganizationInvitationList(e10) {
          let { userId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rD(iT, t10, "organization_invitations"), queryParams: r10 });
        }
        async verifyPassword(e10) {
          let { userId: t10, password: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rD(iT, t10, "verify_password"), bodyParams: { password: r10 } });
        }
        async verifyTOTP(e10) {
          let { userId: t10, code: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rD(iT, t10, "verify_totp"), bodyParams: { code: r10 } });
        }
        async banUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(iT, e10, "ban") });
        }
        async unbanUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(iT, e10, "unban") });
        }
        async lockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(iT, e10, "lock") });
        }
        async unlockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(iT, e10, "unlock") });
        }
        async deleteUserProfileImage(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(iT, e10, "profile_image") });
        }
        async deleteUserPasskey(e10) {
          return this.requireId(e10.userId), this.requireId(e10.passkeyIdentificationId), this.request({ method: "DELETE", path: rD(iT, e10.userId, "passkeys", e10.passkeyIdentificationId) });
        }
        async deleteUserWeb3Wallet(e10) {
          return this.requireId(e10.userId), this.requireId(e10.web3WalletIdentificationId), this.request({ method: "DELETE", path: rD(iT, e10.userId, "web3_wallets", e10.web3WalletIdentificationId) });
        }
        async deleteUserExternalAccount(e10) {
          return this.requireId(e10.userId), this.requireId(e10.externalAccountId), this.request({ method: "DELETE", path: rD(iT, e10.userId, "external_accounts", e10.externalAccountId) });
        }
        async deleteUserBackupCodes(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(iT, e10, "backup_code") });
        }
        async deleteUserTOTP(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(iT, e10, "totp") });
        }
        async __experimental_passwordCompromised(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(iT, e10, "password_compromised"), bodyParams: { revokeAllSessions: false } });
        }
      }, iO = "/waitlist_entries", iC = class extends rj {
        async list(e10 = {}) {
          return this.request({ method: "GET", path: iO, queryParams: e10 });
        }
        async create(e10) {
          return this.request({ method: "POST", path: iO, bodyParams: e10 });
        }
        async invite(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(iO, e10, "invite"), bodyParams: t10 });
        }
        async reject(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD(iO, e10, "reject") });
        }
        async delete(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(iO, e10) });
        }
      }, iP = "/webhooks", iR = class extends rj {
        async createSvixApp() {
          return this.request({ method: "POST", path: rD(iP, "svix") });
        }
        async generateSvixAuthURL() {
          return this.request({ method: "POST", path: rD(iP, "svix_url") });
        }
        async deleteSvixApp() {
          return this.request({ method: "DELETE", path: rD(iP, "svix") });
        }
      }, iI = "/billing", iN = class extends rj {
        async getPlanList(e10) {
          return this.request({ method: "GET", path: rD(iI, "plans"), queryParams: e10 });
        }
        async cancelSubscriptionItem(e10, t10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rD(iI, "subscription_items", e10), queryParams: t10 });
        }
        async extendSubscriptionItemFreeTrial(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rD("/billing", "subscription_items", e10, "extend_free_trial"), bodyParams: t10 });
        }
        async getOrganizationBillingSubscription(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD("/organizations", e10, "billing", "subscription") });
        }
        async getUserBillingSubscription(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rD("/users", e10, "billing", "subscription") });
        }
      }, iA = (e10) => "object" == typeof e10 && null !== e10, iU = (e10) => iA(e10) && !(e10 instanceof RegExp) && !(e10 instanceof Error) && !(e10 instanceof Date) && !(globalThis.Blob && e10 instanceof globalThis.Blob), iM = Symbol("mapObjectSkip"), iq = (e10, t10, r10, i10 = /* @__PURE__ */ new WeakMap()) => {
        if (r10 = { deep: false, target: {}, ...r10 }, i10.has(e10)) return i10.get(e10);
        i10.set(e10, r10.target);
        let { target: n10 } = r10;
        delete r10.target;
        let s10 = (e11) => e11.map((e12) => iU(e12) ? iq(e12, t10, r10, i10) : e12);
        if (Array.isArray(e10)) return s10(e10);
        for (let [a10, o3] of Object.entries(e10)) {
          let l2 = t10(a10, o3, e10);
          if (l2 === iM) continue;
          let [c2, u2, { shouldRecurse: d2 = true } = {}] = l2;
          "__proto__" !== c2 && (r10.deep && d2 && iU(u2) && (u2 = Array.isArray(u2) ? s10(u2) : iq(u2, t10, r10, i10)), n10[c2] = u2);
        }
        return n10;
      };
      function iL(e10, t10, r10) {
        if (!iA(e10)) throw TypeError(`Expected an object, got \`${e10}\` (${typeof e10})`);
        if (Array.isArray(e10)) throw TypeError("Expected an object, got an array");
        return iq(e10, t10, r10);
      }
      var iD = /([\p{Ll}\d])(\p{Lu})/gu, ij = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu, iB = /(\d)\p{Ll}|(\p{L})\d/u, i$ = /[^\p{L}\d]+/giu, iz = "$1\0$2";
      function iK(e10) {
        let t10 = e10.trim();
        t10 = (t10 = t10.replace(iD, iz).replace(ij, iz)).replace(i$, "\0");
        let r10 = 0, i10 = t10.length;
        for (; "\0" === t10.charAt(r10); ) r10++;
        if (r10 === i10) return [];
        for (; "\0" === t10.charAt(i10 - 1); ) i10--;
        return t10.slice(r10, i10).split(/\0/g);
      }
      function iH(e10) {
        let t10 = iK(e10);
        for (let e11 = 0; e11 < t10.length; e11++) {
          let r10 = t10[e11], i10 = iB.exec(r10);
          if (i10) {
            let n10 = i10.index + (i10[1] ?? i10[2]).length;
            t10.splice(e11, 1, r10.slice(0, n10), r10.slice(n10));
          }
        }
        return t10;
      }
      function iJ(e10, t10) {
        return function(e11, t11) {
          var r10;
          let [i10, n10, s10] = function(e12, t12 = {}) {
            let r11 = t12.split ?? (t12.separateNumbers ? iH : iK), i11 = t12.prefixCharacters ?? "", n11 = t12.suffixCharacters ?? "", s11 = 0, a10 = e12.length;
            for (; s11 < e12.length; ) {
              let t13 = e12.charAt(s11);
              if (!i11.includes(t13)) break;
              s11++;
            }
            for (; a10 > s11; ) {
              let t13 = a10 - 1, r12 = e12.charAt(t13);
              if (!n11.includes(r12)) break;
              a10 = t13;
            }
            return [e12.slice(0, s11), r11(e12.slice(s11, a10)), e12.slice(a10)];
          }(e11, t11);
          return i10 + n10.map(false === (r10 = t11?.locale) ? (e12) => e12.toLowerCase() : (e12) => e12.toLocaleLowerCase(r10)).join(t11?.delimiter ?? " ") + s10;
        }(e10, { delimiter: "_", ...t10 });
      }
      var iV = {}.constructor;
      function iF(e10, t10) {
        return e10.some((e11) => "string" == typeof e11 ? e11 === t10 : e11.test(t10));
      }
      function iW(e10, t10, r10) {
        return r10.shouldRecurse ? { shouldRecurse: r10.shouldRecurse(e10, t10) } : void 0;
      }
      var iG = function(e10, t10) {
        if (Array.isArray(e10)) {
          if (e10.some((e11) => e11.constructor !== iV)) throw Error("obj must be array of plain objects");
          let r11 = (t10 = { deep: true, exclude: [], parsingOptions: {}, ...t10 }).snakeCase || ((e11) => iJ(e11, t10.parsingOptions));
          return e10.map((e11) => iL(e11, (e12, i10) => [iF(t10.exclude, e12) ? e12 : r11(e12), i10, iW(e12, i10, t10)], t10));
        }
        if (e10.constructor !== iV) throw Error("obj must be an plain object");
        let r10 = (t10 = { deep: true, exclude: [], parsingOptions: {}, ...t10 }).snakeCase || ((e11) => iJ(e11, t10.parsingOptions));
        return iL(e10, (e11, i10) => [iF(t10.exclude, e11) ? e11 : r10(e11), i10, iW(e11, i10, t10)], t10);
      }, iX = class e10 {
        constructor(e11, t10, r10, i10) {
          this.publishableKey = e11, this.secretKey = t10, this.claimUrl = r10, this.apiKeysUrl = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.publishable_key, t10.secret_key, t10.claim_url, t10.api_keys_url);
        }
      }, iY = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3) {
          this.id = e11, this.status = t10, this.userId = r10, this.actor = i10, this.token = n10, this.url = s10, this.createdAt = a10, this.updatedAt = o3;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.user_id, t10.actor, t10.token, t10.url, t10.created_at, t10.updated_at);
        }
      }, iQ = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = i10, this.updatedAt = n10, this.instanceId = s10, this.invitationId = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id, t10.invitation_id);
        }
      }, iZ = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2, d2, h2, p2, f2, g2) {
          this.id = e11, this.type = t10, this.name = r10, this.subject = i10, this.scopes = n10, this.claims = s10, this.revoked = a10, this.revocationReason = o3, this.expired = l2, this.expiration = c2, this.createdBy = u2, this.description = d2, this.lastUsedAt = h2, this.createdAt = p2, this.updatedAt = f2, this.secret = g2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type, t10.name, t10.subject, t10.scopes, t10.claims, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_by, t10.description, t10.last_used_at, t10.created_at, t10.updated_at, t10.secret);
        }
      }, i0 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10) {
          this.id = e11, this.identifier = t10, this.identifierType = r10, this.createdAt = i10, this.updatedAt = n10, this.instanceId = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.identifier_type, t10.created_at, t10.updated_at, t10.instance_id);
        }
      }, i1 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3) {
          this.id = e11, this.isMobile = t10, this.ipAddress = r10, this.city = i10, this.country = n10, this.browserVersion = s10, this.browserName = a10, this.deviceType = o3;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.is_mobile, t10.ip_address, t10.city, t10.country, t10.browser_version, t10.browser_name, t10.device_type);
        }
      }, i2 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2, d2 = null) {
          this.id = e11, this.clientId = t10, this.userId = r10, this.status = i10, this.lastActiveAt = n10, this.expireAt = s10, this.abandonAt = a10, this.createdAt = o3, this.updatedAt = l2, this.lastActiveOrganizationId = c2, this.latestActivity = u2, this.actor = d2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.user_id, t10.status, t10.last_active_at, t10.expire_at, t10.abandon_at, t10.created_at, t10.updated_at, t10.last_active_organization_id, t10.latest_activity && i1.fromJSON(t10.latest_activity), t10.actor);
        }
      }, i4 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2) {
          this.id = e11, this.sessionIds = t10, this.sessions = r10, this.signInId = i10, this.signUpId = n10, this.lastActiveSessionId = s10, this.lastAuthenticationStrategy = a10, this.createdAt = o3, this.updatedAt = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.session_ids, t10.sessions.map((e11) => i2.fromJSON(e11)), t10.sign_in_id, t10.sign_up_id, t10.last_active_session_id, t10.last_authentication_strategy, t10.created_at, t10.updated_at);
        }
      }, i5 = class e10 {
        constructor(e11, t10, r10) {
          this.host = e11, this.value = t10, this.required = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.host, t10.value, t10.required);
        }
      }, i3 = class e10 {
        constructor(e11) {
          this.cookies = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.cookies);
        }
      }, i6 = class e10 {
        constructor(e11, t10, r10, i10) {
          this.object = e11, this.id = t10, this.slug = r10, this.deleted = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.object, t10.id || null, t10.slug || null, t10.deleted);
        }
      }, i8 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3) {
          this.id = e11, this.name = t10, this.isSatellite = r10, this.frontendApiUrl = i10, this.developmentOrigin = n10, this.cnameTargets = s10, this.accountsPortalUrl = a10, this.proxyUrl = o3;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.is_satellite, t10.frontend_api_url, t10.development_origin, t10.cname_targets && t10.cname_targets.map((e11) => i5.fromJSON(e11)), t10.accounts_portal_url, t10.proxy_url);
        }
      }, i9 = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2) {
          this.id = e11, this.fromEmailName = t10, this.emailAddressId = r10, this.toEmailAddress = i10, this.subject = n10, this.body = s10, this.bodyPlain = a10, this.status = o3, this.slug = l2, this.data = c2, this.deliveredByClerk = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_email_name, t10.email_address_id, t10.to_email_address, t10.subject, t10.body, t10.body_plain, t10.status, t10.slug, t10.data, t10.delivered_by_clerk);
        }
      }, i7 = class e10 {
        constructor(e11, t10) {
          this.id = e11, this.type = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type);
        }
      }, ne = class e10 {
        constructor(e11, t10, r10 = null, i10 = null, n10 = null, s10 = null, a10 = null) {
          this.status = e11, this.strategy = t10, this.externalVerificationRedirectURL = r10, this.attempts = i10, this.expireAt = n10, this.nonce = s10, this.message = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.status, t10.strategy, t10.external_verification_redirect_url ? new URL(t10.external_verification_redirect_url) : null, t10.attempts, t10.expire_at, t10.nonce);
        }
      }, nt = class e10 {
        constructor(e11, t10, r10, i10) {
          this.id = e11, this.emailAddress = t10, this.verification = r10, this.linkedTo = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.verification && ne.fromJSON(t10.verification), t10.linked_to.map((e11) => i7.fromJSON(e11)));
        }
      }, nr = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2, d2 = {}, h2, p2) {
          this.id = e11, this.provider = t10, this.identificationId = r10, this.externalId = i10, this.approvedScopes = n10, this.emailAddress = s10, this.firstName = a10, this.lastName = o3, this.imageUrl = l2, this.username = c2, this.phoneNumber = u2, this.publicMetadata = d2, this.label = h2, this.verification = p2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.identification_id, t10.provider_user_id, t10.approved_scopes, t10.email_address, t10.first_name, t10.last_name, t10.image_url || "", t10.username, t10.phone_number, t10.public_metadata, t10.label, t10.verification && ne.fromJSON(t10.verification));
        }
      }, ni = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2) {
          this.id = e11, this.clientId = t10, this.type = r10, this.subject = i10, this.scopes = n10, this.revoked = s10, this.revocationReason = a10, this.expired = o3, this.expiration = l2, this.createdAt = c2, this.updatedAt = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.type, t10.subject, t10.scopes, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_at, t10.updated_at);
        }
        static fromJwtPayload(t10, r10 = 5e3) {
          return new e10(t10.jti ?? "", t10.client_id ?? "", "oauth_token", t10.sub, t10.scp ?? t10.scope?.split(" ") ?? [], false, null, 1e3 * t10.exp <= Date.now() - r10, t10.exp, t10.iat, t10.iat);
        }
      }, nn = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.environmentType = t10, this.allowedOrigins = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.environment_type, t10.allowed_origins);
        }
      }, ns = class e10 {
        constructor(e11, t10, r10, i10, n10) {
          this.allowlist = e11, this.blocklist = t10, this.blockEmailSubaddresses = r10, this.blockDisposableEmailDomains = i10, this.ignoreDotsForGmailAddresses = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.allowlist, t10.blocklist, t10.block_email_subaddresses, t10.block_disposable_email_domains, t10.ignore_dots_for_gmail_addresses);
        }
      }, na = class e10 {
        constructor(e11, t10, r10, i10, n10) {
          this.id = e11, this.restrictedToAllowlist = t10, this.fromEmailAddress = r10, this.progressiveSignUp = i10, this.enhancedEmailDeliverability = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.restricted_to_allowlist, t10.from_email_address, t10.progressive_sign_up, t10.enhanced_email_deliverability);
        }
      }, no = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3) {
          this.id = e11, this.emailAddress = t10, this.publicMetadata = r10, this.createdAt = i10, this.updatedAt = n10, this.status = s10, this.url = a10, this.revoked = o3, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.public_metadata, t10.created_at, t10.updated_at, t10.status, t10.url, t10.revoked);
          return r10._raw = t10, r10;
        }
      }, nl = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3) {
          this.id = e11, this.name = t10, this.instanceId = r10, this.createdAt = i10, this.updatedAt = n10, this.scopedMachines = s10, this.defaultTokenTtl = a10, this.secretKey = o3;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.instance_id, t10.created_at, t10.updated_at, t10.scoped_machines.map((t11) => new e10(t11.id, t11.name, t11.instance_id, t11.created_at, t11.updated_at, [], t11.default_token_ttl)), t10.default_token_ttl, t10.secret_key);
        }
      }, nc = class e10 {
        constructor(e11, t10, r10, i10) {
          this.fromMachineId = e11, this.toMachineId = t10, this.createdAt = r10, this.deleted = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.from_machine_id, t10.to_machine_id, t10.created_at, t10.deleted);
        }
      }, nu = class e10 {
        constructor(e11) {
          this.secret = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.secret);
        }
      }, nd = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2) {
          this.id = e11, this.subject = t10, this.scopes = r10, this.claims = i10, this.revoked = n10, this.revocationReason = s10, this.expired = a10, this.expiration = o3, this.createdAt = l2, this.updatedAt = c2, this.token = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.subject, t10.scopes, t10.claims, t10.revoked, t10.revocation_reason, t10.expired, t10.expiration, t10.created_at, t10.updated_at, t10.token);
        }
      }, nh = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2) {
          this.id = e11, this.name = t10, this.claims = r10, this.lifetime = i10, this.allowedClockSkew = n10, this.customSigningKey = s10, this.signingAlgorithm = a10, this.createdAt = o3, this.updatedAt = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.claims, t10.lifetime, t10.allowed_clock_skew, t10.custom_signing_key, t10.signing_algorithm, t10.created_at, t10.updated_at);
        }
      }, np = class e10 {
        constructor(e11, t10, r10, i10 = {}, n10, s10, a10, o3) {
          this.externalAccountId = e11, this.provider = t10, this.token = r10, this.publicMetadata = i10, this.label = n10, this.scopes = s10, this.tokenSecret = a10, this.expiresAt = o3;
        }
        static fromJSON(t10) {
          return new e10(t10.external_account_id, t10.provider, t10.token, t10.public_metadata, t10.label || "", t10.scopes, t10.token_secret, t10.expires_at);
        }
      }, nf = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2, d2, h2, p2, f2, g2, m2, y2, _2, v2) {
          this.id = e11, this.instanceId = t10, this.name = r10, this.clientId = i10, this.clientUri = n10, this.clientImageUrl = s10, this.dynamicallyRegistered = a10, this.consentScreenEnabled = o3, this.pkceRequired = l2, this.isPublic = c2, this.scopes = u2, this.redirectUris = d2, this.authorizeUrl = h2, this.tokenFetchUrl = p2, this.userInfoUrl = f2, this.discoveryUrl = g2, this.tokenIntrospectionUrl = m2, this.createdAt = y2, this.updatedAt = _2, this.clientSecret = v2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.instance_id, t10.name, t10.client_id, t10.client_uri, t10.client_image_url, t10.dynamically_registered, t10.consent_screen_enabled, t10.pkce_required, t10.public, t10.scopes, t10.redirect_uris, t10.authorize_url, t10.token_fetch_url, t10.user_info_url, t10.discovery_url, t10.token_introspection_url, t10.created_at, t10.updated_at, t10.client_secret);
        }
      }, ng = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3 = {}, l2 = {}, c2, u2, d2, h2) {
          this.id = e11, this.name = t10, this.slug = r10, this.imageUrl = i10, this.hasImage = n10, this.createdAt = s10, this.updatedAt = a10, this.publicMetadata = o3, this.privateMetadata = l2, this.maxAllowedMemberships = c2, this.adminDeleteEnabled = u2, this.membersCount = d2, this.createdBy = h2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.name, t10.slug, t10.image_url || "", t10.has_image, t10.created_at, t10.updated_at, t10.public_metadata, t10.private_metadata, t10.max_allowed_memberships, t10.admin_delete_enabled, t10.members_count, t10.created_by);
          return r10._raw = t10, r10;
        }
      }, nm = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2 = {}, d2 = {}, h2) {
          this.id = e11, this.emailAddress = t10, this.role = r10, this.roleName = i10, this.organizationId = n10, this.createdAt = s10, this.updatedAt = a10, this.expiresAt = o3, this.url = l2, this.status = c2, this.publicMetadata = u2, this.privateMetadata = d2, this.publicOrganizationData = h2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.email_address, t10.role, t10.role_name, t10.organization_id, t10.created_at, t10.updated_at, t10.expires_at, t10.url, t10.status, t10.public_metadata, t10.private_metadata, t10.public_organization_data);
          return r10._raw = t10, r10;
        }
      }, ny = class e10 {
        constructor(e11, t10, r10, i10 = {}, n10 = {}, s10, a10, o3, l2) {
          this.id = e11, this.role = t10, this.permissions = r10, this.publicMetadata = i10, this.privateMetadata = n10, this.createdAt = s10, this.updatedAt = a10, this.organization = o3, this.publicUserData = l2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.role, t10.permissions, t10.public_metadata, t10.private_metadata, t10.created_at, t10.updated_at, ng.fromJSON(t10.organization), n_.fromJSON(t10.public_user_data));
          return r10._raw = t10, r10;
        }
      }, n_ = class e10 {
        constructor(e11, t10, r10, i10, n10, s10) {
          this.identifier = e11, this.firstName = t10, this.lastName = r10, this.imageUrl = i10, this.hasImage = n10, this.userId = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.identifier, t10.first_name, t10.last_name, t10.image_url, t10.has_image, t10.user_id);
        }
      }, nv = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2) {
          this.enabled = e11, this.maxAllowedMemberships = t10, this.maxAllowedRoles = r10, this.maxAllowedPermissions = i10, this.creatorRole = n10, this.adminDeleteEnabled = s10, this.domainsEnabled = a10, this.slugDisabled = o3, this.domainsEnrollmentModes = l2, this.domainsDefaultRole = c2;
        }
        static fromJSON(t10) {
          return new e10(t10.enabled, t10.max_allowed_memberships, t10.max_allowed_roles, t10.max_allowed_permissions, t10.creator_role, t10.admin_delete_enabled, t10.domains_enabled, t10.slug_disabled, t10.domains_enrollment_modes, t10.domains_default_role);
        }
      }, nb = class e10 {
        constructor(e11, t10, r10, i10, n10, s10) {
          this.id = e11, this.phoneNumber = t10, this.reservedForSecondFactor = r10, this.defaultSecondFactor = i10, this.verification = n10, this.linkedTo = s10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.phone_number, t10.reserved_for_second_factor, t10.default_second_factor, t10.verification && ne.fromJSON(t10.verification), t10.linked_to.map((e11) => i7.fromJSON(e11)));
        }
      }, nw = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.domainId = t10, this.lastRunAt = r10, this.proxyUrl = i10, this.successful = n10, this.createdAt = s10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.domain_id, t10.last_run_at, t10.proxy_url, t10.successful, t10.created_at, t10.updated_at);
        }
      }, nk = class e10 {
        constructor(e11, t10, r10, i10) {
          this.id = e11, this.url = t10, this.createdAt = r10, this.updatedAt = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.url, t10.created_at, t10.updated_at);
        }
      }, nS = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2, d2, h2, p2, f2, g2, m2, y2, _2, v2, b2) {
          this.id = e11, this.name = t10, this.domain = r10, this.organizationId = i10, this.idpEntityId = n10, this.idpSsoUrl = s10, this.idpCertificate = a10, this.idpMetadataUrl = o3, this.idpMetadata = l2, this.acsUrl = c2, this.spEntityId = u2, this.spMetadataUrl = d2, this.active = h2, this.provider = p2, this.userCount = f2, this.syncUserAttributes = g2, this.allowSubdomains = m2, this.allowIdpInitiated = y2, this.createdAt = _2, this.updatedAt = v2, this.attributeMapping = b2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domain, t10.organization_id, t10.idp_entity_id, t10.idp_sso_url, t10.idp_certificate, t10.idp_metadata_url, t10.idp_metadata, t10.acs_url, t10.sp_entity_id, t10.sp_metadata_url, t10.active, t10.provider, t10.user_count, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated, t10.created_at, t10.updated_at, t10.attribute_mapping && nT.fromJSON(t10.attribute_mapping));
        }
      }, nE = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2) {
          this.id = e11, this.name = t10, this.domain = r10, this.active = i10, this.provider = n10, this.syncUserAttributes = s10, this.allowSubdomains = a10, this.allowIdpInitiated = o3, this.createdAt = l2, this.updatedAt = c2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domain, t10.active, t10.provider, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated, t10.created_at, t10.updated_at);
        }
      }, nT = class e10 {
        constructor(e11, t10, r10, i10) {
          this.userId = e11, this.emailAddress = t10, this.firstName = r10, this.lastName = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.user_id, t10.email_address, t10.first_name, t10.last_name);
        }
      }, nx = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2) {
          this.id = e11, this.provider = t10, this.providerUserId = r10, this.active = i10, this.emailAddress = n10, this.firstName = s10, this.lastName = a10, this.verification = o3, this.samlConnection = l2, this.lastAuthenticatedAt = c2, this.enterpriseConnectionId = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.provider_user_id, t10.active, t10.email_address, t10.first_name, t10.last_name, t10.verification && ne.fromJSON(t10.verification), t10.saml_connection && nE.fromJSON(t10.saml_connection), t10.last_authenticated_at ?? null, t10.enterprise_connection_id);
        }
      }, nO = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.userId = t10, this.token = r10, this.status = i10, this.url = n10, this.createdAt = s10, this.updatedAt = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.user_id, t10.token, t10.status, t10.url, t10.created_at, t10.updated_at);
        }
      }, nC = class e10 {
        constructor(e11, t10) {
          this.nextAction = e11, this.supportedStrategies = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.next_action, t10.supported_strategies);
        }
      }, nP = class e10 {
        constructor(e11, t10, r10, i10) {
          this.emailAddress = e11, this.phoneNumber = t10, this.web3Wallet = r10, this.externalAccount = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.email_address && nC.fromJSON(t10.email_address), t10.phone_number && nC.fromJSON(t10.phone_number), t10.web3_wallet && nC.fromJSON(t10.web3_wallet), t10.external_account);
        }
      }, nR = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2, d2, h2, p2, f2, g2, m2, y2, _2, v2, b2, w2) {
          this.id = e11, this.status = t10, this.requiredFields = r10, this.optionalFields = i10, this.missingFields = n10, this.unverifiedFields = s10, this.verifications = a10, this.username = o3, this.emailAddress = l2, this.phoneNumber = c2, this.web3Wallet = u2, this.passwordEnabled = d2, this.firstName = h2, this.lastName = p2, this.customAction = f2, this.externalId = g2, this.createdSessionId = m2, this.createdUserId = y2, this.abandonAt = _2, this.legalAcceptedAt = v2, this.publicMetadata = b2, this.unsafeMetadata = w2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.status, t10.required_fields, t10.optional_fields, t10.missing_fields, t10.unverified_fields, t10.verifications ? nP.fromJSON(t10.verifications) : null, t10.username, t10.email_address, t10.phone_number, t10.web3_wallet, t10.password_enabled, t10.first_name, t10.last_name, t10.custom_action, t10.external_id, t10.created_session_id, t10.created_user_id, t10.abandon_at, t10.legal_accepted_at, t10.public_metadata, t10.unsafe_metadata);
        }
      }, nI = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.fromPhoneNumber = t10, this.toPhoneNumber = r10, this.message = i10, this.status = n10, this.phoneNumberId = s10, this.data = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_phone_number, t10.to_phone_number, t10.message, t10.status, t10.phone_number_id, t10.data);
        }
      }, nN = class e10 {
        constructor(e11) {
          this.jwt = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.jwt);
        }
      }, nA = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.web3Wallet = t10, this.verification = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.web3_wallet, t10.verification && ne.fromJSON(t10.verification));
        }
      }, nU = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2, d2, h2, p2, f2, g2, m2, y2, _2, v2 = {}, b2 = {}, w2 = {}, k2 = [], S2 = [], E2 = [], T2 = [], x2 = [], O2, C2, P2 = null, R2, I2, N2) {
          this.id = e11, this.passwordEnabled = t10, this.totpEnabled = r10, this.backupCodeEnabled = i10, this.twoFactorEnabled = n10, this.banned = s10, this.locked = a10, this.createdAt = o3, this.updatedAt = l2, this.imageUrl = c2, this.hasImage = u2, this.primaryEmailAddressId = d2, this.primaryPhoneNumberId = h2, this.primaryWeb3WalletId = p2, this.lastSignInAt = f2, this.externalId = g2, this.username = m2, this.firstName = y2, this.lastName = _2, this.publicMetadata = v2, this.privateMetadata = b2, this.unsafeMetadata = w2, this.emailAddresses = k2, this.phoneNumbers = S2, this.web3Wallets = E2, this.externalAccounts = T2, this.samlAccounts = x2, this.lastActiveAt = O2, this.createOrganizationEnabled = C2, this.createOrganizationsLimit = P2, this.deleteSelfEnabled = R2, this.legalAcceptedAt = I2, this.locale = N2, this._raw = null;
        }
        get raw() {
          return this._raw;
        }
        static fromJSON(t10) {
          let r10 = new e10(t10.id, t10.password_enabled, t10.totp_enabled, t10.backup_code_enabled, t10.two_factor_enabled, t10.banned, t10.locked, t10.created_at, t10.updated_at, t10.image_url, t10.has_image, t10.primary_email_address_id, t10.primary_phone_number_id, t10.primary_web3_wallet_id, t10.last_sign_in_at, t10.external_id, t10.username, t10.first_name, t10.last_name, t10.public_metadata, t10.private_metadata, t10.unsafe_metadata, (t10.email_addresses || []).map((e11) => nt.fromJSON(e11)), (t10.phone_numbers || []).map((e11) => nb.fromJSON(e11)), (t10.web3_wallets || []).map((e11) => nA.fromJSON(e11)), (t10.external_accounts || []).map((e11) => nr.fromJSON(e11)), (t10.saml_accounts || []).map((e11) => nx.fromJSON(e11)), t10.last_active_at, t10.create_organization_enabled, t10.create_organizations_limit, t10.delete_self_enabled, t10.legal_accepted_at, t10.locale);
          return r10._raw = t10, r10;
        }
        get primaryEmailAddress() {
          return this.emailAddresses.find(({ id: e11 }) => e11 === this.primaryEmailAddressId) ?? null;
        }
        get primaryPhoneNumber() {
          return this.phoneNumbers.find(({ id: e11 }) => e11 === this.primaryPhoneNumberId) ?? null;
        }
        get primaryWeb3Wallet() {
          return this.web3Wallets.find(({ id: e11 }) => e11 === this.primaryWeb3WalletId) ?? null;
        }
        get fullName() {
          return [this.firstName, this.lastName].join(" ").trim() || null;
        }
      }, nM = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10) {
          this.id = e11, this.emailAddress = t10, this.status = r10, this.invitation = i10, this.createdAt = n10, this.updatedAt = s10, this.isLocked = a10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.status, t10.invitation && no.fromJSON(t10.invitation), t10.created_at, t10.updated_at, t10.is_locked);
        }
      }, nq = class e10 {
        constructor(e11, t10, r10, i10, n10) {
          this.id = e11, this.name = t10, this.description = r10, this.slug = i10, this.avatarUrl = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.description ?? null, t10.slug, t10.avatar_url ?? null);
        }
      }, nL = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2, d2, h2) {
          this.id = e11, this.name = t10, this.slug = r10, this.description = i10, this.isDefault = n10, this.isRecurring = s10, this.hasBaseFee = a10, this.publiclyVisible = o3, this.fee = l2, this.annualFee = c2, this.annualMonthlyFee = u2, this.forPayerType = d2, this.features = h2;
        }
        static fromJSON(t10) {
          let r10 = (e11) => e11 ? { amount: e11.amount, amountFormatted: e11.amount_formatted, currency: e11.currency, currencySymbol: e11.currency_symbol } : null;
          return new e10(t10.id, t10.name, t10.slug, t10.description ?? null, t10.is_default, t10.is_recurring, t10.has_base_fee, t10.publicly_visible, r10(t10.fee), r10(t10.annual_fee), r10(t10.annual_monthly_fee), t10.for_payer_type, (t10.features ?? []).map((e11) => nq.fromJSON(e11)));
        }
      }, nD = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2, u2, d2, h2, p2, f2, g2, m2) {
          this.id = e11, this.status = t10, this.planPeriod = r10, this.periodStart = i10, this.nextPayment = n10, this.amount = s10, this.plan = a10, this.planId = o3, this.createdAt = l2, this.updatedAt = c2, this.periodEnd = u2, this.canceledAt = d2, this.pastDueAt = h2, this.endedAt = p2, this.payerId = f2, this.isFreeTrial = g2, this.lifetimePaid = m2;
        }
        static fromJSON(t10) {
          function r10(e11) {
            return e11 ? { amount: e11.amount, amountFormatted: e11.amount_formatted, currency: e11.currency, currencySymbol: e11.currency_symbol } : e11;
          }
          return new e10(t10.id, t10.status, t10.plan_period, t10.period_start, t10.next_payment, r10(t10.amount) ?? void 0, t10.plan ? nL.fromJSON(t10.plan) : null, t10.plan_id ?? null, t10.created_at, t10.updated_at, t10.period_end, t10.canceled_at, t10.past_due_at, t10.ended_at, t10.payer_id, t10.is_free_trial, r10(t10.lifetime_paid) ?? void 0);
        }
      }, nj = class e10 {
        constructor(e11, t10, r10, i10, n10, s10, a10, o3, l2, c2) {
          this.id = e11, this.status = t10, this.payerId = r10, this.createdAt = i10, this.updatedAt = n10, this.activeAt = s10, this.pastDueAt = a10, this.subscriptionItems = o3, this.nextPayment = l2, this.eligibleForFreeTrial = c2;
        }
        static fromJSON(t10) {
          let r10 = t10.next_payment ? { date: t10.next_payment.date, amount: { amount: t10.next_payment.amount.amount, amountFormatted: t10.next_payment.amount.amount_formatted, currency: t10.next_payment.amount.currency, currencySymbol: t10.next_payment.amount.currency_symbol } } : null;
          return new e10(t10.id, t10.status, t10.payer_id, t10.created_at, t10.updated_at, t10.active_at ?? null, t10.past_due_at ?? null, (t10.subscription_items ?? []).map((e11) => nD.fromJSON(e11)), r10, t10.eligible_for_free_trial ?? false);
        }
      };
      function nB(e10) {
        if ("string" != typeof e10 && "object" in e10 && "deleted" in e10) return i6.fromJSON(e10);
        switch (e10.object) {
          case "accountless_application":
            return iX.fromJSON(e10);
          case "actor_token":
            return iY.fromJSON(e10);
          case "allowlist_identifier":
            return iQ.fromJSON(e10);
          case "api_key":
            return iZ.fromJSON(e10);
          case "blocklist_identifier":
            return i0.fromJSON(e10);
          case "client":
            return i4.fromJSON(e10);
          case "cookies":
            return i3.fromJSON(e10);
          case "domain":
            return i8.fromJSON(e10);
          case "email_address":
            return nt.fromJSON(e10);
          case "email":
            return i9.fromJSON(e10);
          case "clerk_idp_oauth_access_token":
            return ni.fromJSON(e10);
          case "instance":
            return nn.fromJSON(e10);
          case "instance_restrictions":
            return ns.fromJSON(e10);
          case "instance_settings":
            return na.fromJSON(e10);
          case "invitation":
            return no.fromJSON(e10);
          case "jwt_template":
            return nh.fromJSON(e10);
          case "machine":
            return nl.fromJSON(e10);
          case "machine_scope":
            return nc.fromJSON(e10);
          case "machine_secret_key":
            return nu.fromJSON(e10);
          case "machine_to_machine_token":
            return nd.fromJSON(e10);
          case "oauth_access_token":
            return np.fromJSON(e10);
          case "oauth_application":
            return nf.fromJSON(e10);
          case "organization":
            return ng.fromJSON(e10);
          case "organization_invitation":
            return nm.fromJSON(e10);
          case "organization_membership":
            return ny.fromJSON(e10);
          case "organization_settings":
            return nv.fromJSON(e10);
          case "phone_number":
            return nb.fromJSON(e10);
          case "proxy_check":
            return nw.fromJSON(e10);
          case "redirect_url":
            return nk.fromJSON(e10);
          case "saml_connection":
            return nS.fromJSON(e10);
          case "sign_in_token":
            return nO.fromJSON(e10);
          case "sign_up_attempt":
            return nR.fromJSON(e10);
          case "session":
            return i2.fromJSON(e10);
          case "sms_message":
            return nI.fromJSON(e10);
          case "token":
            return nN.fromJSON(e10);
          case "total_count":
            return e10.total_count;
          case "user":
            return nU.fromJSON(e10);
          case "waitlist_entry":
            return nM.fromJSON(e10);
          case "commerce_plan":
            return nL.fromJSON(e10);
          case "commerce_subscription":
            return nj.fromJSON(e10);
          case "commerce_subscription_item":
            return nD.fromJSON(e10);
          case "feature":
            return nq.fromJSON(e10);
          default:
            return e10;
        }
      }
      function n$(e10) {
        var t10;
        return t10 = async (t11) => {
          let r10, { secretKey: i10, machineSecretKey: n10, useMachineSecretKey: s10 = false, requireSecretKey: a10 = true, apiUrl: o3 = t3, apiVersion: l2 = "v1", userAgent: c2 = t6, skipApiVersionInUrl: u2 = false } = e10, { path: d2, method: h2, queryParams: p2, headerParams: f2, bodyParams: g2, formData: m2, options: y2 } = t11, { deepSnakecaseBodyParamKeys: _2 = false } = y2 || {};
          a10 && rR(i10);
          let v2 = new URL(u2 ? rD(o3, d2) : rD(o3, l2, d2));
          if (p2) for (let [e11, t12] of Object.entries(iG({ ...p2 }))) t12 && [t12].flat().forEach((t13) => v2.searchParams.append(e11, t13));
          let b2 = new Headers({ "Clerk-API-Version": t8, [rE]: c2, ...f2 }), w2 = rr;
          !b2.has(w2) && (s10 && n10 ? b2.set(w2, `Bearer ${n10}`) : i10 && b2.set(w2, `Bearer ${i10}`));
          try {
            var k2;
            m2 ? r10 = await tM.fetch(v2.href, { method: h2, headers: b2, body: m2 }) : (b2.set("Content-Type", "application/json"), r10 = await tM.fetch(v2.href, { method: h2, headers: b2, ...(() => {
              if (!("GET" !== h2 && g2 && Object.keys(g2).length > 0)) return null;
              let e12 = (e13) => iG(e13, { deep: _2 });
              return { body: JSON.stringify(Array.isArray(g2) ? g2.map(e12) : e12(g2)) };
            })() }));
            let e11 = r10?.headers && r10.headers?.get(rh) === rx, t12 = await (e11 ? r10.json() : r10.text());
            if (!r10.ok) return { data: null, errors: nH(t12), status: r10?.status, statusText: r10?.statusText, clerkTraceId: nz(t12, r10?.headers), retryAfter: nK(r10?.headers) };
            return { ...Array.isArray(t12) ? { data: t12.map((e12) => nB(e12)) } : (k2 = t12) && "object" == typeof k2 && "data" in k2 && Array.isArray(k2.data) && void 0 !== k2.data ? { data: t12.data.map((e12) => nB(e12)), totalCount: t12.total_count } : { data: nB(t12) }, errors: null };
          } catch (e11) {
            if (e11 instanceof Error) return { data: null, errors: [{ code: "unexpected_error", message: e11.message || "Unexpected error" }], clerkTraceId: nz(e11, r10?.headers) };
            return { data: null, errors: nH(e11), status: r10?.status, statusText: r10?.statusText, clerkTraceId: nz(e11, r10?.headers), retryAfter: nK(r10?.headers) };
          }
        }, async (...e11) => {
          let { data: r10, errors: i10, totalCount: n10, status: s10, statusText: a10, clerkTraceId: o3, retryAfter: l2 } = await t10(...e11);
          if (i10) {
            let e12 = new th(a10 || "", { data: [], status: s10, clerkTraceId: o3, retryAfter: l2 });
            throw e12.errors = i10, e12;
          }
          return void 0 !== n10 ? { data: r10, totalCount: n10 } : r10;
        };
      }
      function nz(e10, t10) {
        return e10 && "object" == typeof e10 && "clerk_trace_id" in e10 && "string" == typeof e10.clerk_trace_id ? e10.clerk_trace_id : t10?.get("cf-ray") || "";
      }
      function nK(e10) {
        let t10 = e10?.get("Retry-After");
        if (!t10) return;
        let r10 = parseInt(t10, 10);
        if (!isNaN(r10)) return r10;
      }
      function nH(e10) {
        if (e10 && "object" == typeof e10 && "errors" in e10) {
          let t10 = e10.errors;
          return t10.length > 0 ? t10.map(tu) : [];
        }
        return [];
      }
      function nJ(e10) {
        let t10 = n$(e10);
        return { __experimental_accountlessApplications: new rK(n$({ ...e10, requireSecretKey: false })), actorTokens: new r$(t10), allowlistIdentifiers: new rJ(t10), apiKeys: new rF(n$({ ...e10, skipApiVersionInUrl: true })), betaFeatures: new rW(t10), blocklistIdentifiers: new rX(t10), billing: new iN(t10), clients: new rQ(t10), domains: new r0(t10), emailAddresses: new r2(t10), idPOAuthAccessToken: new r4(n$({ ...e10, skipApiVersionInUrl: true })), instance: new r3(t10), invitations: new r8(t10), jwks: new ir(t10), jwtTemplates: new is(t10), machines: new r7(t10), m2m: new it(n$({ ...e10, skipApiVersionInUrl: true, requireSecretKey: false, useMachineSecretKey: true })), oauthApplications: new ic(t10), organizations: new io(t10), phoneNumbers: new id(t10), proxyChecks: new ih(t10), redirectUrls: new ig(t10), samlConnections: new iy(t10), sessions: new iv(t10), signInTokens: new iw(t10), signUps: new iS(t10), testingTokens: new iE(t10), users: new ix(t10), waitlistEntries: new iC(t10), webhooks: new iR(t10) };
      }
      var nV = "oat_", nF = ["mt_", nV, "ak_"], nW = /^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/;
      function nG(e10) {
        return nW.test(e10);
      }
      var nX = ["at+jwt", "application/at+jwt"];
      function nY(e10) {
        if (!nG(e10)) return false;
        try {
          let { data: t10, errors: r10 } = tJ(e10);
          return !r10 && !!t10 && nX.includes(t10.header.typ);
        } catch {
          return false;
        }
      }
      function nQ(e10) {
        return nF.some((t10) => e10.startsWith(t10));
      }
      function nZ(e10) {
        return nQ(e10) || nY(e10);
      }
      function n0(e10) {
        if (e10.startsWith("mt_")) return rA;
        if (e10.startsWith(nV) || nY(e10)) return rU;
        if (e10.startsWith("ak_")) return rN;
        throw Error("Unknown machine token type");
      }
      var n1 = (e10, t10) => !!e10 && ("any" === t10 || (Array.isArray(t10) ? t10 : [t10]).includes(e10)), n2 = (e10) => () => {
        let t10 = { ...e10 };
        return t10.secretKey = (t10.secretKey || "").substring(0, 7), t10.jwtKey = (t10.jwtKey || "").substring(0, 7), { ...t10 };
      };
      function n4(e10, t10) {
        return { tokenType: rI, sessionClaims: null, sessionId: null, sessionStatus: t10 ?? null, userId: null, actor: null, orgId: null, orgRole: null, orgSlug: null, orgPermissions: null, factorVerificationAge: null, getToken: () => Promise.resolve(null), has: () => false, debug: n2(e10), isAuthenticated: false };
      }
      function n5(e10, t10) {
        let r10 = { id: null, subject: null, scopes: null, has: () => false, getToken: () => Promise.resolve(null), debug: n2(t10), isAuthenticated: false };
        switch (e10) {
          case rN:
            return { ...r10, tokenType: e10, name: null, claims: null, scopes: null, userId: null, orgId: null };
          case rA:
            return { ...r10, tokenType: e10, claims: null, scopes: null, machineId: null };
          case rU:
            return { ...r10, tokenType: e10, scopes: null, userId: null, clientId: null };
          default:
            throw Error(`Invalid token type: ${e10}`);
        }
      }
      function n3() {
        return { isAuthenticated: false, tokenType: null, getToken: () => Promise.resolve(null), has: () => false, debug: () => ({}) };
      }
      var n6 = ({ authObject: e10, acceptsToken: t10 = rI }) => {
        if ("any" === t10) return e10;
        if (Array.isArray(t10)) return n1(e10.tokenType, t10) ? e10 : n3();
        if (!n1(e10.tokenType, t10)) return t10 === rN || t10 === rA || t10 === rU ? n5(t10, e10.debug) : n4(e10.debug);
        return e10;
      }, n8 = "signed-out", n9 = "handshake", n7 = "satellite-needs-syncing", se = "token-type-mismatch", st = "unexpected-error";
      function sr(e10) {
        let { authenticateContext: t10, headers: r10 = new Headers(), token: i10 } = e10;
        return { status: "signed-in", reason: null, message: null, proxyUrl: t10.proxyUrl || "", publishableKey: t10.publishableKey || "", isSatellite: t10.isSatellite || false, domain: t10.domain || "", signInUrl: t10.signInUrl || "", signUpUrl: t10.signUpUrl || "", afterSignInUrl: t10.afterSignInUrl || "", afterSignUpUrl: t10.afterSignUpUrl || "", isSignedIn: true, isAuthenticated: true, tokenType: e10.tokenType, toAuth: ({ treatPendingAsSignedOut: r11 = true } = {}) => {
          if (e10.tokenType === rI) {
            let { sessionClaims: n11 } = e10, s11 = function(e11, t11, r12) {
              let i11, { actor: n12, sessionId: s12, sessionStatus: a11, userId: o3, orgId: l2, orgRole: c2, orgSlug: u2, orgPermissions: d2, factorVerificationAge: h2 } = ((e12) => {
                let t12, r13, i12, n13, s13 = e12.fva ?? null, a12 = e12.sts ?? null;
                if (2 === e12.v) {
                  if (e12.o) {
                    t12 = e12.o?.id, i12 = e12.o?.slg, e12.o?.rol && (r13 = `org:${e12.o?.rol}`);
                    let { org: s14 } = t0(e12.fea), { permissions: a13, featurePermissionMap: o4 } = (({ per: e13, fpm: t13 }) => {
                      if (!e13 || !t13) return { permissions: [], featurePermissionMap: [] };
                      let r14 = e13.split(",").map((e14) => e14.trim());
                      return { permissions: r14, featurePermissionMap: t13.split(",").map((e14) => Number.parseInt(e14.trim(), 10)).map((e14) => e14.toString(2).padStart(r14.length, "0").split("").map((e15) => Number.parseInt(e15, 10)).reverse()).filter(Boolean) };
                    })({ per: e12.o?.per, fpm: e12.o?.fpm });
                    n13 = function({ features: e13, permissions: t13, featurePermissionMap: r14 }) {
                      if (!e13 || !t13 || !r14) return [];
                      let i13 = [];
                      for (let n14 = 0; n14 < e13.length; n14++) {
                        let s15 = e13[n14];
                        if (n14 >= r14.length) continue;
                        let a14 = r14[n14];
                        if (a14) for (let e14 = 0; e14 < a14.length; e14++) 1 === a14[e14] && i13.push(`org:${s15}:${t13[e14]}`);
                      }
                      return i13;
                    }({ features: s14, featurePermissionMap: o4, permissions: a13 });
                  }
                } else t12 = e12.org_id, r13 = e12.org_role, i12 = e12.org_slug, n13 = e12.org_permissions;
                return { sessionClaims: e12, sessionId: e12.sid, sessionStatus: a12, actor: e12.act, userId: e12.sub, orgId: t12, orgRole: r13, orgSlug: i12, orgPermissions: n13, factorVerificationAge: s13 };
              })(r12), p2 = nJ(e11), f2 = ((e12) => {
                let { fetcher: t12, sessionToken: r13, sessionId: i12 } = e12 || {};
                return async (e13 = {}) => i12 ? e13.template || void 0 !== e13.expiresInSeconds ? t12(i12, e13.template, e13.expiresInSeconds) : r13 : null;
              })({ sessionId: s12, sessionToken: t11, fetcher: async (e12, t12, r13) => (await p2.sessions.getToken(e12, t12 || "", r13)).jwt });
              return { tokenType: rI, actor: n12, sessionClaims: r12, sessionId: s12, sessionStatus: a11, userId: o3, orgId: l2, orgRole: c2, orgSlug: u2, orgPermissions: d2, factorVerificationAge: h2, getToken: f2, has: (i11 = { orgId: l2, orgRole: c2, orgPermissions: d2, userId: o3, factorVerificationAge: h2, features: r12.fea || "", plans: r12.pla || "" }, (e12) => {
                if (!i11.userId) return false;
                let t12 = ((e13, t13) => {
                  let { features: r14, plans: i12 } = t13;
                  return e13.feature && r14 ? tZ(r14, e13.feature) : e13.plan && i12 ? tZ(i12, e13.plan) : null;
                })(e12, i11), r13 = ((e13, t13) => {
                  let { orgId: r14, orgRole: i12, orgPermissions: n14 } = t13;
                  return (e13.role || e13.permission) && r14 && i12 && n14 ? e13.permission ? n14.includes(e13.permission.replace(/^(org:)*/, "org:")) : e13.role ? i12.replace(/^(org:)*/, "org:") === e13.role.replace(/^(org:)*/, "org:") : null : null;
                })(e12, i11), n13 = ((e13, { factorVerificationAge: t13 }) => {
                  if (!e13.reverification || !t13) return null;
                  let r14 = ((e14) => {
                    let t14, r15;
                    if (!e14) return false;
                    let i13 = "string" == typeof e14 && tQ.has(e14), n15 = "object" == typeof e14 && (t14 = e14.level, tY.has(t14)) && "number" == typeof (r15 = e14.afterMinutes) && r15 > 0;
                    return (!!i13 || !!n15) && ((e15) => "string" == typeof e15 ? tX[e15] : e15).bind(null, e14);
                  })(e13.reverification);
                  if (!r14) return null;
                  let { level: i12, afterMinutes: n14 } = r14(), [s13, a12] = t13, o4 = -1 !== s13 ? n14 > s13 : null, l3 = -1 !== a12 ? n14 > a12 : null;
                  switch (i12) {
                    case "first_factor":
                      return o4;
                    case "second_factor":
                      return -1 !== a12 ? l3 : o4;
                    case "multi_factor":
                      return -1 === a12 ? o4 : o4 && l3;
                  }
                })(e12, i11);
                return [t12 || r13, n13].some((e13) => null === e13) ? [t12 || r13, n13].some((e13) => true === e13) : [t12 || r13, n13].every((e13) => true === e13);
              }), debug: n2({ ...e11, sessionToken: t11 }), isAuthenticated: true };
            }(t10, i10, n11);
            return r11 && "pending" === s11.sessionStatus ? n4(void 0, s11.sessionStatus) : s11;
          }
          let { machineData: n10 } = e10;
          var s10 = e10.tokenType;
          let a10 = { id: n10.id, subject: n10.subject, getToken: () => Promise.resolve(i10), has: () => false, debug: n2(t10), isAuthenticated: true };
          switch (s10) {
            case rN:
              return { ...a10, tokenType: s10, name: n10.name, claims: n10.claims, scopes: n10.scopes, userId: n10.subject.startsWith("user_") ? n10.subject : null, orgId: n10.subject.startsWith("org_") ? n10.subject : null };
            case rA:
              return { ...a10, tokenType: s10, claims: n10.claims, scopes: n10.scopes, machineId: n10.subject };
            case rU:
              return { ...a10, tokenType: s10, scopes: n10.scopes, userId: n10.subject, clientId: n10.clientId };
            default:
              throw Error(`Invalid token type: ${s10}`);
          }
        }, headers: r10, token: i10 };
      }
      function si(e10) {
        let { authenticateContext: t10, headers: r10 = new Headers(), reason: i10, message: n10 = "", tokenType: s10 } = e10;
        return sn({ status: n8, reason: i10, message: n10, proxyUrl: t10.proxyUrl || "", publishableKey: t10.publishableKey || "", isSatellite: t10.isSatellite || false, domain: t10.domain || "", signInUrl: t10.signInUrl || "", signUpUrl: t10.signUpUrl || "", afterSignInUrl: t10.afterSignInUrl || "", afterSignUpUrl: t10.afterSignUpUrl || "", isSignedIn: false, isAuthenticated: false, tokenType: s10, toAuth: () => s10 === rI ? n4({ ...t10, status: n8, reason: i10, message: n10 }) : n5(s10, { reason: i10, message: n10, headers: r10 }), headers: r10, token: null });
      }
      var sn = (e10) => {
        let t10 = new Headers(e10.headers || {});
        if (e10.message) try {
          t10.set(rt, e10.message);
        } catch {
        }
        if (e10.reason) try {
          t10.set(ri, e10.reason);
        } catch {
        }
        if (e10.status) try {
          t10.set(rs, e10.status);
        } catch {
        }
        return e10.headers = t10, e10;
      }, ss = class extends URL {
        isCrossOrigin(e10) {
          return this.origin !== new URL(e10.toString()).origin;
        }
      }, sa = (...e10) => new ss(...e10), so = class extends Request {
        constructor(e10, t10) {
          super("string" != typeof e10 && "url" in e10 ? e10.url : String(e10), t10 || "string" == typeof e10 ? void 0 : e10), this.clerkUrl = this.deriveUrlFromHeaders(this), this.cookies = this.parseCookies(this);
        }
        toJSON() {
          return { url: this.clerkUrl.href, method: this.method, headers: JSON.stringify(Object.fromEntries(this.headers)), clerkUrl: this.clerkUrl.toString(), cookies: JSON.stringify(Object.fromEntries(this.cookies)) };
        }
        deriveUrlFromHeaders(e10) {
          let t10 = new URL(e10.url), r10 = e10.headers.get(ry), i10 = e10.headers.get(rm), n10 = e10.headers.get(r_), s10 = t10.protocol, a10 = this.getFirstValueFromHeader(i10) ?? n10, o3 = this.getFirstValueFromHeader(r10) ?? s10?.replace(/[:/]/, ""), l2 = a10 && o3 ? `${o3}://${a10}` : t10.origin;
          return l2 === t10.origin ? sa(t10) : sa(t10.pathname + t10.search, l2);
        }
        getFirstValueFromHeader(e10) {
          return e10?.split(",")[0];
        }
        parseCookies(e10) {
          return new Map(Object.entries((0, t1.parse)(this.decodeCookieValue(e10.headers.get("cookie") || ""))));
        }
        decodeCookieValue(e10) {
          return e10 ? e10.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : e10;
        }
      }, sl = (...e10) => e10[0] instanceof so ? e10[0] : new so(...e10), sc = (e10) => e10.split(";")[0]?.split("=")[0], su = (e10) => e10.split(";")[0]?.split("=")[1], sd = {}, sh = 0;
      function sp(e10, t10, r10 = true) {
        sd[e10] = t10, sh = r10 ? Date.now() : -1;
      }
      function sf(e10) {
        let { kid: t10, pem: r10 } = e10, i10 = `local-${t10}`, n10 = sd[i10];
        if (n10) return n10;
        if (!r10) throw new tC({ action: tO, message: "Missing local JWK.", reason: "jwk-local-missing" });
        let s10 = { kid: i10, kty: "RSA", alg: "RS256", n: r10.replace(/\r\n|\n|\r/g, "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA", "").replace("IDAQAB", "").replace(/\+/g, "-").replace(/\//g, "_"), e: "AQAB" };
        return sp(i10, s10, false), s10;
      }
      async function sg(e10) {
        let { secretKey: t10, apiUrl: r10 = t3, apiVersion: i10 = "v1", kid: n10, skipJwksCache: s10 } = e10;
        if (s10 || function() {
          if (-1 === sh) return false;
          let e11 = Date.now() - sh >= 3e5;
          return e11 && (sd = {}), e11;
        }() || !sd[n10]) {
          if (!t10) throw new tC({ action: tT, message: "Failed to load JWKS from Clerk Backend or Frontend API.", reason: tS });
          let { keys: e11 } = await to(() => sm(r10, t10, i10));
          if (!e11 || !e11.length) throw new tC({ action: tT, message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.", reason: tS });
          e11.forEach((e12) => sp(e12.kid, e12));
        }
        let a10 = sd[n10];
        if (!a10) {
          let e11 = Object.values(sd).map((e12) => e12.kid).sort().join(", ");
          throw new tC({ action: `Go to your Dashboard and validate your secret and public keys are correct. ${tT} if the issue persists.`, message: `Unable to find a signing key in JWKS that matches the kid='${n10}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${e11}`, reason: "jwk-kid-mismatch" });
        }
        return a10;
      }
      async function sm(e10, t10, r10) {
        if (!t10) throw new tC({ action: "Set the CLERK_SECRET_KEY environment variable.", message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.", reason: tS });
        let i10 = new URL(e10);
        i10.pathname = rD(i10.pathname, r10, "/jwks");
        let n10 = await tM.fetch(i10.href, { headers: { Authorization: `Bearer ${t10}`, "Clerk-API-Version": t8, "Content-Type": "application/json", "User-Agent": t6 } });
        if (!n10.ok) {
          let e11 = await n10.json(), t11 = sy(e11?.errors, "clerk_key_invalid");
          if (t11) throw new tC({ action: tT, message: t11.message, reason: "secret-key-invalid" });
          throw new tC({ action: tT, message: `Error loading Clerk JWKS from ${i10.href} with code=${n10.status}`, reason: tS });
        }
        return n10.json();
      }
      var sy = (e10, t10) => e10 ? e10.find((e11) => e11.code === t10) : null;
      async function s_(e10, t10) {
        let { data: r10, errors: i10 } = tJ(e10);
        if (i10) return { errors: i10 };
        let { header: n10 } = r10, { kid: s10 } = n10;
        try {
          let r11;
          if (t10.jwtKey) r11 = sf({ kid: s10, pem: t10.jwtKey });
          else {
            if (!t10.secretKey) return { errors: [new tC({ action: tO, message: "Failed to resolve JWK during verification.", reason: tE })] };
            r11 = await sg({ ...t10, kid: s10 });
          }
          return await tV(e10, { ...t10, key: r11 });
        } catch (e11) {
          return { errors: [e11] };
        }
      }
      function sv(e10, t10, r10) {
        if (t10 && "clerkError" in t10) {
          let i10, n10;
          switch (t10.status) {
            case 401:
              i10 = "secret-key-invalid", n10 = t10.errors[0]?.message || "Invalid secret key";
              break;
            case 404:
              i10 = tP, n10 = r10;
              break;
            default:
              i10 = tR, n10 = "Unexpected error";
          }
          return { data: void 0, tokenType: e10, errors: [new tN({ message: n10, code: i10, status: t10.status })] };
        }
        return { data: void 0, tokenType: e10, errors: [new tN({ message: "Unexpected error", code: tR, status: t10.status })] };
      }
      async function sb(e10, t10) {
        try {
          let r10 = nJ(t10);
          return { data: await r10.m2m.verify({ token: e10 }), tokenType: rA, errors: void 0 };
        } catch (e11) {
          return sv(rA, e11, "Machine token not found");
        }
      }
      async function sw(e10, t10) {
        let r10, i10;
        try {
          r10 = tJ(e10);
        } catch (e11) {
          return { data: void 0, tokenType: rU, errors: [new tN({ code: tP, message: e11.message })] };
        }
        let { data: n10, errors: s10 } = r10;
        if (s10) return { data: void 0, tokenType: rU, errors: [new tN({ code: tP, message: s10[0].message })] };
        let { header: a10 } = n10, { kid: o3 } = a10;
        try {
          if (t10.jwtKey) i10 = sf({ kid: o3, pem: t10.jwtKey });
          else {
            if (!t10.secretKey) return { data: void 0, tokenType: rU, errors: [new tN({ action: tO, message: "Failed to resolve JWK during verification.", code: tI })] };
            i10 = await sg({ ...t10, kid: o3 });
          }
          let { data: r11, errors: n11 } = await tV(e10, { ...t10, key: i10, headerType: nX });
          if (n11) return { data: void 0, tokenType: rU, errors: [new tN({ code: tI, message: n11[0].message })] };
          return { data: ni.fromJwtPayload(r11, t10.clockSkewInMs), tokenType: rU, errors: void 0 };
        } catch (e11) {
          return { tokenType: rU, errors: [new tN({ code: tI, message: e11.message })] };
        }
      }
      async function sk(e10, t10) {
        if (nG(e10)) return sw(e10, t10);
        try {
          let r10 = nJ(t10);
          return { data: await r10.idPOAuthAccessToken.verify(e10), tokenType: rU, errors: void 0 };
        } catch (e11) {
          return sv(rU, e11, "OAuth token not found");
        }
      }
      async function sS(e10, t10) {
        try {
          let r10 = nJ(t10);
          return { data: await r10.apiKeys.verify(e10), tokenType: rN, errors: void 0 };
        } catch (e11) {
          return sv(rN, e11, "API key not found");
        }
      }
      async function sE(e10, t10) {
        if (e10.startsWith("mt_")) return sb(e10, t10);
        if (e10.startsWith(nV) || nG(e10)) return sk(e10, t10);
        if (e10.startsWith("ak_")) return sS(e10, t10);
        throw Error("Unknown machine token type");
      }
      async function sT(e10, { key: t10 }) {
        let { data: r10, errors: i10 } = tJ(e10);
        if (i10) throw i10[0];
        let { header: n10, payload: s10 } = r10, { typ: a10, alg: o3 } = n10;
        tz(a10), tK(o3);
        let { data: l2, errors: c2 } = await tH(r10, t10);
        if (c2) throw new tC({ reason: tk, message: `Error verifying handshake token. ${c2[0]}` });
        if (!l2) throw new tC({ reason: tv, message: "Handshake signature is invalid." });
        return s10;
      }
      async function sx(e10, t10) {
        let r10, { secretKey: i10, apiUrl: n10, apiVersion: s10, jwksCacheTtlInMs: a10, jwtKey: o3, skipJwksCache: l2 } = t10, { data: c2, errors: u2 } = tJ(e10);
        if (u2) throw u2[0];
        let { kid: d2 } = c2.header;
        if (o3) r10 = sf({ kid: d2, pem: o3 });
        else if (i10) r10 = await sg({ secretKey: i10, apiUrl: n10, apiVersion: s10, kid: d2, jwksCacheTtlInMs: a10, skipJwksCache: l2 });
        else throw new tC({ action: tO, message: "Failed to resolve JWK during handshake verification.", reason: tE });
        return sT(e10, { key: r10 });
      }
      var sO = class {
        constructor(e10, t10, r10) {
          this.authenticateContext = e10, this.options = t10, this.organizationMatcher = r10;
        }
        isRequestEligibleForHandshake() {
          let { accept: e10, secFetchDest: t10 } = this.authenticateContext;
          return !!("document" === t10 || "iframe" === t10 || !t10 && e10?.startsWith("text/html"));
        }
        buildRedirectToHandshake(e10) {
          if (!this.authenticateContext?.clerkUrl) throw Error("Missing clerkUrl in authenticateContext");
          let t10 = this.removeDevBrowserFromURL(this.authenticateContext.clerkUrl), r10 = this.authenticateContext.frontendApi.startsWith("http") ? this.authenticateContext.frontendApi : `https://${this.authenticateContext.frontendApi}`, i10 = new URL("v1/client/handshake", r10 = r10.replace(/\/+$/, "") + "/");
          i10.searchParams.append("redirect_url", t10?.href || ""), i10.searchParams.append("__clerk_api_version", t8), i10.searchParams.append(t7.SuffixedCookies, this.authenticateContext.usesSuffixedCookies().toString()), i10.searchParams.append(t7.HandshakeReason, e10), i10.searchParams.append(t7.HandshakeFormat, "nonce"), "development" === this.authenticateContext.instanceType && this.authenticateContext.devBrowserToken && i10.searchParams.append(t7.DevBrowser, this.authenticateContext.devBrowserToken);
          let n10 = this.getOrganizationSyncTarget(this.authenticateContext.clerkUrl, this.organizationMatcher);
          return n10 && this.getOrganizationSyncQueryParams(n10).forEach((e11, t11) => {
            i10.searchParams.append(t11, e11);
          }), new Headers({ [rv]: i10.href });
        }
        async getCookiesFromHandshake() {
          let e10 = [];
          if (this.authenticateContext.handshakeNonce) try {
            let t10 = await this.authenticateContext.apiClient?.clients.getHandshakePayload({ nonce: this.authenticateContext.handshakeNonce });
            t10 && e10.push(...t10.directives);
          } catch (e11) {
            console.error("Clerk: HandshakeService: error getting handshake payload:", e11);
          }
          else if (this.authenticateContext.handshakeToken) {
            let t10 = await sx(this.authenticateContext.handshakeToken, this.authenticateContext);
            t10 && Array.isArray(t10.handshake) && e10.push(...t10.handshake);
          }
          return e10;
        }
        async resolveHandshake() {
          let e10 = new Headers({ "Access-Control-Allow-Origin": "null", "Access-Control-Allow-Credentials": "true" }), t10 = await this.getCookiesFromHandshake(), r10 = "";
          if (t10.forEach((t11) => {
            e10.append("Set-Cookie", t11), sc(t11).startsWith(t9.Session) && (r10 = su(t11));
          }), "development" === this.authenticateContext.instanceType) {
            let t11 = new URL(this.authenticateContext.clerkUrl);
            t11.searchParams.delete(t7.Handshake), t11.searchParams.delete(t7.HandshakeHelp), t11.searchParams.delete(t7.DevBrowser), t11.searchParams.delete(t7.HandshakeNonce), e10.append(rv, t11.toString()), e10.set(ro, "no-store");
          }
          if ("" === r10) return si({ tokenType: rI, authenticateContext: this.authenticateContext, reason: "session-token-missing", message: "", headers: e10 });
          let { data: i10, errors: [n10] = [] } = await s_(r10, this.authenticateContext);
          if (i10) return sr({ tokenType: rI, authenticateContext: this.authenticateContext, sessionClaims: i10, headers: e10, token: r10 });
          if ("development" === this.authenticateContext.instanceType && (n10?.reason === ty || n10?.reason === tb || n10?.reason === tw)) {
            let t11 = new tC({ action: n10.action, message: n10.message, reason: n10.reason });
            t11.tokenCarrier = "cookie", console.error(`Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${t11.getFullMessage()}`);
            let { data: i11, errors: [s10] = [] } = await s_(r10, { ...this.authenticateContext, clockSkewInMs: 864e5 });
            if (i11) return sr({ tokenType: rI, authenticateContext: this.authenticateContext, sessionClaims: i11, headers: e10, token: r10 });
            throw Error(s10?.message || "Clerk: Handshake retry failed.");
          }
          throw Error(n10?.message || "Clerk: Handshake failed.");
        }
        handleTokenVerificationErrorInDevelopment(e10) {
          if (e10.reason === tv) throw Error("Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.");
          throw Error(`Clerk: Handshake token verification failed: ${e10.getFullMessage()}.`);
        }
        checkAndTrackRedirectLoop(e10) {
          if (3 === this.authenticateContext.handshakeRedirectLoopCounter) return true;
          let t10 = this.authenticateContext.handshakeRedirectLoopCounter + 1, r10 = t9.RedirectCount;
          return e10.append("Set-Cookie", `${r10}=${t10}; SameSite=Lax; HttpOnly; Max-Age=2`), false;
        }
        removeDevBrowserFromURL(e10) {
          let t10 = new URL(e10);
          return t10.searchParams.delete(t7.DevBrowser), t10.searchParams.delete(t7.LegacyDevBrowser), t10;
        }
        getOrganizationSyncTarget(e10, t10) {
          return t10.findTarget(e10);
        }
        getOrganizationSyncQueryParams(e10) {
          let t10 = /* @__PURE__ */ new Map();
          return "personalAccount" === e10.type && t10.set("organization_id", ""), "organization" === e10.type && (e10.organizationId && t10.set("organization_id", e10.organizationId), e10.organizationSlug && t10.set("organization_id", e10.organizationSlug)), t10;
        }
      }, sC = class {
        constructor(e10) {
          this.organizationPattern = this.createMatcher(e10?.organizationPatterns), this.personalAccountPattern = this.createMatcher(e10?.personalAccountPatterns);
        }
        createMatcher(e10) {
          if (!e10) return null;
          try {
            return function(e11, t10) {
              try {
                var r10, i10, n10, s10, a10, o3, l2;
                return r10 = void 0, i10 = [], n10 = t5(e11, i10, r10), s10 = i10, a10 = r10, void 0 === a10 && (a10 = {}), o3 = a10.decode, l2 = void 0 === o3 ? function(e12) {
                  return e12;
                } : o3, function(e12) {
                  var t11 = n10.exec(e12);
                  if (!t11) return false;
                  for (var r11 = t11[0], i11 = t11.index, a11 = /* @__PURE__ */ Object.create(null), o4 = 1; o4 < t11.length; o4++) !function(e13) {
                    if (void 0 !== t11[e13]) {
                      var r12 = s10[e13 - 1];
                      "*" === r12.modifier || "+" === r12.modifier ? a11[r12.name] = t11[e13].split(r12.prefix + r12.suffix).map(function(e14) {
                        return l2(e14, r12);
                      }) : a11[r12.name] = l2(t11[e13], r12);
                    }
                  }(o4);
                  return { path: r11, index: i11, params: a11 };
                };
              } catch (e12) {
                throw Error(`Invalid path and options: Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${e12.message}`);
              }
            }(e10);
          } catch (t10) {
            throw Error(`Invalid pattern "${e10}": ${t10}`);
          }
        }
        findTarget(e10) {
          let t10 = this.findOrganizationTarget(e10);
          return t10 || this.findPersonalAccountTarget(e10);
        }
        findOrganizationTarget(e10) {
          if (!this.organizationPattern) return null;
          try {
            let t10 = this.organizationPattern(e10.pathname);
            if (!t10 || !("params" in t10)) return null;
            let r10 = t10.params;
            if (r10.id) return { type: "organization", organizationId: r10.id };
            if (r10.slug) return { type: "organization", organizationSlug: r10.slug };
            return null;
          } catch (e11) {
            return console.error("Failed to match organization pattern:", e11), null;
          }
        }
        findPersonalAccountTarget(e10) {
          if (!this.personalAccountPattern) return null;
          try {
            return this.personalAccountPattern(e10.pathname) ? { type: "personalAccount" } : null;
          } catch (e11) {
            return console.error("Failed to match personal account pattern:", e11), null;
          }
        }
      };
      function sP(e10, t10, r10) {
        return n1(e10, t10) ? null : si({ tokenType: "string" == typeof t10 ? t10 : e10, authenticateContext: r10, reason: se });
      }
      var sR = async (e10, t10) => {
        let r10 = await rq(sl(e10), t10), i10 = t10.acceptsToken ?? rI;
        if (i10 !== rA && (rR(r10.secretKey), r10.isSatellite)) {
          var n10 = r10.signInUrl, s10 = r10.secretKey;
          if (!n10 && tr(s10)) throw Error("Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite");
          if (r10.signInUrl && r10.origin && function(e11, t11) {
            let r11;
            try {
              r11 = new URL(e11);
            } catch {
              throw Error("The signInUrl needs to have a absolute url format.");
            }
            if (r11.origin === t11) throw Error("The signInUrl needs to be on a different origin than your satellite application.");
          }(r10.signInUrl, r10.origin), !(r10.proxyUrl || r10.domain)) throw Error("Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl");
        }
        i10 === rA && function(e11) {
          if (!e11.machineSecretKey && !e11.secretKey) throw Error("Machine token authentication requires either a Machine secret key or a Clerk secret key. Ensure a Clerk secret key or Machine secret key is set.");
        }(r10);
        let a10 = new sC(t10.organizationSyncOptions), o3 = new sO(r10, { organizationSyncOptions: t10.organizationSyncOptions }, a10);
        async function l2(r11) {
          if (!t10.apiClient) return { data: null, error: { message: "An apiClient is needed to perform token refresh.", cause: { reason: "missing-api-client" } } };
          let { sessionToken: i11, refreshTokenInCookie: n11 } = r11;
          if (!i11) return { data: null, error: { message: "Session token must be provided.", cause: { reason: "missing-session-token" } } };
          if (!n11) return { data: null, error: { message: "Refresh token must be provided.", cause: { reason: "missing-refresh-token" } } };
          let { data: s11, errors: a11 } = tJ(i11);
          if (!s11 || a11) return { data: null, error: { message: "Unable to decode the expired session token.", cause: { reason: "expired-session-token-decode-failed", errors: a11 } } };
          if (!s11?.payload?.sid) return { data: null, error: { message: "Expired session token is missing the `sid` claim.", cause: { reason: "expired-session-token-missing-sid-claim" } } };
          try {
            return { data: (await t10.apiClient.sessions.refreshSession(s11.payload.sid, { format: "cookie", suffixed_cookies: r11.usesSuffixedCookies(), expired_token: i11 || "", refresh_token: n11 || "", request_origin: r11.clerkUrl.origin, request_headers: Object.fromEntries(Array.from(e10.headers.entries()).map(([e11, t11]) => [e11, [t11]])) })).cookies, error: null };
          } catch (e11) {
            if (!e11?.errors?.length) return { data: null, error: { message: "Unexpected Server/BAPI error", cause: { reason: "unexpected-bapi-error", errors: [e11] } } };
            if ("unexpected_error" === e11.errors[0].code) return { data: null, error: { message: "Fetch unexpected error", cause: { reason: "fetch-error", errors: e11.errors } } };
            return { data: null, error: { message: e11.errors[0].code, cause: { reason: e11.errors[0].code, errors: e11.errors } } };
          }
        }
        async function c2(e11) {
          let { data: t11, error: r11 } = await l2(e11);
          if (!t11 || 0 === t11.length) return { data: null, error: r11 };
          let i11 = new Headers(), n11 = "";
          t11.forEach((e12) => {
            i11.append("Set-Cookie", e12), sc(e12).startsWith(t9.Session) && (n11 = su(e12));
          });
          let { data: s11, errors: a11 } = await s_(n11, e11);
          return a11 ? { data: null, error: { message: "Clerk: unable to verify refreshed session token.", cause: { reason: "invalid-session-token", errors: a11 } } } : { data: { jwtPayload: s11, sessionToken: n11, headers: i11 }, error: null };
        }
        function u2(e11, t11, r11, i11) {
          if (!o3.isRequestEligibleForHandshake()) return si({ tokenType: rI, authenticateContext: e11, reason: t11, message: r11 });
          let n11 = i11 ?? o3.buildRedirectToHandshake(t11);
          return (n11.get(rv) && n11.set(ro, "no-store"), o3.checkAndTrackRedirectLoop(n11)) ? (console.log("Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard."), si({ tokenType: rI, authenticateContext: e11, reason: t11, message: r11 })) : function(e12, t12, r12 = "", i12) {
            return sn({ status: n9, reason: t12, message: r12, publishableKey: e12.publishableKey || "", isSatellite: e12.isSatellite || false, domain: e12.domain || "", proxyUrl: e12.proxyUrl || "", signInUrl: e12.signInUrl || "", signUpUrl: e12.signUpUrl || "", afterSignInUrl: e12.afterSignInUrl || "", afterSignUpUrl: e12.afterSignUpUrl || "", isSignedIn: false, isAuthenticated: false, tokenType: rI, toAuth: () => null, headers: i12, token: null });
          }(e11, t11, r11, n11);
        }
        async function d2() {
          let { tokenInHeader: e11 } = r10;
          try {
            let { data: t11, errors: i11 } = await s_(e11, r10);
            if (i11) throw i11[0];
            return sr({ tokenType: rI, authenticateContext: r10, sessionClaims: t11, headers: new Headers(), token: e11 });
          } catch (e12) {
            return p2(e12, "header");
          }
        }
        async function h2() {
          let e11 = r10.clientUat, t11 = !!r10.sessionTokenInCookie, i11 = !!r10.devBrowserToken;
          if (r10.handshakeNonce || r10.handshakeToken) try {
            return await o3.resolveHandshake();
          } catch (e12) {
            e12 instanceof tC && "development" === r10.instanceType ? o3.handleTokenVerificationErrorInDevelopment(e12) : console.error("Clerk: unable to resolve handshake:", e12);
          }
          let n11 = r10.isSatellite && "document" === r10.secFetchDest;
          if ("production" === r10.instanceType && n11) return u2(r10, n7, "");
          if ("development" === r10.instanceType && n11 && !r10.clerkUrl.searchParams.has(t7.ClerkSynced)) {
            let e12 = new URL(r10.signInUrl);
            return e12.searchParams.append(t7.ClerkRedirectUrl, r10.clerkUrl.toString()), u2(r10, n7, "", new Headers({ [rv]: e12.toString() }));
          }
          let s11 = new URL(r10.clerkUrl).searchParams.get(t7.ClerkRedirectUrl);
          if ("development" === r10.instanceType && !r10.isSatellite && s11) {
            let e12 = new URL(s11);
            return r10.devBrowserToken && e12.searchParams.append(t7.DevBrowser, r10.devBrowserToken), e12.searchParams.append(t7.ClerkSynced, "true"), u2(r10, "primary-responds-to-syncing", "", new Headers({ [rv]: e12.toString() }));
          }
          if ("development" === r10.instanceType && r10.clerkUrl.searchParams.has(t7.DevBrowser)) return u2(r10, "dev-browser-sync", "");
          if ("development" === r10.instanceType && !i11) return u2(r10, "dev-browser-missing", "");
          if (!e11 && !t11) return si({ tokenType: rI, authenticateContext: r10, reason: "session-token-and-uat-missing" });
          if (!e11 && t11) return u2(r10, "session-token-but-no-client-uat", "");
          if (e11 && !t11) return u2(r10, "client-uat-but-no-session-token", "");
          let { data: l3, errors: c3 } = tJ(r10.sessionTokenInCookie);
          if (c3) return p2(c3[0], "cookie");
          if (l3.payload.iat < r10.clientUat) return u2(r10, "session-token-iat-before-client-uat", "");
          try {
            let { data: e12, errors: t12 } = await s_(r10.sessionTokenInCookie, r10);
            if (t12) throw t12[0];
            let i12 = sr({ tokenType: rI, authenticateContext: r10, sessionClaims: e12, headers: new Headers(), token: r10.sessionTokenInCookie });
            if (!r10.isSatellite && "document" === r10.secFetchDest && r10.isCrossOriginReferrer() && !r10.isKnownClerkReferrer() && 0 === r10.handshakeRedirectLoopCounter) return u2(r10, "primary-domain-cross-origin-sync", "Cross-origin request from satellite domain requires handshake");
            let n12 = i12.toAuth();
            if (n12.userId) {
              let e13 = function(e14, t13) {
                let r11 = a10.findTarget(e14.clerkUrl);
                if (!r11) return null;
                let i13 = false;
                if ("organization" === r11.type && (r11.organizationSlug && r11.organizationSlug !== t13.orgSlug && (i13 = true), r11.organizationId && r11.organizationId !== t13.orgId && (i13 = true)), "personalAccount" === r11.type && t13.orgId && (i13 = true), !i13) return null;
                if (e14.handshakeRedirectLoopCounter >= 3) return console.warn("Clerk: Organization activation handshake loop detected. This is likely due to an invalid organization ID or slug. Skipping organization activation."), null;
                let n13 = u2(e14, "active-organization-mismatch", "");
                return "handshake" !== n13.status ? null : n13;
              }(r10, n12);
              if (e13) return e13;
            }
            return i12;
          } catch (e12) {
            return p2(e12, "cookie");
          }
        }
        async function p2(t11, i11) {
          let n11;
          if (!(t11 instanceof tC)) return si({ tokenType: rI, authenticateContext: r10, reason: st });
          if (t11.reason === ty && r10.refreshTokenInCookie && "GET" === e10.method) {
            let { data: e11, error: t12 } = await c2(r10);
            if (e11) return sr({ tokenType: rI, authenticateContext: r10, sessionClaims: e11.jwtPayload, headers: e11.headers, token: e11.sessionToken });
            n11 = t12?.cause?.reason ? t12.cause.reason : "unexpected-sdk-error";
          } else n11 = "GET" !== e10.method ? "non-eligible-non-get" : r10.refreshTokenInCookie ? null : "non-eligible-no-refresh-cookie";
          return (t11.tokenCarrier = i11, [ty, tb, tw].includes(t11.reason)) ? u2(r10, sN({ tokenError: t11.reason, refreshError: n11 }), t11.getFullMessage()) : si({ tokenType: rI, authenticateContext: r10, reason: t11.reason, message: t11.getFullMessage() });
        }
        function f2(e11, t11) {
          return t11 instanceof tN ? si({ tokenType: e11, authenticateContext: r10, reason: t11.code, message: t11.getFullMessage() }) : si({ tokenType: e11, authenticateContext: r10, reason: st });
        }
        async function g2() {
          let { tokenInHeader: e11 } = r10;
          if (!e11) return p2(Error("Missing token in header"), "header");
          if (!nZ(e11)) return si({ tokenType: i10, authenticateContext: r10, reason: se, message: "" });
          let t11 = sP(n0(e11), i10, r10);
          if (t11) return t11;
          let { data: n11, tokenType: s11, errors: a11 } = await sE(e11, r10);
          return a11 ? f2(s11, a11[0]) : sr({ tokenType: s11, authenticateContext: r10, machineData: n11, token: e11 });
        }
        async function m2() {
          let { tokenInHeader: e11 } = r10;
          if (!e11) return p2(Error("Missing token in header"), "header");
          if (nZ(e11)) {
            let t12 = sP(n0(e11), i10, r10);
            if (t12) return t12;
            let { data: n12, tokenType: s11, errors: a11 } = await sE(e11, r10);
            return a11 ? f2(s11, a11[0]) : sr({ tokenType: s11, authenticateContext: r10, machineData: n12, token: e11 });
          }
          let { data: t11, errors: n11 } = await s_(e11, r10);
          return n11 ? p2(n11[0], "header") : sr({ tokenType: rI, authenticateContext: r10, sessionClaims: t11, token: e11 });
        }
        if (Array.isArray(i10) && !function(e11, t11) {
          let r11 = null, { tokenInHeader: i11 } = t11;
          return i11 && (r11 = nZ(i11) ? n0(i11) : rI), n1(r11 ?? rI, e11);
        }(i10, r10)) {
          let e11;
          return e11 = n3(), sn({ status: n8, reason: se, message: "", proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", signInUrl: "", signUpUrl: "", afterSignInUrl: "", afterSignUpUrl: "", isSignedIn: false, isAuthenticated: false, tokenType: null, toAuth: () => e11, headers: new Headers(), token: null });
        }
        return r10.tokenInHeader ? "any" === i10 ? m2() : i10 === rI ? d2() : g2() : i10 === rU || i10 === rN || i10 === rA ? si({ tokenType: i10, authenticateContext: r10, reason: "No token in header" }) : h2();
      }, sI = (e10) => {
        let { isSignedIn: t10, isAuthenticated: r10, proxyUrl: i10, reason: n10, message: s10, publishableKey: a10, isSatellite: o3, domain: l2 } = e10;
        return { isSignedIn: t10, isAuthenticated: r10, proxyUrl: i10, reason: n10, message: s10, publishableKey: a10, isSatellite: o3, domain: l2 };
      }, sN = ({ tokenError: e10, refreshError: t10 }) => {
        switch (e10) {
          case ty:
            return `session-token-expired-refresh-${t10}`;
          case tb:
            return "session-token-nbf";
          case tw:
            return "session-token-iat-in-the-future";
          default:
            return st;
        }
      }, sA = { secretKey: "", machineSecretKey: "", jwtKey: "", apiUrl: void 0, apiVersion: void 0, proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", audience: "" };
      URLSearchParams, e.i(16852), e.i(75982), e.r(91375).actionAsyncStorage;
      var sU = e.i(68585);
      let sM = `${sU.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
      function sq() {
        throw Object.defineProperty(Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", { value: "E776", enumerable: false, configurable: true });
      }
      sU.HTTP_ERROR_FALLBACK_ERROR_CODE, sU.HTTP_ERROR_FALLBACK_ERROR_CODE, e.r(82748).unstable_rethrow, e.s(["unstable_isUnrecognizedActionError", () => sq], 55493), e.i(55493), e.i(64445), "undefined" == typeof URLPattern || URLPattern, e.i(63072), e.i(80082), e.i(72117), e.i(65179), e.i(38174), e.s([], 85835), e.i(85835);
      let sL = "x-middleware-rewrite", sD = "x-middleware-next", sj = "Location", sB = "next-url", s$ = "next-action", sz = "x-nextjs-data", sK = (e10, t10, r10) => (e10.headers.set(t10, r10), e10), sH = "__clerk_db_jwt";
      var sJ = e.i(347);
      let sV = (e10) => {
        if (!e10 || "string" != typeof e10) return e10;
        try {
          return (e10 || "").replace(/^(sk_(live|test)_)(.+?)(.{3})$/, "$1*********$4");
        } catch {
          return "";
        }
      }, sF = (e10) => (Array.isArray(e10) ? e10 : [e10]).map((e11) => "string" == typeof e11 ? sV(e11) : JSON.stringify(Object.fromEntries(Object.entries(e11).map(([e12, t10]) => [e12, sV(t10)])), null, 2)).join(", ");
      function sW(e10, t10, r10) {
        return "function" == typeof e10 ? e10(t10) : void 0 !== e10 ? e10 : void 0 !== r10 ? r10 : void 0;
      }
      let sG = (e10) => {
        let t10 = (r10) => {
          if (!r10) return r10;
          if (Array.isArray(r10)) return r10.map((e11) => "object" == typeof e11 || Array.isArray(e11) ? t10(e11) : e11);
          let i10 = { ...r10 };
          for (let r11 of Object.keys(i10)) {
            let n10 = e10(r11.toString());
            n10 !== r11 && (i10[n10] = i10[r11], delete i10[r11]), "object" == typeof i10[n10] && (i10[n10] = t10(i10[n10]));
          }
          return i10;
        };
        return t10;
      };
      function sX(e10) {
        if ("boolean" == typeof e10) return e10;
        if (null == e10) return false;
        if ("string" == typeof e10) {
          if ("true" === e10.toLowerCase()) return true;
          if ("false" === e10.toLowerCase()) return false;
        }
        let t10 = parseInt(e10, 10);
        return !isNaN(t10) && t10 > 0;
      }
      sG(function(e10) {
        return e10 ? e10.replace(/[A-Z]/g, (e11) => `_${e11.toLowerCase()}`) : "";
      }), sG(function(e10) {
        return e10 ? e10.replace(/([-_][a-z])/g, (e11) => e11.toUpperCase().replace(/-|_/, "")) : "";
      }), process.env.NEXT_PUBLIC_CLERK_JS_VERSION, process.env.NEXT_PUBLIC_CLERK_JS_URL;
      let sY = process.env.CLERK_API_VERSION || "v1", sQ = process.env.CLERK_SECRET_KEY || "", sZ = process.env.CLERK_MACHINE_SECRET_KEY || "", s0 = "pk_test_aW5mb3JtZWQtZ2liYm9uLTYwLmNsZXJrLmFjY291bnRzLmRldiQ", s1 = process.env.CLERK_ENCRYPTION_KEY || "", s2 = process.env.CLERK_API_URL || (n = te(s0)?.frontendApi, n?.startsWith("clerk.") && e4.some((e10) => n?.endsWith(e10)) ? e6 : [".lcl.dev", "lclstage.dev", ".lclclerk.com", ".accounts.lclclerk.com"].some((e10) => n?.endsWith(e10)) ? "https://api.lclclerk.com" : [".accountsstage.dev"].some((e10) => n?.endsWith(e10)) ? "https://api.clerkstage.dev" : e6), s4 = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "", s5 = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "", s3 = sX(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false, s6 = "/sign-in", s8 = sX(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED), s9 = sX(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG), s7 = sX(process.env.NEXT_PUBLIC_CLERK_KEYLESS_DISABLED) || false, ae = !(sJ.default.version.startsWith("13.") || sJ.default.version.startsWith("14.0")) && false, at = (e10) => {
        if (!(e10 instanceof Error) || !("message" in e10)) return false;
        let { message: t10 } = e10, r10 = t10.toLowerCase(), i10 = r10.includes("dynamic server usage"), n10 = r10.includes("this page needs to bail out of prerendering");
        return /Route .*? needs to bail out of prerendering at this point because it used .*?./.test(t10) || i10 || n10;
      };
      async function ar() {
        try {
          let { headers: t10 } = await Promise.resolve().then(() => e.i(40415)), r10 = await t10();
          return new B("https://placeholder.com", { headers: r10 });
        } catch (e10) {
          if (e10 && at(e10)) throw e10;
          throw Error(`Clerk: auth(), currentUser() and clerkClient(), are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e10}`);
        }
      }
      var ai = class {
        #e;
        #t = 864e5;
        constructor(e10) {
          this.#e = e10;
        }
        isEventThrottled(e10) {
          let t10 = Date.now(), r10 = this.#r(e10), i10 = this.#e.getItem(r10);
          return !!i10 && !(t10 - i10 > this.#t) || (this.#e.setItem(r10, t10), false);
        }
        #r(e10) {
          let { sk: t10, pk: r10, payload: i10, ...n10 } = e10, s10 = { ...i10, ...n10 };
          return JSON.stringify(Object.keys({ ...i10, ...n10 }).sort().map((e11) => s10[e11]));
        }
      }, an = class {
        #i = "clerk_telemetry_throttler";
        getItem(e10) {
          return this.#n()[e10];
        }
        setItem(e10, t10) {
          try {
            let r10 = this.#n();
            r10[e10] = t10, localStorage.setItem(this.#i, JSON.stringify(r10));
          } catch (e11) {
            e11 instanceof DOMException && ("QuotaExceededError" === e11.name || "NS_ERROR_DOM_QUOTA_REACHED" === e11.name) && localStorage.length > 0 && localStorage.removeItem(this.#i);
          }
        }
        removeItem(e10) {
          try {
            let t10 = this.#n();
            delete t10[e10], localStorage.setItem(this.#i, JSON.stringify(t10));
          } catch {
          }
        }
        #n() {
          try {
            let e10 = localStorage.getItem(this.#i);
            if (!e10) return {};
            return JSON.parse(e10);
          } catch {
            return {};
          }
        }
        static isSupported() {
          return false;
        }
      }, as = class {
        #e = /* @__PURE__ */ new Map();
        #s = 1e4;
        getItem(e10) {
          return this.#e.size > this.#s ? void this.#e.clear() : this.#e.get(e10);
        }
        setItem(e10, t10) {
          this.#e.set(e10, t10);
        }
        removeItem(e10) {
          this.#e.delete(e10);
        }
      };
      let aa = /* @__PURE__ */ new Set(["error", "warn", "info", "debug", "trace"]);
      var ao = class {
        #a;
        #o;
        #l = {};
        #c = [];
        #u = null;
        constructor(e10) {
          this.#a = { maxBufferSize: e10.maxBufferSize ?? 5, samplingRate: e10.samplingRate ?? 1, perEventSampling: e10.perEventSampling ?? true, disabled: e10.disabled ?? false, debug: e10.debug ?? false, endpoint: "https://clerk-telemetry.com" }, e10.clerkVersion ? this.#l.clerkVersion = e10.clerkVersion ?? "" : this.#l.clerkVersion = "", this.#l.sdk = e10.sdk, this.#l.sdkVersion = e10.sdkVersion, this.#l.publishableKey = e10.publishableKey ?? "";
          const t10 = te(e10.publishableKey);
          t10 && (this.#l.instanceType = t10.instanceType), e10.secretKey && (this.#l.secretKey = e10.secretKey.substring(0, 16)), this.#o = new ai(an.isSupported() ? new an() : new as());
        }
        get isEnabled() {
          return !("development" !== this.#l.instanceType || this.#a.disabled || "undefined" != typeof process && process.env && sX(process.env.CLERK_TELEMETRY_DISABLED));
        }
        get isDebug() {
          return this.#a.debug || "undefined" != typeof process && process.env && sX(process.env.CLERK_TELEMETRY_DEBUG);
        }
        record(e10) {
          try {
            let t10 = this.#d(e10.event, e10.payload);
            if (this.#h(t10.event, t10), !this.#p(t10, e10.eventSamplingRate)) return;
            this.#c.push({ kind: "event", value: t10 }), this.#f();
          } catch (e11) {
            console.error("[clerk/telemetry] Error recording telemetry event", e11);
          }
        }
        recordLog(e10) {
          try {
            if (!this.#g(e10)) return;
            let t10 = "string" == typeof e10?.level && aa.has(e10.level), r10 = "string" == typeof e10?.message && e10.message.trim().length > 0, i10 = null, n10 = e10?.timestamp;
            if ("number" == typeof n10 || "string" == typeof n10) {
              let e11 = new Date(n10);
              Number.isNaN(e11.getTime()) || (i10 = e11);
            }
            if (!t10 || !r10 || null === i10) {
              this.isDebug && "undefined" != typeof console && console.warn("[clerk/telemetry] Dropping invalid telemetry log entry", { levelIsValid: t10, messageIsValid: r10, timestampIsValid: null !== i10 });
              return;
            }
            let s10 = this.#m(), a10 = { sdk: s10.name, sdkv: s10.version, cv: this.#l.clerkVersion ?? "", lvl: e10.level, msg: e10.message, ts: i10.toISOString(), pk: this.#l.publishableKey || null, payload: this.#y(e10.context) };
            this.#c.push({ kind: "log", value: a10 }), this.#f();
          } catch (e11) {
            console.error("[clerk/telemetry] Error recording telemetry log entry", e11);
          }
        }
        #p(e10, t10) {
          return this.isEnabled && !this.isDebug && this.#_(e10, t10);
        }
        #g(e10) {
          return true;
        }
        #_(e10, t10) {
          let r10 = Math.random();
          return !!(r10 <= this.#a.samplingRate && (false === this.#a.perEventSampling || void 0 === t10 || r10 <= t10)) && !this.#o.isEventThrottled(e10);
        }
        #f() {
          this.#v();
        }
        #v() {
          let e10 = [...this.#c];
          if (this.#c = [], this.#u = null, 0 === e10.length) return;
          let t10 = e10.filter((e11) => "event" === e11.kind).map((e11) => e11.value), r10 = e10.filter((e11) => "log" === e11.kind).map((e11) => e11.value);
          t10.length > 0 && fetch(new URL("/v1/event", this.#a.endpoint), { headers: { "Content-Type": "application/json" }, keepalive: true, method: "POST", body: JSON.stringify({ events: t10 }) }).catch(() => void 0), r10.length > 0 && fetch(new URL("/v1/logs", this.#a.endpoint), { headers: { "Content-Type": "application/json" }, keepalive: true, method: "POST", body: JSON.stringify({ logs: r10 }) }).catch(() => void 0);
        }
        #h(e10, t10) {
          this.isDebug && (void 0 !== console.groupCollapsed ? (console.groupCollapsed("[clerk/telemetry]", e10), console.log(t10), console.groupEnd()) : console.log("[clerk/telemetry]", e10, t10));
        }
        #m() {
          return { name: this.#l.sdk, version: this.#l.sdkVersion };
        }
        #d(e10, t10) {
          let r10 = this.#m();
          return { event: e10, cv: this.#l.clerkVersion ?? "", it: this.#l.instanceType ?? "", sdk: r10.name, sdkv: r10.version, ...this.#l.publishableKey ? { pk: this.#l.publishableKey } : {}, ...this.#l.secretKey ? { sk: this.#l.secretKey } : {}, payload: t10 };
        }
        #y(e10) {
          if (null == e10 || "object" != typeof e10) return null;
          try {
            let t10 = JSON.parse(JSON.stringify(e10));
            if (t10 && "object" == typeof t10 && !Array.isArray(t10)) return t10;
            return null;
          } catch {
            return null;
          }
        }
      };
      let al = { secretKey: sQ, publishableKey: s0, apiUrl: s2, apiVersion: sY, userAgent: "@clerk/nextjs@6.36.2", proxyUrl: s5, domain: s4, isSatellite: s3, machineSecretKey: sZ, sdkMetadata: { name: "@clerk/nextjs", version: "6.36.2", environment: "production" }, telemetry: { disabled: s8, debug: s9 } }, ac = (e10) => {
        var t10;
        let r10, i10, n10, s10, a10, o3;
        return i10 = nJ(r10 = { ...al, ...e10 }), n10 = rP(sA, (t10 = { options: r10, apiClient: i10 }).options), s10 = t10.apiClient, a10 = { authenticateRequest: (e11, t11 = {}) => {
          let { apiUrl: r11, apiVersion: i11 } = n10, a11 = rP(n10, t11);
          return sR(e11, { ...t11, ...a11, apiUrl: r11, apiVersion: i11, apiClient: s10 });
        }, debugRequestState: sI }, o3 = new ao({ publishableKey: r10.publishableKey, secretKey: r10.secretKey, samplingRate: 0.1, ...r10.sdkMetadata ? { sdk: r10.sdkMetadata.name, sdkVersion: r10.sdkMetadata.version } : {}, ...r10.telemetry || {} }), { ...i10, ...a10, telemetry: o3 };
      };
      function au(e10, t10) {
        var r10, i10;
        return function(e11) {
          try {
            let { headers: t11, nextUrl: r11, cookies: i11 } = e11 || {};
            return "function" == typeof (null == t11 ? void 0 : t11.get) && "function" == typeof (null == r11 ? void 0 : r11.searchParams.get) && "function" == typeof (null == i11 ? void 0 : i11.get);
          } catch {
            return false;
          }
        }(e10) || function(e11) {
          try {
            let { headers: t11 } = e11 || {};
            return "function" == typeof (null == t11 ? void 0 : t11.get);
          } catch {
            return false;
          }
        }(e10) ? e10.headers.get(t10) : e10.headers[t10] || e10.headers[t10.toLowerCase()] || (null == (i10 = null == (r10 = e10.socket) ? void 0 : r10._httpMessage) ? void 0 : i10.getHeader(t10));
      }
      var ad = e.i(78500);
      let ah = /* @__PURE__ */ new Map(), ap = new ad.AsyncLocalStorage(), af = /* @__PURE__ */ new Set();
      function ag(e10) {
        return /^http(s)?:\/\//.test(e10 || "");
      }
      var am, ay, a_, av, ab, aw, ak, aS, aE, aT, ax, aO, aC, aP, aR, aI, aN, aA, aU, aM, aq = Object.defineProperty, aL = (null == (aR = "undefined" != typeof globalThis ? globalThis : void 0) ? void 0 : aR.crypto) || (null == (aI = e.g) ? void 0 : aI.crypto) || (null == (aN = "undefined" != typeof self ? self : void 0) ? void 0 : aN.crypto) || (null == (aU = null == (aA = "undefined" != typeof frames ? frames : void 0) ? void 0 : aA[0]) ? void 0 : aU.crypto);
      aM = aL ? (e10) => {
        let t10 = [];
        for (let r10 = 0; r10 < e10; r10 += 4) t10.push(aL.getRandomValues(new Uint32Array(1))[0]);
        return new aj(t10, e10);
      } : (e10) => {
        let t10 = [], r10 = (e11) => {
          let t11 = e11, r11 = 987654321;
          return () => {
            let e12 = ((r11 = 36969 * (65535 & r11) + (r11 >> 16) | 0) << 16) + (t11 = 18e3 * (65535 & t11) + (t11 >> 16) | 0) | 0;
            return e12 /= 4294967296, (e12 += 0.5) * (Math.random() > 0.5 ? 1 : -1);
          };
        };
        for (let i10 = 0, n10; i10 < e10; i10 += 4) {
          let e11 = r10(4294967296 * (n10 || Math.random()));
          n10 = 987654071 * e11(), t10.push(4294967296 * e11() | 0);
        }
        return new aj(t10, e10);
      };
      var aD = class {
        static create(...e10) {
          return new this(...e10);
        }
        mixIn(e10) {
          return Object.assign(this, e10);
        }
        clone() {
          let e10 = new this.constructor();
          return Object.assign(e10, this), e10;
        }
      }, aj = class extends aD {
        constructor(e10 = [], t10 = 4 * e10.length) {
          super();
          let r10 = e10;
          if (r10 instanceof ArrayBuffer && (r10 = new Uint8Array(r10)), (r10 instanceof Int8Array || r10 instanceof Uint8ClampedArray || r10 instanceof Int16Array || r10 instanceof Uint16Array || r10 instanceof Int32Array || r10 instanceof Uint32Array || r10 instanceof Float32Array || r10 instanceof Float64Array) && (r10 = new Uint8Array(r10.buffer, r10.byteOffset, r10.byteLength)), r10 instanceof Uint8Array) {
            let e11 = r10.byteLength, t11 = [];
            for (let i10 = 0; i10 < e11; i10 += 1) t11[i10 >>> 2] |= r10[i10] << 24 - i10 % 4 * 8;
            this.words = t11, this.sigBytes = e11;
          } else this.words = e10, this.sigBytes = t10;
        }
        toString(e10 = aB) {
          return e10.stringify(this);
        }
        concat(e10) {
          let t10 = this.words, r10 = e10.words, i10 = this.sigBytes, n10 = e10.sigBytes;
          if (this.clamp(), i10 % 4) for (let e11 = 0; e11 < n10; e11 += 1) {
            let n11 = r10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
            t10[i10 + e11 >>> 2] |= n11 << 24 - (i10 + e11) % 4 * 8;
          }
          else for (let e11 = 0; e11 < n10; e11 += 4) t10[i10 + e11 >>> 2] = r10[e11 >>> 2];
          return this.sigBytes += n10, this;
        }
        clamp() {
          let { words: e10, sigBytes: t10 } = this;
          e10[t10 >>> 2] &= 4294967295 << 32 - t10 % 4 * 8, e10.length = Math.ceil(t10 / 4);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10.words = this.words.slice(0), e10;
        }
      };
      (s = "symbol" != typeof (L = "random") ? L + "" : L) in aj ? aq(aj, s, { enumerable: true, configurable: true, writable: true, value: aM }) : aj[s] = aM;
      var aB = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, i10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          i10.push((r11 >>> 4).toString(16)), i10.push((15 & r11).toString(16));
        }
        return i10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let i10 = 0; i10 < t10; i10 += 2) r10[i10 >>> 3] |= parseInt(e10.substr(i10, 2), 16) << 24 - i10 % 8 * 4;
        return new aj(r10, t10 / 2);
      } }, a$ = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, i10 = [];
        for (let e11 = 0; e11 < r10; e11 += 1) {
          let r11 = t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255;
          i10.push(String.fromCharCode(r11));
        }
        return i10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = [];
        for (let i10 = 0; i10 < t10; i10 += 1) r10[i10 >>> 2] |= (255 & e10.charCodeAt(i10)) << 24 - i10 % 4 * 8;
        return new aj(r10, t10);
      } }, az = { stringify(e10) {
        try {
          return decodeURIComponent(escape(a$.stringify(e10)));
        } catch {
          throw Error("Malformed UTF-8 data");
        }
      }, parse: (e10) => a$.parse(unescape(encodeURIComponent(e10))) }, aK = class extends aD {
        constructor() {
          super(), this._minBufferSize = 0;
        }
        reset() {
          this._data = new aj(), this._nDataBytes = 0;
        }
        _append(e10) {
          let t10 = e10;
          "string" == typeof t10 && (t10 = az.parse(t10)), this._data.concat(t10), this._nDataBytes += t10.sigBytes;
        }
        _process(e10) {
          let t10, { _data: r10, blockSize: i10 } = this, n10 = r10.words, s10 = r10.sigBytes, a10 = s10 / (4 * i10), o3 = (a10 = e10 ? Math.ceil(a10) : Math.max((0 | a10) - this._minBufferSize, 0)) * i10, l2 = Math.min(4 * o3, s10);
          if (o3) {
            for (let e11 = 0; e11 < o3; e11 += i10) this._doProcessBlock(n10, e11);
            t10 = n10.splice(0, o3), r10.sigBytes -= l2;
          }
          return new aj(t10, l2);
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._data = this._data.clone(), e10;
        }
      }, aH = class extends aK {
        constructor(e10) {
          super(), this.blockSize = 16, this.cfg = Object.assign(new aD(), e10), this.reset();
        }
        static _createHelper(e10) {
          return (t10, r10) => new e10(r10).finalize(t10);
        }
        static _createHmacHelper(e10) {
          return (t10, r10) => new aJ(e10, r10).finalize(t10);
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        update(e10) {
          return this._append(e10), this._process(), this;
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      }, aJ = class extends aD {
        constructor(e10, t10) {
          super();
          let r10 = new e10();
          this._hasher = r10;
          let i10 = t10;
          "string" == typeof i10 && (i10 = az.parse(i10));
          let n10 = r10.blockSize, s10 = 4 * n10;
          i10.sigBytes > s10 && (i10 = r10.finalize(t10)), i10.clamp();
          let a10 = i10.clone();
          this._oKey = a10;
          let o3 = i10.clone();
          this._iKey = o3;
          let l2 = a10.words, c2 = o3.words;
          for (let e11 = 0; e11 < n10; e11 += 1) l2[e11] ^= 1549556828, c2[e11] ^= 909522486;
          a10.sigBytes = s10, o3.sigBytes = s10, this.reset();
        }
        reset() {
          let e10 = this._hasher;
          e10.reset(), e10.update(this._iKey);
        }
        update(e10) {
          return this._hasher.update(e10), this;
        }
        finalize(e10) {
          let t10 = this._hasher, r10 = t10.finalize(e10);
          return t10.reset(), t10.finalize(this._oKey.clone().concat(r10));
        }
      }, aV = { stringify(e10) {
        let { words: t10, sigBytes: r10 } = e10, i10 = this._map;
        e10.clamp();
        let n10 = [];
        for (let e11 = 0; e11 < r10; e11 += 3) {
          let s11 = (t10[e11 >>> 2] >>> 24 - e11 % 4 * 8 & 255) << 16 | (t10[e11 + 1 >>> 2] >>> 24 - (e11 + 1) % 4 * 8 & 255) << 8 | t10[e11 + 2 >>> 2] >>> 24 - (e11 + 2) % 4 * 8 & 255;
          for (let t11 = 0; t11 < 4 && e11 + 0.75 * t11 < r10; t11 += 1) n10.push(i10.charAt(s11 >>> 6 * (3 - t11) & 63));
        }
        let s10 = i10.charAt(64);
        if (s10) for (; n10.length % 4; ) n10.push(s10);
        return n10.join("");
      }, parse(e10) {
        let t10 = e10.length, r10 = this._map, i10 = this._reverseMap;
        if (!i10) {
          this._reverseMap = [], i10 = this._reverseMap;
          for (let e11 = 0; e11 < r10.length; e11 += 1) i10[r10.charCodeAt(e11)] = e11;
        }
        let n10 = r10.charAt(64);
        if (n10) {
          let r11 = e10.indexOf(n10);
          -1 !== r11 && (t10 = r11);
        }
        var s10 = t10, a10 = i10;
        let o3 = [], l2 = 0;
        for (let t11 = 0; t11 < s10; t11 += 1) if (t11 % 4) {
          let r11 = a10[e10.charCodeAt(t11 - 1)] << t11 % 4 * 2 | a10[e10.charCodeAt(t11)] >>> 6 - t11 % 4 * 2;
          o3[l2 >>> 2] |= r11 << 24 - l2 % 4 * 8, l2 += 1;
        }
        return aj.create(o3, l2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, aF = [];
      for (let e10 = 0; e10 < 64; e10 += 1) aF[e10] = 4294967296 * Math.abs(Math.sin(e10 + 1)) | 0;
      var aW = (e10, t10, r10, i10, n10, s10, a10) => {
        let o3 = e10 + (t10 & r10 | ~t10 & i10) + n10 + a10;
        return (o3 << s10 | o3 >>> 32 - s10) + t10;
      }, aG = (e10, t10, r10, i10, n10, s10, a10) => {
        let o3 = e10 + (t10 & i10 | r10 & ~i10) + n10 + a10;
        return (o3 << s10 | o3 >>> 32 - s10) + t10;
      }, aX = (e10, t10, r10, i10, n10, s10, a10) => {
        let o3 = e10 + (t10 ^ r10 ^ i10) + n10 + a10;
        return (o3 << s10 | o3 >>> 32 - s10) + t10;
      }, aY = (e10, t10, r10, i10, n10, s10, a10) => {
        let o3 = e10 + (r10 ^ (t10 | ~i10)) + n10 + a10;
        return (o3 << s10 | o3 >>> 32 - s10) + t10;
      }, aQ = class extends aH {
        _doReset() {
          this._hash = new aj([1732584193, 4023233417, 2562383102, 271733878]);
        }
        _doProcessBlock(e10, t10) {
          for (let r11 = 0; r11 < 16; r11 += 1) {
            let i11 = t10 + r11, n11 = e10[i11];
            e10[i11] = (n11 << 8 | n11 >>> 24) & 16711935 | (n11 << 24 | n11 >>> 8) & 4278255360;
          }
          let r10 = this._hash.words, i10 = e10[t10 + 0], n10 = e10[t10 + 1], s10 = e10[t10 + 2], a10 = e10[t10 + 3], o3 = e10[t10 + 4], l2 = e10[t10 + 5], c2 = e10[t10 + 6], u2 = e10[t10 + 7], d2 = e10[t10 + 8], h2 = e10[t10 + 9], p2 = e10[t10 + 10], f2 = e10[t10 + 11], g2 = e10[t10 + 12], m2 = e10[t10 + 13], y2 = e10[t10 + 14], _2 = e10[t10 + 15], v2 = r10[0], b2 = r10[1], w2 = r10[2], k2 = r10[3];
          v2 = aW(v2, b2, w2, k2, i10, 7, aF[0]), k2 = aW(k2, v2, b2, w2, n10, 12, aF[1]), w2 = aW(w2, k2, v2, b2, s10, 17, aF[2]), b2 = aW(b2, w2, k2, v2, a10, 22, aF[3]), v2 = aW(v2, b2, w2, k2, o3, 7, aF[4]), k2 = aW(k2, v2, b2, w2, l2, 12, aF[5]), w2 = aW(w2, k2, v2, b2, c2, 17, aF[6]), b2 = aW(b2, w2, k2, v2, u2, 22, aF[7]), v2 = aW(v2, b2, w2, k2, d2, 7, aF[8]), k2 = aW(k2, v2, b2, w2, h2, 12, aF[9]), w2 = aW(w2, k2, v2, b2, p2, 17, aF[10]), b2 = aW(b2, w2, k2, v2, f2, 22, aF[11]), v2 = aW(v2, b2, w2, k2, g2, 7, aF[12]), k2 = aW(k2, v2, b2, w2, m2, 12, aF[13]), w2 = aW(w2, k2, v2, b2, y2, 17, aF[14]), b2 = aW(b2, w2, k2, v2, _2, 22, aF[15]), v2 = aG(v2, b2, w2, k2, n10, 5, aF[16]), k2 = aG(k2, v2, b2, w2, c2, 9, aF[17]), w2 = aG(w2, k2, v2, b2, f2, 14, aF[18]), b2 = aG(b2, w2, k2, v2, i10, 20, aF[19]), v2 = aG(v2, b2, w2, k2, l2, 5, aF[20]), k2 = aG(k2, v2, b2, w2, p2, 9, aF[21]), w2 = aG(w2, k2, v2, b2, _2, 14, aF[22]), b2 = aG(b2, w2, k2, v2, o3, 20, aF[23]), v2 = aG(v2, b2, w2, k2, h2, 5, aF[24]), k2 = aG(k2, v2, b2, w2, y2, 9, aF[25]), w2 = aG(w2, k2, v2, b2, a10, 14, aF[26]), b2 = aG(b2, w2, k2, v2, d2, 20, aF[27]), v2 = aG(v2, b2, w2, k2, m2, 5, aF[28]), k2 = aG(k2, v2, b2, w2, s10, 9, aF[29]), w2 = aG(w2, k2, v2, b2, u2, 14, aF[30]), b2 = aG(b2, w2, k2, v2, g2, 20, aF[31]), v2 = aX(v2, b2, w2, k2, l2, 4, aF[32]), k2 = aX(k2, v2, b2, w2, d2, 11, aF[33]), w2 = aX(w2, k2, v2, b2, f2, 16, aF[34]), b2 = aX(b2, w2, k2, v2, y2, 23, aF[35]), v2 = aX(v2, b2, w2, k2, n10, 4, aF[36]), k2 = aX(k2, v2, b2, w2, o3, 11, aF[37]), w2 = aX(w2, k2, v2, b2, u2, 16, aF[38]), b2 = aX(b2, w2, k2, v2, p2, 23, aF[39]), v2 = aX(v2, b2, w2, k2, m2, 4, aF[40]), k2 = aX(k2, v2, b2, w2, i10, 11, aF[41]), w2 = aX(w2, k2, v2, b2, a10, 16, aF[42]), b2 = aX(b2, w2, k2, v2, c2, 23, aF[43]), v2 = aX(v2, b2, w2, k2, h2, 4, aF[44]), k2 = aX(k2, v2, b2, w2, g2, 11, aF[45]), w2 = aX(w2, k2, v2, b2, _2, 16, aF[46]), b2 = aX(b2, w2, k2, v2, s10, 23, aF[47]), v2 = aY(v2, b2, w2, k2, i10, 6, aF[48]), k2 = aY(k2, v2, b2, w2, u2, 10, aF[49]), w2 = aY(w2, k2, v2, b2, y2, 15, aF[50]), b2 = aY(b2, w2, k2, v2, l2, 21, aF[51]), v2 = aY(v2, b2, w2, k2, g2, 6, aF[52]), k2 = aY(k2, v2, b2, w2, a10, 10, aF[53]), w2 = aY(w2, k2, v2, b2, p2, 15, aF[54]), b2 = aY(b2, w2, k2, v2, n10, 21, aF[55]), v2 = aY(v2, b2, w2, k2, d2, 6, aF[56]), k2 = aY(k2, v2, b2, w2, _2, 10, aF[57]), w2 = aY(w2, k2, v2, b2, c2, 15, aF[58]), b2 = aY(b2, w2, k2, v2, m2, 21, aF[59]), v2 = aY(v2, b2, w2, k2, o3, 6, aF[60]), k2 = aY(k2, v2, b2, w2, f2, 10, aF[61]), w2 = aY(w2, k2, v2, b2, s10, 15, aF[62]), b2 = aY(b2, w2, k2, v2, h2, 21, aF[63]), r10[0] = r10[0] + v2 | 0, r10[1] = r10[1] + b2 | 0, r10[2] = r10[2] + w2 | 0, r10[3] = r10[3] + k2 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, i10 = 8 * e10.sigBytes;
          t10[i10 >>> 5] |= 128 << 24 - i10 % 32;
          let n10 = Math.floor(r10 / 4294967296);
          t10[(i10 + 64 >>> 9 << 4) + 15] = (n10 << 8 | n10 >>> 24) & 16711935 | (n10 << 24 | n10 >>> 8) & 4278255360, t10[(i10 + 64 >>> 9 << 4) + 14] = (r10 << 8 | r10 >>> 24) & 16711935 | (r10 << 24 | r10 >>> 8) & 4278255360, e10.sigBytes = (t10.length + 1) * 4, this._process();
          let s10 = this._hash, a10 = s10.words;
          for (let e11 = 0; e11 < 4; e11 += 1) {
            let t11 = a10[e11];
            a10[e11] = (t11 << 8 | t11 >>> 24) & 16711935 | (t11 << 24 | t11 >>> 8) & 4278255360;
          }
          return s10;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      };
      aH._createHelper(aQ), aH._createHmacHelper(aQ);
      var aZ = class extends aD {
        constructor(e10) {
          super(), this.cfg = Object.assign(new aD(), { keySize: 4, hasher: aQ, iterations: 1 }, e10);
        }
        compute(e10, t10) {
          let r10, { cfg: i10 } = this, n10 = i10.hasher.create(), s10 = aj.create(), a10 = s10.words, { keySize: o3, iterations: l2 } = i10;
          for (; a10.length < o3; ) {
            r10 && n10.update(r10), r10 = n10.update(e10).finalize(t10), n10.reset();
            for (let e11 = 1; e11 < l2; e11 += 1) r10 = n10.finalize(r10), n10.reset();
            s10.concat(r10);
          }
          return s10.sigBytes = 4 * o3, s10;
        }
      }, a0 = class extends aK {
        constructor(e10, t10, r10) {
          super(), this.cfg = Object.assign(new aD(), r10), this._xformMode = e10, this._key = t10, this.reset();
        }
        static createEncryptor(e10, t10) {
          return this.create(this._ENC_XFORM_MODE, e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.create(this._DEC_XFORM_MODE, e10, t10);
        }
        static _createHelper(e10) {
          let t10 = (e11) => "string" == typeof e11 ? a9 : a8;
          return { encrypt: (r10, i10, n10) => t10(i10).encrypt(e10, r10, i10, n10), decrypt: (r10, i10, n10) => t10(i10).decrypt(e10, r10, i10, n10) };
        }
        reset() {
          super.reset.call(this), this._doReset();
        }
        process(e10) {
          return this._append(e10), this._process();
        }
        finalize(e10) {
          return e10 && this._append(e10), this._doFinalize();
        }
      };
      a0._ENC_XFORM_MODE = 1, a0._DEC_XFORM_MODE = 2, a0.keySize = 4, a0.ivSize = 4;
      var a1 = class extends aD {
        constructor(e10, t10) {
          super(), this._cipher = e10, this._iv = t10;
        }
        static createEncryptor(e10, t10) {
          return this.Encryptor.create(e10, t10);
        }
        static createDecryptor(e10, t10) {
          return this.Decryptor.create(e10, t10);
        }
      };
      function a2(e10, t10, r10) {
        let i10, n10 = this._iv;
        n10 ? (i10 = n10, this._iv = void 0) : i10 = this._prevBlock;
        for (let n11 = 0; n11 < r10; n11 += 1) e10[t10 + n11] ^= i10[n11];
      }
      var a4 = class extends a1 {
      };
      a4.Encryptor = class extends a4 {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: i10 } = r10;
          a2.call(this, e10, t10, i10), r10.encryptBlock(e10, t10), this._prevBlock = e10.slice(t10, t10 + i10);
        }
      }, a4.Decryptor = class extends a4 {
        processBlock(e10, t10) {
          let r10 = this._cipher, { blockSize: i10 } = r10, n10 = e10.slice(t10, t10 + i10);
          r10.decryptBlock(e10, t10), a2.call(this, e10, t10, i10), this._prevBlock = n10;
        }
      };
      var a5 = { pad(e10, t10) {
        let r10 = 4 * t10, i10 = r10 - e10.sigBytes % r10, n10 = i10 << 24 | i10 << 16 | i10 << 8 | i10, s10 = [];
        for (let e11 = 0; e11 < i10; e11 += 4) s10.push(n10);
        let a10 = aj.create(s10, i10);
        e10.concat(a10);
      }, unpad(e10) {
        let t10 = 255 & e10.words[e10.sigBytes - 1 >>> 2];
        e10.sigBytes -= t10;
      } }, a3 = class extends a0 {
        constructor(e10, t10, r10) {
          super(e10, t10, Object.assign({ mode: a4, padding: a5 }, r10)), this.blockSize = 4;
        }
        reset() {
          let e10;
          super.reset.call(this);
          let { cfg: t10 } = this, { iv: r10, mode: i10 } = t10;
          this._xformMode === this.constructor._ENC_XFORM_MODE ? e10 = i10.createEncryptor : (e10 = i10.createDecryptor, this._minBufferSize = 1), this._mode = e10.call(i10, this, r10 && r10.words), this._mode.__creator = e10;
        }
        _doProcessBlock(e10, t10) {
          this._mode.processBlock(e10, t10);
        }
        _doFinalize() {
          let e10, { padding: t10 } = this.cfg;
          return this._xformMode === this.constructor._ENC_XFORM_MODE ? (t10.pad(this._data, this.blockSize), e10 = this._process(true)) : (e10 = this._process(true), t10.unpad(e10)), e10;
        }
      }, a6 = class extends aD {
        constructor(e10) {
          super(), this.mixIn(e10);
        }
        toString(e10) {
          return (e10 || this.formatter).stringify(this);
        }
      }, a8 = class extends aD {
        static encrypt(e10, t10, r10, i10) {
          let n10 = Object.assign(new aD(), this.cfg, i10), s10 = e10.createEncryptor(r10, n10), a10 = s10.finalize(t10), o3 = s10.cfg;
          return a6.create({ ciphertext: a10, key: r10, iv: o3.iv, algorithm: e10, mode: o3.mode, padding: o3.padding, blockSize: s10.blockSize, formatter: n10.format });
        }
        static decrypt(e10, t10, r10, i10) {
          let n10 = t10, s10 = Object.assign(new aD(), this.cfg, i10);
          return n10 = this._parse(n10, s10.format), e10.createDecryptor(r10, s10).finalize(n10.ciphertext);
        }
        static _parse(e10, t10) {
          return "string" == typeof e10 ? t10.parse(e10, this) : e10;
        }
      };
      a8.cfg = Object.assign(new aD(), { format: { stringify(e10) {
        let { ciphertext: t10, salt: r10 } = e10;
        return (r10 ? aj.create([1398893684, 1701076831]).concat(r10).concat(t10) : t10).toString(aV);
      }, parse(e10) {
        let t10, r10 = aV.parse(e10), i10 = r10.words;
        return 1398893684 === i10[0] && 1701076831 === i10[1] && (t10 = aj.create(i10.slice(2, 4)), i10.splice(0, 4), r10.sigBytes -= 16), a6.create({ ciphertext: r10, salt: t10 });
      } } });
      var a9 = class extends a8 {
        static encrypt(e10, t10, r10, i10) {
          let n10 = Object.assign(new aD(), this.cfg, i10), s10 = n10.kdf.execute(r10, e10.keySize, e10.ivSize, n10.salt, n10.hasher);
          n10.iv = s10.iv;
          let a10 = a8.encrypt.call(this, e10, t10, s10.key, n10);
          return a10.mixIn(s10), a10;
        }
        static decrypt(e10, t10, r10, i10) {
          let n10 = t10, s10 = Object.assign(new aD(), this.cfg, i10);
          n10 = this._parse(n10, s10.format);
          let a10 = s10.kdf.execute(r10, e10.keySize, e10.ivSize, n10.salt, s10.hasher);
          return s10.iv = a10.iv, a8.decrypt.call(this, e10, n10, a10.key, s10);
        }
      };
      a9.cfg = Object.assign(a8.cfg, { kdf: { execute(e10, t10, r10, i10, n10) {
        let s10, a10 = i10;
        a10 || (a10 = aj.random(8)), s10 = n10 ? aZ.create({ keySize: t10 + r10, hasher: n10 }).compute(e10, a10) : aZ.create({ keySize: t10 + r10 }).compute(e10, a10);
        let o3 = aj.create(s10.words.slice(t10), 4 * r10);
        return s10.sigBytes = 4 * t10, a6.create({ key: s10, iv: o3, salt: a10 });
      } } });
      var a7 = [], oe = [], ot = [], or = [], oi = [], on = [], os = [], oa = [], oo = [], ol = [], oc = [];
      for (let e10 = 0; e10 < 256; e10 += 1) e10 < 128 ? oc[e10] = e10 << 1 : oc[e10] = e10 << 1 ^ 283;
      var ou = 0, od = 0;
      for (let e10 = 0; e10 < 256; e10 += 1) {
        let e11 = od ^ od << 1 ^ od << 2 ^ od << 3 ^ od << 4;
        e11 = e11 >>> 8 ^ 255 & e11 ^ 99, a7[ou] = e11, oe[e11] = ou;
        let t10 = oc[ou], r10 = oc[t10], i10 = oc[r10], n10 = 257 * oc[e11] ^ 16843008 * e11;
        ot[ou] = n10 << 24 | n10 >>> 8, or[ou] = n10 << 16 | n10 >>> 16, oi[ou] = n10 << 8 | n10 >>> 24, on[ou] = n10, n10 = 16843009 * i10 ^ 65537 * r10 ^ 257 * t10 ^ 16843008 * ou, os[e11] = n10 << 24 | n10 >>> 8, oa[e11] = n10 << 16 | n10 >>> 16, oo[e11] = n10 << 8 | n10 >>> 24, ol[e11] = n10, ou ? (ou = t10 ^ oc[oc[oc[i10 ^ t10]]], od ^= oc[oc[od]]) : ou = od = 1;
      }
      var oh = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], op = class extends a3 {
        _doReset() {
          let e10;
          if (this._nRounds && this._keyPriorReset === this._key) return;
          this._keyPriorReset = this._key;
          let t10 = this._keyPriorReset, r10 = t10.words, i10 = t10.sigBytes / 4;
          this._nRounds = i10 + 6;
          let n10 = (this._nRounds + 1) * 4;
          this._keySchedule = [];
          let s10 = this._keySchedule;
          for (let t11 = 0; t11 < n10; t11 += 1) t11 < i10 ? s10[t11] = r10[t11] : (e10 = s10[t11 - 1], t11 % i10 ? i10 > 6 && t11 % i10 == 4 && (e10 = a7[e10 >>> 24] << 24 | a7[e10 >>> 16 & 255] << 16 | a7[e10 >>> 8 & 255] << 8 | a7[255 & e10]) : e10 = (a7[(e10 = e10 << 8 | e10 >>> 24) >>> 24] << 24 | a7[e10 >>> 16 & 255] << 16 | a7[e10 >>> 8 & 255] << 8 | a7[255 & e10]) ^ oh[t11 / i10 | 0] << 24, s10[t11] = s10[t11 - i10] ^ e10);
          this._invKeySchedule = [];
          let a10 = this._invKeySchedule;
          for (let t11 = 0; t11 < n10; t11 += 1) {
            let r11 = n10 - t11;
            e10 = t11 % 4 ? s10[r11] : s10[r11 - 4], t11 < 4 || r11 <= 4 ? a10[t11] = e10 : a10[t11] = os[a7[e10 >>> 24]] ^ oa[a7[e10 >>> 16 & 255]] ^ oo[a7[e10 >>> 8 & 255]] ^ ol[a7[255 & e10]];
          }
        }
        encryptBlock(e10, t10) {
          this._doCryptBlock(e10, t10, this._keySchedule, ot, or, oi, on, a7);
        }
        decryptBlock(e10, t10) {
          let r10 = e10[t10 + 1];
          e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10, this._doCryptBlock(e10, t10, this._invKeySchedule, os, oa, oo, ol, oe), r10 = e10[t10 + 1], e10[t10 + 1] = e10[t10 + 3], e10[t10 + 3] = r10;
        }
        _doCryptBlock(e10, t10, r10, i10, n10, s10, a10, o3) {
          let l2 = this._nRounds, c2 = e10[t10] ^ r10[0], u2 = e10[t10 + 1] ^ r10[1], d2 = e10[t10 + 2] ^ r10[2], h2 = e10[t10 + 3] ^ r10[3], p2 = 4;
          for (let e11 = 1; e11 < l2; e11 += 1) {
            let e12 = i10[c2 >>> 24] ^ n10[u2 >>> 16 & 255] ^ s10[d2 >>> 8 & 255] ^ a10[255 & h2] ^ r10[p2];
            p2 += 1;
            let t11 = i10[u2 >>> 24] ^ n10[d2 >>> 16 & 255] ^ s10[h2 >>> 8 & 255] ^ a10[255 & c2] ^ r10[p2];
            p2 += 1;
            let o4 = i10[d2 >>> 24] ^ n10[h2 >>> 16 & 255] ^ s10[c2 >>> 8 & 255] ^ a10[255 & u2] ^ r10[p2];
            p2 += 1;
            let l3 = i10[h2 >>> 24] ^ n10[c2 >>> 16 & 255] ^ s10[u2 >>> 8 & 255] ^ a10[255 & d2] ^ r10[p2];
            p2 += 1, c2 = e12, u2 = t11, d2 = o4, h2 = l3;
          }
          let f2 = (o3[c2 >>> 24] << 24 | o3[u2 >>> 16 & 255] << 16 | o3[d2 >>> 8 & 255] << 8 | o3[255 & h2]) ^ r10[p2];
          p2 += 1;
          let g2 = (o3[u2 >>> 24] << 24 | o3[d2 >>> 16 & 255] << 16 | o3[h2 >>> 8 & 255] << 8 | o3[255 & c2]) ^ r10[p2];
          p2 += 1;
          let m2 = (o3[d2 >>> 24] << 24 | o3[h2 >>> 16 & 255] << 16 | o3[c2 >>> 8 & 255] << 8 | o3[255 & u2]) ^ r10[p2];
          p2 += 1;
          let y2 = (o3[h2 >>> 24] << 24 | o3[c2 >>> 16 & 255] << 16 | o3[u2 >>> 8 & 255] << 8 | o3[255 & d2]) ^ r10[p2];
          p2 += 1, e10[t10] = f2, e10[t10 + 1] = g2, e10[t10 + 2] = m2, e10[t10 + 3] = y2;
        }
      };
      op.keySize = 8;
      var of = a3._createHelper(op), og = [], om = class extends aH {
        _doReset() {
          this._hash = new aj([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }
        _doProcessBlock(e10, t10) {
          let r10 = this._hash.words, i10 = r10[0], n10 = r10[1], s10 = r10[2], a10 = r10[3], o3 = r10[4];
          for (let r11 = 0; r11 < 80; r11 += 1) {
            if (r11 < 16) og[r11] = 0 | e10[t10 + r11];
            else {
              let e11 = og[r11 - 3] ^ og[r11 - 8] ^ og[r11 - 14] ^ og[r11 - 16];
              og[r11] = e11 << 1 | e11 >>> 31;
            }
            let l2 = (i10 << 5 | i10 >>> 27) + o3 + og[r11];
            r11 < 20 ? l2 += (n10 & s10 | ~n10 & a10) + 1518500249 : r11 < 40 ? l2 += (n10 ^ s10 ^ a10) + 1859775393 : r11 < 60 ? l2 += (n10 & s10 | n10 & a10 | s10 & a10) - 1894007588 : l2 += (n10 ^ s10 ^ a10) - 899497514, o3 = a10, a10 = s10, s10 = n10 << 30 | n10 >>> 2, n10 = i10, i10 = l2;
          }
          r10[0] = r10[0] + i10 | 0, r10[1] = r10[1] + n10 | 0, r10[2] = r10[2] + s10 | 0, r10[3] = r10[3] + a10 | 0, r10[4] = r10[4] + o3 | 0;
        }
        _doFinalize() {
          let e10 = this._data, t10 = e10.words, r10 = 8 * this._nDataBytes, i10 = 8 * e10.sigBytes;
          return t10[i10 >>> 5] |= 128 << 24 - i10 % 32, t10[(i10 + 64 >>> 9 << 4) + 14] = Math.floor(r10 / 4294967296), t10[(i10 + 64 >>> 9 << 4) + 15] = r10, e10.sigBytes = 4 * t10.length, this._process(), this._hash;
        }
        clone() {
          let e10 = super.clone.call(this);
          return e10._hash = this._hash.clone(), e10;
        }
      }, oy = (aH._createHelper(om), aH._createHmacHelper(om));
      let o_ = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default clerkMiddleware({domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'
   `, ov = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default clerkMiddleware({signInUrl:'SOME_URL', isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'`, ob = `Clerk: Unable to decrypt request data.

Refresh the page if your .env file was just updated. If the issue persists, ensure the encryption key is valid and properly set.

For more information, see: https://clerk.com/docs/reference/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)`, ow = tf({ packageName: "@clerk/nextjs" }), ok = "x-middleware-override-headers", oS = "x-middleware-request", oE = (e10, t10, r10) => {
        e10.headers.get(ok) || (e10.headers.set(ok, [...t10.headers.keys()]), t10.headers.forEach((t11, r11) => {
          e10.headers.set(`${oS}-${r11}`, t11);
        })), Object.entries(r10).forEach(([t11, r11]) => {
          e10.headers.set(ok, `${e10.headers.get(ok)},${t11}`), e10.headers.set(`${oS}-${t11}`, r11);
        });
      }, oT = (e10) => J.redirect(e10, { headers: { [rl]: "true" } }), ox = "clerk_keyless_dummy_key";
      function oO() {
        if (e0()) throw Error("Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/reference/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)");
        throw Error(ob);
      }
      function oC(e10, t10) {
        return JSON.parse(of.decrypt(e10, t10).toString(az));
      }
      let oP = async () => {
        var e10, t10;
        let r10;
        try {
          let e11 = await ar(), t11 = au(e11, rc);
          r10 = function(e12) {
            if (!e12) return {};
            let t12 = e0() ? s1 || sQ : s1 || sQ || ox;
            try {
              return oC(e12, t12);
            } catch {
              if (ae) try {
                return oC(e12, ox);
              } catch {
                oO();
              }
              oO();
            }
          }(t11);
        } catch (e11) {
          if (e11 && at(e11)) throw e11;
        }
        let i10 = null != (t10 = null == (e10 = ap.getStore()) ? void 0 : e10.get("requestData")) ? t10 : r10;
        return (null == i10 ? void 0 : i10.secretKey) || (null == i10 ? void 0 : i10.publishableKey) ? ac(i10) : ac({});
      };
      class oR {
        static createDefaultDirectives() {
          return Object.entries(this.DEFAULT_DIRECTIVES).reduce((e10, [t10, r10]) => (e10[t10] = new Set(r10), e10), {});
        }
        static isKeyword(e10) {
          return this.KEYWORDS.has(e10.replace(/^'|'$/g, ""));
        }
        static formatValue(e10) {
          let t10 = e10.replace(/^'|'$/g, "");
          return this.isKeyword(t10) ? `'${t10}'` : e10;
        }
        static handleDirectiveValues(e10) {
          let t10 = /* @__PURE__ */ new Set();
          return e10.includes("'none'") || e10.includes("none") ? t10.add("'none'") : e10.forEach((e11) => t10.add(this.formatValue(e11))), t10;
        }
      }
      oR.KEYWORDS = /* @__PURE__ */ new Set(["none", "self", "strict-dynamic", "unsafe-eval", "unsafe-hashes", "unsafe-inline"]), oR.DEFAULT_DIRECTIVES = { "connect-src": ["self", "https://clerk-telemetry.com", "https://*.clerk-telemetry.com", "https://api.stripe.com", "https://maps.googleapis.com"], "default-src": ["self"], "form-action": ["self"], "frame-src": ["self", "https://challenges.cloudflare.com", "https://*.js.stripe.com", "https://js.stripe.com", "https://hooks.stripe.com"], "img-src": ["self", "https://img.clerk.com"], "script-src": ["self", "unsafe-inline", "https:", "http:", "https://*.js.stripe.com", "https://js.stripe.com", "https://maps.googleapis.com"], "style-src": ["self", "unsafe-inline"], "worker-src": ["self", "blob:"] };
      let oI = "__clerk_keys_";
      async function oN(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => e11.toString(16).padStart(2, "0")).join("").slice(0, 16);
      }
      async function oA() {
        let e10 = process.env.PWD;
        if (!e10) return `${oI}0`;
        let t10 = e10.split("/").filter(Boolean).slice(-3).reverse().join("/"), r10 = await oN(t10);
        return `${oI}${r10}`;
      }
      async function oU(e10) {
        let t10;
        if (!ae) return;
        let r10 = await oA();
        try {
          t10 = JSON.parse(e10(r10) || "{}");
        } catch {
          t10 = void 0;
        }
        return t10;
      }
      let oM = "CLERK_PROTECT_REDIRECT_TO_SIGN_IN", oq = "CLERK_PROTECT_REDIRECT_TO_SIGN_UP", oL = { NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }, oD = new Set(Object.values(oL)), oj = "NEXT_HTTP_ERROR_FALLBACK";
      function oB(e10) {
        if (!function(e11) {
          if ("object" != typeof e11 || null === e11 || !("digest" in e11) || "string" != typeof e11.digest) return false;
          let [t11, r10] = e11.digest.split(";");
          return t11 === oj && oD.has(Number(r10));
        }(e10)) return;
        let [, t10] = e10.digest.split(";");
        return Number(t10);
      }
      let o$ = "NEXT_REDIRECT";
      function oz(e10, t10, r10 = "replace", i10 = 307) {
        let n10 = Error(o$);
        throw n10.digest = `${o$};${r10};${e10};${i10};`, n10.clerk_digest = "CLERK_PROTECT_REDIRECT_TO_URL", Object.assign(n10, t10), n10;
      }
      function oK(e10, t10) {
        return null === t10 ? "" : t10 || e10;
      }
      function oH(e10) {
        if ("object" != typeof e10 || null === e10 || !("digest" in e10) || "string" != typeof e10.digest) return false;
        let t10 = e10.digest.split(";"), [r10, i10] = t10, n10 = t10.slice(2, -2).join(";"), s10 = Number(t10.at(-2));
        return r10 === o$ && ("replace" === i10 || "push" === i10) && "string" == typeof n10 && !isNaN(s10) && 307 === s10;
      }
      function oJ() {
        let e10 = Error(oj);
        throw e10.digest = `${oj};${oL.UNAUTHORIZED}`, e10;
      }
      let oV = (e10) => {
        var t10, r10;
        return !!e10.headers.get(sB) && !(e10.headers.get(sB) && ((null == (t10 = e10.headers.get(re)) ? void 0 : t10.includes("text/x-component")) || (null == (r10 = e10.headers.get(rh)) ? void 0 : r10.includes("multipart/form-data")) || e10.headers.get(s$))) || oF();
      }, oF = () => {
        let e10 = globalThis.fetch;
        if (!("__nextPatched" in e10 && true === e10.__nextPatched)) return false;
        let { page: t10, pagePath: r10 } = e10.__nextGetStaticStore().getStore() || {};
        return !!(r10 || t10);
      }, oW = (e10) => !!e10.headers.get(sz), oG = (e10) => {
        let t10;
        if ("function" == typeof e10) return (t11) => e10(t11);
        let r10 = (t10 = [e10 || ""].flat().filter(Boolean).map((e11) => e11 instanceof RegExp ? e11 : ((e12) => {
          try {
            return t5(e12);
          } catch (t11) {
            throw Error(`Invalid path: ${e12}.
Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${t11.message}`);
          }
        })(e11)), (e11) => t10.some((t11) => t11.test(e11)));
        return (e11) => r10(e11.nextUrl.pathname);
      }, oX = oG(["/dashboard(.*)"]);
      oG(["/dashboard/super-admin(.*)"]);
      let oY = ((...e10) => {
        let t10, r10, [i10, n10] = [(t10 = e10)[0] instanceof Request ? t10[0] : void 0, t10[0] instanceof Request ? t10[1] : void 0], [s10, a10] = ["function" == typeof (r10 = e10)[0] ? r10[0] : void 0, (2 === r10.length ? r10[1] : "function" == typeof r10[0] ? {} : r10[0]) || {}];
        return ap.run(ah, () => {
          let e11, t11, r11 = (e11 = "clerkMiddleware", t11 = (e12) => async (t12, r12) => {
            var i11, n11, o4, l3, c2, u2, d2, h2, p2;
            let f2, g2, m2, y2, _2, v2, b2, w2, k2, S2, E2 = "function" == typeof a10 ? await a10(t12) : a10, T2 = await oU((e13) => {
              var r13;
              return null == (r13 = t12.cookies.get(e13)) ? void 0 : r13.value;
            }), x2 = (o4 = E2.publishableKey || s0 || (null == T2 ? void 0 : T2.publishableKey), l3 = () => ow.throwMissingPublishableKeyError(), o4 || l3(), o4), O2 = (c2 = E2.secretKey || sQ || (null == T2 ? void 0 : T2.secretKey), u2 = () => ow.throwMissingSecretKeyError(), c2 || u2(), c2), C2 = { publishableKey: x2, secretKey: O2, signInUrl: E2.signInUrl || s6, signUpUrl: E2.signUpUrl || "/sign-up", ...E2 };
            ah.set("requestData", C2);
            let P2 = await oP();
            C2.debug && e12.enable();
            let R2 = sl(t12);
            e12.debug("options", C2), e12.debug("url", () => R2.toJSON());
            let I2 = t12.headers.get(rr);
            I2 && I2.startsWith("Basic ") && e12.debug("Basic Auth detected");
            let N2 = t12.headers.get(rp);
            N2 && e12.debug("Content-Security-Policy detected", () => ({ value: N2 }));
            let A2 = await P2.authenticateRequest(R2, (f2 = R2, { ...g2 = C2, ...((e13, t13) => {
              let r13, i12 = sW(null == t13 ? void 0 : t13.proxyUrl, e13.clerkUrl, s5);
              r13 = i12 && !ag(i12) ? new URL(i12, e13.clerkUrl).toString() : i12;
              let n12 = sW(t13.isSatellite, new URL(e13.url), s3), s11 = sW(t13.domain, new URL(e13.url), s4), a11 = (null == t13 ? void 0 : t13.signInUrl) || s6;
              if (n12 && !r13 && !s11) throw Error(o_);
              if (n12 && !ag(a11) && tr(t13.secretKey || sQ)) throw Error(ov);
              return { proxyUrl: r13, isSatellite: n12, domain: s11, signInUrl: a11 };
            })(f2, g2), acceptsToken: "any" }));
            e12.debug("requestState", () => ({ status: A2.status, headers: JSON.stringify(Object.fromEntries(A2.headers)), reason: A2.reason }));
            let U2 = A2.headers.get(rv);
            if (U2) {
              let e13 = J.redirect(U2);
              return A2.headers.forEach((t13, r13) => {
                r13 !== rv && e13.headers.append(r13, t13);
              }), e13;
            }
            if (A2.status === n9) throw Error("Clerk: handshake status without redirect");
            let M2 = A2.toAuth();
            e12.debug("auth", () => ({ auth: M2, debug: M2.debug() }));
            let q2 = (m2 = R2, (e13 = {}) => {
              var t13;
              oz(t13 = m2.clerkUrl.toString(), { clerk_digest: oM, returnBackUrl: oK(t13, e13.returnBackUrl) });
            }), L2 = (y2 = R2, (e13 = {}) => {
              var t13;
              oz(t13 = y2.clerkUrl.toString(), { clerk_digest: oq, returnBackUrl: oK(t13, e13.returnBackUrl) });
            }), D2 = await (_2 = R2, v2 = M2, b2 = q2, async (e13, t13) => function(e14) {
              let { redirectToSignIn: t14, authObject: r13, redirect: i12, notFound: n12, request: s11, unauthorized: a11 } = e14;
              return async (...e15) => {
                var o5, l4, c3, u3, d3, h3, p3, f3;
                let g3 = ((e16) => {
                  if (e16 && !e16.unauthenticatedUrl && !e16.unauthorizedUrl && !e16.token && (1 !== Object.keys(e16).length || !("token" in e16))) return e16;
                })(e15[0]), m3 = (null == (o5 = e15[0]) ? void 0 : o5.unauthenticatedUrl) || (null == (l4 = e15[1]) ? void 0 : l4.unauthenticatedUrl), y3 = (null == (c3 = e15[0]) ? void 0 : c3.unauthorizedUrl) || (null == (u3 = e15[1]) ? void 0 : u3.unauthorizedUrl), _3 = (null == (d3 = e15[0]) ? void 0 : d3.token) || (null == (h3 = e15[1]) ? void 0 : h3.token) || rI, v3 = () => r13.tokenType !== rI ? a11() : y3 ? i12(y3) : n12();
                if (!n1(r13.tokenType, _3)) return v3();
                if (r13.tokenType !== rI) return r13.isAuthenticated ? r13 : v3();
                if ("pending" === r13.sessionStatus || !r13.userId) {
                  return m3 ? i12(m3) : "document" === (p3 = s11).headers.get(rS) || "iframe" === p3.headers.get(rS) || (null == (f3 = p3.headers.get(re)) ? void 0 : f3.includes("text/html")) || oV(p3) || oW(p3) ? t14() : n12();
                }
                return g3 ? "function" == typeof g3 ? g3(r13.has) ? r13 : v3() : r13.has(g3) ? r13 : v3() : r13;
              };
            }({ request: _2, redirect: (e14) => oz(e14, { redirectUrl: e14 }), notFound: () => function() {
              let e14 = Object.defineProperty(Error(sM), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
              throw e14.digest = sM, e14;
            }(), unauthorized: oJ, authObject: n6({ authObject: v2, acceptsToken: (null == e13 ? void 0 : e13.token) || (null == t13 ? void 0 : t13.token) || rI }), redirectToSignIn: b2 })(e13, t13)), j2 = (w2 = A2, k2 = q2, S2 = L2, async (e13) => {
              var t13;
              let r13 = w2.toAuth({ treatPendingAsSignedOut: null == e13 ? void 0 : e13.treatPendingAsSignedOut }), i12 = null != (t13 = null == e13 ? void 0 : e13.acceptsToken) ? t13 : rI, n12 = n6({ authObject: r13, acceptsToken: i12 });
              return n12.tokenType === rI && n1(rI, i12) ? Object.assign(n12, { redirectToSignIn: k2, redirectToSignUp: S2 }) : n12;
            });
            j2.protect = D2;
            let B2 = J.next();
            try {
              B2 = await ap.run(ah, async () => null == s10 ? void 0 : s10(j2, t12, r12)) || B2;
            } catch (e13) {
              B2 = ((e14, t13, r13, i12) => {
                var n12;
                if (oB(e14) === oL.UNAUTHORIZED) {
                  let e15 = new J(null, { status: 401 }), t14 = i12.toAuth();
                  if (t14 && t14.tokenType === rU) {
                    let t15 = te(i12.publishableKey);
                    return sK(e15, "WWW-Authenticate", `Bearer resource_metadata="https://${null == t15 ? void 0 : t15.frontendApi}/.well-known/oauth-protected-resource"`);
                  }
                  return e15;
                }
                if ("object" == typeof e14 && null !== e14 && "digest" in e14 && "NEXT_NOT_FOUND" === e14.digest || oB(e14) === oL.NOT_FOUND) return sK(J.rewrite(new URL(`/clerk_${Date.now()}`, r13.url)), ri, "protect-rewrite");
                let s11 = !!oH(e14) && "clerk_digest" in e14 && e14.clerk_digest === oM, a11 = !!oH(e14) && "clerk_digest" in e14 && e14.clerk_digest === oq;
                if (s11 || a11) {
                  let r14 = ((e15) => {
                    let { publishableKey: t14, redirectAdapter: r15, signInUrl: i13, signUpUrl: n13, baseUrl: s12, sessionStatus: a13 } = e15, o5 = te(t14), l4 = o5?.frontendApi, c3 = o5?.instanceType === "development", u3 = tG(l4), d3 = "pending" === a13, h3 = (t15, { returnBackUrl: i14 }) => r15(rO(s12, `${t15}/tasks`, i14, c3 ? e15.devBrowserToken : null));
                    return { redirectToSignUp: ({ returnBackUrl: t15 } = {}) => {
                      n13 || u3 || tg.throwMissingPublishableKeyError();
                      let a14 = `${u3}/sign-up`, o6 = n13 || function(e16) {
                        if (!e16) return;
                        let t16 = new URL(e16, s12);
                        return t16.pathname = `${t16.pathname}/create`, t16.toString();
                      }(i13) || a14;
                      return d3 ? h3(o6, { returnBackUrl: t15 }) : r15(rO(s12, o6, t15, c3 ? e15.devBrowserToken : null));
                    }, redirectToSignIn: ({ returnBackUrl: t15 } = {}) => {
                      i13 || u3 || tg.throwMissingPublishableKeyError();
                      let n14 = `${u3}/sign-in`, a14 = i13 || n14;
                      return d3 ? h3(a14, { returnBackUrl: t15 }) : r15(rO(s12, a14, t15, c3 ? e15.devBrowserToken : null));
                    } };
                  })({ redirectAdapter: oT, baseUrl: t13.clerkUrl, signInUrl: i12.signInUrl, signUpUrl: i12.signUpUrl, publishableKey: i12.publishableKey, sessionStatus: null == (n12 = i12.toAuth()) ? void 0 : n12.sessionStatus }), { returnBackUrl: a12 } = e14;
                  return r14[s11 ? "redirectToSignIn" : "redirectToSignUp"]({ returnBackUrl: a12 });
                }
                if (oH(e14)) return oT(e14.redirectUrl);
                throw e14;
              })(e13, R2, t12, A2);
            }
            if (C2.contentSecurityPolicy) {
              let t13, r13, s11, a11, { headers: o5 } = (d2 = (null != (n11 = null == (i11 = te(x2)) ? void 0 : i11.frontendApi) ? n11 : "").replace("$", ""), h2 = C2.contentSecurityPolicy, t13 = [], s11 = h2.strict ? (r13 = new Uint8Array(16), crypto.getRandomValues(r13), btoa(Array.from(r13, (e13) => String.fromCharCode(e13)).join(""))) : void 0, a11 = function(e13, t14, r14, i12) {
                let n12 = Object.entries(oR.DEFAULT_DIRECTIVES).reduce((e14, [t15, r15]) => (e14[t15] = new Set(r15), e14), {});
                if (n12["connect-src"].add(t14), e13 && (n12["script-src"].delete("http:"), n12["script-src"].delete("https:"), n12["script-src"].add("'strict-dynamic'"), i12 && n12["script-src"].add(`'nonce-${i12}'`)), r14) {
                  let e14 = /* @__PURE__ */ new Map();
                  Object.entries(r14).forEach(([t15, r15]) => {
                    let i13 = Array.isArray(r15) ? r15 : [r15];
                    oR.DEFAULT_DIRECTIVES[t15] ? function(e15, t16, r16) {
                      if (r16.includes("'none'") || r16.includes("none")) {
                        e15[t16] = /* @__PURE__ */ new Set(["'none'"]);
                        return;
                      }
                      let i14 = /* @__PURE__ */ new Set();
                      e15[t16].forEach((e16) => {
                        i14.add(oR.formatValue(e16));
                      }), r16.forEach((e16) => {
                        i14.add(oR.formatValue(e16));
                      }), e15[t16] = i14;
                    }(n12, t15, i13) : function(e15, t16, r16) {
                      if (r16.includes("'none'") || r16.includes("none")) return e15.set(t16, /* @__PURE__ */ new Set(["'none'"]));
                      let i14 = /* @__PURE__ */ new Set();
                      r16.forEach((e16) => {
                        let t17 = oR.formatValue(e16);
                        i14.add(t17);
                      }), e15.set(t16, i14);
                    }(e14, t15, i13);
                  }), e14.forEach((e15, t15) => {
                    n12[t15] = e15;
                  });
                }
                return Object.entries(n12).sort(([e14], [t15]) => e14.localeCompare(t15)).map(([e14, t15]) => {
                  let r15 = Array.from(t15).map((e15) => ({ raw: e15, formatted: oR.formatValue(e15) }));
                  return `${e14} ${r15.map((e15) => e15.formatted).join(" ")}`;
                }).join("; ");
              }(null != (p2 = h2.strict) && p2, d2, h2.directives, s11), h2.reportTo && (a11 += "; report-to csp-endpoint", t13.push([rT, `csp-endpoint="${h2.reportTo}"`])), h2.reportOnly ? t13.push([rf, a11]) : t13.push([rp, a11]), s11 && t13.push([rb, s11]), { headers: t13 });
              o5.forEach(([e13, t14]) => {
                sK(B2, e13, t14);
              }), e12.debug("Clerk generated CSP", () => ({ headers: o5 }));
            }
            if (A2.headers && A2.headers.forEach((t13, r13) => {
              r13 === rp && e12.debug("Content-Security-Policy detected", () => ({ value: t13 })), B2.headers.append(r13, t13);
            }), B2.headers.get(sj)) return e12.debug("handlerResult is redirect"), ((e13, t13, r13) => {
              let i12 = t13.headers.get("location");
              if ("true" === t13.headers.get(rl) && i12 && tr(r13.secretKey) && e13.clerkUrl.isCrossOrigin(i12)) {
                var n12;
                let r14, s11, a11, o5 = e13.cookies.get(sH) || "", l4 = (n12 = new URL(i12), s11 = (r14 = new URL(n12)).searchParams.get(sH), r14.searchParams.delete(sH), (a11 = s11 || o5) && r14.searchParams.set(sH, a11), r14);
                return J.redirect(l4.href, t13);
              }
              return t13;
            })(R2, B2, C2);
            C2.debug && oE(B2, R2, { [rg]: "true" });
            let $2 = O2 === (null == T2 ? void 0 : T2.secretKey) ? { publishableKey: null == T2 ? void 0 : T2.publishableKey, secretKey: null == T2 ? void 0 : T2.secretKey } : {};
            return !function(e13, t13, r13, i12, n12, s11) {
              let a11, { reason: o5, message: l4, status: c3, token: u3 } = r13;
              if (t13 || (t13 = J.next()), t13.headers.get(sj)) return;
              "1" === t13.headers.get(sD) && (t13.headers.delete(sD), a11 = new URL(e13.url));
              let d3 = t13.headers.get(sL);
              if (d3) {
                let t14 = new URL(e13.url);
                if ((a11 = new URL(d3)).origin !== t14.origin) return;
              }
              if (a11) {
                let r14 = function(e14, t14, r15) {
                  var i13, n13;
                  let s12 = (e15) => !e15 || !Object.values(e15).some((e16) => void 0 !== e16);
                  if (s12(e14) && s12(t14) && !r15) return;
                  if (e14.secretKey && !s1) {
                    return void (n13 = "Clerk: Missing `CLERK_ENCRYPTION_KEY`. Required for propagating `secretKey` middleware option. See docs: https://clerk.com/docs/reference/nextjs/clerk-middleware#dynamic-keys", af.has(n13) || (af.add(n13), console.warn(n13)));
                  }
                  let a12 = e0() ? s1 || (i13 = () => ow.throwMissingSecretKeyError(), sQ || i13(), sQ) : s1 || sQ || ox;
                  return of.encrypt(JSON.stringify({ ...t14, ...e14, machineAuthObject: null != r15 ? r15 : void 0 }), a12).toString();
                }(i12, n12, s11);
                oE(t13, e13, { [rs]: c3, [ra]: u3 || "", [rn]: u3 ? oy(u3, (null == i12 ? void 0 : i12.secretKey) || sQ || n12.secretKey || "").toString() : "", [rt]: l4 || "", [ri]: o5 || "", [ru]: e13.clerkUrl.toString(), ...r14 ? { [rc]: r14 } : {} }), t13.headers.set(sL, a11.href);
              }
            }(R2, B2, A2, E2, $2, "session_token" === M2.tokenType ? null : ((e13) => {
              let { debug: t13, getToken: r13, has: i12, ...n12 } = e13;
              return n12;
            })(M2)), B2;
          }, (...r12) => {
            let i11 = ("string" == typeof e11 ? () => {
              let t12 = [], r13 = false;
              return { enable: () => {
                r13 = true;
              }, debug: (...e12) => {
                r13 && t12.push(e12.map((e13) => "function" == typeof e13 ? e13() : e13));
              }, commit: () => {
                if (r13) {
                  for (let r14 of (console.log(`[clerk debug start: ${e11}]`), t12)) {
                    let e12 = sF(r14);
                    e12 = e12.split("\n").map((e13) => `  ${e13}`).join("\n"), process.env.VERCEL && (e12 = function(e13, t13) {
                      let r15 = new TextEncoder(), i12 = new TextDecoder("utf-8"), n12 = r15.encode(e13).slice(0, 4096);
                      return i12.decode(n12).replace(/\uFFFD/g, "");
                    }(e12, 0)), console.log(e12);
                  }
                  console.log(`[clerk debug end: ${e11}] (@clerk/nextjs=6.36.2,next=${sJ.default.version},timestamp=${Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)})`);
                }
              } };
            } : e11)(), n11 = t11(i11);
            try {
              let e12 = n11(...r12);
              if ("object" == typeof e12 && "then" in e12 && "function" == typeof e12.then) return e12.then((e13) => (i11.commit(), e13)).catch((e13) => {
                throw i11.commit(), e13;
              });
              return i11.commit(), e12;
            } catch (e12) {
              throw i11.commit(), e12;
            }
          }), o3 = async (e12, t12) => {
            var i11, n11, s11;
            if ("/clerk-sync-keyless" === e12.nextUrl.pathname) {
              let t13, r12;
              return t13 = (s11 = e12).nextUrl.searchParams.get("returnUrl"), (r12 = new URL(s11.url)).pathname = "", J.redirect(t13 || r12.toString());
            }
            let o4 = "function" == typeof a10 ? await a10(e12) : a10, l3 = await oU((t13) => {
              var r12;
              return null == (r12 = e12.cookies.get(t13)) ? void 0 : r12.value;
            }), c2 = !(o4.publishableKey || s0 || (null == l3 ? void 0 : l3.publishableKey)), u2 = null != (n11 = null == (i11 = au(e12, rr)) ? void 0 : i11.replace("Bearer ", "")) ? n11 : "";
            if (c2 && !nQ(u2)) {
              let t13 = J.next();
              return oE(t13, e12, { [rs]: "signed-out" }), t13;
            }
            return r11(e12, t12);
          }, l2 = async (e12, t12) => ae ? o3(e12, t12) : r11(e12, t12);
          return i10 && n10 ? l2(i10, n10) : l2;
        });
      })(async (e10, t10) => {
        oX(t10) && await e10.protect();
      });
      e.s(["config", 0, { matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)", "/((?!dashboard|sign-in|sign-up).*)"] }, "default", 0, oY], 96592);
      var oQ = e.i(96592);
      e.i(96588);
      let oZ = { ...oQ }, o0 = "/middleware", o1 = oZ.middleware || oZ.default;
      if ("function" != typeof o1) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${o0}" must export a function named \`middleware\` or a default function.`);
      function o2(e10) {
        return eZ({ ...e10, page: o0, handler: async (...e11) => {
          try {
            return await o1(...e11);
          } catch (n10) {
            let t10 = e11[0], r10 = new URL(t10.url), i10 = r10.pathname + r10.search;
            throw await c(n10, { path: i10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), n10;
          }
        } });
      }
      e.s(["default", () => o2], 58217);
    }]);
  }
});

// .next/server/edge/chunks/node_modules_next_dist_f455c4eb._.js
var require_node_modules_next_dist_f455c4eb = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_f455c4eb._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_f455c4eb._.js", 28042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, s = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, a = {}, c = { RequestCookies: () => y, ResponseCookies: () => g, parseCookie: () => f, parseSetCookie: () => d, stringifyCookie: () => l };
      for (var u in c) n(a, u, { get: c[u], enumerable: true });
      function l(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function f(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, s2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != s2 ? s2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function d(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = f(e2), { domain: s2, expires: o2, httponly: i2, maxage: a2, path: c2, samesite: u2, secure: l2, partitioned: d2, priority: y2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var g2, m, _ = { name: t2, value: decodeURIComponent(r2), domain: s2, ...o2 && { expires: new Date(o2) }, ...i2 && { httpOnly: true }, ..."string" == typeof a2 && { maxAge: Number(a2) }, path: c2, ...u2 && { sameSite: p.includes(g2 = (g2 = u2).toLowerCase()) ? g2 : void 0 }, ...l2 && { secure: true }, ...y2 && { priority: h.includes(m = (m = y2).toLowerCase()) ? m : void 0 }, ...d2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in _) _[t3] && (e3[t3] = _[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, a2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let c2 of o(t2)) i.call(e2, c2) || c2 === r2 || n(e2, c2, { get: () => t2[c2], enumerable: !(a2 = s(t2, c2)) || a2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), a);
      var p = ["strict", "lax", "none"], h = ["low", "medium", "high"], y = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of f(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => l(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => l(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, g = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const s2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(s2) ? s2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, s3, o2, i2 = [], a2 = 0;
            function c2() {
              for (; a2 < e4.length && /\s/.test(e4.charAt(a2)); ) a2 += 1;
              return a2 < e4.length;
            }
            for (; a2 < e4.length; ) {
              for (t3 = a2, o2 = false; c2(); ) if ("," === (r3 = e4.charAt(a2))) {
                for (n3 = a2, a2 += 1, c2(), s3 = a2; a2 < e4.length && "=" !== (r3 = e4.charAt(a2)) && ";" !== r3 && "," !== r3; ) a2 += 1;
                a2 < e4.length && "=" === e4.charAt(a2) ? (o2 = true, a2 = s3, i2.push(e4.substring(t3, n3)), t3 = a2) : a2 = n3 + 1;
              } else a2 += 1;
              (!o2 || a2 >= e4.length) && i2.push(e4.substring(t3, e4.length));
            }
            return i2;
          }(s2)) {
            const t3 = d(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, s2 = this._parsed;
          return s2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = l(r3);
              t3.append("set-cookie", e4);
            }
          }(s2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(l).join("; ");
        }
      };
    }, 65664, 17536, (e) => {
      "use strict";
      e.i(28042), e.s([], 65664);
      class t {
        static get(e2, t2, r) {
          let n = Reflect.get(e2, t2, r);
          return "function" == typeof n ? n.bind(e2) : n;
        }
        static set(e2, t2, r, n) {
          return Reflect.set(e2, t2, r, n);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
      e.s(["ReflectAdapter", () => t], 17536);
    }, 24628, (e) => {
      "use strict";
      let t = "next-router-prefetch", r = ["rsc", "next-router-state-tree", t, "next-hmr-refresh", "next-router-segment-prefetch"];
      e.s(["FLIGHT_HEADERS", 0, r, "NEXT_HMR_REFRESH_HASH_COOKIE", 0, "__next_hmr_refresh_hash__", "NEXT_REWRITTEN_PATH_HEADER", 0, "x-nextjs-rewritten-path", "NEXT_REWRITTEN_QUERY_HEADER", 0, "x-nextjs-rewritten-query", "NEXT_ROUTER_PREFETCH_HEADER", 0, t, "NEXT_RSC_UNION_QUERY", 0, "_rsc", "RSC_HEADER", 0, "rsc"]);
    }, 48047, (e) => {
      "use strict";
      var t = e.i(17536);
      class r extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new r();
        }
      }
      class n extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(r2, n2, s) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.get(r2, n2, s);
            let o = n2.toLowerCase(), i = Object.keys(e2).find((e3) => e3.toLowerCase() === o);
            if (void 0 !== i) return t.ReflectAdapter.get(r2, i, s);
          }, set(r2, n2, s, o) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.set(r2, n2, s, o);
            let i = n2.toLowerCase(), a = Object.keys(e2).find((e3) => e3.toLowerCase() === i);
            return t.ReflectAdapter.set(r2, a ?? n2, s, o);
          }, has(r2, n2) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.has(r2, n2);
            let s = n2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === s);
            return void 0 !== o && t.ReflectAdapter.has(r2, o);
          }, deleteProperty(r2, n2) {
            if ("symbol" == typeof n2) return t.ReflectAdapter.deleteProperty(r2, n2);
            let s = n2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === s);
            return void 0 === o || t.ReflectAdapter.deleteProperty(r2, o);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, n2, s) {
            switch (n2) {
              case "append":
              case "delete":
              case "set":
                return r.callable;
              default:
                return t.ReflectAdapter.get(e3, n2, s);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new n(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      e.s(["HeadersAdapter", () => n]);
    }, 90044, (e) => {
      "use strict";
      let t = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class r {
        disable() {
          throw t;
        }
        getStore() {
        }
        run() {
          throw t;
        }
        exit() {
          throw t;
        }
        enterWith() {
          throw t;
        }
        static bind(e2) {
          return e2;
        }
      }
      let n = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function s() {
        return n ? new n() : new r();
      }
      function o(e2) {
        return n ? n.bind(e2) : r.bind(e2);
      }
      function i() {
        return n ? n.snapshot() : function(e2, ...t2) {
          return e2(...t2);
        };
      }
      e.s(["bindSnapshot", () => o, "createAsyncLocalStorage", () => s, "createSnapshot", () => i]);
    }, 7754, 90460, 9939, (e) => {
      "use strict";
      var t = e.i(90044);
      let r = (0, t.createAsyncLocalStorage)();
      e.s([], 7754), e.s(["workAsyncStorage", 0, r], 90460);
      let n = (0, t.createAsyncLocalStorage)();
      e.s(["workUnitAsyncStorageInstance", 0, n], 9939);
    }, 53835, 25753, 82453, (e) => {
      "use strict";
      var t = e.i(9939);
      e.i(24628);
      class r extends Error {
        constructor(e2, t2) {
          super(`Invariant: ${e2.endsWith(".") ? e2 : e2 + "."} This is a bug in Next.js.`, t2), this.name = "InvariantError";
        }
      }
      function n(e2) {
        throw Object.defineProperty(Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }
      function s(e2, t2) {
        if (e2.isDraftMode) switch (t2.type) {
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-runtime":
          case "request":
            return t2.draftMode;
        }
      }
      function o(e2) {
        switch (e2.type) {
          case "prerender-runtime":
          case "private-cache":
            return e2.runtimeStagePromise;
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
          case "request":
          case "cache":
          case "unstable-cache":
            return null;
          default:
            return e2;
        }
      }
      e.s(["InvariantError", () => r], 25753), e.s(["getDraftModeProviderForCacheScope", () => s, "getRuntimeStagePromise", () => o, "throwForMissingRequestStore", () => n], 53835), e.s(["workUnitAsyncStorage", () => t.workUnitAsyncStorageInstance], 82453);
    }, 72117, (e) => {
      "use strict";
      function t(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === r;
      }
      let r = "HANGING_PROMISE_REJECTION";
      class n extends Error {
        constructor(e2, t2) {
          super(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e2}".`), this.route = e2, this.expression = t2, this.digest = r;
        }
      }
      let s = /* @__PURE__ */ new WeakMap();
      function o(e2, t2, r2) {
        if (e2.aborted) return Promise.reject(new n(t2, r2));
        {
          let o2 = new Promise((o3, i2) => {
            let a2 = i2.bind(null, new n(t2, r2)), c = s.get(e2);
            if (c) c.push(a2);
            else {
              let t3 = [a2];
              s.set(e2, t3), e2.addEventListener("abort", () => {
                for (let e3 = 0; e3 < t3.length; e3++) t3[e3]();
              }, { once: true });
            }
          });
          return o2.catch(i), o2;
        }
      }
      function i() {
      }
      function a(e2, t2, r2) {
        return t2.stagedRendering ? t2.stagedRendering.delayUntilStage(r2, void 0, e2) : new Promise((t3) => {
          setTimeout(() => {
            t3(e2);
          }, 0);
        });
      }
      e.s(["isHangingPromiseRejectionError", () => t, "makeDevtoolsIOAwarePromise", () => a, "makeHangingPromise", () => o]);
    }, 81828, (e) => {
      "use strict";
      let t = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
      class r extends Error {
        constructor(e2) {
          super(`Bail out to client-side rendering: ${e2}`), this.reason = e2, this.digest = t;
        }
      }
      function n(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && e2.digest === t;
      }
      e.s(["BailoutToCSRError", () => r, "isBailoutToCSRError", () => n]);
    }, 8946, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function s(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var o = Array.isArray;
      function i() {
      }
      var a = Symbol.for("react.transitional.element"), c = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), m = Symbol.for("react.view_transition"), _ = Symbol.iterator, b = Object.prototype.hasOwnProperty, R = Object.assign;
      function E(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: a, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function v(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === a;
      }
      var A = /\/+/g;
      function w(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function S(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], u2 = 0;
        return !function e3(t3, r3, n3, u3, l2) {
          var f2, d2, p2, h2 = typeof t3;
          ("undefined" === h2 || "boolean" === h2) && (t3 = null);
          var g2 = false;
          if (null === t3) g2 = true;
          else switch (h2) {
            case "bigint":
            case "string":
            case "number":
              g2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case a:
                case c:
                  g2 = true;
                  break;
                case y:
                  return e3((g2 = t3._init)(t3._payload), r3, n3, u3, l2);
              }
          }
          if (g2) return l2 = l2(t3), g2 = "" === u3 ? "." + w(t3, 0) : u3, o(l2) ? (n3 = "", null != g2 && (n3 = g2.replace(A, "$&/") + "/"), e3(l2, r3, n3, "", function(e4) {
            return e4;
          })) : null != l2 && (v(l2) && (f2 = l2, d2 = n3 + (null == l2.key || t3 && t3.key === l2.key ? "" : ("" + l2.key).replace(A, "$&/") + "/") + g2, l2 = E(f2.type, d2, f2.props)), r3.push(l2)), 1;
          g2 = 0;
          var m2 = "" === u3 ? "." : u3 + ":";
          if (o(t3)) for (var b2 = 0; b2 < t3.length; b2++) h2 = m2 + w(u3 = t3[b2], b2), g2 += e3(u3, r3, n3, h2, l2);
          else if ("function" == typeof (b2 = null === (p2 = t3) || "object" != typeof p2 ? null : "function" == typeof (p2 = _ && p2[_] || p2["@@iterator"]) ? p2 : null)) for (t3 = b2.call(t3), b2 = 0; !(u3 = t3.next()).done; ) h2 = m2 + w(u3 = u3.value, b2++), g2 += e3(u3, r3, n3, h2, l2);
          else if ("object" === h2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(i, i) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, u3, l2);
            throw Error(s(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return g2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, u2++);
        }), n2;
      }
      function k(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function O() {
        return /* @__PURE__ */ new WeakMap();
      }
      function T() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = g, r.Children = { map: S, forEach: function(e2, t2, r2) {
        S(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return S(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return S(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!v(e2)) throw Error(s(143));
        return e2;
      } }, r.Fragment = u, r.Profiler = f, r.StrictMode = l, r.Suspense = p, r.ViewTransition = m, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(O);
          void 0 === (t2 = r2.get(e2)) && (t2 = T(), r2.set(e2, t2)), r2 = 0;
          for (var s2 = arguments.length; r2 < s2; r2++) {
            var o2 = arguments[r2];
            if ("function" == typeof o2 || "object" == typeof o2 && null !== o2) {
              var i2 = t2.o;
              null === i2 && (t2.o = i2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = i2.get(o2)) && (t2 = T(), i2.set(o2, t2));
            } else null === (i2 = t2.p) && (t2.p = i2 = /* @__PURE__ */ new Map()), void 0 === (t2 = i2.get(o2)) && (t2 = T(), i2.set(o2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var a2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = a2;
          } catch (e3) {
            throw (a2 = t2).s = 2, a2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(s(267, e2));
        var n2 = R({}, e2.props), o2 = e2.key;
        if (null != t2) for (i2 in void 0 !== t2.key && (o2 = "" + t2.key), t2) b.call(t2, i2) && "key" !== i2 && "__self" !== i2 && "__source" !== i2 && ("ref" !== i2 || void 0 !== t2.ref) && (n2[i2] = t2[i2]);
        var i2 = arguments.length - 2;
        if (1 === i2) n2.children = r2;
        else if (1 < i2) {
          for (var a2 = Array(i2), c2 = 0; c2 < i2; c2++) a2[c2] = arguments[c2 + 2];
          n2.children = a2;
        }
        return E(e2.type, o2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, s2 = {}, o2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (o2 = "" + t2.key), t2) b.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (s2[n2] = t2[n2]);
        var i2 = arguments.length - 2;
        if (1 === i2) s2.children = r2;
        else if (1 < i2) {
          for (var a2 = Array(i2), c2 = 0; c2 < i2; c2++) a2[c2] = arguments[c2 + 2];
          s2.children = a2;
        }
        if (e2 && e2.defaultProps) for (n2 in i2 = e2.defaultProps) void 0 === s2[n2] && (s2[n2] = i2[n2]);
        return E(e2, o2, s2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: d, render: e2 };
      }, r.isValidElement = v, r.lazy = function(e2) {
        return { $$typeof: y, _payload: { _status: -1, _result: e2 }, _init: k };
      }, r.memo = function(e2, t2) {
        return { $$typeof: h, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-52684925-20251110";
    }, 37560, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 18368, 80082, (e) => {
      "use strict";
      let t = "DYNAMIC_SERVER_USAGE";
      class r extends Error {
        constructor(e2) {
          super(`Dynamic server usage: ${e2}`), this.description = e2, this.digest = t;
        }
      }
      function n(e2) {
        return "object" == typeof e2 && null !== e2 && "digest" in e2 && "string" == typeof e2.digest && e2.digest === t;
      }
      e.s(["DynamicServerError", () => r, "isDynamicServerError", () => n], 18368);
      class s extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
      e.s(["StaticGenBailoutError", () => s], 80082);
    }, 21654, 46025, (e) => {
      "use strict";
      e.s(["METADATA_BOUNDARY_NAME", 0, "__next_metadata_boundary__", "OUTLET_BOUNDARY_NAME", 0, "__next_outlet_boundary__", "ROOT_LAYOUT_BOUNDARY_NAME", 0, "__next_root_layout_boundary__", "VIEWPORT_BOUNDARY_NAME", 0, "__next_viewport_boundary__"], 21654), e.s(["scheduleOnNextTick", 0, (e2) => {
        Promise.resolve().then(() => {
          setTimeout(e2, 0);
        });
      }], 46025);
    }, 63072, 38174, (e) => {
      "use strict";
      var t, r = e.i(37560), n = e.i(18368);
      e.i(80082), e.i(53835), e.i(82453), e.i(7754), e.i(90460), e.i(72117);
      var s = e.i(21654);
      e.i(46025), e.i(81828), e.i(25753);
      var o = ((t = {})[t.Static = 1] = "Static", t[t.Runtime = 2] = "Runtime", t[t.Dynamic = 3] = "Dynamic", t);
      e.s(["RenderStage", () => o], 38174);
      let i = "function" == typeof r.default.unstable_postpone;
      function a(e2, t2, r2) {
        let s2 = Object.defineProperty(new n.DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = s2.stack, s2;
      }
      function c(e2) {
        switch (e2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }
      function u(e2, t2, r2, n2) {
        if (false === n2.controller.signal.aborted) {
          let s2, o2;
          s2 = y(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`), n2.controller.abort(s2), (o2 = n2.dynamicTracking) && o2.dynamicAccesses.push({ stack: o2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 });
          let i2 = n2.dynamicTracking;
          i2 && null === i2.syncDynamicErrorWithStack && (i2.syncDynamicErrorWithStack = r2);
        }
        throw y(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      function l(e2, t2, n2) {
        (function() {
          if (!i) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), n2 && n2.dynamicAccesses.push({ stack: n2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), r.default.unstable_postpone(f(e2, t2));
      }
      function f(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function d(e2) {
        return "object" == typeof e2 && null !== e2 && "string" == typeof e2.message && p(e2.message);
      }
      function p(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === p(f("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      let h = "NEXT_PRERENDER_INTERRUPTED";
      function y(e2) {
        let t2 = Object.defineProperty(Error(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return t2.digest = h, t2;
      }
      function g(e2) {
        return "object" == typeof e2 && null !== e2 && e2.digest === h && "name" in e2 && "message" in e2 && e2 instanceof Error;
      }
      function m(e2, t2) {
        return e2.runtimeStagePromise ? e2.runtimeStagePromise.then(() => t2) : t2;
      }
      RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${s.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`), RegExp(`\\n\\s+at ${s.METADATA_BOUNDARY_NAME}[\\n\\s]`), RegExp(`\\n\\s+at ${s.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`), RegExp(`\\n\\s+at ${s.OUTLET_BOUNDARY_NAME}[\\n\\s]`), e.s(["abortAndThrowOnSynchronousRequestDataAccess", () => u, "delayUntilRuntimeStage", () => m, "isDynamicPostpone", () => d, "isPrerenderInterruptedError", () => g, "postponeWithTracking", () => l, "throwToInterruptStaticGeneration", () => a, "trackDynamicDataInDynamicRender", () => c], 63072);
    }, 53065, 44789, 69487, 65179, (e) => {
      "use strict";
      e.i(65664);
      var t = e.i(28042), r = e.i(17536);
      e.i(7754);
      var n = e.i(90460);
      class s extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new s();
        }
      }
      class o {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, n2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return s.callable;
              default:
                return r.ReflectAdapter.get(e3, t2, n2);
            }
          } });
        }
      }
      let i = Symbol.for("next.mutated.cookies");
      class a {
        static wrap(e2, s2) {
          let o2 = new t.ResponseCookies(new Headers());
          for (let t2 of e2.getAll()) o2.set(t2);
          let a2 = [], c2 = /* @__PURE__ */ new Set(), u2 = () => {
            let e3 = n.workAsyncStorage.getStore();
            if (e3 && (e3.pathWasRevalidated = true), a2 = o2.getAll().filter((e4) => c2.has(e4.name)), s2) {
              let e4 = [];
              for (let r2 of a2) {
                let n2 = new t.ResponseCookies(new Headers());
                n2.set(r2), e4.push(n2.toString());
              }
              s2(e4);
            }
          }, l2 = new Proxy(o2, { get(e3, t2, n2) {
            switch (t2) {
              case i:
                return a2;
              case "delete":
                return function(...t3) {
                  c2.add("string" == typeof t3[0] ? t3[0] : t3[0].name);
                  try {
                    return e3.delete(...t3), l2;
                  } finally {
                    u2();
                  }
                };
              case "set":
                return function(...t3) {
                  c2.add("string" == typeof t3[0] ? t3[0] : t3[0].name);
                  try {
                    return e3.set(...t3), l2;
                  } finally {
                    u2();
                  }
                };
              default:
                return r.ReflectAdapter.get(e3, t2, n2);
            }
          } });
          return l2;
        }
      }
      function c(e2) {
        let t2 = new Proxy(e2.mutableCookies, { get(n2, s2, o2) {
          switch (s2) {
            case "delete":
              return function(...r2) {
                return l(e2, "cookies().delete"), n2.delete(...r2), t2;
              };
            case "set":
              return function(...r2) {
                return l(e2, "cookies().set"), n2.set(...r2), t2;
              };
            default:
              return r.ReflectAdapter.get(n2, s2, o2);
          }
        } });
        return t2;
      }
      function u(e2) {
        return "action" === e2.phase;
      }
      function l(e2, t2) {
        if (!u(e2)) throw new s();
      }
      function f(e2) {
        let r2 = new t.RequestCookies(new Headers());
        for (let t2 of e2.getAll()) r2.set(t2);
        return r2;
      }
      e.s(["MutableRequestCookiesAdapter", () => a, "RequestCookiesAdapter", () => o, "areCookiesMutableInCurrentPhase", () => u, "createCookiesWithMutableAccessCheck", () => c, "responseCookiesToRequestCookies", () => f], 53065), e.i(80082);
      let d = (0, e.i(90044).createAsyncLocalStorage)();
      function p() {
        let e2 = d.getStore();
        return (null == e2 ? void 0 : e2.rootTaskSpawnPhase) === "action";
      }
      e.s([], 44789), e.s(["afterTaskAsyncStorage", 0, d], 69487), e.s(["isRequestAPICallableInsideAfter", () => p], 65179);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-edge-wrapper_5ec9fd92.js
var require_turbopack_edge_wrapper_5ec9fd92 = __commonJS({
  ".next/server/edge/chunks/turbopack-edge-wrapper_5ec9fd92.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-edge-wrapper_5ec9fd92.js", { otherChunks: ["chunks/[root-of-the-server]__65c55606._.js", "chunks/node_modules_next_dist_esm_api_headers_95aeb203.js", "chunks/node_modules_3554f982._.js", "chunks/node_modules_next_dist_f455c4eb._.js"], runtimeModuleIds: [88912] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = /* @__PURE__ */ new WeakMap();
      function r(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let n = r.prototype, o = Object.prototype.hasOwnProperty, u = "undefined" != typeof Symbol && Symbol.toStringTag;
      function l(e2, t2, r2) {
        o.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function i(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = s(t2), e2[t2] = r2), r2;
      }
      function s(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function a(e2, t2) {
        l(e2, "__esModule", { value: true }), u && l(e2, u, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) l(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? l(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : l(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      n.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = i(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, a(n2, e2);
      }, n.j = function(e2, r2) {
        var n2, u2;
        let l2, s2, a2;
        null != r2 ? s2 = (l2 = i(this.c, r2)).exports : (l2 = this.m, s2 = this.e);
        let c2 = (n2 = l2, u2 = s2, (a2 = t.get(n2)) || (t.set(n2, a2 = []), n2.exports = n2.namespaceObject = new Proxy(u2, { get(e3, t2) {
          if (o.call(e3, t2) || "default" === t2 || "__esModule" === t2) return Reflect.get(e3, t2);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t2);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t2 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t2.includes(r3) || t2.push(r3);
          return t2;
        } })), a2);
        "object" == typeof e2 && null !== e2 && c2.push(e2);
      }, n.v = function(e2, t2) {
        (null != t2 ? i(this.c, t2) : this.m).exports = e2;
      }, n.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? i(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let c = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, f = [null, c({}), c([]), c(c)];
      function d(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !f.includes(t3); t3 = c(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), a(t2, n2), t2;
      }
      function h(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function p(e2) {
        let t2 = S(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = d(r2, h(r2), r2 && r2.__esModule);
      }
      function m(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function b() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      n.i = p, n.A = function(e2) {
        return this.r(e2)(p.bind(this));
      }, n.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, n.r = function(e2) {
        return S(e2, this.m).exports;
      }, n.f = function(e2) {
        function t2(t3) {
          if (o.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (o.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let y = Symbol("turbopack queues"), O = Symbol("turbopack exports"), g = Symbol("turbopack error");
      function w(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      n.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = b(), s2 = Object.assign(i2, { [O]: r2.exports, [y]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), s2.catch(() => {
          });
        } }), a2 = { get: () => s2, set(e3) {
          e3 !== s2 && (s2[O] = e3);
        } };
        Object.defineProperty(r2, "exports", a2), Object.defineProperty(r2, "namespaceObject", a2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (y in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [O]: {}, [y]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[O] = e5, w(t4);
                }, (e5) => {
                  r4[g] = e5, w(t4);
                }), r4;
              }
            }
            return { [O]: e4, [y]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[g]) throw e4[g];
            return e4[O];
          }), { promise: u3, resolve: l3 } = b(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function s3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[y](s3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(s2[g] = e3) : u2(s2[O]), w(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let _ = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function j(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      _.prototype = URL.prototype, n.U = _, n.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, n.g = globalThis;
      let k = r.prototype;
      var C, R = ((C = R || {})[C.Runtime = 0] = "Runtime", C[C.Parent = 1] = "Parent", C[C.Update = 2] = "Update", C);
      let U = /* @__PURE__ */ new Map();
      n.M = U;
      let v = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map();
      async function T(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return E(e2, t2, M(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!U.has(e3) || v.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => P.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) P.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = E(e2, t2, M(n3));
            P.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = E(e2, t2, M(r2.path)), l2)) P.has(o3) || P.set(o3, n2);
        }
        for (let e3 of o2) v.has(e3) || v.set(e3, n2);
        await n2;
      }
      k.l = function(e2) {
        return T(1, this.m.id, e2);
      };
      let $ = Promise.resolve(void 0), x = /* @__PURE__ */ new WeakMap();
      function E(t2, r2, n2) {
        let o2 = e.loadChunkCached(t2, n2), u2 = x.get(o2);
        if (void 0 === u2) {
          let e2 = x.set.bind(x, o2, $);
          u2 = o2.then(e2).catch((e3) => {
            let o3;
            switch (t2) {
              case 0:
                o3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case 1:
                o3 = `from module ${r2}`;
                break;
              case 2:
                o3 = "from an HMR update";
                break;
              default:
                j(t2, (e4) => `Unknown source type: ${e4}`);
            }
            throw Error(`Failed to load chunk ${n2} ${o3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
          }), x.set(o2, u2);
        }
        return u2;
      }
      function M(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      k.L = function(e2) {
        return E(1, this.m.id, e2);
      }, k.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, k.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, k.b = function(e2) {
        let t2 = new Blob([`self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(e2.reverse().map(M), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`], { type: "text/javascript" });
        return URL.createObjectURL(t2);
      };
      let A = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      n.w = function(t2, r2, n2) {
        return e.loadWebAssembly(1, this.m.id, t2, r2, n2);
      }, n.u = function(t2, r2) {
        return e.loadWebAssemblyModule(1, this.m.id, t2, r2);
      };
      let K = {};
      n.c = K;
      let S = (e2, t2) => {
        let r2 = K[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return N(e2, R.Parent, t2.id);
      };
      function N(e2, t2, n2) {
        let o2 = U.get(e2);
        if ("function" != typeof o2) throw Error(function(e3, t3, r2) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r2}`;
              break;
            case 1:
              n3 = `because it was required from module ${r2}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              j(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, n2));
        let u2 = s(e2), l2 = u2.exports;
        K[e2] = u2;
        let i2 = new r(u2, l2);
        try {
          o2(i2, u2, l2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && d(u2.exports, u2.namespaceObject), u2;
      }
      function q(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          let t3 = decodeURIComponent(("undefined" != typeof TURBOPACK_NEXT_CHUNK_URLS ? TURBOPACK_NEXT_CHUNK_URLS.pop() : e2.getAttribute("src")).replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3, r3, n3) {
          let o2 = 1;
          for (; o2 < e2.length; ) {
            let t4 = e2[o2], n4 = o2 + 1;
            for (; n4 < e2.length && "function" != typeof e2[n4]; ) n4++;
            if (n4 === e2.length) throw Error("malformed chunk format, expected a factory function");
            if (!r3.has(t4)) {
              let u2 = e2[n4];
              for (Object.defineProperty(u2, "name", { value: "module evaluation" }); o2 < n4; o2++) t4 = e2[o2], r3.set(t4, u2);
            }
            o2 = n4 + 1;
          }
        }(t2, 0, U)), e.registerChunk(n2, r2);
      }
      function L(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : d(n2, h(n2), true);
      }
      n.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? d(t2.default, h(t2), true) : t2;
      }, L.resolve = (e2, t2) => __require.resolve(e2, t2), n.x = L, e = { registerChunk(e2, t2) {
        B.add(e2), function(e3) {
          let t3 = W.get(e3);
          if (null != t3) {
            for (let r2 of t3) r2.requiredChunks.delete(e3), 0 === r2.requiredChunks.size && I(r2.runtimeModuleIds, r2.chunkPath);
            W.delete(e3);
          }
        }(e2), null != t2 && (0 === t2.otherChunks.length ? I(t2.runtimeModuleIds, e2) : function(e3, t3, r2) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r2, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = m(e4);
            if (B.has(t4)) continue;
            n2.add(t4);
            let r3 = W.get(t4);
            null == r3 && (r3 = /* @__PURE__ */ new Set(), W.set(t4, r3)), r3.add(o2);
          }
          0 === o2.requiredChunks.size && I(o2.runtimeModuleIds, o2.chunkPath);
        }(e2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = m(e3), A.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await H(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => H(r2, n2) };
      let B = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Map();
      function I(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = K[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          N(t3, R.Runtime, e3);
        }(t2, r2);
      }
      async function H(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let F = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: q }, F.forEach(q);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\\\.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\\\.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!dashboard|sign-in|sign-up).*))(\\\\.json)?[\\/#\\?]?$"] }];
    require_root_of_the_server_65c55606();
    require_node_modules_next_dist_esm_api_headers_95aeb203();
    require_node_modules_3554f982();
    require_node_modules_next_dist_f455c4eb();
    require_turbopack_edge_wrapper_5ec9fd92();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": true }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "lucide-react": { "transform": "lucide-react/dist/esm/icons/{{kebabCase member}}.js" }, "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/stephenstokes/Downloads/Projects/12 December 2025/Starter Club", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 7, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": false, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": false, "lockDistDir": true, "isolatedDevBuild": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "/Users/stephenstokes/Downloads/Projects/12 December 2025/Starter Club" }, "distDirRoot": ".next", "_originalRedirects": [{ "source": "/partners", "destination": "/dashboard/partner", "permanent": true }, { "source": "/partners/admin", "destination": "/dashboard/super-admin", "permanent": true }] };
var BuildId = "xcm9UhX5K5RNd5vNUKrfx";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }, { "source": "/partners", "destination": "/dashboard/partner", "statusCode": 308, "regex": "^(?!/_next)/partners(?:/)?$" }, { "source": "/partners/admin", "destination": "/dashboard/super-admin", "statusCode": 308, "regex": "^(?!/_next)/partners/admin(?:/)?$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/dashboard", "regex": "^/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard(?:/)?$" }, { "page": "/dashboard/partner", "regex": "^/dashboard/partner(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner(?:/)?$" }, { "page": "/dashboard/partner/actions", "regex": "^/dashboard/partner/actions(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/actions(?:/)?$" }, { "page": "/dashboard/partner/case-studies", "regex": "^/dashboard/partner/case\\-studies(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/case\\-studies(?:/)?$" }, { "page": "/dashboard/partner/intros", "regex": "^/dashboard/partner/intros(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/intros(?:/)?$" }, { "page": "/dashboard/partner/packages", "regex": "^/dashboard/partner/packages(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/packages(?:/)?$" }, { "page": "/dashboard/partner/profile", "regex": "^/dashboard/partner/profile(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/profile(?:/)?$" }, { "page": "/dashboard/partner/reports", "regex": "^/dashboard/partner/reports(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/reports(?:/)?$" }, { "page": "/dashboard/partner/reports/sample", "regex": "^/dashboard/partner/reports/sample(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/reports/sample(?:/)?$" }, { "page": "/dashboard/partner/resources", "regex": "^/dashboard/partner/resources(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/resources(?:/)?$" }, { "page": "/dashboard/partner/roi", "regex": "^/dashboard/partner/roi(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/roi(?:/)?$" }, { "page": "/dashboard/partner/story", "regex": "^/dashboard/partner/story(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner/story(?:/)?$" }, { "page": "/dashboard/partner-admin", "regex": "^/dashboard/partner\\-admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner\\-admin(?:/)?$" }, { "page": "/dashboard/partner-admin/settings", "regex": "^/dashboard/partner\\-admin/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner\\-admin/settings(?:/)?$" }, { "page": "/dashboard/partner-admin/team", "regex": "^/dashboard/partner\\-admin/team(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/partner\\-admin/team(?:/)?$" }, { "page": "/dashboard/super-admin", "regex": "^/dashboard/super\\-admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin(?:/)?$" }, { "page": "/dashboard/super-admin/api-keys", "regex": "^/dashboard/super\\-admin/api\\-keys(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/api\\-keys(?:/)?$" }, { "page": "/dashboard/super-admin/audit-logs", "regex": "^/dashboard/super\\-admin/audit\\-logs(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/audit\\-logs(?:/)?$" }, { "page": "/dashboard/super-admin/case-studies", "regex": "^/dashboard/super\\-admin/case\\-studies(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/case\\-studies(?:/)?$" }, { "page": "/dashboard/super-admin/debug", "regex": "^/dashboard/super\\-admin/debug(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/debug(?:/)?$" }, { "page": "/dashboard/super-admin/debug/seed", "regex": "^/dashboard/super\\-admin/debug/seed(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/debug/seed(?:/)?$" }, { "page": "/dashboard/super-admin/flags", "regex": "^/dashboard/super\\-admin/flags(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/flags(?:/)?$" }, { "page": "/dashboard/super-admin/logs", "regex": "^/dashboard/super\\-admin/logs(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/logs(?:/)?$" }, { "page": "/dashboard/super-admin/resources", "regex": "^/dashboard/super\\-admin/resources(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/resources(?:/)?$" }, { "page": "/dashboard/super-admin/submissions", "regex": "^/dashboard/super\\-admin/submissions(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/submissions(?:/)?$" }, { "page": "/dashboard/super-admin/users", "regex": "^/dashboard/super\\-admin/users(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/users(?:/)?$" }, { "page": "/dashboard/super-admin/verify", "regex": "^/dashboard/super\\-admin/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/super\\-admin/verify(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/legal/california-privacy-rights", "regex": "^/legal/california\\-privacy\\-rights(?:/)?$", "routeKeys": {}, "namedRegex": "^/legal/california\\-privacy\\-rights(?:/)?$" }, { "page": "/legal/cookies", "regex": "^/legal/cookies(?:/)?$", "routeKeys": {}, "namedRegex": "^/legal/cookies(?:/)?$" }, { "page": "/legal/privacy", "regex": "^/legal/privacy(?:/)?$", "routeKeys": {}, "namedRegex": "^/legal/privacy(?:/)?$" }, { "page": "/legal/terms", "regex": "^/legal/terms(?:/)?$", "routeKeys": {}, "namedRegex": "^/legal/terms(?:/)?$" }, { "page": "/secret-menu", "regex": "^/secret\\-menu(?:/)?$", "routeKeys": {}, "namedRegex": "^/secret\\-menu(?:/)?$" }, { "page": "/support", "regex": "^/support(?:/)?$", "routeKeys": {}, "namedRegex": "^/support(?:/)?$" }], "dynamic": [{ "page": "/sign-in/[[...sign-in]]", "regex": "^/sign\\-in(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignin": "nxtPsign-in" }, "namedRegex": "^/sign\\-in(?:/(?<nxtPsignin>.+?))?(?:/)?$" }, { "page": "/sign-up/[[...sign-up]]", "regex": "^/sign\\-up(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignup": "nxtPsign-up" }, "namedRegex": "^/sign\\-up(?:/(?<nxtPsignup>.+?))?(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "prefetchDataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "50ccfd2d7df31ab129b9e5bce0cc265f", "previewModeSigningKey": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201", "previewModeEncryptionKey": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__65c55606._.js", "server/edge/chunks/node_modules_next_dist_esm_api_headers_95aeb203.js", "server/edge/chunks/node_modules_3554f982._.js", "server/edge/chunks/node_modules_next_dist_f455c4eb._.js", "server/edge/chunks/turbopack-edge-wrapper_5ec9fd92.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\\\.json)?[\\/#\\?]?$", "originalSource": "/(api|trpc)(.*)" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!dashboard|sign-in|sign-up).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!dashboard|sign-in|sign-up).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } } }, "sortedMiddleware": ["/"], "functions": { "/_not-found/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_6d790c58._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_b1158a3b._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/app/_not-found/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_89e97866._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_fb172728._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_47015eec._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_1c9e8c96.js", "server/app/_not-found/page/react-loadable-manifest.js"], "name": "app/_not-found/page", "page": "/_not-found/page", "matchers": [{ "regexp": "^/_not-found(?:/)?$", "originalSource": "/_not-found" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/app/dashboard/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_c1138ce4._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_281fc1f0._.js", "server/edge/chunks/ssr/_4e929631._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_0c227606.js", "server/app/dashboard/page/react-loadable-manifest.js"], "name": "app/dashboard/page", "page": "/dashboard/page", "matchers": [{ "regexp": "^/dashboard(?:/)?$", "originalSource": "/dashboard" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner-admin/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner-admin/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_a02c5d45._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_e4ad42ca._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_fcfdfe9e._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_d0be31c3.js", "server/app/dashboard/partner-admin/page/react-loadable-manifest.js"], "name": "app/dashboard/partner-admin/page", "page": "/dashboard/partner-admin/page", "matchers": [{ "regexp": "^/dashboard/partner-admin(?:/)?$", "originalSource": "/dashboard/partner-admin" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner-admin/settings/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner-admin/settings/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_edb70dd8._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_ff21b413._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_46d6365e._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_0a5764b8.js", "server/app/dashboard/partner-admin/settings/page/react-loadable-manifest.js"], "name": "app/dashboard/partner-admin/settings/page", "page": "/dashboard/partner-admin/settings/page", "matchers": [{ "regexp": "^/dashboard/partner-admin/settings(?:/)?$", "originalSource": "/dashboard/partner-admin/settings" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner-admin/team/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/_17850fc5._.js", "server/app/dashboard/partner-admin/team/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d409691e._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_ad89c756._.js", "server/edge/chunks/ssr/[root-of-the-server]__d6f752c2._.js", "server/edge/chunks/ssr/node_modules_ad4af6b3._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/_bad9aa88._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/_941bf123._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_ce754e6d.js", "server/app/dashboard/partner-admin/team/page/react-loadable-manifest.js"], "name": "app/dashboard/partner-admin/team/page", "page": "/dashboard/partner-admin/team/page", "matchers": [{ "regexp": "^/dashboard/partner-admin/team(?:/)?$", "originalSource": "/dashboard/partner-admin/team" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/actions/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner/actions/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_be077739._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_05911bb1._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_505f242d._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_0a99cced.js", "server/app/dashboard/partner/actions/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/actions/page", "page": "/dashboard/partner/actions/page", "matchers": [{ "regexp": "^/dashboard/partner/actions(?:/)?$", "originalSource": "/dashboard/partner/actions" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/case-studies/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/src_46100a51._.js", "server/app/dashboard/partner/case-studies/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_7592ac42._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_7bd047db._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/_bcaaa271._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_77b236e4.js", "server/app/dashboard/partner/case-studies/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/case-studies/page", "page": "/dashboard/partner/case-studies/page", "matchers": [{ "regexp": "^/dashboard/partner/case-studies(?:/)?$", "originalSource": "/dashboard/partner/case-studies" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/intros/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner/intros/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_e2174818._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_43625ecd._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_0604cdd6._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_a6c428f5.js", "server/app/dashboard/partner/intros/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/intros/page", "page": "/dashboard/partner/intros/page", "matchers": [{ "regexp": "^/dashboard/partner/intros(?:/)?$", "originalSource": "/dashboard/partner/intros" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/packages/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner/packages/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_fc7bb8cf._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_14140403._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_f82b8fc6._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_25f2b374.js", "server/app/dashboard/partner/packages/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/packages/page", "page": "/dashboard/partner/packages/page", "matchers": [{ "regexp": "^/dashboard/partner/packages(?:/)?$", "originalSource": "/dashboard/partner/packages" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_def42038._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/_c0a68906._.js", "server/edge/chunks/ssr/_139b74ca._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_d340d082.js", "server/app/dashboard/partner/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/page", "page": "/dashboard/partner/page", "matchers": [{ "regexp": "^/dashboard/partner(?:/)?$", "originalSource": "/dashboard/partner" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/profile/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner/profile/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_6d68889d._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_18d712ef._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_6cd5fe0d._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_30689e4a.js", "server/app/dashboard/partner/profile/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/profile/page", "page": "/dashboard/partner/profile/page", "matchers": [{ "regexp": "^/dashboard/partner/profile(?:/)?$", "originalSource": "/dashboard/partner/profile" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/reports/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner/reports/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_598c1525._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_547cde04._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_4273570d._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_2c365747.js", "server/app/dashboard/partner/reports/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/reports/page", "page": "/dashboard/partner/reports/page", "matchers": [{ "regexp": "^/dashboard/partner/reports(?:/)?$", "originalSource": "/dashboard/partner/reports" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/reports/sample/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner/reports/sample/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_8e02b2f6._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_eb1c7f72._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_fa0f6243._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_d8429a38.js", "server/app/dashboard/partner/reports/sample/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/reports/sample/page", "page": "/dashboard/partner/reports/sample/page", "matchers": [{ "regexp": "^/dashboard/partner/reports/sample(?:/)?$", "originalSource": "/dashboard/partner/reports/sample" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/resources/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/_cb586c0e._.js", "server/app/dashboard/partner/resources/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_a86828f7._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_44a6c171._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/_5c3ba3a3._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_234712c5.js", "server/app/dashboard/partner/resources/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/resources/page", "page": "/dashboard/partner/resources/page", "matchers": [{ "regexp": "^/dashboard/partner/resources(?:/)?$", "originalSource": "/dashboard/partner/resources" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/roi/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/[root-of-the-server]__6b68b513._.js", "server/edge/chunks/ssr/node_modules_@supabase_5690f92b._.js", "server/edge/chunks/ssr/src_components_partners_RoiCalculator_tsx_f55b9fd4._.js", "server/app/dashboard/partner/roi/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_8cfcf895._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_d21b6f16._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/_d1bd72d6._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_131cd180.js", "server/app/dashboard/partner/roi/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/roi/page", "page": "/dashboard/partner/roi/page", "matchers": [{ "regexp": "^/dashboard/partner/roi(?:/)?$", "originalSource": "/dashboard/partner/roi" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/partner/story/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/partner/story/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_3bf45b4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_0bd004c1._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_1a7dd568._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_ac7fd2b1.js", "server/app/dashboard/partner/story/page/react-loadable-manifest.js"], "name": "app/dashboard/partner/story/page", "page": "/dashboard/partner/story/page", "matchers": [{ "regexp": "^/dashboard/partner/story(?:/)?$", "originalSource": "/dashboard/partner/story" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/api-keys/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/_bea3f696._.js", "server/app/dashboard/super-admin/api-keys/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d409691e._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_ad89c756._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/src_app_dashboard_super-admin_actions_ts_559d22a2._.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_ad4af6b3._.js", "server/edge/chunks/ssr/_19137c08._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/_f7b8bd91._.js", "server/edge/chunks/ssr/[root-of-the-server]__81bf90d1._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_9d219c46.js", "server/app/dashboard/super-admin/api-keys/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/api-keys/page", "page": "/dashboard/super-admin/api-keys/page", "matchers": [{ "regexp": "^/dashboard/super-admin/api-keys(?:/)?$", "originalSource": "/dashboard/super-admin/api-keys" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/audit-logs/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/src_6a1d14cd._.js", "server/app/dashboard/super-admin/audit-logs/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_8c64a789._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/_5f1bb76c._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_f757eab3._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_996aeeb2.js", "server/app/dashboard/super-admin/audit-logs/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/audit-logs/page", "page": "/dashboard/super-admin/audit-logs/page", "matchers": [{ "regexp": "^/dashboard/super-admin/audit-logs(?:/)?$", "originalSource": "/dashboard/super-admin/audit-logs" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/case-studies/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/_4dddd998._.js", "server/app/dashboard/super-admin/case-studies/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d409691e._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_ad89c756._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/src_app_dashboard_super-admin_actions_ts_559d22a2._.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_ad4af6b3._.js", "server/edge/chunks/ssr/_5b802387._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_04b44821._.js", "server/edge/chunks/ssr/[root-of-the-server]__e5b97bdd._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_b69442e5.js", "server/app/dashboard/super-admin/case-studies/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/case-studies/page", "page": "/dashboard/super-admin/case-studies/page", "matchers": [{ "regexp": "^/dashboard/super-admin/case-studies(?:/)?$", "originalSource": "/dashboard/super-admin/case-studies" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/debug/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/super-admin/debug/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_ca31d98d._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_64dbe5e6._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_e1dade23._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_28fa3ba6.js", "server/app/dashboard/super-admin/debug/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/debug/page", "page": "/dashboard/super-admin/debug/page", "matchers": [{ "regexp": "^/dashboard/super-admin/debug(?:/)?$", "originalSource": "/dashboard/super-admin/debug" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/debug/seed/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/src_app_dashboard_super-admin_debug_seed_page_tsx_6d5f7484._.js", "server/app/dashboard/super-admin/debug/seed/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d409691e._.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_6f548416._.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/[root-of-the-server]__7cae7e1d._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/node_modules_next_dist_247821ea._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/_2f9618d0._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/_5ec4ace9._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_ae58fd05.js", "server/app/dashboard/super-admin/debug/seed/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/debug/seed/page", "page": "/dashboard/super-admin/debug/seed/page", "matchers": [{ "regexp": "^/dashboard/super-admin/debug/seed(?:/)?$", "originalSource": "/dashboard/super-admin/debug/seed" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/flags/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/super-admin/flags/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_5fd81236._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_3ef8864c._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_3f200263._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_e68fa989.js", "server/app/dashboard/super-admin/flags/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/flags/page", "page": "/dashboard/super-admin/flags/page", "matchers": [{ "regexp": "^/dashboard/super-admin/flags(?:/)?$", "originalSource": "/dashboard/super-admin/flags" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/logs/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/super-admin/logs/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_612103fb._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_44059908._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_9d08dd80._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_f4f4531d.js", "server/app/dashboard/super-admin/logs/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/logs/page", "page": "/dashboard/super-admin/logs/page", "matchers": [{ "regexp": "^/dashboard/super-admin/logs(?:/)?$", "originalSource": "/dashboard/super-admin/logs" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/app/dashboard/super-admin/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_725a518d._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_d23268e6._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_f9babe8d._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_7efb4257.js", "server/app/dashboard/super-admin/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/page", "page": "/dashboard/super-admin/page", "matchers": [{ "regexp": "^/dashboard/super-admin(?:/)?$", "originalSource": "/dashboard/super-admin" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/resources/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/_0a20ba7e._.js", "server/edge/chunks/ssr/src_app_dashboard_super-admin_resources_ResourcesClient_tsx_450f2490._.js", "server/app/dashboard/super-admin/resources/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d409691e._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_ad89c756._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/src_app_dashboard_super-admin_actions_ts_559d22a2._.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_ad4af6b3._.js", "server/edge/chunks/ssr/_7433e655._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/_527cdfdb._.js", "server/edge/chunks/ssr/[root-of-the-server]__60628233._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_369a99a2.js", "server/app/dashboard/super-admin/resources/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/resources/page", "page": "/dashboard/super-admin/resources/page", "matchers": [{ "regexp": "^/dashboard/super-admin/resources(?:/)?$", "originalSource": "/dashboard/super-admin/resources" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/submissions/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/_4832f03b._.js", "server/edge/chunks/ssr/src_app_dashboard_super-admin_submissions_SubmissionsClient_tsx_3a17c05a._.js", "server/app/dashboard/super-admin/submissions/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_2f71a5bc._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_c0f9c1e4._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/_343b29d9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/_7c69c93e._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/[root-of-the-server]__4bfe13ca._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_66f44336.js", "server/app/dashboard/super-admin/submissions/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/submissions/page", "page": "/dashboard/super-admin/submissions/page", "matchers": [{ "regexp": "^/dashboard/super-admin/submissions(?:/)?$", "originalSource": "/dashboard/super-admin/submissions" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/users/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/_21f02922._.js", "server/edge/chunks/ssr/src_app_dashboard_super-admin_users_UsersClient_tsx_fd7f1b1d._.js", "server/app/dashboard/super-admin/users/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d409691e._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_ad89c756._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_next_5ff514cd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_ad4af6b3._.js", "server/edge/chunks/ssr/src_app_dashboard_super-admin_actions_ts_559d22a2._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/[root-of-the-server]__7f75f608._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/_8f02e9d0._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/_46846246._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_e0bd414d.js", "server/app/dashboard/super-admin/users/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/users/page", "page": "/dashboard/super-admin/users/page", "matchers": [{ "regexp": "^/dashboard/super-admin/users(?:/)?$", "originalSource": "/dashboard/super-admin/users" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/dashboard/super-admin/verify/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_08e6aa22._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/edge/chunks/ssr/_09d4362f._.js", "server/edge/chunks/ssr/node_modules_adcc588b._.js", "server/edge/chunks/ssr/_798f1b8a._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/[root-of-the-server]__0853153c._.js", "server/edge/chunks/ssr/node_modules_@supabase_5690f92b._.js", "server/app/dashboard/super-admin/verify/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_e438380a._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/_c2b8d065._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_b31580bb._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_b797a213._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_9a9e21ed.js", "server/app/dashboard/super-admin/verify/page/react-loadable-manifest.js"], "name": "app/dashboard/super-admin/verify/page", "page": "/dashboard/super-admin/verify/page", "matchers": [{ "regexp": "^/dashboard/super-admin/verify(?:/)?$", "originalSource": "/dashboard/super-admin/verify" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/legal/california-privacy-rights/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_client_app-dir_link_6283ddb5.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/app/legal/california-privacy-rights/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_30360851._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_c61b9d63._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_d3b78041._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_2b44ecbe.js", "server/app/legal/california-privacy-rights/page/react-loadable-manifest.js"], "name": "app/legal/california-privacy-rights/page", "page": "/legal/california-privacy-rights/page", "matchers": [{ "regexp": "^/legal/california-privacy-rights(?:/)?$", "originalSource": "/legal/california-privacy-rights" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/legal/cookies/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_client_app-dir_link_6283ddb5.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/app/legal/cookies/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_19b78d16._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_3d324dd7._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_ac0e3946._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_5b84bfd3.js", "server/app/legal/cookies/page/react-loadable-manifest.js"], "name": "app/legal/cookies/page", "page": "/legal/cookies/page", "matchers": [{ "regexp": "^/legal/cookies(?:/)?$", "originalSource": "/legal/cookies" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/legal/privacy/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_client_app-dir_link_6283ddb5.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/app/legal/privacy/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_af17f3c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_6b9e4cbc._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/_e641b157._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_8a4f23fc.js", "server/app/legal/privacy/page/react-loadable-manifest.js"], "name": "app/legal/privacy/page", "page": "/legal/privacy/page", "matchers": [{ "regexp": "^/legal/privacy(?:/)?$", "originalSource": "/legal/privacy" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/legal/terms/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_client_app-dir_link_6283ddb5.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/app/legal/terms/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_72787a2d._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_e1f3a345._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/_76172cc7._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_385c4df0.js", "server/app/legal/terms/page/react-loadable-manifest.js"], "name": "app/legal/terms/page", "page": "/legal/terms/page", "matchers": [{ "regexp": "^/legal/terms(?:/)?$", "originalSource": "/legal/terms" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/[root-of-the-server]__160f62ec._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/node_modules_6e78eb08._.js", "server/edge/chunks/ssr/node_modules_@supabase_5690f92b._.js", "server/edge/chunks/ssr/_db39a4e3._.js", "server/edge/chunks/ssr/node_modules_next_dist_4c50aecf._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/app/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_f4112f68._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/_9e469810._.js", "server/edge/chunks/ssr/_149e680b._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_5f5ace01.js", "server/app/page/react-loadable-manifest.js"], "name": "app/page", "page": "/page", "matchers": [{ "regexp": "^/(?:/)?$", "originalSource": "/" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/secret-menu/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_client_app-dir_link_6283ddb5.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/app/secret-menu/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_9b2fb138._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/_f1911741._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_516b7e99._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_78f9d683.js", "server/app/secret-menu/page/react-loadable-manifest.js"], "name": "app/secret-menu/page", "page": "/secret-menu/page", "matchers": [{ "regexp": "^/secret-menu(?:/)?$", "originalSource": "/secret-menu" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/sign-in/[[...sign-in]]/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/app/sign-in/[[...sign-in]]/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_ca791748._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/_c615c790._.js", "server/edge/chunks/ssr/_68eed6cb._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_a7a32858.js", "server/app/sign-in/[[...sign-in]]/page/react-loadable-manifest.js"], "name": "app/sign-in/[[...sign-in]]/page", "page": "/sign-in/[[...sign-in]]/page", "matchers": [{ "regexp": "^/sign-in(?:/(?P<nxtPsignin>.+?))?(?:/)?$", "originalSource": "/sign-in/[[...sign-in]]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/sign-up/[[...sign-up]]/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/edge/chunks/ssr/_acc20cec._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_72fd41e8._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_278c1cc1._.js", "server/app/sign-up/[[...sign-up]]/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_70e53952._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_92df3bd5._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/_c6e88872._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_a68fc65f.js", "server/app/sign-up/[[...sign-up]]/page/react-loadable-manifest.js"], "name": "app/sign-up/[[...sign-up]]/page", "page": "/sign-up/[[...sign-up]]/page", "matchers": [{ "regexp": "^/sign-up(?:/(?P<nxtPsignup>.+?))?(?:/)?$", "originalSource": "/sign-up/[[...sign-up]]" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } }, "/support/page": { "files": ["server/middleware-build-manifest.js", "server/interception-route-rewrite-manifest.js", "server/next-font-manifest.js", "server/server-reference-manifest.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_a4d5db4d._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_3c1c4295._.js", "server/edge/chunks/ssr/node_modules_0cf98088._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_f49f2b82._.js", "server/edge/chunks/ssr/node_modules_next_dist_997ee6d6._.js", "server/edge/chunks/ssr/node_modules_a73e6426._.js", "server/edge/chunks/ssr/node_modules_next_dist_4be51fa8._.js", "server/edge/chunks/ssr/node_modules_399ac363._.js", "server/edge/chunks/ssr/node_modules_97b59908._.js", "server/edge/chunks/ssr/node_modules_@clerk_nextjs_dist_esm_app-router_client_ClerkProvider_da64c616.js", "server/edge/chunks/ssr/_60572064._.js", "server/edge/chunks/ssr/node_modules_4fa6b816._.js", "server/edge/chunks/ssr/node_modules_next_dist_540d195c._.js", "server/edge/chunks/ssr/src_lib_utils_ts_95b5681f._.js", "server/edge/chunks/ssr/node_modules_a57b1458._.js", "server/edge/chunks/ssr/node_modules_2b09e17e._.js", "server/edge/chunks/ssr/node_modules_@clerk_clerk-react_dist_d63cd7bd._.js", "server/edge/chunks/ssr/_dcac2f53._.js", "server/app/support/page_client-reference-manifest.js", "server/edge/chunks/ssr/node_modules_5b08d458._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_api_headers_d968f5b0.js", "server/edge/chunks/ssr/[root-of-the-server]__532a281e._.js", "server/edge/chunks/ssr/node_modules_f790bdf2._.js", "server/edge/chunks/ssr/_6283b74f._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_2adaed9e._.js", "server/edge/chunks/ssr/node_modules_next_dist_compiled_react-server-dom-turbopack_77212c74._.js", "server/edge/chunks/ssr/node_modules_@clerk_270169d4._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_94ba665d._.js", "server/edge/chunks/ssr/node_modules_next_dist_867170f9._.js", "server/edge/chunks/ssr/node_modules_0648e134._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_cab71723._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_0aec4702._.js", "server/edge/chunks/ssr/[root-of-the-server]__aa10bf6d._.js", "server/edge/chunks/ssr/node_modules_3dc63762._.js", "server/edge/chunks/ssr/node_modules_33a00906._.js", "server/edge/chunks/ssr/node_modules_next_dist_6c57a5db._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_server_lib_patch-fetch_9fb711cd.js", "server/edge/chunks/ssr/_a9a047aa._.js", "server/edge/chunks/ssr/node_modules_next_dist_0d337a72._.js", "server/edge/chunks/ssr/node_modules_next_dist_883a7dff._.js", "server/edge/chunks/ssr/node_modules_next_dist_93d1ff39._.js", "server/edge/chunks/ssr/_7307b364._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_d627f0c8._.js", "server/edge/chunks/ssr/src_lib_utils_ts_8b824480._.js", "server/edge/chunks/ssr/[root-of-the-server]__66fc86dd._.js", "server/edge/chunks/ssr/node_modules_next_dist_esm_346f3ec6._.js", "server/edge/chunks/ssr/_ac76dc5f._.js", "server/edge/chunks/ssr/turbopack-edge-wrapper_a51c1f20.js", "server/app/support/page/react-loadable-manifest.js"], "name": "app/support/page", "page": "/support/page", "matchers": [{ "regexp": "^/support(?:/)?$", "originalSource": "/support" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xcm9UhX5K5RNd5vNUKrfx", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Ab6pLWDhabht/gHEIlnBtpWAVYuOIylqMRhVw6iZsco=", "__NEXT_PREVIEW_MODE_ID": "50ccfd2d7df31ab129b9e5bce0cc265f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "00113d5d53a6adcb69463cb77bdbb84892a495175cd6c6f486e59ef27ac7dfce", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "c19ab21ed6cb1b5258b21dad7cc7a89a4ec25fc2a835e9714a462af1be0d9201" } } } };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/dashboard/page": "/dashboard", "/dashboard/partner-admin/page": "/dashboard/partner-admin", "/dashboard/partner-admin/settings/page": "/dashboard/partner-admin/settings", "/dashboard/partner-admin/team/page": "/dashboard/partner-admin/team", "/dashboard/partner/actions/page": "/dashboard/partner/actions", "/dashboard/partner/case-studies/page": "/dashboard/partner/case-studies", "/dashboard/partner/intros/page": "/dashboard/partner/intros", "/dashboard/partner/packages/page": "/dashboard/partner/packages", "/dashboard/partner/page": "/dashboard/partner", "/dashboard/partner/profile/page": "/dashboard/partner/profile", "/dashboard/partner/reports/page": "/dashboard/partner/reports", "/dashboard/partner/reports/sample/page": "/dashboard/partner/reports/sample", "/dashboard/partner/resources/page": "/dashboard/partner/resources", "/dashboard/partner/roi/page": "/dashboard/partner/roi", "/dashboard/partner/story/page": "/dashboard/partner/story", "/dashboard/super-admin/api-keys/page": "/dashboard/super-admin/api-keys", "/dashboard/super-admin/audit-logs/page": "/dashboard/super-admin/audit-logs", "/dashboard/super-admin/case-studies/page": "/dashboard/super-admin/case-studies", "/dashboard/super-admin/debug/page": "/dashboard/super-admin/debug", "/dashboard/super-admin/debug/seed/page": "/dashboard/super-admin/debug/seed", "/dashboard/super-admin/flags/page": "/dashboard/super-admin/flags", "/dashboard/super-admin/logs/page": "/dashboard/super-admin/logs", "/dashboard/super-admin/page": "/dashboard/super-admin", "/dashboard/super-admin/resources/page": "/dashboard/super-admin/resources", "/dashboard/super-admin/submissions/page": "/dashboard/super-admin/submissions", "/dashboard/super-admin/users/page": "/dashboard/super-admin/users", "/dashboard/super-admin/verify/page": "/dashboard/super-admin/verify", "/favicon.ico/route": "/favicon.ico", "/legal/california-privacy-rights/page": "/legal/california-privacy-rights", "/legal/cookies/page": "/legal/cookies", "/legal/privacy/page": "/legal/privacy", "/legal/terms/page": "/legal/terms", "/page": "/", "/secret-menu/page": "/secret-menu", "/sign-in/[[...sign-in]]/page": "/sign-in/[[...sign-in]]", "/sign-up/[[...sign-up]]/page": "/sign-up/[[...sign-up]]", "/support/page": "/support" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/dashboard": {}, "/": {}, "/secret-menu": {}, "/sign-in/[[...sign-in]]": {}, "/sign-up/[[...sign-up]]": {}, "/support": {}, "/dashboard/partner-admin": {}, "/dashboard/partner-admin/settings": {}, "/dashboard/partner-admin/team": {}, "/dashboard/partner/actions": {}, "/dashboard/partner/intros": {}, "/dashboard/partner/packages": {}, "/dashboard/partner/profile": {}, "/dashboard/partner/reports": {}, "/dashboard/partner": {}, "/dashboard/partner/reports/sample": {}, "/dashboard/partner/story": {}, "/dashboard/super-admin/debug/seed": {}, "/dashboard/super-admin/flags": {}, "/dashboard/super-admin": {}, "/dashboard/super-admin/resources": {}, "/dashboard/super-admin/verify": {}, "/dashboard/super-admin/logs": {}, "/dashboard/partner/case-studies": {}, "/dashboard/super-admin/audit-logs": {}, "/dashboard/super-admin/api-keys": {}, "/dashboard/super-admin/case-studies": {}, "/dashboard/super-admin/submissions": {}, "/dashboard/partner/resources": {}, "/dashboard/partner/roi": {}, "/legal/privacy": {}, "/legal/cookies": {}, "/dashboard/super-admin/debug": {}, "/dashboard/super-admin/users": {}, "/legal/california-privacy-rights": {}, "/legal/terms": {} } };
var PagesManifest = { "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream2 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream2({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {});
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
