/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _projectModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectModule */ \"./src/scripts/projectModule.js\");\n/* harmony import */ var _projectModule__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projectModule__WEBPACK_IMPORTED_MODULE_0__);\n//Import Modules\n\n\nconst project_list = [];\n\nfunction new_project(title, description = null, tag = null, due_date_time = null, priority = null, users = null, teams = null) {\n\tproject_list.push(new _projectModule__WEBPACK_IMPORTED_MODULE_0__.Project(title, description, tag, due_date_time, priority, users, teams));\n}\n\nconsole.log(project_list);\nconsole.log(new_project);\n\n\n//# sourceURL=webpack://todoapp/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/projectModule.js":
/*!**************************************!*\
  !*** ./src/scripts/projectModule.js ***!
  \**************************************/
/***/ (() => {

eval("//Create Project class\nclass Project {\n\tconstructor(title, description = null, tag = null, due_date_time = null, priority = null, users = null, teams = null) {\n\t\tthis.title = title;\n\t\tthis.description = description;\n\t\tthis.tag = tag;\n\t\tthis.due_date_time = due_date_time;\n\t\tthis.priority = priority;\n\t\tthis.completion_percentage = NaN;\n\t\tthis.task_list = [];\n\t\tthis.assigned_users = users;\n\t\tthis.assinged_teams = teams;\n\t}\n\n\t//Add Task to Project Task List\n\taddTask(task = null, title = null, description = null, tag = null, due_date_time = null, priority = null, complete = false, users = null, teams = null) {\n\t\t//Check if adding an existing task or creating new task\n\t\t//If task already exist push to task list\n\t\tif (task) {\n\t\t\tthis.task_list.push(task);\n\t\t} // If no current task check for minimum of task title to create new task\n\t\telse if (title) {\n\t\t\tthis.task_list(new Task(title, description, tag, due_date_time, priority, complete, users, teams));\n\t\t} else {\n\t\t\tconsole.log(\"Error - No Task to add\");\n\t\t}\n\t}\n}\n\n//Create Task Class\nclass Task {\n\tconstructor(title, description = null, tag = null, due_date_time = null, priority = null, complete = false, users = null, teams = null) {\n\t\tthis.title = title;\n\t\tthis.description = description;\n\t\tthis.tag = tag;\n\t\tthis.due_date_time = due_date_time;\n\t\tthis.priority = priority;\n\t\tthis.complete = complete;\n\t\tthis.users = users;\n\t\tthis.teams = teams;\n\t}\n}\n\n\n//# sourceURL=webpack://todoapp/./src/scripts/projectModule.js?");

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
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;