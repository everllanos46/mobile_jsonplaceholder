import { filterAndSort } from '../utils/filter';

describe('filterAndSort', () => {
  const posts = [
    { id: 1, title: 'b title', body: '...' },
    { id: 2, title: 'a title', body: '...' },
    { id: 3, title: 'Another', body: '...' },
  ];

  it('filtra por query', () => {
    const res = filterAndSort(posts, 'another', null, 'title');
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe(3);
  });

  it('ordena ascendente', () => {
    const res = filterAndSort(posts, '', 'asc', 'title');
    expect(res[0].title).toBe('Another');
    expect(res[1].title).toBe('a title');
    expect(res[2].title).toBe('b title');
  });

  it('ordena descendente', () => {
    const res = filterAndSort(posts, '', 'desc', 'title');
    expect(res[0].title).toBe('b title');
  });
});
