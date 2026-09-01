//#region module/src/constants.ts
const A1_ID = "Automatic1111_SD";
const SD_AMD_ID = "LSHQQYTIGER_SD";
const SD_FORGE_AMD_ID = "LSHQQYTIGER_Forge_SD";
const SD_FORGE_ID = "Lllyasviel_SD";
const COMFYUI_ID = "ComfyUI_SD";
const COMFYUI_ZLUDA_ID = "ComfyUI_Zluda_ID";
const COMFYUI_ROCM_ID = "ComfyUI_ROCm_ID";
const SD_NEXT_ID = "VLADMANDIC_SD";
const SWARM_ID = "McMonkeyProjects_SD";
const KOHYA_ID = "Bmaltais_SD";
const ONETRAINER_ID = "Nerogar_SD";
const SD_UIUX_ID = "Anapnoe_SD";
const INVOKE_ID = "InvokeAI_SD";
const ALLTALK_ID = "Erew123_SD";
const AITOOLKIT_ID = "Ostris_AI_Toolkit";
const SMARTGALLERY_ID = "Biagiomaf_SmartGallery";
const LORA_MANAGER_ID = "Willmiao_LoraManager";
const UNSLOTH_STUDIO_ID = "Unsloth_Studio";
const LLAMA_FACTORY_ID = "LlamaFactory_AI";
const TG_ID = "Oobabooga_TG";
const SILLYTAVERN_ID = "SillyTavern_TG";
const OPEN_WEBUI_ID = "OpenWebUI_TG";
const BOLT_DIY_ID = "BoltDiy_TG";
const FLOWISEAI_ID = "FlowiseAI_TG";
const LoLLMS_ID = "LoLLMS_TG";
const N8N_ID = "N8N_TG";
const GeminiCli_ID = "GeminiCli_TG";
const CLAUDE_CODE_ID = "ClaudeCode_TG";
const ANTIGRAVITY_CLI_ID = "AntigravityCli_TG";
const HERMES_AGENT_ID = "HermesAgent_TG";
const LANGFLOW_ID = "Langflow_AI";
const LLAMA_CPP_ID = "GgmlOrg_LlamaCpp";
const TTS_ID = "Rsxdalv_AG";
const AG_ID = "Gitmylo_AG";
const APPLIO_ID = "IAHispano_Applio";
const CHAT_TTS_ID = "ChatTTS_2Noise";
const VOICE_STUDIO_ID = "Debpalash_VoiceStudio";
//#endregion
//#region module/src/utils/crossUtils.ts
function detectIsWin() {
	if (typeof window !== "undefined" && window.osPlatform) return window.osPlatform === "win32";
	if (typeof process !== "undefined" && process.platform) return process.platform === "win32";
	return true;
}
function detectIsMac() {
	if (typeof window !== "undefined" && window.osPlatform) return window.osPlatform === "darwin";
	if (typeof process !== "undefined" && process.platform) return process.platform === "darwin";
	return true;
}
function detectIsLinux() {
	if (typeof window !== "undefined" && window.osPlatform) return window.osPlatform === "linux";
	if (typeof process !== "undefined" && process.platform) return process.platform === "linux";
	return true;
}
const isWin = detectIsWin();
const isMac = detectIsMac();
const isLinux = detectIsLinux();
const scriptCommentStr = isWin ? "REM" : "#";
function getPythonCommandByOs() {
	if (isMac) return {
		pip: "pip3",
		python: "python3"
	};
	return {
		pip: "pip",
		python: "python"
	};
}
function formatSize(size) {
	if (!size) return "0KB";
	if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
	else if (size < 1073741824) return `${(size / 1048576).toFixed(2)} MB`;
	else return `${(size / 1073741824).toFixed(2)} GB`;
}
var DescriptionManager = class {
	description;
	callback;
	constructor(description, callback) {
		this.description = description;
		this.callback = callback;
		this.callback.setDescription(description);
	}
	updateItem(sectionIndex, itemIndex, value) {
		if (this.description) {
			this.description[sectionIndex].items[itemIndex].result = value;
			this.callback.setDescription([...this.description]);
		}
	}
};
function extractGitUrl(url) {
	const match = url.match(/^(https?:\/\/)?(www\.)?(github|gitlab)\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/);
	if (!match) throw new Error(`Invalid Git repository URL: ${url}`);
	const [, , , platform, owner, repo] = match;
	return {
		owner,
		repo,
		platform
	};
}
function removeAnsi(str) {
	return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
}
function getCdCommand(dirPath) {
	const escapedPath = dirPath.replace(/ /g, "\\ ");
	const quotedPath = `"${dirPath}"`;
	if (isWin) return `cd ${quotedPath}`;
	else return `cd ${escapedPath}`;
}
function getVenvPythonPath(venvPath) {
	return isWin ? `${venvPath}\\Scripts\\python.exe` : `${venvPath}/bin/python`;
}
function parseCustomArg(item) {
	const { custom, value } = item;
	if (!custom) return void 0;
	let commandArg = void 0;
	let line = void 0;
	switch (custom.kind) {
		case "envVar":
			if (custom.type === "CheckBox") {
				const isTrue = value === void 0 || value === true || value === "true" || value === "";
				line = isWin ? `set ${item.name}=${isTrue ? "true" : "false"}` : `export ${item.name}="${isTrue ? "true" : "false"}"`;
			} else line = isWin ? `set ${item.name}=${item.value}` : `export ${item.name}="${item.value}"`;
			break;
		case "commandLine":
			if (custom.type === "CheckBox") {
				if (value === void 0 || value === true || value === "true" || value === "") commandArg = `${item.name}`;
			} else if (custom.type === "File" || custom.type === "Directory") commandArg = `${item.name} "${item.value}"`;
			else commandArg = `${item.name} ${item.value}`;
			break;
		case "custom":
			line = value;
			break;
		case "comment":
			line = scriptCommentStr + " " + value;
			break;
		default: return;
	}
	return {
		commandArg,
		line
	};
}
//#endregion
//#region node_modules/lodash-es/_freeGlobal.js
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
//#endregion
//#region node_modules/lodash-es/_root.js
/** Detect free variable `self`. */
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function("return this")();
//#endregion
//#region node_modules/lodash-es/_Symbol.js
/** Built-in value references. */
var Symbol$1 = root.Symbol;
//#endregion
//#region node_modules/lodash-es/_getRawTag.js
/** Used for built-in method references. */
var objectProto$3 = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$10 = objectProto$3.hasOwnProperty;
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString$1 = objectProto$3.toString;
/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
/**
* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the raw `toStringTag`.
*/
function getRawTag(value) {
	var isOwn = hasOwnProperty$10.call(value, symToStringTag$1), tag = value[symToStringTag$1];
	try {
		value[symToStringTag$1] = void 0;
		var unmasked = true;
	} catch (e) {}
	var result = nativeObjectToString$1.call(value);
	if (unmasked) {
		if (isOwn) value[symToStringTag$1] = tag;
		else delete value[symToStringTag$1];
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/_objectToString.js
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString = Object.prototype.toString;
/**
* Converts `value` to a string using `Object.prototype.toString`.
*
* @private
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
*/
function objectToString(value) {
	return nativeObjectToString.call(value);
}
//#endregion
//#region node_modules/lodash-es/_baseGetTag.js
/** `Object#toString` result references. */
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
/**
* The base implementation of `getTag` without fallbacks for buggy environments.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
function baseGetTag(value) {
	if (value == null) return value === void 0 ? undefinedTag : nullTag;
	return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
//#endregion
//#region node_modules/lodash-es/isObjectLike.js
/**
* Checks if `value` is object-like. A value is object-like if it's not `null`
* and has a `typeof` result of "object".
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
* @example
*
* _.isObjectLike({});
* // => true
*
* _.isObjectLike([1, 2, 3]);
* // => true
*
* _.isObjectLike(_.noop);
* // => false
*
* _.isObjectLike(null);
* // => false
*/
function isObjectLike(value) {
	return value != null && typeof value == "object";
}
//#endregion
//#region node_modules/lodash-es/isArray.js
/**
* Checks if `value` is classified as an `Array` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an array, else `false`.
* @example
*
* _.isArray([1, 2, 3]);
* // => true
*
* _.isArray(document.body.children);
* // => false
*
* _.isArray('abc');
* // => false
*
* _.isArray(_.noop);
* // => false
*/
var isArray = Array.isArray;
//#endregion
//#region node_modules/lodash-es/isObject.js
/**
* Checks if `value` is the
* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an object, else `false`.
* @example
*
* _.isObject({});
* // => true
*
* _.isObject([1, 2, 3]);
* // => true
*
* _.isObject(_.noop);
* // => true
*
* _.isObject(null);
* // => false
*/
function isObject(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}
//#endregion
//#region node_modules/lodash-es/isFunction.js
/** `Object#toString` result references. */
var asyncTag = "[object AsyncFunction]";
var funcTag$2 = "[object Function]";
var genTag$1 = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
/**
* Checks if `value` is classified as a `Function` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a function, else `false`.
* @example
*
* _.isFunction(_);
* // => true
*
* _.isFunction(/abc/);
* // => false
*/
function isFunction(value) {
	if (!isObject(value)) return false;
	var tag = baseGetTag(value);
	return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
//#endregion
//#region node_modules/lodash-es/_coreJsData.js
/** Used to detect overreaching core-js shims. */
var coreJsData = root["__core-js_shared__"];
//#endregion
//#region node_modules/lodash-es/_isMasked.js
/** Used to detect methods masquerading as native. */
var maskSrcKey = function() {
	var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
	return uid ? "Symbol(src)_1." + uid : "";
}();
/**
* Checks if `func` has its source masked.
*
* @private
* @param {Function} func The function to check.
* @returns {boolean} Returns `true` if `func` is masked, else `false`.
*/
function isMasked(func) {
	return !!maskSrcKey && maskSrcKey in func;
}
//#endregion
//#region node_modules/lodash-es/_toSource.js
/** Used to resolve the decompiled source of functions. */
var funcToString$1 = Function.prototype.toString;
/**
* Converts `func` to its source code.
*
* @private
* @param {Function} func The function to convert.
* @returns {string} Returns the source code.
*/
function toSource(func) {
	if (func != null) {
		try {
			return funcToString$1.call(func);
		} catch (e) {}
		try {
			return func + "";
		} catch (e) {}
	}
	return "";
}
//#endregion
//#region node_modules/lodash-es/_baseIsNative.js
/**
* Used to match `RegExp`
* [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
*/
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto$2 = Object.prototype;
/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;
/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$2.hasOwnProperty;
/** Used to detect if a method is native. */
var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/**
* The base implementation of `_.isNative` without bad shim checks.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a native function,
*  else `false`.
*/
function baseIsNative(value) {
	if (!isObject(value) || isMasked(value)) return false;
	return (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
}
//#endregion
//#region node_modules/lodash-es/_getValue.js
/**
* Gets the value at `key` of `object`.
*
* @private
* @param {Object} [object] The object to query.
* @param {string} key The key of the property to get.
* @returns {*} Returns the property value.
*/
function getValue(object, key) {
	return object == null ? void 0 : object[key];
}
//#endregion
//#region node_modules/lodash-es/_getNative.js
/**
* Gets the native function at `key` of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {string} key The key of the method to get.
* @returns {*} Returns the function if it's native, else `undefined`.
*/
function getNative(object, key) {
	var value = getValue(object, key);
	return baseIsNative(value) ? value : void 0;
}
//#endregion
//#region node_modules/lodash-es/_WeakMap.js
var WeakMap = getNative(root, "WeakMap");
//#endregion
//#region node_modules/lodash-es/_baseCreate.js
/** Built-in value references. */
var objectCreate = Object.create;
/**
* The base implementation of `_.create` without support for assigning
* properties to the created object.
*
* @private
* @param {Object} proto The object to inherit from.
* @returns {Object} Returns the new object.
*/
var baseCreate = function() {
	function object() {}
	return function(proto) {
		if (!isObject(proto)) return {};
		if (objectCreate) return objectCreate(proto);
		object.prototype = proto;
		var result = new object();
		object.prototype = void 0;
		return result;
	};
}();
//#endregion
//#region node_modules/lodash-es/_copyArray.js
/**
* Copies the values of `source` to `array`.
*
* @private
* @param {Array} source The array to copy values from.
* @param {Array} [array=[]] The array to copy values to.
* @returns {Array} Returns `array`.
*/
function copyArray(source, array) {
	var index = -1, length = source.length;
	array || (array = Array(length));
	while (++index < length) array[index] = source[index];
	return array;
}
//#endregion
//#region node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
	try {
		var func = getNative(Object, "defineProperty");
		func({}, "", {});
		return func;
	} catch (e) {}
}();
//#endregion
//#region node_modules/lodash-es/_arrayEach.js
/**
* A specialized version of `_.forEach` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns `array`.
*/
function arrayEach(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (iteratee(array[index], index, array) === false) break;
	return array;
}
//#endregion
//#region node_modules/lodash-es/_isIndex.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
* Checks if `value` is a valid array-like index.
*
* @private
* @param {*} value The value to check.
* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
*/
function isIndex(value, length) {
	var type = typeof value;
	length = length == null ? MAX_SAFE_INTEGER$1 : length;
	return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
//#endregion
//#region node_modules/lodash-es/_baseAssignValue.js
/**
* The base implementation of `assignValue` and `assignMergeValue` without
* value checks.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function baseAssignValue(object, key, value) {
	if (key == "__proto__" && defineProperty) defineProperty(object, key, {
		"configurable": true,
		"enumerable": true,
		"value": value,
		"writable": true
	});
	else object[key] = value;
}
//#endregion
//#region node_modules/lodash-es/eq.js
/**
* Performs a
* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* comparison between two values to determine if they are equivalent.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to compare.
* @param {*} other The other value to compare.
* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
* @example
*
* var object = { 'a': 1 };
* var other = { 'a': 1 };
*
* _.eq(object, object);
* // => true
*
* _.eq(object, other);
* // => false
*
* _.eq('a', 'a');
* // => true
*
* _.eq('a', Object('a'));
* // => false
*
* _.eq(NaN, NaN);
* // => true
*/
function eq(value, other) {
	return value === other || value !== value && other !== other;
}
//#endregion
//#region node_modules/lodash-es/_assignValue.js
/** Used to check objects for own properties. */
var hasOwnProperty$8 = Object.prototype.hasOwnProperty;
/**
* Assigns `value` to `key` of `object` if the existing value is not equivalent
* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons.
*
* @private
* @param {Object} object The object to modify.
* @param {string} key The key of the property to assign.
* @param {*} value The value to assign.
*/
function assignValue(object, key, value) {
	var objValue = object[key];
	if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) baseAssignValue(object, key, value);
}
//#endregion
//#region node_modules/lodash-es/_copyObject.js
/**
* Copies properties of `source` to `object`.
*
* @private
* @param {Object} source The object to copy properties from.
* @param {Array} props The property identifiers to copy.
* @param {Object} [object={}] The object to copy properties to.
* @param {Function} [customizer] The function to customize copied values.
* @returns {Object} Returns `object`.
*/
function copyObject(source, props, object, customizer) {
	var isNew = !object;
	object || (object = {});
	var index = -1, length = props.length;
	while (++index < length) {
		var key = props[index];
		var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
		if (newValue === void 0) newValue = source[key];
		if (isNew) baseAssignValue(object, key, newValue);
		else assignValue(object, key, newValue);
	}
	return object;
}
//#endregion
//#region node_modules/lodash-es/isLength.js
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
* Checks if `value` is a valid array-like length.
*
* **Note:** This method is loosely based on
* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
* @example
*
* _.isLength(3);
* // => true
*
* _.isLength(Number.MIN_VALUE);
* // => false
*
* _.isLength(Infinity);
* // => false
*
* _.isLength('3');
* // => false
*/
function isLength(value) {
	return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
//#endregion
//#region node_modules/lodash-es/isArrayLike.js
/**
* Checks if `value` is array-like. A value is considered array-like if it's
* not a function and has a `value.length` that's an integer greater than or
* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
* @example
*
* _.isArrayLike([1, 2, 3]);
* // => true
*
* _.isArrayLike(document.body.children);
* // => true
*
* _.isArrayLike('abc');
* // => true
*
* _.isArrayLike(_.noop);
* // => false
*/
function isArrayLike(value) {
	return value != null && isLength(value.length) && !isFunction(value);
}
//#endregion
//#region node_modules/lodash-es/_isPrototype.js
/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/**
* Checks if `value` is likely a prototype object.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
*/
function isPrototype(value) {
	var Ctor = value && value.constructor;
	return value === (typeof Ctor == "function" && Ctor.prototype || objectProto$1);
}
//#endregion
//#region node_modules/lodash-es/_baseTimes.js
/**
* The base implementation of `_.times` without support for iteratee shorthands
* or max array length checks.
*
* @private
* @param {number} n The number of times to invoke `iteratee`.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the array of results.
*/
function baseTimes(n, iteratee) {
	var index = -1, result = Array(n);
	while (++index < n) result[index] = iteratee(index);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_baseIsArguments.js
/** `Object#toString` result references. */
var argsTag$2 = "[object Arguments]";
/**
* The base implementation of `_.isArguments`.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*/
function baseIsArguments(value) {
	return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
//#endregion
//#region node_modules/lodash-es/isArguments.js
/** Used for built-in method references. */
var objectProto = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto.hasOwnProperty;
/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto.propertyIsEnumerable;
/**
* Checks if `value` is likely an `arguments` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an `arguments` object,
*  else `false`.
* @example
*
* _.isArguments(function() { return arguments; }());
* // => true
*
* _.isArguments([1, 2, 3]);
* // => false
*/
var isArguments = baseIsArguments(function() {
	return arguments;
}()) ? baseIsArguments : function(value) {
	return isObjectLike(value) && hasOwnProperty$7.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
//#endregion
//#region node_modules/lodash-es/stubFalse.js
/**
* This method returns `false`.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {boolean} Returns `false`.
* @example
*
* _.times(2, _.stubFalse);
* // => [false, false]
*/
function stubFalse() {
	return false;
}
//#endregion
//#region node_modules/lodash-es/isBuffer.js
/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer$1 = freeModule$2 && freeModule$2.exports === freeExports$2 ? root.Buffer : void 0;
/**
* Checks if `value` is a buffer.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
* @example
*
* _.isBuffer(new Buffer(2));
* // => true
*
* _.isBuffer(new Uint8Array(2));
* // => false
*/
var isBuffer = (Buffer$1 ? Buffer$1.isBuffer : void 0) || stubFalse;
//#endregion
//#region node_modules/lodash-es/_baseIsTypedArray.js
/** `Object#toString` result references. */
var argsTag$1 = "[object Arguments]";
var arrayTag$1 = "[object Array]";
var boolTag$2 = "[object Boolean]";
var dateTag$2 = "[object Date]";
var errorTag$1 = "[object Error]";
var funcTag$1 = "[object Function]";
var mapTag$6 = "[object Map]";
var numberTag$2 = "[object Number]";
var objectTag$2 = "[object Object]";
var regexpTag$2 = "[object RegExp]";
var setTag$6 = "[object Set]";
var stringTag$2 = "[object String]";
var weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]";
var dataViewTag$3 = "[object DataView]";
var float32Tag$2 = "[object Float32Array]";
var float64Tag$2 = "[object Float64Array]";
var int8Tag$2 = "[object Int8Array]";
var int16Tag$2 = "[object Int16Array]";
var int32Tag$2 = "[object Int32Array]";
var uint8Tag$2 = "[object Uint8Array]";
var uint8ClampedTag$2 = "[object Uint8ClampedArray]";
var uint16Tag$2 = "[object Uint16Array]";
var uint32Tag$2 = "[object Uint32Array]";
/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$6] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$6] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
/**
* The base implementation of `_.isTypedArray` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
*/
function baseIsTypedArray(value) {
	return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
//#endregion
//#region node_modules/lodash-es/_baseUnary.js
/**
* The base implementation of `_.unary` without support for storing metadata.
*
* @private
* @param {Function} func The function to cap arguments for.
* @returns {Function} Returns the new capped function.
*/
function baseUnary(func) {
	return function(value) {
		return func(value);
	};
}
//#endregion
//#region node_modules/lodash-es/_nodeUtil.js
/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
/** Detect free variable `process` from Node.js. */
var freeProcess = freeModule$1 && freeModule$1.exports === freeExports$1 && freeGlobal.process;
/** Used to access faster Node.js helpers. */
var nodeUtil = function() {
	try {
		var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
		if (types) return types;
		return freeProcess && freeProcess.binding && freeProcess.binding("util");
	} catch (e) {}
}();
//#endregion
//#region node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
* Checks if `value` is classified as a typed array.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
* @example
*
* _.isTypedArray(new Uint8Array);
* // => true
*
* _.isTypedArray([]);
* // => false
*/
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
//#endregion
//#region node_modules/lodash-es/_arrayLikeKeys.js
/** Used to check objects for own properties. */
var hasOwnProperty$6 = Object.prototype.hasOwnProperty;
/**
* Creates an array of the enumerable property names of the array-like `value`.
*
* @private
* @param {*} value The value to query.
* @param {boolean} inherited Specify returning inherited property names.
* @returns {Array} Returns the array of property names.
*/
function arrayLikeKeys(value, inherited) {
	var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
	for (var key in value) if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_overArg.js
/**
* Creates a unary function that invokes `func` with its argument transformed.
*
* @private
* @param {Function} func The function to wrap.
* @param {Function} transform The argument transform.
* @returns {Function} Returns the new function.
*/
function overArg(func, transform) {
	return function(arg) {
		return func(transform(arg));
	};
}
//#endregion
//#region node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg(Object.keys, Object);
//#endregion
//#region node_modules/lodash-es/_baseKeys.js
/** Used to check objects for own properties. */
var hasOwnProperty$5 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeys(object) {
	if (!isPrototype(object)) return nativeKeys(object);
	var result = [];
	for (var key in Object(object)) if (hasOwnProperty$5.call(object, key) && key != "constructor") result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/keys.js
/**
* Creates an array of the own enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects. See the
* [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* for more details.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keys(new Foo);
* // => ['a', 'b'] (iteration order is not guaranteed)
*
* _.keys('hi');
* // => ['0', '1']
*/
function keys(object) {
	return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
//#endregion
//#region node_modules/lodash-es/_nativeKeysIn.js
/**
* This function is like
* [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
* except that it includes inherited enumerable properties.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function nativeKeysIn(object) {
	var result = [];
	if (object != null) for (var key in Object(object)) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_baseKeysIn.js
/** Used to check objects for own properties. */
var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
*/
function baseKeysIn(object) {
	if (!isObject(object)) return nativeKeysIn(object);
	var isProto = isPrototype(object), result = [];
	for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty$4.call(object, key)))) result.push(key);
	return result;
}
//#endregion
//#region node_modules/lodash-es/keysIn.js
/**
* Creates an array of the own and inherited enumerable property names of `object`.
*
* **Note:** Non-object values are coerced to objects.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Object
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names.
* @example
*
* function Foo() {
*   this.a = 1;
*   this.b = 2;
* }
*
* Foo.prototype.c = 3;
*
* _.keysIn(new Foo);
* // => ['a', 'b', 'c'] (iteration order is not guaranteed)
*/
function keysIn(object) {
	return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
//#endregion
//#region node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative(Object, "create");
//#endregion
//#region node_modules/lodash-es/_hashClear.js
/**
* Removes all key-value entries from the hash.
*
* @private
* @name clear
* @memberOf Hash
*/
function hashClear() {
	this.__data__ = nativeCreate ? nativeCreate(null) : {};
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_hashDelete.js
/**
* Removes `key` and its value from the hash.
*
* @private
* @name delete
* @memberOf Hash
* @param {Object} hash The hash to modify.
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function hashDelete(key) {
	var result = this.has(key) && delete this.__data__[key];
	this.size -= result ? 1 : 0;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_hashGet.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
/** Used to check objects for own properties. */
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
/**
* Gets the hash value for `key`.
*
* @private
* @name get
* @memberOf Hash
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function hashGet(key) {
	var data = this.__data__;
	if (nativeCreate) {
		var result = data[key];
		return result === HASH_UNDEFINED$1 ? void 0 : result;
	}
	return hasOwnProperty$3.call(data, key) ? data[key] : void 0;
}
//#endregion
//#region node_modules/lodash-es/_hashHas.js
/** Used to check objects for own properties. */
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
/**
* Checks if a hash value for `key` exists.
*
* @private
* @name has
* @memberOf Hash
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function hashHas(key) {
	var data = this.__data__;
	return nativeCreate ? data[key] !== void 0 : hasOwnProperty$2.call(data, key);
}
//#endregion
//#region node_modules/lodash-es/_hashSet.js
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = "__lodash_hash_undefined__";
/**
* Sets the hash `key` to `value`.
*
* @private
* @name set
* @memberOf Hash
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the hash instance.
*/
function hashSet(key, value) {
	var data = this.__data__;
	this.size += this.has(key) ? 0 : 1;
	data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_Hash.js
/**
* Creates a hash object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Hash(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
//#endregion
//#region node_modules/lodash-es/_listCacheClear.js
/**
* Removes all key-value entries from the list cache.
*
* @private
* @name clear
* @memberOf ListCache
*/
function listCacheClear() {
	this.__data__ = [];
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_assocIndexOf.js
/**
* Gets the index at which the `key` is found in `array` of key-value pairs.
*
* @private
* @param {Array} array The array to inspect.
* @param {*} key The key to search for.
* @returns {number} Returns the index of the matched value, else `-1`.
*/
function assocIndexOf(array, key) {
	var length = array.length;
	while (length--) if (eq(array[length][0], key)) return length;
	return -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheDelete.js
/** Built-in value references. */
var splice = Array.prototype.splice;
/**
* Removes `key` and its value from the list cache.
*
* @private
* @name delete
* @memberOf ListCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function listCacheDelete(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) return false;
	if (index == data.length - 1) data.pop();
	else splice.call(data, index, 1);
	--this.size;
	return true;
}
//#endregion
//#region node_modules/lodash-es/_listCacheGet.js
/**
* Gets the list cache value for `key`.
*
* @private
* @name get
* @memberOf ListCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function listCacheGet(key) {
	var data = this.__data__, index = assocIndexOf(data, key);
	return index < 0 ? void 0 : data[index][1];
}
//#endregion
//#region node_modules/lodash-es/_listCacheHas.js
/**
* Checks if a list cache value for `key` exists.
*
* @private
* @name has
* @memberOf ListCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function listCacheHas(key) {
	return assocIndexOf(this.__data__, key) > -1;
}
//#endregion
//#region node_modules/lodash-es/_listCacheSet.js
/**
* Sets the list cache `key` to `value`.
*
* @private
* @name set
* @memberOf ListCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the list cache instance.
*/
function listCacheSet(key, value) {
	var data = this.__data__, index = assocIndexOf(data, key);
	if (index < 0) {
		++this.size;
		data.push([key, value]);
	} else data[index][1] = value;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_ListCache.js
/**
* Creates an list cache object.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function ListCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
//#endregion
//#region node_modules/lodash-es/_Map.js
var Map$1 = getNative(root, "Map");
//#endregion
//#region node_modules/lodash-es/_mapCacheClear.js
/**
* Removes all key-value entries from the map.
*
* @private
* @name clear
* @memberOf MapCache
*/
function mapCacheClear() {
	this.size = 0;
	this.__data__ = {
		"hash": new Hash(),
		"map": new (Map$1 || ListCache)(),
		"string": new Hash()
	};
}
//#endregion
//#region node_modules/lodash-es/_isKeyable.js
/**
* Checks if `value` is suitable for use as unique object key.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is suitable, else `false`.
*/
function isKeyable(value) {
	var type = typeof value;
	return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
//#endregion
//#region node_modules/lodash-es/_getMapData.js
/**
* Gets the data for `map`.
*
* @private
* @param {Object} map The map to query.
* @param {string} key The reference key.
* @returns {*} Returns the map data.
*/
function getMapData(map, key) {
	var data = map.__data__;
	return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheDelete.js
/**
* Removes `key` and its value from the map.
*
* @private
* @name delete
* @memberOf MapCache
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function mapCacheDelete(key) {
	var result = getMapData(this, key)["delete"](key);
	this.size -= result ? 1 : 0;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_mapCacheGet.js
/**
* Gets the map value for `key`.
*
* @private
* @name get
* @memberOf MapCache
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function mapCacheGet(key) {
	return getMapData(this, key).get(key);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheHas.js
/**
* Checks if a map value for `key` exists.
*
* @private
* @name has
* @memberOf MapCache
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function mapCacheHas(key) {
	return getMapData(this, key).has(key);
}
//#endregion
//#region node_modules/lodash-es/_mapCacheSet.js
/**
* Sets the map `key` to `value`.
*
* @private
* @name set
* @memberOf MapCache
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the map cache instance.
*/
function mapCacheSet(key, value) {
	var data = getMapData(this, key), size = data.size;
	data.set(key, value);
	this.size += data.size == size ? 0 : 1;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_MapCache.js
/**
* Creates a map cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function MapCache(entries) {
	var index = -1, length = entries == null ? 0 : entries.length;
	this.clear();
	while (++index < length) {
		var entry = entries[index];
		this.set(entry[0], entry[1]);
	}
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
//#endregion
//#region node_modules/lodash-es/_arrayPush.js
/**
* Appends the elements of `values` to `array`.
*
* @private
* @param {Array} array The array to modify.
* @param {Array} values The values to append.
* @returns {Array} Returns `array`.
*/
function arrayPush(array, values) {
	var index = -1, length = values.length, offset = array.length;
	while (++index < length) array[offset + index] = values[index];
	return array;
}
//#endregion
//#region node_modules/lodash-es/_getPrototype.js
/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);
//#endregion
//#region node_modules/lodash-es/_stackClear.js
/**
* Removes all key-value entries from the stack.
*
* @private
* @name clear
* @memberOf Stack
*/
function stackClear() {
	this.__data__ = new ListCache();
	this.size = 0;
}
//#endregion
//#region node_modules/lodash-es/_stackDelete.js
/**
* Removes `key` and its value from the stack.
*
* @private
* @name delete
* @memberOf Stack
* @param {string} key The key of the value to remove.
* @returns {boolean} Returns `true` if the entry was removed, else `false`.
*/
function stackDelete(key) {
	var data = this.__data__, result = data["delete"](key);
	this.size = data.size;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_stackGet.js
/**
* Gets the stack value for `key`.
*
* @private
* @name get
* @memberOf Stack
* @param {string} key The key of the value to get.
* @returns {*} Returns the entry value.
*/
function stackGet(key) {
	return this.__data__.get(key);
}
//#endregion
//#region node_modules/lodash-es/_stackHas.js
/**
* Checks if a stack value for `key` exists.
*
* @private
* @name has
* @memberOf Stack
* @param {string} key The key of the entry to check.
* @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
*/
function stackHas(key) {
	return this.__data__.has(key);
}
//#endregion
//#region node_modules/lodash-es/_stackSet.js
/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/**
* Sets the stack `key` to `value`.
*
* @private
* @name set
* @memberOf Stack
* @param {string} key The key of the value to set.
* @param {*} value The value to set.
* @returns {Object} Returns the stack cache instance.
*/
function stackSet(key, value) {
	var data = this.__data__;
	if (data instanceof ListCache) {
		var pairs = data.__data__;
		if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
			pairs.push([key, value]);
			this.size = ++data.size;
			return this;
		}
		data = this.__data__ = new MapCache(pairs);
	}
	data.set(key, value);
	this.size = data.size;
	return this;
}
//#endregion
//#region node_modules/lodash-es/_Stack.js
/**
* Creates a stack cache object to store key-value pairs.
*
* @private
* @constructor
* @param {Array} [entries] The key-value pairs to cache.
*/
function Stack(entries) {
	var data = this.__data__ = new ListCache(entries);
	this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
//#endregion
//#region node_modules/lodash-es/_baseAssign.js
/**
* The base implementation of `_.assign` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssign(object, source) {
	return object && copyObject(source, keys(source), object);
}
//#endregion
//#region node_modules/lodash-es/_baseAssignIn.js
/**
* The base implementation of `_.assignIn` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssignIn(object, source) {
	return object && copyObject(source, keysIn(source), object);
}
//#endregion
//#region node_modules/lodash-es/_cloneBuffer.js
/** Detect free variable `exports`. */
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0;
var allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
/**
* Creates a clone of  `buffer`.
*
* @private
* @param {Buffer} buffer The buffer to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Buffer} Returns the cloned buffer.
*/
function cloneBuffer(buffer, isDeep) {
	if (isDeep) return buffer.slice();
	var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	buffer.copy(result);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_arrayFilter.js
/**
* A specialized version of `_.filter` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {Array} Returns the new filtered array.
*/
function arrayFilter(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
	while (++index < length) {
		var value = array[index];
		if (predicate(value, index, array)) result[resIndex++] = value;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/stubArray.js
/**
* This method returns a new empty array.
*
* @static
* @memberOf _
* @since 4.13.0
* @category Util
* @returns {Array} Returns the new empty array.
* @example
*
* var arrays = _.times(2, _.stubArray);
*
* console.log(arrays);
* // => [[], []]
*
* console.log(arrays[0] === arrays[1]);
* // => false
*/
function stubArray() {
	return [];
}
//#endregion
//#region node_modules/lodash-es/_getSymbols.js
/** Built-in value references. */
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
* Creates an array of the own enumerable symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of symbols.
*/
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	if (object == null) return [];
	object = Object(object);
	return arrayFilter(nativeGetSymbols(object), function(symbol) {
		return propertyIsEnumerable.call(object, symbol);
	});
};
//#endregion
//#region node_modules/lodash-es/_copySymbols.js
/**
* Copies own symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbols(source, object) {
	return copyObject(source, getSymbols(source), object);
}
//#endregion
//#region node_modules/lodash-es/_getSymbolsIn.js
/**
* Creates an array of the own and inherited enumerable symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of symbols.
*/
var getSymbolsIn = !Object.getOwnPropertySymbols ? stubArray : function(object) {
	var result = [];
	while (object) {
		arrayPush(result, getSymbols(object));
		object = getPrototype(object);
	}
	return result;
};
//#endregion
//#region node_modules/lodash-es/_copySymbolsIn.js
/**
* Copies own and inherited symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbolsIn(source, object) {
	return copyObject(source, getSymbolsIn(source), object);
}
//#endregion
//#region node_modules/lodash-es/_baseGetAllKeys.js
/**
* The base implementation of `getAllKeys` and `getAllKeysIn` which uses
* `keysFunc` and `symbolsFunc` to get the enumerable property names and
* symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Function} keysFunc The function to get the keys of `object`.
* @param {Function} symbolsFunc The function to get the symbols of `object`.
* @returns {Array} Returns the array of property names and symbols.
*/
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	var result = keysFunc(object);
	return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
//#endregion
//#region node_modules/lodash-es/_getAllKeys.js
/**
* Creates an array of own enumerable property names and symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names and symbols.
*/
function getAllKeys(object) {
	return baseGetAllKeys(object, keys, getSymbols);
}
//#endregion
//#region node_modules/lodash-es/_getAllKeysIn.js
/**
* Creates an array of own and inherited enumerable property names and
* symbols of `object`.
*
* @private
* @param {Object} object The object to query.
* @returns {Array} Returns the array of property names and symbols.
*/
function getAllKeysIn(object) {
	return baseGetAllKeys(object, keysIn, getSymbolsIn);
}
//#endregion
//#region node_modules/lodash-es/_DataView.js
var DataView = getNative(root, "DataView");
//#endregion
//#region node_modules/lodash-es/_Promise.js
var Promise$1 = getNative(root, "Promise");
//#endregion
//#region node_modules/lodash-es/_Set.js
var Set$1 = getNative(root, "Set");
//#endregion
//#region node_modules/lodash-es/_getTag.js
/** `Object#toString` result references. */
var mapTag$5 = "[object Map]";
var objectTag$1 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag$5 = "[object Set]";
var weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView);
var mapCtorString = toSource(Map$1);
var promiseCtorString = toSource(Promise$1);
var setCtorString = toSource(Set$1);
var weakMapCtorString = toSource(WeakMap);
/**
* Gets the `toStringTag` of `value`.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
var getTag = baseGetTag;
if (DataView && getTag(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag(new Map$1()) != mapTag$5 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$5 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) getTag = function(value) {
	var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
	if (ctorString) switch (ctorString) {
		case dataViewCtorString: return dataViewTag$2;
		case mapCtorString: return mapTag$5;
		case promiseCtorString: return promiseTag;
		case setCtorString: return setTag$5;
		case weakMapCtorString: return weakMapTag$1;
	}
	return result;
};
var _getTag_default = getTag;
//#endregion
//#region node_modules/lodash-es/_initCloneArray.js
/** Used to check objects for own properties. */
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
/**
* Initializes an array clone.
*
* @private
* @param {Array} array The array to clone.
* @returns {Array} Returns the initialized clone.
*/
function initCloneArray(array) {
	var length = array.length, result = new array.constructor(length);
	if (length && typeof array[0] == "string" && hasOwnProperty$1.call(array, "index")) {
		result.index = array.index;
		result.input = array.input;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/_Uint8Array.js
/** Built-in value references. */
var Uint8Array$1 = root.Uint8Array;
//#endregion
//#region node_modules/lodash-es/_cloneArrayBuffer.js
/**
* Creates a clone of `arrayBuffer`.
*
* @private
* @param {ArrayBuffer} arrayBuffer The array buffer to clone.
* @returns {ArrayBuffer} Returns the cloned array buffer.
*/
function cloneArrayBuffer(arrayBuffer) {
	var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneDataView.js
/**
* Creates a clone of `dataView`.
*
* @private
* @param {Object} dataView The data view to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned data view.
*/
function cloneDataView(dataView, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
//#endregion
//#region node_modules/lodash-es/_cloneRegExp.js
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;
/**
* Creates a clone of `regexp`.
*
* @private
* @param {Object} regexp The regexp to clone.
* @returns {Object} Returns the cloned regexp.
*/
function cloneRegExp(regexp) {
	var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	result.lastIndex = regexp.lastIndex;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneSymbol.js
/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
/**
* Creates a clone of the `symbol` object.
*
* @private
* @param {Object} symbol The symbol object to clone.
* @returns {Object} Returns the cloned symbol object.
*/
function cloneSymbol(symbol) {
	return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
//#endregion
//#region node_modules/lodash-es/_cloneTypedArray.js
/**
* Creates a clone of `typedArray`.
*
* @private
* @param {Object} typedArray The typed array to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned typed array.
*/
function cloneTypedArray(typedArray, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
//#endregion
//#region node_modules/lodash-es/_initCloneByTag.js
/** `Object#toString` result references. */
var boolTag$1 = "[object Boolean]";
var dateTag$1 = "[object Date]";
var mapTag$4 = "[object Map]";
var numberTag$1 = "[object Number]";
var regexpTag$1 = "[object RegExp]";
var setTag$4 = "[object Set]";
var stringTag$1 = "[object String]";
var symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]";
var dataViewTag$1 = "[object DataView]";
var float32Tag$1 = "[object Float32Array]";
var float64Tag$1 = "[object Float64Array]";
var int8Tag$1 = "[object Int8Array]";
var int16Tag$1 = "[object Int16Array]";
var int32Tag$1 = "[object Int32Array]";
var uint8Tag$1 = "[object Uint8Array]";
var uint8ClampedTag$1 = "[object Uint8ClampedArray]";
var uint16Tag$1 = "[object Uint16Array]";
var uint32Tag$1 = "[object Uint32Array]";
/**
* Initializes an object clone based on its `toStringTag`.
*
* **Note:** This function only supports cloning values with tags of
* `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
*
* @private
* @param {Object} object The object to clone.
* @param {string} tag The `toStringTag` of the object to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneByTag(object, tag, isDeep) {
	var Ctor = object.constructor;
	switch (tag) {
		case arrayBufferTag$1: return cloneArrayBuffer(object);
		case boolTag$1:
		case dateTag$1: return new Ctor(+object);
		case dataViewTag$1: return cloneDataView(object, isDeep);
		case float32Tag$1:
		case float64Tag$1:
		case int8Tag$1:
		case int16Tag$1:
		case int32Tag$1:
		case uint8Tag$1:
		case uint8ClampedTag$1:
		case uint16Tag$1:
		case uint32Tag$1: return cloneTypedArray(object, isDeep);
		case mapTag$4: return new Ctor();
		case numberTag$1:
		case stringTag$1: return new Ctor(object);
		case regexpTag$1: return cloneRegExp(object);
		case setTag$4: return new Ctor();
		case symbolTag$1: return cloneSymbol(object);
	}
}
//#endregion
//#region node_modules/lodash-es/_initCloneObject.js
/**
* Initializes an object clone.
*
* @private
* @param {Object} object The object to clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneObject(object) {
	return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
//#endregion
//#region node_modules/lodash-es/_baseIsMap.js
/** `Object#toString` result references. */
var mapTag$3 = "[object Map]";
/**
* The base implementation of `_.isMap` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a map, else `false`.
*/
function baseIsMap(value) {
	return isObjectLike(value) && _getTag_default(value) == mapTag$3;
}
//#endregion
//#region node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil && nodeUtil.isMap;
/**
* Checks if `value` is classified as a `Map` object.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a map, else `false`.
* @example
*
* _.isMap(new Map);
* // => true
*
* _.isMap(new WeakMap);
* // => false
*/
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
//#endregion
//#region node_modules/lodash-es/_baseIsSet.js
/** `Object#toString` result references. */
var setTag$3 = "[object Set]";
/**
* The base implementation of `_.isSet` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a set, else `false`.
*/
function baseIsSet(value) {
	return isObjectLike(value) && _getTag_default(value) == setTag$3;
}
//#endregion
//#region node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil && nodeUtil.isSet;
/**
* Checks if `value` is classified as a `Set` object.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a set, else `false`.
* @example
*
* _.isSet(new Set);
* // => true
*
* _.isSet(new WeakSet);
* // => false
*/
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
//#endregion
//#region node_modules/lodash-es/_baseClone.js
/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG$1 = 4;
/** `Object#toString` result references. */
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var mapTag$2 = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag$2 = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$2] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag$2] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
/**
* The base implementation of `_.clone` and `_.cloneDeep` which tracks
* traversed objects.
*
* @private
* @param {*} value The value to clone.
* @param {boolean} bitmask The bitmask flags.
*  1 - Deep clone
*  2 - Flatten inherited properties
*  4 - Clone symbols
* @param {Function} [customizer] The function to customize cloning.
* @param {string} [key] The key of `value`.
* @param {Object} [object] The parent object of `value`.
* @param {Object} [stack] Tracks traversed objects and their clone counterparts.
* @returns {*} Returns the cloned value.
*/
function baseClone(value, bitmask, customizer, key, object, stack) {
	var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
	if (customizer) result = object ? customizer(value, key, object, stack) : customizer(value);
	if (result !== void 0) return result;
	if (!isObject(value)) return value;
	var isArr = isArray(value);
	if (isArr) {
		result = initCloneArray(value);
		if (!isDeep) return copyArray(value, result);
	} else {
		var tag = _getTag_default(value), isFunc = tag == funcTag || tag == genTag;
		if (isBuffer(value)) return cloneBuffer(value, isDeep);
		if (tag == objectTag || tag == argsTag || isFunc && !object) {
			result = isFlat || isFunc ? {} : initCloneObject(value);
			if (!isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
		} else {
			if (!cloneableTags[tag]) return object ? value : {};
			result = initCloneByTag(value, tag, isDeep);
		}
	}
	stack || (stack = new Stack());
	var stacked = stack.get(value);
	if (stacked) return stacked;
	stack.set(value, result);
	if (isSet(value)) value.forEach(function(subValue) {
		result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	});
	else if (isMap(value)) value.forEach(function(subValue, key) {
		result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	var props = isArr ? void 0 : (isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys)(value);
	arrayEach(props || value, function(subValue, key) {
		if (props) {
			key = subValue;
			subValue = value[key];
		}
		assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	return result;
}
//#endregion
//#region node_modules/lodash-es/cloneDeep.js
/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;
var CLONE_SYMBOLS_FLAG = 4;
/**
* This method is like `_.clone` except that it recursively clones `value`.
*
* @static
* @memberOf _
* @since 1.0.0
* @category Lang
* @param {*} value The value to recursively clone.
* @returns {*} Returns the deep cloned value.
* @see _.clone
* @example
*
* var objects = [{ 'a': 1 }, { 'b': 2 }];
*
* var deep = _.cloneDeep(objects);
* console.log(deep[0] === objects[0]);
* // => false
*/
function cloneDeep(value) {
	return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
//#endregion
//#region node_modules/lodash-es/isEmpty.js
/** `Object#toString` result references. */
var mapTag$1 = "[object Map]";
var setTag$1 = "[object Set]";
/** Used to check objects for own properties. */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
* Checks if `value` is an empty object, collection, map, or set.
*
* Objects are considered empty if they have no own enumerable string keyed
* properties.
*
* Array-like values such as `arguments` objects, arrays, buffers, strings, or
* jQuery-like collections are considered empty if they have a `length` of `0`.
* Similarly, maps and sets are considered empty if they have a `size` of `0`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is empty, else `false`.
* @example
*
* _.isEmpty(null);
* // => true
*
* _.isEmpty(true);
* // => true
*
* _.isEmpty(1);
* // => true
*
* _.isEmpty([1, 2, 3]);
* // => false
*
* _.isEmpty({ 'a': 1 });
* // => false
*/
function isEmpty(value) {
	if (value == null) return true;
	if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) return !value.length;
	var tag = _getTag_default(value);
	if (tag == mapTag$1 || tag == setTag$1) return !value.size;
	if (isPrototype(value)) return !baseKeys(value).length;
	for (var key in value) if (hasOwnProperty.call(value, key)) return false;
	return true;
}
//#endregion
//#region module/src/utils/rendererUtils.ts
function isValidArg(name, Arguments) {
	if (isEmpty(name)) return false;
	for (const argument of Arguments) if ("sections" in argument) {
		for (const section of argument.sections) if (section.items.some((item) => item.name === name)) return true;
	} else if (argument.items.some((item) => item.name === name)) return true;
	return false;
}
function getArgumentByName(name, Arguments) {
	if (isEmpty(name)) return void 0;
	for (const argument of Arguments) if ("sections" in argument) for (const section of argument.sections) {
		const found = section.items.find((item) => item.name === name);
		if (found) return found;
	}
	else {
		const found = argument.items.find((item) => item.name === name);
		if (found) return found;
	}
}
function getArgumentType(name, Arguments) {
	return getArgumentByName(name, Arguments)?.type || void 0;
}
function replaceAddress(input) {
	return input.replace(/http:\/\/0\.0\.0\.0:(\d+)/g, "http://localhost:$1");
}
function catchAddress$5(input) {
	for (const pattern of [
		/https?:\/\/localhost(?::\d+)?/i,
		/https?:\/\/127\.0\.0\.1(?::\d+)?/i,
		/https?:\/\/0\.0\.0\.0(?::\d+)?/i,
		/https?:\/\/\[::1](?::\d+)?/i,
		/https?:\/\/(?:[\w-]+\.)*localhost(?::\d+)?/i
	]) {
		const match = input.match(pattern);
		if (match) return replaceAddress(match[0]);
	}
}
function removeEscapes(str) {
	return str.replace(/\\(.)/gm, "$1");
}
function GitInstaller(title, url, stepper, locateExisting) {
	stepper.initialSteps([
		title,
		"Clone",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(url).then((dir) => {
				stepper.setInstalled(dir);
				stepper.showFinalStep("success", `${title} installation complete!`, `All installation steps completed successfully. Your ${title} environment is now ready for use.`);
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, url).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", `${title} located successfully!`, `Pre-installed ${title} detected. Installation skipped as your existing setup is ready to use.`);
			} else if (locateExisting) stepper.utils.verifyFilesExist(targetDirectory, locateExisting).then((isExist) => {
				if (isExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", `${title} located successfully!`, `Detected a manual installation of ${title}. Note: Because this is not a Git repository, automatic updates and certain version-dependent features may not work as expected.`);
				} else stepper.showFinalStep("error", `Unable to locate ${title}!`, `Please ensure you have selected the correct folder containing the ${title} repository.`);
			});
			else stepper.showFinalStep("error", `Unable to locate ${title}!`, `Please ensure you have selected the correct folder containing the ${title} repository.`);
		});
	});
}
async function CardInfo(url, extensionFolder, api, callback) {
	const dir = api.installationFolder;
	if (!dir) return;
	callback.setOpenFolders([dir]);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Installed On",
				result: "loading"
			},
			{
				label: "Last Updated",
				result: "loading"
			},
			{
				label: "Update Tag",
				result: "loading"
			},
			{
				label: "Release Notes",
				result: "loading"
			}
		]
	}, {
		title: "Disk Usage",
		items: [{
			label: "Total Size",
			result: "loading"
		}, {
			label: "Extensions Size",
			result: "loading"
		}]
	}], callback);
	api.getFolderCreationTime(dir).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.getLastPulledDate(dir).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.getCurrentReleaseTag(dir).then((result) => {
		if (result && result !== "No tag found") {
			descManager.updateItem(0, 2, result);
			descManager.updateItem(0, 3, `${url}/releases/tag/${result}`);
		} else {
			descManager.updateItem(0, 2, void 0);
			descManager.updateItem(0, 3, void 0);
		}
	});
	if (extensionFolder) api.getFolderSize(dir + extensionFolder).then((result) => {
		descManager.updateItem(1, 1, formatSize(result));
	});
	else descManager.updateItem(1, 1, void 0);
	api.getFolderSize(dir).then((result) => {
		descManager.updateItem(1, 0, formatSize(result));
	});
}
const isMultiFilePreviewSupported = typeof window !== "undefined" && window.LynxHub && window.LynxHub.buildNumber > 55;
//#endregion
//#region module/src/containers/agent/AntigravityCli/Arguments.ts
const antigravityCliArguments = [
	{
		category: "LynxHub Configuration",
		items: [{
			name: "Settings File Location",
			description: "Optional path to a settings.json file. If set, LynxHub writes JSON here from the Settings section.",
			type: "File"
		}]
	},
	{
		category: "Environment Variables",
		sections: [{
			section: "API & Provider Options",
			items: [{
				name: "GEMINI_API_KEY",
				description: "Optional Gemini API key for Antigravity CLI.",
				type: "Input"
			}, {
				name: "ANTIGRAVITY_API_KEY",
				description: "Optional Antigravity API key or token.",
				type: "Input"
			}]
		}, {
			section: "Networking & Proxy",
			items: [{
				name: "HTTPS_PROXY",
				description: "HTTPS proxy URL for Antigravity CLI network traffic.",
				type: "Input"
			}, {
				name: "HTTP_PROXY",
				description: "HTTP proxy URL for Antigravity CLI network traffic.",
				type: "Input"
			}]
		}]
	},
	{
		category: "Command Line Arguments",
		sections: [{
			section: "Core Execution Options",
			items: [
				{
					name: "--model <model_name>",
					description: "Model for the current CLI session.",
					type: "Input"
				},
				{
					name: "-p <prompt>",
					description: "Run a single prompt non-interactively and print the response.",
					type: "Input"
				},
				{
					name: "--prompt-interactive <prompt>",
					description: "Run an initial prompt interactively and continue the session.",
					type: "Input"
				},
				{
					name: "--continue",
					description: "Continue the most recent conversation.",
					type: "CheckBox"
				},
				{
					name: "--conversation <session_id>",
					description: "Resume a previous conversation by ID.",
					type: "Input"
				},
				{
					name: "--add-dir <directory_path>",
					description: "Add a directory to the workspace (repeatable).",
					type: "Directory"
				},
				{
					name: "--dangerously-skip-permissions",
					description: "Auto-approve all tool permission requests without prompting.",
					type: "CheckBox"
				},
				{
					name: "--sandbox",
					description: "Run in a sandbox with terminal restrictions enabled.",
					type: "CheckBox"
				},
				{
					name: "--log-file <file_path>",
					description: "Override CLI log file path.",
					type: "File"
				},
				{
					name: "--print-timeout <duration>",
					description: "Timeout for print mode wait (default 5m0s).",
					type: "Input"
				}
			]
		}]
	},
	{
		category: "Settings",
		sections: [
			{
				section: "General & Appearance",
				items: [
					{
						name: "colorScheme",
						description: "Color theme: \"light\", \"solarized light\", \"colorblind-friendly light\", \"dark\", \"solarized dark\", \"colorblind-friendly dark\", \"tokyo night\", or \"terminal\".",
						type: "Input"
					},
					{
						name: "altScreenMode",
						description: "Screen buffer usage: \"default\", \"always\", or \"never\".",
						type: "Input"
					},
					{
						name: "verbosity",
						description: "Visual verbosity level: \"high\" (full thoughts and tool outputs) or \"low\" (minimal indicator).",
						type: "Input"
					},
					{
						name: "runningLightSpeed",
						description: "Progress animation speed: \"fast\", \"medium\", \"slow\", or \"off\".",
						type: "Input"
					},
					{
						name: "showTips",
						description: "Display helpful agentic tips above the prompt panel during generation turns.",
						type: "CheckBox"
					},
					{
						name: "showFeedbackSurvey",
						description: "Display periodic quality feedback surveys upon task completions.",
						type: "CheckBox"
					},
					{
						name: "notifications",
						description: "Emit system desktop and terminal bell notifications upon task completion.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "Security & Permissions",
				items: [
					{
						name: "toolPermission",
						description: "Global safety presets: \"request-review\", \"proceed-in-sandbox\", \"always-proceed\", or \"strict\".",
						type: "Input"
					},
					{
						name: "artifactReviewPolicy",
						description: "Code review policy: \"asks-for-review\", \"agent-decides\", or \"always-proceed\".",
						type: "Input"
					},
					{
						name: "enableTerminalSandbox",
						description: "Restrict all local execution commands launched by agents to OS containment rings.",
						type: "CheckBox"
					},
					{
						name: "allowNonWorkspaceAccess",
						description: "Permit file read/write tools to navigate outside recognized workspace roots.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "Account & Telemetry",
				items: [
					{
						name: "useG1Credits",
						description: "Use personal AI credits for model calls once plan quotas are exhausted.",
						type: "CheckBox"
					},
					{
						name: "enableTelemetry",
						description: "Permit metric collection and crash log streaming to improve tool reliability.",
						type: "CheckBox"
					},
					{
						name: "editor",
						description: "Target text editor utility (\"auto\", \"vim\", \"emacs\").",
						type: "Input"
					}
				]
			}
		]
	}
];
//#endregion
//#region module/src/containers/agent/AntigravityCli/RendererMethods.ts
const INSTALL_TIME_KEY$8 = "install-time-antigravityCli";
const UPDATE_TIME_KEY$8 = "update-time-antigravityCli";
const UPDATE_AVAILABLE_KEY$6 = "update-available-version-antigravityCli";
function checkEnvLine$2(line) {
	if (isWin && line.startsWith("set ")) return "set";
	if (line.startsWith("export ")) return "export";
	const varName = line.split("=")[0].trim();
	for (const arg of antigravityCliArguments) if (arg.category === "Environment Variables" && "sections" in arg) {
		for (const section of arg.sections) if (section.items.some((item) => item.name === varName)) return "var";
	}
}
function getArgumentInfo$3(argName) {
	for (const data of antigravityCliArguments) if ("sections" in data) {
		for (const section of data.sections) for (const item of section.items) if (item.name.split(" ")[0] === argName) return {
			category: data.category,
			type: item.type,
			name: item.name
		};
	}
}
function parseArgsToFiles$4(args) {
	const executeCommand = "agy";
	const envArgs = [];
	const cliArgs = [];
	const settingsArgs = [];
	args.forEach((arg) => {
		const info = getArgumentInfo$3(arg.name.split(" ")[0]) || getArgumentInfo$3(arg.name);
		if (info) switch (info.category) {
			case "Environment Variables":
				envArgs.push(arg);
				break;
			case "Command Line Arguments":
				cliArgs.push(arg);
				break;
			case "Settings": settingsArgs.push(arg);
		}
	});
	let scriptString = "";
	if (envArgs.length > 0) {
		envArgs.forEach((arg) => {
			scriptString += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
		});
		scriptString += "\n\n";
	}
	scriptString += executeCommand;
	cliArgs.forEach((arg) => {
		const info = getArgumentInfo$3(arg.name.split(" ")[0]) || getArgumentInfo$3(arg.name);
		if (!info) return;
		const flagName = info.name.split(" ")[0];
		if (info.type === "CheckBox") {
			if (arg.value !== "false" && arg.value !== false && arg.value !== 0 && String(arg.value) !== "0") scriptString += ` ${flagName}`;
		} else if (arg.value !== void 0 && arg.value !== null && String(arg.value).trim() !== "") scriptString += ` ${flagName} "${arg.value}"`;
	});
	scriptString += "\n";
	let settingsString = "";
	const settingsJson = {};
	if (settingsArgs.length > 0) {
		settingsArgs.forEach((arg) => {
			const keys = arg.name.split(".");
			let current = settingsJson;
			keys.slice(0, -1).forEach((key) => {
				current[key] = current[key] || {};
				current = current[key];
			});
			let value = arg.value;
			if (String(value) === "true") value = true;
			else if (String(value) === "false") value = false;
			current[keys[keys.length - 1]] = value;
		});
		if (!isEmpty(settingsJson)) settingsString = JSON.stringify(settingsJson, null, 2);
	}
	return {
		scriptData: scriptString,
		settingsData: settingsString
	};
}
function parseArgsToString$23(args) {
	const { settingsData, scriptData } = parseArgsToFiles$4(args);
	const scriptTitle = `Script File Preview (${isWin ? ".bat" : ".sh"})`;
	const scriptContent = !isEmpty(scriptData) ? scriptData : "# No environment variables or command line arguments configured.\n";
	const settingsTitle = "Settings File (settings.json)";
	const settingsContent = !isEmpty(settingsData) ? settingsData : "{\n  // No settings configured.\n}";
	if (isMultiFilePreviewSupported) return [{
		title: scriptTitle,
		data: scriptContent
	}, {
		title: settingsTitle,
		data: settingsContent
	}];
	return `${`-------------${scriptTitle}-------------\n${scriptContent}`}${`---------------- ${settingsTitle} ----------------\n${settingsContent}`}`;
}
function parseFilesToArgs$4(scriptContent, settingsContent) {
	const scriptArgs = parseStringToArgs$23(scriptContent);
	const settingsArgs = [];
	if (settingsContent) try {
		const settingsJson = JSON.parse(settingsContent);
		const flatten = (obj, path = "") => {
			let result = [];
			for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const newPath = path ? `${path}.${key}` : key;
				if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) result = result.concat(flatten(obj[key], newPath));
				else {
					const value = typeof obj[key] === "string" ? obj[key] : JSON.stringify(obj[key]);
					result.push({
						name: newPath,
						value
					});
				}
			}
			return result;
		};
		flatten(settingsJson).forEach((arg) => {
			if (isValidArg(arg.name, antigravityCliArguments)) settingsArgs.push(arg);
		});
	} catch (error) {
		console.error("Error parsing settings content for Antigravity CLI:", error);
	}
	const combinedArgs = /* @__PURE__ */ new Map();
	scriptArgs.forEach((arg) => combinedArgs.set(arg.name, arg.value));
	settingsArgs.forEach((arg) => combinedArgs.set(arg.name, arg.value));
	return Array.from(combinedArgs, ([name, value]) => ({
		name,
		value
	}));
}
function parseStringToArgs$23(data) {
	const argResult = [];
	data.split("\n").forEach((line) => {
		if (line.startsWith("#")) return;
		if (line.startsWith("agy")) {
			const clArg = line.substring(3).trim();
			if (!clArg) return;
			const tokenRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g;
			const tokens = [];
			let tokenMatch;
			while ((tokenMatch = tokenRegex.exec(clArg)) !== null) tokens.push(tokenMatch[1] ?? tokenMatch[2] ?? tokenMatch[3]);
			for (let i = 0; i < tokens.length; i++) {
				const flag = tokens[i];
				if (!flag.startsWith("-")) continue;
				const info = getArgumentInfo$3(flag);
				if (!info) continue;
				if (getArgumentType(info.name, antigravityCliArguments) === "CheckBox") argResult.push({
					name: info.name,
					value: "true"
				});
				else {
					const nextToken = tokens[i + 1];
					if (nextToken && !nextToken.startsWith("-")) {
						argResult.push({
							name: info.name,
							value: nextToken.replace(/"/g, "")
						});
						i++;
					} else argResult.push({
						name: info.name,
						value: ""
					});
				}
			}
		}
		const lineType = checkEnvLine$2(line);
		if (lineType === "export" || lineType === "set") {
			let [name, value] = line.replace(`${lineType} `, "").split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, antigravityCliArguments)) argResult.push({
				name,
				value
			});
		} else if (checkEnvLine$2(line) === "var") {
			let [name, value] = line.split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, antigravityCliArguments)) argResult.push({
				name,
				value
			});
		}
	});
	return argResult;
}
function startInstall$22(stepper) {
	stepper.initialSteps([
		"Getting Started",
		"Detect Existing",
		"Antigravity CLI",
		"All Done!"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking for existing Antigravity CLI installation...");
			stepper.ipc.invoke("is_antigravity_cli_installed").then((isInstalled) => {
				if (isInstalled) {
					stepper.setInstalled();
					const currentDate = /* @__PURE__ */ new Date();
					stepper.storage.set(INSTALL_TIME_KEY$8, currentDate.toLocaleString());
					stepper.showFinalStep("success", "You're All Set!", "Antigravity CLI is already installed and ready to use.");
				} else stepper.nextStep().then(() => {
					const installCommand = isWin ? "irm https://antigravity.google/cli/install.ps1 | iex" : "curl -fsSL https://antigravity.google/cli/install.sh | bash";
					stepper.executeTerminalCommands(installCommand).then(() => {
						stepper.setInstalled();
						const currentDate = /* @__PURE__ */ new Date();
						stepper.storage.set(INSTALL_TIME_KEY$8, currentDate.toLocaleString());
						stepper.showFinalStep("success", "Installation Complete!", "Antigravity CLI has been installed successfully.");
					});
				});
			});
		});
	});
}
function startUpdate$10(stepper) {
	stepper.initialSteps(["Update Antigravity CLI", "Complete Update"]);
	stepper.executeTerminalCommands("agy update").then(() => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(UPDATE_TIME_KEY$8, currentDate.toLocaleString());
		stepper.setUpdated();
		stepper.showFinalStep("success", "Antigravity CLI Updated Successfully!", "Antigravity CLI has been updated to the latest available version.");
	});
}
async function cardInfo$22(api, callback) {
	callback.setOpenFolders(void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			},
			{
				label: "Latest Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INSTALL_TIME_KEY$8).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.storage.get(UPDATE_TIME_KEY$8).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.ipc.invoke("current_antigravity_cli_version").then((result) => {
		descManager.updateItem(0, 2, result);
	});
	api.storage.get(UPDATE_AVAILABLE_KEY$6).then((result) => {
		descManager.updateItem(0, 3, result);
	});
}
const AntigravityCli_RM = {
	cardInfo: cardInfo$22,
	parseStringToArgs: parseStringToArgs$23,
	parseArgsToString: parseArgsToString$23,
	manager: {
		startInstall: startInstall$22,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$10
		}
	}
};
//#endregion
//#region module/src/containers/agent/ClaudeCode/Arguments.ts
const claudeCodeArguments = [
	{
		category: "LynxHub Configuration",
		items: [{
			name: "Settings File Location",
			description: "Optional path to a claude settings.json file. If set, LynxHub writes JSON here from the Settings section.",
			type: "File"
		}]
	},
	{
		category: "Environment Variables",
		sections: [
			{
				section: "Core Authentication",
				items: [
					{
						name: "ANTHROPIC_API_KEY",
						description: "Your Anthropic API key used by Claude Code.",
						type: "Input"
					},
					{
						name: "ANTHROPIC_AUTH_TOKEN",
						description: "Custom value for the Authorization header (prefixed with Bearer).",
						type: "Input"
					},
					{
						name: "ANTHROPIC_BASE_URL",
						description: "Override the API endpoint to route requests through a proxy or gateway.",
						type: "Input"
					}
				]
			},
			{
				section: "Telemetry & OpenTelemetry",
				items: [
					{
						name: "CLAUDE_CODE_ENABLE_TELEMETRY",
						description: "Enable Claude Code telemetry collection when set to 1.",
						type: "Input"
					},
					{
						name: "DISABLE_TELEMETRY",
						description: "Set to 1 to disable telemetry collection.",
						type: "Input"
					},
					{
						name: "OTEL_METRICS_EXPORTER",
						description: "OpenTelemetry metrics exporter (otlp, prometheus, console).",
						type: "Input"
					},
					{
						name: "OTEL_LOGS_EXPORTER",
						description: "OpenTelemetry logs exporter (otlp, console).",
						type: "Input"
					},
					{
						name: "OTEL_EXPORTER_OTLP_PROTOCOL",
						description: "OTLP protocol, usually grpc or http.",
						type: "Input"
					},
					{
						name: "OTEL_EXPORTER_OTLP_ENDPOINT",
						description: "OTLP collector endpoint such as http://localhost:4317.",
						type: "Input"
					},
					{
						name: "OTEL_EXPORTER_OTLP_HEADERS",
						description: "Optional OTLP authentication headers as a single string.",
						type: "Input"
					},
					{
						name: "OTEL_METRIC_EXPORT_INTERVAL",
						description: "Metric export interval in milliseconds.",
						type: "Input"
					},
					{
						name: "OTEL_LOGS_EXPORT_INTERVAL",
						description: "Log export interval in milliseconds.",
						type: "Input"
					}
				]
			},
			{
				section: "Vertex AI & Agent Platform",
				items: [
					{
						name: "CLAUDE_CODE_USE_VERTEX",
						description: "Set to 1 to enable Google Vertex AI / Agent Platform integration.",
						type: "Input"
					},
					{
						name: "CLOUD_ML_REGION",
						description: "Default Vertex AI region, e.g. global or us-east5.",
						type: "Input"
					},
					{
						name: "ANTHROPIC_VERTEX_PROJECT_ID",
						description: "Google Cloud project ID used for Vertex AI.",
						type: "Input"
					},
					{
						name: "DISABLE_PROMPT_CACHING",
						description: "Set to 1 to disable prompt caching when using Vertex AI.",
						type: "Input"
					}
				]
			},
			{
				section: "Amazon Bedrock",
				items: [
					{
						name: "CLAUDE_CODE_USE_BEDROCK",
						description: "Set to 1 to enable Amazon Bedrock integration.",
						type: "Input"
					},
					{
						name: "AWS_REGION",
						description: "Default AWS region for Bedrock, e.g. us-east-1.",
						type: "Input"
					},
					{
						name: "AWS_PROFILE",
						description: "Optional AWS profile name to use when calling Bedrock.",
						type: "Input"
					}
				]
			},
			{
				section: "Networking & Proxy",
				items: [
					{
						name: "HTTPS_PROXY",
						description: "HTTPS proxy URL for Claude Code network traffic.",
						type: "Input"
					},
					{
						name: "HTTP_PROXY",
						description: "HTTP proxy URL for Claude Code network traffic.",
						type: "Input"
					},
					{
						name: "NO_PROXY",
						description: "Space or comma separated list of hosts to bypass the proxy.",
						type: "Input"
					},
					{
						name: "API_TIMEOUT_MS",
						description: "Timeout for API requests in milliseconds (default: 600000).",
						type: "Input"
					},
					{
						name: "CLAUDE_CODE_GIT_BASH_PATH",
						description: "Custom path to bash.exe when using portable Git on Windows.",
						type: "Input"
					}
				]
			},
			{
				section: "AWS Credentials",
				items: [
					{
						name: "AWS_ACCESS_KEY_ID",
						description: "AWS access key for Bedrock or other AWS integrations.",
						type: "Input"
					},
					{
						name: "AWS_SECRET_ACCESS_KEY",
						description: "AWS secret access key.",
						type: "Input"
					},
					{
						name: "AWS_SESSION_TOKEN",
						description: "Optional AWS session token when using temporary credentials.",
						type: "Input"
					}
				]
			}
		]
	},
	{
		category: "Command Line Arguments",
		sections: [
			{
				section: "Core",
				items: [
					{
						name: "--model <model_name>",
						description: "Claude model to use for this session (e.g. opus, sonnet, haiku, or a full model name).",
						type: "Input"
					},
					{
						name: "-p <prompt>",
						description: "Run in non-interactive print mode and answer the given prompt to standard output.",
						type: "Input"
					},
					{
						name: "--resume <session_id>",
						description: "Resume a previous Claude Code session by ID or name.",
						type: "Input"
					},
					{
						name: "--continue",
						description: "Continue the most recent session in current directory without prompt.",
						type: "CheckBox"
					},
					{
						name: "--output-format <format>",
						description: "Output format for print mode (text, json, stream-json).",
						type: "Input"
					},
					{
						name: "--effort <level>",
						description: "Set effort level for session (low, medium, high, xhigh, max, ultracode).",
						type: "Input"
					},
					{
						name: "--fallback-model <models>",
						description: "Automatic fallback model(s) when primary model is overloaded (comma-separated).",
						type: "Input"
					},
					{
						name: "--bg",
						description: "Start session as a background agent and return immediately.",
						type: "CheckBox"
					},
					{
						name: "--bare",
						description: "Minimal mode: skip auto-discovery of hooks, skills, plugins, MCP servers.",
						type: "CheckBox"
					},
					{
						name: "--safe-mode",
						description: "Start with all customizations disabled to troubleshoot broken configurations.",
						type: "CheckBox"
					},
					{
						name: "--worktree <name>",
						description: "Start Claude in an isolated git worktree at .claude/worktrees/<name>.",
						type: "Input"
					}
				]
			},
			{
				section: "Permissions",
				items: [
					{
						name: "--permission-mode <mode>",
						description: "Permission mode (default, acceptEdits, plan, auto, dontAsk, bypassPermissions, manual).",
						type: "Input"
					},
					{
						name: "--permission-prompt-tool <tool>",
						description: "Tool to use when prompting for permissions in print mode, such as mcp_auth_tool.",
						type: "Input"
					},
					{
						name: "--dangerously-skip-permissions",
						description: "Skip permission prompts. Equivalent to bypassPermissions mode.",
						type: "CheckBox"
					},
					{
						name: "--allow-dangerously-skip-permissions",
						description: "Add bypassPermissions to Shift+Tab mode cycle without starting in it.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "Tools and Directories",
				items: [
					{
						name: "--tools <tools>",
						description: "Restrict which built-in tools Claude can use (e.g. \"Bash,Edit,Read\").",
						type: "Input"
					},
					{
						name: "--allowedTools <tools>",
						description: "Comma or space separated list of tools Claude may use without extra confirmation.",
						type: "Input"
					},
					{
						name: "--disallowedTools <tools>",
						description: "Comma or space separated list of tools Claude should not use automatically.",
						type: "Input"
					},
					{
						name: "--add-dir <dir1,dir2,...>",
						description: "Additional directories for Claude to treat as part of the workspace.",
						type: "Directory"
					},
					{
						name: "--system-prompt <prompt>",
						description: "Replace the entire system prompt with custom text string.",
						type: "Input"
					},
					{
						name: "--system-prompt-file <file>",
						description: "File path containing a custom system prompt replacing the default prompt.",
						type: "File"
					},
					{
						name: "--append-system-prompt <prompt>",
						description: "Append custom text to the end of default system prompt.",
						type: "Input"
					},
					{
						name: "--append-system-prompt-file <file>",
						description: "File path containing text to append to the default system prompt.",
						type: "File"
					},
					{
						name: "--mcp-config <file>",
						description: "Load MCP servers from JSON files or strings (space-separated).",
						type: "File"
					},
					{
						name: "--strict-mcp-config",
						description: "Only use MCP servers from --mcp-config, ignoring all other MCP configurations.",
						type: "CheckBox"
					},
					{
						name: "--settings <file>",
						description: "Path to a settings JSON file or inline JSON overriding settings.json.",
						type: "File"
					}
				]
			}
		]
	},
	{
		category: "Settings",
		sections: [
			{
				section: "Core",
				items: [
					{
						name: "settings.raw",
						description: "Optional raw JSON for settings.json. If provided, it is written as-is and other Settings keys are ignored.",
						type: "Input"
					},
					{
						name: "model",
						description: "Default Claude model in settings.json. Used when CLI --model is not provided.",
						type: "Input"
					},
					{
						name: "effortLevel",
						description: "Persist default effort level across sessions (low, medium, high, xhigh).",
						type: "Input"
					},
					{
						name: "fallbackModel",
						description: "Fallback model chain array (e.g. [\"sonnet\", \"haiku\"]) when primary is overloaded.",
						type: "Input"
					},
					{
						name: "fastMode",
						description: "Turn fast mode on for sessions where available.",
						type: "CheckBox"
					},
					{
						name: "editorMode",
						description: "Key binding mode for the input prompt (normal, vim).",
						type: "Input"
					},
					{
						name: "autoUpdatesChannel",
						description: "Release channel to follow for updates (latest, stable).",
						type: "Input"
					}
				]
			},
			{
				section: "Permissions",
				items: [{
					name: "permissions.defaultMode",
					description: "Default permission mode, for example plan or active.",
					type: "Input"
				}]
			},
			{
				section: "Telemetry & Env",
				items: [
					{
						name: "env.CLAUDE_CODE_ENABLE_TELEMETRY",
						description: "Enable telemetry via env section in settings.json.",
						type: "Input"
					},
					{
						name: "env.OTEL_METRICS_EXPORTER",
						description: "Telemetry metrics exporter configured in settings.json env.",
						type: "Input"
					},
					{
						name: "env.OTEL_LOGS_EXPORTER",
						description: "Telemetry logs exporter configured in settings.json env.",
						type: "Input"
					}
				]
			},
			{
				section: "Sandbox",
				items: [
					{
						name: "sandbox.enabled",
						description: "Enable Claude Code sandbox in settings.json.",
						type: "CheckBox"
					},
					{
						name: "sandbox.autoAllowBashIfSandboxed",
						description: "Automatically allow bash commands when sandbox is enabled.",
						type: "CheckBox"
					},
					{
						name: "sandbox.excludedCommands",
						description: "Commands to exclude from sandbox execution, such as docker.",
						type: "Input"
					},
					{
						name: "sandbox.network.allowUnixSockets",
						description: "Comma separated list of Unix socket paths allowed inside the sandbox.",
						type: "Input"
					},
					{
						name: "sandbox.network.allowLocalBinding",
						description: "Whether local network binding is allowed inside the sandbox.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "Plugins & Marketplaces",
				items: [{
					name: "enabledPlugins",
					description: "JSON map of enabled plugins (plugin@marketplace: true/false).",
					type: "Input"
				}, {
					name: "extraKnownMarketplaces",
					description: "JSON map defining extra plugin marketplaces for Claude Code.",
					type: "Input"
				}]
			},
			{
				section: "Status Line",
				items: [
					{
						name: "statusLine.type",
						description: "Status line type, usually command.",
						type: "Input"
					},
					{
						name: "statusLine.command",
						description: "Command to generate the status line content.",
						type: "Input"
					},
					{
						name: "statusLine.padding",
						description: "Optional numeric padding value for the status line.",
						type: "Input"
					}
				]
			},
			{
				section: "MCP Servers",
				items: [{
					name: "allowedMcpServers",
					description: "JSON array or object describing MCP servers that are allowed by managed settings.",
					type: "Input"
				}, {
					name: "deniedMcpServers",
					description: "JSON array or object describing MCP servers that are denied by managed settings.",
					type: "Input"
				}]
			}
		]
	}
];
//#endregion
//#region module/src/containers/agent/ClaudeCode/RendererMethods.ts
const INSTALL_TIME_KEY$7 = "install-time-claudeCode";
const UPDATE_TIME_KEY$7 = "update-time-claudeCode";
function checkEnvLine$1(line) {
	if (isWin && line.startsWith("set ")) return "set";
	if (line.startsWith("export ")) return "export";
	const varName = line.split("=")[0].trim();
	for (const arg of claudeCodeArguments) if (arg.category === "Environment Variables" && "sections" in arg) {
		for (const section of arg.sections) if (section.items.some((item) => item.name === varName)) return "var";
	}
}
function getArgumentInfo$2(argName) {
	for (const data of claudeCodeArguments) if ("sections" in data) {
		for (const section of data.sections) for (const item of section.items) if (item.name.split(" ")[0] === argName) return {
			category: data.category,
			type: item.type,
			name: item.name
		};
	}
}
function parseArgsToFiles$3(args) {
	const executeCommand = "claude";
	const envArgs = [];
	const cliArgs = [];
	const settingsArgs = [];
	args.forEach((arg) => {
		const info = getArgumentInfo$2(arg.name.split(" ")[0]) || getArgumentInfo$2(arg.name);
		if (info) switch (info.category) {
			case "Environment Variables":
				envArgs.push(arg);
				break;
			case "Command Line Arguments":
				cliArgs.push(arg);
				break;
			case "Settings": settingsArgs.push(arg);
		}
		else if (arg.name === "Settings File Location") {}
	});
	let scriptString = "";
	if (envArgs.length > 0) {
		envArgs.forEach((arg) => {
			scriptString += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
		});
		scriptString += "\n\n";
	}
	scriptString += executeCommand;
	cliArgs.forEach((arg) => {
		const info = getArgumentInfo$2(arg.name.split(" ")[0]) || getArgumentInfo$2(arg.name);
		if (!info) return;
		const flagName = info.name.split(" ")[0];
		if (info.type === "CheckBox") {
			if (arg.value !== "false" && arg.value !== false && arg.value !== 0 && String(arg.value) !== "0") scriptString += ` ${flagName}`;
		} else if (arg.value !== void 0 && arg.value !== null && String(arg.value).trim() !== "") scriptString += ` ${flagName} "${arg.value}"`;
	});
	scriptString += "\n";
	let settingsString = "";
	const settingsJson = {};
	if (settingsArgs.length > 0) {
		const raw = settingsArgs.find((a) => a.name === "settings.raw");
		if (raw && raw.value) try {
			const parsed = JSON.parse(String(raw.value));
			Object.assign(settingsJson, parsed);
		} catch (e) {
			console.error("Error parsing settings.raw for Claude Code:", e);
		}
		else settingsArgs.forEach((arg) => {
			if (arg.name === "settings.raw") return;
			const keys = arg.name.split(".");
			let current = settingsJson;
			keys.slice(0, -1).forEach((key) => {
				current[key] = current[key] || {};
				current = current[key];
			});
			let value = arg.value;
			if (String(value) === "true") value = true;
			else if (String(value) === "false") value = false;
			else if (typeof value === "string" && !isNaN(Number(value)) && value.trim() !== "" && !isNaN(parseFloat(value))) value = Number(value);
			else if (typeof value === "string" && (value.trim().startsWith("[") || value.trim().startsWith("{") || [
				"enabledPlugins",
				"extraKnownMarketplaces",
				"allowedMcpServers",
				"deniedMcpServers"
			].includes(keys[0]))) try {
				value = JSON.parse(value);
			} catch {}
			current[keys[keys.length - 1]] = value;
		});
		if (!isEmpty(settingsJson)) settingsString = JSON.stringify(settingsJson, null, 2);
	}
	return {
		scriptData: scriptString,
		settingsData: settingsString
	};
}
function parseArgsToString$22(args) {
	const { settingsData, scriptData } = parseArgsToFiles$3(args);
	const scriptTitle = `Script File Preview (${isWin ? ".bat" : ".sh"})`;
	const scriptContent = !isEmpty(scriptData) ? scriptData : "# No environment variables or command line arguments configured.\n";
	const settingsTitle = "Settings File (settings.json)";
	const settingsContent = !isEmpty(settingsData) ? settingsData : "{\n  // No settings configured.\n}";
	if (isMultiFilePreviewSupported) return [{
		title: scriptTitle,
		data: scriptContent
	}, {
		title: settingsTitle,
		data: settingsContent
	}];
	return `${`-------------${scriptTitle}-------------\n${scriptContent}`}${`---------------- ${settingsTitle} ----------------\n${settingsContent}`}`;
}
function parseFilesToArgs$3(scriptContent, settingsContent) {
	const scriptArgs = parseStringToArgs$22(scriptContent);
	const settingsArgs = [];
	if (settingsContent) try {
		const settingsJson = JSON.parse(settingsContent);
		const flatten = (obj, path = "") => {
			let result = [];
			for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const newPath = path ? `${path}.${key}` : key;
				if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) result = result.concat(flatten(obj[key], newPath));
				else {
					const value = typeof obj[key] === "string" ? obj[key] : JSON.stringify(obj[key]);
					result.push({
						name: newPath,
						value
					});
				}
			}
			return result;
		};
		flatten(settingsJson).forEach((arg) => {
			if (isValidArg(arg.name, claudeCodeArguments)) settingsArgs.push(arg);
		});
	} catch (error) {
		console.error("Error parsing settings.json content for Claude Code:", error);
	}
	const combinedArgs = /* @__PURE__ */ new Map();
	scriptArgs.forEach((arg) => combinedArgs.set(arg.name, arg.value));
	settingsArgs.forEach((arg) => combinedArgs.set(arg.name, arg.value));
	return Array.from(combinedArgs, ([name, value]) => ({
		name,
		value
	}));
}
function parseStringToArgs$22(data) {
	const argResult = [];
	data.split("\n").forEach((line) => {
		if (line.startsWith("#")) return;
		if (line.startsWith("claude")) {
			const clArg = line.substring(6).trim();
			if (!clArg) return;
			const tokenRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g;
			const tokens = [];
			let tokenMatch;
			while ((tokenMatch = tokenRegex.exec(clArg)) !== null) tokens.push(tokenMatch[1] ?? tokenMatch[2] ?? tokenMatch[3]);
			for (let i = 0; i < tokens.length; i++) {
				const flag = tokens[i];
				if (!flag.startsWith("-")) continue;
				const info = getArgumentInfo$2(flag);
				if (!info) continue;
				if (getArgumentType(info.name, claudeCodeArguments) === "CheckBox") argResult.push({
					name: info.name,
					value: "true"
				});
				else {
					const nextToken = tokens[i + 1];
					if (nextToken && !nextToken.startsWith("-")) {
						argResult.push({
							name: info.name,
							value: nextToken.replace(/"/g, "")
						});
						i++;
					} else argResult.push({
						name: info.name,
						value: ""
					});
				}
			}
		}
		const lineType = checkEnvLine$1(line);
		if (lineType === "export" || lineType === "set") {
			let [name, value] = line.replace(`${lineType} `, "").split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, claudeCodeArguments)) argResult.push({
				name,
				value
			});
		} else if (checkEnvLine$1(line) === "var") {
			let [name, value] = line.split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, claudeCodeArguments)) argResult.push({
				name,
				value
			});
		}
	});
	return argResult;
}
function startInstall$21(stepper) {
	stepper.initialSteps([
		"Getting Started",
		"Detect Existing",
		"Claude Code",
		"All Done!"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking for existing Claude Code installation...");
			stepper.ipc.invoke("is_claude_code_installed").then((isInstalled) => {
				if (isInstalled) {
					stepper.setInstalled();
					const currentDate = /* @__PURE__ */ new Date();
					stepper.storage.set(INSTALL_TIME_KEY$7, currentDate.toLocaleString());
					stepper.showFinalStep("success", "You're All Set!", "Claude Code is already installed and ready to use.");
				} else stepper.nextStep().then(() => {
					const installCommand = isWin ? "irm https://claude.ai/install.ps1 | iex" : "curl -fsSL https://claude.ai/install.sh | bash";
					stepper.executeTerminalCommands(installCommand).then(() => {
						stepper.setInstalled();
						const currentDate = /* @__PURE__ */ new Date();
						stepper.storage.set(INSTALL_TIME_KEY$7, currentDate.toLocaleString());
						stepper.showFinalStep("success", "Installation Complete!", "Claude Code has been installed successfully.");
					});
				});
			});
		});
	});
}
function startUpdate$9(stepper) {
	stepper.initialSteps(["Update Claude Code", "Complete Update"]);
	const installCommand = isWin ? "irm https://claude.ai/install.ps1 | iex" : "curl -fsSL https://claude.ai/install.sh | bash";
	stepper.executeTerminalCommands(installCommand).then(() => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(UPDATE_TIME_KEY$7, currentDate.toLocaleString());
		stepper.setUpdated();
		stepper.showFinalStep("success", "Claude Code Updated Successfully!", "Claude Code has been updated to the latest available version.");
	});
}
async function cardInfo$21(api, callback) {
	callback.setOpenFolders(void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INSTALL_TIME_KEY$7).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.storage.get(UPDATE_TIME_KEY$7).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.ipc.invoke("current_claude_code_version").then((result) => {
		descManager.updateItem(0, 2, result);
	});
}
const ClaudeCode_RM = {
	cardInfo: cardInfo$21,
	parseStringToArgs: parseStringToArgs$22,
	parseArgsToString: parseArgsToString$22,
	manager: {
		startInstall: startInstall$21,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$9
		}
	}
};
//#endregion
//#region module/src/containers/agent/Flowise/Arguments.ts
const flowiseArguments = [
	{
		category: "General",
		sections: [
			{
				section: "Basic Configuration",
				items: [
					{
						name: "--PORT",
						description: "The HTTP port Flowise runs on",
						type: "Input",
						defaultValue: 3e3
					},
					{
						name: "--APP_URL",
						description: "Public application URL",
						type: "Input",
						defaultValue: "http://localhost:3000"
					},
					{
						name: "--CORS_ORIGINS",
						description: "The allowed origins for all cross-origin HTTP calls",
						type: "Input"
					},
					{
						name: "--CORS_ALLOW_CREDENTIALS",
						description: "Allow credentials for cross-origin HTTP requests",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "--MCP_CORS_ORIGINS",
						description: "The allowed origins for MCP server cross-origin HTTP calls",
						type: "Input"
					},
					{
						name: "--IFRAME_ORIGINS",
						description: "The allowed origins for iframe src embedding",
						type: "Input"
					},
					{
						name: "--FLOWISE_USERNAME",
						description: "Username to login",
						type: "Input"
					},
					{
						name: "--FLOWISE_PASSWORD",
						description: "Password to login",
						type: "Input"
					},
					{
						name: "--FLOWISE_FILE_SIZE_LIMIT",
						description: "Upload File Size Limit",
						type: "Input",
						defaultValue: "50mb"
					},
					{
						name: "--NUMBER_OF_PROXIES",
						description: "Rate Limit Proxy count",
						type: "Input",
						defaultValue: 1
					}
				]
			},
			{
				section: "Logging",
				items: [
					{
						name: "--DEBUG",
						description: "Print logs from components",
						type: "CheckBox"
					},
					{
						name: "--LOG_PATH",
						description: "Location where log files are stored",
						type: "Input",
						defaultValue: "your-path/Flowise/logs"
					},
					{
						name: "--LOG_LEVEL",
						description: "Different levels of logs",
						type: "DropDown",
						values: [
							"error",
							"warn",
							"info",
							"verbose",
							"debug"
						],
						defaultValue: "info"
					},
					{
						name: "--LOG_JSON_SPACES",
						description: "Spaces to beautify JSON logs",
						type: "Input",
						defaultValue: 2
					},
					{
						name: "--LOG_SANITIZE_BODY_FIELDS",
						description: "Comma-separated list of request body fields to sanitize in logs",
						type: "Input",
						defaultValue: "password,pwd,pass,secret,token,apikey,api_key,accesstoken,access_token,refreshtoken,refresh_token,clientsecret,client_secret,privatekey,private_key,secretkey,secret_key,auth,authorization,credential,credentials"
					},
					{
						name: "--LOG_SANITIZE_HEADER_FIELDS",
						description: "Comma-separated list of HTTP header fields to sanitize in logs",
						type: "Input",
						defaultValue: "authorization,x-api-key,x-auth-token,cookie"
					}
				]
			},
			{
				section: "Tool Function Dependencies",
				items: [
					{
						name: "--TOOL_FUNCTION_BUILTIN_DEP",
						description: "NodeJS built-in modules to be used for Tool Function",
						type: "Input"
					},
					{
						name: "--TOOL_FUNCTION_EXTERNAL_DEP",
						description: "External modules to be used for Tool Function",
						type: "Input"
					},
					{
						name: "--ALLOW_BUILTIN_DEP",
						description: "Allow project dependencies to be used such as cheerio, typeorm",
						type: "CheckBox"
					}
				]
			}
		]
	},
	{
		category: "Database",
		condition: "DATABASE_TYPE === \"sqlite\"",
		sections: [{
			section: "SQLite Configuration",
			items: [{
				name: "--DATABASE_TYPE",
				description: "Type of database to store the flowise data",
				type: "DropDown",
				values: [
					"sqlite",
					"mysql",
					"postgres",
					"mariadb"
				],
				defaultValue: "sqlite"
			}, {
				name: "--DATABASE_PATH",
				description: "Location where database is saved (When DATABASE_TYPE is sqlite)",
				type: "Input",
				defaultValue: "your-home-dir/.flowise"
			}]
		}]
	},
	{
		category: "Database",
		condition: "DATABASE_TYPE !== \"sqlite\"",
		sections: [{
			section: "Database Configuration",
			items: [
				{
					name: "--DATABASE_TYPE",
					description: "Type of database to store the flowise data",
					type: "DropDown",
					values: [
						"sqlite",
						"mysql",
						"postgres",
						"mariadb"
					],
					defaultValue: "sqlite"
				},
				{
					name: "--DATABASE_HOST",
					description: "Host URL or IP address (When DATABASE_TYPE is not sqlite)",
					type: "Input"
				},
				{
					name: "--DATABASE_PORT",
					description: "Database port (When DATABASE_TYPE is not sqlite)",
					type: "Input"
				},
				{
					name: "--DATABASE_USER",
					description: "Database username (When DATABASE_TYPE is not sqlite)",
					type: "Input"
				},
				{
					name: "--DATABASE_PASSWORD",
					description: "Database password (When DATABASE_TYPE is not sqlite)",
					type: "Input"
				},
				{
					name: "--DATABASE_NAME",
					description: "Database name (When DATABASE_TYPE is not sqlite)",
					type: "Input"
				},
				{
					name: "--DATABASE_SSL_KEY_BASE64",
					description: "Database SSL client cert in base64 (takes priority over DATABASE_SSL)",
					type: "Input"
				},
				{
					name: "--DATABASE_REJECT_UNAUTHORIZED",
					description: "Reject unauthorized SSL certificates for database connection",
					type: "CheckBox",
					defaultValue: true
				}
			]
		}, {
			section: "Postgres Specific",
			items: [{
				name: "--DATABASE_SSL",
				description: "Database connection over SSL (When DATABASE_TYPE is postgres)",
				type: "CheckBox"
			}]
		}]
	},
	{
		category: "Encryption",
		condition: "SECRETKEY_STORAGE_TYPE === \"local\"",
		sections: [{
			section: "Encryption Key Storage",
			items: [
				{
					name: "--SECRETKEY_STORAGE_TYPE",
					description: "How to store the encryption key",
					type: "DropDown",
					values: ["local", "aws"],
					defaultValue: "local"
				},
				{
					name: "--SECRETKEY_PATH",
					description: "Local file path where encryption key is saved",
					type: "Input",
					defaultValue: "Flowise/packages/server"
				},
				{
					name: "--FLOWISE_SECRETKEY_OVERWRITE",
					description: "Encryption key to be used instead of the existing key",
					type: "Input"
				}
			]
		}]
	},
	{
		category: "Encryption",
		condition: "SECRETKEY_STORAGE_TYPE === \"aws\"",
		sections: [{
			section: "Encryption Key Storage",
			items: [
				{
					name: "--SECRETKEY_STORAGE_TYPE",
					description: "How to store the encryption key",
					type: "DropDown",
					values: ["local", "aws"],
					defaultValue: "local"
				},
				{
					name: "--SECRETKEY_AWS_ACCESS_KEY",
					description: "AWS Access Key for Secret Manager",
					type: "Input"
				},
				{
					name: "--SECRETKEY_AWS_SECRET_KEY",
					description: "AWS Secret Key for Secret Manager",
					type: "Input"
				},
				{
					name: "--SECRETKEY_AWS_REGION",
					description: "AWS Region for Secret Manager",
					type: "Input"
				},
				{
					name: "--SECRETKEY_AWS_NAME",
					description: "Secret name in AWS Secrets Manager",
					type: "Input",
					defaultValue: "FlowiseEncryptionKey"
				},
				{
					name: "--SECRETKEY_AWS_AUTH_PREFIX",
					description: "Prefix for auth secret names in AWS Secrets Manager",
					type: "Input",
					defaultValue: "Flowise"
				},
				{
					name: "--FLOWISE_SECRETKEY_OVERWRITE",
					description: "Encryption key to be used instead of the existing key",
					type: "Input"
				}
			]
		}]
	},
	{
		category: "Authentication",
		sections: [{
			section: "Auth Parameters & Tokens",
			items: [
				{
					name: "--JWT_ISSUER",
					description: "JWT token issuer name",
					type: "Input",
					defaultValue: "Flowise"
				},
				{
					name: "--JWT_AUDIENCE",
					description: "JWT token audience name",
					type: "Input",
					defaultValue: "Flowise"
				},
				{
					name: "--JWT_TOKEN_EXPIRY_IN_MINUTES",
					description: "JWT access token expiry time in minutes",
					type: "Input",
					defaultValue: 360
				},
				{
					name: "--JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES",
					description: "JWT refresh token expiry time in minutes",
					type: "Input",
					defaultValue: 43200
				},
				{
					name: "--EXPIRE_AUTH_TOKENS_ON_RESTART",
					description: "Expire all authentication tokens on app restart",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--INVITE_TOKEN_EXPIRY_IN_HOURS",
					description: "Workspace invite token expiry time in hours",
					type: "Input",
					defaultValue: 24
				},
				{
					name: "--PASSWORD_RESET_TOKEN_EXPIRY_IN_MINS",
					description: "Password reset token expiry time in minutes",
					type: "Input",
					defaultValue: 15
				},
				{
					name: "--PASSWORD_SALT_HASH_ROUNDS",
					description: "Salt hash rounds for password hashing",
					type: "Input",
					defaultValue: 10
				}
			]
		}]
	},
	{
		category: "Storage",
		sections: [
			{
				section: "Storage Configuration",
				items: [{
					name: "--STORAGE_TYPE",
					description: "Type of storage for uploaded files. default is `local`",
					type: "DropDown",
					values: [
						"local",
						"s3",
						"gcs",
						"azure"
					],
					defaultValue: "local"
				}]
			},
			{
				section: "Local Storage",
				items: [{
					name: "--BLOB_STORAGE_PATH",
					description: "Local folder path where uploaded files are stored when `STORAGE_TYPE` is `local`",
					type: "Input",
					defaultValue: "your-home-dir/.flowise/storage"
				}]
			},
			{
				section: "S3 Storage",
				items: [
					{
						name: "--S3_STORAGE_BUCKET_NAME",
						description: "Bucket name to hold the uploaded files when `STORAGE_TYPE` is `s3`",
						type: "Input"
					},
					{
						name: "--S3_STORAGE_ACCESS_KEY_ID",
						description: "AWS Access Key",
						type: "Input"
					},
					{
						name: "--S3_STORAGE_SECRET_ACCESS_KEY",
						description: "AWS Secret Key",
						type: "Input"
					},
					{
						name: "--S3_STORAGE_REGION",
						description: "Region for S3 bucket",
						type: "Input"
					},
					{
						name: "--S3_ENDPOINT_URL",
						description: "Custom Endpoint for S3",
						type: "Input"
					},
					{
						name: "--S3_FORCE_PATH_STYLE",
						description: "Set this to true to force the request to use path-style addressing",
						type: "CheckBox"
					}
				]
			},
			{
				section: "GCS Storage",
				items: [
					{
						name: "--GOOGLE_CLOUD_STORAGE_PROJ_ID",
						description: "The GCP project id for cloud storage & logging when `STORAGE_TYPE` is `gcs`",
						type: "Input"
					},
					{
						name: "--GOOGLE_CLOUD_STORAGE_CREDENTIAL",
						description: "The credential key file path when `STORAGE_TYPE` is `gcs`",
						type: "Input"
					},
					{
						name: "--GOOGLE_CLOUD_STORAGE_BUCKET_NAME",
						description: "Bucket name to hold the uploaded files when `STORAGE_TYPE` is `gcs`",
						type: "Input"
					},
					{
						name: "--GOOGLE_CLOUD_UNIFORM_BUCKET_ACCESS",
						description: "Enable uniform bucket level access when `STORAGE_TYPE` is `gcs`",
						type: "CheckBox",
						defaultValue: true
					}
				]
			},
			{
				section: "Azure Storage",
				items: [
					{
						name: "--AZURE_BLOB_STORAGE_CONNECTION_STRING",
						description: "Azure Blob Storage connection string when `STORAGE_TYPE` is `azure`",
						type: "Input"
					},
					{
						name: "--AZURE_BLOB_STORAGE_ACCOUNT_NAME",
						description: "Azure Blob Storage account name when `STORAGE_TYPE` is `azure`",
						type: "Input"
					},
					{
						name: "--AZURE_BLOB_STORAGE_ACCOUNT_KEY",
						description: "Azure Blob Storage account key when `STORAGE_TYPE` is `azure`",
						type: "Input"
					},
					{
						name: "--AZURE_BLOB_STORAGE_CONTAINER_NAME",
						description: "Azure Blob Storage container name when `STORAGE_TYPE` is `azure`",
						type: "Input"
					}
				]
			}
		]
	},
	{
		category: "Queue",
		sections: [{
			section: "Queue Configuration",
			items: [
				{
					name: "--MODE",
					description: "Flowise execution mode (main or queue)",
					type: "DropDown",
					values: ["main", "queue"],
					defaultValue: "main"
				},
				{
					name: "--QUEUE_NAME",
					description: "Name of the Redis BullMQ queue",
					type: "Input",
					defaultValue: "flowise-queue"
				},
				{
					name: "--REDIS_HOST",
					description: "Redis server hostname",
					type: "Input",
					defaultValue: "localhost"
				},
				{
					name: "--REDIS_PORT",
					description: "Redis server port",
					type: "Input",
					defaultValue: 6379
				},
				{
					name: "--REDIS_URL",
					description: "Full connection URL for Redis",
					type: "Input"
				},
				{
					name: "--REDIS_USERNAME",
					description: "Redis server username",
					type: "Input"
				},
				{
					name: "--REDIS_PASSWORD",
					description: "Redis server password",
					type: "Input"
				},
				{
					name: "--REDIS_TLS",
					description: "Enable TLS connection for Redis",
					type: "CheckBox"
				},
				{
					name: "--WORKER_CONCURRENCY",
					description: "Worker concurrency for background queue tasks",
					type: "Input",
					defaultValue: 1e5
				},
				{
					name: "--ENABLE_BULLMQ_DASHBOARD",
					description: "Enable BullMQ dashboard monitoring",
					type: "CheckBox"
				}
			]
		}]
	},
	{
		category: "Nodes",
		sections: [{
			section: "Node Visibility",
			items: [{
				name: "--SHOW_COMMUNITY_NODES",
				description: "Show nodes created by community",
				type: "CheckBox"
			}, {
				name: "--DISABLED_NODES",
				description: "Hide nodes from UI (comma separated list of node names)",
				type: "Input"
			}]
		}]
	},
	{
		category: "Security",
		sections: [{
			section: "Security Configuration",
			items: [
				{
					name: "--HTTP_DENY_LIST",
					description: "Blocks HTTP requests to specified URLs or domains in MCP servers (comma-separated)",
					type: "Input"
				},
				{
					name: "--HTTP_SECURITY_CHECK",
					description: "Enables default security check for dangerous HTTP domains",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--PATH_TRAVERSAL_SAFETY",
					description: "Enables checks on paths to prevent path traversal attacks",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--CUSTOM_MCP_SECURITY_CHECK",
					description: "Enables comprehensive security validation for Custom MCP configurations",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--CUSTOM_MCP_PROTOCOL",
					description: "Sets the default protocol for Custom MCP communications",
					type: "DropDown",
					values: ["stdio", "sse"],
					defaultValue: "stdio"
				},
				{
					name: "--CUSTOM_MCP_TOOLS_MAX_BYTES",
					description: "Maximum payload size in bytes for Custom MCP tools",
					type: "Input",
					defaultValue: 524288
				},
				{
					name: "--CUSTOM_MCP_AUTHORIZE_TIMEOUT_MS",
					description: "Authorization timeout in milliseconds for Custom MCP tools",
					type: "Input",
					defaultValue: 15e3
				},
				{
					name: "--CUSTOM_MCP_ALLOWED_ENV_VARS",
					description: "Comma-separated list of env var names a Custom MCP stdio config may set",
					type: "Input"
				},
				{
					name: "--CUSTOM_MCP_ALLOWED_COMMANDS",
					description: "Comma-separated list of commands a Custom MCP stdio config may run",
					type: "Input"
				},
				{
					name: "--TRUST_PROXY",
					description: "Express trust proxy setting",
					type: "Input"
				},
				{
					name: "--OAUTH2_SECURITY_CHECK",
					description: "Enables security validation for OAuth2 tokens",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--OAUTH2_ALLOWED_TOKEN_DOMAINS",
					description: "Comma-separated list of additional OAuth2 provider domains to allow",
					type: "Input"
				}
			]
		}]
	},
	{
		category: "Telemetry & Metrics",
		sections: [{
			section: "Telemetry",
			items: [{
				name: "--DISABLE_FLOWISE_TELEMETRY",
				description: "Turn off telemetry",
				type: "CheckBox"
			}, {
				name: "--POSTHOG_PUBLIC_API_KEY",
				description: "PostHog public API key for metrics collection",
				type: "Input"
			}]
		}, {
			section: "Metrics Configuration",
			items: [
				{
					name: "--ENABLE_METRICS",
					description: "Enable Prometheus/OpenTelemetry metrics collection",
					type: "CheckBox"
				},
				{
					name: "--METRICS_PROVIDER",
					description: "Metrics collection provider",
					type: "DropDown",
					values: ["prometheus", "open_telemetry"],
					defaultValue: "prometheus"
				},
				{
					name: "--METRICS_INCLUDE_NODE_METRICS",
					description: "Include Node.js runtime metrics in collection",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--METRICS_SERVICE_NAME",
					description: "Service name reported to metrics provider",
					type: "Input",
					defaultValue: "FlowiseAI"
				},
				{
					name: "--METRICS_OPEN_TELEMETRY_METRIC_ENDPOINT",
					description: "Endpoint for OpenTelemetry metrics export",
					type: "Input",
					defaultValue: "http://localhost:4318/v1/metrics"
				},
				{
					name: "--METRICS_OPEN_TELEMETRY_PROTOCOL",
					description: "Protocol used for OpenTelemetry metrics export",
					type: "DropDown",
					values: [
						"http",
						"grpc",
						"proto"
					],
					defaultValue: "http"
				},
				{
					name: "--METRICS_OPEN_TELEMETRY_DEBUG",
					description: "Enable debug logging for OpenTelemetry export",
					type: "CheckBox"
				}
			]
		}]
	},
	{
		category: "Models",
		sections: [{
			section: "Model Configuration",
			items: [{
				name: "--MODEL_LIST_CONFIG_JSON",
				description: "File path to load list of models from your local config file",
				type: "Input",
				defaultValue: "/your_model_list_config_file_path"
			}]
		}]
	},
	{
		category: "Execution & Tools",
		sections: [{
			section: "Document Loaders & Automation",
			items: [
				{
					name: "--PUPPETEER_EXECUTABLE_FILE_PATH",
					description: "Executable path for Chrome/Chromium used by Puppeteer document loaders",
					type: "Input"
				},
				{
					name: "--PLAYWRIGHT_EXECUTABLE_FILE_PATH",
					description: "Executable path for Chrome/Chromium used by Playwright document loaders",
					type: "Input"
				},
				{
					name: "--MIN_SCHEDULE_INTERVAL_SECONDS",
					description: "Minimum allowed interval in seconds for scheduled tasks",
					type: "Input",
					defaultValue: 60
				}
			]
		}]
	}
];
//#endregion
//#region module/src/containers/agent/Flowise/RendererMethods.ts
const INSTALL_TIME_KEY$6 = "install-time-flowise";
const UPDATE_TIME_KEY$6 = "update-time-flowise";
const UPDATE_AVAILABLE_KEY$5 = "update-available-version-flowise";
const shellCommand$6 = "npx flowise start";
function parseArgsToString$21(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let argResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else {
			const argType = getArgumentType(arg.name, flowiseArguments);
			if (argType === "CheckBox") argResult += `${arg.name}=true `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name}="${arg.value}" `;
			else argResult += `${arg.name}=${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	result += isEmpty(argResult) ? shellCommand$6 : `${shellCommand$6} ${argResult}`;
	return result;
}
function parseStringToArgs$21(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (!line.startsWith(shellCommand$6)) return;
		const clArgs = line.split(`${shellCommand$6} `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, flowiseArguments)) {
				if (getArgumentType(value.name, flowiseArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
function startInstall$20(stepper) {
	stepper.initialSteps([
		"Getting Started",
		"Checking NodeJS",
		"Detect Existing",
		"Install Flowise",
		"All Done!"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking if NPM is installed...");
			stepper.ipc.invoke("is_flowise_npm_available").then((isNpmInstalled) => {
				if (isNpmInstalled) stepper.nextStep().then(() => {
					stepper.progressBar(true, "Checking for existing Flowise installation...");
					stepper.ipc.invoke("is_flowise_installed").then((isFlowInstalled) => {
						if (isFlowInstalled) {
							stepper.setInstalled();
							const currentDate = /* @__PURE__ */ new Date();
							stepper.storage.set(INSTALL_TIME_KEY$6, currentDate.toLocaleString());
							stepper.showFinalStep("success", "You're All Set!", "Flowise is already installed. You're good to go!");
						} else stepper.nextStep().then(() => {
							stepper.ipc.invoke("is_flowise_npm_version_above_12").then((isAbove12) => {
								const flags = isAbove12 ? " --allow-remote=all --dangerously-allow-all-scripts" : "";
								stepper.executeTerminalCommands(`npm i -g flowise${flags}`).then(() => {
									stepper.setInstalled();
									const currentDate = /* @__PURE__ */ new Date();
									stepper.storage.set(INSTALL_TIME_KEY$6, currentDate.toLocaleString());
									stepper.showFinalStep("success", "Installation Complete!", "Your Flowise environment is ready. Enjoy!");
								});
							});
						});
					});
				});
				else stepper.showFinalStep("error", "NodeJs is not installed!", "Flowise need NPM! Please install NodeJs then try again.");
			});
		});
	});
}
function startUpdate$8(stepper) {
	stepper.initialSteps(["Update Flowise", "Complete Update"]);
	stepper.executeTerminalCommands("npm -g update flowise").then(() => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(UPDATE_TIME_KEY$6, currentDate.toLocaleString());
		stepper.setUpdated();
		stepper.showFinalStep("success", "Flowise Updated Successfully!", `Flowise has been updated to the latest version. You can now enjoy the new features and improvements.`);
	});
}
async function cardInfo$20(api, callback) {
	callback.setOpenFolders(void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			},
			{
				label: "Latest Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INSTALL_TIME_KEY$6).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.storage.get(UPDATE_TIME_KEY$6).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.ipc.invoke("current_flowise_version").then((result) => {
		descManager.updateItem(0, 2, result);
	});
	api.storage.get(UPDATE_AVAILABLE_KEY$5).then((result) => {
		descManager.updateItem(0, 3, result);
	});
}
function catchAddress$4(input) {
	if (input.toLowerCase().includes("listening at")) {
		const match = input.match(/:(\d+)(?!.*\d)/);
		if (match && match[1]) return `http://localhost:${match[1]}`;
		else return;
	}
}
const Flow_RM = {
	catchAddress: catchAddress$4,
	parseArgsToString: parseArgsToString$21,
	parseStringToArgs: parseStringToArgs$21,
	cardInfo: cardInfo$20,
	manager: {
		startInstall: startInstall$20,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$8
		}
	}
};
//#endregion
//#region module/src/containers/text/OpenWebUi/Arguments/index.ts
const openArguments = [
	{
		category: "App/Backend",
		sections: [
			{
				section: "General",
				items: [
					{
						name: "WEBUI_URL",
						description: "Specifies the URL where your Open WebUI installation is reachable. Needed for search engine support and OAuth/SSO.",
						type: "Input",
						defaultValue: "http://localhost:3000"
					},
					{
						name: "ENABLE_SIGNUP",
						description: "Toggles user account creation.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "WEBUI_ADMIN_EMAIL",
						description: "Specifies the email address for an admin account to be created automatically on first startup when no users exist. This enables headless/automated deployments without manual account creation. When combined with `WEBUI_ADMIN_PASSWORD`, the admin account is created during application startup, and `ENABLE_SIGNUP` is automatically disabled to prevent unauthorized account creation.",
						type: "Input"
					},
					{
						name: "WEBUI_ADMIN_PASSWORD",
						description: "Specifies the password for the admin account to be created automatically on first startup when no users exist. Must be used in conjunction with `WEBUI_ADMIN_EMAIL`. The password is securely hashed before storage using the same mechanism as manual account creation.",
						type: "Input"
					},
					{
						name: "WEBUI_ADMIN_NAME",
						description: "Specifies the display name for the automatically created admin account. This is used when `WEBUI_ADMIN_EMAIL` and `WEBUI_ADMIN_PASSWORD` are configured for headless admin creation.",
						type: "Input",
						defaultValue: "Admin"
					},
					{
						name: "ENABLE_SIGNUP_PASSWORD_CONFIRMATION",
						description: "If set to True, a \"Confirm Password\" field is added to the sign-up page to help users avoid typos when creating their password.",
						type: "CheckBox"
					},
					{
						name: "ENABLE_API_OUTLET_FILTERS",
						description: "When enabled, outlet filter functions also run for completions requested directly through the API, not only for chats made from the Open WebUI interface.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_LOGIN_FORM",
						description: "Toggles email, password, sign-in and \"or\" (only when ENABLE_OAUTH_SIGNUP is set to True) elements.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_PASSWORD_CHANGE_FORM",
						description: "Controls visibility of the password change UI in Settings > Account. Set to false for SSO-focused deployments.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "PASSWORD_HASH_ALGORITHM",
						description: "Selects the algorithm used to hash new user passwords.",
						type: "DropDown",
						values: ["bcrypt", "argon2"],
						defaultValue: "bcrypt"
					},
					{
						name: "DEFAULT_LOCALE",
						description: "Sets the default locale for the application.",
						type: "Input",
						defaultValue: "en"
					},
					{
						name: "DEFAULT_MODELS",
						description: "Sets a default Language Model.",
						type: "Input"
					},
					{
						name: "DEFAULT_PINNED_MODELS",
						description: "Comma-separated list of model IDs to pin by default for new users who haven't customized their pinned models. This provides a pre-selected set of frequently used models in the model selector for new accounts.",
						type: "Input"
					},
					{
						name: "DEFAULT_MODEL_METADATA",
						description: "Sets global default metadata (JSON object string) for all models.",
						type: "Input",
						defaultValue: "{}"
					},
					{
						name: "DEFAULT_MODEL_PARAMS",
						description: "Sets global default parameters (temperature, top_p, max_tokens, etc.) for all models as a JSON object.",
						type: "Input",
						defaultValue: "{}"
					},
					{
						name: "DEFAULT_GROUP_ID",
						description: "Sets the default group ID to assign to new users upon registration.",
						type: "Input"
					},
					{
						name: "DEFAULT_GROUP_SHARE_PERMISSION",
						description: "Controls the default \"Who can share to this group\" setting for newly created groups.",
						type: "DropDown",
						values: [
							"members",
							"true",
							"false"
						],
						defaultValue: "members"
					},
					{
						name: "DEFAULT_USER_ROLE",
						description: "Sets the default role assigned to new users.",
						type: "DropDown",
						values: [
							"pending",
							"user",
							"admin"
						],
						defaultValue: "pending"
					},
					{
						name: "PENDING_USER_OVERLAY_TITLE",
						description: "Sets a custom title for the pending user overlay.",
						type: "Input"
					},
					{
						name: "PENDING_USER_OVERLAY_CONTENT",
						description: "Sets a custom text content for the pending user overlay.",
						type: "Input"
					},
					{
						name: "ENABLE_CALENDAR",
						description: "Enables or disables the Calendar feature for managing events and scheduled automations.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_AUTOMATIONS",
						description: "Enables or disables the Automations feature globally.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "AUTOMATION_MAX_COUNT",
						description: "Sets the maximum number of automations a non-admin user can create (empty for unlimited).",
						type: "Input"
					},
					{
						name: "AUTOMATION_MIN_INTERVAL",
						description: "Sets the minimum allowed interval in seconds between automation recurrences for non-admin users.",
						type: "Input"
					},
					{
						name: "AUTOMATION_AUTH_TOKEN_EXPIRES_IN",
						description: "Lifetime of the short-lived auth token an automation uses to call back into Open WebUI.",
						type: "Input",
						defaultValue: "1h"
					},
					{
						name: "SCHEDULER_POLL_INTERVAL",
						description: "Sets the interval in seconds between unified scheduler ticks for automations and calendar alerts.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "CALENDAR_ALERT_LOOKAHEAD_MINUTES",
						description: "Default lookahead window in minutes for calendar event alerts.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "PENDING_USER_OVERLAY_CONTENT",
						description: "Sets a custom text content for the pending user overlay.",
						type: "Input"
					},
					{
						name: "ENABLE_CHANNELS",
						description: "Enables or disables channel support.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_FOLDERS",
						description: "Enables or disables the folders feature, allowing users to organize their chats into folders in the sidebar.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "FOLDER_MAX_FILE_COUNT",
						description: "Sets the maximum number of files processing allowed per folder. Default is none (empty string) which is unlimited.",
						type: "Input"
					},
					{
						name: "ENABLE_NOTES",
						description: "Enables or disables the notes feature, allowing users to create and manage personal notes within Open WebUI.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_MEMORIES",
						description: "Enables or disables the memory feature, allowing models to store and retrieve long-term information about users.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_MEMORY_SYSTEM_CONTEXT",
						description: "Controls whether stored memories are injected into the model's system context.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "WEBHOOK_URL",
						description: "Sets a webhook for integration with Discord/Slack/Microsoft Teams.",
						type: "Input"
					},
					{
						name: "ENABLE_ADMIN_EXPORT",
						description: "Controls whether admins can export data, chats and the database in the admin panel. Database exports only work for SQLite databases for now.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_ADMIN_CHAT_ACCESS",
						description: "Enables admin users to directly access the chats of other users. When disabled, admins can no longer accesss user's chats in the admin panel. If you disable this, consider disabling `ENABLE_ADMIN_EXPORT` too, if you are using SQLite, as the exports also contain user chats.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_ADMIN_ANALYTICS",
						description: "Controls whether the admin-panel Analytics tab is visible and the analytics API router is mounted.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_PASSWORD_AUTH",
						description: "Allows both password and SSO authentication methods to coexist when set to True. When set to False, it disables all password-based login attempts on the /signin and /ldap endpoints, enforcing strict SSO-only authentication. Disable this setting in production environments with fully configured SSO to prevent credential-based account takeover attacks; keep it enabled if you require password authentication as a backup or have not yet completed SSO configuration. Should never be disabled if OAUTH/SSO is not being used.",
						type: "CheckBox"
					},
					{
						name: "BYPASS_ADMIN_ACCESS_CONTROL",
						description: "When disabled, admin users are treated like regular users for workspace access (models, knowledge, prompts and tools) and only see items they have explicit permission to access through the existing access control system. This also applies to the visibility of models in the model selector - admins will be treated as regular users: base models and custom models they do not have explicit permission to access, will be hidden. If set to `True` (Default), admins have access to all created items in the workspace area and all models in the model selector, regardless of access permissions.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_USER_WEBHOOKS",
						description: "Enables or disables user webhooks.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "RESPONSE_WATERMARK",
						description: "Sets a custom text that will be included when you copy a message in the chat. E.g. `\"This text is AI generated\"` -> will add \"This text is AI generated\" to every message, when copied.",
						type: "Input"
					},
					{
						name: "IFRAME_CSP",
						description: "Sets a Content-Security-Policy applied to all srcdoc iframes rendered in the UI.",
						type: "Input"
					},
					{
						name: "THREAD_POOL_SIZE",
						description: "Sets the thread pool size for FastAPI/AnyIO blocking calls. By default (when set to `0`) FastAPI/AnyIO use `40` threads. In case of large instances and many concurrent users, it may be needed to increase `THREAD_POOL_SIZE` to prevent blocking.",
						type: "Input",
						defaultValue: 0
					},
					{
						name: "ENABLE_CUSTOM_MODEL_FALLBACK",
						description: "Controls whether custom models should fall back to a default model if their assigned base model is missing. When set to `True`, if a custom model's base model is not found, the system will use the first model from the configured `DEFAULT_MODELS` list instead of returning an error.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_PUBLIC_ACTIVE_USERS_COUNT",
						description: "Controls whether the active user count is visible to all users or restricted to administrators only. When set to `False`, only admin users can see how many users are currently active, reducing backend load and addressing privacy concerns in large deployments.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_USER_STATUS",
						description: "Globally enables or disables user status functionality. When disabled, the status UI (including blinking active/away indicators and status messages) is hidden across the application, and user status API endpoints are restricted.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_EASTER_EGGS",
						description: "Enables or disables easter egg features in the UI.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_IMAGE_CONTENT_TYPE_EXTENSION_FALLBACK",
						description: "Enables fallback extension-to-MIME resolution for images on minimal containers.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_PROFILE_IMAGE_URL_FORWARDING",
						description: "Controls whether profile image endpoints redirect to external http(s) profile URLs.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "PROFILE_IMAGE_ALLOWED_MIME_TYPES",
						description: "Allowlist of comma-separated MIME types accepted when serving data URI profile images.",
						type: "Input",
						defaultValue: "image/png,image/jpeg,image/gif,image/webp"
					},
					{
						name: "PROFILE_IMAGE_MAX_DATA_URI_SIZE",
						description: "Maximum size in bytes allowed for base64 data URI profile images (default 2MB).",
						type: "Input",
						defaultValue: 2097152
					},
					{
						name: "CHAT_RESPONSE_MAX_TOOL_CALL_ITERATIONS",
						description: "Maximum number of tool call iterations permitted in a single chat completion turn.",
						type: "Input",
						defaultValue: 15
					},
					{
						name: "ENABLE_RESPONSES_API_STATEFUL",
						description: "Enables stateful completions via the OpenAI-compatible Responses API endpoint.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_BASE_MODELS_CACHE",
						description: "When enabled, caches the list of base models from connected Ollama and OpenAI-compatible endpoints in memory. This reduces the number of API calls made to external model providers when loading the model selector, improving performance particularly for deployments with many users or slow connections to model endpoints. Can also be configured from Admin Panel > Settings > Connections > \"Cache Base Model List\".",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "MODELS_CACHE_TTL",
						description: "Sets the cache time-to-live in seconds for model list responses from OpenAI and Ollama endpoints. This reduces API calls by caching the available models list for the specified duration. Set to empty string to disable caching entirely.",
						type: "Input",
						defaultValue: 1
					},
					{
						name: "SHOW_ADMIN_DETAILS",
						description: "Toggles whether to show admin user details in the interface.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ADMIN_EMAIL",
						description: "Sets the admin email shown by `SHOW_ADMIN_DETAILS`",
						type: "Input"
					},
					{
						name: "ENV",
						description: "Environment setting.",
						type: "DropDown",
						values: ["dev", "prod"],
						defaultValue: "dev"
					},
					{
						name: "ENABLE_PERSISTENT_CONFIG",
						description: "If set to `False`, all `PersistentConfig` variables are treated as regular variables.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "CUSTOM_NAME",
						description: "Sets `WEBUI_NAME` but polls **api.openwebui.com** for metadata.",
						type: "Input"
					},
					{
						name: "WEBUI_NAME",
						description: "Sets the main WebUI name. Appends `(Open WebUI)` if overridden.",
						type: "Input",
						defaultValue: "Open WebUI"
					},
					{
						name: "PORT",
						description: "Sets the port to run Open WebUI from.",
						type: "Input",
						defaultValue: 8080
					},
					{
						name: "ENABLE_REALTIME_CHAT_SAVE",
						description: "When enabled, the system saves each chunk of streamed chat data to the database in real time to ensure maximum data persistency. This feature provides robust data recovery and allows accurate session tracking. However, the tradeoff is increased latency, as saving to the database introduces a delay. Disabling this feature can improve performance and reduce delays, but it risks potential data loss in the event of a system failure or crash. Use based on your application's requirements and acceptable tradeoffs.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_CHAT_RESPONSE_BASE64_IMAGE_URL_CONVERSION",
						description: "When set to true, it automatically uploads base64-encoded images exceeding 1KB in markdown and converts them into image file URLs to reduce the size of response text. Some multimodal models directly output images as Base64 strings within the Markdown content. This results in larger response bodies, placing strain on CPU, network, Redis, and database resources.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "CHAT_STREAM_RESPONSE_CHUNK_MAX_BUFFER_SIZE",
						description: "Sets the maximum buffer size in bytes for handling stream response chunks. When a single chunk exceeds this limit, the system returns an empty JSON object and skips subsequent oversized data until encountering normally-sized chunks. This prevents memory issues when dealing with extremely large responses from certain providers (e.g., models like gemini-2.5-flash-image or services returning extensive web search data exceeding). Set to an empty string or a negative value to disable chunk size limitations entirely. Recommended values are 16-20 MB (`16777216`) or larger depending on the image size of the image generation model (4K images may need even more).",
						type: "Input"
					},
					{
						name: "CHAT_RESPONSE_STREAM_DELTA_CHUNK_SIZE",
						description: "Sets a system-wide minimum value for the number of tokens to batch together before sending them to the client during a streaming response. This allows an administrator to enforce a baseline level of performance and stability across the entire system by preventing excessively small chunk sizes that can cause high CPU load. The final chunk size used for a response will be the highest value set among this global variable, the model's advanced parameters, or the per-chat settings. The default is 1, which applies no minimum batching at the global level.",
						type: "Input",
						defaultValue: 1
					},
					{
						name: "BYPASS_MODEL_ACCESS_CONTROL",
						description: "Bypasses model access control. When set to `true`, all users (and admins alike) will have access to all models, regardless of the model's privacy setting (Private, Public, Shared with certain groups). This is useful for smaller or individual Open WebUI installations where model access restrictions may not be needed.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WEBUI_BUILD_HASH",
						description: "Used for identifying the Git SHA of the build for releases.",
						type: "Input",
						defaultValue: "dev-build"
					},
					{
						name: "WEBUI_BANNERS",
						description: "List of banners to show to users.",
						type: "Input"
					},
					{
						name: "USE_CUDA_DOCKER",
						description: "Builds the Docker image with NVIDIA CUDA support. Enables GPU acceleration for local Whisper and embeddings.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "DOCKER",
						description: "Indicates whether Open WebUI is running inside a Docker container. Used internally for environment detection.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "USE_CUDA",
						description: "Controls whether to use CUDA acceleration for local models. When set to `true`, attempts to detect and use available NVIDIA GPUs. The code reads the environment variable `USE_CUDA_DOCKER` to set this internal boolean variable.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "DEVICE_TYPE",
						description: "Specifies the device type for model execution. Automatically set to `cuda` if CUDA is available and enabled, or `mps` for Apple Silicon.",
						type: "Input",
						defaultValue: "cpu"
					},
					{
						name: "EXTERNAL_PWA_MANIFEST_URL",
						description: "When defined as a fully qualified URL (e.g., https://path/to/manifest.webmanifest), requests sent to /manifest.json will use the external manifest file. When not defined, the default manifest.json file will be used.",
						type: "Input"
					},
					{
						name: "ENABLE_TITLE_GENERATION",
						description: "Enables or disables chat title generation.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_COMPRESSION_MIDDLEWARE",
						description: "Enables gzip compression middleware for HTTP responses to reduce bandwidth usage.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "LICENSE_KEY",
						description: "Specifies the license key to use (for Enterprise users only).",
						type: "Input"
					},
					{
						name: "SSL_ASSERT_FINGERPRINT",
						description: "Specifies the SSL assert fingerprint to use.",
						type: "Input"
					},
					{
						name: "DEFAULT_PROMPT_SUGGESTIONS",
						description: "List of prompt suggestions.",
						type: "Input"
					}
				]
			},
			{
				section: "AIOHTTP Client",
				items: [
					{
						name: "AIOHTTP_CLIENT_TIMEOUT",
						description: "Specifies the timeout duration in seconds for the AIOHTTP client. This impacts things such as connections to Ollama and OpenAI endpoints.",
						type: "Input",
						defaultValue: 300
					},
					{
						name: "AIOHTTP_CLIENT_TIMEOUT_MODEL_LIST",
						description: "Sets the timeout in seconds for fetching the model list. This can be useful in cases where network latency requires a longer timeout duration to successfully retrieve the model list.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "AIOHTTP_CLIENT_TIMEOUT_OPENAI_MODEL_LIST",
						description: "Sets the timeout in seconds for fetching the model list. This can be useful in cases where network latency requires a longer timeout duration to successfully retrieve the model list.",
						type: "Input"
					},
					{
						name: "AIOHTTP_CLIENT_SESSION_SSL",
						description: "Controls SSL/TLS verification for AIOHTTP client sessions when connecting to external APIs (e.g., Ollama Embeddings).",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "AIOHTTP_CLIENT_TIMEOUT_TOOL_SERVER_DATA",
						description: "Sets the timeout in seconds for retrieving data from tool servers via AIOHTTP client.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "AIOHTTP_CLIENT_SESSION_TOOL_SERVER_SSL",
						description: "Controls SSL/TLS verification specifically for tool server connections via AIOHTTP client.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "REQUESTS_VERIFY",
						description: "Controls SSL/TLS verification for synchronous `requests` (e.g., Tika, External Reranker). Set to `False` to bypass certificate verification for self-signed certificates.",
						type: "CheckBox",
						defaultValue: true
					}
				]
			},
			{
				section: "Directories",
				items: [
					{
						name: "DATA_DIR",
						description: "Specifies the base directory for data storage, including uploads, cache, vector database, etc.",
						type: "Input",
						defaultValue: "./data"
					},
					{
						name: "FONTS_DIR",
						description: "Specifies the directory for fonts.",
						type: "Input"
					},
					{
						name: "FRONTEND_BUILD_DIR",
						description: "Specifies the location of the built frontend files.",
						type: "Input",
						defaultValue: "../build"
					},
					{
						name: "STATIC_DIR",
						description: "Specifies the directory for static files, such as the favicon.",
						type: "Input",
						defaultValue: "./static"
					}
				]
			},
			{
				section: "Ollama",
				items: [
					{
						name: "ENABLE_OLLAMA_API",
						description: "Enables the use of Ollama APIs.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "OLLAMA_BASE_URL",
						description: "Configures the Ollama backend URL.",
						type: "Input",
						defaultValue: "http://localhost:11434"
					},
					{
						name: "OLLAMA_BASE_URLS",
						description: "Configures load-balanced Ollama backend hosts, separated by ;. Takes precedence over OLLAMA_BASE_URL.",
						type: "Input"
					},
					{
						name: "USE_OLLAMA_DOCKER",
						description: "Builds the Docker image with a bundled Ollama instance.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "K8S_FLAG",
						description: "If set, assumes Helm chart deployment and sets OLLAMA_BASE_URL to http://ollama-service.open-webui.svc.cluster.local:11434",
						type: "CheckBox",
						defaultValue: false
					}
				]
			},
			{
				section: "OpenAI",
				items: [
					{
						name: "ENABLE_OPENAI_API",
						description: "Enables the use of OpenAI APIs.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "OPENAI_API_BASE_URL",
						description: "Configures the OpenAI base API URL.",
						type: "Input",
						defaultValue: "https://api.openai.com/v1"
					},
					{
						name: "OPENAI_API_BASE_URLS",
						description: "Supports balanced OpenAI base API URLs, semicolon-separated.",
						type: "Input"
					},
					{
						name: "OPENAI_API_KEY",
						description: "Sets the OpenAI API key.",
						type: "Input"
					},
					{
						name: "OPENAI_API_KEYS",
						description: "Supports multiple OpenAI API keys, semicolon-separated.",
						type: "Input"
					}
				]
			},
			{
				section: "Tasks",
				items: [
					{
						name: "TASK_MODEL",
						description: "The default model to use for tasks such as title and web search query generation when using Ollama models.",
						type: "Input"
					},
					{
						name: "TASK_MODEL_EXTERNAL",
						description: "The default model to use for tasks such as title and web search query generation when using OpenAI-compatible endpoints.",
						type: "Input"
					},
					{
						name: "TITLE_GENERATION_PROMPT_TEMPLATE",
						description: "Prompt to use when generating chat titles.",
						type: "Input"
					},
					{
						name: "ENABLE_FOLLOW_UP_GENERATION",
						description: "Enables or disables follow up generation.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "FOLLOW_UP_GENERATION_PROMPT_TEMPLATE",
						description: "Prompt to use for generating several relevant follow-up questions.",
						type: "Input"
					},
					{
						name: "TOOLS_FUNCTION_CALLING_PROMPT_TEMPLATE",
						description: "Prompt to use when calling tools.",
						type: "Input"
					}
				]
			},
			{
				section: "Code Execution",
				items: [
					{
						name: "ENABLE_CODE_EXECUTION",
						description: "Enables or disables code execution.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "CODE_EXECUTION_ENGINE",
						description: "Specifies the code execution engine to use.",
						type: "Input",
						defaultValue: "pyodide"
					},
					{
						name: "CODE_EXECUTION_JUPYTER_URL",
						description: "Specifies the Jupyter URL to use for code execution.",
						type: "Input"
					},
					{
						name: "CODE_EXECUTION_JUPYTER_AUTH",
						description: "Specifies the Jupyter authentication method to use for code execution.",
						type: "Input"
					},
					{
						name: "CODE_EXECUTION_JUPYTER_AUTH_TOKEN",
						description: "Specifies the Jupyter authentication token to use for code execution.",
						type: "Input"
					},
					{
						name: "CODE_EXECUTION_JUPYTER_AUTH_PASSWORD",
						description: "Specifies the Jupyter authentication password to use for code execution.",
						type: "Input"
					},
					{
						name: "CODE_EXECUTION_JUPYTER_TIMEOUT",
						description: "Specifies the timeout for Jupyter code execution.",
						type: "Input"
					}
				]
			},
			{
				section: "Code Interpreter",
				items: [
					{
						name: "ENABLE_CODE_INTERPRETER",
						description: "Enables or disables code interpreter.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "CODE_INTERPRETER_ENGINE",
						description: "Specifies the code interpreter engine to use.",
						type: "Input",
						defaultValue: "pyodide"
					},
					{
						name: "CODE_INTERPRETER_BLACKLISTED_MODULES",
						description: "Specifies a comma-separated list of Python modules that are blacklisted and cannot be imported or used within the code interpreter. This enhances security by preventing access to potentially sensitive or system-level functionalities.",
						type: "Input"
					},
					{
						name: "CODE_INTERPRETER_PROMPT_TEMPLATE",
						description: "Specifies the prompt template to use for code interpreter.",
						type: "Input"
					},
					{
						name: "CODE_INTERPRETER_JUPYTER_URL",
						description: "Specifies the Jupyter URL to use for code interpreter.",
						type: "Input"
					},
					{
						name: "CODE_INTERPRETER_JUPYTER_AUTH",
						description: "Specifies the Jupyter authentication method to use for code interpreter.",
						type: "Input"
					},
					{
						name: "CODE_INTERPRETER_JUPYTER_AUTH_TOKEN",
						description: "Specifies the Jupyter authentication token to use for code interpreter.",
						type: "Input"
					},
					{
						name: "CODE_INTERPRETER_JUPYTER_AUTH_PASSWORD",
						description: "Specifies the Jupyter authentication password to use for code interpreter.",
						type: "Input"
					},
					{
						name: "CODE_INTERPRETER_JUPYTER_TIMEOUT",
						description: "Specifies the timeout for the Jupyter code interpreter.",
						type: "Input"
					}
				]
			},
			{
				section: "Direct Connections (OpenAPI/MCPO Tool Servers)",
				items: [{
					name: "ENABLE_DIRECT_CONNECTIONS",
					description: "Enables or disables direct connections.",
					type: "CheckBox",
					defaultValue: true
				}, {
					name: "TOOL_SERVER_CONNECTIONS",
					description: "Comma-separated list of tool server connection URLs for direct connections to OpenAPI/MCPO tool servers.",
					type: "Input"
				}]
			},
			{
				section: "Autocomplete",
				items: [
					{
						name: "ENABLE_AUTOCOMPLETE_GENERATION",
						description: "Enables or disables autocomplete generation.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "AUTOCOMPLETE_GENERATION_INPUT_MAX_LENGTH",
						description: "Sets the maximum input length for autocomplete generation.",
						type: "Input",
						defaultValue: -1
					},
					{
						name: "AUTOCOMPLETE_GENERATION_PROMPT_TEMPLATE",
						description: "Sets the prompt template for autocomplete generation.",
						type: "Input"
					}
				]
			},
			{
				section: "Evaluation Arena Model",
				items: [
					{
						name: "ENABLE_EVALUATION_ARENA_MODELS",
						description: "Enables or disables evaluation arena models.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_MESSAGE_RATING",
						description: "Enables message rating feature.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_COMMUNITY_SHARING",
						description: "Controls whether users are shown the share to community button.",
						type: "CheckBox",
						defaultValue: true
					}
				]
			},
			{
				section: "Tags Generation",
				items: [{
					name: "ENABLE_TAGS_GENERATION",
					description: "Enables or disables tag generation.",
					type: "CheckBox",
					defaultValue: true
				}, {
					name: "TAGS_GENERATION_PROMPT_TEMPLATE",
					description: "Sets the prompt template for tag generation.",
					type: "Input"
				}]
			},
			{
				section: "API Key Endpoint Restrictions",
				items: [
					{
						name: "ENABLE_API_KEYS",
						description: "Enables the API key creation feature, allowing users to generate API keys for programmatic access to Open WebUI.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_API_KEYS_ENDPOINT_RESTRICTIONS",
						description: "Enables API key endpoint restrictions for added security and configurability, allowing administrators to limit which endpoints can be accessed using API keys.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "API_KEYS_ALLOWED_ENDPOINTS",
						description: "Specifies a comma-separated list of allowed API endpoints when API key endpoint restrictions are enabled.",
						type: "Input"
					},
					{
						name: "JWT_EXPIRES_IN",
						description: "Sets the JWT expiration time in seconds. Valid time units: `s`, `m`, `h`, `d`, `w` or `-1` for no expiration.",
						type: "Input",
						defaultValue: "4w"
					}
				]
			}
		]
	},
	{
		category: "Security Variables",
		items: [
			{
				name: "ENABLE_FORWARD_USER_INFO_HEADERS",
				description: "Forwards user information (name, ID, email, role and chat-id) as X-headers to OpenAI API and Ollama API.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "FORWARD_USER_INFO_HEADER_USER_NAME",
				description: "Custom HTTP header name for forwarding user display name.",
				type: "Input",
				defaultValue: "X-OpenWebUI-User-Name"
			},
			{
				name: "FORWARD_USER_INFO_HEADER_USER_ID",
				description: "Custom HTTP header name for forwarding user ID.",
				type: "Input",
				defaultValue: "X-OpenWebUI-User-Id"
			},
			{
				name: "FORWARD_USER_INFO_HEADER_USER_EMAIL",
				description: "Custom HTTP header name for forwarding user email.",
				type: "Input",
				defaultValue: "X-OpenWebUI-User-Email"
			},
			{
				name: "FORWARD_USER_INFO_HEADER_USER_ROLE",
				description: "Custom HTTP header name for forwarding user role.",
				type: "Input",
				defaultValue: "X-OpenWebUI-User-Role"
			},
			{
				name: "FORWARD_SESSION_INFO_HEADER_CHAT_ID",
				description: "Custom HTTP header name for forwarding chat session ID.",
				type: "Input",
				defaultValue: "X-OpenWebUI-Chat-Id"
			},
			{
				name: "FORWARD_SESSION_INFO_HEADER_MESSAGE_ID",
				description: "Custom HTTP header name for forwarding chat message ID.",
				type: "Input",
				defaultValue: "X-OpenWebUI-Message-Id"
			},
			{
				name: "FORWARD_USER_INFO_HEADER_JWT_SECRET",
				description: "Secret key used to sign forwarded user info JWT header.",
				type: "Input"
			},
			{
				name: "FORWARD_USER_INFO_HEADER_JWT",
				description: "Custom HTTP header name for forwarding signed user info JWT.",
				type: "Input",
				defaultValue: "X-OpenWebUI-Jwt"
			},
			{
				name: "FORWARD_USER_INFO_HEADER_JWT_EXPIRES_SECONDS",
				description: "Expiration time in seconds for forwarded user info JWT.",
				type: "Input",
				defaultValue: 3600
			},
			{
				name: "CUSTOM_API_KEY_HEADER",
				description: "Specifies a custom HTTP header name for API key authentication.",
				type: "Input",
				defaultValue: "X-OpenWebUI-Key"
			},
			{
				name: "ENABLE_VALVE_ENCRYPTION",
				description: "Encrypts tool and function valves stored in the database.",
				type: "CheckBox",
				defaultValue: true
			},
			{
				name: "ENABLE_WEB_LOADER_SSL_VERIFICATION",
				description: "Bypass SSL Verification for RAG on Websites.",
				type: "CheckBox",
				defaultValue: true
			},
			{
				name: "ENABLE_PASSWORD_VALIDATION",
				description: "Enables password complexity validation for user accounts. When enabled, passwords must meet the complexity requirements defined by `PASSWORD_VALIDATION_REGEX_PATTERN` during signup, password updates, and user creation operations. This helps enforce stronger password policies across the application.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "PASSWORD_VALIDATION_HINT",
				description: "Custom hint message displayed when password policy validation fails.",
				type: "Input"
			},
			{
				name: "PASSWORD_VALIDATION_REGEX_PATTERN",
				description: "Regular expression pattern used to validate password complexity when `ENABLE_PASSWORD_VALIDATION` is enabled. The default pattern requires passwords to be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
				type: "Input",
				defaultValue: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$`
			},
			{
				name: "WEBUI_SESSION_COOKIE_SAME_SITE",
				description: "Sets the `SameSite` attribute for session cookies.",
				type: "DropDown",
				values: [
					"lax",
					"strict",
					"none"
				],
				defaultValue: "lax"
			},
			{
				name: "WEBUI_SESSION_COOKIE_SECURE",
				description: "Sets the `Secure` attribute for session cookies if set to `True`.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "WEBUI_AUTH_COOKIE_SAME_SITE",
				description: "Sets the `SameSite` attribute for auth cookies.",
				type: "DropDown",
				values: [
					"lax",
					"strict",
					"none"
				],
				defaultValue: "lax"
			},
			{
				name: "WEBUI_AUTH_COOKIE_SECURE",
				description: "Sets the `Secure` attribute for auth cookies if set to `True`.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "WEBUI_AUTH",
				description: "This setting enables or disables authentication.",
				type: "CheckBox",
				defaultValue: true
			},
			{
				name: "WEBUI_SECRET_KEY",
				description: "Overrides the randomly generated string used for JSON Web Token.",
				type: "Input",
				defaultValue: "t0p-s3cr3t"
			},
			{
				name: "ENABLE_VERSION_UPDATE_CHECK",
				description: "When enabled, the application makes automatic update checks and notifies you about version updates.",
				type: "CheckBox",
				defaultValue: true
			},
			{
				name: "OFFLINE_MODE",
				description: "Disables Open WebUI's network connections for update checks and automatic model downloads.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "HF_HUB_OFFLINE",
				description: "Tells Hugging Face whether we want to launch in offline mode, so to not connect to hugging face and prevent all automatic model downloads",
				type: "Input",
				defaultValue: 0
			},
			{
				name: "RESET_CONFIG_ON_START",
				description: "Resets the `config.json` file on startup.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "SAFE_MODE",
				description: "Enables safe mode, which disables potentially unsafe features, deactivating all functions.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "CORS_ALLOW_ORIGIN",
				description: "Sets the allowed origins for Cross-Origin Resource Sharing (CORS).",
				type: "Input",
				defaultValue: "*"
			},
			{
				name: "CORS_ALLOW_CUSTOM_SCHEME",
				description: "Sets a list of further allowed schemes for Cross-Origin Resource Sharing (CORS). Allows you to specify additional custom URL schemes, beyond the standard `http` and `https`, that are permitted as valid origins for Cross-Origin Resource Sharing (CORS).",
				type: "Input"
			},
			{
				name: "RAG_EMBEDDING_MODEL_TRUST_REMOTE_CODE",
				description: "Determines whether to allow custom models defined on the Hub in their own modeling files.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "RAG_RERANKING_MODEL_TRUST_REMOTE_CODE",
				description: "Determines whether to allow custom models defined on the Hub in their own. modeling files for reranking.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "RAG_EMBEDDING_MODEL_AUTO_UPDATE",
				description: "Toggles automatic update of the Sentence-Transformer model.",
				type: "CheckBox",
				defaultValue: true
			},
			{
				name: "RAG_RERANKING_MODEL_AUTO_UPDATE",
				description: "Toggles automatic update of the reranking model.",
				type: "CheckBox",
				defaultValue: true
			}
		]
	},
	{
		category: "Vector Database",
		sections: [
			{
				section: "General",
				items: [{
					name: "VECTOR_DB",
					description: "Specifies which vector database system to use. This setting determines which vector storage system will be used for managing embeddings.",
					type: "DropDown",
					values: [
						"chroma",
						"elasticsearch",
						"milvus",
						"opensearch",
						"pgvector",
						"qdrant",
						"pinecone",
						"s3vector",
						"weaviate",
						"oracle23ai",
						"mariadb",
						"valkey"
					],
					defaultValue: "chroma"
				}]
			},
			{
				section: "ChromaDB",
				items: [
					{
						name: "CHROMA_TENANT",
						description: "Sets the tenant for ChromaDB to use for RAG embeddings.",
						type: "Input"
					},
					{
						name: "CHROMA_DATABASE",
						description: "Sets the database in the ChromaDB tenant to use for RAG embeddings.",
						type: "Input"
					},
					{
						name: "CHROMA_HTTP_HOST",
						description: "Specifies the hostname of a remote ChromaDB Server. Uses a local ChromaDB instance if not set.",
						type: "Input"
					},
					{
						name: "CHROMA_HTTP_PORT",
						description: "Specifies the port of a remote ChromaDB Server.",
						type: "Input",
						defaultValue: 8e3
					},
					{
						name: "CHROMA_HTTP_HEADERS",
						description: "A comma-separated list of HTTP headers to include with every ChromaDB request.",
						type: "Input"
					},
					{
						name: "CHROMA_HTTP_SSL",
						description: "Controls whether or not SSL is used for ChromaDB Server connections.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "CHROMA_CLIENT_AUTH_PROVIDER",
						description: "Specifies an authentication provider for remote ChromaDB Server.",
						type: "Input"
					},
					{
						name: "CHROMA_CLIENT_AUTH_CREDENTIALS",
						description: "Specifies auth credentials for remote ChromaDB Server.",
						type: "Input"
					}
				]
			},
			{
				section: "Elasticsearch",
				items: [
					{
						name: "ELASTICSEARCH_API_KEY",
						description: "Specifies the Elasticsearch API key.",
						type: "Input"
					},
					{
						name: "ELASTICSEARCH_CA_CERTS",
						description: "Specifies the path to the CA certificates for Elasticsearch.",
						type: "Input"
					},
					{
						name: "ELASTICSEARCH_CLOUD_ID",
						description: "Specifies the Elasticsearch cloud ID.",
						type: "Input"
					},
					{
						name: "ELASTICSEARCH_INDEX_PREFIX",
						description: "Specifies the prefix for the Elasticsearch index.",
						type: "Input",
						defaultValue: "open_webui_collections"
					},
					{
						name: "ELASTICSEARCH_PASSWORD",
						description: "Specifies the password for Elasticsearch.",
						type: "Input"
					},
					{
						name: "ELASTICSEARCH_URL",
						description: "Specifies the URL for the Elasticsearch instance.",
						type: "Input",
						defaultValue: "https://localhost:9200"
					},
					{
						name: "ELASTICSEARCH_USERNAME",
						description: "Specifies the username for Elasticsearch.",
						type: "Input"
					}
				]
			},
			{
				section: "Milvus",
				items: [
					{
						name: "MILVUS_URI",
						description: "Specifies the URI for connecting to the Milvus vector database. This can point to a local or remote Milvus server based on the deployment configuration.",
						type: "Input",
						defaultValue: "${DATA_DIR}/vector_db/milvus.db"
					},
					{
						name: "MILVUS_DB",
						description: "Specifies the database to connect to within a Milvus instance.",
						type: "Input",
						defaultValue: "default"
					},
					{
						name: "MILVUS_TOKEN",
						description: "Specifies an optional connection token for Milvus.",
						type: "Input"
					},
					{
						name: "MILVUS_INDEX_TYPE",
						description: "Specifies the index type to use when creating a new collection in Milvus. `AUTOINDEX` is generally recommended for Milvus standalone. `HNSW` may offer better performance but typically requires a clustered Milvus setup.",
						type: "DropDown",
						values: [
							"AUTOINDEX",
							"FLAT",
							"IVF_FLAT",
							"HNSW"
						],
						defaultValue: "HNSW"
					},
					{
						name: "MILVUS_METRIC_TYPE",
						description: "Specifies the metric type for vector similarity search in Milvus.",
						type: "DropDown",
						values: [
							"COSINE",
							"IP",
							"L2"
						],
						defaultValue: "COSINE"
					},
					{
						name: "MILVUS_HNSW_M",
						description: "Specifies the `M` parameter for the HNSW index type in Milvus. This influences the number of bi-directional links created for each new element during construction. Only applicable if `MILVUS_INDEX_TYPE` is `HNSW`.",
						type: "Input",
						defaultValue: 16
					},
					{
						name: "MILVUS_HNSW_EFCONSTRUCTION",
						description: "Specifies the `efConstruction` parameter for the HNSW index type in Milvus. This influences the size of the dynamic list for the nearest neighbors during index construction. Only applicable if `MILVUS_INDEX_TYPE` is `HNSW`.",
						type: "Input",
						defaultValue: 100
					},
					{
						name: "MILVUS_IVF_FLAT_NLIST",
						description: "Specifies the `nlist` parameter for the IVF_FLAT index type in Milvus. This is the number of cluster units. Only applicable if `MILVUS_INDEX_TYPE` is `IVF_FLAT`.",
						type: "Input",
						defaultValue: 128
					},
					{
						name: "MILVUS_DISKANN_MAX_DEGREE",
						description: "Sets the max degree for Milvus if Milvus is in DISKANN indexing mode. Generally recommended to leave as is.",
						type: "Input",
						defaultValue: 56
					},
					{
						name: "MILVUS_DISKANN_SEARCH_LIST_SIZE",
						description: "Sets the Milvus DISKANN search list size. Generally recommended to leave as is.",
						type: "Input",
						defaultValue: 100
					},
					{
						name: "ENABLE_MILVUS_MULTITENANCY_MODE",
						description: "Enables multitenancy pattern for Milvus collections management, which significantly reduces RAM usage and computational overhead by consolidating similar vector data structures. Controls whether Milvus uses multitenancy collection architecture. When enabled, all vector data is consolidated into 5 shared collections (memories, knowledge, files, web_search, hash_based) instead of creating individual collections per resource. Data isolation is achieved via a resource_id field rather than collection-level separation.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "MILVUS_COLLECTION_PREFIX",
						description: "Sets the prefix for Milvus collection names. In multitenancy mode, collections become `{prefix}_memories`, `{prefix}_knowledge`, etc. In legacy mode, collections are `{prefix}_{collection_name}`. Changing this value creates an entirely separate namespace—existing collections with the old prefix become invisible to Open WebUI but remain in Milvus consuming resources. Use this for true multi-instance isolation on a shared Milvus server, not for migration between modes. Milvus only accepts underscores, hyphens/dashes are not possible and will cause errors.",
						type: "Input",
						defaultValue: "open_webui"
					}
				]
			},
			{
				section: "OpenSearch",
				items: [
					{
						name: "OPENSEARCH_CERT_VERIFY",
						description: "Enables or disables OpenSearch certificate verification.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "OPENSEARCH_PASSWORD",
						description: "Sets the password for OpenSearch.",
						type: "Input"
					},
					{
						name: "OPENSEARCH_SSL",
						description: "Enables or disables SSL for OpenSearch.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "OPENSEARCH_URI",
						description: "Sets the URI for OpenSearch.",
						type: "Input",
						defaultValue: "https://localhost:9200"
					},
					{
						name: "OPENSEARCH_USERNAME",
						description: "Sets the username for OpenSearch.",
						type: "Input"
					}
				]
			},
			{
				section: "PGVector",
				items: [
					{
						name: "PGVECTOR_DB_URL",
						description: "Sets the database URL for model storage.",
						type: "Input"
					},
					{
						name: "PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH",
						description: "Specifies the maximum vector length for PGVector initialization.",
						type: "Input",
						defaultValue: "1536"
					},
					{
						name: "PGVECTOR_CREATE_EXTENSION",
						description: "Creates the vector extension in the database",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "PGVECTOR_INDEX_METHOD",
						description: "Specifies the index method for pgvector. The choice affects query performance and index build time.",
						type: "DropDown",
						values: ["ivfflat", "hnsw"]
					},
					{
						name: "PGVECTOR_HNSW_M",
						description: "HNSW index parameter that controls the maximum number of bi-directional connections per layer during index construction. Higher values improve recall but increase index size and build time. Only applicable when `PGVECTOR_INDEX_METHOD` is set to `hnsw`.",
						type: "Input",
						defaultValue: 16
					},
					{
						name: "PGVECTOR_HNSW_EF_CONSTRUCTION",
						description: "HNSW index parameter that controls the size of the dynamic candidate list during index construction. Higher values improve index quality but increase build time. Only applicable when `PGVECTOR_INDEX_METHOD` is set to `hnsw`.",
						type: "Input",
						defaultValue: 64
					},
					{
						name: "PGVECTOR_IVFFLAT_LISTS",
						description: "IVFFlat index parameter that specifies the number of inverted lists (clusters) to create. A good starting point is `rows / 1000` for up to 1M rows and `sqrt(rows)` for over 1M rows. Only applicable when `PGVECTOR_INDEX_METHOD` is set to `ivfflat`.",
						type: "Input",
						defaultValue: 100
					},
					{
						name: "PGVECTOR_USE_HALFVEC",
						description: "Enables the use of `halfvec` data type instead of `vector` for storing embeddings. Required when `PGVECTOR_INITIALIZE_MAX_VECTOR_LENGTH` exceeds 2000 dimensions, as the `vector` type has a 2000-dimension limit.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "PGVECTOR_PGCRYPTO",
						description: "Enables pgcrypto extension for encrypting sensitive data within PGVector. When enabled, `PGVECTOR_PGCRYPTO_KEY` must be set.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "PGVECTOR_PGCRYPTO_KEY",
						description: "Specifies the encryption key for pgcrypto when `PGVECTOR_PGCRYPTO` is enabled. Must be a secure, randomly generated key.",
						type: "Input"
					},
					{
						name: "PGVECTOR_POOL_SIZE",
						description: "Sets the number of connections to maintain in the PGVector database connection pool. If not set, uses SQLAlchemy defaults.",
						type: "Input"
					},
					{
						name: "PGVECTOR_POOL_MAX_OVERFLOW",
						description: "Specifies the maximum number of connections that can be created beyond `PGVECTOR_POOL_SIZE` when the pool is exhausted.",
						type: "Input",
						defaultValue: 0
					},
					{
						name: "PGVECTOR_POOL_TIMEOUT",
						description: "Sets the timeout in seconds for acquiring a connection from the PGVector pool.",
						type: "Input",
						defaultValue: 30
					},
					{
						name: "PGVECTOR_POOL_RECYCLE",
						description: "Specifies the time in seconds after which connections are recycled in the PGVector pool to prevent stale connections.",
						type: "Input",
						defaultValue: 3600
					}
				]
			},
			{
				section: "Qdrant",
				items: [
					{
						name: "QDRANT_API_KEY",
						description: "Sets the API key for Qdrant.",
						type: "Input"
					},
					{
						name: "QDRANT_URI",
						description: "Sets the URI for Qdrant.",
						type: "Input"
					},
					{
						name: "QDRANT_ON_DISK",
						description: "Enable the usage of memmap(also known as on-disk) storage",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "QDRANT_PREFER_GRPC",
						description: "Use gPRC interface whenever possible.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "QDRANT_GRPC_PORT",
						description: "Sets the gRPC port number for Qdrant.",
						type: "Input",
						defaultValue: 6334
					},
					{
						name: "QDRANT_TIMEOUT",
						description: "Sets the timeout in seconds for all requests made to the Qdrant server, helping to prevent long-running queries from stalling the application.",
						type: "Input",
						defaultValue: 5
					},
					{
						name: "QDRANT_HNSW_M",
						description: "Controls the HNSW (Hierarchical Navigable Small World) index construction. In standard mode, this sets the `m` parameter. In multi-tenancy mode, this value is used for the `payload_m` parameter to build indexes on the payload, as the global `m` is disabled for performance, following Qdrant best practices.",
						type: "Input",
						defaultValue: 16
					},
					{
						name: "ENABLE_QDRANT_MULTITENANCY_MODE",
						description: "Enables multitenancy pattern for Qdrant collections management, which significantly reduces RAM usage and computational overhead by consolidating similar vector data structures. Recommend turn on",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "QDRANT_COLLECTION_PREFIX",
						description: "Sets the prefix for Qdrant collection names. Useful for namespacing or isolating collections, especially in multitenancy mode. Changing this value will cause the application to use a different set of collections in Qdrant. Existing collections with a different prefix will not be affected.",
						type: "Input",
						defaultValue: "open-webui"
					}
				]
			},
			{
				section: "Pinecone",
				items: [
					{
						name: "PINECONE_API_KEY",
						description: "Sets the API key used to authenticate with the Pinecone service.",
						type: "Input"
					},
					{
						name: "PINECONE_ENVIRONMENT",
						description: "Specifies the Pinecone environment to connect to (e.g., `us-west1-gcp`, `gcp-starter`, etc.).",
						type: "Input"
					},
					{
						name: "PINECONE_INDEX_NAME",
						description: "Defines the name of the Pinecone index that will be used to store and query vector embeddings.",
						type: "Input",
						defaultValue: "open-webui-index"
					},
					{
						name: "PINECONE_DIMENSION",
						description: "The dimensionality of the vector embeddings. Must match the dimension expected by the index (commonly 768, 1024, 1536, or 3072 based on model used).",
						type: "Input",
						defaultValue: 1536
					},
					{
						name: "PINECONE_METRIC",
						description: "Specifies the similarity metric to use for vector comparisons within the Pinecone index.",
						type: "DropDown",
						values: [
							"cosine",
							"dotproduct",
							"euclidean"
						],
						defaultValue: "cosine"
					},
					{
						name: "PINECONE_CLOUD",
						description: "Specifies the cloud provider where the Pinecone index is hosted.",
						type: "DropDown",
						values: [
							"aws",
							"gcp",
							"azure"
						],
						defaultValue: "aws"
					}
				]
			},
			{
				section: "Weaviate",
				items: [
					{
						name: "WEAVIATE_HTTP_HOST",
						description: "Specifies the hostname of the Weaviate server for HTTP connections.",
						type: "Input"
					},
					{
						name: "WEAVIATE_HTTP_PORT",
						description: "Specifies the HTTP port for connecting to the Weaviate server.",
						type: "Input",
						defaultValue: 8080
					},
					{
						name: "WEAVIATE_GRPC_PORT",
						description: "Specifies the gRPC port for connecting to the Weaviate server.",
						type: "Input",
						defaultValue: 50051
					},
					{
						name: "WEAVIATE_API_KEY",
						description: "Sets the API key for authenticating with Weaviate server.",
						type: "Input"
					},
					{
						name: "WEAVIATE_GRPC_HOST",
						description: "Specifies the gRPC host for connecting to the Weaviate server.",
						type: "Input"
					},
					{
						name: "WEAVIATE_HTTP_SECURE",
						description: "Enables HTTPS for Weaviate HTTP connections.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WEAVIATE_GRPC_SECURE",
						description: "Enables SSL/TLS for Weaviate gRPC connections.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WEAVIATE_SKIP_INIT_CHECKS",
						description: "Skips initial readiness and schema verification checks for Weaviate.",
						type: "CheckBox",
						defaultValue: false
					}
				]
			},
			{
				section: "MariaDB Vector",
				items: [
					{
						name: "MARIADB_VECTOR_DB_URL",
						description: "MariaDB connection string for vector storage.",
						type: "Input"
					},
					{
						name: "MARIADB_VECTOR_INITIALIZE_MAX_VECTOR_LENGTH",
						description: "Maximum vector length for MariaDB Vector index initialization.",
						type: "Input",
						defaultValue: 1536
					},
					{
						name: "MARIADB_VECTOR_DISTANCE_STRATEGY",
						description: "Distance strategy metric for MariaDB Vector search.",
						type: "DropDown",
						values: [
							"COSINE",
							"EUCLIDEAN",
							"DOT_PRODUCT"
						],
						defaultValue: "COSINE"
					},
					{
						name: "MARIADB_VECTOR_INDEX_M",
						description: "M parameter for HNSW index construction in MariaDB Vector.",
						type: "Input",
						defaultValue: 16
					},
					{
						name: "MARIADB_VECTOR_POOL_SIZE",
						description: "Connection pool size for MariaDB Vector database connections.",
						type: "Input",
						defaultValue: 5
					},
					{
						name: "MARIADB_VECTOR_POOL_MAX_OVERFLOW",
						description: "Maximum pool overflow connections allowed for MariaDB Vector.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "MARIADB_VECTOR_POOL_TIMEOUT",
						description: "Timeout in seconds for obtaining a connection from MariaDB Vector pool.",
						type: "Input",
						defaultValue: 30
					},
					{
						name: "MARIADB_VECTOR_POOL_RECYCLE",
						description: "Connection recycle time in seconds for MariaDB Vector pool.",
						type: "Input",
						defaultValue: 3600
					}
				]
			},
			{
				section: "Valkey Vector",
				items: [
					{
						name: "VALKEY_URL",
						description: "Valkey database connection URL for vector search.",
						type: "Input"
					},
					{
						name: "VALKEY_COLLECTION_PREFIX",
						description: "Collection prefix for Valkey vector keys.",
						type: "Input",
						defaultValue: "open_webui:"
					},
					{
						name: "VALKEY_INDEX_TYPE",
						description: "Index structure type for Valkey vector storage.",
						type: "DropDown",
						values: ["HNSW", "FLAT"],
						defaultValue: "HNSW"
					},
					{
						name: "VALKEY_DISTANCE_METRIC",
						description: "Distance metric for Valkey vector similarity.",
						type: "DropDown",
						values: [
							"COSINE",
							"IP",
							"L2"
						],
						defaultValue: "COSINE"
					},
					{
						name: "VALKEY_HNSW_M",
						description: "Number of max outgoing links per node in Valkey HNSW graph.",
						type: "Input",
						defaultValue: 16
					},
					{
						name: "VALKEY_HNSW_EF_CONSTRUCTION",
						description: "Size of dynamic candidate list during Valkey index construction.",
						type: "Input",
						defaultValue: 200
					},
					{
						name: "VALKEY_HNSW_EF_RUNTIME",
						description: "Size of dynamic candidate list during Valkey query execution.",
						type: "Input",
						defaultValue: 10
					}
				]
			},
			{
				section: "Oracle 23ai Vector Search (oracle23ai)",
				items: [
					{
						name: "ORACLE_DB_USE_WALLET",
						description: "Determines the connection method to the Oracle Database.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ORACLE_DB_USER",
						description: "Specifies the username used to connect to the Oracle Database.",
						type: "Input",
						defaultValue: "DEMOUSER"
					},
					{
						name: "ORACLE_DB_PASSWORD",
						description: "Specifies the password for the `ORACLE_DB_USER`.",
						type: "Input",
						defaultValue: "Welcome123456"
					},
					{
						name: "ORACLE_DB_DSN",
						description: "Defines the Data Source Name for the Oracle Database connection.",
						type: "Input",
						defaultValue: "localhost:1521/FREEPDB1"
					},
					{
						name: "ORACLE_WALLET_DIR",
						description: "Required when `ORACLE_DB_USE_WALLET` is `true`. Specifies the absolute path to the directory containing the Oracle Cloud Wallet files.",
						type: "Input"
					},
					{
						name: "ORACLE_WALLET_PASSWORD",
						description: "Required when `ORACLE_DB_USE_WALLET` is `true`. Specifies the password for the Oracle Cloud Wallet.",
						type: "Input"
					},
					{
						name: "ORACLE_VECTOR_LENGTH",
						description: "Sets the expected dimension or length of the vector embeddings stored in the Oracle Database. This must match the embedding model used.",
						type: "Input",
						defaultValue: 768
					},
					{
						name: "ORACLE_DB_POOL_MIN",
						description: "The minimum number of connections to maintain in the Oracle Database connection pool.",
						type: "Input",
						defaultValue: 2
					},
					{
						name: "ORACLE_DB_POOL_MAX",
						description: "The maximum number of connections allowed in the Oracle Database connection pool.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "ORACLE_DB_POOL_INCREMENT",
						description: "The number of connections to create when the pool needs to grow.",
						type: "Input",
						defaultValue: 1
					}
				]
			},
			{
				section: "S3 Vector Bucket",
				items: [{
					name: "S3_VECTOR_BUCKET_NAME",
					description: "Specifies the name of the S3 Vector Bucket to store vectors in.",
					type: "Input"
				}, {
					name: "S3_VECTOR_REGION",
					description: "Specifies the AWS region where the S3 Vector Bucket is hosted.",
					type: "Input"
				}]
			}
		]
	},
	{
		category: "RAG Content Extraction Engine",
		items: [
			{
				name: "CONTENT_EXTRACTION_ENGINE",
				description: "Sets the content extraction engine to use for document ingestion.",
				type: "DropDown",
				values: [
					"",
					"external",
					"tika",
					"docling",
					"document_intelligence",
					"mistral_ocr",
					"mineru",
					"paddleocr_vl"
				]
			},
			{
				name: "ENABLE_PYODIDE_FILE_PERSISTENCE",
				description: "Persists files created inside the Pyodide code execution sandbox.",
				type: "CheckBox",
				defaultValue: true
			},
			{
				name: "TERMINAL_SERVER_CONNECTIONS",
				description: "JSON object specifying Open Terminal server connections.",
				type: "Input"
			},
			{
				name: "TERMINAL_PROXY_HEADERS",
				description: "Forwards authentication headers to Open Terminal instances.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "MISTRAL_OCR_API_KEY",
				description: "Specifies the Mistral OCR API key to use.",
				type: "Input"
			},
			{
				name: "MISTRAL_OCR_API_BASE_URL",
				description: "Configures custom Mistral OCR API endpoints for flexible deployment options, allowing users to point to self-hosted or alternative Mistral OCR instances.",
				type: "Input",
				defaultValue: "https://api.mistral.ai/v1"
			},
			{
				name: "EXTERNAL_DOCUMENT_LOADER_URL",
				description: "Sets the URL for the external document loader service.",
				type: "Input"
			},
			{
				name: "EXTERNAL_DOCUMENT_LOADER_API_KEY",
				description: "Sets the API key for authenticating with the external document loader service.",
				type: "Input"
			},
			{
				name: "TIKA_SERVER_URL",
				description: "Sets the URL for the Apache Tika server.",
				type: "Input",
				defaultValue: "http://localhost:9998"
			},
			{
				name: "DOCLING_SERVER_URL",
				description: "Specifies the URL for the Docling server. Requires Docling version 2.0.0 or later for full compatibility with the new parameter-based configuration system.",
				type: "Input",
				defaultValue: "http://docling:5001"
			},
			{
				name: "DOCLING_API_KEY",
				description: "Sets the API key for authenticating with the Docling server. Required when the Docling server has authentication enabled.",
				type: "Input"
			},
			{
				name: "DOCLING_PARAMS",
				description: "Specifies all Docling processing parameters in JSON format. This is the primary configuration method for Docling processing options. All previously individual Docling settings are now configured through this single JSON object.",
				type: "Input"
			},
			{
				name: "MINERU_API_TIMEOUT",
				description: "Sets the timeout in seconds for MinerU API requests during document processing.",
				type: "Input",
				defaultValue: 300
			}
		]
	},
	{
		category: "Retrieval Augmented Generation (RAG)",
		sections: [
			{
				section: "General",
				items: [
					{
						name: "BYPASS_RETRIEVAL_ACCESS_CONTROL",
						description: "Bypasses access controls for RAG collections.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_RETRIEVAL_UNSCOPED_COLLECTIONS",
						description: "Enables querying of unscoped collections in retrieval operations.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_KB_EXEC",
						description: "Allows Python code execution when querying knowledge base collections.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "RAG_EMBEDDING_ENGINE",
						description: "Selects an embedding engine to use for RAG.",
						type: "DropDown",
						values: [
							"",
							"ollama",
							"openai",
							"azure_openai"
						]
					},
					{
						name: "RAG_EMBEDDING_MODEL",
						description: "Sets a model for embeddings. Locally, a Sentence-Transformer model is used.",
						type: "Input",
						defaultValue: "sentence-transformers/all-MiniLM-L6-v2"
					},
					{
						name: "RAG_EMBEDDING_CONCURRENT_REQUESTS",
						description: "Maximum concurrent embedding requests sent to the provider.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "RAG_EMBEDDING_TIMEOUT",
						description: "Timeout in seconds for embedding API requests.",
						type: "Input",
						defaultValue: 60
					},
					{
						name: "RAG_RERANKING_ENGINE",
						description: "Specifies the reranking engine to use for document scoring.",
						type: "DropDown",
						values: [
							"",
							"cohere",
							"jina",
							"bge",
							"voyage",
							"tei"
						],
						defaultValue: ""
					},
					{
						name: "RAG_RERANKING_BATCH_SIZE",
						description: "Batch size for document reranking requests.",
						type: "Input",
						defaultValue: 16
					},
					{
						name: "RAG_TOKENIZER_MODEL",
						description: "Tokenizer model used for text chunking in RAG.",
						type: "Input",
						defaultValue: "gpt-4o"
					},
					{
						name: "PDF_LOADER_MODE",
						description: "Extraction mode for PDF document processing.",
						type: "DropDown",
						values: ["single", "page"],
						defaultValue: "single"
					},
					{
						name: "RAG_FILE_CONTENT_SEARCH_MAX_CHARS",
						description: "Maximum characters extracted when performing text content search over files.",
						type: "Input",
						defaultValue: 5e3
					},
					{
						name: "FILE_IMAGE_COMPRESSION_WIDTH",
						description: "Target image width when compressing images for RAG extraction.",
						type: "Input",
						defaultValue: 1024
					},
					{
						name: "FILE_IMAGE_COMPRESSION_HEIGHT",
						description: "Target image height when compressing images for RAG extraction.",
						type: "Input",
						defaultValue: 1024
					},
					{
						name: "ENABLE_RAG_HYBRID_SEARCH",
						description: "Enables the use of ensemble search with `BM25` + `ChromaDB`, with reranking using `sentence_transformers` models.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_RAG_HYBRID_SEARCH_ENRICHED_TEXTS",
						description: "Enables enriched text processing for hybrid search. When enabled, additional text preprocessing and enrichment techniques are applied to improve search quality and relevance in hybrid search mode.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "RAG_TOP_K",
						description: "Sets the default number of results to consider for the embedding when using RAG.",
						type: "Input",
						defaultValue: 3
					},
					{
						name: "RAG_TOP_K_RERANKER",
						description: "Sets the default number of results to consider for the reranker when using RAG.",
						type: "Input",
						defaultValue: 3
					},
					{
						name: "RAG_RELEVANCE_THRESHOLD",
						description: "Sets the relevance threshold to consider for documents when used with reranking.",
						type: "Input",
						defaultValue: 0
					},
					{
						name: "RAG_HYBRID_BM25_WEIGHT",
						description: "Sets the weight given to the keyword search (BM25) during hybrid search. 1 means only keyword serach, 0 means only vector search.",
						type: "Input",
						defaultValue: .5
					},
					{
						name: "RAG_TEMPLATE",
						description: "Template to use when injecting RAG documents into chat completion",
						type: "Input"
					},
					{
						name: "RAG_TEXT_SPLITTER",
						description: "Sets the text splitter for RAG models.",
						type: "DropDown",
						values: ["character", "token"],
						defaultValue: "character"
					},
					{
						name: "TIKTOKEN_CACHE_DIR",
						description: "Sets the directory for TikToken cache.",
						type: "Input",
						defaultValue: "{CACHE_DIR}/tiktoken"
					},
					{
						name: "TIKTOKEN_ENCODING_NAME",
						description: "Sets the encoding name for TikToken.",
						type: "Input",
						defaultValue: "cl100k_base"
					},
					{
						name: "CHUNK_SIZE",
						description: "Sets the document chunk size for embeddings.",
						type: "Input",
						defaultValue: 1e3
					},
					{
						name: "CHUNK_OVERLAP",
						description: "Specifies how much overlap there should be between chunks.",
						type: "Input",
						defaultValue: 100
					},
					{
						name: "CHUNK_MIN_SIZE_TARGET",
						description: "Chunks smaller than this threshold will be intelligently merged with neighboring chunks when possible. This helps prevent tiny, low-quality fragments that can hurt retrieval performance and waste embedding resources. This feature only works when `ENABLE_MARKDOWN_HEADER_TEXT_SPLITTER` is enabled. Set to `0` to disable merging.",
						type: "Input",
						defaultValue: 0
					},
					{
						name: "ENABLE_MARKDOWN_HEADER_TEXT_SPLITTER",
						description: "Enables markdown header text splitting as a preprocessing step before character or token splitting. When enabled, documents are first split by markdown headers (h1-h6), then the resulting chunks are further processed by the configured text splitter (`RAG_TEXT_SPLITTER`). This helps preserve document structure and context across chunks.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "PDF_EXTRACT_IMAGES",
						description: "Extracts images from PDFs using OCR when loading documents.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "RAG_FILE_MAX_SIZE",
						description: "Sets the maximum size of a file in megabytes that can be uploaded for document ingestion.",
						type: "Input"
					},
					{
						name: "RAG_FILE_MAX_COUNT",
						description: "Sets the maximum number of files that can be uploaded at once for document ingestion.",
						type: "Input"
					},
					{
						name: "RAG_ALLOWED_FILE_EXTENSIONS",
						description: "Specifies which file extensions are permitted for upload.",
						type: "Input"
					},
					{
						name: "RAG_RERANKING_MODEL",
						description: "Sets a model for reranking results. Locally, a Sentence-Transformer model is used.",
						type: "Input"
					},
					{
						name: "SENTENCE_TRANSFORMERS_CROSS_ENCODER_SIGMOID_ACTIVATION_FUNCTION",
						description: "When enabled (default), applies sigmoid normalization to local CrossEncoder reranking scores to ensure they fall within the 0-1 range. This allows the relevance threshold setting to work correctly with models like MS MARCO that output raw logits.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "RAG_EXTERNAL_RERANKER_TIMEOUT",
						description: "Sets the timeout in seconds for external reranker API requests during RAG document retrieval. Leave empty to use default timeout behavior.",
						type: "Input"
					},
					{
						name: "RAG_EXTERNAL_RERANKER_URL",
						description: "Sets the **full URL** for the external reranking API.",
						type: "Input"
					},
					{
						name: "RAG_EXTERNAL_RERANKER_API_KEY",
						description: "Sets the API key for the external reranking API.",
						type: "Input"
					},
					{
						name: "RAG_OPENAI_API_BASE_URL",
						description: "Sets the OpenAI base API URL to use for RAG embeddings.",
						type: "Input",
						defaultValue: "${OPENAI_API_BASE_URL}"
					},
					{
						name: "RAG_OPENAI_API_KEY",
						description: "Sets the OpenAI API key to use for RAG embeddings.",
						type: "Input",
						defaultValue: "${OPENAI_API_KEY}"
					},
					{
						name: "RAG_EMBEDDING_OPENAI_BATCH_SIZE",
						description: "Sets the batch size for OpenAI embeddings.",
						type: "Input",
						defaultValue: 1
					},
					{
						name: "RAG_EMBEDDING_BATCH_SIZE",
						description: "Controls how many text chunks are embedded in a single API request when using external embedding providers (Ollama, OpenAI, or Azure OpenAI). Higher values (20-100+; max 16000 (not recommended)) may process documents faster by sending less, but larger API requests. Some external APIs do not support batching or sending more than 1 chunk per request. In such case you must leave this at `1`. Default is 1 (safest option if the API does not support batching / more than 1 chunk per request). This setting only applies to external embedding engines, not the default SentenceTransformers engine.",
						type: "Input",
						defaultValue: 1
					},
					{
						name: "ENABLE_ASYNC_EMBEDDING",
						description: "Runs embedding tasks asynchronously (parallelized) for maximum performance. Only works for Ollama, OpenAI and Azure OpenAI, does not affect sentence transformer setups.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "RAG_EMBEDDING_CONTENT_PREFIX",
						description: "Specifies the prefix for the RAG embedding content.",
						type: "Input"
					},
					{
						name: "RAG_EMBEDDING_PREFIX_FIELD_NAME",
						description: "Specifies the field name for the RAG embedding prefix.",
						type: "Input"
					},
					{
						name: "RAG_EMBEDDING_QUERY_PREFIX",
						description: "Specifies the prefix for the RAG embedding query.",
						type: "Input"
					},
					{
						name: "RAG_OLLAMA_API_KEY",
						description: "Sets the API key for Ollama API used in RAG models.",
						type: "Input"
					},
					{
						name: "RAG_AZURE_OPENAI_BASE_URL",
						description: "Sets the base URL for Azure OpenAI Services when using Azure OpenAI for RAG embeddings. Should be in the format `https://{your-resource-name}.openai.azure.com`.",
						type: "Input"
					},
					{
						name: "RAG_AZURE_OPENAI_API_KEY",
						description: "Sets the API key for Azure OpenAI Services when using Azure OpenAI for RAG embeddings.",
						type: "Input"
					},
					{
						name: "RAG_AZURE_OPENAI_API_VERSION",
						description: "Sets the API version for Azure OpenAI Services when using Azure OpenAI for RAG embeddings. Common values include `2023-05-15`, `2023-12-01-preview`, or `2024-02-01`.",
						type: "Input"
					},
					{
						name: "RAG_OLLAMA_BASE_URL",
						description: "Sets the base URL for Ollama API used in RAG models.",
						type: "Input"
					},
					{
						name: "ENABLE_RETRIEVAL_QUERY_GENERATION",
						description: "Enables or disables retrieval query generation.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_QUERIES_CACHE",
						description: "Enables request-scoped caching of LLM-generated search queries. When enabled, queries generated for web search are **cached** and automatically **reused** for file/knowledge base retrieval within the same request. This **eliminates duplicate LLM calls** when both web search and RAG are active, **reducing token usage and latency** while maintaining search quality. It is highly recommended to enable this especially in larger setups.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "QUERY_GENERATION_PROMPT_TEMPLATE",
						description: "Sets the prompt template for query generation.",
						type: "Input"
					},
					{
						name: "BYPASS_EMBEDDING_AND_RETRIEVAL",
						description: "Bypasses the embedding and retrieval process.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "RAG_FULL_CONTEXT",
						description: "Specifies whether to use the full context for RAG.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "RAG_SYSTEM_CONTEXT",
						description: "When enabled, injects RAG context into the **system message** instead of the user message. This is highly recommended for optimizing performance when using models that support **KV prefix caching** or **Prompt Caching**. This includes local engines (like Ollama, llama.cpp, or vLLM) and cloud providers / Model-as-a-Service providers (like OpenAI and Vertex AI). By placing the context in the system message, it remains at a stable position at the start of the conversation, allowing the cache to persist across multiple turns. When disabled (default), context is injected into the user message, which shifts position each turn and invalidates the cache.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_RAG_LOCAL_WEB_FETCH",
						description: "Controls whether RAG web fetch operations can access URLs that resolve to private/local network IP addresses.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WEB_FETCH_FILTER_LIST",
						description: "Configures additional URL filtering rules for web fetch operations to prevent Server-Side Request Forgery (SSRF) attacks. The system includes a default blocklist that protects against access to cloud metadata endpoints (AWS, Google Cloud, Azure, Alibaba Cloud). Entries without a ! prefix are treated as an allow list (only these domains are permitted), while entries with a ! prefix are added to the block list (these domains are always denied). The default blocklist includes !169.254.169.254, !fd00:ec2::254, !metadata.google.internal, !metadata.azure.com, and !100.100.100.200. Custom entries are merged with the default blocklist.",
						type: "Input"
					},
					{
						name: "DOCUMENT_INTELLIGENCE_ENDPOINT",
						description: "Specifies the endpoint for document intelligence.",
						type: "Input"
					},
					{
						name: "DOCUMENT_INTELLIGENCE_KEY",
						description: "Specifies the key for document intelligence.",
						type: "Input"
					},
					{
						name: "DOCUMENT_INTELLIGENCE_MODEL",
						description: "Specifies the model for document intelligence.",
						type: "Input"
					},
					{
						name: "MISTRAL_OCR_USE_BASE64",
						description: "Send local files as Base64 strings to Mistral OCR API.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "EXTERNAL_DOCUMENT_LOADER_HEADERS",
						description: "Headers to send to external document loader service as a JSON object.",
						type: "Input",
						defaultValue: "{}"
					},
					{
						name: "MINERU_FILE_EXTENSIONS",
						description: "Comma-separated file extensions handled by MinerU document parser.",
						type: "Input",
						defaultValue: ".pdf,.doc,.docx,.ppt,.pptx,.epub"
					},
					{
						name: "MINERU_MAX_MARKDOWN_BYTES",
						description: "Maximum size in bytes of markdown content returned by MinerU.",
						type: "Input",
						defaultValue: 10485760
					},
					{
						name: "MINERU_PARAMS",
						description: "Optional JSON parameters forwarded to MinerU API.",
						type: "Input",
						defaultValue: "{}"
					},
					{
						name: "PADDLEOCR_VL_BASE_URL",
						description: "Base URL for PaddleOCR-VL document parser service.",
						type: "Input"
					},
					{
						name: "PADDLEOCR_VL_TOKEN",
						description: "API key or bearer token for PaddleOCR-VL service.",
						type: "Input"
					}
				]
			},
			{
				section: "Google Drive",
				items: [
					{
						name: "ENABLE_GOOGLE_DRIVE_INTEGRATION",
						description: "Enables or disables Google Drive integration. If set to true, and `GOOGLE_DRIVE_CLIENT_ID` & `GOOGLE_DRIVE_API_KEY` are both configured, Google Drive will appear as an upload option in the chat UI.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "GOOGLE_DRIVE_CLIENT_ID",
						description: "Sets the client ID for Google Drive (client must be configured with Drive API and Picker API enabled).",
						type: "Input"
					},
					{
						name: "GOOGLE_DRIVE_API_KEY",
						description: "Sets the API key for Google Drive integration.",
						type: "Input"
					}
				]
			},
			{
				section: "OneDrive",
				items: [
					{
						name: "ENABLE_ONEDRIVE_INTEGRATION",
						description: "Enables or disables the Microsoft OneDrive integration feature globally.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_ONEDRIVE_PERSONAL",
						description: "Controls whether the \"Personal OneDrive\" option appears in the attachment menu. Requires `ONEDRIVE_PERSONAL_CLIENT_ID` to be configured.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_ONEDRIVE_BUSINESS",
						description: "Controls whether the \"Work/School OneDrive\" option appears in the attachment menu. Requires `ONEDRIVE_CLIENT_ID` to be configured.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ONEDRIVE_CLIENT_ID",
						description: "Generic environment variable for the OneDrive Client ID. You should rather use the specific `ONEDRIVE_CLIENT_ID_PERSONAL` or `ONEDRIVE_CLIENT_ID_BUSINESS` variables. This exists as a legacy option for backwards compatibility.",
						type: "Input"
					},
					{
						name: "ONEDRIVE_CLIENT_ID_PERSONAL",
						description: "Specifies the Application (client) ID for the **Personal OneDrive** integration. This requires a separate Azure App Registration configured to support personal Microsoft accounts. **Do not put the business OneDrive client ID here!**",
						type: "Input"
					},
					{
						name: "ONEDRIVE_CLIENT_ID_BUSINESS",
						description: "Specifies the Application (client) ID for the **Work/School (Business) OneDrive** integration. This requires a separate Azure App Registration configured to support personal Microsoft accounts. **Do not put the personal OneDrive client ID here!**",
						type: "Input"
					},
					{
						name: "ONEDRIVE_SHAREPOINT_URL",
						description: "Specifies the root SharePoint site URL for the work/school integration, e.g., `https://companyname.sharepoint.com`.",
						type: "Input"
					},
					{
						name: "ONEDRIVE_SHAREPOINT_TENANT_ID",
						description: "Specifies the Directory (tenant) ID for the work/school integration. This is obtained from your business-focused Azure App Registration.",
						type: "Input"
					}
				]
			}
		]
	},
	{
		category: "Web Search",
		sections: [
			{
				section: "General",
				items: [
					{
						name: "ENABLE_WEB_SEARCH",
						description: "Enable web search toggle.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_SEARCH_QUERY_GENERATION",
						description: "Enables or disables search query generation.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "WEB_SEARCH_DOMAIN_FILTER_LIST",
						description: "Comma-separated list of domains to filter web search results. Domains prefixed with `!` are blocked; domains without prefix create an allowlist (only those domains permitted).",
						type: "Input"
					},
					{
						name: "WEB_SEARCH_CONCURRENT_REQUESTS",
						description: "Limits the number of concurrent search requests to the search engine provider. Set to `0` for unlimited concurrency (default). Set to `1` for sequential execution to prevent rate limiting errors (e.g., Brave Free Tier).",
						type: "Input",
						defaultValue: 0
					},
					{
						name: "WEB_SEARCH_TRUST_ENV",
						description: "Enables proxy set by `http_proxy` and `https_proxy` during web search content fetching.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WEB_SEARCH_RESULT_COUNT",
						description: "Maximum number of search results to crawl.",
						type: "Input",
						defaultValue: 3
					},
					{
						name: "WEB_LOADER_CONCURRENT_REQUESTS",
						description: "Specifies the number of concurrent requests used by the web loader to fetch content from web pages returned by search results. This directly impacts how many pages can be crawled simultaneously.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "WEB_FETCH_MAX_CONTENT_LENGTH",
						description: "Maximum content length in bytes permitted when fetching web pages.",
						type: "Input",
						defaultValue: 10485760
					},
					{
						name: "USER_AGENT",
						description: "Custom User-Agent HTTP header sent when fetching web page content.",
						type: "Input"
					},
					{
						name: "AIOHTTP_CLIENT_TIMEOUT_TOOL_SERVER",
						description: "Timeout in seconds for HTTP requests to external tool servers.",
						type: "Input",
						defaultValue: 300
					},
					{
						name: "AIOHTTP_CLIENT_SSL_CERT_FILE",
						description: "Path to custom CA certificate file for SSL verification during web requests.",
						type: "Input"
					},
					{
						name: "AIOHTTP_CLIENT_ALLOW_REDIRECTS",
						description: "Allows HTTP redirects when fetching web page content.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "AIOHTTP_POOL_CONNECTIONS",
						description: "Total connection pool capacity for async HTTP requests.",
						type: "Input",
						defaultValue: 100
					},
					{
						name: "AIOHTTP_POOL_CONNECTIONS_PER_HOST",
						description: "Connection pool limit per host for async HTTP requests.",
						type: "Input",
						defaultValue: 100
					},
					{
						name: "AIOHTTP_POOL_DNS_TTL",
						description: "DNS cache TTL in seconds for connection pool.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "WEB_SEARCH_ENGINE",
						description: "Specifies the search engine to use.",
						type: "DropDown",
						values: [
							"searxng",
							"google_pse",
							"brave",
							"kagi",
							"mojeek",
							"bocha",
							"serpstack",
							"serper",
							"serply",
							"searchapi",
							"serpapi",
							"duckduckgo",
							"tavily",
							"jina",
							"bing",
							"exa",
							"perplexity",
							"perplexity_search",
							"ollama_cloud",
							"azure_ai_search",
							"yacy",
							"sougou"
						]
					},
					{
						name: "BYPASS_WEB_SEARCH_EMBEDDING_AND_RETRIEVAL",
						description: "Bypasses the web search embedding and retrieval process.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "BYPASS_WEB_SEARCH_WEB_LOADER",
						description: "Bypasses the web loader when performing web search. When enabled, only snippets from the search engine are used, and the full page content is not fetched.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "SEARXNG_LANGUAGE",
						description: "This variable is used in the request to searxng as the \"search language\" (arguement \"language\").",
						type: "Input",
						defaultValue: "all"
					},
					{
						name: "DDGS_BACKEND",
						description: "Specifies the backend to be used by the DDGS engine.",
						type: "DropDown",
						values: [
							"auto",
							"bing",
							"brave",
							"duckduckgo",
							"google",
							"grokipedia",
							"mojeek",
							"wikipedia",
							"yahoo",
							"yandex"
						],
						defaultValue: "auto"
					},
					{
						name: "SEARXNG_QUERY_URL",
						description: "The [SearXNG search API](https://docs.searxng.org/dev/search_api.html) URL supporting JSON output. `<query>` is replaced with the search query. Example: `http://searxng.local/search?q=<query>`",
						type: "Input"
					},
					{
						name: "GOOGLE_PSE_API_KEY",
						description: "Sets the API key for the Google Programmable Search Engine (PSE) service.",
						type: "Input"
					},
					{
						name: "GOOGLE_PSE_ENGINE_ID",
						description: "The engine ID for the Google Programmable Search Engine (PSE) service.",
						type: "Input"
					},
					{
						name: "BRAVE_SEARCH_API_KEY",
						description: "Sets the API key for the Brave Search API.",
						type: "Input"
					},
					{
						name: "BRAVE_SEARCH_CONTEXT_TOKENS",
						description: "Maximum context tokens requested from Brave Search API.",
						type: "Input",
						defaultValue: 500
					},
					{
						name: "KAGI_SEARCH_API_KEY",
						description: "Sets the API key for Kagi Search API.",
						type: "Input"
					},
					{
						name: "MOJEEK_SEARCH_API_KEY",
						description: "Sets the API key for Mojeek Search API.",
						type: "Input"
					},
					{
						name: "SERPSTACK_API_KEY",
						description: "Sets the API key for Serpstack search API.",
						type: "Input"
					},
					{
						name: "SERPSTACK_HTTPS",
						description: "Configures the use of HTTPS for Serpstack requests. Free tier requests are restricted to HTTP only.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "SERPER_API_KEY",
						description: "Sets the API key for Serper search API.",
						type: "Input"
					},
					{
						name: "SERPLY_API_KEY",
						description: "Sets the API key for Serply search API.",
						type: "Input"
					},
					{
						name: "SEARCHAPI_API_KEY",
						description: "Sets the API key for SearchAPI.",
						type: "Input"
					},
					{
						name: "SEARCHAPI_ENGINE",
						description: "Sets the SearchAPI engine.",
						type: "Input"
					},
					{
						name: "TAVILY_API_KEY",
						description: "Sets the API key for Tavily search API.",
						type: "Input"
					},
					{
						name: "JINA_API_KEY",
						description: "Sets the API key for Jina.",
						type: "Input"
					},
					{
						name: "JINA_API_BASE_URL",
						description: "Sets the Base URL for Jina Search API. Useful for specifying custom or regional endpoints (e.g., `https://eu-s-beta.jina.ai/`).",
						type: "Input",
						defaultValue: "https://s.jina.ai/"
					},
					{
						name: "BING_SEARCH_V7_ENDPOINT",
						description: "Sets the endpoint for Bing Search API.",
						type: "Input"
					},
					{
						name: "BING_SEARCH_V7_SUBSCRIPTION_KEY",
						description: "Sets the subscription key for Bing Search API.",
						type: "Input",
						defaultValue: "https://api.bing.microsoft.com/v7.0/search"
					},
					{
						name: "BOCHA_SEARCH_API_KEY",
						description: "Sets the API key for Bocha Search API.",
						type: "Input"
					},
					{
						name: "EXA_API_KEY",
						description: "Sets the API key for Exa search API.",
						type: "Input"
					},
					{
						name: "SERPAPI_API_KEY",
						description: "Sets the API key for SerpAPI.",
						type: "Input"
					},
					{
						name: "SERPAPI_ENGINE",
						description: "Specifies the search engine to use for SerpAPI.",
						type: "Input"
					},
					{
						name: "SOUGOU_API_SID",
						description: "Sets the Sogou API SID.",
						type: "Input"
					},
					{
						name: "SOUGOU_API_SK",
						description: "Sets the Sogou API SK.",
						type: "Input"
					},
					{
						name: "OLLAMA_CLOUD_WEB_SEARCH_API_KEY",
						description: "Sets the Ollama Cloud Web Search API Key.",
						type: "Input"
					},
					{
						name: "AZURE_AI_SEARCH_API_KEY",
						description: "API key (query key or admin key) for authenticating with Azure AI Search service. Required for using Azure AI Search as a web search provider.",
						type: "Input"
					},
					{
						name: "AZURE_AI_SEARCH_ENDPOINT",
						description: "Azure Search service endpoint URL. Specifies which Azure Search service instance to connect to.",
						type: "Input"
					},
					{
						name: "AZURE_AI_SEARCH_INDEX_NAME",
						description: "Name of the search index to query within your Azure Search service. Different indexes can contain different types of searchable content.",
						type: "Input"
					},
					{
						name: "YACY_QUERY_URL",
						description: "Sets the query URL for YaCy search engine integration. Should point to a YaCy instance's search API endpoint.",
						type: "Input"
					},
					{
						name: "YACY_USERNAME",
						description: "Specifies the username for authenticated access to YaCy search engine.",
						type: "Input"
					},
					{
						name: "YACY_PASSWORD",
						description: "Specifies the password for authenticated access to YaCy search engine.",
						type: "Input"
					},
					{
						name: "EXTERNAL_WEB_SEARCH_URL",
						description: "Specifies the URL of an external web search service API endpoint for custom search integrations.",
						type: "Input"
					},
					{
						name: "EXTERNAL_WEB_SEARCH_API_KEY",
						description: "Sets the API key for authenticating with the external web search service.",
						type: "Input"
					},
					{
						name: "EXTERNAL_WEB_LOADER_URL",
						description: "Specifies the URL of an external web content loader service for fetching and processing web pages.",
						type: "Input"
					},
					{
						name: "EXTERNAL_WEB_LOADER_API_KEY",
						description: "Sets the API key for authenticating with the external web loader service.",
						type: "Input"
					},
					{
						name: "PERPLEXITY_API_KEY",
						description: "Sets the API key for Perplexity API.",
						type: "Input"
					},
					{
						name: "PERPLEXITY_SEARCH_API_URL",
						description: "Configures the API endpoint for Perplexity Search. Allows using custom or self-hosted Perplexity-compatible API endpoints (such as LiteLLM's `/search` endpoint) instead of the hardcoded default for the official Perplexity API.",
						type: "Input",
						defaultValue: "https://api.perplexity.ai/search"
					},
					{
						name: "PERPLEXITY_MODEL",
						description: "Specifies the Perplexity AI model to use for search queries when using `Perplexity` as the web search engine.",
						type: "Input",
						defaultValue: "sonar"
					},
					{
						name: "PERPLEXITY_SEARCH_CONTEXT_USAGE",
						description: "Controls the amount of search context used by Perplexity AI. Options typically include `low`, `medium`, `high`.",
						type: "Input",
						defaultValue: "medium"
					},
					{
						name: "TAVILY_EXTRACT_DEPTH",
						description: "Specifies the extract depth for Tavily search results.",
						type: "Input",
						defaultValue: "basic"
					}
				]
			},
			{
				section: "Web Loader Configuration",
				items: [
					{
						name: "WEB_LOADER_ENGINE",
						description: "Specifies the loader to use for retrieving and processing web content.",
						type: "DropDown",
						values: [
							"safe_web",
							"playwright",
							"firecrawl",
							"tavily",
							"external"
						]
					},
					{
						name: "PLAYWRIGHT_WS_URL",
						description: "Specifies the WebSocket URI of a remote Playwright browser instance. When set, Open WebUI will use this remote browser instead of installing browser dependencies locally. This is particularly useful in containerized environments where you want to keep the Open WebUI container lightweight and separate browser concerns. Example: `ws://playwright:3000`",
						type: "Input"
					},
					{
						name: "FIRECRAWL_API_BASE_URL",
						description: "Sets the base URL for Firecrawl API.",
						type: "Input",
						defaultValue: "https://api.firecrawl.dev"
					},
					{
						name: "FIRECRAWL_API_KEY",
						description: "Sets the API key for Firecrawl API.",
						type: "Input"
					},
					{
						name: "FIRECRAWL_TIMEOUT",
						description: "Specifies the timeout in milliseconds for Firecrawl requests. If not set, the default Firecrawl timeout is used.",
						type: "Input"
					},
					{
						name: "PLAYWRIGHT_TIMEOUT",
						description: "Specifies the timeout for Playwright requests.",
						type: "Input"
					},
					{
						name: "WEB_LOADER_TIMEOUT",
						description: "Specifies the request timeout in seconds for the SafeWebBaseLoader when scraping web pages. Without this setting, web scraping operations can hang indefinitely on slow or unresponsive pages. Recommended values are 10–30 seconds depending on your network conditions.",
						type: "Input"
					}
				]
			},
			{
				section: "YouTube Loader",
				items: [{
					name: "YOUTUBE_LOADER_PROXY_URL",
					description: "Sets the proxy URL for YouTube loader.",
					type: "Input"
				}, {
					name: "YOUTUBE_LOADER_LANGUAGE",
					description: "Comma-separated list of language codes to try when fetching YouTube video transcriptions, in priority order.",
					type: "Input",
					defaultValue: "en"
				}]
			}
		]
	},
	{
		category: "Audio",
		sections: [
			{
				section: "Whisper Speech-to-Text (Local)",
				items: [
					{
						name: "WHISPER_MODEL",
						description: "Sets the Whisper model to use for Speech-to-Text. The backend used is faster_whisper with quantization to `int8`.",
						type: "Input",
						defaultValue: "base"
					},
					{
						name: "WHISPER_MODEL_DIR",
						description: "Specifies the directory to store Whisper model files.",
						type: "Input",
						defaultValue: "${DATA_DIR}/cache/whisper/models"
					},
					{
						name: "WHISPER_VAD_FILTER",
						description: "Specifies whether to apply a Voice Activity Detection (VAD) filter to Whisper Speech-to-Text.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WHISPER_COMPUTE_TYPE",
						description: "Sets the compute type for Whisper model inference. Defaults to `int8` for CPU and `float16` for CUDA (with fallback to `int8/int8_float16`).",
						type: "Input"
					},
					{
						name: "WHISPER_MODEL_AUTO_UPDATE",
						description: "Toggles automatic update of the Whisper model.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WHISPER_LANGUAGE",
						description: "Specifies the ISO 639-1 language Whisper uses for STT (ISO 639-2 for Hawaiian and Cantonese). Whisper predicts the language by default.",
						type: "Input"
					},
					{
						name: "WHISPER_MULTILINGUAL",
						description: "Toggles whether to use the multilingual Whisper model. When set to `False`, the system will use the English-only model for better performance in English-centric tasks. When `True`, it supports multiple languages.",
						type: "CheckBox",
						defaultValue: false
					}
				]
			},
			{
				section: "Speech-to-Text (OpenAI)",
				items: [
					{
						name: "AUDIO_STT_ENGINE",
						description: "Specifies the Speech-to-Text engine to use.",
						type: "DropDown",
						values: [
							"",
							"openai",
							"deepgram",
							"azure",
							"mistral"
						]
					},
					{
						name: "AUDIO_STT_MODEL",
						description: "Specifies the Speech-to-Text model to use for OpenAI-compatible endpoints.",
						type: "Input",
						defaultValue: "whisper-1"
					},
					{
						name: "AUDIO_STT_OPENAI_API_BASE_URL",
						description: "Sets the OpenAI-compatible base URL to use for Speech-to-Text.",
						type: "Input",
						defaultValue: "${OPENAI_API_BASE_URL}"
					},
					{
						name: "AUDIO_STT_OPENAI_API_KEY",
						description: "Sets the OpenAI API key to use for Speech-to-Text.",
						type: "Input",
						defaultValue: "${OPENAI_API_KEY}"
					}
				]
			},
			{
				section: "Speech-to-Text (Mistral)",
				items: [
					{
						name: "AUDIO_STT_MISTRAL_API_KEY",
						description: "Sets the Mistral API key to use for Speech-to-Text.",
						type: "Input"
					},
					{
						name: "AUDIO_STT_MISTRAL_API_BASE_URL",
						description: "Specifies the Mistral API base URL to use for Speech-to-Text.",
						type: "Input",
						defaultValue: "https://api.mistral.ai/v1"
					},
					{
						name: "AUDIO_STT_MISTRAL_USE_CHAT_COMPLETIONS",
						description: "Enables using Mistral chat completions endpoint for Speech-to-Text instead of the dedicated STT endpoint.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "AUDIO_STT_SUPPORTED_CONTENT_TYPES",
						description: "Comma-separated list of supported audio content types for Speech-to-Text.",
						type: "Input"
					}
				]
			},
			{
				section: "Speech-to-Text (Azure)",
				items: [
					{
						name: "AUDIO_STT_AZURE_API_KEY",
						description: "Specifies the Azure API key to use for Speech-to-Text.",
						type: "Input"
					},
					{
						name: "AUDIO_STT_AZURE_REGION",
						description: "Specifies the Azure region to use for Speech-to-Text.",
						type: "Input"
					},
					{
						name: "AUDIO_STT_AZURE_BASE_URL",
						description: "Specifies the Azure base URL to use for Speech-to-Text. Overrides the default Azure endpoint.",
						type: "Input"
					},
					{
						name: "AUDIO_STT_AZURE_MAX_SPEAKERS",
						description: "Sets the maximum number of speakers for Azure Speech-to-Text diarization.",
						type: "Input",
						defaultValue: 3
					},
					{
						name: "AUDIO_STT_AZURE_LOCALES",
						description: "Specifies the locales to use for Azure Speech-to-Text.",
						type: "Input"
					}
				]
			},
			{
				section: "Speech-to-Text (Deepgram)",
				items: [{
					name: "DEEPGRAM_API_KEY",
					description: "Specifies the Deepgram API key to use for Speech-to-Text.",
					type: "Input"
				}]
			},
			{
				section: "Text-to-Speech",
				items: [
					{
						name: "AUDIO_TTS_API_KEY",
						description: "Sets the API key for Text-to-Speech.",
						type: "Input"
					},
					{
						name: "AUDIO_TTS_ENGINE",
						description: "Specifies the Text-to-Speech engine to use.",
						type: "DropDown",
						values: [
							"",
							"azure",
							"elevenlabs",
							"openai",
							"transformers"
						]
					},
					{
						name: "AUDIO_TTS_MODEL",
						description: "Specifies the OpenAI text-to-speech model to use.",
						type: "Input",
						defaultValue: "tts-1"
					},
					{
						name: "AUDIO_TTS_VOICE",
						description: "Sets the OpenAI text-to-speech voice to use.",
						type: "Input",
						defaultValue: "alloy"
					},
					{
						name: "AUDIO_TTS_SPLIT_ON",
						description: "Sets the OpenAI text-to-speech split on to use.",
						type: "Input",
						defaultValue: "punctuation"
					}
				]
			},
			{
				section: "Azure Text-to-Speech",
				items: [
					{
						name: "AUDIO_TTS_AZURE_SPEECH_REGION",
						description: "Sets the region for Azure Text to Speech.",
						type: "Input"
					},
					{
						name: "AUDIO_TTS_AZURE_SPEECH_OUTPUT_FORMAT",
						description: "Sets the output format for Azure Text to Speech.",
						type: "Input",
						defaultValue: "audio-24khz-160kbitrate-mono-mp3"
					},
					{
						name: "AUDIO_TTS_AZURE_SPEECH_BASE_URL",
						description: "Sets the base URL for Azure Text to Speech. Overrides the default Azure endpoint.",
						type: "Input"
					}
				]
			},
			{
				section: "OpenAI Text-to-Speech",
				items: [
					{
						name: "AUDIO_TTS_OPENAI_API_BASE_URL",
						description: "Sets the OpenAI-compatible base URL to use for text-to-speech.",
						type: "Input",
						defaultValue: "${OPENAI_API_BASE_URL}"
					},
					{
						name: "AUDIO_TTS_OPENAI_API_KEY",
						description: "Sets the API key to use for text-to-speech.",
						type: "Input",
						defaultValue: "${OPENAI_API_KEY}"
					},
					{
						name: "AUDIO_TTS_OPENAI_PARAMS",
						description: "Additional parameters for OpenAI text-to-speech API in JSON format.",
						type: "Input"
					}
				]
			},
			{
				section: "Elevenlabs Text-to-Speech",
				items: [{
					name: "ELEVENLABS_API_BASE_URL",
					description: "Configures custom ElevenLabs API endpoints, enabling support for EU residency API requirements and other regional deployments.",
					type: "Input",
					defaultValue: "https://api.elevenlabs.io"
				}]
			},
			{
				section: "Voice Mode",
				items: [{
					name: "VOICE_MODE_PROMPT_TEMPLATE",
					description: "Sets the prompt template for voice mode interactions. This template is used to format voice input before sending to the model.",
					type: "Input"
				}]
			}
		]
	},
	{
		category: "Image Generation",
		sections: [
			{
				section: "General",
				items: [
					{
						name: "ENABLE_IMAGE_GENERATION",
						description: "Enables or disables image generation features.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "IMAGE_GENERATION_ENGINE",
						description: "Specifies the engine to use for image generation.",
						type: "DropDown",
						values: [
							"openai",
							"comfyui",
							"automatic1111",
							"gemini"
						],
						defaultValue: "openai"
					},
					{
						name: "IMAGE_GENERATION_MODEL",
						description: "Default model to use for image generation (e.g., `dall-e-3`, `gemini-2.0-flash-exp`).",
						type: "Input"
					},
					{
						name: "ENABLE_IMAGE_PROMPT_GENERATION",
						description: "Enables or disables automatic enhancement of user prompts for better image generation results.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "IMAGE_PROMPT_GENERATION_PROMPT_TEMPLATE",
						description: "Specifies the template to use for generating image prompts.",
						type: "Input"
					},
					{
						name: "IMAGE_SIZE",
						description: "Sets the default output dimensions for generated images in WIDTHxHEIGHT format (e.g., `1024x1024`).",
						type: "Input",
						defaultValue: "512x512"
					},
					{
						name: "IMAGE_STEPS",
						description: "Sets the default iteration steps for image generation. Used for ComfyUI and AUTOMATIC1111 engines.",
						type: "Input",
						defaultValue: 50
					}
				]
			},
			{
				section: "Image Editing",
				items: [
					{
						name: "ENABLE_IMAGE_EDIT",
						description: "When disabled, Image Editing will not be used and instead, images will be created only using the image generation engine.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "IMAGE_EDIT_ENGINE",
						description: "Configures the engine used for image editing operations, enabling modification of existing images using text prompts.",
						type: "DropDown",
						values: [
							"openai",
							"gemini",
							"comfyui"
						],
						defaultValue: "openai"
					},
					{
						name: "IMAGE_EDIT_MODEL",
						description: "Specifies the model to use for image editing operations within the selected engine (e.g., `dall-e-2`, `gemini-2.5-flash`).",
						type: "Input"
					},
					{
						name: "IMAGE_EDIT_SIZE",
						description: "Defines the output dimensions for edited images in WIDTHxHEIGHT format (e.g., `1024x1024`). Leave empty to preserve original dimensions.",
						type: "Input"
					}
				]
			},
			{
				section: "AUTOMATIC1111",
				items: [
					{
						name: "AUTOMATIC1111_BASE_URL",
						description: "Specifies the URL to AUTOMATIC1111's Stable Diffusion API (e.g., `http://127.0.0.1:7860`).",
						type: "Input"
					},
					{
						name: "AUTOMATIC1111_API_AUTH",
						description: "Sets the AUTOMATIC1111 API authentication credentials if required.",
						type: "Input"
					},
					{
						name: "AUTOMATIC1111_PARAMS",
						description: "Additional parameters in JSON format to pass to AUTOMATIC1111 API requests (e.g., `{\"cfg_scale\": 7, \"sampler_name\": \"Euler a\", \"scheduler\": \"normal\"}`).",
						type: "Input"
					}
				]
			},
			{
				section: "ComfyUI",
				items: [
					{
						name: "COMFYUI_BASE_URL",
						description: "Specifies the URL to the ComfyUI image generation API (e.g., `http://127.0.0.1:8188`).",
						type: "Input"
					},
					{
						name: "COMFYUI_API_KEY",
						description: "Sets the API key for ComfyUI authentication.",
						type: "Input"
					},
					{
						name: "COMFYUI_WORKFLOW",
						description: "Defines the ComfyUI workflow configuration in JSON format. Export from ComfyUI using \"Save (API Format)\" to ensure compatibility.",
						type: "Input"
					},
					{
						name: "COMFYUI_WORKFLOW_NODES",
						description: "Specifies the ComfyUI workflow node mappings for image generation, defining which nodes handle prompt, model, dimensions, and other parameters. Configured automatically via the admin UI.",
						type: "Input"
					},
					{
						name: "IMAGES_EDIT_COMFYUI_BASE_URL",
						description: "Configures the ComfyUI base URL for image editing operations, enabling self-hosted ComfyUI workflows for image manipulation.",
						type: "Input"
					},
					{
						name: "IMAGES_EDIT_COMFYUI_API_KEY",
						description: "Provides authentication for ComfyUI image editing API requests when the ComfyUI instance requires API key authentication.",
						type: "Input"
					},
					{
						name: "IMAGES_EDIT_COMFYUI_WORKFLOW",
						description: "Defines the ComfyUI workflow configuration in JSON format for image editing operations. Must include nodes for image input, prompt, and output. Export from ComfyUI using \"Save (API Format)\".",
						type: "Input"
					},
					{
						name: "IMAGES_EDIT_COMFYUI_WORKFLOW_NODES",
						description: "Specifies the ComfyUI workflow node mappings for image editing, defining which nodes handle image input, prompt, model, dimensions, and other parameters. Configured automatically via the admin UI.",
						type: "Input"
					}
				]
			},
			{
				section: "Gemini",
				items: [
					{
						name: "GEMINI_API_BASE_URL",
						description: "Specifies the URL to Gemini's API.",
						type: "Input"
					},
					{
						name: "GEMINI_API_KEY",
						description: "Sets the Gemini API key.",
						type: "Input"
					},
					{
						name: "IMAGES_GEMINI_API_BASE_URL",
						description: "Specifies the URL to Gemini's image generation API.",
						type: "Input",
						defaultValue: "${GEMINI_API_BASE_URL}"
					},
					{
						name: "IMAGES_GEMINI_API_KEY",
						description: "Sets the Gemini API key for image generation.",
						type: "Input",
						defaultValue: "${GEMINI_API_KEY}"
					},
					{
						name: "IMAGES_GEMINI_ENDPOINT_METHOD",
						description: "Specifies the Gemini API endpoint method for image generation, supporting both legacy Imagen models and newer Gemini models with image generation capabilities.",
						type: "DropDown",
						values: ["predict", "generateContent"]
					},
					{
						name: "IMAGES_EDIT_GEMINI_API_BASE_URL",
						description: "Configures the Gemini API base URL for image editing operations with Gemini models.",
						type: "Input",
						defaultValue: "${GEMINI_API_BASE_URL}"
					},
					{
						name: "IMAGES_EDIT_GEMINI_API_KEY",
						description: "Provides authentication for Gemini image editing API requests.",
						type: "Input",
						defaultValue: "${GEMINI_API_KEY}"
					}
				]
			},
			{
				section: "Jina",
				items: [{
					name: "JINA_API_BASE_URL",
					description: "Sets the base URL for Jina API. Allows using custom or self-hosted Jina-compatible endpoints.",
					type: "Input"
				}]
			},
			{
				section: "OpenAI DALL-E",
				items: [
					{
						name: "IMAGES_OPENAI_API_BASE_URL",
						description: "Sets the OpenAI-compatible base URL to use for DALL-E image generation.",
						type: "Input",
						defaultValue: "${OPENAI_API_BASE_URL}"
					},
					{
						name: "IMAGES_OPENAI_API_VERSION",
						description: "Optional setting. If provided it sets the `api-version` query parameter when calling the image generation endpoint. Required for Azure OpenAI deployments.",
						type: "Input"
					},
					{
						name: "IMAGES_OPENAI_API_KEY",
						description: "Sets the API key to use for DALL-E image generation.",
						type: "Input",
						defaultValue: "${OPENAI_API_KEY}"
					},
					{
						name: "IMAGES_OPENAI_API_PARAMS",
						description: "Additional parameters for OpenAI image generation API in JSON format. Allows customization of API-specific settings such as quality parameters for DALL-E models (e.g., `{\"quality\": \"hd\"}` for dall-e-3).",
						type: "Input"
					},
					{
						name: "IMAGES_EDIT_OPENAI_API_BASE_URL",
						description: "Configures the OpenAI API base URL specifically for image editing operations, allowing separate endpoints from image generation.",
						type: "Input",
						defaultValue: "${OPENAI_API_BASE_URL}"
					},
					{
						name: "IMAGES_EDIT_OPENAI_API_VERSION",
						description: "Specifies the OpenAI API version for image editing, enabling support for Azure OpenAI deployments with versioned endpoints.",
						type: "Input"
					},
					{
						name: "IMAGES_EDIT_OPENAI_API_KEY",
						description: "Provides authentication for OpenAI image editing API requests, with support for separate keys from image generation.",
						type: "Input",
						defaultValue: "${OPENAI_API_KEY}"
					}
				]
			}
		]
	},
	{
		category: "OAuth",
		sections: [
			{
				section: "General",
				items: [
					{
						name: "ENABLE_OAUTH_SIGNUP",
						description: "Enables account creation when signing up via OAuth. Distinct from `ENABLE_SIGNUP`.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_OAUTH_PERSISTENT_CONFIG",
						description: "Controls whether OAuth-related settings are persisted in the database after the first launch.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "OAUTH_SUB_CLAIM",
						description: "Overrides the default claim used to identify a user's unique ID (`sub`) from the OAuth/OIDC provider's user info response. By default, Open WebUI attempts to infer this from the provider's configuration. This variable allows you to explicitly specify which claim to use. For example, if your identity provider uses 'employee_id' as the unique identifier, you would set this variable to 'employee_id'.",
						type: "Input"
					},
					{
						name: "OAUTH_MERGE_ACCOUNTS_BY_EMAIL",
						description: "If enabled, merges OAuth accounts with existing accounts using the same email address. This is considered unsafe as not all OAuth providers will verify email addresses and can lead to potential account takeovers.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_OAUTH_WITHOUT_EMAIL",
						description: "Enables authentication with OpenID Connect (OIDC) providers that do not support or expose an email scope. When enabled, Open WebUI will create and manage user accounts without requiring an email address from the OAuth provider.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "OAUTH_UPDATE_PICTURE_ON_LOGIN",
						description: "If enabled, updates the local user profile picture with the OAuth-provided picture on login.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_OAUTH_ID_TOKEN_COOKIE",
						description: "Controls whether the **legacy** `oauth_id_token` cookie (unsafe, not recommended, token can go stale/orphaned) is set in the browser upon a successful OAuth login. This is provided for **backward compatibility** with custom tools or older versions that might rely on scraping this cookie. **The new, recommended approach is to use the server-side session management.**",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "OAUTH_CLIENT_INFO_ENCRYPTION_KEY",
						description: "Specifies the secret key used to encrypt and decrypt OAuth client tokens stored server-side in the database. This is a critical security component for OAuth client tokens. If not set, it defaults to using the main `WEBUI_SECRET_KEY`, but it is highly recommended to set it to a unique, securely generated value for production environments. `OAUTH_CLIENT_INFO_ENCRYPTION_KEY` is used in conjunction with OAuth 2.1 MCP server authentication.",
						type: "Input"
					},
					{
						name: "OAUTH_SESSION_TOKEN_ENCRYPTION_KEY",
						description: "Specifies the secret key used to encrypt and decrypt OAuth tokens stored server-side in the database. This is a critical security component for protecting user credentials at rest. If not set, it defaults to using the main `WEBUI_SECRET_KEY`, but it is highly recommended to set it to a unique, securely generated value for production environments.",
						type: "Input"
					},
					{
						name: "WEBUI_AUTH_TRUSTED_EMAIL_HEADER",
						description: "Defines the trusted request header for authentication. See [SSO docs](/features/sso).",
						type: "Input"
					},
					{
						name: "WEBUI_AUTH_TRUSTED_NAME_HEADER",
						description: "Defines the trusted request header for the username of anyone registering with the `WEBUI_AUTH_TRUSTED_EMAIL_HEADER` header. See [SSO docs](/features/sso).",
						type: "Input"
					},
					{
						name: "WEBUI_AUTH_TRUSTED_GROUPS_HEADER",
						description: "Defines the trusted request header containing a comma-separated list of group memberships for the user when using trusted header authentication. See [SSO docs](/features/sso).",
						type: "Input"
					}
				]
			},
			{
				section: "Google",
				items: [
					{
						name: "GOOGLE_CLIENT_ID",
						description: "Sets the client ID for Google OAuth.",
						type: "Input"
					},
					{
						name: "GOOGLE_CLIENT_SECRET",
						description: "Sets the client secret for Google OAuth.",
						type: "Input"
					},
					{
						name: "GOOGLE_OAUTH_SCOPE",
						description: "Sets the scope for Google OAuth authentication.",
						type: "Input",
						defaultValue: "openid email profile"
					},
					{
						name: "GOOGLE_REDIRECT_URI",
						description: "Sets the redirect URI for Google OAuth.",
						type: "Input",
						defaultValue: "<backend>/oauth/google/callback"
					}
				]
			},
			{
				section: "Microsoft",
				items: [
					{
						name: "MICROSOFT_CLIENT_ID",
						description: "Sets the client ID for Microsoft OAuth.",
						type: "Input"
					},
					{
						name: "MICROSOFT_CLIENT_SECRET",
						description: "Sets the client secret for Microsoft OAuth.",
						type: "Input"
					},
					{
						name: "MICROSOFT_CLIENT_TENANT_ID",
						description: "Sets the tenant ID for Microsoft OAuth.",
						type: "Input"
					},
					{
						name: "MICROSOFT_OAUTH_SCOPE",
						description: "Sets the scope for Microsoft OAuth authentication.",
						type: "Input",
						defaultValue: "openid email profile"
					},
					{
						name: "MICROSOFT_REDIRECT_URI",
						description: "Sets the redirect URI for Microsoft OAuth.",
						type: "Input",
						defaultValue: "<backend>/oauth/microsoft/callback"
					},
					{
						name: "MICROSOFT_CLIENT_LOGIN_BASE_URL",
						description: "Sets the base login URL for Microsoft OAuth authentication. Allows configuration of alternative login endpoints for government clouds or custom deployments.",
						type: "Input",
						defaultValue: "https://login.microsoftonline.com"
					},
					{
						name: "MICROSOFT_CLIENT_PICTURE_URL",
						description: "Specifies the Microsoft Graph API endpoint for retrieving user profile pictures during OAuth authentication.",
						type: "Input",
						defaultValue: "https://graph.microsoft.com/v1.0/me/photo/$value"
					}
				]
			},
			{
				section: "Feishu",
				items: [
					{
						name: "FEISHU_CLIENT_ID",
						description: "Sets the client ID for Feishu OAuth.",
						type: "Input"
					},
					{
						name: "FEISHU_CLIENT_SECRET",
						description: "Sets the client secret for Feishu OAuth.",
						type: "Input"
					},
					{
						name: "FEISHU_CLIENT_SCOPE",
						description: "Specifies the scope for Feishu OAuth authentication.",
						type: "Input",
						defaultValue: "contact:user.base:readonly"
					},
					{
						name: "FEISHU_CLIENT_REDIRECT_URI",
						description: "Sets the redirect URI for Feishu OAuth.",
						type: "Input"
					}
				]
			},
			{
				section: "GitHub",
				items: [
					{
						name: "GITHUB_CLIENT_ID",
						description: "Sets the client ID for GitHub OAuth.",
						type: "Input"
					},
					{
						name: "GITHUB_CLIENT_SECRET",
						description: "Sets the client secret for GitHub OAuth.",
						type: "Input"
					},
					{
						name: "GITHUB_CLIENT_SCOPE",
						description: "Specifies the scope for GitHub OAuth authentication.",
						type: "Input",
						defaultValue: "user:email"
					},
					{
						name: "GITHUB_CLIENT_REDIRECT_URI",
						description: "Sets the redirect URI for GitHub OAuth.",
						type: "Input",
						defaultValue: "<backend>/oauth/github/callback"
					}
				]
			},
			{
				section: "OpenID (OIDC)",
				items: [
					{
						name: "OAUTH_CLIENT_ID",
						description: "Sets the client ID for OIDC.",
						type: "Input"
					},
					{
						name: "OAUTH_CLIENT_SECRET",
						description: "Sets the client secret for OIDC.",
						type: "Input"
					},
					{
						name: "OPENID_PROVIDER_URL",
						description: "Path to the `.well-known/openid-configuration` endpoint",
						type: "Input"
					},
					{
						name: "OPENID_REDIRECT_URI",
						description: "Sets the redirect URI for OIDC",
						type: "Input",
						defaultValue: "<backend>/oauth/oidc/callback"
					},
					{
						name: "OAUTH_SCOPES",
						description: "Sets the scope for OIDC authentication. `openid` and `email` are required.",
						type: "Input",
						defaultValue: "openid email profile"
					},
					{
						name: "OAUTH_CODE_CHALLENGE_METHOD",
						description: "Specifies the code challenge method for OAuth authentication.",
						type: "Input"
					},
					{
						name: "OAUTH_PROVIDER_NAME",
						description: "Sets the name for the OIDC provider.",
						type: "Input",
						defaultValue: "SSO"
					},
					{
						name: "OAUTH_USERNAME_CLAIM",
						description: "Set username claim for OpenID.",
						type: "Input",
						defaultValue: "name"
					},
					{
						name: "OAUTH_EMAIL_CLAIM",
						description: "Set email claim for OpenID.",
						type: "Input",
						defaultValue: "email"
					},
					{
						name: "OAUTH_PICTURE_CLAIM",
						description: "Set picture (avatar) claim for OpenID.",
						type: "Input",
						defaultValue: "picture"
					},
					{
						name: "OAUTH_GROUP_CLAIM",
						description: "Specifies the group claim for OAuth authentication.",
						type: "Input",
						defaultValue: "groups"
					},
					{
						name: "ENABLE_OAUTH_ROLE_MANAGEMENT",
						description: "Enables role management for OAuth delegation.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_OAUTH_GROUP_MANAGEMENT",
						description: "Enables or disables OAuth group management.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_OAUTH_GROUP_CREATION",
						description: "When enabled, groups from OAuth claims that don't exist in Open WebUI will be automatically created.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "OAUTH_BLOCKED_GROUPS",
						description: "JSON array of group names that are blocked from accessing the application. Users belonging to these groups will be denied access even if they have valid OAuth credentials.",
						type: "Input"
					},
					{
						name: "OAUTH_ROLES_CLAIM",
						description: "Sets the roles claim to look for in the OIDC token.",
						type: "Input",
						defaultValue: "roles"
					},
					{
						name: "OAUTH_ALLOWED_ROLES",
						description: "Sets the roles that are allowed access to the platform.",
						type: "Input",
						defaultValue: "user,admin"
					},
					{
						name: "OAUTH_ADMIN_ROLES",
						description: "Sets the roles that are considered administrators.",
						type: "Input",
						defaultValue: "admin"
					},
					{
						name: "OAUTH_ROLES_SEPARATOR",
						description: "Allows custom role separators for for splitting the `OAUTH_*_ROLES` variables. Meant for OAuth roles that contain commas; useful for roles specified in LDAP syntax or other systems where commas are part of role names. If the claim is a string and contains the separator, it will be also split by that separator.",
						type: "Input",
						defaultValue: ","
					},
					{
						name: "OAUTH_GROUPS_SEPARATOR",
						description: "Specifies the delimiter used to parse multiple group names from the OAuth group claim. This separator is used when the identity provider returns group memberships as a delimited string rather than an array. Useful when integrating with systems that use non-standard separators or when group names themselves contain commas.",
						type: "Input",
						defaultValue: ";"
					},
					{
						name: "OAUTH_ALLOWED_DOMAINS",
						description: "Specifies the allowed domains for OAuth authentication. (e.g. \"example1.com,example2.com\").",
						type: "Input",
						defaultValue: "*"
					},
					{
						name: "OAUTH_AUDIENCE",
						description: "Specifies an audience parameter passed to the OAuth provider's authorization endpoint during login. Some providers (such as Auth0 and Ory) use this value to determine the type of access token returned—without it, providers typically return an opaque token, while with it, they return a JWT that can be decoded and validated. This parameter is not part of the official OAuth/OIDC spec for authorization endpoints but is widely supported by some providers.",
						type: "Input"
					}
				]
			}
		]
	},
	{
		category: "LDAP",
		items: [
			{
				name: "ENABLE_LDAP",
				description: "Enables or disables LDAP authentication.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "LDAP_SERVER_LABEL",
				description: "Sets the label of the LDAP server.",
				type: "Input"
			},
			{
				name: "LDAP_SERVER_HOST",
				description: "Sets the hostname of the LDAP server.",
				type: "Input",
				defaultValue: "localhost"
			},
			{
				name: "LDAP_SERVER_PORT",
				description: "Sets the port number of the LDAP server.",
				type: "Input",
				defaultValue: 389
			},
			{
				name: "LDAP_ATTRIBUTE_FOR_MAIL",
				description: "Sets the attribute to use as mail for LDAP authentication.",
				type: "Input"
			},
			{
				name: "LDAP_ATTRIBUTE_FOR_USERNAME",
				description: "Sets the attribute to use as a username for LDAP authentication.",
				type: "Input"
			},
			{
				name: "LDAP_APP_DN",
				description: "Sets the distinguished name for the LDAP application.",
				type: "Input"
			},
			{
				name: "LDAP_APP_PASSWORD",
				description: "Sets the password for the LDAP application.",
				type: "Input"
			},
			{
				name: "LDAP_SEARCH_BASE",
				description: "Sets the base to search for LDAP authentication.",
				type: "Input"
			},
			{
				name: "LDAP_SEARCH_FILTER",
				description: "Sets a single filter to use for LDAP search. Alternative to `LDAP_SEARCH_FILTERS`.",
				type: "Input"
			},
			{
				name: "LDAP_SEARCH_FILTERS",
				description: "Sets the filter to use for LDAP search.",
				type: "Input"
			},
			{
				name: "LDAP_USE_TLS",
				description: "Enables or disables TLS for LDAP connection.",
				type: "CheckBox",
				defaultValue: true
			},
			{
				name: "LDAP_CA_CERT_FILE",
				description: "Sets the path to the LDAP CA certificate file.",
				type: "Input"
			},
			{
				name: "LDAP_VALIDATE_CERT",
				description: "Sets whether to validate the LDAP CA certificate.",
				type: "CheckBox"
			},
			{
				name: "LDAP_CIPHERS",
				description: "Sets the ciphers to use for LDAP connection.",
				type: "Input",
				defaultValue: "ALL"
			},
			{
				name: "ENABLE_LDAP_GROUP_MANAGEMENT",
				description: "Enables the group management feature.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "ENABLE_LDAP_GROUP_CREATION",
				description: "If a group from LDAP does not exist in Open WebUI, it will be created automatically.",
				type: "CheckBox",
				defaultValue: false
			},
			{
				name: "LDAP_ATTRIBUTE_FOR_GROUPS",
				description: "Specifies the LDAP attribute that contains the user's group memberships. `memberOf` is a standard attribute for this purpose in Active Directory environments.",
				type: "Input",
				defaultValue: "memberOf"
			}
		]
	},
	{
		category: "SCIM",
		items: [{
			name: "SCIM_ENABLED",
			description: "Enables or disables SCIM 2.0 (System for Cross-domain Identity Management) support for automated user and group provisioning from identity providers like Okta, Azure AD, and Google Workspace.",
			type: "CheckBox",
			defaultValue: false
		}, {
			name: "SCIM_TOKEN",
			description: "Sets the bearer token for SCIM authentication. This token must be provided by identity providers when making SCIM API requests. Generate a secure random token (e.g., using `openssl rand -base64 32`) and configure it in both Open WebUI and your identity provider.",
			type: "Input"
		}]
	},
	{
		category: "User Permissions",
		sections: [
			{
				section: "Chat Permissions",
				items: [
					{
						name: "USER_PERMISSIONS_CHAT_CONTROLS",
						description: "Acts as a master switch to enable or disable the main \"Controls\" button and panel in the chat interface. **If this is set to False, users will not see the Controls button, and the granular permissions below will have no effect**.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_VALVES",
						description: "When `USER_PERMISSIONS_CHAT_CONTROLS` is enabled, this setting specifically controls the visibility of the \"Valves\" section within the chat controls panel.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_SYSTEM_PROMPT",
						description: "When `USER_PERMISSIONS_CHAT_CONTROLS` is enabled, this setting specifically controls the visibility of the customizable \"System Prompt\" section within the chat controls panel, folders and the user settings.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_PARAMS",
						description: "When `USER_PERMISSIONS_CHAT_CONTROLS` is enabled, this setting specifically controls the visibility of the \"Advanced Parameters\" section within the chat controls panel.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_FILE_UPLOAD",
						description: "Enables or disables user permission to upload files to chats.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_DELETE",
						description: "Enables or disables user permission to delete chats.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_EDIT",
						description: "Enables or disables user permission to edit chats.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_DELETE_MESSAGE",
						description: "Enables or disables user permission to delete individual messages within chats. This provides granular control over message deletion capabilities separate from full chat deletion.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_CONTINUE_RESPONSE",
						description: "Enables or disables user permission to continue AI responses. When disabled, users cannot use the \"Continue Response\" button, which helps prevent potential system prompt leakage through response continuation manipulation.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_REGENERATE_RESPONSE",
						description: "Enables or disables user permission to regenerate AI responses. Controls access to both the standard regenerate button and the guided regeneration menu.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_RATE_RESPONSE",
						description: "Enables or disables user permission to rate AI responses using the thumbs up/down feedback system. This controls access to the response rating functionality for evaluation and feedback collection.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_STT",
						description: "Enables or disables user permission to use Speech-to-Text in chats.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_TTS",
						description: "Enables or disables user permission to use Text-to-Speech in chats.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_CALL",
						description: "Enables or disables user permission to make calls in chats.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_CHAT_MULTIPLE_MODELS",
						description: "Enables or disables user permission to use multiple models in chats.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_CHAT_TEMPORARY",
						description: "Enables or disables user permission to create temporary chats.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "USER_PERMISSIONS_CHAT_TEMPORARY_ENFORCED",
						description: "Enables or disables enforced temporary chats for users.",
						type: "Input"
					}
				]
			},
			{
				section: "Feature Permissions",
				items: [
					{
						name: "USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS",
						description: "Enables or disables user permission to access direct tool servers.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_FEATURES_WEB_SEARCH",
						description: "Enables or disables user permission to use the web search feature.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_FEATURES_IMAGE_GENERATION",
						description: "Enables or disables user permission to use the image generation feature.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_FEATURES_CODE_INTERPRETER",
						description: "Enables or disables user permission to use code interpreter feature.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_FEATURES_MEMORIES",
						description: "Enables or disables user permission to use the memory feature.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_FEATURES_FOLDERS",
						description: "Enables or disables the visibility of the Folders feature (chat sidebar) to users.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_FEATURES_NOTES",
						description: "Enables or disables the visibility of the Notes feature to users.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_FEATURES_CHANNELS",
						description: "Enables or disables the ability for users to create their own group channels.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_FEATURES_API_KEYS",
						description: "Sets the permission for API key creation feature for users. When enabled, users will have the ability to create and manage API keys for programmatic access.",
						type: "CheckBox",
						defaultValue: false
					}
				]
			},
			{
				section: "Workspace Permissions",
				items: [
					{
						name: "USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS",
						description: "Enables or disables user permission to access workspace models.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS",
						description: "Enables or disables user permission to access workspace knowledge.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS",
						description: "Enables or disables user permission to access workspace prompts.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS",
						description: "Enables or disables user permission to access workspace tools.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "USER_PERMISSIONS_WORKSPACE_MODELS_ALLOW_PUBLIC_SHARING",
						description: "Enables or disables public sharing of workspace models.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ALLOW_PUBLIC_SHARING",
						description: "Enables or disables public sharing of workspace knowledge.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_WORKSPACE_PROMPTS_ALLOW_PUBLIC_SHARING",
						description: "Enables or disables public sharing of workspace prompts.",
						type: "Input"
					},
					{
						name: "USER_PERMISSIONS_WORKSPACE_TOOLS_ALLOW_PUBLIC_SHARING",
						description: "Enables or disables public sharing of workspace tools.",
						type: "Input"
					}
				]
			},
			{
				section: "Settings Permissions",
				items: [{
					name: "USER_PERMISSIONS_SETTINGS_INTERFACE",
					description: "Enables or disables user / group permissions for the interface settings section in the Settings Modal.",
					type: "CheckBox",
					defaultValue: true
				}, {
					name: "USER_PERMISSIONS_NOTES_ALLOW_PUBLIC_SHARING",
					description: "Enables or disables public sharing of notes.",
					type: "Input"
				}]
			}
		]
	},
	{
		category: "Misc Environment Variables",
		sections: [
			{
				section: "Cloud Storage",
				items: [{
					name: "STORAGE_PROVIDER",
					description: "Sets the storage provider.",
					type: "DropDown",
					values: [
						"s3",
						"gcs",
						"azure"
					]
				}]
			},
			{
				section: "Amazon S3 Storage",
				items: [
					{
						name: "S3_ACCESS_KEY_ID",
						description: "Sets the access key ID for S3 storage.",
						type: "Input"
					},
					{
						name: "S3_ADDRESSING_STYLE",
						description: "Specifies the addressing style to use for S3 storage (e.g., 'path', 'virtual').",
						type: "Input"
					},
					{
						name: "S3_BUCKET_NAME",
						description: "Sets the bucket name for S3 storage.",
						type: "Input"
					},
					{
						name: "S3_ENDPOINT_URL",
						description: "Sets the endpoint URL for S3 storage.",
						type: "Input"
					},
					{
						name: "S3_KEY_PREFIX",
						description: "Sets the key prefix for a S3 object.",
						type: "Input"
					},
					{
						name: "S3_REGION_NAME",
						description: "Sets the region name for S3 storage.",
						type: "Input"
					},
					{
						name: "S3_SECRET_ACCESS_KEY",
						description: "Sets the secret access key for S3 storage.",
						type: "Input"
					},
					{
						name: "S3_USE_ACCELERATE_ENDPOINT",
						description: "Specifies whether to use the accelerated endpoint for S3 storage.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "S3_ENABLE_TAGGING",
						description: "Enables S3 object tagging after uploads for better organization, searching, and integration with file management policies. Always set to `False` when using Cloudflare R2, as R2 does not support object tagging.",
						type: "CheckBox",
						defaultValue: false
					}
				]
			},
			{
				section: "Google Cloud Storage",
				items: [{
					name: "GOOGLE_APPLICATION_CREDENTIALS_JSON",
					description: "Contents of Google Application Credentials JSON file.",
					type: "Input"
				}, {
					name: "GCS_BUCKET_NAME",
					description: "Sets the bucket name for Google Cloud Storage. Bucket must already exist.",
					type: "Input"
				}]
			},
			{
				section: "Microsoft Azure Storage",
				items: [
					{
						name: "AZURE_STORAGE_ENDPOINT",
						description: "Sets the endpoint URL for Azure Storage.",
						type: "Input"
					},
					{
						name: "AZURE_STORAGE_CONTAINER_NAME",
						description: "Sets the container name for Azure Storage.",
						type: "Input"
					},
					{
						name: "AZURE_STORAGE_KEY",
						description: "Set the access key for Azure Storage.",
						type: "Input"
					}
				]
			},
			{
				section: "OpenTelemetry Configuration",
				items: [
					{
						name: "ENABLE_OTEL",
						description: "Enables or disables OpenTelemetry for observability. When enabled, tracing, metrics, and logging data can be collected and exported to an OTLP endpoint.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_OTEL_TRACES",
						description: "Enables or disables OpenTelemetry trace collection and export. When enabled, distributed tracing data is sent to the configured OTLP endpoint. This variable works in conjunction with `ENABLE_OTEL`.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_OTEL_METRICS",
						description: "Enables or disables OpenTelemetry metrics collection and export. This variable works in conjunction with `ENABLE_OTEL`.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_OTEL_LOGS",
						description: "Enables or disables OpenTelemetry logging export. When enabled, application logs are sent to the configured OTLP endpoint. This variable works in conjunction with `ENABLE_OTEL`.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "OTEL_EXPORTER_OTLP_ENDPOINT",
						description: "Specifies the default OTLP (OpenTelemetry Protocol) endpoint for exporting traces, metrics, and logs. This can be overridden for metrics if `OTEL_METRICS_EXPORTER_OTLP_ENDPOINT` is set, and for logs if `OTEL_LOGS_EXPORTER_OTLP_ENDPOINT` is set.",
						type: "Input",
						defaultValue: "http://localhost:4317"
					},
					{
						name: "OTEL_METRICS_EXPORTER_OTLP_ENDPOINT",
						description: "Specifies the dedicated OTLP endpoint for exporting OpenTelemetry metrics. If not set, it defaults to the value of `OTEL_EXPORTER_OTLP_ENDPOINT`. This is useful when separate endpoints for traces and metrics are used.",
						type: "Input"
					},
					{
						name: "OTEL_LOGS_EXPORTER_OTLP_ENDPOINT",
						description: "Specifies the dedicated OTLP endpoint for exporting OpenTelemetry logs. If not set, it defaults to the value of `OTEL_EXPORTER_OTLP_ENDPOINT`. This is useful when separate endpoints for logs, traces, and metrics are used.",
						type: "Input"
					},
					{
						name: "OTEL_EXPORTER_OTLP_INSECURE",
						description: "If set to `True`, the OTLP exporter will use an insecure connection (e.g., HTTP for gRPC) for traces. For metrics, its behavior is governed by `OTEL_METRICS_EXPORTER_OTLP_INSECURE`, and for logs by `OTEL_LOGS_EXPORTER_OTLP_INSECURE`.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "OTEL_METRICS_EXPORTER_OTLP_INSECURE",
						description: "If set to `True`, the OTLP exporter will use an insecure connection for metrics. If not specified, it uses the value of `OTEL_EXPORTER_OTLP_INSECURE`.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "OTEL_LOGS_EXPORTER_OTLP_INSECURE",
						description: "If set to `True`, the OTLP exporter will use an insecure connection for logs. If not specified, it uses the value of `OTEL_EXPORTER_OTLP_INSECURE`.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "OTEL_SERVICE_NAME",
						description: "Sets the service name that will be reported to your OpenTelemetry collector or observability platform. This helps identify your Open WebUI instance.",
						type: "Input",
						defaultValue: "open-webui"
					},
					{
						name: "OTEL_RESOURCE_ATTRIBUTES",
						description: "Allows you to define additional resource attributes to be attached to all telemetry data, in a comma-separated `key1=val1,key2=val2` format.",
						type: "Input"
					},
					{
						name: "OTEL_TRACES_SAMPLER",
						description: "Configures the sampling strategy for OpenTelemetry traces. This determines which traces are collected and exported to reduce data volume.",
						type: "Input",
						defaultValue: "parentbased_always_on"
					},
					{
						name: "OTEL_BASIC_AUTH_USERNAME",
						description: "Sets the username for basic authentication with the default OTLP endpoint. This applies to traces, and by default, to metrics and logs unless overridden by their specific authentication variables.",
						type: "Input"
					},
					{
						name: "OTEL_BASIC_AUTH_PASSWORD",
						description: "Sets the password for basic authentication with the default OTLP endpoint. This applies to traces, and by default, to metrics and logs unless overridden by their specific authentication variables.",
						type: "Input"
					},
					{
						name: "OTEL_METRICS_BASIC_AUTH_USERNAME",
						description: "Sets the username for basic authentication specifically for the OTLP metrics endpoint. If not specified, it uses the value of `OTEL_BASIC_AUTH_USERNAME`.",
						type: "Input"
					},
					{
						name: "OTEL_METRICS_BASIC_AUTH_PASSWORD",
						description: "Sets the password for basic authentication specifically for the OTLP metrics endpoint. If not specified, it uses the value of `OTEL_BASIC_AUTH_PASSWORD`.",
						type: "Input"
					},
					{
						name: "OTEL_LOGS_BASIC_AUTH_USERNAME",
						description: "Sets the username for basic authentication specifically for the OTLP logs endpoint. If not specified, it uses the value of `OTEL_BASIC_AUTH_USERNAME`.",
						type: "Input"
					},
					{
						name: "OTEL_LOGS_BASIC_AUTH_PASSWORD",
						description: "Sets the password for basic authentication specifically for the OTLP logs endpoint. If not specified, it uses the value of `OTEL_BASIC_AUTH_PASSWORD`.",
						type: "Input"
					},
					{
						name: "OTEL_OTLP_SPAN_EXPORTER",
						description: "Specifies the default protocol for exporting OpenTelemetry traces (gRPC or HTTP). This can be overridden for metrics if `OTEL_METRICS_OTLP_SPAN_EXPORTER` is set, and for logs if `OTEL_LOGS_OTLP_SPAN_EXPORTER` is set.",
						type: "DropDown",
						values: ["grpc", "http"],
						defaultValue: "grpc"
					},
					{
						name: "OTEL_METRICS_OTLP_SPAN_EXPORTER",
						description: "Specifies the protocol for exporting OpenTelemetry metrics (gRPC or HTTP). If not specified, it uses the value of `OTEL_OTLP_SPAN_EXPORTER`.",
						type: "DropDown",
						values: ["grpc", "http"]
					},
					{
						name: "OTEL_LOGS_OTLP_SPAN_EXPORTER",
						description: "Specifies the protocol for exporting OpenTelemetry logs (gRPC or HTTP). If not specified, it uses the value of `OTEL_OTLP_SPAN_EXPORTER`.",
						type: "DropDown",
						values: ["grpc", "http"]
					}
				]
			},
			{
				section: "Database Pool",
				items: [
					{
						name: "DATABASE_URL",
						description: "Specifies the database URL to connect to.",
						type: "Input",
						defaultValue: "sqlite:///${DATA_DIR}/webui.db"
					},
					{
						name: "DATABASE_SCHEMA",
						description: "Specifies the database schema to connect to.",
						type: "Input"
					},
					{
						name: "DATABASE_POOL_SIZE",
						description: "Specifies the pooling strategy and size of the database pool.",
						type: "Input"
					},
					{
						name: "DATABASE_POOL_MAX_OVERFLOW",
						description: "Specifies the database pool max overflow.",
						type: "Input",
						defaultValue: 0
					},
					{
						name: "DATABASE_POOL_TIMEOUT",
						description: "Specifies the database pool timeout in seconds to get a connection.",
						type: "Input",
						defaultValue: 30
					},
					{
						name: "DATABASE_POOL_RECYCLE",
						description: "Specifies the database pool recycle time in seconds.",
						type: "Input",
						defaultValue: 3600
					},
					{
						name: "DATABASE_ENABLE_SQLITE_WAL",
						description: "Enables or disables SQLite WAL (Write-Ahead Logging) mode. When enabled, SQLite transactions can be managed more efficiently, allowing multiple readers and one writer concurrently, which can improve database performance, especially under high concurrency. **This setting only applies to SQLite databases.**",
						type: "CheckBox",
						defaultValue: false
					}
				]
			},
			{
				section: "Database Configuration",
				items: [
					{
						name: "ENABLE_DB_MIGRATIONS",
						description: "Enables or disables automatic database migrations on startup. When enabled, the application will automatically apply pending database schema changes. Disable this in production environments where you want to control migrations manually.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "DATABASE_TYPE",
						description: "Specifies the type of database to use. Supported values include `sqlite`, `postgresql`, `mysql`, etc. This determines which database driver and connection logic will be used.",
						type: "Input"
					},
					{
						name: "DATABASE_USER",
						description: "Specifies the username for database authentication when using external databases like PostgreSQL or MySQL.",
						type: "Input"
					},
					{
						name: "DATABASE_PASSWORD",
						description: "Specifies the password for database authentication when using external databases like PostgreSQL or MySQL.",
						type: "Input"
					},
					{
						name: "DATABASE_HOST",
						description: "Specifies the hostname or IP address of the database server.",
						type: "Input"
					},
					{
						name: "DATABASE_PORT",
						description: "Specifies the port number on which the database server is listening.",
						type: "Input"
					},
					{
						name: "DATABASE_NAME",
						description: "Specifies the name of the database to connect to.",
						type: "Input"
					},
					{
						name: "DATABASE_USER_ACTIVE_STATUS_UPDATE_INTERVAL",
						description: "Sets the interval in seconds for updating user active status in the database. This controls how frequently user activity timestamps are written to the database. Higher values reduce database writes but may result in less accurate activity tracking.",
						type: "Input"
					},
					{
						name: "DATABASE_ENABLE_SESSION_SHARING",
						description: "Enables or disables session sharing across multiple application instances using the database. When enabled, user sessions are stored in the database rather than in-memory, allowing users to maintain their session across different application instances.",
						type: "CheckBox",
						defaultValue: false
					}
				]
			},
			{
				section: "Redis",
				items: [
					{
						name: "REDIS_URL",
						description: "Specifies the URL of the Redis instance or cluster host for storing application state.",
						type: "Input"
					},
					{
						name: "REDIS_SENTINEL_HOSTS",
						description: "Comma-separated list of Redis Sentinels for app state. If specified, the \"hostname\" in `REDIS_URL` will be interpreted as the Sentinel service name.",
						type: "Input"
					},
					{
						name: "REDIS_SENTINEL_PORT",
						description: "Sentinel port for app state Redis.",
						type: "Input",
						defaultValue: 26379
					},
					{
						name: "REDIS_CLUSTER",
						description: "Connect to a Redis Cluster instead of a single instance or using Redis Sentinels. If `True`, `REDIS_URL` must also be defined.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "REDIS_KEY_PREFIX",
						description: "Customizes the Redis key prefix used for storing configuration values. This allows multiple Open WebUI instances to share the same Redis instance without key conflicts. When operating in Redis cluster mode, the prefix is formatted as `{prefix}:` (e.g., `{open-webui}:config:*`) to enable multi-key operations on configuration keys within the same hash slot.",
						type: "Input",
						defaultValue: "open-webui"
					},
					{
						name: "REDIS_SOCKET_CONNECT_TIMEOUT",
						description: "Sets the timeout in seconds for establishing a connection to Redis. If the connection cannot be established within this time, the operation will fail.",
						type: "Input",
						defaultValue: 5
					},
					{
						name: "ENABLE_STAR_SESSIONS_MIDDLEWARE",
						description: "Enables or disables Starlette sessions middleware for managing user sessions. When enabled, session data is stored server-side and managed through cookies.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_WEBSOCKET_SUPPORT",
						description: "Enables websocket support in Open WebUI.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "WEBSOCKET_MANAGER",
						description: "Specifies the websocket manager to use (in this case, Redis).",
						type: "Input",
						defaultValue: "redis"
					},
					{
						name: "WEBSOCKET_REDIS_URL",
						description: "Specifies the URL of the Redis instance or cluster host for websocket communication. It is distinct from `REDIS_URL` and in practice, it is recommended to set both.",
						type: "Input",
						defaultValue: "${REDIS_URL}"
					},
					{
						name: "WEBSOCKET_SENTINEL_HOSTS",
						description: "Comma-separated list of Redis Sentinels for websocket. If specified, the \"hostname\" in `WEBSOCKET_REDIS_URL` will be interpreted as the Sentinel service name.",
						type: "Input"
					},
					{
						name: "WEBSOCKET_SENTINEL_PORT",
						description: "Sentinel port for websocket Redis.",
						type: "Input",
						defaultValue: 26379
					},
					{
						name: "WEBSOCKET_REDIS_CLUSTER",
						description: "Specifies that websocket should communicate with a Redis Cluster instead of a single instance or using Redis Sentinels. If `True`, `WEBSOCKET_REDIS_URL` and/or `REDIS_URL` must also be defined.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WEBSOCKET_REDIS_OPTIONS",
						description: "Specifies additional Redis connection options for websocket communication in JSON format. This can include parameters like connection pool settings, retry logic, or other Redis client configuration options.",
						type: "Input"
					},
					{
						name: "WEBSOCKET_SERVER_LOGGING",
						description: "Enables or disables logging for the WebSocket server. When enabled, WebSocket connection events, messages, and errors are logged for debugging and monitoring purposes.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WEBSOCKET_SERVER_ENGINEIO_LOGGING",
						description: "Enables or disables Engine.IO logging for the WebSocket server. Engine.IO is the underlying transport layer for Socket.IO. When enabled, detailed Engine.IO events and operations are logged.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "WEBSOCKET_SERVER_PING_TIMEOUT",
						description: "Sets the timeout in seconds for WebSocket ping operations. If a client does not respond to a ping within this time, the connection is considered dead and will be closed.",
						type: "Input",
						defaultValue: 60
					},
					{
						name: "WEBSOCKET_SERVER_PING_INTERVAL",
						description: "Sets the interval in seconds between WebSocket ping messages sent to clients. This helps detect disconnected clients and maintain connection health.",
						type: "Input",
						defaultValue: 25
					},
					{
						name: "REDIS_SOCKET_KEEPALIVE",
						description: "Enables TCP SO_KEEPALIVE on all Redis client sockets.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "REDIS_SENTINEL_MAX_RETRY_COUNT",
						description: "Sets maximum number of retries for Redis operations when using Sentinel failover.",
						type: "Input",
						defaultValue: 2
					},
					{
						name: "REDIS_RECONNECT_DELAY",
						description: "Optional reconnect delay in milliseconds for Redis Sentinel retry logic.",
						type: "Input"
					},
					{
						name: "REDIS_HEALTH_CHECK_INTERVAL",
						description: "How often in seconds redis-py should PING an idle pooled connection before reusing it.",
						type: "Input"
					},
					{
						name: "WEBSOCKET_REDIS_LOCK_TIMEOUT",
						description: "Sets the timeout in seconds for Redis locks used by the websocket manager.",
						type: "Input",
						defaultValue: 60
					},
					{
						name: "WEBSOCKET_EVENT_CALLER_TIMEOUT",
						description: "Sets the timeout in seconds for event calls generated by tools and actions.",
						type: "Input",
						defaultValue: 300
					},
					{
						name: "DATABASE_USE_IAM_AUTH",
						description: "Authenticate to AWS RDS PostgreSQL using short-lived IAM auth tokens.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "DATABASE_SQLITE_PRAGMA_SYNCHRONOUS",
						description: "Sets the SQLite PRAGMA synchronous value.",
						type: "DropDown",
						values: [
							"OFF",
							"NORMAL",
							"FULL",
							"EXTRA"
						],
						defaultValue: "NORMAL"
					},
					{
						name: "DATABASE_SQLITE_PRAGMA_BUSY_TIMEOUT",
						description: "Sets the SQLite PRAGMA busy_timeout value in milliseconds.",
						type: "Input",
						defaultValue: 5e3
					},
					{
						name: "DATABASE_SQLITE_PRAGMA_CACHE_SIZE",
						description: "Sets the SQLite PRAGMA cache_size value.",
						type: "Input",
						defaultValue: -65536
					},
					{
						name: "DATABASE_SQLITE_PRAGMA_TEMP_STORE",
						description: "Sets the SQLite PRAGMA temp_store value.",
						type: "DropDown",
						values: [
							"DEFAULT",
							"FILE",
							"MEMORY"
						],
						defaultValue: "MEMORY"
					},
					{
						name: "DATABASE_SQLITE_PRAGMA_MMAP_SIZE",
						description: "Sets the SQLite PRAGMA mmap_size value in bytes.",
						type: "Input",
						defaultValue: 268435456
					},
					{
						name: "DATABASE_SQLITE_PRAGMA_JOURNAL_SIZE_LIMIT",
						description: "Sets the SQLite PRAGMA journal_size_limit value in bytes.",
						type: "Input",
						defaultValue: 67108864
					}
				]
			},
			{
				section: "Uvicorn Settings",
				items: [{
					name: "UVICORN_WORKERS",
					description: "Controls the number of worker processes that Uvicorn spawns to handle requests. Each worker runs its own instance of the application in a separate process.",
					type: "Input",
					defaultValue: 1
				}]
			},
			{
				section: "Cache Settings",
				items: [{
					name: "CACHE_CONTROL",
					description: "Sets the Cache-Control header for all HTTP responses. Supports standard directives like `public`, `private`, `no-cache`, `no-store`, `must-revalidate`, `max-age=seconds`, etc. If an invalid value is provided, defaults to `\"no-store, max-age=0\"` (no caching).",
					type: "Input"
				}]
			},
			{
				section: "Proxy Settings",
				items: [
					{
						name: "http_proxy",
						description: "Sets the URL for the HTTP proxy.",
						type: "Input"
					},
					{
						name: "https_proxy",
						description: "Sets the URL for the HTTPS proxy.",
						type: "Input"
					},
					{
						name: "no_proxy",
						description: "Lists domain extensions (or IP addresses) for which the proxy should not be used, separated by commas.",
						type: "Input"
					}
				]
			},
			{
				section: "Logging",
				items: [
					{
						name: "GLOBAL_LOG_LEVEL",
						description: "Sets the global logging level for the application. Controls the verbosity of logs across all components. Valid values: DEBUG, INFO, WARNING, ERROR, CRITICAL.",
						type: "DropDown",
						values: [
							"DEBUG",
							"INFO",
							"WARNING",
							"ERROR",
							"CRITICAL"
						],
						defaultValue: "INFO"
					},
					{
						name: "ENABLE_AUDIT_STDOUT",
						description: "Enables or disables audit logging to standard output (console). When enabled, audit events are printed to stdout for real-time monitoring and debugging.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "ENABLE_AUDIT_LOGS_FILE",
						description: "Enables or disables audit logging to a file. When enabled, audit events are written to a log file specified by `AUDIT_LOGS_FILE_PATH` for persistent storage and analysis.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "AUDIT_LOGS_FILE_PATH",
						description: "Specifies the file path where audit logs will be written when `ENABLE_AUDIT_LOGS_FILE` is enabled. The path can be absolute or relative to the application directory.",
						type: "Input",
						defaultValue: "./audit.log"
					},
					{
						name: "AUDIT_LOG_FILE_ROTATION_SIZE",
						description: "Sets the maximum size in bytes for audit log files before rotation occurs. When the log file reaches this size, it will be rotated (renamed with a timestamp) and a new log file will be created. Set to 0 to disable rotation.",
						type: "Input",
						defaultValue: 10485760
					},
					{
						name: "AUDIT_UVICORN_LOGGER_NAMES",
						description: "Comma-separated list of Uvicorn logger names to include in audit logs. This allows fine-grained control over which Uvicorn components generate audit logs.",
						type: "Input"
					},
					{
						name: "AUDIT_LOG_LEVEL",
						description: "Sets the logging level specifically for audit logs. This can be different from `GLOBAL_LOG_LEVEL` to control audit log verbosity independently. Valid values: DEBUG, INFO, WARNING, ERROR, CRITICAL.",
						type: "DropDown",
						values: [
							"DEBUG",
							"INFO",
							"WARNING",
							"ERROR",
							"CRITICAL"
						],
						defaultValue: "INFO"
					},
					{
						name: "LOG_FORMAT",
						description: "Specifies format of log output (TEXT or JSON).",
						type: "DropDown",
						values: ["TEXT", "JSON"],
						defaultValue: "TEXT"
					},
					{
						name: "AUDIT_INCLUDED_PATHS",
						description: "Comma-separated list of URL paths to include in audit logging.",
						type: "Input"
					},
					{
						name: "MAX_BODY_LOG_SIZE",
						description: "Sets the maximum size in bytes for request/response bodies to include in logs. Bodies larger than this size will be truncated in log entries to prevent excessive log file growth. Set to 0 to disable body logging.",
						type: "Input",
						defaultValue: 1024
					},
					{
						name: "AUDIT_EXCLUDED_PATHS",
						description: "Comma-separated list of URL paths to exclude from audit logging. Useful for excluding health check endpoints or other high-frequency, low-value endpoints from audit logs to reduce noise.",
						type: "Input"
					}
				]
			},
			{
				section: "Provider Multi-Instance & Passthrough",
				items: [
					{
						name: "OLLAMA_API_CONFIGS",
						description: "Multi-instance configuration object for Ollama providers as a JSON string.",
						type: "Input",
						defaultValue: "{}"
					},
					{
						name: "OPENAI_API_CONFIGS",
						description: "Multi-instance configuration object for OpenAI providers as a JSON string.",
						type: "Input",
						defaultValue: "{}"
					},
					{
						name: "ENABLE_OPENAI_API_PASSTHROUGH",
						description: "Passthrough raw OpenAI API requests directly to upstream endpoints.",
						type: "CheckBox",
						defaultValue: false
					}
				]
			},
			{
				section: "Context Compaction",
				items: [
					{
						name: "ENABLE_CONTEXT_COMPACTION",
						description: "Enables automatic chat context compaction for long conversation histories.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "CONTEXT_COMPACTION_TOKEN_THRESHOLD",
						description: "Token count threshold required to trigger automatic context compaction.",
						type: "Input",
						defaultValue: 0
					},
					{
						name: "CONTEXT_COMPACTION_TOKEN_CAP",
						description: "Target token cap after context compaction is executed.",
						type: "Input",
						defaultValue: 0
					},
					{
						name: "CONTEXT_COMPACTION_PROMPT_TEMPLATE",
						description: "Prompt template used to summarize previous conversation history during compaction.",
						type: "Input"
					}
				]
			},
			{
				section: "Memory Optimization",
				items: [
					{
						name: "ENABLE_MEMORY_BACKGROUND_REVIEW",
						description: "Enables background processing for user memory deduplication and cleanup.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "MEMORIES_REVIEW_INTERVAL_TURNS",
						description: "Number of chat completion turns between background memory reviews.",
						type: "Input",
						defaultValue: 10
					},
					{
						name: "MEMORIES_CONTEXT_CHAR_LIMIT",
						description: "Maximum character limit for total memory context injected into prompts.",
						type: "Input",
						defaultValue: 2e3
					},
					{
						name: "MEMORIES_USER_CHAR_LIMIT",
						description: "Maximum character limit per individual user memory.",
						type: "Input",
						defaultValue: 500
					}
				]
			},
			{
				section: "Install Required Python Packages",
				items: [
					{
						name: "ENABLE_PLUGINS",
						description: "Master switch for Open WebUI's built-in Tools and Functions.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "ENABLE_PIP_INSTALL_FRONTMATTER_REQUIREMENTS",
						description: "Auto run pip install for Python packages declared in function and tool frontmatter.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "PIP_OPTIONS",
						description: "Specifies additional command-line options that pip should use when installing packages. For example, you can include flags such as `--upgrade`, `--user`, or `--no-cache-dir` to control the installation process.",
						type: "Input"
					},
					{
						name: "PIP_PACKAGE_INDEX_OPTIONS",
						description: "Defines custom package index behavior for pip. This can include specifying additional or alternate index URLs (e.g., `--extra-index-url`), authentication credentials, or other parameters to manage how packages are retrieved from different locations.",
						type: "Input"
					}
				]
			}
		]
	}
];
//#endregion
//#region module/src/containers/agent/GeminiCli/Arguments.ts
const geminiCliArguments = [
	{
		category: "LynxHub Configuration",
		items: [{
			name: "Settings File Location",
			description: "!!Please backup your existing settings.json, this will overwrite it!!. Choose a custom location to save your `settings.json` configuration file.",
			type: "File"
		}]
	},
	{
		category: "Environment Variables",
		sections: [
			{
				section: "Authentication & API",
				items: [
					{
						name: "GEMINI_API_KEY",
						description: "Your API key for the Gemini API.",
						type: "Input"
					},
					{
						name: "GOOGLE_API_KEY",
						description: "Your Google Cloud API key, required for using Vertex AI in express mode.",
						type: "Input"
					},
					{
						name: "GOOGLE_CLOUD_PROJECT",
						description: "Your Google Cloud Project ID, required for using Code Assist or Vertex AI.",
						type: "Input"
					},
					{
						name: "GOOGLE_APPLICATION_CREDENTIALS",
						description: "The path to your Google Application Credentials JSON file.",
						type: "File"
					},
					{
						name: "GOOGLE_CLOUD_LOCATION",
						description: "Your Google Cloud Project Location (e.g., us-central1), required for using Vertex AI in non-express mode.",
						type: "Input"
					}
				]
			},
			{
				section: "Configuration",
				items: [
					{
						name: "GEMINI_MODEL",
						description: "Specifies the default Gemini model to use.",
						type: "Input"
					},
					{
						name: "GEMINI_SANDBOX",
						description: "Alternative to the `sandbox` setting. Accepts true, false, docker, podman, or a custom command string.",
						type: "Input"
					},
					{
						name: "SEATBELT_PROFILE",
						description: "Switches the Seatbelt (`sandbox-exec`) profile on macOS.",
						type: "DropDown",
						defaultValue: "permissive-open",
						values: ["permissive-open", "strict"]
					},
					{
						name: "CLI_TITLE",
						description: "Set a custom title for the CLI window.",
						type: "Input"
					},
					{
						name: "CODE_ASSIST_ENDPOINT",
						description: "Specifies the endpoint for the code assist server.",
						type: "Input"
					}
				]
			},
			{
				section: "Telemetry",
				items: [{
					name: "OTLP_GOOGLE_CLOUD_PROJECT",
					description: "Your Google Cloud Project ID for Telemetry in Google Cloud.",
					type: "Input"
				}]
			},
			{
				section: "Debugging & Display",
				items: [
					{
						name: "DEBUG",
						description: "Set to true or 1 to enable verbose debug logging.",
						type: "Input"
					},
					{
						name: "DEBUG_MODE",
						description: "Set to true or 1 to enable verbose debug logging.",
						type: "Input"
					},
					{
						name: "NO_COLOR",
						description: "Set to any value to disable all color output in the CLI.",
						type: "Input"
					}
				]
			}
		]
	},
	{
		category: "Command Line Arguments",
		sections: [
			{
				section: "Core Functionality",
				items: [
					{
						name: "--model <model_name>",
						description: "Specifies the Gemini model to use for this session.",
						type: "Input"
					},
					{
						name: "--prompt <your_prompt>",
						description: "Pass a prompt directly to the command for non-interactive mode.",
						type: "Input"
					},
					{
						name: "--prompt-interactive <your_prompt>",
						description: "Starts an interactive session with the provided prompt as the initial input.",
						type: "Input"
					},
					{
						name: "--all-files",
						description: "Recursively includes all files within the current directory as context.",
						type: "CheckBox"
					},
					{
						name: "--include-directories <dir1,dir2,...>",
						description: "Includes additional directories in the workspace for multi-directory support.",
						type: "Directory"
					}
				]
			},
			{
				section: "Tool & Sandbox Control",
				items: [
					{
						name: "--sandbox",
						description: "Enables sandbox mode for this session.",
						type: "CheckBox"
					},
					{
						name: "--sandbox-image",
						description: "Sets the sandbox image URI.",
						type: "Input"
					},
					{
						name: "--yolo",
						description: "Enables YOLO mode, which automatically approves all tool calls.",
						type: "CheckBox"
					},
					{
						name: "--approval-mode <mode>",
						description: "Sets the approval mode for tool calls.",
						type: "DropDown",
						values: [
							"default",
							"auto_edit",
							"yolo"
						]
					},
					{
						name: "--allowed-tools <tool1,tool2,...>",
						description: "A comma-separated list of tool names that will bypass the confirmation dialog.",
						type: "Input"
					}
				]
			},
			{
				section: "Telemetry & Checkpointing",
				items: [
					{
						name: "--telemetry",
						description: "Enables telemetry.",
						type: "CheckBox"
					},
					{
						name: "--telemetry-target",
						description: "Sets the telemetry target.",
						type: "Input"
					},
					{
						name: "--telemetry-otlp-endpoint",
						description: "Sets the OTLP endpoint for telemetry.",
						type: "Input"
					},
					{
						name: "--telemetry-otlp-protocol",
						description: "Sets the OTLP protocol for telemetry.",
						type: "DropDown",
						defaultValue: "grpc",
						values: ["grpc", "http"]
					},
					{
						name: "--telemetry-log-prompts",
						description: "Enables logging of prompts for telemetry.",
						type: "CheckBox"
					},
					{
						name: "--checkpointing",
						description: "Enables checkpointing.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "Extensions & Display",
				items: [
					{
						name: "--extensions <extension_name ...>",
						description: "Specifies a list of extensions to use for the session.",
						type: "Input"
					},
					{
						name: "--list-extensions",
						description: "Lists all available extensions and exits.",
						type: "CheckBox"
					},
					{
						name: "--proxy",
						description: "Sets the proxy for the CLI.",
						type: "Input"
					},
					{
						name: "--screen-reader",
						description: "Enables screen reader mode for better TUI compatibility.",
						type: "CheckBox"
					},
					{
						name: "--show-memory-usage",
						description: "Displays the current memory usage.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "Help & Version",
				items: [
					{
						name: "--debug",
						description: "Enables debug mode for this session, providing more verbose output.",
						type: "CheckBox"
					},
					{
						name: "--help",
						description: "Displays help information about command-line arguments.",
						type: "CheckBox"
					},
					{
						name: "--version",
						description: "Displays the version of the CLI.",
						type: "CheckBox"
					}
				]
			}
		]
	},
	{
		category: "Settings",
		condition: "Settings File Location",
		sections: [
			{
				section: "general",
				items: [
					{
						name: "general.preferredEditor",
						description: "The preferred editor to open files in.",
						type: "Input"
					},
					{
						name: "general.vimMode",
						description: "Enable Vim keybindings.",
						type: "CheckBox"
					},
					{
						name: "general.disableAutoUpdate",
						description: "Disable automatic updates.",
						type: "CheckBox"
					},
					{
						name: "general.disableUpdateNag",
						description: "Disable update notification prompts.",
						type: "CheckBox"
					},
					{
						name: "general.checkpointing.enabled",
						description: "Enable session checkpointing for recovery.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "ui",
				items: [
					{
						name: "ui.theme",
						description: "The color theme for the UI.",
						type: "DropDown",
						values: [
							"ANSI",
							"ANSI Light",
							"Atom One",
							"Ayu",
							"Ayu Light",
							"Default",
							"Default Light",
							"Dracula",
							"GitHub",
							"GitHub Light",
							"Google Code",
							"Xcode"
						],
						defaultValue: "Default"
					},
					{
						name: "ui.customThemes",
						description: "Custom theme definitions.",
						type: "Input",
						defaultValue: {}
					},
					{
						name: "ui.hideWindowTitle",
						description: "Hide the window title bar.",
						type: "CheckBox"
					},
					{
						name: "ui.hideTips",
						description: "Hide helpful tips in the UI.",
						type: "CheckBox"
					},
					{
						name: "ui.hideBanner",
						description: "Hide the application banner.",
						type: "CheckBox"
					},
					{
						name: "ui.hideFooter",
						description: "Hide the footer from the UI.",
						type: "CheckBox"
					},
					{
						name: "ui.showMemoryUsage",
						description: "Display memory usage information in the UI.",
						type: "CheckBox"
					},
					{
						name: "ui.showLineNumbers",
						description: "Show line numbers in the chat.",
						type: "CheckBox"
					},
					{
						name: "ui.showCitations",
						description: "Show citations for generated text in the chat.",
						type: "CheckBox"
					},
					{
						name: "ui.accessibility.disableLoadingPhrases",
						description: "Disable loading phrases for accessibility.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "ide",
				items: [{
					name: "ide.enabled",
					description: "Enable IDE integration mode.",
					type: "CheckBox"
				}, {
					name: "ide.hasSeenNudge",
					description: "Whether the user has seen the IDE integration nudge.",
					type: "CheckBox"
				}]
			},
			{
				section: "privacy",
				items: [{
					name: "privacy.usageStatisticsEnabled",
					description: "Enable collection of usage statistics.",
					type: "CheckBox"
				}]
			},
			{
				section: "model",
				items: [
					{
						name: "model.name",
						description: "The Gemini model to use for conversations.",
						type: "Input"
					},
					{
						name: "model.maxSessionTurns",
						description: "Maximum number of user/model/tool turns to keep in a session. -1 means unlimited.",
						type: "Input",
						defaultValue: -1
					},
					{
						name: "model.summarizeToolOutput",
						description: "Enables or disables the summarization of tool output.",
						type: "Input"
					},
					{
						name: "model.chatCompression.contextPercentageThreshold",
						description: "Sets the threshold for chat history compression as a percentage of the model's total token limit.",
						type: "Input",
						defaultValue: .7
					},
					{
						name: "model.skipNextSpeakerCheck",
						description: "Skip the next speaker check.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "context",
				items: [
					{
						name: "context.fileName",
						description: "The name of the context file(s).",
						type: "File"
					},
					{
						name: "context.importFormat",
						description: "The format to use when importing memory.",
						type: "Input"
					},
					{
						name: "context.discoveryMaxDirs",
						description: "Maximum number of directories to search for memory.",
						type: "Input",
						defaultValue: 200
					},
					{
						name: "context.includeDirectories",
						description: "Additional directories to include in the workspace context.",
						type: "Directory",
						defaultValue: []
					},
					{
						name: "context.loadFromIncludeDirectories",
						description: "If true, /memory refresh loads GEMINI.md from all added directories.",
						type: "CheckBox"
					},
					{
						name: "context.fileFiltering.respectGitIgnore",
						description: "Respect .gitignore files when searching.",
						type: "CheckBox"
					},
					{
						name: "context.fileFiltering.respectGeminiIgnore",
						description: "Respect .geminiignore files when searching.",
						type: "CheckBox"
					},
					{
						name: "context.fileFiltering.enableRecursiveFileSearch",
						description: "Enable searching recursively for filenames when completing @ prefixes.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "tools",
				items: [
					{
						name: "tools.sandbox",
						description: "Sandbox execution environment (can be a boolean or a path string).",
						type: "Input"
					},
					{
						name: "tools.usePty",
						description: "Use node-pty for shell command execution.",
						type: "CheckBox"
					},
					{
						name: "tools.core",
						description: "Restricts the set of built-in tools with an allowlist.",
						type: "Input"
					},
					{
						name: "tools.exclude",
						description: "Tool names to exclude from discovery.",
						type: "Input"
					},
					{
						name: "tools.allowed",
						description: "A list of tool names that will bypass the confirmation dialog.",
						type: "Input"
					},
					{
						name: "tools.discoveryCommand",
						description: "Command to run for tool discovery.",
						type: "Input"
					},
					{
						name: "tools.callCommand",
						description: "Defines a custom shell command for calling a specific tool.",
						type: "Input"
					}
				]
			},
			{
				section: "mcp",
				items: [
					{
						name: "mcp.serverCommand",
						description: "Command to start an MCP server.",
						type: "Input"
					},
					{
						name: "mcp.allowed",
						description: "An allowlist of MCP servers to allow.",
						type: "Input"
					},
					{
						name: "mcp.excluded",
						description: "A denylist of MCP servers to exclude.",
						type: "Input"
					}
				]
			},
			{
				section: "security",
				items: [
					{
						name: "security.folderTrust.enabled",
						description: "Setting to track whether Folder trust is enabled.",
						type: "CheckBox"
					},
					{
						name: "security.auth.selectedType",
						description: "The currently selected authentication type.",
						type: "Input"
					},
					{
						name: "security.auth.enforcedType",
						description: "The required auth type (useful for enterprises).",
						type: "Input"
					},
					{
						name: "security.auth.useExternal",
						description: "Whether to use an external authentication flow.",
						type: "CheckBox"
					}
				]
			},
			{
				section: "advanced",
				items: [
					{
						name: "advanced.autoConfigureMemory",
						description: "Automatically configure Node.js memory limits.",
						type: "CheckBox"
					},
					{
						name: "advanced.dnsResolutionOrder",
						description: "The DNS resolution order.",
						type: "Input"
					},
					{
						name: "advanced.excludedEnvVars",
						description: "Environment variables to exclude from project context.",
						type: "Input",
						defaultValue: ["DEBUG", "DEBUG_MODE"]
					},
					{
						name: "advanced.bugCommand",
						description: "Configuration for the bug report command.",
						type: "Input"
					}
				]
			},
			{
				section: "telemetry",
				items: [
					{
						name: "telemetry.enabled",
						description: "Whether or not telemetry is enabled.",
						type: "CheckBox"
					},
					{
						name: "telemetry.target",
						description: "The destination for collected telemetry.",
						type: "DropDown",
						values: ["local", "gcp"]
					},
					{
						name: "telemetry.otlpEndpoint",
						description: "The endpoint for the OTLP Exporter.",
						type: "Input"
					},
					{
						name: "telemetry.otlpProtocol",
						description: "The protocol for the OTLP Exporter.",
						type: "DropDown",
						values: ["grpc", "http"]
					},
					{
						name: "telemetry.logPrompts",
						description: "Whether or not to include the content of user prompts in the logs.",
						type: "CheckBox"
					},
					{
						name: "telemetry.outfile",
						description: "The file to write telemetry to when target is local.",
						type: "File"
					}
				]
			}
		]
	}
];
//#endregion
//#region module/src/containers/agent/GeminiCli/RendererMethods.ts
const INSTALL_TIME_KEY$5 = "install-time-geminiCli";
const UPDATE_TIME_KEY$5 = "update-time-geminiCli";
const UPDATE_AVAILABLE_KEY$4 = "update-available-version-geminiCli";
function checkLinuxArgLine$5(line) {
	if (isWin && line.startsWith("set ")) return "set";
	if (line.startsWith("export ")) return "export";
	for (const arg of geminiCliArguments) if (arg.category === "Environment") {
		if (arg.sections[0].items.find((item) => item.name === line.split("=")[0])) return "var";
		else return;
	}
}
/**
* Finds the category and type of a given argument name.
* @param argName The name of the argument to look up.
* @returns An object with the category and type, or undefined if not found.
*/
function getArgumentInfo$1(argName) {
	for (const data of geminiCliArguments) if ("sections" in data) {
		for (const section of data.sections) for (const item of section.items) if (item.name.split(" ")[0] === argName) return {
			category: data.category,
			type: item.type
		};
	}
}
function parseArgsToFiles$2(args) {
	const executeCommand = "gemini";
	const envArgs = [];
	const cliArgs = [];
	const settingsArgs = [];
	args.forEach((arg) => {
		const info = getArgumentInfo$1(arg.name);
		if (info) switch (info.category) {
			case "Environment Variables":
				envArgs.push(arg);
				break;
			case "Command Line Arguments":
				cliArgs.push(arg);
				break;
			case "Settings": settingsArgs.push(arg);
		}
	});
	let scriptString = "";
	if (envArgs.length > 0) {
		envArgs.forEach((arg) => {
			scriptString += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
		});
		scriptString += "\n\n";
	}
	scriptString += executeCommand;
	cliArgs.forEach((arg) => {
		if (getArgumentInfo$1(arg.name)?.type === "CheckBox") {
			if (arg.value === "true") scriptString += ` ${arg.name}`;
		} else scriptString += ` ${arg.name} "${arg.value}"`;
	});
	scriptString += "\n";
	let settingsString = "";
	const settingsJson = {};
	if (settingsArgs.length > 0) {
		settingsArgs.forEach((arg) => {
			const keys = arg.name.split(".");
			let current = settingsJson;
			keys.slice(0, -1).forEach((key) => {
				current[key] = current[key] || {};
				current = current[key];
			});
			let value = arg.value;
			if (value === "true") value = true;
			else if (value === "false") value = false;
			else if (!isNaN(Number(value)) && value.trim() !== "" && !isNaN(parseFloat(value))) value = Number(value);
			current[keys[keys.length - 1]] = value;
		});
		settingsString += JSON.stringify(settingsJson, null, 2);
	}
	return {
		scriptData: scriptString,
		settingsData: settingsString
	};
}
function parseArgsToString$20(args) {
	const { settingsData, scriptData } = parseArgsToFiles$2(args);
	const scriptTitle = `Script File Preview (${isWin ? ".bat" : ".sh"})`;
	const scriptContent = !isEmpty(scriptData) ? scriptData : "# No environment variables or command lines configured.\n";
	const settingsTitle = "Settings File (settings.json)";
	const settingsContent = !isEmpty(settingsData) ? settingsData : "{\n  // No settings configured.\n}";
	if (isMultiFilePreviewSupported) return [{
		title: scriptTitle,
		data: scriptContent
	}, {
		title: settingsTitle,
		data: settingsContent
	}];
	return `${`-------------${scriptTitle}-------------\n${scriptContent}`}${`---------------- ${settingsTitle} ----------------\n${settingsContent}`}`;
}
function parseFilesToArgs$2(scriptContent, settingsContent) {
	const scriptArgs = parseStringToArgs$20(scriptContent);
	const settingsArgs = [];
	if (settingsContent) try {
		const settingsJson = JSON.parse(settingsContent);
		const flatten = (obj, path = "") => {
			let result = [];
			for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const newPath = path ? `${path}.${key}` : key;
				if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) result = result.concat(flatten(obj[key], newPath));
				else result.push({
					name: newPath,
					value: String(obj[key])
				});
			}
			return result;
		};
		flatten(settingsJson).forEach((arg) => {
			if (isValidArg(arg.name, geminiCliArguments)) settingsArgs.push(arg);
		});
	} catch (error) {
		console.error("Error parsing settings.json content:", error);
	}
	const combinedArgs = /* @__PURE__ */ new Map();
	scriptArgs.forEach((arg) => combinedArgs.set(arg.name, arg.value));
	settingsArgs.forEach((arg) => combinedArgs.set(arg.name, arg.value));
	return Array.from(combinedArgs, ([name, value]) => ({
		name,
		value
	}));
}
function parseStringToArgs$20(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("#")) return;
		if (line.startsWith("gemini")) {
			const clArg = line.split("gemini ")[1];
			if (!clArg) return;
			clArg.split("--").filter(Boolean).map((arg) => {
				const [id, ...value] = arg.trim().split(" ");
				return {
					name: `${id}`.toUpperCase(),
					value: value.join(" ").replace(/"/g, "")
				};
			}).forEach((value) => {
				if (isValidArg(value.name, openArguments)) {
					if (getArgumentType(value.name, openArguments) === "CheckBox") argResult.push({
						name: value.name,
						value: ""
					});
					else argResult.push({
						name: value.name,
						value: value.value
					});
				}
			});
		}
		const lineType = checkLinuxArgLine$5(line);
		if (lineType === "export" || lineType === "set") {
			let [name, value] = line.replace(`${lineType} `, "").split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, openArguments)) argResult.push({
				name,
				value
			});
		} else if (checkLinuxArgLine$5(line) === "var") {
			let [name, value] = line.split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, openArguments)) argResult.push({
				name,
				value
			});
		}
	});
	return argResult;
}
function startInstall$19(stepper) {
	stepper.initialSteps([
		"Getting Started",
		"NodeJS",
		"Detect Existing",
		"Gemini Cli",
		"All Done!"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking if NPM is installed...");
			stepper.ipc.invoke("is_gemini_npm_available").then((isNpmInstalled) => {
				if (isNpmInstalled) stepper.nextStep().then(() => {
					stepper.progressBar(true, "Checking for existing Gemini Cli installation...");
					stepper.ipc.invoke("is_geminiCli_installed").then((isGeminiCliInstalled) => {
						if (isGeminiCliInstalled) {
							stepper.setInstalled();
							const currentDate = /* @__PURE__ */ new Date();
							stepper.storage.set(INSTALL_TIME_KEY$5, currentDate.toLocaleString());
							stepper.showFinalStep("success", "You're All Set!", "Gemini Cli is already installed. You're good to go!");
						} else stepper.nextStep().then(() => {
							stepper.ipc.invoke("is_gemini_npm_version_above_12").then((isAbove12) => {
								const flags = isAbove12 ? " --allow-remote=all --dangerously-allow-all-scripts" : "";
								stepper.executeTerminalCommands(`npm i -g @google/gemini-cli${flags}`).then(() => {
									stepper.setInstalled();
									const currentDate = /* @__PURE__ */ new Date();
									stepper.storage.set(INSTALL_TIME_KEY$5, currentDate.toLocaleString());
									stepper.showFinalStep("success", "Installation Complete!", "Your Gemini Cli environment is ready. Enjoy!");
								});
							});
						});
					});
				});
				else stepper.showFinalStep("error", "NodeJs is not installed!", "Gemini Cli need NPM! Please install NodeJs then try again.");
			});
		});
	});
}
function startUpdate$7(stepper) {
	stepper.initialSteps(["Update Gemini Cli", "Complete Update"]);
	stepper.executeTerminalCommands("npm -g update @google/gemini-cli").then(() => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(UPDATE_TIME_KEY$5, currentDate.toLocaleString());
		stepper.setUpdated();
		stepper.showFinalStep("success", "Gemini Cli Updated Successfully!", `Gemini Cli has been updated to the latest version. You can now enjoy the new features and improvements.`);
	});
}
async function cardInfo$19(api, callback) {
	callback.setOpenFolders(void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			},
			{
				label: "Latest Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INSTALL_TIME_KEY$5).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.storage.get(UPDATE_TIME_KEY$5).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.ipc.invoke("current_geminiCli_version").then((result) => {
		descManager.updateItem(0, 2, result);
	});
	api.storage.get(UPDATE_AVAILABLE_KEY$4).then((result) => {
		descManager.updateItem(0, 3, result);
	});
}
const GeminiCli_RM = {
	cardInfo: cardInfo$19,
	parseStringToArgs: parseStringToArgs$20,
	parseArgsToString: parseArgsToString$20,
	manager: {
		startInstall: startInstall$19,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$7
		}
	}
};
//#endregion
//#region module/src/containers/agent/HermesAgent/Arguments.ts
const hermesAgentArguments = [
	{
		category: "LynxHub Configuration",
		items: [{
			name: "Settings File Location",
			description: "Optional path to a config.yaml or settings file. If set, LynxHub writes settings here from the Settings section.",
			type: "File"
		}]
	},
	{
		category: "Environment Variables",
		sections: [
			{
				section: "API & Provider Options",
				items: [
					{
						name: "NOUS_API_KEY",
						description: "API key for Nous Portal / Nous Research API.",
						type: "Input"
					},
					{
						name: "OPENROUTER_API_KEY",
						description: "API key for OpenRouter provider (recommended for multi-model access).",
						type: "Input"
					},
					{
						name: "OPENAI_API_KEY",
						description: "API key for OpenAI or custom OpenAI-compatible endpoints.",
						type: "Input"
					},
					{
						name: "OPENAI_BASE_URL",
						description: "Base URL for custom OpenAI-compatible endpoints (vLLM, SGLang, Ollama, etc.).",
						type: "Input"
					},
					{
						name: "ANTHROPIC_API_KEY",
						description: "API key for Anthropic Console / Claude provider.",
						type: "Input"
					},
					{
						name: "ANTHROPIC_BASE_URL",
						description: "Override base URL for Anthropic-compatible endpoints.",
						type: "Input"
					},
					{
						name: "GOOGLE_API_KEY",
						description: "API key for Google AI Studio / Gemini provider (alias: GEMINI_API_KEY).",
						type: "Input"
					},
					{
						name: "DEEPSEEK_API_KEY",
						description: "API key for direct DeepSeek access.",
						type: "Input"
					},
					{
						name: "FIREWORKS_API_KEY",
						description: "API key for Fireworks AI provider.",
						type: "Input"
					},
					{
						name: "GLM_API_KEY",
						description: "API key for z.ai / ZhipuAI GLM provider (alias: ZAI_API_KEY).",
						type: "Input"
					},
					{
						name: "KIMI_API_KEY",
						description: "API key for Kimi / Moonshot AI provider.",
						type: "Input"
					},
					{
						name: "DASHSCOPE_API_KEY",
						description: "API key for Qwen Cloud (Alibaba DashScope) provider.",
						type: "Input"
					},
					{
						name: "MINIMAX_API_KEY",
						description: "API key for MiniMax provider.",
						type: "Input"
					},
					{
						name: "XAI_API_KEY",
						description: "API key for xAI (Grok) provider.",
						type: "Input"
					},
					{
						name: "MISTRAL_API_KEY",
						description: "API key for Mistral provider (Voxtral STT & TTS).",
						type: "Input"
					},
					{
						name: "OLLAMA_API_KEY",
						description: "API key for Ollama Cloud provider.",
						type: "Input"
					},
					{
						name: "OLLAMA_BASE_URL",
						description: "Base URL for local or remote Ollama server (default: http://localhost:11434).",
						type: "Input"
					},
					{
						name: "NVIDIA_API_KEY",
						description: "API key for NVIDIA NIM provider.",
						type: "Input"
					},
					{
						name: "COPILOT_GITHUB_TOKEN",
						description: "GitHub token for GitHub Copilot API integration.",
						type: "Input"
					},
					{
						name: "AZURE_FOUNDRY_API_KEY",
						description: "API key for Microsoft Azure Foundry / Azure OpenAI.",
						type: "Input"
					},
					{
						name: "HERMES_YOLO_MODE",
						description: "Set to 1 or true to enable auto-approval of all command prompts.",
						type: "Input"
					},
					{
						name: "HERMES_MODEL",
						description: "Override default model name at process level.",
						type: "Input"
					},
					{
						name: "HERMES_HOME",
						description: "Override Hermes config and state directory (default: ~/.hermes).",
						type: "Directory"
					}
				]
			},
			{
				section: "Tool & Integration APIs",
				items: [
					{
						name: "FIRECRAWL_API_KEY",
						description: "API key for Firecrawl web scraping, search, and cloud browser.",
						type: "Input"
					},
					{
						name: "FIRECRAWL_API_URL",
						description: "Custom Firecrawl API endpoint for self-hosted instances.",
						type: "Input"
					},
					{
						name: "PARALLEL_API_KEY",
						description: "API key for Parallel AI search.",
						type: "Input"
					},
					{
						name: "TAVILY_API_KEY",
						description: "API key for Tavily AI web search.",
						type: "Input"
					},
					{
						name: "SEARXNG_URL",
						description: "SearXNG instance URL for free self-hosted web search.",
						type: "Input"
					},
					{
						name: "EXA_API_KEY",
						description: "API key for Exa AI search.",
						type: "Input"
					},
					{
						name: "BRAVE_SEARCH_API_KEY",
						description: "API key for Brave Search.",
						type: "Input"
					},
					{
						name: "BROWSERBASE_API_KEY",
						description: "API key for Browserbase cloud browser.",
						type: "Input"
					},
					{
						name: "BROWSER_USE_API_KEY",
						description: "API key for Browser Use cloud browser.",
						type: "Input"
					},
					{
						name: "FAL_KEY",
						description: "API key for FAL image generation.",
						type: "Input"
					},
					{
						name: "KREA_API_KEY",
						description: "API key for Krea 2 image generation.",
						type: "Input"
					},
					{
						name: "GROQ_API_KEY",
						description: "API key for Groq Whisper speech-to-text.",
						type: "Input"
					},
					{
						name: "ELEVENLABS_API_KEY",
						description: "API key for ElevenLabs premium TTS voices.",
						type: "Input"
					},
					{
						name: "HONCHO_API_KEY",
						description: "API key for Honcho user modeling memory system.",
						type: "Input"
					},
					{
						name: "SUPERMEMORY_API_KEY",
						description: "API key for Supermemory semantic long-term memory.",
						type: "Input"
					},
					{
						name: "DAYTONA_API_KEY",
						description: "API key for Daytona cloud sandboxes.",
						type: "Input"
					}
				]
			},
			{
				section: "Messaging Platforms",
				items: [
					{
						name: "TELEGRAM_BOT_TOKEN",
						description: "Bot token from @BotFather for Telegram gateway.",
						type: "Input"
					},
					{
						name: "TELEGRAM_ALLOWED_USERS",
						description: "Comma-separated list of allowed Telegram user IDs.",
						type: "Input"
					},
					{
						name: "DISCORD_BOT_TOKEN",
						description: "Bot token for Discord gateway.",
						type: "Input"
					},
					{
						name: "DISCORD_ALLOWED_USERS",
						description: "Comma-separated list of allowed Discord user IDs.",
						type: "Input"
					},
					{
						name: "SLACK_BOT_TOKEN",
						description: "Bot token (xoxb-...) for Slack gateway.",
						type: "Input"
					},
					{
						name: "SLACK_APP_TOKEN",
						description: "App-level token (xapp-...) for Slack Socket Mode.",
						type: "Input"
					},
					{
						name: "SLACK_ALLOWED_USERS",
						description: "Comma-separated list of allowed Slack user IDs.",
						type: "Input"
					}
				]
			},
			{
				section: "Networking & Proxy",
				items: [
					{
						name: "HTTPS_PROXY",
						description: "HTTPS proxy URL for network traffic.",
						type: "Input"
					},
					{
						name: "HTTP_PROXY",
						description: "HTTP proxy URL for network traffic.",
						type: "Input"
					},
					{
						name: "NO_PROXY",
						description: "Comma-separated domain or IP list to bypass proxy.",
						type: "Input"
					}
				]
			}
		]
	},
	{
		category: "Command Line Arguments",
		sections: [
			{
				section: "Subcommands & Execution Modes",
				items: [{
					name: "Subcommand",
					description: "Select top-level Hermes command to execute (e.g. chat, dashboard, gateway, setup, doctor).",
					type: "DropDown",
					defaultValue: "None / Default",
					values: [
						"None / Default",
						"chat",
						"dashboard",
						"gateway",
						"profile",
						"setup",
						"doctor",
						"status",
						"auth",
						"cron",
						"skills",
						"memory",
						"mcp",
						"plugins",
						"portal",
						"send",
						"kanban",
						"project",
						"security audit",
						"logs",
						"config",
						"insights",
						"version",
						"lsp",
						"secrets",
						"proxy",
						"egress",
						"pets",
						"computer-use",
						"whatsapp",
						"slack",
						"migrate",
						"serve",
						"desktop",
						"completion",
						"uninstall"
					]
				}, {
					name: "gateway subcommand",
					description: "Subcommand action when running hermes gateway (run, start, stop, restart, status, list, install).",
					type: "DropDown",
					defaultValue: "None / Default",
					values: [
						"None / Default",
						"run",
						"start",
						"stop",
						"restart",
						"status",
						"list",
						"install",
						"uninstall",
						"setup"
					]
				}]
			},
			{
				section: "Core Execution Options",
				items: [
					{
						name: "--model <model_name>",
						description: "Specify LLM provider and model (e.g. openrouter:anthropic/claude-sonnet-4).",
						type: "Input"
					},
					{
						name: "--provider <provider_name>",
						description: "Force a specific provider (openrouter, nous, anthropic, openai-api, gemini, etc.).",
						type: "Input"
					},
					{
						name: "-q <prompt>",
						description: "Run a single prompt non-interactively and exit.",
						type: "Input"
					},
					{
						name: "-p <prompt>",
						description: "Run a single prompt non-interactively and exit.",
						type: "Input"
					},
					{
						name: "-z <prompt>",
						description: "Scripted one-shot mode (single prompt in, plain response text out, no banner/spinner).",
						type: "Input"
					},
					{
						name: "--image <path>",
						description: "Attach a local image file to a single query.",
						type: "File"
					},
					{
						name: "--usage-file <path>",
						description: "Write a JSON usage report after a scripted one-shot run.",
						type: "File"
					},
					{
						name: "--yolo",
						description: "Bypass all approval prompts and auto-approve command executions.",
						type: "CheckBox"
					},
					{
						name: "--portal",
						description: "Use Nous Portal subscription setup for models and tool gateway.",
						type: "CheckBox"
					},
					{
						name: "--toolsets <toolsets>",
						description: "Enable a comma-separated set of toolsets (e.g. web,terminal,skills).",
						type: "Input"
					},
					{
						name: "--skills <skills>",
						description: "Preload one or more skills for the session (comma-separated).",
						type: "Input"
					},
					{
						name: "--resume <session_id>",
						description: "Resume a previous session by ID or title.",
						type: "Input"
					},
					{
						name: "--continue [name]",
						description: "Resume the most recent session, or session matching title.",
						type: "Input"
					},
					{
						name: "--in <dir>",
						description: "Change into directory before starting or resuming.",
						type: "Directory"
					},
					{
						name: "--worktree",
						description: "Start in an isolated git worktree for parallel-agent workflows.",
						type: "CheckBox"
					},
					{
						name: "--checkpoints",
						description: "Enable filesystem checkpoints before destructive file changes.",
						type: "CheckBox"
					},
					{
						name: "--pass-session-id",
						description: "Include the session ID in the agent system prompt.",
						type: "CheckBox"
					},
					{
						name: "--ignore-user-config",
						description: "Ignore ~/.hermes/config.yaml and fall back to built-in defaults.",
						type: "CheckBox"
					},
					{
						name: "--ignore-rules",
						description: "Skip auto-injection of AGENTS.md, SOUL.md, .cursorrules, memory, and skills.",
						type: "CheckBox"
					},
					{
						name: "--safe-mode",
						description: "Troubleshooting mode: disable ALL user config, rules, plugins, shell hooks, and MCP servers.",
						type: "CheckBox"
					},
					{
						name: "--tui",
						description: "Launch the TUI interface instead of classic CLI REPL.",
						type: "CheckBox"
					},
					{
						name: "--cli",
						description: "Force classic prompt_toolkit REPL interface.",
						type: "CheckBox"
					},
					{
						name: "--source <source>",
						description: "Session source tag for filtering (default: cli).",
						type: "Input"
					},
					{
						name: "--max-turns <turns>",
						description: "Maximum tool-calling iterations per turn.",
						type: "Number"
					},
					{
						name: "--profile <profile_name>",
						description: "Select which Hermes profile to use for this invocation.",
						type: "Input"
					}
				]
			},
			{
				section: "Subcommand Specific Flags",
				items: [
					{
						name: "--all",
						description: "Act on all profiles for gateway, status, or list commands.",
						type: "CheckBox"
					},
					{
						name: "--json",
						description: "Emit machine-readable JSON output instead of plain text.",
						type: "CheckBox"
					},
					{
						name: "--deep",
						description: "Run deeper diagnostic and status checks.",
						type: "CheckBox"
					},
					{
						name: "--fail-on <level>",
						description: "Exit non-zero when security audit finds vulnerabilities at or above severity (low, moderate, high, critical).",
						type: "DropDown",
						defaultValue: "critical",
						values: [
							"low",
							"moderate",
							"high",
							"critical"
						]
					}
				]
			},
			{
				section: "Display & Help Options",
				items: [
					{
						name: "-v",
						description: "Enable verbose logging output.",
						type: "CheckBox"
					},
					{
						name: "-Q",
						description: "Programmatic quiet mode: suppress banner, spinner, and tool previews.",
						type: "CheckBox"
					},
					{
						name: "--debug",
						description: "Enable verbose debug logging.",
						type: "CheckBox"
					},
					{
						name: "--help",
						description: "Displays help information about Hermes Agent commands.",
						type: "CheckBox"
					},
					{
						name: "--version",
						description: "Displays the version of Hermes Agent.",
						type: "CheckBox"
					}
				]
			}
		]
	},
	{
		category: "Settings",
		condition: "Settings File Location",
		sections: [
			{
				section: "General & Learning",
				items: [
					{
						name: "learning.enabled",
						description: "Enable autonomous skill creation and procedural memory learning loop.",
						type: "CheckBox"
					},
					{
						name: "learning.autoSaveSkills",
						description: "Automatically save skills generated during task execution.",
						type: "CheckBox"
					},
					{
						name: "telemetry.enabled",
						description: "Permit metric collection and crash log streaming.",
						type: "CheckBox"
					},
					{
						name: "updates.pre_update_backup",
						description: "Pre-update safety backup mode before running hermes update.",
						type: "DropDown",
						defaultValue: "quick",
						values: [
							"quick",
							"full",
							"off"
						]
					}
				]
			},
			{
				section: "Terminal Environment & Sandboxing",
				items: [
					{
						name: "terminal.backend",
						description: "Execution backend for terminal commands (local, docker, ssh, modal, daytona, singularity).",
						type: "DropDown",
						defaultValue: "local",
						values: [
							"local",
							"docker",
							"ssh",
							"modal",
							"daytona",
							"singularity"
						]
					},
					{
						name: "terminal.timeout",
						description: "Per-command execution timeout in seconds.",
						type: "Number",
						defaultValue: 180
					},
					{
						name: "terminal.home_mode",
						description: "Subprocess HOME directory policy for launched tools.",
						type: "DropDown",
						defaultValue: "auto",
						values: [
							"auto",
							"real",
							"profile"
						]
					},
					{
						name: "terminal.persistent_shell",
						description: "Maintain a long-lived bash shell process across commands (default true for SSH).",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "terminal.docker_image",
						description: "Docker container image for Docker terminal backend.",
						type: "Input",
						defaultValue: "nikolaik/python-nodejs:python3.11-nodejs20"
					},
					{
						name: "terminal.docker_run_as_host_user",
						description: "Run Docker container as host UID:GID to avoid root file ownership issues.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "terminal.docker_network",
						description: "Enable network access inside Docker container (false = air-gap with --network=none).",
						type: "CheckBox",
						defaultValue: true
					}
				]
			},
			{
				section: "Memory & Context Controls",
				items: [
					{
						name: "memory.memory_enabled",
						description: "Enable persistent long-term memory system.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "memory.user_profile_enabled",
						description: "Enable automatic user profile modeling across sessions.",
						type: "CheckBox",
						defaultValue: true
					},
					{
						name: "memory.write_approval",
						description: "Require user approval before staging or writing memory entries.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "skills.guard_agent_created",
						description: "Scan agent-created skills for dangerous keyword patterns.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "skills.write_approval",
						description: "Gate all agent skill creations and modifications behind explicit review.",
						type: "CheckBox",
						defaultValue: false
					},
					{
						name: "context_file_max_chars",
						description: "Maximum character limit for loaded context files (SOUL.md, AGENTS.md, etc.).",
						type: "Number",
						defaultValue: 2e4
					},
					{
						name: "file_read_max_chars",
						description: "Maximum character limit per single read_file tool call.",
						type: "Number",
						defaultValue: 1e5
					},
					{
						name: "worktree",
						description: "Automatically run in an isolated git worktree per session.",
						type: "CheckBox",
						defaultValue: false
					}
				]
			},
			{
				section: "Tool Output Truncation",
				items: [
					{
						name: "tool_output.max_bytes",
						description: "Maximum character cap for terminal tool output before truncation.",
						type: "Number",
						defaultValue: 5e4
					},
					{
						name: "tool_output.max_lines",
						description: "Maximum line limit for read_file pagination.",
						type: "Number",
						defaultValue: 2e3
					},
					{
						name: "tool_output.max_line_length",
						description: "Maximum character length per line in line-numbered read_file views.",
						type: "Number",
						defaultValue: 2e3
					}
				]
			}
		]
	}
];
//#endregion
//#region module/src/containers/agent/HermesAgent/RendererMethods.ts
const INSTALL_TIME_KEY$4 = "install-time-hermesAgent";
const UPDATE_TIME_KEY$4 = "update-time-hermesAgent";
const UPDATE_AVAILABLE_KEY$3 = "update-available-version-hermesAgent";
const KNOWN_SUBCOMMANDS = [
	"chat",
	"dashboard",
	"gateway",
	"profile",
	"setup",
	"doctor",
	"status",
	"auth",
	"cron",
	"skills",
	"memory",
	"mcp",
	"plugins",
	"portal",
	"send",
	"kanban",
	"project",
	"security audit",
	"security",
	"logs",
	"config",
	"insights",
	"version",
	"lsp",
	"secrets",
	"proxy",
	"egress",
	"pets",
	"computer-use",
	"whatsapp",
	"slack",
	"migrate",
	"serve",
	"desktop",
	"completion",
	"uninstall"
];
const KNOWN_GATEWAY_SUBCOMMANDS = [
	"run",
	"start",
	"stop",
	"restart",
	"status",
	"list",
	"install",
	"uninstall",
	"setup"
];
function checkEnvLine(line) {
	if (isWin && line.startsWith("set ")) return "set";
	if (line.startsWith("export ")) return "export";
	const varName = line.split("=")[0].trim();
	for (const arg of hermesAgentArguments) if (arg.category === "Environment Variables" && "sections" in arg) {
		for (const section of arg.sections) if (section.items.some((item) => item.name === varName)) return "var";
	}
}
function getArgumentInfo(argName) {
	for (const data of hermesAgentArguments) if ("sections" in data) {
		for (const section of data.sections) for (const item of section.items) if (item.name.split(" ")[0] === argName) return {
			category: data.category,
			type: item.type,
			name: item.name
		};
	}
}
function parseArgsToFiles$1(args) {
	const executeCommand = "hermes";
	const envArgs = [];
	const cliArgs = [];
	const settingsArgs = [];
	const customLines = [];
	let subcommandStr = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (result) {
				if (result.line) customLines.push(result.line);
				if (result.commandArg) subcommandStr += ` ${result.commandArg}`;
			}
			return;
		}
		if (arg.name === "Subcommand" && arg.value && arg.value !== "None / Default") {
			subcommandStr += ` ${arg.value}`;
			return;
		}
		if (arg.name === "gateway subcommand" && arg.value && arg.value !== "None / Default") {
			subcommandStr += ` ${arg.value}`;
			return;
		}
		const info = getArgumentInfo(arg.name.split(" ")[0]) || getArgumentInfo(arg.name);
		if (info) switch (info.category) {
			case "Environment Variables":
				envArgs.push(arg);
				break;
			case "Command Line Arguments":
				cliArgs.push(arg);
				break;
			case "Settings": settingsArgs.push(arg);
		}
	});
	let scriptString = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	if (envArgs.length > 0) envArgs.forEach((arg) => {
		scriptString += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
	});
	if (customLines.length > 0) customLines.forEach((line) => {
		scriptString += `${line}\n`;
	});
	if (envArgs.length > 0 || customLines.length > 0) scriptString += "\n";
	scriptString += `${executeCommand}${subcommandStr}`;
	cliArgs.forEach((arg) => {
		const info = getArgumentInfo(arg.name.split(" ")[0]) || getArgumentInfo(arg.name);
		if (!info) return;
		const flagName = info.name.split(" ")[0];
		if (info.type === "CheckBox") {
			if (arg.value !== "false" && arg.value !== false && arg.value !== 0 && String(arg.value) !== "0") scriptString += ` ${flagName}`;
		} else if (arg.value !== void 0 && arg.value !== null && String(arg.value).trim() !== "") scriptString += ` ${flagName} "${arg.value}"`;
	});
	scriptString += "\n";
	let settingsString = "";
	const settingsJson = {};
	if (settingsArgs.length > 0) {
		settingsArgs.forEach((arg) => {
			const keys = arg.name.split(".");
			let current = settingsJson;
			keys.slice(0, -1).forEach((key) => {
				current[key] = current[key] || {};
				current = current[key];
			});
			let value = arg.value;
			if (String(value) === "true") value = true;
			else if (String(value) === "false") value = false;
			else if (typeof value === "string" && !isNaN(Number(value)) && value.trim() !== "" && !isNaN(parseFloat(value))) value = Number(value);
			current[keys[keys.length - 1]] = value;
		});
		if (!isEmpty(settingsJson)) settingsString = JSON.stringify(settingsJson, null, 2);
	}
	return {
		scriptData: scriptString,
		settingsData: settingsString
	};
}
function parseArgsToString$19(args) {
	const { settingsData, scriptData } = parseArgsToFiles$1(args);
	const scriptTitle = `Script File Preview (${isWin ? ".bat" : ".sh"})`;
	const scriptContent = !isEmpty(scriptData) ? scriptData : "# No environment variables or command line arguments configured.\n";
	const settingsTitle = "Settings File (config.yaml)";
	const settingsContent = !isEmpty(settingsData) ? settingsData : "{\n  // No settings configured.\n}";
	if (isMultiFilePreviewSupported) return [{
		title: scriptTitle,
		data: scriptContent
	}, {
		title: settingsTitle,
		data: settingsContent
	}];
	return `${`-------------${scriptTitle}-------------\n${scriptContent}`}${`---------------- ${settingsTitle} ----------------\n${settingsContent}`}`;
}
function parseFilesToArgs$1(scriptContent, settingsContent) {
	const scriptArgs = parseStringToArgs$19(scriptContent);
	const settingsArgs = [];
	if (settingsContent) try {
		const settingsJson = JSON.parse(settingsContent);
		const flatten = (obj, path = "") => {
			let result = [];
			for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const newPath = path ? `${path}.${key}` : key;
				if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) result = result.concat(flatten(obj[key], newPath));
				else {
					const value = typeof obj[key] === "string" ? obj[key] : JSON.stringify(obj[key]);
					result.push({
						name: newPath,
						value
					});
				}
			}
			return result;
		};
		flatten(settingsJson).forEach((arg) => {
			if (isValidArg(arg.name, hermesAgentArguments)) settingsArgs.push(arg);
		});
	} catch (error) {
		console.error("Error parsing settings content for Hermes Agent:", error);
	}
	const combinedArgs = /* @__PURE__ */ new Map();
	scriptArgs.forEach((arg) => combinedArgs.set(arg.name, arg.value));
	settingsArgs.forEach((arg) => combinedArgs.set(arg.name, arg.value));
	return Array.from(combinedArgs, ([name, value]) => ({
		name,
		value
	}));
}
function parseStringToArgs$19(data) {
	const argResult = [];
	data.split("\n").forEach((line) => {
		const trimmedLine = line.trim();
		if (trimmedLine.startsWith("#") || trimmedLine.startsWith("REM") || trimmedLine === "@echo off") return;
		if (trimmedLine.startsWith("hermes")) {
			const clArg = trimmedLine.substring(6).trim();
			if (!clArg) return;
			const tokenRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g;
			const tokens = [];
			let tokenMatch;
			while ((tokenMatch = tokenRegex.exec(clArg)) !== null) tokens.push(tokenMatch[1] ?? tokenMatch[2] ?? tokenMatch[3]);
			for (let i = 0; i < tokens.length; i++) {
				const token = tokens[i];
				if (KNOWN_SUBCOMMANDS.includes(token)) {
					argResult.push({
						name: "Subcommand",
						value: token
					});
					continue;
				}
				if (KNOWN_GATEWAY_SUBCOMMANDS.includes(token)) {
					argResult.push({
						name: "gateway subcommand",
						value: token
					});
					continue;
				}
				if (token.startsWith("-")) {
					const info = getArgumentInfo(token);
					if (info) {
						if (getArgumentType(info.name, hermesAgentArguments) === "CheckBox") argResult.push({
							name: info.name,
							value: "true"
						});
						else {
							const nextToken = tokens[i + 1];
							if (nextToken && !nextToken.startsWith("-")) {
								argResult.push({
									name: info.name,
									value: nextToken.replace(/"/g, "")
								});
								i++;
							} else argResult.push({
								name: info.name,
								value: ""
							});
						}
					} else {
						const nextToken = tokens[i + 1];
						if (nextToken && !nextToken.startsWith("-")) {
							argResult.push({
								name: token,
								value: nextToken.replace(/"/g, ""),
								custom: {
									kind: "commandLine",
									type: "Input"
								}
							});
							i++;
						} else argResult.push({
							name: token,
							value: "true",
							custom: {
								kind: "commandLine",
								type: "CheckBox"
							}
						});
					}
				} else argResult.push({
					name: token,
					value: token,
					custom: {
						kind: "commandLine",
						type: "Input"
					}
				});
			}
		}
		const lineType = checkEnvLine(line);
		if (lineType === "export" || lineType === "set") {
			let [name, value] = line.replace(`${lineType} `, "").split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes((value || "").trim());
			if (isValidArg(name, hermesAgentArguments)) argResult.push({
				name,
				value
			});
			else argResult.push({
				name,
				value,
				custom: {
					kind: "envVar",
					type: "Input"
				}
			});
		} else if (checkEnvLine(line) === "var") {
			let [name, value] = line.split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes((value || "").trim());
			if (isValidArg(name, hermesAgentArguments)) argResult.push({
				name,
				value
			});
			else argResult.push({
				name,
				value,
				custom: {
					kind: "envVar",
					type: "Input"
				}
			});
		}
	});
	return argResult;
}
function startInstall$18(stepper) {
	stepper.initialSteps([
		"Getting Started",
		"Detect Existing",
		"Hermes Agent",
		"All Done!"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking for existing Hermes Agent installation...");
			stepper.ipc.invoke("is_hermes_agent_installed").then((isInstalled) => {
				if (isInstalled) {
					stepper.setInstalled();
					const currentDate = /* @__PURE__ */ new Date();
					stepper.storage.set(INSTALL_TIME_KEY$4, currentDate.toLocaleString());
					stepper.showFinalStep("success", "You're All Set!", "Hermes Agent is already installed and ready to use.");
				} else stepper.nextStep().then(() => {
					const installCommand = isWin ? "iex (irm https://hermes-agent.nousresearch.com/install.ps1)" : "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash";
					stepper.executeTerminalCommands(installCommand).then(() => {
						stepper.setInstalled();
						const currentDate = /* @__PURE__ */ new Date();
						stepper.storage.set(INSTALL_TIME_KEY$4, currentDate.toLocaleString());
						stepper.showFinalStep("success", "Installation Complete!", "Hermes Agent has been installed successfully.");
					});
				});
			});
		});
	});
}
function startUpdate$6(stepper) {
	stepper.initialSteps(["Update Hermes Agent", "Complete Update"]);
	stepper.executeTerminalCommands("hermes update").then(() => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(UPDATE_TIME_KEY$4, currentDate.toLocaleString());
		stepper.setUpdated();
		stepper.showFinalStep("success", "Hermes Agent Updated Successfully!", "Hermes Agent has been updated to the latest available version.");
	});
}
async function cardInfo$18(api, callback) {
	callback.setOpenFolders(void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			},
			{
				label: "Latest Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INSTALL_TIME_KEY$4).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.storage.get(UPDATE_TIME_KEY$4).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.ipc.invoke("current_hermes_agent_version").then((result) => {
		descManager.updateItem(0, 2, result);
	});
	api.storage.get(UPDATE_AVAILABLE_KEY$3).then((result) => {
		descManager.updateItem(0, 3, result);
	});
}
const HermesAgent_RM = {
	catchAddress: catchAddress$5,
	cardInfo: cardInfo$18,
	parseStringToArgs: parseStringToArgs$19,
	parseArgsToString: parseArgsToString$19,
	manager: {
		startInstall: startInstall$18,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$6
		}
	}
};
//#endregion
//#region module/src/containers/agent/Langflow/Arguments.ts
const langflowArguments = [{
	category: "General",
	sections: [
		{
			section: "Basic Configuration",
			items: [
				{
					name: "PORT",
					description: "The HTTP port Langflow runs on",
					type: "Input",
					defaultValue: 7860
				},
				{
					name: "HOST",
					description: "The host address to bind the server to",
					type: "Input",
					defaultValue: "127.0.0.1"
				},
				{
					name: "LANGFLOW_AUTO_LOGIN",
					description: "Enable automatic login without credentials",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--open-browser",
					description: "Open the browser automatically after starting the server",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "--backend-only",
					description: "Run only the backend server without serving frontend assets",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "--frontend-path",
					description: "Path to custom frontend directory containing build files",
					type: "Directory"
				}
			]
		},
		{
			section: "Logging & Environment",
			items: [
				{
					name: "LANGFLOW_LOG_LEVEL",
					description: "Set logging level for Langflow backend",
					type: "DropDown",
					values: [
						"debug",
						"info",
						"warning",
						"error",
						"critical"
					],
					defaultValue: "info"
				},
				{
					name: "LANGFLOW_ENV_FILE",
					description: "Path to custom .env file",
					type: "File"
				},
				{
					name: "LANGFLOW_COMPONENTS_PATH",
					description: "Path to custom components directory",
					type: "Directory"
				},
				{
					name: "--log-file",
					description: "Path to the log file",
					type: "File"
				},
				{
					name: "--log-rotation",
					description: "Log rotation rule (Time/Size)",
					type: "Input"
				},
				{
					name: "DO_NOT_TRACK",
					description: "Opt out of anonymous telemetry usage data collection",
					type: "CheckBox",
					defaultValue: false
				}
			]
		},
		{
			section: "Performance & SSL",
			items: [
				{
					name: "--workers",
					description: "Number of worker processes",
					type: "Input"
				},
				{
					name: "--worker-timeout",
					description: "Worker process timeout in seconds",
					type: "Input"
				},
				{
					name: "--ssl-cert-file-path",
					description: "Defines the SSL certificate file path",
					type: "File"
				},
				{
					name: "--ssl-key-file-path",
					description: "Defines the SSL key file path",
					type: "File"
				}
			]
		}
	]
}];
//#endregion
//#region module/src/containers/agent/Langflow/RendererMethods.ts
const INSTALL_TIME_KEY$3 = "install-time-langflow";
const UPDATE_TIME_KEY$3 = "update-time-langflow";
const UPDATE_AVAILABLE_KEY$2 = "update-available-version-langflow";
function checkLinuxArgLine$4(line) {
	if (isWin && line.startsWith("set ")) return "set";
	if (line.startsWith("export ")) return "export";
	for (const arg of langflowArguments) if (arg.category === "General") {
		if (arg.sections[0].items.find((item) => item.name === line.split("=")[0])) return "var";
	}
}
function parseArgsToString$18(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let cmArgs = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const res = parseCustomArg(arg);
			if (!res) return;
			if (res.line) lines += res.line + "\n";
			if (res.commandArg) cmArgs += res.commandArg + " ";
		} else {
			if (arg.name === "PORT") {
				cmArgs += `--port ${arg.value} `;
				return;
			}
			if (arg.name === "HOST") {
				cmArgs += `--host ${arg.value} `;
				return;
			}
			if (arg.name.startsWith("--")) {
				if (getArgumentType(arg.name, langflowArguments) === "CheckBox") {
					if (arg.value !== "false") cmArgs += `${arg.name} `;
				} else cmArgs += `${arg.name} ${arg.value} `;
				return;
			}
			if (getArgumentType(arg.name, langflowArguments) === "CheckBox") {
				const eWinResult = `set ${arg.name}=true\n`;
				const eResult = `export ${arg.name}="true"\n`;
				result += isWin ? eWinResult : eResult;
			} else {
				const eWinResult = `set ${arg.name}=${arg.value}\n`;
				const eResult = `export ${arg.name}="${arg.value}"\n`;
				result += isWin ? eWinResult : eResult;
			}
		}
	});
	if (lines) result += lines + "\n";
	cmArgs = cmArgs.trim();
	result += `langflow run${cmArgs ? " " + cmArgs : ""}`;
	return result;
}
function parseStringToArgs$18(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("#") || line.startsWith("REM") || line.startsWith("@echo")) return;
		if (line.includes("langflow run")) {
			const clArg = line.split("langflow run")[1]?.trim();
			if (!clArg) return;
			clArg.split("--").filter(Boolean).forEach((arg) => {
				const [id, ...valueParts] = arg.trim().split(" ");
				const name = `--${id}`;
				const value = valueParts.join(" ").replace(/"/g, "");
				if (isValidArg(name, langflowArguments)) {
					if (getArgumentType(name, langflowArguments) === "CheckBox") argResult.push({
						name,
						value: ""
					});
					else argResult.push({
						name,
						value
					});
				} else if (isValidArg(id.toUpperCase(), langflowArguments)) argResult.push({
					name: id.toUpperCase(),
					value
				});
			});
		}
		const lineType = checkLinuxArgLine$4(line);
		if (lineType === "export" || lineType === "set") {
			let [name, value] = line.replace(`${lineType} `, "").split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes((value || "").trim());
			if (isValidArg(name, langflowArguments)) argResult.push({
				name,
				value
			});
		}
	});
	return argResult;
}
function startInstall$17(stepper) {
	const pipCommand = getPythonCommandByOs().pip;
	stepper.initialSteps([
		"Getting Started",
		"Detect Existing",
		"Install Langflow",
		"All Done!"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking for existing Langflow installation...");
			stepper.ipc.invoke("is_langflow_installed").then((isInstalled) => {
				if (isInstalled) {
					stepper.setInstalled();
					const currentDate = /* @__PURE__ */ new Date();
					stepper.storage.set(INSTALL_TIME_KEY$3, currentDate.toLocaleString());
					stepper.showFinalStep("success", "You're All Set!", "Langflow is already installed. You're good to go!");
				} else stepper.nextStep().then(() => {
					stepper.executeTerminalCommands([`${pipCommand} install uv`, "uv pip install langflow"]).then(() => {
						stepper.setInstalled();
						const currentDate = /* @__PURE__ */ new Date();
						stepper.storage.set(INSTALL_TIME_KEY$3, currentDate.toLocaleString());
						stepper.showFinalStep("success", "Installation Complete!", "Your Langflow environment is ready. Enjoy!");
					});
				});
			});
		});
	});
}
function startUpdate$5(stepper) {
	stepper.initialSteps(["Update Langflow", "Complete Update"]);
	stepper.executeTerminalCommands("pip install --upgrade langflow").then(() => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(UPDATE_TIME_KEY$3, currentDate.toLocaleString());
		stepper.setUpdated();
		stepper.showFinalStep("success", "Langflow Updated Successfully!", "Langflow has been updated to the latest version. You can now enjoy the new features and improvements.");
	});
}
async function cardInfo$17(api, callback) {
	callback.setOpenFolders(void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			},
			{
				label: "Latest Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INSTALL_TIME_KEY$3).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.storage.get(UPDATE_TIME_KEY$3).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.ipc.invoke("current_langflow_version").then((result) => {
		descManager.updateItem(0, 2, result);
	});
	api.storage.get(UPDATE_AVAILABLE_KEY$2).then((result) => {
		descManager.updateItem(0, 3, result);
	});
}
function catchAddress$3(input) {
	const cleanInput = input.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, "");
	if (cleanInput.toLowerCase().includes("[OK] Open Langflow".toLowerCase())) return void 0;
	if (cleanInput.toLowerCase().includes("Uvicorn running on".toLowerCase())) {
		const match = cleanInput.match(/Uvicorn running on\s+([^\s)]+)/i);
		if (match) {
			let url = match[1].replace(/[.,;:)]+$/, "");
			if (!/^https?:\/\//i.test(url)) url = `http://${url}`;
			return replaceAddress(url);
		}
	}
	for (const pattern of [
		/https?:\/\/localhost(?::\d+)?/i,
		/https?:\/\/127\.0\.0\.1(?::\d+)?/i,
		/https?:\/\/0\.0\.0\.0(?::\d+)?/i,
		/https?:\/\/\[::1](?::\d+)?/i,
		/https?:\/\/(?:[\w-]+\.)*localhost(?::\d+)?/i
	]) {
		const match = cleanInput.match(pattern);
		if (match) return replaceAddress(match[0]);
	}
}
const Langflow_RM = {
	catchAddress: catchAddress$3,
	cardInfo: cardInfo$17,
	parseStringToArgs: parseStringToArgs$18,
	parseArgsToString: parseArgsToString$18,
	manager: {
		startInstall: startInstall$17,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$5
		}
	}
};
//#endregion
//#region module/src/containers/agent/N8N/Arguments/index.ts
const n8nArguments = [
	{
		category: "AI Assistant",
		items: [
			{
				name: "N8N_AI_ENABLED",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether AI features (such as AI nodes and AI assistant) are enabled globally."
			},
			{
				name: "N8N_AI_ASSISTANT_BASE_URL",
				type: "Input",
				description: "Base URL of the AI assistant service, specified as `https://ai-assistant.n8n.io`. Required if you self-host n8n and want to enable the AI Assistant."
			},
			{
				name: "N8N_AI_ALLOW_SENDING_PARAMETER_VALUES",
				type: "CheckBox",
				defaultValue: true,
				description: "Whether workflow and node parameter values may be sent to AI providers. When false, only structure or placeholders are sent."
			},
			{
				name: "N8N_AI_AGENT_MAX_PASSTHROUGH_BINARY_SIZE_BYTES",
				type: "Input",
				defaultValue: 52428800,
				description: "Maximum size in bytes of a single binary file (e.g. an image or PDF) that the AI Agent node will pass through to a model. Default: 50 MB (52428800 bytes)."
			}
		]
	},
	{
		category: "Nodes",
		items: [
			{
				name: "N8N_COMMUNITY_PACKAGES_ENABLED",
				type: "CheckBox",
				defaultValue: true,
				description: "Enables (true) or disables (false) the functionality to install and load community nodes. If set to false, neither verified nor unverified community packages will be available, regardless of their individual settings."
			},
			{
				name: "N8N_COMMUNITY_PACKAGES_MANAGED_BY_ENV",
				type: "CheckBox",
				defaultValue: false,
				description: "Set to `true` to manage installed community packages from environment variables. Reconciles installed packages against N8N_COMMUNITY_PACKAGES on startup."
			},
			{
				name: "N8N_COMMUNITY_PACKAGES",
				type: "Input",
				description: "JSON array of community packages to install. Each entry is an object with a `name` (required) and optional `version` and `checksum` fields."
			},
			{
				name: "N8N_COMMUNITY_PACKAGES_PREVENT_LOADING",
				type: "CheckBox",
				description: "Prevents (true) or allows (false) loading installed community nodes on instance startup. Use this if a faulty node prevents the instance from starting."
			},
			{
				name: "N8N_COMMUNITY_PACKAGES_REGISTRY",
				type: "Input",
				defaultValue: "https://registry.npmjs.org",
				description: "NPM registry URL to pull community packages from (license required)."
			},
			{
				name: "N8N_CUSTOM_EXTENSIONS",
				type: "Input",
				description: "Specify the path to directories containing your custom nodes."
			},
			{
				name: "N8N_PYTHON_ENABLED",
				type: "CheckBox",
				description: "Whether to enable Python execution on the Code node."
			},
			{
				name: "N8N_UNVERIFIED_PACKAGES_ENABLED",
				type: "CheckBox",
				description: "When N8N_COMMUNITY_PACKAGES_ENABLED is true, this variable controls whether to enable the installation and use of unverified community nodes from an NPM registry (true) or not (false)."
			},
			{
				name: "N8N_VERIFIED_PACKAGES_ENABLED",
				type: "CheckBox",
				description: "When N8N_COMMUNITY_PACKAGES_ENABLED is true, this variable controls whether to show verified community nodes in the nodes panel for installation and use (true) or to hide them (false)."
			},
			{
				name: "NODE_FUNCTION_ALLOW_BUILTIN",
				type: "Input",
				description: "Permit users to import specific built-in modules in the Code node. Use * to allow all. n8n disables importing modules by default."
			},
			{
				name: "NODE_FUNCTION_ALLOW_EXTERNAL",
				type: "Input",
				description: "Permit users to import specific external modules (from n8n/node_modules) in the Code node. n8n disables importing modules by default."
			},
			{
				name: "NODES_ERROR_TRIGGER_TYPE",
				type: "Input",
				defaultValue: "n8n-nodes-base.errorTrigger",
				description: "Specify which node type to use as Error Trigger."
			},
			{
				name: "NODES_EXCLUDE",
				type: "Input",
				defaultValue: "[\"n8n-nodes-base.executeCommand\", \"n8n-nodes-base.localFileTrigger\"]",
				description: "Specify which nodes not to load. For example, to block nodes that can be a security risk if users aren't trustworthy: NODES_EXCLUDE: \"[\"n8n-nodes-base.executeCommand\", \"@n8n/n8n-nodes-langchain.lmChatDeepSeek\"]\". To enable all nodes, specify NODES_EXCLUDE: \"[]\"."
			},
			{
				name: "NODES_INCLUDE",
				type: "Input",
				description: "Specify which nodes to load."
			}
		]
	},
	{
		category: "User Management & Auth",
		items: [
			{
				name: "N8N_INSTANCE_OWNER_MANAGED_BY_ENV",
				type: "CheckBox",
				defaultValue: false,
				description: "Set to `true` to manage the instance owner from environment variables. Overwrites instance owner details on startup and locks UI control."
			},
			{
				name: "N8N_INSTANCE_OWNER_EMAIL",
				type: "Input",
				description: "Email address for the instance owner."
			},
			{
				name: "N8N_INSTANCE_OWNER_FIRST_NAME",
				type: "Input",
				description: "First name for the instance owner."
			},
			{
				name: "N8N_INSTANCE_OWNER_LAST_NAME",
				type: "Input",
				description: "Last name for the instance owner."
			},
			{
				name: "N8N_INSTANCE_OWNER_PASSWORD_HASH",
				type: "Input",
				description: "Bcrypt hash of the instance owner's password. Setting a plaintext password breaks login."
			},
			{
				name: "N8N_SSO_MANAGED_BY_ENV",
				type: "CheckBox",
				defaultValue: false,
				description: "Set to `true` to manage SSO from environment variables. Applies SSO variables on startup and locks matching UI controls."
			},
			{
				name: "N8N_SSO_USER_ROLE_PROVISIONING",
				type: "DropDown",
				defaultValue: "disabled",
				values: [
					"disabled",
					"instance_role",
					"instance_and_project_roles"
				],
				description: "How n8n provisions roles for users who sign in through SSO. `disabled` does not provision roles; `instance_role` provisions instance-level role; `instance_and_project_roles` provisions both."
			},
			{
				name: "N8N_SSO_OIDC_LOGIN_ENABLED",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to enable OIDC login."
			},
			{
				name: "N8N_SSO_OIDC_CLIENT_ID",
				type: "Input",
				description: "OIDC client ID issued by your identity provider."
			},
			{
				name: "N8N_SSO_OIDC_CLIENT_SECRET",
				type: "Input",
				description: "OIDC client secret issued by your identity provider."
			},
			{
				name: "N8N_SSO_OIDC_DISCOVERY_ENDPOINT",
				type: "Input",
				description: "OIDC discovery endpoint URL (.well-known/openid-configuration)."
			},
			{
				name: "N8N_SSO_OIDC_PROMPT",
				type: "Input",
				description: "Optional OIDC prompt parameter to send with the authorization request (e.g. login or consent)."
			},
			{
				name: "N8N_SSO_OIDC_ACR_VALUES",
				type: "Input",
				description: "Optional OIDC acr_values parameter to request a specific authentication context."
			},
			{
				name: "N8N_SSO_SAML_LOGIN_ENABLED",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to enable SAML login."
			},
			{
				name: "N8N_SSO_SAML_METADATA",
				type: "Input",
				description: "SAML identity provider metadata as an XML string. Mutually exclusive with N8N_SSO_SAML_METADATA_URL."
			},
			{
				name: "N8N_SSO_SAML_METADATA_URL",
				type: "Input",
				description: "URL to fetch SAML identity provider metadata from. Mutually exclusive with N8N_SSO_SAML_METADATA."
			},
			{
				name: "N8N_EMAIL_MODE",
				type: "Input",
				defaultValue: "smtp",
				description: "Enable emails."
			},
			{
				name: "N8N_SMTP_HOST",
				type: "Input",
				description: "your_SMTP_server_name"
			},
			{
				name: "N8N_SMTP_PORT",
				type: "Input",
				description: "your_SMTP_server_port"
			},
			{
				name: "N8N_SMTP_USER",
				type: "Input",
				description: "your_SMTP_username"
			},
			{
				name: "N8N_SMTP_PASS",
				type: "Input",
				description: "your_SMTP_password"
			},
			{
				name: "N8N_SMTP_OAUTH_SERVICE_CLIENT",
				type: "Input",
				description: "If using 2LO with a service account this is your client ID"
			},
			{
				name: "N8N_SMTP_OAUTH_PRIVATE_KEY",
				type: "Input",
				description: "If using 2LO with a service account this is your private key"
			},
			{
				name: "N8N_SMTP_SENDER",
				type: "Input",
				description: "Sender email address. You can optionally include the sender name. Example with name: N8N <contact@n8n.com>"
			},
			{
				name: "N8N_SMTP_SSL",
				type: "CheckBox",
				defaultValue: true,
				description: "Whether to use SSL for SMTP (true) or not (false)."
			},
			{
				name: "N8N_SMTP_STARTTLS",
				type: "CheckBox",
				defaultValue: true,
				description: "Whether to use STARTTLS for SMTP (true) or not (false)."
			},
			{
				name: "N8N_UM_EMAIL_TEMPLATES_INVITE",
				type: "Input",
				description: "Full path to your HTML email template. This overrides the default template for invite emails."
			},
			{
				name: "N8N_UM_EMAIL_TEMPLATES_PWRESET",
				type: "Input",
				description: "Full path to your HTML email template. This overrides the default template for password reset emails."
			},
			{
				name: "N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED",
				type: "Input",
				description: "Overrides the default HTML template for notifying users that a workflow was shared. Provide the full path to the template."
			},
			{
				name: "N8N_UM_EMAIL_TEMPLATES_WORKFLOW_AUTODEACTIVATED",
				type: "Input",
				description: "Overrides the default HTML template for notifying users that a workflow was deactivated. Provide the full path to the template."
			},
			{
				name: "N8N_UM_EMAIL_TEMPLATES_WORKFLOW_FAILURE",
				type: "Input",
				description: "Overrides the default HTML template for notifying users that a workflow execution failed. Provide the full path to the template."
			},
			{
				name: "N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED",
				type: "Input",
				description: "Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template."
			},
			{
				name: "N8N_UM_EMAIL_TEMPLATES_PROJECT_SHARED",
				type: "Input",
				description: "Overrides the default HTML template for notifying users that a project was shared. Provide the full path to the template."
			},
			{
				name: "N8N_UM_EMAIL_TEMPLATES_API_KEY_REVOKED",
				type: "Input",
				description: "Overrides the default HTML template for notifying users that an API key was revoked. Provide the full path to the template."
			},
			{
				name: "N8N_UM_EMAIL_TEMPLATES_MCP_CLIENT_REVOKED",
				type: "Input",
				description: "Overrides the default HTML template for notifying users that an MCP client was revoked. Provide the full path to the template."
			},
			{
				name: "N8N_USER_MANAGEMENT_JWT_SECRET",
				type: "Input",
				description: "Set a specific JWT secret. By default, n8n generates one on start."
			},
			{
				name: "N8N_USER_MANAGEMENT_JWT_DURATION_HOURS",
				type: "Input",
				defaultValue: 168,
				description: "Set an expiration date for the JWTs in hours."
			},
			{
				name: "N8N_USER_MANAGEMENT_JWT_REFRESH_TIMEOUT_HOURS",
				type: "Input",
				defaultValue: 0,
				description: "How many hours before the JWT expires to automatically refresh it. 0 means 25% of N8N_USER_MANAGEMENT_JWT_DURATION_HOURS. -1 means it will never refresh, which forces users to log in again after the period defined in N8N_USER_MANAGEMENT_JWT_DURATION_HOURS."
			},
			{
				name: "N8N_MFA_ENABLED",
				type: "CheckBox",
				defaultValue: true,
				description: "Whether to enable two-factor authentication (true) or disable (false). n8n ignores this if existing users have 2FA enabled."
			},
			{
				name: "N8N_INVITE_LINKS_EMAIL_ONLY",
				type: "CheckBox",
				description: "When set to true, n8n will only deliver invite links via email and will not expose them through the API. This option enhances security by preventing invite URLs from being accessible programmatically, or to high privileged users."
			}
		]
	},
	{
		category: "Workflows",
		sections: [{
			section: "Workflows",
			items: [
				{
					name: "N8N_ONBOARDING_FLOW_DISABLED",
					type: "CheckBox",
					description: "Whether to disable onboarding tips when creating a new workflow (true) or not (false)."
				},
				{
					name: "N8N_WORKFLOW_ACTIVATION_BATCH_SIZE",
					type: "Input",
					defaultValue: 1,
					description: "How many workflows to publish simultaneously during startup."
				},
				{
					name: "N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION",
					type: "Input",
					defaultValue: "workflowsFromSameOwner",
					description: "Which workflows can call a workflow. Options are: any, none, workflowsFromAList, workflowsFromSameOwner. This feature requires Workflow sharing."
				},
				{
					name: "N8N_WORKFLOW_TAGS_DISABLED",
					type: "CheckBox",
					description: "Whether to disable workflow tags (true) or enable tags (false)."
				},
				{
					name: "WORKFLOWS_DEFAULT_NAME",
					type: "Input",
					defaultValue: "My workflow",
					description: "The default name used for new workflows."
				}
			]
		}, {
			section: "Workflow History",
			items: [{
				name: "N8N_WORKFLOW_HISTORY_PRUNE_TIME",
				type: "Input",
				defaultValue: -1,
				description: "How long to keep workflow history versions before automatically deleting them (in hours). Set to `-1` to keep all versions indefinitely."
			}]
		}]
	},
	{
		category: "Task Runners",
		items: [
			{
				name: "N8N_RUNNERS_ENABLED",
				type: "CheckBox",
				description: "Are task runners enabled."
			},
			{
				name: "N8N_RUNNERS_MODE",
				type: "DropDown",
				defaultValue: "internal",
				values: ["internal", "external"],
				description: "How to launch and run the task runner. `internal` means n8n will launch a task runner as child process. `external` means an external orchestrator will launch the task runner."
			},
			{
				name: "N8N_RUNNERS_AUTH_TOKEN",
				type: "Input",
				defaultValue: "Random string",
				description: "Shared secret used by a task runner to authenticate to n8n. Required when using `external` mode."
			},
			{
				name: "N8N_RUNNERS_BROKER_PORT",
				type: "Input",
				defaultValue: 5679,
				description: "Port the task broker listens on for task runner connections."
			},
			{
				name: "N8N_RUNNERS_BROKER_LISTEN_ADDRESS",
				type: "Input",
				defaultValue: "127.0.0.1",
				description: "Address the task broker listens on."
			},
			{
				name: "N8N_RUNNERS_MAX_PAYLOAD",
				type: "Input",
				defaultValue: 1073741824,
				description: "Maximum payload size in bytes for communication between a task broker and a task runner."
			},
			{
				name: "N8N_RUNNERS_MAX_OLD_SPACE_SIZE",
				type: "Input",
				description: "The --max-old-space-size option to use for a task runner (in MB). By default, Node.js will set this based on available memory."
			},
			{
				name: "N8N_RUNNERS_MAX_CONCURRENCY",
				type: "Input",
				defaultValue: 5,
				description: "The number of concurrent tasks a task runner can execute at a time."
			},
			{
				name: "N8N_RUNNERS_TASK_TIMEOUT",
				type: "Input",
				defaultValue: 300,
				description: "The maximum time, in seconds, a task can run before the runner stops it and restarts. This value must be greater than 0."
			},
			{
				name: "N8N_RUNNERS_HEARTBEAT_INTERVAL",
				type: "Input",
				defaultValue: 30,
				description: "The interval, in seconds, at which the runner must send a heartbeat to the broker. If the runner doesn't send a heartbeat in time, the task stops and the runner restarts. This value must be greater than 0."
			},
			{
				name: "N8N_RUNNERS_INSECURE_MODE",
				type: "CheckBox",
				description: "Whether to disable all security measures in the task runner, for compatibility with modules that rely on insecure JS features. **Discouraged for production use.**"
			},
			{
				name: "N8N_RUNNERS_TASK_REQUEST_TIMEOUT",
				type: "Input",
				defaultValue: 20,
				description: "How long (in seconds) a task request can wait for a runner to become available before timing out. This prevents workflows from hanging indefinitely when no runners are available. Must be greater than 0."
			},
			{
				name: "N8N_RUNNERS_LAUNCHER_LOG_LEVEL",
				type: "DropDown",
				defaultValue: "info",
				values: [
					"debug",
					"info",
					"warn",
					"error"
				],
				description: "Which log messages to show."
			},
			{
				name: "N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT",
				type: "Input",
				defaultValue: 15,
				description: "The number of seconds to wait before shutting down an idle runner."
			},
			{
				name: "N8N_RUNNERS_TASK_BROKER_URI",
				type: "Input",
				defaultValue: "http://127.0.0.1:5679",
				description: "The URI of the task broker server (n8n instance)."
			},
			{
				name: "N8N_RUNNERS_LAUNCHER_HEALTH_CHECK_PORT",
				type: "Input",
				defaultValue: 5680,
				description: "Port for the launcher's health check server."
			},
			{
				name: "NODE_OPTIONS",
				type: "Input",
				description: "Options for Node.js."
			},
			{
				name: "N8N_RUNNERS_GRANT_TOKEN",
				type: "Input",
				defaultValue: "Random string",
				description: "Token the runner uses to authenticate with the task broker. This is automatically provided by the launcher."
			},
			{
				name: "N8N_RUNNERS_ALLOW_PROTOTYPE_MUTATION",
				type: "CheckBox",
				description: "Whether to allow prototype mutation for external libraries. Set to `true` to allow modules that rely on runtime prototype mutation (for example, `puppeteer`) at the cost of relaxing security."
			},
			{
				name: "N8N_RUNNERS_STDLIB_ALLOW",
				type: "Input",
				description: "Python standard library modules that you can use in the Code node, including their submodules. Use `*` to allow all stdlib modules. n8n disables all Python standard library imports by default."
			},
			{
				name: "N8N_RUNNERS_EXTERNAL_ALLOW",
				type: "Input",
				description: "Third-party Python modules that are allowed to be used in the Code node, including their submodules. Use `*` to allow all external modules. n8n disables all third-party Python modules by default. Third-party Python modules must be included in the `n8nio/runners` image."
			},
			{
				name: "N8N_RUNNERS_BUILTINS_DENY",
				type: "Input",
				defaultValue: "eval,exec,compile,open,input,breakpoint,getattr,object,type,vars,setattr,delattr,hasattr,dir,memoryview,__build_class__,globals,locals",
				description: "Python built-ins that you can't use in the Code node. Set to an empty string to allow all built-ins."
			},
			{
				name: "N8N_BLOCK_RUNNER_ENV_ACCESS",
				type: "CheckBox",
				defaultValue: true,
				description: "Whether to block access to the runner's environment from within Python code tasks. Set to `false` to enable all Python code node users access to the runner's environment via `os.environ`. For security reasons, environment variable access is blocked by default."
			}
		]
	},
	{
		category: "Logs",
		items: [
			{
				name: "N8N_LOG_LEVEL",
				type: "DropDown",
				defaultValue: "info",
				values: [
					"info",
					"warn",
					"error",
					"debug",
					"silent"
				],
				description: "Log output level. Refer to Log levels for details."
			},
			{
				name: "N8N_LOG_OUTPUT",
				type: "DropDown",
				defaultValue: "console",
				values: ["console", "file"],
				description: "Where to output logs. Provide multiple values as a comma-separated list."
			},
			{
				name: "N8N_LOG_FORMAT",
				type: "DropDown",
				defaultValue: "text",
				values: ["text", "json"],
				description: "The log format to use. `text` prints human readable messages. `json` prints one JSON object per line containing the message, level, timestamp, and all metadata. This is useful for production monitoring as well as debugging."
			},
			{
				name: "N8N_LOG_SCOPES",
				type: "Input",
				description: "Comma-separated list of scopes to filter logs by (e.g., `license`, `scaling`, `mcp`, `pubsub`, `redis`)."
			},
			{
				name: "N8N_LOG_STREAMING_MANAGED_BY_ENV",
				type: "CheckBox",
				defaultValue: false,
				description: "Set to `true` to manage log streaming destinations from environment variables. When `true`, n8n applies log streaming variables on startup and locks UI controls."
			},
			{
				name: "N8N_LOG_STREAMING_DESTINATIONS",
				type: "Input",
				description: "JSON array of log streaming destinations (webhook, syslog, or sentry configuration objects)."
			},
			{
				name: "N8N_LOG_CRON_ACTIVE_INTERVAL",
				type: "Input",
				defaultValue: 0,
				description: "Interval in minutes to log currently active cron jobs. Set to 0 to disable."
			},
			{
				name: "N8N_LOG_FILE_COUNT_MAX",
				type: "Input",
				defaultValue: 100,
				description: "Max number of log files to keep."
			},
			{
				name: "N8N_LOG_FILE_SIZE_MAX",
				type: "Input",
				defaultValue: 16,
				description: "Max size of each log file in MB."
			},
			{
				name: "N8N_LOG_FILE_LOCATION",
				type: "Input",
				defaultValue: "<n8n-directory-path>/logs/n8n.log",
				description: "Log file location. Requires N8N_LOG_OUTPUT set to `file`."
			},
			{
				name: "DB_LOGGING_ENABLED",
				type: "CheckBox",
				description: "Whether to enable database-specific logging."
			},
			{
				name: "DB_LOGGING_OPTIONS",
				type: "DropDown",
				defaultValue: "error",
				values: [
					"query",
					"error",
					"schema",
					"warn",
					"info",
					"log"
				],
				description: "Database log output level. To enable all logging, specify `all`. Refer to TypeORM logging options"
			},
			{
				name: "DB_LOGGING_MAX_EXECUTION_TIME",
				type: "Input",
				defaultValue: 1e3,
				description: "Maximum execution time (in milliseconds) before n8n logs a warning. Set to 0 to disable long running query warning."
			},
			{
				name: "CODE_ENABLE_STDOUT",
				type: "CheckBox",
				description: "Set to `true` to send Code node logs from `console.log` or `print` to the process's stdout, only for production executions."
			},
			{
				name: "NO_COLOR",
				type: "Input",
				defaultValue: "undefined",
				description: "Set to any value to output logs without ANSI colors. For more information, see the no-color.org website."
			},
			{
				name: "N8N_EVENTBUS_CHECKUNSENTINTERVAL",
				type: "Input",
				defaultValue: 0,
				description: "How often (in milliseconds) to check for unsent event messages. Can in rare cases send message twice. Set to 0 to disable it."
			},
			{
				name: "N8N_EVENTBUS_LOGWRITER_SYNCFILEACCESS",
				type: "CheckBox",
				description: "Whether all file access happens synchronously within the thread (true) or not (false)."
			},
			{
				name: "N8N_EVENTBUS_LOGWRITER_KEEPLOGCOUNT",
				type: "Input",
				defaultValue: 3,
				description: "Number of event log files to keep."
			},
			{
				name: "N8N_EVENTBUS_LOGWRITER_MAXFILESIZEINKB",
				type: "Input",
				defaultValue: 10240,
				description: "Maximum size (in kilo-bytes) of an event log file before a new one starts."
			},
			{
				name: "N8N_EVENTBUS_LOGWRITER_LOGBASENAME",
				type: "Input",
				defaultValue: "n8nEventLog",
				description: "Basename of the event log file."
			}
		]
	},
	{
		category: "License",
		items: [
			{
				name: "N8N_HIDE_USAGE_PAGE",
				type: "CheckBox",
				description: "Hide the usage and plans page in the app."
			},
			{
				name: "N8N_LICENSE_ACTIVATION_KEY",
				type: "Input",
				defaultValue: "",
				description: "Activation key to initialize license. Not applicable if the n8n instance was already activated."
			},
			{
				name: "N8N_LICENSE_AUTO_RENEW_ENABLED",
				type: "CheckBox",
				description: "Enables (true) or disables (false) autorenewal for licenses. If disabled, you need to manually renew the license every 10 days by navigating to **Settings** > **Usage and plan**, and pressing `F5`. Failure to renew the license will disable all licensed features."
			},
			{
				name: "N8N_LICENSE_DETACH_FLOATING_ON_SHUTDOWN",
				type: "CheckBox",
				description: "Controls whether the instance releases floating entitlements back to the pool upon shutdown. Set to `true` to allow other instances to reuse the entitlements, or `false` to retain them. For production instances that must always keep their licensed features, set this to `false`."
			},
			{
				name: "N8N_LICENSE_SERVER_URL",
				type: "Input",
				defaultValue: "https://license.n8n.io/v1",
				description: "Server URL to retrieve license."
			},
			{
				name: "N8N_LICENSE_TENANT_ID",
				type: "Input",
				defaultValue: 1,
				description: "Tenant ID associated with the license. Only set this variable if explicitly instructed by n8n."
			},
			{
				name: "https_proxy_license_server",
				type: "Input",
				defaultValue: "https://user:pass@proxy:port",
				description: "Proxy server URL for HTTPS requests to retrieve license. This variable name needs to be lowercase."
			}
		]
	},
	{
		category: "Queue Mode",
		items: [
			{
				name: "OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS",
				type: "CheckBox",
				description: "Set to `true` if you want manual executions to run on the worker rather than on main."
			},
			{
				name: "QUEUE_BULL_PREFIX",
				type: "Input",
				description: "Prefix to use for all queue keys."
			},
			{
				name: "QUEUE_BULL_REDIS_DB",
				type: "Input",
				defaultValue: 0,
				description: "The Redis database used."
			},
			{
				name: "QUEUE_BULL_REDIS_HOST",
				type: "Input",
				defaultValue: "localhost",
				description: "The Redis host."
			},
			{
				name: "QUEUE_BULL_REDIS_PORT",
				type: "Input",
				defaultValue: 6379,
				description: "The Redis port used."
			},
			{
				name: "QUEUE_BULL_REDIS_USERNAME",
				type: "Input",
				description: "The Redis username (needs Redis version 6 or above). Don't define it for Redis < 6 compatibility"
			},
			{
				name: "QUEUE_BULL_REDIS_PASSWORD",
				type: "Input",
				description: "The Redis password."
			},
			{
				name: "QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD",
				type: "Input",
				defaultValue: 1e4,
				description: "The Redis timeout threshold (in ms)."
			},
			{
				name: "QUEUE_BULL_REDIS_CLUSTER_NODES",
				type: "Input",
				description: "Expects a comma-separated list of Redis Cluster nodes in the format `host:port`, for the Redis client to initially connect to. If running in queue mode (`EXECUTIONS_MODE = queue`), setting this variable will create a Redis Cluster client instead of a Redis client, and n8n will ignore `QUEUE_BULL_REDIS_HOST` and `QUEUE_BULL_REDIS_PORT`."
			},
			{
				name: "QUEUE_BULL_REDIS_TLS",
				type: "CheckBox",
				description: "Enable TLS on Redis connections."
			},
			{
				name: "QUEUE_BULL_REDIS_DUALSTACK",
				type: "CheckBox",
				description: "Enable dual-stack support (IPv4 and IPv6) on Redis connections."
			},
			{
				name: "QUEUE_WORKER_TIMEOUT",
				type: "Input",
				defaultValue: 30,
				description: "**Deprecated** Use `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` instead. How long should n8n wait (seconds) for running executions before exiting worker process on shutdown."
			},
			{
				name: "QUEUE_HEALTH_CHECK_ACTIVE",
				type: "CheckBox",
				description: "Whether to enable health checks (true) or disable (false)."
			},
			{
				name: "QUEUE_HEALTH_CHECK_PORT",
				type: "Input",
				defaultValue: 5678,
				description: "The port to serve health checks on. If you experience a port conflict error when starting a worker server using its default port, change this."
			},
			{
				name: "QUEUE_WORKER_LOCK_DURATION",
				type: "Input",
				defaultValue: 6e4,
				description: "How long (in ms) is the lease period for a worker to work on a message."
			},
			{
				name: "QUEUE_WORKER_LOCK_RENEW_TIME",
				type: "Input",
				defaultValue: 1e4,
				description: "How frequently (in ms) should a worker renew the lease time."
			},
			{
				name: "QUEUE_WORKER_STALLED_INTERVAL",
				type: "Input",
				defaultValue: 3e4,
				description: "How often should a worker check for stalled jobs (use 0 for never)."
			},
			{
				name: "QUEUE_WORKER_MAX_STALLED_COUNT",
				type: "Input",
				defaultValue: 1,
				description: "Maximum amount of times a stalled job will be re-processed."
			},
			{
				name: "N8N_MULTI_MAIN_SETUP_ENABLED",
				type: "CheckBox",
				description: "Whether to enable multi-main setup for queue mode (license required)."
			},
			{
				name: "N8N_MULTI_MAIN_SETUP_KEY_TTL",
				type: "Input",
				defaultValue: 10,
				description: "Time to live (in seconds) for leader key in multi-main setup."
			},
			{
				name: "N8N_MULTI_MAIN_SETUP_CHECK_INTERVAL",
				type: "Input",
				defaultValue: 3,
				description: "Interval (in seconds) for leader check in multi-main setup."
			}
		]
	},
	{
		category: "Source Control",
		items: [{
			name: "N8N_SOURCECONTROL_DEFAULT_SSH_KEY_TYPE",
			type: "Input",
			defaultValue: "ed25519",
			description: "Set to `rsa` to make RSA the default SSH key type for Source control setup."
		}]
	},
	{
		category: "Timezone & Localization",
		items: [{
			name: "GENERIC_TIMEZONE",
			type: "Input",
			defaultValue: "America/New_York",
			description: "The n8n instance timezone. Important for schedule nodes (such as Cron)."
		}, {
			name: "N8N_DEFAULT_LOCALE",
			type: "Input",
			defaultValue: "en",
			description: "A locale identifier, compatible with the Accept-Language header. n8n doesn't support regional identifiers, such as `de-AT`. When running in a locale other than the default, n8n displays UI strings in the selected locale, and falls back to `en` for any untranslated strings."
		}]
	},
	{
		category: "Security",
		items: [
			{
				name: "N8N_SECURITY_POLICY_MANAGED_BY_ENV",
				type: "CheckBox",
				defaultValue: false,
				description: "Set to `true` to manage the security policy from environment variables. When `true`, n8n applies security policy variables on startup and locks UI controls."
			},
			{
				name: "N8N_MFA_ENFORCED_ENABLED",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to enforce two-factor authentication for all users (`true`) or not (`false`)."
			},
			{
				name: "N8N_PERSONAL_SPACE_PUBLISHING_ENABLED",
				type: "CheckBox",
				defaultValue: true,
				description: "Whether users can publish from their personal space (`true`) or not (`false`)."
			},
			{
				name: "N8N_PERSONAL_SPACE_SHARING_ENABLED",
				type: "CheckBox",
				defaultValue: true,
				description: "Whether users can share resources from their personal space (`true`) or not (`false`)."
			},
			{
				name: "N8N_BLOCK_ENV_ACCESS_IN_NODE",
				type: "CheckBox",
				description: "Whether to allow users to access environment variables in expressions and the Code node (false) or not (true)."
			},
			{
				name: "N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES",
				type: "CheckBox",
				defaultValue: true,
				description: "Set to `true` to block access to all files in the .n8n directory and user defined configuration files."
			},
			{
				name: "N8N_BLOCK_FILE_PATTERNS",
				type: "Input",
				defaultValue: "^(.*/)*\\.git(/.*)*$",
				description: "Regex patterns for files and folders that ReadWriteFile and ReadBinaryFiles nodes cannot access. Separate multiple patterns with semicolons."
			},
			{
				name: "N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS",
				type: "CheckBox",
				description: "Set to `true` to try to set 0600 permissions for the settings file, giving only the owner read and write access."
			},
			{
				name: "N8N_RESTRICT_FILE_ACCESS_TO",
				type: "Input",
				defaultValue: "~/.n8n-files",
				description: "Limits access to files in these directories. Provide multiple files as a semicolon-separated list (\";\")."
			},
			{
				name: "N8N_CONTENT_SECURITY_POLICY",
				type: "Input",
				defaultValue: "{}",
				description: "Set Content-Security-Policy headers as helmet.js nested directives object. For example, `{ \"frame-ancestors\": [\"http://localhost:3000\"] }`"
			},
			{
				name: "N8N_CONTENT_SECURITY_POLICY_REPORT_ONLY",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to set the Content-Security-Policy-Report-Only header instead of Content-Security-Policy."
			},
			{
				name: "N8N_CROSS_ORIGIN_OPENER_POLICY",
				type: "DropDown",
				defaultValue: "same-origin-allow-popups",
				values: ["same-origin", "same-origin-allow-popups"],
				description: "Configuration for the Cross-Origin-Opener-Policy header."
			},
			{
				name: "N8N_INSECURE_DISABLE_WEBHOOK_IFRAME_SANDBOX",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to disable HTML sandboxing for webhooks."
			},
			{
				name: "N8N_INSECURE_DISABLE_FORM_HTML_SANDBOX",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to disable CSP sandboxing for form pages (Form Trigger, Send and Wait)."
			},
			{
				name: "N8N_GIT_NODE_DISABLE_BARE_REPOS",
				type: "CheckBox",
				defaultValue: true,
				description: "Set to `true` to prevent the Git node from working with bare repositories, enhancing security."
			},
			{
				name: "N8N_GIT_NODE_ENABLE_HOOKS",
				type: "CheckBox",
				defaultValue: false,
				description: "Set to `true` to allow the Git node to execute Git hooks."
			},
			{
				name: "N8N_GIT_NODE_ENABLE_ALL_CONFIG_KEYS",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to enable arbitrary git config keys in the Git node."
			},
			{
				name: "N8N_AWS_SYSTEM_CREDENTIALS_ACCESS_ENABLED",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to allow access to AWS system credentials (e.g. in awsAssumeRole credentials)."
			},
			{
				name: "N8N_AWS_SYSTEM_CREDENTIALS_SDK_SOURCES",
				type: "Input",
				defaultValue: "all",
				description: "Which AWS system-credential sources resolve via the AWS SDK. Accepts `all`, `none`, or a comma-separated subset."
			},
			{
				name: "N8N_SECURITY_AUDIT_DAYS_ABANDONED_WORKFLOW",
				type: "Input",
				defaultValue: 90,
				description: "Number of days to consider a workflow abandoned if it's not executed."
			},
			{
				name: "N8N_SECURE_COOKIE",
				type: "CheckBox",
				description: "Ensures that cookies are only sent over HTTPS, enhancing security."
			},
			{
				name: "N8N_SAMESITE_COOKIE",
				type: "DropDown",
				defaultValue: "lax",
				values: [
					"strict",
					"lax",
					"none"
				],
				description: "Controls cross-site cookie behavior:\n- strict: Sent only for first-party requests.\n- lax (default): Sent with top-level navigation requests.\n- none: Sent in all contexts (requires HTTPS)."
			}
		]
	},
	{
		category: "External Hooks & Secrets",
		sections: [{
			section: "External Hooks",
			items: [{
				name: "EXTERNAL_HOOK_FILES",
				type: "Input",
				description: "Files containing backend external hooks. Provide multiple files as a colon-separated list (\":\")."
			}, {
				name: "EXTERNAL_FRONTEND_HOOKS_URLS",
				type: "Input",
				description: "URLs to files containing frontend external hooks. Provide multiple URLs as a colon-separated list (\":\")."
			}]
		}, {
			section: "External Secrets",
			items: [{
				name: "N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL",
				type: "Input",
				defaultValue: 300,
				description: "How often (in seconds) to check for secret updates."
			}]
		}]
	},
	{
		category: "Deployment",
		items: [
			{
				name: "HTTP_PROXY",
				type: "Input",
				description: "A URL to proxy unencrypted HTTP requests through. When set, n8n proxies all unencrypted HTTP traffic from nodes through the proxy URL."
			},
			{
				name: "HTTPS_PROXY",
				type: "Input",
				description: "A URL to proxy TLS/SSL encrypted HTTP requests through. When set, n8n proxies all TLS/SSL encrypted HTTP traffic from nodes through the proxy URL."
			},
			{
				name: "ALL_PROXY",
				type: "Input",
				description: "A URL to proxy both unencrypted and encrypted HTTP requests through. When set, n8n uses this value when more specific variables (`HTTP_PROXY` or `HTTPS_PROXY`) aren't present."
			},
			{
				name: "NO_PROXY",
				type: "Input",
				description: "A comma-separated list of hostnames or URLs that should bypass the proxy. When using `HTTP_PROXY`, `HTTPS_PROXY`, or `ALL_PROXY`, n8n will connect directly to the URLs or hostnames defined here instead of using the proxy."
			},
			{
				name: "N8N_EDITOR_BASE_URL",
				type: "Input",
				description: "Public URL where users can access the editor. Also used for emails sent from n8n and the redirect URL for SAML based authentication."
			},
			{
				name: "N8N_WEBHOOK_URL",
				type: "Input",
				description: "Public base URL for both test and production webhooks. Successor to the deprecated `WEBHOOK_URL`."
			},
			{
				name: "N8N_CANVAS_ONLY",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to enable canvas-only mode, hiding the chrome UI."
			},
			{
				name: "N8N_CONFIG_FILES",
				type: "Input",
				description: "Use to provide the path to any JSON configuration file."
			},
			{
				name: "N8N_DISABLE_UI",
				type: "CheckBox",
				description: "Set to `true` to disable the UI."
			},
			{
				name: "N8N_PREVIEW_MODE",
				type: "CheckBox",
				description: "Set to `true` to run in preview mode."
			},
			{
				name: "N8N_TEMPLATES_ENABLED",
				type: "CheckBox",
				defaultValue: false,
				description: "Enables workflow templates (true) or disable (false)."
			},
			{
				name: "N8N_TEMPLATES_HOST",
				type: "Input",
				defaultValue: "https://api.n8n.io",
				description: "Change this if creating your own workflow template library. Note that to use your own workflow templates library, your API must provide the same endpoints and response structure as n8n's. Refer to Workflow templates for more information."
			},
			{
				name: "N8N_ENCRYPTION_KEY",
				type: "Input",
				defaultValue: "Random key generated by n8n",
				description: "Provide a custom key used to encrypt credentials in the n8n database. By default n8n generates a random key on first launch."
			},
			{
				name: "N8N_USER_FOLDER",
				type: "Input",
				defaultValue: "user-folder",
				description: "Provide the path where n8n will create the .n8n folder. This directory stores user-specific data, such as database file and encryption key."
			},
			{
				name: "N8N_PATH",
				type: "Input",
				defaultValue: "/",
				description: "The path n8n deploys to."
			},
			{
				name: "N8N_HOST",
				type: "Input",
				defaultValue: "localhost",
				description: "Host name n8n runs on."
			},
			{
				name: "N8N_PORT",
				type: "Input",
				defaultValue: 5678,
				description: "The HTTP port n8n runs on."
			},
			{
				name: "N8N_LISTEN_ADDRESS",
				type: "Input",
				defaultValue: "::",
				description: "The IP address n8n should listen on."
			},
			{
				name: "N8N_PROTOCOL",
				type: "DropDown",
				defaultValue: "http",
				values: ["http", "https"],
				description: "The protocol used to reach n8n."
			},
			{
				name: "N8N_SSL_KEY",
				type: "Input",
				description: "The SSL key for HTTPS protocol."
			},
			{
				name: "N8N_SSL_CERT",
				type: "Input",
				description: "The SSL certificate for HTTPS protocol."
			},
			{
				name: "N8N_PERSONALIZATION_ENABLED",
				type: "CheckBox",
				description: "Whether to ask users personalisation questions and then customise n8n accordingly."
			},
			{
				name: "N8N_VERSION_NOTIFICATIONS_ENABLED",
				type: "CheckBox",
				description: "When enabled, n8n sends notifications of new versions and security updates."
			},
			{
				name: "N8N_VERSION_NOTIFICATIONS_ENDPOINT",
				type: "Input",
				defaultValue: "https://api.n8n.io/versions/",
				description: "The endpoint to retrieve where version information."
			},
			{
				name: "N8N_VERSION_NOTIFICATIONS_INFO_URL",
				type: "Input",
				defaultValue: "https://docs.n8n.io/getting-started/installation/updating.html",
				description: "The URL displayed in the New Versions panel for more information."
			},
			{
				name: "N8N_DIAGNOSTICS_ENABLED",
				type: "CheckBox",
				description: "Whether to share selected, anonymous telemetry with n8n. Note that if you set this to `false`, you can't enable Ask AI in the Code node."
			},
			{
				name: "N8N_DIAGNOSTICS_CONFIG_FRONTEND",
				type: "Input",
				defaultValue: "1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io",
				description: "Telemetry configuration for the frontend."
			},
			{
				name: "N8N_DIAGNOSTICS_CONFIG_BACKEND",
				type: "Input",
				defaultValue: "1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io/v1/batch",
				description: "Telemetry configuration for the backend."
			},
			{
				name: "N8N_PUSH_BACKEND",
				type: "Input",
				defaultValue: "websocket",
				description: "Choose whether the n8n backend uses server-sent events (`sse`) or WebSockets (`websocket`) to send changes to the UI."
			},
			{
				name: "VUE_APP_URL_BASE_API",
				type: "Input",
				defaultValue: "http://localhost:5678/",
				description: "Used when building the n8n-editor-ui package manually to set how the frontend can reach the backend API. Refer to Configure the Base URL."
			},
			{
				name: "N8N_HIRING_BANNER_ENABLED",
				type: "CheckBox",
				description: "Whether to show the n8n hiring banner in the console (true) or not (false)."
			},
			{
				name: "N8N_PUBLIC_API_SWAGGERUI_DISABLED",
				type: "CheckBox",
				description: "Whether the Swagger UI (API playground) is disabled (true) or not (false)."
			},
			{
				name: "N8N_PUBLIC_API_DISABLED",
				type: "CheckBox",
				description: "Whether to disable the public API (true) or not (false)."
			},
			{
				name: "N8N_PUBLIC_API_ENDPOINT",
				type: "Input",
				defaultValue: "api",
				description: "Path for the public API endpoints."
			},
			{
				name: "N8N_GRACEFUL_SHUTDOWN_TIMEOUT",
				type: "Input",
				defaultValue: 30,
				description: "How long should the n8n process wait (in seconds) for components to shut down before exiting the process."
			},
			{
				name: "N8N_DEV_RELOAD",
				type: "CheckBox",
				description: "When working on the n8n source code, set this to `true` to automatically reload or restart the application when changes occur in the source code files."
			},
			{
				name: "N8N_REINSTALL_MISSING_PACKAGES",
				type: "CheckBox",
				description: "If set to `true`, n8n will automatically attempt to reinstall any missing packages."
			},
			{
				name: "N8N_TUNNEL_SUBDOMAIN",
				type: "Input",
				description: "Specifies the subdomain for the n8n tunnel. If not set, n8n generates a random subdomain."
			},
			{
				name: "N8N_PROXY_HOPS",
				type: "Input",
				defaultValue: 0,
				description: "Number of reverse-proxies n8n is running behind."
			}
		]
	},
	{
		category: "Database",
		items: [
			{
				name: "DB_TYPE",
				type: "DropDown",
				defaultValue: "sqlite",
				values: ["sqlite", "postgresdb"],
				description: "The database to use."
			},
			{
				name: "DB_TABLE_PREFIX",
				type: "Input",
				description: "Prefix to use for table names."
			},
			{
				name: "DB_PING_INTERVAL_SECONDS",
				type: "Input",
				defaultValue: 2,
				description: "The interval, in seconds, between pings to the database to check if the connection is still alive."
			},
			{
				name: "DB_POSTGRESDB_DATABASE",
				type: "Input",
				defaultValue: "n8n",
				description: "The name of the PostgreSQL database."
			},
			{
				name: "DB_POSTGRESDB_HOST",
				type: "Input",
				defaultValue: "localhost",
				description: "The PostgreSQL host."
			},
			{
				name: "DB_POSTGRESDB_PORT",
				type: "Input",
				defaultValue: 5432,
				description: "The PostgreSQL port."
			},
			{
				name: "DB_POSTGRESDB_USER",
				type: "Input",
				defaultValue: "postgres",
				description: "The PostgreSQL user."
			},
			{
				name: "DB_POSTGRESDB_PASSWORD",
				type: "Input",
				description: "The PostgreSQL password."
			},
			{
				name: "DB_POSTGRESDB_POOL_SIZE",
				type: "Input",
				defaultValue: 2,
				description: "Control how many parallel open Postgres connections n8n should have. Increasing it may help with resource utilization, but too many connections may degrade performance."
			},
			{
				name: "DB_POSTGRESDB_CONNECTION_TIMEOUT",
				type: "Input",
				defaultValue: 2e4,
				description: "Postgres connection timeout (ms)."
			},
			{
				name: "DB_POSTGRESDB_IDLE_CONNECTION_TIMEOUT",
				type: "Input",
				defaultValue: 3e4,
				description: "Amount of time before an idle connection is eligible for eviction for being idle."
			},
			{
				name: "DB_POSTGRESDB_SCHEMA",
				type: "Input",
				defaultValue: "public",
				description: "The PostgreSQL schema."
			},
			{
				name: "DB_POSTGRESDB_SSL_ENABLED",
				type: "CheckBox",
				description: "Whether to enable SSL. Automatically enabled if DB_POSTGRESDB_SSL_CA, DB_POSTGRESDB_SSL_CERT or DB_POSTGRESDB_SSL_KEY is defined."
			},
			{
				name: "DB_POSTGRESDB_SSL_CA",
				type: "Input",
				description: "The PostgreSQL SSL certificate authority."
			},
			{
				name: "DB_POSTGRESDB_SSL_CERT",
				type: "Input",
				description: "The PostgreSQL SSL certificate."
			},
			{
				name: "DB_POSTGRESDB_SSL_KEY",
				type: "Input",
				description: "The PostgreSQL SSL key."
			},
			{
				name: "DB_POSTGRESDB_SSL_REJECT_UNAUTHORIZED",
				type: "CheckBox",
				description: "If n8n should reject unauthorized SSL connections (true) or not (false)."
			},
			{
				name: "DB_SQLITE_POOL_SIZE",
				type: "Input",
				defaultValue: 0,
				description: "Controls whether to open the SQLite file in WAL mode or rollback journal mode. Uses rollback journal mode when set to zero. When greater than zero, uses WAL mode with the value determining the number of parallel SQL read connections to configure. WAL mode is much more performant and reliable than the rollback journal mode."
			},
			{
				name: "DB_SQLITE_VACUUM_ON_STARTUP",
				type: "CheckBox",
				description: "Runs VACUUM operation on startup to rebuild the database. Reduces file size and optimizes indexes. This is a long running blocking operation and increases start-up time."
			}
		]
	},
	{
		category: "Executions",
		items: [
			{
				name: "EXECUTIONS_MODE",
				type: "DropDown",
				defaultValue: "regular",
				values: ["regular", "queue"],
				description: "Whether executions should run directly or using queue."
			},
			{
				name: "EXECUTIONS_TIMEOUT",
				type: "Input",
				defaultValue: -1,
				description: "Sets a default timeout (in seconds) to all workflows after which n8n stops their execution. Users can override this for individual workflows up to the duration set in EXECUTIONS_TIMEOUT_MAX. Set EXECUTIONS_TIMEOUT to -1 to disable."
			},
			{
				name: "EXECUTIONS_TIMEOUT_MAX",
				type: "Input",
				defaultValue: 3600,
				description: "The maximum execution time (in seconds) that users can set for an individual workflow."
			},
			{
				name: "N8N_AI_TIMEOUT_MAX",
				type: "Input",
				defaultValue: 36e5,
				description: "Sets the HTTP request timeout in milliseconds for AI and LLM nodes (such as OpenAI, Anthropic, Mistral, and Ollama). This controls how long n8n waits for responses from AI services before timing out. Useful for slower local AI services or complex prompts that require longer processing time."
			},
			{
				name: "EXECUTIONS_DATA_SAVE_ON_ERROR",
				type: "DropDown",
				defaultValue: "all",
				values: ["all", "none"],
				description: "Whether n8n saves execution data on error."
			},
			{
				name: "EXECUTIONS_DATA_SAVE_ON_SUCCESS",
				type: "DropDown",
				defaultValue: "all",
				values: ["all", "none"],
				description: "Whether n8n saves execution data on success."
			},
			{
				name: "EXECUTIONS_DATA_SAVE_ON_PROGRESS",
				type: "CheckBox",
				description: "Whether to save progress for each node executed (true) or not (false)."
			},
			{
				name: "EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS",
				type: "CheckBox",
				description: "Whether to save data of executions when started manually."
			},
			{
				name: "EXECUTIONS_DATA_PRUNE",
				type: "CheckBox",
				defaultValue: true,
				description: "Whether to delete data of past executions on a rolling basis."
			},
			{
				name: "EXECUTIONS_DATA_MAX_AGE",
				type: "Input",
				defaultValue: 336,
				description: "The execution age (in hours) before it's deleted."
			},
			{
				name: "EXECUTIONS_DATA_PRUNE_MAX_COUNT",
				type: "Input",
				defaultValue: 1e4,
				description: "Maximum number of executions to keep in the database. 0 = no limit"
			},
			{
				name: "EXECUTIONS_DATA_HARD_DELETE_BUFFER",
				type: "Input",
				defaultValue: 1,
				description: "How old (hours) the finished execution data has to be to get hard-deleted. By default, this buffer excludes recent executions as the user may need them while building a workflow."
			},
			{
				name: "EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL",
				type: "Input",
				defaultValue: 15,
				description: "How often (minutes) execution data should be hard-deleted."
			},
			{
				name: "EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL",
				type: "Input",
				defaultValue: 60,
				description: "How often (minutes) execution data should be soft-deleted."
			},
			{
				name: "EXECUTIONS_DATA_MAX_DISPLAY_SIZE",
				type: "Input",
				defaultValue: 104857600,
				description: "Max byte size of execution run data to load for display. Executions whose data exceeds this are returned without run data. 0 disables."
			},
			{
				name: "N8N_CONCURRENCY_PRODUCTION_LIMIT",
				type: "Input",
				defaultValue: -1,
				description: "Max production executions allowed to run concurrently, in both regular and scaling modes. -1 to disable in regular mode."
			},
			{
				name: "N8N_CONCURRENCY_EVALUATION_LIMIT",
				type: "Input",
				defaultValue: -1,
				description: "Max evaluation executions allowed to run concurrently. -1 means unlimited."
			},
			{
				name: "N8N_EXECUTIONS_QUEUE_RECOVERY_INTERVAL",
				type: "Input",
				defaultValue: 180,
				description: "How often (in minutes) to check for queue recovery."
			},
			{
				name: "N8N_EXECUTIONS_QUEUE_RECOVERY_BATCH",
				type: "Input",
				defaultValue: 100,
				description: "Size of batch of executions to check for queue recovery."
			},
			{
				name: "N8N_EXECUTIONS_QUEUE_KEEP_LAST_COMPLETED",
				type: "Input",
				defaultValue: 0,
				description: "How many completed Bull jobs to keep in Redis. 0 removes completed jobs immediately; n keeps the last n."
			},
			{
				name: "N8N_EXECUTIONS_QUEUE_KEEP_LAST_FAILED",
				type: "Input",
				defaultValue: 0,
				description: "How many failed Bull jobs to keep in Redis. 0 removes failed jobs immediately; n keeps the last n."
			},
			{
				name: "N8N_WORKFLOW_AUTODEACTIVATION_ENABLED",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether workflows are automatically unpublished after repeated crashed executions."
			},
			{
				name: "N8N_WORKFLOW_AUTODEACTIVATION_MAX_LAST_EXECUTIONS",
				type: "Input",
				defaultValue: 3,
				description: "Number of crashed executions before unpublishing a workflow."
			}
		]
	},
	{
		category: "Credentials",
		items: [
			{
				name: "CREDENTIALS_OVERWRITE_DATA",
				type: "Input",
				description: "Overwrites for credentials."
			},
			{
				name: "CREDENTIALS_OVERWRITE_ENDPOINT",
				type: "Input",
				description: "The API endpoint to fetch credentials."
			},
			{
				name: "CREDENTIALS_OVERWRITE_PERSISTENCE",
				type: "CheckBox",
				description: "Enable database persistence for credential overwrites. Required for multiinstance or queue mode to propagate overwrites to workers through a publish/subscribe approach."
			},
			{
				name: "CREDENTIALS_DEFAULT_NAME",
				type: "Input",
				defaultValue: "My credentials",
				description: "The default name for credentials."
			}
		]
	},
	{
		category: "Insights",
		items: [
			{
				name: "N8N_DISABLED_MODULES",
				type: "Input",
				description: "Set to `insights` to disable the feature and metrics collection for an instance."
			},
			{
				name: "N8N_INSIGHTS_COMPACTION_BATCH_SIZE",
				type: "Input",
				defaultValue: 500,
				description: "The number of raw insights data to compact in a single batch."
			},
			{
				name: "N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS",
				type: "Input",
				defaultValue: 180,
				description: "The maximum age (in days) of daily insights data to compact."
			},
			{
				name: "N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS",
				type: "Input",
				defaultValue: 90,
				description: "The maximum age (in days) of hourly insights data to compact."
			},
			{
				name: "N8N_INSIGHTS_COMPACTION_INTERVAL_MINUTES",
				type: "Input",
				defaultValue: 60,
				description: "Interval (in minutes) at which compaction should run."
			},
			{
				name: "N8N_INSIGHTS_FLUSH_BATCH_SIZE",
				type: "Input",
				defaultValue: 1e3,
				description: "The maximum number of insights data to keep in the buffer before flushing."
			},
			{
				name: "N8N_INSIGHTS_FLUSH_INTERVAL_SECONDS",
				type: "Input",
				defaultValue: 30,
				description: "The interval (in seconds) at which the insights data should be flushed to the database."
			}
		]
	},
	{
		category: "Binary Data",
		items: [
			{
				name: "N8N_AVAILABLE_BINARY_DATA_MODES",
				type: "Input",
				defaultValue: "filesystem",
				description: "A comma separated list of available binary data modes."
			},
			{
				name: "N8N_BINARY_DATA_STORAGE_PATH",
				type: "Input",
				defaultValue: "N8N_USER_FOLDER/binaryData",
				description: "The path where n8n stores binary data."
			},
			{
				name: "N8N_DEFAULT_BINARY_DATA_MODE",
				type: "Input",
				defaultValue: "default",
				description: "The default binary data mode. `default` keeps binary data in memory. Set to `filesystem` to use the filesystem, or `s3` to AWS S3, or `database` to use the DB. Note that binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem. This may change in future."
			}
		]
	},
	{
		category: "External Storage",
		items: [
			{
				name: "N8N_EXTERNAL_STORAGE_S3_HOST",
				type: "Input",
				description: "Host of the n8n bucket in S3-compatible external storage. For example, `s3.us-east-1.amazonaws.com`"
			},
			{
				name: "N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME",
				type: "Input",
				description: "Name of the n8n bucket in S3-compatible external storage."
			},
			{
				name: "N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION",
				type: "Input",
				description: "Region of the n8n bucket in S3-compatible external storage. For example, `us-east-1`"
			},
			{
				name: "N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY",
				type: "Input",
				description: "Access key in S3-compatible external storage"
			},
			{
				name: "N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET",
				type: "Input",
				description: "Access secret in S3-compatible external storage."
			},
			{
				name: "N8N_EXTERNAL_STORAGE_S3_AUTH_AUTO_DETECT",
				type: "CheckBox",
				description: "Use automatic credential detection to authenticate S3 calls for external storage. This will ignore the access key and access secret and use the default credential provider chain."
			}
		]
	},
	{
		category: "Endpoints",
		items: [
			{
				name: "N8N_PAYLOAD_SIZE_MAX",
				type: "Input",
				defaultValue: 16,
				description: "The maximum payload size in MiB."
			},
			{
				name: "N8N_FORMDATA_FILE_SIZE_MAX",
				type: "Input",
				defaultValue: 200,
				description: "Max payload size for files in form-data webhook payloads in MiB."
			},
			{
				name: "N8N_METRICS",
				type: "CheckBox",
				description: "Whether to enable the /metrics endpoint."
			},
			{
				name: "N8N_METRICS_PREFIX",
				type: "Input",
				defaultValue: "n8n_",
				description: "Optional prefix for n8n specific metrics names."
			},
			{
				name: "N8N_METRICS_INCLUDE_DEFAULT_METRICS",
				type: "CheckBox",
				description: "Whether to expose default system and node.js metrics."
			},
			{
				name: "N8N_METRICS_INCLUDE_CACHE_METRICS",
				type: "CheckBox",
				description: "Whether to include metrics (true) for cache hits and misses, or not include them (false)."
			},
			{
				name: "N8N_METRICS_INCLUDE_MESSAGE_EVENT_BUS_METRICS",
				type: "CheckBox",
				description: "Whether to include metrics (true) for events, or not include them (false)."
			},
			{
				name: "N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL",
				type: "CheckBox",
				description: "Whether to include a label for the workflow ID on workflow metrics."
			},
			{
				name: "N8N_METRICS_INCLUDE_NODE_TYPE_LABEL",
				type: "CheckBox",
				description: "Whether to include a label for the node type on node metrics."
			},
			{
				name: "N8N_METRICS_INCLUDE_CREDENTIAL_TYPE_LABEL",
				type: "CheckBox",
				description: "Whether to include a label for the credential type on credential metrics."
			},
			{
				name: "N8N_METRICS_INCLUDE_API_ENDPOINTS",
				type: "CheckBox",
				description: "Whether to expose metrics for API endpoints."
			},
			{
				name: "N8N_METRICS_INCLUDE_API_PATH_LABEL",
				type: "CheckBox",
				description: "Whether to include a label for the path of API invocations."
			},
			{
				name: "N8N_METRICS_INCLUDE_API_METHOD_LABEL",
				type: "CheckBox",
				description: "Whether to include a label for the HTTP method (GET, POST, ...) of API invocations."
			},
			{
				name: "N8N_METRICS_INCLUDE_API_STATUS_CODE_LABEL",
				type: "CheckBox",
				description: "Whether to include a label for the HTTP status code (200, 404, ...) of API invocations."
			},
			{
				name: "N8N_METRICS_INCLUDE_QUEUE_METRICS",
				type: "CheckBox",
				description: "Whether to include metrics for jobs in scaling mode."
			},
			{
				name: "N8N_METRICS_QUEUE_METRICS_INTERVAL",
				type: "Input",
				defaultValue: 20,
				description: "How often (in seconds) to update queue metrics."
			},
			{
				name: "N8N_ENDPOINT_REST",
				type: "Input",
				defaultValue: "rest",
				description: "The path used for REST endpoint."
			},
			{
				name: "N8N_ENDPOINT_WEBHOOK",
				type: "Input",
				defaultValue: "webhook",
				description: "The path used for webhook endpoint."
			},
			{
				name: "N8N_ENDPOINT_WEBHOOK_TEST",
				type: "Input",
				defaultValue: "webhook-test",
				description: "The path used for test-webhook endpoint."
			},
			{
				name: "N8N_ENDPOINT_WEBHOOK_WAIT",
				type: "Input",
				defaultValue: "webhook-waiting",
				description: "The path used for waiting-webhook endpoint."
			},
			{
				name: "WEBHOOK_URL",
				type: "Input",
				description: "Used to manually provide the Webhook URL when running n8n behind a reverse proxy."
			},
			{
				name: "N8N_DISABLE_PRODUCTION_MAIN_PROCESS",
				type: "CheckBox",
				description: "Disable production webhooks from main process. This helps ensure no HTTP traffic load to main process when using webhook-specific processes."
			}
		]
	},
	{
		category: "Model Context Protocol (MCP)",
		items: [
			{
				name: "N8N_MCP_MANAGED_BY_ENV",
				type: "CheckBox",
				defaultValue: false,
				description: "Set to `true` to manage MCP settings from environment variables. When `true`, n8n applies the MCP variables on every startup and locks the matching UI controls."
			},
			{
				name: "N8N_MCP_ACCESS_ENABLED",
				type: "CheckBox",
				defaultValue: false,
				description: "Whether to enable instance-level MCP access (`true`) or not (`false`)."
			},
			{
				name: "N8N_MCP_SERVER_SESSION_IDLE_TTL_MS",
				type: "Input",
				defaultValue: 9e5,
				description: "Time in milliseconds an MCP server session may stay idle before it is evicted and its resources released. Default: 15 minutes (900000 ms)."
			},
			{
				name: "N8N_MCP_SERVER_SESSION_SWEEP_INTERVAL_MS",
				type: "Input",
				defaultValue: 3e5,
				description: "Interval in milliseconds between sweeps that evict idle MCP server sessions. Default: 5 minutes (300000 ms)."
			},
			{
				name: "N8N_MCP_CLIENT_CACHE_TTL_MS",
				type: "Input",
				defaultValue: 3e5,
				description: "Time in milliseconds a cached MCP client is kept alive after its last use before being evicted. Default: 5 minutes (300000 ms)."
			},
			{
				name: "N8N_MCP_CLIENT_CACHE_MAX_SIZE",
				type: "Input",
				defaultValue: 500,
				description: "Maximum number of MCP clients kept in the in-memory session cache. Default: 500."
			}
		]
	}
];
//#endregion
//#region module/src/containers/agent/N8N/RendererMethods.ts
const INSTALL_TIME_KEY$2 = "install-time-n8n";
const UPDATE_TIME_KEY$2 = "update-time-n8n";
const UPDATE_AVAILABLE_KEY$1 = "update-available-version-n8n";
function checkLinuxArgLine$3(line) {
	if (isWin && line.startsWith("set ")) return "set";
	if (line.startsWith("export ")) return "export";
	for (const arg of n8nArguments) if (arg.category === "Environment") {
		if (arg.sections[0].items.find((item) => item.name === line.split("=")[0])) return "var";
		else return;
	}
}
function parseArgsToString$17(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let argResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else if (getArgumentType(arg.name, n8nArguments) === "CheckBox") {
			const eWinResult = `set ${arg.name}=true\n`;
			const eResult = `export ${arg.name}="true"\n`;
			result += isWin ? eWinResult : eResult;
		} else {
			const eWinResult = `set ${arg.name}=${arg.value}\n`;
			const eResult = `export ${arg.name}="${arg.value}"\n`;
			result += isWin ? eWinResult : eResult;
		}
	});
	if (lines) result += lines + "\n";
	result += isEmpty(argResult) ? `\nn8n start` : `\nn8n start ${argResult}`;
	return result;
}
function parseStringToArgs$17(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("#")) return;
		const lineType = checkLinuxArgLine$3(line);
		if (lineType === "export" || lineType === "set") {
			let [name, value] = line.replace(`${lineType} `, "").split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, n8nArguments)) argResult.push({
				name,
				value
			});
		} else if (checkLinuxArgLine$3(line) === "var") {
			let [name, value] = line.split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, n8nArguments)) argResult.push({
				name,
				value
			});
		}
	});
	return argResult;
}
function startInstall$16(stepper) {
	stepper.initialSteps([
		"Getting Started",
		"Checking NodeJS",
		"Detect Existing",
		"Install N8N",
		"All Done!"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking if NPM is installed...");
			stepper.ipc.invoke("is_n8n_npm_available").then((isNpmInstalled) => {
				if (isNpmInstalled) stepper.nextStep().then(() => {
					stepper.progressBar(true, "Checking for existing N8N installation...");
					stepper.ipc.invoke("is_n8n_installed").then((isN8nInstalled) => {
						if (isN8nInstalled) {
							stepper.setInstalled();
							const currentDate = /* @__PURE__ */ new Date();
							stepper.storage.set(INSTALL_TIME_KEY$2, currentDate.toLocaleString());
							stepper.showFinalStep("success", "You're All Set!", "N8N is already installed. You're good to go!");
						} else stepper.nextStep().then(() => {
							stepper.ipc.invoke("is_n8n_npm_version_above_12").then((isAbove12) => {
								const flags = isAbove12 ? " --allow-remote=all --dangerously-allow-all-scripts" : "";
								stepper.executeTerminalCommands(`npm i -g n8n${flags}`).then(() => {
									stepper.setInstalled();
									const currentDate = /* @__PURE__ */ new Date();
									stepper.storage.set(INSTALL_TIME_KEY$2, currentDate.toLocaleString());
									stepper.showFinalStep("success", "Installation Complete!", "Your N8N environment is ready. Enjoy!");
								});
							});
						});
					});
				});
				else stepper.showFinalStep("error", "NodeJs is not installed!", "N8N need NPM! Please install NodeJs then try again.");
			});
		});
	});
}
function startUpdate$4(stepper) {
	stepper.initialSteps(["Update N8N", "Complete Update"]);
	stepper.executeTerminalCommands("npm -g update n8n").then(() => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(UPDATE_TIME_KEY$2, currentDate.toLocaleString());
		stepper.setUpdated();
		stepper.showFinalStep("success", "N8N Updated Successfully!", `N8N has been updated to the latest version. You can now enjoy the new features and improvements.`);
	});
}
async function cardInfo$16(api, callback) {
	callback.setOpenFolders(void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			},
			{
				label: "Latest Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INSTALL_TIME_KEY$2).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.storage.get(UPDATE_TIME_KEY$2).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.ipc.invoke("current_n8n_version").then((result) => {
		descManager.updateItem(0, 2, result);
	});
	api.storage.get(UPDATE_AVAILABLE_KEY$1).then((result) => {
		descManager.updateItem(0, 3, result);
	});
}
const N8N_RM = {
	catchAddress: catchAddress$5,
	cardInfo: cardInfo$16,
	parseStringToArgs: parseStringToArgs$17,
	parseArgsToString: parseArgsToString$17,
	manager: {
		startInstall: startInstall$16,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$4
		}
	}
};
//#endregion
//#region module/src/containers/audio/AudioGitmylo/Arguments.ts
const gitmyloArguments = [{
	category: "Command Line Arguments",
	sections: [{
		section: "Install",
		items: [
			{
				name: "--skip-install",
				description: "Skip installing packages",
				type: "CheckBox"
			},
			{
				name: "--skip-venv",
				description: "Skip creating/activating venv, also skips install (for advanced users)",
				type: "CheckBox"
			},
			{
				name: "--no-data-cache",
				description: "Don\\'t override the default huggingface_hub cache path.",
				type: "CheckBox"
			},
			{
				name: "--verbose",
				description: "Show more info, like logs during installs",
				type: "CheckBox"
			}
		]
	}, {
		section: "Gradio",
		items: [
			{
				name: "--share",
				description: "Share this gradio instance.",
				type: "CheckBox"
			},
			{
				name: "--username",
				description: "Gradio username",
				type: "Input"
			},
			{
				name: "--password",
				description: "Gradio password (defaults to \"password\")",
				type: "Input",
				defaultValue: "password"
			},
			{
				name: "--theme",
				description: "Gradio theme",
				type: "Input",
				defaultValue: "gradio/soft"
			},
			{
				name: "--listen",
				description: "Listen on 0.0.0.0",
				type: "CheckBox"
			},
			{
				name: "--port",
				description: "Use a different port, automatic when not set.",
				type: "Input"
			},
			{
				name: "--launch",
				description: "Automatically open a browser window when the webui launches.",
				type: "CheckBox"
			}
		]
	}]
}];
//#endregion
//#region module/src/containers/audio/AudioGitmylo/RendererMethods.ts
const shellCommand$5 = isWin ? "call run.bat" : "bash ./run.sh";
const URL$5 = "https://github.com/gitmylo/audio-webui";
function parseArgsToString$16(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let argResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else {
			const argType = getArgumentType(arg.name, gitmyloArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	result += isEmpty(argResult) ? shellCommand$5 : `${shellCommand$5} ${argResult}`;
	return result;
}
function parseStringToArgs$16(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (!line.startsWith(shellCommand$5)) return;
		const clArgs = line.split(`${shellCommand$5} `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, gitmyloArguments)) {
				if (getArgumentType(value.name, gitmyloArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
function startInstall$15(stepper) {
	GitInstaller("Audio Generation", URL$5, stepper, [isWin ? "run.bat" : "run.sh"]);
}
async function cardInfo$15(api, callback) {
	return CardInfo(URL$5, "/extensions", api, callback);
}
const AG_RM = {
	catchAddress: catchAddress$5,
	parseArgsToString: parseArgsToString$16,
	parseStringToArgs: parseStringToArgs$16,
	cardInfo: cardInfo$15,
	manager: {
		startInstall: startInstall$15,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/audio/VoiceStudio/Arguments.ts
const voiceStudioArguments = [{
	category: "Environment Variables",
	sections: [
		{
			section: "General & Server",
			items: [
				{
					name: "PORT",
					description: "Server listening port (default: 3900)",
					type: "Input",
					defaultValue: "3900"
				},
				{
					name: "OMNIVOICE_DATA_DIR",
					description: "Custom path for models, voices, and projects storage",
					type: "Directory"
				},
				{
					name: "OMNIVOICE_SERVER_MODE",
					description: "Run server in headless/server mode (disables local origin restriction)",
					type: "CheckBox"
				},
				{
					name: "OMNIVOICE_PUBLIC_API_BASE",
					description: "Public API base URL when behind a reverse proxy",
					type: "Input"
				},
				{
					name: "OMNIVOICE_TRUSTED_NETWORKS",
					description: "Comma-separated trusted network CIDRs for remote access",
					type: "Input"
				},
				{
					name: "OMNIVOICE_LOG_LEVEL",
					description: "Log verbosity level (INFO, DEBUG, WARNING, ERROR)",
					type: "DropDown",
					defaultValue: "INFO",
					values: [
						"INFO",
						"DEBUG",
						"WARNING",
						"ERROR"
					]
				}
			]
		},
		{
			section: "Hardware & Compute",
			items: [
				{
					name: "TORCH_COMPILE_DISABLE",
					description: "Disable torch.compile / Triton compilation (fixes Windows OOM issues)",
					type: "CheckBox"
				},
				{
					name: "OMNIVOICE_TORCH_VARIANT",
					description: "PyTorch variant selection (cuda, rocm, cpu)",
					type: "DropDown",
					defaultValue: "cuda",
					values: [
						"cuda",
						"rocm",
						"cpu"
					]
				},
				{
					name: "ASR_COMPUTE_TYPE",
					description: "Precision for ASR engines (WhisperX, Faster-Whisper)",
					type: "DropDown",
					defaultValue: "float16",
					values: [
						"float16",
						"int8",
						"float32"
					]
				},
				{
					name: "HSA_OVERRIDE_GFX_VERSION",
					description: "AMD GPU architecture override for ROCm (e.g. 11.0.0 for consumer RDNA3 cards)",
					type: "Input"
				}
			]
		},
		{
			section: "HuggingFace & Downloads",
			items: [
				{
					name: "HF_TOKEN",
					description: "HuggingFace user access token for diarization & heavy models",
					type: "Input"
				},
				{
					name: "OMNIVOICE_CACHE_DIR",
					description: "Directory path to route all HF and PyTorch model weight caches",
					type: "Directory"
				},
				{
					name: "UV_HTTP_TIMEOUT",
					description: "HTTP timeout in seconds for uv package downloads (default: 120)",
					type: "Input",
					defaultValue: "120"
				}
			]
		}
	]
}, {
	category: "Command Line Arguments",
	sections: [{
		section: "Backend Flags",
		items: [
			{
				name: "--host",
				description: "Host interface to bind (e.g. 127.0.0.1 or 0.0.0.0)",
				type: "Input",
				defaultValue: "127.0.0.1"
			},
			{
				name: "--port",
				description: "Port number to listen on",
				type: "Input",
				defaultValue: "3900"
			},
			{
				name: "--diagnose",
				description: "Run self-check diagnostics on startup",
				type: "CheckBox"
			}
		]
	}]
}];
//#endregion
//#region module/src/containers/audio/VoiceStudio/RendererMethods.ts
const VOICE_STUDIO_URL = "https://github.com/debpalash/VoiceStudio";
const BUN_WIN_INSTALL = "powershell -c \"irm bun.sh/install.ps1|iex\"";
const BUN_UNIX_INSTALL = "curl -fsSL https://bun.com/install | bash";
function isEnvironmentVariable$2(name) {
	for (const arg of voiceStudioArguments) if (arg.category === "Environment Variables") {
		if ("sections" in arg) return arg.sections.some((section) => section.items.some((item) => item.name === name));
	}
	return false;
}
function parseArgsToString$15(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let argResult = "";
	let lines = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const customRes = parseCustomArg(arg);
			if (!customRes) return;
			if (customRes.line) lines += customRes.line + "\n";
			if (customRes.commandArg) argResult += customRes.commandArg + " ";
		} else if (isEnvironmentVariable$2(arg.name)) {
			if (getArgumentType(arg.name, voiceStudioArguments) === "CheckBox") lines += isWin ? `set ${arg.name}=1\n` : `export ${arg.name}="1"\n`;
			else lines += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
		} else {
			const argType = getArgumentType(arg.name, voiceStudioArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	result += isEmpty(argResult) ? "bun run desktop-prod:run" : `bun run desktop-prod:run ${argResult}`;
	return result;
}
function parseStringToArgs$15(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("#")) return;
		if (line.startsWith("export ") || line.startsWith("set ")) {
			const prefix = line.startsWith("export ") ? "export " : "set ";
			let [name, value] = line.replace(prefix, "").split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, voiceStudioArguments) && isEnvironmentVariable$2(name)) argResult.push({
				name,
				value
			});
			return;
		}
		if (!line.includes("bun run desktop-prod:run")) return;
		const clArgs = line.split("bun run desktop-prod:run ")[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, voiceStudioArguments)) {
				if (getArgumentType(value.name, voiceStudioArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
function startInstall$14(stepper) {
	const cloneAndInstall = () => {
		stepper.nextStep().then(() => {
			stepper.cloneRepository(VOICE_STUDIO_URL).then((dir) => {
				stepper.nextStep().then(() => {
					stepper.executeTerminalCommands("bun install", dir).then(() => {
						stepper.nextStep().then(() => {
							stepper.executeTerminalCommands("bun run desktop-prod", dir).then(() => {
								stepper.setInstalled(dir);
								stepper.showFinalStep("success", "VoiceStudio installation complete!", "All installation steps completed successfully. Your VoiceStudio environment is ready for use.");
							});
						});
					});
				});
			});
		});
	};
	stepper.initialSteps([
		"VoiceStudio",
		"Check Bun",
		"Clone VoiceStudio",
		"Install Dependencies",
		"Build Studio",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking if Bun is installed...");
			stepper.ipc.invoke("is_voicestudio_bun_available").then((isBunInstalled) => {
				if (isBunInstalled) cloneAndInstall();
				else {
					stepper.progressBar(true, "Installing Bun runtime...");
					const installCmd = isWin ? BUN_WIN_INSTALL : BUN_UNIX_INSTALL;
					stepper.executeTerminalCommands(installCmd).then(() => {
						stepper.showFinalStep("success", "Bun Installed Successfully!", "Bun has been installed. To use it, please restart LynxHub and start the installation again.");
					});
				}
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, VOICE_STUDIO_URL).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "VoiceStudio located successfully!", "Pre-installed VoiceStudio detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.utils.verifyFilesExist(targetDirectory, ["package.json", "backend/main.py"]).then((filesExist) => {
				if (filesExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", "VoiceStudio located successfully!", "Detected a manual installation of VoiceStudio.");
				} else stepper.showFinalStep("error", "Unable to locate VoiceStudio!", "Please ensure you have selected the correct folder containing the VoiceStudio installation.");
			});
		});
	});
}
function startUpdate$3(stepper, dir) {
	stepper.initialSteps([
		"Fetch Changes",
		"Install Dependencies",
		"Build Studio",
		"Completed"
	]);
	stepper.executeTerminalCommands([
		"git pull",
		"bun install",
		"bun run desktop-prod"
	], dir).then(() => {
		stepper.setUpdated();
		stepper.showFinalStep("success", "VoiceStudio Updated Successfully!", "VoiceStudio has been updated to the latest version.");
	});
}
async function cardInfo$14(api, callback) {
	return CardInfo(VOICE_STUDIO_URL, void 0, api, callback);
}
const VOICE_STUDIO_RM = {
	catchAddress: catchAddress$5,
	parseArgsToString: parseArgsToString$15,
	parseStringToArgs: parseStringToArgs$15,
	cardInfo: cardInfo$14,
	manager: {
		startInstall: startInstall$14,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$3
		}
	}
};
//#endregion
//#region module/src/containers/image/Automatic1111Sd/Arguments.ts
const automatic1111Arguments = [{
	category: "Command Line Arguments",
	condition: "COMMANDLINE_ARGS",
	sections: [
		{
			items: [
				{
					defaultValue: false,
					description: "Show this help message and exit.",
					name: "--help",
					type: "CheckBox"
				},
				{
					description: "Terminate after installation",
					name: "--exit",
					type: "CheckBox"
				},
				{
					defaultValue: "./",
					description: "base path where all user data is stored",
					name: "--data-dir",
					type: "Directory"
				},
				{
					defaultValue: "configs/stable-diffusion/v1-inference.yaml",
					description: "Path to config which constructs model.",
					name: "--config",
					type: "File"
				},
				{
					defaultValue: "model.ckpt",
					description: "Path to checkpoint of Stable Diffusion model; if specified, this checkpoint will be added to the list of checkpoints and loaded.",
					name: "--ckpt",
					type: "File"
				},
				{
					description: "Path to directory with Stable Diffusion checkpoints.",
					name: "--ckpt-dir",
					type: "Directory"
				},
				{
					defaultValue: false,
					description: "Don't download SD1.5 model even if no model is found.",
					name: "--no-download-sd-model",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "do not download CLIP model even if it's not included in the checkpoint",
					name: "--do-not-download-clip",
					type: "CheckBox"
				},
				{
					description: "Path to Variational Autoencoders model | disables all settings related to VAE.",
					name: "--vae-dir",
					type: "Directory"
				},
				{
					description: "Checkpoint to use as VAE; setting this argument",
					name: "--vae-path",
					type: "File"
				},
				{
					defaultValue: "GFPGAN/",
					description: "GFPGAN directory.",
					name: "--gfpgan-dir",
					type: "Directory"
				},
				{
					defaultValue: "GFPGAN model file name.",
					name: "--gfpgan-model",
					type: "Input"
				},
				{
					defaultValue: "models/Codeformer/",
					description: "Path to directory with codeformer model file(s).",
					name: "--codeformer-models-path",
					type: "Directory"
				},
				{
					defaultValue: "models/GFPGAN",
					description: "Path to directory with GFPGAN model file(s).",
					name: "--gfpgan-models-path",
					type: "Directory"
				},
				{
					defaultValue: "models/ESRGAN",
					description: "Path to directory with ESRGAN model file(s).",
					name: "--esrgan-models-path",
					type: "Directory"
				},
				{
					defaultValue: "models/BSRGAN",
					description: "Path to directory with BSRGAN model file(s).",
					name: "--bsrgan-models-path",
					type: "Directory"
				},
				{
					defaultValue: "models/RealESRGAN",
					description: "Path to directory with RealESRGAN model file(s).",
					name: "--realesrgan-models-path",
					type: "Directory"
				},
				{
					defaultValue: "models/ScuNET",
					description: "Path to directory with ScuNET model file(s).",
					name: "--scunet-models-path",
					type: "Directory"
				},
				{
					defaultValue: "models/SwinIR",
					description: "Path to directory with SwinIR and SwinIR v2 model file(s).",
					name: "--swinir-models-path",
					type: "Directory"
				},
				{
					defaultValue: "models/LDSR",
					description: "Path to directory with LDSR model file(s).",
					name: "--ldsr-models-path",
					type: "Directory"
				},
				{
					defaultValue: "models/DAT",
					description: "Path to directory with DAT model file(s).",
					name: "--dat-models-path",
					type: "Directory"
				},
				{
					defaultValue: "models/Lora",
					description: "Path to directory with Lora networks.",
					name: "--lora-dir",
					type: "Directory"
				},
				{
					description: "Path to directory with CLIP model file(s).",
					name: "--clip-models-path",
					type: "Directory"
				},
				{
					defaultValue: "embeddings/",
					description: "Embeddings directory for textual inversion (default: embeddings).",
					name: "--embeddings-dir",
					type: "Directory"
				},
				{
					defaultValue: "textual_inversion_templates",
					description: "Directory with textual inversion templates.",
					name: "--textual-inversion-templates-dir",
					type: "Directory"
				},
				{
					defaultValue: "models/hypernetworks/",
					description: "hypernetwork directory.",
					name: "--hypernetwork-dir",
					type: "Directory"
				},
				{
					defaultValue: "localizations/",
					description: "Localizations directory.",
					name: "--localizations-dir",
					type: "Directory"
				},
				{
					defaultValue: "styles.csv",
					description: "Path or wildcard path of styles files, allow multiple entries.",
					name: "--styles-file",
					type: "File"
				},
				{
					defaultValue: "ui-config.json",
					description: "Filename to use for UI configuration.",
					name: "--ui-config-file",
					type: "File"
				},
				{
					defaultValue: false,
					description: "Do not hide progress bar in gradio UI (we hide it because it slows down ML if you have hardware acceleration in browser).",
					name: "--no-progressbar-hiding",
					type: "CheckBox"
				},
				{
					defaultValue: 16,
					description: "Maximum batch count value for the UI.",
					name: "--max-batch-count",
					type: "Input"
				},
				{
					defaultValue: "config.json",
					description: "Filename to use for UI settings.",
					name: "--ui-settings-file",
					type: "File"
				},
				{
					defaultValue: false,
					description: "Allow custom script execution from web UI.",
					name: "--allow-code",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Use `share=True` for gradio and make the UI accessible through their site.",
					name: "--share",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Launch gradio with 0.0.0.0 as server name, allowing to respond to network requests.",
					name: "--listen",
					type: "CheckBox"
				},
				{
					defaultValue: 7860,
					description: "Launch gradio with given server port, you need root/admin rights for ports < 1024; defaults to 7860 if available.",
					name: "--port",
					type: "Input"
				},
				{
					defaultValue: false,
					description: "Hide directory configuration from web UI.",
					name: "--hide-ui-dir-config",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "disable editing of all settings globally",
					name: "--freeze-settings",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "disable editing settings in specific sections of the settings page by specifying a comma-delimited list such like \"saving-images,upscaling\". The list of setting names can be found in the modules/shared_options.py file",
					name: "--freeze-settings-in-sections",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "disable editing of individual settings by specifying a comma-delimited list like \"samples_save,samples_format\". The list of setting names can be found in the config.json file",
					name: "--freeze-specific-settings",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Enable extensions tab regardless of other options.",
					name: "--enable-insecure-extension-access",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Launch gradio with `--debug` option.",
					name: "--gradio-debug",
					type: "CheckBox"
				},
				{
					description: "Set gradio authentication like `username:password`; or comma-delimit multiple like `u1:p1,u2:p2,u3:p3`.",
					name: "--gradio-auth",
					type: "Input"
				},
				{
					description: "Set gradio authentication file path ex. `/path/to/auth/file` same auth format as `--gradio-auth`.",
					name: "--gradio-auth-path",
					type: "File"
				},
				{
					defaultValue: false,
					description: "Do not output progress bars to console.",
					name: "--disable-console-progressbars",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Print prompts to console when generating with txt2img and img2img.",
					name: "--enable-console-prompts",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Launch web UI with API.",
					name: "--api",
					type: "CheckBox"
				},
				{
					description: "Set authentication for API like `username:password`; or comma-delimit multiple like `u1:p1,u2:p2,u3:p3`.",
					name: "--api-auth",
					type: "Input"
				},
				{
					defaultValue: false,
					description: "Enable logging of all API requests.",
					name: "--api-log",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Only launch the API, without the UI.",
					name: "--nowebui",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Don't load model to quickly launch UI.",
					name: "--ui-debug-mode",
					type: "CheckBox"
				},
				{
					description: "Select the default CUDA device to use (export `CUDA_VISIBLE_DEVICES=0,1` etc might be needed before).",
					name: "--device-id",
					type: "Input"
				},
				{
					defaultValue: false,
					description: "Administrator privileges.",
					name: "--administrator",
					type: "CheckBox"
				},
				{
					description: "Allowed CORS origin(s) in the form of a comma-separated list (no spaces).",
					name: "--cors-allow-origins",
					type: "Input"
				},
				{
					description: "Allowed CORS origin(s) in the form of a single regular expression.",
					name: "--cors-allow-origins-regex",
					type: "Input"
				},
				{
					description: "Partially enables TLS, requires `--tls-certfile` to fully function.",
					name: "--tls-keyfile",
					type: "File"
				},
				{
					description: "Partially enables TLS, requires `--tls-keyfile` to fully function.",
					name: "--tls-certfile",
					type: "File"
				},
				{
					defaultValue: false,
					description: "When passed, enables the use of self-signed certificates.",
					name: "--disable-tls-verify",
					type: "CheckBox"
				},
				{
					description: "Sets hostname of server.",
					name: "--server-name",
					type: "Input"
				},
				{
					defaultValue: false,
					description: "Disables gradio queue; causes the webpage to use http requests instead of websockets; was the default in earlier versions.",
					name: "--no-gradio-queue",
					type: "CheckBox"
				},
				{
					description: "Add path to Gradio's `allowed_paths`; make it possible to serve files from it.",
					name: "--gradio-allowed-path",
					type: "Directory"
				},
				{
					defaultValue: false,
					description: "Disable SHA-256 hashing of checkpoints to help loading performance.",
					name: "--no-hashing",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Do not check versions of torch and xformers.",
					name: "--skip-version-check",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Do not check versions of Python.",
					name: "--skip-python-version-check",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Do not check if CUDA is able to work properly.",
					name: "--skip-torch-cuda-test",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Skip installation of packages.",
					name: "--skip-install",
					type: "CheckBox"
				},
				{
					description: "log level; one of: CRITICAL, ERROR, WARNING, INFO, DEBUG",
					name: "--loglevel",
					type: "DropDown",
					values: [
						"CRITICAL",
						"ERROR",
						"WARNING",
						"INFO",
						"DEBUG"
					]
				},
				{
					defaultValue: false,
					description: "launch.py argument: print a detailed log of what's happening at startup",
					name: "--log-startup",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "enable server stop/restart/kill via api",
					name: "--api-server-stop",
					type: "CheckBox"
				},
				{
					defaultValue: 30,
					description: "set timeout_keep_alive for uvicorn",
					name: "--timeout-keep-alive",
					type: "Input"
				}
			],
			section: "Configuration"
		},
		{
			items: [
				{
					defaultValue: false,
					description: "Enable xformers for cross attention layers.",
					name: "--xformers",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Enable xformers for cross attention layers regardless of whether the checking code thinks you can run it; ***do not make bug reports if this fails to work***.",
					name: "--force-enable-xformers",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Enable xformers with Flash Attention to improve reproducibility (supported for SD2.x or variant only).",
					name: "--xformers-flash-attention",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Enable scaled dot product cross-attention layer optimization; requires PyTorch 2.*",
					name: "--opt-sdp-attention",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Enable scaled dot product cross-attention layer optimization without memory efficient attention, makes image generation deterministic; requires PyTorch 2.*",
					name: "--opt-sdp-no-mem-attention",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Force-enables Doggettx's cross-attention layer optimization. By default, it's on for CUDA-enabled systems.",
					name: "--opt-split-attention",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Force-enables InvokeAI's cross-attention layer optimization. By default, it's on when CUDA is unavailable.",
					name: "--opt-split-attention-invokeai",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Enable older version of split attention optimization that does not consume all VRAM available.",
					name: "--opt-split-attention-v1",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Enable memory efficient sub-quadratic cross-attention layer optimization.",
					name: "--opt-sub-quad-attention",
					type: "CheckBox"
				},
				{
					defaultValue: 1024,
					description: "Query chunk size for the sub-quadratic cross-attention layer optimization to use.",
					name: "--sub-quad-q-chunk-size",
					type: "Input"
				},
				{
					description: "KV chunk size for the sub-quadratic cross-attention layer optimization to use.",
					name: "--sub-quad-kv-chunk-size",
					type: "Input"
				},
				{
					description: "The percentage of VRAM threshold for the sub-quadratic cross-attention layer optimization to use chunking.",
					name: "--sub-quad-chunk-threshold",
					type: "Input"
				},
				{
					defaultValue: false,
					description: "Enable alternative layout for 4d tensors, may result in faster inference **only** on Nvidia cards with Tensor cores (16xx and higher).",
					name: "--opt-channelslast",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Force-disables cross-attention layer optimization.",
					name: "--disable-opt-split-attention",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Do not check if produced images/latent spaces have nans; useful for running without a checkpoint in CI.",
					name: "--disable-nan-check",
					type: "CheckBox"
				},
				{
					description: "Use CPU as torch device for specified modules.",
					name: "--use-cpu",
					type: "DropDown",
					values: [
						"all",
						"sd",
						"interrogate",
						"gfpgan",
						"bsrgan",
						"esrgan",
						"scunet",
						"codeformer"
					]
				},
				{
					defaultValue: false,
					description: "Use Intel XPU as torch device",
					name: "--use-ipex",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Do not switch the model to 16-bit floats.",
					name: "--no-half",
					type: "CheckBox"
				},
				{
					defaultValue: "autocast",
					description: "Evaluate at this precision.",
					name: "--precision",
					type: "DropDown",
					values: ["full", "autocast"]
				},
				{
					defaultValue: false,
					description: "Do not switch the VAE model to 16-bit floats.",
					name: "--no-half-vae",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Upcast sampling. No effect with `--no-half`. Usually produces similar results to `--no-half` with better performance while using less memory.",
					name: "--upcast-sampling",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Enable Stable Diffusion model optimizations for sacrificing a some performance for low VRAM usage.",
					name: "--medvram",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "enable `--medvram` optimization just for SDXL models",
					name: "--medvram-sdxl",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Enable Stable Diffusion model optimizations for sacrificing a lot of speed for very low VRAM usage.",
					name: "--lowvram",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Load Stable Diffusion checkpoint weights to VRAM instead of RAM.",
					name: "--lowram",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "disable an optimization that reduces RAM use when loading a model",
					name: "--disable-model-loading-ram-optimization",
					type: "CheckBox"
				}
			],
			section: "Performance"
		},
		{
			items: [
				{
					defaultValue: false,
					description: "Open the web UI URL in the system's default browser upon launch.",
					name: "--autolaunch",
					type: "CheckBox"
				},
				{
					description: "Open the web UI with the specified theme (`light` or `dark`). If not specified, uses the default browser theme.",
					name: "--theme",
					type: "DropDown"
				},
				{
					defaultValue: false,
					description: "Use textbox for seeds in UI (no up/down, but possible to input long seeds).",
					name: "--use-textbox-seed",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Disable checking PyTorch models for malicious code.",
					name: "--disable-safe-unpickle",
					type: "CheckBox"
				},
				{
					description: "ngrok authtoken, alternative to gradio `--share`.",
					name: "--ngrok",
					type: "Input"
				},
				{
					defaultValue: "us",
					description: "The region in which ngrok should start.",
					name: "--ngrok-region",
					type: "Input"
				},
				{
					description: "The options to pass to ngrok in JSON format, e.g.: `{\"authtoken_from_env\":true, \"basic_auth\":\"user:password\", \"oauth_provider\":\"google\", \"oauth_allow_emails\":\"user@asdf.com\"}`",
					name: "--ngrok-options",
					type: "Input"
				},
				{
					description: "On startup, notifies whether or not your web UI version (commit) is up-to-date with the current master branch.",
					name: "--update-check",
					type: "CheckBox"
				},
				{
					description: "On startup, it pulls the latest updates for all extensions you have installed.",
					name: "--update-all-extensions",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Force-reinstall xformers. Useful for upgrading - but remove it after upgrading or you'll reinstall xformers perpetually.",
					name: "--reinstall-xformers",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Force-reinstall torch. Useful for upgrading - but remove it after upgrading or you'll reinstall torch perpetually.",
					name: "--reinstall-torch",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Run test to validate web UI functionality, see wiki topic for more details.",
					name: "--tests",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "Do not run tests even if `--tests` option is specified.",
					name: "--no-tests",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "launch.py argument: dump limited sysinfo file (without information about extensions, options) to disk and quit",
					name: "--dump-sysinfo",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "disable all non-built-in extensions from running",
					name: "--disable-all-extensions",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "disable all extensions from running",
					name: "--disable-extra-extensions",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "if load a model at web start, only take effect when --nowebui",
					name: "--skip-load-model-at-start",
					type: "CheckBox"
				},
				{
					defaultValue: false,
					description: "allow any symbols except '/' in filenames. May conflict with your browser and file system",
					name: "--unix-filenames-sanitization",
					type: "CheckBox"
				},
				{
					defaultValue: 128,
					description: "maximal length of filenames of saved images, longer filenames will be truncated. if overridden it can potentially cause issues with the file system",
					name: "--filenames-max-length",
					type: "Input"
				},
				{
					defaultValue: false,
					description: "disable read prompt from last generation feature; disables `--data-path/params.txt`",
					name: "--no-prompt-history",
					type: "CheckBox"
				}
			],
			section: "Features"
		}
	]
}];
const winEV = {
	category: "Environment Variables",
	items: [
		{
			description: "Sets a custom path for Python executable.",
			name: "PYTHON",
			type: "File"
		},
		{
			description: "Specifies the path for the virtual environment. Default is venv. Special value - runs the script without creating virtual environment.",
			name: "VENV_DIR",
			type: "Directory"
		},
		{
			description: "Additional commandline arguments for the main program.",
			name: "COMMANDLINE_ARGS",
			type: "CheckBox"
		},
		{
			description: "Set to anything to make the program not exit with an error if an unexpected commandline argument is encountered.",
			name: "IGNORE_CMD_ARGS_ERRORS",
			type: "CheckBox"
		},
		{
			description: "Name of requirements.txt file with dependencies that will be installed when launch.py is run. Defaults to requirements_versions.txt.",
			name: "REQS_FILE",
			type: "Input"
		},
		{
			description: "Command for installing PyTorch.",
			name: "TORCH_COMMAND",
			type: "Input"
		},
		{
			description: "`--index-url` parameter for pip.",
			name: "INDEX_URL",
			type: "Input"
		},
		{
			description: "Path to where transformers library will download and keep its files related to the CLIP model.",
			name: "TRANSFORMERS_CACHE",
			type: "Directory"
		},
		{
			description: "Select GPU to use for your instance on a system with multiple GPUs. For example, if you want to use secondary GPU, put \"1\".\n(add a new line to webui-user.bat not in COMMANDLINE_ARGS): `set CUDA_VISIBLE_DEVICES=0`\nAlternatively, just use `--device-id` flag in `COMMANDLINE_ARGS`.",
			name: "CUDA_VISIBLE_DEVICES",
			type: "Input"
		},
		{
			description: "Log verbosity. Supports any valid logging level supported by Python's built-in `logging` module. Defaults to `INFO` if not set.",
			name: "SD_WEBUI_LOG_LEVEL",
			type: "Input"
		},
		{
			description: "Cache file path. Defaults to `cache.json` in the root directory if not set.",
			name: "SD_WEBUI_CACHE_FILE",
			type: "File"
		},
		{
			description: "A value set by `launcher script` (like webui.bat webui.sh) informing Webui that restart function is available",
			name: "SD_WEBUI_RESTAR",
			type: "CheckBox"
		},
		{
			description: "A internal value signifying if webui is currently restarting or reloading, used for disabling certain actions asuch as auto launching browser.\nset to `1` disables auto launching browser\nset to `0` enables auto launch even when restarting\nCertain extensions might use this value for similar purpose.",
			name: "SD_WEBUI_RESTARTING",
			type: "CheckBox"
		}
	]
};
const linEV = {
	category: "Environment",
	sections: [{
		section: "Variables",
		items: [
			{
				description: "Install directory without trailing slash",
				name: "install_dir",
				type: "Input",
				defaultValue: "/home/$(whoami)"
			},
			{
				description: "Name of the subdirectory",
				name: "clone_dir",
				type: "Input",
				defaultValue: "stable-diffusion-webui"
			},
			{
				description: "python3 executable",
				name: "python_cmd",
				type: "Input",
				defaultValue: "python3"
			},
			{
				description: "python3 venv without trailing slash (defaults to ${install_dir}/${clone_dir}/venv)",
				name: "venv_dir",
				type: "Input",
				defaultValue: "venv"
			}
		]
	}, {
		section: "Arguments",
		items: [
			{
				description: "Commandline arguments for webui.py",
				name: "COMMANDLINE_ARGS",
				type: "CheckBox"
			},
			{
				description: "Script to launch to start the app",
				name: "LAUNCH_SCRIPT",
				type: "Input",
				defaultValue: "launch.py"
			},
			{
				description: "Install command for torch",
				name: "TORCH_COMMAND",
				type: "Input",
				defaultValue: `${getPythonCommandByOs().pip} install torch==1.12.1+cu113 --extra-index-url https://download.pytorch.org/whl/cu113`
			},
			{
				description: "Requirements file to use for stable-diffusion-webui",
				name: "REQS_FILE",
				type: "Input",
				defaultValue: "requirements_versions.txt"
			},
			{
				description: "Fixed git repo for K_DIFFUSION_PACKAGE",
				name: "K_DIFFUSION_PACKAGE",
				type: "Input",
				defaultValue: ""
			},
			{
				description: "Fixed git repo for GFPGAN_PACKAGE",
				name: "GFPGAN_PACKAGE",
				type: "Input",
				defaultValue: ""
			},
			{
				description: "Fixed git commit for Stable Diffusion",
				name: "STABLE_DIFFUSION_COMMIT_HASH",
				type: "Input",
				defaultValue: ""
			},
			{
				description: "Fixed git commit for CodeFormer",
				name: "CODEFORMER_COMMIT_HASH",
				type: "Input",
				defaultValue: ""
			},
			{
				description: "Fixed git commit for BLIP",
				name: "BLIP_COMMIT_HASH",
				type: "Input",
				defaultValue: ""
			},
			{
				description: "Enable accelerated launch",
				name: "ACCELERATE",
				type: "CheckBox",
				defaultValue: false
			},
			{
				description: "Disable TCMalloc",
				name: "NO_TCMALLOC",
				type: "CheckBox",
				defaultValue: false
			}
		]
	}]
};
automatic1111Arguments.unshift(isWin ? winEV : linEV);
//#endregion
//#region module/src/containers/image/Automatic1111Sd/SharedRenderer.ts
async function fetchExtensionList$2() {
	try {
		return (await (await fetch("https://raw.githubusercontent.com/AUTOMATIC1111/stable-diffusion-webui-extensions/master/index.json")).json()).extensions.map((extension) => ({
			title: extension.name,
			description: extension.description,
			url: extension.url,
			stars: extension.stars
		}));
	} catch (e) {
		console.error(e);
		return [];
	}
}
function getTypeByCategoryName$1(category) {
	switch (category) {
		case "Command Line Arguments": return "cl";
		case "Environment":
		case "Environment Variables": return "env";
		default: return;
	}
}
function getCategoryType$3(name) {
	if (!name) return void 0;
	for (const argument of automatic1111Arguments) if ("sections" in argument) {
		for (const section of argument.sections) if (section.items.some((item) => item.name === name)) {
			if (section.section === "Variables") return "envVar";
			return getTypeByCategoryName$1(argument.category);
		}
	} else if (argument.items.some((item) => item.name === name)) return getTypeByCategoryName$1(argument.category);
}
function parseArgsToString$14(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let clResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) clResult += result.commandArg + " ";
		} else {
			const cat = getCategoryType$3(arg.name);
			if (cat !== "cl") {
				const eWinResult = `set ${arg.name}=${arg.value}\n`;
				const eResult = cat === "env" ? `export ${arg.name}="${arg.value}"\n` : `${arg.name}="${arg.value}"\n`;
				if (arg.name !== "COMMANDLINE_ARGS") result += isWin ? eWinResult : eResult;
			} else if (cat === "cl") {
				const argType = getArgumentType(arg.name, automatic1111Arguments);
				if (argType === "CheckBox") clResult += `${arg.name} `;
				else if (argType === "File" || argType === "Directory") clResult += isWin ? `${arg.name} "${arg.value}" ` : `${arg.name} ${arg.value} `;
				else clResult += `${arg.name} ${arg.value} `;
			}
		}
	});
	if (lines) result += lines + "\n";
	if (!isEmpty(clResult)) result += isWin ? `set COMMANDLINE_ARGS=${clResult}\n` : `export COMMANDLINE_ARGS=${clResult}\n`;
	result += isWin ? `\ncall webui.bat` : ``;
	return result;
}
function checkLinuxArgLine$2(line) {
	if (isWin && line.startsWith("set ")) return "set";
	if (line.startsWith("export ")) return "export";
	for (const arg of automatic1111Arguments) if (arg.category === "Environment") {
		if (arg.sections[0].items.find((item) => item.name === line.split("=")[0])) return "var";
		else return;
	}
}
function parseStringToArgs$14(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("#")) return;
		else if (line.startsWith(`${isWin ? "set" : "export"} COMMANDLINE_ARGS=`)) {
			argResult.push({
				name: "COMMANDLINE_ARGS",
				value: ""
			});
			const clArgs = line.split("=")[1];
			if (!clArgs) return;
			clArgs.split("--").filter(Boolean).map((arg) => {
				const [id, ...value] = arg.trim().split(" ");
				return {
					name: `--${id}`,
					value: value.join(" ").replace(/"/g, "")
				};
			}).forEach((value) => {
				if (isValidArg(value.name, automatic1111Arguments)) {
					if (getArgumentType(value.name, automatic1111Arguments) === "CheckBox") argResult.push({
						name: value.name,
						value: ""
					});
					else argResult.push({
						name: value.name,
						value: value.value
					});
				}
			});
		} else {
			const lineType = checkLinuxArgLine$2(line);
			if (lineType === "export" || lineType === "set") {
				let [name, value] = line.replace(`${lineType} `, "").split("=");
				name = removeEscapes(name.trim());
				value = removeEscapes(value.trim());
				if (isValidArg(name, automatic1111Arguments)) argResult.push({
					name,
					value
				});
			} else if (checkLinuxArgLine$2(line) === "var") {
				let [name, value] = line.split("=");
				name = removeEscapes(name.trim());
				value = removeEscapes(value.trim());
				if (isValidArg(name, automatic1111Arguments)) argResult.push({
					name,
					value
				});
			}
		}
	});
	return argResult;
}
//#endregion
//#region module/src/containers/image/ComfyUi/Arguments.ts
const comfyuiArguments = [{
	category: "Command Line Arguments",
	sections: [
		{
			section: "Network",
			items: [
				{
					name: "--listen",
					description: "Specify the IP address to listen on (default: 127.0.0.1). You can give a list of ip addresses by separating them with a comma like: 127.2.2.2,127.3.3.3 If --listen is provided without an argument, it defaults to 0.0.0.0,:: (listens on all ipv4 and ipv6)",
					type: "Input",
					defaultValue: "127.0.0.1"
				},
				{
					name: "--port",
					description: "Set the listen port.",
					type: "Input",
					defaultValue: 8188
				},
				{
					name: "--tls-keyfile",
					description: "Path to TLS (SSL) key file. Enables TLS, makes app accessible at https://... requires --tls-certfile to function",
					type: "File"
				},
				{
					name: "--tls-certfile",
					description: "Path to TLS (SSL) certificate file. Enables TLS, makes app accessible at https://... requires --tls-keyfile to function",
					type: "File"
				},
				{
					name: "--enable-cors-header",
					description: "Enable CORS (Cross-Origin Resource Sharing) with optional origin or allow all with default '*'.",
					type: "Input"
				},
				{
					name: "--max-upload-size",
					description: "Set the maximum upload size in MB.",
					type: "Input",
					defaultValue: 100
				},
				{
					name: "--oneapi-device-selector",
					description: "Sets the oneAPI device(s) this instance will use.",
					type: "Input"
				},
				{
					name: "--supports-fp8-compute",
					description: "ComfyUI will act like if the device supports fp8 compute.",
					type: "CheckBox"
				},
				{
					name: "--disable-api-nodes",
					description: "Disable loading all api nodes. Also prevents the frontend from communicating with the internet.",
					type: "CheckBox"
				},
				{
					name: "--enable-compress-response-body",
					description: "Enable compressing response body.",
					type: "CheckBox"
				},
				{
					name: "--comfy-api-base",
					description: "Set the base URL for the ComfyUI API.",
					type: "Input",
					defaultValue: "https://api.comfy.org"
				},
				{
					name: "--front-end-version",
					description: "Specifies the version of the frontend to be used (format: [repoOwner]/[repoName]@[version]).",
					type: "Input",
					defaultValue: "comfyanonymous/ComfyUI@latest"
				}
			]
		},
		{
			section: "Paths",
			items: [
				{
					name: "--base-directory",
					description: "Set the ComfyUI base directory for models, custom_nodes, input, output, temp, and user directories.",
					type: "Directory"
				},
				{
					name: "--extra-model-paths-config",
					description: "Load one or more extra_model_paths.yaml files.",
					type: "File"
				},
				{
					name: "--output-directory",
					description: "Set the ComfyUI output directory. Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--temp-directory",
					description: "Set the ComfyUI temp directory (default is in the ComfyUI directory). Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--input-directory",
					description: "Set the ComfyUI input directory. Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--user-directory",
					description: "Set the ComfyUI user directory with an absolute path. Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--models-directory",
					description: "Set the ComfyUI models directory. Overrides the models folder in --base-directory.",
					type: "Directory"
				},
				{
					name: "--front-end-root",
					description: "The local filesystem path to the directory where the frontend is located. Overrides --front-end-version.",
					type: "Directory"
				}
			]
		},
		{
			section: "Execution",
			items: [
				{
					name: "--auto-launch",
					description: "Automatically launch ComfyUI in the default browser.",
					type: "CheckBox"
				},
				{
					name: "--disable-auto-launch",
					description: "Disable auto launching the browser.",
					type: "CheckBox"
				},
				{
					name: "--cuda-device",
					description: "Set the ids of cuda devices this instance will use, as a comma-separated list (e.g. '0' or '0,1'). All other devices will not be visible.",
					type: "Input"
				},
				{
					name: "--default-device",
					description: "Set the id of the default device, all other devices will stay visible.",
					type: "Input"
				},
				{
					name: "--cuda-malloc",
					description: "Enable cudaMallocAsync (enabled by default for torch 2.0 and up).",
					type: "CheckBox"
				},
				{
					name: "--disable-cuda-malloc",
					description: "Disable cudaMallocAsync.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Precision",
			items: [
				{
					name: "--force-fp32",
					description: "Force fp32 (If this makes your GPU work better please report it).",
					type: "CheckBox"
				},
				{
					name: "--force-fp16",
					description: "Force fp16.",
					type: "CheckBox"
				},
				{
					name: "--fp32-unet",
					description: "Run the diffusion model in fp32.",
					type: "CheckBox"
				},
				{
					name: "--fp64-unet",
					description: "Run the diffusion model in fp64.",
					type: "CheckBox"
				},
				{
					name: "--bf16-unet",
					description: "Run the diffusion model in bf16.",
					type: "CheckBox"
				},
				{
					name: "--fp16-unet",
					description: "Run the diffusion model in fp16",
					type: "CheckBox"
				},
				{
					name: "--fp8_e4m3fn-unet",
					description: "Store unet weights in fp8_e4m3fn.",
					type: "CheckBox"
				},
				{
					name: "--fp8_e5m2-unet",
					description: "Store unet weights in fp8_e5m2.",
					type: "CheckBox"
				},
				{
					name: "--fp8_e8m0fnu-unet",
					description: "Store unet weights in fp8_e8m0fnu.",
					type: "CheckBox"
				},
				{
					name: "--fp16-vae",
					description: "Run the VAE in fp16, might cause black images.",
					type: "CheckBox"
				},
				{
					name: "--fp32-vae",
					description: "Run the VAE in full precision fp32.",
					type: "CheckBox"
				},
				{
					name: "--bf16-vae",
					description: "Run the VAE in bf16.",
					type: "CheckBox"
				},
				{
					name: "--cpu-vae",
					description: "Run the VAE on the CPU.",
					type: "CheckBox"
				},
				{
					name: "--fp8_e4m3fn-text-enc",
					description: "Store text encoder weights in fp8 (e4m3fn variant).",
					type: "CheckBox"
				},
				{
					name: "--fp8_e5m2-text-enc",
					description: "Store text encoder weights in fp8 (e5m2 variant).",
					type: "CheckBox"
				},
				{
					name: "--fp16-text-enc",
					description: "Store text encoder weights in fp16.",
					type: "CheckBox"
				},
				{
					name: "--fp32-text-enc",
					description: "Store text encoder weights in fp32.",
					type: "CheckBox"
				},
				{
					name: "--bf16-text-enc",
					description: "Store text encoder weights in bf16.",
					type: "CheckBox"
				},
				{
					name: "--fp16-intermediates",
					description: "Experimental: Use fp16 for intermediate tensors between nodes instead of fp32.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Optimizations",
			items: [
				{
					name: "--force-channels-last",
					description: "Force channels last format when inferencing the models.",
					type: "CheckBox"
				},
				{
					name: "--directml",
					description: "Use torch-directml.",
					type: "Input"
				},
				{
					name: "--enable-triton-backend",
					description: "ComfyUI will enable the use of Triton backend in comfy-kitchen. Is disabled at launch by default.",
					type: "CheckBox"
				},
				{
					name: "--disable-triton-backend",
					description: "Force-disable the comfy-kitchen Triton backend, overriding the automatic ROCm/AMD default and --enable-triton-backend.",
					type: "CheckBox"
				},
				{
					name: "--preview-method",
					description: "Default preview method for sampler nodes.",
					type: "DropDown",
					values: [
						"none",
						"auto",
						"latent2rgb",
						"taesd"
					],
					defaultValue: "none"
				},
				{
					name: "--preview-size",
					description: "Sets the maximum preview size for sampler nodes.",
					type: "Input",
					defaultValue: 512
				},
				{
					name: "--cache-classic",
					description: "Use the old style (aggressive) caching.",
					type: "CheckBox"
				},
				{
					name: "--cache-lru",
					description: "Use LRU caching with a maximum of N node results cached. May use more RAM/VRAM.",
					type: "Input",
					defaultValue: 0
				},
				{
					name: "--cache-none",
					description: "Reduced RAM/VRAM usage at the expense of executing every node for each run.",
					type: "CheckBox"
				},
				{
					name: "--cache-ram",
					description: "Use RAM pressure caching with the specified headroom thresholds. This is the default caching mode. The first value sets the active-cache threshold; the optional second value sets the inactive-cache/pin threshold. Defaults when no values are provided: active 10% of system RAM (min 2GB, max 10GB), inactive 100% of system RAM (max 96GB).",
					type: "Input"
				},
				{
					name: "--high-ram",
					description: "Can improve performance slightly on high RAM or on systems where pagefile use is preferred over model loading.",
					type: "CheckBox"
				},
				{
					name: "--use-split-cross-attention",
					description: "Use the split cross attention optimization. Ignored when xformers is used.",
					type: "CheckBox"
				},
				{
					name: "--use-quad-cross-attention",
					description: "Use the sub-quadratic cross attention optimization. Ignored when xformers is used.",
					type: "CheckBox"
				},
				{
					name: "--use-pytorch-cross-attention",
					description: "Use the new pytorch 2.0 cross attention function.",
					type: "CheckBox"
				},
				{
					name: "--use-sage-attention",
					description: "Use sage attention.",
					type: "CheckBox"
				},
				{
					name: "--use-flash-attention",
					description: "Use FlashAttention.",
					type: "CheckBox"
				},
				{
					name: "--disable-xformers",
					description: "Disable xformers.",
					type: "CheckBox"
				},
				{
					name: "--force-upcast-attention",
					description: "Force enable attention upcasting, please report if it fixes black images.",
					type: "CheckBox"
				},
				{
					name: "--dont-upcast-attention",
					description: "Disable all upcasting of attention. Should be unnecessary except for debugging.",
					type: "CheckBox"
				},
				{
					name: "--force-non-blocking",
					description: "Force ComfyUI to use non-blocking operations for all applicable tensors. This may improve performance on some non-Nvidia systems but can cause issues with some workflows.",
					type: "CheckBox"
				},
				{
					name: "--fast",
					description: "Enable some untested and potentially quality deteriorating optimizations. This is used to test new features so using it might crash your comfyui. --fast with no arguments enables everything. You can pass a list specific optimizations if you only want to enable specific ones. Current valid optimizations: fp16_accumulation fp8_matrix_mult cublas_ops autotune",
					type: "DropDown",
					values: [
						"",
						"fp16_accumulation",
						"fp8_matrix_mult",
						"cublas_ops",
						"autotune"
					],
					defaultValue: ""
				}
			]
		},
		{
			section: "Miscellaneous",
			items: [
				{
					name: "--enable-manager",
					description: "Enable the ComfyUI-Manager feature.",
					type: "CheckBox"
				},
				{
					name: "--disable-manager-ui",
					description: "Disables only the ComfyUI-Manager UI and endpoints. Scheduled installations and similar background tasks will still operate.",
					type: "CheckBox"
				},
				{
					name: "--enable-manager-legacy-ui",
					description: "Enables the legacy UI of ComfyUI-Manager. Implies --enable-manager.",
					type: "CheckBox"
				},
				{
					name: "--default-hashing-function",
					description: "Allows you to choose the hash function to use for duplicate filename / contents comparison. Default is sha256.",
					type: "DropDown",
					defaultValue: "sha256",
					values: [
						"md5",
						"sha1",
						"sha256",
						"sha512"
					]
				},
				{
					name: "--deterministic",
					description: "Make pytorch use slower deterministic algorithms when it can. Note that this might not make images deterministic in all cases.",
					type: "CheckBox"
				},
				{
					name: "--mmap-torch-files",
					description: "Use mmap when loading ckpt/pt files.",
					type: "CheckBox"
				},
				{
					name: "--disable-mmap",
					description: "Don't use mmap when loading safetensors.",
					type: "CheckBox"
				},
				{
					name: "--dont-print-server",
					description: "Don't print server output.",
					type: "CheckBox"
				},
				{
					name: "--debug-hang",
					description: "Enable stack trace dumps on Ctrl-C for debugging hangs.",
					type: "CheckBox"
				},
				{
					name: "--quick-test-for-ci",
					description: "Quick test for CI.",
					type: "CheckBox"
				},
				{
					name: "--windows-standalone-build",
					description: "Windows standalone build: Enable convenient things that most people using the standalone windows build will probably enjoy (like auto opening the page on startup).",
					type: "CheckBox"
				},
				{
					name: "--disable-metadata",
					description: "Disable saving prompt metadata in files.",
					type: "CheckBox"
				},
				{
					name: "--disable-all-custom-nodes",
					description: "Disable loading all custom nodes.",
					type: "CheckBox"
				},
				{
					name: "--whitelist-custom-nodes",
					description: "Specify custom node folders to load even when --disable-all-custom-nodes is enabled.",
					type: "Input"
				},
				{
					name: "--multi-user",
					description: "Enables per-user storage.",
					type: "CheckBox"
				},
				{
					name: "--verbose",
					description: "Set the logging level",
					type: "DropDown",
					defaultValue: "INFO",
					values: [
						"DEBUG",
						"INFO",
						"WARNING",
						"ERROR",
						"CRITICAL"
					]
				},
				{
					name: "--log-stdout",
					description: "Send normal process output to stdout instead of stderr (default).",
					type: "CheckBox"
				},
				{
					name: "--enable-assets",
					description: "Enable the assets system (API routes, database synchronization, and background scanning).",
					type: "CheckBox"
				},
				{
					name: "--enable-asset-hashing",
					description: "Compute blake3 content hashes when scanning assets. Hashing enables future asset-portability features (deduplication, cross-machine model resolution) but adds startup cost and per-output cost on large models directories. Off by default; enable to opt in.",
					type: "CheckBox"
				},
				{
					name: "--feature-flag",
					description: "Set a server feature flag. Use KEY=VALUE to set an explicit value, or bare KEY to set it to true. Can be specified multiple times. Boolean values (true/false) and numbers are auto-converted. Examples: --feature-flag show_signin_button=true or --feature-flag show_signin_button",
					type: "Input"
				},
				{
					name: "--list-feature-flags",
					description: "Print the registry of known CLI-settable feature flags as JSON and exit.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Memory Management",
			items: [
				{
					name: "--gpu-only",
					description: "Store and run everything (text encoders/CLIP models, etc... on the GPU).",
					type: "CheckBox"
				},
				{
					name: "--highvram",
					description: "By default models will be unloaded to CPU memory after being used. This option keeps them in GPU memory.",
					type: "CheckBox"
				},
				{
					name: "--lowvram",
					description: "Doesn't do anything if dynamic vram is enabled. If dynamic vram isn't being used this option makes the text encoders run on the CPU.",
					type: "CheckBox"
				},
				{
					name: "--novram",
					description: "When lowvram isn't enough.",
					type: "CheckBox"
				},
				{
					name: "--cpu",
					description: "To use the CPU for everything (slow).",
					type: "CheckBox"
				},
				{
					name: "--reserve-vram",
					description: "Set the amount of vram in GB you want to reserve for use by your OS/other software. By default some amount is reserved depending on your OS.",
					type: "Input"
				},
				{
					name: "--vram-headroom",
					description: "Set the amount of vram in GB for DynamicVRAM to maintain as extra headroom above default. ComfyUI will try and keep this much VRAM completely free and unused, even counting VRAM from other apps.",
					type: "Input",
					defaultValue: 0
				},
				{
					name: "--async-offload",
					description: "Use async weight offloading. An optional argument controls the amount of offload streams. Default is 2. Enabled by default on Nvidia.",
					type: "Input"
				},
				{
					name: "--disable-async-offload",
					description: "Disable async weight offloading.",
					type: "CheckBox"
				},
				{
					name: "--disable-dynamic-vram",
					description: "Disable dynamic VRAM and use estimate based model loading.",
					type: "CheckBox"
				},
				{
					name: "--enable-dynamic-vram",
					description: "Enable dynamic VRAM on systems where it's not enabled by default.",
					type: "CheckBox"
				},
				{
					name: "--fast-disk",
					description: "Prefer disk-backed dynamic loading and offload over unpinned RAM. Can be faster for users with fast NVME disks.",
					type: "CheckBox"
				},
				{
					name: "--disable-smart-memory",
					description: "Force ComfyUI to agressively offload to regular ram instead of keeping models in vram when it can.",
					type: "CheckBox"
				},
				{
					name: "--disable-pinned-memory",
					description: "Disable pinned memory use.",
					type: "CheckBox"
				},
				{
					name: "--database-url",
					description: "Specify the database URL, e.g. for an in-memory database you can use 'sqlite:///:memory:'.",
					type: "Input"
				}
			]
		}
	]
}, {
	category: "Environment Variables",
	items: [
		{
			name: "HSA_OVERRIDE_GFX_VERSION",
			description: "Override GFX version for unsupported AMD GPUs. Use \"10.3.0\" for 6700, 6600 and other RDNA2 or older cards. Use \"11.0.0\" for 7600 and other RDNA3 cards.",
			type: "Input",
			defaultValue: "11.0.0"
		},
		{
			name: "TORCH_ROCM_AOTRITON_ENABLE_EXPERIMENTAL",
			description: "Enable experimental memory efficient attention on AMD GPUs. Should already be enabled by default on RDNA3.",
			type: "Input",
			defaultValue: "1"
		},
		{
			name: "PYTORCH_TUNABLEOP_ENABLED",
			description: "Enable PyTorch tunable operations which might speed things up at the cost of a very slow initial run.",
			type: "Input",
			defaultValue: "1"
		},
		{
			name: "MIOPEN_FIND_MODE",
			description: "Set the MIOpen find mode to accelerate find API calls. NORMAL: Full find (benchmarks all solvers). FAST: Uses FindDb or fallback (fast startup, may reduce performance). HYBRID: Uses FindDb or full find on miss (balanced). DYNAMIC_HYBRID: Uses FindDb or find skipping non-dynamic kernels (faster than hybrid, default). TRUST_VERIFY: Uses FindDb with verification and constrained tuning. TRUST_VERIFY_FULL: Same as TRUST_VERIFY with no tuning time limits.",
			type: "DropDown",
			values: [
				"NORMAL",
				"FAST",
				"HYBRID",
				"DYNAMIC_HYBRID",
				"TRUST_VERIFY",
				"TRUST_VERIFY_FULL"
			],
			defaultValue: "DYNAMIC_HYBRID"
		},
		{
			name: "MIOPEN_LOG_LEVEL",
			description: "Controls verbosity of MIOpen internal operation logging. 0: Default (level 4 for release, level 5 for debug). 1: Quiet (no logging). 3: Errors including fatal errors. 4: All errors and warnings. 5: Info level debugging. 6: Detailed debugging. 7: Trace level with additional details.",
			type: "DropDown",
			values: [
				"0",
				"1",
				"3",
				"4",
				"5",
				"6",
				"7"
			],
			defaultValue: "0"
		},
		{
			name: "MIOPEN_ENABLE_LOGGING",
			description: "Prints basic layer-by-layer MIOpen API call information with parameters and configurations.",
			type: "DropDown",
			values: ["0", "1"],
			defaultValue: "0"
		},
		{
			name: "MIOPEN_ENABLE_LOGGING_CMD",
			description: "Outputs associated MIOpenDriver command lines to console for debugging.",
			type: "DropDown",
			values: ["0", "1"],
			defaultValue: "0"
		},
		{
			name: "MIOPEN_FIND_ENFORCE",
			description: "Controls auto-tune behavior and database updates. NONE: No change in default behavior. DB_UPDATE: Always perform auto-tune and update PerfDb. SEARCH: Auto-tune even if not requested via API. SEARCH_DB_UPDATE: Combination of DB_UPDATE and SEARCH. DB_CLEAN: Remove optimized values from User PerfDb.",
			type: "DropDown",
			values: [
				"NONE",
				"DB_UPDATE",
				"SEARCH",
				"SEARCH_DB_UPDATE",
				"DB_CLEAN"
			],
			defaultValue: "NONE"
		},
		{
			name: "MIOPEN_DEBUG_DISABLE_FIND_DB",
			description: "Disables FindDb functionality. Set to 1 to disable, 0 or unset to enable.",
			type: "DropDown",
			values: ["0", "1"],
			defaultValue: "0"
		},
		{
			name: "MIOPEN_COMPILE_PARALLEL_LEVEL",
			description: "Controls parallel compilation thread count for Find() calls. Default: 1 when using COMGR, otherwise half the number of available hardware threads. Set to 1 to disable multi-threaded compilation.",
			type: "Input"
		},
		{
			name: "MIOPEN_DEBUG_CONVOLUTION_DETERMINISTIC",
			description: "Controls deterministic convolution behavior. Set to 1 to enable deterministic algorithms (slower but reproducible results).",
			type: "DropDown",
			values: ["0", "1"],
			defaultValue: "0"
		}
	]
}];
//#endregion
//#region module/src/containers/image/ComfyUi/RendererMethods.ts
const COMFYUI_URL = "https://github.com/Comfy-Org/ComfyUI";
function isEnvironmentVariable$1(name) {
	for (const arg of comfyuiArguments) if (arg.category === "Environment Variables") {
		if ("items" in arg) return arg.items.some((item) => item.name === name);
	}
	return false;
}
function parseArgsToString$13(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let argResult = "";
	let lines = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else if (isEnvironmentVariable$1(arg.name)) {
			if (getArgumentType(arg.name, comfyuiArguments) === "CheckBox") lines += isWin ? `set ${arg.name}=true\n` : `export ${arg.name}="true"\n`;
			else lines += isWin ? `set ${arg.name}=${arg.value}\n` : `export ${arg.name}="${arg.value}"\n`;
		} else {
			const argType = getArgumentType(arg.name, comfyuiArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	const pythonCommand = getPythonCommandByOs().python;
	result += isEmpty(argResult) ? `${pythonCommand} main.py` : `${pythonCommand} main.py ${argResult}`;
	return result;
}
function parseStringToArgs$13(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("#")) return;
		if (line.startsWith("export ") || line.startsWith("set ")) {
			const prefix = line.startsWith("export ") ? "export " : "set ";
			let [name, value] = line.replace(prefix, "").split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, comfyuiArguments) && isEnvironmentVariable$1(name)) argResult.push({
				name,
				value
			});
			return;
		}
		const pythonCommand = getPythonCommandByOs().python;
		if (!line.startsWith(`${pythonCommand} main.py`)) return;
		const clArgs = line.split(`${pythonCommand} main.py `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, comfyuiArguments)) {
				if (getArgumentType(value.name, comfyuiArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
function startInstall$13(stepper) {
	const selectOptions = [
		"NONE",
		"NVIDIA CU130",
		"NVIDIA CU132 Nightly",
		"AMD GPUs (Windows and Linux) RDNA 3 (RX 7000 series)",
		"AMD GPUs (Windows and Linux) RDNA 3.5 (Strix halo/Ryzen AI Max+ 365)",
		"AMD GPUs (Windows and Linux) RDNA 4 (RX 9000 series)",
		"AMD GPUs (Linux only) ROCm 7.2",
		"AMD GPUs (Linux only) ROCm 7.2 Nightly",
		"Mac Apple silicon",
		"Mac Apple silicon (Conda)",
		"Mac x86 (Conda)",
		"Intel GPUs (Windows and Linux)",
		"Intel GPUs Nightly (Windows and Linux)"
	];
	const getPyTorchInstallCommand = (selectedOption) => {
		switch (selectedOption) {
			case "Mac Apple silicon": return "pip3 install --pre torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/nightly/cpu";
			case "Mac Apple silicon (Conda)": return "conda install pytorch torchvision torchaudio -c pytorch-nightly";
			case "Mac x86 (Conda)": return "conda install pytorch torchvision torchaudio -c pytorch-nightly";
			case "AMD GPUs (Linux only) ROCm 7.2": return "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2";
			case "AMD GPUs (Linux only) ROCm 7.2 Nightly": return "pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/rocm7.2";
			case "AMD GPUs (Windows and Linux) RDNA 3 (RX 7000 series)": return "pip install --pre torch torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2/gfx110X-all/";
			case "AMD GPUs (Windows and Linux) RDNA 3.5 (Strix halo/Ryzen AI Max+ 365)": return "pip install --pre torch torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2/gfx1151/";
			case "AMD GPUs (Windows and Linux) RDNA 4 (RX 9000 series)": return "pip install --pre torch torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2/gfx120X-all/";
			case "Intel GPUs (Windows and Linux)": return "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/xpu";
			case "Intel GPUs Nightly (Windows and Linux)": return "pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/xpu";
			default:
			case "NVIDIA CU130": return "pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu130";
			case "NVIDIA CU132 Nightly": return "pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu132";
		}
	};
	const installReqs = (dir) => {
		stepper.executeTerminalCommands(["pip install -r requirements.txt", "pip install -r manager_requirements.txt"], dir).then(() => {
			stepper.setInstalled(dir);
			stepper.postInstall.config({ customArguments: {
				presetName: "Lynx Config",
				customArguments: [{
					name: "--enable-manager",
					value: ""
				}]
			} });
			stepper.showFinalStep("success", "ComfyUI installation complete!", "All installation steps completed successfully. Your ComfyUI environment is now ready for use.");
		});
	};
	const getMacCondaInstallCommand = (selectedOption) => {
		switch (selectedOption) {
			case "Mac x86 (Conda)": return ["curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh", "sh Miniconda3-latest-MacOSX-x86_64.sh"];
			default: return ["curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh", "sh Miniconda3-latest-MacOSX-arm64.sh"];
		}
	};
	stepper.initialSteps([
		"ComfyUI",
		"Clone",
		"PyTorch Version",
		"Install PyTorch",
		"Install Dependencies",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(COMFYUI_URL).then((dir) => {
				stepper.nextStep().then(() => {
					stepper.collectUserInput([{
						id: "gpu_type",
						type: "select",
						label: "Please Select PyTorch Version (Gpu)",
						selectOptions,
						defaultValue: selectOptions[0],
						isRequired: true
					}]).then((result) => {
						const selectedOption = result[0].result;
						if (selectedOption === "NONE") stepper.nextStep().then(() => {
							stepper.nextStep().then(() => {
								installReqs(dir);
							});
						});
						else if (selectedOption === "Mac x86 (Conda)" || selectedOption === "Mac Apple silicon (Conda)") stepper.ipc.invoke("Comfy_isCondaInstalled").then((isInstalled) => {
							if (isInstalled) stepper.nextStep().then(() => {
								stepper.executeTerminalCommands(getPyTorchInstallCommand(selectedOption), dir).then(() => {
									stepper.nextStep().then(() => {
										installReqs(dir);
									});
								});
							});
							else {
								stepper.initialSteps([
									"ComfyUI",
									"Clone",
									"PyTorch Version",
									"Conda",
									"Install PyTorch",
									"Dependencies",
									"Finish"
								]);
								stepper.nextStep().then(() => {
									stepper.executeTerminalCommands(getMacCondaInstallCommand(selectedOption), dir).then(() => {
										stepper.nextStep().then(() => {
											stepper.executeTerminalCommands(getPyTorchInstallCommand(selectedOption), dir).then(() => {
												stepper.nextStep().then(() => {
													installReqs(dir);
												});
											});
										});
									});
								});
							}
						});
						else stepper.nextStep().then(() => {
							stepper.executeTerminalCommands(getPyTorchInstallCommand(selectedOption), dir).then(() => {
								stepper.nextStep().then(() => {
									installReqs(dir);
								});
							});
						});
					});
				});
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, COMFYUI_URL).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "ComfyUI located successfully!", "Pre-installed ComfyUI detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.utils.verifyFilesExist(targetDirectory, ["comfy", "main.py"]).then((filesExist) => {
				if (filesExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", `ComfyUI located successfully!`, "Detected a manual installation of ComfyUI. Note: Because this is not a Git repository, automatic updates and certain version-dependent features may not work as expected.");
				} else stepper.showFinalStep("error", "Unable to locate ComfyUI!", "Please ensure you have selected the correct folder containing the ComfyUI installation ");
			});
		});
	});
}
async function cardInfo$13(api, callback) {
	return CardInfo(COMFYUI_URL, "/custom_nodes", api, callback);
}
const COMFYUI_RM = {
	catchAddress: catchAddress$5,
	parseArgsToString: parseArgsToString$13,
	parseStringToArgs: parseStringToArgs$13,
	cardInfo: cardInfo$13,
	manager: {
		startInstall: startInstall$13,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/image/ComfyUiRocm/Arguments.ts
const comfyRocmArguments = [{
	category: "Environment Variables",
	items: [
		{
			name: "MIOPEN_FIND_MODE",
			description: "MIOpen find mode for AMD GPUs.",
			type: "Input",
			defaultValue: "2"
		},
		{
			name: "MIOPEN_LOG_LEVEL",
			description: "MIOpen log level for AMD GPUs.",
			type: "Input",
			defaultValue: "0"
		},
		{
			name: "PYTHON",
			description: "Sets a custom path for Python executable.",
			type: "File",
			defaultValue: "\"%~dp0/python_env/python.exe\""
		},
		{
			name: "GIT",
			description: "Sets a custom path for Git executable. Leave empty to use system Git.",
			type: "File",
			defaultValue: ""
		},
		{
			name: "VENV_DIR",
			description: "Specifies the path for the virtual environment/python directory.",
			type: "Directory",
			defaultValue: "./python_env"
		},
		{
			name: "TRITON_OVERRIDE_ARCH",
			description: "Override GPU architecture for Triton (e.g., gfx1030, gfx1100). Find yours at https://llvm.org/docs/AMDGPUUsage.html#processors",
			type: "Input",
			defaultValue: ""
		},
		{
			name: "COMFYUI_ENABLE_MIOPEN",
			description: "Enable MIOpen in ComfyUI.",
			type: "Input",
			defaultValue: "0"
		},
		{
			name: "FLASH_ATTENTION_TRITON_AMD_ENABLE",
			description: "Enable Flash Attention Triton AMD backend.",
			type: "Input",
			defaultValue: "TRUE"
		},
		{
			name: "PYTORCH_TUNABLEOP_ENABLED",
			description: "Enable PyTorch TunableOp optimization.",
			type: "Input",
			defaultValue: "1"
		},
		{
			name: "PYTORCH_TUNABLEOP_VERBOSE",
			description: "Enable verbose logging for PyTorch TunableOp.",
			type: "Input",
			defaultValue: "1"
		},
		{
			name: "PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED",
			description: "Enable hipBLASLt in PyTorch TunableOp.",
			type: "Input",
			defaultValue: "0"
		}
	]
}, {
	category: "Command Line Arguments",
	sections: [
		{
			section: "Network",
			items: [
				{
					name: "--listen",
					description: "Specify the IP address to listen on (default: 127.0.0.1). You can give a list of ip addresses by separating them with a comma like: 127.2.2.2,127.3.3.3 If --listen is provided without an argument, it defaults to 0.0.0.0,:: (listens on all ipv4 and ipv6)",
					type: "Input",
					defaultValue: "127.0.0.1"
				},
				{
					name: "--port",
					description: "Set the listen port.",
					type: "Input",
					defaultValue: 8188
				},
				{
					name: "--tls-keyfile",
					description: "Path to TLS (SSL) key file. Enables TLS, makes app accessible at https://... requires --tls-certfile to function",
					type: "File"
				},
				{
					name: "--tls-certfile",
					description: "Path to TLS (SSL) certificate file. Enables TLS, makes app accessible at https://... requires --tls-keyfile to function",
					type: "File"
				},
				{
					name: "--enable-cors-header",
					description: "Enable CORS (Cross-Origin Resource Sharing) with optional origin or allow all with default '*'.",
					type: "Input"
				},
				{
					name: "--max-upload-size",
					description: "Set the maximum upload size in MB.",
					type: "Input",
					defaultValue: 100
				},
				{
					name: "--supports-fp8-compute",
					description: "ComfyUI will act like if the device supports fp8 compute.",
					type: "CheckBox"
				},
				{
					name: "--disable-api-nodes",
					description: "Disable loading all api nodes. Also prevents the frontend from communicating with the internet.",
					type: "CheckBox"
				},
				{
					name: "--enable-compress-response-body",
					description: "Enable compressing response body.",
					type: "CheckBox"
				},
				{
					name: "--comfy-api-base",
					description: "Set the base URL for the ComfyUI API. (default: https://api.comfy.org)",
					type: "Input",
					defaultValue: "https://api.comfy.org"
				}
			]
		},
		{
			section: "Paths",
			items: [
				{
					name: "--base-directory",
					description: "Set the ComfyUI base directory for models, custom_nodes, input, output, temp, and user directories.",
					type: "Directory"
				},
				{
					name: "--extra-model-paths-config",
					description: "Load one or more extra_model_paths.yaml files.",
					type: "File"
				},
				{
					name: "--output-directory",
					description: "Set the ComfyUI output directory. Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--temp-directory",
					description: "Set the ComfyUI temp directory (default is in the ComfyUI directory). Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--input-directory",
					description: "Set the ComfyUI input directory. Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--user-directory",
					description: "Set the ComfyUI user directory with an absolute path. Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--models-directory",
					description: "Set the ComfyUI models directory. Overrides the models folder in --base-directory.",
					type: "Directory"
				},
				{
					name: "--front-end-root",
					description: "The local filesystem path to the directory where the frontend is located. Overrides --front-end-version.",
					type: "Directory"
				}
			]
		},
		{
			section: "Execution",
			items: [
				{
					name: "--auto-launch",
					description: "Automatically launch ComfyUI in the default browser.",
					type: "CheckBox"
				},
				{
					name: "--disable-auto-launch",
					description: "Disable auto launching the browser.",
					type: "CheckBox"
				},
				{
					name: "--cuda-device",
					description: "Set the ids of cuda devices this instance will use, as a comma-separated list (e.g. '0' or '0,1'). All other devices will not be visible.",
					type: "Input"
				},
				{
					name: "--default-device",
					description: "Set the id of the default device, all other devices will stay visible.",
					type: "Input"
				}
			]
		},
		{
			section: "Precision",
			items: [
				{
					name: "--force-fp32",
					description: "Force fp32 (If this makes your GPU work better please report it).",
					type: "CheckBox"
				},
				{
					name: "--force-fp16",
					description: "Force fp16.",
					type: "CheckBox"
				},
				{
					name: "--fp32-unet",
					description: "Run the diffusion model in fp32.",
					type: "CheckBox"
				},
				{
					name: "--fp64-unet",
					description: "Run the diffusion model in fp64.",
					type: "CheckBox"
				},
				{
					name: "--bf16-unet",
					description: "Run the diffusion model in bf16.",
					type: "CheckBox"
				},
				{
					name: "--fp16-unet",
					description: "Run the diffusion model in fp16",
					type: "CheckBox"
				},
				{
					name: "--fp8_e4m3fn-unet",
					description: "Store unet weights in fp8_e4m3fn.",
					type: "CheckBox"
				},
				{
					name: "--fp8_e5m2-unet",
					description: "Store unet weights in fp8_e5m2.",
					type: "CheckBox"
				},
				{
					name: "--fp16-vae",
					description: "Run the VAE in fp16, might cause black images.",
					type: "CheckBox"
				},
				{
					name: "--fp32-vae",
					description: "Run the VAE in full precision fp32.",
					type: "CheckBox"
				},
				{
					name: "--bf16-vae",
					description: "Run the VAE in bf16.",
					type: "CheckBox"
				},
				{
					name: "--cpu-vae",
					description: "Run the VAE on the CPU.",
					type: "CheckBox"
				},
				{
					name: "--fp8_e4m3fn-text-enc",
					description: "Store text encoder weights in fp8 (e4m3fn variant).",
					type: "CheckBox"
				},
				{
					name: "--fp8_e5m2-text-enc",
					description: "Store text encoder weights in fp8 (e5m2 variant).",
					type: "CheckBox"
				},
				{
					name: "--fp16-text-enc",
					description: "Store text encoder weights in fp16.",
					type: "CheckBox"
				},
				{
					name: "--fp32-text-enc",
					description: "Store text encoder weights in fp32.",
					type: "CheckBox"
				},
				{
					name: "--bf16-text-enc",
					description: "Store text encoder weights in bf16.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Optimizations",
			items: [
				{
					name: "--enable-triton-backend",
					description: "ComfyUI will enable the use of Triton backend in comfy-kitchen. Is disabled at launch by default.",
					type: "CheckBox"
				},
				{
					name: "--disable-triton-backend",
					description: "Force-disable the comfy-kitchen Triton backend, overriding the automatic ROCm/AMD default and --enable-triton-backend.",
					type: "CheckBox"
				},
				{
					name: "--preview-method",
					description: "Default preview method for sampler nodes.",
					type: "DropDown",
					values: [
						"none",
						"auto",
						"latent2rgb",
						"taesd"
					],
					defaultValue: "auto"
				},
				{
					name: "--preview-size",
					description: "Sets the maximum preview size for sampler nodes.",
					type: "Input",
					defaultValue: 512
				},
				{
					name: "--cache-classic",
					description: "Use the old style (aggressive) caching.",
					type: "CheckBox"
				},
				{
					name: "--cache-lru",
					description: "Use LRU caching with a maximum of N node results cached. May use more RAM/VRAM.",
					type: "Input",
					defaultValue: 0
				},
				{
					name: "--cache-none",
					description: "Reduced RAM/VRAM usage at the expense of executing every node for each run.",
					type: "CheckBox"
				},
				{
					name: "--use-quad-cross-attention",
					description: "Use the sub-quadratic cross attention optimization.",
					type: "CheckBox"
				},
				{
					name: "--use-pytorch-cross-attention",
					description: "Use the new pytorch 2.0 cross attention function.",
					type: "CheckBox"
				},
				{
					name: "--use-sage-attention",
					description: "Use sage attention.",
					type: "CheckBox"
				},
				{
					name: "--use-flash-attention",
					description: "Use FlashAttention.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Memory Management",
			items: [
				{
					name: "--gpu-only",
					description: "Store and run everything (text encoders/CLIP models, etc... on the GPU).",
					type: "CheckBox"
				},
				{
					name: "--highvram",
					description: "By default models will be unloaded to CPU memory after being used. This option keeps them in GPU memory.",
					type: "CheckBox"
				},
				{
					name: "--lowvram",
					description: "Doesn't do anything if dynamic vram is enabled. If dynamic vram isn't being used this option makes the text encoders run on the CPU.",
					type: "CheckBox"
				},
				{
					name: "--novram",
					description: "When lowvram isn't enough.",
					type: "CheckBox"
				},
				{
					name: "--cpu",
					description: "To use the CPU for everything (slow).",
					type: "CheckBox"
				},
				{
					name: "--disable-smart-memory",
					description: "Force ComfyUI to agressively offload to regular ram instead of keeping models in vram when it can.",
					type: "CheckBox"
				},
				{
					name: "--disable-pinned-memory",
					description: "Disable pinned memory use.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Miscellaneous",
			items: [
				{
					name: "--enable-manager",
					description: "Enable the ComfyUI-Manager feature.",
					type: "CheckBox"
				},
				{
					name: "--disable-manager-ui",
					description: "Disables only the ComfyUI-Manager UI and endpoints. Scheduled installations and similar background tasks will still operate.",
					type: "CheckBox"
				},
				{
					name: "--enable-manager-legacy-ui",
					description: "Enables the legacy UI of ComfyUI-Manager. Implies --enable-manager.",
					type: "CheckBox"
				},
				{
					name: "--verbose",
					description: "Set the logging level",
					type: "DropDown",
					defaultValue: "INFO",
					values: [
						"DEBUG",
						"INFO",
						"WARNING",
						"ERROR",
						"CRITICAL"
					]
				}
			]
		}
	]
}];
//#endregion
//#region module/src/containers/image/ComfyUiZluda/Arguments.ts
const comfyuizludaArguments = [{
	category: "Environment Variables",
	items: [
		{
			name: "MIOPEN_FIND_MODE",
			description: "MIOpen find mode for AMD GPUs.",
			type: "Input",
			defaultValue: "2"
		},
		{
			name: "MIOPEN_LOG_LEVEL",
			description: "MIOpen log level for AMD GPUs.",
			type: "Input",
			defaultValue: "3"
		},
		{
			name: "PYTHON",
			description: "Sets a custom path for Python executable.",
			type: "File",
			defaultValue: "\"%~dp0/venv/Scripts/python.exe\""
		},
		{
			name: "GIT",
			description: "Sets a custom path for Git executable. Leave empty to use system Git.",
			type: "File",
			defaultValue: ""
		},
		{
			name: "VENV_DIR",
			description: "Specifies the path for the virtual environment. Default is venv. Special value - runs the script without creating virtual environment.",
			type: "Directory",
			defaultValue: "./venv"
		},
		{
			name: "TRITON_OVERRIDE_ARCH",
			description: "Override GPU architecture for Triton (e.g., gfx1030, gfx1031). Find yours at https://llvm.org/docs/AMDGPUUsage.html#processors",
			type: "Input",
			defaultValue: ""
		},
		{
			name: "ZLUDA_COMGR_LOG_LEVEL",
			description: "Zluda log level",
			type: "Input",
			defaultValue: "1"
		},
		{
			name: "PYTORCH_TUNABLEOP_ENABLED",
			description: "Enable PyTorch TunableOp optimization.",
			type: "Input",
			defaultValue: "1"
		},
		{
			name: "PYTORCH_TUNABLEOP_VERBOSE",
			description: "Enable verbose logging for PyTorch TunableOp.",
			type: "Input",
			defaultValue: "1"
		},
		{
			name: "PYTORCH_TUNABLEOP_HIPBLASLT_ENABLED",
			description: "Enable hipBLASLt in PyTorch TunableOp.",
			type: "Input",
			defaultValue: "0"
		}
	]
}, {
	category: "Command Line Arguments",
	sections: [
		{
			section: "Network",
			items: [
				{
					name: "--listen",
					description: "Specify the IP address to listen on (default: 127.0.0.1). You can give a list of ip addresses by separating them with a comma like: 127.2.2.2,127.3.3.3 If --listen is provided without an argument, it defaults to 0.0.0.0,:: (listens on all ipv4 and ipv6)",
					type: "Input",
					defaultValue: "127.0.0.1"
				},
				{
					name: "--port",
					description: "Set the listen port.",
					type: "Input",
					defaultValue: 8188
				},
				{
					name: "--tls-keyfile",
					description: "Path to TLS (SSL) key file. Enables TLS, makes app accessible at https://... requires --tls-certfile to function",
					type: "File"
				},
				{
					name: "--tls-certfile",
					description: "Path to TLS (SSL) certificate file. Enables TLS, makes app accessible at https://... requires --tls-keyfile to function",
					type: "File"
				},
				{
					name: "--enable-cors-header",
					description: "Enable CORS (Cross-Origin Resource Sharing) with optional origin or allow all with default '*'.",
					type: "Input"
				},
				{
					name: "--max-upload-size",
					description: "Set the maximum upload size in MB.",
					type: "Input",
					defaultValue: 100
				},
				{
					name: "--oneapi-device-selector",
					description: "Sets the oneAPI device(s) this instance will use.",
					type: "Input"
				},
				{
					name: "--supports-fp8-compute",
					description: "ComfyUI will act like if the device supports fp8 compute.",
					type: "CheckBox"
				},
				{
					name: "--disable-api-nodes",
					description: "Disable loading all api nodes. Also prevents the frontend from communicating with the internet.",
					type: "CheckBox"
				},
				{
					name: "--enable-compress-response-body",
					description: "Enable compressing response body.",
					type: "CheckBox"
				},
				{
					name: "--comfy-api-base",
					description: "Set the base URL for the ComfyUI API. (default: https://api.comfy.org)",
					type: "Input",
					defaultValue: "https://api.comfy.org"
				}
			]
		},
		{
			section: "Paths",
			items: [
				{
					name: "--base-directory",
					description: "Set the ComfyUI base directory for models, custom_nodes, input, output, temp, and user directories.",
					type: "Directory"
				},
				{
					name: "--extra-model-paths-config",
					description: "Load one or more extra_model_paths.yaml files.",
					type: "File"
				},
				{
					name: "--output-directory",
					description: "Set the ComfyUI output directory. Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--temp-directory",
					description: "Set the ComfyUI temp directory (default is in the ComfyUI directory). Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--input-directory",
					description: "Set the ComfyUI input directory. Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--user-directory",
					description: "Set the ComfyUI user directory with an absolute path. Overrides --base-directory.",
					type: "Directory"
				},
				{
					name: "--models-directory",
					description: "Set the ComfyUI models directory. Overrides the models folder in --base-directory.",
					type: "Directory"
				},
				{
					name: "--front-end-root",
					description: "The local filesystem path to the directory where the frontend is located. Overrides --front-end-version.",
					type: "Directory"
				}
			]
		},
		{
			section: "Execution",
			items: [
				{
					name: "--auto-launch",
					description: "Automatically launch ComfyUI in the default browser.",
					type: "CheckBox"
				},
				{
					name: "--disable-auto-launch",
					description: "Disable auto launching the browser.",
					type: "CheckBox"
				},
				{
					name: "--cuda-device",
					description: "Set the ids of cuda devices this instance will use, as a comma-separated list (e.g. '0' or '0,1'). All other devices will not be visible.",
					type: "Input"
				},
				{
					name: "--default-device",
					description: "Set the id of the default device, all other devices will stay visible.",
					type: "Input"
				},
				{
					name: "--cuda-malloc",
					description: "Enable cudaMallocAsync (enabled by default for torch 2.0 and up).",
					type: "CheckBox"
				},
				{
					name: "--disable-cuda-malloc",
					description: "Disable cudaMallocAsync.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Precision",
			items: [
				{
					name: "--force-fp32",
					description: "Force fp32 (If this makes your GPU work better please report it).",
					type: "CheckBox"
				},
				{
					name: "--force-fp16",
					description: "Force fp16.",
					type: "CheckBox"
				},
				{
					name: "--fp32-unet",
					description: "Run the diffusion model in fp32.",
					type: "CheckBox"
				},
				{
					name: "--fp64-unet",
					description: "Run the diffusion model in fp64.",
					type: "CheckBox"
				},
				{
					name: "--bf16-unet",
					description: "Run the diffusion model in bf16.",
					type: "CheckBox"
				},
				{
					name: "--fp16-unet",
					description: "Run the diffusion model in fp16",
					type: "CheckBox"
				},
				{
					name: "--fp8_e4m3fn-unet",
					description: "Store unet weights in fp8_e4m3fn.",
					type: "CheckBox"
				},
				{
					name: "--fp8_e5m2-unet",
					description: "Store unet weights in fp8_e5m2.",
					type: "CheckBox"
				},
				{
					name: "--fp8_e8m0fnu-unet",
					description: "Store unet weights in fp8_e8m0fnu.",
					type: "CheckBox"
				},
				{
					name: "--fp16-vae",
					description: "Run the VAE in fp16, might cause black images.",
					type: "CheckBox"
				},
				{
					name: "--fp32-vae",
					description: "Run the VAE in full precision fp32.",
					type: "CheckBox"
				},
				{
					name: "--bf16-vae",
					description: "Run the VAE in bf16.",
					type: "CheckBox"
				},
				{
					name: "--cpu-vae",
					description: "Run the VAE on the CPU.",
					type: "CheckBox"
				},
				{
					name: "--fp8_e4m3fn-text-enc",
					description: "Store text encoder weights in fp8 (e4m3fn variant).",
					type: "CheckBox"
				},
				{
					name: "--fp8_e5m2-text-enc",
					description: "Store text encoder weights in fp8 (e5m2 variant).",
					type: "CheckBox"
				},
				{
					name: "--fp16-text-enc",
					description: "Store text encoder weights in fp16.",
					type: "CheckBox"
				},
				{
					name: "--fp32-text-enc",
					description: "Store text encoder weights in fp32.",
					type: "CheckBox"
				},
				{
					name: "--bf16-text-enc",
					description: "Store text encoder weights in bf16.",
					type: "CheckBox"
				},
				{
					name: "--fp16-intermediates",
					description: "Experimental: Use fp16 for intermediate tensors between nodes instead of fp32.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Optimizations",
			items: [
				{
					name: "--force-channels-last",
					description: "Force channels last format when inferencing the models.",
					type: "CheckBox"
				},
				{
					name: "--directml",
					description: "Use torch-directml.",
					type: "Input"
				},
				{
					name: "--enable-triton-backend",
					description: "ComfyUI will enable the use of Triton backend in comfy-kitchen. Is disabled at launch by default.",
					type: "CheckBox"
				},
				{
					name: "--disable-triton-backend",
					description: "Force-disable the comfy-kitchen Triton backend, overriding the automatic ROCm/AMD default and --enable-triton-backend.",
					type: "CheckBox"
				},
				{
					name: "--preview-method",
					description: "Default preview method for sampler nodes.",
					type: "DropDown",
					values: [
						"none",
						"auto",
						"latent2rgb",
						"taesd"
					],
					defaultValue: "auto"
				},
				{
					name: "--preview-size",
					description: "Sets the maximum preview size for sampler nodes.",
					type: "Input",
					defaultValue: 512
				},
				{
					name: "--cache-classic",
					description: "Use the old style (aggressive) caching.",
					type: "CheckBox"
				},
				{
					name: "--cache-lru",
					description: "Use LRU caching with a maximum of N node results cached. May use more RAM/VRAM.",
					type: "Input",
					defaultValue: 0
				},
				{
					name: "--cache-none",
					description: "Reduced RAM/VRAM usage at the expense of executing every node for each run.",
					type: "CheckBox"
				},
				{
					name: "--cache-ram",
					description: "Use RAM pressure caching with the specified headroom thresholds. This is the default caching mode. The first value sets the active-cache threshold; the optional second value sets the inactive-cache/pin threshold. Defaults when no values are provided: active 10% of system RAM (min 2GB, max 10GB), inactive 100% of system RAM (max 96GB).",
					type: "Input",
					defaultValue: 0
				},
				{
					name: "--use-split-cross-attention",
					description: "Use the split cross attention optimization. Ignored when xformers is used.",
					type: "CheckBox"
				},
				{
					name: "--use-quad-cross-attention",
					description: "Use the sub-quadratic cross attention optimization . Ignored when xformers is used.",
					type: "CheckBox"
				},
				{
					name: "--use-pytorch-cross-attention",
					description: "Use the new pytorch 2.0 cross attention function.",
					type: "CheckBox"
				},
				{
					name: "--use-sage-attention",
					description: "Use sage attention.",
					type: "CheckBox"
				},
				{
					name: "--use-flash-attention",
					description: "Use FlashAttention.",
					type: "CheckBox"
				},
				{
					name: "--disable-xformers",
					description: "Disable xformers.",
					type: "CheckBox"
				},
				{
					name: "--force-upcast-attention",
					description: "Force enable attention upcasting, please report if it fixes black images.",
					type: "CheckBox"
				},
				{
					name: "--dont-upcast-attention",
					description: "Disable all upcasting of attention. Should be unnecessary except for debugging.",
					type: "CheckBox"
				},
				{
					name: "--force-non-blocking",
					description: "Force ComfyUI to use non-blocking operations for all applicable tensors. This may improve performance on some non-Nvidia systems but can cause issues with some workflows.",
					type: "CheckBox"
				},
				{
					name: "--fast",
					description: "Enable some untested and potentially quality deteriorating optimizations. This is used to test new features so using it might crash your comfyui. --fast with no arguments enables everything. You can pass a list specific optimizations if you only want to enable specific ones. Current valid optimizations: {}",
					type: "DropDown",
					values: [
						"",
						"fp16_accumulation",
						"fp8_matrix_mult",
						"cublas_ops",
						"autotune"
					],
					defaultValue: ""
				}
			]
		},
		{
			section: "Memory Management",
			items: [
				{
					name: "--gpu-only",
					description: "Store and run everything (text encoders/CLIP models, etc... on the GPU).",
					type: "CheckBox"
				},
				{
					name: "--highvram",
					description: "By default models will be unloaded to CPU memory after being used. This option keeps them in GPU memory.",
					type: "CheckBox"
				},
				{
					name: "--lowvram",
					description: "Doesn't do anything if dynamic vram is enabled. If dynamic vram isn't being used this option makes the text encoders run on the CPU.",
					type: "CheckBox"
				},
				{
					name: "--novram",
					description: "When lowvram isn't enough.",
					type: "CheckBox"
				},
				{
					name: "--cpu",
					description: "To use the CPU for everything (slow).",
					type: "CheckBox"
				},
				{
					name: "--enable-dynamic-vram",
					description: "Enable dynamic VRAM on systems where it's not enabled by default.",
					type: "CheckBox"
				},
				{
					name: "--disable-dynamic-vram",
					description: "Disable dynamic VRAM and use estimate based model loading.",
					type: "CheckBox"
				},
				{
					name: "--vram-headroom",
					description: "Set the amount of vram in GB for DynamicVRAM to maintain as extra headroom above default. ComfyUI will try and keep this much VRAM completely free and unused, even counting VRAM from other apps.",
					type: "Input",
					defaultValue: 0
				},
				{
					name: "--fast-disk",
					description: "Prefer disk-backed dynamic loading and offload over unpinned RAM. Can be faster for users with fast NVME disks.",
					type: "CheckBox"
				},
				{
					name: "--high-ram",
					description: "Can improve performance slightly on high RAM or on systems where pagefile use is preferred over model loading.",
					type: "CheckBox"
				},
				{
					name: "--reserve-vram",
					description: "Set the amount of vram in GB you want to reserve for use by your OS/other software. By default some amount is reserved depending on your OS.",
					type: "Input"
				},
				{
					name: "--async-offload",
					description: "Use async weight offloading. An optional argument controls the amount of offload streams. Default is 2. Enabled by default on Nvidia.",
					type: "Input"
				},
				{
					name: "--disable-async-offload",
					description: "Disable async weight offloading.",
					type: "CheckBox"
				},
				{
					name: "--disable-smart-memory",
					description: "Force ComfyUI to agressively offload to regular ram instead of keeping models in vram when it can.",
					type: "CheckBox"
				},
				{
					name: "--disable-pinned-memory",
					description: "Disable pinned memory use.",
					type: "CheckBox"
				},
				{
					name: "--database-url",
					description: "Specify the database URL, e.g. for an in-memory database you can use 'sqlite:///:memory:'.",
					type: "Input",
					defaultValue: ""
				}
			]
		},
		{
			section: "Miscellaneous",
			items: [
				{
					name: "--enable-manager",
					description: "Enable the ComfyUI-Manager feature.",
					type: "CheckBox"
				},
				{
					name: "--disable-manager-ui",
					description: "Disables only the ComfyUI-Manager UI and endpoints. Scheduled installations and similar background tasks will still operate.",
					type: "CheckBox"
				},
				{
					name: "--enable-manager-legacy-ui",
					description: "Enables the legacy UI of ComfyUI-Manager. Implies --enable-manager.",
					type: "CheckBox"
				},
				{
					name: "--enable-assets",
					description: "Enable the assets system (API routes, database synchronization, and background scanning).",
					type: "CheckBox"
				},
				{
					name: "--enable-asset-hashing",
					description: "Compute blake3 content hashes when scanning assets. Hashing enables future asset-portability features (deduplication, cross-machine model resolution) but adds startup cost and per-output cost on large models directories. Off by default; enable to opt in.",
					type: "CheckBox"
				},
				{
					name: "--feature-flag",
					description: "Set a server feature flag. Use KEY=VALUE to set an explicit value, or bare KEY to set it to true. Can be specified multiple times. Boolean values (true/false) and numbers are auto-converted.",
					type: "Input"
				},
				{
					name: "--list-feature-flags",
					description: "Print the registry of known CLI-settable feature flags as JSON and exit.",
					type: "CheckBox"
				},
				{
					name: "--debug-hang",
					description: "Enable stack trace dumps on Ctrl-C for debugging hangs.",
					type: "CheckBox"
				},
				{
					name: "--front-end-version",
					description: "Specifies the version of the frontend to be used. (default: comfyanonymous/ComfyUI@latest)",
					type: "Input",
					defaultValue: "comfyanonymous/ComfyUI@latest"
				},
				{
					name: "--default-hashing-function",
					description: "Allows you to choose the hash function to use for duplicate filename / contents comparison. Default is sha256.",
					type: "DropDown",
					defaultValue: "sha256",
					values: [
						"md5",
						"sha1",
						"sha256",
						"sha512"
					]
				},
				{
					name: "--deterministic",
					description: "Make pytorch use slower deterministic algorithms when it can. Note that this might not make images deterministic in all cases.",
					type: "CheckBox"
				},
				{
					name: "--mmap-torch-files",
					description: "Use mmap when loading ckpt/pt files.",
					type: "CheckBox"
				},
				{
					name: "--disable-mmap",
					description: "Don't use mmap when loading safetensors.",
					type: "CheckBox"
				},
				{
					name: "--dont-print-server",
					description: "Don't print server output.",
					type: "CheckBox"
				},
				{
					name: "--quick-test-for-ci",
					description: "Quick test for CI.",
					type: "CheckBox"
				},
				{
					name: "--windows-standalone-build",
					description: "Windows standalone build: Enable convenient things that most people using the standalone windows build will probably enjoy (like auto opening the page on startup).",
					type: "CheckBox"
				},
				{
					name: "--disable-metadata",
					description: "Disable saving prompt metadata in files.",
					type: "CheckBox"
				},
				{
					name: "--disable-all-custom-nodes",
					description: "Disable loading all custom nodes.",
					type: "CheckBox"
				},
				{
					name: "--whitelist-custom-nodes",
					description: "Specify custom node folders to load even when --disable-all-custom-nodes is enabled.",
					type: "Input",
					defaultValue: "[]"
				},
				{
					name: "--multi-user",
					description: "Enables per-user storage.",
					type: "CheckBox"
				},
				{
					name: "--verbose",
					description: "Set the logging level",
					type: "DropDown",
					defaultValue: "INFO",
					values: [
						"DEBUG",
						"INFO",
						"WARNING",
						"ERROR",
						"CRITICAL"
					]
				},
				{
					name: "--log-stdout",
					description: "Send normal process output to stdout instead of stderr (default).",
					type: "CheckBox"
				}
			]
		}
	]
}];
//#endregion
//#region module/src/containers/image/InvokeAi/utils/constants.ts
const Invoke_Command_CreateVenv = "uv venv --relocatable --prompt invoke --python 3.12 --python-preference only-managed .venv";
const Invoke_Command_ActivateVenv = isWin ? ".venv\\Scripts\\activate" : "source .venv/bin/activate";
const Invoke_Command_InstallPip = `${getPythonCommandByOs().python} -m ensurepip --upgrade`;
const Invoke_Command_InstallUV = isWin ? "powershell -ExecutionPolicy ByPass -c \"irm https://astral.sh/uv/install.ps1 | iex\"" : "wget -qO- https://astral.sh/uv/install.sh | sh";
const getTorchBackendForVersion = (version) => {
	const [major, minor] = version.split(".").map(Number);
	if (major >= 6) return {
		cuda: "cu128",
		rocm: "rocm7.1"
	};
	if (major === 5 && minor >= 12) return {
		cuda: "cu128",
		rocm: "rocm6.3"
	};
	if (major === 5 && minor >= 10 && minor <= 11) return {
		cuda: "cu126",
		rocm: "rocm6.2.4"
	};
	if (major === 5 && minor >= 0 && minor <= 9) return {
		cuda: "cu124",
		rocm: "rocm6.1"
	};
	if (major === 4) return {
		cuda: "cu124",
		rocm: "rocm5.2"
	};
	return {
		cuda: "cu128",
		rocm: "rocm7.1"
	};
};
const Invoke_PyPI = {
	cuda: "Windows or Linux with an Nvidia GPU",
	rocm: "Linux with an AMD GPU",
	cpu: "No GPU"
};
const Invoke_PackageSpec = {
	invokeai: "invokeai: Nvidia 30xx series GPU or newer, or do not have an Nvidia GPU",
	invokeaiXformers: "invokeai[xformers]:  Nvidia 20xx series GPU or older"
};
const INVOKEAI_INSTALL_TIME_KEY = "install-time-invokeai";
const INVOKEAI_INSTALL_DIR_KEY = "install-dir-invokeai";
const INVOKEAI_UPDATE_TIME_KEY = "update-time-invokeai";
const INVOKEAI_UPDATE_AVAILABLE_KEY = "update-version-invokeai";
const invokeGetInputFields = async (ipc) => {
	const releases = await ipc.invoke("invoke_latest_versions");
	return [
		{
			label: "Installation Directory",
			id: "install_dir",
			type: "directory",
			isRequired: true
		},
		{
			label: "InvokeAI Version",
			id: "invoke_version",
			type: "select",
			selectOptions: releases,
			defaultValue: releases[0],
			isRequired: true
		},
		{
			label: "Package Specifier",
			id: "package_spec",
			type: "select",
			selectOptions: [Invoke_PackageSpec.invokeai, Invoke_PackageSpec.invokeaiXformers],
			defaultValue: Invoke_PackageSpec.invokeai,
			isRequired: true
		},
		{
			label: "Torch Backend",
			id: "torch_backend",
			type: "select",
			selectOptions: [
				Invoke_PyPI.cuda,
				Invoke_PyPI.rocm,
				Invoke_PyPI.cpu,
				"Others"
			],
			defaultValue: Invoke_PyPI.cuda,
			isRequired: true
		}
	];
};
const invokeGetInputResults = (items) => {
	let installDirResult = "";
	let packageSpecResult = "";
	let torchBackendResult = "";
	let version = "";
	let torchBackendChoice = "";
	items.forEach((item) => {
		if (item.id === "install_dir") installDirResult = item.result;
		else if (item.id === "invoke_version") version = item.result;
		else if (item.id === "package_spec") switch (item.result) {
			case Invoke_PackageSpec.invokeaiXformers:
				packageSpecResult = "invokeai[xformers]";
				break;
			case Invoke_PackageSpec.invokeai:
			default: packageSpecResult = "invokeai";
		}
		else if (item.id === "torch_backend") torchBackendChoice = item.result;
	});
	console.log("the invoke version is", version);
	if (torchBackendChoice) {
		const backends = getTorchBackendForVersion(version);
		switch (torchBackendChoice) {
			case Invoke_PyPI.rocm:
				torchBackendResult = backends.rocm;
				break;
			case Invoke_PyPI.cuda:
				torchBackendResult = backends.cuda;
				break;
			case Invoke_PyPI.cpu:
				torchBackendResult = "cpu";
				break;
			default:
			case "Others": torchBackendResult = "";
		}
	}
	console.log("the torchBackendResult is", torchBackendResult);
	return {
		installDirResult,
		version,
		packageSpecResult,
		torchBackendResult
	};
};
const invokeGetInstallCommand = (items) => {
	const { version, torchBackendResult, packageSpecResult } = invokeGetInputResults(items);
	return `uv pip install ${packageSpecResult}==${version} --python 3.12 --python-preference only-managed${torchBackendResult ? ` --torch-backend=${torchBackendResult}` : ""} --force-reinstall`;
};
//#endregion
//#region module/src/containers/image/InvokeAi/RendererMethods.ts
function parseArgsToString$12(args) {
	let result = "schema_version: 4.0.2\n\n";
	const argResult = args.map((arg) => {
		return `${arg.name}: ${arg.value}`;
	}).join("\n");
	result += argResult;
	return result;
}
function parseStringToArgs$12(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("schema_version") || line.startsWith("#") || isEmpty(line.trim())) return;
		const [name, value] = line.split(`: `);
		argResult.push({
			name,
			value
		});
	});
	return argResult;
}
function startInstall$12(stepper) {
	stepper.initialSteps([
		"InvokeAI",
		"UV",
		"Config",
		"Install",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.progressBar(true, "Detecting UV installation...");
			stepper.ipc.invoke("is_uv_installed").then((isUvInstalled) => {
				if (!isUvInstalled) stepper.executeTerminalCommands(Invoke_Command_InstallUV).then(() => {
					stepper.showFinalStep("success", "UV Package Manager Installation Complete.", "Restart LynxHub and run the installer again to continue installation.");
				});
				else stepper.nextStep().then(() => {
					stepper.progressBar(true, "Fetching the latest InvokeAI versions...");
					invokeGetInputFields(stepper.ipc).then((fields) => {
						stepper.collectUserInput(fields).then((result) => {
							const { installDirResult } = invokeGetInputResults(result);
							const installCommand = invokeGetInstallCommand(result);
							stepper.nextStep().then(() => {
								stepper.executeTerminalCommands([
									Invoke_Command_CreateVenv,
									Invoke_Command_ActivateVenv,
									Invoke_Command_InstallPip,
									installCommand
								], installDirResult).then(() => {
									stepper.setInstalled(installDirResult);
									const currentDate = /* @__PURE__ */ new Date();
									stepper.storage.set(INVOKEAI_INSTALL_TIME_KEY, currentDate.toLocaleString());
									stepper.storage.set(INVOKEAI_INSTALL_DIR_KEY, installDirResult);
									stepper.showFinalStep("success", "InvokeAI Installation Complete.", "Your InvokeAI environment is ready. Enjoy!");
								});
							});
						});
					});
				});
			});
		});
		else stepper.ipc.invoke("validate_install_dir", targetDirectory).then((isValid) => {
			if (isValid === true) {
				stepper.setInstalled(targetDirectory);
				const currentDate = /* @__PURE__ */ new Date();
				stepper.storage.set(INVOKEAI_INSTALL_TIME_KEY, currentDate.toLocaleString());
				stepper.storage.set(INVOKEAI_INSTALL_DIR_KEY, targetDirectory);
				stepper.showFinalStep("success", "InvokeAI Environment Found.", "Location validated successfully.");
			} else {
				const description = typeof isValid === "string" ? isValid : "Could not find InvokeAI installation in the selected directory.";
				stepper.showFinalStep("error", "Invalid Environment!", description);
			}
		});
	});
}
function startUpdate$2(stepper, dir) {
	if (!dir) return;
	const pythonPath = getVenvPythonPath(isWin ? `${dir}\\.venv` : `${dir}/.venv`);
	stepper.initialSteps(["Updating", "Done"]);
	stepper.executeTerminalCommands(`${isWin ? "&" : "."} "${pythonPath}" -m pip install --upgrade "invokeai"`, dir).then(() => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(INVOKEAI_UPDATE_TIME_KEY, currentDate);
		stepper.setUpdated();
		stepper.showFinalStep("success", "InvokeAI Updated Successfully!", `InvokeAI has been updated to the latest version. You can now enjoy the new features and improvements.`);
	});
}
async function cardInfo$12(api, callback) {
	const dir = api.installationFolder;
	callback.setOpenFolders(dir ? [dir] : void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			},
			{
				label: "Latest Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INVOKEAI_INSTALL_TIME_KEY).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.storage.get(INVOKEAI_UPDATE_TIME_KEY).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.ipc.invoke("invoke_current_version").then((result) => {
		descManager.updateItem(0, 2, result);
	});
	api.storage.get(INVOKEAI_UPDATE_AVAILABLE_KEY).then((result) => {
		descManager.updateItem(0, 3, result);
	});
}
const INVOKE_RM = {
	catchAddress: catchAddress$5,
	cardInfo: cardInfo$12,
	parseArgsToString: parseArgsToString$12,
	parseStringToArgs: parseStringToArgs$12,
	manager: {
		startInstall: startInstall$12,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$2
		}
	}
};
//#endregion
//#region module/src/containers/image/SdAmdgpu/Arguments.ts
const lshqqytigerArguments = cloneDeep(automatic1111Arguments);
const newSection = {
	section: "AmdGPU",
	items: [
		{
			description: "Skip installation of onnxruntime; ONNX and Olive will be unavailable",
			name: "--skip-ort",
			type: "CheckBox"
		},
		{
			description: "use torch built with cpu",
			name: "--use-cpu-torch",
			type: "CheckBox"
		},
		{
			description: "use DirectML device as torch device",
			name: "--use-directml",
			type: "CheckBox"
		},
		{
			description: "use ZLUDA device as torch device",
			name: "--use-zluda",
			type: "CheckBox"
		},
		{
			description: "override torch version",
			name: "--override-torch",
			type: "Input"
		}
	]
};
const commandLineArgsIndex = lshqqytigerArguments.findIndex((arg) => arg.category === "Command Line Arguments");
if (commandLineArgsIndex !== -1 && lshqqytigerArguments[commandLineArgsIndex].sections) lshqqytigerArguments[commandLineArgsIndex].sections.unshift(newSection);
//#endregion
//#region module/src/containers/image/SdAmdgpu/RendererMethods.ts
const SdAMD_URL = "https://github.com/lshqqytiger/stable-diffusion-webui-amdgpu";
function startInstall$11(stepper) {
	GitInstaller("Stable Diffusion AMDGPU", SdAMD_URL, stepper, [isWin ? "webui-user.bat" : "webui.sh"]);
}
async function cardInfo$11(api, callback) {
	return CardInfo(SdAMD_URL, "/extensions", api, callback);
}
function getTypeByCategoryName(category) {
	switch (category) {
		case "Command Line Arguments": return "cl";
		case "Environment":
		case "Environment Variables": return "env";
		default: return;
	}
}
function getCategoryType$2(name) {
	if (!name) return void 0;
	for (const argument of lshqqytigerArguments) if ("sections" in argument) {
		for (const section of argument.sections) if (section.items.some((item) => item.name === name)) {
			if (section.section === "Variables") return "envVar";
			return getTypeByCategoryName(argument.category);
		}
	} else if (argument.items.some((item) => item.name === name)) return getTypeByCategoryName(argument.category);
}
function parseArgsToString$11(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let clResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) clResult += result.commandArg + " ";
		} else {
			const cat = getCategoryType$2(arg.name);
			if (cat !== "cl") {
				const eWinResult = `set ${arg.name}=${arg.value}\n`;
				const eResult = cat === "env" ? `export ${arg.name}="${arg.value}"\n` : `${arg.name}="${arg.value}"\n`;
				if (arg.name !== "COMMANDLINE_ARGS") result += isWin ? eWinResult : eResult;
			} else if (cat === "cl") {
				const argType = getArgumentType(arg.name, lshqqytigerArguments);
				if (argType === "CheckBox") clResult += `${arg.name} `;
				else if (argType === "File" || argType === "Directory") clResult += isWin ? `${arg.name} "${arg.value}" ` : `${arg.name} ${arg.value} `;
				else clResult += `${arg.name} ${arg.value} `;
			}
		}
	});
	if (lines) result += lines + "\n";
	if (!isEmpty(clResult)) result += isWin ? `set COMMANDLINE_ARGS=${clResult}\n` : `export COMMANDLINE_ARGS=${clResult}\n`;
	result += isWin ? `\ncall webui.bat` : ``;
	return result;
}
function checkLinuxArgLine$1(line) {
	if (isWin && line.startsWith("set ")) return "set";
	if (line.startsWith("export ")) return "export";
	for (const arg of lshqqytigerArguments) if (arg.category === "Environment") {
		if (arg.sections[0].items.find((item) => item.name === line.split("=")[0])) return "var";
		else return;
	}
}
function parseStringToArgs$11(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("#")) return;
		else if (line.startsWith(`${isWin ? "set" : "export"} COMMANDLINE_ARGS=`)) {
			argResult.push({
				name: "COMMANDLINE_ARGS",
				value: ""
			});
			const clArgs = line.split("=")[1];
			if (!clArgs) return;
			clArgs.split("--").filter(Boolean).map((arg) => {
				const [id, ...value] = arg.trim().split(" ");
				return {
					name: `--${id}`,
					value: value.join(" ").replace(/"/g, "")
				};
			}).forEach((value) => {
				if (isValidArg(value.name, lshqqytigerArguments)) {
					if (getArgumentType(value.name, lshqqytigerArguments) === "CheckBox") argResult.push({
						name: value.name,
						value: ""
					});
					else argResult.push({
						name: value.name,
						value: value.value
					});
				}
			});
		} else {
			const lineType = checkLinuxArgLine$1(line);
			if (lineType === "export" || lineType === "set") {
				let [name, value] = line.replace(`${lineType} `, "").split("=");
				name = removeEscapes(name.trim());
				value = removeEscapes(value.trim());
				if (isValidArg(name, lshqqytigerArguments)) argResult.push({
					name,
					value
				});
			} else if (checkLinuxArgLine$1(line) === "var") {
				let [name, value] = line.split("=");
				name = removeEscapes(name.trim());
				value = removeEscapes(value.trim());
				if (isValidArg(name, lshqqytigerArguments)) argResult.push({
					name,
					value
				});
			}
		}
	});
	return argResult;
}
const SD_AMD_RM = {
	catchAddress: catchAddress$5,
	fetchExtensionList: fetchExtensionList$2,
	parseArgsToString: parseArgsToString$11,
	parseStringToArgs: parseStringToArgs$11,
	cardInfo: cardInfo$11,
	manager: {
		startInstall: startInstall$11,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/image/SdNext/Arguments.ts
const vladmandicArguments = [{
	category: "Environment Variables",
	items: [{
		description: "Sets a custom path for Python executable.",
		name: "PYTHON",
		type: "File"
	}, {
		description: "Specifies the path for the virtual environment. Default is venv. Special value - runs the script without creating virtual environment.",
		name: "VENV_DIR",
		type: "Directory"
	}]
}, {
	category: "Command Line Arguments",
	sections: [
		{
			section: "Configuration",
			items: [
				{
					name: "--config",
					description: "Use specific server configuration file, default: config.json",
					type: "File"
				},
				{
					name: "--ui-config",
					description: "Use specific UI configuration file, default: ui-config.json",
					type: "File"
				},
				{
					name: "--medvram",
					description: "Split model stages and keep only active part in VRAM",
					type: "CheckBox"
				},
				{
					name: "--lowvram",
					description: "Split model components and keep only active part in VRAM",
					type: "CheckBox"
				},
				{
					name: "--freeze",
					description: "Disable editing settings",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Paths",
			items: [
				{
					name: "--ckpt",
					description: "Path to model checkpoint to load immediately",
					type: "File"
				},
				{
					name: "--data-dir",
					description: "Base path where all user data is stored",
					type: "Directory"
				},
				{
					name: "--models-dir",
					description: "Base path where all models are stored",
					type: "Directory"
				},
				{
					name: "--allowed-paths",
					description: "Add additional paths to paths allowed for web access",
					type: "Input"
				}
			]
		},
		{
			section: "Diagnostics",
			items: [
				{
					name: "--no-hashing",
					description: "Disable hashing of checkpoints",
					type: "CheckBox"
				},
				{
					name: "--no-metadata",
					description: "Disable reading of metadata from models",
					type: "CheckBox"
				},
				{
					name: "--disable-queue",
					description: "Disable queues",
					type: "CheckBox"
				},
				{
					name: "--device-id",
					description: "Select the default CUDA device to use",
					type: "Input"
				}
			]
		},
		{
			section: "HTTP",
			items: [
				{
					name: "--server-name",
					description: "Sets hostname of server",
					type: "Input"
				},
				{
					name: "--tls-keyfile",
					description: "Enable TLS and specify key file",
					type: "File"
				},
				{
					name: "--tls-certfile",
					description: "Enable TLS and specify cert file",
					type: "File"
				},
				{
					name: "--tls-selfsign",
					description: "Enable TLS with self-signed certificates",
					type: "CheckBox"
				},
				{
					name: "--cors-origins",
					description: "Allowed CORS origins as comma-separated list",
					type: "Input"
				},
				{
					name: "--cors-regex",
					description: "Allowed CORS origins as regular expression",
					type: "Input"
				},
				{
					name: "--subpath",
					description: "Customize the URL subpath for usage with reverse proxy",
					type: "Input"
				},
				{
					name: "--autolaunch",
					description: "Open the UI URL in the system's default browser upon launch",
					type: "CheckBox"
				},
				{
					name: "--auth",
					description: "Set access authentication like \"user:pwd,user:pwd\"",
					type: "Input"
				},
				{
					name: "--auth-file",
					description: "Set access authentication using file",
					type: "File"
				},
				{
					name: "--api-only",
					description: "Run in API only mode without starting UI",
					type: "CheckBox"
				},
				{
					name: "--share",
					description: "Enable UI accessible through Gradio site",
					type: "CheckBox"
				},
				{
					name: "--insecure",
					description: "Enable extensions tab regardless of other options",
					type: "CheckBox"
				},
				{
					name: "--listen",
					description: "Launch web server using public IP address",
					type: "CheckBox"
				},
				{
					name: "--port",
					description: "Launch web server with given server port",
					type: "Input",
					defaultValue: 7860
				}
			]
		},
		{
			section: "Setup",
			items: [
				{
					name: "--reset",
					description: "Reset main repository to latest version",
					type: "CheckBox"
				},
				{
					name: "--upgrade",
					description: "Upgrade main repository to latest version",
					type: "CheckBox"
				},
				{
					name: "--requirements",
					description: "Force re-check of requirements",
					type: "CheckBox"
				},
				{
					name: "--reinstall",
					description: "Force reinstallation of all requirements",
					type: "CheckBox"
				},
				{
					name: "--uv",
					description: "Use uv instead of pip to install the packages",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Startup",
			items: [
				{
					name: "--quick",
					description: "Bypass version checks",
					type: "CheckBox"
				},
				{
					name: "--skip-requirements",
					description: "Skips checking and installing requirements",
					type: "CheckBox"
				},
				{
					name: "--skip-extensions",
					description: "Skips running individual extension installers",
					type: "CheckBox"
				},
				{
					name: "--skip-git",
					description: "Skips running all GIT operations",
					type: "CheckBox"
				},
				{
					name: "--skip-torch",
					description: "Skips running Torch checks",
					type: "CheckBox"
				},
				{
					name: "--skip-all",
					description: "Skips running all checks",
					type: "CheckBox"
				},
				{
					name: "--skip-env",
					description: "Skips setting of env variables during startup",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Compute Engine",
			items: [
				{
					name: "--use-directml",
					description: "Use DirectML if no compatible GPU is detected",
					type: "CheckBox"
				},
				{
					name: "--use-openvino",
					description: "Use Intel OpenVINO backend",
					type: "CheckBox"
				},
				{
					name: "--use-ipex",
					description: "Force use Intel OneAPI XPU backend",
					type: "CheckBox"
				},
				{
					name: "--use-cuda",
					description: "Force use nVidia CUDA backend",
					type: "CheckBox"
				},
				{
					name: "--use-rocm",
					description: "Force use AMD ROCm backend",
					type: "CheckBox"
				},
				{
					name: "--use-zluda",
					description: "Force use ZLUDA, AMD GPUs only",
					type: "CheckBox"
				},
				{
					name: "--use-xformers",
					description: "Force use xFormers cross-optimization",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Diagnostics",
			items: [
				{
					name: "--safe",
					description: "Run in safe mode with no user extensions",
					type: "CheckBox"
				},
				{
					name: "--experimental",
					description: "Allow unsupported versions of libraries",
					type: "CheckBox"
				},
				{
					name: "--test",
					description: "Run test only and exit",
					type: "CheckBox"
				},
				{
					name: "--version",
					description: "Print version information",
					type: "CheckBox"
				},
				{
					name: "--ignore",
					description: "Ignore any errors and attempt to continue",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Logging",
			items: [
				{
					name: "--log",
					description: "Set log file",
					type: "File"
				},
				{
					name: "--debug",
					description: "Run installer with debug logging",
					type: "CheckBox"
				},
				{
					name: "--profile",
					description: "Run profiler",
					type: "CheckBox"
				},
				{
					name: "--monitor",
					description: "Monitor load and log in specific periods",
					type: "Input",
					defaultValue: 0
				},
				{
					name: "--docs",
					description: "Mount API docs",
					type: "CheckBox"
				},
				{
					name: "--api-log",
					description: "Enable logging of all API requests",
					type: "CheckBox"
				}
			]
		}
	]
}];
//#endregion
//#region module/src/containers/image/SdNext/RendererMethods.ts
const shellCommand$4 = isWin ? "call webui.bat" : "bash ./webui.sh";
const URL$4 = "https://github.com/vladmandic/sdnext";
function parseArgsToString$10(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let argResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else {
			const argType = getArgumentType(arg.name, vladmandicArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	result += isEmpty(argResult) ? shellCommand$4 : `${shellCommand$4} ${argResult}`;
	return result;
}
function parseStringToArgs$10(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (!line.startsWith(shellCommand$4)) return;
		const clArgs = line.split(`${shellCommand$4} `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, vladmandicArguments)) {
				if (getArgumentType(value.name, vladmandicArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
function startInstall$10(stepper) {
	GitInstaller("SD Next", URL$4, stepper, [isWin ? "webui.bat" : "webui.sh"]);
}
async function cardInfo$10(api, callback) {
	return CardInfo(URL$4, "/extensions", api, callback);
}
const SD_NEXT_RM = {
	catchAddress: catchAddress$5,
	fetchExtensionList: fetchExtensionList$2,
	parseArgsToString: parseArgsToString$10,
	parseStringToArgs: parseStringToArgs$10,
	cardInfo: cardInfo$10,
	manager: {
		startInstall: startInstall$10,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/image/SwarmUi/Arguments.ts
const mcMonkeyArguments = [{
	category: "Command Line Arguments",
	items: [
		{
			name: "--data_dir",
			description: "Override the default data directory.",
			type: "Directory",
			defaultValue: "Data"
		},
		{
			name: "--settings_file",
			description: "If your settings file is anywhere other than the default, you must specify as a command line arg.",
			type: "File",
			defaultValue: "Data/Settings.fds"
		},
		{
			name: "--backends_file",
			description: "If your backends file is anywhere other than the default, you must specify as a command line arg.",
			type: "File",
			defaultValue: "Data/Backends.fds"
		},
		{
			name: "--environment",
			description: "Can be `development` or `production` to set what ASP.NET Web Environment to use. `Development` gives detailed debug logs and errors, while `Production` is optimized for normal usage.",
			type: "DropDown",
			defaultValue: "Production",
			values: ["development", "production"]
		},
		{
			name: "--host",
			description: "Can be used to override the 'Network.Host' server setting.",
			type: "Input",
			defaultValue: "localhost"
		},
		{
			name: "--port",
			description: "Can be used to override the 'Network.Port' server setting.",
			type: "Input",
			defaultValue: "7801"
		},
		{
			name: "--asp_loglevel",
			description: "Sets the minimum log level for ASP.NET web logger, as any of: `Trace`, `Debug`, `Information`, `Warning`, `Error`, `Critical`, `None`. Note 'information' here spams debug output.",
			type: "DropDown",
			defaultValue: "warning",
			values: [
				"Trace",
				"Debug",
				"Information",
				"Warning",
				"Error",
				"Critical",
				"None"
			]
		},
		{
			name: "--loglevel",
			description: "Minimum SwarmUI log level, as any of: `Debug`, `Info`, `Init`, `Warning`, `Error`, `None`. 'Info' here is the normal usage data.",
			type: "DropDown",
			defaultValue: "Info",
			values: [
				"Debug",
				"Info",
				"Init",
				"Warning",
				"Error",
				"None"
			]
		},
		{
			name: "--user_id",
			description: "Set the local user's default UserID (for running in single-user mode, not useful in shared mode).",
			type: "Input",
			defaultValue: "local"
		},
		{
			name: "--lock_settings",
			description: "If enabled, blocks in-UI editing of server settings by admins. Settings cannot be modified in this mode without editing the settings file and restarting the server.",
			type: "CheckBox"
		},
		{
			name: "--ngrok-path",
			description: "If specified, will be used as the path to an `ngrok` executable, and will automatically load and configure ngrok when launching, to share your UI instance on a publicly accessible URL.",
			type: "File"
		},
		{
			name: "--cloudflared-path",
			description: "If specified, will be used as the path to an `cloudflared` executable, and will automatically load and configure TryCloudflare when launching, to share your UI instance on a publicly accessible URL.",
			type: "File"
		},
		{
			name: "--proxy-region",
			description: "If specified, sets the proxy (ngrok/cloudflared) region. If unspecified, defaults to closest.",
			type: "Input"
		},
		{
			name: "--proxy-added-args",
			description: "If specified, adds additional args to the proxy launch. Use a `.` as the first symbol (parser hackaround). For example, `--proxy-added-args \".--my-arg --arg -argy arg\"`",
			type: "Input"
		},
		{
			name: "--ngrok-basic-auth",
			description: "If specified, sets an ngrok basic-auth requirement to access.",
			type: "Input"
		},
		{
			name: "--launch_mode",
			description: "Can be used to override the 'LaunchMode' server setting.",
			type: "Input",
			defaultValue: "none"
		},
		{
			name: "--require_control_within",
			description: "If specified, give a number of minutes within which a remote API server must send a `AdminTakeControl` API request, or presume the launch is bad. This is useful for auto-managed instances.",
			type: "Input"
		},
		{
			name: "--no_persist",
			description: "If enabled, tells most systems in Swarm to avoid saving data (eg session handler will not save session data). Useful for instances with overlapping data storage especially.",
			type: "CheckBox"
		},
		{
			name: "--help",
			description: "Displays an in-CLI shortlist of CLI args and some usage hints.",
			type: "CheckBox"
		}
	]
}];
//#endregion
//#region module/src/containers/image/SwarmUi/RendererMethods.ts
const shellCommand$3 = isWin ? "call launch-windows.bat" : "bash ./launch-linux.sh";
const URL$3 = "https://github.com/mcmonkeyprojects/SwarmUI";
function parseArgsToString$9(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let argResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else {
			const argType = getArgumentType(arg.name, mcMonkeyArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	result += isEmpty(argResult) ? shellCommand$3 : `${shellCommand$3} ${argResult}`;
	return result;
}
function parseStringToArgs$9(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (!line.startsWith(shellCommand$3)) return;
		const clArgs = line.split(`${shellCommand$3} `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, mcMonkeyArguments)) {
				if (getArgumentType(value.name, mcMonkeyArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
async function fetchExtensionList$1() {
	return [
		{
			url: "https://github.com/Quaggles/SwarmUI-FaceTools",
			title: "SwarmUI-FaceTools",
			description: "A SwarmUI extension that adds parameters for ReActor and FaceRestoreCF nodes to the the generate tab.",
			stars: 8
		},
		{
			url: "https://github.com/mcmonkey4eva/SwarmComfyDeployBackendExt",
			title: "Swarm ComfyDeploy Backend Extension",
			description: "An extension for SwarmUI to use ComfyDeploy as a backend.",
			stars: 1
		},
		{
			url: "https://github.com/kalebbroo/SwarmUI-MagicPromptExtension",
			title: "SwarmUI MagicPrompt Extension",
			description: "The MagicPrompt Extension provides a simple and intuitive way directly in SwarmUI to generate text prompts for Stable Diffusion images. This uses your local Ollama LLMs.",
			stars: 7
		},
		{
			url: "https://github.com/Quaggles/SwarmUI-FaceTools",
			title: "SwarmUI-FaceTools",
			description: "A SwarmUI extension that adds parameters for ReActor and FaceRestoreCF nodes to the the generate tab.",
			stars: 8
		}
	];
}
function startInstall$9(stepper) {
	GitInstaller("SwarmUI", URL$3, stepper, [isWin ? "launch-windows.bat" : "launch-linux.sh"]);
}
async function cardInfo$9(api, callback) {
	return CardInfo(URL$3, "/src/Extensions", api, callback);
}
const SWARM_RM = {
	catchAddress: catchAddress$5,
	fetchExtensionList: fetchExtensionList$1,
	parseArgsToString: parseArgsToString$9,
	parseStringToArgs: parseStringToArgs$9,
	cardInfo: cardInfo$9,
	manager: {
		startInstall: startInstall$9,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/text/LlamaCpp/utils/github.ts
const LLAMA_CPP_RELEASES_URL = "https://api.github.com/repos/ggml-org/llama.cpp/releases";
const LLAMA_CPP_INSTALL_TIME_KEY = "install-time-llamaCpp";
const LLAMA_CPP_INSTALL_DIR_KEY = "install-dir-llamaCpp";
const LLAMA_CPP_UPDATE_TIME_KEY = "update-time-llamaCpp";
const LLAMA_CPP_PLATFORM_KEY = "platform-llamaCpp";
const LLAMA_PLATFORM_OPTIONS = [
	{
		label: "Windows x64 (CUDA 12)",
		key: "win-cuda12-x64",
		pattern: /^(?!.*cudart).*bin-win-cuda-12.*-x64\.zip$/i
	},
	{
		label: "Windows x64 (CUDA 13)",
		key: "win-cuda13-x64",
		pattern: /^(?!.*cudart).*bin-win-cuda-13.*-x64\.zip$/i
	},
	{
		label: "Windows arm64 (CUDA 13) (preview)",
		key: "win-cuda13-arm64",
		pattern: /^(?!.*cudart).*bin-win-cuda-13.*-arm64\.zip$/i
	},
	{
		label: "Windows x64 (CPU)",
		key: "win-cpu-x64",
		pattern: /^(?!.*cudart).*bin-win-cpu-x64\.zip$/i
	},
	{
		label: "Windows arm64 (CPU)",
		key: "win-cpu-arm64",
		pattern: /^(?!.*cudart).*bin-win-cpu-arm64\.zip$/i
	},
	{
		label: "Windows arm64 (OpenCL Adreno)",
		key: "win-opencl-adreno-arm64",
		pattern: /^(?!.*cudart).*bin-win-opencl-adreno-arm64\.zip$/i
	},
	{
		label: "Windows x64 (Vulkan)",
		key: "win-vulkan-x64",
		pattern: /^(?!.*cudart).*bin-win-vulkan-x64\.zip$/i
	},
	{
		label: "Windows x64 (OpenVINO)",
		key: "win-openvino-x64",
		pattern: /^(?!.*cudart).*bin-win-openvino.*-x64\.zip$/i
	},
	{
		label: "Windows x64 (SYCL)",
		key: "win-sycl-x64",
		pattern: /^(?!.*cudart).*bin-win-sycl-x64\.zip$/i
	},
	{
		label: "Windows x64 (ROCm)",
		key: "win-rocm-x64",
		pattern: /^(?!.*cudart).*bin-win-rocm.*-x64\.zip$/i
	},
	{
		label: "macOS Apple Silicon (arm64)",
		key: "macos-arm64",
		pattern: /bin-macos-arm64\.tar\.gz$/i
	},
	{
		label: "macOS Intel (x64)",
		key: "macos-x64",
		pattern: /bin-macos-x64\.tar\.gz$/i
	},
	{
		label: "iOS XCFramework",
		key: "ios-xcframework",
		pattern: /xcframework\.zip$/i
	},
	{
		label: "Ubuntu x64 (CPU)",
		key: "ubuntu-cpu-x64",
		pattern: /bin-ubuntu-x64\.tar\.gz$/i
	},
	{
		label: "Ubuntu arm64 (CPU)",
		key: "ubuntu-cpu-arm64",
		pattern: /bin-ubuntu-arm64\.tar\.gz$/i
	},
	{
		label: "Ubuntu s390x (CPU)",
		key: "ubuntu-cpu-s390x",
		pattern: /bin-ubuntu-s390x\.tar\.gz$/i
	},
	{
		label: "Ubuntu x64 (Vulkan)",
		key: "ubuntu-vulkan-x64",
		pattern: /bin-ubuntu-vulkan-x64\.tar\.gz$/i
	},
	{
		label: "Ubuntu arm64 (Vulkan)",
		key: "ubuntu-vulkan-arm64",
		pattern: /bin-ubuntu-vulkan-arm64\.tar\.gz$/i
	},
	{
		label: "Ubuntu x64 (ROCm)",
		key: "ubuntu-rocm-x64",
		pattern: /bin-ubuntu-rocm.*-x64\.tar\.gz$/i
	},
	{
		label: "Ubuntu x64 (OpenVINO)",
		key: "ubuntu-openvino-x64",
		pattern: /bin-ubuntu-openvino.*-x64\.tar\.gz$/i
	},
	{
		label: "Ubuntu x64 (SYCL FP32)",
		key: "ubuntu-sycl-fp32-x64",
		pattern: /bin-ubuntu-sycl-fp32-x64\.tar\.gz$/i
	},
	{
		label: "Ubuntu x64 (SYCL FP16)",
		key: "ubuntu-sycl-fp16-x64",
		pattern: /bin-ubuntu-sycl-fp16-x64\.tar\.gz$/i
	},
	{
		label: "Android arm64 (CPU)",
		key: "android-arm64",
		pattern: /bin-android-arm64\.tar\.gz$/i
	}
];
function detectDefaultPlatformKey() {
	if (isWin) return "win-cuda12-x64";
	if (isMac) return "macos-arm64";
	if (isLinux) return "ubuntu-cpu-x64";
	return "win-cpu-x64";
}
async function fetchLlamaCppReleases() {
	try {
		const response = await fetch(LLAMA_CPP_RELEASES_URL, { headers: {
			"User-Agent": "LynxHub-Desktop",
			Accept: "application/vnd.github.v3+json"
		} });
		if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);
		return (await response.json()).filter((r) => !r.draft && Boolean(r.assets?.some((a) => a.name.endsWith(".zip") || a.name.endsWith(".tar.gz"))));
	} catch (error) {
		console.error("Failed to fetch llama.cpp releases from GitHub:", error);
		return [];
	}
}
function findAssetUrlForPlatform(assets, platformKey) {
	const option = LLAMA_PLATFORM_OPTIONS.find((opt) => opt.key === platformKey);
	if (!option) return assets.find((a) => !a.name.startsWith("cudart-") && (a.name.endsWith(".zip") || a.name.endsWith(".tar.gz")))?.browser_download_url;
	const matchedAsset = assets.find((a) => option.pattern.test(a.name));
	if (matchedAsset) return matchedAsset.browser_download_url;
	return assets.find((a) => {
		if (a.name.startsWith("cudart-")) return false;
		if (platformKey.startsWith("win-") && a.name.includes("win")) return true;
		if (platformKey.startsWith("ubuntu-") && a.name.includes("ubuntu")) return true;
		if (platformKey.startsWith("macos-") && a.name.includes("macos")) return true;
		return false;
	})?.browser_download_url || assets[0]?.browser_download_url;
}
function findCudartAssetUrlForPlatform(assets, platformKey) {
	if (platformKey === "win-cuda12-x64") return assets.find((a) => /cudart-.*bin-win-cuda-12.*-x64\.zip$/i.test(a.name))?.browser_download_url;
	if (platformKey === "win-cuda13-x64") return assets.find((a) => /cudart-.*bin-win-cuda-13.*-x64\.zip$/i.test(a.name))?.browser_download_url;
	if (platformKey === "win-cuda13-arm64") return assets.find((a) => /cudart-.*bin-win-cuda-13.*-arm64\.zip$/i.test(a.name))?.browser_download_url;
}
async function getLatestLlamaCppTag() {
	return (await fetchLlamaCppReleases())[0]?.tag_name || "unknown";
}
//#endregion
//#region module/src/containers/text/OpenWebUi/RendererMethods.ts
const INSTALL_TIME_KEY$1 = "install-time-openwebui";
const UPDATE_TIME_KEY$1 = "update-time-openwebui";
const UPDATE_AVAILABLE_KEY = "update-available-version-openwebui";
function checkLinuxArgLine(line) {
	if (isWin && line.startsWith("set ")) return "set";
	if (line.startsWith("export ")) return "export";
	for (const arg of openArguments) if (arg.category === "Environment") {
		if (arg.sections[0].items.find((item) => item.name === line.split("=")[0])) return "var";
		else return;
	}
}
function parseArgsToString$8(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let cmArgs = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) cmArgs += result.commandArg + " ";
		} else {
			if (arg.name === "PORT") {
				cmArgs = `--port ${arg.value}`;
				return;
			}
			if (getArgumentType(arg.name, openArguments) === "CheckBox") {
				const eWinResult = `set ${arg.name}=true\n`;
				const eResult = `export ${arg.name}="true"\n`;
				result += isWin ? eWinResult : eResult;
			} else {
				const eWinResult = `set ${arg.name}=${arg.value}\n`;
				const eResult = `export ${arg.name}="${arg.value}"\n`;
				result += isWin ? eWinResult : eResult;
			}
		}
	});
	if (lines) result += lines + "\n";
	result += isWin ? `\nopen-webui serve ${cmArgs}` : `open-webui serve ${cmArgs}`;
	return result;
}
function parseStringToArgs$8(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (line.startsWith("#")) return;
		if (line.startsWith("open-webui serve")) {
			const clArg = line.split("open-webui serve ")[1];
			if (!clArg) return;
			clArg.split("--").filter(Boolean).map((arg) => {
				const [id, ...value] = arg.trim().split(" ");
				return {
					name: `${id}`.toUpperCase(),
					value: value.join(" ").replace(/"/g, "")
				};
			}).forEach((value) => {
				if (isValidArg(value.name, openArguments)) {
					if (getArgumentType(value.name, openArguments) === "CheckBox") argResult.push({
						name: value.name,
						value: ""
					});
					else argResult.push({
						name: value.name,
						value: value.value
					});
				}
			});
		}
		const lineType = checkLinuxArgLine(line);
		if (lineType === "export" || lineType === "set") {
			let [name, value] = line.replace(`${lineType} `, "").split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, openArguments)) argResult.push({
				name,
				value
			});
		} else if (checkLinuxArgLine(line) === "var") {
			let [name, value] = line.split("=");
			name = removeEscapes(name.trim());
			value = removeEscapes(value.trim());
			if (isValidArg(name, openArguments)) argResult.push({
				name,
				value
			});
		}
	});
	return argResult;
}
function startInstall$8(stepper) {
	stepper.initialSteps([
		"Getting Started",
		"Detect Existing",
		"Install Open WebUI",
		"All Done!"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking for existing Open WebUI installation...");
			stepper.ipc.invoke("is_openwebui_installed").then((isInstalled) => {
				if (isInstalled) {
					stepper.setInstalled();
					const currentDate = /* @__PURE__ */ new Date();
					stepper.storage.set(INSTALL_TIME_KEY$1, currentDate.toLocaleString());
					stepper.showFinalStep("success", "You're All Set!", "Open WebUI is already installed. You're good to go!");
				} else stepper.nextStep().then(() => {
					stepper.executeTerminalCommands("pip install open-webui").then(() => {
						stepper.setInstalled();
						const currentDate = /* @__PURE__ */ new Date();
						stepper.storage.set(INSTALL_TIME_KEY$1, currentDate.toLocaleString());
						stepper.showFinalStep("success", "Installation Complete!", "Your Open WebUI environment is ready. Enjoy!");
					});
				});
			});
		});
	});
}
function startUpdate$1(stepper) {
	stepper.initialSteps(["Update Open WebUI", "Complete Update"]);
	stepper.executeTerminalCommands("pip install --upgrade open-webui").then(() => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(UPDATE_TIME_KEY$1, currentDate.toLocaleString());
		stepper.setUpdated();
		stepper.showFinalStep("success", "Open WebUI Updated Successfully!", `Open WebUI has been updated to the latest version. You can now enjoy the new features and improvements.`);
	});
}
async function cardInfo$8(api, callback) {
	callback.setOpenFolders(void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Current Version",
				result: "loading"
			},
			{
				label: "Latest Version",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INSTALL_TIME_KEY$1).then((result) => {
		descManager.updateItem(0, 0, result);
	});
	api.storage.get(UPDATE_TIME_KEY$1).then((result) => {
		descManager.updateItem(0, 1, result);
	});
	api.ipc.invoke("current_openwebui_version").then((result) => {
		descManager.updateItem(0, 2, result);
	});
	api.storage.get(UPDATE_AVAILABLE_KEY).then((result) => {
		descManager.updateItem(0, 3, result);
	});
}
function catchAddress$2(input) {
	for (const pattern of [
		/https?:\/\/localhost(?::\d+)?/i,
		/https?:\/\/127\.0\.0\.1(?::\d+)?/i,
		/https?:\/\/0\.0\.0\.0(?::\d+)?/i,
		/https?:\/\/\[::1](?::\d+)?/i,
		/https?:\/\/(?:[\w-]+\.)*localhost(?::\d+)?/i
	]) {
		const match = input.match(pattern);
		if (match) return replaceAddress(match[0]);
		else if (input.toLowerCase().includes("started server process")) return "http://localhost:8080";
	}
}
const OPEN_WEBUI_RM = {
	catchAddress: catchAddress$2,
	cardInfo: cardInfo$8,
	parseStringToArgs: parseStringToArgs$8,
	parseArgsToString: parseArgsToString$8,
	manager: {
		startInstall: startInstall$8,
		updater: {
			updateType: "stepper",
			startUpdate: startUpdate$1
		}
	}
};
//#endregion
//#region module/node_modules/js-yaml/dist/js-yaml.mjs
/*! js-yaml 5.4.1 https://github.com/nodeca/js-yaml @license MIT */
/**
* Returned by a scalar resolver when the source does not match its tag.
*
* @category Tags
*/
var NOT_RESOLVED = Symbol("NOT_RESOLVED");
/**
* Create a normalized scalar tag definition.
*
* @category Tags
*/
function defineScalarTag(tagName, options) {
	return {
		tagName,
		nodeKind: "scalar",
		implicit: options.implicit ?? false,
		matchByTagPrefix: options.matchByTagPrefix ?? false,
		implicitFirstChars: options.implicitFirstChars ?? null,
		resolve: options.resolve,
		identify: options.identify,
		represent: options.represent ?? ((data) => String(data)),
		representTagName: options.representTagName ?? (() => tagName)
	};
}
/**
* Create a normalized sequence tag definition.
*
* @category Tags
*/
function defineSequenceTag(tagName, options) {
	const carrierIsResult = options.finalize === void 0;
	return {
		tagName,
		nodeKind: "sequence",
		implicit: false,
		matchByTagPrefix: options.matchByTagPrefix ?? false,
		create: options.create,
		addItem: options.addItem,
		finalize: options.finalize ?? ((carrier) => carrier),
		carrierIsResult,
		identify: options.identify,
		represent: options.represent ?? ((data) => data),
		representTagName: options.representTagName ?? (() => tagName)
	};
}
/**
* Create a normalized mapping tag definition.
*
* @category Tags
*/
function defineMappingTag(tagName, options) {
	const carrierIsResult = options.finalize === void 0;
	return {
		tagName,
		nodeKind: "mapping",
		implicit: false,
		matchByTagPrefix: options.matchByTagPrefix ?? false,
		create: options.create,
		addPair: options.addPair,
		has: options.has,
		keys: options.keys,
		get: options.get,
		finalize: options.finalize ?? ((carrier) => carrier),
		carrierIsResult,
		identify: options.identify,
		represent: options.represent ?? ((data) => data),
		representTagName: options.representTagName ?? (() => tagName)
	};
}
/** @category Tags */
var strTag = defineScalarTag("tag:yaml.org,2002:str", {
	resolve: (source) => source,
	identify: (data) => typeof data === "string"
});
var NULL_VALUES$1 = [
	"",
	"~",
	"null",
	"Null",
	"NULL"
];
/** @category Tags */
var nullCoreTag = defineScalarTag("tag:yaml.org,2002:null", {
	implicit: true,
	implicitFirstChars: [
		"",
		"~",
		"n",
		"N"
	],
	resolve: (source) => {
		if (NULL_VALUES$1.indexOf(source) !== -1) return null;
		return NOT_RESOLVED;
	},
	identify: (object) => object === null,
	represent: () => "null"
});
/** @category Tags */
var nullJsonTag = defineScalarTag("tag:yaml.org,2002:null", {
	implicit: true,
	implicitFirstChars: ["n"],
	resolve: (source, isExplicit) => {
		if (source === "null" || isExplicit && source === "") return null;
		return NOT_RESOLVED;
	},
	identify: (object) => object === null,
	represent: () => "null"
});
var NULL_VALUES = [
	"",
	"~",
	"null",
	"Null",
	"NULL"
];
/** @category Tags */
var nullYaml11Tag = defineScalarTag("tag:yaml.org,2002:null", {
	implicit: true,
	implicitFirstChars: [
		"",
		"~",
		"n",
		"N"
	],
	resolve: (source) => {
		if (NULL_VALUES.indexOf(source) !== -1) return null;
		return NOT_RESOLVED;
	},
	identify: (object) => object === null,
	represent: () => "null"
});
var TRUE_VALUES$2 = [
	"true",
	"True",
	"TRUE"
];
var FALSE_VALUES$2 = [
	"false",
	"False",
	"FALSE"
];
/** @category Tags */
var boolCoreTag = defineScalarTag("tag:yaml.org,2002:bool", {
	implicit: true,
	implicitFirstChars: [
		"t",
		"T",
		"f",
		"F"
	],
	resolve: (source) => {
		if (TRUE_VALUES$2.indexOf(source) !== -1) return true;
		if (FALSE_VALUES$2.indexOf(source) !== -1) return false;
		return NOT_RESOLVED;
	},
	identify: (object) => Object.prototype.toString.call(object) === "[object Boolean]",
	represent: (object) => object ? "true" : "false"
});
var TRUE_VALUES$1 = ["true"];
var FALSE_VALUES$1 = ["false"];
/** @category Tags */
var boolJsonTag = defineScalarTag("tag:yaml.org,2002:bool", {
	implicit: true,
	implicitFirstChars: ["t", "f"],
	resolve: (source) => {
		if (TRUE_VALUES$1.indexOf(source) !== -1) return true;
		if (FALSE_VALUES$1.indexOf(source) !== -1) return false;
		return NOT_RESOLVED;
	},
	identify: (object) => Object.prototype.toString.call(object) === "[object Boolean]",
	represent: (object) => object ? "true" : "false"
});
var TRUE_VALUES = [
	"true",
	"True",
	"TRUE",
	"y",
	"Y",
	"yes",
	"Yes",
	"YES",
	"on",
	"On",
	"ON"
];
var FALSE_VALUES = [
	"false",
	"False",
	"FALSE",
	"n",
	"N",
	"no",
	"No",
	"NO",
	"off",
	"Off",
	"OFF"
];
/** @category Tags */
var boolYaml11Tag = defineScalarTag("tag:yaml.org,2002:bool", {
	implicit: true,
	implicitFirstChars: [
		"y",
		"Y",
		"n",
		"N",
		"t",
		"T",
		"f",
		"F",
		"o",
		"O"
	],
	resolve: (source) => {
		if (TRUE_VALUES.indexOf(source) !== -1) return true;
		if (FALSE_VALUES.indexOf(source) !== -1) return false;
		return NOT_RESOLVED;
	},
	identify: (object) => Object.prototype.toString.call(object) === "[object Boolean]",
	represent: (object) => object ? "true" : "false"
});
var YAML_INTEGER_IMPLICIT_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
var YAML_INTEGER_EXPLICIT_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function parseYamlInteger$2(source) {
	let value = source;
	let sign = 1;
	if (value[0] === "-" || value[0] === "+") {
		if (value[0] === "-") sign = -1;
		value = value.slice(1);
	}
	if (value.startsWith("0b")) return sign * parseInt(value.slice(2), 2);
	if (value.startsWith("0o")) return sign * parseInt(value.slice(2), 8);
	if (value.startsWith("0x")) return sign * parseInt(value.slice(2), 16);
	return sign * parseInt(value, 10);
}
function resolveYamlInteger$2(source, isExplicit) {
	if (isExplicit) {
		if (!YAML_INTEGER_EXPLICIT_PATTERN$1.test(source)) return NOT_RESOLVED;
	} else if (!YAML_INTEGER_IMPLICIT_PATTERN$1.test(source)) return NOT_RESOLVED;
	const result = parseYamlInteger$2(source);
	return Number.isFinite(result) ? result : NOT_RESOLVED;
}
/** @category Tags */
var intCoreTag = defineScalarTag("tag:yaml.org,2002:int", {
	implicit: true,
	implicitFirstChars: [
		"-",
		"+",
		..."0123456789"
	],
	resolve: resolveYamlInteger$2,
	identify: (object) => Number.isInteger(object) && !Object.is(object, -0) && object.toString(10).indexOf("e") < 0,
	represent: (object) => object.toString(10)
});
var YAML_INTEGER_IMPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)$");
var YAML_INTEGER_EXPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");
function parseYamlInteger$1(source) {
	let value = source;
	let sign = 1;
	if (value[0] === "-" || value[0] === "+") {
		if (value[0] === "-") sign = -1;
		value = value.slice(1);
	}
	if (value.startsWith("0b")) return sign * parseInt(value.slice(2), 2);
	if (value.startsWith("0o")) return sign * parseInt(value.slice(2), 8);
	if (value.startsWith("0x")) return sign * parseInt(value.slice(2), 16);
	return sign * parseInt(value, 10);
}
function resolveYamlInteger$1(source, isExplicit) {
	if (isExplicit) {
		if (!YAML_INTEGER_EXPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
	} else if (!YAML_INTEGER_IMPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
	const result = parseYamlInteger$1(source);
	return Number.isFinite(result) ? result : NOT_RESOLVED;
}
/** @category Tags */
var intJsonTag = defineScalarTag("tag:yaml.org,2002:int", {
	implicit: true,
	implicitFirstChars: ["-", ..."0123456789"],
	resolve: resolveYamlInteger$1,
	identify: (object) => Number.isInteger(object) && !Object.is(object, -0) && object.toString(10).indexOf("e") < 0,
	represent: (object) => object.toString(10)
});
var YAML_INTEGER_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");
function parseYamlInteger(source) {
	let value = source.replace(/_/g, "");
	let sign = 1;
	if (value[0] === "-" || value[0] === "+") {
		if (value[0] === "-") sign = -1;
		value = value.slice(1);
	}
	if (value.startsWith("0b")) return sign * parseInt(value.slice(2), 2);
	if (value.startsWith("0x")) return sign * parseInt(value.slice(2), 16);
	if (value.includes(":")) {
		let result = 0;
		for (const part of value.split(":")) result = result * 60 + Number(part);
		return sign * result;
	}
	if (value !== "0" && value[0] === "0") return sign * parseInt(value, 8);
	return sign * parseInt(value, 10);
}
function resolveYamlInteger(source) {
	if (!YAML_INTEGER_PATTERN.test(source)) return NOT_RESOLVED;
	const result = parseYamlInteger(source);
	return Number.isFinite(result) ? result : NOT_RESOLVED;
}
/** @category Tags */
var intYaml11Tag = defineScalarTag("tag:yaml.org,2002:int", {
	implicit: true,
	implicitFirstChars: [
		"-",
		"+",
		..."0123456789"
	],
	resolve: resolveYamlInteger,
	identify: (object) => Number.isInteger(object) && !Object.is(object, -0) && object.toString(10).indexOf("e") < 0,
	represent: (object) => object.toString(10)
});
var YAML_FLOAT_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
var YAML_FLOAT_SPECIAL_PATTERN$1 = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat$2(source) {
	if (!YAML_FLOAT_PATTERN$1.test(source)) return NOT_RESOLVED;
	let value = source.toLowerCase();
	const sign = value[0] === "-" ? -1 : 1;
	if ("+-".includes(value[0])) value = value.slice(1);
	if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
	if (value === ".nan") return NaN;
	const result = sign * parseFloat(value);
	if (Number.isFinite(result) || YAML_FLOAT_SPECIAL_PATTERN$1.test(source)) return result;
	return NOT_RESOLVED;
}
function representYamlFloat$2(object) {
	if (isNaN(object)) return ".nan";
	if (object === Number.POSITIVE_INFINITY) return ".inf";
	if (object === Number.NEGATIVE_INFINITY) return "-.inf";
	if (Object.is(object, -0)) return "-0.0";
	const result = object.toString(10);
	return /^[-+]?[0-9]+e/.test(result) ? result.replace("e", ".e") : result;
}
/** @category Tags */
var floatCoreTag = defineScalarTag("tag:yaml.org,2002:float", {
	implicit: true,
	implicitFirstChars: [
		"-",
		"+",
		".",
		..."0123456789"
	],
	resolve: resolveYamlFloat$2,
	identify: (object) => typeof object === "number" && (!Number.isInteger(object) || Object.is(object, -0) || object.toString(10).indexOf("e") >= 0),
	represent: representYamlFloat$2
});
var YAML_FLOAT_IMPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$");
var YAML_FLOAT_EXPLICIT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat$1(source, isExplicit) {
	if (isExplicit) {
		if (!YAML_FLOAT_EXPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
		let value = source.toLowerCase();
		const sign = value[0] === "-" ? -1 : 1;
		if ("+-".includes(value[0])) value = value.slice(1);
		if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
		if (value === ".nan") return NaN;
		const result = sign * parseFloat(value);
		return Number.isFinite(result) ? result : NOT_RESOLVED;
	}
	if (!YAML_FLOAT_IMPLICIT_PATTERN.test(source)) return NOT_RESOLVED;
	const result = Number(source);
	if (Number.isFinite(result)) return result;
	return NOT_RESOLVED;
}
function representYamlFloat$1(object) {
	if (isNaN(object)) return ".nan";
	if (object === Number.POSITIVE_INFINITY) return ".inf";
	if (object === Number.NEGATIVE_INFINITY) return "-.inf";
	if (Object.is(object, -0)) return "-0.0";
	const result = object.toString(10);
	return /^[-+]?[0-9]+e/.test(result) ? result.replace("e", ".e") : result;
}
/** @category Tags */
var floatJsonTag = defineScalarTag("tag:yaml.org,2002:float", {
	implicit: true,
	implicitFirstChars: ["-", ..."0123456789"],
	resolve: resolveYamlFloat$1,
	identify: (object) => typeof object === "number" && (!Number.isInteger(object) || Object.is(object, -0) || object.toString(10).indexOf("e") >= 0),
	represent: representYamlFloat$1
});
var YAML_FLOAT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
var YAML_FLOAT_SPECIAL_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat(source) {
	if (!YAML_FLOAT_PATTERN.test(source)) return NOT_RESOLVED;
	let value = source.toLowerCase().replace(/_/g, "");
	const sign = value[0] === "-" ? -1 : 1;
	if ("+-".includes(value[0])) value = value.slice(1);
	if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
	if (value === ".nan") return NaN;
	let result = 0;
	if (value.includes(":")) {
		for (const part of value.split(":")) result = result * 60 + Number(part);
		result *= sign;
	} else result = sign * parseFloat(value);
	if (Number.isFinite(result) || YAML_FLOAT_SPECIAL_PATTERN.test(source)) return result;
	return NOT_RESOLVED;
}
function representYamlFloat(object) {
	if (isNaN(object)) return ".nan";
	if (object === Number.POSITIVE_INFINITY) return ".inf";
	if (object === Number.NEGATIVE_INFINITY) return "-.inf";
	if (Object.is(object, -0)) return "-0.0";
	const result = object.toString(10);
	return /^[-+]?[0-9]+e/.test(result) ? result.replace("e", ".e") : result;
}
/** @category Tags */
var floatYaml11Tag = defineScalarTag("tag:yaml.org,2002:float", {
	implicit: true,
	implicitFirstChars: [
		"-",
		"+",
		".",
		..."0123456789"
	],
	resolve: resolveYamlFloat,
	identify: (object) => typeof object === "number" && (!Number.isInteger(object) || Object.is(object, -0) || object.toString(10).indexOf("e") >= 0),
	represent: representYamlFloat
});
/**
* Enables merge keys in {@link CORE_SCHEMA} when added with
* {@link Schema.withTags}.
*
* @category Tags
*/
var mergeTag = defineScalarTag("tag:yaml.org,2002:merge", {
	implicit: true,
	implicitFirstChars: ["<"],
	resolve: (source, isExplicit) => {
		if (source === "<<" || isExplicit && source === "") return "<<";
		return NOT_RESOLVED;
	},
	identify: () => false
});
var BASE64_PATTERN = /^[A-Za-z0-9+/]*={0,2}$/;
function resolveYamlBinary(source) {
	const input = source.replace(/\s/g, "");
	if (input.length % 4 !== 0 || !BASE64_PATTERN.test(input)) return NOT_RESOLVED;
	const binary = atob(input);
	const result = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index++) result[index] = binary.charCodeAt(index);
	return result;
}
function representYamlBinary(object) {
	let binary = "";
	for (let index = 0; index < object.length; index++) binary += String.fromCharCode(object[index]);
	return btoa(binary);
}
/**
* The `!!binary` tag, represented as a `Uint8Array`.
*
* @category Tags
*/
var binaryTag = defineScalarTag("tag:yaml.org,2002:binary", {
	resolve: resolveYamlBinary,
	identify: (object) => Object.prototype.toString.call(object) === "[object Uint8Array]",
	represent: representYamlBinary
});
var YAML_DATE_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
var YAML_TIMESTAMP_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
function makeUtcDate(year, month, day, hour = 0, minute = 0, second = 0, fraction = 0) {
	const date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
	date.setUTCFullYear(year, month, day);
	return date;
}
function resolveYamlTimestamp(source) {
	let match = YAML_DATE_REGEXP.exec(source);
	if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(source);
	if (match === null) return NOT_RESOLVED;
	const year = +match[1];
	const month = +match[2] - 1;
	const day = +match[3];
	if (!match[4]) {
		const date = makeUtcDate(year, month, day);
		if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) return NOT_RESOLVED;
		return date;
	}
	const hour = +match[4];
	const minute = +match[5];
	const second = +match[6];
	let fraction = 0;
	if (hour > 23 || minute > 59 || second > 59) return NOT_RESOLVED;
	if (match[7]) {
		let value = match[7].slice(0, 3);
		while (value.length < 3) value += "0";
		fraction = +value;
	}
	const date = makeUtcDate(year, month, day, hour, minute, second, fraction);
	if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) return NOT_RESOLVED;
	if (match[9]) {
		const offsetHour = +match[10];
		const offsetMinute = +(match[11] || 0);
		if (offsetHour > 23 || offsetMinute > 59) return NOT_RESOLVED;
		const offset = (offsetHour * 60 + offsetMinute) * 6e4;
		date.setTime(date.getTime() - (match[9] === "-" ? -offset : offset));
	}
	return date;
}
/**
* The YAML 1.1 `!!timestamp` tag, represented as a JavaScript `Date`.
*
* @category Tags
*/
var timestampTag = defineScalarTag("tag:yaml.org,2002:timestamp", {
	implicit: true,
	implicitFirstChars: [..."0123456789"],
	resolve: resolveYamlTimestamp,
	identify: (object) => object instanceof Date,
	represent: (object) => object.toISOString()
});
/** @category Tags */
var seqTag = defineSequenceTag("tag:yaml.org,2002:seq", {
	create: () => [],
	addItem: (container, item) => {
		container.push(item);
	},
	identify: Array.isArray
});
function isPlainObject(data) {
	if (data === null || typeof data !== "object" || Array.isArray(data)) return false;
	const prototype = Object.getPrototypeOf(data);
	return prototype === null || prototype === Object.prototype;
}
function pick(object, keys) {
	const result = {};
	for (const key of keys) if (object[key] !== void 0) result[key] = object[key];
	return result;
}
/**
* Provided only for YAML 1.1 compatibility and supported by the loader only.
* JavaScript has no dedicated class to represent this type, so it cannot be
* identified and dumped.
*
* ```yaml
* !!omap
*   - one: 1
*   - two: 2
* ```
*
* is loaded as
*
* ```javascript
* [
*   { one: 1 },
*   { two: 2 }
* ]
* ```
*
* @category Tags
*/
var omapTag = defineSequenceTag("tag:yaml.org,2002:omap", {
	create: () => ({
		list: [],
		seen: /* @__PURE__ */ new Set()
	}),
	addItem: (carrier, item) => {
		let key;
		if (item instanceof Map) {
			if (item.size !== 1) return "cannot resolve an ordered map item";
			key = item.keys().next().value;
		} else if (isPlainObject(item)) {
			const itemKeys = Object.keys(item);
			if (itemKeys.length !== 1) return "cannot resolve an ordered map item";
			key = itemKeys[0];
		} else return "cannot resolve an ordered map item";
		if (carrier.seen.has(key)) return "duplicate key in ordered map";
		carrier.seen.add(key);
		carrier.list.push(item);
		return "";
	},
	finalize: (carrier) => carrier.list,
	identify: () => false
});
/**
* Provided only for YAML 1.1 compatibility and supported by the loader only.
* JavaScript has no dedicated class to represent this type, so it cannot be
* identified and dumped.
*
* ```yaml
* !!pairs
*   - one: 1
*   - two: 2
* ```
*
* is loaded as
*
* ```javascript
* [
*   ['one', 1],
*   ['two', 2]
* ]
* ```
*
* @category Tags
*/
var pairsTag = defineSequenceTag("tag:yaml.org,2002:pairs", {
	create: () => [],
	addItem: (container, item) => {
		if (item instanceof Map) {
			if (item.size !== 1) return "cannot resolve a pairs item";
			container.push(item.entries().next().value);
			return "";
		}
		if (Object.prototype.toString.call(item) !== "[object Object]") return "cannot resolve a pairs item";
		const object = item;
		const keys = Object.keys(object);
		if (keys.length !== 1) return "cannot resolve a pairs item";
		container.push([keys[0], object[keys[0]]]);
		return "";
	},
	identify: () => false
});
/**
* This is the default mapping implementation. It uses `{}` objects and has only
* partial functionality due to language limitations. This choice was made
* because users expect to get JavaScript objects, and it was left unchanged to
* avoid too many breaking changes in the v5 release.
*
* Side effects:
*
* - `Object.hasOwn()` checks or `for...of` loops are required for safe use (to
*   avoid falling through to prototypes).
* - Only scalar string keys are supported properly.
* - Other scalar keys, such as `null` and numbers, are converted to strings.
*   This is historical behaviour, and it can cause side effects such as
*   problems with `!!merge`.
*
* Note that non-string scalar keys may be deprecated in future versions.
*
* Ideally, use {@link realMapTag} instead.
*
* @category Tags
*/
var mapTag = defineMappingTag("tag:yaml.org,2002:map", {
	create: () => ({}),
	identify: isPlainObject,
	represent: (o) => {
		const map = /* @__PURE__ */ new Map();
		for (const key of Object.keys(o)) map.set(key, o[key]);
		return map;
	},
	addPair: (container, key, value) => {
		if (key !== null && typeof key === "object") return "object-based map does not support complex keys";
		const normalizedKey = String(key);
		if (normalizedKey === "__proto__") Object.defineProperty(container, normalizedKey, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else container[normalizedKey] = value;
		return "";
	},
	has: (container, key) => {
		if (key !== null && typeof key === "object") return false;
		return Object.prototype.hasOwnProperty.call(container, String(key));
	},
	keys: (container) => Object.keys(container),
	get: (container, key) => {
		const normalizedKey = String(key);
		if (!Object.prototype.hasOwnProperty.call(container, normalizedKey)) return null;
		return container[normalizedKey];
	}
});
/**
* The YAML 1.1 `!!set` tag, represented as a JavaScript `Set`.
*
* @category Tags
*/
var setTag = defineMappingTag("tag:yaml.org,2002:set", {
	create: () => /* @__PURE__ */ new Set(),
	identify: (data) => data instanceof Set,
	represent: (data) => {
		const map = /* @__PURE__ */ new Map();
		for (const key of data) map.set(key, null);
		return map;
	},
	addPair: (container, key, value) => {
		if (value !== null) return "cannot resolve a set item";
		container.add(key);
		return "";
	},
	has: (container, key) => container.has(key),
	keys: (container) => container.keys(),
	get: () => null
});
function createTagDefinitionMap() {
	return {
		scalar: Object.create(null),
		sequence: Object.create(null),
		mapping: Object.create(null)
	};
}
function createTagDefinitionListMap() {
	return {
		scalar: [],
		sequence: [],
		mapping: []
	};
}
function compileTags(tags) {
	const result = [];
	for (const tag of tags) {
		let index = result.length;
		for (let previousIndex = 0; previousIndex < result.length; previousIndex++) {
			const previous = result[previousIndex];
			if (previous.nodeKind === tag.nodeKind && previous.tagName === tag.tagName && previous.matchByTagPrefix === tag.matchByTagPrefix) {
				index = previousIndex;
				break;
			}
		}
		result[index] = tag;
	}
	return result;
}
/**
* Controls tag resolution when loading and type selection when dumping.
*
* @category Schemas
*/
var Schema = class Schema {
	tags;
	/** @internal */
	implicitScalarTags;
	/**
	* Dispatch implicit scalar resolvers by `source.charAt(0)`. Each bucket holds
	* the resolvers that may match that key, in schema order; a key absent from
	* the map uses
	* {@link Schema.implicitScalarAnyFirstChar}
	* (resolvers that declared no first-char constraint, so they apply to any
	* first character).
	*/
	implicitScalarByFirstChar;
	implicitScalarAnyFirstChar;
	/**
	* The default scalar tag (`!!str`), resolved once so the composer's fallback
	* for unresolved plain scalars avoids a keyed lookup per scalar.
	*
	* @internal
	*/
	defaultScalarTag;
	/**
	* The default container tags (`!!seq` / `!!map`), used by the dumper: when a
	* value is identified by its default tag, the tag is implicit and not
	* printed. Undefined if the schema does not define them (then such values
	* can't be dumped).
	*
	* @internal
	*/
	defaultSequenceTag;
	/** @internal */
	defaultMappingTag;
	exact;
	prefix;
	constructor(tags) {
		const compiledTags = compileTags(tags);
		const implicitScalarTags = [];
		const exact = createTagDefinitionMap();
		const prefix = createTagDefinitionListMap();
		for (const tag of compiledTags) {
			if (tag.nodeKind === "scalar" && tag.implicit) {
				if (tag.matchByTagPrefix) throw new Error("Implicit scalar tags cannot match by tag prefix");
				implicitScalarTags.push(tag);
			}
			switch (tag.nodeKind) {
				case "scalar":
					if (tag.matchByTagPrefix) prefix.scalar.push(tag);
					else exact.scalar[tag.tagName] = tag;
					break;
				case "sequence":
					if (tag.matchByTagPrefix) prefix.sequence.push(tag);
					else exact.sequence[tag.tagName] = tag;
					break;
				case "mapping": if (tag.matchByTagPrefix) prefix.mapping.push(tag);
				else exact.mapping[tag.tagName] = tag;
			}
		}
		const implicitScalarAnyFirstChar = implicitScalarTags.filter((tag) => tag.implicitFirstChars === null);
		const keys = /* @__PURE__ */ new Set();
		for (const tag of implicitScalarTags) if (tag.implicitFirstChars !== null) for (const key of tag.implicitFirstChars) keys.add(key);
		const implicitScalarByFirstChar = /* @__PURE__ */ new Map();
		for (const key of keys) implicitScalarByFirstChar.set(key, implicitScalarTags.filter((tag) => tag.implicitFirstChars === null || tag.implicitFirstChars.indexOf(key) !== -1));
		const defaultScalarTag = exact.scalar["tag:yaml.org,2002:str"];
		if (!defaultScalarTag) throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");
		this.tags = compiledTags;
		this.implicitScalarTags = implicitScalarTags;
		this.implicitScalarByFirstChar = implicitScalarByFirstChar;
		this.implicitScalarAnyFirstChar = implicitScalarAnyFirstChar;
		this.defaultScalarTag = defaultScalarTag;
		this.defaultSequenceTag = exact.sequence["tag:yaml.org,2002:seq"];
		this.defaultMappingTag = exact.mapping["tag:yaml.org,2002:map"];
		this.exact = exact;
		this.prefix = prefix;
	}
	/** @internal */
	lookupScalarTag(tagName) {
		const exactTag = this.exact.scalar[tagName];
		if (exactTag) return exactTag;
		for (const tag of this.prefix.scalar) if (tagName.startsWith(tag.tagName)) return tag;
	}
	/** @internal */
	lookupSequenceTag(tagName) {
		const exactTag = this.exact.sequence[tagName];
		if (exactTag) return exactTag;
		for (const tag of this.prefix.sequence) if (tagName.startsWith(tag.tagName)) return tag;
	}
	/** @internal */
	lookupMappingTag(tagName) {
		const exactTag = this.exact.mapping[tagName];
		if (exactTag) return exactTag;
		for (const tag of this.prefix.mapping) if (tagName.startsWith(tag.tagName)) return tag;
	}
	/** @internal */
	resolveImplicitScalarTag(source) {
		const candidates = this.implicitScalarByFirstChar.get(source.charAt(0)) ?? this.implicitScalarAnyFirstChar;
		for (const tag of candidates) {
			const value = tag.resolve(source, false, tag.tagName);
			if (value !== NOT_RESOLVED) return {
				value,
				tag
			};
		}
		const tag = this.defaultScalarTag;
		return {
			value: tag.resolve(source, false, tag.tagName),
			tag
		};
	}
	/**
	* Creates a new schema with the specified tags added. If a tag already
	* exists, it is replaced by the specified tag.
	*
	* @example
	*
	* ```javascript
	* import { CORE_SCHEMA, mergeTag, realMapTag } from 'js-yaml'
	*
	* const schema = CORE_SCHEMA.withTags(mergeTag, realMapTag)
	* ```
	*/
	withTags(...tags) {
		let flatTags = [];
		for (const tag of tags) flatTags = flatTags.concat(tag);
		return new Schema([...this.tags, ...flatTags]);
	}
};
/**
* The YAML 1.2 Failsafe Schema: strings, sequences, and mappings.
*
* @category Schemas
*/
var FAILSAFE_SCHEMA = new Schema([
	strTag,
	seqTag,
	mapTag
]);
new Schema([
	...FAILSAFE_SCHEMA.tags,
	nullJsonTag,
	boolJsonTag,
	intJsonTag,
	floatJsonTag
]);
/**
* The default schema for the loaders. Note, {@link CORE_SCHEMA} comes
* without the `!!merge` tag. You can easily enable it if needed.
*
* @example
* Enable {@link mergeTag}:
*
* ```javascript
* import { load, CORE_SCHEMA, mergeTag } from 'js-yaml'
*
* try {
*   load(data, { schema: CORE_SCHEMA.withTags(mergeTag) })
* } catch (e) {
*   console.error(e)
* }
* ```
*
* @category Schemas
*/
var CORE_SCHEMA = new Schema([
	...FAILSAFE_SCHEMA.tags,
	nullCoreTag,
	boolCoreTag,
	intCoreTag,
	floatCoreTag
]);
/**
* The dumper schema for maximum compatibility. It combines all supported type
* variants from YAML 1.1 and YAML 1.2 so strings matching any of them are
* quoted. This makes the generated YAML more compatible with other parsers.
*
* The schema is based on YAML 1.1, but extends `!!int` and `!!float` to accept
* both YAML 1.1 and Core Schema forms, since Core Schema supports some forms
* that YAML 1.1 does not.
*
* @category Schemas
*/
var DUMP_SCHEMA = new Schema([
	...FAILSAFE_SCHEMA.tags,
	nullYaml11Tag,
	boolYaml11Tag,
	intYaml11Tag,
	floatYaml11Tag,
	timestampTag,
	mergeTag,
	binaryTag,
	omapTag,
	pairsTag,
	setTag
]).withTags({
	...intYaml11Tag,
	resolve: (source, isExplicit, tagName) => {
		const result = intYaml11Tag.resolve(source, isExplicit, tagName);
		return result === NOT_RESOLVED ? intCoreTag.resolve(source, isExplicit, tagName) : result;
	}
}, {
	...floatYaml11Tag,
	resolve: (source, isExplicit, tagName) => {
		const result = floatYaml11Tag.resolve(source, isExplicit, tagName);
		return result === NOT_RESOLVED ? floatCoreTag.resolve(source, isExplicit, tagName) : result;
	}
});
defineMappingTag("tag:yaml.org,2002:map", {
	create: () => /* @__PURE__ */ new Map(),
	addPair: (container, key, value) => {
		container.set(key, value);
		return "";
	},
	has: (container, key) => container.has(key),
	keys: (container) => container.keys(),
	get: (container, key) => container.get(key),
	identify: (data) => data instanceof Map || isPlainObject(data),
	represent: (data) => {
		if (data instanceof Map) return data;
		const map = /* @__PURE__ */ new Map();
		const obj = data;
		for (const key of Object.keys(obj)) map.set(key, obj[key]);
		return map;
	}
});
function normalizeKey(key) {
	if (Array.isArray(key)) {
		const array = Array.prototype.slice.call(key);
		for (let index = 0; index < array.length; index++) {
			if (Array.isArray(array[index])) return null;
			if (typeof array[index] === "object" && Object.prototype.toString.call(array[index]) === "[object Object]") array[index] = "[object Object]";
		}
		return String(array);
	}
	if (typeof key === "object" && Object.prototype.toString.call(key) === "[object Object]") return "[object Object]";
	return String(key);
}
defineMappingTag("tag:yaml.org,2002:map", {
	create: () => ({}),
	identify: isPlainObject,
	represent: (o) => {
		const map = /* @__PURE__ */ new Map();
		for (const key of Object.keys(o)) map.set(key, o[key]);
		return map;
	},
	addPair: (container, key, value) => {
		const normalizedKey = normalizeKey(key);
		if (normalizedKey === null) return "nested arrays are not supported inside keys";
		if (normalizedKey === "__proto__") Object.defineProperty(container, normalizedKey, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else container[normalizedKey] = value;
		return "";
	},
	has: (container, key) => {
		const normalizedKey = normalizeKey(key);
		return normalizedKey !== null && Object.prototype.hasOwnProperty.call(container, normalizedKey);
	},
	keys: (container) => Object.keys(container),
	get: (container, key) => {
		const normalizedKey = String(key);
		if (!Object.prototype.hasOwnProperty.call(container, normalizedKey)) return null;
		return container[normalizedKey];
	}
});
var DEFAULT_SNIPPET_OPTIONS = {
	maxLength: 79,
	indent: 1,
	linesBefore: 3,
	linesAfter: 2
};
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
	let head = "";
	let tail = "";
	const maxHalfLength = Math.floor(maxLineLength / 2) - 1;
	if (position - lineStart > maxHalfLength) {
		head = " ... ";
		lineStart = position - maxHalfLength + head.length;
	}
	if (lineEnd - position > maxHalfLength) {
		tail = " ...";
		lineEnd = position + maxHalfLength - tail.length;
	}
	return {
		str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
		pos: position - lineStart + head.length
	};
}
function padStart(string, max) {
	return " ".repeat(Math.max(max - string.length, 0)) + string;
}
function makeSnippet(mark, options) {
	if (!mark.buffer) return null;
	const opts = {
		...DEFAULT_SNIPPET_OPTIONS,
		...options
	};
	const re = /\r?\n|\r|\0/g;
	const lineStarts = [0];
	const lineEnds = [];
	let match;
	let foundLineNo = -1;
	while (match = re.exec(mark.buffer)) {
		lineEnds.push(match.index);
		lineStarts.push(match.index + match[0].length);
		if (mark.position <= match.index && foundLineNo < 0) foundLineNo = lineStarts.length - 2;
	}
	if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
	let result = "";
	const lineNoLength = Math.min(mark.line + opts.linesAfter, lineEnds.length).toString().length;
	const maxLineLength = opts.maxLength - (opts.indent + lineNoLength + 3);
	for (let i = 1; i <= opts.linesBefore; i++) {
		if (foundLineNo - i < 0) break;
		const line = getLine(mark.buffer, lineStarts[foundLineNo - i], lineEnds[foundLineNo - i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]), maxLineLength);
		result = `${" ".repeat(opts.indent)}${padStart((mark.line - i + 1).toString(), lineNoLength)} | ${line.str}\n${result}`;
	}
	const line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
	result += `${" ".repeat(opts.indent)}${padStart((mark.line + 1).toString(), lineNoLength)} | ${line.str}\n`;
	result += `${"-".repeat(opts.indent + lineNoLength + 3 + line.pos)}^\n`;
	for (let i = 1; i <= opts.linesAfter; i++) {
		if (foundLineNo + i >= lineEnds.length) break;
		const line = getLine(mark.buffer, lineStarts[foundLineNo + i], lineEnds[foundLineNo + i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]), maxLineLength);
		result += `${" ".repeat(opts.indent)}${padStart((mark.line + i + 1).toString(), lineNoLength)} | ${line.str}\n`;
	}
	return result.replace(/\n$/, "");
}
function formatError(exception, compact) {
	let where = "";
	if (!exception.mark) return exception.reason;
	if (exception.mark.name) where += `in "${exception.mark.name}" `;
	where += `(${exception.mark.line + 1}:${exception.mark.column + 1})`;
	if (!compact && exception.mark.snippet) where += `\n\n${exception.mark.snippet}`;
	return `${exception.reason} ${where}`;
}
/**
* A YAML error. Unlike an ordinary `Error`, it adds a source snippet showing
* the location of the problem to the error message, when available.
*
* @category Main
*/
var YAMLException = class YAMLException extends Error {
	reason;
	mark;
	/**
	* Optional `mark` contains source snippet data. Usually, use
	* {@link YAMLException.throwAt} instead of passing it directly.
	*/
	constructor(reason, mark) {
		super();
		this.name = "YAMLException";
		this.reason = reason;
		this.mark = mark;
		this.message = formatError(this, false);
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
	}
	/**
	* Returns the formatted error, omitting the source snippet in compact mode.
	*/
	toString(compact) {
		return `${this.name}: ${formatError(this, compact)}`;
	}
	/**
	* Builds a YAMLException with a source snippet and throws it. `source` is
	* the raw input text; `position` is an offset into it.
	*/
	static throwAt(source, position, message, filename = "") {
		let line = 0;
		let lineStart = 0;
		for (let index = 0; index < position; index++) {
			const ch = source.charCodeAt(index);
			if (ch === 10) {
				line++;
				lineStart = index + 1;
			} else if (ch === 13) {
				line++;
				if (source.charCodeAt(index + 1) === 10) index++;
				lineStart = index + 1;
			}
		}
		const mark = {
			name: filename,
			buffer: source,
			position,
			line,
			column: position - lineStart
		};
		mark.snippet = makeSnippet(mark);
		throw new YAMLException(message, mark);
	}
};
/** @category Events */
var EVENT_ID = {
	DOCUMENT: 1,
	SEQUENCE: 2,
	MAPPING: 3,
	SCALAR: 4,
	ALIAS: 5,
	POP: 6
};
/** @category Nodes */
var SCALAR_STYLE = {
	PLAIN: 1,
	SINGLE_QUOTED: 2,
	DOUBLE_QUOTED: 3,
	LITERAL_BLOCK: 4,
	FOLDED_BLOCK: 5
};
/** @category Nodes */
var COLLECTION_STYLE = {
	BLOCK: 1,
	FLOW: 2
};
/** @category Nodes */
var CHOMPING_MODE = {
	CLIP: 1,
	STRIP: 2,
	KEEP: 3
};
var NO_RANGE$3 = -1;
function simpleEscapeSequence(c) {
	switch (c) {
		case 48: return "\0";
		case 97: return "\x07";
		case 98: return "\b";
		case 116: return "	";
		case 9: return "	";
		case 110: return "\n";
		case 118: return "\v";
		case 102: return "\f";
		case 114: return "\r";
		case 101: return "\x1B";
		case 32: return " ";
		case 34: return "\"";
		case 47: return "/";
		case 92: return "\\";
		case 78: return "";
		case 95: return "\xA0";
		case 76: return "\u2028";
		case 80: return "\u2029";
		default: return "";
	}
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (let i = 0; i < 256; i++) {
	simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
	simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function charFromCodepoint(c) {
	if (c <= 65535) return String.fromCharCode(c);
	return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
}
function fromHexCode$1(c) {
	if (c >= 48 && c <= 57) return c - 48;
	return (c | 32) - 97 + 10;
}
function escapedHexLen$1(c) {
	if (c === 120) return 2;
	if (c === 117) return 4;
	return 8;
}
function skipFoldedBreaks(input, position, end) {
	let breaks = 0;
	while (position < end) {
		const ch = input.charCodeAt(position);
		if (ch === 10) {
			breaks++;
			position++;
		} else if (ch === 13) {
			breaks++;
			position++;
			if (input.charCodeAt(position) === 10) position++;
		} else if (ch === 32 || ch === 9) position++;
		else break;
	}
	return {
		position,
		breaks
	};
}
function foldedBreaks(count) {
	if (count === 1) return " ";
	return "\n".repeat(count - 1);
}
function getPlainValue(input, start, end) {
	let result = "";
	let position = start;
	let captureStart = start;
	let captureEnd = start;
	while (position < end) {
		const ch = input.charCodeAt(position);
		if (ch === 10 || ch === 13) {
			result += input.slice(captureStart, captureEnd);
			const fold = skipFoldedBreaks(input, position, end);
			result += foldedBreaks(fold.breaks);
			position = captureStart = captureEnd = fold.position;
		} else {
			position++;
			if (ch !== 32 && ch !== 9) captureEnd = position;
		}
	}
	return result + input.slice(captureStart, captureEnd);
}
function getSingleQuotedValue(input, start, end) {
	let result = "";
	let position = start;
	let captureStart = start;
	let captureEnd = start;
	while (position < end) {
		const ch = input.charCodeAt(position);
		if (ch === 39) {
			result += input.slice(captureStart, position) + "'";
			position += 2;
			captureStart = captureEnd = position;
		} else if (ch === 10 || ch === 13) {
			result += input.slice(captureStart, captureEnd);
			const fold = skipFoldedBreaks(input, position, end);
			result += foldedBreaks(fold.breaks);
			position = captureStart = captureEnd = fold.position;
		} else {
			position++;
			if (ch !== 32 && ch !== 9) captureEnd = position;
		}
	}
	return result + input.slice(captureStart, end);
}
function getDoubleQuotedValue(input, start, end) {
	let result = "";
	let position = start;
	let captureStart = start;
	let captureEnd = start;
	while (position < end) {
		const ch = input.charCodeAt(position);
		if (ch === 92) {
			result += input.slice(captureStart, position);
			position++;
			const escaped = input.charCodeAt(position);
			if (escaped === 10 || escaped === 13) position = skipFoldedBreaks(input, position, end).position;
			else if (escaped < 256 && simpleEscapeCheck[escaped]) {
				result += simpleEscapeMap[escaped];
				position++;
			} else {
				let hexLength = escapedHexLen$1(escaped);
				let hexResult = 0;
				for (; hexLength > 0; hexLength--) {
					position++;
					const digit = fromHexCode$1(input.charCodeAt(position));
					hexResult = (hexResult << 4) + digit;
				}
				result += charFromCodepoint(hexResult);
				position++;
			}
			captureStart = captureEnd = position;
		} else if (ch === 10 || ch === 13) {
			result += input.slice(captureStart, captureEnd);
			const fold = skipFoldedBreaks(input, position, end);
			result += foldedBreaks(fold.breaks);
			position = captureStart = captureEnd = fold.position;
		} else {
			position++;
			if (ch !== 32 && ch !== 9) captureEnd = position;
		}
	}
	return result + input.slice(captureStart, end);
}
function getBlockValue(input, start, end, indent, chomping, folded) {
	const textIndent = indent < 0 ? 0 : indent;
	const region = input.slice(start, end).replace(/\r\n?/g, "\n");
	const lines = region === "" ? [] : (region.endsWith("\n") ? region.slice(0, -1) : region).split("\n");
	let result = "";
	let didReadContent = false;
	let emptyLines = 0;
	let atMoreIndented = false;
	for (const line of lines) {
		let column = 0;
		while (column < textIndent && line.charCodeAt(column) === 32) column++;
		if (indent < 0 || column >= line.length) {
			emptyLines++;
			continue;
		}
		const content = line.slice(textIndent);
		const first = content.charCodeAt(0);
		if (folded) if (first === 32 || first === 9) {
			atMoreIndented = true;
			result += "\n".repeat(didReadContent ? 1 + emptyLines : emptyLines);
		} else if (atMoreIndented) {
			atMoreIndented = false;
			result += "\n".repeat(emptyLines + 1);
		} else if (emptyLines === 0) {
			if (didReadContent) result += " ";
		} else result += "\n".repeat(emptyLines);
		else result += "\n".repeat(didReadContent ? 1 + emptyLines : emptyLines);
		result += content;
		didReadContent = true;
		emptyLines = 0;
	}
	if (chomping === CHOMPING_MODE.KEEP) result += "\n".repeat(didReadContent ? 1 + emptyLines : emptyLines);
	else if (chomping !== CHOMPING_MODE.STRIP) {
		if (didReadContent) result += "\n";
	}
	return result;
}
/**
* Decodes the scalar referenced by event offsets in `input`.
*
* @category Events
*/
function getScalarValue(input, scalar) {
	if (scalar.valueStart === NO_RANGE$3) return "";
	const { valueStart, valueEnd } = scalar;
	if (scalar.fast) return input.slice(valueStart, valueEnd);
	switch (scalar.style) {
		case SCALAR_STYLE.SINGLE_QUOTED: return getSingleQuotedValue(input, valueStart, valueEnd);
		case SCALAR_STYLE.DOUBLE_QUOTED: return getDoubleQuotedValue(input, valueStart, valueEnd);
		case SCALAR_STYLE.LITERAL_BLOCK: return getBlockValue(input, valueStart, valueEnd, scalar.indent, scalar.chomping, false);
		case SCALAR_STYLE.FOLDED_BLOCK: return getBlockValue(input, valueStart, valueEnd, scalar.indent, scalar.chomping, true);
		default: return getPlainValue(input, valueStart, valueEnd);
	}
}
var DEFAULT_TAG_HANDLERS = Object.assign(Object.create(null), {
	"!": "!",
	"!!": "tag:yaml.org,2002:"
});
function tagPercentEncode(source) {
	return encodeURI(source).replace(/!/g, "%21");
}
function tagNameFull(rawTag, tagHandlers) {
	if (rawTag.startsWith("!<") && rawTag.endsWith(">")) return decodeURIComponent(rawTag.slice(2, -1));
	const handleEnd = rawTag.indexOf("!", 1);
	const handle = handleEnd === -1 ? "!" : rawTag.slice(0, handleEnd + 1);
	const prefix = tagHandlers?.[handle] ?? DEFAULT_TAG_HANDLERS[handle] ?? handle;
	return decodeURIComponent(prefix) + decodeURIComponent(rawTag.slice(handle.length));
}
function tagNameShort(fullTag) {
	let tag = fullTag;
	if (tag.charCodeAt(0) === 33) {
		tag = tag.slice(1);
		return `!${tagPercentEncode(tag)}`;
	}
	if (tag.slice(0, 18) === "tag:yaml.org,2002:") return `!!${tagPercentEncode(tag.slice(18))}`;
	return `!<${tagPercentEncode(tag)}>`;
}
var NO_RANGE$2 = -1;
var MERGE_TAG_NAME = "tag:yaml.org,2002:merge";
var DEFAULT_CONSTRUCTOR_OPTIONS = {
	filename: "",
	schema: CORE_SCHEMA,
	json: false,
	maxTotalMergeKeys: 1e4,
	maxAliases: -1
};
function eventPosition$1(event) {
	if ("tagStart" in event && event.tagStart !== NO_RANGE$2) return event.tagStart;
	if ("anchorStart" in event && event.anchorStart !== NO_RANGE$2) return event.anchorStart;
	if ("valueStart" in event && event.valueStart !== NO_RANGE$2) return event.valueStart;
	if ("start" in event) return event.start;
	return 0;
}
function throwError$1(state, message) {
	YAMLException.throwAt(state.source, state.position, message, state.filename);
}
function finalizeCollection(state, position, tag, carrier) {
	try {
		return tag.finalize(carrier);
	} catch (error) {
		if (error instanceof YAMLException) throw error;
		YAMLException.throwAt(state.source, position, error instanceof Error ? error.message : String(error), state.filename);
	}
}
function constructScalar(state, event) {
	const source = getScalarValue(state.source, event);
	const rawTag = event.tagStart === NO_RANGE$2 ? "" : state.source.slice(event.tagStart, event.tagEnd);
	const strTag = state.schema.defaultScalarTag;
	if (rawTag !== "") {
		if (rawTag === "!") return {
			value: source,
			tag: strTag
		};
		const tagName = tagNameFull(rawTag, state.tagHandlers);
		const scalarTag = state.schema.lookupScalarTag(tagName);
		if (scalarTag) {
			const result = scalarTag.resolve(source, true, tagName);
			if (result === NOT_RESOLVED) throwError$1(state, `cannot resolve a node with !<${tagName}> explicit tag`);
			return {
				value: result,
				tag: scalarTag
			};
		}
		const collectionTagDef = state.schema.lookupMappingTag(tagName) ?? state.schema.lookupSequenceTag(tagName);
		if (collectionTagDef) {
			if (source !== "") throwError$1(state, `cannot resolve a node with !<${tagName}> explicit tag`);
			const carrier = collectionTagDef.create(tagName);
			return {
				value: collectionTagDef.carrierIsResult ? carrier : finalizeCollection(state, state.position, collectionTagDef, carrier),
				tag: collectionTagDef
			};
		}
		throwError$1(state, `unknown scalar tag !<${tagName}>`);
	}
	if (event.style === SCALAR_STYLE.PLAIN) return state.schema.resolveImplicitScalarTag(source);
	return {
		value: strTag.resolve(source, false, strTag.tagName),
		tag: strTag
	};
}
function collectionTagName(state, event, defaultTagName) {
	const rawTag = event.tagStart === NO_RANGE$2 ? "" : state.source.slice(event.tagStart, event.tagEnd);
	return rawTag === "" || rawTag === "!" ? defaultTagName : tagNameFull(rawTag, state.tagHandlers);
}
function isMappingTag(tag) {
	return tag.nodeKind === "mapping";
}
function chargeMergeWork(state) {
	state.totalMergeKeys++;
	if (state.maxTotalMergeKeys !== -1 && state.totalMergeKeys > state.maxTotalMergeKeys) throwError$1(state, `merge keys exceeded maxTotalMergeKeys (${state.maxTotalMergeKeys})`);
}
function mergeKeys(state, frame, source, sourceTag) {
	chargeMergeWork(state);
	for (const sourceKey of sourceTag.keys(source)) {
		chargeMergeWork(state);
		if (frame.tag.has(frame.value, sourceKey)) continue;
		const err = frame.tag.addPair(frame.value, sourceKey, sourceTag.get(source, sourceKey));
		if (err) throwError$1(state, err);
		frame.overridable ??= /* @__PURE__ */ new Set();
		frame.overridable.add(sourceKey);
	}
}
function mergeSource(state, frame, source, sourceTag) {
	state.position = frame.keyPosition;
	if (isMappingTag(sourceTag)) mergeKeys(state, frame, source, sourceTag);
	else if (sourceTag.nodeKind === "sequence" && Array.isArray(source)) {
		if (source.length > 100) throwError$1(state, "abnormal merge sequence size");
		for (const element of source) {
			const elementTag = state.nodeTags.get(element);
			if (!elementTag) throwError$1(state, "cannot merge mappings; the provided source object is unacceptable");
			mergeKeys(state, frame, element, elementTag);
		}
	} else throwError$1(state, "cannot merge mappings; the provided source object is unacceptable");
}
function addMappingValue(state, frame, key, value, tag) {
	state.position = frame.keyPosition;
	if (frame.keyIsMerge) {
		mergeSource(state, frame, value, tag);
		return;
	}
	if (!state.json && frame.tag.has(frame.value, key) && !frame.overridable?.has(key)) throwError$1(state, "duplicated mapping key");
	const err = frame.tag.addPair(frame.value, key, value);
	if (err) throwError$1(state, err);
	frame.overridable?.delete(key);
}
function addValue(state, value, tag) {
	const frame = state.frames[state.frames.length - 1];
	if (frame.kind === "document") {
		frame.value = value;
		frame.hasValue = true;
	} else if (frame.kind === "sequence") {
		if (isMappingTag(tag)) state.nodeTags.set(value, tag);
		const err = frame.tag.addItem(frame.value, value, frame.index++);
		if (err) throwError$1(state, err);
	} else if (frame.hasKey) {
		const key = frame.key;
		frame.key = void 0;
		frame.hasKey = false;
		addMappingValue(state, frame, key, value, tag);
	} else {
		frame.key = value;
		frame.keyPosition = state.position;
		frame.hasKey = true;
		frame.keyIsMerge = tag.tagName === MERGE_TAG_NAME;
	}
}
function storeAnchor(state, event, value, tag, isValueFinal) {
	if (event.anchorStart !== NO_RANGE$2) {
		const anchor = {
			value,
			tag,
			isValueFinal
		};
		state.anchors.set(state.source.slice(event.anchorStart, event.anchorEnd), anchor);
		return anchor;
	}
	return null;
}
/**
* Constructs JavaScript documents directly from parser events, without an
* intermediate AST.
*
* @category Events
*/
function constructFromEvents(events, options) {
	const state = {
		...DEFAULT_CONSTRUCTOR_OPTIONS,
		...options,
		events,
		documents: [],
		eventIndex: 0,
		position: 0,
		frames: [],
		anchors: /* @__PURE__ */ new Map(),
		nodeTags: /* @__PURE__ */ new Map(),
		tagHandlers: Object.create(null),
		totalMergeKeys: 0,
		aliasCount: 0
	};
	while (state.eventIndex < state.events.length) {
		const event = state.events[state.eventIndex++];
		state.position = eventPosition$1(event);
		switch (event.type) {
			case EVENT_ID.DOCUMENT:
				state.anchors = /* @__PURE__ */ new Map();
				state.nodeTags = /* @__PURE__ */ new Map();
				state.aliasCount = 0;
				state.tagHandlers = Object.create(null);
				for (const directive of event.directives) if (directive.kind === "tag") state.tagHandlers[directive.handle] = directive.prefix;
				state.frames.push({
					kind: "document",
					position: state.position,
					value: void 0,
					hasValue: false
				});
				break;
			case EVENT_ID.SCALAR: {
				const { value, tag } = constructScalar(state, event);
				storeAnchor(state, event, value, tag, true);
				addValue(state, value, tag);
				break;
			}
			case EVENT_ID.SEQUENCE: {
				const tagName = collectionTagName(state, event, "tag:yaml.org,2002:seq");
				const tag = state.schema.lookupSequenceTag(tagName);
				if (!tag) throwError$1(state, `unknown sequence tag !<${tagName}>`);
				const value = tag.create(tagName);
				const anchor = storeAnchor(state, event, value, tag, tag.carrierIsResult);
				state.frames.push({
					kind: "sequence",
					position: state.position,
					value,
					tag,
					anchor,
					index: 0
				});
				break;
			}
			case EVENT_ID.MAPPING: {
				const tagName = collectionTagName(state, event, "tag:yaml.org,2002:map");
				const tag = state.schema.lookupMappingTag(tagName);
				if (!tag) throwError$1(state, `unknown mapping tag !<${tagName}>`);
				const value = tag.create(tagName);
				const anchor = storeAnchor(state, event, value, tag, tag.carrierIsResult);
				state.frames.push({
					kind: "mapping",
					position: state.position,
					value,
					tag,
					anchor,
					key: void 0,
					keyPosition: state.position,
					hasKey: false,
					keyIsMerge: false,
					overridable: null
				});
				break;
			}
			case EVENT_ID.ALIAS: {
				if (state.maxAliases !== -1 && ++state.aliasCount > state.maxAliases) throwError$1(state, `aliases exceeded maxAliases (${state.maxAliases})`);
				const name = state.source.slice(event.anchorStart, event.anchorEnd);
				const anchor = state.anchors.get(name);
				if (!anchor) throwError$1(state, `unidentified alias "${name}"`);
				if (!anchor.isValueFinal) throwError$1(state, `recursive alias "${name}" is not supported for tag ${anchor.tag.tagName} because it uses finalize()`);
				addValue(state, anchor.value, anchor.tag);
				break;
			}
			case EVENT_ID.POP: {
				const frame = state.frames.pop();
				if (frame.kind === "mapping" && frame.hasKey) {
					state.position = frame.keyPosition;
					throwError$1(state, "incomplete mapping pair in event stream");
				}
				if (frame.kind === "document") state.documents.push(frame.value);
				else {
					const value = frame.tag.carrierIsResult ? frame.value : finalizeCollection(state, frame.position, frame.tag, frame.value);
					if (frame.anchor) {
						frame.anchor.value = value;
						frame.anchor.isValueFinal = true;
					}
					addValue(state, value, frame.tag);
				}
				break;
			}
		}
	}
	return state.documents;
}
var NO_RANGE$1 = -1;
var HAS_OWN = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]{}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![0-9A-Za-z-]+!)$/;
var NS_URI_CHAR = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`;
var NS_TAG_CHAR = String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`;
var PATTERN_TAG_URI = new RegExp(`^(?:${NS_URI_CHAR})*$`);
var PATTERN_TAG_SUFFIX = new RegExp(`^(?:${NS_TAG_CHAR})+$`);
var PATTERN_TAG_PREFIX = new RegExp(`^(?:!(?:${NS_URI_CHAR})*|${NS_TAG_CHAR}(?:${NS_URI_CHAR})*)$`);
var DEFAULT_PARSER_OPTIONS = {
	filename: "",
	maxDepth: 100
};
function addDocumentEvent(state, explicitStart, explicitEnd) {
	state.events.push({
		type: EVENT_ID.DOCUMENT,
		explicitStart,
		explicitEnd,
		directives: state.directives
	});
}
function addSequenceEvent(state, start, anchorStart, anchorEnd, tagStart, tagEnd, style) {
	state.events.push({
		type: EVENT_ID.SEQUENCE,
		start,
		anchorStart,
		anchorEnd,
		tagStart,
		tagEnd,
		style
	});
}
function addMappingEvent(state, start, anchorStart, anchorEnd, tagStart, tagEnd, style) {
	state.events.push({
		type: EVENT_ID.MAPPING,
		start,
		anchorStart,
		anchorEnd,
		tagStart,
		tagEnd,
		style
	});
}
function insertFlowPairMappingEvent(state, snapshot) {
	state.events.splice(snapshot.eventsLength, 0, {
		type: EVENT_ID.MAPPING,
		start: snapshot.position,
		anchorStart: NO_RANGE$1,
		anchorEnd: NO_RANGE$1,
		tagStart: NO_RANGE$1,
		tagEnd: NO_RANGE$1,
		style: COLLECTION_STYLE.FLOW
	});
}
function addScalarEvent(state, valueStart, valueEnd, anchorStart, anchorEnd, tagStart, tagEnd, style, chomping = CHOMPING_MODE.CLIP, indent = -1, fast = false) {
	state.events.push({
		type: EVENT_ID.SCALAR,
		valueStart,
		valueEnd,
		anchorStart,
		anchorEnd,
		tagStart,
		tagEnd,
		style,
		chomping,
		indent,
		fast
	});
}
function addAliasEvent(state, anchorStart, anchorEnd) {
	state.events.push({
		type: EVENT_ID.ALIAS,
		anchorStart,
		anchorEnd
	});
}
function addPopEvent(state) {
	state.events.push({ type: EVENT_ID.POP });
}
function addEmptyScalarEvent(state) {
	addScalarEvent(state, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, NO_RANGE$1, SCALAR_STYLE.PLAIN);
}
function emptyProperties() {
	return {
		anchorStart: NO_RANGE$1,
		anchorEnd: NO_RANGE$1,
		tagStart: NO_RANGE$1,
		tagEnd: NO_RANGE$1
	};
}
function snapshotState(state) {
	return {
		position: state.position,
		line: state.line,
		lineStart: state.lineStart,
		lineIndent: state.lineIndent,
		firstTabInLine: state.firstTabInLine,
		eventsLength: state.events.length
	};
}
function restoreState(state, snapshot) {
	state.position = snapshot.position;
	state.line = snapshot.line;
	state.lineStart = snapshot.lineStart;
	state.lineIndent = snapshot.lineIndent;
	state.firstTabInLine = snapshot.firstTabInLine;
	state.events.length = snapshot.eventsLength;
}
function throwError(state, message) {
	YAMLException.throwAt(state.input.slice(0, state.length), state.position, message, state.filename);
}
function isEol(c) {
	return c === 10 || c === 13;
}
function isWhiteSpace(c) {
	return c === 9 || c === 32;
}
function isWsOrEol(c) {
	return isWhiteSpace(c) || isEol(c);
}
function isWsOrEolOrEnd(c) {
	return c === 0 || isWsOrEol(c);
}
function isFlowIndicator(c) {
	return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromDecimalCode(c) {
	return c >= 48 && c <= 57 ? c - 48 : -1;
}
function fromHexCode(c) {
	if (c >= 48 && c <= 57) return c - 48;
	const lc = c | 32;
	if (lc >= 97 && lc <= 102) return lc - 97 + 10;
	return -1;
}
function escapedHexLen(c) {
	if (c === 120) return 2;
	if (c === 117) return 4;
	if (c === 85) return 8;
	return 0;
}
function isSimpleEscape(c) {
	return c === 48 || c === 97 || c === 98 || c === 116 || c === 9 || c === 110 || c === 118 || c === 102 || c === 114 || c === 101 || c === 32 || c === 34 || c === 47 || c === 92 || c === 78 || c === 95 || c === 76 || c === 80;
}
function consumeLineBreak(state) {
	if (state.input.charCodeAt(state.position) === 10) state.position++;
	else {
		state.position++;
		if (state.input.charCodeAt(state.position) === 10) state.position++;
	}
	state.line++;
	state.lineStart = state.position;
	state.lineIndent = 0;
	state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments) {
	let lineBreaks = 0;
	let ch = state.input.charCodeAt(state.position);
	let hasSeparation = state.position === state.lineStart || isWsOrEol(state.input.charCodeAt(state.position - 1));
	while (ch !== 0) {
		while (isWhiteSpace(ch)) {
			hasSeparation = true;
			if (ch === 9 && state.firstTabInLine === -1) state.firstTabInLine = state.position;
			ch = state.input.charCodeAt(++state.position);
		}
		if (allowComments && hasSeparation && ch === 35) do
			ch = state.input.charCodeAt(++state.position);
		while (!isEol(ch) && ch !== 0);
		if (!isEol(ch)) break;
		consumeLineBreak(state);
		lineBreaks++;
		hasSeparation = true;
		ch = state.input.charCodeAt(state.position);
		while (ch === 32) {
			state.lineIndent++;
			ch = state.input.charCodeAt(++state.position);
		}
	}
	return lineBreaks;
}
function testDocumentSeparator(state, position = state.position) {
	const ch = state.input.charCodeAt(position);
	if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(position + 1) && ch === state.input.charCodeAt(position + 2)) {
		const following = state.input.charCodeAt(position + 3);
		return following === 0 || isWsOrEol(following);
	}
	return false;
}
function skipByteOrderMark(state) {
	if (state.position === state.lineStart && state.input.charCodeAt(state.position) === 65279) {
		state.position++;
		state.lineStart = state.position;
	}
}
function testDocumentBoundary(state) {
	if (state.position !== state.lineStart) return false;
	if (testDocumentSeparator(state)) return true;
	if (state.input.charCodeAt(state.position) !== 65279) return false;
	const snapshot = snapshotState(state);
	skipByteOrderMark(state);
	skipSeparationSpace(state, true);
	const ch = state.input.charCodeAt(state.position);
	const result = state.position === state.lineStart && (ch === 37 || ch === 45 && testDocumentSeparator(state));
	restoreState(state, snapshot);
	return result;
}
function skipUntilLineEnd(state) {
	let ch = state.input.charCodeAt(state.position);
	while (ch !== 0 && !isEol(ch)) ch = state.input.charCodeAt(++state.position);
}
function checkPrintable(state, start, end) {
	if (PATTERN_NON_PRINTABLE.test(state.input.slice(start, end))) throwError(state, "the stream contains non-printable characters");
}
function readTagProperty(state, props, inFlow) {
	if (state.input.charCodeAt(state.position) !== 33) return false;
	if (props.tagStart !== NO_RANGE$1) throwError(state, "duplication of a tag property");
	const start = state.position;
	let isVerbatim = false;
	let isNamed = false;
	let tagHandle = "!";
	let ch = state.input.charCodeAt(++state.position);
	if (ch === 60) {
		isVerbatim = true;
		ch = state.input.charCodeAt(++state.position);
	} else if (ch === 33) {
		isNamed = true;
		tagHandle = "!!";
		ch = state.input.charCodeAt(++state.position);
	}
	let suffixStart = state.position;
	let tagName;
	if (isVerbatim) {
		while (ch !== 0 && ch !== 62) ch = state.input.charCodeAt(++state.position);
		if (ch !== 62) throwError(state, "unexpected end of the stream within a verbatim tag");
		tagName = state.input.slice(suffixStart, state.position);
		state.position++;
	} else {
		while (ch !== 0 && !isWsOrEol(ch) && !(inFlow && isFlowIndicator(ch))) {
			if (ch === 33) if (!isNamed) {
				tagHandle = state.input.slice(suffixStart - 1, state.position + 1);
				if (!PATTERN_TAG_HANDLE.test(tagHandle)) throwError(state, "named tag handle cannot contain such characters");
				isNamed = true;
				suffixStart = state.position + 1;
			} else throwError(state, "tag suffix cannot contain exclamation marks");
			ch = state.input.charCodeAt(++state.position);
		}
		tagName = state.input.slice(suffixStart, state.position);
		if (PATTERN_FLOW_INDICATORS.test(tagName)) throwError(state, "tag suffix cannot contain flow indicator characters");
	}
	if (tagName && !(isVerbatim ? PATTERN_TAG_URI.test(tagName) : PATTERN_TAG_SUFFIX.test(tagName))) throwError(state, `tag name cannot contain such characters: ${tagName}`);
	if (!isVerbatim && tagHandle !== "!" && tagHandle !== "!!" && !HAS_OWN.call(state.tagHandlers, tagHandle)) throwError(state, `undeclared tag handle "${tagHandle}"`);
	props.tagStart = start;
	props.tagEnd = state.position;
	return true;
}
function readAnchorProperty(state, props) {
	if (state.input.charCodeAt(state.position) !== 38) return false;
	if (props.anchorStart !== NO_RANGE$1) throwError(state, "duplication of an anchor property");
	state.position++;
	const start = state.position;
	while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position)) && !isFlowIndicator(state.input.charCodeAt(state.position))) state.position++;
	if (state.position === start) throwError(state, "name of an anchor node must contain at least one character");
	props.anchorStart = start;
	props.anchorEnd = state.position;
	return true;
}
function readAlias(state, props) {
	if (state.input.charCodeAt(state.position) !== 42) return false;
	if (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1) throwError(state, "alias node should not have any properties");
	state.position++;
	const start = state.position;
	while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position)) && !isFlowIndicator(state.input.charCodeAt(state.position))) state.position++;
	if (state.position === start) throwError(state, "name of an alias node must contain at least one character");
	addAliasEvent(state, start, state.position);
	return true;
}
function readFlowScalarBreak(state, nodeIndent) {
	skipSeparationSpace(state, false);
	if (state.lineIndent < nodeIndent) throwError(state, "deficient indentation");
}
function readSingleQuotedScalar(state, nodeIndent, props) {
	if (state.input.charCodeAt(state.position) !== 39) return false;
	state.position++;
	const start = state.position;
	let simple = true;
	while (state.input.charCodeAt(state.position) !== 0) {
		const ch = state.input.charCodeAt(state.position);
		if (ch === 39) {
			if (state.input.charCodeAt(state.position + 1) === 39) {
				simple = false;
				state.position += 2;
				continue;
			}
			const end = state.position;
			state.position++;
			addScalarEvent(state, start, end, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, SCALAR_STYLE.SINGLE_QUOTED, CHOMPING_MODE.CLIP, -1, simple);
			return true;
		}
		if (isEol(ch)) {
			simple = false;
			readFlowScalarBreak(state, nodeIndent);
		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a single quoted scalar");
		else if (ch !== 9 && ch < 32) throwError(state, "expected valid JSON character");
		else state.position++;
	}
	throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent, props) {
	if (state.input.charCodeAt(state.position) !== 34) return false;
	state.position++;
	const start = state.position;
	let simple = true;
	while (state.input.charCodeAt(state.position) !== 0) {
		const ch = state.input.charCodeAt(state.position);
		if (ch === 34) {
			const end = state.position;
			state.position++;
			addScalarEvent(state, start, end, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, SCALAR_STYLE.DOUBLE_QUOTED, CHOMPING_MODE.CLIP, -1, simple);
			return true;
		}
		if (ch === 92) {
			simple = false;
			const escaped = state.input.charCodeAt(++state.position);
			if (isEol(escaped)) readFlowScalarBreak(state, nodeIndent);
			else if (isSimpleEscape(escaped)) state.position++;
			else {
				let hexLength = escapedHexLen(escaped);
				if (hexLength === 0) throwError(state, "unknown escape sequence");
				while (hexLength-- > 0) {
					state.position++;
					if (fromHexCode(state.input.charCodeAt(state.position)) < 0) throwError(state, "expected hexadecimal character");
				}
				state.position++;
			}
		} else if (isEol(ch)) {
			simple = false;
			readFlowScalarBreak(state, nodeIndent);
		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a double quoted scalar");
		else if (ch !== 9 && ch < 32) throwError(state, "expected valid JSON character");
		else state.position++;
	}
	throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readBlockScalar(state, parentIndent, props) {
	const ch = state.input.charCodeAt(state.position);
	let chomping = CHOMPING_MODE.CLIP;
	let indent = -1;
	let detectedIndent = false;
	if (ch !== 124 && ch !== 62) return false;
	const style = ch === 124 ? SCALAR_STYLE.LITERAL_BLOCK : SCALAR_STYLE.FOLDED_BLOCK;
	state.position++;
	while (state.input.charCodeAt(state.position) !== 0) {
		const current = state.input.charCodeAt(state.position);
		const digit = fromDecimalCode(current);
		if (current === 43 || current === 45) {
			if (chomping !== CHOMPING_MODE.CLIP) throwError(state, "repeat of a chomping mode identifier");
			chomping = current === 43 ? CHOMPING_MODE.KEEP : CHOMPING_MODE.STRIP;
			state.position++;
		} else if (digit >= 0) {
			if (digit === 0) throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
			if (detectedIndent) throwError(state, "repeat of an indentation width identifier");
			indent = parentIndent + digit - 1;
			detectedIndent = true;
			state.position++;
		} else break;
	}
	let hadWhitespace = false;
	while (isWhiteSpace(state.input.charCodeAt(state.position))) {
		hadWhitespace = true;
		state.position++;
	}
	if (hadWhitespace && state.input.charCodeAt(state.position) === 35) skipUntilLineEnd(state);
	if (isEol(state.input.charCodeAt(state.position))) consumeLineBreak(state);
	else if (state.input.charCodeAt(state.position) !== 0) throwError(state, "a line break is expected");
	let contentIndent = detectedIndent ? indent : -1;
	let maxLeadingIndent = 0;
	const valueStart = state.position;
	let valueEnd = state.position;
	while (state.input.charCodeAt(state.position) !== 0) {
		const linePosition = state.position;
		let column = 0;
		while (state.input.charCodeAt(linePosition + column) === 32) column++;
		const first = state.input.charCodeAt(linePosition + column);
		if (first === 0) {
			if (contentIndent >= 0) {
				if (column > contentIndent) valueEnd = linePosition + column;
			} else if (column > 0) valueEnd = linePosition + column;
			break;
		}
		if (testDocumentBoundary(state)) break;
		if (!detectedIndent && contentIndent === -1 && isEol(first)) maxLeadingIndent = Math.max(maxLeadingIndent, column);
		if (!detectedIndent && contentIndent === -1 && !isEol(first)) {
			if (first === 9 && column < parentIndent) {
				state.position = linePosition + column;
				throwError(state, "tab characters must not be used in indentation");
			}
			if (column < maxLeadingIndent) {
				state.position = linePosition + column;
				throwError(state, "bad indentation of a mapping entry");
			}
		}
		if (contentIndent === -1 && first !== 0 && !isEol(first) && column < parentIndent) {
			state.lineIndent = column;
			state.position = linePosition + column;
			break;
		}
		if (!detectedIndent && first !== 0 && !isEol(first) && contentIndent === -1) contentIndent = column;
		const requiredIndent = contentIndent === -1 ? parentIndent + 1 : contentIndent;
		if (first !== 0 && !isEol(first) && column < requiredIndent) {
			state.lineIndent = column;
			state.position = linePosition + column;
			break;
		}
		skipUntilLineEnd(state);
		valueEnd = state.position;
		if (isEol(state.input.charCodeAt(state.position))) {
			consumeLineBreak(state);
			valueEnd = state.position;
		}
	}
	checkPrintable(state, valueStart, valueEnd);
	addScalarEvent(state, valueStart, valueEnd, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, style, chomping, contentIndent);
	return true;
}
function canStartPlainScalar(state, nodeContext) {
	const ch = state.input.charCodeAt(state.position);
	const inFlow = nodeContext === CONTEXT_FLOW_IN;
	if (ch === 0 || isWsOrEol(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96 || inFlow && isFlowIndicator(ch)) return false;
	if (ch === 63 || ch === 45) {
		const following = state.input.charCodeAt(state.position + 1);
		if (isWsOrEolOrEnd(following) || inFlow && isFlowIndicator(following)) return false;
	}
	return true;
}
function readPlainScalar(state, nodeIndent, nodeContext, props) {
	if (!canStartPlainScalar(state, nodeContext)) return false;
	const start = state.position;
	let end = state.position;
	let ch = state.input.charCodeAt(state.position);
	const inFlow = nodeContext === CONTEXT_FLOW_IN;
	let multiline = false;
	while (ch !== 0) {
		if (testDocumentBoundary(state)) break;
		if (ch === 58) {
			const following = state.input.charCodeAt(state.position + 1);
			if (isWsOrEolOrEnd(following) || inFlow && isFlowIndicator(following)) break;
		} else if (ch === 35) {
			if (isWsOrEol(state.input.charCodeAt(state.position - 1))) break;
		} else if (inFlow && isFlowIndicator(ch)) break;
		else if (isEol(ch)) {
			const savedPosition = state.position;
			const savedLine = state.line;
			const savedLineStart = state.lineStart;
			const savedLineIndent = state.lineIndent;
			skipSeparationSpace(state, false);
			if (state.lineIndent >= nodeIndent) {
				multiline = true;
				ch = state.input.charCodeAt(state.position);
				continue;
			}
			state.position = savedPosition;
			state.line = savedLine;
			state.lineStart = savedLineStart;
			state.lineIndent = savedLineIndent;
			break;
		}
		if (!isWhiteSpace(ch)) end = state.position + 1;
		ch = state.input.charCodeAt(++state.position);
	}
	if (end === start) return false;
	checkPrintable(state, start, end);
	addScalarEvent(state, start, end, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, SCALAR_STYLE.PLAIN, CHOMPING_MODE.CLIP, -1, !multiline);
	return true;
}
function skipFlowSeparationSpace(state, nodeIndent) {
	const startLine = state.line;
	skipSeparationSpace(state, true);
	if (state.line > startLine && state.lineIndent < nodeIndent || state.firstTabInLine !== -1 && state.lineIndent < nodeIndent) throwError(state, "deficient indentation");
}
function readFlowCollection(state, nodeIndent, props) {
	const ch = state.input.charCodeAt(state.position);
	const isMapping = ch === 123;
	const start = state.position;
	let readNext = true;
	if (ch !== 91 && ch !== 123) return false;
	const terminator = isMapping ? 125 : 93;
	if (isMapping) addMappingEvent(state, start, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, COLLECTION_STYLE.FLOW);
	else addSequenceEvent(state, start, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, COLLECTION_STYLE.FLOW);
	state.position++;
	while (state.input.charCodeAt(state.position) !== 0) {
		skipFlowSeparationSpace(state, nodeIndent);
		let ch = state.input.charCodeAt(state.position);
		if (ch === terminator) {
			state.position++;
			addPopEvent(state);
			return true;
		} else if (!readNext) throwError(state, "missed comma between flow collection entries");
		else if (ch === 44) throwError(state, "expected the node content, but found ','");
		let isPair = false;
		let isExplicitPair = false;
		if (ch === 63 && isWsOrEol(state.input.charCodeAt(state.position + 1))) {
			isPair = isExplicitPair = true;
			state.position += 1;
			skipFlowSeparationSpace(state, nodeIndent);
		}
		const entryLine = state.line;
		const entryStart = snapshotState(state);
		const keyWasRead = parseNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
		skipFlowSeparationSpace(state, nodeIndent);
		ch = state.input.charCodeAt(state.position);
		if ((isMapping || isExplicitPair || state.line === entryLine) && ch === 58) {
			isPair = true;
			state.position++;
			skipFlowSeparationSpace(state, nodeIndent);
			if (!isMapping) {
				insertFlowPairMappingEvent(state, entryStart);
				if (!keyWasRead) addEmptyScalarEvent(state);
			} else if (!keyWasRead) addEmptyScalarEvent(state);
			if (!parseNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true)) addEmptyScalarEvent(state);
			skipFlowSeparationSpace(state, nodeIndent);
			if (!isMapping) addPopEvent(state);
		} else if (isMapping && isPair) {
			if (!keyWasRead) addEmptyScalarEvent(state);
			addEmptyScalarEvent(state);
		} else if (isMapping) addEmptyScalarEvent(state);
		else if (isPair) {
			insertFlowPairMappingEvent(state, entryStart);
			if (!keyWasRead) addEmptyScalarEvent(state);
			addEmptyScalarEvent(state);
			addPopEvent(state);
		}
		ch = state.input.charCodeAt(state.position);
		if (ch === 44) {
			readNext = true;
			state.position++;
		} else readNext = false;
	}
	throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockSequence(state, nodeIndent, props) {
	if (state.firstTabInLine !== -1 || state.input.charCodeAt(state.position) !== 45 || !isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) return false;
	addSequenceEvent(state, state.position, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, COLLECTION_STYLE.BLOCK);
	while (state.input.charCodeAt(state.position) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) {
		if (state.firstTabInLine !== -1) {
			state.position = state.firstTabInLine;
			throwError(state, "tab characters must not be used in indentation");
		}
		const entryLine = state.line;
		state.position++;
		const hadBreak = skipSeparationSpace(state, true) > 0;
		if (state.firstTabInLine !== -1 && state.input.charCodeAt(state.position) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) throwError(state, "bad indentation of a sequence entry");
		if (hadBreak && state.lineIndent <= nodeIndent) addEmptyScalarEvent(state);
		else parseNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
		skipSeparationSpace(state, true);
		if (state.lineIndent < nodeIndent || state.position >= state.length) break;
		if (state.lineIndent > nodeIndent) throwError(state, "bad indentation of a sequence entry");
		if (state.line === entryLine && state.input.charCodeAt(state.position) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 1))) throwError(state, "bad indentation of a sequence entry");
	}
	addPopEvent(state);
	return true;
}
function readBlockMapping(state, nodeIndent, flowIndent, props) {
	let atExplicitKey = false;
	let detected = false;
	let mappingOpened = false;
	let pendingExplicitKey = false;
	if (state.firstTabInLine !== -1) return false;
	let ch = state.input.charCodeAt(state.position);
	while (ch !== 0) {
		if (!atExplicitKey && state.firstTabInLine !== -1) {
			state.position = state.firstTabInLine;
			throwError(state, "tab characters must not be used in indentation");
		}
		const following = state.input.charCodeAt(state.position + 1);
		const entryLine = state.line;
		if ((ch === 63 || ch === 58) && isWsOrEolOrEnd(following)) {
			if (!mappingOpened) {
				addMappingEvent(state, state.position, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, COLLECTION_STYLE.BLOCK);
				mappingOpened = true;
			}
			if (ch === 63) {
				if (atExplicitKey) addEmptyScalarEvent(state);
				detected = true;
				atExplicitKey = true;
			} else if (atExplicitKey) atExplicitKey = false;
			else {
				addEmptyScalarEvent(state);
				detected = true;
				atExplicitKey = false;
			}
			state.position += 1;
			pendingExplicitKey = true;
		} else {
			if (atExplicitKey) {
				addEmptyScalarEvent(state);
				atExplicitKey = false;
			}
			const beforeKey = snapshotState(state);
			if (!parseNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) break;
			if (state.line === entryLine) {
				ch = state.input.charCodeAt(state.position);
				while (isWhiteSpace(ch)) ch = state.input.charCodeAt(++state.position);
				if (ch === 58) {
					ch = state.input.charCodeAt(++state.position);
					if (!isWsOrEolOrEnd(ch)) throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
					if (!mappingOpened) {
						restoreState(state, beforeKey);
						addMappingEvent(state, beforeKey.position, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, COLLECTION_STYLE.BLOCK);
						mappingOpened = true;
						parseNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true);
						ch = state.input.charCodeAt(state.position);
						while (isWhiteSpace(ch)) ch = state.input.charCodeAt(++state.position);
						state.position++;
					}
					detected = true;
					atExplicitKey = false;
					pendingExplicitKey = false;
				} else if (detected) throwError(state, "expected ':' after a mapping key");
				else {
					if (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1) {
						restoreState(state, beforeKey);
						return false;
					}
					return true;
				}
			} else if (detected) throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
			else {
				if (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1) {
					restoreState(state, beforeKey);
					return false;
				}
				return true;
			}
		}
		if (parseNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, pendingExplicitKey)) pendingExplicitKey = false;
		if (!atExplicitKey) {
			if (pendingExplicitKey) {
				addEmptyScalarEvent(state);
				pendingExplicitKey = false;
			}
		}
		skipSeparationSpace(state, true);
		ch = state.input.charCodeAt(state.position);
		if ((state.line === entryLine || state.lineIndent > nodeIndent) && ch !== 0) throwError(state, "bad indentation of a mapping entry");
		else if (state.lineIndent < nodeIndent) break;
	}
	if (!detected) return false;
	if (atExplicitKey) addEmptyScalarEvent(state);
	if (mappingOpened) addPopEvent(state);
	return true;
}
function parseNode(state, parentIndent, nodeContext, allowToSeek, allowCompact, allowPropertyMapping = true) {
	if (state.depth >= state.maxDepth) throwError(state, `nesting exceeded maxDepth (${state.maxDepth})`);
	state.depth++;
	let indentStatus = 1;
	let atNewLine = false;
	let hasContent = false;
	let propertyStart = null;
	const props = emptyProperties();
	let allowBlockScalars = nodeContext === CONTEXT_BLOCK_OUT || nodeContext === CONTEXT_BLOCK_IN;
	let allowBlockCollections = allowBlockScalars;
	const allowBlockStyles = allowBlockScalars;
	if (allowToSeek && skipSeparationSpace(state, true)) {
		atNewLine = true;
		if (state.lineIndent > parentIndent) indentStatus = 1;
		else if (state.lineIndent === parentIndent) indentStatus = 0;
		else indentStatus = -1;
	}
	if (indentStatus === 1) while (true) {
		const ch = state.input.charCodeAt(state.position);
		const propertyState = snapshotState(state);
		if (atNewLine && indentStatus !== 1 && (ch === 33 || ch === 38)) break;
		if (atNewLine && allowBlockStyles && (props.tagStart !== NO_RANGE$1 || props.anchorStart !== NO_RANGE$1) && (ch === 33 || ch === 38)) {
			const fallbackState = snapshotState(state);
			const flowIndent = parentIndent + 1;
			if (readBlockMapping(state, state.position - state.lineStart, flowIndent, props) && state.events[fallbackState.eventsLength]?.type === EVENT_ID.MAPPING) {
				state.depth--;
				return true;
			}
			restoreState(state, fallbackState);
		}
		if (atNewLine && (ch === 33 && props.tagStart !== NO_RANGE$1 || ch === 38 && props.anchorStart !== NO_RANGE$1)) break;
		if (!readTagProperty(state, props, nodeContext === CONTEXT_FLOW_IN) && !readAnchorProperty(state, props)) break;
		if (propertyStart === null) propertyStart = propertyState;
		if (skipSeparationSpace(state, true)) {
			atNewLine = true;
			allowBlockCollections = allowBlockStyles;
			if (state.lineIndent > parentIndent) indentStatus = 1;
			else if (state.lineIndent === parentIndent) indentStatus = 0;
			else indentStatus = -1;
		} else allowBlockCollections = false;
	}
	if (allowBlockCollections) allowBlockCollections = atNewLine || allowCompact;
	if (indentStatus === 1 || nodeContext === CONTEXT_BLOCK_OUT) {
		const flowIndent = nodeContext === CONTEXT_FLOW_IN || nodeContext === CONTEXT_FLOW_OUT ? parentIndent : parentIndent + 1;
		const blockIndent = state.position - state.lineStart;
		if (indentStatus === 1) if (allowBlockCollections && (readBlockSequence(state, blockIndent, props) || readBlockMapping(state, blockIndent, flowIndent, props)) || readFlowCollection(state, flowIndent, props)) hasContent = true;
		else {
			const ch = state.input.charCodeAt(state.position);
			if (propertyStart !== null && allowPropertyMapping && allowBlockStyles && !allowBlockCollections && ch !== 124 && ch !== 62) {
				const fallbackState = snapshotState(state);
				const propertyIndent = propertyStart.position - propertyStart.lineStart;
				restoreState(state, propertyStart);
				if (readBlockMapping(state, propertyIndent, flowIndent, emptyProperties()) && state.events[fallbackState.eventsLength]?.type === EVENT_ID.MAPPING) hasContent = true;
				else restoreState(state, fallbackState);
			}
			if (!hasContent && (allowBlockScalars && readBlockScalar(state, flowIndent, props) || readSingleQuotedScalar(state, flowIndent, props) || readDoubleQuotedScalar(state, flowIndent, props) || readAlias(state, props) || readPlainScalar(state, flowIndent, nodeContext, props))) hasContent = true;
		}
		else if (indentStatus === 0) hasContent = allowBlockCollections && readBlockSequence(state, blockIndent, props);
	}
	allowBlockScalars = allowBlockScalars && !hasContent;
	if (!hasContent && (props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1 || allowBlockScalars)) {
		addScalarEvent(state, NO_RANGE$1, NO_RANGE$1, props.anchorStart, props.anchorEnd, props.tagStart, props.tagEnd, SCALAR_STYLE.PLAIN);
		hasContent = true;
	}
	state.depth--;
	return hasContent || props.anchorStart !== NO_RANGE$1 || props.tagStart !== NO_RANGE$1;
}
function readDirective(state) {
	if (state.lineIndent > 0 || state.input.charCodeAt(state.position) !== 37) return false;
	state.position++;
	const nameStart = state.position;
	while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position))) state.position++;
	const name = state.input.slice(nameStart, state.position);
	const args = [];
	if (name.length === 0) throwError(state, "directive name must not be less than one character in length");
	while (state.input.charCodeAt(state.position) !== 0 && !isEol(state.input.charCodeAt(state.position))) {
		while (isWhiteSpace(state.input.charCodeAt(state.position))) state.position++;
		if (state.input.charCodeAt(state.position) === 35 || isEol(state.input.charCodeAt(state.position)) || state.input.charCodeAt(state.position) === 0) break;
		const start = state.position;
		while (state.input.charCodeAt(state.position) !== 0 && !isWsOrEol(state.input.charCodeAt(state.position))) state.position++;
		args.push(state.input.slice(start, state.position));
	}
	if (isEol(state.input.charCodeAt(state.position))) consumeLineBreak(state);
	if (name === "YAML") {
		if (state.directives.some((directive) => directive.kind === "yaml")) throwError(state, "duplication of %YAML directive");
		if (args.length !== 1) throwError(state, "YAML directive accepts exactly one argument");
		const match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
		if (match === null) throwError(state, "ill-formed argument of the YAML directive");
		if (parseInt(match[1], 10) !== 1) throwError(state, "unacceptable YAML version of the document");
		state.directives.push({
			kind: "yaml",
			version: args[0]
		});
	} else if (name === "TAG") {
		if (args.length !== 2) throwError(state, "TAG directive accepts exactly two arguments");
		const [handle, prefix] = args;
		if (!PATTERN_TAG_HANDLE.test(handle)) throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
		if (HAS_OWN.call(state.tagHandlers, handle)) throwError(state, `there is a previously declared suffix for "${handle}" tag handle`);
		if (!PATTERN_TAG_PREFIX.test(prefix)) throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
		state.tagHandlers[handle] = prefix;
		state.directives.push({
			kind: "tag",
			handle,
			prefix
		});
	}
	return true;
}
function readDocument(state) {
	state.directives = [];
	state.tagHandlers = Object.create(null);
	let hasDirectives = false;
	skipSeparationSpace(state, true);
	while (readDirective(state)) {
		hasDirectives = true;
		skipSeparationSpace(state, true);
	}
	let explicitStart = false;
	let explicitEnd = false;
	let allowCompact = true;
	if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45 && isWsOrEolOrEnd(state.input.charCodeAt(state.position + 3))) {
		explicitStart = true;
		const markerLine = state.line;
		state.position += 3;
		skipSeparationSpace(state, true);
		allowCompact = state.line > markerLine;
	} else if (hasDirectives) throwError(state, "directives end mark is expected");
	const documentEventIndex = state.events.length;
	if (!explicitStart && state.position === state.lineStart && state.input.charCodeAt(state.position) === 46 && testDocumentSeparator(state)) {
		state.position += 3;
		skipSeparationSpace(state, true);
		return;
	}
	addDocumentEvent(state, explicitStart, false);
	if (!parseNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, allowCompact, allowCompact)) addEmptyScalarEvent(state);
	skipSeparationSpace(state, true);
	if (state.position === state.lineStart && testDocumentSeparator(state)) {
		explicitEnd = state.input.charCodeAt(state.position) === 46;
		if (explicitEnd) {
			const markerLine = state.line;
			state.position += 3;
			skipSeparationSpace(state, true);
			if (state.line === markerLine && state.position < state.length) throwError(state, "end of the stream or a document separator is expected");
		}
	}
	const documentEvent = state.events[documentEventIndex];
	if (documentEvent?.type === EVENT_ID.DOCUMENT) documentEvent.explicitEnd = explicitEnd;
	addPopEvent(state);
	if (!explicitEnd && state.position < state.length && !testDocumentBoundary(state)) throwError(state, "end of the stream or a document separator is expected");
}
/**
* Parses YAML into a flat event stream referencing source text by offsets.
*
* @category Events
*/
function parseEvents(input, options) {
	const length = input.length;
	const state = {
		...DEFAULT_PARSER_OPTIONS,
		...options,
		input: `${input}\0`,
		length,
		position: 0,
		line: 0,
		lineStart: 0,
		lineIndent: 0,
		firstTabInLine: -1,
		depth: 0,
		directives: [],
		tagHandlers: Object.create(null),
		events: []
	};
	const nullpos = input.indexOf("\0");
	if (nullpos !== -1) YAMLException.throwAt(input, nullpos, "null byte is not allowed in input", state.filename);
	while (state.position < state.length) {
		skipByteOrderMark(state);
		skipSeparationSpace(state, true);
		if (state.position >= state.length) break;
		const documentStart = state.position;
		readDocument(state);
		if (state.position === documentStart)
 /* c8 ignore next */
		throwError(state, "can not read a document");
	}
	return state.events;
}
var DEFAULT_LOAD_OPTIONS = {
	...DEFAULT_PARSER_OPTIONS,
	...DEFAULT_CONSTRUCTOR_OPTIONS
};
function loadDocuments(input, options = {}) {
	const opts = {
		...DEFAULT_LOAD_OPTIONS,
		...options
	};
	const source = String(input);
	const PARSER_OPT_KEYS = Object.keys(DEFAULT_PARSER_OPTIONS);
	const CONSTRUCTOR_OPT_KEYS = Object.keys(DEFAULT_CONSTRUCTOR_OPTIONS);
	return constructFromEvents(parseEvents(source, pick(opts, PARSER_OPT_KEYS)), {
		...pick(opts, CONSTRUCTOR_OPT_KEYS),
		source
	});
}
/**
* Parses `string` as a single YAML document. Throws {@link YAMLException} on
* error. This function does not understand multi-document or empty sources; it
* throws an exception on those.
*
* > [!NOTE]
* > 1. When processing untrusted input, see the
* >    [security considerations](../docs/safety.md).
* > 2. All exceptions MUST be caught, not just {@link YAMLException}.
* > 3. The default {@link CORE_SCHEMA} comes without the `!!merge` tag. You can
* >    easily enable it if needed.
* > 4. The default {@link mapTag} is `{}`-object based, with known limitations
* >    (see description). For full compatibility use {@link realMapTag}
* >    instead (it uses native JS `Map`).
*
* @example
* Enable {@link mergeTag} and {@link realMapTag}:
*
* ```javascript
* import { load, CORE_SCHEMA, mergeTag, realMapTag } from 'js-yaml'
*
* try {
*   load(data, { schema: CORE_SCHEMA.withTags(mergeTag, realMapTag) })
* } catch (e) {
*   console.error(e)
* }
* ```
*
* @category Main
*/
function load(input, options) {
	const documents = loadDocuments(input, options);
	if (documents.length === 0) throw new YAMLException("expected a document, but the input is empty");
	if (documents.length === 1) return documents[0];
	throw new YAMLException("expected a single document in the stream, but found more");
}
var INVALID = Symbol("INVALID");
function buildRepresentTypes(schema) {
	const defaultTags = new Set([
		schema.defaultScalarTag,
		schema.defaultSequenceTag,
		schema.defaultMappingTag
	].filter((t) => t !== void 0));
	const implicitScalars = schema.implicitScalarTags;
	const explicitTags = schema.tags.filter((t) => !(t.nodeKind === "scalar" && t.implicit) && !defaultTags.has(t));
	const defaultTagsLast = schema.tags.filter((t) => defaultTags.has(t));
	return [
		...implicitScalars.map((tag) => ({
			tag,
			implicitTag: true
		})),
		...explicitTags.map((tag) => ({
			tag,
			implicitTag: false
		})),
		...defaultTagsLast.map((tag) => ({
			tag,
			implicitTag: true
		}))
	];
}
function matchTag(state, object) {
	for (let index = 0, length = state.representTypes.length; index < length; index += 1) {
		const { tag, implicitTag } = state.representTypes[index];
		if (tag.identify(object)) {
			let tagName;
			if (tag.matchByTagPrefix) tagName = tag.representTagName(object);
			else tagName = tag.tagName;
			return {
				tag,
				tagName,
				implicitTag
			};
		}
	}
	return null;
}
function build(state, object) {
	if (!state.noRefs && object !== null && typeof object === "object") {
		const existing = state.refs.get(object);
		if (existing) {
			if (existing.anchor === void 0) existing.anchor = `ref_${state.refCounter++}`;
			return {
				kind: "alias",
				anchor: existing.anchor
			};
		}
	}
	const matched = matchTag(state, object);
	if (!matched) {
		if (object === void 0) return INVALID;
		if (state.skipInvalid) return INVALID;
		throw new YAMLException(`unacceptable kind of an object to dump ${Object.prototype.toString.call(object)}`);
	}
	const { tag, tagName, implicitTag } = matched;
	const nodeTagName = implicitTag ? tagName : tagNameShort(tagName);
	if (tag.nodeKind === "scalar") return {
		kind: "scalar",
		tag: nodeTagName,
		tagged: !implicitTag,
		style: SCALAR_STYLE.PLAIN,
		value: tag.represent(object)
	};
	if (tag.nodeKind === "sequence") {
		const container = tag.represent(object);
		const node = {
			kind: "sequence",
			tag: nodeTagName,
			tagged: !implicitTag,
			style: COLLECTION_STYLE.BLOCK,
			items: []
		};
		if (!state.noRefs) state.refs.set(object, node);
		for (let index = 0, length = container.length; index < length; index += 1) {
			let item = build(state, container[index]);
			if (item === INVALID && container[index] === void 0) item = build(state, null);
			if (item === INVALID) continue;
			node.items.push(item);
		}
		return node;
	}
	const map = tag.represent(object);
	const node = {
		kind: "mapping",
		tag: nodeTagName,
		tagged: !implicitTag,
		style: COLLECTION_STYLE.BLOCK,
		items: []
	};
	if (!state.noRefs) state.refs.set(object, node);
	for (const [objectKey, objectValue] of map) {
		const key = build(state, objectKey);
		if (key === INVALID) continue;
		const value = build(state, objectValue);
		if (value === INVALID) continue;
		node.items.push({
			key,
			value
		});
	}
	return node;
}
/**
* Convert JS object to AST. A JS value is one YAML document. An unrepresentable
* root becomes an empty document, which the presenter renders as an empty
* string.
*
* @category AST
*/
function jsToAst(input, schema, options = {}) {
	const root = build({
		representTypes: buildRepresentTypes(schema),
		noRefs: options.noRefs ?? false,
		skipInvalid: options.skipInvalid ?? false,
		refs: /* @__PURE__ */ new Map(),
		refCounter: 0
	}, input);
	return [{
		contents: root === INVALID ? null : root,
		directives: []
	}];
}
/**
* Return from a visitor to stop the whole traversal.
*
* @category AST
*/
var VISIT_BREAK = Symbol("visit:break");
/**
* Return from a visitor to skip the current node's children.
*
* @category AST
*/
var VISIT_SKIP = Symbol("visit:skip");
function visitNode(node, visitor, ctx) {
	const control = visitor(node, ctx);
	if (control === VISIT_BREAK) return true;
	if (control === VISIT_SKIP) return false;
	const depth = ctx.depth + 1;
	switch (node.kind) {
		case "sequence":
			for (const item of node.items) if (visitNode(item, visitor, {
				depth,
				parent: node,
				isKey: false
			})) return true;
			break;
		case "mapping": for (const { key, value } of node.items) {
			if (visitNode(key, visitor, {
				depth,
				parent: node,
				isKey: true
			})) return true;
			if (visitNode(value, visitor, {
				depth,
				parent: node,
				isKey: false
			})) return true;
		}
	}
	return false;
}
/**
* Walk every node in the documents, calling {@link Visitor} once per
* node (pre-order).
*
* @category AST
*/
function visit(documents, visitor) {
	for (const doc of documents) if (doc.contents && visitNode(doc.contents, visitor, {
		depth: 0,
		parent: null,
		isKey: false
	})) return;
}
function hasBit(mask, bit) {
	return (mask & 1 << bit) !== 0;
}
/**
* Default scalar styling rules in application order.
* See [Scalar styling](../../docs/scalar_styling.md) for usage details.
*
* @category AST
*/
var DEFAULT_SCALAR_STYLE_RULES = {
	applyQuoteFlowKeysOption,
	doubleQuoteForInvisibles,
	doubleQuoteWhitespaceOnly,
	applyForceQuotesOption,
	tryLongOrMultilineAsBlock,
	quoteInvalidPlain,
	fallbackToDoubleQuoted
};
function _preferredQuotedStyle(layout) {
	if (layout.presenterOptions.quoteStyle === "single" && hasBit(layout.allowedStylesMask, SCALAR_STYLE.SINGLE_QUOTED)) return SCALAR_STYLE.SINGLE_QUOTED;
	return SCALAR_STYLE.DOUBLE_QUOTED;
}
function applyQuoteFlowKeysOption(layout) {
	if (!layout.presenterOptions.quoteFlowKeys) return;
	if (!layout.isKey || !layout.flowOnly || layout.style !== SCALAR_STYLE.PLAIN) return;
	layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
}
function doubleQuoteForInvisibles(layout) {
	if (layout.style === SCALAR_STYLE.PLAIN && /[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(layout.node.value)) layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
}
function doubleQuoteWhitespaceOnly(layout) {
	if (layout.style === SCALAR_STYLE.PLAIN && /^\s+$/.test(layout.node.value)) layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
}
function applyForceQuotesOption(layout) {
	if (!layout.presenterOptions.forceQuotes) return;
	if (layout.isKey || layout.style !== SCALAR_STYLE.PLAIN) return;
	layout.style = layout.node.value.includes("\n") ? SCALAR_STYLE.DOUBLE_QUOTED : _preferredQuotedStyle(layout);
}
function tryLongOrMultilineAsBlock(layout) {
	if (layout.style !== SCALAR_STYLE.PLAIN || layout.isKey) return;
	const value = layout.node.value;
	const multiline = value.indexOf("\n") !== -1;
	if (!hasBit(layout.allowedStylesMask, SCALAR_STYLE.LITERAL_BLOCK)) {
		if (multiline) layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
		return;
	}
	const w = layout.presenterOptions.lineWidth;
	if (w === -1) {
		if (multiline) layout.style = SCALAR_STYLE.LITERAL_BLOCK;
		return;
	}
	const availableWidth = Math.max(Math.min(w, 40), w - layout.shiftOfContent);
	let position = 0;
	let shouldFold = false;
	while (position <= value.length) {
		let lineEnd = value.length;
		const nextLineBreak = value.indexOf("\n", position);
		if (nextLineBreak !== -1) lineEnd = nextLineBreak;
		const line = value.slice(position, lineEnd);
		if (line.length > availableWidth && line[0] !== " " && / [^ \t]/.test(line)) shouldFold = true;
		if (nextLineBreak === -1) break;
		position = nextLineBreak + 1;
	}
	if (shouldFold) layout.style = SCALAR_STYLE.FOLDED_BLOCK;
	else if (multiline) layout.style = SCALAR_STYLE.LITERAL_BLOCK;
}
function quoteInvalidPlain(layout) {
	if (layout.style === SCALAR_STYLE.PLAIN && !hasBit(layout.allowedStylesMask, SCALAR_STYLE.PLAIN)) layout.style = _preferredQuotedStyle(layout);
}
function fallbackToDoubleQuoted(layout) {
	if (!hasBit(layout.allowedStylesMask, layout.style)) layout.style = SCALAR_STYLE.DOUBLE_QUOTED;
}
function setBit(mask, bit) {
	return mask | 1 << bit;
}
var SRC_C_PRINTABLE = "[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]";
var SRC_B_CHAR = "[\\n\\r]";
var SRC_C_BYTE_ORDER_MARK = "\\uFEFF";
var SRC_S_WHITE = "[ \\t]";
var SRC_NB_CHAR = `(?:(?!(?:${SRC_B_CHAR}|${SRC_C_BYTE_ORDER_MARK}))${SRC_C_PRINTABLE})`;
var SRC_NS_CHAR = `(?:(?!${SRC_S_WHITE})${SRC_NB_CHAR})`;
var SRC_NB_JSON = "[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]";
var SRC_C_INDICATOR = "[-?:,\\[\\]{}#&*!|>'\"%@`]";
var SRC_C_FLOW_INDICATOR = "[,\\[\\]{}]";
var SRC_NS_PLAIN_SAFE_FLOW_OUT = SRC_NS_CHAR;
var SRC_NS_PLAIN_SAFE_FLOW_IN = `(?:(?!${SRC_C_FLOW_INDICATOR})${SRC_NS_CHAR})`;
var SRC_NS_PLAIN_FIRST_FLOW_OUT = `(?:(?:(?!${SRC_C_INDICATOR})${SRC_NS_CHAR})|[?:-](?=${SRC_NS_PLAIN_SAFE_FLOW_OUT}))`;
var SRC_NS_PLAIN_FIRST_FLOW_IN = `(?:(?:(?!${SRC_C_INDICATOR})${SRC_NS_CHAR})|[?:-](?=${SRC_NS_PLAIN_SAFE_FLOW_IN}))`;
var SRC_NS_PLAIN_CHAR_FLOW_OUT = `(?:(?:(?![:#])${SRC_NS_PLAIN_SAFE_FLOW_OUT})|:(?=${SRC_NS_PLAIN_SAFE_FLOW_OUT}))#*`;
var SRC_NS_PLAIN_CHAR_FLOW_IN = `(?:(?:(?![:#])${SRC_NS_PLAIN_SAFE_FLOW_IN})|:(?=${SRC_NS_PLAIN_SAFE_FLOW_IN}))#*`;
var SRC_NB_NS_PLAIN_IN_LINE_FLOW_OUT = `(?:${SRC_S_WHITE}*${SRC_NS_PLAIN_CHAR_FLOW_OUT})*`;
var SRC_NB_NS_PLAIN_IN_LINE_FLOW_IN = `(?:${SRC_S_WHITE}*${SRC_NS_PLAIN_CHAR_FLOW_IN})*`;
var SRC_NS_PLAIN_ONE_LINE_FLOW_OUT = `${SRC_NS_PLAIN_FIRST_FLOW_OUT}#*${SRC_NB_NS_PLAIN_IN_LINE_FLOW_OUT}`;
var SRC_NS_PLAIN_ONE_LINE_FLOW_IN = `${SRC_NS_PLAIN_FIRST_FLOW_IN}#*${SRC_NB_NS_PLAIN_IN_LINE_FLOW_IN}`;
var SRC_NS_PLAIN_ONE_LINE_BLOCK_KEY = SRC_NS_PLAIN_ONE_LINE_FLOW_OUT;
var SRC_NS_PLAIN_ONE_LINE_FLOW_KEY = SRC_NS_PLAIN_ONE_LINE_FLOW_IN;
var SRC_S_NS_PLAIN_NEXT_LINE_FLOW_OUT = `\\n+${SRC_NS_PLAIN_CHAR_FLOW_OUT}${SRC_NB_NS_PLAIN_IN_LINE_FLOW_OUT}`;
var SRC_S_NS_PLAIN_NEXT_LINE_FLOW_IN = `\\n+${SRC_NS_PLAIN_CHAR_FLOW_IN}${SRC_NB_NS_PLAIN_IN_LINE_FLOW_IN}`;
var SRC_NS_PLAIN_MULTI_LINE_FLOW_OUT = `${SRC_NS_PLAIN_ONE_LINE_FLOW_OUT}(?:${SRC_S_NS_PLAIN_NEXT_LINE_FLOW_OUT})*`;
var SRC_NS_PLAIN_MULTI_LINE_FLOW_IN = `${SRC_NS_PLAIN_ONE_LINE_FLOW_IN}(?:${SRC_S_NS_PLAIN_NEXT_LINE_FLOW_IN})*`;
var NS_PLAIN_FLOW_OUT = new RegExp(`^(?:${SRC_NS_PLAIN_MULTI_LINE_FLOW_OUT})$`, "u");
var NS_PLAIN_FLOW_IN = new RegExp(`^(?:${SRC_NS_PLAIN_MULTI_LINE_FLOW_IN})$`, "u");
var NS_PLAIN_BLOCK_KEY = new RegExp(`^(?:${SRC_NS_PLAIN_ONE_LINE_BLOCK_KEY})$`, "u");
var NS_PLAIN_FLOW_KEY = new RegExp(`^(?:${SRC_NS_PLAIN_ONE_LINE_FLOW_KEY})$`, "u");
var NB_SINGLE_ONE_LINE = new RegExp(`^(?:${SRC_NB_JSON})*$`, "u");
var NB_SINGLE_MULTI_LINE = new RegExp(`^(?:${SRC_NB_JSON}|\\n)*$`, "u");
var BLOCK_SCALAR_CONTENT = new RegExp(`^(?:${SRC_NB_CHAR}|\\n)*$`, "u");
var C_FORBIDDEN_FIRST_LINE = /^(?:---|\.\.\.)(?=$|[ \t\n\r])/;
var C_FORBIDDEN_CONTENT = /^(?:---|\.\.\.)(?=$|[ \t\n\r])/m;
function canUsePlain(layout) {
	const str = layout.node.value;
	if (str !== "") {
		if (!(layout.isKey ? layout.flowOnly ? NS_PLAIN_FLOW_KEY : NS_PLAIN_BLOCK_KEY : layout.flowOnly ? NS_PLAIN_FLOW_IN : NS_PLAIN_FLOW_OUT).test(str)) return false;
		if (layout.shiftOfFirstLine === 0 && C_FORBIDDEN_FIRST_LINE.test(str)) return false;
		if (layout.shiftOfContent === 0) {
			const firstLineBreak = str.indexOf("\n");
			if (firstLineBreak !== -1) {
				const content = str.slice(firstLineBreak + 1);
				if (C_FORBIDDEN_CONTENT.test(content)) return false;
			}
		}
	}
	const resolvedTag = layout.presenterOptions.schema.resolveImplicitScalarTag(str).tag.tagName;
	if (!layout.node.tagged && resolvedTag !== layout.node.tag) return false;
	if (!layout.node.tagged && str === "=" && resolvedTag === layout.presenterOptions.schema.defaultScalarTag.tagName) return false;
	return true;
}
function canUseSingleQuoted(layout) {
	const str = layout.node.value;
	if (!(layout.isKey ? NB_SINGLE_ONE_LINE : NB_SINGLE_MULTI_LINE).test(str)) return false;
	if (/[ \t]\n|\n[ \t]/.test(str)) return false;
	if (!layout.isKey && layout.shiftOfContent === 0) {
		const firstLineBreak = str.indexOf("\n");
		if (firstLineBreak !== -1 && C_FORBIDDEN_CONTENT.test(str.slice(firstLineBreak + 1))) return false;
	}
	return true;
}
function canUseBlock(layout) {
	if (layout.flowOnly || !BLOCK_SCALAR_CONTENT.test(layout.node.value)) return false;
	const contentIndent = layout.shiftOfContent - layout.shiftOfParent;
	if (contentIndent < 1) return false;
	if (contentIndent > 9 && /^\n* /.test(layout.node.value)) return false;
	if (layout.shiftOfContent === 0 && C_FORBIDDEN_CONTENT.test(layout.node.value)) return false;
	return true;
}
function detectAllowedStyles(layout) {
	let mask = setBit(0, SCALAR_STYLE.DOUBLE_QUOTED);
	if (canUsePlain(layout)) mask = setBit(mask, SCALAR_STYLE.PLAIN);
	if (canUseSingleQuoted(layout)) mask = setBit(mask, SCALAR_STYLE.SINGLE_QUOTED);
	if (canUseBlock(layout)) mask = setBit(setBit(mask, SCALAR_STYLE.LITERAL_BLOCK), SCALAR_STYLE.FOLDED_BLOCK);
	layout.allowedStylesMask = mask;
}
function renderScalar(layout) {
	switch (layout.style) {
		case SCALAR_STYLE.PLAIN: return renderPlain(layout);
		case SCALAR_STYLE.SINGLE_QUOTED: return renderSingleQuoted(layout);
		case SCALAR_STYLE.LITERAL_BLOCK: return renderLiteralBlock(layout);
		case SCALAR_STYLE.FOLDED_BLOCK: return renderFoldedBlock(layout);
		case SCALAR_STYLE.DOUBLE_QUOTED: return renderDoubleQuoted(layout);
	}
}
function renderPlain(layout) {
	return encodeFlowBreaks(layout.node.value, layout.shiftOfContent);
}
function renderSingleQuoted(layout) {
	return `'${encodeFlowBreaks(layout.node.value, layout.shiftOfContent).replace(/'/g, "''")}'`;
}
function renderLiteralBlock(layout) {
	const value = layout.node.value;
	return "|" + blockHeader(value, layout.shiftOfParent, layout.shiftOfContent) + dropEndingNewline(indentString(value, layout.shiftOfContent));
}
function renderFoldedBlock(layout) {
	const value = layout.node.value;
	const w = layout.presenterOptions.lineWidth;
	let availableWidth = Infinity;
	if (w !== -1) availableWidth = Math.max(Math.min(w, 40), w - layout.shiftOfContent);
	return ">" + blockHeader(value, layout.shiftOfParent, layout.shiftOfContent) + dropEndingNewline(indentString(foldBlockScalar(value, availableWidth), layout.shiftOfContent));
}
function renderDoubleQuoted(layout) {
	return `"${escapeString(layout.node.value)}"`;
}
function encodeFlowBreaks(string, shiftOfContent) {
	let nextLF = string.indexOf("\n");
	if (nextLF === -1) return string;
	const pad = " ".repeat(shiftOfContent);
	let result = string.slice(0, nextLF);
	const lineRe = /(\n+)([^\n]*)/g;
	lineRe.lastIndex = nextLF;
	let match;
	while (match = lineRe.exec(string)) {
		const breaks = match[1].length;
		const line = match[2];
		result += "\n".repeat(breaks + 1) + pad + line;
	}
	return result;
}
function indentString(string, spaces) {
	const indent = " ".repeat(spaces);
	let position = 0;
	let result = "";
	const length = string.length;
	while (position < length) {
		let line;
		const next = string.indexOf("\n", position);
		if (next === -1) {
			line = string.slice(position);
			position = length;
		} else {
			line = string.slice(position, next + 1);
			position = next + 1;
		}
		if (line.length && line !== "\n") result += indent;
		result += line;
	}
	return result;
}
function needIndentIndicator(string) {
	return /^\n* /.test(string);
}
function blockHeader(string, shiftOfParent, shiftOfContent) {
	const indentIndicator = needIndentIndicator(string) ? String(shiftOfContent - shiftOfParent) : "";
	const clip = string[string.length - 1] === "\n";
	return `${indentIndicator}${clip && (string[string.length - 2] === "\n" || string === "\n") ? "+" : clip ? "" : "-"}\n`;
}
function dropEndingNewline(string) {
	return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function isMoreIndented(char) {
	return char === " " || char === "	";
}
function foldLine(line, width) {
	if (line === "" || isMoreIndented(line[0])) return line;
	const breakRe = / [^ \t]/g;
	let match;
	let start = 0;
	let end;
	let curr = 0;
	let next = 0;
	let result = "";
	while (match = breakRe.exec(line)) {
		next = match.index;
		if (next - start > width) {
			end = curr > start ? curr : next;
			result += `\n${line.slice(start, end)}`;
			start = end + 1;
		}
		curr = next;
	}
	result += "\n";
	if (line.length - start > width && curr > start) result += `${line.slice(start, curr)}\n${line.slice(curr + 1)}`;
	else result += line.slice(start);
	return result.slice(1);
}
function foldBlockScalar(string, width) {
	const lineRe = /(\n+)([^\n]*)/g;
	let nextLF = string.indexOf("\n");
	if (nextLF === -1) nextLF = string.length;
	lineRe.lastIndex = nextLF;
	let result = foldLine(string.slice(0, nextLF), width);
	let prevMoreIndented = string[0] === "\n" || isMoreIndented(string[0]);
	let moreIndented;
	let match;
	while (match = lineRe.exec(string)) {
		const prefix = match[1];
		const line = match[2];
		moreIndented = line !== "" && isMoreIndented(line[0]);
		result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
		prevMoreIndented = moreIndented;
	}
	return result;
}
var CHARACTERS_TO_ESCAPE = /["\\\x00-\x1F\x7F-\xA0\u2028\u2029\uD800-\uDFFF\uFEFF\uFFFE\uFFFF]/gu;
function escapeCharacter(character) {
	switch (character) {
		case "\0": return "\\0";
		case "\x07": return "\\a";
		case "\b": return "\\b";
		case "	": return "\\t";
		case "\n": return "\\n";
		case "\v": return "\\v";
		case "\f": return "\\f";
		case "\r": return "\\r";
		case "\x1B": return "\\e";
		case "\"": return "\\\"";
		case "\\": return "\\\\";
		case "": return "\\N";
		case "\xA0": return "\\_";
		case "\u2028": return "\\L";
		case "\u2029": return "\\P";
	}
	const code = character.charCodeAt(0);
	const hex = code.toString(16).toUpperCase();
	if (code <= 255) return `\\x${"0".repeat(2 - hex.length)}${hex}`;
	return `\\u${"0".repeat(4 - hex.length)}${hex}`;
}
function escapeString(string) {
	return string.replace(CHARACTERS_TO_ESCAPE, escapeCharacter);
}
var CHAR_LINE_FEED = 10;
var DEFAULT_PRESENTER_OPTIONS = {
	indent: 2,
	seqNoIndent: false,
	seqInlineFirst: true,
	lineWidth: 80,
	flowBracketPadding: false,
	flowSkipCommaSpace: false,
	flowSkipColonSpace: false,
	quoteFlowKeys: false,
	quoteStyle: "single",
	forceQuotes: false,
	scalarStyleRules: Object.keys(DEFAULT_SCALAR_STYLE_RULES).map((name) => Reflect.get(DEFAULT_SCALAR_STYLE_RULES, name)),
	tagBeforeAnchor: false
};
function nodeTagShort(node) {
	return node.tagged ? node.tag : tagNameShort(node.tag);
}
function createPresenterState(options) {
	const opts = {
		...DEFAULT_PRESENTER_OPTIONS,
		...options
	};
	if (opts.flowSkipColonSpace) opts.quoteFlowKeys = true;
	return {
		...opts,
		defaultScalarTagName: opts.schema.defaultScalarTag.tagName,
		openEnded: false
	};
}
function generateNextLine(state, level) {
	return `\n${" ".repeat(state.indent * level)}`;
}
function scalarLayout(state, node, parent, level, isKey, flowOnly) {
	return {
		node,
		parent,
		level,
		isKey,
		flowOnly,
		shiftOfParent: level === 0 ? -1 : state.indent * (level - 1),
		shiftOfContent: state.indent * Math.max(1, level),
		shiftOfFirstLine: level === 0 ? 0 : state.indent * level,
		presenterOptions: state,
		allowedStylesMask: 0,
		style: node.style
	};
}
function writeFlowSequence(state, level, node) {
	let result = "";
	for (let index = 0, length = node.items.length; index < length; index += 1) {
		const item = writeNode(state, level, node.items[index], node, {}).text;
		if (index > 0) result += `,${!state.flowSkipCommaSpace ? " " : ""}`;
		result += item;
	}
	const pad = state.flowBracketPadding && node.items.length > 0 ? " " : "";
	return `[${pad}${result}${pad}]`;
}
function writeBlockSequence(state, level, node, compact) {
	let result = "";
	for (let index = 0, length = node.items.length; index < length; index += 1) {
		const item = writeNode(state, level + 1, node.items[index], node, {
			block: true,
			compact: state.seqInlineFirst,
			isblockseq: true
		}).text;
		if (!compact || result !== "") result += generateNextLine(state, level);
		if (item === "" || CHAR_LINE_FEED === item.charCodeAt(0)) result += "-";
		else result += "- ";
		result += item;
	}
	return result;
}
function writeFlowMapping(state, level, node) {
	let result = "";
	for (const { key, value } of node.items) {
		let pairBuffer = "";
		if (result !== "") pairBuffer += `,${!state.flowSkipCommaSpace ? " " : ""}`;
		const keyRender = writeNode(state, level, key, node, { iskey: true });
		const keyText = keyRender.text;
		const valueText = writeNode(state, level, value, node, {}).text;
		const sep = state.flowSkipColonSpace || valueText === "" ? "" : " ";
		const keyIsBareProps = key.kind === "scalar" && keyRender.noBody && (key.tagged || key.anchor !== void 0);
		const keyColonSep = key.kind === "alias" || keyIsBareProps ? " " : "";
		pairBuffer += `${keyText}${keyColonSep}:${sep}${valueText}`;
		result += pairBuffer;
	}
	const pad = state.flowBracketPadding && result !== "" ? " " : "";
	return `{${pad}${result}${pad}}`;
}
function writeBlockMapping(state, level, node, compact) {
	let result = "";
	for (let index = 0, length = node.items.length; index < length; index += 1) {
		let pairBuffer = "";
		if (!compact || result !== "") pairBuffer += generateNextLine(state, level);
		const { key, value } = node.items[index];
		const keyIsBlock = (key.kind === "mapping" || key.kind === "sequence") && key.style === COLLECTION_STYLE.BLOCK && key.items.length !== 0 || key.kind === "scalar" && (key.style === SCALAR_STYLE.LITERAL_BLOCK || key.style === SCALAR_STYLE.FOLDED_BLOCK);
		const keyRender = keyIsBlock ? writeNode(state, level + 1, key, node, {
			block: true,
			compact: true,
			isblockseq: !cannotBeCompact(state, key, level + 1)
		}) : writeNode(state, level + 1, key, node, {
			block: true,
			compact: true,
			iskey: true
		});
		const keyText = keyRender.text;
		const keyHasLineBreak = key.kind === "scalar" && key.value.indexOf("\n") !== -1;
		const keyIsTooLong = keyText.length > 1024 && /^[\s\S]{1025}/u.test(keyText);
		const explicitPair = keyIsBlock || keyHasLineBreak || keyIsTooLong;
		if (explicitPair) if (keyText && CHAR_LINE_FEED === keyText.charCodeAt(0)) pairBuffer += "?";
		else pairBuffer += "? ";
		pairBuffer += keyText;
		if (explicitPair) pairBuffer += generateNextLine(state, level);
		const valueText = writeNode(state, level + 1, value, node, {
			block: true,
			compact: explicitPair,
			isblockseq: explicitPair && !cannotBeCompact(state, value, level + 1)
		}).text;
		const keyIsBareProps = key.kind === "scalar" && keyRender.noBody && (key.tagged || key.anchor !== void 0);
		const keyColonSep = !explicitPair && (key.kind === "alias" || keyIsBareProps) ? " " : "";
		if (valueText === "" || CHAR_LINE_FEED === valueText.charCodeAt(0)) pairBuffer += `${keyColonSep}:`;
		else pairBuffer += `${keyColonSep}: `;
		pairBuffer += valueText;
		result += pairBuffer;
	}
	return result;
}
function cannotBeCompact(state, node, level) {
	if (node.kind === "alias") return true;
	return node.tagged || node.anchor !== void 0 || state.indent < 2 && level > 0;
}
function writeNode(state, level, node, parent, ctx) {
	if (node.kind === "alias") {
		state.openEnded = false;
		return {
			text: `*${node.anchor}`,
			noBody: false
		};
	}
	const { block = false, iskey = false, isblockseq = false } = ctx;
	let compact = ctx.compact ?? false;
	const hasAnchor = node.anchor !== void 0;
	if (cannotBeCompact(state, node, level)) compact = false;
	let body;
	let shouldPrintTag = node.tagged;
	const useBlockCollection = block && (node.kind === "mapping" || node.kind === "sequence") && node.style === COLLECTION_STYLE.BLOCK && node.items.length !== 0;
	if (node.kind === "mapping") if (useBlockCollection) body = writeBlockMapping(state, level, node, compact);
	else body = writeFlowMapping(state, level, node);
	else if (node.kind === "sequence") if (useBlockCollection) if (state.seqNoIndent && !isblockseq && level > 0) body = writeBlockSequence(state, level - 1, node, compact);
	else body = writeBlockSequence(state, level, node, compact);
	else body = writeFlowSequence(state, level, node);
	else {
		const layout = scalarLayout(state, node, parent, level, iskey, !block);
		detectAllowedStyles(layout);
		for (const rule of state.scalarStyleRules) rule(layout);
		body = renderScalar(layout);
		state.openEnded = (layout.style === SCALAR_STYLE.LITERAL_BLOCK || layout.style === SCALAR_STYLE.FOLDED_BLOCK) && (node.value === "\n" || node.value.endsWith("\n\n"));
		shouldPrintTag = node.tagged || body === "" && layout.flowOnly && parent?.kind === "sequence" && !hasAnchor || layout.style !== SCALAR_STYLE.PLAIN && node.tag !== state.defaultScalarTagName;
	}
	if ((node.kind === "mapping" || node.kind === "sequence") && !useBlockCollection) state.openEnded = false;
	if (useBlockCollection && compact && level > 0 && state.indent > 2) body = `${" ".repeat(state.indent - 2)}${body}`;
	const noBody = body === "";
	let text = body;
	if (shouldPrintTag || hasAnchor) {
		const props = [];
		const tag = shouldPrintTag ? nodeTagShort(node) : null;
		const anchor = hasAnchor ? `&${node.anchor}` : null;
		if (state.tagBeforeAnchor) {
			if (tag !== null) props.push(tag);
			if (anchor !== null) props.push(anchor);
		} else {
			if (anchor !== null) props.push(anchor);
			if (tag !== null) props.push(tag);
		}
		const sep = body === "" || body.charCodeAt(0) === CHAR_LINE_FEED ? "" : " ";
		text = `${props.join(" ")}${sep}${body}`;
	}
	return {
		text,
		noBody
	};
}
function rootStartsOwnLine(node) {
	return (node.kind === "sequence" || node.kind === "mapping") && node.style === COLLECTION_STYLE.BLOCK && node.items.length !== 0 && !node.tagged && node.anchor === void 0;
}
function writeDocumentDirectives(doc) {
	let result = "";
	for (const directive of doc.directives) {
		if (directive.kind === "yaml") {
			result += `%YAML ${directive.version}\n`;
			continue;
		}
		const { handle, prefix } = directive;
		result += `%TAG ${handle} ${prefix}\n`;
	}
	return result;
}
/**
* Build YAML from AST.
*
* @category AST
*/
function present(documents, options) {
	const state = createPresenterState(options);
	let result = "";
	let previousEnded = false;
	for (let index = 0; index < documents.length; index += 1) {
		const doc = documents[index];
		state.openEnded = false;
		const directives = writeDocumentDirectives(doc);
		const hasDirectives = directives !== "";
		const marker = doc.explicitStart || hasDirectives || index > 0 && !previousEnded;
		result += directives;
		if (doc.contents === null) {
			if (marker) result += "---\n";
		} else if (marker) {
			const body = writeNode(state, 0, doc.contents, null, {
				block: true,
				compact: true
			}).text;
			const sep = body === "" ? "" : hasDirectives || rootStartsOwnLine(doc.contents) ? "\n" : " ";
			result += `---${sep}${body}\n`;
		} else result += writeNode(state, 0, doc.contents, null, {
			block: true,
			compact: true
		}).text + "\n";
		previousEnded = doc.explicitEnd || state.openEnded;
		if (previousEnded) result += "...\n";
	}
	return result;
}
var DEFAULT_DUMP_OPTIONS = {
	...DEFAULT_PRESENTER_OPTIONS,
	schema: DUMP_SCHEMA,
	skipInvalid: false,
	noRefs: false,
	flowLevel: -1,
	sortKeys: false,
	transform: () => {}
};
function defaultCompareFn(a, b) {
	const x = String(a);
	const y = String(b);
	if (x < y) return -1;
	if (x > y) return 1;
	return 0;
}
/**
* Serializes JS object as a YAML document. By default it can dump every
* supported YAML type, so it throws an exception if you try to dump regexps or
* functions. However, you can disable exceptions by setting the
* {@link DumpOptions.skipInvalid} option to `true`.
*
* @category Main
*/
function dump(input, options = {}) {
	const opts = {
		...DEFAULT_DUMP_OPTIONS,
		...options
	};
	const documents = jsToAst(input, opts.schema, {
		noRefs: opts.noRefs,
		skipInvalid: opts.skipInvalid
	});
	if (opts.flowLevel >= 0) visit(documents, (node, ctx) => {
		if (ctx.depth < opts.flowLevel) return;
		if (node.kind === "sequence" || node.kind === "mapping") node.style = COLLECTION_STYLE.FLOW;
		return VISIT_SKIP;
	});
	if (opts.sortKeys) {
		const compareFn = opts.sortKeys === true ? defaultCompareFn : opts.sortKeys;
		visit(documents, (node) => {
			if (node.kind !== "mapping") return;
			node.items.sort((a, b) => compareFn(a.key.kind === "scalar" ? a.key.value : "", b.key.kind === "scalar" ? b.key.value : ""));
		});
	}
	opts.transform(documents);
	return present(documents, {
		...pick(opts, Object.keys(DEFAULT_PRESENTER_OPTIONS)),
		schema: opts.schema
	});
}
EVENT_ID.DOCUMENT;
EVENT_ID.SEQUENCE;
EVENT_ID.MAPPING;
EVENT_ID.SCALAR;
EVENT_ID.ALIAS;
EVENT_ID.POP;
SCALAR_STYLE.PLAIN;
SCALAR_STYLE.SINGLE_QUOTED;
SCALAR_STYLE.DOUBLE_QUOTED;
SCALAR_STYLE.LITERAL_BLOCK;
SCALAR_STYLE.FOLDED_BLOCK;
COLLECTION_STYLE.BLOCK;
COLLECTION_STYLE.FLOW;
CHOMPING_MODE.CLIP;
CHOMPING_MODE.STRIP;
CHOMPING_MODE.KEEP;
//#endregion
//#region module/src/containers/text/SillyTavern/Arguments.ts
const sillyArguments = [{
	category: "Command Line Arguments",
	items: [
		{
			name: "--version",
			description: "Show version number",
			type: "CheckBox"
		},
		{
			name: "--global",
			description: "Use global data and config paths instead of the server directory",
			type: "CheckBox"
		},
		{
			name: "--configPath",
			description: "Path to the config file (only for standalone mode)",
			type: "File"
		},
		{
			name: "--dataRoot",
			description: "Root directory for data storage (only for standalone mode)",
			type: "Directory"
		},
		{
			name: "--port",
			description: "Sets the port under which SillyTavern will run. If not provided falls back to yaml config 'port'.",
			type: "Input"
		},
		{
			name: "--listen",
			description: "SillyTavern is listening on all network interfaces. If not provided falls back to yaml config 'listen'.",
			type: "CheckBox"
		},
		{
			name: "--whitelist",
			description: "Enables whitelist mode",
			type: "CheckBox"
		},
		{
			name: "--basicAuthMode",
			description: "Enables basic authentication",
			type: "CheckBox"
		},
		{
			name: "--enableIPv4",
			description: "Enables the IPv4 protocol",
			type: "CheckBox"
		},
		{
			name: "--enableIPv6",
			description: "Enables the IPv6 protocol",
			type: "CheckBox"
		},
		{
			name: "--listenAddressIPv4",
			description: "Specifies the IPv4 address to listen on",
			type: "Input"
		},
		{
			name: "--listenAddressIPv6",
			description: "Specifies the IPv6 address to listen on",
			type: "Input"
		},
		{
			name: "--dnsPreferIPv6",
			description: "Prefers IPv6 for dns. If not provided falls back to yaml config 'preferIPv6'.",
			type: "CheckBox"
		},
		{
			name: "--ssl",
			description: "Enables SSL",
			type: "CheckBox"
		},
		{
			name: "--certPath",
			description: "Path to your certificate file.",
			type: "File"
		},
		{
			name: "--keyPath",
			description: "Path to your private key file.",
			type: "File"
		},
		{
			name: "--keyPassphrase",
			description: "Passphrase for the SSL private key",
			type: "Input"
		},
		{
			name: "--browserLaunchEnabled",
			description: "Automatically launches SillyTavern in the browser.",
			type: "CheckBox"
		},
		{
			name: "--browserLaunchHostname",
			description: "Sets the browser launch hostname",
			type: "Input"
		},
		{
			name: "--browserLaunchPort",
			description: "Overrides the port for browser launch",
			type: "Input"
		},
		{
			name: "--browserLaunchAvoidLocalhost",
			description: "Avoids using 'localhost' for browser launch in auto mode",
			type: "CheckBox"
		},
		{
			name: "--corsProxy",
			description: "Enables CORS proxy. If not provided falls back to yaml config 'enableCorsProxy'.",
			type: "CheckBox"
		},
		{
			name: "--requestProxyEnabled",
			description: "Enables a use of proxy for outgoing requests",
			type: "CheckBox"
		},
		{
			name: "--requestProxyUrl",
			description: "Request proxy URL (HTTP or SOCKS protocols)",
			type: "Input"
		},
		{
			name: "--requestProxyBypass",
			description: "Request proxy bypass list (space separated list of hosts)",
			type: "Input"
		},
		{
			name: "--disableCsrf",
			description: "Disables CSRF protection",
			type: "CheckBox"
		},
		{
			name: "--enableKeepAlive",
			description: "Enable HTTP/HTTPS keep-alive globally",
			type: "CheckBox"
		},
		{
			name: "--heartbeatInterval",
			description: "Interval in seconds to write a heartbeat file. 0 to disable.",
			type: "Input"
		}
	]
}, {
	category: "Configuration",
	sections: [
		{
			section: "Data Configuration",
			items: [
				{
					name: "dataRoot",
					description: "Root directory for user data storage (standalone mode only)",
					type: "Directory",
					defaultValue: "./data"
				},
				{
					name: "skipContentCheck",
					description: "Skip new default content checks",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "enableDownloadableTokenizers",
					description: "Enable on-demand tokenizer downloads",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "whitelistImportDomains",
					description: "List of trusted domains for importing web-hosted character cards and assets",
					type: "Input",
					defaultValue: "[\"localhost\", \"cdn.discordapp.com\", \"files.catbox.moe\", \"raw.githubusercontent.com\"]"
				}
			]
		},
		{
			section: "Logging Configuration",
			items: [{
				name: "logging.minLogLevel",
				description: "Minimum log level to display in the terminal",
				type: "DropDown",
				defaultValue: 0,
				values: [
					"0 (DEBUG)",
					"1 (INFO)",
					"2 (WARN)",
					"3 (ERROR)"
				]
			}, {
				name: "logging.enableAccessLog",
				description: "Write server access log to file and console",
				type: "CheckBox",
				defaultValue: true
			}]
		},
		{
			section: "Network Configuration",
			items: [
				{
					name: "listen",
					description: "Enable listening for incoming connections",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "port",
					description: "Server listening port",
					type: "Input",
					defaultValue: 8e3
				},
				{
					name: "heartbeatInterval",
					description: "Interval in seconds to write a heartbeat file for Docker healthchecks. Set to 0 to disable",
					type: "Input",
					defaultValue: 0
				},
				{
					name: "enableKeepAlive",
					description: "Enable HTTP/HTTPS keep-alive globally",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "protocol.ipv4",
					description: "Enable listening on IPv4 protocol",
					type: "DropDown",
					defaultValue: "true",
					values: [
						"true",
						"false",
						"auto"
					]
				},
				{
					name: "protocol.ipv6",
					description: "Enable listening on IPv6 protocol",
					type: "DropDown",
					defaultValue: "false",
					values: [
						"true",
						"false",
						"auto"
					]
				},
				{
					name: "listenAddress.ipv4",
					description: "Listen on specific IPv4 address",
					type: "Input",
					defaultValue: "0.0.0.0"
				},
				{
					name: "listenAddress.ipv6",
					description: "Listen on specific IPv6 address",
					type: "Input",
					defaultValue: "[::]"
				},
				{
					name: "dnsPreferIPv6",
					description: "Prefer IPv6 for DNS resolution",
					type: "CheckBox",
					defaultValue: false
				}
			]
		},
		{
			section: "SSL Configuration",
			items: [
				{
					name: "ssl.enabled",
					description: "Enable SSL/TLS",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "ssl.keyPath",
					description: "Path to SSL private key",
					type: "File",
					defaultValue: "./certs/privkey.pem"
				},
				{
					name: "ssl.certPath",
					description: "Path to SSL certificate",
					type: "File",
					defaultValue: "./certs/cert.pem"
				},
				{
					name: "ssl.keyPassphrase",
					description: "Passphrase for the SSL private key. Leave empty if not required",
					type: "Input",
					defaultValue: ""
				}
			]
		},
		{
			section: "Security Configuration - IP Whitelisting",
			items: [
				{
					name: "whitelistMode",
					description: "Enable IP whitelist filtering",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "enableForwardedWhitelist",
					description: "Check forwarded headers for whitelisted IPs",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "whitelist",
					description: "List of allowed IP addresses",
					type: "Input",
					defaultValue: "[\"::1\", \"127.0.0.1\"]"
				},
				{
					name: "whitelistDockerHosts",
					description: "Automatically whitelist Docker host IPs",
					type: "CheckBox",
					defaultValue: true
				}
			]
		},
		{
			section: "Security Configuration - Forwarded Headers",
			items: [
				{
					name: "forwardedHeaders.xRealIp",
					description: "Use the X-Real-IP header for client IP detection",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "forwardedHeaders.xForwardedFor",
					description: "Use the X-Forwarded-For header for client IP detection",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "forwardedHeaders.cfConnectingIp",
					description: "Use the CF-Connecting-IP header for client IP detection",
					type: "CheckBox",
					defaultValue: false
				}
			]
		},
		{
			section: "Security Configuration - Private Address Whitelisting",
			items: [
				{
					name: "privateAddressWhitelist.enabled",
					description: "Enable private address whitelisting to block requests to private IP ranges",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "privateAddressWhitelist.allowUnresolvedHosts",
					description: "Allow requests to hosts that cannot be resolved",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "privateAddressWhitelist.log.blockedRequests",
					description: "Log blocked requests that resolve to private IP addresses",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "privateAddressWhitelist.log.allowedRequests",
					description: "Log allowed requests that resolve to private IP addresses",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "privateAddressWhitelist.allowedRanges",
					description: "List of allowed private IP addresses and CIDR ranges",
					type: "Input",
					defaultValue: "[\"127.0.0.0/8\", \"::1/128\"]"
				}
			]
		},
		{
			section: "Security Configuration - Host Whitelisting",
			items: [
				{
					name: "hostWhitelist.enabled",
					description: "Enable host whitelisting",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "hostWhitelist.scan",
					description: "Log incoming requests from untrusted hosts",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "hostWhitelist.hosts",
					description: "List of trusted hostnames",
					type: "Input",
					defaultValue: "[]"
				}
			]
		},
		{
			section: "Security Configuration - Security Overrides",
			items: [
				{
					name: "allowKeysExposure",
					description: "Allow unmasked API key exposure in the UI",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "disableCsrfProtection",
					description: "Disable CSRF protection (not recommended)",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "securityOverride",
					description: "Disable startup security checks (not recommended)",
					type: "CheckBox",
					defaultValue: false
				}
			]
		},
		{
			section: "CORS Proxy & CORS Configuration",
			items: [
				{
					name: "enableCorsProxy",
					description: "Enable CORS proxy middleware",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "cors.enabled",
					description: "Enable or disable CORS middleware",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "cors.origin",
					description: "Allowed CORS origins. \"null\" matches default browser file origin",
					type: "Input",
					defaultValue: "[\"null\"]"
				},
				{
					name: "cors.methods",
					description: "Allowed HTTP methods",
					type: "Input",
					defaultValue: "[\"OPTIONS\"]"
				},
				{
					name: "cors.allowedHeaders",
					description: "Allowed request headers",
					type: "Input",
					defaultValue: "[]"
				},
				{
					name: "cors.exposedHeaders",
					description: "Exposed response headers",
					type: "Input",
					defaultValue: "[]"
				},
				{
					name: "cors.credentials",
					description: "Allow credentials (cookies, authorization headers)",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "cors.maxAge",
					description: "Preflight cache max age in seconds",
					type: "Input",
					defaultValue: ""
				}
			]
		},
		{
			section: "User Authentication",
			items: [
				{
					name: "basicAuthMode",
					description: "Enable basic authentication",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "basicAuthUser.username",
					description: "Basic auth username",
					type: "Input",
					defaultValue: "user"
				},
				{
					name: "basicAuthUser.password",
					description: "Basic auth password",
					type: "Input",
					defaultValue: "password"
				},
				{
					name: "enableUserAccounts",
					description: "Enable multi-user mode",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "enableDiscreetLogin",
					description: "Hide user list on login screen",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "sessionTimeout",
					description: "User session timeout in seconds",
					type: "Input",
					defaultValue: -1
				},
				{
					name: "perUserBasicAuth",
					description: "Use account credentials for basic auth",
					type: "CheckBox",
					defaultValue: false
				}
			]
		},
		{
			section: "SSO Auto-Login",
			items: [
				{
					name: "sso.trustedProxies",
					description: "List of trusted proxy IPs for SSO authentication",
					type: "Input",
					defaultValue: "[\"127.0.0.1\", \"::1\"]"
				},
				{
					name: "sso.autheliaAuth",
					description: "Enable Authelia-based auto-login",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "sso.authentikAuth",
					description: "Enable Authentik-based auto-login",
					type: "CheckBox",
					defaultValue: false
				}
			]
		},
		{
			section: "Rate Limiting Configuration",
			items: [
				{
					name: "rateLimiting.preferRealIpHeader",
					description: "Use IP from forwarded headers instead of socket IP for rate limiting",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "rateLimiting.accountsLoginMaxAttempts",
					description: "Maximum account login attempts before temporary lockout (0 to disable)",
					type: "Input",
					defaultValue: 5
				},
				{
					name: "rateLimiting.accountsRecoverMaxAttempts",
					description: "Maximum account recovery attempts before temporary lockout (0 to disable)",
					type: "Input",
					defaultValue: 5
				},
				{
					name: "rateLimiting.basicAuthMaxAttempts",
					description: "Maximum basic auth attempts before temporary lockout (0 to disable)",
					type: "Input",
					defaultValue: 5
				},
				{
					name: "rateLimiting.accountsResetMaxAttempts",
					description: "Maximum account reset attempts before temporary lockout (0 to disable)",
					type: "Input",
					defaultValue: 5
				}
			]
		},
		{
			section: "Request Proxy Configuration",
			items: [
				{
					name: "requestProxy.enabled",
					description: "Enable proxy for outgoing requests",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "requestProxy.url",
					description: "Proxy server URL",
					type: "Input",
					defaultValue: "socks5://username:password@example.com:1080"
				},
				{
					name: "requestProxy.bypass",
					description: "Hosts to bypass proxy",
					type: "Input",
					defaultValue: "[\"localhost\", \"127.0.0.1\"]"
				},
				{
					name: "requestOverrides",
					description: "API request overrides for KoboldAI and Text Completion APIs",
					type: "Input",
					defaultValue: "[]"
				}
			]
		},
		{
			section: "Browser Launch Configuration",
			items: [
				{
					name: "browserLaunch.enabled",
					description: "Open the browser automatically on server startup",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "browserLaunch.browser",
					description: "Browser to use for opening the URL",
					type: "DropDown",
					defaultValue: "default",
					values: [
						"default",
						"chrome",
						"firefox",
						"edge",
						"brave"
					]
				},
				{
					name: "browserLaunch.hostname",
					description: "Override the hostname for browser launch",
					type: "Input",
					defaultValue: "auto"
				},
				{
					name: "browserLaunch.port",
					description: "Override the port for browser launch",
					type: "Input",
					defaultValue: -1
				},
				{
					name: "browserLaunch.avoidLocalhost",
					description: "Avoid using 'localhost' in a launch URL",
					type: "CheckBox",
					defaultValue: false
				}
			]
		},
		{
			section: "Performance Configuration",
			items: [
				{
					name: "performance.lazyLoadCharacters",
					description: "Lazy-load character data",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "performance.useDiskCache",
					description: "Enables disk caching for character cards",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "performance.memoryCacheCapacity",
					description: "Maximum memory cache capacity",
					type: "Input",
					defaultValue: "100mb"
				},
				{
					name: "performance.requestCompression.enabled",
					description: "Enable gzip compression for client requests with large payloads",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "performance.requestCompression.minPayloadSize",
					description: "Minimum payload size to trigger compression (0 to compress all)",
					type: "Input",
					defaultValue: "256kb"
				},
				{
					name: "performance.requestCompression.maxPayloadSize",
					description: "Hard upper payload size limit for compression (0 for any size)",
					type: "Input",
					defaultValue: "8mb"
				},
				{
					name: "performance.requestCompression.timeout",
					description: "Timeout for request compression in milliseconds",
					type: "Input",
					defaultValue: 4e3
				}
			]
		},
		{
			section: "Cache Buster Configuration",
			items: [{
				name: "cacheBuster.enabled",
				description: "Clear browser cache on first load or after uploading image files",
				type: "CheckBox",
				defaultValue: false
			}, {
				name: "cacheBuster.userAgentPattern",
				description: "Only clear cache for the specified user agent regex pattern.",
				type: "Input",
				defaultValue: ""
			}]
		},
		{
			section: "Thumbnailing Configuration",
			items: [
				{
					name: "thumbnails.enabled",
					description: "Enable thumbnail generation",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "thumbnails.quality",
					description: "JPEG thumbnail quality",
					type: "Input",
					defaultValue: 95
				},
				{
					name: "thumbnails.format",
					description: "Image format for thumbnails",
					type: "DropDown",
					defaultValue: "jpg",
					values: ["jpg", "png"]
				},
				{
					name: "thumbnails.dimensions.bg",
					description: "Background thumbnails size",
					type: "Input",
					defaultValue: "[160, 90]"
				},
				{
					name: "thumbnails.dimensions.avatar",
					description: "Avatar thumbnails size",
					type: "Input",
					defaultValue: "[96, 144]"
				},
				{
					name: "thumbnails.dimensions.persona",
					description: "Persona thumbnails size",
					type: "Input",
					defaultValue: "[96, 144]"
				}
			]
		},
		{
			section: "Backup Configuration",
			items: [
				{
					name: "backups.allowFullDataBackup",
					description: "Allow users to create a full backup archive of their data",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "backups.chat.enabled",
					description: "Enable automatic chat backups",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "backups.chat.checkIntegrity",
					description: "Verify integrity of chat files before saving",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "backups.common.numberOfBackups",
					description: "Number of backups to keep",
					type: "Input",
					defaultValue: 50
				},
				{
					name: "backups.chat.throttleInterval",
					description: "Backup throttle interval (ms)",
					type: "Input",
					defaultValue: 1e4
				},
				{
					name: "backups.chat.maxTotalBackups",
					description: "Maximum total chat backups to keep",
					type: "Input",
					defaultValue: -1
				}
			]
		},
		{
			section: "Extensions Configuration",
			items: [
				{
					name: "extensions.enabled",
					description: "Enable UI extensions",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "extensions.autoUpdate",
					description: "Auto-update extensions (if enabled by the extension manifest)",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "extensions.models.autoDownload",
					description: "Enable automatic model downloads",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "extensions.models.classification",
					description: "HuggingFace model ID for classification",
					type: "Input",
					defaultValue: "Cohee/distilbert-base-uncased-go-emotions-onnx"
				},
				{
					name: "extensions.models.captioning",
					description: "HuggingFace model ID for image captioning",
					type: "Input",
					defaultValue: "Xenova/vit-gpt2-image-captioning"
				},
				{
					name: "extensions.models.embedding",
					description: "HuggingFace model ID for embeddings",
					type: "Input",
					defaultValue: "Cohee/jina-embeddings-v2-base-en"
				},
				{
					name: "extensions.models.speechToText",
					description: "HuggingFace model ID for speech-to-text",
					type: "Input",
					defaultValue: "Xenova/whisper-small"
				},
				{
					name: "extensions.models.textToSpeech",
					description: "HuggingFace model ID for text-to-speech",
					type: "Input",
					defaultValue: "Xenova/speecht5_tts"
				}
			]
		},
		{
			section: "Git Configuration",
			items: [{
				name: "git.backend",
				description: "Git backend for plugin/extension repository operations",
				type: "DropDown",
				defaultValue: "auto",
				values: [
					"auto",
					"system",
					"builtin"
				]
			}]
		},
		{
			section: "Server Plugins",
			items: [{
				name: "enableServerPlugins",
				description: "Enable server-side plugins",
				type: "CheckBox",
				defaultValue: false
			}, {
				name: "enableServerPluginsAutoUpdate",
				description: "Attempt to automatically update server plugins on startup",
				type: "CheckBox",
				defaultValue: true
			}]
		},
		{
			section: "API Integration Settings",
			items: [
				{
					name: "promptPlaceholder",
					description: "Default message for empty prompts",
					type: "Input",
					defaultValue: "[Start a new chat]"
				},
				{
					name: "openai.randomizeUserId",
					description: "Randomize user ID for API calls",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "openai.captionSystemPrompt",
					description: "System message for caption completion",
					type: "Input",
					defaultValue: ""
				},
				{
					name: "mistral.enablePrefix",
					description: "Enable reply prefilling. The prefix will be echoed in the response",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "ollama.keepAlive",
					description: "Model keep-alive duration (seconds)",
					type: "Input",
					defaultValue: -1
				},
				{
					name: "ollama.batchSize",
					description: "Controls the \"num_batch\" (batch size) parameter of the generation request",
					type: "Input",
					defaultValue: -1
				},
				{
					name: "claude.enableSystemPromptCache",
					description: "Enable system prompt caching",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "claude.cachingAtDepth",
					description: "Enable message history caching",
					type: "Input",
					defaultValue: -1
				},
				{
					name: "claude.extendedTTL",
					description: "Use 1h TTL instead of the default 5m.",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "claude.enableAdaptiveThinking",
					description: "Enables adaptive thinking for supported models (Opus 4.6+)",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "gemini.apiVersion",
					description: "API endpoint version (AI Studio only)",
					type: "DropDown",
					defaultValue: "v1beta",
					values: ["v1beta", "v1alpha"]
				},
				{
					name: "gemini.thoughtSignatures",
					description: "Adds thought signatures to requests (Gemini 3 and above)",
					type: "CheckBox",
					defaultValue: true
				},
				{
					name: "gemini.enableSystemPromptCache",
					description: "Enables caching of the system prompt (OpenRouter only)",
					type: "CheckBox",
					defaultValue: false
				},
				{
					name: "gemini.image.personGeneration",
					description: "Person generation setting for Imagen",
					type: "DropDown",
					defaultValue: "allow_adult",
					values: [
						"dont_allow",
						"allow_adult",
						"allow_all"
					]
				},
				{
					name: "deepl.formality",
					description: "Translation formality level",
					type: "DropDown",
					defaultValue: "default",
					values: [
						"default",
						"more",
						"less",
						"prefer_more",
						"prefer_less"
					]
				}
			]
		}
	]
}];
//#endregion
//#region module/src/containers/text/SillyTavern/RendererMethods.ts
const shellCommand$2 = isWin ? "call start.bat" : "bash ./start.sh";
const URL$2 = "https://github.com/SillyTavern/SillyTavern";
/**
* Checks if an argument is a configuration-file argument or a command-line argument.
* @param name The name of the argument.
* @returns {boolean | undefined} `true` if it's a config arg, `false` if it's a command-line arg, `undefined` if not found.
*/
function isConfigArg(name) {
	if (isEmpty(name)) return void 0;
	for (const argument of sillyArguments) if ("sections" in argument) {
		for (const section of argument.sections) if (section.items.find((item) => item.name === name)) return true;
	} else if (argument.items.find((item) => item.name === name)) return false;
}
/**
* Finds the full definition of an argument from the sillyArguments structure.
* @param name - The name of the argument to find.
* @returns The argument item definition or undefined if not found.
*/
function getArgDefinition(name) {
	for (const category of sillyArguments) {
		const found = ("sections" in category ? category.sections.flatMap((section) => section.items) : category.items).find((item) => item.name === name);
		if (found) return found;
	}
}
/**
* Sets a nested property on an object based on a dot-notation path.
* @param obj The object to modify.
* @param path The dot-notation path (e.g., "logging.minLogLevel").
* @param value The value to set.
*/
function setNestedValue(obj, path, value) {
	const keys = path.split(".");
	let current = obj;
	while (keys.length > 1) {
		const key = keys.shift();
		if (typeof current[key] === "undefined") current[key] = {};
		current = current[key];
	}
	current[keys[0]] = value;
}
/**
* NEW: Parses arguments into an object with separate file contents.
* @param args The chosen arguments from the UI.
* @returns An object with `commands` and `configs` string properties.
*/
function parseArgsToFiles(args) {
	let commandArgs = "";
	let lines = "";
	const configObject = {};
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) commandArgs += result.commandArg + " ";
		} else {
			const isConfig = isConfigArg(arg.name);
			if (isConfig === true) {
				const definition = getArgDefinition(arg.name);
				if (!definition) return;
				let processedValue = arg.value;
				if (definition.type === "CheckBox") processedValue = true;
				else if (typeof definition.defaultValue === "number") processedValue = Number(arg.value) || definition.defaultValue;
				else if (definition.defaultValue === "true" || definition.defaultValue === "false") processedValue = arg.value.toString().toLowerCase() === "true";
				setNestedValue(configObject, arg.name, processedValue);
			} else if (isConfig === false) {
				const argType = getArgumentType(arg.name, sillyArguments);
				if (argType === "CheckBox") commandArgs += `${arg.name} `;
				else if (argType === "File" || argType === "Directory") commandArgs += `${arg.name} "${arg.value}" `;
				else commandArgs += `${arg.name} ${arg.value} `;
			}
		}
	});
	let commandResult = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	if (lines) commandResult += lines + "\n";
	commandResult += isEmpty(commandArgs) ? shellCommand$2 : `${shellCommand$2} ${commandArgs.trim()}`;
	const configResult = isEmpty(configObject) ? "# No configuration options were selected to save." : dump(configObject);
	return {
		commands: commandResult,
		configs: configResult
	};
}
function parseArgsToString$7(args) {
	const { commands, configs } = parseArgsToFiles(args);
	const commandTitle = `Script File Preview (${isWin ? ".bat" : ".sh"})`;
	const configTitle = "Configuration File Preview (config.yml)";
	if (isMultiFilePreviewSupported) return [{
		title: commandTitle,
		data: commands
	}, {
		title: configTitle,
		data: configs
	}];
	let finalResult = `-------------${commandTitle}-------------`;
	finalResult += `\n\n${commands}\n\n`;
	finalResult += `-------------${configTitle}-------------`;
	finalResult += `\n\n${configs}`;
	return finalResult;
}
/**
* Recursively flattens a nested config object into a ChosenArgument array.
*/
function flattenConfigObject(obj, prefix = "") {
	let results = [];
	for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
		const newPrefix = prefix ? `${prefix}.${key}` : key;
		const value = obj[key];
		if (typeof value === "object" && value !== null && !Array.isArray(value)) results = results.concat(flattenConfigObject(value, newPrefix));
		else if (getArgDefinition(newPrefix)?.type === "CheckBox" && value === true) results.push({
			name: newPrefix,
			value: ""
		});
		else results.push({
			name: newPrefix,
			value: String(value)
		});
	}
	return results;
}
function parseFilesToArgs(commands, configs) {
	const commandArgResult = [];
	if (!isEmpty(commands)) commands.split("\n").forEach((line) => {
		if (!line.startsWith(shellCommand$2)) return;
		const clArgs = line.split(`${shellCommand$2} `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, sillyArguments)) commandArgResult.push({
				name: value.name,
				value: getArgumentType(value.name, sillyArguments) === "CheckBox" ? "" : value.value
			});
		});
	});
	let configArgResult = [];
	if (!isEmpty(configs)) try {
		const parsedYaml = load(configs);
		if (typeof parsedYaml === "object" && parsedYaml !== null) configArgResult = flattenConfigObject(parsedYaml);
	} catch (e) {
		console.error("Failed to parse YAML config string:", e);
	}
	return [...commandArgResult, ...configArgResult];
}
function parseStringToArgs$7(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (!line.startsWith(shellCommand$2)) return;
		const clArgs = line.split(`${shellCommand$2} `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, sillyArguments)) {
				if (getArgumentType(value.name, sillyArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
function startInstall$7(stepper) {
	GitInstaller("SillyTavern", URL$2, stepper, [isWin ? "start.bat" : "start.sh"]);
}
async function cardInfo$7(api, callback) {
	return CardInfo(URL$2, void 0, api, callback);
}
const SILLYTAVERN_RM = {
	catchAddress: catchAddress$5,
	parseArgsToString: parseArgsToString$7,
	parseStringToArgs: parseStringToArgs$7,
	cardInfo: cardInfo$7,
	manager: {
		startInstall: startInstall$7,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/text/TextGenOobabooga/Arguments.ts
const oobaboogaArguments = [{
	category: "Command Line Arguments",
	sections: [
		{
			section: "Basic settings",
			items: [
				{
					name: "--user-data-dir",
					description: "Path to the user data directory. Default: auto-detected.",
					type: "Directory"
				},
				{
					name: "--multi-user",
					description: "Multi-user mode. Chat histories are not saved or automatically loaded. Warning: this is likely not safe for sharing publicly.",
					type: "CheckBox"
				},
				{
					name: "--character",
					description: "The name of the character to load in chat mode by default.",
					type: "Input"
				},
				{
					name: "--model",
					description: "Name of the model to load by default.",
					type: "Input"
				},
				{
					name: "--lora",
					description: "The list of LoRAs to load. If you want to load more than one LoRA, write the names separated by spaces.",
					type: "Input"
				},
				{
					name: "--model-dir",
					description: "Path to directory with all the models.",
					type: "Directory",
					defaultValue: "user_data/models"
				},
				{
					name: "--lora-dir",
					description: "Path to directory with all the loras.",
					type: "Directory",
					defaultValue: "user_data/loras"
				},
				{
					name: "--model-menu",
					description: "Show a model menu in the terminal when the web UI is first launched.",
					type: "CheckBox"
				},
				{
					name: "--settings",
					description: "Load the default interface settings from this yaml file. See user_data/settings-template.yaml for an example. If you create a file called user_data/settings.yaml, this file will be loaded by default without the need to use the --settings flag.",
					type: "File"
				},
				{
					name: "--extensions",
					description: "The list of extensions to load. If you want to load more than one extension, write the names separated by spaces.",
					type: "Input"
				},
				{
					name: "--verbose",
					description: "Print the prompts to the terminal.",
					type: "CheckBox"
				},
				{
					name: "--idle-timeout",
					description: "Unload model after this many minutes of inactivity. It will be automatically reloaded when you try to use it again.",
					type: "Input",
					defaultValue: "0"
				}
			]
		},
		{
			section: "Image model",
			items: [
				{
					name: "--image-model",
					description: "Name of the image model to select on startup (overrides saved setting).",
					type: "Input"
				},
				{
					name: "--image-model-dir",
					description: "Path to directory with all the image models.",
					type: "Directory",
					defaultValue: "user_data/image_models"
				},
				{
					name: "--image-dtype",
					description: "Data type for image model.",
					type: "DropDown",
					values: ["bfloat16", "float16"]
				},
				{
					name: "--image-attn-backend",
					description: "Attention backend for image model.",
					type: "DropDown",
					values: ["flash_attention_2", "sdpa"]
				},
				{
					name: "--image-cpu-offload",
					description: "Enable CPU offloading for image model.",
					type: "CheckBox"
				},
				{
					name: "--image-compile",
					description: "Compile the image model for faster inference.",
					type: "CheckBox"
				},
				{
					name: "--image-quant",
					description: "Quantization method for image model.",
					type: "DropDown",
					values: [
						"none",
						"bnb-8bit",
						"bnb-4bit",
						"torchao-int8wo",
						"torchao-fp4",
						"torchao-float8wo"
					]
				}
			]
		},
		{
			section: "Model loader",
			items: [{
				name: "--loader",
				description: "Choose the model loader manually, otherwise, it will get autodetected. Valid options: Transformers, llama.cpp, ExLlamav3_HF, ExLlamav3, TensorRT-LLM.",
				type: "DropDown",
				values: [
					"Transformers",
					"llama.cpp",
					"ExLlamav3_HF",
					"ExLlamav3",
					"TensorRT-LLM"
				]
			}]
		},
		{
			section: "Context and cache",
			items: [{
				name: "--ctx-size",
				description: "Context size in tokens. 0 = auto for llama.cpp (requires gpu-layers=-1), 8192 for other loaders.",
				type: "Input",
				defaultValue: "0"
			}, {
				name: "--cache-type",
				description: "KV cache type; valid options: llama.cpp - fp16, q8_0, q4_0; ExLlamaV3 - fp16, q2 to q8 (can specify k_bits and v_bits separately, e.g. q4_q8).",
				type: "Input",
				defaultValue: "fp16"
			}]
		},
		{
			section: "Speculative decoding",
			items: [
				{
					name: "--model-draft",
					description: "Path to the draft model for speculative decoding.",
					type: "File"
				},
				{
					name: "--draft-max",
					description: "Number of tokens to draft for speculative decoding.",
					type: "Input",
					defaultValue: "3"
				},
				{
					name: "--gpu-layers-draft",
					description: "Number of layers to offload to the GPU for the draft model.",
					type: "Input",
					defaultValue: "256"
				},
				{
					name: "--device-draft",
					description: "Comma-separated list of devices to use for offloading the draft model. Example: CUDA0,CUDA1",
					type: "Input"
				},
				{
					name: "--ctx-size-draft",
					description: "Size of the prompt context for the draft model. If 0, uses the same as the main model.",
					type: "Input",
					defaultValue: "0"
				},
				{
					name: "--spec-type",
					description: "Speculative decoding type. Recommended: draft-mtp if the main model is an MTP build, otherwise ngram-mod.",
					type: "DropDown",
					values: [
						"none",
						"draft-mtp",
						"ngram-mod",
						"ngram-simple",
						"ngram-map-k",
						"ngram-map-k4v"
					],
					defaultValue: "none"
				},
				{
					name: "--spec-ngram-size-n",
					description: "N-gram lookup size for ngram speculative decoding.",
					type: "Input",
					defaultValue: "24"
				},
				{
					name: "--spec-ngram-size-m",
					description: "Draft n-gram size for ngram speculative decoding.",
					type: "Input",
					defaultValue: "48"
				},
				{
					name: "--spec-ngram-min-hits",
					description: "Minimum n-gram hits for ngram-map speculative decoding.",
					type: "Input",
					defaultValue: "1"
				}
			]
		},
		{
			section: "llama.cpp",
			items: [
				{
					name: "--gpu-layers",
					description: "Number of layers to offload to the GPU. -1 = auto.",
					type: "Input",
					defaultValue: "-1"
				},
				{
					name: "--cpu-moe",
					description: "Move the experts to the CPU (for MoE models).",
					type: "CheckBox"
				},
				{
					name: "--mmproj",
					description: "Path to the mmproj file for vision models.",
					type: "File"
				},
				{
					name: "--streaming-llm",
					description: "Activate StreamingLLM to avoid re-evaluating the entire prompt when old messages are removed.",
					type: "CheckBox"
				},
				{
					name: "--tensor-split",
					description: "Split the model across multiple GPUs. Comma-separated list of proportions. Example: 60,40.",
					type: "Input"
				},
				{
					name: "--split-mode",
					description: "How to split the model across multiple GPUs. \"tensor\" can make multi-GPU significantly faster.",
					type: "DropDown",
					values: [
						"layer",
						"row",
						"tensor",
						"none"
					],
					defaultValue: "layer"
				},
				{
					name: "--no-mmap",
					description: "Prevent mmap from being used.",
					type: "CheckBox"
				},
				{
					name: "--mlock",
					description: "Force the system to keep the model in RAM.",
					type: "CheckBox"
				},
				{
					name: "--no-kv-offload",
					description: "Do not offload the K, Q, V to the GPU. This saves VRAM but reduces performance.",
					type: "CheckBox"
				},
				{
					name: "--batch-size",
					description: "Maximum number of prompt tokens to batch together when calling llama-server (application level batch size).",
					type: "Input",
					defaultValue: "1024"
				},
				{
					name: "--ubatch-size",
					description: "Maximum number of prompt tokens to batch together when calling llama-server (device level physical batch size).",
					type: "Input",
					defaultValue: "1024"
				},
				{
					name: "--threads",
					description: "Number of threads to use.",
					type: "Input",
					defaultValue: "0"
				},
				{
					name: "--threads-batch",
					description: "Number of threads to use for batches/prompt processing.",
					type: "Input",
					defaultValue: "0"
				},
				{
					name: "--numa",
					description: "Activate NUMA task allocation for llama.cpp.",
					type: "CheckBox"
				},
				{
					name: "--parallel",
					description: "Number of parallel request slots. The context size is divided equally among slots.",
					type: "Input",
					defaultValue: "1"
				},
				{
					name: "--fit-target",
					description: "Target VRAM margin per device for auto GPU layers, comma-separated list of values in MiB.",
					type: "Input",
					defaultValue: "512"
				},
				{
					name: "--extra-flags",
					description: "Extra flags to pass to llama-server. Example: \"--jinja --rpc 192.168.1.100:50052\".",
					type: "Input"
				},
				{
					name: "--ik",
					description: "Use ik_llama.cpp instead of upstream llama.cpp. Requires ik_llama_cpp_binaries package.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Transformers/Accelerate",
			items: [
				{
					name: "--cpu",
					description: "Use the CPU to generate text. Warning: Training on CPU is extremely slow.",
					type: "CheckBox"
				},
				{
					name: "--cpu-memory",
					description: "Maximum CPU memory in GiB. Use this for CPU offloading.",
					type: "Input"
				},
				{
					name: "--disk",
					description: "If the model is too large for your GPU(s) and CPU combined, send the remaining layers to the disk.",
					type: "CheckBox"
				},
				{
					name: "--disk-cache-dir",
					description: "Directory to save the disk cache to.",
					type: "Directory",
					defaultValue: "user_data/cache"
				},
				{
					name: "--load-in-8bit",
					description: "Load the model with 8-bit precision (using bitsandbytes).",
					type: "CheckBox"
				},
				{
					name: "--bf16",
					description: "Load the model with bfloat16 precision. Requires NVIDIA Ampere GPU.",
					type: "CheckBox"
				},
				{
					name: "--no-cache",
					description: "Set use_cache to False while generating text. This reduces VRAM usage slightly, but it comes at a performance cost.",
					type: "CheckBox"
				},
				{
					name: "--trust-remote-code",
					description: "Set trust_remote_code=True while loading the model. Necessary for some models.",
					type: "CheckBox"
				},
				{
					name: "--force-safetensors",
					description: "Set use_safetensors=True while loading the model. This prevents arbitrary code execution.",
					type: "CheckBox"
				},
				{
					name: "--no_use_fast",
					description: "Set use_fast=False while loading the tokenizer (it's True by default). Use this if you have any problems related to use_fast.",
					type: "CheckBox"
				},
				{
					name: "--attn-implementation",
					description: "Attention implementation. Valid options: sdpa, eager, flash_attention_2.",
					type: "DropDown",
					values: [
						"sdpa",
						"eager",
						"flash_attention_2"
					],
					defaultValue: "sdpa"
				}
			]
		},
		{
			section: "bitsandbytes 4-bit",
			items: [
				{
					name: "--load-in-4bit",
					description: "Load the model with 4-bit precision (using bitsandbytes).",
					type: "CheckBox"
				},
				{
					name: "--use_double_quant",
					description: "use_double_quant for 4-bit.",
					type: "CheckBox"
				},
				{
					name: "--compute_dtype",
					description: "compute dtype for 4-bit. Valid options: bfloat16, float16, float32.",
					type: "DropDown",
					values: [
						"bfloat16",
						"float16",
						"float32"
					],
					defaultValue: "float16"
				},
				{
					name: "--quant_type",
					description: "quant_type for 4-bit. Valid options: nf4, fp4.",
					type: "DropDown",
					values: ["nf4", "fp4"],
					defaultValue: "nf4"
				}
			]
		},
		{
			section: "ExLlamaV3",
			items: [
				{
					name: "--gpu-split",
					description: "Comma-separated list of VRAM (in GB) to use per GPU device for model layers. Example: 20,7,7.",
					type: "Input"
				},
				{
					name: "--enable-tp",
					description: "Enable Tensor Parallelism (TP) to split the model across GPUs.",
					type: "CheckBox"
				},
				{
					name: "--tp-backend",
					description: "The backend for tensor parallelism. Valid options: native, nccl. Default: native.",
					type: "DropDown",
					values: ["native", "nccl"],
					defaultValue: "native"
				},
				{
					name: "--cfg-cache",
					description: "Create an additional cache for CFG negative prompts. Necessary to use CFG with that loader.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "Gradio",
			items: [
				{
					name: "--listen",
					description: "Make the web UI reachable from your local network.",
					type: "CheckBox"
				},
				{
					name: "--listen-port",
					description: "The listening port that the server will use.",
					type: "Input"
				},
				{
					name: "--listen-host",
					description: "The hostname that the server will use.",
					type: "Input"
				},
				{
					name: "--share",
					description: "Create a public URL. This is useful for running the web UI on Google Colab or similar.",
					type: "CheckBox"
				},
				{
					name: "--auto-launch",
					description: "Open the web UI in the default browser upon launch.",
					type: "CheckBox"
				},
				{
					name: "--gradio-auth",
					description: "Set Gradio authentication password in the format \"username:password\". Multiple credentials can also be supplied with \"u1:p1,u2:p2,u3:p3\".",
					type: "Input"
				},
				{
					name: "--gradio-auth-path",
					description: "Set the Gradio authentication file path. The file should contain one or more user:password pairs in the same format as above.",
					type: "File"
				},
				{
					name: "--ssl-keyfile",
					description: "The path to the SSL certificate key file.",
					type: "File"
				},
				{
					name: "--ssl-certfile",
					description: "The path to the SSL certificate cert file.",
					type: "File"
				},
				{
					name: "--subpath",
					description: "Customize the subpath for gradio, use with reverse proxy",
					type: "Input"
				},
				{
					name: "--old-colors",
					description: "Use the legacy Gradio colors, before the December/2024 update.",
					type: "CheckBox"
				},
				{
					name: "--portable",
					description: "Hide features not available in portable mode like training.",
					type: "CheckBox"
				}
			]
		},
		{
			section: "API",
			items: [
				{
					name: "--api",
					description: "Enable the API server.",
					type: "CheckBox"
				},
				{
					name: "--public-api",
					description: "Create a public URL for the API using Cloudflare.",
					type: "CheckBox"
				},
				{
					name: "--public-api-id",
					description: "Tunnel ID for named Cloudflare Tunnel. Use together with public-api option.",
					type: "Input"
				},
				{
					name: "--api-port",
					description: "The listening port for the API.",
					type: "Input",
					defaultValue: "5000"
				},
				{
					name: "--api-key",
					description: "API authentication key.",
					type: "Input"
				},
				{
					name: "--admin-key",
					description: "API authentication key for admin tasks like loading and unloading models. If not set, will be the same as --api-key.",
					type: "Input"
				},
				{
					name: "--nowebui",
					description: "Do not launch the Gradio UI. Useful for launching the API in standalone mode.",
					type: "CheckBox"
				},
				{
					name: "--api-enable-ipv6",
					description: "Enable IPv6 for the API",
					type: "CheckBox"
				},
				{
					name: "--api-disable-ipv4",
					description: "Disable IPv4 for the API",
					type: "CheckBox"
				}
			]
		},
		{
			section: "API generation defaults",
			items: [
				{
					name: "--temperature",
					description: "Temperature sampling default override.",
					type: "Input"
				},
				{
					name: "--dynatemp-low",
					description: "Dynamic temperature low bound.",
					type: "Input"
				},
				{
					name: "--dynatemp-high",
					description: "Dynamic temperature high bound.",
					type: "Input"
				},
				{
					name: "--dynatemp-exponent",
					description: "Dynamic temperature exponent.",
					type: "Input"
				},
				{
					name: "--smoothing-factor",
					description: "Smoothing factor for samplers.",
					type: "Input"
				},
				{
					name: "--smoothing-curve",
					description: "Smoothing curve for samplers.",
					type: "Input"
				},
				{
					name: "--top-p",
					description: "Top P sampling cutoff.",
					type: "Input",
					defaultValue: "0.95"
				},
				{
					name: "--top-k",
					description: "Top K sampling cutoff.",
					type: "Input"
				},
				{
					name: "--min-p",
					description: "Min P sampling cutoff.",
					type: "Input"
				},
				{
					name: "--top-n-sigma",
					description: "Top N Sigma cutoff.",
					type: "Input"
				},
				{
					name: "--typical-p",
					description: "Typical P sampling cutoff.",
					type: "Input"
				},
				{
					name: "--xtc-threshold",
					description: "XTC threshold.",
					type: "Input"
				},
				{
					name: "--xtc-probability",
					description: "XTC probability.",
					type: "Input"
				},
				{
					name: "--epsilon-cutoff",
					description: "Epsilon cutoff.",
					type: "Input"
				},
				{
					name: "--eta-cutoff",
					description: "Eta cutoff.",
					type: "Input"
				},
				{
					name: "--tfs",
					description: "TFS sampling value.",
					type: "Input"
				},
				{
					name: "--top-a",
					description: "Top A sampling cutoff.",
					type: "Input"
				},
				{
					name: "--adaptive-target",
					description: "Adaptive target value.",
					type: "Input"
				},
				{
					name: "--adaptive-decay",
					description: "Adaptive decay value.",
					type: "Input"
				},
				{
					name: "--dry-multiplier",
					description: "DRY multiplier.",
					type: "Input"
				},
				{
					name: "--dry-allowed-length",
					description: "DRY allowed length.",
					type: "Input"
				},
				{
					name: "--dry-base",
					description: "DRY base.",
					type: "Input"
				},
				{
					name: "--repetition-penalty",
					description: "Repetition penalty.",
					type: "Input"
				},
				{
					name: "--frequency-penalty",
					description: "Frequency penalty.",
					type: "Input"
				},
				{
					name: "--presence-penalty",
					description: "Presence penalty.",
					type: "Input"
				},
				{
					name: "--encoder-repetition-penalty",
					description: "Encoder repetition penalty.",
					type: "Input"
				},
				{
					name: "--no-repeat-ngram-size",
					description: "No repeat ngram size.",
					type: "Input"
				},
				{
					name: "--repetition-penalty-range",
					description: "Repetition penalty range.",
					type: "Input"
				},
				{
					name: "--penalty-alpha",
					description: "Penalty alpha.",
					type: "Input"
				},
				{
					name: "--guidance-scale",
					description: "Guidance scale.",
					type: "Input"
				},
				{
					name: "--mirostat-mode",
					description: "Mirostat mode.",
					type: "Input"
				},
				{
					name: "--mirostat-tau",
					description: "Mirostat tau.",
					type: "Input"
				},
				{
					name: "--mirostat-eta",
					description: "Mirostat eta.",
					type: "Input"
				},
				{
					name: "--do-sample",
					description: "Do sample during generation.",
					type: "CheckBox"
				},
				{
					name: "--dynamic-temperature",
					description: "Enable dynamic temperature.",
					type: "CheckBox"
				},
				{
					name: "--temperature-last",
					description: "Apply temperature sampler last.",
					type: "CheckBox"
				},
				{
					name: "--sampler-priority",
					description: "Sampler priority order string.",
					type: "Input"
				},
				{
					name: "--dry-sequence-breakers",
					description: "DRY sequence breakers string.",
					type: "Input"
				},
				{
					name: "--enable-thinking",
					description: "Enable thinking/reasoning output blocks.",
					type: "CheckBox"
				},
				{
					name: "--reasoning-effort",
					description: "Reasoning effort level.",
					type: "DropDown",
					values: [
						"low",
						"medium",
						"high"
					],
					defaultValue: "medium"
				},
				{
					name: "--preserve-thinking",
					description: "Preserve thinking blocks from prior turns in the chat template.",
					type: "CheckBox"
				},
				{
					name: "--chat-template-file",
					description: "Path to a chat template file (.jinja, .jinja2, or .yaml) to use as default instruction template.",
					type: "File"
				}
			]
		},
		{
			section: "Electron",
			items: [{
				name: "--no-electron",
				description: "In portable builds, skip the Electron desktop window and use browser instead.",
				type: "CheckBox"
			}]
		}
	]
}];
//#endregion
//#region module/src/containers/text/TextGenOobabooga/ExtensionsList.ts
async function fetchExtensionList() {
	return [
		{
			url: "https://github.com/altoiddealer/ad_discordbot",
			title: "ad_discordbot",
			description: "Advanced Discord bot with image generation, TTS, voice channels, and extensive customization.",
			stars: 0
		},
		{
			url: "https://github.com/brucepro/Memoir",
			title: "Memoir+",
			description: "Adds short and long term memories, emotional polarity tracking for personas.",
			stars: 224
		},
		{
			url: "https://github.com/mistbyte-ai/time-injector-mistbyte",
			title: "Time Injector (MistByte)",
			description: "Injects the current date/time into every prompt.",
			stars: 0
		},
		{
			url: "https://github.com/mistbyte-ai/websearch-mistbyte",
			title: "WebSearch API (MistByte)",
			description: "Local, explicit web search integration without hallucinations.",
			stars: 0
		},
		{
			url: "https://github.com/mamei16/context-progress-bar-text-generation-webui",
			title: "context-progress-bar",
			description: "Real-time progress bar showing context window usage.",
			stars: 6
		},
		{
			url: "https://github.com/innightwolfsleep/text-generation-webui-telegram_bot",
			title: "telegram_bot",
			description: "Telegram bot interface for text-generation-webui.",
			stars: 102
		},
		{
			url: "https://github.com/mamei16/LLM_Web_search",
			title: "LLM_Web_search",
			description: "Give your LLM the ability to search the web.",
			stars: 275
		},
		{
			url: "https://github.com/ill13/AutoSave/",
			title: "AutoSave",
			description: "Auto save extension for generated text, 100% local.",
			stars: 25
		},
		{
			url: "https://github.com/SicariusSicariiStuff/Diffusion_TTS",
			title: "Diffusion_TTS",
			description: "Realistic TTS using faster TorToiSe autoregressive model.",
			stars: 69
		},
		{
			url: "https://github.com/SkinnyDevi/skdv_comfyui",
			title: "SKDV ComfyUI Image Generation",
			description: "ComfyUI image generation with custom workflows and character prompts.",
			stars: 14
		},
		{
			url: "https://github.com/SkinnyDevi/webui_tavernai_charas",
			title: "SKDV Integrated TavernUI Characters",
			description: "Search, download, and manage TavernAI character cards.",
			stars: 69
		},
		{
			url: "https://github.com/FartyPants/Playground",
			title: "Playground for Writers",
			description: "Advanced notebook with inline instruct, select and insert, LoRA-Rama.",
			stars: 146
		},
		{
			url: "https://github.com/FartyPants/VirtualLora",
			title: "Virtual Lora",
			description: "State of the art LoRA management with custom collections and checkpoints.",
			stars: 19
		},
		{
			url: "https://github.com/FartyPants/Twinbook",
			title: "Twinbook",
			description: "Combines chat and notebook with dual-side control.",
			stars: 42
		},
		{
			url: "https://github.com/erew123/alltalk_tts",
			title: "AllTalk v2 TTS",
			description: "Multi-engine TTS with Coqui XTTS, F5 TTS, Piper, Parler, and RVC support.",
			stars: 2242
		},
		{
			url: "https://github.com/rsxdalv/text-to-tts-webui",
			title: "Text To TTS WebUI",
			description: "Connect to TTS WebUI for Kokoro TTS and ChatterBox TTS.",
			stars: 2
		},
		{
			url: "https://github.com/okazaki10/Emotivoice_RVC_TTS",
			title: "Emotivoice_RVC_TTS",
			description: "Emotivoice extension with RVC custom voice.",
			stars: 0
		},
		{
			url: "https://github.com/h43lb1t0/KokoroTtsTexGernerationWebui",
			title: "Kokoro TTS",
			description: "TTS with Kokoro v1, 26 different voices.",
			stars: 21
		},
		{
			url: "https://github.com/marcos33998/GPT-SoVITS_TTS",
			title: "GPT-SoVITS_TTS",
			description: "TTS using GPT-SoVits api_v2.",
			stars: 0
		},
		{
			url: "https://github.com/FartyPants/FPreloader",
			title: "FPreloader",
			description: "Reload extensions without rebooting web UI.",
			stars: 19
		},
		{
			url: "https://github.com/brucepro/LibreTranslate-extension-for-text-generation-webui",
			title: "LibreTranslate",
			description: "Offline translation using LibreTranslate local server.",
			stars: 3
		},
		{
			url: "https://github.com/hallucinate-games/oobabooga-jsonformer-plugin",
			title: "jsonformer",
			description: "Force model output to conform to JSON schema.",
			stars: 28
		},
		{
			url: "https://github.com/theubie/complex_memory",
			title: "complex_memory",
			description: "KoboldAI-like memory extension with keyword-based injection.",
			stars: 108
		},
		{
			url: "https://github.com/Vasyanator/google_translate_plus",
			title: "google_translate_plus",
			description: "Improved Google Translate with paragraph preservation and large text support.",
			stars: 4
		},
		{
			url: "https://github.com/RandomInternetPreson/Lucid_Vision",
			title: "Lucid_Vision",
			description: "Integrates advanced vision models for image conversations.",
			stars: 57
		},
		{
			url: "https://github.com/RandomInternetPreson/LucidWebSearch",
			title: "LucidWebSearch",
			description: "Web search with Chrome and nouget OCR model support.",
			stars: 72
		},
		{
			url: "https://github.com/DavG25/text-generation-webui-code_syntax_highlight",
			title: "code_syntax_highlight",
			description: "Syntax highlighting for code snippets with copy-to-clipboard.",
			stars: 69
		},
		{
			url: "https://github.com/Anglebrackets/web_rag",
			title: "web_rag",
			description: "Retrieval-Augmented Generation from web content using Links browser.",
			stars: 23
		},
		{
			url: "https://github.com/Trojaner/text-generation-webui-stable_diffusion",
			title: "stable_diffusion",
			description: "Integrates Stable Diffusion with face swapping support.",
			stars: 58
		},
		{
			url: "https://github.com/ill13/SpeakLocal/",
			title: "SpeakLocal",
			description: "TTS using host's native engine, 100% local and low resource.",
			stars: 32
		},
		{
			url: "https://github.com/p-e-w/chatbot_clinic",
			title: "Chatbot Clinic",
			description: "Develop chatbot characters by testing multiple versions simultaneously.",
			stars: 61
		},
		{
			url: "https://github.com/GuizzyQC/sd_api_pictures_tag_injection",
			title: "sd_api_pictures_tag_injection",
			description: "Inject character tags into SD prompts for stable character images.",
			stars: 24
		},
		{
			url: "https://github.com/BoredBrownBear/text-generation-webui-model_ducking",
			title: "Model Ducking",
			description: "Auto-unload models after prompts to free VRAM.",
			stars: 17
		},
		{
			url: "https://github.com/Touch-Night/more_translators",
			title: "More translators",
			description: "Adds Baidu, Google, Bing, DeepL and more translators.",
			stars: 11
		},
		{
			url: "https://github.com/Hellisotherpeople/llm_steer-oobabooga/tree/main",
			title: "llm_steer-oobabooga",
			description: "Steer LLM outputs using activation engineering with steering vectors.",
			stars: 44
		},
		{
			url: "https://github.com/tijo95/piper_tts",
			title: "piper_tts",
			description: "Fast multilingual TTS using Piper model.",
			stars: 14
		},
		{
			url: "https://github.com/BuffMcBigHuge/text-generation-webui-edge-tts",
			title: "edge_tts",
			description: "Microsoft's Edge TTS with RVC support.",
			stars: 42
		},
		{
			url: "https://github.com/xr4dsh/CodeRunner",
			title: "CodeRunner",
			description: "Code execution environment using thebe and jupyter server.",
			stars: 30
		},
		{
			url: "https://github.com/TheInvisibleMage/ooba_dieroller",
			title: "Ooba_Dieroller",
			description: "Dice notation roller for tabletop RPGs.",
			stars: 5
		},
		{
			url: "https://github.com/yhyu13/Emotivoice_TTS",
			title: "Emotivoice_TTS",
			description: "Fast Chinese-English bilingual TTS by NetEase.",
			stars: 5
		},
		{
			url: "https://github.com/bekkayya/session_manager/",
			title: "Session_Manager",
			description: "Save/load data and parameters between sessions with autosaving.",
			stars: 7
		},
		{
			url: "https://github.com/kanttouchthis/text_generation_webui_xtts",
			title: "XTTSv2",
			description: "XTTSv2 TTS with narrator feature for asterisk text.",
			stars: 156
		},
		{
			url: "https://github.com/ThereforeGames/echoproof",
			title: "Echoproof",
			description: "Minimizes LLM repetition by injecting history into negative prompt.",
			stars: 33
		},
		{
			url: "https://github.com/RandomInternetPreson/text-generation-webui-barktts",
			title: "bark_tts (updated fork)",
			description: "Bark TTS with improved special character recognition.",
			stars: 9
		},
		{
			url: "https://github.com/minemo/text-generation-webui-barktts",
			title: "bark_tts (original)",
			description: "Suno-AI Bark TTS with multi-language and sound effects.",
			stars: 33
		},
		{
			url: "https://github.com/asadfgglie/voicevox_tts",
			title: "voicevox_tts",
			description: "Japanese TTS using VOICEVOX with auto-translation.",
			stars: 6
		},
		{
			url: "https://github.com/GiusTex/EdgeGPT",
			title: "EdgeGPT",
			description: "Quick internet access for your bot using EdgeGPT.",
			stars: 124
		},
		{
			url: "https://github.com/xanthousm/text-gen-webui-ui_tweaks",
			title: "UI Tweaks",
			description: "Sticky tabs and hidden sidebar to reduce scrolling.",
			stars: 23
		},
		{
			url: "https://github.com/ChobPT/oobaboogas-webui-langchain_agent/",
			title: "webui_langchain_agent",
			description: "Langchain agent using WebUI API and Wikipedia.",
			stars: 73
		},
		{
			url: "https://github.com/SnowMasaya/text-generation-webui/tree/deepl/extensions/deepl_translate",
			title: "deepl_translator",
			description: "Input and output translation using DeepL.",
			stars: 1
		},
		{
			url: "https://github.com/chrisrude/oobabot-plugin",
			title: "oobabot",
			description: "Discord bot with command-line and GUI modes, easy setup.",
			stars: 44
		},
		{
			url: "https://github.com/wawawario2/long_term_memory",
			title: "long_term_memory",
			description: "Sophisticated long term memory for chat mode bots.",
			stars: 304
		},
		{
			url: "https://github.com/dibrale/webui-autonomics",
			title: "webui-autonomics",
			description: "Dynamically adjust parameters to mirror emotional tone.",
			stars: 32
		},
		{
			url: "https://github.com/danikhan632/guidance_api",
			title: "Guidance API",
			description: "Enable guidance for generating schemaful data.",
			stars: 36
		},
		{
			url: "https://github.com/elPatrixF/dynamic_context",
			title: "dynamic_context",
			description: "Replaces {{time}} and {{date}} with current values.",
			stars: 11
		},
		{
			url: "https://github.com/janvarev/api_advanced",
			title: "api_advanced",
			description: "Enhanced API with auto-translation and caching.",
			stars: 11
		},
		{
			url: "https://github.com/janvarev/multi_translate",
			title: "multi_translate",
			description: "Multiple translation engines with toggle functionality.",
			stars: 28
		},
		{
			url: "https://github.com/ChobPT/text-generation-webui-discord_bot",
			title: "discord_bot",
			description: "Discord integration via webhooks.",
			stars: 13
		}
	];
}
//#endregion
//#region module/src/containers/text/TextGenOobabooga/RendererMethods.ts
const shellCommand$1 = isWin ? "call start_windows.bat" : isMac ? "bash ./start_macos.sh" : "bash ./start_linux.sh";
const URL$1 = "https://github.com/oobabooga/textgen";
function parseArgsToString$6(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let argResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else {
			const argType = getArgumentType(arg.name, oobaboogaArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	result += isEmpty(argResult) ? shellCommand$1 : `${shellCommand$1} ${argResult}`;
	return result;
}
function parseStringToArgs$6(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (!line.startsWith(shellCommand$1)) return;
		const clArgs = line.split(`${shellCommand$1} `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, oobaboogaArguments)) {
				if (getArgumentType(value.name, oobaboogaArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
function startInstall$6(stepper) {
	GitInstaller("Text Generation", URL$1, stepper, [isWin ? "start_windows.bat" : isMac ? "start_macos.sh" : "start_linux.sh"]);
}
async function cardInfo$6(api, callback) {
	return CardInfo(URL$1, "/extensions", api, callback);
}
function catchAddress$1(input) {
	const match = input.match(/Running on local URL:\s*(https?:\/\/[^\s]+)/i);
	if (match) return replaceAddress(match[1]);
}
const TG_RM = {
	catchAddress: catchAddress$1,
	fetchExtensionList,
	parseArgsToString: parseArgsToString$6,
	parseStringToArgs: parseStringToArgs$6,
	cardInfo: cardInfo$6,
	manager: {
		startInstall: startInstall$6,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/tools/AiToolkit/Arguments.ts
const aiToolkitArguments = [{
	category: "Environment Variables",
	sections: [{
		section: "Security",
		items: [{
			name: "AI_TOOLKIT_AUTH",
			description: "Set an authentication token to secure the UI. This token will be required to access the web interface. Highly recommended when hosting on cloud providers or any network that is not secure.",
			type: "Input"
		}]
	}]
}];
//#endregion
//#region module/src/containers/tools/AiToolkit/RendererMethods.ts
const AITOOLKIT_URL = "https://github.com/ostris/ai-toolkit";
function parseArgsToString$5(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let argResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else if (getArgumentType(arg.name, aiToolkitArguments) === "Input" && arg.value) {
			if (isWin) lines += `set ${arg.name}=${arg.value}\n`;
			else lines += `export ${arg.name}="${arg.value}"\n`;
		}
	});
	if (!isEmpty(lines)) result += lines + "\n";
	if (isWin) result += "set NODE_ENV=\n\n";
	else result += "export NODE_ENV=\"\"\n\n";
	result += isEmpty(argResult) ? "cd ui\nnpm run build_and_start" : `cd ui\nnpm run build_and_start ${argResult}`;
	return result;
}
function parseStringToArgs$5(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		line = line.trim();
		if (line.startsWith("set ")) {
			const [name, ...valueParts] = line.substring(4).split("=");
			const value = valueParts.join("=").trim();
			if (name && value) argResult.push({
				name: name.trim(),
				value
			});
		}
		if (line.startsWith("export ")) {
			const [name, ...valueParts] = line.substring(7).split("=");
			let value = valueParts.join("=").trim();
			if (value.startsWith("\"") && value.endsWith("\"")) value = value.slice(1, -1);
			if (name && value) argResult.push({
				name: name.trim(),
				value
			});
		}
	});
	return argResult;
}
function startInstall$5(stepper) {
	const pipCommand = getPythonCommandByOs().pip;
	const installReqs = (dir) => {
		stepper.executeTerminalCommands(`${pipCommand} install -r requirements.txt`, dir).then(() => {
			stepper.nextStep().then(() => {
				stepper.setInstalled(dir);
				stepper.showFinalStep("success", "AI Toolkit installation complete!", "All installation steps completed successfully. Your AI Toolkit environment is now ready for use. ");
			});
		});
	};
	stepper.initialSteps([
		"AI Toolkit",
		"Checking NodeJS",
		"Clone",
		"Install PyTorch",
		"Install Dependencies",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking if NPM is installed...");
			stepper.ipc.invoke("is_aitoolkit_npm_available").then((isNpmInstalled) => {
				if (isNpmInstalled) stepper.nextStep().then(() => {
					stepper.cloneRepository(AITOOLKIT_URL).then((dir) => {
						stepper.nextStep().then(() => {
							stepper.executeTerminalCommands(`${pipCommand} install --no-cache-dir torch==2.9.1 torchvision==0.24.1 torchaudio==2.9.1 --index-url https://download.pytorch.org/whl/cu128`, dir).then(() => {
								stepper.nextStep().then(() => {
									installReqs(dir);
								});
							});
						});
					});
				});
				else stepper.showFinalStep("error", "NodeJS is not installed!", "AI Toolkit needs NPM to run the UI! Please install NodeJS then try again.");
			});
		});
		else if (targetDirectory) stepper.utils.verifyFilesExist(targetDirectory, [
			"ui",
			"run.py",
			"toolkit"
		]).then((filesExist) => {
			if (filesExist) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "AI Toolkit located successfully!", "Pre-installed AI Toolkit detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.showFinalStep("error", "Unable to locate AI Toolkit!", "Please ensure you have selected the correct folder containing the AI Toolkit installation.");
		});
	});
}
async function cardInfo$5(api, callback) {
	return CardInfo(AITOOLKIT_URL, void 0, api, callback);
}
const AITOOLKIT_RM = {
	catchAddress: catchAddress$5,
	parseArgsToString: parseArgsToString$5,
	parseStringToArgs: parseStringToArgs$5,
	cardInfo: cardInfo$5,
	manager: {
		startInstall: startInstall$5,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/tools/ComfyUiLoraManager/Arguments.ts
const loraManagerArguments = [{
	category: "Command Line Arguments",
	sections: [{
		section: "Network",
		items: [{
			name: "--host",
			description: "Specify the IP address to listen on (default: 127.0.0.1)",
			type: "Input",
			defaultValue: "127.0.0.1"
		}, {
			name: "--port",
			description: "Set the listen port (default: 8188)",
			type: "Input",
			defaultValue: 8188
		}]
	}]
}];
//#endregion
//#region module/src/containers/tools/ComfyUiLoraManager/RendererMethods.ts
const LORA_MANAGER_URL = "https://github.com/willmiao/ComfyUI-Lora-Manager";
function parseArgsToString$4(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let argResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else {
			const argType = getArgumentType(arg.name, loraManagerArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	const pythonCommand = getPythonCommandByOs().python;
	result += isEmpty(argResult) ? `${pythonCommand} standalone.py` : `${pythonCommand} standalone.py ${argResult}`;
	return result;
}
function parseStringToArgs$4(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		const pythonCommand = getPythonCommandByOs().python;
		if (!line.startsWith(`${pythonCommand} standalone.py`)) return;
		const clArgs = line.split(`${pythonCommand} standalone.py `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, loraManagerArguments)) {
				if (getArgumentType(value.name, loraManagerArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
function startInstall$4(stepper) {
	const installReqs = (dir) => {
		stepper.executeTerminalCommands("pip install -r requirements.txt", dir).then(() => {
			stepper.setInstalled(dir);
			stepper.showFinalStep("success", "ComfyUI LoRA Manager installation complete!", "All installation steps completed successfully. Your LoRA Manager is now ready for use.");
		});
	};
	stepper.initialSteps([
		"ComfyUI LoRA Manager",
		"Clone",
		"Install Dependencies",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(LORA_MANAGER_URL).then((dir) => {
				stepper.nextStep().then(() => {
					installReqs(dir);
				});
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, LORA_MANAGER_URL).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "ComfyUI LoRA Manager located successfully!", "Pre-installed LoRA Manager detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.utils.verifyFilesExist(targetDirectory, ["standalone.py", "requirements.txt"]).then((filesExist) => {
				if (filesExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", `ComfyUI LoRA Manager located successfully!`, "Detected a manual installation of ComfyUI LoRA Manager. Note: Because this is not a Git repository, automatic updates and certain version-dependent features may not work as expected.");
				} else stepper.showFinalStep("error", "Unable to locate ComfyUI LoRA Manager!", "Please ensure you have selected the correct folder containing the LoRA Manager installation.");
			});
		});
	});
}
async function cardInfo$4(api, callback) {
	return CardInfo(LORA_MANAGER_URL, "", api, callback);
}
const LORA_MANAGER_RM = {
	catchAddress: catchAddress$5,
	parseArgsToString: parseArgsToString$4,
	parseStringToArgs: parseStringToArgs$4,
	cardInfo: cardInfo$4,
	manager: {
		startInstall: startInstall$4,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/tools/KohyasGui/Arguments.ts
const bmaltaisArguments = [{
	category: "Command Line Arguments",
	items: [
		{
			name: "--config",
			description: "Path to the toml config file for interface defaults",
			type: "File",
			defaultValue: "./config.toml"
		},
		{
			name: "--debug",
			description: "Enable debug mode.",
			type: "CheckBox"
		},
		{
			name: "--listen",
			description: "Specify the IP address to listen on for connections to Gradio.",
			type: "Input",
			defaultValue: "127.0.0.1"
		},
		{
			name: "--username",
			description: "Set a username for authentication.",
			type: "Input",
			defaultValue: ""
		},
		{
			name: "--password",
			description: "Set a password for authentication.",
			type: "Input",
			defaultValue: ""
		},
		{
			name: "--server_port",
			description: "Define the port to run the server listener on.",
			type: "Input",
			defaultValue: "0"
		},
		{
			name: "--inbrowser",
			description: "Open the Gradio UI in a web browser.",
			type: "CheckBox"
		},
		{
			name: "--share",
			description: "Share the Gradio UI.",
			type: "CheckBox"
		},
		{
			name: "--headless",
			description: "Indicates whether the server is headless.",
			type: "CheckBox"
		},
		{
			name: "--language",
			description: "Set custom language",
			type: "Input"
		},
		{
			name: "--use-ipex",
			description: "Use IPEX environment.",
			type: "CheckBox"
		},
		{
			name: "--use-rocm",
			description: "Use ROCm environment.",
			type: "CheckBox"
		},
		{
			name: "--do_not_use_shell",
			description: "Enforce not to use shell=True when running external commands.",
			type: "CheckBox"
		},
		{
			name: "--do_not_share",
			description: "Do not share the Gradio UI.",
			type: "CheckBox"
		},
		{
			name: "--root_path",
			description: "`root_path` for Gradio to enable reverse proxy support. e.g. /kohya_ss",
			type: "Input"
		},
		{
			name: "--requirements",
			description: "Requirements file to use for validation.",
			type: "File"
		},
		{
			name: "--noverify",
			description: "Disable requirements verification.",
			type: "CheckBox"
		}
	]
}, {
	category: "Environment Variables",
	items: [
		{
			name: "TF_ENABLE_ONEDNN_OPTS",
			description: "Enable or disable TensorFlow C++ oneDNN optimizations (default: 0).",
			type: "Input",
			defaultValue: "0"
		},
		{
			name: "TF_CPP_MIN_LOG_LEVEL",
			description: "Set TensorFlow C++ logging level (0=all, 1=no INFO, 2=no WARNING, 3=no ERROR).",
			type: "Input",
			defaultValue: "2"
		},
		{
			name: "TENSORBOARD_PORT",
			description: "Specify custom port for TensorBoard server instance.",
			type: "Input"
		},
		{
			name: "TENSORBOARD_HOST",
			description: "Specify custom host IP address for TensorBoard.",
			type: "Input"
		},
		{
			name: "HF_HOME",
			description: "Custom cache and home directory for HuggingFace assets and models.",
			type: "Directory"
		},
		{
			name: "LOG_LEVEL",
			description: "Logging level for setup and environment validation (e.g. INFO, DEBUG, WARNING).",
			type: "Input"
		}
	]
}];
//#endregion
//#region module/src/containers/tools/KohyasGui/RendererMethods.ts
const shellCommand = isWin ? "call gui.bat" : "bash ./gui.sh";
const URL = "https://github.com/bmaltais/kohya_ss";
function parseArgsToString$3(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let argResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) argResult += result.commandArg + " ";
		} else {
			const argType = getArgumentType(arg.name, bmaltaisArguments);
			if (argType === "CheckBox") argResult += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") argResult += `${arg.name} "${arg.value}" `;
			else argResult += `${arg.name} ${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	result += isEmpty(argResult) ? shellCommand : `${shellCommand} ${argResult}`;
	return result;
}
function parseStringToArgs$3(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		if (!line.startsWith(shellCommand)) return;
		const clArgs = line.split(`${shellCommand} `)[1];
		if (!clArgs) return;
		clArgs.split("--").filter(Boolean).map((arg) => {
			const [id, ...value] = arg.trim().split(" ");
			return {
				name: `--${id}`,
				value: value.join(" ").replace(/"/g, "")
			};
		}).forEach((value) => {
			if (isValidArg(value.name, bmaltaisArguments)) {
				if (getArgumentType(value.name, bmaltaisArguments) === "CheckBox") argResult.push({
					name: value.name,
					value: ""
				});
				else argResult.push({
					name: value.name,
					value: value.value
				});
			}
		});
	});
	return argResult;
}
function startInstall$3(stepper) {
	GitInstaller("Kohya's GUI", URL, stepper, [isWin ? "gui.bat" : "gui.sh"]);
}
async function cardInfo$3(api, callback) {
	return CardInfo(URL, void 0, api, callback);
}
const KOHYA_GUI_RM = {
	catchAddress: catchAddress$5,
	parseArgsToString: parseArgsToString$3,
	parseStringToArgs: parseStringToArgs$3,
	cardInfo: cardInfo$3,
	manager: {
		startInstall: startInstall$3,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/tools/LlamaFactory/Arguments.ts
const llamaFactoryArguments = [{
	category: "Command Line Arguments",
	sections: [{
		section: "Server Configuration",
		items: [
			{
				name: "--host",
				description: "The host address to bind the web server to (e.g., 127.0.0.1 or 0.0.0.0).",
				defaultValue: "127.0.0.1",
				type: "Input"
			},
			{
				name: "--port",
				description: "The port for the LLaMA Board web UI (default 7860).",
				defaultValue: 7860,
				type: "Number"
			},
			{
				name: "--share",
				description: "Share the Gradio interface publicly via shareable URL.",
				defaultValue: false,
				type: "CheckBox"
			},
			{
				name: "--lang",
				description: "Language for the web interface (en, zh, ru, ko, or ja).",
				defaultValue: "en",
				type: "DropDown",
				values: [
					"en",
					"zh",
					"ru",
					"ko",
					"ja"
				]
			}
		]
	}]
}, {
	category: "Environment Variables",
	sections: [
		{
			section: "Hub & Hardware Options",
			items: [
				{
					name: "USE_MODELSCOPE_HUB",
					description: "Set to 1 to download models and datasets from ModelScope Hub instead of Hugging Face.",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "USE_OPENMIND_HUB",
					description: "Set to 1 to download models and datasets from Modelers Hub (OpenMind).",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "CUDA_VISIBLE_DEVICES",
					description: "Specify GPU device indices to utilize for training/inference (e.g., 0 or 0,1).",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "DISABLE_VERSION_CHECK",
					description: "Set to 1 to bypass library and dependency version checks.",
					defaultValue: "",
					type: "Input"
				}
			]
		},
		{
			section: "Web UI & Server Options",
			items: [
				{
					name: "GRADIO_SERVER_NAME",
					description: "Set the host address for the Gradio web UI server (e.g., 127.0.0.1 or 0.0.0.0).",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "GRADIO_SHARE",
					description: "Set to 1 to share the Gradio interface publicly via a shareable URL.",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "GRADIO_IPV6",
					description: "Set to 1 to enable IPv6 network support for the Gradio server.",
					defaultValue: "",
					type: "Input"
				}
			]
		},
		{
			section: "Backend & Training Acceleration",
			items: [
				{
					name: "USE_RAY",
					description: "Set to 1 to enable Ray distributed framework backend for training.",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "USE_KT",
					description: "Set to 1 to enable KTransformers SFT backend engine.",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "USE_MCA",
					description: "Set to 1 to enable Megatron-core training backend with mcore_adapter.",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "FORCE_TORCHRUN",
					description: "Set to 1 to force using torchrun for multi-GPU distributed training.",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "OPTIM_TORCH",
					description: "Set to 1 to optimize PyTorch CUDA memory allocator (expandable_segments:True).",
					defaultValue: "",
					type: "Input"
				}
			]
		},
		{
			section: "Multimodal Placeholders",
			items: [
				{
					name: "IMAGE_PLACEHOLDER",
					description: "Specify a custom placeholder token for image inputs in multimodal prompts.",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "AUDIO_PLACEHOLDER",
					description: "Specify a custom placeholder token for audio inputs in multimodal prompts.",
					defaultValue: "",
					type: "Input"
				},
				{
					name: "VIDEO_PLACEHOLDER",
					description: "Specify a custom placeholder token for video inputs in multimodal prompts.",
					defaultValue: "",
					type: "Input"
				}
			]
		}
	]
}];
//#endregion
//#region module/src/containers/tools/LlamaFactory/RendererMethods.ts
const LLAMA_FACTORY_URL = "https://github.com/hiyouga/LlamaFactory";
function getCategoryType$1(name) {
	if (name.startsWith("-")) return "cl";
	return "env";
}
function parseArgsToString$2(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let clResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const customRes = parseCustomArg(arg);
			if (!customRes) return;
			if (customRes.line) lines += customRes.line + "\n";
			if (customRes.commandArg) clResult += customRes.commandArg + " ";
		} else {
			const cat = getCategoryType$1(arg.name);
			if (cat === "env") {
				if (arg.value !== void 0 && arg.value !== null && arg.value !== "") {
					if (isWin) lines += `set ${arg.name}=${arg.value}\n`;
					else lines += `export ${arg.name}="${arg.value}"\n`;
				}
			} else if (cat === "cl") {
				const argType = getArgumentType(arg.name, llamaFactoryArguments);
				if (argType === "CheckBox") {
					if (String(arg.value) === "true" || arg.value === "") clResult += `${arg.name} `;
				} else if (arg.value !== void 0 && arg.value !== null && arg.value !== "") {
					if (argType === "File" || argType === "Directory") clResult += `${arg.name} "${arg.value}" `;
					else clResult += `${arg.name} ${arg.value} `;
				}
			}
		}
	});
	if (!isEmpty(lines)) result += lines + "\n";
	result += isEmpty(clResult) ? "llamafactory-cli webui\n" : `llamafactory-cli webui ${clResult.trim()}\n`;
	return result;
}
function parseStringToArgs$2(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		line = line.trim();
		if (line.startsWith("#") || line.startsWith("@echo") || line.startsWith("REM")) return;
		if (line.startsWith("set ")) {
			const [name, ...valueParts] = line.substring(4).split("=");
			const varName = name ? name.trim() : "";
			let value = valueParts.join("=").trim();
			if (value.startsWith("\"") && value.endsWith("\"")) value = value.slice(1, -1);
			if (varName && value) {
				if (isValidArg(varName, llamaFactoryArguments)) argResult.push({
					name: varName,
					value
				});
			}
		} else if (line.startsWith("export ")) {
			const [name, ...valueParts] = line.substring(7).split("=");
			const varName = name ? name.trim() : "";
			let value = valueParts.join("=").trim();
			if (value.startsWith("\"") && value.endsWith("\"")) value = value.slice(1, -1);
			if (varName && value) {
				if (isValidArg(varName, llamaFactoryArguments)) argResult.push({
					name: varName,
					value
				});
			}
		} else if (line.startsWith("llamafactory-cli webui") || line.startsWith("python src/webui.py")) {
			const startCmd = line.startsWith("llamafactory-cli webui") ? "llamafactory-cli webui" : "python src/webui.py";
			const clArgs = line.substring(startCmd.length).trim();
			if (!clArgs) return;
			clArgs.split("--").filter(Boolean).forEach((arg) => {
				const [id, ...valueParts] = arg.trim().split(" ");
				const name = `--${id}`;
				const value = valueParts.join(" ").replace(/"/g, "").trim();
				if (isValidArg(name, llamaFactoryArguments)) {
					if (getArgumentType(name, llamaFactoryArguments) === "CheckBox") argResult.push({
						name,
						value: ""
					});
					else argResult.push({
						name,
						value
					});
				}
			});
		}
	});
	return argResult;
}
function startInstall$2(stepper) {
	const pipCommand = getPythonCommandByOs().pip;
	const installReqs = (dir) => {
		stepper.executeTerminalCommands(`${pipCommand} install -e .[metrics]`, dir).then(() => {
			stepper.nextStep().then(() => {
				stepper.setInstalled(dir);
				stepper.showFinalStep("success", "LLaMA Factory installation complete!", "All installation steps completed successfully. Your LLaMA Factory environment is ready for use.");
			});
		});
	};
	stepper.initialSteps([
		"LLaMA Factory",
		"Clone",
		"Install Dependencies",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(LLAMA_FACTORY_URL).then((dir) => {
				stepper.nextStep().then(() => {
					installReqs(dir);
				});
			});
		});
		else if (targetDirectory) stepper.utils.verifyFilesExist(targetDirectory, ["pyproject.toml", "src/llamafactory/cli.py"]).then((filesExist) => {
			if (filesExist) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "LLaMA Factory located successfully!", "Pre-installed LLaMA Factory detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.showFinalStep("error", "Unable to locate LLaMA Factory!", "Please ensure you have selected the correct folder containing the LLaMA Factory repository.");
		});
	});
}
async function cardInfo$2(api, callback) {
	return CardInfo(LLAMA_FACTORY_URL, void 0, api, callback);
}
const LLAMA_FACTORY_RM = {
	catchAddress: catchAddress$5,
	parseArgsToString: parseArgsToString$2,
	parseStringToArgs: parseStringToArgs$2,
	cardInfo: cardInfo$2,
	manager: {
		startInstall: startInstall$2,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/tools/SmartGallery/Arguments.ts
const smartGalleryArguments = [{
	category: "Environment Variables",
	sections: [
		{
			section: "Paths",
			items: [
				{
					name: "BASE_OUTPUT_PATH",
					type: "Directory",
					description: "Path to ComfyUI output folder (e.g., C:/ComfyUI/output)"
				},
				{
					name: "BASE_INPUT_PATH",
					type: "Directory",
					description: "Path to ComfyUI input folder (e.g., C:/ComfyUI/input)"
				},
				{
					name: "BASE_SMARTGALLERY_PATH",
					type: "Directory",
					description: "Path to SmartGallery data folder (defaults to output path if not set)"
				},
				{
					name: "BASE_MODELS_PATH",
					type: "Directory",
					description: "Path to ComfyUI models folder (for Docker, Stability Matrix, or custom setups)"
				},
				{
					name: "LORAS_PATH",
					type: "Directory",
					description: "Path to LoRAs folder (defaults to BASE_MODELS_PATH/loras)"
				},
				{
					name: "CHECKPOINTS_PATH",
					type: "Directory",
					description: "Path to Checkpoints folder (defaults to BASE_MODELS_PATH/checkpoints)"
				},
				{
					name: "UNET_PATH",
					type: "Directory",
					description: "Path to UNet folder (defaults to BASE_MODELS_PATH/unet)"
				},
				{
					name: "DELETE_TO",
					type: "Directory",
					description: "Optional trash directory. Deleted files will be moved here instead of permanent deletion."
				}
			]
		},
		{
			section: "Performance & Media",
			items: [
				{
					name: "FFPROBE_MANUAL_PATH",
					type: "File",
					description: "Path to ffprobe executable (e.g., C:/ffmpeg/bin/ffprobe.exe). Required for extracting workflows from video files."
				},
				{
					name: "SERVER_PORT",
					type: "Input",
					description: "Port for SmartGallery server",
					defaultValue: "8189"
				},
				{
					name: "THUMBNAIL_WIDTH",
					type: "Input",
					description: "Width (in pixels) of generated thumbnails (default: 300)",
					defaultValue: "300"
				},
				{
					name: "WEBP_ANIMATED_FPS",
					type: "Input",
					description: "Assumed frame rate for animated WebP files (default: 16.0)",
					defaultValue: "16.0"
				},
				{
					name: "PAGE_SIZE",
					type: "Input",
					description: "Max number of files to load per page in gallery grid (default: 100)",
					defaultValue: "100"
				},
				{
					name: "BATCH_SIZE",
					type: "Input",
					description: "Number of files to process per database sync batch (default: 500)",
					defaultValue: "500"
				},
				{
					name: "STREAM_THRESHOLD_MB",
					type: "Input",
					description: "File size threshold in MB above which videos are transcoded/streamed (default: 20)",
					defaultValue: "20"
				},
				{
					name: "MAX_PARALLEL_WORKERS",
					type: "Input",
					description: "Max CPU worker threads for indexing/thumbnails (leave empty to use all CPU cores)"
				},
				{
					name: "GENERATE_WAVEFORMS",
					type: "CheckBox",
					description: "Automatically generate dynamic audio waveforms for audio files during indexing"
				}
			]
		},
		{
			section: "Security & Integration",
			items: [
				{
					name: "ADMIN_PASSWORD",
					type: "Input",
					description: "Admin password for securing gallery interface or Exhibition portal"
				},
				{
					name: "SECRET_KEY",
					type: "Input",
					description: "Flask secret key for session security (generated randomly if unset)"
				},
				{
					name: "COMFYUI_SERVER_URL",
					type: "Input",
					description: "ComfyUI server URL for queuing generations directly from Nodepad",
					defaultValue: "http://127.0.0.1:8188"
				},
				{
					name: "ENABLE_AI_SEARCH",
					type: "CheckBox",
					description: "Enable experimental AI Search features (requires separate AI service)"
				}
			]
		}
	]
}, {
	category: "Command Line Arguments",
	sections: [{
		section: "Server & Authentication",
		items: [
			{
				name: "--exhibition",
				type: "CheckBox",
				description: "Start in Exhibition Mode (client-facing review portal with hidden workflows)"
			},
			{
				name: "--force-login",
				type: "CheckBox",
				description: "Force login requirement on the main gallery workspace interface"
			},
			{
				name: "--enable-guest-login",
				type: "CheckBox",
				description: "Allow anonymous guest access in Exhibition mode"
			},
			{
				name: "--blind-rating",
				type: "CheckBox",
				description: "Hide global average ratings in Exhibition mode to prevent reviewer bias"
			},
			{
				name: "--admin-pass",
				type: "Input",
				description: "Set or reset the Admin password directly via command-line option"
			},
			{
				name: "--port",
				type: "Input",
				description: "Override server port via command-line option (e.g. 8189)"
			}
		]
	}]
}];
//#endregion
//#region module/src/containers/tools/SmartGallery/RendererMethods.ts
const SMARTGALLERY_URL = "https://github.com/biagiomaf/smart-comfyui-gallery";
function isEnvironmentVariable(name) {
	for (const arg of smartGalleryArguments) if (arg.category === "Environment Variables") {
		if ("sections" in arg) {
			for (const section of arg.sections) if (section.items.some((item) => item.name === name)) return true;
		} else if ("items" in arg) return arg.items.some((item) => item.name === name);
	}
	return false;
}
function parseArgsToString$1(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let commandArgs = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const result = parseCustomArg(arg);
			if (!result) return;
			if (result.line) lines += result.line + "\n";
			if (result.commandArg) commandArgs += result.commandArg + " ";
		} else if (isEnvironmentVariable(arg.name)) {
			if (getArgumentType(arg.name, smartGalleryArguments) === "CheckBox") lines += isWin ? `set ${arg.name}=true\n` : `export ${arg.name}="true"\n`;
			else if (arg.value !== void 0 && arg.value !== "") {
				if (isWin) lines += `set ${arg.name}=${arg.value}\n`;
				else lines += `export ${arg.name}="${arg.value}"\n`;
			}
		} else {
			const argType = getArgumentType(arg.name, smartGalleryArguments);
			if (argType === "CheckBox") commandArgs += `${arg.name} `;
			else if (argType === "File" || argType === "Directory") {
				if (arg.value) commandArgs += `${arg.name} "${arg.value}" `;
			} else if (arg.value !== void 0 && arg.value !== "") commandArgs += `${arg.name} ${arg.value} `;
		}
	});
	if (lines) result += lines + "\n";
	const pythonCmd = getPythonCommandByOs().python;
	result += `${pythonCmd} smartgallery.py ${commandArgs.trim()}`.trim();
	return result;
}
function parseStringToArgs$1(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		line = line.trim();
		if (line.startsWith("set ")) {
			const [name, ...valueParts] = line.substring(4).split("=");
			const value = valueParts.join("=").trim();
			if (name && value && isValidArg(name.trim(), smartGalleryArguments)) argResult.push({
				name: name.trim(),
				value
			});
		}
		if (line.startsWith("export ")) {
			const [name, ...valueParts] = line.substring(7).split("=");
			let value = valueParts.join("=").trim();
			if (value.startsWith("\"") && value.endsWith("\"")) value = value.slice(1, -1);
			if (name && value && isValidArg(name.trim(), smartGalleryArguments)) argResult.push({
				name: name.trim(),
				value
			});
		}
		if (line.includes("smartgallery.py")) {
			const clArgs = line.split("smartgallery.py")[1]?.trim();
			if (clArgs) clArgs.split("--").filter(Boolean).forEach((rawArg) => {
				const [id, ...valParts] = rawArg.trim().split(" ");
				const argName = `--${id}`;
				if (isValidArg(argName, smartGalleryArguments)) {
					if (getArgumentType(argName, smartGalleryArguments) === "CheckBox") argResult.push({
						name: argName,
						value: ""
					});
					else {
						const val = valParts.join(" ").replace(/"/g, "").trim();
						argResult.push({
							name: argName,
							value: val
						});
					}
				}
			});
		}
	});
	return argResult;
}
function startInstall$1(stepper) {
	const pipCommand = getPythonCommandByOs().pip;
	stepper.initialSteps([
		"SmartGallery",
		"Clone",
		"Dependencies",
		"Finish"
	]);
	stepper.starterStep().then(({ targetDirectory, chosen }) => {
		if (chosen === "install") stepper.nextStep().then(() => {
			stepper.cloneRepository(SMARTGALLERY_URL).then((dir) => {
				stepper.nextStep().then(() => {
					stepper.executeTerminalCommands(`${pipCommand} install -r requirements.txt`, dir).then(() => {
						stepper.setInstalled(dir);
						stepper.showFinalStep("success", "SmartGallery installation complete!", "SmartGallery is ready to use. Configure your paths in the launch arguments and start the gallery.");
					}).catch(() => {
						stepper.showFinalStep("error", "Installation failed", "Failed to install dependencies.");
					});
				});
			});
		});
		else if (targetDirectory) stepper.utils.validateGitRepository(targetDirectory, SMARTGALLERY_URL).then((isValid) => {
			if (isValid) {
				stepper.setInstalled(targetDirectory);
				stepper.showFinalStep("success", "ComfyUI LoRA Manager located successfully!", "Pre-installed LoRA Manager detected. Installation skipped as your existing setup is ready to use.");
			} else stepper.utils.verifyFilesExist(targetDirectory, ["smartgallery.py", "requirements.txt"]).then((filesExist) => {
				if (filesExist) {
					stepper.setInstalled(targetDirectory);
					stepper.showFinalStep("success", `SmartGallery located successfully!`, "Detected a manual installation of SmartGallery. Note: Because this is not a Git repository, automatic updates and certain version-dependent features may not work as expected.");
				} else stepper.showFinalStep("error", "Unable to locate SmartGallery!", "Please ensure you have selected the correct folder containing the SmartGallery installation.");
			});
		});
	});
}
async function cardInfo$1(api, callback) {
	return CardInfo(SMARTGALLERY_URL, void 0, api, callback);
}
const SMARTGALLERY_RM = {
	catchAddress: catchAddress$5,
	parseArgsToString: parseArgsToString$1,
	parseStringToArgs: parseStringToArgs$1,
	cardInfo: cardInfo$1,
	manager: {
		startInstall: startInstall$1,
		updater: { updateType: "git" }
	}
};
//#endregion
//#region module/src/containers/tools/UnslothStudio/Arguments.ts
const unslothStudioArguments = [{
	category: "Command Line Arguments",
	sections: [{
		section: "Server Configuration",
		items: [
			{
				name: "--host",
				description: "The host address to bind the server to (use 0.0.0.0 for external access).",
				defaultValue: "127.0.0.1",
				type: "Input"
			},
			{
				name: "--port",
				description: "The port the server will listen on.",
				defaultValue: 8888,
				type: "Number"
			},
			{
				name: "--parallel",
				description: "llama-server parallel decode slots (1..64). Default is 1.",
				defaultValue: 1,
				type: "Number"
			},
			{
				name: "--api-only",
				description: "Run API server only, no frontend serving.",
				defaultValue: false,
				type: "CheckBox"
			},
			{
				name: "--silent",
				description: "Run the server silently without verbose output.",
				defaultValue: false,
				type: "CheckBox"
			},
			{
				name: "--verbose",
				description: "Log every API request, including the high-frequency polling.",
				defaultValue: false,
				type: "CheckBox"
			}
		]
	}, {
		section: "Security & Access",
		items: [
			{
				name: "--secure",
				description: "Expose ONLY a secure Cloudflare HTTPS link. Binds localhost and fails closed if the tunnel cannot start.",
				defaultValue: false,
				type: "CheckBox"
			},
			{
				name: "--cloudflare",
				description: "Expose Unsloth on a public Cloudflare HTTPS tunnel for non-api-only wildcard binds.",
				defaultValue: false,
				type: "CheckBox"
			},
			{
				name: "--enable-tools",
				description: "Force server-side tools (web search, code execution) on.",
				defaultValue: false,
				type: "CheckBox"
			},
			{
				name: "--disable-tools",
				description: "Force server-side tools (web search, code execution) off.",
				defaultValue: false,
				type: "CheckBox"
			},
			{
				name: "--password",
				description: "Set the INITIAL admin password non-interactively (only sets password on first run).",
				defaultValue: "",
				type: "Input"
			}
		]
	}]
}, {
	category: "Environment Variables",
	sections: [{
		section: "Performance & Optimization",
		items: [
			{
				name: "UNSLOTH_USE_TRITON",
				description: "Explicitly enable Triton-based kernel optimizations (1 to enable).",
				defaultValue: "",
				type: "Input"
			},
			{
				name: "UNSLOTH_CPU_THREADS",
				description: "Cap Unsloth's native CPU thread pools on high-core hosts.",
				defaultValue: "",
				type: "Input"
			},
			{
				name: "UNSLOTH_LLAMA_CPP_BACKEND",
				description: "Force CPU fallback or specify backend for llama.cpp prebuilt (e.g. cpu).",
				defaultValue: "",
				type: "Input"
			}
		]
	}, {
		section: "Security & Auth",
		items: [
			{
				name: "UNSLOTH_STUDIO_PASSWORD",
				description: "Set the initial admin password non-interactively via environment variable.",
				defaultValue: "",
				type: "Input"
			},
			{
				name: "UNSLOTH_STUDIO_BOOTSTRAP_TIMEOUT",
				description: "Set the bootstrap password timeout in seconds (default 3600). Use 0 or negative to disable.",
				defaultValue: "",
				type: "Input"
			},
			{
				name: "UNSLOTH_STUDIO_ENABLE_MCP",
				description: "Enable the Model Context Protocol (MCP) control endpoint (1 to enable).",
				defaultValue: "",
				type: "Input"
			},
			{
				name: "UNSLOTH_STUDIO_MCP_TOKEN",
				description: "Token/secret required to authenticate with the MCP control endpoint.",
				defaultValue: "",
				type: "Input"
			},
			{
				name: "UNSLOTH_DISABLE_TOOL_CALL_HEALING",
				description: "Disable self-healing tool calling mechanism in inference (1 to disable).",
				defaultValue: "",
				type: "Input"
			}
		]
	}]
}];
//#endregion
//#region module/src/containers/tools/UnslothStudio/RendererMethods.ts
const INSTALL_TIME_KEY = "install-time-unsloth-studio";
const UPDATE_TIME_KEY = "update-time-unsloth-studio";
const TAG_KEY = "installed-tag-unsloth-studio";
const INSTALL_COMMAND = isWin ? "irm https://unsloth.ai/install.ps1 | iex" : "curl -fsSL https://unsloth.ai/install.sh | sh";
async function fetchLatestUnslothTag() {
	try {
		const response = await fetch("https://api.github.com/repos/unslothai/unsloth/releases");
		if (response.ok) {
			const data = await response.json();
			if (Array.isArray(data) && data.length > 0 && data[0].tag_name) return data[0].tag_name;
		}
	} catch (e) {
		console.error("Failed to fetch Unsloth releases:", e);
	}
	try {
		const response = await fetch("https://api.github.com/repos/unslothai/unsloth/tags");
		if (response.ok) {
			const data = await response.json();
			if (Array.isArray(data) && data.length > 0) return data[0].name;
		}
	} catch (e) {
		console.error("Failed to fetch Unsloth tags:", e);
	}
}
function getCategoryType(name) {
	if (name.startsWith("-")) return "cl";
	return "env";
}
function parseArgsToString(args) {
	let result = isWin ? "@echo off\n\n" : "#!/bin/bash\n\n";
	let lines = "";
	let clResult = "";
	args.forEach((arg) => {
		if (arg.custom) {
			const customRes = parseCustomArg(arg);
			if (!customRes) return;
			if (customRes.line) lines += customRes.line + "\n";
			if (customRes.commandArg) clResult += customRes.commandArg + " ";
		} else {
			const cat = getCategoryType(arg.name);
			if (cat === "env") {
				if (arg.value !== void 0 && arg.value !== null && arg.value !== "") {
					if (isWin) lines += `set ${arg.name}=${arg.value}\n`;
					else lines += `export ${arg.name}="${arg.value}"\n`;
				}
			} else if (cat === "cl") {
				const argType = getArgumentType(arg.name, unslothStudioArguments);
				if (argType === "CheckBox") {
					if (String(arg.value) === "true" || arg.value === "") clResult += `${arg.name} `;
				} else if (arg.value !== void 0 && arg.value !== null && arg.value !== "") {
					if (argType === "File" || argType === "Directory") clResult += `${arg.name} "${arg.value}" `;
					else clResult += `${arg.name} ${arg.value} `;
				}
			}
		}
	});
	if (!isEmpty(lines)) result += lines + "\n";
	result += isEmpty(clResult) ? "unsloth studio\n" : `unsloth studio ${clResult.trim()}\n`;
	return result;
}
function parseStringToArgs(args) {
	const argResult = [];
	args.split("\n").forEach((line) => {
		line = line.trim();
		if (line.startsWith("#") || line.startsWith("@echo") || line.startsWith("REM")) return;
		if (line.startsWith("set ")) {
			const [name, ...valueParts] = line.substring(4).split("=");
			const varName = name ? name.trim() : "";
			let value = valueParts.join("=").trim();
			if (value.startsWith("\"") && value.endsWith("\"")) value = value.slice(1, -1);
			if (varName && value) {
				if (isValidArg(varName, unslothStudioArguments)) argResult.push({
					name: varName,
					value
				});
			}
		} else if (line.startsWith("export ")) {
			const [name, ...valueParts] = line.substring(7).split("=");
			const varName = name ? name.trim() : "";
			let value = valueParts.join("=").trim();
			if (value.startsWith("\"") && value.endsWith("\"")) value = value.slice(1, -1);
			if (varName && value) {
				if (isValidArg(varName, unslothStudioArguments)) argResult.push({
					name: varName,
					value
				});
			}
		} else if (line.startsWith("unsloth studio")) {
			const clArgs = line.substring(14).trim();
			if (!clArgs) return;
			clArgs.split("--").filter(Boolean).forEach((arg) => {
				const [id, ...valueParts] = arg.trim().split(" ");
				const name = `--${id}`;
				const value = valueParts.join(" ").replace(/"/g, "").trim();
				if (isValidArg(name, unslothStudioArguments)) {
					if (getArgumentType(name, unslothStudioArguments) === "CheckBox") argResult.push({
						name,
						value: ""
					});
					else argResult.push({
						name,
						value
					});
				}
			});
		}
	});
	return argResult;
}
function startInstall(stepper) {
	stepper.initialSteps([
		"Unsloth Studio",
		"Detect Existing",
		"Install Dependencies",
		"Finish"
	]);
	stepper.starterStep({ disableSelectDir: true }).then(() => {
		stepper.nextStep().then(() => {
			stepper.progressBar(true, "Checking for existing Unsloth installation...");
			stepper.ipc.invoke("is_unsloth_installed").then(async (isUnslothInstalled) => {
				if (isUnslothInstalled) {
					stepper.setInstalled();
					const currentDate = /* @__PURE__ */ new Date();
					stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
					const latestTag = await fetchLatestUnslothTag();
					if (latestTag) stepper.storage.set(TAG_KEY, latestTag);
					stepper.showFinalStep("success", "Unsloth Studio Located!", "Pre-installed Unsloth Studio detected. Installation skipped as your existing setup is ready to use.");
				} else stepper.nextStep().then(() => {
					stepper.executeTerminalCommands(INSTALL_COMMAND).then(async () => {
						stepper.setInstalled();
						const currentDate = /* @__PURE__ */ new Date();
						stepper.storage.set(INSTALL_TIME_KEY, currentDate.toLocaleString());
						const latestTag = await fetchLatestUnslothTag();
						if (latestTag) stepper.storage.set(TAG_KEY, latestTag);
						stepper.showFinalStep("success", "Unsloth Studio installation complete!", "All installation steps completed successfully. Your Unsloth Studio environment is ready for use.");
					}).catch(() => {
						stepper.showFinalStep("error", "Installation failed", "Failed to install Unsloth Studio. Please check the terminal logs and try again.");
					});
				});
			});
		});
	});
}
function startUpdate(stepper) {
	stepper.initialSteps(["Update Unsloth Studio", "Finish"]);
	stepper.executeTerminalCommands(INSTALL_COMMAND).then(async () => {
		const currentDate = /* @__PURE__ */ new Date();
		stepper.storage.set(UPDATE_TIME_KEY, currentDate.toLocaleString());
		const latestTag = await fetchLatestUnslothTag();
		if (latestTag) stepper.storage.set(TAG_KEY, latestTag);
		stepper.setUpdated();
		stepper.showFinalStep("success", "Unsloth Studio Updated Successfully!", "Unsloth Studio has been re-installed and updated to the latest version.");
	}).catch(() => {
		stepper.showFinalStep("error", "Update Failed", "Failed to update Unsloth Studio. Please check the terminal logs and try again.");
	});
}
async function cardInfo(api, callback) {
	callback.setOpenFolders(void 0);
	const descManager = new DescriptionManager([{
		title: "Installation Data",
		items: [
			{
				label: "Install Date",
				result: "loading"
			},
			{
				label: "Update Date",
				result: "loading"
			},
			{
				label: "Installed Tag",
				result: "loading"
			},
			{
				label: "Latest Tag",
				result: "loading"
			}
		]
	}], callback);
	api.storage.get(INSTALL_TIME_KEY).then((result) => {
		descManager.updateItem(0, 0, result || "N/A");
	});
	api.storage.get(UPDATE_TIME_KEY).then((result) => {
		descManager.updateItem(0, 1, result || "N/A");
	});
	api.storage.get(TAG_KEY).then((result) => {
		descManager.updateItem(0, 2, result || "Unknown");
	});
	fetchLatestUnslothTag().then((latestTag) => {
		descManager.updateItem(0, 3, latestTag || "Unknown");
	});
}
function catchAddress(input) {
	for (const pattern of [
		/https?:\/\/localhost(?::\d+)?/i,
		/https?:\/\/127\.0\.0\.1(?::\d+)?/i,
		/https?:\/\/0\.0\.0\.0(?::\d+)?/i,
		/https?:\/\/\[::1](?::\d+)?/i,
		/https?:\/\/(?:[\w-]+\.)*localhost(?::\d+)?/i,
		/https?:\/\/[a-z0-9-]+\.trycloudflare\.com/i
	]) {
		const match = input.match(pattern);
		if (match) return replaceAddress(match[0]);
	}
	if (input.toLowerCase().includes("running on") || input.toLowerCase().includes("unsloth studio")) return "http://localhost:8888";
}
const UNSLOTH_STUDIO_RM = {
	catchAddress,
	parseArgsToString,
	parseStringToArgs,
	cardInfo,
	manager: {
		startInstall,
		updater: {
			updateType: "stepper",
			startUpdate
		}
	}
};
//#endregion
export { parseStringToArgs$10 as $, TTS_ID as $n, claudeCodeArguments as $t, SILLYTAVERN_RM as A, COMFYUI_ZLUDA_ID as An, parseArgsToString$17 as At, LLAMA_CPP_UPDATE_TIME_KEY as B, LoLLMS_ID as Bn, hermesAgentArguments as Bt, parseArgsToString$5 as C, ANTIGRAVITY_CLI_ID as Cn, parseStringToArgs$15 as Ct, parseArgsToString$6 as D, CLAUDE_CODE_ID as Dn, parseStringToArgs$16 as Dt, TG_RM as E, CHAT_TTS_ID as En, parseArgsToString$16 as Et, parseArgsToString$8 as F, KOHYA_ID as Fn, parseStringToArgs$18 as Ft, findCudartAssetUrlForPlatform as G, SD_FORGE_AMD_ID as Gn, openArguments as Gt, detectDefaultPlatformKey as H, ONETRAINER_ID as Hn, parseArgsToFiles$2 as Ht, parseStringToArgs$8 as I, LANGFLOW_ID as In, langflowArguments as It, parseArgsToString$9 as J, SD_UIUX_ID as Jn, parseStringToArgs$21 as Jt, getLatestLlamaCppTag as K, SD_FORGE_ID as Kn, Flow_RM as Kt, LLAMA_CPP_INSTALL_DIR_KEY as L, LLAMA_CPP_ID as Ln, HermesAgent_RM as Lt, parseFilesToArgs as M, GeminiCli_ID as Mn, n8nArguments as Mt, sillyArguments as N, HERMES_AGENT_ID as Nn, Langflow_RM as Nt, parseStringToArgs$6 as O, COMFYUI_ID as On, gitmyloArguments as Ot, OPEN_WEBUI_RM as P, INVOKE_ID as Pn, parseArgsToString$18 as Pt, parseArgsToString$10 as Q, TG_ID as Qn, parseFilesToArgs$3 as Qt, LLAMA_CPP_INSTALL_TIME_KEY as R, LLAMA_FACTORY_ID as Rn, parseArgsToFiles$1 as Rt, AITOOLKIT_RM as S, ALLTALK_ID as Sn, parseArgsToString$15 as St, aiToolkitArguments as T, BOLT_DIY_ID as Tn, AG_RM as Tt, fetchLlamaCppReleases as U, OPEN_WEBUI_ID as Un, parseFilesToArgs$2 as Ut, LLAMA_PLATFORM_OPTIONS as V, N8N_ID as Vn, GeminiCli_RM as Vt, findAssetUrlForPlatform as W, SD_AMD_ID as Wn, geminiCliArguments as Wt, mcMonkeyArguments as X, SMARTGALLERY_ID as Xn, ClaudeCode_RM as Xt, parseStringToArgs$9 as Y, SILLYTAVERN_ID as Yn, flowiseArguments as Yt, SD_NEXT_RM as Z, SWARM_ID as Zn, parseArgsToFiles$3 as Zt, bmaltaisArguments as _, parseCustomArg as _n, fetchExtensionList$2 as _t, unslothStudioArguments as a, GitInstaller as an, INVOKE_RM as at, parseStringToArgs$4 as b, AG_ID as bn, automatic1111Arguments as bt, parseStringToArgs$1 as c, isValidArg as cn, INVOKEAI_INSTALL_DIR_KEY as ct, parseArgsToString$2 as d, extractGitUrl as dn, comfyuizludaArguments as dt, AntigravityCli_RM as en, UNSLOTH_STUDIO_ID as er, vladmandicArguments as et, parseStringToArgs$2 as f, getCdCommand as fn, comfyRocmArguments as ft, parseStringToArgs$3 as g, isWin as gn, comfyuiArguments as gt, parseArgsToString$3 as h, isMac as hn, parseStringToArgs$13 as ht, parseStringToArgs as i, CardInfo as in, lshqqytigerArguments as it, parseArgsToFiles as j, FLOWISEAI_ID as jn, parseStringToArgs$17 as jt, oobaboogaArguments as k, COMFYUI_ROCM_ID as kn, N8N_RM as kt, smartGalleryArguments as l, cloneDeep as ln, INVOKEAI_UPDATE_AVAILABLE_KEY as lt, KOHYA_GUI_RM as m, getVenvPythonPath as mn, parseArgsToString$13 as mt, UNSLOTH_STUDIO_RM as n, parseFilesToArgs$4 as nn, parseArgsToString$11 as nt, SMARTGALLERY_RM as o, catchAddress$5 as on, parseArgsToString$12 as ot, llamaFactoryArguments as p, getPythonCommandByOs as pn, COMFYUI_RM as pt, SWARM_RM as q, SD_NEXT_ID as qn, parseArgsToString$21 as qt, parseArgsToString as r, antigravityCliArguments as rn, parseStringToArgs$11 as rt, parseArgsToString$1 as s, getArgumentType as sn, parseStringToArgs$12 as st, TAG_KEY as t, parseArgsToFiles$4 as tn, VOICE_STUDIO_ID as tr, SD_AMD_RM as tt, LLAMA_FACTORY_RM as u, DescriptionManager as un, Invoke_Command_ActivateVenv as ut, LORA_MANAGER_RM as v, removeAnsi as vn, parseArgsToString$14 as vt, parseStringToArgs$5 as w, APPLIO_ID as wn, voiceStudioArguments as wt, loraManagerArguments as x, AITOOLKIT_ID as xn, VOICE_STUDIO_RM as xt, parseArgsToString$4 as y, A1_ID as yn, parseStringToArgs$14 as yt, LLAMA_CPP_PLATFORM_KEY as z, LORA_MANAGER_ID as zn, parseFilesToArgs$1 as zt };
