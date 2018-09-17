var jam = require('../jam');
var expect = require('chai').expect;

describe.only('Chain', function() {

	describe('chain()', function() {
		it('链式调用测试', function() {
			var arr = jam.chain([ 1, 2, 3 ]).push(4).shift().value();
			expect(arr).to.be.deep.equal([ 2, 3, 4 ]);
		});
	});

});