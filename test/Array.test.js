var jam = require('../jam');
var expect = require('chai').expect;

describe('Arrays', function() {

	describe('unique()', function() {

		it('数组不能有重复项', function() {
			expect(jam.unique([ 1, 1, 2, 2, 3, 3 ])).to.be.deep.equal([ 1, 2, 3 ]);
			expect(jam.unique([ 1, 3, 1, 2, 2, 3, 1 ])).to.be.deep.equal([ 1, 3, 2 ]);
		});
		it('字符串和数字不算重复', function() {
			expect(jam.unique([ '1', 1, '2', 2, 3, '3' ])).to.be.deep.equal([ '1', 1, '2', 2, 3, '3' ]);
			expect(jam.unique([ '1', '1', '2', '2', '3', '3' ])).to.be.deep.equal([ '1', '2', '3' ]);
		});

		it('对象不能重复', function() {
			expect(jam.unique([ {foo: 'bar'}, {foo: 'bar'}, {foo: 'baz'} ])).to.be.deep.equal([ {foo: 'bar'}, {foo: 'baz'} ]);
		});

		it('特殊对象去重', function() {
			expect(jam.unique([ null, null, undefined, undefined, NaN, NaN ])).to.be.deep.equal([ null, undefined, NaN ]);
		});

	});

	describe('range()', function() {
		it('只传一个参数的情况,从0开始', function() {
			expect(jam.range(10)).to.be.deep.equal([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
		});
		it('有开始和结束的情况', function() {
			expect(jam.range(1, 11)).to.be.deep.equal([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]);
		});
		it('有步长的情况', function() {
			expect(jam.range(0, 30, 5)).to.be.deep.equal([ 0, 5, 10, 15, 20, 25 ]);
		});
		it('负步长的情况', function() {
			expect(jam.range(0, -10, -1)).to.be.deep.equal([ 0, -1, -2, -3, -4, -5, -6, -7, -8, -9 ]);
		});
		it('参数为0情况', function() {
			expect(jam.range(0)).to.be.deep.equal([ ]);
		});
	});

});