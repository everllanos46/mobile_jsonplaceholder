import { filterAndSort } from '../utils/filter';

test('filter by title and sort asc', () => {
  const items = [
    {id:1, title: 'Banana'},
    {id:2, title: 'apple'},
    {id:3, title: 'Cherry'},
  ];
  const out = filterAndSort(items, 'a', 'asc', 'title');
  expect(out.map(x=>x.title)).toEqual(['apple','Banana']);
});
