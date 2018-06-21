import test from 'ava';
import LevelModel from '../models/level';
import RadarListFactory from './radar-list';
import TechnologyModel from '../models/technology';

const createTechnologyByLevel = (levels, technology) => levels.map(level => ({
	level,
	items: technology.filter(tech => level === tech.level),
}));

const createTechnologyDeltas = (technology, deltas) => {
	const map = new WeakMap();

	technology.forEach((t, i) => map.set(t, deltas[i]));

	return map;
};

test.beforeEach((t) => {
	t.context.levels = [
		new LevelModel('a', 'a', 0),
		new LevelModel('b', 'b', 0),
	];

	t.context.technology = [
		new TechnologyModel(1, 'a1', t.context.levels[0]),
		new TechnologyModel(2, 'a2', t.context.levels[0]),
		new TechnologyModel(3, 'b1', t.context.levels[1]),
		new TechnologyModel(4, 'b2', t.context.levels[1]),
	];

	t.context.technologyByLevel = createTechnologyByLevel(t.context.levels, t.context.technology);
	t.context.technologyDeltas = createTechnologyDeltas(t.context.technology, [1, 2, 0, -1]);
});

test('RadarList.get()', (t) => {
	t.notThrows(() => RadarListFactory.get(t.context.technologyByLevel, t.context.technologyDeltas));
});

test('RadarList.get() with invalid technologyByLevel', (t) => {
	t.throws(() => RadarListFactory.get(null, t.context.technologyDeltas));
	t.throws(() => RadarListFactory.get(1, t.context.technologyDeltas));
	t.throws(() => RadarListFactory.get({}, t.context.technologyDeltas));
	t.throws(() => RadarListFactory.get([null], t.context.technologyDeltas));
	t.throws(() => RadarListFactory.get([1], t.context.technologyDeltas));
	t.throws(() => RadarListFactory.get([{}], t.context.technologyDeltas));
	t.throws(() => RadarListFactory.get([{ level: null, items: [] }], t.context.technologyDeltas));
});

test('RadarList.get() with invalid technologyDeltas', (t) => {
	t.throws(() => RadarListFactory.get(t.context.technologyByLevel, null));
	t.throws(() => RadarListFactory.get(t.context.technologyByLevel, 1));
	t.throws(() => RadarListFactory.get(t.context.technologyByLevel, {}));
});
