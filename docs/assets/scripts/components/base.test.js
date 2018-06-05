import test from 'ava';
import browserEnv from 'browser-env';
import Base from './base';

browserEnv();

test('Base.constructor()', (t) => {
	const element = document.createElement('div');

	t.notThrows(() => new Base(element));
	t.is(element, new Base(element).element);
});

test('Base.constructor() with invalid element', (t) => {
	t.throws(() => new Base());
	t.throws(() => new Base('element'));
	t.throws(() => new Base(123));
});
