// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node = /*#__PURE__*/function () {
  function Node(val, x, y) {
    _classCallCheck(this, Node);

    this.val = val;
    this.x = x;
    this.y = y;
    this.r = 50;
    this.pos = createVector(x, y);
    this.id = 0;
    this.children = new Set();
  }

  _createClass(Node, [{
    key: "connect",
    value: function connect(other) {
      if (this.children.has(other)) {
        this.disconnect(other);
      } else {
        this.children.add(other);
      }
    }
  }, {
    key: "disconnect",
    value: function disconnect(other) {
      this.children.delete(other);
    }
  }, {
    key: "renderCircle",
    value: function renderCircle() {
      noStroke(255);
      fill(255, 198, 74);
      circle(this.pos.x, this.pos.y, this.r);
    }
  }, {
    key: "renderText",
    value: function renderText() {
      fill(10);
      textSize(24);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(this.val, this.x, this.y);
    }
  }, {
    key: "renderLine",
    value: function renderLine(arrow) {
      var _this = this;

      this.children.forEach(function (other) {
        stroke(255);
        strokeWeight(4);

        if (arrow) {
          push();
          var at = Vector.sub(other.pos, _this.pos);
          var angle = at.heading();
          var delta_x = sin(angle);
          var delta_y = cos(angle);
          translate(_this.pos.x, _this.pos.y);
          at.setMag(at.mag() - _this.r);

          var _x = delta_x * 40;

          var _y = delta_y * 40;

          line(_y, _x, at.x, at.y);
          rotate(at.heading());
          var arrowSize = 7;
          translate(at.mag(), 0);
          triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
          pop();
        }

        noStroke();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var arrow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.renderLine(arrow);
      this.renderCircle();
      this.renderText();
    }
  }, {
    key: "inside",
    value: function inside(x, y) {
      return x >= this.x - this.r && x <= this.x + this.r && y >= this.y - this.r && y <= this.y + this.r;
    }
  }]);

  return Node;
}();

var _default = Node;
exports.default = _default;
},{}],"Graph.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Graph = /*#__PURE__*/function () {
  function Graph() {
    _classCallCheck(this, Graph);

    this.node_list = [];
    this.graph = [];
    this.size = 0;
  }

  _createClass(Graph, [{
    key: "addNode",
    value: function addNode(val, x, y) {
      if (this.checkInside(x, y)[0]) return;
      var new_node = new _Node.default(val, x, y);
      this.node_list.push(new_node);
      new_node.id = this.size;
      this.size += 1;
    }
  }, {
    key: "checkInside",
    value: function checkInside(x, y) {
      var flag = 0;
      var under_node = null;
      this.node_list.forEach(function (node) {
        if (node.inside(x, y)) {
          flag = 1;
          under_node = node;
          return;
        }
      });
      return [flag, under_node];
    }
  }, {
    key: "connect",
    value: function connect(at, to) {
      at.connect(to);
      this.graph[at.id] = at;
      this.graph[to.id] = to;
    }
  }, {
    key: "getGraph",
    value: function getGraph() {
      var n = this.graph.length;
      var adjList = [];
      var edges = [];
      var matrix = Array(n).fill(0).map(function () {
        return new Array(n).fill(0);
      });
      this.graph.forEach(function (at) {
        adjList[at.id] = [];
        at.children.forEach(function (to) {
          adjList[at.id].push(to.id);
          edges.push([at.id, to.id]);
          matrix[at.id][to.id] = 1;
        });
      });
      return [adjList, edges, matrix];
    }
  }, {
    key: "render",
    value: function render() {
      this.node_list.forEach(function (node) {
        return node.render();
      });
    }
  }]);

  return Graph;
}();

var _default = Graph;
exports.default = _default;
},{"./Node":"Node.js"}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.container = exports.stringfy = void 0;

var stringfy = function stringfy(adj) {
  var res = "[";
  adj.forEach(function (arr, i) {
    if (arr.length == 0) {
      res += "[]" + (i + 1 != adj.length ? "," : "");
    } else {
      res += "[";
      arr.forEach(function (e, i) {
        res += String(e);

        if (i + 1 != arr.length) {
          res += ",";
        }
      });
      res += "]" + (i + 1 != adj.length ? "," : "");
    }
  });
  res += "]";
  return res;
};

exports.stringfy = stringfy;

var container = function container(heading, content, id) {
  var hr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var container_DOM = document.createElement("div");
  var heading_DOM = document.createElement("h4");
  heading_DOM.innerText = heading;
  var content_DOM = document.createElement("samp");
  content_DOM.setAttribute("data-clipboard-text", content);
  content_DOM.setAttribute("class", "clip");
  content_DOM.setAttribute("data-toggle", "tooltip");
  content_DOM.setAttribute("data-placement", "top");
  content_DOM.setAttribute("title", "Copy to Clipboard");
  content_DOM.appendChild(document.createTextNode(content));
  container_DOM.appendChild(heading_DOM);
  container_DOM.appendChild(content_DOM);
  hr && container_DOM.appendChild(document.createElement("hr"));
  return container_DOM;
};

exports.container = container;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _Graph = _interopRequireDefault(require("./Graph"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

new Q5("global");
var G = null;
var start = null;
var end = null;
var start_node = null;
var end_node = null;
var button = document.querySelector("#btn");
var modalBody = document.querySelector("#modal-body");
button.addEventListener("click", function (e) {
  var _G$getGraph = G.getGraph(),
      _G$getGraph2 = _slicedToArray(_G$getGraph, 3),
      adjList = _G$getGraph2[0],
      edges = _G$getGraph2[1],
      matrix = _G$getGraph2[2];

  var adj_list_string = (0, _utils.stringfy)(adjList);
  var edges_string = (0, _utils.stringfy)(edges);
  var matrix_string = (0, _utils.stringfy)(matrix);
  modalBody.innerHTML = "";
  modalBody.appendChild((0, _utils.container)("Adjacency List", adj_list_string, "adj"));
  modalBody.appendChild((0, _utils.container)("Edges", edges_string, "edge"));
  modalBody.appendChild((0, _utils.container)("Matrix", matrix_string, "matrix", false));
  document.querySelectorAll(".clip").forEach(function (x) {
    return x.addEventListener("click", function (e) {
      var txt = document.createElement("input");
      txt.value = e.target.innerText;
      modalBody.appendChild(txt);
      txt.select();
      txt.setSelectionRange(0, 99999);
      document.execCommand("copy");
      txt.remove();
    });
  });
});

setup = function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(10);
  G = new _Graph.default();
};

draw = function draw() {
  background(10);
  G.render();
};

mousePressed = function mousePressed() {
  var _G;

  G.addNode(G.size, mouseX, mouseY);
  start = [mouseX, mouseY];
  start_node = (_G = G).checkInside.apply(_G, _toConsumableArray(start))[1];
};

mouseReleased = function mouseReleased() {
  var _G2;

  end = [mouseX, mouseY];
  end_node = (_G2 = G).checkInside.apply(_G2, _toConsumableArray(end))[1];

  if (start_node && end_node && start_node.id != end_node.id) {
    G.connect(start_node, end_node);
  }
};
},{"./Graph":"Graph.js","./utils":"utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63113" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/test-case-maker.e31bb0bc.js.map