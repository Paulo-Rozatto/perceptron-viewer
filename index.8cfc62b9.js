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
        this
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
})({"3yPwA":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "b3c595598cfc62b9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
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
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
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
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
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
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
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
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
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
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
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
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
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
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
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
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"6rimH":[function(require,module,exports) {
var _dots = require("./data/dots");
var _utils = require("./src/utils");
var _perceptron = require("./src/perceptron");
var _uiController = require("./src/ui-controller");
// Setting canvas & context
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
// colors
const OGRE = "#FA5241";
const AZURE = "#4194FA";
const OPACITY = "99";
// Setting some aux constants
const RADIUS = 7;
const AXIS_OFFSET = 15;
const TWO_PI = 2 * Math.PI;
// Utils variables
const hoveredCoords = [
    -1,
    -1
];
let hoveredPoint = null;
let selectedPoint = null;
let lastHoveredIndex = -1;
// Main parameters
let weights = [
    Math.random(),
    Math.random() - 1
];
let bias = 0;
let epochs = 50;
async function perceptron(W, b, eps) {
    const points = (0, _utils.shuffle)((0, _dots.DATA));
    const inputs = points.map((e)=>[
            e[0],
            e[1]
        ]);
    const labels = points.map((e)=>e[2]);
    weights[0] = W[0];
    weights[1] = W[1];
    bias = b;
    epochs = eps;
    let result;
    for(let i = 0; i < epochs; i++){
        result = (0, _perceptron.trainStep)(inputs, labels, weights, bias, 0.1);
        bias = result.bias;
        requestAnimationFrame(draw);
        (0, _uiController.setParams)(weights, bias, epochs);
        if (!result.updatedWeights) {
            const message = document.getElementById("message");
            message.classList.remove("hide");
            setTimeout(()=>{
                message.classList.add("hide");
            }, 1500);
            break;
        }
        await (0, _utils.sleep)(200);
    }
}
function draw() {
    ctx.clearRect(-15, -15, canvas.width, canvas.height);
    paintClassifier(weights, bias);
    paintPoints((0, _dots.DATA));
    if (hoveredPoint) highlightPoint(hoveredPoint);
    // paint axis
    ctx.beginPath();
    ctx.moveTo(0, -AXIS_OFFSET);
    ctx.lineTo(0, canvas.height - AXIS_OFFSET);
    ctx.lineTo(10, canvas.height - AXIS_OFFSET - 20);
    ctx.lineTo(0, canvas.height - AXIS_OFFSET);
    ctx.lineTo(-10, canvas.height - AXIS_OFFSET - 20);
    ctx.moveTo(-AXIS_OFFSET, 0);
    ctx.lineTo(canvas.width - AXIS_OFFSET, 0);
    ctx.lineTo(canvas.width - AXIS_OFFSET - 20, 10);
    ctx.lineTo(canvas.width - AXIS_OFFSET, 0);
    ctx.lineTo(canvas.width - AXIS_OFFSET - 20, -10);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.stroke();
}
function eventToCanvasCords(event) {
    hoveredCoords[0] = (event.offsetX - AXIS_OFFSET) / canvas.clientWidth;
    hoveredCoords[1] = 1 - (event.offsetY + AXIS_OFFSET) / canvas.clientHeight;
}
function paintArea(yIntercept, endX, endY, sign) {
    let color;
    color = sign > 0 ? AZURE : OGRE;
    ctx.fillStyle = color + OPACITY;
    ctx.beginPath();
    ctx.moveTo(0, yIntercept);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(endX, canvas.height);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.fill();
    color = sign > 0 ? OGRE : AZURE;
    let min = Math.min(0, endY, yIntercept);
    ctx.fillStyle = color + OPACITY;
    ctx.beginPath();
    ctx.moveTo(0, yIntercept);
    ctx.lineTo(0, min);
    ctx.lineTo(endX, min);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.fill();
}
function paintClassifier(weights, bias) {
    const [w1, w2] = weights;
    const yIntercept = bias / -w2 * canvas.height;
    const endX = canvas.width;
    const endY = (w1 + bias) / -w2 * canvas.height;
    paintArea(yIntercept, endX, endY, Math.sign(w2));
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.moveTo(0, yIntercept);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}
function paintPoints(points) {
    for (let point of points){
        ctx.fillStyle = point[2] === 1 ? "blue" : "red";
        ctx.beginPath();
        ctx.arc(point[0] * canvas.width, point[1] * canvas.height, RADIUS, 0, TWO_PI);
        ctx.fill();
    }
}
function highlightPoint(point) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(point[0] * canvas.width, point[1] * canvas.height, RADIUS, 0, TWO_PI);
    ctx.stroke();
}
function hoverPoint() {
    // x < 0 OR y < 0
    if (hoveredCoords[0] < 0 || hoveredCoords[1] < 0) return;
    const tolerance = 0.02;
    let index = (0, _utils.pointIndex)((0, _dots.DATA), hoveredCoords, tolerance);
    if (index !== lastHoveredIndex) {
        hoveredPoint = (0, _dots.DATA)[index];
        requestAnimationFrame(draw);
        canvas.style.cursor = hoveredCoords ? "pointer" : "";
        lastHoveredIndex = index;
    }
}
function panSelectedPoint(event) {
    if (!selectedPoint) return;
    selectedPoint[0] = hoveredCoords[0];
    selectedPoint[1] = hoveredCoords[1];
    requestAnimationFrame(draw);
}
function handleMouseMove(event) {
    eventToCanvasCords(event);
    if (selectedPoint) {
        panSelectedPoint(event);
        return;
    }
    hoverPoint(event);
}
function createPointFromClick(event) {
    if (Boolean(hoveredPoint)) return;
    if (event.button === 1 || event.button > 2) return;
    if (hoveredCoords[0] < 0 || hoveredCoords[1] < 0) return;
    const label = event.button === 0 ? 1 : 0;
    (0, _dots.DATA).push([
        ...hoveredCoords,
        label
    ]);
    requestAnimationFrame(draw);
}
function handleMouseDown(event) {
    if (Boolean(hoveredPoint)) {
        selectedPoint = hoveredPoint;
        return;
    }
    createPointFromClick(event);
}
function handleMouseUp() {
    hoveredPoint = null;
    selectedPoint = null;
    requestAnimationFrame(draw);
}
function resize() {
    // that couple lines below don't guarantee that width and height will be equals to clientWidth and clientHeight
    // it looks like that when chaging width/height the clientWidth/Height changes
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    ctx.translate(AXIS_OFFSET, AXIS_OFFSET);
    requestAnimationFrame(draw);
}
function onUiUpdate(W, b, eps) {
    weights[0] = W[0];
    weights[1] = W[1];
    bias = b;
    epochs = eps;
    requestAnimationFrame(draw);
}
window.addEventListener("resize", (0, _utils.debounce)(resize, 200));
canvas.addEventListener("contextmenu", (event)=>event.preventDefault());
canvas.addEventListener("mousemove", (0, _utils.throttle)(handleMouseMove, 20));
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
(0, _uiController.setParams)(weights, bias, epochs);
(0, _uiController.setRunFunction)(perceptron);
(0, _uiController.setDrawFunction)(onUiUpdate);
resize();

},{"./data/dots":"4yp9X","./src/utils":"en4he","./src/perceptron":"4llPY","./src/ui-controller":"bmCqN"}],"4yp9X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DATA", ()=>DATA);
const DATA = [
    [
        0.17117614577581447,
        0.6120689655172413,
        1
    ],
    [
        0.13470790378006872,
        0.4347290640394089,
        1
    ],
    [
        0.281786941580756,
        0.32019704433497537,
        1
    ],
    [
        0.3357261181667587,
        0.20197044334975367,
        1
    ],
    [
        0.5284373274434014,
        0.27216748768472904,
        1
    ],
    [
        0.5814432989690722,
        0.06403940886699508,
        1
    ],
    [
        0.7237113402061855,
        0.15886699507389163,
        1
    ],
    [
        0.1697594501718213,
        0.07019704433497537,
        1
    ],
    [
        0.09484536082474226,
        0.23645320197044334,
        1
    ],
    [
        0.4350515463917526,
        0.07881773399014778,
        1
    ],
    [
        0.4108227498619547,
        0.270935960591133,
        1
    ],
    [
        0.936764705882353,
        0.0753694581280788,
        1
    ],
    [
        0.15395189003436427,
        0.9137931034482759,
        0
    ],
    [
        0.17448923246824957,
        0.75,
        0
    ],
    [
        0.3804527885146328,
        0.6724137931034483,
        0
    ],
    [
        0.7448923246824959,
        0.6576354679802956,
        0
    ],
    [
        0.3511871893981226,
        0.7610837438423645,
        0
    ],
    [
        0.8602981778023192,
        0.7955665024630542,
        0
    ],
    [
        0.8166758696852567,
        0.28448275862068967,
        0
    ],
    [
        0.49530646051905025,
        0.4544334975369458,
        0
    ],
    [
        0.33020430701270015,
        0.7007389162561576,
        0
    ],
    [
        0.6697956929872998,
        0.7216748768472906,
        0
    ],
    [
        0.8148395721925134,
        0.42118226600985226,
        0
    ],
    [
        0.9659090909090909,
        0.5603448275862069,
        0
    ]
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"en4he":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "pointIndex", ()=>pointIndex);
parcelHelpers.export(exports, "shuffle", ()=>shuffle);
parcelHelpers.export(exports, "sleep", ()=>sleep);
parcelHelpers.export(exports, "debounce", ()=>debounce);
parcelHelpers.export(exports, "throttle", ()=>throttle);
const isSamePoint = (p1, p2, tolerance)=>{
    let x = Math.abs(p1[0] - p2[0]);
    let y = Math.abs(p1[1] - p2[1]);
    return x <= tolerance && y <= tolerance;
};
function pointIndex(src, point, tolerance = 0) {
    return src.findIndex((srcPoint)=>isSamePoint(srcPoint, point, tolerance));
}
function shuffle(array) {
    return array.sort(()=>Math.random() - 0.5);
}
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
function debounce(callback, time) {
    let timeout;
    return ()=>{
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(callback, time);
    };
}
function throttle(callback, time) {
    let isPaused = false;
    const togglePause = ()=>{
        isPaused = !isPaused;
    };
    return (event)=>{
        if (isPaused) return;
        togglePause();
        callback(event);
        setTimeout(togglePause, time);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4llPY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "trainStep", ()=>trainStep);
function innerProduct(v1, v2) {
    let sum = 0;
    for(let i = 0; i < v1.length; i++)sum += v1[i] * v2[i];
    return sum;
}
function activation(x) {
    // threshold activation function
    return x >= 0 ? 1 : 0;
}
function trainStep(inputs, labels, weights, bias, learnRate) {
    let updatedWeights = false;
    for(let i = 0; i < inputs.length; i++){
        const prediction = activation(innerProduct(inputs[i], weights) + bias);
        if (prediction === labels[i]) continue;
        const alpha = (labels[i] - prediction) * learnRate;
        bias += alpha;
        for(let j = 0; j < inputs[i].length; j++)weights[j] += alpha * inputs[i][j];
        updatedWeights = true;
    }
    return {
        bias,
        updatedWeights
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bmCqN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setParams", ()=>setParams);
parcelHelpers.export(exports, "setRunFunction", ()=>setRunFunction);
parcelHelpers.export(exports, "setDrawFunction", ()=>setDrawFunction);
var _utils = require("./utils");
const btnRun = document.querySelector("#run");
const message = document.querySelector("#message");
const epochs = document.querySelector("#epochs");
const w1 = document.querySelector("#w1");
const w2 = document.querySelector("#w2");
const bias = document.querySelector("#bias");
epochs.label = document.querySelector('label[for="epochs"]');
w1.label = document.querySelector('label[for="w1"]');
w2.label = document.querySelector('label[for="w2"]');
bias.label = document.querySelector('label[for="bias"]');
let drawFunction = ()=>{};
const debounceTime = 20;
function set(field, value, min = -1, max = 1) {
    value = parseFloat(value) || 0;
    field.value = value;
    field.title = value;
    value = Number.isInteger(value) ? value : value.toFixed(2);
    field.label?.setAttribute("data-value", value);
}
function getParams() {
    return [
        [
            parseFloat(w1.value),
            parseFloat(w2.value)
        ],
        parseFloat(bias.value),
        parseFloat(epochs.value)
    ];
}
function setParams(weigths, b, eps) {
    set(w1, weigths[0]);
    set(w2, weigths[1]);
    set(bias, b);
    set(epochs, eps, 1, 50);
}
function setRunFunction(fnc) {
    btnRun.onclick = ()=>{
        message.classList.add("hide");
        let p = getParams();
        fnc(p[0], p[1], p[2]);
    };
}
function setDrawFunction(func) {
    drawFunction = func;
}
let onUiUpdate = ()=>{
    let p = getParams();
    drawFunction(p[0], p[1], p[2]);
};
function onInput(event) {
    set(event.target, event.target.value);
    onUiUpdate();
}
epochs.addEventListener("input", onInput);
w1.addEventListener("input", (0, _utils.throttle)(onInput, debounceTime));
w2.addEventListener("input", onInput);
bias.addEventListener("input", onInput);

},{"./utils":"en4he","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["3yPwA","6rimH"], "6rimH", "parcelRequire0051")

//# sourceMappingURL=index.8cfc62b9.js.map
