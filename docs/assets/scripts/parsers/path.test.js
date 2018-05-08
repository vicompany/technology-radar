import test from 'ava';
import { getBasename } from './path';

test('PathParser.getBasename() with path', (t) => {
	t.is('', getBasename(''));
	t.is('', getBasename('', '.json'));
	t.is('bar', getBasename('foo/bar'));
	t.is('bar.json', getBasename('foo/bar.json'));
	t.is('bar', getBasename('foo/bar.json', '.json'));
});

test('PathParser.getBasename() with invalid path', (t) => {
	t.throws(() => getBasename());
	t.throws(() => getBasename(null));
	t.throws(() => getBasename(123));
});

test('PathParser.getBasename() with invalid extension', (t) => {
	t.throws(() => getBasename('foo/bar', null));
	t.throws(() => getBasename('foo/bar', 123));
});
