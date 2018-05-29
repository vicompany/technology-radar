import test from 'ava';
import Version from './version';

test('Version.fromPath()', (t) => {
	t.is('2018-01', Version.fromPath('a/b/2018-01').id);
	t.is('2018-01', Version.fromPath('a/b/2018-01.json').id);
	t.true(Version.fromPath('a/b/2018-01.json') instanceof Version);
});

test('Version.fromPath() with invalid arguments', (t) => {
	t.throws(() => Version.fromPath(''));
	t.throws(() => Version.fromPath('file'));
	t.throws(() => Version.fromPath('a/b/file'));
	t.throws(() => Version.fromPath('a/b/file.json'));
	t.throws(() => Version.fromPath(3));
});

test('Version.getNameFromId()', (t) => {
	t.is('January 2018', Version.getNameFromId('2018-01'));
	t.is('December 2018', Version.getNameFromId('2018-12'));
	t.is('January 2019', Version.getNameFromId('2019-01'));
});

test('Version.getNameFromId() with invalid arguments', (t) => {
	t.throws(() => Version.getNameFromId('2018-13'));
	t.throws(() => Version.getNameFromId(null));
	t.throws(() => Version.getNameFromId(123));
});
