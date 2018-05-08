import test from 'ava';
import IdFactory from './id';

test('IdFactory.constructor()', (t) => {
	t.notThrows(() => new IdFactory());
});

test('IdFactory.next()', (t) => {
	const idFactory = new IdFactory();

	t.true(typeof idFactory.next() === 'number');
	t.is(2, idFactory.next());
	t.is(3, idFactory.next());
});

test('IdFactory.reset()', (t) => {
	const idFactory = new IdFactory();

	idFactory.next();
	idFactory.next();

	t.is(idFactory, idFactory.reset());
	t.is(1, idFactory.next());
});
