(function() {
	var root = (typeof self === 'object' && self.self === self  && self) ||
		(typeof global === 'object' && global.global === global && global) || 
			this || {};

	var previousJam = root.jam;

	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1, 
		ArrayProto = Array.prototype,
		push = ArrayProto.push,
		isArrayLike = function(collection) {
			var length = collection.length;
			return typeof length === 'number' && length > 0 && length <= MAX_ARRAY_INDEX;
		};

	var jam = function(obj) {
		if(obj instanceof jam) {
			return obj;
		}
		if(!(this instanceof jam)) {
			var instance = new jam(obj);
			return instance;
		}
		this.jam_wrapped = obj;
	};

	if(typeof exports !== 'undefined' && !exports.nodeType) {
		if(typeof module !== 'undefined' && !module.nodeType && module.exports) {
			exports = module.exports = jam;
		}
		exports.jam = jam;
	} else {
		root.jam = jam;
	}

	jam.VERSION = '0.0.1';

	jam.each = function(obj, callback) {
		var length, i = 0;

		if(isArrayLike(obj)) {
			length = obj.length;
			for(; i < length; i++) {
				if(callback.call(obj[i], obj[i], i) == false) {
					break;
				}
			}
		} else {
			for(i in obj) {
				if(callback.call(obj[i], obj[i], i) === false) {
					break;
				}
			}
		}
		return obj;
	};

	jam.isFunction = function(obj) {
		return typeof obj === 'function' || false;
	};

	jam.functions = function(obj) {
		var names = [];
		for(var key in obj) {
			if(jam.isFunction(obj[key])) {
				names.push(key);
			}
		}
		return names.sort();
	};

	jam.noConflict = function() {
		root.jam = previousJam;
		return this;
	};

	jam.chain = function(obj) {
		var instance = jam(obj);
		instance.jam_chain = true;
		return instance;
	};

	var chainResult = function(instance, obj) {
		return instance.jam_chain ? jam(obj).chain() : obj;
	};

	jam.mixin = function(obj) {
		jam.each(jam.functions(obj), function(name) {
			var func = jam[name] = obj[name];

			jam.prototype[name] = function() {
				var args = [this.jam_wrapped];
				push.apply(args, arguments);
				return chainResult(this, func.apply(jam, args));
			};
		});
		return jam;
	};

	jam.mixin(jam);

	jam.prototype.value = function() {
		return this.jam_wrapped;
	};

}());