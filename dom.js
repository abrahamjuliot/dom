(function(win, doc, undefined){
	'use strict';
	
	// exit if window.dom exists
	if (typeof win.dom !== "undefined") {
		console.error('window.dom already exists');
		return;
	}
	
	win.dom = function(selector, kind = null) {
		
		// DICTIONARY
		const prop = {
			'id': 'getElementById',
			'classes': 'getElementsByClassName',
			'tags': 'getElementsByTagName',
			'element': 'querySelector',
			'elements': 'querySelectorAll',
			'HtmlC': 'HTMLCollection',
			'NList': 'NodeList',
			'len': 'length',
			'proto': 'prototype',
			'cList': 'classList',
			'listen': 'addEventListener',
			'create': 'createElement',
			'outer': 'outerHTML',
			'inner': 'innerHTML',
			'low': 'toLowerCase'
		},
		methodList = [
			'html',
			'node',
			'addClass',
			'removeClass',
			'toggleClass',
			'hasClass',
			'eachHaveClass',
			'onTouch'
		],
		// Type check utility - inspired by parliament and wiky @ 
		// http://stackoverflow.com/questions/7893776/the-most-accurate-way-to-check-js-object-type
		thetypeof = function(name) {
			let obj = {};
			obj.object = 'object Object';
			obj.array = 'object Array';
			obj.string = 'object String';
			obj.boolean = 'object Boolean';
			obj.number = 'object Number';
			obj.type = Object[prop.proto].toString.call(name).slice(1, -1);
			obj.name = Object[prop.proto].toString.call(name).slice(8, -1);
			obj.is = (ofType) => {
				ofType = ofType[prop.low]();
				return (obj.type === obj[ofType])? true: false;
			};
			obj.isnt = (ofType) => {
				ofType = ofType[prop.low]();
				return (obj.type !== obj[ofType])? true: false;
			};
			obj.error = (ofType) => {
				throw new TypeError(
					`The type of ${name} is ${obj.name}: `
					+`it should be of type ${ofType}`
				);
			};
			return obj;
		};
		
		// Establish HTMLCollection.map and NodeList.map
		win[prop.HtmlC][prop.proto].map = Array[prop.proto].map;
		win[prop.NList][prop.proto].map = Array[prop.proto].map;
		
		let
		methods = {}, // namespace
		element = null, // the element node or list to be returned
		elementKind = null, // the element kind: 'id', 'tags', 'classes', 'element', or 'elements'
		
		// Set elementKind to a dictionary property based on the user provided element kind
		setElementKind = (kind) => {
			switch(kind) {
				case 'id': elementKind = 'id';         break;
				case 'tag': elementKind = 'tags';      break;
				case 'class': elementKind = 'classes'; break;
				case 'first': elementKind = 'element'; break;
				default: elementKind = 'elements';
			}
		},
		
		// Trim the first character of the selector if it's of kind 'id' or 'class' with '.' or '#'
		trimSelector =  (selectorName, selectorKind) => {
			if ((selectorKind === 'id' || selectorKind === 'classes')
			&&(selectorName[0] === '#' || selectorName[0] === '.')) {
				return selectorName.substring(1);
			} else {
				return selectorName;
			}
		},
		elementIsNotFound = () => {
			if (!element || element[prop.len] === 0) {
				console.error(`No "${selector}" ${elementKind} found `
				+`of type ${thetypeof(element).name}`);
				return true;
			} else {
				return false;
			}
		},
		
		// Assign each element method to the element object
		setMethods = (elem, list) => {
			list.map(name => elem[name] = methods[name]);
		},
		
		// Get the element object based on user provided name and kind if provided
		getElement = (name, kind, setKind, trim, elemNotFound, set) => {
			setKind(kind);
			name = trim(name, elementKind);
			// get element by its kind and assign to element
			element = doc[prop[elementKind]](name);
			// if element is falsy or its length is 0
			if (elemNotFound()) {
				return undefined;
			} else {
				// assign methods to element
				set(element, methodList);
				return element;
			}
		};
		
		// Element methods
		methods.html = () => {
			if (typeof element[prop.len] === 'number') {
				let html = '';
				element.map(el => html += el[prop.outer]);
				return html;
			} else {
				return element[prop.outer];
			}
		};
		methods.node = () => {
			if (typeof element[prop.len] === 'number') {
				let html = '', divWrapper = doc[prop.create]('div');
				element.map(el => html += el[prop.outer]);
				divWrapper[prop.inner] = html;
				return divWrapper;
			} else {
				return element;
			}
		};
		methods.addClass = (name) => {
			if (typeof element[prop.len] === 'number') {
				element.map(el => el[prop.cList].add(name));
				return element;
			} else {
				element[prop.cList].add(name);
				return element;
			}
		};
		methods.removeClass = (name) => {
			if (typeof element[prop.len] === 'number') {
				element.map(el => el[prop.cList].remove(name));
				return element;
			} else {
				element[prop.cList].remove(name);
				return element;
			}
		};
		methods.toggleClass = (name) => {
			if (typeof element[prop.len] === 'number') {
				element.map(el => el[prop.cList].toggle(name));
				return element;
			} else {
				element[prop.cList].toggle(name);
				return element;
			}
		};
		methods.hasClass = (name) => {
			if (typeof element[prop.len] === 'number' && element[prop.len] !== 1) {
				console.error(`Failed to execute 'hasClass' `
				+`on '${thetypeof(element).name}' elements': `
				+`try 'eachHaveClass' instead`);
				return;
			} else if (element[prop.len] === 1) {
				return element[0][prop.cList].contains(name);
			} else {
				return element[prop.cList].contains(name);
			}
		};
		methods.eachHaveClass = (name) => {
			if (typeof element[prop.len] !== 'number') {
				console.error(`Failed to execute 'eachHaveClass' `
				+`on '${thetypeof(element).name}' element: `
				+`try 'hasClass' instead`);
				return;
			} else {
				for (let i = 0, 
						 found = true, 
						 len = element[prop.len]; i < len; i++) {
						found = element[i][prop.cList].contains(name);
						if (found === false) return false;
				}
			} 
			return true;
		};
		methods.onTouch = (fn) => {
			/* may need stop propagation
			childOfelement.onclick = function (e) {
						return e.stopPropagation();
			};*/
			if (typeof element[prop.len] === 'number') {
				element.map(el => el[prop.listen]('click', fn));
				return element;
			} else {
				element[prop.listen]('click', fn);
				return element;
			}
		};	
		// 1. VALIDATE ARGUMENT(S) TYPE
		// If the type of selector is not a string then throw an error
		if (thetypeof(selector).isnt('String')) {
			thetypeof(selector).error('String');
		}
		// If the type of kind is not a string and not null then throw an error
		if (thetypeof(kind).isnt('String') && kind !== null) {
			thetypeof(kind).error('String');
		}
		
		// 2. GET AND RETURN ELEMENT OBJECT
		return getElement(selector, kind, setElementKind, trimSelector, elementIsNotFound, setMethods);
	};
	
	// Non selector methods
	win.dom.whenReady = (fn) => {
		doc.readyState !== 'loading' ?
		fn():
		doc.addEventListener('DOMContentLoaded', fn);
	};
	
})(this, document);