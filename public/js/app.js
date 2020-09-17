/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext('2d'); // Set Canvas to be window size

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; // Configuration, Play with these

var config = {
  particleNumber: 500,
  maxParticleSize: 10,
  maxSpeed: 30,
  colorVariation: 5,
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}; // Colors

var colorPalette = {
  bg: {
    r: 14,
    g: 18,
    b: 41
  },
  matter: [{
    r: 177,
    g: 177,
    b: 207
  }, // light blue
  {
    r: 223,
    g: 68,
    b: 77
  }, // rockDust
  {
    r: 255,
    g: 147,
    b: 153
  }, // solorFlare
  {
    r: 223,
    g: 225,
    b: 240
  } // totesASun
  ]
}; // Some Variables hanging out

var particles = [],
    centerX = canvas.width / 2,
    centerY = canvas.height / 2; // Draws the background for the canvas, because space

var drawBg = function drawBg(ctx, color) {
  ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}; // Particle Constructor


var Particle = function Particle(x, y) {
  // X Coordinate
  this.x = x || Math.round(Math.random() * canvas.width); // Y Coordinate

  this.y = y || Math.round(Math.random() * canvas.height); // Radius of the space dust

  this.r = Math.ceil(Math.random() * config.maxParticleSize); // Color of the rock, given some randomness

  this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true); // Speed of which the rock travels

  this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7); // Direction the Rock flies

  this.d = Math.round(Math.random() * 360);
}; // Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2


var colorVariation = function colorVariation(color, returnString) {
  var r, g, b, a, variation;
  r = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.r);
  g = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.g);
  b = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.b);
  a = Math.random() + .5;

  if (returnString) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  } else {
    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  }
}; // Used to find the rocks next point in space, accounting for speed and direction


var updateParticleModel = function updateParticleModel(p) {
  var a = 180 - (p.d + 90); // find the 3rd angle

  p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
  p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
  return p;
}; // Just the function that physically draws the particles
// Physically? sure why not, physically.


var drawParticle = function drawParticle(x, y, r, c) {
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
}; // Remove particles that aren't on the canvas


var cleanUpArray = function cleanUpArray() {
  particles = particles.filter(function (p) {
    return p.x > -100 && p.y > -100;
  });
};

var initParticles = function initParticles(numParticles, x, y) {
  for (var i = 0; i < numParticles; i++) {
    particles.push(new Particle(x, y));
  }

  particles.forEach(function (p) {
    drawParticle(p.x, p.y, p.r, p.c);
  });
};

var frame = function frame() {
  // Draw background first
  drawBg(ctx, colorPalette.bg); // Update Particle models to new position

  particles.map(function (p) {
    return updateParticleModel(p);
  }); // Draw em'

  particles.forEach(function (p) {
    drawParticle(p.x, p.y, p.r, p.c);
  }); // Play the same song? Ok!

  window.requestAnimationFrame(frame);
};

$(document).ready(function () {
  frame();
  var shownMagics = [];

  function insertMagic(magic) {
    if (shownMagics.indexOf(magic.index) == -1) {
      shownMagics.push(magic.index);
      cleanUpArray();
      initParticles(config.particleNumber, config.x, config.y);
      $('.circle-with-text').addClass('end-state');
      $('#button').addClass('end-state');
      $('#waiting').html('<span class="red">' + magic.value.name + '</span>' + ' sent us <span class="red">magic</span>! Who\'s next?');
    }
  } // Function to get Sync token from Twilio Function


  function getSyncToken(callback) {
    $.getJSON('https://peridot-goldfish-9260.twil.io/sync-token').then(function (data) {
      callback(data.token);
    });
  } // Connect to Sync "MagicTexters" List


  function startSync(token) {
    var syncClient = new Twilio.Sync.Client(token);
    syncClient.on('tokenAboutToExpire', function () {
      var token = getSyncToken(function (token) {
        syncClient.updateToken(token);
      });
    });
    syncClient.list('ES560b8eae33184471b383ae516c7ca0a6').then(function (list) {
      list.on('itemAdded', function (result) {
        insertMagic(result.item.data);
      });
    });
  }

  getSyncToken(function (token) {
    startSync(token);
  });
});

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/sass/video.scss":
/*!***********************************!*\
  !*** ./resources/sass/video.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/video.scss ./resources/sass/app.scss ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/ankumar/code/twilio-demo-magic/resources/js/app.js */"./resources/js/app.js");
__webpack_require__(/*! /Users/ankumar/code/twilio-demo-magic/resources/sass/video.scss */"./resources/sass/video.scss");
module.exports = __webpack_require__(/*! /Users/ankumar/code/twilio-demo-magic/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });