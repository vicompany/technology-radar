import test from 'ava';
import sinon from 'sinon';
import EventEmitter from './event-emitter';

test.beforeEach((t) => {
	t.context.instance = new EventEmitter();
});

test('EventEmitter.on()', (t) => {
	const fn = sinon.spy();

	t.notThrows(() => t.context.instance.on('foo', fn));
});

test('EventEmitter.on() with invalid arguments', (t) => {
	const fn = sinon.spy();

	t.throws(() => t.context.instance.on());
	t.throws(() => t.context.instance.on('foo'));
	t.throws(() => t.context.instance.on(123, fn));
	t.throws(() => t.context.instance.on('foo', 123));
	t.true(fn.notCalled);
});

test('EventEmitter.trigger()', (t) => {
	const fn = sinon.spy();

	t.context.instance.on('foo', fn);
	t.context.instance.trigger('foo');

	t.true(fn.calledOnce);
});

test('EventEmitter.trigger() with invalid arguments', (t) => {
	const fn = sinon.spy();

	t.context.instance.on('foo', fn);
	t.context.instance.trigger('foo');

	t.true(fn.calledOnce);
});
