var jam = require('../jam');
var expect = require('chai').expect;

describe('Utility', function() {
	describe('random()', function() {
		it('只有一个参数的情况', function() {
			expect(jam.random(5)).to.be.most(5);
		});
		it('两个参数的情况', function() {
			expect(jam.random(2, 8)).to.be.least(2);
			expect(jam.random(2, 8)).to.be.most(8);
		});
		it('返回值必须是个数字', function() {
			expect(jam.random(5, 10)).to.be.a('number');
		});
	});
});