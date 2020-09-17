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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/video.js":
/*!*******************************!*\
  !*** ./resources/js/video.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _urlParams$get;

var Video = Twilio.Video;
var toggleableVideo = false;
var videoDevices = [];
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var roomName = (_urlParams$get = urlParams.get('room')) !== null && _urlParams$get !== void 0 ? _urlParams$get : 'default-room';
var room;

var registerMuteButton = function registerMuteButton(room) {
  $('.mic-holder').show();
  console.log('resgitering mute button');
  $('.mic-holder').on('click', function () {
    room.localParticipant.audioTracks.forEach(function (publication) {
      if (publication.track.isEnabled) {
        publication.track.disable();
        $('.unmuted').hide();
        $('.muted').show();
      } else {
        publication.track.enable();
        $('.unmuted').show();
        $('.muted').hide();
      }
    });
  });
};

var registerRemoteTracks = function registerRemoteTracks(participant) {
  console.log('registering remote tracks');
  participant.tracks.forEach(function (publication) {
    if (publication.isSubscribed) {
      var track = publication.track;
      track.attach('#remote');
    }
  });
  participant.on('trackSubscribed', function (track) {
    track.attach('#remote');
  });
};

var deregisterRemoteTracks = function deregisterRemoteTracks(participant) {
  participant.tracks.forEach(function (publication) {
    if (publication.isSubscribed) {
      var track = publication.track;
      track.detach();
    }
  });
};

var registerRemoteEvents = function registerRemoteEvents(room) {
  // Log any Participants already connected to the Room
  room.participants.forEach(function (participant) {
    console.log("Participant \"".concat(participant.identity, "\" is connected to the Room"));
    registerRemoteTracks(participant);
  });
  room.on('participantConnected', function (participant) {
    console.log("Participant connected: ".concat(participant.identity));
    registerRemoteTracks(participant);
  });
  room.on('participantDisconnected', function (participant) {
    console.log("Participant disconnected: ".concat(participant.identity));
    deregisterRemoteTracks(participant);
  });
};

var switchCameras = function switchCameras(track) {
  console.log('resgitering switcher');
  $('.switch-camera').on('click', function () {
    var current = track.mediaStreamTrack.getSettings().facingMode;

    if (current === 'user') {
      track.restart({
        facingMode: 'environment'
      });
    } else {
      track.restart({
        facingMode: 'user'
      });
    }
  });
};

var getToken = function getToken(callback) {
  return $.getJSON('https://proxy-demo-7914.twil.io/video_token').then(function (data) {
    return callback(data);
  });
};

var connect = function connect(tracks) {
  return getToken(function (token) {
    return Video.connect(token, {
      name: roomName,
      tracks: tracks
    });
  });
};

Video.createLocalTracks({
  name: 'testing',
  audio: true,
  video: {
    width: 1280,
    facingMode: 'user'
  }
}).then(function (localTracks) {
  localTracks.forEach(function (track) {
    if (track.kind === 'video') {
      track.attach('#local');
      track.restart({
        facingMode: 'user'
      });
      $(".preview-container").draggable({
        containment: ".videos-container"
      });
      var switchable = track.mediaStreamTrack.getSettings().facingMode;

      if (switchable) {
        $('.switch-camera').show(0, switchCameras(track));
      }
    }
  });
  return connect(localTracks);
}).then(function (room) {
  console.log('Room connected!');
  registerMuteButton(room);
  registerRemoteEvents(room);
});

/***/ }),

/***/ 1:
/*!*************************************!*\
  !*** multi ./resources/js/video.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ankumar/code/twilio-demo-magic/resources/js/video.js */"./resources/js/video.js");


/***/ })

/******/ });