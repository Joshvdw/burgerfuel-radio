// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"drwwF":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "138b6a135baa4167";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"igcvL":[function(require,module,exports,__globalThis) {
document.addEventListener("DOMContentLoaded", function() {
    // Reference vinyl img
    const vinyl = document.getElementById("vinyl");
    let isInitialized = false; // Track if audio is initialized
    // Reference media
    var media = [
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/new_year_dubstep_minimix.mp3"
    ], fftSize = 1024, // [32, 64, 128, 256, 512, 1024, 2048]
    background_color = "rgba(0, 0, 1, 1)", background_gradient_color_1 = "#000011", background_gradient_color_2 = "#060D1F", background_gradient_color_3 = "#02243F", stars_color = "#465677", stars_color_2 = "#B5BFD4", stars_color_special = "#F451BA", TOTAL_STARS = 1500, STARS_BREAK_POINT = 140, stars = [], waveform_color = "rgba(29, 36, 57, 0.05)", waveform_color_2 = "rgba(0,0,0,0)", waveform_line_color = "rgba(157, 242, 157, 0.11)", waveform_line_color_2 = "rgba(157, 242, 157, 0.8)", waveform_tick = 0.05, TOTAL_POINTS = fftSize / 2, points = [], avg_circle, bubble_avg_color = "rgba(29, 36, 57, 0.1)", bubble_avg_color_2 = "rgba(29, 36, 57, 0.05)", bubble_avg_line_color = "rgba(77, 218, 248, 1)", bubble_avg_line_color_2 = "rgba(77, 218, 248, 1)", bubble_avg_tick = 0.001, TOTAL_AVG_POINTS = 64, AVG_BREAK_POINT = 100, avg_points = [], SHOW_STAR_FIELD = true, SHOW_WAVEFORM = true, SHOW_AVERAGE = true, AudioContext = window.AudioContext || window.webkitAudioContext, floor = Math.floor, round = Math.round, random = Math.random, sin = Math.sin, cos = Math.cos, PI = Math.PI, PI_TWO = PI * 2, PI_HALF = PI / 180, w = 0, h = 0, cx = 0, cy = 0, playing = false, startedAt, pausedAt, rotation = 0, // msgElement = document.querySelector("#loading .msg"),
    avg, ctx, actx, asource, gainNode, analyser, frequencyData, frequencyDataLength, timeData;
    // var startElement = document.querySelector("#loadcontrol");
    const textureOverlay = document.querySelector(".texture_overlay");
    const loadingElement = document.querySelector("#loading");
    const msgElement = loadingElement.querySelector(".msg");
    // var toggleElement = document.querySelector("#togglecontrol");\\
    // Set vinyl size on initial page load
    function setVinylSize() {
        const initialWidth = window.innerWidth;
        const initialHeight = window.innerHeight;
        const initialRadius = Math.max(initialWidth, initialHeight) / 10;
        vinyl.style.width = initialRadius * 2.5 + "px";
        vinyl.style.height = initialRadius * 2.5 + "px";
    }
    // Call setVinylSize on page load
    setVinylSize();
    window.addEventListener("load", initialize, false);
    window.addEventListener("resize", resizeHandler, false);
    function initialize() {
        if (!AudioContext) return featureNotSupported();
        ctx = document.createElement("canvas").getContext("2d");
        actx = new AudioContext();
        document.body.appendChild(ctx.canvas);
        // startElement.addEventListener("click", initializeAudio);
        // Add click event listener to vinyl
        vinyl.addEventListener("click", function(e) {
            e.preventDefault();
            if (!isInitialized) {
                initializeAudio();
                isInitialized = true;
            } else {
                toggleAudio();
                toggleVinylRotate();
            }
        });
        resizeHandler();
    }
    function featureNotSupported() {
        // hideStarter();
        return document.getElementById("no-audio").style.display = "block";
    }
    // function hideStarter() {
    //   startElement.style.display = "none";
    // }
    function hideLoader() {
        return loadingElement.className = "hide";
    }
    function showTextureOverlay() {
        return textureOverlay.className = "show";
    }
    // function showToggleControls() {
    //   toggleElement.className = "show";
    //   toggleElement.focus();
    //   toggleElement.addEventListener("click", function (e) {
    //     e.preventDefault();
    //     // this.textContent = playing ? "play" : "pause";
    //     toggleAudio();
    //   });
    // }
    function updateLoadingMessage(text) {
        msgElement.textContent = text;
    }
    function initializeAudio() {
        asource = actx.createBufferSource();
        var xmlHTTP = new XMLHttpRequest();
        // hideStarter();
        // loadingElement.classList.add("show");
        updateLoadingMessage("Loading...");
        xmlHTTP.open("GET", media[0], true);
        xmlHTTP.responseType = "arraybuffer";
        xmlHTTP.onload = function(e) {
            updateLoadingMessage("Connecting to Radio");
            // console.time("decoding audio data");
            actx.decodeAudioData(xmlHTTP.response, function(buffer) {
                // console.timeEnd("decoding audio data");
                // updateLoadingMessage("- Ready -");
                audio_buffer = buffer;
                analyser = actx.createAnalyser();
                gainNode = actx.createGain();
                gainNode.gain.value = 1;
                analyser.fftSize = fftSize;
                analyser.minDecibels = -100;
                analyser.maxDecibels = -30;
                analyser.smoothingTimeConstant = 0.8;
                gainNode.connect(analyser);
                analyser.connect(actx.destination);
                frequencyDataLength = analyser.frequencyBinCount;
                frequencyData = new Uint8Array(frequencyDataLength);
                timeData = new Uint8Array(frequencyDataLength);
                createStarField();
                createPoints();
                hideLoader();
                showTextureOverlay();
                // showToggleControls();
                playAudio();
                // start spinning vinyl
                vinyl.style.animation = "rotateZ 10s linear infinite";
                vinyl.style.animationPlayState = "running";
            }, function(e) {
                alert("Error decoding audio data" + e);
            });
        };
        xmlHTTP.send();
    }
    // toggle play
    // vinyl.addEventListener("click", function (e) {
    //   e.preventDefault();
    //   // this.textContent = playing ? "play" : "pause"; // play, pause btn switch here
    //   toggleVinylRotate();
    //   toggleAudio();
    // });
    function toggleAudio() {
        playing ? pauseAudio() : playAudio();
    }
    function toggleVinylRotate() {
        if (!playing) {
            // Pause the animation and capture the current rotation
            const computedStyle = window.getComputedStyle(vinyl);
            const currentRotation = computedStyle.getPropertyValue("--rotation") || "0deg";
            vinyl.style.setProperty("--rotation", currentRotation);
            vinyl.style.animationPlayState = "paused";
        } else // Resume the animation from the current rotation
        vinyl.style.animationPlayState = "running";
    }
    function playAudio() {
        playing = true;
        startedAt = pausedAt ? Date.now() - pausedAt : Date.now();
        asource = null;
        asource = actx.createBufferSource();
        asource.buffer = audio_buffer;
        asource.loop = true;
        asource.connect(gainNode);
        pausedAt ? asource.start(0, pausedAt / 1000) : asource.start();
        animate();
    }
    function pauseAudio() {
        playing = false;
        pausedAt = Date.now() - startedAt;
        asource.stop();
    }
    function getAvg(values) {
        var value = 0;
        values.forEach(function(v) {
            value += v;
        });
        return value / values.length;
    }
    function animate() {
        if (!playing) return;
        window.requestAnimationFrame(animate);
        analyser.getByteFrequencyData(frequencyData);
        analyser.getByteTimeDomainData(timeData);
        avg = getAvg([].slice.call(frequencyData)) * gainNode.gain.value;
        AVG_BREAK_POINT_HIT = avg > AVG_BREAK_POINT;
        clearCanvas();
        if (SHOW_STAR_FIELD) drawStarField();
        if (SHOW_AVERAGE) drawAverageCircle();
        if (SHOW_WAVEFORM) drawWaveform();
    }
    function clearCanvas() {
        var gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, background_gradient_color_1);
        gradient.addColorStop(0.96, background_gradient_color_2);
        gradient.addColorStop(1, background_gradient_color_3);
        ctx.beginPath();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
        ctx.fill();
        ctx.closePath();
        gradient = null;
    }
    function drawStarField() {
        var i, len, p, tick;
        for(i = 0, len = stars.length; i < len; i++){
            p = stars[i];
            tick = AVG_BREAK_POINT_HIT ? avg / 20 : avg / 50;
            p.x += p.dx * tick;
            p.y += p.dy * tick;
            p.z += p.dz;
            p.dx += p.ddx;
            p.dy += p.ddy;
            p.radius = 0.2 + (p.max_depth - p.z) * 0.1;
            if (p.x < -cx || p.x > cx || p.y < -cy || p.y > cy) {
                stars[i] = new Star();
                continue;
            }
            ctx.beginPath();
            ctx.globalCompositeOperation = "lighter";
            ctx.fillStyle = p.color;
            ctx.arc(p.x + cx, p.y + cy, p.radius, PI_TWO, false);
            ctx.fill();
            ctx.closePath();
        }
        i = len = p = tick = null;
    }
    function drawAverageCircle() {
        if (AVG_BREAK_POINT_HIT) {
            ctx.strokeStyle = bubble_avg_line_color_2;
            ctx.fillStyle = bubble_avg_color_2;
        } else {
            ctx.strokeStyle = bubble_avg_line_color;
            ctx.fillStyle = bubble_avg_color;
        }
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(cx, cy, avg + avg_circle.radius, 0, PI_TWO, false);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    function drawWaveform() {
        var i, len, p, value, xc, yc, drawHorizontal, percent, height, offset, barWidth;
        if (AVG_BREAK_POINT_HIT) {
            rotation += waveform_tick;
            ctx.strokeStyle = waveform_line_color_2;
            ctx.fillStyle = waveform_color_2;
            drawHorizontal = true;
        } else {
            rotation += -waveform_tick;
            ctx.strokeStyle = waveform_line_color;
            ctx.fillStyle = waveform_color;
        }
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.translate(-cx, -cy);
        ctx.moveTo(points[0].dx, points[0].dy);
        for(i = 0, len = TOTAL_POINTS; i < len - 1; i++){
            p = points[i];
            value = timeData[i];
            p.dx = p.x + value * sin(PI_HALF * p.angle);
            p.dy = p.y + value * cos(PI_HALF * p.angle);
            xc = (p.dx + points[i + 1].dx) / 2;
            yc = (p.dy + points[i + 1].dy) / 2;
            ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
        }
        value = timeData[i];
        p = points[i];
        p.dx = p.x + value * sin(PI_HALF * p.angle);
        p.dy = p.y + value * cos(PI_HALF * p.angle);
        xc = (p.dx + points[0].dx) / 2;
        yc = (p.dy + points[0].dy) / 2;
        ctx.quadraticCurveTo(p.dx, p.dy, xc, yc);
        ctx.quadraticCurveTo(xc, yc, points[0].dx, points[0].dy);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        if (drawHorizontal) {
            ctx.beginPath();
            for(i = 0, len = TOTAL_POINTS; i < len; i++){
                value = timeData[i];
                percent = value / 256;
                height = h * percent;
                offset = h - height - 1;
                barWidth = w / TOTAL_POINTS;
                ctx.fillStyle = waveform_line_color_2;
                ctx.fillRect(i * barWidth, offset, 1, 1);
            }
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        i = len = p = value = xc = yc = drawHorizontal = percent = height = offset = barWidth = null;
    }
    function Star() {
        var xc, yc;
        this.x = Math.random() * w - cx;
        this.y = Math.random() * h - cy;
        this.z = this.max_depth = Math.max(w / h);
        this.radius = 0.2;
        xc = this.x > 0 ? 1 : -1;
        yc = this.y > 0 ? 1 : -1;
        if (Math.abs(this.x) > Math.abs(this.y)) {
            this.dx = 1.0;
            this.dy = Math.abs(this.y / this.x);
        } else {
            this.dx = Math.abs(this.x / this.y);
            this.dy = 1.0;
        }
        this.dx *= xc;
        this.dy *= yc;
        this.dz = -0.1;
        this.ddx = 0.001 * this.dx;
        this.ddy = 0.001 * this.dy;
        if (this.y > cy / 2) this.color = stars_color_2;
        else {
            if (avg > AVG_BREAK_POINT + 10) this.color = stars_color_2;
            else if (avg > STARS_BREAK_POINT) this.color = stars_color_special;
            else this.color = stars_color;
        }
        xc = yc = null;
    }
    function createStarField() {
        var i = -1;
        while(++i < TOTAL_STARS)stars.push(new Star());
        i = null;
    }
    function Point(config) {
        this.index = config.index;
        this.angle = this.index * 360 / TOTAL_POINTS;
        this.updateDynamics = function() {
            this.radius = Math.abs(w, h) / 10;
            this.x = cx + this.radius * sin(PI_HALF * this.angle);
            this.y = cy + this.radius * cos(PI_HALF * this.angle);
        };
        this.updateDynamics();
        this.value = Math.random() * 256;
        this.dx = this.x + this.value * sin(PI_HALF * this.angle);
        this.dy = this.y + this.value * cos(PI_HALF * this.angle);
    }
    function AvgCircle() {
        this.update = function() {
            this.radius = Math.abs(w, h) / 10;
        };
        this.update();
    }
    function createPoints() {
        var i;
        i = -1;
        while(++i < TOTAL_POINTS)points.push(new Point({
            index: i + 1
        }));
        avg_circle = new AvgCircle();
        // Set vinyl img size
        if (vinyl && avg_circle) {
            var initialRadius = avg_circle.radius;
            vinyl.style.width = initialRadius * 2.5 + "px";
            vinyl.style.height = initialRadius * 2.5 + "px";
        }
        i = null;
    }
    function resizeHandler() {
        w = window.innerWidth;
        h = window.innerHeight;
        cx = w / 2;
        cy = h / 2;
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        points.forEach(function(p) {
            p.updateDynamics();
        });
        if (avg_circle) avg_circle.update();
    }
});

},{}]},["drwwF","igcvL"], "igcvL", "parcelRequire94c2")

//# sourceMappingURL=app.js.map
