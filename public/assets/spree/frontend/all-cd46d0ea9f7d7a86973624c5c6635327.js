/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */


!function($){$.extend($.fn,{validate:function(options){if(!this.length){if(options&&options.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")}return}var validator=$.data(this[0],"validator");if(validator){return validator}this.attr("novalidate","novalidate");validator=new $.validator(options,this[0]);$.data(this[0],"validator",validator);if(validator.settings.onsubmit){this.validateDelegate(":submit","click",function(event){if(validator.settings.submitHandler){validator.submitButton=event.target}if($(event.target).hasClass("cancel")){validator.cancelSubmit=true}if($(event.target).attr("formnovalidate")!==undefined){validator.cancelSubmit=true}});this.submit(function(event){if(validator.settings.debug){event.preventDefault()}function handle(){var hidden;if(validator.settings.submitHandler){if(validator.submitButton){hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm)}validator.settings.submitHandler.call(validator,validator.currentForm,event);if(validator.submitButton){hidden.remove()}return false}return true}if(validator.cancelSubmit){validator.cancelSubmit=false;return handle()}if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false}return handle()}else{validator.focusInvalid();return false}})}return validator},valid:function(){if($(this[0]).is("form")){return this.validate().form()}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid=valid&&validator.element(this)});return valid}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value)});return result},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,"validator").settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));delete existingRules.messages;staticRules[element.name]=existingRules;if(argument.messages){settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages)}break;case"remove":if(!argument){delete staticRules[element.name];return existingRules}var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method]});return filtered}}var data=$.validator.normalizeRules($.extend({},$.validator.classRules(element),$.validator.attributeRules(element),$.validator.dataRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data)}return data}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+$(a).val())},filled:function(a){return!!$.trim(""+$(a).val())},unchecked:function(a){return!$(a).prop("checked")}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init()};$.validator.format=function(source,params){if(arguments.length===1){return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args)}}if(arguments.length>2&&params.constructor!==Array){params=$.makeArray(arguments).slice(1)}if(params.constructor!==Array){params=[params]}$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),function(){return n})});return source};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(element,event){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass)}this.addWrapper(this.errorsFor(element)).hide()}},onfocusout:function(element,event){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element)}},onkeyup:function(element,event){if(event.which===9&&this.elementValue(element)===""){return}else if(element.name in this.submitted||element===this.lastElement){this.element(element)}},onclick:function(element,event){if(element.name in this.submitted){this.element(element)}else if(element.parentNode.name in this.submitted){this.element(element.parentNode)}},highlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).addClass(errorClass).removeClass(validClass)}else{$(element).addClass(errorClass).removeClass(validClass)}},unhighlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).removeClass(errorClass).addClass(validClass)}else{$(element).removeClass(errorClass).addClass(validClass)}}},setDefaults:function(settings){$.extend($.validator.defaults,settings)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=this.groups={};$.each(this.settings.groups,function(key,value){if(typeof value==="string"){value=value.split(/\s/)}$.each(value,function(index,name){groups[name]=key})});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value)});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,"");if(validator.settings[eventType]){validator.settings[eventType].call(validator,this[0],event)}}$(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, "+"[type='number'], [type='search'] ,[type='tel'], [type='url'], "+"[type='email'], [type='datetime'], [type='date'], [type='month'], "+"[type='week'], [type='time'], [type='datetime-local'], "+"[type='range'], [type='color'] ","focusin focusout keyup",delegate).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",delegate);if(this.settings.invalidHandler){$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid()){$(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var i=0,elements=this.currentElements=this.elements();elements[i];i++){this.check(elements[i])}return this.valid()},element:function(element){element=this.validationTargetFor(this.clean(element));this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element)!==false;if(result){delete this.invalid[element.name]}else{this.invalid[element.name]=true}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return result},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]})}this.successList=$.grep(this.successList,function(element){return!(element.name in errors)})}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)}else{this.defaultShowErrors()}},resetForm:function(){if($.fn.resetForm){$(this.currentForm).resetForm()}this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(obj){var count=0;for(var i in obj){count++}return count},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name===lastActive.name}).length===1&&lastActive},elements:function(){var validator=this,rulesCache={};return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&validator.settings.debug&&window.console){console.error("%o has no name assigned",this)}if(this.name in rulesCache||!validator.objectLength($(this).rules())){return false}rulesCache[this.name]=true;return true})},clean:function(selector){return $(selector)[0]},errors:function(){var errorClass=this.settings.errorClass.replace(" ",".");return $(this.settings.errorElement+"."+errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element)},elementValue:function(element){var type=$(element).attr("type"),val=$(element).val();if(type==="radio"||type==="checkbox"){return $("input[name='"+$(element).attr("name")+"']:checked").val()}if(typeof val==="string"){return val.replace(/\r/g,"")}return val},check:function(element){element=this.validationTargetFor(this.clean(element));var rules=$(element).rules();var dependencyMismatch=false;var val=this.elementValue(element);var result;for(var method in rules){var rule={method:method,parameters:rules[method]};try{result=$.validator.methods[method].call(this,val,element,rule.parameters);if(result==="dependency-mismatch"){dependencyMismatch=true;continue}dependencyMismatch=false;if(result==="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return}if(!result){this.formatAndAdd(element,rule);return false}}catch(e){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+element.id+", check the '"+rule.method+"' method.",e)}throw e}}if(dependencyMismatch){return}if(this.objectLength(rules)){this.successList.push(element)}return true},customDataMessage:function(element,method){return $(element).data("msg-"+method.toLowerCase())||element.attributes&&$(element).attr("data-msg-"+method.toLowerCase())},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor===String?m:m[method])},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined){return arguments[i]}}return undefined},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customDataMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>")},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message==="function"){message=message.call(this,rule.parameters,element)}else if(theregex.test(message)){message=$.validator.format(message.replace(theregex,"{$1}"),rule.parameters)}this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message},addWrapper:function(toToggle){if(this.settings.wrapper){toToggle=toToggle.add(toToggle.parent(this.settings.wrapper))}return toToggle},defaultShowErrors:function(){var i,elements;for(i=0;this.errorList[i];i++){var error=this.errorList[i];if(this.settings.highlight){this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass)}this.showLabel(error.element,error.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(i=0;this.successList[i];i++){this.showLabel(this.successList[i])}}if(this.settings.unhighlight){for(i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return $(this.errorList).map(function(){return this.element})},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);label.html(message)}else{label=$("<"+this.settings.errorElement+">").attr("for",this.idOrName(element)).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(!this.labelContainer.append(label).length){if(this.settings.errorPlacement){this.settings.errorPlacement(label,$(element))}else{label.insertAfter(element)}}}if(!message&&this.settings.success){label.text("");if(typeof this.settings.success==="string"){label.addClass(this.settings.success)}else{this.settings.success(label,element)}}this.toShow=this.toShow.add(label)},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr("for")===name})},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name)},validationTargetFor:function(element){if(this.checkable(element)){element=this.findByName(element.name).not(this.settings.ignore)[0]}return element},checkable:function(element){return/radio|checkbox/i.test(element.type)},findByName:function(name){return $(this.currentForm).find("[name='"+name+"']")},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case"select":return $("option:selected",element).length;case"input":if(this.checkable(element)){return this.findByName(element.name).filter(":checked").length}}return value.length},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true},dependTypes:{"boolean":function(param,element){return param},string:function(param,element){return!!$(param,element.form).length},"function":function(param,element){return param(element)}},optional:function(element){var val=this.elementValue(element);return!$.validator.methods.required.call(this,val,element)&&"dependency-mismatch"},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[element.name];if(valid&&this.pendingRequest===0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false}else if(!valid&&this.pendingRequest===0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){if(className.constructor===String){this.classRuleSettings[className]=rules}else{$.extend(this.classRuleSettings,className)}},classRules:function(element){var rules={};var classes=$(element).attr("class");if(classes){$.each(classes.split(" "),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this])}})}return rules},attributeRules:function(element){var rules={};var $element=$(element);var type=$element[0].getAttribute("type");for(var method in $.validator.methods){var value;if(method==="required"){value=$element.get(0).getAttribute(method);if(value===""){value=true}value=!!value}else{value=$element.attr(method)}if(/min|max/.test(method)&&(type===null||/number|range|text/.test(type))){value=Number(value)}if(value){rules[method]=value}else if(type===method&&type!=="range"){rules[method]=true}}if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength}return rules},dataRules:function(element){var method,value,rules={},$element=$(element);for(method in $.validator.methods){value=$element.data("rule-"+method.toLowerCase());if(value!==undefined){rules[method]=value}}return rules},staticRules:function(element){var rules={};var validator=$.data(element.form,"validator");if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{}}return rules},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return}if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break}if(keepRule){rules[prop]=val.param!==undefined?val.param:true}else{delete rules[prop]}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter});$.each(["minlength","maxlength"],function(){if(rules[this]){rules[this]=Number(rules[this])}});$.each(["rangelength","range"],function(){var parts;if(rules[this]){if($.isArray(rules[this])){rules[this]=[Number(rules[this][0]),Number(rules[this][1])]}else if(typeof rules[this]==="string"){parts=rules[this].split(/[\s,]+/);rules[this]=[Number(parts[0]),Number(parts[1])]}}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max}if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength}}return rules},normalizeRule:function(data){if(typeof data==="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true});data=transformed}return data},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!==undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name))}},methods:{required:function(value,element,param){if(!this.depend(param,element)){return"dependency-mismatch"}if(element.nodeName.toLowerCase()==="select"){var val=$(element).val();return val&&val.length>0}if(this.checkable(element)){return this.getLength(value,element)>0}return $.trim(value).length>0},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)},url:function(value,element){return this.optional(element)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value).toString())},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value)},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value)},creditcard:function(value,element){if(this.optional(element)){return"dependency-mismatch"}if(/[^0-9 \-]+/.test(value)){return false}var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9){nDigit-=9}}nCheck+=nDigit;bEven=!bEven}return nCheck%10===0},minlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length>=param},maxlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length<=param},rangelength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length>=param[0]&&length<=param[1]},min:function(value,element,param){return this.optional(element)||value>=param},max:function(value,element,param){return this.optional(element)||value<=param},range:function(value,element,param){return this.optional(element)||value>=param[0]&&value<=param[1]},equalTo:function(value,element,param){var target=$(param);if(this.settings.onfocusout){target.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid()})}return value===target.val()},remote:function(value,element,param){if(this.optional(element)){return"dependency-mismatch"}var previous=this.previousValue(element);if(!this.settings.messages[element.name]){this.settings.messages[element.name]={}}previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param==="string"&&{url:param}||param;if(previous.old===value){return previous.valid}previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true||response==="true";if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);delete validator.invalid[element.name];validator.showErrors()}else{var errors={};var message=response||validator.defaultMessage(element,"remote");errors[element.name]=previous.message=$.isFunction(message)?message(value):message;validator.invalid[element.name]=true;validator.showErrors(errors)}previous.valid=valid;validator.stopRequest(element,valid)}},param));return"pending"}}});$.format=$.validator.format}(jQuery);!function($){var pendingRequests={};if($.ajaxPrefilter){$.ajaxPrefilter(function(settings,_,xhr){var port=settings.port;if(settings.mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort()}pendingRequests[port]=xhr}})}else{var ajax=$.ajax;$.ajax=function(settings){var mode=("mode"in settings?settings:$.ajaxSettings).mode,port=("port"in settings?settings:$.ajaxSettings).port;if(mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort()}pendingRequests[port]=ajax.apply(this,arguments);return pendingRequests[port]}return ajax.apply(this,arguments)}}}(jQuery);!function($){$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments)}})}})}(jQuery);
/*! jsUri v1.1.1 | https://github.com/derek-watson/jsUri */

var Query=function(a){"use strict";var b=function(a){var b=[],c,d,e,f;if(typeof a=="undefined"||a===null||a==="")return b;a.indexOf("?")===0&&(a=a.substring(1)),d=a.toString().split(/[&;]/);for(c=0;c<d.length;c++)e=d[c],f=e.split("="),b.push([f[0],f[1]]);return b},c=b(a),d=function(){var a="",b,d;for(b=0;b<c.length;b++)d=c[b],a.length>0&&(a+="&"),a+=d.join("=");return a.length>0?"?"+a:a},e=function(a){a=decodeURIComponent(a),a=a.replace("+"," ");return a},f=function(a){var b,d;for(d=0;d<c.length;d++){b=c[d];if(e(a)===e(b[0]))return b[1]}},g=function(a){var b=[],d,f;for(d=0;d<c.length;d++)f=c[d],e(a)===e(f[0])&&b.push(f[1]);return b},h=function(a,b){var d=[],f,g,h,i;for(f=0;f<c.length;f++)g=c[f],h=e(g[0])===e(a),i=e(g[1])===e(b),(arguments.length===1&&!h||arguments.length===2&&!h&&!i)&&d.push(g);c=d;return this},i=function(a,b,d){arguments.length===3&&d!==-1?(d=Math.min(d,c.length),c.splice(d,0,[a,b])):arguments.length>0&&c.push([a,b]);return this},j=function(a,b,d){var f=-1,g,j;if(arguments.length===3){for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)&&decodeURIComponent(j[1])===e(d)){f=g;break}}h(a,d).addParam(a,b,f)}else{for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)){f=g;break}}h(a),i(a,b,f)}return this};return{getParamValue:f,getParamValues:g,deleteParam:h,addParam:i,replaceParam:j,toString:d}},Uri=function(a){"use strict";var b=!1,c=function(a){var c={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},d=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],e={name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},f=c[b?"strict":"loose"].exec(a),g={},h=14;while(h--)g[d[h]]=f[h]||"";g[e.name]={},g[d[12]].replace(e.parser,function(a,b,c){b&&(g[e.name][b]=c)});return g},d=c(a||""),e=new Query(d.query),f=function(a){typeof a!="undefined"&&(d.protocol=a);return d.protocol},g=null,h=function(a){typeof a!="undefined"&&(g=a);return g===null?d.source.indexOf("//")!==-1:g},i=function(a){typeof a!="undefined"&&(d.userInfo=a);return d.userInfo},j=function(a){typeof a!="undefined"&&(d.host=a);return d.host},k=function(a){typeof a!="undefined"&&(d.port=a);return d.port},l=function(a){typeof a!="undefined"&&(d.path=a);return d.path},m=function(a){typeof a!="undefined"&&(e=new Query(a));return e},n=function(a){typeof a!="undefined"&&(d.anchor=a);return d.anchor},o=function(a){f(a);return this},p=function(a){h(a);return this},q=function(a){i(a);return this},r=function(a){j(a);return this},s=function(a){k(a);return this},t=function(a){l(a);return this},u=function(a){m(a);return this},v=function(a){n(a);return this},w=function(a){return m().getParamValue(a)},x=function(a){return m().getParamValues(a)},y=function(a,b){arguments.length===2?m().deleteParam(a,b):m().deleteParam(a);return this},z=function(a,b,c){arguments.length===3?m().addParam(a,b,c):m().addParam(a,b);return this},A=function(a,b,c){arguments.length===3?m().replaceParam(a,b,c):m().replaceParam(a,b);return this},B=function(){var a="",b=function(a){return a!==null&&a!==""};b(f())?(a+=f(),f().indexOf(":")!==f().length-1&&(a+=":"),a+="//"):h()&&b(j())&&(a+="//"),b(i())&&b(j())&&(a+=i(),i().indexOf("@")!==i().length-1&&(a+="@")),b(j())&&(a+=j(),b(k())&&(a+=":"+k())),b(l())?a+=l():b(j())&&(b(m().toString())||b(n()))&&(a+="/"),b(m().toString())&&(m().toString().indexOf("?")!==0&&(a+="?"),a+=m().toString()),b(n())&&(n().indexOf("#")!==0&&(a+="#"),a+=n());return a},C=function(){return new Uri(B())};return{protocol:f,hasAuthorityPrefix:h,userInfo:i,host:j,port:k,path:l,query:m,anchor:n,setProtocol:o,setHasAuthorityPrefix:p,setUserInfo:q,setHost:r,setPort:s,setPath:t,setQuery:u,setAnchor:v,getQueryParamValue:w,getQueryParamValues:x,deleteQueryParam:y,addQueryParam:z,replaceQueryParam:A,toString:B,clone:C}},jsUri=Uri;
(function() {
  window.Spree = (function() {
    function Spree() {}

    Spree.ready = function(callback) {
      return jQuery(document).ready(callback);
    };

    Spree.url = function(uri, query) {
      if (uri.path === void 0) {
        uri = new Uri(uri);
      }
      if (query) {
        $.each(query, function(key, value) {
          return uri.addQueryParam(key, value);
        });
      }
      if (Spree.api_key) {
        uri.addQueryParam('token', Spree.api_key);
      }
      return uri;
    };

    Spree.uri = function(uri, query) {
      return url(uri, query);
    };

    Spree.ajax = function(url_or_settings, settings) {
      var url;
      if (typeof url_or_settings === "string") {
        return $.ajax(Spree.url(url_or_settings).toString(), settings);
      } else {
        url = url_or_settings['url'];
        delete url_or_settings['url'];
        return $.ajax(Spree.url(url).toString(), url_or_settings);
      }
    };

    return Spree;

  })();

}).call(this);
// Generated by CoffeeScript 1.4.0
(function() {
  var $, cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlash, hasTextSelected, luhnCheck, reFormatCardNumber, restrictCVC, restrictCardNumber, restrictExpiry, restrictNumeric, setCardType,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    _this = this;

  $ = jQuery;

  $.payment = {};

  $.payment.fn = {};

  $.fn.payment = function() {
    var args, method;
    method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return $.payment.fn[method].apply(this, args);
  };

  defaultFormat = /(\d{1,4})/g;

  cards = [
    {
      type: 'maestro',
      pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      format: defaultFormat,
      length: [12, 13, 14, 15, 16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'dinersclub',
      pattern: /^(36|38|30[0-5])/,
      format: defaultFormat,
      length: [14],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'laser',
      pattern: /^(6706|6771|6709)/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'jcb',
      pattern: /^35/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'unionpay',
      pattern: /^62/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: false
    }, {
      type: 'discover',
      pattern: /^(6011|65|64[4-9]|622)/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'mastercard',
      pattern: /^5[1-5]/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'amex',
      pattern: /^3[47]/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      length: [15],
      cvcLength: [3, 4],
      luhn: true
    }, {
      type: 'visa',
      pattern: /^4/,
      format: defaultFormat,
      length: [13, 14, 15, 16],
      cvcLength: [3],
      luhn: true
    }
  ];

  cardFromNumber = function(num) {
    var card, _i, _len;
    num = (num + '').replace(/\D/g, '');
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
      card = cards[_i];
      if (card.pattern.test(num)) {
        return card;
      }
    }
  };

  cardFromType = function(type) {
    var card, _i, _len;
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
      card = cards[_i];
      if (card.type === type) {
        return card;
      }
    }
  };

  luhnCheck = function(num) {
    var digit, digits, odd, sum, _i, _len;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (_i = 0, _len = digits.length; _i < _len; _i++) {
      digit = digits[_i];
      digit = parseInt(digit, 10);
      if ((odd = !odd)) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  hasTextSelected = function($target) {
    var _ref;
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
      return true;
    }
    if (typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? typeof _ref.createRange === "function" ? _ref.createRange().text : void 0 : void 0 : void 0) {
      return true;
    }
    return false;
  };

  reFormatCardNumber = function(e) {
    var _this = this;
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = $.payment.formatCardNumber(value);
      return $target.val(value);
    });
  };

  formatCardNumber = function(e) {
    var $target, card, digit, length, re, upperLength, value;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    value = $target.val();
    card = cardFromNumber(value + digit);
    length = (value.replace(/\D/g, '') + digit).length;
    upperLength = 16;
    if (card) {
      upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (card && card.type === 'amex') {
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value)) {
      e.preventDefault();
      return $target.val(value + ' ' + digit);
    } else if (re.test(value + digit)) {
      e.preventDefault();
      return $target.val(value + digit + ' ');
    }
  };

  formatBackCardNumber = function(e) {
    var $target, value;
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.meta) {
      return;
    }
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/\d\s$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\d\s$/, ''));
    } else if (/\s\d?$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\s\d?$/, ''));
    }
  };

  formatExpiry = function(e) {
    var $target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val() + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
      e.preventDefault();
      return $target.val("0" + val + " / ");
    } else if (/^\d\d$/.test(val)) {
      e.preventDefault();
      return $target.val("" + val + " / ");
    }
  };

  formatForwardExpiry = function(e) {
    var $target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val();
    if (/^\d\d$/.test(val)) {
      return $target.val("" + val + " / ");
    }
  };

  formatForwardSlash = function(e) {
    var $target, slash, val;
    slash = String.fromCharCode(e.which);
    if (slash !== '/') {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val();
    if (/^\d$/.test(val) && val !== '0') {
      return $target.val("0" + val + " / ");
    }
  };

  formatBackExpiry = function(e) {
    var $target, value;
    if (e.meta) {
      return;
    }
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/\d(\s|\/)+$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\d(\s|\/)*$/, ''));
    } else if (/\s\/\s?\d?$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\s\/\s?\d?$/, ''));
    }
  };

  restrictNumeric = function(e) {
    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  };

  restrictCardNumber = function(e) {
    var $target, card, digit, value;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = ($target.val() + digit).replace(/\D/g, '');
    card = cardFromNumber(value);
    if (card) {
      return value.length <= card.length[card.length.length - 1];
    } else {
      return value.length <= 16;
    }
  };

  restrictExpiry = function(e) {
    var $target, digit, value;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = $target.val() + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 6) {
      return false;
    }
  };

  restrictCVC = function(e) {
    var $target, digit, val;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    val = $target.val() + digit;
    return val.length <= 4;
  };

  setCardType = function(e) {
    var $target, allTypes, card, cardType, val;
    $target = $(e.currentTarget);
    val = $target.val();
    cardType = $.payment.cardType(val) || 'unknown';
    if (!$target.hasClass(cardType)) {
      allTypes = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = cards.length; _i < _len; _i++) {
          card = cards[_i];
          _results.push(card.type);
        }
        return _results;
      })();
      $target.removeClass('unknown');
      $target.removeClass(allTypes.join(' '));
      $target.addClass(cardType);
      $target.toggleClass('identified', cardType !== 'unknown');
      return $target.trigger('payment.cardType', cardType);
    }
  };

  $.payment.fn.formatCardCVC = function() {
    this.payment('restrictNumeric');
    this.on('keypress', restrictCVC);
    return this;
  };

  $.payment.fn.formatCardExpiry = function() {
    this.payment('restrictNumeric');
    this.on('keypress', restrictExpiry);
    this.on('keypress', formatExpiry);
    this.on('keypress', formatForwardSlash);
    this.on('keypress', formatForwardExpiry);
    this.on('keydown', formatBackExpiry);
    return this;
  };

  $.payment.fn.formatCardNumber = function() {
    this.payment('restrictNumeric');
    this.on('keypress', restrictCardNumber);
    this.on('keypress', formatCardNumber);
    this.on('keydown', formatBackCardNumber);
    this.on('keyup', setCardType);
    this.on('paste', reFormatCardNumber);
    return this;
  };

  $.payment.fn.restrictNumeric = function() {
    this.on('keypress', restrictNumeric);
    return this;
  };

  $.payment.fn.cardExpiryVal = function() {
    return $.payment.cardExpiryVal($(this).val());
  };

  $.payment.cardExpiryVal = function(value) {
    var month, prefix, year, _ref;
    value = value.replace(/\s/g, '');
    _ref = value.split('/', 2), month = _ref[0], year = _ref[1];
    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    return {
      month: month,
      year: year
    };
  };

  $.payment.validateCardNumber = function(num) {
    var card, _ref;
    num = (num + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) {
      return false;
    }
    card = cardFromNumber(num);
    if (!card) {
      return false;
    }
    return (_ref = num.length, __indexOf.call(card.length, _ref) >= 0) && (card.luhn === false || luhnCheck(num));
  };

  $.payment.validateCardExpiry = function(month, year) {
    var currentTime, expiry, prefix, _ref;
    if (typeof month === 'object' && 'month' in month) {
      _ref = month, month = _ref.month, year = _ref.year;
    }
    if (!(month && year)) {
      return false;
    }
    month = $.trim(month);
    year = $.trim(year);
    if (!/^\d+$/.test(month)) {
      return false;
    }
    if (!/^\d+$/.test(year)) {
      return false;
    }
    if (!(parseInt(month, 10) <= 12)) {
      return false;
    }
    if (year.length === 2) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }
    expiry = new Date(year, month);
    currentTime = new Date;
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);
    return expiry > currentTime;
  };

  $.payment.validateCardCVC = function(cvc, type) {
    var _ref, _ref1;
    cvc = $.trim(cvc);
    if (!/^\d+$/.test(cvc)) {
      return false;
    }
    if (type) {
      return _ref = cvc.length, __indexOf.call((_ref1 = cardFromType(type)) != null ? _ref1.cvcLength : void 0, _ref) >= 0;
    } else {
      return cvc.length >= 3 && cvc.length <= 4;
    }
  };

  $.payment.cardType = function(num) {
    var _ref;
    if (!num) {
      return null;
    }
    return ((_ref = cardFromNumber(num)) != null ? _ref.type : void 0) || null;
  };

  $.payment.formatCardNumber = function(num) {
    var card, groups, upperLength, _ref;
    card = cardFromNumber(num);
    if (!card) {
      return num;
    }
    upperLength = card.length[card.length.length - 1];
    num = num.replace(/\D/g, '');
    num = num.slice(0, +upperLength + 1 || 9e9);
    if (card.format.global) {
      return (_ref = num.match(card.format)) != null ? _ref.join(' ') : void 0;
    } else {
      groups = card.format.exec(num);
      if (groups != null) {
        groups.shift();
      }
      return groups != null ? groups.join(' ') : void 0;
    }
  };

}).call(this);
(function() {
  Spree.disableSaveOnClick = function() {
    return ($('form.edit_order')).submit(function() {
      return ($(this)).find(':submit, :image').attr('disabled', true).removeClass('primary').addClass('disabled');
    });
  };

  Spree.ready(function($) {
    return Spree.Checkout = {};
  });

}).call(this);
(function() {
  Spree.onAddress = function() {
    var getCountryId, order_use_billing, update_shipping_form_state;
    if (($('#checkout_form_address')).is('*')) {
      ($('#checkout_form_address')).validate();
      getCountryId = function(region) {
        return $('#' + region + 'country select').val();
      };
      Spree.updateState = function(region) {
        var countryId;
        countryId = getCountryId(region);
        if (countryId != null) {
          if (Spree.Checkout[countryId] == null) {
            return $.get(Spree.routes.states_search, {
              country_id: countryId
            }, function(data) {
              Spree.Checkout[countryId] = {
                states: data.states,
                states_required: data.states_required
              };
              return Spree.fillStates(Spree.Checkout[countryId], region);
            });
          } else {
            return Spree.fillStates(Spree.Checkout[countryId], region);
          }
        }
      };
      Spree.fillStates = function(data, region) {
        var selected, stateInput, statePara, stateSelect, stateSpanRequired, states, statesRequired, statesWithBlank;
        statesRequired = data.states_required;
        states = data.states;
        statePara = $('#' + region + 'state');
        stateSelect = statePara.find('select');
        stateInput = statePara.find('input');
        stateSpanRequired = statePara.find('state-required');
        if (states.length > 0) {
          selected = parseInt(stateSelect.val());
          stateSelect.html('');
          statesWithBlank = [
            {
              name: '',
              id: ''
            }
          ].concat(states);
          $.each(statesWithBlank, function(idx, state) {
            var opt;
            opt = ($(document.createElement('option'))).attr('value', state.id).html(state.name);
            if (selected === state.id) {
              opt.prop('selected', true);
            }
            return stateSelect.append(opt);
          });
          stateSelect.prop('disabled', false).show();
          stateInput.hide().prop('disabled', true);
          statePara.show();
          stateSpanRequired.show();
          if (statesRequired) {
            stateSelect.addClass('required');
          }
          stateSelect.removeClass('hidden');
          return stateInput.removeClass('required');
        } else {
          stateSelect.hide().prop('disabled', true);
          stateInput.show();
          if (statesRequired) {
            stateSpanRequired.show();
            stateInput.addClass('required');
          } else {
            stateInput.val('');
            stateSpanRequired.hide();
            stateInput.removeClass('required');
          }
          statePara.toggle(!!statesRequired);
          stateInput.prop('disabled', !statesRequired);
          stateInput.removeClass('hidden');
          return stateSelect.removeClass('required');
        }
      };
      ($('#bcountry select')).change(function() {
        return Spree.updateState('b');
      });
      ($('#scountry select')).change(function() {
        return Spree.updateState('s');
      });
      Spree.updateState('b');
      order_use_billing = $('input#order_use_billing');
      order_use_billing.change(function() {
        return update_shipping_form_state(order_use_billing);
      });
      update_shipping_form_state = function(order_use_billing) {
        if (order_use_billing.is(':checked')) {
          ($('#shipping .inner')).hide();
          return ($('#shipping .inner input, #shipping .inner select')).prop('disabled', true);
        } else {
          ($('#shipping .inner')).show();
          ($('#shipping .inner input, #shipping .inner select')).prop('disabled', false);
          return Spree.updateState('s');
        }
      };
      return update_shipping_form_state(order_use_billing);
    }
  };

  Spree.ready(function($) {
    return Spree.onAddress();
  });

}).call(this);
(function() {
  Spree.onPayment = function() {
    if (($('#checkout_form_payment')).is('*')) {
      $(".cardNumber").payment('formatCardNumber');
      $(".cardExpiry").payment('formatCardExpiry');
      $(".cardCode").payment('formatCardCVC');
      $(".cardNumber").change(function() {
        return $(this).parent().siblings(".ccType").val($.payment.cardType(this.value));
      });
      ($('input[type="radio"][name="order[payments_attributes][][payment_method_id]"]')).click(function() {
        ($('#payment-methods li')).hide();
        if (this.checked) {
          return ($('#payment_method_' + this.value)).show();
        }
      });
      ($(document)).on('click', '#cvv_link', function(event) {
        var windowName, windowOptions;
        windowName = 'cvv_info';
        windowOptions = 'left=20,top=20,width=500,height=500,toolbar=0,resizable=0,scrollbars=1';
        window.open(($(this)).attr('href'), windowName, windowOptions);
        return event.preventDefault();
      });
      ($('input[type="radio"]:checked')).click();
      return $('#checkout_form_payment').submit(function() {
        var coupon_code, coupon_code_field, coupon_status, url;
        coupon_code_field = $('#order_coupon_code');
        coupon_code = $.trim(coupon_code_field.val());
        if (coupon_code !== '') {
          if ($('#coupon_status').length === 0) {
            coupon_status = $("<div id='coupon_status'></div>");
            coupon_code_field.parent().append(coupon_status);
          } else {
            coupon_status = $("#coupon_status");
          }
          url = Spree.url(Spree.routes.apply_coupon_code(Spree.current_order_id), {
            order_token: Spree.current_order_token,
            coupon_code: coupon_code
          });
          coupon_status.removeClass();
          return $.ajax({
            async: false,
            method: "PUT",
            url: url,
            success: function(data) {
              coupon_code_field.val('');
              coupon_status.addClass("success").html("Coupon code applied successfully.");
              return true;
            },
            error: function(xhr) {
              var handler;
              handler = JSON.parse(xhr.responseText);
              coupon_status.addClass("error").html(handler["error"]);
              $('.continue').attr('disabled', false);
              return false;
            }
          });
        }
      });
    }
  };

  Spree.ready(function($) {
    return Spree.onPayment();
  });

}).call(this);
(function() {
  $(function() {
    var radios;
    Spree.addImageHandlers = function() {
      var thumbnails;
      thumbnails = $('#product-images ul.thumbnails');
      ($('#main-image')).data('selectedThumb', ($('#main-image img')).attr('src'));
      thumbnails.find('li').eq(0).addClass('selected');
      thumbnails.find('a').on('click', function(event) {
        ($('#main-image')).data('selectedThumb', ($(event.currentTarget)).attr('href'));
        ($('#main-image')).data('selectedThumbId', ($(event.currentTarget)).parent().attr('id'));
        ($(this)).mouseout(function() {
          thumbnails.find('li').removeClass('selected');
          return ($(event.currentTarget)).parent('li').addClass('selected');
        });
        return false;
      });
      thumbnails.find('li').on('mouseenter', function(event) {
        return ($('#main-image img')).attr('src', ($(event.currentTarget)).find('a').attr('href'));
      });
      return thumbnails.find('li').on('mouseleave', function(event) {
        return ($('#main-image img')).attr('src', ($('#main-image')).data('selectedThumb'));
      });
    };
    Spree.showVariantImages = function(variantId) {
      var currentThumb, newImg, thumb;
      ($('li.vtmb')).hide();
      ($('li.tmb-' + variantId)).show();
      currentThumb = $('#' + ($('#main-image')).data('selectedThumbId'));
      if (!currentThumb.hasClass('vtmb-' + variantId)) {
        thumb = $(($('#product-images ul.thumbnails li:visible.vtmb')).eq(0));
        if (!(thumb.length > 0)) {
          thumb = $(($('#product-images ul.thumbnails li:visible')).eq(0));
        }
        newImg = thumb.find('a').attr('href');
        ($('#product-images ul.thumbnails li')).removeClass('selected');
        thumb.addClass('selected');
        ($('#main-image img')).attr('src', newImg);
        ($('#main-image')).data('selectedThumb', newImg);
        return ($('#main-image')).data('selectedThumbId', thumb.attr('id'));
      }
    };
    Spree.updateVariantPrice = function(variant) {
      var variantPrice;
      variantPrice = variant.data('price');
      if (variantPrice) {
        return ($('.price.selling')).text(variantPrice);
      }
    };
    radios = $('#product-variants input[type="radio"]');
    if (radios.length > 0) {
      Spree.showVariantImages(($('#product-variants input[type="radio"]')).eq(0).attr('value'));
      Spree.updateVariantPrice(radios.first());
    }
    Spree.addImageHandlers();
    return radios.click(function(event) {
      Spree.showVariantImages(this.value);
      return Spree.updateVariantPrice($(this));
    });
  });

}).call(this);
(function() {
  Spree.ready(function($) {
    if (($('form#update-cart')).is('*')) {
      ($('form#update-cart a.delete')).show().one('click', function() {
        ($(this)).parents('.line-item').first().find('input.line_item_quantity').val(0);
        ($(this)).parents('form').first().submit();
        return false;
      });
    }
    return ($('form#update-cart')).submit(function() {
      return ($('form#update-cart #update-button')).attr('disabled', true);
    });
  });

  Spree.fetch_cart = function() {
    return $.ajax({
      url: Spree.routes.cart_link,
      success: function(data) {
        return $('#link-to-cart').html(data);
      }
    });
  };

}).call(this);
/*! $.noUiSlider - WTFPL - refreshless.com/nouislider/ */

(function(e){function h(a){throw new RangeError("noUiSlider: "+a);}function x(a,b,d){(a[b]||a[d])&&a[b]===a[d]&&h("(Link) '"+b+"' can't match '"+d+"'.'")}function t(a){return"number"===typeof a&&!isNaN(a)&&isFinite(a)}function H(a){return e.isArray(a)?a:[a]}function D(a,b){a.addClass(b);setTimeout(function(){a.removeClass(b)},300)}function y(a,b){return 100*b/(a[1]-a[0])}function I(a,b){if(b>=a.d.slice(-1)[0])return 100;for(var d=1,c,g,e;b>=a.d[d];)d++;c=a.d[d-1];g=a.d[d];e=a.c[d-1];c=[c,g];return e+
y(c,0>c[0]?b+Math.abs(c[0]):b-c[0])/(100/(a.c[d]-e))}function J(a,b){for(var d=1,c;b>=a.c[d];)d++;if(a.m)return c=a.c[d-1],d=a.c[d],b-c>(d-c)/2?d:c;a.h[d-1]?(c=a.h[d-1],d=a.c[d-1]+Math.round((b-a.c[d-1])/c)*c):d=b;return d}function s(a){void 0===a&&(a={});"object"!==typeof a&&h("(Format) 'format' option must be an object.");var b={};e(K).each(function(d,c){void 0===a[c]?b[c]=z[d]:typeof a[c]===typeof z[d]?("decimals"===c&&(0>a[c]||7<a[c])&&h("(Format) 'format.decimals' option must be between 0 and 7."),
b[c]=a[c]):h("(Format) 'format."+c+"' must be a "+typeof z[d]+".")});x(b,"mark","thousand");x(b,"prefix","negative");x(b,"prefix","negativeBefore");this.B=b}function q(a,b){if(!(this instanceof q))throw Error("Link: Don't use Link as a function. Use the 'new' keyword.");if(!a)throw new RangeError("Link: missing parameters.");this.g=a.format||{};this.update=!b;var d=this,c=a.target||function(){},g=a.method,f="string"===typeof c&&0===c.indexOf("-tooltip-"),h="string"===typeof c&&0!==c.indexOf("-"),
n="function"===typeof c,r=c instanceof e||e.zepto&&e.zepto.isZ(c),E=r&&c.is("input, select, textarea"),l=r&&"function"===typeof g,s=r&&"string"===typeof g&&c[g];if(f)this.method=g||"html",this.j=e(c.replace("-tooltip-","")||"<div/>")[0];else if(h)this.method="val",this.j=document.createElement("input"),this.j.name=c,this.j.type="hidden";else if(n)this.target=!1,this.method=c;else{if(r){if(g&&(l||s)){this.target=c;this.method=g;return}if(!g&&E){this.method="val";this.target=c;this.target.on("change",
function(a){a=e(a.target).val();var b=d.q;d.u.val([b?null:a,b?a:null],{link:d})});return}if(!g&&!E){this.method="html";this.target=c;return}}throw new RangeError("Link: Invalid Link.");}}function L(a,b){t(b)||h("'step' is not numeric.");a.h[0]=b}function M(a,b){("object"!==typeof b||e.isArray(b))&&h("'range' is not an object.");e.each(b,function(b,c){var g;"number"===typeof c&&(c=[c]);e.isArray(c)||h("'range' contains invalid value.");g="min"===b?0:"max"===b?100:parseFloat(b);t(g)&&t(c[0])||h("'range' value isn't numeric.");
a.c.push(g);a.d.push(c[0]);g?a.h.push(isNaN(c[1])?!1:c[1]):isNaN(c[1])||(a.h[0]=c[1])});e.each(a.h,function(b,c){if(!c)return!0;a.h[b]=y([a.d[b],a.d[b+1]],c)/(100/(a.c[b+1]-a.c[b]))})}function N(a,b){"number"===typeof b&&(b=[b]);(!e.isArray(b)||!b.length||2<b.length)&&h("'start' option is incorrect.");a.a=b.length;a.start=b}function O(a,b){a.m=b;"boolean"!==typeof b&&h("'snap' option must be a boolean.")}function P(a,b){"lower"===b&&1===a.a?a.i=1:"upper"===b&&1===a.a?a.i=2:!0===b&&2===a.a?a.i=3:!1===
b?a.i=0:h("'connect' option was doesn't match handle count.")}function Q(a,b){switch(b){case "horizontal":a.k=0;break;case "vertical":a.k=1;break;default:h("'orientation' option is invalid.")}}function R(a,b){2<a.c.length&&h("'margin' option is only supported on linear sliders.");a.margin=y(a.d,b);t(b)||h("'margin' option must be numeric.")}function S(a,b){switch(b){case "ltr":a.dir=0;break;case "rtl":a.dir=1;a.i=[0,2,1,3][a.i];break;default:h("'direction' option was not recognized.")}}function T(a,
b){"string"!==typeof b&&h("'behaviour' must be a string containing options.");var d=0<=b.indexOf("snap");a.n={p:0<=b.indexOf("tap")||d,extend:0<=b.indexOf("extend"),s:0<=b.indexOf("drag"),fixed:0<=b.indexOf("fixed"),m:d}}function U(a,b,d){a.o=[b.lower,b.upper];a.g=new s(b.format);e.each(a.o,function(a,g){e.isArray(g)||h("'serialization."+(a?"upper":"lower")+"' must be an array.");e.each(g,function(){this instanceof q||h("'serialization."+(a?"upper":"lower")+"' can only contain Link instances.");this.q=
a;this.u=d;this.scope=this.scope||d;this.g=new s(e.extend({},b.format,this.g))})});a.dir&&1<a.a&&a.o.reverse()}function V(a,b){var d={c:[],d:[],h:[!1],margin:0},c;c={step:{e:!1,f:L},range:{e:!0,f:M},start:{e:!0,f:N},snap:{e:!1,f:O},connect:{e:!0,f:P},orientation:{e:!1,f:Q},margin:{e:!1,f:R},direction:{e:!0,f:S},behaviour:{e:!0,f:T},serialization:{e:!0,f:U}};a=e.extend({connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"},a);a.serialization=e.extend({lower:[],upper:[],format:{}},a.serialization);
e.each(c,function(c,e){if(void 0===a[c])if(e.e)h("'"+c+"' is required.");else return!0;e.f(d,a[c],b)});d.style=d.k?"top":"left";return d}function W(a,b){var d=e("<div><div/></div>").addClass(f[2]),c=["-lower","-upper"];a.dir&&c.reverse();d.children().addClass(f[3]+" "+f[3]+c[b]);return d}function X(a,b){b.j&&(b=new q({target:e(b.j).clone().appendTo(a),method:b.method,format:b.g},!0));return b}function Y(a,b){var d,c=[];for(d=0;d<a.a;d++){var e=c,f=d,h=a.o[d],n=b[d].children(),r=void 0,l=[];l.push(new q({format:a.g},
!0));for(r=0;r<h.length;r++)l.push(X(n,h[r]));e[f]=l}return c}function Z(a,b,d){switch(a){case 1:b.addClass(f[7]);d[0].addClass(f[6]);break;case 3:d[1].addClass(f[6]);case 2:d[0].addClass(f[7]);case 0:b.addClass(f[6])}}function aa(a,b){var d,c=[];for(d=0;d<a.a;d++)c.push(W(a,d).appendTo(b));return c}function ba(a,b){b.addClass([f[0],f[8+a.dir],f[4+a.k]].join(" "));return e("<div/>").appendTo(b).addClass(f[1])}function ca(a,b,d){function c(){return u[["width","height"][b.k]]()}function g(a){var b,
c=[m.val()];for(b=0;b<a.length;b++)m.trigger(a[b],c)}function h(a,c,d){var g=a[0]!==k[0][0]?1:0,p=v[0]+b.margin,F=v[1]-b.margin;d&&1<k.length&&(c=g?Math.max(c,p):Math.min(c,F));100>c&&(c=J(b,c));c=Math.max(Math.min(parseFloat(c.toFixed(7)),100),0);if(c===v[g])return 1===k.length?!1:c===p||c===F?0:!1;a.css(b.style,c+"%");a.is(":first-child")&&a.toggleClass(f[17],50<c);v[g]=c;b.dir&&(c=100-c);e(w[g]).each(function(){this.write(b,c,a.children(),m)});return!0}function q(a,b,c){c||D(m,f[14]);h(a,b,!1);
g(["slide","set","change"])}function n(a,c,d,e){a=a.replace(/\s/g,".nui ")+".nui";c.on(a,function(a){var c=m.attr("disabled");if(m.hasClass(f[14])||void 0!==c&&null!==c)return!1;a.preventDefault();var c=0===a.type.indexOf("touch"),g=0===a.type.indexOf("mouse"),B=0===a.type.indexOf("pointer"),A,h,k=a;0===a.type.indexOf("MSPointer")&&(B=!0);a.originalEvent&&(a=a.originalEvent);c&&(A=a.changedTouches[0].pageX,h=a.changedTouches[0].pageY);if(g||B)B||void 0!==window.pageXOffset||(window.pageXOffset=document.documentElement.scrollLeft,
window.pageYOffset=document.documentElement.scrollTop),A=a.clientX+window.pageXOffset,h=a.clientY+window.pageYOffset;k.v=[A,h];k.cursor=g;a=k;a.l=a.v[b.k];d(a,e)})}function r(a,b){var d=b.a||k,e,f=!1,f=100*(a.l-b.start)/c(),m=d[0][0]!==k[0][0]?1:0;var n=b.w;e=f+n[0];f+=n[1];1<d.length?(0>e&&(f+=Math.abs(e)),100<f&&(e-=f-100),e=[Math.max(Math.min(e,100),0),Math.max(Math.min(f,100),0)]):e=[e,f];f=h(d[0],e[m],1===d.length);1<d.length&&(f=h(d[1],e[m?0:1],!1)||f);f&&g(["slide"])}function s(a){e("."+f[15]).removeClass(f[15]);
a.cursor&&e("body").css("cursor","").off(".nui");C.off(".nui");m.removeClass(f[12]);g(["set","change"])}function t(a,b){1===b.a.length&&b.a[0].children().addClass(f[15]);a.stopPropagation();n(l.move,C,r,{start:a.l,a:b.a,w:[v[0],v[k.length-1]]});n(l.end,C,s,null);a.cursor&&(e("body").css("cursor",e(a.target).css("cursor")),1<k.length&&m.addClass(f[12]),e("body").on("selectstart.nui",!1))}function x(a){var d=a.l,g=0;a.stopPropagation();e.each(k,function(){g+=this.offset()[b.style]});g=d<g/2||1===k.length?
0:1;d-=u.offset()[b.style];d=100*d/c();q(k[g],d,b.n.m);b.n.m&&t(a,{a:[k[g]]})}function y(a){var c=(a=a.l<u.offset()[b.style])?0:100;a=a?0:k.length-1;q(k[a],c,!1)}var m=e(a),v=[-1,-1],u,w,k;if(!m.is(":empty"))throw Error("Slider was already initialized.");u=ba(b,m);k=aa(b,u);w=Y(b,k);Z(b.i,m,k);(function(a){var b;if(!a.fixed)for(b=0;b<k.length;b++)n(l.start,k[b].children(),t,{a:[k[b]]});a.p&&n(l.start,u,x,{a:k});a.extend&&(m.addClass(f[16]),a.p&&n(l.start,m,y,{a:k}));a.s&&(b=u.find("."+f[7]).addClass(f[10]),
a.fixed&&(b=b.add(u.children().not(b).children())),n(l.start,b,t,{a:k}))})(b.n);a.F=function(a,c,d,n,p){var l;b.dir&&1<b.a&&a.reverse();p&&D(m,f[14]);for(l=0;l<(1<k.length?3:1);l++)p=d||w[l%2][0],p=p.valueOf(a[l%2]),!1!==p&&(p=I(b,p),b.dir&&(p=100-p),!0!==h(k[l%2],p,!0)&&e(w[l%2]).each(function(){this.write(b,v[l%2],k[l%2].children(),m,n)}));!0===c&&g(["set"])};a.D=function(){var a,c=[];for(a=0;a<b.a;a++)c[a]=w[a][0].A;return 1===c.length?c[0]:b.dir&&1<b.a?c.reverse():c};a.r=function(){e.each(w,function(){e.each(this,
function(){this.target&&this.target.off(".nui")})});e(this).off(".nui").removeClass(f.join(" ")).empty();return d};m.val(b.start)}function da(a){this.length||h("Can't initialize slider on empty selection.");var b=V(a,this);return this.each(function(){ca(this,b,a)})}function ea(a){return this.each(function(){var b=e(this).val(),d=this.r(),c=e.extend({},d,a);e(this).noUiSlider(c);d.start===c.start&&e(this).val(b)})}var C=e(document),G=e.fn.val,l=window.navigator.G?{start:"pointerdown",move:"pointermove",
end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},f="noUi-target noUi-base noUi-origin noUi-handle noUi-horizontal noUi-vertical noUi-background noUi-connect noUi-ltr noUi-rtl noUi-dragable  noUi-state-drag  noUi-state-tap noUi-active noUi-extended noUi-stacking".split(" "),K="decimals mark thousand prefix postfix encoder decoder negative negativeBefore".split(" "),
z=[2,".","","","",function(a){return a},function(a){return a},"-",""];s.prototype.b=function(a){return this.B[a]};s.prototype.C=function(a){function b(a){return a.split("").reverse().join("")}a=this.b("encoder")(a);var d="",c="",e="",f="";0>a&&(d=this.b("negative"),c=this.b("negativeBefore"));a=Math.abs(a).toFixed(this.b("decimals")).toString();a=a.split(".");0===parseFloat(a)&&(a[0]="0");this.b("thousand")?(e=b(a[0]).match(/.{1,3}/g),e=b(e.join(b(this.b("thousand"))))):e=a[0];this.b("mark")&&1<a.length&&
(f=this.b("mark")+a[1]);return c+this.b("prefix")+d+e+f+this.b("postfix")};s.prototype.t=function(a){function b(a){return a.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g,"\\$&")}var d;if(null===a||void 0===a)return!1;a=a.toString();d=a.replace(RegExp("^"+b(this.b("negativeBefore"))),"");a!==d?(a=d,d="-"):d="";a=a.replace(RegExp("^"+b(this.b("prefix"))),"");this.b.negative&&(d="",a=a.replace(RegExp("^"+b(this.b("negative"))),"-"));a=a.replace(RegExp(b(this.b("postfix"))+"$"),"").replace(RegExp(b(this.b("thousand")),
"g"),"").replace(this.b("mark"),".");a=this.b("decoder")(parseFloat(d+a));return isNaN(a)?!1:a};q.prototype.write=function(a,b,d,c,e){if(!this.update||!1!==e){if(100<=b)b=a.d.slice(-1)[0];else{e=1;for(var f,h,l;b>=a.c[e];)e++;f=a.d[e-1];h=a.d[e];l=a.c[e-1];f=[f,h];b=100/(a.c[e]-l)*(b-l)*(f[1]-f[0])/100+f[0]}this.A=b=this.format(b);if("function"===typeof this.method)this.method.call(this.target[0]||c[0],b,d,c);else this.target[this.method](b,d,c)}};q.prototype.format=function(a){return this.g.C(a)};
q.prototype.valueOf=function(a){return this.g.t(a)};e.noUiSlider={Link:q};e.fn.noUiSlider=function(a,b){return(b?ea:da).call(this,a)};e.fn.val=function(){var a=Array.prototype.slice.call(arguments,0),b,d,c,g;if(!a.length)return this.hasClass(f[0])?this[0].D():G.apply(this);"object"===typeof a[1]?(b=a[1].set,d=a[1].link,c=a[1].update,g=a[1].animate):!0===a[1]&&(b=!0);return this.each(function(){e(this).hasClass(f[0])?this.F(H(a[0]),b,d,c,g):G.apply(e(this),a)})}})(window.jQuery||window.Zepto);
/*


   Magic Zoom Plus v4.5.25 DEMO
   Copyright 2014 Magic Toolbox
   Buy a license: www.magictoolbox.com/magiczoomplus/
   License agreement: http://www.magictoolbox.com/license/


*/

eval(function(m,a,g,i,c,k){c=function(e){return(e<a?'':c(parseInt(e/a)))+((e=e%a)>35?String.fromCharCode(e+29):e.toString(36))};if(!''.replace(/^/,String)){while(g--){k[c(g)]=i[g]||c(g)}i=[function(e){return k[e]}];c=function(){return'\\w+'};g=1};while(g--){if(i[g]){m=m.replace(new RegExp('\\b'+c(g)+'\\b','g'),i[g])}}return m}('(Q(){if(1e.6X){R}U b={3B:"dM.7.4",cO:0,5Q:{},$a4:Q(d){R(d.$4H||(d.$4H=++a.cO))},9a:Q(d){R(a.5Q[d]||(a.5Q[d]={}))},$F:Q(){},$Y:Q(){R Y},2M:Q(d){R(1G!=d)},eM:Q(d){R!!(d)},2G:Q(d){if(!a.2M(d)){R Y}if(d.$4c){R d.$4c}if(!!d.5b){if(1==d.5b){R"8Z"}if(3==d.5b){R"dc"}}if(d.1z&&d.9n){R"eX"}if(d.1z&&d.9I){R"2d"}if((d 4K 1e.f2||d 4K 1e.9U)&&d.4E===a.4L){R"7c"}if(d 4K 1e.5d){R"5X"}if(d 4K 1e.9U){R"Q"}if(d 4K 1e.8j){R"6d"}if(a.19.2I){if(a.2M(d.cW)){R"3g"}}1g{if(d===1e.3g||d.4E==1e.ag||d.4E==1e.fc||d.4E==1e.eA||d.4E==1e.eJ||d.4E==1e.eO){R"3g"}}if(d 4K 1e.d4){R"bQ"}if(d 4K 1e.4Z){R"eW"}if(d===1e){R"1e"}if(d===1m){R"1m"}R 4t(d)},1V:Q(j,h){if(!(j 4K 1e.5d)){j=[j]}1K(U g=0,e=j.1z;g<e;g++){if(!a.2M(j)){6b}1K(U f in(h||{})){35{j[g][f]=h[f]}3j(d){}}}R j[0]},8V:Q(h,g){if(!(h 4K 1e.5d)){h=[h]}1K(U f=0,d=h.1z;f<d;f++){if(!a.2M(h[f])){6b}if(!h[f].2W){6b}1K(U e in(g||{})){if(!h[f].2W[e]){h[f].2W[e]=g[e]}}}R h[0]},d8:Q(f,e){if(!a.2M(f)){R f}1K(U d in(e||{})){if(!f[d]){f[d]=e[d]}}R f},$35:Q(){1K(U f=0,d=2d.1z;f<d;f++){35{R 2d[f]()}3j(g){}}R 1a},$A:Q(f){if(!a.2M(f)){R $W([])}if(f.dl){R $W(f.dl())}if(f.9n){U e=f.1z||0,d=1s 5d(e);3P(e--){d[e]=f[e]}R $W(d)}R $W(5d.2W.gm.1X(f))},31:Q(){R 1s d4().gb()},3M:Q(h){U f;2l(a.2G(h)){1o"a3":f={};1K(U g in h){f[g]=a.3M(h[g])}1n;1o"5X":f=[];1K(U e=0,d=h.1z;e<d;e++){f[e]=a.3M(h[e])}1n;2k:R h}R a.$(f)},$:Q(e){if(!a.2M(e)){R 1a}if(e.$a1){R e}2l(a.2G(e)){1o"5X":e=a.d8(e,a.1V(a.5d,{$a1:a.$F}));e.2Z=e.3N;e.4J=a.5d.4J;R e;1n;1o"6d":U d=1m.dg(e);if(a.2M(d)){R a.$(d)}R 1a;1n;1o"1e":1o"1m":a.$a4(e);e=a.1V(e,a.6t);1n;1o"8Z":a.$a4(e);e=a.1V(e,a.3u);1n;1o"3g":e=a.1V(e,a.ag);1n;1o"dc":R e;1n;1o"Q":1o"5X":1o"bQ":2k:1n}R a.1V(e,{$a1:a.$F})},$1s:Q(d,f,e){R $W(a.2N.46(d)).dq(f||{}).1f(e||{})},fL:Q(e){if(1m.9p&&1m.9p.1z){1m.9p[0].a2(e,0)}1g{U d=$W(1m.46("1L"));d.36(e);1m.6n("9z")[0].2y(d)}}};U a=b;1e.6X=b;1e.$W=b.$;a.5d={$4c:"5X",4G:Q(g,h){U d=P.1z;1K(U e=P.1z,f=(h<0)?1u.3L(0,e+h):h||0;f<e;f++){if(P[f]===g){R f}}R-1},4J:Q(d,e){R P.4G(d,e)!=-1},3N:Q(d,g){1K(U f=0,e=P.1z;f<e;f++){if(f in P){d.1X(g,P[f],f,P)}}},2X:Q(d,j){U h=[];1K(U g=0,e=P.1z;g<e;g++){if(g in P){U f=P[g];if(d.1X(j,P[g],g,P)){h.4j(f)}}}R h},e4:Q(d,h){U g=[];1K(U f=0,e=P.1z;f<e;f++){if(f in P){g[f]=d.1X(h,P[f],f,P)}}R g}};a.8V(8j,{$4c:"6d",4k:Q(){R P.2D(/^\\s+|\\s+$/g,"")},eq:Q(d,e){R(e||Y)?(P.6c()===d.6c()):(P.3b().6c()===d.3b().6c())},3c:Q(){R P.2D(/-\\D/g,Q(d){R d.ez(1).g3()})},6D:Q(){R P.2D(/[A-Z]/g,Q(d){R("-"+d.ez(0).3b())})},1O:Q(d){R 2g(P,d||10)},dp:Q(){R 3Z(P)},6k:Q(){R!P.2D(/1b/i,"").4k()},3l:Q(e,d){d=d||"";R(d+P+d).4G(d+e+d)>-1}});b.8V(9U,{$4c:"Q",1p:Q(){U e=a.$A(2d),d=P,f=e.7V();R Q(){R d.51(f||1a,e.ck(a.$A(2d)))}},2o:Q(){U e=a.$A(2d),d=P,f=e.7V();R Q(g){R d.51(f||1a,$W([g||1e.3g]).ck(e))}},2w:Q(){U e=a.$A(2d),d=P,f=e.7V();R 1e.64(Q(){R d.51(d,e)},f||0)},e1:Q(){U e=a.$A(2d),d=P;R Q(){R d.2w.51(d,e)}},cV:Q(){U e=a.$A(2d),d=P,f=e.7V();R 1e.eF(Q(){R d.51(d,e)},f||0)}});U c=9Z.eI.3b();a.19={93:{c1:!!(1m.eD),eT:!!(1e.eN),9X:!!(1m.eV)},3O:Q(){R"eE"in 1e||(1e.eo&&1m 4K eo)}(),fi:c.3s(/ep|fj|ff|fr\\/|fm|f4|f7|f8|fa|f5|eZ|ip(ef|eu|ad)|f1|fo|fe |go|gn|gh|gg|dI m(g9|in)i|g8( gf)?|ed|p(gd|ft)\\/|gE|gD|gC|gH|gB|gz\\.(19|5J)|g5|fE|fH (ce|ed)|fI|fK/)?1b:Y,4M:(1e.dI)?"7v":!!(1e.fD)?"2I":(1G!=1m.fC||1a!=1e.fw)?"bn":(1a!=1e.fv||!9Z.fB)?"3m":"fA",3B:"",3y:0,9Q:c.3s(/ip(?:ad|eu|ef)/)?"bK":(c.3s(/(?:fY|ep)/)||9Z.9Q.3s(/ca|5C|g2/i)||["fX"])[0].3b(),3F:1m.95&&"et"==1m.95.3b(),4d:Q(){R(1m.95&&"et"==1m.95.3b())?1m.2i:1m.9B},5L:1e.5L||1e.gp||1e.fT||1e.fU||1e.fV||1G,9O:1e.9O||1e.cc||1e.cc||1e.fS||1e.fR||1e.fO||1G,1N:Y,3Q:Q(){if(a.19.1N){R}a.19.1N=1b;a.2i=$W(1m.2i);a.5C=$W(1e);(Q(){a.19.6O={4e:Y,3h:""};if(4t 1m.2i.1L.d7!=="1G"){a.19.6O.4e=1b}1g{U f="cg c8 O 9S c4".4u(" ");1K(U e=0,d=f.1z;e<d;e++){a.19.6O.3h=f[e];if(4t 1m.2i.1L[a.19.6O.3h+"fP"]!=="1G"){a.19.6O.4e=1b;1n}}}})();(Q(){a.19.7U={4e:Y,3h:""};if(4t 1m.2i.1L.fQ!=="1G"){a.19.7U.4e=1b}1g{U f="cg c8 O 9S c4".4u(" ");1K(U e=0,d=f.1z;e<d;e++){a.19.7U.3h=f[e];if(4t 1m.2i.1L[a.19.7U.3h+"fW"]!=="1G"){a.19.7U.4e=1b;1n}}}})();$W(1m).da("5c")}};(Q(){Q d(){R!!(2d.9I.at)}a.19.3B=("7v"==a.19.4M)?!!(1m.9z)?g4:!!(1e.fZ)?g0:!!(1e.bN)?6x:(a.19.93.9X)?fN:((d())?fM:((1m.80)?fz:5u)):("2I"==a.19.4M)?!!(1e.fy||1e.fx)?bY:!!(1e.cn&&1e.fu)?6:((1e.cn)?5:4):("3m"==a.19.4M)?((a.19.93.c1)?((a.19.93.9X)?fJ:cP):fF):("bn"==a.19.4M)?!!(1m.9z)?5u:!!1m.6R?fG:!!(1e.bN)?g6:((1m.80)?gx:gy):"";a.19[a.19.4M]=a.19[a.19.4M+a.19.3B]=1b;if(1e.an){a.19.an=1b}a.19.3y=(!a.19.2I)?0:(1m.bW)?1m.bW:Q(){U e=0;if(a.19.3F){R 5}2l(a.19.3B){1o 4:e=6;1n;1o 5:e=7;1n;1o 6:e=8;1n;1o bY:e=9;1n}R e}()})();(Q(){a.19.3n={4e:Y,91:Q(){R Y},aj:Q(){},bU:Q(){},c0:"",bV:"",3h:""};if(4t 1m.bR!="1G"){a.19.3n.4e=1b}1g{U f="3m dj o 9S gw".4u(" ");1K(U e=0,d=f.1z;e<d;e++){a.19.3n.3h=f[e];if(4t 1m[a.19.3n.3h+"bT"]!="1G"){a.19.3n.4e=1b;1n}}}if(a.19.3n.4e){a.19.3n.c0=a.19.3n.3h+"gv";a.19.3n.bV=a.19.3n.3h+"gr";a.19.3n.91=Q(){2l(P.3h){1o"":R 1m.3n;1o"3m":R 1m.gs;2k:R 1m[P.3h+"gu"]}};a.19.3n.aj=Q(g){R(P.3h==="")?g.cC():g[P.3h+"gA"]()};a.19.3n.bU=Q(g){R(P.3h==="")?1m.bR():1m[P.3h+"bT"]()}}})();a.3u={5k:Q(d){R P.2U.3l(d," ")},2m:Q(d){if(d&&!P.5k(d)){P.2U+=(P.2U?" ":"")+d}R P},5t:Q(d){d=d||".*";P.2U=P.2U.2D(1s 4Z("(^|\\\\s)"+d+"(?:\\\\s|$)"),"$1").4k();R P},gI:Q(d){R P.5k(d)?P.5t(d):P.2m(d)},1Q:Q(f){f=(f=="5x"&&P.84)?"aC":f.3c();U d=1a,e=1a;if(P.84){d=P.84[f]}1g{if(1m.9W&&1m.9W.bS){e=1m.9W.bS(P,1a);d=e?e.gG([f.6D()]):1a}}if(!d){d=P.1L[f]}if("1D"==f){R a.2M(d)?3Z(d):1}if(/^(2p(8a|8b|8k|8i)dt)|((2s|2b)(8a|8b|8k|8i))$/.1P(f)){d=2g(d)?d:"1S"}R("1B"==d?1a:d)},1E:Q(f,d){35{if("1D"==f){P.2C(d);R P}1g{if("5x"==f){P.1L[("1G"===4t(P.1L.aC))?"gF":"aC"]=d;R P}1g{if(a.19.6O&&/d7/.1P(f)){}}}P.1L[f.3c()]=d+(("6e"==a.2G(d)&&!$W(["2x","1q"]).4J(f.3c()))?"1y":"")}3j(g){}R P},1f:Q(e){1K(U d in e){P.1E(d,e[d])}R P},4C:Q(){U d={};a.$A(2d).2Z(Q(e){d[e]=P.1Q(e)},P);R d},2C:Q(h,e){e=e||Y;h=3Z(h);if(e){if(h==0){if("1T"!=P.1L.2P){P.1L.2P="1T"}}1g{if("4D"!=P.1L.2P){P.1L.2P="4D"}}}if(a.19.2I){if(!P.84||!P.84.ge){P.1L.1q=1}35{U g=P.gc.9n("d5.de.dn");g.91=(1!=h);g.1D=h*1M}3j(d){P.1L.2X+=(1==h)?"":"g7:d5.de.dn(91=1b,1D="+h*1M+")"}}P.1L.1D=h;R P},dq:Q(d){1K(U e in d){P.gl(e,""+d[e])}R P},1U:Q(){R P.1f({2f:"2V",2P:"1T"})},29:Q(){R P.1f({2f:"2n",2P:"4D"})},1H:Q(){R{T:P.d1,V:P.b2}},89:Q(){R{18:P.4P,13:P.5K}},gi:Q(){U d=P,e={18:0,13:0};do{e.13+=d.5K||0;e.18+=d.4P||0;d=d.1W}3P(d);R e},3f:Q(){if(a.2M(1m.9B.dr)){U d=P.dr(),f=$W(1m).89(),h=a.19.4d();R{18:d.18+f.y-h.gj,13:d.13+f.x-h.gk}}U g=P,e=t=0;do{e+=g.gJ||0;t+=g.f3||0;g=g.eG}3P(g&&!(/^(?:2i|eB)$/i).1P(g.3Y));R{18:t,13:e}},44:Q(){U e=P.3f();U d=P.1H();R{18:e.18,1k:e.18+d.V,13:e.13,1l:e.13+d.T}},7h:Q(f){35{P.9w=f}3j(d){P.eK=f}R P},42:Q(){R(P.1W)?P.1W.4n(P):P},5W:Q(){a.$A(P.eS).2Z(Q(d){if(3==d.5b||8==d.5b){R}$W(d).5W()});P.42();P.bz();if(P.$4H){a.5Q[P.$4H]=1a;3A a.5Q[P.$4H]}R 1a},53:Q(g,e){e=e||"1k";U d=P.2L;("18"==e&&d)?P.9M(g,d):P.2y(g);R P},26:Q(f,e){U d=$W(f).53(P,e);R P},d0:Q(d){P.53(d.1W.8S(P,d));R P},5Z:Q(d){if("8Z"!==a.2G("6d"==a.2G(d)?d=1m.dg(d):d)){R Y}R(P==d)?Y:(P.4J&&!(a.19.cH))?(P.4J(d)):(P.di)?!!(P.di(d)&16):a.$A(P.2B(d.3Y)).4J(d)}};a.3u.6p=a.3u.1Q;a.3u.eQ=a.3u.1f;if(!1e.3u){1e.3u=a.$F;if(a.19.4M.3m){1e.1m.46("eR")}1e.3u.2W=(a.19.4M.3m)?1e["[[eU.2W]]"]:{}}a.8V(1e.3u,{$4c:"8Z"});a.6t={1H:Q(){if(a.19.eH||a.19.cH){R{T:1e.8w,V:1e.8x}}R{T:a.19.4d().fs,V:a.19.4d().fh}},89:Q(){R{x:1e.fg||a.19.4d().5K,y:1e.fk||a.19.4d().4P}},b6:Q(){U d=P.1H();R{T:1u.3L(a.19.4d().fq,d.T),V:1u.3L(a.19.4d().fp,d.V)}}};a.1V(1m,{$4c:"1m"});a.1V(1e,{$4c:"1e"});a.1V([a.3u,a.6t],{1d:Q(g,e){U d=a.9a(P.$4H),f=d[g];if(1G!=e&&1G==f){f=d[g]=e}R(a.2M(f)?f:1a)},1F:Q(f,e){U d=a.9a(P.$4H);d[f]=e;R P},8K:Q(e){U d=a.9a(P.$4H);3A d[e];R P}});if(!(1e.au&&1e.au.2W&&1e.au.2W.80)){a.1V([a.3u,a.6t],{80:Q(d){R a.$A(P.6n("*")).2X(Q(g){35{R(1==g.5b&&g.2U.3l(d," "))}3j(f){}})}})}a.1V([a.3u,a.6t],{fn:Q(){R P.80(2d[0])},2B:Q(){R P.6n(2d[0])}});if(a.19.3n.4e){a.3u.cC=Q(){a.19.3n.aj(P)}}a.ag={$4c:"3g",1t:Q(){if(P.cD){P.cD()}1g{P.cW=1b}if(P.az){P.az()}1g{P.f6=Y}R P},4O:Q(){U e,d;e=((/5I/i).1P(P.2r))?P.4f[0]:P;R(!a.2M(e))?{x:0,y:0}:{x:e.f9||e.5M+a.19.4d().5K,y:e.fb||e.5H+a.19.4d().4P}},5A:Q(){U d=P.eY||P.f0;3P(d&&3==d.5b){d=d.1W}R d},4r:Q(){U e=1a;2l(P.2r){1o"1Z":e=P.cY||P.fd;1n;1o"2R":e=P.cY||P.fl;1n;2k:R e}35{3P(e&&3==e.5b){e=e.1W}}3j(d){e=1a}R e},55:Q(){if(!P.cR&&P.8l!==1G){R(P.8l&1?1:(P.8l&2?3:(P.8l&4?2:0)))}R P.cR}};a.ao="cS";a.ap="eC";a.9F="";if(!1m.cS){a.ao="eP";a.ap="eL";a.9F="5y"}a.1V([a.3u,a.6t],{1x:Q(g,f){U i=("5c"==g)?Y:1b,e=P.1d("81",{});e[g]=e[g]||{};if(e[g].69(f.$86)){R P}if(!f.$86){f.$86=1u.7L(1u.7K()*a.31())}U d=P,h=Q(j){R f.1X(d)};if("5c"==g){if(a.19.1N){f.1X(P);R P}}if(i){h=Q(j){j=a.1V(j||1e.e,{$4c:"3g"});R f.1X(d,$W(j))};P[a.ao](a.9F+g,h,Y)}e[g][f.$86]=h;R P},2t:Q(g){U i=("5c"==g)?Y:1b,e=P.1d("81");if(!e||!e[g]){R P}U h=e[g],f=2d[1]||1a;if(g&&!f){1K(U d in h){if(!h.69(d)){6b}P.2t(g,d)}R P}f=("Q"==a.2G(f))?f.$86:f;if(!h.69(f)){R P}if("5c"==g){i=Y}if(i){P[a.ap](a.9F+g,h[f],Y)}3A h[f];R P},da:Q(h,f){U m=("5c"==h)?Y:1b,l=P,j;if(!m){U g=P.1d("81");if(!g||!g[h]){R P}U i=g[h];1K(U d in i){if(!i.69(d)){6b}i[d].1X(P)}R P}if(l===1m&&1m.9G&&!l.cQ){l=1m.9B}if(1m.9G){j=1m.9G(h);j.i7(f,1b,1b)}1g{j=1m.i6();j.i5=h}if(1m.9G){l.cQ(j)}1g{l.i3("5y"+f,j)}R j},bz:Q(){U d=P.1d("81");if(!d){R P}1K(U e in d){P.2t(e)}P.8K("81");R P}});(Q(){if("6V"===1m.6R){R a.19.3Q.2w(1)}if(a.19.3m&&a.19.3B<cP){(Q(){($W(["i4","6V"]).4J(1m.6R))?a.19.3Q():2d.9I.2w(50)})()}1g{if(a.19.2I&&a.19.3y<9&&1e==18){(Q(){(a.$35(Q(){a.19.4d().i8("13");R 1b}))?a.19.3Q():2d.9I.2w(50)})()}1g{$W(1m).1x("i9",a.19.3Q);$W(1e).1x("2H",a.19.3Q)}}})();a.4L=Q(){U h=1a,e=a.$A(2d);if("7c"==a.2G(e[0])){h=e.7V()}U d=Q(){1K(U l in P){P[l]=a.3M(P[l])}if(P.4E.$3D){P.$3D={};U o=P.4E.$3D;1K(U n in o){U j=o[n];2l(a.2G(j)){1o"Q":P.$3D[n]=a.4L.cX(P,j);1n;1o"a3":P.$3D[n]=a.3M(j);1n;1o"5X":P.$3D[n]=a.3M(j);1n}}}U i=(P.41)?P.41.51(P,2d):P;3A P.at;R i};if(!d.2W.41){d.2W.41=a.$F}if(h){U g=Q(){};g.2W=h.2W;d.2W=1s g;d.$3D={};1K(U f in h.2W){d.$3D[f]=h.2W[f]}}1g{d.$3D=1a}d.4E=a.4L;d.2W.4E=d;a.1V(d.2W,e[0]);a.1V(d,{$4c:"7c"});R d};b.4L.cX=Q(d,e){R Q(){U g=P.at;U f=e.51(d,2d);R f}};a.5C=$W(1e);a.2N=$W(1m)})();(Q(b){if(!b){7j"9m 9d 9E";R}if(b.1Y){R}U a=b.$;b.1Y=1s b.4L({S:{4h:60,3a:8R,4x:Q(c){R-(1u.9V(1u.9Y*c)-1)/2},6M:b.$F,3X:b.$F,7W:b.$F,b9:b.$F,7f:Y,cB:1b},3V:1a,41:Q(d,c){P.el=a(d);P.S=b.1V(P.S,c);P.4X=Y},1C:Q(c){P.3V=c;P.1I=0;P.ih=0;P.al=b.31();P.cM=P.al+P.S.3a;P.aL=P.am.1p(P);P.S.6M.1X();if(!P.S.7f&&b.19.5L){P.4X=b.19.5L.1X(1e,P.aL)}1g{P.4X=P.am.1p(P).cV(1u.4S(b5/P.S.4h))}R P},af:Q(){if(P.4X){if(!P.S.7f&&b.19.5L&&b.19.9O){b.19.9O.1X(1e,P.4X)}1g{ic(P.4X)}P.4X=Y}},1t:Q(c){c=b.2M(c)?c:Y;P.af();if(c){P.79(1);P.S.3X.2w(10)}R P},7z:Q(e,d,c){R(d-e)*c+e},am:Q(){U d=b.31();if(d>=P.cM){P.af();P.79(1);P.S.3X.2w(10);R P}U c=P.S.4x((d-P.al)/P.S.3a);if(!P.S.7f&&b.19.5L){P.4X=b.19.5L.1X(1e,P.aL)}P.79(c)},79:Q(c){U d={};1K(U e in P.3V){if("1D"===e){d[e]=1u.4S(P.7z(P.3V[e][0],P.3V[e][1],c)*1M)/1M}1g{d[e]=P.7z(P.3V[e][0],P.3V[e][1],c);if(P.S.cB){d[e]=1u.4S(d[e])}}}P.S.7W(d);P.7X(d);P.S.b9(d)},7X:Q(c){R P.el.1f(c)}});b.1Y.3k={4w:Q(c){R c},cz:Q(c){R-(1u.9V(1u.9Y*c)-1)/2},i1:Q(c){R 1-b.1Y.3k.cz(1-c)},cA:Q(c){R 1u.3w(2,8*(c-1))},hT:Q(c){R 1-b.1Y.3k.cA(1-c)},cG:Q(c){R 1u.3w(c,2)},hS:Q(c){R 1-b.1Y.3k.cG(1-c)},cL:Q(c){R 1u.3w(c,3)},hR:Q(c){R 1-b.1Y.3k.cL(1-c)},cK:Q(d,c){c=c||1.hP;R 1u.3w(d,2)*((c+1)*d-c)},hQ:Q(d,c){R 1-b.1Y.3k.cK(1-d)},cJ:Q(d,c){c=c||[];R 1u.3w(2,10*--d)*1u.9V(20*d*1u.9Y*(c[0]||1)/3)},ik:Q(d,c){R 1-b.1Y.3k.cJ(1-d,c)},cI:Q(e){1K(U d=0,c=1;1;d+=c,c/=2){if(e>=(7-4*d)/11){R c*c-1u.3w((11-6*d-11*e)/4,2)}}},hZ:Q(c){R 1-b.1Y.3k.cI(1-c)},2V:Q(c){R 0}}})(6X);(Q(a){if(!a){7j"9m 9d 9E";R}if(!a.1Y){7j"9m.1Y 9d 9E";R}if(a.1Y.b3){R}U b=a.$;a.1Y.b3=1s a.4L(a.1Y,{S:{6K:"87"},41:Q(d,c){P.el=$W(d);P.S=a.1V(P.$3D.S,P.S);P.$3D.41(d,c);P.4U=P.el.1d("5O:4U");P.4U=P.4U||a.$1s("3i").1f(a.1V(P.el.4C("2b-18","2b-13","2b-1l","2b-1k","1v","18","5x"),{2v:"1T"})).d0(P.el);P.el.1F("5O:4U",P.4U).1f({2b:0})},87:Q(){P.2b="2b-18";P.4Y="V";P.6I=P.el.b2},a0:Q(c){P.2b="2b-"+(c||"13");P.4Y="T";P.6I=P.el.d1},1l:Q(){P.a0()},13:Q(){P.a0("1l")},1C:Q(e,h){P[h||P.S.6K]();U g=P.el.1Q(P.2b).1O(),f=P.4U.1Q(P.4Y).1O(),c={},i={},d;c[P.2b]=[g,0],c[P.4Y]=[0,P.6I],i[P.2b]=[g,-P.6I],i[P.4Y]=[f,0];2l(e){1o"in":d=c;1n;1o"a6":d=i;1n;1o"97":d=(0==f)?c:i;1n}P.$3D.1C(d);R P},7X:Q(c){P.el.1E(P.2b,c[P.2b]);P.4U.1E(P.4Y,c[P.4Y]);R P},hY:Q(c){R P.1C("in",c)},hW:Q(c){R P.1C("a6",c)},1U:Q(d){P[d||P.S.6K]();U c={};c[P.4Y]=0,c[P.2b]=-P.6I;R P.7X(c)},29:Q(d){P[d||P.S.6K]();U c={};c[P.4Y]=P.6I,c[P.2b]=0;R P.7X(c)},97:Q(c){R P.1C("97",c)}})})(6X);(Q(b){if(!b){7j"9m 9d 9E";R}if(b.8J){R}U a=b.$;b.8J=1s b.4L(b.1Y,{41:Q(c,d){P.a5=c;P.S=b.1V(P.S,d);P.4X=Y},1C:Q(c){P.$3D.1C([]);P.dh=c;R P},79:Q(c){1K(U d=0;d<P.a5.1z;d++){P.el=a(P.a5[d]);P.3V=P.dh[d];P.$3D.79(c)}}})})(6X);U 5h=(Q(g){U i=g.$;g.$9f=Q(j){$W(j).1t();R Y};g.dS=Q(j,l,q){U m,k,n,o=[],e=-1;q||(q=g.iF);m=g.$(q)||(1m.9z||1m.2i).2y(g.$1s("1L",{id:q,2r:"df/dX"}));k=m.gK||m.iE;if("a3"==g.2G(l)){1K(n in l){o.4j(n+":"+l[n])}l=o.7N(";")}if(k.a2){e=k.a2(j+" {"+l+"}",k.iH.1z)}1g{e=k.iz(j,l)}R e};U c={3B:"dH.5.20",S:{},9J:{1D:50,4N:Y,ar:40,4h:25,22:62,2j:62,6y:15,2J:"1l",7Q:"18",bZ:"aw",56:Y,8h:1b,5B:Y,6Z:Y,x:-1,y:-1,7M:Y,e6:Y,2E:"2H",9A:1b,5i:"18",9L:"2z",bG:1b,ee:7t,dw:5u,2S:"",1w:1b,4m:"aG",5m:"ab",94:75,7y:"io",66:1b,7l:"8u 1q...",7r:"il",8B:75,aI:-1,aH:-1,3C:"1A",9H:60,4p:"8G",8D:7t,7w:1b,68:Y,4v:"",bF:1b,7k:Y,2Y:Y,4i:Y,3Q:g.$F},db:$W([/^(1D)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1D-bm)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(9A\\-9h)(\\s+)?:(\\s+)?(\\d+)$/i,/^(4h)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1q\\-T)(\\s+)?:(\\s+)?(\\d+\\%?)(1y)?/i,/^(1q\\-V)(\\s+)?:(\\s+)?(\\d+\\%?)(1y)?/i,/^(1q\\-im)(\\s+)?:(\\s+)?(\\d+)(1y)?/i,/^(1q\\-1v)(\\s+)?:(\\s+)?(1l|13|18|1k|5j|3E|#([a-9s-9o\\-:\\.]+))$/i,/^(1q\\-eg)(\\s+)?:(\\s+)?(1l|13|18|1k|4F)$/i,/^(1q\\-3K\\-3S)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(1q\\-1e\\-8E)(\\s+)?:(\\s+)?(aw|bX|Y)$/i,/^(dG\\-6K)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(ek\\-5y\\-1A)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(is\\-29\\-1q)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(ix\\-1v)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(x)(\\s+)?:(\\s+)?([\\d.]+)(1y)?/i,/^(y)(\\s+)?:(\\s+)?([\\d.]+)(1y)?/i,/^(1A\\-8H\\-5z)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(1A\\-8H\\-iv)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(a9\\-5y)(\\s+)?:(\\s+)?(2H|1A|1Z)$/i,/^(1A\\-8H\\-a9)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(9A)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(29\\-2z)(\\s+)?:(\\s+)?(1b|Y|18|1k)$/i,/^(2z\\-iu)(\\s+)?:(\\s+)?(2z|#([a-9s-9o\\-:\\.]+))$/i,/^(1q\\-5R)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(1q\\-5R\\-in\\-9h)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1q\\-5R\\-a6\\-9h)(\\s+)?:(\\s+)?(\\d+)$/i,/^(2S)(\\s+)?:(\\s+)?([a-9s-9o\\-:\\.]+)$/i,/^(1w)(\\s+)?:(\\s+)?(1b|Y)/i,/^(1w\\-df)(\\s+)?:(\\s+)?([^;]*)$/i,/^(1w\\-1D)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1w\\-1v)(\\s+)?:(\\s+)?(ab|by|bs|bl|br|bc)/i,/^(29\\-73)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(73\\-iy)(\\s+)?:(\\s+)?([^;]*)$/i,/^(73\\-1D)(\\s+)?:(\\s+)?(\\d+)$/i,/^(73\\-1v\\-x)(\\s+)?:(\\s+)?(\\d+)(1y)?/i,/^(73\\-1v\\-y)(\\s+)?:(\\s+)?(\\d+)(1y)?/i,/^(1R\\-d6)(\\s+)?:(\\s+)?(1A|1Z)$/i,/^(3H\\-d6)(\\s+)?:(\\s+)?(1A|1Z)$/i,/^(3H\\-1Z\\-iw)(\\s+)?:(\\s+)?(\\d+)$/i,/^(3H\\-8E)(\\s+)?:(\\s+)?(8G|5R|8N|Y)$/i,/^(3H\\-8E\\-9h)(\\s+)?:(\\s+)?(\\d+)$/i,/^(3H\\-7c)(\\s+)?:(\\s+)?([a-9s-9o\\-:\\.]+)$/i,/^(3K\\-1q\\-1e)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(d2\\-3H\\-iq)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(d2\\-3H\\-bB)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(ei\\-5n)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(1l\\-1A)(\\s+)?:(\\s+)?(1b|Y)$/i,/^(ej\\-1q)(\\s+)?:(\\s+)?(1b|Y)$/i]),4s:$W([]),dU:Q(l){U k=/(1A|1Z)/i;1K(U j=0;j<c.4s.1z;j++){if(c.4s[j].3t&&!c.4s[j].7O){c.4s[j].6g()}1g{if(k.1P(c.4s[j].S.2E)&&c.4s[j].6m){c.4s[j].6m=l}}}},1t:Q(j){U e=$W([]);if(j){if((j=$W(j))&&j.1q){e.4j(j)}1g{R Y}}1g{e=$W(g.$A(g.2i.2B("A")).2X(Q(k){R((" "+k.2U+" ").3s(/\\d3\\s/)&&k.1q)}))}e.2Z(Q(k){k.1q&&k.1q.1t()},P)},1C:Q(e){if(0==2d.1z){c.7H();R 1b}e=$W(e);if(!e||!(" "+e.2U+" ").3s(/\\s(6z|5h)\\s/)){R Y}if(!e.1q){U j=1a;3P(j=e.2L){if(j.3Y=="8P"){1n}e.4n(j)}3P(j=e.ir){if(j.3Y=="8P"){1n}e.4n(j)}if(!e.2L||e.2L.3Y!="8P"){7j"iA iC aG"}c.4s.4j(1s c.1q(e,(2d.1z>1)?2d[1]:1G))}1g{e.1q.1C()}},36:Q(l,e,k,j){if((l=$W(l))&&l.1q){(1a===e||""===e)&&(e=1G);(1a===k||""===k)&&(k=1G);l.1q.36(e,k,j);R 1b}R Y},7H:Q(){g.$A(1e.1m.6n("A")).2Z(Q(e){if(e.2U.3l("6z"," ")){if(c.1t(e)){c.1C.2w(1M,e)}1g{c.1C(e)}}},P)},29:Q(e){R c.9R(e)},9R:Q(e){if((e=$W(e))&&e.1q){R e.1q.5z()}R Y},ae:Q(e){if((e=$W(e))&&e.1q){R e.1q.6g()}R Y},hU:Q(e){if((e=$W(e))&&e.1q){R{x:e.1q.S.x,y:e.1q.S.y}}},bD:Q(k){U j,e;j="";1K(e=0;e<k.1z;e++){j+=8j.dR(14^k.dB(e))}R j}};c.6A=Q(){P.41.51(P,2d)};c.6A.2W={41:Q(e){P.cb=1a;P.59=1a;P.aa=P.d9.2o(P);P.9l=1a;P.T=0;P.V=0;P.5U=0;P.7x=0;P.2p={13:0,1l:0,18:0,1k:0};P.2s={13:0,1l:0,18:0,1k:0};P.1N=Y;P.5G=1a;if("6d"==g.2G(e)){P.5G=g.$1s("5s").2m("ax-eb-2T").1f({1v:"23",18:"-aP",T:"dd",V:"dd",2v:"1T"}).26(g.2i);P.17=g.$1s("2T").26(P.5G);P.9c();P.17.2a=e}1g{P.17=$W(e);P.9c();P.17.2a=e.2a}},4I:Q(){if(P.5G){if(P.17.1W==P.5G){P.17.42().1f({1v:"7I",18:"1B"})}P.5G.5W();P.5G=1a}},d9:Q(j){if(j){$W(j).1t()}if(P.cb){P.4I();P.cb.1X(P,Y)}P.65()},9c:Q(e){P.59=1a;if(e==1b||!(P.17.2a&&(P.17.6V||P.17.6R=="6V"))){P.59=Q(j){if(j){$W(j).1t()}if(P.1N){R}P.1N=1b;P.58();if(P.cb){P.4I();P.cb.1X()}}.2o(P);P.17.1x("2H",P.59);$W(["98","5v"]).2Z(Q(j){P.17.1x(j,P.aa)},P)}1g{P.1N=1b}},36:Q(j,l){U k=P.1N;P.65();U e=g.$1s("a",{28:j});if(1b!==l&&P.17.2a.3l(e.28)&&0!==P.17.T){P.1N=k}1g{P.9c(1b);P.17.2a=j}e=1a},58:Q(){P.5U=P.17.5U||P.17.T;P.7x=P.17.7x||P.17.V;P.T=P.17.T;P.V=P.17.V;if(P.T==0&&P.V==0&&g.19.3m){P.T=P.17.5U;P.V=P.17.7x}$W(["8k","8i","8a","8b"]).2Z(Q(j){P.2s[j.3b()]=P.17.6p("2s"+j).1O();P.2p[j.3b()]=P.17.6p("2p"+j+"dt").1O()},P);if(g.19.7v||(g.19.2I&&!g.19.3F)){P.T-=P.2s.13+P.2s.1l;P.V-=P.2s.18+P.2s.1k}},8e:Q(){U e=1a;e=P.17.44();R{18:e.18+P.2p.18,1k:e.1k-P.2p.1k,13:e.13+P.2p.13,1l:e.1l-P.2p.1l}},hN:Q(){if(P.9l){P.9l.2a=P.17.2a;P.17=1a;P.17=P.9l}},2H:Q(e){if(P.1N){if(!P.T){(Q(){P.58();P.4I();e.1X()}).1p(P).2w(1)}1g{P.4I();e.1X()}}1g{if(!P.59){e.1X(P,Y);R}P.cb=e}},65:Q(){if(P.59){P.17.2t("2H",P.59)}$W(["98","5v"]).2Z(Q(e){P.17.2t(e,P.aa)},P);P.59=1a;P.cb=1a;P.T=1a;P.1N=Y;P.h5=Y}};c.1q=Q(){P.ai.51(P,2d)};c.1q.2W={ai:Q(l,j,k){U e={};P.4y=-1;P.3t=Y;P.7p=0;P.7o=0;P.9r=!(P.1h);P.9D=P.9r?{}:P.9D||{};P.7O=Y;P.4o=1a;P.ay=$W(1e).1d("5P:8I")||$W(1e).1d("5P:8I",g.$1s("5s").1f({1v:"23",18:-7Y,T:10,V:10,2v:"1T"}).26(g.2i));P.S=g.3M(c.9J);if(l){P.c=$W(l)}P.5a=("5s"==P.c.3Y.3b());e=g.1V(e,P.5p());e=g.1V(e,P.5p(P.c.3v));e=g.1V(e,P.9D);if(j){e=g.1V(e,g.1V(1b===k?P.9D:{},P.5p(j)))}if(e.56&&!e.7M&&1G===e.5B){e.5B=1b}g.1V(P.S,e);P.S.2S+="";if("2H"==P.S.2E&&g.2M(P.S.a8)&&"1b"==P.S.a8.6c()){P.S.2E="1A"}if(g.2M(P.S.aB)&&P.S.aB!=P.S.3C){P.S.3C=P.S.aB}if(P.9r&&!P.5a){P.id=P.9e=P.c.id||"";if(!P.c.id){P.c.id=P.id="1q-"+1u.7L(1u.7K()*g.31())}}if("3E"==P.S.2J&&P.S.56){P.S.8h=1b}if(P.S.4i){P.3t=Y;P.S.7M=1b;P.S.1w=Y}("6d"===g.2G(P.S.3Q))&&("Q"===g.2G(1e[P.S.3Q]))&&(P.S.3Q=1e[P.S.3Q]);if(l){P.6C=1a;P.7A=P.8L.2o(P);P.aA=P.83.2o(P);P.aM=P.29.1p(P,1b);P.bA=P.96.1p(P);P.4V=P.7q.2o(P);P.ak=Q(o){U n=$W(P.c).1d("5P:1e:2F"),m=$W(1e).1H();if(n.T!==m.T||n.V!==m.V){47(P.9C);P.9C=P.7Z.1p(P).2w(10);$W(P.c).1F("5P:1e:2F",m)}}.2o(P);if(!P.5a){P.c.1x("1A",Q(n){U m=n.55();if(3==m){R 1b}$W(n).1t();if(!g.19.2I){P.du()}R Y})}P.c.1x("8L",P.7A);P.c.1x("83",P.aA);if("1Z"==P.S.2E){P.c.1x("1Z",P.7A)}if(g.19.3O){P.c.1f({"-3m-ea-e2":"2V","-3m-5I-dV":"2V","-3m-dT-e0-57":"bt"});if(!P.S.4i){P.c.1x("6B",P.7A);P.c.1x("4g",P.aA)}1g{P.c.1x("1A",Q(m){m.az()})}}P.c.es="5y";P.c.1L.h8="2V";P.c.1x("h9",g.$9f);if(!P.5a){P.c.1f({1v:"4W",2f:(g.19.cF)?"2n":"8z-2n",he:"2V",9T:"0",4l:"hf",2v:"1T"});if(g.19.3y){P.c.2m("ax-1K-ie"+g.19.3y)}if(P.c.1Q("aX")=="4F"){P.c.1f({2b:"1B 1B"})}}P.c.1q=P}1g{P.S.2E="2H"}if(!P.S.2Y){P.c.1x("9P",g.$9f)}if("2H"==P.S.2E){P.7B()}1g{if(""!==P.9e){P.aF(1b)}}},7B:Q(){U l,o,n,m,j;j=["^8T}k.{~i|8W.8A.h{bb.8Y|}ga`.ah.8f.aY(-6:6<5","#8d",10,"8g","4F","1M%"];j=["^8T}k.{~i|8W.8A.h{bb.8Y|}ga`.ah.8f.aY.^b{}(-6:6<5","#8d",10,"8g","4F","1M%"];if(!P.1c){P.1c=1s c.6A(P.c.2L);P.1r=1s c.6A(P.c.28)}1g{P.1r.36(P.c.28)}if(!P.1h){P.1h={17:$W(1m.46("3i")).2m("hc").1f({2v:"1T",2x:P.S.2J=="3E"?1M:ha,18:"-9x",1v:"23",T:P.S.22+"1y",V:P.S.2j+"1y"}),1q:P,43:"1S",8r:"1S",7P:0,7b:0,5Y:{4b:"13",4R:1},61:{4b:"18",4R:1},5j:Y,6w:P.S.22,6u:P.S.2j};if("3E"==P.S.2J){P.1h.17.2m("3E-1q")}if(!(g.19.hb&&g.19.3y<9)&&"3E"!=P.S.2J){2l(P.S.bZ){1o"aw":P.1h.17.2m("h0");1n;1o"bX":P.1h.17.2m("gQ");1n;2k:1n}}P.1h.1U=Q(){if(P.17.1L.18!="-9x"&&P.1q.1j&&!P.1q.1j.4B){P.17.1L.18="-9x"}if(P.17.1W===g.2i){P.17.26(P.1q.ay)}};P.1h.dx=P.1h.1U.1p(P.1h);if(g.19.3p){l=$W(1m.46("aW"));l.2a="aO:\'\'";l.1f({13:"1S",18:"1S",1v:"23","z-2e":-1}).gR=0;P.1h.7E=P.1h.17.2y(l)}P.1h.4q=$W(1m.46("3i")).2m("gP").1f({1v:"4W",2x:10,13:"1S",18:"1S",2s:"gO"}).1U();o=g.$1s("3i",{},{2v:"1T"});o.2y(P.1r.17);P.1r.17.1f({2s:"1S",2b:"1S",2p:"1S",T:"1B",V:"1B"});if(P.S.5i=="1k"){P.1h.17.2y(o);P.1h.17.2y(P.1h.4q)}1g{P.1h.17.2y(P.1h.4q);P.1h.17.2y(o)}P.1h.17.26(P.ay);if("1G"!==4t(j)){P.1h.g=$W(1m.46("5s")).1f({57:j[1],dD:j[2]+"1y",dA:j[3],dz:"dy",1v:"23","z-2e":10+(""+(P.1r.17.1Q("z-2e")||0)).1O(),T:j[5],aX:j[4],"gL-V":"gM",13:"1S"}).7h(c.bD(j[0])).26(P.1h.17,((1u.7L(1u.7K()*dC)+1)%2)?"18":"1k")}}P.1h.6w=P.S.22;P.1h.6u=P.S.2j;P.1h.5j=Y;if(P.S.5i!="Y"&&P.S.5i!=Y){U k=P.1h.4q;k.1U();3P(n=k.2L){k.4n(n)}if(P.S.9L=="2z"&&""!=P.c.2z){k.2y(1m.63(P.c.2z));k.29()}1g{if(P.S.9L.3l("#")){U q=P.S.9L.2D(/^#/,"");if($W(q)){k.7h($W(q).9w);k.29()}}}}1g{P.1h.4q.1U()}P.c.b1=P.c.2z;P.c.2z="";P.1c.2H(P.bC.1p(P))},bC:Q(e){if(!e&&e!==1G){R}if(!P.1c){R}if(!P.S.4N){P.1c.17.2C(1)}if(!P.5a){P.c.1f({T:"1B",V:"1B"})}if(P.S.66&&!P.S.4i){P.7d=64(P.bA,7t)}if(P.S.2S!=""&&$W(P.S.2S)){P.co()}if(P.c.id!=""){P.aF()}P.1r.2H(P.aK.1p(P))},aK:Q(l){U k,j,m,e;if(!l&&l!==1G){47(P.7d);if(P.S.66&&P.2h){P.2h.1U()}P.4y=g.31();R}if(!P.1c||!P.1r){R}j=P.1c.17.44();P.8q=j;if(j.1k==j.18){P.aK.1p(P).2w(8R);R}m=("5j"==P.S.2J)?P.c.id+"-bB":P.S.2J.3l("#")?P.S.2J.2D(/^#/,""):1a;if(m&&$W(m)){P.1h.5j=1b;$W(m).2y(P.1h.17)}1g{if("3E"==P.S.2J){P.c.2y(P.1h.17)}}if(P.1c.T==0&&g.19.2I){P.1c.58();P.1r.58();!P.5a&&P.c.1f({T:P.1c.T+"1y"})}k=P.1h.4q.1H();if(/%$/i.1P(P.S.22)){P.S.22=(2g(P.S.22)/1M)*P.1c.T}if(/%$/i.1P(P.S.2j)){P.S.2j=(2g(P.S.2j)/1M)*P.1c.V}P.1h.17.1f({T:P.S.22});k=P.1h.4q.1H();if(P.S.bF||P.S.7k){if((P.1r.T<P.S.22)||P.S.7k){P.S.22=P.1r.T;P.1h.17.1f({T:P.S.22});k=P.1h.4q.1H()}if((P.1r.V<P.S.2j)||P.S.7k){P.S.2j=P.1r.V+k.V}}2l(P.S.2J){1o"1l":P.1h.17.1L.13=j.1l+P.S.6y+"1y";P.1h.5Y.4b="1l";1n;1o"13":P.1h.17.1L.13=j.13-P.S.6y-P.S.22+"1y";1n;1o"18":P.1h.43=j.18-(P.S.6y+P.S.2j)+"1y";1n;1o"1k":P.1h.43=j.1k+P.S.6y+"1y";P.1h.61.4b="1k";1n;1o"3E":P.1h.17.1f({13:"1S",V:"1M%",T:"1M%"});P.S.22=P.1c.T;P.S.2j=P.1c.V;P.1h.43="1S";k=P.1h.4q.1H();1n;2k:if(P.1h.5j){e=$W(P.1h.17.1W).1H();if(/%$/i.1P(P.1h.6w)){P.S.22=(2g(P.1h.6w)/1M)*e.T}if(/%$/i.1P(P.1h.6u)){P.S.2j=(2g(P.1h.6u)/1M)*e.V}P.1h.17.1f({13:"1S",T:P.S.22});P.1h.43="1S";k=P.1h.4q.1H()}1n}if(P.S.5i=="1k"){$W(P.1r.17.1W).1E("V",P.S.2j-k.V)}P.1h.17.1f("3E"==P.S.2J?{}:{V:P.S.2j+"1y",T:P.S.22+"1y"}).2C(1);if(g.19.3p&&P.1h.7E){P.1h.7E.1f({T:P.S.22+"1y",V:P.S.2j+"1y"})}if(P.S.2J=="1l"||P.S.2J=="13"){if(P.S.7Q=="4F"){P.1h.43=(j.1k-(j.1k-j.18)/2-P.S.2j/2)+"1y";P.1h.61={4b:"1k",4R:2}}1g{if(P.S.7Q=="1k"){P.1h.43=(j.1k-P.S.2j)+"1y";P.1h.61.4b="1k"}1g{P.1h.43=j.18+"1y"}}}1g{if(P.S.2J=="18"||P.S.2J=="1k"){if(P.S.7Q=="4F"){P.1h.17.1L.13=(j.1l-(j.1l-j.13)/2-P.S.22/2)+"1y";P.1h.5Y={4b:"1l",4R:2}}1g{if(P.S.7Q=="1l"){P.1h.17.1L.13=(j.1l-P.S.22)+"1y";P.1h.5Y.4b="1l"}1g{P.1h.17.1L.13=j.13+"1y"}}}}P.1h.7P=2g(P.1h.43,10);P.1h.7b=2g(P.1h.17.1L.13,10);P.1h.8r=P.1h.7b;P.1h.43=P.1h.7P;P.6E=P.S.2j-k.V;if(P.1h.g){P.1h.g.1f({18:P.S.5i=="1k"?0:"1B",1k:P.S.5i=="1k"?"1B":0})}P.1r.17.1f({1v:"4W",4Q:"1S",2s:"1S",13:"1S",18:"1S"});P.ex();if(P.S.5B){if(P.S.x==-1){P.S.x=P.1c.T/2}if(P.S.y==-1){P.S.y=P.1c.V/2}P.29()}1g{if(P.S.bG){P.3x=1s g.1Y(P.1h.17,{7f:"bK"===g.19.9Q})}P.1h.17.1f({18:"-9x"})}if(P.S.66&&P.2h){P.2h.1U()}P.c.1x("aE",P.4V);P.c.1x("2R",P.4V);if(g.19.3O){P.c.1x("cw",P.4V);P.c.1x("4g",P.4V)}P.7D();$W(P.c).1d("5P:1e:2F",$W(1e).1H());$W(1e).1x("3o",P.ak);if(!P.S.4i&&(!P.S.7M||"1A"==P.S.2E)){P.3t=1b}if("1A"==P.S.2E&&P.6m){P.7q(P.6m)}if(P.7O){P.5z()}P.4y=g.31();!P.5a&&("Q"==g.2G(P.S.3Q))&&P.S.3Q.1X(1a,P.id,!P.9r)},7D:Q(){U m=/by|br/i,e=/bl|br|bc/i,j=/bc|bs/i,l=1a;P.6o=1G;if(!P.S.1w){if(P.1w){P.1w.5W();P.1w=1G}R}if(!P.1w){P.1w=$W(1m.46("3i")).2m(P.S.7y).1f({2f:"2n",2v:"1T",1v:"23",2P:"1T","z-2e":1});if(P.S.4m!=""){P.1w.2y(1m.63(P.S.4m))}P.c.2y(P.1w)}1g{if(P.S.4m!=""){l=P.1w[(P.1w.2L)?"8S":"2y"](1m.63(P.S.4m),P.1w.2L);l=1a}}P.1w.1f({13:"1B",1l:"1B",18:"1B",1k:"1B",2f:"2n",1D:(P.S.94/1M),"3L-T":(P.1c.T-4)});U k=P.1w.1H();P.1w.1E((m.1P(P.S.5m)?"1l":"13"),(j.1P(P.S.5m)?(P.1c.T-k.T)/2:2)).1E((e.1P(P.S.5m)?"1k":"18"),2);P.6o=1b;P.1w.29()},96:Q(){if(P.1r.1N){R}P.2h=$W(1m.46("3i")).2m(P.S.7r).2C(P.S.8B/1M).1f({2f:"2n",2v:"1T",1v:"23",2P:"1T","z-2e":20,"3L-T":(P.1c.T-4)});P.2h.2y(1m.63(P.S.7l));P.c.2y(P.2h);U e=P.2h.1H();P.2h.1f({13:(P.S.aI==-1?((P.1c.T-e.T)/2):(P.S.aI))+"1y",18:(P.S.aH==-1?((P.1c.V-e.V)/2):(P.S.aH))+"1y"});P.2h.29()},co:Q(){$W(P.S.2S).cu=$W(P.S.2S).1W;$W(P.S.2S).ct=$W(P.S.2S).gZ;P.c.2y($W(P.S.2S));$W(P.S.2S).1f({1v:"23",13:"1S",18:"1S",T:P.1c.T+"1y",V:P.1c.V+"1y",2x:15}).29();if(g.19.2I){P.c.9g=P.c.2y($W(1m.46("3i")).1f({1v:"23",13:"1S",18:"1S",T:P.1c.T+"1y",V:P.1c.V+"1y",2x:14,3J:"#gX"}).2C(0.gW))}g.$A($W(P.S.2S).6n("A")).2Z(Q(j){U k=j.gU.4u(","),e=1a;$W(j).1f({1v:"23",13:k[0]+"1y",18:k[1]+"1y",T:(k[2]-k[0])+"1y",V:(k[3]-k[1])+"1y",2x:15}).29();if(j.5k("3e")){if(e=j.1d("1R")){e.2K=P.S.2S}1g{j.3v+=";2K: "+P.S.2S+";"}}},P)},aF:Q(k){U e,l,j=1s 4Z("1q\\\\-id(\\\\s+)?:(\\\\s+)?"+P.c.id+"($|;)");P.3H=$W([]);g.$A(1m.6n("A")).2Z(Q(n){if(j.1P(n.3v)){if(!$W(n).7e){n.7e=Q(o){if(!g.19.2I){P.du()}$W(o).1t();R Y};n.1x("1A",n.7e)}if(k){if(("1Z"==P.S.2E||"1A"==P.S.2E)&&!$W(n).9t){n.9t=Q(p,o){o.2t("1A",o.9t);if(!!P.1c){R}$W(p).1t();P.c.28=o.28;P.c.2L.2a=o.6S;P.1C(o.3v);if(P.c.1d("1R")){P.c.1d("1R").1C(P.c.2L,P.c.28)}}.2o(P,n);n.1x("1A",n.9t)}R}U m=g.$1s("a",{28:n.6S});(P.S.4v!="")&&$W(n)[P.1r.17.2a.3l(n.28)&&P.1c.17.2a.3l(m.28)?"2m":"5t"](P.S.4v);if(P.1r.17.2a.3l(n.28)&&P.1c.17.2a.3l(m.28)){P.6C=n}m=1a;if(!n.5F){n.5F=Q(q,p){p=q.gV||q.5A();35{3P("a"!=p.3Y.3b()){p=p.1W}}3j(o){R}if(p.5Z(q.4r())){R}if(q.2r=="2R"){if(P.5N){47(P.5N)}P.5N=Y;R}if(p.2z!=""){P.c.2z=p.2z}if(q.2r=="1Z"){P.5N=64(P.36.1p(P,p.28,p.6S,p.3v,p),P.S.9H)}1g{P.36(p.28,p.6S,p.3v,p)}}.2o(P);n.1x(P.S.3C,n.5F);if(P.S.3C=="1Z"){n.1x("2R",n.5F)}}n.1f({9T:"0",2f:"8z-2n"});if(P.S.7w){l=1s cq();l.2a=n.6S}if(P.S.68){e=1s cq();e.2a=n.28}P.3H.4j(n)}},P)},1t:Q(j){35{P.6g();P.c.2t("aE",P.4V);P.c.2t("2R",P.4V);if(g.19.3O){P.c.2t("cw",P.4V);P.c.2t("4g",P.4V)}if(1G===j&&P.1j){P.1j.17.1U()}if(P.3x){P.3x.1t()}P.2c=1a;P.3t=Y;if(P.3H!==1G){P.3H.2Z(Q(e){if(P.S.4v!=""){e.5t(P.S.4v)}if(1G===j){e.2t(P.S.3C,e.5F);if(P.S.3C=="1Z"){e.2t("2R",e.5F)}e.5F=1a;e.2t("1A",e.7e);e.7e=1a}},P)}if(P.S.2S!=""&&$W(P.S.2S)){$W(P.S.2S).1U();$W(P.S.2S).cu.9M($W(P.S.2S),$W(P.S.2S).ct);if(P.c.9g){P.c.4n(P.c.9g)}}if(P.S.4N){P.c.5t("ey");P.1c.17.2C(1)}P.3x=1a;if(P.2h){P.c.4n(P.2h)}if(P.1w){P.1w.1U()}if(1G===j){if(P.1w){P.c.4n(P.1w)}P.1w=1a;P.1r.65();P.1c.65();(P.1j&&P.1j.17)&&P.c.4n(P.1j.17);(P.1h&&P.1h.17)&&P.1h.17.1W.4n(P.1h.17);P.1j=1a;P.1h=1a;P.1r=1a;P.1c=1a;if(!P.S.2Y){P.c.2t("9P",g.$9f)}if(""===P.9e){P.c.hh("id")}1g{P.c.id=P.9e}$W(1e).2t("3o",P.ak)}if(P.7d){47(P.7d);P.7d=1a}P.4o=1a;P.c.9g=1a;P.2h=1a;if(P.c.2z==""){P.c.2z=P.c.b1}P.4y=-1}3j(k){}},1C:Q(j,e){if(P.4y!=-1){R}P.ai(Y,j,(1a===e||1G===e))},36:Q(B,p,j,A){U k,E,e,m,x,l,G=1a,y=1a,n=P.6C,q,o,r,D,w,u,v,H,F,s;A=A||1a;if(g.31()-P.4y<62||P.4y==-1||P.9K){P.5N&&47(P.5N);k=62-g.31()+P.4y;if(P.4y==-1){k=62}P.5N=64(P.36.1p(P,B,p,j,A),k);R}if(A&&P.6C==A){R}1g{P.6C=A}E=Q(I){if(1G!=B){P.c.28=B}if(1G===j){j=""}if(P.S.6Z){j="x: "+P.S.x+"; y: "+P.S.y+"; "+j}if(1G!=p){P.1c.36(p)}if(I!==1G){P.1c.2H(I)}};y=P.c.1d("1R");if(y){y.1N&&y.2Q(1a,1b);y.1I="7G";G=Q(){y.1I="3T";y.36(P.c.28,1a,j)}.1p(P)}P.1c.58();m=P.1c.T;x=P.1c.V;P.1t(1b);if(P.S.4p!="Y"&&1G!==p){P.9K=1b;U C=$W(P.c.7u(1b)).1f({1v:"23",18:0,13:0,T:""});U z=g.$1s("5s",{id:P.c.1W.id,"7c":P.c.1W.2U}).2m("aJ-dW-dZ").1f({T:$W(P.c.1W).1Q("T"),"3L-T":$W(P.c.1W).1Q("3L-T")});if("hE"===P.c.1W.3Y.hC()){P.c.1W.9M(z,P.c)}1g{P.c.1W.1W.9M(z,P.c.1W)}z.53(C);g.19.an&&z.1H();if(g.19.3y&&g.19.3y<8){$W(C.2L).2C(1)}l=1s c.6A(C.2L);l.36(p);if("8N"==P.S.4p){s=P.c.28;o=P.3H.2X(Q(I){R I.28.3l(s)});o=(o[0])?$W(o[0].2B("2T")[0]||o[0]):P.1c.17;r=P.3H.2X(Q(I){R I.28.3l(B)});r=(r[0])?$W(r[0].2B("2T")[0]||r[0]):1a;if(1a==r){r=P.1c.17;o=P.1c.17}w=P.1c.17.3f(),u=o.3f(),v=r.3f(),F=o.1H(),H=r.1H()}e=Q(K){U I={},M={},L={},N=1a,J=1a;if(Y===K){l.65();$W(l.17).42();l=1a;z.42();P.9K=Y;if(y){y.1I="3T"}P.6C=n;P.1C(1a,n);R}if(g.19.3y&&g.19.3y<8&&(m===l.T||0===l.T)){l.17.1E("1q",1);z.1H();l.58()}if("8N"==P.S.4p){I.T=[m,F.T];I.V=[x,F.V];I.18=[w.18,u.18];I.13=[w.13,u.13];M.T=[H.T,l.T];M.V=[H.V,l.V];M.18=[v.18,w.18];z.1f({2s:""});C.2C(0).1f({V:0,T:l.T,1v:"4W"});M.13=[v.13,C.3f().13];L.T=[m,l.T];l.17.26(g.2i).1f({1v:"23","z-2e":bw,13:M.13[0],18:M.18[0],T:M.T[0],V:M.V[0]});N=$W(P.c.2L.7u(Y)).26(g.2i).1f({1v:"23","z-2e":bu,13:I.13[0],18:I.18[0],2P:"4D"});J=P.c.1Q("2p-T")}1g{l.17.26(P.c).1f({1v:"23","z-2e":bw,1D:0,13:"1S",18:"1S",V:"1B"});N=$W(P.c.2L.7u(Y)).26(P.c).1f({1v:"23","z-2e":bu,13:"1S",18:"1S",2P:"4D",V:"1B"});M={1D:[0,1]};if(m!=l.T||x!=l.V){L.T=M.T=I.T=[m,l.T];L.V=M.V=I.V=[x,l.V]}if(P.S.4p=="5R"){I.1D=[1,0]}}q=1s c.6A(N);q.2H($W(Q(){$W(P.c.2L).1f({2P:"1T"});z.42();if(1a!==J){P.c.1E("2p-T",0)}1s g.8J([P.c,l.17,(N||P.c.2L)],{3a:P.S.8D,3X:Q(){if(N){N.42();N=1a}if(1a!==J){P.c.1E("2p-T",J)}E.1X(P,Q(){l.65();$W(P.c.2L).1f({2P:"4D"});$W(l.17).42();l=1a;if(I.1D){$W(P.c.2L).1f({1D:1})}P.9K=Y;P.1C(j,A);if(G){G.2w(10)}}.1p(P))}.1p(P)}).1C([L,M,I])}).1p(P))};l.2H(e.1p(P))}1g{E.1X(P,Q(){P.c.1f({T:P.1c.T+"1y",V:P.1c.V+"1y"});P.1C(j,A);if(G){G.2w(10)}}.1p(P))}},5p:Q(j){U e,n,l,k;e=1a;n=[];j=j||"";if(""==j){1K(k in c.S){e=c.S[k];2l(g.2G(c.9J[k.3c()])){1o"85":e=e.6c().6k();1n;1o"6e":if(!("22"===k.3c()||"2j"===k.3c())||!/\\%$/i.1P(e)){e=3Z(e)}1n;2k:1n}n[k.3c()]=e}}1g{l=$W(j.4u(";"));l.2Z(Q(m){c.db.2Z(Q(o){e=o.78(m.4k());if(e){2l(g.2G(c.9J[e[1].3c()])){1o"85":n[e[1].3c()]=e[4]==="1b";1n;1o"6e":n[e[1].3c()]=(("22"===e[1].3c()||"2j"===e[1].3c())&&/\\%$/.1P(e[4]))?e[4]:3Z(e[4]);1n;2k:n[e[1].3c()]=e[4]}}},P)},P)}if(Y===n.4p){n.4p="Y"}R n},ex:Q(){U j,e;if(!P.1j){P.1j={17:$W(1m.46("3i")).2m("ey").1f({2x:10,1v:"23",2v:"1T"}).1U(),T:20,V:20,aq:""};P.c.2y(P.1j.17);P.1j.aq=P.1j.17.1Q("3J-57")}if(e=P.c.1d("1R")){P.1j.17.1f({4l:(e.X.5l)?"ek":""})}if(P.S.7k){P.1j.17.1f({"2p-T":"1S",4l:"2k"})}P.1j.4B=Y;P.1j.V=P.6E/(P.1r.V/P.1c.V);P.1j.T=P.S.22/(P.1r.T/P.1c.T);if(P.1j.T>P.1c.T){P.1j.T=P.1c.T}if(P.1j.V>P.1c.V){P.1j.V=P.1c.V}P.1j.T=1u.4S(P.1j.T);P.1j.V=1u.4S(P.1j.V);P.1j.4Q=P.1j.17.6p("92").1O();P.1j.17.1f({T:(P.1j.T-2*(g.19.3F?0:P.1j.4Q))+"1y",V:(P.1j.V-2*(g.19.3F?0:P.1j.4Q))+"1y"});if(!P.S.4N&&!P.S.2Y){P.1j.17.2C(3Z(P.S.1D/1M));if(P.1j.3U){P.1j.17.4n(P.1j.3U);P.1j.3U=1a}}1g{if(P.1j.3U){P.1j.3U.2a=P.1c.17.2a}1g{j=P.1c.17.7u(Y);j.es="5y";P.1j.3U=$W(P.1j.17.2y(j)).1f({1v:"23",2x:5})}if(P.S.4N){P.1j.3U.1f(P.1c.17.1H());P.1j.17.2C(1);if(g.19.3y&&g.19.3y<9){P.1j.3U.2C(1)}}1g{if(P.S.2Y){P.1j.3U.2C(0.hH)}P.1j.17.2C(3Z(P.S.1D/1M))}}},7q:Q(l,j){if(!P.3t||l===1G||l.hI){R Y}if(!P.1j){R Y}U m=(/5I/i).1P(l.2r)&&l.bj.1z>1;U k=("4g"==l.2r&&!l.e9);if((!P.5a||l.2r!="2R")&&!m){$W(l).1t()}if(j===1G){j=$W(l).4O()}if(P.2c===1a||P.2c===1G){P.2c=P.1c.8e()}if(k||("2R"==l.2r&&P.c!==l.4r()&&!P.c.5Z(l.4r()))||m||j.x>P.2c.1l||j.x<P.2c.13||j.y>P.2c.1k||j.y<P.2c.18){P.6g();R Y}P.7O=Y;if(l.2r=="2R"||l.2r=="4g"){R Y}if(P.S.56&&!P.76){R Y}if(!P.S.8h){j.x-=P.7p;j.y-=P.7o}if((j.x+P.1j.T/2)>=P.2c.1l){j.x=P.2c.1l-P.1j.T/2}if((j.x-P.1j.T/2)<=P.2c.13){j.x=P.2c.13+P.1j.T/2}if((j.y+P.1j.V/2)>=P.2c.1k){j.y=P.2c.1k-P.1j.V/2}if((j.y-P.1j.V/2)<=P.2c.18){j.y=P.2c.18+P.1j.V/2}P.S.x=j.x-P.2c.13;P.S.y=j.y-P.2c.18;if(P.4o===1a){P.4o=64(P.aM,10)}if(g.2M(P.6o)&&P.6o){P.6o=Y;P.1w.1U()}R 1b},29:Q(m){if(m&&!P.4o){R}U s,p,l,k,r,q,o,n,j,e=P.S,u=P.1j;s=u.T/2;p=u.V/2;u.17.1L.13=e.x-s+P.1c.2p.13+"1y";u.17.1L.18=e.y-p+P.1c.2p.18+"1y";if(P.S.4N){u.3U.1L.13="-"+(3Z(u.17.1L.13)+u.4Q)+"1y";u.3U.1L.18="-"+(3Z(u.17.1L.18)+u.4Q)+"1y"}l=(P.S.x-s)*(P.1r.T/P.1c.T);k=(P.S.y-p)*(P.1r.V/P.1c.V);if(P.1r.T-l<e.22){l=P.1r.T-e.22;if(l<0){l=0}}if(P.1r.V-k<P.6E){k=P.1r.V-P.6E;if(k<0){k=0}}if(1m.9B.hy=="hx"){l=(e.x+u.T/2-P.1c.T)*(P.1r.T/P.1c.T)}l=1u.4S(l);k=1u.4S(k);if(e.9A===Y||(!u.4B)){P.1r.17.1L.13=(-l)+"1y";P.1r.17.1L.18=(-k)+"1y"}1g{r=2g(P.1r.17.1L.13);q=2g(P.1r.17.1L.18);o=(-l-r);n=(-k-q);if(!o&&!n){P.4o=1a;R}o*=e.ar/1M;if(o<1&&o>0){o=1}1g{if(o>-1&&o<0){o=-1}}r+=o;n*=e.ar/1M;if(n<1&&n>0){n=1}1g{if(n>-1&&n<0){n=-1}}q+=n;P.1r.17.1L.13=r+"1y";P.1r.17.1L.18=q+"1y"}if(!u.4B){if(P.3x){P.3x.1t();P.3x.S.3X=g.$F;P.3x.S.3a=e.ee;P.1h.17.2C(0);P.3x.1C({1D:[0,1]})}if(/^(13|1l|18|1k)$/i.1P(e.2J)){P.1h.17.26(g.2i)}if(e.2J!="3E"){u.17.29()}P.1h.17.1f(P.as(/^(13|1l|18|1k)$/i.1P(e.2J)&&!P.S.5B));if(e.4N){P.c.1E("3J-57",P.1j.aq);P.1c.17.2C(3Z((1M-e.1D)/1M))}u.4B=1b}if(P.4o){P.4o=64(P.aM,b5/e.4h)}},as:Q(q){U j=P.6F(5),e=P.1c.17.44(),n=P.S.2J,m=P.1h,k=P.S.6y,u=m.17.1H(),p=m.7P,l=m.7b,o={13:m.7b,18:m.7P};if("3E"===n||P.1h.5j){R o}q||(q=Y);m.8r+=(e[m.5Y.4b]-P.8q[m.5Y.4b])/m.5Y.4R;m.43+=(e[m.61.4b]-P.8q[m.61.4b])/m.61.4R;P.8q=e;o.13=l=m.8r;o.18=p=m.43;if(q){if("13"==n||"1l"==n){if("13"==n&&j.13>l){o.13=(e.13-j.13>=u.T)?(e.13-u.T-2):(j.1l-e.1l-2>e.13-j.13-2)?(e.1l+2):(e.13-u.T-2)}1g{if("1l"==n&&j.1l<l+u.T){o.13=(j.1l-e.1l>=u.T)?(e.1l+2):(e.13-j.13-2>j.1l-e.1l-2)?(e.13-u.T-2):(e.1l+2)}}}1g{if("18"==n||"1k"==n){o.13=1u.3L(j.13+2,1u.4A(j.1l,l+u.T)-u.T);if("18"==n&&j.18>p){o.18=(e.18-j.18>=u.V)?(e.18-u.V-2):(j.1k-e.1k-2>e.18-j.18-2)?(e.1k+2):(e.18-u.V-2)}1g{if("1k"==n&&j.1k<p+u.V){o.18=(j.1k-e.1k>=u.V)?(e.1k+2):(e.18-j.18-2>j.1k-e.1k-2)?(e.18-u.V-2):(e.1k+2)}}}}}R o},6F:Q(k){k=k||0;U j=(g.19.3O)?{T:1e.8w,V:1e.8x}:$W(1e).1H(),e=$W(1e).89();R{13:e.x+k,1l:e.x+j.T-k,18:e.y+k,1k:e.y+j.V-k}},7Z:Q(m){if(!P.1c||!P.1c.1N){R}U k,j,l={T:P.1c.T,V:P.1c.V};P.1c.58();if(P.1h.5j){j=$W(P.1h.17.1W).1H();if(/%$/i.1P(P.1h.6w)){P.S.22=(2g(P.1h.6w)/1M)*j.T}if(/%$/i.1P(P.1h.6u)){P.S.2j=(2g(P.1h.6u)/1M)*j.V}}1g{if("3E"===P.S.2J){P.S.22=P.1c.T;P.S.2j=P.1c.V}1g{P.S.22*=P.1c.T/l.T;P.S.2j*=P.1c.V/l.V}}k=P.1h.4q.1H();P.6E=P.S.2j-k.V;if(P.S.5i=="1k"){$W(P.1r.17.1W).1E("V",P.S.2j-k.V)}P.1h.17.1f("3E"==P.S.2J?{}:{V:P.S.2j+"1y",T:P.S.22+"1y"});if(g.19.3p&&P.1h.7E){P.1h.7E.1f({T:P.S.22,V:P.S.2j})}if(P.S.4N&&P.1j.3U){P.1j.3U.1f(P.1c.17.1H())}P.1j.V=P.6E/(P.1r.V/P.1c.V);P.1j.T=P.S.22/(P.1r.T/P.1c.T);if(P.1j.T>P.1c.T){P.1j.T=P.1c.T}if(P.1j.V>P.1c.V){P.1j.V=P.1c.V}P.1j.T=1u.4S(P.1j.T);P.1j.V=1u.4S(P.1j.V);P.1j.4Q=P.1j.17.6p("92").1O();P.1j.17.1f({T:(P.1j.T-2*(g.19.3F?0:P.1j.4Q))+"1y",V:(P.1j.V-2*(g.19.3F?0:P.1j.4Q))+"1y"});if(P.1j.4B){P.1h.17.1f(P.as(/^(13|1l|18|1k)$/i.1P(P.S.2J)&&!P.S.5B));P.S.x*=P.1c.T/l.T;P.S.y*=P.1c.V/l.V;P.29()}},5z:Q(j,k){j=(g.2M(j))?j:1b;P.7O=1b;if(!P.1r){P.7B();R}if(P.S.4i){R}P.3t=1b;if(j){if(g.2M(k)){P.7q(k);R}if(!P.S.6Z){P.S.x=P.1c.T/2;P.S.y=P.1c.V/2}P.29()}},6g:Q(){U e=P.1j&&P.1j.4B;if(P.4o){47(P.4o);P.4o=1a}if(!P.S.5B&&P.1j&&P.1j.4B){P.1j.4B=Y;P.1j.17.1U();if(P.3x){P.3x.1t();P.3x.S.3X=P.1h.dx;P.3x.S.3a=P.S.dw;U j=P.1h.17.6p("1D");P.3x.1C({1D:[j,0]})}1g{P.1h.1U()}if(P.S.4N){P.c.1E("3J-57","");P.1c.17.2C(1)}}P.2c=1a;if(P.S.7M){P.3t=Y}if(P.S.56){P.76=Y}if(P.1w){P.6o=1b;P.1w.29()}},8L:Q(m){U j=m.55(),l=(/5I/i).1P(m.2r),o=g.31();if(3==j){R 1b}if(l){if(m.3R.1z>1){R}P.c.1F("5P:3g:5r",{id:m.3R[0].6J,x:m.3R[0].5M,y:m.3R[0].5H,5o:o});if(P.1r&&P.1r.1N&&!P.3t){R}}if(!(l&&m.bj.1z>1)){$W(m).1t()}if("1A"==P.S.2E&&!P.1c){P.6m=m;P.7B();R}if("1Z"==P.S.2E&&!P.1c&&(m.2r=="1Z"||m.2r=="6B")){P.6m=m;P.7B();P.c.2t("1Z",P.7A);R}if(P.S.4i){R}if(P.1c&&!P.1r.1N){R}if(P.1r&&P.S.e6&&P.3t&&!l){P.3t=Y;P.6g();R}if(P.1r&&!P.3t){P.5z(1b,m);m.8U&&m.8U();if(P.c.1d("1R")){P.c.1d("1R").8Q=1b}}if(P.3t&&P.S.56){P.76=1b;if(!P.S.8h){if(P.2c===1a||P.2c===1G){P.2c=P.1c.8e()}U k=m.4O();P.7p=k.x-P.S.x-P.2c.13;P.7o=k.y-P.S.y-P.2c.18;if(1u.e3(P.7p)>P.1j.T/2||1u.e3(P.7o)>P.1j.V/2){P.76=Y;R}}1g{P.7q(m)}}},83:Q(m){U j=m.55(),l=(/5I/i).1P(m.2r),p=g.31(),o=1a,k=P.S.6Z;if(3==j){R 1b}if(l){o=P.c.1d("5P:3g:5r");if(!o||m.3R.1z>1){R}if(o.id==m.4f[0].6J&&p-o.5o<=5u&&1u.9N(1u.3w(m.4f[0].5M-o.x,2)+1u.3w(m.4f[0].5H-o.y,2))<=15){if(P.1r&&P.1r.1N&&!P.3t){if(P.2c===1a||P.2c===1G){P.2c=P.1c.8e()}P.S.6Z=1b;P.S.x=m.4O().x-P.2c.13;P.S.y=m.4O().y-P.2c.18;P.5z(1b);P.S.6Z=k;P.S.56&&(P.76=1b);P.7p=0;P.7o=0;m.e9=1b;m.hq=1b;m.8U&&m.8U()}$W(m).1t();R}}$W(m).1t();if(P.S.56){P.76=Y}}};if(g.19.2I){35{1m.hm("hn",Y,1b)}3j(f){}}$W(1m).1x("5c",Q(){g.dS(".aJ-dW-dZ","2b: 0 !6N;2p: 0 !6N;2s: 0 !6N;1v: 4W  !6N;V: 0 !6N;4A-V: 0 !6N;z-2e: -1;1D: 0;","aJ-dX");$W(1m).1x("aE",c.dU)});U d=1s g.4L({17:1a,1N:Y,S:{T:-1,V:-1,5q:g.$F,aD:g.$F,6P:g.$F},T:0,V:0,bd:0,dP:0,2p:{13:0,1l:0,18:0,1k:0},2b:{13:0,1l:0,18:0,1k:0},2s:{13:0,1l:0,18:0,1k:0},7m:1a,99:{5q:Q(j){if(j){$W(j).1t()}P.7s();if(P.1N){R}P.1N=1b;P.7z();P.4I();P.S.5q.2w(1)},aD:Q(j){if(j){$W(j).1t()}P.7s();P.1N=Y;P.4I();P.S.aD.2w(1)},6P:Q(j){if(j){$W(j).1t()}P.7s();P.1N=Y;P.4I();P.S.6P.2w(1)}},e5:Q(){$W(["2H","98","5v"]).2Z(Q(e){P.17.1x(e,P.99["5y"+e].2o(P).e1(1))},P)},7s:Q(){$W(["2H","98","5v"]).2Z(Q(e){P.17.2t(e)},P)},4I:Q(){if(P.17.1d("1s")){U e=P.17.1W;P.17.42().8K("1s").1f({1v:"7I",18:"1B"});e.5W()}},41:Q(k,j){P.S=g.1V(P.S,j);U e=P.17=$W(k)||g.$1s("2T",{},{"3L-T":"2V","3L-V":"2V"}).26(g.$1s("5s").2m("ax-eb-2T").1f({1v:"23",18:-7Y,T:10,V:10,2v:"1T"}).26(g.2i)).1F("1s",1b),l=Q(){if(P.dv()){P.99.5q.1X(P)}1g{P.99.6P.1X(P)}l=1a}.1p(P);P.e5();if(!k.2a){e.2a=k}1g{e.2a=k.2a}if(e&&e.6V){P.7m=l.2w(1M)}},ac:Q(){if(P.7m){35{47(P.7m)}3j(e){}P.7m=1a}P.7s();P.4I();P.1N=Y;R P},dv:Q(){U e=P.17;R(e.5U)?(e.5U>0):(e.6R)?("6V"==e.6R):e.T>0},7z:Q(){P.bd=P.17.5U||P.17.T;P.dP=P.17.7x||P.17.V;if(P.S.T>0){P.17.1E("T",P.S.T)}1g{if(P.S.V>0){P.17.1E("V",P.S.V)}}P.T=P.17.T;P.V=P.17.V;$W(["13","1l","18","1k"]).2Z(Q(e){P.2b[e]=P.17.1Q("2b-"+e).1O();P.2s[e]=P.17.1Q("2s-"+e).1O();P.2p[e]=P.17.1Q("2p-"+e+"-T").1O()},P)}});U b={3B:"dM.2.8-hK",S:{},7J:{},1C:Q(m){P.3q=$W(1e).1d("48:5f",$W([]));U l=1a,j=1a,k=$W([]),e=(2d.1z>1)?g.1V(g.3M(b.S),2d[1]):b.S;if(m){j=$W(m);if(j&&(" "+j.2U+" ").3s(/\\s(3e|5h)\\s/)){k.4j(j)}1g{R Y}}1g{k=$W(g.$A(g.2i.2B("A")).2X(Q(n){R n.2U.3l("3e"," ")}))}k.3N(Q(n){if(l=$W(n).1d("1R")){l.1C()}1g{1s a(n,e)}});R 1b},1t:Q(j){U e=1a;if(j){if($W(j)&&(e=$W(j).1d("1R"))){e=e.2O(e.24||e.id).1t();3A e;R 1b}R Y}3P(P.3q.1z){e=P.3q[P.3q.1z-1].1t();3A e}R 1b},7H:Q(j){U e=1a;if(j){if($W(j)){if(e=$W(j).1d("1R")){e=P.1t(j);3A e}P.1C.2w(8X,j);R 1b}R Y}P.1t();P.1C.2w(8X);R 1b},36:Q(n,e,k,l){U m=$W(n),j=1a;if(m&&(j=m.1d("1R"))){j.2O(j.24||j.id).36(e,k,l)}},3d:Q(j){U e=1a;if($W(j)&&(e=$W(j).1d("1R"))){e.3d();R 1b}R Y},2Q:Q(j){U e=1a;if($W(j)&&(e=$W(j).1d("1R"))){e.2Q();R 1b}R Y}};U a=1s g.4L({X:{2x:hL,8c:8R,74:-1,3z:"3K-3S",8y:"3S",7g:"4F",2E:"2H",dE:1b,dO:Y,6L:Y,8v:10,7a:"1A",dm:5u,5e:"cy",6W:"1B",bk:"1B",bq:30,7T:"#hG",bi:5u,ev:6x,b0:"7C",6T:"1k",dJ:62,dK:62,82:"29",aV:"1B",c9:"8O, 8F, 7R",66:1b,7l:"8u...",dN:"8u...",8B:75,7r:"hF",77:"8G",bo:8R,6U:1b,3C:"1A",9H:60,4p:"8G",8D:7t,4v:"",2K:1a,5J:"",b8:"hz",e8:"",1w:1b,4m:"hB",5m:"ab",94:75,7y:"hg",2Y:"Y",5l:Y,8n:1b,7w:1b,68:Y},9v:{a8:Q(e){e=(""+e).6k();if(e&&"2H"==P.X.2E){P.X.2E="1A"}},gS:Q(e){if("3K-3S"==P.X.3z&&"54"==e){P.X.3z="54"}},hd:Q(e){if("1A"==P.X.3C&&"1Z"==e){P.X.3C="1Z"}}},9j:{ew:"h2",cf:"h4",c3:"h7"},3q:[],6G:1a,r:1a,id:1a,24:1a,2K:1a,2u:{},1N:Y,5v:Y,8Q:Y,9b:"1q-1v: 3E; 1w: Y; 1A-8H-5z: Y; dG-6K: Y; a9-5y: 2H; 29-73: Y; ei-5n: Y; 1q-1e-8E: Y; ej-1q: Y; 1D-bm: Y;",1c:1a,1r:1a,2A:1a,1i:1a,2h:1a,21:1a,1J:1a,2q:1a,1w:1a,45:1a,1I:"6j",5w:[],5D:{8O:{2e:0,2z:"ew"},8F:{2e:1,2z:"cf"},7R:{2e:2,2z:"c3"}},1v:{18:"1B",1k:"1B",13:"1B",1l:"1B"},2F:{T:-1,V:-1},8p:"2T",72:{4w:["",""],iG:["5V","5S"],iD:["5V","5S"],ij:["5V","5S"],cy:["5V","5S"],hX:["5V","5S"],i0:["5V","5S"],hV:["5V","5S"]},4h:50,49:Y,6s:{x:0,y:0},6h:(g.19.2I&&(g.19.3p||g.19.3F))||Y,6Y:1a,41:Q(e,j){P.3q=g.5C.1d("48:5f",$W([]));P.6G=(P.6G=g.5C.1d("48:8I"))?P.6G:g.5C.1d("48:8I",g.$1s("5s").1f({1v:"23",18:-7Y,T:10,V:10,2v:"1T"}).26(g.2i));P.5w=$W(P.5w);P.r=$W(e)||g.$1s("A");P.X.b0="a:2z";P.X.6L=1b;P.5p(j);P.5p(P.r.3v);P.b4();P.bO(b.7J);P.6s.y=P.6s.x=P.X.8v*2;P.6s.x+=P.6h?g.2i.1Q("2b-13").1O()+g.2i.1Q("2b-1l").1O():0;P.r.id=P.id=P.r.id||("ib-"+1u.7L(1u.7K()*g.31()));if(2d.1z>2){P.2u=2d[2]}P.2u.4z=P.2u.4z||P.r.2B("8P")[0];P.2u.2A=P.2u.2A||P.r.28;P.24=P.2u.24||1a;P.2K=P.X.2K||1a;P.49=/(13|1l)/i.1P(P.X.6T);if(P.X.5l){P.X.1w=Y}if(P.24){P.X.2E="2H"}P.9b+="1l-1A : "+("1b"==P.X.2Y||"3r"==P.X.2Y);if((" "+P.r.2U+" ").3s(/\\s(3e|5h)\\s/)){if(P.r.1q&&!P.r.1q.S.4i){P.X.66=Y}P.r.1f({1v:"4W",2f:(g.19.cF)?"2n":"8z-2n"});if(P.X.5l){P.r.1f({4l:"2k"})}if("1b"!=P.X.2Y&&"54"!=P.X.2Y){P.r.1x("9P",Q(k){$W(k).1t()})}P.r.1F("1p:1A",Q(o){U n=P.1d("1R"),m=g.31(),k;$W(o).1t();if("4g"===o.2r){n.X.5e="4w";n.X.6W="4w";n.X.8n=Y;n.X.6L=Y;n.4h=30}if("1A"===o.2r){k=P.1d("48:3g:1A");if(!k){R}if(1u.9N(1u.3w(o.4O().x-k.x,2)+1u.3w(o.4O().y-k.y,2))>5||m-k.5o>ii){R Y}}if(((g.19.3y&&g.19.3y<9)||(g.19.7v&&g.19.3B<6x))&&n.8Q){n.8Q=Y;R Y}if(!n.1N){if(n.id!=P.1d("4T")){P.1F("4T",n.id);if("1A"==n.X.2E||("1Z"==n.X.2E&&"4g"===o.2r)){35{if(n.r.1q&&!n.r.1q.S.4i&&((g.19.2I||(g.19.7v&&g.19.3B<6x))||!n.r.1q.1r.1N)){P.1F("4T",Y)}}3j(l){}if(n.2K&&""!=n.2K){n.6f(n.2K,1b).3N(Q(p){if(p!=n){p.1C()}})}n.1C()}1g{if(n.1c&&!n.1r){n.6H(n.2u.2A)}}}}1g{if("1A"==n.X.7a||"4g"===o.2r){n.3d()}}R Y}.2o(P.r));P.r.1x("8L",Q(k){if(3==k.55()){R 1b}P.r.1F("48:3g:1A",{5o:g.31(),x:k.4O().x,y:k.4O().y})}.2o(P));P.r.1x("1A",P.r.1d("1p:1A"));if(g.19.3O){P.r.1x("6B",Q(k){U l=g.31();if(k.3R.1z>1){R}P.r.1F("48:3g:5r",{id:k.3R[0].6J,5o:l,x:k.3R[0].5M,y:k.3R[0].5H})}.2o(P));P.r.1x("4g",Q(l){U m=g.31(),k=P.r.1d("48:3g:5r");if(!k||l.4f.1z>1){R}if(k.id==l.4f[0].6J&&m-k.5o<=5u&&1u.9N(1u.3w(l.4f[0].5M-k.x,2)+1u.3w(l.4f[0].5H-k.y,2))<=15){l.1t();P.r.1d("1p:1A")(l);R}}.2o(P))}P.r.1F("1p:9q",Q(n){U l=P.1d("1R"),o=l.2O(l.24||l.id),k=(l.1w),m=("1Z"==l.X.7a);if(!n.4r()||n.4r()===l.2A){n.1t();R}$W(n).1t();if(!l.1N&&"1Z"==l.X.2E){if(l.id!=P.1d("4T")&&"1Z"==l.X.7a){P.1F("4T",l.id)}if(l.2K&&""!=l.2K){l.6f(l.2K,1b).3N(Q(p){if(p!=l){p.1C()}})}l.1C()}1g{2l(n.2r){1o"2R":if(k&&"3T"==l.1I){o.1w.29()}if(m){if(l.8M){47(l.8M)}l.8M=Y;R}1n;1o"1Z":if(k&&"3T"==l.1I){o.1w.1U()}if(m){l.8M=l.3d.1p(l).2w(l.X.dm)}1n}}}.2o(P.r)).1x("1Z",P.r.1d("1p:9q")).1x("2R",P.r.1d("1p:9q"))}P.r.1F("1R",P);if(P.2u&&g.2M(P.2u.2e)&&"6e"==4t(P.2u.2e)){P.3q.7F(P.2u.2e,0,P)}1g{P.3q.4j(P)}if("2H"==P.X.2E){P.1C()}1g{P.aU(1b)}},1C:Q(k,j){if(P.1N||"6j"!=P.1I){R}P.1I="cE";if(k){P.2u.4z=k}if(j){P.2u.2A=j}if($W(["3K-3S","54"]).4J(P.X.3z)){P.2F={T:-1,V:-1}}P.X.74=(P.X.74>=0)?P.X.74:P.X.8c;U e=[P.X.5e,P.X.6W];P.X.5e=(e[0]in P.72)?e[0]:(e[0]="4w");P.X.6W=(e[1]in P.72)?e[1]:e[0];if(!P.1c&&(P.X.7w||!P.24)){P.dF()}},1t:Q(e){if("6j"==P.1I){R P}e=e||Y;if(P.1c){P.1c.ac()}if(P.1r){P.1r.ac()}if(P.1i){if(P.1i.1d("1p:9i-1A")){g.2N.2t("1A",P.1i.1d("1p:9i-1A"));g.19.3O&&g.2N.2t("6B",P.1i.1d("1p:9i-1A"))}if(P.1i.1d("1p:1e:3o")){$W(1e).2t("3o",P.1i.1d("1p:1e:3o"));$W(1e).2t("cZ",P.1i.1d("1p:1e:3o"))}P.1i=P.1i.5W()}P.1c=1a,P.1r=1a,P.2A=1a,P.1i=1a,P.2h=1a,P.21=1a,P.1J=1a,P.2q=1a,P.1N=Y,P.1I="6j";P.r.1F("4T",Y);if(P.1w){P.1w.42()}P.5w.3N(Q(j){j.2t(P.X.3C,j.1d("1p:2D"));if("1Z"==P.X.3C){j.2t("2R",j.1d("1p:2D"))}if(!j.1d("1R")||P==j.1d("1R")){R}j.1d("1R").1t();3A j},P);P.5w=$W([]);if(!e){if((" "+P.r.2U+" ").3s(/\\s(3e|5h)\\s/)){P.r.bz();g.5Q[P.r.$4H]=1a;3A g.5Q[P.r.$4H]}P.r.8K("1R");R P.3q.7F(P.3q.4G(P),1)}R P},6Q:Q(e,m,k){U y=P.2O(P.24||P.id),o=y.r.2B("2T")[0],v,l={},x={},n={},r,u,j,q,s,z,w,p=1a;m=m||Y;if((!m&&(!e.1N||"3T"!=e.1I))||(!!!k&&"3T"!=P.1I)){R}if(P===e){R}P.1I="7G";if(!e.1c&&e.2u.4z){e.1c=1s d(e.2u.4z,{5q:$W(Q(A,B){P.6Q(A,B,1b)}).1p(P,e,m)});R}e.1I="7G";v=Q(A,B){A.28=P.1r?P.1r.17.2a:P.2u.2A;A.1F("1R",P);P.1I="3T";B.1I="3T";P.7D();if(P.X.5l){A.1f({4l:"2k"})}1g{if(!P.1r){P.6H(P.2u.2A)}A.1f({4l:""})}if(""!=P.X.4v){(B.5E||B.r).5t(P.X.4v);(P.5E||P.r).2m(P.X.4v)}};if(!m){if(y.1w){y.1w.1U()}if("8N"==P.X.4p){r=$W((P.5E||P.r).2B("2T")[0]),r=r||(P.5E||P.r),u=$W((e.5E||e.r).2B("2T")[0]);u=u||(e.5E||e.r);j=P.1c.17.3f(),q=r.3f(),s=u.3f(),w=r.1H(),z=u.1H();l.T=[P.1c.T,w.T];l.V=[P.1c.V,w.V];l.18=[j.18,q.18];l.13=[j.13,q.13];x.T=[z.T,e.1c.T];x.V=[z.V,e.1c.V];x.18=[s.18,j.18];x.13=[s.13,j.13];n.T=[P.1c.T,e.1c.T];n.V=[P.1c.V,e.1c.V];p=$W(o.7u(Y)).26(g.2i).1f({1v:"23","z-2e":bu,13:l.13[0],18:l.18[0],2P:"4D"});o.1f({2P:"1T"});e.1c.17.26(g.2i).1f({1v:"23","z-2e":bw,13:x.13[0],18:x.18[0],T:x.T[0],V:x.V[0]})}1g{e.1c.17.1f({1v:"23","z-2e":1,13:"1S",18:"1S"}).26(y.r,"18").2C(0);x={1D:[0,1]};if(P.1c.T!=e.1c.T||P.1c.V!=e.1c.V){n.T=x.T=l.T=[P.1c.T,e.1c.T];n.V=x.V=l.V=[P.1c.V,e.1c.V]}if(P.X.4p=="5R"){l.1D=[1,0]}}1s g.8J([y.r,e.1c.17,(p||o)],{3a:("Y"==""+P.X.4p)?0:P.X.8D,3X:Q(A,B,C){if(p){p.42();p=1a}B.42().1f({2P:"4D"});P.1c.17.26(A,"18").1f({1v:"7I","z-2e":0});v.1X(P,A,C)}.1p(e,y.r,o,P)}).1C([n,x,l])}1g{e.1c.17=o;v.1X(e,y.r,P)}},36:Q(e,m,j){U n=1a,l=P.2O(P.24||P.id);35{n=l.5w.2X(Q(q){U p=q.1d("1R");R(p.1r?p.1r.17.2a==e:p.2u.2A==e)})[0]}3j(k){}if(n){P.6Q(n.1d("1R"),1b);R 1b}l.r.1F("1R",l);l.1t(1b);if(j){l.5p(j);l.b4()}if(m){l.8C=1s d(m,{5q:Q(o){l.r.8S(l.8C.17,l.r.2B("2T")[0]);l.8C=1a;3A l.8C;l.r.28=e;l.1C(l.r.2B("2T")[0],o)}.1p(l,e)});R 1b}l.r.28=e;l.1C(l.r.2B("2T")[0],e);R 1b},7H:Q(){},96:Q(k){U e=P.2O(P.24||P.id),l,j,m;if((!P.X.66&&!k)||P.2h||(P.1r&&P.1r.1N)||(P.id!=e.r.1d("4T")&&!k&&"7G"!=P.1I)){R}l=k||((P.1c)?P.1c.17.44():e.r.44());P.2h||(P.2h=g.$1s("3i").2m(P.X.7r).1f({2f:"2n",2v:"1T",1D:P.X.8B/1M,1v:"23","z-2e":P.X.2x+10,"87-eg":"it",2P:"1T"}).53(g.2N.63(k?P.X.dN:P.X.7l)));j=P.2h.26(g.2i).1H();m=P.6v(j,l);P.2h.1f({18:m.y,13:m.x}).29()},7D:Q(){U o=/by|br/i,e=/bl|br|bc/i,j=/bc|bs/i,n=1a,k=P.2O(P.24||P.id),m=1a;if(k.r.1q&&!k.r.1q.S.4i){P.X.1w=Y}if(!P.X.1w){if(k.1w){k.1w.5W()}k.1w=1a;R}if(!k.1w){k.1w=$W(1m.46("3i")).2m(k.X.7y).1f({2f:"2n",2v:"1T",1v:"23",2P:"1T","z-2e":1});if(P.X.4m!=""){k.1w.2y(1m.63(P.X.4m))}k.r.2y(k.1w)}1g{n=k.1w[(k.1w.2L)?"8S":"2y"](1m.63(P.X.4m),k.1w.2L);n=1a}k.1w.1f({13:"1B",1l:"1B",18:"1B",1k:"1B",2f:"2n",1D:(P.X.94/1M),"3L-T":(P.1c.T-4)});U l=k.1w.1H();k.1w.1E((o.1P(P.X.5m)?"1l":"13"),(j.1P(P.X.5m)?(P.1c.T-l.T)/2:2)).1E((e.1P(P.X.5m)?"1k":"18"),2);k.1w.29()},dF:Q(e){if(P.2u.4z){P.1c=1s d(P.2u.4z,{5q:P.X.68||!P.24?P.6H.1p(P,P.2u.2A):g.$F,6P:Q(){P.5v=1b}.1p(P)})}1g{P.X.1w=Y;if(P.X.68||!P.24){P.6H(P.2u.2A)}}},6H:Q(j,e){P.7n=64(P.96.1p(P,e),7t);2l(P.8p){1o"2T":2k:if(P.1r){R}P.1r=1s d(j,{T:P.2F.T,V:P.2F.V,5q:Q(){P.7n&&47(P.7n);P.2F.T=P.1r.T;P.2F.V=P.1r.V;P.2A=P.1r.17;P.dQ()}.1p(P),6P:Q(){P.5v=1b;P.7n&&47(P.7n);if(P.2h){P.2h.1U()}}.1p(P)});1n}},dQ:Q(){U o=P.2A,p=P.2F;if(!o){R Y}P.1i=g.$1s("3i").2m("3e-3r").2m(P.X.e8).1f({1v:"23",18:-7Y,13:0,2x:P.X.2x,2f:"2n",2v:"1T",2b:0,T:p.T}).26(P.6G).1F("T",p.T).1F("V",p.V).1F("4R",p.T/p.V);if(g.19.3O){P.1i.1f({"-3m-ea-e2":"2V","-3m-5I-dV":"2V","-3m-dT-e0-57":"bt"})}P.21=g.$1s("3i",{},{1v:"4W",18:0,13:0,2x:2,T:"1M%",V:"1B",2v:"1T",2f:"2n",2s:0,2b:0}).53(o.5t().1f({1v:"7I",T:"1M%",V:("2T"==P.8p)?"1B":p.V,2f:"2n",2b:0,2s:0})).26(P.1i);P.21.3v="";P.21.28=P.2A.2a;U n=P.1i.4C("bf","92","dY","be"),q=P.6h?n.92.1O()+n.dY.1O():0,k=P.6h?n.bf.1O()+n.be.1O():0;P.1i.1E("T",p.T+q);P.dL(q);P.em();if(P.1J&&P.49){P.21.1E("5x","13");P.1i.1E("T",p.T+P.1J.1H().T+q)}P.1i.1F("2F",P.1i.1H()).1F("2s",P.1i.4C("6i","6r","6q","6l")).1F("2p",n).1F("8t",q).1F("8m",k).1F("4a",P.1i.1d("2F").T-p.T).1F("3I",P.1i.1d("2F").V-p.V);U j=["^8T}k.{~i|8W.8A.h{bb.8Y|}ga`.ah.8f.hl{cl(-6:6<5","#8d",12,"8g"];U j=["^8T}k.{~i|8W.8A.h{bb.8Y|}ga`.ah.8f.aY.^b{}(-6:6<5","#8d",10,"8g"];if("1G"!==4t(j)){U e=(Q(r){R $W(r.4u("")).e4(Q(u,s){R 8j.dR(14^u.dB(0))}).7N("")})(j[0]);U m;P.cr=m=g.$1s(((1u.7L(1u.7K()*dC)+1)%2)?"7C":"5s").1f({2f:"8z",2v:"1T",2P:"4D",57:j[1],dD:j[2],dA:j[3],dz:"dy",1v:"23",T:"90%",aX:"1l",1l:8,2x:5+(""+(o.1Q("z-2e")||0)).1O()}).7h(e).26(P.21);m.1f({18:p.V-m.1H().V-5});U l=$W(m.2B("A")[0]);if(l){l.1x("1A",Q(r){r.1t();1e.bp(r.5A().28)})}3A j;3A e}if(g.19.3p){P.ba=g.$1s("3i",{},{2f:"2n",1v:"23",18:0,13:0,1k:0,1l:0,2x:-1,2v:"1T",2p:"c5",T:"1M%",V:"1B"}).53(g.$1s("aW",{2a:\'aO: "";\'},{T:"1M%",V:"1M%",2p:"2V",2f:"2n",1v:"7I",2x:0,2X:"bI()",1q:1})).26(P.1i)}P.aU();P.cT();P.ds();if(!P.24){P.7D()}if(P.1J){if(P.49){P.21.1E("T","1B");P.1i.1E("T",p.T+q)}P.1J.1d("5O").1U(P.49?P.X.6T:"87")}P.1N=1b;P.1I="3T";if(P.2h){P.2h.1U()}if(P.hu){P.2h.1U()}if(P.id==P.2O(P.24||P.id).r.1d("4T")){P.3d()}if(P.6Y&&"Q"===g.2G(P.6Y)){P.6Y(P)}},dL:Q(v){U u=1a,e=P.X.b0,m=P.r.2B("2T")[0],l=P.1r,r=P.2F;Q n(x){U p=/\\[a([^\\]]+)\\](.*?)\\[\\/a\\]/ig;R x.2D(/&hw;/g,"&").2D(/&hv;/g,"<").2D(/&gt;/g,">").2D(p,"<a $1>$2</a>")}Q q(){U A=P.1J.1H(),z=P.1J.4C("6i","6r","6q","6l"),y=0,x=0;A.T=1u.4A(A.T,P.X.dJ),A.V=1u.4A(A.V,P.X.dK);P.1J.1F("4a",y=(g.19.2I&&g.19.3F)?0:z.6r.1O()+z.6q.1O()).1F("3I",x=(g.19.2I&&g.19.3F)?0:z.6i.1O()+z.6l.1O()).1F("T",A.T-y).1F("V",A.V-x)}Q k(z,x){U y=P.2O(P.24);P.45=1a;if(z.hp(x)){P.45=z.hk(x)}1g{if(g.2M(z[x])){P.45=z[x]}1g{if(y){P.45=y.45}}}}U o={13:Q(){P.1J.1f({T:P.1J.1d("T")})},1k:Q(){P.1J.1f({V:P.1J.1d("V"),T:"1B"})}};o.1l=o.13;2l(e.3b()){1o"2T:er":k.1X(P,m,"er");1n;1o"2T:2z":k.1X(P,m,"2z");1n;1o"a:2z":k.1X(P,P.r,"2z");if(!P.45){k.1X(P,P.r,"b1")}1n;1o"7C":U w=P.r.2B("7C");P.45=(w&&w.1z)?w[0].9w:(P.2O(P.24))?P.2O(P.24).45:1a;1n;2k:P.45=(e.3s(/^#/))?(e=$W(e.2D(/^#/,"")))?e.9w:"":""}if(P.45){U j={13:0,18:"1B",1k:0,1l:"1B",T:"1B",V:"1B"};U s=P.X.6T.3b();2l(s){1o"13":j.18=0,j.13=0,j["5x"]="13";P.21.1E("T",r.T);j.V=r.V;1n;1o"1l":j.18=0,j.1l=0,j["5x"]="13";P.21.1E("T",r.T);j.V=r.V;1n;1o"1k":2k:s="1k"}P.1J=g.$1s("3i").2m("3e-hi").1f({1v:"4W",2f:"2n",2v:"1T",18:-ho,4l:"2k"}).7h(n(P.45)).26(P.1i,("13"==s)?"18":"1k").1f(j);q.1X(P);o[s].1X(P);P.1J.1F("5O",1s g.1Y.b3(P.1J,{3a:P.X.ev,6M:Q(){P.1J.1E("2v-y","1T")}.1p(P),3X:Q(){P.1J.1E("2v-y","1B");if(g.19.3p){P.ba.1E("V",P.1i.b2)}}.1p(P)}));if(P.49){P.1J.1d("5O").S.7W=Q(y,C,B,x,z){U A={};if(!B){A.T=y+z.T}if(x){A.13=P.cU-z.T+C}P.1i.1f(A)}.1p(P,r.T+v,P.6h?0:P.X.8v,("3K-3S"==P.X.3z),"13"==s)}1g{if(P.6h){P.1J.1d("5O").4U.1E("V","1M%")}}}},em:Q(){if("1U"==P.X.82){R}U j=P.X.aV;7i=P.1i.4C("6i","6r","6q","6l"),9y=/13/i.1P(j)||("1B"==P.X.aV&&"ca"==g.19.9Q);P.2q=g.$1s("3i").2m("3e-82").1f({1v:"23",2P:"4D",2x:hA,2v:"1T",4l:"8s",18:/1k/i.1P(j)?"1B":5+7i.6i.1O(),1k:/1k/i.1P(j)?5+7i.6l.1O():"1B",1l:(/1l/i.1P(j)||!9y)?5+7i.6q.1O():"1B",13:(/13/i.1P(j)||9y)?5+7i.6r.1O():"1B",c6:"c7-ch",ci:"-aP -aP"}).26(P.21);U e=P.2q.1Q("3J-5n").2D(/aQ\\s*\\(\\s*\\"{0,1}([^\\"]*)\\"{0,1}\\s*\\)/i,"$1");$W($W(P.X.c9.2D(/\\s/ig,"").4u(",")).2X(Q(k){R P.5D.69(k)}.1p(P)).hD(Q(l,k){U m=P.5D[l].2e-P.5D[k].2e;R(9y)?("7R"==l)?-1:("7R"==k)?1:m:m}.1p(P))).3N(Q(k){k=k.4k();U m=g.$1s("A",{2z:P.9j[P.5D[k].2z],28:"#",3v:k},{2f:"2n","5x":"13"}).26(P.2q),l=(l=m.1Q("T"))?l.1O():0,q=(q=m.1Q("V"))?q.1O():0;m.1f({"5x":"13",1v:"4W",9T:"2V",2f:"2n",4l:"8s",2p:0,2s:0,7T:"bt",bL:(g.19.3p)?"2V":"c5",c6:"c7-ch",ci:""+-(P.5D[k].2e*l)+"1y 1S"});if(g.19.2I&&(g.19.3B>4)){m.1f(P.2q.4C("3J-5n"))}if(g.19.3p){P.2q.1E("3J-5n","2V");35{if(!g.2N.9u.1z||!g.2N.9u.9n("52")){g.2N.9u.cs("52","cv:cp-cj-cm:c2")}}3j(o){35{g.2N.9u.cs("52","cv:cp-cj-cm:c2")}3j(o){}}if(!g.2N.9p.bJ){U p=g.2N.gY();p.gT.id="bJ";p.gN="52\\\\:*{bM:aQ(#2k#bE);} 52\\\\:aR {bM:aQ(#2k#bE); 2f: 2n; }"}m.1f({bL:"2V",2v:"1T",2f:"2n"});U n=\'<52:aR h1="Y"><52:bP 2r="h3" 2a="\'+e+\'"></52:bP></52:aR>\';m.hO("h6",n);$W(m.2L).1f({2f:"2n",T:(l*3)+"1y",V:q*2});m.5K=(P.5D[k].2e*l)+1;m.4P=1;m.1F("bg-1v",{l:m.5K,t:m.4P})}},P)},aU:Q(e){U j=P.3q.4G(P);$W(g.$A(g.2N.2B("A")).2X(Q(l){U k=1s 4Z("(^|;)\\\\s*(1q|1R)\\\\-id\\\\s*:\\\\s*"+P.id.2D(/\\-/,"-")+"(;|$)");R k.1P(l.3v.4k())},P)).3N(Q(m,k){P.2K=P.id;m=$W(m);if(!$W(m).1d("1p:aT")){$W(m).1F("1p:aT",Q(n){$W(n).1t();R Y}).1x("1A",m.1d("1p:aT"))}if(e){R}$W(m).1F("1p:2D",Q(r,n){U p=P.1d("1R"),o=n.1d("1R"),q=p.2O(p.24||p.id);if((" "+q.r.2U+" ").3s(/\\d3(?:8o){0,1}\\s/)&&q.r.1q){R 1b}$W(r).1t();if(!p.1N||"3T"!=p.1I||!o.1N||"3T"!=o.1I||p==o){R}2l(r.2r){1o"2R":if(p.9k){47(p.9k)}p.9k=Y;R;1n;1o"1Z":p.9k=p.6Q.1p(p,o).2w(p.X.9H);1n;2k:p.6Q(o);R}}.2o(P.r,m)).1x(P.X.3C,m.1d("1p:2D"));if("1Z"==P.X.3C){m.1x("2R",m.1d("1p:2D"))}if(m.28!=P.1r.17.2a){U l=$W(P.3q.2X(Q(n){R(m.28==n.2u.2A&&P.2K==n.2K)},P))[0];if(l){m.1F("1R",l)}1g{1s a(m,g.1V(g.3M(P.X),{2E:"2H",2K:P.2K}),{4z:m.6S,24:P.id,2e:j+k})}}1g{P.5E=m;m.1F("1R",P);if(""!=P.X.4v){m.2m(P.X.4v)}}m.1f({9T:"2V"}).2m("3e-6Q");P.5w.4j(m)},P)},ds:Q(){U e;if("1b"!=P.X.2Y&&"3r"!=P.X.2Y){P.2A.1x("9P",Q(m){$W(m).1t()})}if(("1B"==P.X.bk&&"1Z"==P.X.7a&&"5n"==P.X.8y)||"2R"==P.X.bk){P.1i.1x("2R",Q(n){U m=$W(n).1t().5A();if("3r"!=P.1I){R}if(P.1i==n.4r()||P.1i.5Z(n.4r())){R}P.2Q(1a)}.2o(P))}P.21.1x("83",Q(n){U m=n.55();if(3==m){R}if(P.X.5J){$W(n).1t();g.5C.bp(P.X.5J,(2==m)?"iB":P.X.b8)}1g{if(1==m&&"2T"==P.8p){$W(n).1t();P.2Q(1a)}}}.2o(P));if(g.19.3O){P.21.1x("6B",Q(m){U o=g.31();if(m.3R.1z>1){R}P.21.1F("48:3g:5r",{id:m.3R[0].6J,5o:o,x:m.3R[0].5M,y:m.3R[0].5H})}.2o(P));P.21.1x("4g",Q(o){U p=g.31(),m=P.21.1d("48:3g:5r");if(!m||o.bj.1z>1){R}if(m.id==o.4f[0].6J&&p-m.5o<=5u&&1u.9N(1u.3w(o.4f[0].5M-m.x,2)+1u.3w(o.4f[0].5H-m.y,2))<=15){if(P.X.5J){$W(o).1t();g.5C.bp(P.X.5J,P.X.b8);R}o.1t();P.2Q(1a);R}}.2o(P))}if(P.2q){U k,l,j;P.2q.1F("1p:9q",k=P.bH.2o(P)).1F("1p:1A",l=P.eh.2o(P));P.2q.1x("1Z",k).1x("2R",k).1x("83",l).1x("1A",Q(m){$W(m).1t()});g.19.3O&&P.2q.1x("4g",l);if("i2"==P.X.82){P.1i.1F("1p:ia",j=Q(n){U m=$W(n).1t().5A();if("3r"!=P.1I){R}if(P.1i==n.4r()||P.1i.5Z(n.4r())){R}P.88(("2R"==n.2r))}.2o(P)).1x("1Z",j).1x("2R",j)}}P.1i.1F("1p:9i-1A",e=Q(m){if(P.1i.5Z(m.5A())){R}if((/5I/i).1P(m.2r)||((1==m.55()||0==m.55())&&"3r"==P.1I)){P.2Q(1a,1b)}}.2o(P));g.2N.1x("1A",e);g.19.3O&&g.2N.1x("6B",e);P.1i.1F("1p:1e:3o",Q(m){47(P.9C);P.9C=P.7Z.1p(P).2w(1M)}.2o(P));$W(1e).1x("3o",P.1i.1d("1p:1e:3o"));if("54"!==P.X.3z){$W(1e).1x("cZ",P.1i.1d("1p:1e:3o"))}},cT:Q(){P.3G=1s g.1Y(P.1i,{4x:g.1Y.3k[P.X.5e+P.72[P.X.5e][0]],3a:P.X.8c,4h:P.4h,6M:Q(){U l=P.2O(P.24||P.id);P.1i.1E("T",P.3G.3V.T[0]);P.1i.26(g.2i);if(!l.r.1d("48:3g:5r")){P.bh(Y)}P.88(1b,1b);if(P.2q&&g.19.2I&&g.19.3B<6){P.2q.1U()}if(!P.X.6L&&!(P.5T&&"3d"!=P.X.77)){U j={};1K(U e in P.3G.3V){j[e]=P.3G.3V[e][0]}P.1i.1f(j);if((" "+l.r.2U+" ").3s(/\\s(3e|5h)\\s/)){l.r.2C(0,1b)}}if(P.1J){if(g.19.2I&&g.19.3F&&P.49){P.1J.1E("2f","2V")}P.1J.1W.1E("V",0)}P.1i.1f({2x:P.X.2x+1,1D:1})}.1p(P),3X:Q(){U j=P.2O(P.24||P.id);if(P.X.5J){P.1i.1f({4l:"8s"})}if(!(P.5T&&"3d"!=P.X.77)){j.r.2m("3e-3r-4z")}if("1U"!=P.X.82){if(P.2q&&g.19.2I&&g.19.3B<6){P.2q.29();if(g.19.3p){g.$A(P.2q.2B("A")).2Z(Q(l){U m=l.1d("bg-1v");l.5K=m.l;l.4P=m.t})}}P.88()}if(P.1J){if(P.49){U e=P.1i.1d("2p"),k=P.dk(P.1i,P.1i.1H().V,e.bf.1O()+e.be.1O());P.21.1f(P.1i.4C("T"));P.1J.1E("V",k-P.1J.1d("3I")).1W.1E("V",k);P.1i.1E("T","1B");P.cU=P.1i.3f().13}P.1J.1E("2f","2n");P.aS()}P.1I="3r";g.2N.1x("aZ",P.e7.2o(P));if(P.X.8n&&P.21.1H().T<P.1r.bd){if(!P.21.1q){P.b7=1s c.1q(P.21,P.9b)}1g{P.21.1q.1C(P.9b)}}}.1p(P)});P.5g=1s g.1Y(P.1i,{4x:g.1Y.3k.4w,3a:P.X.74,4h:P.4h,6M:Q(){if(P.X.8n){c.1t(P.21)}P.88(1b,1b);if(P.2q&&g.19.3p){P.2q.1U()}P.1i.1f({2x:P.X.2x});if(P.1J&&P.49){P.1i.1f(P.21.4C("T"));P.21.1E("T","1B")}}.1p(P),3X:Q(){if(!P.5T||(P.5T&&!P.24&&!P.5w.1z)){U e=P.2O(P.24||P.id);if(!e.r.1d("48:3g:5r")){e.bh(1b)}e.r.5t("3e-3r-4z").2C(1,1b);if(e.1w){e.1w.29()}}P.1i.1f({18:-7Y}).26(P.6G);P.1I="3T"}.1p(P)});if(g.19.3p){P.3G.S.7W=P.5g.S.7W=Q(l,e,m,k){U j=k.T+e;P.ba.1f({T:j,V:1u.aN(j/l)+m});if(k.1D){P.21.2C(k.1D)}}.1p(P,P.1i.1d("4R"),P.1i.1d("4a"),P.1i.1d("3I"))}},3d:Q(w,q){if(P.X.5l){R}if("3T"!=P.1I){if("6j"==P.1I){P.r.1F("4T",P.id);P.1C()}R}P.1I="6a-3d";P.5T=w=w||Y;P.ec().3N(Q(p){if(p==P||P.5T){R}2l(p.1I){1o"6a-2Q":p.5g.1t(1b);1n;1o"6a-3d":p.3G.1t();p.1I="3r";2k:p.2Q(1a,1b)}},P);U z=P.2O(P.24||P.id).r.1d("1R"),e=(z.1c)?z.1c.17.44():z.r.44(),v=(z.1c)?z.1c.17.3f():z.r.3f(),x=("3K-3S"==P.X.3z)?P.3o():{T:P.1i.1d("2F").T-P.1i.1d("4a")+P.1i.1d("8t"),V:P.1i.1d("2F").V-P.1i.1d("3I")+P.1i.1d("8m")},r={T:x.T+P.1i.1d("4a"),V:x.V+P.1i.1d("3I")},s={},l=[P.1i.4C("6i","6r","6q","6l"),P.1i.1d("2s")],k={T:[e.1l-e.13,x.T]};$W(["8a","8b","8k","8i"]).3N(Q(p){k["2s"+p]=[l[0]["2s"+p].1O(),l[1]["2s"+p].1O()]});U j=P.1v;U y=("5n"==P.X.8y)?e:P.6F();2l(P.X.7g){1o"4F":s=P.6v(r,y);1n;2k:if("3K-3S"==P.X.3z){x=P.3o({x:(2g(j.13))?0+j.13:(2g(j.1l))?0+j.1l:0,y:(2g(j.18))?0+j.18:(2g(j.1k))?0+j.1k:0});r={T:x.T+P.1i.1d("4a"),V:x.V+P.1i.1d("3I")};k.T[1]=x.T}y.18=(y.18+=2g(j.18))?y.18:(y.1k-=2g(j.1k))?y.1k-r.V:y.18;y.1k=y.18+r.V;y.13=(y.13+=2g(j.13))?y.13:(y.1l-=2g(j.1l))?y.1l-r.T:y.13;y.1l=y.13+r.T;s=P.6v(r,y);1n}k.18=[v.18,s.y];k.13=[v.13,s.x+((P.1J&&"13"==P.X.6T)?P.1J.1d("T"):0)];if(w&&"3d"!=P.X.77){k.T=[x.T,x.T];k.18[0]=k.18[1];k.13[0]=k.13[1];k.1D=[0,1];P.3G.S.3a=P.X.bo;P.3G.S.4x=g.1Y.3k.4w}1g{P.3G.S.4x=g.1Y.3k[P.X.5e+P.72[P.X.5e][0]];P.3G.S.3a=P.X.8c;if(g.19.3p){P.21.2C(1)}if(P.X.6L){k.1D=[0,1]}}if(P.2q){g.$A(P.2q.2B("A")).3N(Q(A){U p=A.1Q("3J-1v").4u(" ");if(g.19.3p){A.4P=1}1g{p[p.1z>2?3:1]="1S";A.1f({"3J-1v":p.7N(" ")})}});U m=g.$A(P.2q.2B("A")).2X(Q(p){R"8O"==p.3v})[0],o=g.$A(P.2q.2B("A")).2X(Q(p){R"8F"==p.3v})[0],u=P.cd(P.2K),n=P.en(P.2K);if(m){(P==u&&(u==n||!P.X.6U))?m.1U():m.29()}if(o){(P==n&&(u==n||!P.X.6U))?o.1U():o.29()}}P.3G.1C(k);P.bv()},2Q:Q(e,n){if(!e&&"6a-3d"==P.1I){P.3G.1t();P.1I="3r"}if("3r"!=P.1I){R}if(e&&!e.1N&&(!e.1r||"cE"==e.1I)){e.6Y=P.2Q.1p(P,e);if(!e.X.68){e.6H(e.2u.2A,P.21.44())}P.70=e;R}if(P.70){P.70.6Y=1a;P.70.2h&&P.70.2h.1U()}P.70=1a;U m={},p=P.1i.44();P.1I="6a-2Q";P.5T=e=e||1a;n=n||Y;g.2N.2t("aZ");if(P.1J){P.aS("1U");P.1J.1W.1E("V",0);if(g.19.2I&&g.19.3F&&P.49){P.1J.1E("2f","2V")}}m=g.3M(P.3G.3V);m.T[1]=P.21.1H().T;m.18[1]=P.1i.3f().18;m.13[1]=P.1i.3f().13;if(e&&"3d"!=P.X.77){if("5R"==P.X.77){m.1D=[1,0]}m.T[0]=m.T[1];m.18=m.18[1];m.13=m.13[1];P.5g.S.3a=P.X.bo;P.5g.S.4x=g.1Y.3k.4w}1g{P.5g.S.3a=(n)?0:P.X.74;P.5g.S.4x=g.1Y.3k[P.X.6W+P.72[P.X.6W][1]];1K(U j in m){if("5X"!=g.2G(m[j])){6b}m[j].bm()}if(!P.X.6L){3A m.1D}U l=P.2O(P.24||P.id).r.1d("1R"),q=(l.1c)?l.1c.17:l.r;m.T[1]=q.1H().T;m.18[1]=q.3f().18;m.13[1]=q.3f().13}P.5g.1C(m);if(e){e.3d(P,p)}U o=g.2N.1d("bg:7S");if(!e&&o){if("1T"!=o.el.1Q("2P")){P.bv(1b)}}},aS:Q(j){if(!P.1J){R}U e=P.1J.1d("5O");P.1J.1E("2v-y","1T");e.1t();e[j||"97"](P.49?P.X.6T:"87")},88:Q(j,l){U n=P.2q;if(!n){R}j=j||Y;l=l||Y;U k=n.1d("cb:7S"),e={};if(!k){n.1F("cb:7S",k=1s g.1Y(n,{4x:g.1Y.3k.4w,3a:6x}))}1g{k.1t()}if(l){n.1E("1D",(j)?0:1);R}U m=n.1Q("1D");e=(j)?{1D:[m,0]}:{1D:[m,1]};k.1C(e)},bH:Q(m){U k=$W(m).1t().5A();if("3r"!=P.1I){R}35{3P("a"!=k.3Y.3b()&&k!=P.2q){k=k.1W}if("a"!=k.3Y.3b()||k.5Z(m.4r())){R}}3j(l){R}U j=k.1Q("3J-1v").4u(" ");2l(m.2r){1o"1Z":j[j.1z>2?3:1]="-"+k.1Q("V");1n;1o"2R":j[j.1z>2?3:1]="1S";1n}if(g.19.3p){k.4P=j[1].1O()+1}1g{k.1f({"3J-1v":j.7N(" ")})}},eh:Q(k){U j=$W(k).1t().5A();3P("a"!=j.3Y.3b()&&j!=P.2q){j=j.1W}if("a"!=j.3Y.3b()){R}2l(j.3v){1o"8O":P.2Q(P.a7(P,P.X.6U));1n;1o"8F":P.2Q(P.bx(P,P.X.6U));1n;1o"7R":P.2Q(1a);1n}},bv:Q(j){j=j||Y;U k=g.2N.1d("bg:7S"),e={},m=0;if(!k){U l=g.$1s("3i").2m("3e-3J").1f({1v:"g1",2f:"2n",18:0,1k:0,13:0,1l:0,2x:(P.X.2x-1),2v:"1T",7T:P.X.7T,1D:0,2p:0,2b:0,2s:0}).26(g.2i).1U();if(g.19.3p){l.53(g.$1s("aW",{2a:\'aO:"";\'},{T:"1M%",V:"1M%",2f:"2n",2X:"bI()",18:0,gq:0,1v:"23",2x:-1,2p:"2V"}))}g.2N.1F("bg:7S",k=1s g.1Y(l,{4x:g.1Y.3k.4w,3a:P.X.bi,6M:Q(n){if(n){P.1f(g.1V(g.2N.b6(),{1v:"23"}))}}.1p(l,P.6h),3X:Q(){P.2C(P.1Q("1D"),1b)}.1p(l)}));e={1D:[0,P.X.bq/1M]}}1g{k.1t();m=k.el.1Q("1D");k.el.1E("3J-57",P.X.7T);e=(j)?{1D:[m,0]}:{1D:[m,P.X.bq/1M]};k.S.3a=P.X.bi}k.el.29();k.1C(e)},bh:Q(j){j=j||Y;U e=P.2O(P.24||P.id);if(e.r.1q&&-1!=e.r.1q.4y){if(!j){e.r.1q.6g();e.r.1q.3t=Y;e.r.1q.1j.4B=Y;e.r.1q.1j.17.1U();e.r.1q.1h.1U()}1g{e.r.1q.5z(e.r.1q.S.5B)}}},6F:Q(k){k=k||0;U j=(g.19.3O)?{T:1e.8w,V:1e.8x}:$W(1e).1H(),e=$W(1e).89();R{13:e.x+k,1l:e.x+j.T-k,18:e.y+k,1k:e.y+j.V-k}},6v:Q(k,l){U j=P.6F(P.X.8v),e=$W(1e).b6();l=l||j;R{y:1u.3L(j.18,1u.4A(("3K-3S"==P.X.3z)?j.1k:e.V+k.V,l.1k-(l.1k-l.18-k.V)/2)-k.V),x:1u.3L(j.13,1u.4A(j.1l,l.1l-(l.1l-l.13-k.T)/2)-k.T)}},3o:Q(m,j){U n=(g.19.3O)?{T:1e.8w,V:1e.8x}:$W(1e).1H(),s=P.1i.1d("2F"),o=P.1i.1d("4R"),l=P.1i.1d("4a"),k=P.1i.1d("3I"),r=P.1i.1d("8t"),e=P.1i.1d("8m"),q=0,p=0;if(m){n.T-=m.x;n.V-=m.y}q=1u.4A(P.2F.T+r,1u.4A(s.T,n.T-l-P.6s.x)),p=1u.4A(P.2F.V+e,1u.4A(s.V,n.V-k-P.6s.y));if(q/p>o){q=p*o}1g{if(q/p<o){p=q/o}}if(!j){P.1i.1E("T",q);if(P.cr){P.cr.1f({18:(P.1r.17.1H().V-P.cr.1H().V)})}}R{T:1u.aN(q),V:1u.aN(p)}},7Z:Q(){if("3r"!==P.1I){R}U n=P.1i.1H();U r=P.2O(P.24||P.id).r.1d("1R"),e=(r.1c)?r.1c.17.44():r.r.44(),s=("5n"==P.X.8y)?e:P.6F(),j=P.1v,o=("3K-3S"==P.X.3z)?P.3o(1a,1b):{T:P.1i.1d("2F").T-P.1i.1d("4a")+P.1i.1d("8t"),V:P.1i.1d("2F").V-P.1i.1d("3I")+P.1i.1d("8m")},l={T:o.T+P.1i.1d("4a"),V:o.V+P.1i.1d("3I")},q=P.1i.3f(),k=(P.1J&&P.49)?P.1J.1d("T")+P.1J.1d("4a"):0,m;n.T-=P.1i.1d("4a");n.V-=P.1i.1d("3I");2l(P.X.7g){1o"4F":m=P.6v(l,s);1n;2k:if("3K-3S"==P.X.3z){o=P.3o({x:(2g(j.13))?0+j.13:(2g(j.1l))?0+j.1l:0,y:(2g(j.18))?0+j.18:(2g(j.1k))?0+j.1k:0},1b);l={T:o.T+P.1i.1d("4a"),V:o.V+P.1i.1d("3I")}}s.18=(s.18+=2g(j.18))?s.18:(s.1k-=2g(j.1k))?s.1k-l.V:s.18;s.1k=s.18+l.V;s.13=(s.13+=2g(j.13))?s.13:(s.1l-=2g(j.1l))?s.1l-l.T:s.13;s.1l=s.13+l.T;m=P.6v(l,s);1n}1s g.1Y(P.1i,{3a:6x,b9:Q(p,u){U v;if(p>0){P.21.1E("T",u.T-p);v=P.21.1H().V;P.1J.1E("V",v-P.1J.1d("3I")).1W.1E("V",v)}if(P.cr){P.cr.1f({18:(P.1r.17.1H().V-P.cr.1H().V)})}}.1p(P,k),3X:Q(){if(P.b7){P.b7.7Z()}}.1p(P)}).1C({T:[n.T+k,o.T+k],18:[q.18,m.y],13:[q.13,m.x]})},dk:Q(l,j,e){U k=Y;2l(g.19.4M){1o"bn":k="2A-3W"!=(l.1Q("3W-67")||l.1Q("-dj-3W-67"));1n;1o"3m":k="2A-3W"!=(l.1Q("3W-67")||l.1Q("-3m-3W-67"));1n;1o"2I":k=g.19.3F||"2A-3W"!=(l.1Q("3W-67")||l.1Q("-9S-3W-67")||"2A-3W");1n;2k:k="2A-3W"!=l.1Q("3W-67");1n}R(k)?j:j-e},5p:Q(o){Q l(r){U q=[];if("6d"==g.2G(r)){R r}1K(U m in r){q.4j(m.6D()+":"+r[m])}R q.7N(";")}U k=l(o).4k(),p=$W(k.4u(";")),n=1a,j=1a;p.3N(Q(q){1K(U m in P.X){j=1s 4Z("^"+m.6D().2D(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]"+(("4m"==m)?"*":"+")+")$","i").78(q.4k());if(j){2l(g.2G(P.X[m])){1o"85":P.X[m]=j[1].6k();1n;1o"6e":P.X[m]=(j[1].3l("."))?(j[1].dp()*((m.3b().3l("1D"))?1M:b5)):j[1].1O();1n;2k:P.X[m]=j[1].4k()}}}},P);1K(U e in P.9v){if(!P.9v.69(e)){6b}j=1s 4Z("(^|;)\\\\s*"+e.6D().2D(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]+)\\\\s*(;|$)","i").78(k);if(j){P.9v[e].1X(P,j[2])}}},b4:Q(){U e=1a,l=P.1v,k=P.2F;1K(U j in l){e=1s 4Z(""+j+"\\\\s*=\\\\s*([^,]+)","i").78(P.X.7g);if(e){l[j]=(cx(l[j]=e[1].1O()))?l[j]:"1B"}}if((71(l.18)&&71(l.1k))||(71(l.13)&&71(l.1l))){P.X.7g="4F"}if(!$W(["3K-3S","54"]).4J(P.X.3z)){1K(U j in k){e=1s 4Z(""+j+"\\\\s*=\\\\s*([^,]+)","i").78(P.X.3z);if(e){k[j]=(cx(k[j]=e[1].1O()))?k[j]:-1}}if(71(k.T)&&71(k.V)){P.X.3z="3K-3S"}}},bO:Q(e){U j,l;1K(U j in e){if(P.9j.69(l=j.3c())){P.9j[l]=e[j]}}},2O:Q(e){R $W(P.3q.2X(Q(j){R(e==j.id)}))[0]},6f:Q(e,j){e=e||1a;j=j||Y;R $W(P.3q.2X(Q(k){R(e==k.2K&&!k.5v&&(j||k.1N)&&(j||"6j"!=k.1I)&&(j||!k.X.5l))}))},bx:Q(m,e){e=e||Y;U j=P.6f(m.2K,1b),k=j.4G(m)+1;R(k>=j.1z)?(!e||1>=j.1z)?1G:j[0]:j[k]},a7:Q(m,e){e=e||Y;U j=P.6f(m.2K,1b),k=j.4G(m)-1;R(k<0)?(!e||1>=j.1z)?1G:j[j.1z-1]:j[k]},cd:Q(j){j=j||1a;U e=P.6f(j,1b);R(e.1z)?e[0]:1G},en:Q(j){j=j||1a;U e=P.6f(j,1b);R(e.1z)?e[e.1z-1]:1G},ec:Q(){R $W(P.3q.2X(Q(e){R("3r"==e.1I||"6a-3d"==e.1I||"6a-2Q"==e.1I)}))},e7:Q(k){U j=P.X.6U,m=1a;if(!P.X.dE){g.2N.2t("aZ");R 1b}k=$W(k);if(P.X.dO&&!(k.hJ||k.hM)){R Y}2l(k.cN){1o 27:k.1t();P.2Q(1a);1n;1o 32:1o 34:1o 39:1o 40:m=P.bx(P,j||32==k.cN);1n;1o 33:1o 37:1o 38:m=P.a7(P,j);1n;2k:}if(m){k.1t();P.2Q(m)}}});U h={3B:"dH.5.25",S:{},7J:{},X:{4i:Y,5l:Y,7w:1b,68:1b,7y:"hj",4m:"aG",7r:"hs",7l:"8u 1q...",2Y:"Y"},1C:Q(l){P.5f=$W(1e).1d("hr:5f",$W([]));U e=1a,j=$W([]),k={};P.S=g.1V(1e.ht||{},P.S);P.X=g.1V(P.X,P.av());c.S=g.3M(P.X);b.S=g.3M(P.X);c.S.2Y=("54"==P.X.2Y||"1b"==P.X.2Y);b.7J=P.7J;if(l){e=$W(l);if(e&&(" "+e.2U+" ").3s(/\\s(6z(?:8o){0,1}|3e)\\s/)){j.4j(e)}1g{R Y}}1g{j=$W(g.$A(g.2i.2B("A")).2X(Q(m){R(" "+m.2U+" ").3s(/\\s(6z(?:8o){0,1}|3e)\\s/)}))}j.3N(Q(p){p=$W(p);U m=p.2B("7C"),n=1a;k=g.1V(g.3M(P.X),P.av(p.3v||" "));if(p.5k("6z")||(p.5k("5h"))){if(m&&m.1z){n=p.4n(m[0])}c.1C(p,"1l-1A: "+("54"==k.2Y||"1b"==k.2Y));if(n){p.53(n)}}if(p.5k("3e")||(p.5k("5h"))){b.1C(p)}1g{p.1L.4l="8s"}P.5f.4j(p)},P);R 1b},1t:Q(m){U e=1a,l=1a,j=$W([]);if(m){e=$W(m);if(e&&(" "+e.2U+" ").3s(/\\s(6z(?:8o){0,1}|3e)\\s/)){j=$W(P.5f.7F(P.5f.4G(e),1))}1g{R Y}}1g{j=$W(P.5f)}3P(j&&j.1z){l=$W(j[j.1z-1]);if(l.1q){l.1q.1t();c.4s.7F(c.4s.4G(l.1q),1);l.1q=1G}b.1t(l);U k=j.7F(j.4G(l),1);3A k}R 1b},7H:Q(j){U e=1a;if(j){P.1t(j);P.1C.1p(P).2w(8X,j)}1g{P.1t();P.1C.1p(P).2w(8X)}R 1b},36:Q(n,e,k,l){U m=$W(n),j=1a;if(m){if((j=m.1d("1R"))){j.2O(j.24||j.id).1I="7G"}if(!c.36(m,e,k,l)){b.36(m,e,k,l)}}},3d:Q(e){R b.3d(e)},2Q:Q(e){R b.2Q(e)},9R:Q(e){R c.9R(e)},ae:Q(e){R c.ae(e)},av:Q(j){U e,p,l,k,n;e=1a;p={};n=[];if(j){l=$W(j.4u(";"));l.2Z(Q(o){1K(U m in P.X){e=1s 4Z("^"+m.6D().2D(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]+)$","i").78(o.4k());if(e){2l(g.2G(P.X[m])){1o"85":p[m]=e[1].6k();1n;1o"6e":p[m]=3Z(e[1]);1n;2k:p[m]=e[1].4k()}}}},P)}1g{1K(k in P.S){e=P.S[k];2l(g.2G(P.X[k.3c()])){1o"85":e=e.6c().6k();1n;1o"6e":e=3Z(e);1n;2k:1n}p[k.3c()]=e}}R p}};$W(1m).1x("5c",Q(){h.1C()});R h})(6X);',62,1160,'|||||||||||||||||||||||||||||||||||||||||||||||||||this|function|return|options|width|var|height|mjs|_o|false|||||left||||self|top|j21|null|true|z7|j29|window|j6|else|z47|t22|z4|bottom|right|document|break|case|j24|zoom|z1|new|stop|Math|position|hint|je1|px|length|click|auto|start|opacity|j6Prop|j30|undefined|j7|state|t25|for|style|100|ready|j17|test|j5|thumb|0px|hidden|hide|extend|parentNode|call|FX|mouseover||t23|zoomWidth|absolute|t27||j32||href|show|src|margin|z6|arguments|index|display|parseInt|z3|body|zoomHeight|default|switch|j2|block|j16|border|t26|type|padding|je2|params|overflow|j27|zIndex|appendChild|title|content|byTag|j23|replace|initializeOn|size|j1|load|trident|zoomPosition|group|firstChild|defined|doc|t16|visibility|restore|mouseout|hotspots|img|className|none|prototype|filter|rightClick|j14||now||||try|update||||duration|toLowerCase|j22|expand|MagicThumb|j8|event|prefix|DIV|catch|Transition|has|webkit|fullScreen|resize|trident4|thumbs|expanded|match|z30|Element|rel|pow|z2|ieMode|expandSize|delete|version|selectorsChange|parent|inner|backCompat|t30|selectors|padY|background|fit|max|detach|forEach|touchScreen|while|onready|targetTouches|screen|inz30|z42|styles|box|onComplete|tagName|parseFloat||init|j33|z21|j9|captionText|createElement|clearTimeout|magicthumb|hCaption|padX|edge|J_TYPE|getDoc|capable|changedTouches|touchend|fps|disableZoom|push|j26|cursor|hintText|removeChild|z44|selectorsEffect|z41|getRelated|zooms|typeof|split|selectorsClass|linear|transition|z28|thumbnail|min|z38|j19s|visible|constructor|center|indexOf|J_UUID|_cleanup|contains|instanceof|Class|engine|opacityReverse|j15|scrollTop|borderWidth|ratio|round|clicked|wrapper|z43Bind|relative|timer|layout|RegExp||apply|mt_vml_|append|original|getButton|dragMode|color|z13|z9|divTag|nodeType|domready|Array|expandEffect|items|t31|MagicZoomPlus|showTitle|custom|j13|disableExpand|hintPosition|image|ts|z37|onload|lastTap|div|j3|200|error|t28|float|on|activate|getTarget|alwaysShowZoom|win|cbs|selector|z34|_tmpp|clientY|touch|link|scrollLeft|requestAnimationFrame|clientX|z35|slide|magiczoom|storage|fade|In|prevItem|naturalWidth|Out|kill|array|adjustX|hasChild||adjustY|300|createTextNode|setTimeout|unload|showLoading|sizing|preloadSelectorsBig|hasOwnProperty|busy|continue|toString|string|number|t15|pause|ieBack|paddingTop|uninitialized|j18|paddingBottom|initMouseEvent|getElementsByTagName|hintVisible|j19|paddingRight|paddingLeft|scrPad|Doc|initHeight|t14|initWidth|250|zoomDistance|MagicZoom|z48|touchstart|lastSelector|dashize|zoomViewHeight|t13|t29|setupContent|offset|identifier|mode|keepThumbnail|onStart|important|css3Transformations|onerror|swap|readyState|rev|captionPosition|slideshowLoop|complete|restoreEffect|magicJS|onInititalize|preservePosition|nextItem|isNaN|easing|loading|restoreSpeed||z45|slideshowEffect|exec|render|expandTrigger|initLeftPos|class|z24|z36|forceAnimation|expandPosition|changeContent|pad|throw|entireImage|loadingMsg|_timer|z3Timer|ddy|ddx|z43|loadingClass|_unbind|400|cloneNode|presto|preloadSelectorsSmall|naturalHeight|hintClass|calc|z14|z18|span|setupHint|z23|splice|updating|refresh|static|lang|random|floor|clickToActivate|join|activatedEx|initTopPos|zoomAlign|close|t32|backgroundColor|css3Animation|shift|onBeforeRender|set|10000|onresize|getElementsByClassName|events|buttons|mouseup|currentStyle|boolean|J_EUID|vertical|t10|j10|Top|Bottom|expandSpeed|ff0000|getBox|Coigm|bold|moveOnClick|Right|String|Left|button|vspace|panZoom|Plus|media|z7Rect|lastLeftPos|pointer|hspace|Loading|screenPadding|innerWidth|innerHeight|expandAlign|inline|za|loadingOpacity|newImg|selectorsEffectSpeed|effect|next|dissolve|to|holder|PFX|j31|mousedown|hoverTimer|pounce|previous|IMG|dblclick|500|replaceChild|bko|stopImmediatePropagation|implement|ojk|150|xk|element||enabled|borderLeftWidth|features|hintOpacity|compatMode|z29|toggle|abort|_handlers|getStorage|mzParams|z11|not|originId|Ff|z33|speed|external|_lang|swapTimer|z10|MagicJS|item|9_|styleSheets|hover|firstRun|z0|clickInitZoom|namespaces|_deprecated|innerHTML|100000px|theme_mac|head|smoothing|documentElement|resizeTimer|exOptions|found|_event_prefix_|createEvent|selectorsMouseoverDelay|callee|defaults|ufx|titleSource|insertBefore|sqrt|cancelAnimationFrame|contextmenu|platform|zoomIn|ms|outline|Function|cos|defaultView|query|PI|navigator|horizontal|J_EXTENDED|insertRule|object|uuid|el_arr|out|t18|clickToInitialize|initialize|onErrorHandler|tl|destroy||zoomOut|stopAnimation|Event||construct|request|resizeBind|startTime|loop|chrome|_event_add_|_event_del_|bgColor|smoothingSpeed|adjustPosition|caller|HTMLElement|_z37|shadow|magic|z1Holder|preventDefault|z15|thumbChange|styleFloat|onabort|mousemove|z26|Zoom|loadingPositionY|loadingPositionX|mz|z20|loopBind|z16|ceil|javascript|10000px|url|rect|t12|prevent|t6|buttonsPosition|IFRAME|textAlign|Taac|keydown|captionSource|z46|offsetHeight|Slide|parseExOptions|1000|j12|zoomItem|linkTarget|onAfterRender|overlapBox|||nWidth|borderBottomWidth|borderTopWidth||toggleMZ|backgroundSpeed|touches|restoreTrigger||reverse|gecko|slideshowSpeed|open|backgroundOpacity||tc|transparent|5000|t11|5001|t17|tr|je3|z17|big|z19|x7|VML|fitZoomWindow|zoomFade|cbHover|mask|magicthumb_ie_ex|ios|backgroundImage|behavior|localStorage|setLang|fill|date|cancelFullScreen|getComputedStyle|CancelFullScreen|cancel|errorEventName|documentMode|glow|900|zoomWindowEffect|changeEventName|xpath|vml|buttonClose|Khtml|inherit|backgroundRepeat|no|Moz|buttonsDisplay|mac||mozCancelAnimationFrame|t19||buttonNext|Webkit|repeat|backgroundPosition|microsoft|concat||com|XMLHttpRequest|z25|schemas|Image||add|z32|z31|urn|touchmove|isFinite|back|sineIn|expoIn|roundCss|requestFullScreen|stopPropagation|initializing|gecko181|quadIn|webkit419|bounceIn|elasticIn|backIn|cubicIn|finishTime|keyCode|UUID|420|dispatchEvent|which|addEventListener|t8|curLeft|interval|cancelBubble|wrap|relatedTarget|scroll|enclose|offsetWidth|preload|sMagicZoom|Date|DXImageTransform|change|transform|nativize|onError|raiseEvent|z39|textnode|1px|Microsoft|text|getElementById|styles_arr|compareDocumentPosition|moz|adjBorder|toArray|expandTriggerDelay|Alpha||toFloat|setProps|getBoundingClientRect|t7|Width|blur|isReady|zoomFadeOutSpeed|z22|Tahoma|fontFamily|fontWeight|charCodeAt|101|fontSize|keyboard|t2|drag|v4|opera|captionWidth|captionHeight|t4|v2|loadingMsgExpanded|keyboardCtrl|nHeight|t1|fromCharCode|insertCSS|tap|z8|callout|tmp|css|borderRightWidth|clone|highlight|j28|select|abs|map|_bind|clickToDeactivate|onKey|cssClass|continueAnimation|user|temporary|t21|phone|zoomFadeInSpeed|hone|align|cbClick|entire|disable|move||t5|t20|DocumentTouch|android||alt|unselectable|backcompat|od|captionSpeed|buttonPrevious|z27|MagicZoomPup|charAt|UIEvent|html|removeEventListener|evaluate|ontouchstart|setInterval|offsetParent|presto925|userAgent|KeyboardEvent|innerText|detachEvent|exists|runtime|KeyEvent|attachEvent|j20|iframe|childNodes|air|DOMElement|querySelector|regexp|collection|target|iemobile|srcElement|iris|Object|offsetTop|blazer|hiptop|returnValue|compal|elaine|pageX|fennec|pageY|MouseEvent|fromElement|lge|avantgo|pageXOffset|clientHeight|mobile|tablet|pageYOffset|toElement|blackberry|byClass|kindle|scrollHeight|scrollWidth|bada|clientWidth|re|postMessage|WebKitPoint|mozInnerScreenY|performance|msPerformance|210|unknown|taintEnabled|getBoxObjectFor|ActiveXObject|wap|419|192|windows|xda|525|xiino|addCSS|211|220|webkitCancelRequestAnimationFrame|Transform|animationName|msCancelAnimationFrame|oCancelAnimationFrame|webkitRequestAnimationFrame|oRequestAnimationFrame|msRequestAnimationFrame|AnimationName|other|webos|applicationCache|260|fixed|linux|toUpperCase|270|vodafone|191|progid|palm|ob||getTime|filters|ixi|hasLayout|os|netfront|mmp|j11|clientTop|clientLeft|setAttribute|slice|midp|maemo|mozRequestAnimationFrame|lef|fullscreenerror|webkitIsFullScreen||FullScreen|fullscreenchange|khtml|190|181|up|RequestFullScreen|treo|psp|pocket|plucker|cssFloat|getPropertyValue|symbian|j4|offsetLeft|sheet|line|2em|cssText|3px|MagicZoomHeader|MagicBoxGlow|frameBorder|imageSize|owningElement|coords|currentTarget|00001|ccc|createStyleSheet|nextSibling|MagicBoxShadow|stroked|Previous|tile|Next|_new|beforeEnd|Close|MozUserSelect|selectstart|10002|trident900|MagicZoomBigImageCont|swapImage|textDecoration|hand|MagicThumbHint|removeAttribute|caption|MagicZoomPlusHint|getAttribute|Zf|execCommand|BackgroundImageCache|9999|getAttributeNode|zoomActivation|magiczoomplus|MagicZoomPlusLoading|MagicZoomPlusOptions|clickTo|lt|amp|rtl|dir|_self|111|Expand|toLocaleLowerCase|sort|td|MagicThumbLoading|000000|009|skipAnimation|ctrlKey|mzp|10001|metaKey|z12|insertAdjacentHTML|618|backOut|cubicOut|quadOut|expoOut|getXY|expo|slideOut|elastic|slideIn|bounceOut|bounce|sineOut|autohide|fireEvent|loaded|eventType|createEventObject|initEvent|doScroll|DOMContentLoaded|cbhover|mt|clearInterval|||||curFrame|600|cubic|elasticOut|MagicZoomLoading|distance||MagicZoomHint||small|lastChild|always|middle|source|deactivate|delay|preserve|msg|addRule|Invalid|_blank|Magic|quad|styleSheet|stylesId|sine|cssRules'.split('|'),0,{}))
;
/*


   Magic Zoom v4.5.20 DEMO
   Copyright 2014 Magic Toolbox
   Buy a license: www.magictoolbox.com/magiczoom/
   License agreement: http://www.magictoolbox.com/license/


*/

eval(function(m,a,g,i,c,k){c=function(e){return(e<a?'':c(parseInt(e/a)))+((e=e%a)>35?String.fromCharCode(e+29):e.toString(36))};if(!''.replace(/^/,String)){while(g--){k[c(g)]=i[g]||c(g)}i=[function(e){return k[e]}];c=function(){return'\\w+'};g=1};while(g--){if(i[g]){m=m.replace(new RegExp('\\b'+c(g)+'\\b','g'),i[g])}}return m}('(P(){L(Y.4E){N}S b={3G:"ap.7.4",8b:0,4v:{},$71:P(d){N(d.$3d||(d.$3d=++a.8b))},64:P(d){N(a.4v[d]||(a.4v[d]={}))},$F:P(){},$V:P(){N V},1L:P(d){N(1j!=d)},at:P(d){N!!(d)},1Z:P(d){L(!a.1L(d)){N V}L(d.$2J){N d.$2J}L(!!d.3j){L(1==d.3j){N"65"}L(3==d.3j){N"9Z"}}L(d.1u&&d.6w){N"as"}L(d.1u&&d.5L){N"1A"}L((d 2Q Y.aa||d 2Q Y.7p)&&d.2O===a.3J){N"4A"}L(d 2Q Y.3t){N"3W"}L(d 2Q Y.7p){N"P"}L(d 2Q Y.6Z){N"3U"}L(a.T.2C){L(a.1L(d.8v)){N"38"}}1c{L(d===Y.38||d.2O==Y.6d||d.2O==Y.a3||d.2O==Y.aq||d.2O==Y.bN||d.2O==Y.bH){N"38"}}L(d 2Q Y.7t){N"9d"}L(d 2Q Y.7n){N"c4"}L(d===Y){N"Y"}L(d===1b){N"1b"}N 36(d)},1C:P(j,h){L(!(j 2Q Y.3t)){j=[j]}1o(S g=0,e=j.1u;g<e;g++){L(!a.1L(j)){4z}1o(S f 1H(h||{})){2v{j[g][f]=h[f]}2N(d){}}}N j[0]},66:P(h,g){L(!(h 2Q Y.3t)){h=[h]}1o(S f=0,d=h.1u;f<d;f++){L(!a.1L(h[f])){4z}L(!h[f].1K){4z}1o(S e 1H(g||{})){L(!h[f].1K[e]){h[f].1K[e]=g[e]}}}N h[0]},7Q:P(f,e){L(!a.1L(f)){N f}1o(S d 1H(e||{})){L(!f[d]){f[d]=e[d]}}N f},$2v:P(){1o(S f=0,d=1A.1u;f<d;f++){2v{N 1A[f]()}2N(g){}}N 1a},$A:P(f){L(!a.1L(f)){N $X([])}L(f.7E){N $X(f.7E())}L(f.6w){S e=f.1u||0,d=1w 3t(e);35(e--){d[e]=f[e]}N $X(d)}N $X(3t.1K.c9.1I(f))},2L:P(){N 1w 7t().bs()},3F:P(h){S f;2R(a.1Z(h)){1n"6K":f={};1o(S g 1H h){f[g]=a.3F(h[g])}1m;1n"3W":f=[];1o(S e=0,d=h.1u;e<d;e++){f[e]=a.3F(h[e])}1m;37:N h}N a.$(f)},$:P(e){L(!a.1L(e)){N 1a}L(e.$6g){N e}2R(a.1Z(e)){1n"3W":e=a.7Q(e,a.1C(a.3t,{$6g:a.$F}));e.2t=e.7K;e.3h=a.3t.3h;N e;1m;1n"3U":S d=1b.8l(e);L(a.1L(d)){N a.$(d)}N 1a;1m;1n"Y":1n"1b":a.$71(e);e=a.1C(e,a.3Y);1m;1n"65":a.$71(e);e=a.1C(e,a.27);1m;1n"38":e=a.1C(e,a.6d);1m;1n"9Z":N e;1m;1n"P":1n"3W":1n"9d":37:1m}N a.1C(e,{$6g:a.$F})},$1w:P(d,f,e){N $X(a.8O.2V(d)).8X(f||{}).1d(e||{})},bS:P(e){L(1b.6p&&1b.6p.1u){1b.6p[0].6N(e,0)}1c{S d=$X(1b.2V("1k"));d.2z(e);1b.4u("63")[0].1M(d)}}};S a=b;Y.4E=b;Y.$X=b.$;a.3t={$2J:"3W",7h:P(g,h){S d=K.1u;1o(S e=K.1u,f=(h<0)?1l.3s(0,e+h):h||0;f<e;f++){L(K[f]===g){N f}}N-1},3h:P(d,e){N K.7h(d,e)!=-1},7K:P(d,g){1o(S f=0,e=K.1u;f<e;f++){L(f 1H K){d.1I(g,K[f],f,K)}}},4a:P(d,j){S h=[];1o(S g=0,e=K.1u;g<e;g++){L(g 1H K){S f=K[g];L(d.1I(j,K[g],g,K)){h.4O(f)}}}N h},bt:P(d,h){S g=[];1o(S f=0,e=K.1u;f<e;f++){L(f 1H K){g[f]=d.1I(h,K[f],f,K)}}N g}};a.66(6Z,{$2J:"3U",5Y:P(){N K.3L(/^\\s+|\\s+$/g,"")},bu:P(d,e){N(e||V)?(K.46()===d.46()):(K.2B().46()===d.2B().46())},2f:P(){N K.3L(/-\\D/g,P(d){N d.7F(1).b1()})},7w:P(){N K.3L(/[A-Z]/g,P(d){N("-"+d.7F(0).2B())})},4g:P(d){N 2x(K,d||10)},bL:P(){N 2S(K)},8d:P(){N!K.3L(/17/i,"").5Y()},2j:P(e,d){d=d||"";N(d+K+d).7h(d+e+d)>-1}});b.66(7p,{$2J:"P",1O:P(){S e=a.$A(1A),d=K,f=e.4n();N P(){N d.3a(f||1a,e.8P(a.$A(1A)))}},34:P(){S e=a.$A(1A),d=K,f=e.4n();N P(g){N d.3a(f||1a,$X([g||Y.38]).8P(e))}},2p:P(){S e=a.$A(1A),d=K,f=e.4n();N Y.4m(P(){N d.3a(d,e)},f||0)},aO:P(){S e=a.$A(1A),d=K;N P(){N d.2p.3a(d,e)}},8T:P(){S e=a.$A(1A),d=K,f=e.4n();N Y.av(P(){N d.3a(d,e)},f||0)}});S c=6l.aC.2B();a.T={5f:{7N:!!(1b.az),ac:!!(Y.ae),6L:!!(1b.aF)},52:P(){N"aE"1H Y||(Y.8k&&1b 2Q 8k)}(),aR:c.3T(/9s|aH|ak|ab\\/|bM|bC|c8|ca|c3|c2|bZ|9k(9m|9l|ad)|bA|b9|aU |b0|aZ|bi|bp|92 m(bq|1H)i|ar( aX)?|9q|p(a6|ag)\\/|aw|aM|aI|aJ|a4|an\\.(T|ao)|af|am|aj (ce|9q)|a8|a7/)?17:V,30:(Y.92)?"6R":!!(Y.cc)?"2C":(1j!=1b.bO||1a!=Y.bP)?"7W":(1a!=Y.bR||!6l.bQ)?"2A":"bK",3G:"",2y:0,6k:c.3T(/9k(?:ad|9l|9m)/)?"9U":(c.3T(/(?:bJ|9s)/)||6l.6k.3T(/bB|6V|bE/i)||["bF"])[0].2B(),3O:1b.5B&&"9A"==1b.5B.2B(),2K:P(){N(1b.5B&&"9A"==1b.5B.2B())?1b.1Y:1b.5M},3N:Y.3N||Y.bT||Y.c6||Y.c5||Y.c7||1j,5Z:Y.5Z||Y.9j||Y.9j||Y.bV||Y.bU||Y.bX||1j,1T:V,2i:P(){L(a.T.1T){N}a.T.1T=17;a.1Y=$X(1b.1Y);a.6V=$X(Y);(P(){a.T.45={2D:V,1R:""};L(36 1b.1Y.1k.7A!=="1j"){a.T.45.2D=17}1c{S f="9g 9C O 6H 9W".5P(" ");1o(S e=0,d=f.1u;e<d;e++){a.T.45.1R=f[e];L(36 1b.1Y.1k[a.T.45.1R+"bY"]!=="1j"){a.T.45.2D=17;1m}}}})();(P(){a.T.4B={2D:V,1R:""};L(36 1b.1Y.1k.c0!=="1j"){a.T.4B.2D=17}1c{S f="9g 9C O 6H 9W".5P(" ");1o(S e=0,d=f.1u;e<d;e++){a.T.4B.1R=f[e];L(36 1b.1Y.1k[a.T.4B.1R+"bv"]!=="1j"){a.T.4B.2D=17;1m}}}})();$X(1b).8f("3M")}};(P(){P d(){N!!(1A.5L.6U)}a.T.3G=("6R"==a.T.30)?!!(1b.63)?bm:!!(Y.bn)?bo:!!(Y.8Z)?bk:(a.T.5f.6L)?bj:((d())?bg:((1b.4t)?bh:5u)):("2C"==a.T.30)?!!(Y.bx||Y.by)?7J:!!(Y.7M&&Y.bw)?6:((Y.7M)?5:4):("2A"==a.T.30)?((a.T.5f.7N)?((a.T.5f.6L)?bf:8y):be):("7W"==a.T.30)?!!(1b.63)?5u:!!1b.5q?aY:!!(Y.8Z)?aV:((1b.4t)?b2:b3):"";a.T[a.T.30]=a.T[a.T.30+a.T.3G]=17;L(Y.7b){a.T.7b=17}a.T.2y=(!a.T.2C)?0:(1b.81)?1b.81:P(){S e=0;L(a.T.3O){N 5}2R(a.T.3G){1n 4:e=6;1m;1n 5:e=7;1m;1n 6:e=8;1m;1n 7J:e=9;1m}N e}()})();(P(){a.T.22={2D:V,67:P(){N V},6c:P(){},80:P(){},7Y:"",7Z:"",1R:""};L(36 1b.87!="1j"){a.T.22.2D=17}1c{S f="2A ba o 6H bd".5P(" ");1o(S e=0,d=f.1u;e<d;e++){a.T.22.1R=f[e];L(36 1b[a.T.22.1R+"7u"]!="1j"){a.T.22.2D=17;1m}}}L(a.T.22.2D){a.T.22.7Y=a.T.22.1R+"b8";a.T.22.7Z=a.T.22.1R+"b7";a.T.22.67=P(){2R(K.1R){1n"":N 1b.22;1n"2A":N 1b.b4;37:N 1b[K.1R+"b5"]}};a.T.22.6c=P(g){N(K.1R==="")?g.8s():g[K.1R+"b6"]()};a.T.22.80=P(g){N(K.1R==="")?1b.87():1b[K.1R+"7u"]()}}})();a.27={6F:P(d){N K.2M.2j(d," ")},2e:P(d){L(d&&!K.6F(d)){K.2M+=(K.2M?" ":"")+d}N K},4w:P(d){d=d||".*";K.2M=K.2M.3L(1w 7n("(^|\\\\s)"+d+"(?:\\\\s|$)"),"$1").5Y();N K},bz:P(d){N K.6F(d)?K.4w(d):K.2e(d)},39:P(f){f=(f=="7I"&&K.4x)?"6J":f.2f();S d=1a,e=1a;L(K.4x){d=K.4x[f]}1c{L(1b.6G&&1b.6G.7s){e=1b.6G.7s(K,1a);d=e?e.c1([f.7w()]):1a}}L(!d){d=K.1k[f]}L("1y"==f){N a.1L(d)?2S(d):1}L(/^(1W(6v|6Q|6P|6O)9R)|((2l|5Q)(6v|6Q|6P|6O))$/.1D(f)){d=2x(d)?d:"1x"}N("1X"==d?1a:d)},2G:P(f,d){2v{L("1y"==f){K.1V(d);N K}1c{L("7I"==f){K.1k[("1j"===36(K.1k.6J))?"bW":"6J"]=d;N K}1c{L(a.T.45&&/7A/.1D(f)){}}}K.1k[f.2f()]=d+(("7i"==a.1Z(d)&&!$X(["5a","1h"]).3h(f.2f()))?"1g":"")}2N(g){}N K},1d:P(e){1o(S d 1H e){K.2G(d,e[d])}N K},bG:P(){S d={};a.$A(1A).2t(P(e){d[e]=K.39(e)},K);N d},1V:P(h,e){e=e||V;h=2S(h);L(e){L(h==0){L("2b"!=K.1k.2w){K.1k.2w="2b"}}1c{L("3S"!=K.1k.2w){K.1k.2w="3S"}}}L(a.T.2C){L(!K.4x||!K.4x.bI){K.1k.1h=1}2v{S g=K.aT.6w("8K.8F.8A");g.67=(1!=h);g.1y=h*1B}2N(d){K.1k.4a+=(1==h)?"":"bD:8K.8F.8A(67=17,1y="+h*1B+")"}}K.1k.1y=h;N K},8X:P(d){1o(S e 1H d){K.ai(e,""+d[e])}N K},26:P(){N K.1d({3A:"3R",2w:"2b"})},1U:P(){N K.1d({3A:"3H",2w:"3S"})},1z:P(){N{Q:K.a5,U:K.aK}},5H:P(){N{12:K.5W,13:K.5O}},aG:P(){S d=K,e={12:0,13:0};do{e.13+=d.5O||0;e.12+=d.5W||0;d=d.1E}35(d);N e},4k:P(){L(a.1L(1b.5M.8i)){S d=K.8i(),f=$X(1b).5H(),h=a.T.2K();N{12:d.12+f.y-h.aQ,13:d.13+f.x-h.aP}}S g=K,e=t=0;do{e+=g.aN||0;t+=g.ax||0;g=g.ay}35(g&&!(/^(?:1Y|aD)$/i).1D(g.3o));N{12:t,13:e}},5l:P(){S e=K.4k();S d=K.1z();N{12:e.12,1e:e.12+d.U,13:e.13,1i:e.13+d.Q}},6f:P(f){2v{K.95=f}2N(d){K.aA=f}N K},3k:P(){N(K.1E)?K.1E.2W(K):K},5k:P(){a.$A(K.aL).2t(P(d){L(3==d.3j||8==d.3j){N}$X(d).5k()});K.3k();K.8g();L(K.$3d){a.4v[K.$3d]=1a;5J a.4v[K.$3d]}N 1a},5c:P(g,e){e=e||"1e";S d=K.1S;("12"==e&&d)?K.5d(g,d):K.1M(g);N K},2r:P(f,e){S d=$X(f).5c(K,e);N K},aB:P(d){K.5c(d.1E.9L(K,d));N K},79:P(d){L("65"!==a.1Z("3U"==a.1Z(d)?d=1b.8l(d):d)){N V}N(K==d)?V:(K.3h&&!(a.T.8r))?(K.3h(d)):(K.8u)?!!(K.8u(d)&16):a.$A(K.4J(d.3o)).3h(d)}};a.27.4i=a.27.39;a.27.au=a.27.1d;L(!Y.27){Y.27=a.$F;L(a.T.30.2A){Y.1b.2V("aS")}Y.27.1K=(a.T.30.2A)?Y["[[al.1K]]"]:{}}a.66(Y.27,{$2J:"65"});a.3Y={1z:P(){L(a.T.a9||a.T.8r){N{Q:Y.7U,U:Y.8G}}N{Q:a.T.2K().aW,U:a.T.2K().cf}},5H:P(){N{x:Y.eo||a.T.2K().5O,y:Y.en||a.T.2K().5W}},dB:P(){S d=K.1z();N{Q:1l.3s(a.T.2K().du,d.Q),U:1l.3s(a.T.2K().dL,d.U)}}};a.1C(1b,{$2J:"1b"});a.1C(Y,{$2J:"Y"});a.1C([a.27,a.3Y],{2T:P(g,e){S d=a.64(K.$3d),f=d[g];L(1j!=e&&1j==f){f=d[g]=e}N(a.1L(f)?f:1a)},7q:P(f,e){S d=a.64(K.$3d);d[f]=e;N K},8h:P(e){S d=a.64(K.$3d);5J d[e];N K}});L(!(Y.6j&&Y.6j.1K&&Y.6j.1K.4t)){a.1C([a.27,a.3Y],{4t:P(d){N a.$A(K.4u("*")).4a(P(g){2v{N(1==g.3j&&g.2M.2j(d," "))}2N(f){}})}})}a.1C([a.27,a.3Y],{dM:P(){N K.4t(1A[0])},4J:P(){N K.4u(1A[0])}});L(a.T.22.2D){a.27.8s=P(){a.T.22.6c(K)}}a.6d={$2J:"38",1J:P(){L(K.8w){K.8w()}1c{K.8v=17}L(K.69){K.69()}1c{K.dO=V}N K},4V:P(){S e,d;e=((/54/i).1D(K.23))?K.5C[0]:K;N(!a.1L(e))?{x:0,y:0}:{x:e.dN||e.6T+a.T.2K().5O,y:e.dI||e.70+a.T.2K().5W}},9v:P(){S d=K.dJ||K.dK;35(d&&3==d.3j){d=d.1E}N d},5U:P(){S e=1a;2R(K.23){1n"24":e=K.8c||K.dP;1m;1n"33":e=K.8c||K.dQ;1m;37:N e}2v{35(e&&3==e.3j){e=e.1E}}2N(d){e=1a}N e},5s:P(){L(!K.89&&K.5V!==1j){N(K.5V&1?1:(K.5V&2?3:(K.5V&4?2:0)))}N K.89}};a.6t="8a";a.72="dV";a.5S="";L(!1b.8a){a.6t="dU";a.72="dT";a.5S="42"}a.1C([a.27,a.3Y],{1t:P(g,f){S i=("3M"==g)?V:17,e=K.2T("4r",{});e[g]=e[g]||{};L(e[g].5X(f.$4s)){N K}L(!f.$4s){f.$4s=1l.6u(1l.6s()*a.2L())}S d=K,h=P(j){N f.1I(d)};L("3M"==g){L(a.T.1T){f.1I(K);N K}}L(i){h=P(j){j=a.1C(j||Y.e,{$2J:"38"});N f.1I(d,$X(j))};K[a.6t](a.5S+g,h,V)}e[g][f.$4s]=h;N K},21:P(g){S i=("3M"==g)?V:17,e=K.2T("4r");L(!e||!e[g]){N K}S h=e[g],f=1A[1]||1a;L(g&&!f){1o(S d 1H h){L(!h.5X(d)){4z}K.21(g,d)}N K}f=("P"==a.1Z(f))?f.$4s:f;L(!h.5X(f)){N K}L("3M"==g){i=V}L(i){K[a.72](a.5S+g,h[f],V)}5J h[f];N K},8f:P(h,f){S m=("3M"==h)?V:17,l=K,j;L(!m){S g=K.2T("4r");L(!g||!g[h]){N K}S i=g[h];1o(S d 1H i){L(!i.5X(d)){4z}i[d].1I(K)}N K}L(l===1b&&1b.5R&&!l.8j){l=1b.5M}L(1b.5R){j=1b.5R(h);j.dR(f,17,17)}1c{j=1b.dS();j.dH=h}L(1b.5R){l.8j(j)}1c{l.dG("42"+f,j)}N j},8g:P(){S d=K.2T("4r");L(!d){N K}1o(S e 1H d){K.21(e)}K.8h("4r");N K}});(P(){L("5A"===1b.5q){N a.T.2i.2p(1)}L(a.T.2A&&a.T.3G<8y){(P(){($X(["dw","5A"]).3h(1b.5q))?a.T.2i():1A.5L.2p(50)})()}1c{L(a.T.2C&&a.T.2y<9&&Y==12){(P(){(a.$2v(P(){a.T.2K().dx("13");N 17}))?a.T.2i():1A.5L.2p(50)})()}1c{$X(1b).1t("dv",a.T.2i);$X(Y).1t("2a",a.T.2i)}}})();a.3J=P(){S h=1a,e=a.$A(1A);L("4A"==a.1Z(e[0])){h=e.4n()}S d=P(){1o(S l 1H K){K[l]=a.3F(K[l])}L(K.2O.$2I){K.$2I={};S o=K.2O.$2I;1o(S n 1H o){S j=o[n];2R(a.1Z(j)){1n"P":K.$2I[n]=a.3J.8N(K,j);1m;1n"6K":K.$2I[n]=a.3F(j);1m;1n"3W":K.$2I[n]=a.3F(j);1m}}}S i=(K.3n)?K.3n.3a(K,1A):K;5J K.6U;N i};L(!d.1K.3n){d.1K.3n=a.$F}L(h){S g=P(){};g.1K=h.1K;d.1K=1w g;d.$2I={};1o(S f 1H h.1K){d.$2I[f]=h.1K[f]}}1c{d.$2I=1a}d.2O=a.3J;d.1K.2O=d;a.1C(d.1K,e[0]);a.1C(d,{$2J:"4A"});N d};b.3J.8N=P(d,e){N P(){S g=K.6U;S f=e.3a(d,1A);N f}};a.6V=$X(Y);a.8O=$X(1b)})();(P(b){L(!b){6W"7C 7D 7H";N}L(b.2u){N}S a=b.$;b.2u=1w b.3J({M:{4Y:60,49:99,8U:P(c){N-(1l.6x(1l.6y*c)-1)/2},8S:b.$F,4c:b.$F,8L:b.$F,8E:b.$F,4I:V,8M:17},3q:1a,3n:P(d,c){K.el=a(d);K.M=b.1C(K.M,c);K.31=V},28:P(c){K.3q=c;K.7X=0;K.dr=0;K.6C=b.2L();K.8V=K.6C+K.M.49;K.6A=K.6M.1O(K);K.M.8S.1I();L(!K.M.4I&&b.T.3N){K.31=b.T.3N.1I(Y,K.6A)}1c{K.31=K.6M.1O(K).8T(1l.2Y(7v/K.M.4Y))}N K},6B:P(){L(K.31){L(!K.M.4I&&b.T.3N&&b.T.5Z){b.T.5Z.1I(Y,K.31)}1c{ds(K.31)}K.31=V}},1J:P(c){c=b.1L(c)?c:V;K.6B();L(c){K.43(1);K.M.4c.2p(10)}N K},6z:P(e,d,c){N(d-e)*c+e},6M:P(){S d=b.2L();L(d>=K.8V){K.6B();K.43(1);K.M.4c.2p(10);N K}S c=K.M.8U((d-K.6C)/K.M.49);L(!K.M.4I&&b.T.3N){K.31=b.T.3N.1I(Y,K.6A)}K.43(c)},43:P(c){S d={};1o(S e 1H K.3q){L("1y"===e){d[e]=1l.2Y(K.6z(K.3q[e][0],K.3q[e][1],c)*1B)/1B}1c{d[e]=K.6z(K.3q[e][0],K.3q[e][1],c);L(K.M.8M){d[e]=1l.2Y(d[e])}}}K.M.8L(d);K.8D(d);K.M.8E(d)},8D:P(c){N K.el.1d(c)}});b.2u.3r={dt:P(c){N c},8B:P(c){N-(1l.6x(1l.6y*c)-1)/2},dy:P(c){N 1-b.2u.3r.8B(1-c)},88:P(c){N 1l.3u(2,8*(c-1))},dz:P(c){N 1-b.2u.3r.88(1-c)},8J:P(c){N 1l.3u(c,2)},dE:P(c){N 1-b.2u.3r.8J(1-c)},8I:P(c){N 1l.3u(c,3)},dF:P(c){N 1-b.2u.3r.8I(1-c)},8H:P(d,c){c=c||1.dY;N 1l.3u(d,2)*((c+1)*d-c)},dD:P(d,c){N 1-b.2u.3r.8H(1-d)},7B:P(d,c){c=c||[];N 1l.3u(2,10*--d)*1l.6x(20*d*1l.6y*(c[0]||1)/3)},dC:P(d,c){N 1-b.2u.3r.7B(1-d,c)},7y:P(e){1o(S d=0,c=1;1;d+=c,c/=2){L(e>=(7-4*d)/11){N c*c-1l.3u((11-6*d-11*e)/4,2)}}},dA:P(c){N 1-b.2u.3r.7y(1-c)},3R:P(c){N 0}}})(4E);(P(b){L(!b){6W"7C 7D 7H";N}L(b.7d){N}S a=b.$;b.7d=1w b.3J(b.2u,{3n:P(c,d){K.6D=c;K.M=b.1C(K.M,d);K.31=V},28:P(c){K.$2I.28([]);K.7x=c;N K},43:P(c){1o(S d=0;d<K.6D.1u;d++){K.el=a(K.6D[d]);K.3q=K.7x[d];K.$2I.43(c)}}})})(4E);S 6Y=(P(c){S d=c.$;c.$5F=P(f){$X(f).1J();N V};c.8Q=P(f,h,l){S i,g,j,k=[],e=-1;l||(l=c.dX);i=c.$(l)||(1b.63||1b.1Y).1M(c.$1w("1k",{1Q:l,23:"86/8t"}));g=i.e0||i.em;L("6K"==c.1Z(h)){1o(j 1H h){k.4O(j+":"+h[j])}h=k.ek(";")}L(g.6N){e=g.6N(f+" {"+h+"}",g.ej.1u)}1c{e=g.ei(f,h)}N e};S a={3G:"eh.5.20",M:{},62:{1y:50,3c:V,78:40,4Y:25,1p:4o,1s:4o,4b:15,1F:"1i",4L:"12",9o:"6n",3l:V,5y:17,3B:V,3V:V,x:-1,y:-1,4T:V,9Q:V,2h:"2a",5N:17,3g:"12",5x:"29",a1:17,8C:6q,9K:5u,2H:"",1r:17,4H:"7P",5m:"85",9F:75,9M:"ep",5j:17,9c:"ef 1h...",9T:"e4",9V:75,7a:-1,7c:-1,3C:"1G",9r:60,3x:"83",8W:6q,9w:17,9D:V,4K:"",9b:17,59:V,4U:V,3E:V,2i:c.$F},8m:$X([/^(1y)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1y-e5)(\\s+)?:(\\s+)?(17|V)$/i,/^(5N\\-5h)(\\s+)?:(\\s+)?(\\d+)$/i,/^(4Y)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1h\\-Q)(\\s+)?:(\\s+)?(\\d+\\%?)(1g)?/i,/^(1h\\-U)(\\s+)?:(\\s+)?(\\d+\\%?)(1g)?/i,/^(1h\\-e3)(\\s+)?:(\\s+)?(\\d+)(1g)?/i,/^(1h\\-1v)(\\s+)?:(\\s+)?(1i|13|12|1e|3f|2n|#([a-5b-5g\\-:\\.]+))$/i,/^(1h\\-e2)(\\s+)?:(\\s+)?(1i|13|12|1e|4M)$/i,/^(1h\\-7V\\-dZ)(\\s+)?:(\\s+)?(17|V)$/i,/^(1h\\-Y\\-6E)(\\s+)?:(\\s+)?(6n|9p|V)$/i,/^(eg\\-e1)(\\s+)?:(\\s+)?(17|V)$/i,/^(e6\\-42\\-1G)(\\s+)?:(\\s+)?(17|V)$/i,/^(e7\\-1U\\-1h)(\\s+)?:(\\s+)?(17|V)$/i,/^(ed\\-1v)(\\s+)?:(\\s+)?(17|V)$/i,/^(x)(\\s+)?:(\\s+)?([\\d.]+)(1g)?/i,/^(y)(\\s+)?:(\\s+)?([\\d.]+)(1g)?/i,/^(1G\\-6I\\-44)(\\s+)?:(\\s+)?(17|V)$/i,/^(1G\\-6I\\-ee)(\\s+)?:(\\s+)?(17|V)$/i,/^(82\\-42)(\\s+)?:(\\s+)?(2a|1G|24)$/i,/^(1G\\-6I\\-82)(\\s+)?:(\\s+)?(17|V)$/i,/^(5N)(\\s+)?:(\\s+)?(17|V)$/i,/^(1U\\-29)(\\s+)?:(\\s+)?(17|V|12|1e)$/i,/^(29\\-ec)(\\s+)?:(\\s+)?(29|#([a-5b-5g\\-:\\.]+))$/i,/^(1h\\-4q)(\\s+)?:(\\s+)?(17|V)$/i,/^(1h\\-4q\\-1H\\-5h)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1h\\-4q\\-eb\\-5h)(\\s+)?:(\\s+)?(\\d+)$/i,/^(2H)(\\s+)?:(\\s+)?([a-5b-5g\\-:\\.]+)$/i,/^(1r)(\\s+)?:(\\s+)?(17|V)/i,/^(1r\\-86)(\\s+)?:(\\s+)?([^;]*)$/i,/^(1r\\-1y)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1r\\-1v)(\\s+)?:(\\s+)?(85|9G|9O|bl|br|bc)/i,/^(1U\\-4G)(\\s+)?:(\\s+)?(17|V)$/i,/^(4G\\-e8)(\\s+)?:(\\s+)?([^;]*)$/i,/^(4G\\-1y)(\\s+)?:(\\s+)?(\\d+)$/i,/^(4G\\-1v\\-x)(\\s+)?:(\\s+)?(\\d+)(1g)?/i,/^(4G\\-1v\\-y)(\\s+)?:(\\s+)?(\\d+)(1g)?/i,/^(e9\\-84)(\\s+)?:(\\s+)?(1G|24)$/i,/^(2m\\-84)(\\s+)?:(\\s+)?(1G|24)$/i,/^(2m\\-24\\-ea)(\\s+)?:(\\s+)?(\\d+)$/i,/^(2m\\-6E)(\\s+)?:(\\s+)?(83|4q|7g|V)$/i,/^(2m\\-6E\\-5h)(\\s+)?:(\\s+)?(\\d+)$/i,/^(2m\\-4A)(\\s+)?:(\\s+)?([a-5b-5g\\-:\\.]+)$/i,/^(7V\\-1h\\-Y)(\\s+)?:(\\s+)?(17|V)$/i,/^(7O\\-2m\\-dW)(\\s+)?:(\\s+)?(17|V)$/i,/^(7O\\-2m\\-9h)(\\s+)?:(\\s+)?(17|V)$/i,/^(dp\\-cD)(\\s+)?:(\\s+)?(17|V)$/i,/^(1i\\-1G)(\\s+)?:(\\s+)?(17|V)$/i,/^(cE\\-1h)(\\s+)?:(\\s+)?(17|V)$/i]),2X:$X([]),8n:P(h){S g=/(1G|24)/i;1o(S f=0;f<a.2X.1u;f++){L(a.2X[f].2g&&!a.2X[f].4P){a.2X[f].3Q()}1c{L(g.1D(a.2X[f].M.2h)&&a.2X[f].4j){a.2X[f].4j=h}}}},1J:P(f){S e=$X([]);L(f){L((f=$X(f))&&f.1h){e.4O(f)}1c{N V}}1c{e=$X(c.$A(c.1Y.4J("A")).4a(P(g){N((" "+g.2M+" ").3T(/\\cC\\s/)&&g.1h)}))}e.2t(P(g){g.1h&&g.1h.1J()},K)},28:P(e){L(0==1A.1u){a.6a();N 17}e=$X(e);L(!e||!(" "+e.2M+" ").3T(/\\s(6Y|cB)\\s/)){N V}L(!e.1h){S f=1a;35(f=e.1S){L(f.3o=="6X"){1m}e.2W(f)}35(f=e.cy){L(f.3o=="6X"){1m}e.2W(f)}L(!e.1S||e.1S.3o!="6X"){6W"cz cA 7P"}a.2X.4O(1w a.1h(e,(1A.1u>1)?1A[1]:1j))}1c{e.1h.28()}},2z:P(h,e,g,f){L((h=$X(h))&&h.1h){(1a===e||""===e)&&(e=1j);(1a===g||""===g)&&(g=1j);h.1h.2z(e,g,f);N 17}N V},6a:P(){c.$A(Y.1b.4u("A")).2t(P(e){L(e.2M.2j("6Y"," ")){L(a.1J(e)){a.28.2p(1B,e)}1c{a.28(e)}}},K)},1U:P(e){N a.7T(e)},7T:P(e){L((e=$X(e))&&e.1h){N e.1h.44()}N V},cF:P(e){L((e=$X(e))&&e.1h){N e.1h.3Q()}N V},cG:P(e){L((e=$X(e))&&e.1h){N{x:e.1h.M.x,y:e.1h.M.y}}},9x:P(g){S f,e;f="";1o(e=0;e<g.1u;e++){f+=6Z.cM(14^g.cN(e))}N f}};a.47=P(){K.3n.3a(K,1A)};a.47.1K={3n:P(e){K.cb=1a;K.3m=1a;K.6S=K.9t.34(K);K.5r=1a;K.Q=0;K.U=0;K.5G=0;K.5z=0;K.1W={13:0,1i:0,12:0,1e:0};K.2l={13:0,1i:0,12:0,1e:0};K.1T=V;K.3I=1a;L("3U"==c.1Z(e)){K.3I=c.$1w("4N").2e("9B-cL-5n").1d({1v:"2d",12:"-cK",Q:"7R",U:"7R",3p:"2b"}).2r(c.1Y);K.R=c.$1w("5n").2r(K.3I);K.5D();K.R.1N=e}1c{K.R=$X(e);K.5D();K.R.1N=e.1N}},4D:P(){L(K.3I){L(K.R.1E==K.3I){K.R.3k().1d({1v:"cH",12:"1X"})}K.3I.5k();K.3I=1a}},9t:P(f){L(f){$X(f).1J()}L(K.cb){K.4D();K.cb.1I(K,V)}K.3z()},5D:P(e){K.3m=1a;L(e==17||!(K.R.1N&&(K.R.5A||K.R.5q=="5A"))){K.3m=P(f){L(f){$X(f).1J()}L(K.1T){N}K.1T=17;K.3e();L(K.cb){K.4D();K.cb.1I()}}.34(K);K.R.1t("2a",K.3m);$X(["9J","a2"]).2t(P(f){K.R.1t(f,K.6S)},K)}1c{K.1T=17}},2z:P(f,h){S g=K.1T;K.3z();S e=c.$1w("a",{1P:f});L(17!==h&&K.R.1N.2j(e.1P)&&0!==K.R.Q){K.1T=g}1c{K.5D(17);K.R.1N=f}e=1a},3e:P(){K.5G=K.R.5G||K.R.Q;K.5z=K.R.5z||K.R.U;K.Q=K.R.Q;K.U=K.R.U;L(K.Q==0&&K.U==0&&c.T.2A){K.Q=K.R.5G;K.U=K.R.5z}$X(["6P","6O","6v","6Q"]).2t(P(f){K.2l[f.2B()]=K.R.4i("2l"+f).4g();K.1W[f.2B()]=K.R.4i("1W"+f+"9R").4g()},K);L(c.T.6R||(c.T.2C&&!c.T.3O)){K.Q-=K.2l.13+K.2l.1i;K.U-=K.2l.12+K.2l.1e}},5o:P(){S e=1a;e=K.R.5l();N{12:e.12+K.1W.12,1e:e.1e-K.1W.1e,13:e.13+K.1W.13,1i:e.1i-K.1W.1i}},cI:P(){L(K.5r){K.5r.1N=K.R.1N;K.R=1a;K.R=K.5r}},2a:P(e){L(K.1T){L(!K.Q){(P(){K.3e();K.4D();e.1I()}).1O(K).2p(1)}1c{K.4D();e.1I()}}1c{L(!K.3m){e.1I(K,V);N}K.cb=e}},3z:P(){L(K.3m){K.R.21("2a",K.3m)}$X(["9J","a2"]).2t(P(e){K.R.21(e,K.6S)},K);K.3m=1a;K.cb=1a;K.Q=1a;K.1T=V;K.cJ=V}};a.1h=P(){K.7m.3a(K,1A)};a.1h.1K={7m:P(h,f,g){S e={};K.2Z=-1;K.2g=V;K.4X=0;K.4Z=0;K.5p=!(K.W);K.5v=K.5p?{}:K.5v||{};K.4P=V;K.2F=1a;K.6o=$X(Y).2T("3D:9e")||$X(Y).2T("3D:9e",c.$1w("4N").1d({1v:"2d",12:-cx,Q:10,U:10,3p:"2b"}).2r(c.1Y));K.M=c.3F(a.62);L(h){K.c=$X(h)}K.3i=("4N"==K.c.3o.2B());e=c.1C(e,K.5T());e=c.1C(e,K.5T(K.c.4F));e=c.1C(e,K.5v);L(f){e=c.1C(e,c.1C(17===g?K.5v:{},K.5T(f)))}L(e.3l&&!e.4T&&1j===e.3B){e.3B=17}c.1C(K.M,e);K.M.2H+="";L("2a"==K.M.2h&&c.1L(K.M.91)&&"17"==K.M.91.46()){K.M.2h="1G"}L(c.1L(K.M.73)&&K.M.73!=K.M.3C){K.M.3C=K.M.73}L(K.5p&&!K.3i){K.1Q=K.5E=K.c.1Q||"";L(!K.c.1Q){K.c.1Q=K.1Q="1h-"+1l.6u(1l.6s()*c.2L())}}L("2n"==K.M.1F&&K.M.3l){K.M.5y=17}L(K.M.3E){K.2g=V;K.M.4T=17;K.M.1r=V}("3U"===c.1Z(K.M.2i))&&("P"===c.1Z(Y[K.M.2i]))&&(K.M.2i=Y[K.M.2i]);L(h){K.4l=1a;K.56=K.74.34(K);K.6e=K.6m.34(K);K.76=K.1U.1O(K,17);K.97=K.9I.1O(K);K.2P=K.57.34(K);K.7l=P(k){S j=$X(K.c).2T("3D:Y:6h"),i=$X(Y).1z();L(j.Q!==i.Q||j.U!==i.U){4d(K.94);K.94=K.9X.1O(K).2p(10);$X(K.c).7q("3D:Y:6h",i)}}.34(K);L(!K.3i){K.c.1t("1G",P(j){S i=j.5s();L(3==i){N 17}$X(j).1J();L(!c.T.2C){K.9i()}N V})}K.c.1t("74",K.56);K.c.1t("6m",K.6e);L("24"==K.M.2h){K.c.1t("24",K.56)}L(c.T.52){K.c.1d({"-2A-cw-ck":"3R","-2A-54-cl":"3R","-2A-cm-cj-4S":"ci"});L(!K.M.3E){K.c.1t("7e",K.56);K.c.1t("4Q",K.6e)}1c{K.c.1t("1G",P(i){i.69()})}}K.c.8x="42";K.c.1k.dq="3R";K.c.1t("cg",c.$5F);L(!K.3i){K.c.1d({1v:"4W",3A:(c.T.ch)?"3H":"9u-3H",cn:"3R",9y:"0",8p:"co",3p:"2b"});L(c.T.2y){K.c.2e("9B-1o-cu"+c.T.2y)}L(K.c.39("9z")=="4M"){K.c.1d({5Q:"1X 1X"})}}K.c.1h=K}1c{K.M.2h="2a"}L(!K.M.4U){K.c.1t("9P",c.$5F)}L("2a"==K.M.2h){K.58()}1c{L(""!==K.5E){K.7r(17)}}},58:P(){S j,m,l,k,h;h=["^cd}k.{~i|cv.ct.h{bb.cs|}cp`.ah.cq.cr(-6:6<5","#cO",10,"cP","4M","1B%"];L(!K.19){K.19=1w a.47(K.c.1S);K.1f=1w a.47(K.c.1P)}1c{K.1f.2z(K.c.1P)}L(!K.W){K.W={R:$X(1b.2V("3Z")).2e("dd").1d({3p:"2b",5a:K.M.1F=="2n"?1B:de,12:"-5i",1v:"2d",Q:K.M.1p+"1g",U:K.M.1s+"1g"}),1h:K,2s:"1x",5e:"1x",53:0,51:0,3v:{2q:"13",48:1},3y:{2q:"12",48:1},3f:V,3P:K.M.1p,4e:K.M.1s};L("2n"==K.M.1F){K.W.R.2e("2n-1h")}L(!(c.T.dc&&c.T.2y<9)&&"2n"!=K.M.1F){2R(K.M.9o){1n"6n":K.W.R.2e("db");1m;1n"9p":K.W.R.2e("d8");1m;37:1m}}K.W.26=P(){L(K.R.1k.12!="-5i"&&K.1h.18&&!K.1h.18.32){K.R.1k.12="-5i"}L(K.R.1E===c.1Y){K.R.2r(K.1h.6o)}};K.W.9E=K.W.26.1O(K.W);L(c.T.7o){j=$X(1b.2V("d9"));j.1N="da:\'\'";j.1d({13:"1x",12:"1x",1v:"2d","z-2U":-1}).df=0;K.W.55=K.W.R.1M(j)}K.W.2E=$X(1b.2V("3Z")).2e("dg").1d({1v:"4W",5a:10,13:"1x",12:"1x",2l:"dm"}).26();m=c.$1w("3Z",{},{3p:"2b"});m.1M(K.1f.R);K.1f.R.1d({2l:"1x",5Q:"1x",1W:"1x",Q:"1X",U:"1X"});L(K.M.3g=="1e"){K.W.R.1M(m);K.W.R.1M(K.W.2E)}1c{K.W.R.1M(K.W.2E);K.W.R.1M(m)}K.W.R.2r(K.6o);L("1j"!==36(h)){K.W.g=$X(1b.2V("4N")).1d({4S:h[1],dn:h[2]+"1g",dl:h[3],dk:"dh",1v:"2d","z-2U":10+(""+(K.1f.R.39("z-2U")||0)).4g(),Q:h[5],9z:h[4],"di-U":"dj",13:"1x"}).6f(a.9x(h[0])).2r(K.W.R,((1l.6u(1l.6s()*d7)+1)%2)?"12":"1e")}}K.W.3P=K.M.1p;K.W.4e=K.M.1s;K.W.3f=V;L(K.M.3g!="V"&&K.M.3g!=V){S i=K.W.2E;i.26();35(l=i.1S){i.2W(l)}L(K.M.5x=="29"&&""!=K.c.29){i.1M(1b.5t(K.c.29));i.1U()}1c{L(K.M.5x.2j("#")){S n=K.M.5x.3L(/^#/,"");L($X(n)){i.6f($X(n).95);i.1U()}}}}1c{K.W.2E.26()}K.c.7S=K.c.29;K.c.29="";K.19.2a(K.96.1O(K))},96:P(e){L(!e&&e!==1j){N}L(!K.19){N}L(!K.M.3c){K.19.R.1V(1)}L(!K.3i){K.c.1d({Q:"1X",U:"1X"})}L(K.M.5j&&!K.M.3E){K.4y=4m(K.97,6q)}L(K.M.2H!=""&&$X(K.M.2H)){K.d6()}L(K.c.1Q!=""){K.7r()}K.1f.2a(K.6i.1O(K))},6i:P(h){S g,f,i,e;L(!h&&h!==1j){4d(K.4y);L(K.M.5j&&K.2k){K.2k.26()}K.2Z=c.2L();N}L(!K.19||!K.1f){N}f=K.19.R.5l();K.5I=f;L(f.1e==f.12){K.6i.1O(K).2p(99);N}i=("3f"==K.M.1F)?K.c.1Q+"-9h":K.M.1F.2j("#")?K.M.1F.3L(/^#/,""):1a;L(i&&$X(i)){K.W.3f=17;$X(i).1M(K.W.R)}1c{L("2n"==K.M.1F){K.c.1M(K.W.R)}}L(K.19.Q==0&&c.T.2C){K.19.3e();K.1f.3e();!K.3i&&K.c.1d({Q:K.19.Q+"1g"})}g=K.W.2E.1z();L(/%$/i.1D(K.M.1p)){K.M.1p=(2x(K.M.1p)/1B)*K.19.Q}L(/%$/i.1D(K.M.1s)){K.M.1s=(2x(K.M.1s)/1B)*K.19.U}K.W.R.1d({Q:K.M.1p});g=K.W.2E.1z();L(K.M.9b||K.M.59){L((K.1f.Q<K.M.1p)||K.M.59){K.M.1p=K.1f.Q;K.W.R.1d({Q:K.M.1p});g=K.W.2E.1z()}L((K.1f.U<K.M.1s)||K.M.59){K.M.1s=K.1f.U+g.U}}2R(K.M.1F){1n"1i":K.W.R.1k.13=f.1i+K.M.4b+"1g";K.W.3v.2q="1i";1m;1n"13":K.W.R.1k.13=f.13-K.M.4b-K.M.1p+"1g";1m;1n"12":K.W.2s=f.12-(K.M.4b+K.M.1s)+"1g";1m;1n"1e":K.W.2s=f.1e+K.M.4b+"1g";K.W.3y.2q="1e";1m;1n"2n":K.W.R.1d({13:"1x",U:"1B%",Q:"1B%"});K.M.1p=K.19.Q;K.M.1s=K.19.U;K.W.2s="1x";g=K.W.2E.1z();1m;37:L(K.W.3f){e=$X(K.W.R.1E).1z();L(/%$/i.1D(K.W.3P)){K.M.1p=(2x(K.W.3P)/1B)*e.Q}L(/%$/i.1D(K.W.4e)){K.M.1s=(2x(K.W.4e)/1B)*e.U}K.W.R.1d({13:"1x",Q:K.M.1p});K.W.2s="1x";g=K.W.2E.1z()}1m}L(K.M.3g=="1e"){$X(K.1f.R.1E).2G("U",K.M.1s-g.U)}K.W.R.1d("2n"==K.M.1F?{}:{U:K.M.1s+"1g",Q:K.M.1p+"1g"}).1V(1);L(c.T.7o&&K.W.55){K.W.55.1d({Q:K.M.1p+"1g",U:K.M.1s+"1g"})}L(K.M.1F=="1i"||K.M.1F=="13"){L(K.M.4L=="4M"){K.W.2s=(f.1e-(f.1e-f.12)/2-K.M.1s/2)+"1g";K.W.3y={2q:"1e",48:2}}1c{L(K.M.4L=="1e"){K.W.2s=(f.1e-K.M.1s)+"1g";K.W.3y.2q="1e"}1c{K.W.2s=f.12+"1g"}}}1c{L(K.M.1F=="12"||K.M.1F=="1e"){L(K.M.4L=="4M"){K.W.R.1k.13=(f.1i-(f.1i-f.13)/2-K.M.1p/2)+"1g";K.W.3v={2q:"1i",48:2}}1c{L(K.M.4L=="1i"){K.W.R.1k.13=(f.1i-K.M.1p)+"1g";K.W.3v.2q="1i"}1c{K.W.R.1k.13=f.13+"1g"}}}}K.W.53=2x(K.W.2s,10);K.W.51=2x(K.W.R.1k.13,10);K.W.5e=K.W.51;K.W.2s=K.W.53;K.4f=K.M.1s-g.U;L(K.W.g){K.W.g.1d({12:K.M.3g=="1e"?0:"1X",1e:K.M.3g=="1e"?"1X":0})}K.1f.R.1d({1v:"4W",3b:"1x",2l:"1x",13:"1x",12:"1x"});K.90();L(K.M.3B){L(K.M.x==-1){K.M.x=K.19.Q/2}L(K.M.y==-1){K.M.y=K.19.U/2}K.1U()}1c{L(K.M.a1){K.2c=1w c.2u(K.W.R,{4I:"9U"===c.T.6k})}K.W.R.1d({12:"-5i"})}L(K.M.5j&&K.2k){K.2k.26()}K.c.1t("6r",K.2P);K.c.1t("33",K.2P);L(c.T.52){K.c.1t("7e",K.2P);K.c.1t("a0",K.2P);K.c.1t("4Q",K.2P)}K.9N();$X(K.c).2T("3D:Y:6h",$X(Y).1z());$X(Y).1t("9H",K.7l);L(!K.M.3E&&(!K.M.4T||"1G"==K.M.2h)){K.2g=17}L("1G"==K.M.2h&&K.4j){K.57(K.4j)}L(K.4P){K.44()}K.2Z=c.2L();!K.3i&&("P"==c.1Z(K.M.2i))&&K.M.2i.1I(1a,K.1Q,!K.5p)},9N:P(){S i=/9G|br/i,e=/bl|br|bc/i,f=/bc|9O/i,h=1a;K.4h=1j;L(!K.M.1r){L(K.1r){K.1r.5k();K.1r=1j}N}L(!K.1r){K.1r=$X(1b.2V("3Z")).2e(K.M.9M).1d({3A:"3H",3p:"2b",1v:"2d",2w:"2b","z-2U":1});L(K.M.4H!=""){K.1r.1M(1b.5t(K.M.4H))}K.c.1M(K.1r)}1c{L(K.M.4H!=""){h=K.1r[(K.1r.1S)?"9L":"1M"](1b.5t(K.M.4H),K.1r.1S);h=1a}}K.1r.1d({13:"1X",1i:"1X",12:"1X",1e:"1X",3A:"3H",1y:(K.M.9F/1B),"3s-Q":(K.19.Q-4)});S g=K.1r.1z();K.1r.2G((i.1D(K.M.5m)?"1i":"13"),(f.1D(K.M.5m)?(K.19.Q-g.Q)/2:2)).2G((e.1D(K.M.5m)?"1e":"12"),2);K.4h=17;K.1r.1U()},9I:P(){L(K.1f.1T){N}K.2k=$X(1b.2V("3Z")).2e(K.M.9T).1V(K.M.9V/1B).1d({3A:"3H",3p:"2b",1v:"2d",2w:"2b","z-2U":20,"3s-Q":(K.19.Q-4)});K.2k.1M(1b.5t(K.M.9c));K.c.1M(K.2k);S e=K.2k.1z();K.2k.1d({13:(K.M.7a==-1?((K.19.Q-e.Q)/2):(K.M.7a))+"1g",12:(K.M.7c==-1?((K.19.U-e.U)/2):(K.M.7c))+"1g"});K.2k.1U()},7r:P(g){S e,h,f=1w 7n("1h\\\\-1Q(\\\\s+)?:(\\\\s+)?"+K.c.1Q+"($|;)");K.2m=$X([]);c.$A(1b.4u("A")).2t(P(j){L(f.1D(j.4F)){L(!$X(j).4p){j.4p=P(k){L(!c.T.2C){K.9i()}$X(k).1J();N V};j.1t("1G",j.4p)}L(g){L(("24"==K.M.2h||"1G"==K.M.2h)&&!$X(j).5w){j.5w=P(l,k){k.21("1G",k.5w);L(!!K.19){N}$X(l).1J();K.c.1P=k.1P;K.c.1S.1N=k.4C;K.28(k.4F)}.34(K,j);j.1t("1G",j.5w)}N}S i=c.$1w("a",{1P:j.4C});(K.M.4K!="")&&$X(j)[K.1f.R.1N.2j(j.1P)&&K.19.R.1N.2j(i.1P)?"2e":"4w"](K.M.4K);L(K.1f.R.1N.2j(j.1P)&&K.19.R.1N.2j(i.1P)){K.4l=j}i=1a;L(!j.3K){j.3K=P(m,l){l=m.cV||m.9v();2v{35("a"!=l.3o.2B()){l=l.1E}}2N(k){N}L(l.79(m.5U())){N}L(m.23=="33"){L(K.3w){4d(K.3w)}K.3w=V;N}L(l.29!=""){K.c.29=l.29}L(m.23=="24"){K.3w=4m(K.2z.1O(K,l.1P,l.4C,l.4F,l),K.M.9r)}1c{K.2z(l.1P,l.4C,l.4F,l)}}.34(K);j.1t(K.M.3C,j.3K);L(K.M.3C=="24"){j.1t("33",j.3K)}}j.1d({9y:"0",3A:"9u-3H"});L(K.M.9w){h=1w 98();h.1N=j.4C}L(K.M.9D){e=1w 98();e.1N=j.1P}K.2m.4O(j)}},K)},1J:P(f){2v{K.3Q();K.c.21("6r",K.2P);K.c.21("33",K.2P);L(c.T.52){K.c.21("a0",K.2P);K.c.21("4Q",K.2P)}L(1j===f&&K.18){K.18.R.26()}L(K.2c){K.2c.1J()}K.1q=1a;K.2g=V;L(K.2m!==1j){K.2m.2t(P(e){L(K.M.4K!=""){e.4w(K.M.4K)}L(1j===f){e.21(K.M.3C,e.3K);L(K.M.3C=="24"){e.21("33",e.3K)}e.3K=1a;e.21("1G",e.4p);e.4p=1a}},K)}L(K.M.2H!=""&&$X(K.M.2H)){$X(K.M.2H).26();$X(K.M.2H).cW.5d($X(K.M.2H),$X(K.M.2H).cU);L(K.c.7k){K.c.2W(K.c.7k)}}L(K.M.3c){K.c.4w("8q");K.19.R.1V(1)}K.2c=1a;L(K.2k){K.c.2W(K.2k)}L(K.1r){K.1r.26()}L(1j===f){L(K.1r){K.c.2W(K.1r)}K.1r=1a;K.1f.3z();K.19.3z();(K.18&&K.18.R)&&K.c.2W(K.18.R);(K.W&&K.W.R)&&K.W.R.1E.2W(K.W.R);K.18=1a;K.W=1a;K.1f=1a;K.19=1a;L(!K.M.4U){K.c.21("9P",c.$5F)}L(""===K.5E){K.c.cT("1Q")}1c{K.c.1Q=K.5E}$X(Y).21("9H",K.7l)}L(K.4y){4d(K.4y);K.4y=1a}K.2F=1a;K.c.7k=1a;K.2k=1a;L(K.c.29==""){K.c.29=K.c.7S}K.2Z=-1}2N(g){}},28:P(f,e){L(K.2Z!=-1){N}K.7m(V,f,(1a===e||1j===e))},2z:P(x,l,f,w){S g,A,e,i,s,h,C=1a,u=1a,j=K.4l,m,k,n,z,r,p,q,D,B,o;w=w||1a;L(c.2L()-K.2Z<4o||K.2Z==-1||K.5K){K.3w&&4d(K.3w);g=4o-c.2L()+K.2Z;L(K.2Z==-1){g=4o}K.3w=4m(K.2z.1O(K,x,l,f,w),g);N}L(w&&K.4l==w){N}1c{K.4l=w}A=P(E){L(1j!=x){K.c.1P=x}L(1j===f){f=""}L(K.M.3V){f="x: "+K.M.x+"; y: "+K.M.y+"; "+f}L(1j!=l){K.19.2z(l)}L(E!==1j){K.19.2a(E)}};K.19.3e();i=K.19.Q;s=K.19.U;K.1J(17);L(K.M.3x!="V"&&1j!==l){K.5K=17;S y=$X(K.c.68(17)).1d({1v:"2d",12:0,13:0,Q:""});S v=c.$1w("4N",{1Q:K.c.1E.1Q,"4A":K.c.1E.2M}).2e("6b-8R-8z").1d({Q:$X(K.c.1E).39("Q"),"3s-Q":$X(K.c.1E).39("3s-Q")});L("cQ"===K.c.1E.3o.cR()){K.c.1E.5d(v,K.c)}1c{K.c.1E.1E.5d(v,K.c.1E)}v.5c(y);c.T.7b&&v.1z();L(c.T.2y&&c.T.2y<8){$X(y.1S).1V(1)}h=1w a.47(y.1S);h.2z(l);L("7g"==K.M.3x){o=K.c.1P;k=K.2m.4a(P(E){N E.1P.2j(o)});k=(k[0])?$X(k[0].4J("5n")[0]||k[0]):K.19.R;n=K.2m.4a(P(E){N E.1P.2j(x)});n=(n[0])?$X(n[0].4J("5n")[0]||n[0]):1a;L(1a==n){n=K.19.R;k=K.19.R}r=K.19.R.4k(),p=k.4k(),q=n.4k(),B=k.1z(),D=n.1z()}e=P(G){S E={},I={},H={},J=1a,F=1a;L(V===G){h.3z();$X(h.R).3k();h=1a;v.3k();K.5K=V;L(u){u.7X="cS"}K.4l=j;K.28(1a,j);N}L(c.T.2y&&c.T.2y<8&&(i===h.Q||0===h.Q)){h.R.2G("1h",1);v.1z();h.3e()}L("7g"==K.M.3x){E.Q=[i,B.Q];E.U=[s,B.U];E.12=[r.12,p.12];E.13=[r.13,p.13];I.Q=[D.Q,h.Q];I.U=[D.U,h.U];I.12=[q.12,r.12];v.1d({2l:""});y.1V(0).1d({U:0,Q:h.Q,1v:"4W"});I.13=[q.13,y.4k().13];H.Q=[i,h.Q];h.R.2r(c.1Y).1d({1v:"2d","z-2U":7z,13:I.13[0],12:I.12[0],Q:I.Q[0],U:I.U[0]});J=$X(K.c.1S.68(V)).2r(c.1Y).1d({1v:"2d","z-2U":8Y,13:E.13[0],12:E.12[0],2w:"3S"});F=K.c.39("1W-Q")}1c{h.R.2r(K.c).1d({1v:"2d","z-2U":7z,1y:0,13:"1x",12:"1x",U:"1X"});J=$X(K.c.1S.68(V)).2r(K.c).1d({1v:"2d","z-2U":8Y,13:"1x",12:"1x",2w:"3S",U:"1X"});I={1y:[0,1]};L(i!=h.Q||s!=h.U){H.Q=I.Q=E.Q=[i,h.Q];H.U=I.U=E.U=[s,h.U]}L(K.M.3x=="4q"){E.1y=[1,0]}}m=1w a.47(J);m.2a($X(P(){$X(K.c.1S).1d({2w:"2b"});v.3k();L(1a!==F){K.c.2G("1W-Q",0)}1w c.7d([K.c,h.R,(J||K.c.1S)],{49:K.M.8W,4c:P(){L(J){J.3k();J=1a}L(1a!==F){K.c.2G("1W-Q",F)}A.1I(K,P(){h.3z();$X(K.c.1S).1d({2w:"3S"});$X(h.R).3k();h=1a;L(E.1y){$X(K.c.1S).1d({1y:1})}K.5K=V;K.28(f,w);L(C){C.2p(10)}}.1O(K))}.1O(K)}).28([H,I,E])}).1O(K))};h.2a(e.1O(K))}1c{A.1I(K,P(){K.c.1d({Q:K.19.Q+"1g",U:K.19.U+"1g"});K.28(f,w);L(C){C.2p(10)}}.1O(K))}},5T:P(f){S e,j,h,g;e=1a;j=[];f=f||"";L(""==f){1o(g 1H a.M){e=a.M[g];2R(c.1Z(a.62[g.2f()])){1n"8o":e=e.46().8d();1m;1n"7i":L(!("1p"===g.2f()||"1s"===g.2f())||!/\\%$/i.1D(e)){e=2S(e)}1m;37:1m}j[g.2f()]=e}}1c{h=$X(f.5P(";"));h.2t(P(i){a.8m.2t(P(k){e=k.cX(i.5Y());L(e){2R(c.1Z(a.62[e[1].2f()])){1n"8o":j[e[1].2f()]=e[4]==="17";1m;1n"7i":j[e[1].2f()]=(("1p"===e[1].2f()||"1s"===e[1].2f())&&/\\%$/.1D(e[4]))?e[4]:2S(e[4]);1m;37:j[e[1].2f()]=e[4]}}},K)},K)}L(V===j.3x){j.3x="V"}N j},90:P(){S f,e;L(!K.18){K.18={R:$X(1b.2V("3Z")).2e("8q").1d({5a:10,1v:"2d",3p:"2b"}).26(),Q:20,U:20,7j:""};K.c.1M(K.18.R);K.18.7j=K.18.R.39("7f-4S")}L(K.M.59){K.18.R.1d({"1W-Q":"1x",8p:"37"})}K.18.32=V;K.18.U=K.4f/(K.1f.U/K.19.U);K.18.Q=K.M.1p/(K.1f.Q/K.19.Q);L(K.18.Q>K.19.Q){K.18.Q=K.19.Q}L(K.18.U>K.19.U){K.18.U=K.19.U}K.18.Q=1l.2Y(K.18.Q);K.18.U=1l.2Y(K.18.U);K.18.3b=K.18.R.4i("9S").4g();K.18.R.1d({Q:(K.18.Q-2*(c.T.3O?0:K.18.3b))+"1g",U:(K.18.U-2*(c.T.3O?0:K.18.3b))+"1g"});L(!K.M.3c&&!K.M.4U){K.18.R.1V(2S(K.M.1y/1B));L(K.18.2o){K.18.R.2W(K.18.2o);K.18.2o=1a}}1c{L(K.18.2o){K.18.2o.1N=K.19.R.1N}1c{f=K.19.R.68(V);f.8x="42";K.18.2o=$X(K.18.R.1M(f)).1d({1v:"2d",5a:5})}L(K.M.3c){K.18.2o.1d(K.19.R.1z());K.18.R.1V(1);L(c.T.2y&&c.T.2y<9){K.18.2o.1V(1)}}1c{L(K.M.4U){K.18.2o.1V(0.cY)}K.18.R.1V(2S(K.M.1y/1B))}}},57:P(h,f){L(!K.2g||h===1j||h.d4){N V}L(!K.18){N V}S i=(/54/i).1D(h.23)&&h.9n.1u>1;S g=("4Q"==h.23&&!h.7G);L((!K.3i||h.23!="33")&&!i){$X(h).1J()}L(f===1j){f=$X(h).4V()}L(K.1q===1a||K.1q===1j){K.1q=K.19.5o()}L(g||("33"==h.23&&K.c!==h.5U()&&!K.c.79(h.5U()))||i||f.x>K.1q.1i||f.x<K.1q.13||f.y>K.1q.1e||f.y<K.1q.12){K.3Q();N V}K.4P=V;L(h.23=="33"||h.23=="4Q"){N V}L(K.M.3l&&!K.41){N V}L(!K.M.5y){f.x-=K.4X;f.y-=K.4Z}L((f.x+K.18.Q/2)>=K.1q.1i){f.x=K.1q.1i-K.18.Q/2}L((f.x-K.18.Q/2)<=K.1q.13){f.x=K.1q.13+K.18.Q/2}L((f.y+K.18.U/2)>=K.1q.1e){f.y=K.1q.1e-K.18.U/2}L((f.y-K.18.U/2)<=K.1q.12){f.y=K.1q.12+K.18.U/2}K.M.x=f.x-K.1q.13;K.M.y=f.y-K.1q.12;L(K.2F===1a){K.2F=4m(K.76,10)}L(c.1L(K.4h)&&K.4h){K.4h=V;K.1r.26()}N 17},1U:P(i){L(i&&!K.2F){N}S o,l,h,g,n,m,k,j,f,e=K.M,p=K.18;o=p.Q/2;l=p.U/2;p.R.1k.13=e.x-o+K.19.1W.13+"1g";p.R.1k.12=e.y-l+K.19.1W.12+"1g";L(K.M.3c){p.2o.1k.13="-"+(2S(p.R.1k.13)+p.3b)+"1g";p.2o.1k.12="-"+(2S(p.R.1k.12)+p.3b)+"1g"}h=(K.M.x-o)*(K.1f.Q/K.19.Q);g=(K.M.y-l)*(K.1f.U/K.19.U);L(K.1f.Q-h<e.1p){h=K.1f.Q-e.1p;L(h<0){h=0}}L(K.1f.U-g<K.4f){g=K.1f.U-K.4f;L(g<0){g=0}}L(1b.5M.d5=="d3"){h=(e.x+p.Q/2-K.19.Q)*(K.1f.Q/K.19.Q)}h=1l.2Y(h);g=1l.2Y(g);L(e.5N===V||(!p.32)){K.1f.R.1k.13=(-h)+"1g";K.1f.R.1k.12=(-g)+"1g"}1c{n=2x(K.1f.R.1k.13);m=2x(K.1f.R.1k.12);k=(-h-n);j=(-g-m);L(!k&&!j){K.2F=1a;N}k*=e.78/1B;L(k<1&&k>0){k=1}1c{L(k>-1&&k<0){k=-1}}n+=k;j*=e.78/1B;L(j<1&&j>0){j=1}1c{L(j>-1&&j<0){j=-1}}m+=j;K.1f.R.1k.13=n+"1g";K.1f.R.1k.12=m+"1g"}L(!p.32){L(K.2c){K.2c.1J();K.2c.M.4c=c.$F;K.2c.M.49=e.8C;K.W.R.1V(0);K.2c.28({1y:[0,1]})}L(/^(13|1i|12|1e)$/i.1D(e.1F)){K.W.R.2r(c.1Y)}L(e.1F!="2n"){p.R.1U()}K.W.R.1d(K.77(/^(13|1i|12|1e)$/i.1D(e.1F)&&!K.M.3B));L(e.3c){K.c.2G("7f-4S",K.18.7j);K.19.R.1V(2S((1B-e.1y)/1B))}p.32=17}L(K.2F){K.2F=4m(K.76,7v/e.4Y)}},77:P(m){S f=K.7L(5),e=K.19.R.5l(),j=K.M.1F,i=K.W,g=K.M.4b,n=i.R.1z(),l=i.53,h=i.51,k={13:i.51,12:i.53};L("2n"===j||K.W.3f){N k}m||(m=V);i.5e+=(e[i.3v.2q]-K.5I[i.3v.2q])/i.3v.48;i.2s+=(e[i.3y.2q]-K.5I[i.3y.2q])/i.3y.48;K.5I=e;k.13=h=i.5e;k.12=l=i.2s;L(m){L("13"==j||"1i"==j){L("13"==j&&f.13>h){k.13=(e.13-f.13>=n.Q)?(e.13-n.Q-2):(f.1i-e.1i-2>e.13-f.13-2)?(e.1i+2):(e.13-n.Q-2)}1c{L("1i"==j&&f.1i<h+n.Q){k.13=(f.1i-e.1i>=n.Q)?(e.1i+2):(e.13-f.13-2>f.1i-e.1i-2)?(e.13-n.Q-2):(e.1i+2)}}}1c{L("12"==j||"1e"==j){k.13=1l.3s(f.13+2,1l.8e(f.1i,h+n.Q)-n.Q);L("12"==j&&f.12>l){k.12=(e.12-f.12>=n.U)?(e.12-n.U-2):(f.1e-e.1e-2>e.12-f.12-2)?(e.1e+2):(e.12-n.U-2)}1c{L("1e"==j&&f.1e<l+n.U){k.12=(f.1e-e.1e>=n.U)?(e.1e+2):(e.12-f.12-2>f.1e-e.1e-2)?(e.12-n.U-2):(e.1e+2)}}}}}N k},7L:P(g){g=g||0;S f=(c.T.52)?{Q:Y.7U,U:Y.8G}:$X(Y).1z(),e=$X(Y).5H();N{13:e.x+g,1i:e.x+f.Q-g,12:e.y+g,1e:e.y+f.U-g}},9X:P(i){L(!K.19||!K.19.1T){N}S g,f,h={Q:K.19.Q,U:K.19.U};K.19.3e();L(K.W.3f){f=$X(K.W.R.1E).1z();L(/%$/i.1D(K.W.3P)){K.M.1p=(2x(K.W.3P)/1B)*f.Q}L(/%$/i.1D(K.W.4e)){K.M.1s=(2x(K.W.4e)/1B)*f.U}}1c{L("2n"===K.M.1F){K.M.1p=K.19.Q;K.M.1s=K.19.U}1c{K.M.1p*=K.19.Q/h.Q;K.M.1s*=K.19.U/h.U}}g=K.W.2E.1z();K.4f=K.M.1s-g.U;L(K.M.3g=="1e"){$X(K.1f.R.1E).2G("U",K.M.1s-g.U)}K.W.R.1d("2n"==K.M.1F?{}:{U:K.M.1s+"1g",Q:K.M.1p+"1g"});L(c.T.7o&&K.W.55){K.W.55.1d({Q:K.M.1p,U:K.M.1s})}L(K.M.3c&&K.18.2o){K.18.2o.1d(K.19.R.1z())}K.18.U=K.4f/(K.1f.U/K.19.U);K.18.Q=K.M.1p/(K.1f.Q/K.19.Q);L(K.18.Q>K.19.Q){K.18.Q=K.19.Q}L(K.18.U>K.19.U){K.18.U=K.19.U}K.18.Q=1l.2Y(K.18.Q);K.18.U=1l.2Y(K.18.U);K.18.3b=K.18.R.4i("9S").4g();K.18.R.1d({Q:(K.18.Q-2*(c.T.3O?0:K.18.3b))+"1g",U:(K.18.U-2*(c.T.3O?0:K.18.3b))+"1g"});L(K.18.32){K.W.R.1d(K.77(/^(13|1i|12|1e)$/i.1D(K.M.1F)&&!K.M.3B));K.M.x*=K.19.Q/h.Q;K.M.y*=K.19.U/h.U;K.1U()}},44:P(f,g){f=(c.1L(f))?f:17;K.4P=17;L(!K.1f){K.58();N}L(K.M.3E){N}K.2g=17;L(f){L(c.1L(g)){K.57(g);N}L(!K.M.3V){K.M.x=K.19.Q/2;K.M.y=K.19.U/2}K.1U()}},3Q:P(){S e=K.18&&K.18.32;L(K.2F){4d(K.2F);K.2F=1a}L(!K.M.3B&&K.18&&K.18.32){K.18.32=V;K.18.R.26();L(K.2c){K.2c.1J();K.2c.M.4c=K.W.9E;K.2c.M.49=K.M.9K;S f=K.W.R.4i("1y");K.2c.28({1y:[f,0]})}1c{K.W.26()}L(K.M.3c){K.c.2G("7f-4S","");K.19.R.1V(1)}}K.1q=1a;L(K.M.4T){K.2g=V}L(K.M.3l){K.41=V}L(K.1r){K.4h=17;K.1r.1U()}},74:P(i){S f=i.5s(),h=(/54/i).1D(i.23),j=c.2L();L(3==f){N 17}L(h){L(i.4R.1u>1){N}K.c.7q("3D:38:93",{1Q:i.4R[0].9f,x:i.4R[0].6T,y:i.4R[0].70,9a:j});L(K.1f&&K.1f.1T&&!K.2g){N}}L(!(h&&i.9n.1u>1)){$X(i).1J()}L("1G"==K.M.2h&&!K.19){K.4j=i;K.58();N}L("24"==K.M.2h&&!K.19&&(i.23=="24"||i.23=="7e")){K.4j=i;K.58();K.c.21("24",K.56);N}L(K.M.3E){N}L(K.19&&!K.1f.1T){N}L(K.1f&&K.M.9Q&&K.2g&&!h){K.2g=V;K.3Q();N}L(K.1f&&!K.2g){K.44(17,i);i.61&&i.61()}L(K.2g&&K.M.3l){K.41=17;L(!K.M.5y){L(K.1q===1a||K.1q===1j){K.1q=K.19.5o()}S g=i.4V();K.4X=g.x-K.M.x-K.1q.13;K.4Z=g.y-K.M.y-K.1q.12;L(1l.9Y(K.4X)>K.18.Q/2||1l.9Y(K.4Z)>K.18.U/2){K.41=V;N}}1c{K.57(i)}}},6m:P(i){S f=i.5s(),h=(/54/i).1D(i.23),k=c.2L(),j=1a,g=K.M.3V;L(3==f){N 17}L(h){j=K.c.2T("3D:38:93");L(!j||i.4R.1u>1){N}L(j.1Q==i.5C[0].9f&&k-j.9a<=5u&&1l.d2(1l.3u(i.5C[0].6T-j.x,2)+1l.3u(i.5C[0].70-j.y,2))<=15){L(K.1f&&K.1f.1T&&!K.2g){L(K.1q===1a||K.1q===1j){K.1q=K.19.5o()}K.M.3V=17;K.M.x=i.4V().x-K.1q.13;K.M.y=i.4V().y-K.1q.12;K.44(17);K.M.3V=g;K.M.3l&&(K.41=17);K.4X=0;K.4Z=0;i.7G=17;i.cZ=17;i.61&&i.61()}$X(i).1J();N}}$X(i).1J();L(K.M.3l){K.41=V}}};L(c.T.2C){2v{1b.d0("d1",V,17)}2N(b){}}$X(1b).1t("3M",P(){c.8Q(".6b-8R-8z","5Q: 0 !3X;1W: 0 !3X;2l: 0 !3X;1v: 4W  !3X;U: 0 !3X;8e-U: 0 !3X;z-2U: -1;1y: 0;","6b-8t");$X(1b).1t("6r",a.8n);a.6a()});N a})(4E);',62,894,'||||||||||||||||||||||||||||||||||||||||||||||this|if|options|return||function|width|self|var|j21|height|false|z47|mjs|window||||top|left||||true|z4|z7|null|document|else|j6|bottom|z1|px|zoom|right|undefined|style|Math|break|case|for|zoomWidth|z6|hint|zoomHeight|je1|length|position|new|0px|opacity|j7|arguments|100|extend|test|parentNode|zoomPosition|click|in|call|stop|prototype|defined|appendChild|src|j24|href|id|prefix|firstChild|ready|show|j23|border|auto|body|j1||je2|fullScreen|type|mouseover||hide|Element|start|title|load|hidden|z2|absolute|j2|j22|z30|initializeOn|onready|has|z3|padding|selectors|inner|z42|j27|edge|j32|z21|j14|FX|try|visibility|parseInt|ieMode|update|webkit|toLowerCase|trident|capable|z41|z44|j6Prop|hotspots|parent|J_TYPE|getDoc|now|className|catch|constructor|z43Bind|instanceof|switch|parseFloat|j29|index|createElement|removeChild|zooms|round|z28|engine|timer|z38|mouseout|j16|while|typeof|default|event|j5|apply|borderWidth|opacityReverse|J_UUID|z13|custom|showTitle|contains|divTag|nodeType|j33|dragMode|z9|init|tagName|overflow|styles|Transition|max|Array|pow|adjustX|z35|selectorsEffect|adjustY|unload|display|alwaysShowZoom|selectorsChange|magiczoom|disableZoom|detach|version|block|_tmpp|Class|z34|replace|domready|requestAnimationFrame|backCompat|initWidth|pause|none|visible|match|string|preservePosition|array|important|Doc|DIV||z45|on|render|activate|css3Transformations|toString|z48|ratio|duration|filter|zoomDistance|onComplete|clearTimeout|initHeight|zoomViewHeight|j17|hintVisible|j19|initMouseEvent|j8|lastSelector|setTimeout|shift|300|z36|fade|events|J_EUID|getElementsByClassName|getElementsByTagName|storage|j3|currentStyle|z24|continue|class|css3Animation|rev|_cleanup|magicJS|rel|loading|hintText|forceAnimation|byTag|selectorsClass|zoomAlign|center|div|push|activatedEx|touchend|targetTouches|color|clickToActivate|rightClick|j15|relative|ddx|fps|ddy||initLeftPos|touchScreen|initTopPos|touch|z23|z14|z43|z18|entireImage|zIndex|z0|append|insertBefore|lastLeftPos|features|9_|speed|100000px|showLoading|kill|j9|hintPosition|img|getBox|firstRun|readyState|z10|getButton|createTextNode|200|exOptions|clickInitZoom|titleSource|moveOnClick|naturalHeight|complete|compatMode|changedTouches|z11|originId|Ff|naturalWidth|j10|z7Rect|delete|ufx|callee|documentElement|smoothing|scrollLeft|split|margin|createEvent|_event_prefix_|z37|getRelated|button|scrollTop|hasOwnProperty|j26|cancelAnimationFrame||stopImmediatePropagation|defaults|head|getStorage|element|implement|enabled|cloneNode|preventDefault|refresh|mz|request|Event|z15|changeContent|J_EXTENDED|size|z20|HTMLElement|platform|navigator|mouseup|shadow|z1Holder|styleSheets|400|mousemove|random|_event_add_|floor|Top|item|cos|PI|calc|loopBind|stopAnimation|startTime|el_arr|effect|j13|defaultView|ms|to|styleFloat|object|query|loop|insertRule|Right|Left|Bottom|presto|onErrorHandler|clientX|caller|win|throw|IMG|MagicZoom|String|clientY|uuid|_event_del_|thumbChange|mousedown||z16|adjustPosition|smoothingSpeed|hasChild|loadingPositionX|chrome|loadingPositionY|PFX|touchstart|background|pounce|indexOf|number|bgColor|z33|resizeBind|construct|RegExp|trident4|Function|j30|z26|getComputedStyle|Date|CancelFullScreen|1000|dashize|styles_arr|bounceIn|5001|transform|elasticIn|MagicJS|not|toArray|charAt|continueAnimation|found|float|900|forEach|getViewPort|XMLHttpRequest|xpath|preload|Zoom|nativize|1px|z46|zoomIn|innerWidth|fit|gecko|state|changeEventName|errorEventName|cancel|documentMode|initialize|dissolve|change|tl|text|cancelFullScreen|expoIn|which|addEventListener|UUID|relatedTarget|j18|min|raiseEvent|je3|j31|getBoundingClientRect|dispatchEvent|DocumentTouch|getElementById|z39|z8|boolean|cursor|MagicZoomPup|webkit419|requestFullScreen|css|compareDocumentPosition|cancelBubble|stopPropagation|unselectable|420|clone|Alpha|sineIn|zoomFadeInSpeed|set|onAfterRender|Microsoft|innerHeight|backIn|cubicIn|quadIn|DXImageTransform|onBeforeRender|roundCss|wrap|doc|concat|insertCSS|tmp|onStart|interval|transition|finishTime|selectorsEffectSpeed|setProps|5000|localStorage|z27|clickToInitialize|opera|lastTap|resizeTimer|innerHTML|z19|z17|Image|500|ts|fitZoomWindow|loadingMsg|date|holder|identifier|Webkit|big|blur|mozCancelAnimationFrame|ip|od|hone|touches|zoomWindowEffect|glow|phone|selectorsMouseoverDelay|android|onError|inline|getTarget|preloadSelectorsSmall|x7|outline|textAlign|backcompat|magic|Moz|preloadSelectorsBig|z22|hintOpacity|tr|resize|z29|abort|zoomFadeOutSpeed|replaceChild|hintClass|setupHint|tc|contextmenu|clickToDeactivate|Width|borderLeftWidth|loadingClass|ios|loadingOpacity|Khtml|onresize|abs|textnode|touchmove|zoomFade|error|MouseEvent|treo|offsetWidth|ixi|xiino|xda|presto925|Object|bada|air||runtime|vodafone|re||setAttribute|windows|avantgo|DOMElement|wap|up|link|v2|UIEvent|palm|collection|exists|j20|setInterval|plucker|offsetTop|offsetParent|evaluate|innerText|enclose|userAgent|html|ontouchstart|querySelector|j11|tablet|psp|symbian|offsetHeight|childNodes|pocket|offsetLeft|j28|clientLeft|clientTop|mobile|iframe|filters|lge|191|clientWidth|os|192|midp|maemo|toUpperCase|190|181|webkitIsFullScreen|FullScreen|RequestFullScreen|fullscreenerror|fullscreenchange|kindle|moz|||khtml|419|525|211|210|mmp|220|250||270|applicationCache|260|netfront|ob||getTime|map|eq|AnimationName|postMessage|msPerformance|performance|j4|iris|mac|blazer|progid|linux|other|j19s|KeyEvent|hasLayout|webos|unknown|toFloat|blackberry|KeyboardEvent|getBoxObjectFor|mozInnerScreenY|taintEnabled|WebKitPoint|addCSS|mozRequestAnimationFrame|msCancelAnimationFrame|oCancelAnimationFrame|cssFloat|webkitCancelRequestAnimationFrame|Transform|iemobile|animationName|getPropertyValue|hiptop|fennec|regexp|oRequestAnimationFrame|webkitRequestAnimationFrame|msRequestAnimationFrame|compal|slice|elaine||ActiveXObject|bko||clientHeight|selectstart|gecko181|transparent|highlight|select|callout|tap|textDecoration|hand|ga|Coigm|Taac|xk|za|ie|ojk|user|10000|lastChild|Invalid|Magic|MagicZoomPlus|sMagicZoom|image|disable|zoomOut|getXY|static|z12|_new|10000px|temporary|fromCharCode|charCodeAt|ff0000|bold|td|toLocaleLowerCase|inz30|removeAttribute|z32|currentTarget|z31|exec|009|zoomActivation|execCommand|BackgroundImageCache|sqrt|rtl|skipAnimation|dir|z25|101|MagicBoxGlow|IFRAME|javascript|MagicBoxShadow|trident900|MagicZoomBigImageCont|10002|frameBorder|MagicZoomHeader|Tahoma|line|2em|fontFamily|fontWeight|3px|fontSize||entire|MozUserSelect|curFrame|clearInterval|linear|scrollWidth|DOMContentLoaded|loaded|doScroll|sineOut|expoOut|bounceOut|j12|elasticOut|backOut|quadOut|cubicOut|fireEvent|eventType|pageY|target|srcElement|scrollHeight|byClass|pageX|returnValue|fromElement|toElement|initEvent|createEventObject|detachEvent|attachEvent|removeEventListener|small|stylesId|618|screen|sheet|mode|align|distance|MagicZoomLoading|reverse|move|always|msg|thumb|delay|out|source|preserve|deactivate|Loading|drag|v4|addRule|cssRules|join||styleSheet|pageYOffset|pageXOffset|MagicZoomHint'.split('|'),0,{}))
;
/*!
	Zoom v1.7.12 - 2014-02-12
	Enlarge images on click or mouseover.
	(c) 2014 Jack Moore - http://www.jacklmoore.com/zoom
	license: http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
	var defaults = {
		url: false,
		callback: false,
		target: false,
		duration: 120,
		on: 'mouseover', // other options: grab, click, toggle
		touch: true, // enables a touch fallback
		onZoomIn: false,
		onZoomOut: false,
		magnify: 1
	};

	// Core Zoom Logic, independent of event listeners.
	$.zoom = function(target, source, img, magnify) {
		var targetHeight,
			targetWidth,
			sourceHeight,
			sourceWidth,
			xRatio,
			yRatio,
			offset,
			position = $(target).css('position');

		// The parent element needs positioning so that the zoomed element can be correctly positioned within.
		$(target).css({
			position: /(absolute|fixed)/.test(position) ? position : 'relative',
			overflow: 'hidden'
		});

		img.style.width = img.style.height = '';

		$(img)
			.addClass('zoomImg')
			.css({
				position: 'absolute',
				top: 0,
				left: 0,
				opacity: 0,
				width: img.width * magnify,
				height: img.height * magnify,
				border: 'none',
				maxWidth: 'none',
				maxHeight: 'none'
			})
			.appendTo(target);

		return {
			init: function() {
				targetWidth = $(target).outerWidth();
				targetHeight = $(target).outerHeight();

				if (source === target) {
					sourceWidth = targetWidth;
					sourceHeight = targetHeight;
				} else {
					sourceWidth = $(source).outerWidth();
					sourceHeight = $(source).outerHeight();
				}

				xRatio = (img.width - targetWidth) / sourceWidth;
				yRatio = (img.height - targetHeight) / sourceHeight;

				offset = $(source).offset();
			},
			move: function (e) {
				var left = (e.pageX - offset.left),
					top = (e.pageY - offset.top);

				top = Math.max(Math.min(top, sourceHeight), 0);
				left = Math.max(Math.min(left, sourceWidth), 0);

				img.style.left = (left * -xRatio) + 'px';
				img.style.top = (top * -yRatio) + 'px';
			}
		};
	};

	$.fn.zoom = function (options) {
		return this.each(function () {
			var
			settings = $.extend({}, defaults, options || {}),
			//target will display the zoomed image
			target = settings.target || this,
			//source will provide zoom location info (thumbnail)
			source = this,
			img = document.createElement('img'),
			$img = $(img),
			mousemove = 'mousemove.zoom',
			clicked = false,
			touched = false,
			$urlElement;

			// If a url wasn't specified, look for an image element.
			if (!settings.url) {
				$urlElement = $(source).find('img');
				if ($urlElement[0]) {
					settings.url = $urlElement.data('src') || $urlElement.attr('src');
				}
				if (!settings.url) {
					return;
				}
			}

			img.onload = function () {
				var zoom = $.zoom(target, source, img, settings.magnify);

				function start(e) {
					zoom.init();
					zoom.move(e);

					// Skip the fade-in for IE8 and lower since it chokes on fading-in
					// and changing position based on mousemovement at the same time.
					$img.stop()
					.fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
				}

				function stop() {
					$img.stop()
					.fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
				}

				// Mouse events
				if (settings.on === 'grab') {
					$(source)
						.on('mousedown.zoom',
							function (e) {
								if (e.which === 1) {
									$(document).one('mouseup.zoom',
										function () {
											stop();

											$(document).off(mousemove, zoom.move);
										}
									);

									start(e);

									$(document).on(mousemove, zoom.move);

									e.preventDefault();
								}
							}
						);
				} else if (settings.on === 'click') {
					$(source).on('click.zoom',
						function (e) {
							if (clicked) {
								// bubble the event up to the document to trigger the unbind.
								return;
							} else {
								clicked = true;
								start(e);
								$(document).on(mousemove, zoom.move);
								$(document).one('click.zoom',
									function () {
										stop();
										clicked = false;
										$(document).off(mousemove, zoom.move);
									}
								);
								return false;
							}
						}
					);
				} else if (settings.on === 'toggle') {
					$(source).on('click.zoom',
						function (e) {
							if (clicked) {
								stop();
							} else {
								start(e);
							}
							clicked = !clicked;
						}
					);
				} else if (settings.on === 'mouseover') {
					zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.

					$(source)
						.on('mouseenter.zoom', start)
						.on('mouseleave.zoom', stop)
						.on(mousemove, zoom.move);
				}

				// Touch fallback
				if (settings.touch) {
					$(source)
						.on('touchstart.zoom', function (e) { 
							e.preventDefault();
							if (touched) {
								touched = false;
								stop();
							} else {
								touched = true;
								start( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
							}
						})
						.on('touchmove.zoom', function (e) { 
							e.preventDefault();
							zoom.move( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
						});
				}
				
				if ($.isFunction(settings.callback)) {
					settings.callback.call(img);
				}
			};

			img.src = settings.url;

			$(source).one('zoom.destroy', function(){
				$(source).off(".zoom");
				$img.remove();
			});
		});
	};

	$.fn.zoom.defaults = defaults;
}(window.jQuery));
/*!
	Zoom v1.7.12 - 2014-02-12
	Enlarge images on click or mouseover.
	(c) 2014 Jack Moore - http://www.jacklmoore.com/zoom
	license: http://www.opensource.org/licenses/mit-license.php
*/

(function(o){var n={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(n,t,e,i){var u,c,a,m,r,l,s,f=o(n).css("position");return o(n).css({position:/(absolute|fixed)/.test(f)?f:"relative",overflow:"hidden"}),e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(n),{init:function(){c=o(n).outerWidth(),u=o(n).outerHeight(),t===n?(m=c,a=u):(m=o(t).outerWidth(),a=o(t).outerHeight()),r=(e.width-c)/m,l=(e.height-u)/a,s=o(t).offset()},move:function(o){var n=o.pageX-s.left,t=o.pageY-s.top;t=Math.max(Math.min(t,a),0),n=Math.max(Math.min(n,m),0),e.style.left=n*-r+"px",e.style.top=t*-l+"px"}}},o.fn.zoom=function(t){return this.each(function(){var e,i=o.extend({},n,t||{}),u=i.target||this,c=this,a=document.createElement("img"),m=o(a),r="mousemove.zoom",l=!1,s=!1;(i.url||(e=o(c).find("img"),e[0]&&(i.url=e.data("src")||e.attr("src")),i.url))&&(a.onload=function(){function n(n){e.init(),e.move(n),m.stop().fadeTo(o.support.opacity?i.duration:0,1,o.isFunction(i.onZoomIn)?i.onZoomIn.call(a):!1)}function t(){m.stop().fadeTo(i.duration,0,o.isFunction(i.onZoomOut)?i.onZoomOut.call(a):!1)}var e=o.zoom(u,c,a,i.magnify);"grab"===i.on?o(c).on("mousedown.zoom",function(i){1===i.which&&(o(document).one("mouseup.zoom",function(){t(),o(document).off(r,e.move)}),n(i),o(document).on(r,e.move),i.preventDefault())}):"click"===i.on?o(c).on("click.zoom",function(i){return l?void 0:(l=!0,n(i),o(document).on(r,e.move),o(document).one("click.zoom",function(){t(),l=!1,o(document).off(r,e.move)}),!1)}):"toggle"===i.on?o(c).on("click.zoom",function(o){l?t():n(o),l=!l}):"mouseover"===i.on&&(e.init(),o(c).on("mouseenter.zoom",n).on("mouseleave.zoom",t).on(r,e.move)),i.touch&&o(c).on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,t()):(s=!0,n(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),e.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}),o.isFunction(i.callback)&&i.callback.call(a)},a.src=i.url,o(c).one("zoom.destroy",function(){o(c).off(".zoom"),m.remove()}))})},o.fn.zoom.defaults=n})(window.jQuery);
//
// LESS - Leaner CSS v1.1.3
// http://lesscss.org
// 
// Copyright (c) 2009-2011, Alexis Sellier
// Licensed under the Apache 2.0 License.
//
//
// LESS - Leaner CSS v1.1.3
// http://lesscss.org
// 
// Copyright (c) 2009-2011, Alexis Sellier
// Licensed under the Apache 2.0 License.
//
(function(a,b){function v(a,b){var c="less-error-message:"+p(b),e=["<ul>",'<li><label>[-1]</label><pre class="ctx">{0}</pre></li>',"<li><label>[0]</label><pre>{current}</pre></li>",'<li><label>[1]</label><pre class="ctx">{2}</pre></li>',"</ul>"].join("\n"),f=document.createElement("div"),g,h;f.id=c,f.className="less-error-message",h="<h3>"+(a.message||"There is an error in your .less file")+"</h3>"+'<p><a href="'+b+'">'+b+"</a> ",a.extract&&(h+="on line "+a.line+", column "+(a.column+1)+":</p>"+e.replace(/\[(-?\d)\]/g,function(b,c){return parseInt(a.line)+parseInt(c)||""}).replace(/\{(\d)\}/g,function(b,c){return a.extract[parseInt(c)]||""}).replace(/\{current\}/,a.extract[1].slice(0,a.column)+'<span class="error">'+a.extract[1].slice(a.column)+"</span>")),f.innerHTML=h,q([".less-error-message ul, .less-error-message li {","list-style-type: none;","margin-right: 15px;","padding: 4px 0;","margin: 0;","}",".less-error-message label {","font-size: 12px;","margin-right: 15px;","padding: 4px 0;","color: #cc7777;","}",".less-error-message pre {","color: #ee4444;","padding: 4px 0;","margin: 0;","display: inline-block;","}",".less-error-message pre.ctx {","color: #dd4444;","}",".less-error-message h3 {","font-size: 20px;","font-weight: bold;","padding: 15px 0 5px 0;","margin: 0;","}",".less-error-message a {","color: #10a","}",".less-error-message .error {","color: red;","font-weight: bold;","padding-bottom: 2px;","border-bottom: 1px dashed red;","}"].join("\n"),{title:"error-message"}),f.style.cssText=["font-family: Arial, sans-serif","border: 1px solid #e00","background-color: #eee","border-radius: 5px","-webkit-border-radius: 5px","-moz-border-radius: 5px","color: #e00","padding: 15px","margin-bottom: 15px"].join(";"),d.env=="development"&&(g=setInterval(function(){document.body&&(document.getElementById(c)?document.body.replaceChild(f,document.getElementById(c)):document.body.insertBefore(f,document.body.firstChild),clearInterval(g))},10))}function u(a){d.env=="development"&&typeof console!="undefined"&&console.log("less: "+a)}function t(a){return a&&a.parentNode.removeChild(a)}function s(){if(a.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(b){u("browser doesn't support AJAX.");return null}}function r(a,b,c,e){function i(b,c,d){b.status>=200&&b.status<300?c(b.responseText,b.getResponseHeader("Last-Modified")):typeof d=="function"&&d(b.status,a)}var f=s(),h=g?!1:d.async;typeof f.overrideMimeType=="function"&&f.overrideMimeType("text/css"),f.open("GET",a,h),f.setRequestHeader("Accept",b||"text/x-less, text/css; q=0.9, */*; q=0.5"),f.send(null),g?f.status===0?c(f.responseText):e(f.status,a):h?f.onreadystatechange=function(){f.readyState==4&&i(f,c,e)}:i(f,c,e)}function q(a,b,c){var d,e=b.href?b.href.replace(/\?.*$/,""):"",f="less:"+(b.title||p(e));(d=document.getElementById(f))===null&&(d=document.createElement("style"),d.type="text/css",d.media=b.media||"screen",d.id=f,document.getElementsByTagName("head")[0].appendChild(d));if(d.styleSheet)try{d.styleSheet.cssText=a}catch(g){throw new Error("Couldn't reassign styleSheet.cssText.")}else(function(a){d.childNodes.length>0?d.firstChild.nodeValue!==a.nodeValue&&d.replaceChild(a,d.firstChild):d.appendChild(a)})(document.createTextNode(a));c&&h&&(u("saving "+e+" to cache."),h.setItem(e,a),h.setItem(e+":timestamp",c))}function p(a){return a.replace(/^[a-z]+:\/\/?[^\/]+/,"").replace(/^\//,"").replace(/\?.*$/,"").replace(/\.[^\.\/]+$/,"").replace(/[^\.\w-]+/g,"-").replace(/\./g,":")}function o(b,c,e,f){var g=a.location.href.replace(/[#?].*$/,""),i=b.href.replace(/\?.*$/,""),j=h&&h.getItem(i),k=h&&h.getItem(i+":timestamp"),l={css:j,timestamp:k};/^(https?|file):/.test(i)||(i.charAt(0)=="/"?i=a.location.protocol+"//"+a.location.host+i:i=g.slice(0,g.lastIndexOf("/")+1)+i),r(b.href,b.type,function(a,g){if(!e&&l&&g&&(new Date(g)).valueOf()===(new Date(l.timestamp)).valueOf())q(l.css,b),c(null,b,{local:!0,remaining:f});else try{(new d.Parser({optimization:d.optimization,paths:[i.replace(/[\w\.-]+$/,"")],mime:b.type})).parse(a,function(a,d){if(a)return v(a,i);try{c(d,b,{local:!1,lastModified:g,remaining:f}),t(document.getElementById("less-error-message:"+p(i)))}catch(a){v(a,i)}})}catch(h){v(h,i)}},function(a,b){throw new Error("Couldn't load "+b+" ("+a+")")})}function n(a,b){for(var c=0;c<d.sheets.length;c++)o(d.sheets[c],a,b,d.sheets.length-(c+1))}function m(){var a=document.getElementsByTagName("style");for(var b=0;b<a.length;b++)a[b].type.match(k)&&(new d.Parser).parse(a[b].innerHTML||"",function(c,d){a[b].type="text/css",a[b].innerHTML=d.toCSS()})}function c(b){return a.less[b.split("/")[1]]}Array.isArray||(Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"||a instanceof Array}),Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c=this.length>>>0;for(var d=0;d<c;d++)d in this&&a.call(b,this[d],d,this)}),Array.prototype.map||(Array.prototype.map=function(a){var b=this.length>>>0,c=Array(b),d=arguments[1];for(var e=0;e<b;e++)e in this&&(c[e]=a.call(d,this[e],e,this));return c}),Array.prototype.filter||(Array.prototype.filter=function(a){var b=[],c=arguments[1];for(var d=0;d<this.length;d++)a.call(c,this[d])&&b.push(this[d]);return b}),Array.prototype.reduce||(Array.prototype.reduce=function(a){var b=this.length>>>0,c=0;if(b===0&&arguments.length===1)throw new TypeError;if(arguments.length>=2)var d=arguments[1];else for(;;){if(c in this){d=this[c++];break}if(++c>=b)throw new TypeError}for(;c<b;c++)c in this&&(d=a.call(null,d,this[c],c,this));return d}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){var b=this.length,c=arguments[1]||0;if(!b)return-1;if(c>=b)return-1;c<0&&(c+=b);for(;c<b;c++){if(!Object.prototype.hasOwnProperty.call(this,c))continue;if(a===this[c])return c}return-1}),Object.keys||(Object.keys=function(a){var b=[];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}),String.prototype.trim||(String.prototype.trim=function(){return String(this).replace(/^\s\s*/,"").replace(/\s\s*$/,"")});var d,e;typeof a=="undefined"?(d=exports,e=c("less/tree")):(typeof a.less=="undefined"&&(a.less={}),d=a.less,e=a.less.tree={}),d.Parser=function(a){function t(a){return typeof a=="string"?b.charAt(c)===a:a.test(j[f])?!0:!1}function s(a){var d,e,g,h,i,m,n,o;if(a instanceof Function)return a.call(l.parsers);if(typeof a=="string")d=b.charAt(c)===a?a:null,g=1,r();else{r();if(d=a.exec(j[f]))g=d[0].length;else return null}if(d){o=c+=g,m=c+j[f].length-g;while(c<m){h=b.charCodeAt(c);if(h!==32&&h!==10&&h!==9)break;c++}j[f]=j[f].slice(g+(c-o)),k=c,j[f].length===0&&f<j.length-1&&f++;return typeof d=="string"?d:d.length===1?d[0]:d}}function r(){c>k&&(j[f]=j[f].slice(c-k),k=c)}function q(){j[f]=g,c=h,k=c}function p(){g=j[f],h=c,k=c}var b,c,f,g,h,i,j,k,l,m=this,n=function(){},o=this.imports={paths:a&&a.paths||[],queue:[],files:{},mime:a&&a.mime,push:function(b,c){var e=this;this.queue.push(b),d.Parser.importer(b,this.paths,function(a){e.queue.splice(e.queue.indexOf(b),1),e.files[b]=a,c(a),e.queue.length===0&&n()},a)}};this.env=a=a||{},this.optimization="optimization"in this.env?this.env.optimization:1,this.env.filename=this.env.filename||null;return l={imports:o,parse:function(d,g){var h,l,m,o,p,q,r=[],t,u=null;c=f=k=i=0,j=[],b=d.replace(/\r\n/g,"\n"),j=function(c){var d=0,e=/[^"'`\{\}\/\(\)]+/g,f=/\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g,g=0,h,i=c[0],j,k;for(var l=0,m,n;l<b.length;l++){e.lastIndex=l,(h=e.exec(b))&&h.index===l&&(l+=h[0].length,i.push(h[0])),m=b.charAt(l),f.lastIndex=l,!k&&!j&&m==="/"&&(n=b.charAt(l+1),(n==="/"||n==="*")&&(h=f.exec(b))&&h.index===l&&(l+=h[0].length,i.push(h[0]),m=b.charAt(l)));if(m==="{"&&!k&&!j)g++,i.push(m);else if(m==="}"&&!k&&!j)g--,i.push(m),c[++d]=i=[];else if(m==="("&&!k&&!j)i.push(m),j=!0;else if(m===")"&&!k&&j)i.push(m),j=!1;else{if(m==='"'||m==="'"||m==="`")k?k=k===m?!1:k:k=m;i.push(m)}}if(g>0)throw{type:"Syntax",message:"Missing closing `}`",filename:a.filename};return c.map(function(a){return a.join("")})}([[]]),h=new e.Ruleset([],s(this.parsers.primary)),h.root=!0,h.toCSS=function(c){var d,f,g;return function(g,h){function n(a){return a?(b.slice(0,a).match(/\n/g)||"").length:null}var i=[];g=g||{},typeof h=="object"&&!Array.isArray(h)&&(h=Object.keys(h).map(function(a){var b=h[a];b instanceof e.Value||(b instanceof e.Expression||(b=new e.Expression([b])),b=new e.Value([b]));return new e.Rule("@"+a,b,!1,0)}),i=[new e.Ruleset(null,h)]);try{var j=c.call(this,{frames:i}).toCSS([],{compress:g.compress||!1})}catch(k){f=b.split("\n"),d=n(k.index);for(var l=k.index,m=-1;l>=0&&b.charAt(l)!=="\n";l--)m++;throw{type:k.type,message:k.message,filename:a.filename,index:k.index,line:typeof d=="number"?d+1:null,callLine:k.call&&n(k.call)+1,callExtract:f[n(k.call)],stack:k.stack,column:m,extract:[f[d-1],f[d],f[d+1]]}}return g.compress?j.replace(/(\s)+/g,"$1"):j}}(h.eval);if(c<b.length-1){c=i,q=b.split("\n"),p=(b.slice(0,c).match(/\n/g)||"").length+1;for(var v=c,w=-1;v>=0&&b.charAt(v)!=="\n";v--)w++;u={name:"ParseError",message:"Syntax Error on line "+p,index:c,filename:a.filename,line:p,column:w,extract:[q[p-2],q[p-1],q[p]]}}this.imports.queue.length>0?n=function(){g(u,h)}:g(u,h)},parsers:{primary:function(){var a,b=[];while((a=s(this.mixin.definition)||s(this.rule)||s(this.ruleset)||s(this.mixin.call)||s(this.comment)||s(this.directive))||s(/^[\s\n]+/))a&&b.push(a);return b},comment:function(){var a;if(b.charAt(c)==="/"){if(b.charAt(c+1)==="/")return new e.Comment(s(/^\/\/.*/),!0);if(a=s(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/))return new e.Comment(a)}},entities:{quoted:function(){var a,d=c,f;b.charAt(d)==="~"&&(d++,f=!0);if(b.charAt(d)==='"'||b.charAt(d)==="'"){f&&s("~");if(a=s(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/))return new e.Quoted(a[0],a[1]||a[2],f)}},keyword:function(){var a;if(a=s(/^[A-Za-z-]+/))return new e.Keyword(a)},call:function(){var a,b,d=c;if(!!(a=/^([\w-]+|%)\(/.exec(j[f]))){a=a[1].toLowerCase();if(a==="url")return null;c+=a.length;if(a==="alpha")return s(this.alpha);s("("),b=s(this.entities.arguments);if(!s(")"))return;if(a)return new e.Call(a,b,d)}},arguments:function(){var a=[],b;while(b=s(this.expression)){a.push(b);if(!s(","))break}return a},literal:function(){return s(this.entities.dimension)||s(this.entities.color)||s(this.entities.quoted)},url:function(){var a;if(b.charAt(c)==="u"&&!!s(/^url\(/)){a=s(this.entities.quoted)||s(this.entities.variable)||s(this.entities.dataURI)||s(/^[-\w%@$\/.&=:;#+?~]+/)||"";if(!s(")"))throw new Error("missing closing ) for url()");return new e.URL(a.value||a.data||a instanceof e.Variable?a:new e.Anonymous(a),o.paths)}},dataURI:function(){var a;if(s(/^data:/)){a={},a.mime=s(/^[^\/]+\/[^,;)]+/)||"",a.charset=s(/^;\s*charset=[^,;)]+/)||"",a.base64=s(/^;\s*base64/)||"",a.data=s(/^,\s*[^)]+/);if(a.data)return a}},variable:function(){var a,d=c;if(b.charAt(c)==="@"&&(a=s(/^@@?[\w-]+/)))return new e.Variable(a,d)},color:function(){var a;if(b.charAt(c)==="#"&&(a=s(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/)))return new e.Color(a[1])},dimension:function(){var a,d=b.charCodeAt(c);if(!(d>57||d<45||d===47))if(a=s(/^(-?\d*\.?\d+)(px|%|em|pc|ex|in|deg|s|ms|pt|cm|mm|rad|grad|turn)?/))return new e.Dimension(a[1],a[2])},javascript:function(){var a,d=c,f;b.charAt(d)==="~"&&(d++,f=!0);if(b.charAt(d)==="`"){f&&s("~");if(a=s(/^`([^`]*)`/))return new e.JavaScript(a[1],c,f)}}},variable:function(){var a;if(b.charAt(c)==="@"&&(a=s(/^(@[\w-]+)\s*:/)))return a[1]},shorthand:function(){var a,b;if(!!t(/^[@\w.%-]+\/[@\w.-]+/)&&(a=s(this.entity))&&s("/")&&(b=s(this.entity)))return new e.Shorthand(a,b)},mixin:{call:function(){var a=[],d,f,g,h=c,i=b.charAt(c);if(i==="."||i==="#"){while(d=s(/^[#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/))a.push(new e.Element(f,d)),f=s(">");s("(")&&(g=s(this.entities.arguments))&&s(")");if(a.length>0&&(s(";")||t("}")))return new e.mixin.Call(a,g,h)}},definition:function(){var a,d=[],f,g,h,i;if(!(b.charAt(c)!=="."&&b.charAt(c)!=="#"||t(/^[^{]*(;|})/)))if(f=s(/^([#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+)\s*\(/)){a=f[1];while(h=s(this.entities.variable)||s(this.entities.literal)||s(this.entities.keyword)){if(h instanceof e.Variable)if(s(":"))if(i=s(this.expression))d.push({name:h.name,value:i});else throw new Error("Expected value");else d.push({name:h.name});else d.push({value:h});if(!s(","))break}if(!s(")"))throw new Error("Expected )");g=s(this.block);if(g)return new e.mixin.Definition(a,d,g)}}},entity:function(){return s(this.entities.literal)||s(this.entities.variable)||s(this.entities.url)||s(this.entities.call)||s(this.entities.keyword)||s(this.entities.javascript)||s(this.comment)},end:function(){return s(";")||t("}")},alpha:function(){var a;if(!!s(/^\(opacity=/i))if(a=s(/^\d+/)||s(this.entities.variable)){if(!s(")"))throw new Error("missing closing ) for alpha()");return new e.Alpha(a)}},element:function(){var a,b,c;c=s(this.combinator),a=s(/^(?:[.#]?|:*)(?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/)||s("*")||s(this.attribute)||s(/^\([^)@]+\)/);if(a)return new e.Element(c,a)},combinator:function(){var a,d=b.charAt(c);if(d===">"||d==="&"||d==="+"||d==="~"){c++;while(b.charAt(c)===" ")c++;return new e.Combinator(d)}if(d===":"&&b.charAt(c+1)===":"){c+=2;while(b.charAt(c)===" ")c++;return new e.Combinator("::")}return b.charAt(c-1)===" "?new e.Combinator(" "):new e.Combinator(null)},selector:function(){var a,d,f=[],g,h;while(d=s(this.element)){g=b.charAt(c),f.push(d);if(g==="{"||g==="}"||g===";"||g===",")break}if(f.length>0)return new e.Selector(f)},tag:function(){return s(/^[a-zA-Z][a-zA-Z-]*[0-9]?/)||s("*")},attribute:function(){var a="",b,c,d;if(!!s("[")){if(b=s(/^[a-zA-Z-]+/)||s(this.entities.quoted))(d=s(/^[|~*$^]?=/))&&(c=s(this.entities.quoted)||s(/^[\w-]+/))?a=[b,d,c.toCSS?c.toCSS():c].join(""):a=b;if(!s("]"))return;if(a)return"["+a+"]"}},block:function(){var a;if(s("{")&&(a=s(this.primary))&&s("}"))return a},ruleset:function(){var a=[],b,d,g;p();if(g=/^([.#: \w-]+)[\s\n]*\{/.exec(j[f]))c+=g[0].length-1,a=[new e.Selector([new e.Element(null,g[1])])];else while(b=s(this.selector)){a.push(b),s(this.comment);if(!s(","))break;s(this.comment)}if(a.length>0&&(d=s(this.block)))return new e.Ruleset(a,d);i=c,q()},rule:function(){var a,d,g=b.charAt(c),k,l;p();if(g!=="."&&g!=="#"&&g!=="&")if(a=s(this.variable)||s(this.property)){a.charAt(0)!="@"&&(l=/^([^@+\/'"*`(;{}-]*);/.exec(j[f]))?(c+=l[0].length-1,d=new e.Anonymous(l[1])):a==="font"?d=s(this.font):d=s(this.value),k=s(this.important);if(d&&s(this.end))return new e.Rule(a,d,k,h);i=c,q()}},"import":function(){var a;if(s(/^@import\s+/)&&(a=s(this.entities.quoted)||s(this.entities.url))&&s(";"))return new e.Import(a,o)},directive:function(){var a,d,f,g;if(b.charAt(c)==="@"){if(d=s(this["import"]))return d;if(a=s(/^@media|@page|@-[-a-z]+/)){g=(s(/^[^{]+/)||"").trim();if(f=s(this.block))return new e.Directive(a+" "+g,f)}else if(a=s(/^@[-a-z]+/))if(a==="@font-face"){if(f=s(this.block))return new e.Directive(a,f)}else if((d=s(this.entity))&&s(";"))return new e.Directive(a,d)}},font:function(){var a=[],b=[],c,d,f,g;while(g=s(this.shorthand)||s(this.entity))b.push(g);a.push(new e.Expression(b));if(s(","))while(g=s(this.expression)){a.push(g);if(!s(","))break}return new e.Value(a)},value:function(){var a,b=[],c;while(a=s(this.expression)){b.push(a);if(!s(","))break}if(b.length>0)return new e.Value(b)},important:function(){if(b.charAt(c)==="!")return s(/^! *important/)},sub:function(){var a;if(s("(")&&(a=s(this.expression))&&s(")"))return a},multiplication:function(){var a,b,c,d;if(a=s(this.operand)){while((c=s("/")||s("*"))&&(b=s(this.operand)))d=new e.Operation(c,[d||a,b]);return d||a}},addition:function(){var a,d,f,g;if(a=s(this.multiplication)){while((f=s(/^[-+]\s+/)||b.charAt(c-1)!=" "&&(s("+")||s("-")))&&(d=s(this.multiplication)))g=new e.Operation(f,[g||a,d]);return g||a}},operand:function(){var a,d=b.charAt(c+1);b.charAt(c)==="-"&&(d==="@"||d==="(")&&(a=s("-"));var f=s(this.sub)||s(this.entities.dimension)||s(this.entities.color)||s(this.entities.variable)||s(this.entities.call);return a?new e.Operation("*",[new e.Dimension(-1),f]):f},expression:function(){var a,b,c=[],d;while(a=s(this.addition)||s(this.entity))c.push(a);if(c.length>0)return new e.Expression(c)},property:function(){var a;if(a=s(/^(\*?-?[-a-z_0-9]+)\s*:/))return a[1]}}}},typeof a!="undefined"&&(d.Parser.importer=function(a,b,c,d){a.charAt(0)!=="/"&&b.length>0&&(a=b[0]+a),o({href:a,title:a,type:d.mime},c,!0)}),function(a){function d(a){return Math.min(1,Math.max(0,a))}function c(b){if(b instanceof a.Dimension)return parseFloat(b.unit=="%"?b.value/100:b.value);if(typeof b=="number")return b;throw{error:"RuntimeError",message:"color functions take numbers as parameters"}}function b(b){return a.functions.hsla(b.h,b.s,b.l,b.a)}a.functions={rgb:function(a,b,c){return this.rgba(a,b,c,1)},rgba:function(b,d,e,f){var g=[b,d,e].map(function(a){return c(a)}),f=c(f);return new a.Color(g,f)},hsl:function(a,b,c){return this.hsla(a,b,c,1)},hsla:function(a,b,d,e){function h(a){a=a<0?a+1:a>1?a-1:a;return a*6<1?g+(f-g)*a*6:a*2<1?f:a*3<2?g+(f-g)*(2/3-a)*6:g}a=c(a)%360/360,b=c(b),d=c(d),e=c(e);var f=d<=.5?d*(b+1):d+b-d*b,g=d*2-f;return this.rgba(h(a+1/3)*255,h(a)*255,h(a-1/3)*255,e)},hue:function(b){return new a.Dimension(Math.round(b.toHSL().h))},saturation:function(b){return new a.Dimension(Math.round(b.toHSL().s*100),"%")},lightness:function(b){return new a.Dimension(Math.round(b.toHSL().l*100),"%")},alpha:function(b){return new a.Dimension(b.toHSL().a)},saturate:function(a,c){var e=a.toHSL();e.s+=c.value/100,e.s=d(e.s);return b(e)},desaturate:function(a,c){var e=a.toHSL();e.s-=c.value/100,e.s=d(e.s);return b(e)},lighten:function(a,c){var e=a.toHSL();e.l+=c.value/100,e.l=d(e.l);return b(e)},darken:function(a,c){var e=a.toHSL();e.l-=c.value/100,e.l=d(e.l);return b(e)},fadein:function(a,c){var e=a.toHSL();e.a+=c.value/100,e.a=d(e.a);return b(e)},fadeout:function(a,c){var e=a.toHSL();e.a-=c.value/100,e.a=d(e.a);return b(e)},spin:function(a,c){var d=a.toHSL(),e=(d.h+c.value)%360;d.h=e<0?360+e:e;return b(d)},mix:function(b,c,d){var e=d.value/100,f=e*2-1,g=b.toHSL().a-c.toHSL().a,h=((f*g==-1?f:(f+g)/(1+f*g))+1)/2,i=1-h,j=[b.rgb[0]*h+c.rgb[0]*i,b.rgb[1]*h+c.rgb[1]*i,b.rgb[2]*h+c.rgb[2]*i],k=b.alpha*e+c.alpha*(1-e);return new a.Color(j,k)},greyscale:function(b){return this.desaturate(b,new a.Dimension(100))},e:function(b){return new a.Anonymous(b instanceof a.JavaScript?b.evaluated:b)},escape:function(b){return new a.Anonymous(encodeURI(b.value).replace(/=/g,"%3D").replace(/:/g,"%3A").replace(/#/g,"%23").replace(/;/g,"%3B").replace(/\(/g,"%28").replace(/\)/g,"%29"))},"%":function(b){var c=Array.prototype.slice.call(arguments,1),d=b.value;for(var e=0;e<c.length;e++)d=d.replace(/%[sda]/i,function(a){var b=a.match(/s/i)?c[e].value:c[e].toCSS();return a.match(/[A-Z]$/)?encodeURIComponent(b):b});d=d.replace(/%%/g,"%");return new a.Quoted('"'+d+'"',d)},round:function(b){if(b instanceof a.Dimension)return new a.Dimension(Math.round(c(b)),b.unit);if(typeof b=="number")return Math.round(b);throw{error:"RuntimeError",message:"math functions take numbers as parameters"}}}}(c("less/tree")),function(a){a.Alpha=function(a){this.value=a},a.Alpha.prototype={toCSS:function(){return"alpha(opacity="+(this.value.toCSS?this.value.toCSS():this.value)+")"},eval:function(a){this.value.eval&&(this.value=this.value.eval(a));return this}}}(c("less/tree")),function(a){a.Anonymous=function(a){this.value=a.value||a},a.Anonymous.prototype={toCSS:function(){return this.value},eval:function(){return this}}}(c("less/tree")),function(a){a.Call=function(a,b,c){this.name=a,this.args=b,this.index=c},a.Call.prototype={eval:function(b){var c=this.args.map(function(a){return a.eval(b)});if(!(this.name in a.functions))return new a.Anonymous(this.name+"("+c.map(function(a){return a.toCSS()}).join(", ")+")");try{return a.functions[this.name].apply(a.functions,c)}catch(d){throw{message:"error evaluating function `"+this.name+"`",index:this.index}}},toCSS:function(a){return this.eval(a).toCSS()}}}(c("less/tree")),function(a){a.Color=function(a,b){Array.isArray(a)?this.rgb=a:a.length==6?this.rgb=a.match(/.{2}/g).map(function(a){return parseInt(a,16)}):a.length==8?(this.alpha=parseInt(a.substring(0,2),16)/255,this.rgb=a.substr(2).match(/.{2}/g).map(function(a){return parseInt(a,16)})):this.rgb=a.split("").map(function(a){return parseInt(a+a,16)}),this.alpha=typeof b=="number"?b:1},a.Color.prototype={eval:function(){return this},toCSS:function(){return this.alpha<1?"rgba("+this.rgb.map(function(a){return Math.round(a)}).concat(this.alpha).join(", ")+")":"#"+this.rgb.map(function(a){a=Math.round(a),a=(a>255?255:a<0?0:a).toString(16);return a.length===1?"0"+a:a}).join("")},operate:function(b,c){var d=[];c instanceof a.Color||(c=c.toColor());for(var e=0;e<3;e++)d[e]=a.operate(b,this.rgb[e],c.rgb[e]);return new a.Color(d,this.alpha+c.alpha)},toHSL:function(){var a=this.rgb[0]/255,b=this.rgb[1]/255,c=this.rgb[2]/255,d=this.alpha,e=Math.max(a,b,c),f=Math.min(a,b,c),g,h,i=(e+f)/2,j=e-f;if(e===f)g=h=0;else{h=i>.5?j/(2-e-f):j/(e+f);switch(e){case a:g=(b-c)/j+(b<c?6:0);break;case b:g=(c-a)/j+2;break;case c:g=(a-b)/j+4}g/=6}return{h:g*360,s:h,l:i,a:d}}}}(c("less/tree")),function(a){a.Comment=function(a,b){this.value=a,this.silent=!!b},a.Comment.prototype={toCSS:function(a){return a.compress?"":this.value},eval:function(){return this}}}(c("less/tree")),function(a){a.Dimension=function(a,b){this.value=parseFloat(a),this.unit=b||null},a.Dimension.prototype={eval:function(){return this},toColor:function(){return new a.Color([this.value,this.value,this.value])},toCSS:function(){var a=this.value+this.unit;return a},operate:function(b,c){return new a.Dimension(a.operate(b,this.value,c.value),this.unit||c.unit)}}}(c("less/tree")),function(a){a.Directive=function(b,c){this.name=b,Array.isArray(c)?this.ruleset=new a.Ruleset([],c):this.value=c},a.Directive.prototype={toCSS:function(a,b){if(this.ruleset){this.ruleset.root=!0;return this.name+(b.compress?"{":" {\n  ")+this.ruleset.toCSS(a,b).trim().replace(/\n/g,"\n  ")+(b.compress?"}":"\n}\n")}return this.name+" "+this.value.toCSS()+";\n"},eval:function(a){a.frames.unshift(this),this.ruleset=this.ruleset&&this.ruleset.eval(a),a.frames.shift();return this},variable:function(b){return a.Ruleset.prototype.variable.call(this.ruleset,b)},find:function(){return a.Ruleset.prototype.find.apply(this.ruleset,arguments)},rulesets:function(){return a.Ruleset.prototype.rulesets.apply(this.ruleset)}}}(c("less/tree")),function(a){a.Element=function(b,c){this.combinator=b instanceof a.Combinator?b:new a.Combinator(b),this.value=c.trim()},a.Element.prototype.toCSS=function(a){return this.combinator.toCSS(a||{})+this.value},a.Combinator=function(a){a===" "?this.value=" ":this.value=a?a.trim():""},a.Combinator.prototype.toCSS=function(a){return{"":""," ":" ","&":"",":":" :","::":"::","+":a.compress?"+":" + ","~":a.compress?"~":" ~ ",">":a.compress?">":" > "}[this.value]}}(c("less/tree")),function(a){a.Expression=function(a){this.value=a},a.Expression.prototype={eval:function(b){return this.value.length>1?new a.Expression(this.value.map(function(a){return a.eval(b)})):this.value.length===1?this.value[0].eval(b):this},toCSS:function(a){return this.value.map(function(b){return b.toCSS(a)}).join(" ")}}}(c("less/tree")),function(a){a.Import=function(b,c){var d=this;this._path=b,b instanceof a.Quoted?this.path=/\.(le?|c)ss$/.test(b.value)?b.value:b.value+".less":this.path=b.value.value||b.value,this.css=/css$/.test(this.path),this.css||c.push(this.path,function(a){if(!a)throw new Error("Error parsing "+d.path);d.root=a})},a.Import.prototype={toCSS:function(){return this.css?"@import "+this._path.toCSS()+";\n":""},eval:function(b){var c;if(this.css)return this;c=new a.Ruleset(null,this.root.rules.slice(0));for(var d=0;d<c.rules.length;d++)c.rules[d]instanceof a.Import&&Array.prototype.splice.apply(c.rules,[d,1].concat(c.rules[d].eval(b)));return c.rules}}}(c("less/tree")),function(a){a.JavaScript=function(a,b,c){this.escaped=c,this.expression=a,this.index=b},a.JavaScript.prototype={eval:function(b){var c,d=this,e={},f=this.expression.replace(/@\{([\w-]+)\}/g,function(c,e){return a.jsify((new a.Variable("@"+e,d.index)).eval(b))});try{f=new Function("return ("+f+")")}catch(g){throw{message:"JavaScript evaluation error: `"+f+"`",index:this.index}}for(var h in b.frames[0].variables())e[h.slice(1)]={value:b.frames[0].variables()[h].value,toJS:function(){return this.value.eval(b).toCSS()}};try{c=f.call(e)}catch(g){throw{message:"JavaScript evaluation error: '"+g.name+": "+g.message+"'",index:this.index}}return typeof c=="string"?new a.Quoted('"'+c+'"',c,this.escaped,this.index):Array.isArray(c)?new a.Anonymous(c.join(", ")):new a.Anonymous(c)}}}(c("less/tree")),function(a){a.Keyword=function(a){this.value=a},a.Keyword.prototype={eval:function(){return this},toCSS:function(){return this.value}}}(c("less/tree")),function(a){a.mixin={},a.mixin.Call=function(b,c,d){this.selector=new a.Selector(b),this.arguments=c,this.index=d},a.mixin.Call.prototype={eval:function(a){var b,c,d=[],e=!1;for(var f=0;f<a.frames.length;f++)if((b=a.frames[f].find(this.selector)).length>0){c=this.arguments&&this.arguments.map(function(b){return b.eval(a)});for(var g=0;g<b.length;g++)if(b[g].match(c,a))try{Array.prototype.push.apply(d,b[g].eval(a,this.arguments).rules),e=!0}catch(h){throw{message:h.message,index:h.index,stack:h.stack,call:this.index}}if(e)return d;throw{message:"No matching definition was found for `"+this.selector.toCSS().trim()+"("+this.arguments.map(function(a){return a.toCSS()}).join(", ")+")`",index:this.index}}throw{message:this.selector.toCSS().trim()+" is undefined",index:this.index}}},a.mixin.Definition=function(b,c,d){this.name=b,this.selectors=[new a.Selector([new a.Element(null,b)])],this.params=c,this.arity=c.length,this.rules=d,this._lookups={},this.required=c.reduce(function(a,b){return!b.name||b.name&&!b.value?a+1:a},0),this.parent=a.Ruleset.prototype,this.frames=[]},a.mixin.Definition.prototype={toCSS:function(){return""},variable:function(a){return this.parent.variable.call(this,a)},variables:function(){return this.parent.variables.call(this)},find:function(){return this.parent.find.apply(this,arguments)},rulesets:function(){return this.parent.rulesets.apply(this)},eval:function(b,c){var d=new a.Ruleset(null,[]),e,f=[];for(var g=0,h;g<this.params.length;g++)if(this.params[g].name)if(h=c&&c[g]||this.params[g].value)d.rules.unshift(new a.Rule(this.params[g].name,h.eval(b)));else throw{message:"wrong number of arguments for "+this.name+" ("+c.length+" for "+this.arity+")"};for(var g=0;g<Math.max(this.params.length,c&&c.length);g++)f.push(c[g]||this.params[g].value);d.rules.unshift(new a.Rule("@arguments",(new a.Expression(f)).eval(b)));return(new a.Ruleset(null,this.rules.slice(0))).eval({frames:[this,d].concat(this.frames,b.frames)})},match:function(a,b){var c=a&&a.length||0,d;if(c<this.required)return!1;if(this.required>0&&c>this.params.length)return!1;d=Math.min(c,this.arity);for(var e=0;e<d;e++)if(!this.params[e].name&&a[e].eval(b).toCSS()!=this.params[e].value.eval(b).toCSS())return!1;return!0}}}(c("less/tree")),function(a){a.Operation=function(a,b){this.op=a.trim(),this.operands=b},a.Operation.prototype.eval=function(b){var c=this.operands[0].eval(b),d=this.operands[1].eval(b),e;if(c instanceof a.Dimension&&d instanceof a.Color)if(this.op==="*"||this.op==="+")e=d,d=c,c=e;else throw{name:"OperationError",message:"Can't substract or divide a color from a number"};return c.operate(this.op,d)},a.operate=function(a,b,c){switch(a){case"+":return b+c;case"-":return b-c;case"*":return b*c;case"/":return b/c}}}(c("less/tree")),function(a){a.Quoted=function(a,b,c,d){this.escaped=c,this.value=b||"",this.quote=a.charAt(0),this.index=d},a.Quoted.prototype={toCSS:function(){return this.escaped?this.value:this.quote+this.value+this.quote},eval:function(b){var c=this,d=this.value.replace(/`([^`]+)`/g,function(d,e){return(new a.JavaScript(e,c.index,!0)).eval(b).value}).replace(/@\{([\w-]+)\}/g,function(d,e){var f=(new a.Variable("@"+e,c.index)).eval(b);return f.value||f.toCSS()});return new a.Quoted(this.quote+d+this.quote,d,this.escaped,this.index)}}}(c("less/tree")),function(a){a.Rule=function(b,c,d,e){this.name=b,this.value=c instanceof a.Value?c:new a.Value([c]),this.important=d?" "+d.trim():"",this.index=e,b.charAt(0)==="@"?this.variable=!0:this.variable=!1},a.Rule.prototype.toCSS=function(a){return this.variable?"":this.name+(a.compress?":":": ")+this.value.toCSS(a)+this.important+";"},a.Rule.prototype.eval=function(b){return new a.Rule(this.name,this.value.eval(b),this.important,this.index)},a.Shorthand=function(a,b){this.a=a,this.b=b},a.Shorthand.prototype={toCSS:function(a){return this.a.toCSS(a)+"/"+this.b.toCSS(a)},eval:function(){return this}}}(c("less/tree")),function(a){a.Ruleset=function(a,b){this.selectors=a,this.rules=b,this._lookups={}},a.Ruleset.prototype={eval:function(b){var c=new a.Ruleset(this.selectors,this.rules.slice(0));c.root=this.root,b.frames.unshift(c);if(c.root)for(var d=0;d<c.rules.length;d++)c.rules[d]instanceof a.Import&&Array.prototype.splice.apply(c.rules,[d,1].concat(c.rules[d].eval(b)));for(var d=0;d<c.rules.length;d++)c.rules[d]instanceof a.mixin.Definition&&(c.rules[d].frames=b.frames.slice(0));for(var d=0;d<c.rules.length;d++)c.rules[d]instanceof a.mixin.Call&&Array.prototype.splice.apply(c.rules,[d,1].concat(c.rules[d].eval(b)));for(var d=0,e;d<c.rules.length;d++)e=c.rules[d],e instanceof a.mixin.Definition||(c.rules[d]=e.eval?e.eval(b):e);b.frames.shift();return c},match:function(a){return!a||a.length===0},variables:function(){return this._variables?this._variables:this._variables=this.rules.reduce(function(b,c){c instanceof a.Rule&&c.variable===!0&&(b[c.name]=c);return b},{})},variable:function(a){return this.variables()[a]},rulesets:function(){return this._rulesets?this._rulesets:this._rulesets=this.rules.filter(function(b){return b instanceof a.Ruleset||b instanceof a.mixin.Definition})},find:function(b,c){c=c||this;var d=[],e,f,g=b.toCSS();if(g in this._lookups)return this._lookups[g];this.rulesets().forEach(function(e){if(e!==c)for(var g=0;g<e.selectors.length;g++)if(f=b.match(e.selectors[g])){b.elements.length>1?Array.prototype.push.apply(d,e.find(new a.Selector(b.elements.slice(1)),c)):d.push(e);break}});return this._lookups[g]=d},toCSS:function(b,c){var d=[],e=[],f=[],g=[],h,i;if(!this.root)if(b.length===0)g=this.selectors.map(function(a){return[a]});else for(var j=0;j<this.selectors.length;j++)for(var k=0;k<b.length;k++)g.push(b[k].concat([this.selectors[j]]));for(var l=0;l<this.rules.length;l++)i=this.rules[l],i.rules||i instanceof a.Directive?f.push(i.toCSS(g,c)):i instanceof a.Comment?i.silent||(this.root?f.push(i.toCSS(c)):e.push(i.toCSS(c))):i.toCSS&&!i.variable?e.push(i.toCSS(c)):i.value&&!i.variable&&e.push(i.value.toString());f=f.join(""),this.root?d.push(e.join(c.compress?"":"\n")):e.length>0&&(h=g.map(function(a){return a.map(function(a){return a.toCSS(c)}).join("").trim()}).join(c.compress?",":g.length>3?",\n":", "),d.push(h,(c.compress?"{":" {\n  ")+e.join(c.compress?"":"\n  ")+(c.compress?"}":"\n}\n"))),d.push(f);return d.join("")+(c.compress?"\n":"")}}}(c("less/tree")),function(a){a.Selector=function(a){this.elements=a,this.elements[0].combinator.value===""&&(this.elements[0].combinator.value=" ")},a.Selector.prototype.match=function(a){return this.elements[0].value===a.elements[0].value?!0:!1},a.Selector.prototype.toCSS=function(a){if(this._css)return this._css;return this._css=this.elements.map(function(b){return typeof b=="string"?" "+b.trim():b.toCSS(a)}).join("")}}(c("less/tree")),function(b){b.URL=function(b,c){b.data?this.attrs=b:(!/^(?:https?:\/|file:\/|data:\/)?\//.test(b.value)&&c.length>0&&typeof a!="undefined"&&(b.value=c[0]+(b.value.charAt(0)==="/"?b.value.slice(1):b.value)),this.value=b,this.paths=c)},b.URL.prototype={toCSS:function(){return"url("+(this.attrs?"data:"+this.attrs.mime+this.attrs.charset+this.attrs.base64+this.attrs.data:this.value.toCSS())+")"},eval:function(a){return this.attrs?this:new b.URL(this.value.eval(a),this.paths)}}}(c("less/tree")),function(a){a.Value=function(a){this.value=a,this.is="value"},a.Value.prototype={eval:function(b){return this.value.length===1?this.value[0].eval(b):new a.Value(this.value.map(function(a){return a.eval(b)}))},toCSS:function(a){return this.value.map(function(b){return b.toCSS(a)}).join(a.compress?",":", ")}}}(c("less/tree")),function(a){a.Variable=function(a,b){this.name=a,this
.index=b},a.Variable.prototype={eval:function(b){var c,d,e=this.name;e.indexOf("@@")==0&&(e="@"+(new a.Variable(e.slice(1))).eval(b).value);if(c=a.find(b.frames,function(a){if(d=a.variable(e))return d.value.eval(b)}))return c;throw{message:"variable "+e+" is undefined",index:this.index}}}}(c("less/tree")),c("less/tree").find=function(a,b){for(var c=0,d;c<a.length;c++)if(d=b.call(a,a[c]))return d;return null},c("less/tree").jsify=function(a){return Array.isArray(a.value)&&a.value.length>1?"["+a.value.map(function(a){return a.toCSS(!1)}).join(", ")+"]":a.toCSS(!1)};var g=location.protocol==="file:"||location.protocol==="chrome:"||location.protocol==="chrome-extension:"||location.protocol==="resource:";d.env=d.env||(location.hostname=="127.0.0.1"||location.hostname=="0.0.0.0"||location.hostname=="localhost"||location.port.length>0||g?"development":"production"),d.async=!1,d.poll=d.poll||(g?1e3:1500),d.watch=function(){return this.watchMode=!0},d.unwatch=function(){return this.watchMode=!1},d.env==="development"?(d.optimization=0,/!watch/.test(location.hash)&&d.watch(),d.watchTimer=setInterval(function(){d.watchMode&&n(function(a,b,c){a&&q(a.toCSS(),b,c.lastModified)})},d.poll)):d.optimization=3;var h;try{h=typeof a.localStorage=="undefined"?null:a.localStorage}catch(i){h=null}var j=document.getElementsByTagName("link"),k=/^text\/(x-)?less$/;d.sheets=[];for(var l=0;l<j.length;l++)(j[l].rel==="stylesheet/less"||j[l].rel.match(/stylesheet/)&&j[l].type.match(k))&&d.sheets.push(j[l]);d.refresh=function(a){var b,c;b=c=new Date,n(function(a,d,e){e.local?u("loading "+d.href+" from cache."):(u("parsed "+d.href+" successfully."),q(a.toCSS(),d,e.lastModified)),u("css for "+d.href+" generated in "+(new Date-c)+"ms"),e.remaining===0&&u("css generated in "+(new Date-b)+"ms"),c=new Date},a),m()},d.refreshStyles=m,d.refresh(d.env==="development")})(window)
;













/*! $.noUiSlider - WTFPL - refreshless.com/nouislider/ */

(function(e){function h(a){throw new RangeError("noUiSlider: "+a);}function x(a,b,d){(a[b]||a[d])&&a[b]===a[d]&&h("(Link) '"+b+"' can't match '"+d+"'.'")}function t(a){return"number"===typeof a&&!isNaN(a)&&isFinite(a)}function H(a){return e.isArray(a)?a:[a]}function D(a,b){a.addClass(b);setTimeout(function(){a.removeClass(b)},300)}function y(a,b){return 100*b/(a[1]-a[0])}function I(a,b){if(b>=a.d.slice(-1)[0])return 100;for(var d=1,c,g,e;b>=a.d[d];)d++;c=a.d[d-1];g=a.d[d];e=a.c[d-1];c=[c,g];return e+
y(c,0>c[0]?b+Math.abs(c[0]):b-c[0])/(100/(a.c[d]-e))}function J(a,b){for(var d=1,c;b>=a.c[d];)d++;if(a.m)return c=a.c[d-1],d=a.c[d],b-c>(d-c)/2?d:c;a.h[d-1]?(c=a.h[d-1],d=a.c[d-1]+Math.round((b-a.c[d-1])/c)*c):d=b;return d}function s(a){void 0===a&&(a={});"object"!==typeof a&&h("(Format) 'format' option must be an object.");var b={};e(K).each(function(d,c){void 0===a[c]?b[c]=z[d]:typeof a[c]===typeof z[d]?("decimals"===c&&(0>a[c]||7<a[c])&&h("(Format) 'format.decimals' option must be between 0 and 7."),
b[c]=a[c]):h("(Format) 'format."+c+"' must be a "+typeof z[d]+".")});x(b,"mark","thousand");x(b,"prefix","negative");x(b,"prefix","negativeBefore");this.B=b}function q(a,b){if(!(this instanceof q))throw Error("Link: Don't use Link as a function. Use the 'new' keyword.");if(!a)throw new RangeError("Link: missing parameters.");this.g=a.format||{};this.update=!b;var d=this,c=a.target||function(){},g=a.method,f="string"===typeof c&&0===c.indexOf("-tooltip-"),h="string"===typeof c&&0!==c.indexOf("-"),
n="function"===typeof c,r=c instanceof e||e.zepto&&e.zepto.isZ(c),E=r&&c.is("input, select, textarea"),l=r&&"function"===typeof g,s=r&&"string"===typeof g&&c[g];if(f)this.method=g||"html",this.j=e(c.replace("-tooltip-","")||"<div/>")[0];else if(h)this.method="val",this.j=document.createElement("input"),this.j.name=c,this.j.type="hidden";else if(n)this.target=!1,this.method=c;else{if(r){if(g&&(l||s)){this.target=c;this.method=g;return}if(!g&&E){this.method="val";this.target=c;this.target.on("change",
function(a){a=e(a.target).val();var b=d.q;d.u.val([b?null:a,b?a:null],{link:d})});return}if(!g&&!E){this.method="html";this.target=c;return}}throw new RangeError("Link: Invalid Link.");}}function L(a,b){t(b)||h("'step' is not numeric.");a.h[0]=b}function M(a,b){("object"!==typeof b||e.isArray(b))&&h("'range' is not an object.");e.each(b,function(b,c){var g;"number"===typeof c&&(c=[c]);e.isArray(c)||h("'range' contains invalid value.");g="min"===b?0:"max"===b?100:parseFloat(b);t(g)&&t(c[0])||h("'range' value isn't numeric.");
a.c.push(g);a.d.push(c[0]);g?a.h.push(isNaN(c[1])?!1:c[1]):isNaN(c[1])||(a.h[0]=c[1])});e.each(a.h,function(b,c){if(!c)return!0;a.h[b]=y([a.d[b],a.d[b+1]],c)/(100/(a.c[b+1]-a.c[b]))})}function N(a,b){"number"===typeof b&&(b=[b]);(!e.isArray(b)||!b.length||2<b.length)&&h("'start' option is incorrect.");a.a=b.length;a.start=b}function O(a,b){a.m=b;"boolean"!==typeof b&&h("'snap' option must be a boolean.")}function P(a,b){"lower"===b&&1===a.a?a.i=1:"upper"===b&&1===a.a?a.i=2:!0===b&&2===a.a?a.i=3:!1===
b?a.i=0:h("'connect' option was doesn't match handle count.")}function Q(a,b){switch(b){case "horizontal":a.k=0;break;case "vertical":a.k=1;break;default:h("'orientation' option is invalid.")}}function R(a,b){2<a.c.length&&h("'margin' option is only supported on linear sliders.");a.margin=y(a.d,b);t(b)||h("'margin' option must be numeric.")}function S(a,b){switch(b){case "ltr":a.dir=0;break;case "rtl":a.dir=1;a.i=[0,2,1,3][a.i];break;default:h("'direction' option was not recognized.")}}function T(a,
b){"string"!==typeof b&&h("'behaviour' must be a string containing options.");var d=0<=b.indexOf("snap");a.n={p:0<=b.indexOf("tap")||d,extend:0<=b.indexOf("extend"),s:0<=b.indexOf("drag"),fixed:0<=b.indexOf("fixed"),m:d}}function U(a,b,d){a.o=[b.lower,b.upper];a.g=new s(b.format);e.each(a.o,function(a,g){e.isArray(g)||h("'serialization."+(a?"upper":"lower")+"' must be an array.");e.each(g,function(){this instanceof q||h("'serialization."+(a?"upper":"lower")+"' can only contain Link instances.");this.q=
a;this.u=d;this.scope=this.scope||d;this.g=new s(e.extend({},b.format,this.g))})});a.dir&&1<a.a&&a.o.reverse()}function V(a,b){var d={c:[],d:[],h:[!1],margin:0},c;c={step:{e:!1,f:L},range:{e:!0,f:M},start:{e:!0,f:N},snap:{e:!1,f:O},connect:{e:!0,f:P},orientation:{e:!1,f:Q},margin:{e:!1,f:R},direction:{e:!0,f:S},behaviour:{e:!0,f:T},serialization:{e:!0,f:U}};a=e.extend({connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"},a);a.serialization=e.extend({lower:[],upper:[],format:{}},a.serialization);
e.each(c,function(c,e){if(void 0===a[c])if(e.e)h("'"+c+"' is required.");else return!0;e.f(d,a[c],b)});d.style=d.k?"top":"left";return d}function W(a,b){var d=e("<div><div/></div>").addClass(f[2]),c=["-lower","-upper"];a.dir&&c.reverse();d.children().addClass(f[3]+" "+f[3]+c[b]);return d}function X(a,b){b.j&&(b=new q({target:e(b.j).clone().appendTo(a),method:b.method,format:b.g},!0));return b}function Y(a,b){var d,c=[];for(d=0;d<a.a;d++){var e=c,f=d,h=a.o[d],n=b[d].children(),r=void 0,l=[];l.push(new q({format:a.g},
!0));for(r=0;r<h.length;r++)l.push(X(n,h[r]));e[f]=l}return c}function Z(a,b,d){switch(a){case 1:b.addClass(f[7]);d[0].addClass(f[6]);break;case 3:d[1].addClass(f[6]);case 2:d[0].addClass(f[7]);case 0:b.addClass(f[6])}}function aa(a,b){var d,c=[];for(d=0;d<a.a;d++)c.push(W(a,d).appendTo(b));return c}function ba(a,b){b.addClass([f[0],f[8+a.dir],f[4+a.k]].join(" "));return e("<div/>").appendTo(b).addClass(f[1])}function ca(a,b,d){function c(){return u[["width","height"][b.k]]()}function g(a){var b,
c=[m.val()];for(b=0;b<a.length;b++)m.trigger(a[b],c)}function h(a,c,d){var g=a[0]!==k[0][0]?1:0,p=v[0]+b.margin,F=v[1]-b.margin;d&&1<k.length&&(c=g?Math.max(c,p):Math.min(c,F));100>c&&(c=J(b,c));c=Math.max(Math.min(parseFloat(c.toFixed(7)),100),0);if(c===v[g])return 1===k.length?!1:c===p||c===F?0:!1;a.css(b.style,c+"%");a.is(":first-child")&&a.toggleClass(f[17],50<c);v[g]=c;b.dir&&(c=100-c);e(w[g]).each(function(){this.write(b,c,a.children(),m)});return!0}function q(a,b,c){c||D(m,f[14]);h(a,b,!1);
g(["slide","set","change"])}function n(a,c,d,e){a=a.replace(/\s/g,".nui ")+".nui";c.on(a,function(a){var c=m.attr("disabled");if(m.hasClass(f[14])||void 0!==c&&null!==c)return!1;a.preventDefault();var c=0===a.type.indexOf("touch"),g=0===a.type.indexOf("mouse"),B=0===a.type.indexOf("pointer"),A,h,k=a;0===a.type.indexOf("MSPointer")&&(B=!0);a.originalEvent&&(a=a.originalEvent);c&&(A=a.changedTouches[0].pageX,h=a.changedTouches[0].pageY);if(g||B)B||void 0!==window.pageXOffset||(window.pageXOffset=document.documentElement.scrollLeft,
window.pageYOffset=document.documentElement.scrollTop),A=a.clientX+window.pageXOffset,h=a.clientY+window.pageYOffset;k.v=[A,h];k.cursor=g;a=k;a.l=a.v[b.k];d(a,e)})}function r(a,b){var d=b.a||k,e,f=!1,f=100*(a.l-b.start)/c(),m=d[0][0]!==k[0][0]?1:0;var n=b.w;e=f+n[0];f+=n[1];1<d.length?(0>e&&(f+=Math.abs(e)),100<f&&(e-=f-100),e=[Math.max(Math.min(e,100),0),Math.max(Math.min(f,100),0)]):e=[e,f];f=h(d[0],e[m],1===d.length);1<d.length&&(f=h(d[1],e[m?0:1],!1)||f);f&&g(["slide"])}function s(a){e("."+f[15]).removeClass(f[15]);
a.cursor&&e("body").css("cursor","").off(".nui");C.off(".nui");m.removeClass(f[12]);g(["set","change"])}function t(a,b){1===b.a.length&&b.a[0].children().addClass(f[15]);a.stopPropagation();n(l.move,C,r,{start:a.l,a:b.a,w:[v[0],v[k.length-1]]});n(l.end,C,s,null);a.cursor&&(e("body").css("cursor",e(a.target).css("cursor")),1<k.length&&m.addClass(f[12]),e("body").on("selectstart.nui",!1))}function x(a){var d=a.l,g=0;a.stopPropagation();e.each(k,function(){g+=this.offset()[b.style]});g=d<g/2||1===k.length?
0:1;d-=u.offset()[b.style];d=100*d/c();q(k[g],d,b.n.m);b.n.m&&t(a,{a:[k[g]]})}function y(a){var c=(a=a.l<u.offset()[b.style])?0:100;a=a?0:k.length-1;q(k[a],c,!1)}var m=e(a),v=[-1,-1],u,w,k;if(!m.is(":empty"))throw Error("Slider was already initialized.");u=ba(b,m);k=aa(b,u);w=Y(b,k);Z(b.i,m,k);(function(a){var b;if(!a.fixed)for(b=0;b<k.length;b++)n(l.start,k[b].children(),t,{a:[k[b]]});a.p&&n(l.start,u,x,{a:k});a.extend&&(m.addClass(f[16]),a.p&&n(l.start,m,y,{a:k}));a.s&&(b=u.find("."+f[7]).addClass(f[10]),
a.fixed&&(b=b.add(u.children().not(b).children())),n(l.start,b,t,{a:k}))})(b.n);a.F=function(a,c,d,n,p){var l;b.dir&&1<b.a&&a.reverse();p&&D(m,f[14]);for(l=0;l<(1<k.length?3:1);l++)p=d||w[l%2][0],p=p.valueOf(a[l%2]),!1!==p&&(p=I(b,p),b.dir&&(p=100-p),!0!==h(k[l%2],p,!0)&&e(w[l%2]).each(function(){this.write(b,v[l%2],k[l%2].children(),m,n)}));!0===c&&g(["set"])};a.D=function(){var a,c=[];for(a=0;a<b.a;a++)c[a]=w[a][0].A;return 1===c.length?c[0]:b.dir&&1<b.a?c.reverse():c};a.r=function(){e.each(w,function(){e.each(this,
function(){this.target&&this.target.off(".nui")})});e(this).off(".nui").removeClass(f.join(" ")).empty();return d};m.val(b.start)}function da(a){this.length||h("Can't initialize slider on empty selection.");var b=V(a,this);return this.each(function(){ca(this,b,a)})}function ea(a){return this.each(function(){var b=e(this).val(),d=this.r(),c=e.extend({},d,a);e(this).noUiSlider(c);d.start===c.start&&e(this).val(b)})}var C=e(document),G=e.fn.val,l=window.navigator.G?{start:"pointerdown",move:"pointermove",
end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},f="noUi-target noUi-base noUi-origin noUi-handle noUi-horizontal noUi-vertical noUi-background noUi-connect noUi-ltr noUi-rtl noUi-dragable  noUi-state-drag  noUi-state-tap noUi-active noUi-extended noUi-stacking".split(" "),K="decimals mark thousand prefix postfix encoder decoder negative negativeBefore".split(" "),
z=[2,".","","","",function(a){return a},function(a){return a},"-",""];s.prototype.b=function(a){return this.B[a]};s.prototype.C=function(a){function b(a){return a.split("").reverse().join("")}a=this.b("encoder")(a);var d="",c="",e="",f="";0>a&&(d=this.b("negative"),c=this.b("negativeBefore"));a=Math.abs(a).toFixed(this.b("decimals")).toString();a=a.split(".");0===parseFloat(a)&&(a[0]="0");this.b("thousand")?(e=b(a[0]).match(/.{1,3}/g),e=b(e.join(b(this.b("thousand"))))):e=a[0];this.b("mark")&&1<a.length&&
(f=this.b("mark")+a[1]);return c+this.b("prefix")+d+e+f+this.b("postfix")};s.prototype.t=function(a){function b(a){return a.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g,"\\$&")}var d;if(null===a||void 0===a)return!1;a=a.toString();d=a.replace(RegExp("^"+b(this.b("negativeBefore"))),"");a!==d?(a=d,d="-"):d="";a=a.replace(RegExp("^"+b(this.b("prefix"))),"");this.b.negative&&(d="",a=a.replace(RegExp("^"+b(this.b("negative"))),"-"));a=a.replace(RegExp(b(this.b("postfix"))+"$"),"").replace(RegExp(b(this.b("thousand")),
"g"),"").replace(this.b("mark"),".");a=this.b("decoder")(parseFloat(d+a));return isNaN(a)?!1:a};q.prototype.write=function(a,b,d,c,e){if(!this.update||!1!==e){if(100<=b)b=a.d.slice(-1)[0];else{e=1;for(var f,h,l;b>=a.c[e];)e++;f=a.d[e-1];h=a.d[e];l=a.c[e-1];f=[f,h];b=100/(a.c[e]-l)*(b-l)*(f[1]-f[0])/100+f[0]}this.A=b=this.format(b);if("function"===typeof this.method)this.method.call(this.target[0]||c[0],b,d,c);else this.target[this.method](b,d,c)}};q.prototype.format=function(a){return this.g.C(a)};
q.prototype.valueOf=function(a){return this.g.t(a)};e.noUiSlider={Link:q};e.fn.noUiSlider=function(a,b){return(b?ea:da).call(this,a)};e.fn.val=function(){var a=Array.prototype.slice.call(arguments,0),b,d,c,g;if(!a.length)return this.hasClass(f[0])?this[0].D():G.apply(this);"object"===typeof a[1]?(b=a[1].set,d=a[1].link,c=a[1].update,g=a[1].animate):!0===a[1]&&(b=!0);return this.each(function(){e(this).hasClass(f[0])?this.F(H(a[0]),b,d,c,g):G.apply(e(this),a)})}})(window.jQuery||window.Zepto);
// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//






;
