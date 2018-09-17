var jam = require('../jam');
var expect = require('chai').expect;

describe('Functions', function() {

	describe('partial()', function() {
		it('验证this的指向', function() {
			function add(a, b) {
				return a + b + this.value;
			}
			var addOne = jam.partial(add, 1);
			var value = 1;
			var obj = {
				value: 2,
				addOne: addOne
			};
			expect(obj.addOne(2)).to.be.equal(5);
		});
	});
});