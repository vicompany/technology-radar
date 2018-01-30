export default (technologyList, technologyId) => technologyList
	.find(technology => technology.id === technologyId);
