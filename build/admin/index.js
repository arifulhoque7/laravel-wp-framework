/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lucide-react/dist/esm/Icon.js":
/*!****************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/Icon.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultAttributes.js */ "./node_modules/lucide-react/dist/esm/defaultAttributes.js");
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */





const Icon = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
    "svg",
    {
      ref,
      ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeClasses)("lucide", className),
      ...!children && !(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.hasA11yProp)(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);


//# sourceMappingURL=Icon.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/createLucideIcon.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/createLucideIcon.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createLucideIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/src/utils.js */ "./node_modules/lucide-react/dist/esm/shared/src/utils.js");
/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon.js */ "./node_modules/lucide-react/dist/esm/Icon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */





const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
    ({ className, ...props }, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon_js__WEBPACK_IMPORTED_MODULE_2__["default"], {
      ref,
      iconNode,
      className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.mergeClasses)(
        `lucide-${(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.toKebabCase)((0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.toPascalCase)(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_1__.toPascalCase)(iconName);
  return Component;
};


//# sourceMappingURL=createLucideIcon.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/defaultAttributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/defaultAttributes.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultAttributes)
/* harmony export */ });
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/book-open.js":
/*!***************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/book-open.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ BookOpen)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("book-open", __iconNode);


//# sourceMappingURL=book-open.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js":
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/circle-alert.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ CircleAlert)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("circle-alert", __iconNode);


//# sourceMappingURL=circle-alert.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/circle-check.js":
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/circle-check.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ CircleCheck)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("circle-check", __iconNode);


//# sourceMappingURL=circle-check.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/file-text.js":
/*!***************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/file-text.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ FileText)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("file-text", __iconNode);


//# sourceMappingURL=file-text.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/layout-dashboard.js":
/*!**********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/layout-dashboard.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ LayoutDashboard)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("layout-dashboard", __iconNode);


//# sourceMappingURL=layout-dashboard.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/loader-circle.js":
/*!*******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/loader-circle.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ LoaderCircle)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("loader-circle", __iconNode);


//# sourceMappingURL=loader-circle.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/package.js":
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/package.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Package)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("package", __iconNode);


//# sourceMappingURL=package.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/refresh-cw.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/refresh-cw.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ RefreshCw)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("refresh-cw", __iconNode);


//# sourceMappingURL=refresh-cw.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/settings.js":
/*!**************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/settings.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("settings", __iconNode);


//# sourceMappingURL=settings.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/trending-up.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/trending-up.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ TrendingUp)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("trending-up", __iconNode);


//# sourceMappingURL=trending-up.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/users.js":
/*!***********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/users.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Users)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("users", __iconNode);


//# sourceMappingURL=users.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/icons/zap.js":
/*!*********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/zap.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Zap)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("zap", __iconNode);


//# sourceMappingURL=zap.js.map


/***/ }),

/***/ "./node_modules/lucide-react/dist/esm/shared/src/utils.js":
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/shared/src/utils.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasA11yProp: () => (/* binding */ hasA11yProp),
/* harmony export */   mergeClasses: () => (/* binding */ mergeClasses),
/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase),
/* harmony export */   toKebabCase: () => (/* binding */ toKebabCase),
/* harmony export */   toPascalCase: () => (/* binding */ toPascalCase)
/* harmony export */ });
/**
 * @license lucide-react v0.552.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};


//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./resources/admin/js/index.js":
/*!*************************************!*\
  !*** ./resources/admin/js/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/loader-circle.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/book-open.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/layout-dashboard.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/package.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/refresh-cw.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/settings.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trending-up.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/zap.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./style.scss */ "./resources/admin/js/style.scss");
/**
 * Admin React Application
 *
 * Main entry point for the admin dashboard React app with shadcn-style design.
 *
 * @package LaravelWP
 */






const {
  div,
  h1,
  h2,
  h3,
  h4,
  p,
  span,
  button,
  a,
  form,
  label,
  input,
  textarea,
  code
} = {
  div: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', props, ...children),
  h1: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('h1', props, ...children),
  h2: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('h2', props, ...children),
  h3: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('h3', props, ...children),
  h4: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('h4', props, ...children),
  p: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', props, ...children),
  span: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', props, ...children),
  button: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', props, ...children),
  a: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', props, ...children),
  form: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('form', props, ...children),
  label: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', props, ...children),
  input: props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', props),
  textarea: props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('textarea', props),
  code: (props, ...children) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)('code', props, ...children)
};

/**
 * Admin Dashboard Component
 */
function AdminApp() {
  const [data, setData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [items, setItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [newItemTitle, setNewItemTitle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [newItemContent, setNewItemContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [creating, setCreating] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('overview');
  const [showNotification, setShowNotification] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notificationMessage, setNotificationMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');

  // Fetch initial data
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchData();
    fetchItems();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/laravel-wp/v1/data'
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchItems = async () => {
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/laravel-wp/v1/items'
      });
      setItems(response.items || []);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    }
  };
  const showSuccessNotification = message => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  const handleCreateItem = async e => {
    e.preventDefault();
    if (!newItemTitle.trim()) {
      alert('Please enter a title');
      return;
    }
    try {
      setCreating(true);
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/laravel-wp/v1/items',
        method: 'POST',
        data: {
          title: newItemTitle,
          content: newItemContent
        }
      });
      setNewItemTitle('');
      setNewItemContent('');
      fetchItems();
      showSuccessNotification('Item created successfully!');
    } catch (err) {
      alert('Failed to create item: ' + err.message);
    } finally {
      setCreating(false);
    }
  };
  if (loading) {
    return div({
      className: 'lwpf-root flex flex-col items-center justify-center min-h-[80vh] bg-background'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: 'w-12 h-12 text-foreground animate-spin'
    }), p({
      className: 'text-muted-foreground text-lg mt-4 font-medium'
    }, 'Loading dashboard...'));
  }
  if (error) {
    return div({
      className: 'lwpf-root max-w-2xl mx-auto mt-20'
    }, div({
      className: 'rounded-xl border bg-card text-card-foreground shadow p-8 text-center'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: 'w-16 h-16 text-destructive mx-auto mb-4'
    }), h3({
      className: 'text-2xl font-bold text-destructive mb-2'
    }, 'Error Loading Dashboard'), p({
      className: 'text-muted-foreground mb-6'
    }, error), button({
      onClick: fetchData,
      className: 'inline-flex items-center justify-center gap-2 h-11 px-8 bg-primary text-primary-foreground rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
      className: 'w-4 h-4'
    }), 'Retry')));
  }
  return div({
    className: 'lwpf-root bg-background min-h-screen'
  },
  // Success Notification
  showNotification && div({
    className: 'fixed top-8 right-8 bg-foreground text-background px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slide-down'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: 'w-6 h-6'
  }), span({
    className: 'font-medium'
  }, notificationMessage)),
  // Top Header Bar
  div({
    className: 'bg-foreground text-background border-b'
  }, div({
    className: 'max-w-7xl mx-auto px-6 py-6'
  }, div({
    className: 'flex items-center justify-between flex-wrap gap-4'
  }, div({
    className: 'flex-1'
  }, div({
    className: 'flex items-center gap-3 mb-2'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"], {
    className: 'w-8 h-8'
  }), h1({
    className: 'text-3xl font-bold text-white'
  }, 'Laravel WP Framework')), p({
    className: 'text-muted-foreground/80 text-base'
  }, 'Professional WordPress Development Platform')), div({
    className: 'flex items-center gap-4'
  }, button({
    onClick: fetchData,
    className: 'inline-flex items-center text-black gap-2 px-4 py-2 border border-input bg-background shadow-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: 'w-4 h-4'
  }), 'Refresh'), span({
    className: 'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground'
  }, `v${data?.version || '1.0.0'}`))))),
  // Navigation Tabs
  div({
    className: 'bg-background border-b'
  }, div({
    className: 'max-w-7xl mx-auto'
  }, div({
    className: 'flex'
  }, button({
    className: `inline-flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all ${activeTab === 'overview' ? 'text-foreground border-foreground' : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted'}`,
    onClick: () => setActiveTab('overview')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: 'w-5 h-5'
  }), 'Overview'), button({
    className: `inline-flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all ${activeTab === 'items' ? 'text-foreground border-foreground' : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted'}`,
    onClick: () => setActiveTab('items')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: 'w-5 h-5'
  }), 'Items'), button({
    className: `inline-flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all ${activeTab === 'settings' ? 'text-foreground border-foreground' : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted'}`,
    onClick: () => setActiveTab('settings')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
    className: 'w-5 h-5'
  }), 'Settings')))),
  // Main Content
  div({
    className: 'max-w-7xl mx-auto px-6 py-8'
  }, activeTab === 'overview' && data && div(null,
  // Stats Grid
  div({
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'
  },
  // Stats cards...
  [{
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"],
    label: 'Total Posts',
    value: data.stats?.posts || 0,
    change: '12%'
  }, {
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"],
    label: 'Total Pages',
    value: data.stats?.pages || 0,
    change: '8%'
  }, {
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"],
    label: 'Total Users',
    value: data.stats?.users || 0,
    change: '5%'
  }, {
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"],
    label: 'Total Items',
    value: items.length,
    change: null
  }].map((stat, i) => div({
    key: i,
    className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow'
  }, div({
    className: 'p-6'
  }, div({
    className: 'flex items-center justify-between mb-3'
  }, p({
    className: 'text-xs font-semibold uppercase text-muted-foreground'
  }, stat.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(stat.icon, {
    className: 'w-8 h-8 text-muted-foreground'
  })), div({
    className: 'text-3xl font-bold text-foreground mb-1'
  }, stat.value), div({
    className: 'flex items-center gap-1 text-sm'
  }, stat.change ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
    className: 'w-3 h-3 text-muted-foreground'
  }) : null, stat.change ? span({
    className: 'text-muted-foreground font-semibold'
  }, stat.change) : null, stat.change ? span({
    className: 'text-muted-foreground'
  }, 'from last month') : span({
    className: 'text-muted-foreground'
  }, 'No change')))))),
  // Site Info Card
  div({
    className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow mb-8'
  }, div({
    className: 'p-6 border-b'
  }, h3({
    className: 'text-xl font-semibold text-foreground'
  }, 'Site Information')), div({
    className: 'p-6 space-y-4'
  }, div({
    className: 'flex items-center justify-between py-3 border-b'
  }, span({
    className: 'text-sm font-semibold text-muted-foreground uppercase tracking-wide'
  }, 'Site Name'), span({
    className: 'text-base text-foreground font-medium'
  }, data.site_info?.name)), div({
    className: 'flex items-center justify-between py-3 border-b'
  }, span({
    className: 'text-sm font-semibold text-muted-foreground uppercase tracking-wide'
  }, 'Site URL'), a({
    href: data.site_info?.url,
    className: 'text-foreground hover:underline font-medium',
    target: '_blank',
    rel: 'noopener'
  }, data.site_info?.url))))), activeTab === 'items' && div(null,
  // Create New Item Card
  div({
    className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow mb-8'
  }, div({
    className: 'p-6 border-b'
  }, h3({
    className: 'text-xl font-semibold text-foreground'
  }, 'Create New Item')), div({
    className: 'p-6'
  }, form({
    onSubmit: handleCreateItem,
    className: 'space-y-6'
  }, div(null, label({
    className: 'block text-sm font-semibold text-foreground mb-2'
  }, 'Title'), input({
    type: 'text',
    value: newItemTitle,
    onChange: e => setNewItemTitle(e.target.value),
    placeholder: 'Enter item title...',
    className: 'w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all'
  })), div(null, label({
    className: 'block text-sm font-semibold text-foreground mb-2'
  }, 'Content'), textarea({
    value: newItemContent,
    onChange: e => setNewItemContent(e.target.value),
    placeholder: 'Enter item content...',
    rows: 4,
    className: 'w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none'
  })), button({
    type: 'submit',
    disabled: creating,
    className: 'inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold shadow-md hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
  }, creating && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: 'w-4 h-4 animate-spin'
  }), creating ? 'Creating...' : 'Create Item')))),
  // Items List Card
  div({
    className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow'
  }, div({
    className: 'p-6 border-b flex items-center justify-between'
  }, h3({
    className: 'text-xl font-semibold text-foreground'
  }, 'All Items'), span({
    className: 'text-sm font-medium text-muted-foreground'
  }, `${items.length} items`)), div({
    className: 'p-6'
  }, items.length === 0 ? div({
    className: 'text-center py-12'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: 'w-16 h-16 text-muted-foreground mx-auto mb-4'
  }), p({
    className: 'text-lg font-medium text-foreground mb-2'
  }, 'No items yet'), p({
    className: 'text-muted-foreground'
  }, 'Create your first item using the form above')) : div({
    className: 'space-y-3'
  }, items.map((item, i) => div({
    key: i,
    className: 'flex items-start gap-4 p-5 rounded-lg border border-border hover:border-foreground hover:bg-accent transition-all'
  }, div({
    className: 'flex-shrink-0 w-12 h-12 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-lg shadow'
  }, i + 1), div({
    className: 'flex-1 min-w-0'
  }, h4({
    className: 'font-semibold text-lg text-foreground mb-1'
  }, item.title), item.content && p({
    className: 'text-sm text-muted-foreground line-clamp-2'
  }, item.content)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: 'flex-shrink-0 w-6 h-6 text-foreground mt-1'
  }))))))), activeTab === 'settings' && div({
    className: 'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow'
  }, div({
    className: 'p-6 border-b'
  }, h3({
    className: 'text-xl font-semibold text-foreground'
  }, 'Plugin Settings')), div({
    className: 'p-6 space-y-6'
  }, div({
    className: 'flex items-center justify-between py-6 border-b'
  }, div({
    className: 'flex-1 pr-6'
  }, h4({
    className: 'text-base font-bold text-foreground mb-1'
  }, 'API Endpoint'), p({
    className: 'text-sm text-muted-foreground'
  }, 'REST API namespace for all endpoints')), code({
    className: 'bg-muted px-4 py-2 rounded-lg text-sm font-mono text-foreground'
  }, '/wp-json/laravel-wp/v1/')), div({
    className: 'flex items-center justify-between py-6'
  }, div({
    className: 'flex-1 pr-6'
  }, h4({
    className: 'text-base font-bold text-foreground mb-1'
  }, 'Framework Version'), p({
    className: 'text-sm text-muted-foreground'
  }, 'Current version of Laravel WP Framework')), span({
    className: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase bg-foreground text-background'
  }, `v${data?.version || '1.0.0'}`))))));
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('laravel-wp-admin-app');
  if (mountPoint) {
    const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(mountPoint);
    root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AdminApp));
  }
});

/***/ }),

/***/ "./resources/admin/js/style.scss":
/*!***************************************!*\
  !*** ./resources/admin/js/style.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

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
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
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
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
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
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
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
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunklaravel_wp_framework"] = globalThis["webpackChunklaravel_wp_framework"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./resources/admin/js/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map