import test from 'ava';
import Version from './version';

test('Version.fromPath()', (t) => {
	t.is('file', Version.fromPath('a/b/file').id);
	t.is('file', Version.fromPath('a/b/file.json').id);
	t.true(Version.fromPath('a/b/file.json') instanceof Version);
});

test('Version.fromPath() with invalid arguments', (t) => {
	t.throws(() => Version.fromPath(''));
	t.throws(() => Version.fromPath('file'));
	t.throws(() => Version.fromPath(3));
});
