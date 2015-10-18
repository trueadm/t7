import t7Factory from '../src';
import isComponent from '../src/util/isComponent';
import validateElementTags from '../src/util/validateElementTags';
import reactTests from './react-tests';
import universalTests from './universal-tests';
import { expect } from 'chai';

describe('t7 acceptance tests', () => {
	let t7 = null;

	afterEach(() => {
		t7Factory.clearTemplates();
	});

	describe('Universal (default) transformer', () => {
		t7 = t7Factory.createInstance();
		universalTests(t7Factory, t7);
	});

	describe('React transformer', () => {
		t7 = t7Factory.createInstance();
		reactTests(t7Factory, t7);
	});

	describe('Utilities', () => {
		it('should validate component names correctly #1', () => {
			expect(isComponent('DOMINIC')).to.be.true;
		});
		it('should validate component names correctly  #2', () => {
			expect(isComponent('SPAN')).to.be.false;
		});
		it('should validate component names correctly  #3', () => {
			expect(isComponent('&/()=SPAN')).to.be.false;
		});
		it('should validate element tagNames correctly #1', () => {
			expect(validateElementTags('span')).to.be.true;
		});
		it('should validate element tagNames correctly #2', () => {
			expect(validateElementTags('SPAN')).to.be.false;
		});
		it('should validate element tagNames correctly #3', () => {
			expect(validateElementTags('&/()=SPAN')).to.be.false;
		});
	});
});
