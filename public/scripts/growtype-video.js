/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/scripts/growtype-video.js":
/*!*********************************************!*\
  !*** ./resources/scripts/growtype-video.js ***!
  \*********************************************/
/***/ (function() {

eval("jQuery('.woocommerce-product-gallery__image.has-growtype-video .video-cover').on('mouseover', function () {\n  var mainImg = jQuery(this).closest('.woocommerce-product-gallery__image');\n  var video = mainImg.find('iframe');\n\n  if (!mainImg.hasClass('growtype-video-is-active')) {\n    mainImg.addClass('growtype-video-is-active');\n    video.fadeIn();\n    var videoURL = video.prop('src');\n    videoURL += \"&autoplay=1\";\n    video.prop('src', videoURL);\n    jQuery(this).animate({\n      opacity: 0\n    }, 1000);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYWdlLy4vcmVzb3VyY2VzL3NjcmlwdHMvZ3Jvd3R5cGUtdmlkZW8uanM/YjE5NyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJvbiIsIm1haW5JbWciLCJjbG9zZXN0IiwidmlkZW8iLCJmaW5kIiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsImZhZGVJbiIsInZpZGVvVVJMIiwicHJvcCIsImFuaW1hdGUiLCJvcGFjaXR5Il0sIm1hcHBpbmdzIjoiQUFBQUEsTUFBTSxDQUFDLHFFQUFELENBQU4sQ0FBOEVDLEVBQTlFLENBQWlGLFdBQWpGLEVBQThGLFlBQVk7QUFDdEcsTUFBSUMsT0FBTyxHQUFHRixNQUFNLENBQUMsSUFBRCxDQUFOLENBQWFHLE9BQWIsQ0FBcUIscUNBQXJCLENBQWQ7QUFDQSxNQUFJQyxLQUFLLEdBQUdGLE9BQU8sQ0FBQ0csSUFBUixDQUFhLFFBQWIsQ0FBWjs7QUFDQSxNQUFJLENBQUNILE9BQU8sQ0FBQ0ksUUFBUixDQUFpQiwwQkFBakIsQ0FBTCxFQUFtRDtBQUMvQ0osSUFBQUEsT0FBTyxDQUFDSyxRQUFSLENBQWlCLDBCQUFqQjtBQUNBSCxJQUFBQSxLQUFLLENBQUNJLE1BQU47QUFDQSxRQUFJQyxRQUFRLEdBQUdMLEtBQUssQ0FBQ00sSUFBTixDQUFXLEtBQVgsQ0FBZjtBQUNBRCxJQUFBQSxRQUFRLElBQUksYUFBWjtBQUNBTCxJQUFBQSxLQUFLLENBQUNNLElBQU4sQ0FBVyxLQUFYLEVBQWtCRCxRQUFsQjtBQUVBVCxJQUFBQSxNQUFNLENBQUMsSUFBRCxDQUFOLENBQWFXLE9BQWIsQ0FBcUI7QUFBQ0MsTUFBQUEsT0FBTyxFQUFFO0FBQVYsS0FBckIsRUFBbUMsSUFBbkM7QUFDSDtBQUNKLENBWkQiLCJzb3VyY2VzQ29udGVudCI6WyJqUXVlcnkoJy53b29jb21tZXJjZS1wcm9kdWN0LWdhbGxlcnlfX2ltYWdlLmhhcy1ncm93dHlwZS12aWRlbyAudmlkZW8tY292ZXInKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBtYWluSW1nID0galF1ZXJ5KHRoaXMpLmNsb3Nlc3QoJy53b29jb21tZXJjZS1wcm9kdWN0LWdhbGxlcnlfX2ltYWdlJyk7XG4gICAgbGV0IHZpZGVvID0gbWFpbkltZy5maW5kKCdpZnJhbWUnKTtcbiAgICBpZiAoIW1haW5JbWcuaGFzQ2xhc3MoJ2dyb3d0eXBlLXZpZGVvLWlzLWFjdGl2ZScpKSB7XG4gICAgICAgIG1haW5JbWcuYWRkQ2xhc3MoJ2dyb3d0eXBlLXZpZGVvLWlzLWFjdGl2ZScpO1xuICAgICAgICB2aWRlby5mYWRlSW4oKTtcbiAgICAgICAgbGV0IHZpZGVvVVJMID0gdmlkZW8ucHJvcCgnc3JjJyk7XG4gICAgICAgIHZpZGVvVVJMICs9IFwiJmF1dG9wbGF5PTFcIjtcbiAgICAgICAgdmlkZW8ucHJvcCgnc3JjJywgdmlkZW9VUkwpO1xuXG4gICAgICAgIGpRdWVyeSh0aGlzKS5hbmltYXRlKHtvcGFjaXR5OiAwfSwgMTAwMCk7XG4gICAgfVxufSk7XG4iXSwiZmlsZSI6Ii4vcmVzb3VyY2VzL3NjcmlwdHMvZ3Jvd3R5cGUtdmlkZW8uanMuanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/scripts/growtype-video.js\n");

/***/ }),

/***/ "./resources/styles/growtype-video.scss":
/*!**********************************************!*\
  !*** ./resources/styles/growtype-video.scss ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvc3R5bGVzL2dyb3d0eXBlLXZpZGVvLnNjc3MuanMiLCJtYXBwaW5ncyI6IjtBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FnZS8uL3Jlc291cmNlcy9zdHlsZXMvZ3Jvd3R5cGUtdmlkZW8uc2Nzcz9mNTE4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/styles/growtype-video.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/scripts/growtype-video": 0,
/******/ 			"styles/growtype-video": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksage"] = self["webpackChunksage"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["styles/growtype-video"], function() { return __webpack_require__("./resources/scripts/growtype-video.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["styles/growtype-video"], function() { return __webpack_require__("./resources/styles/growtype-video.scss"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;