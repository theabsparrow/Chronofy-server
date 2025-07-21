import { TEvent } from '../event/event.interface';

class QueryBuilder {
  private data: TEvent[];
  private query: Record<string, unknown>;

  constructor(data: TEvent[], query: Record<string, unknown>) {
    this.data = data;
    this.query = query;
  }

  filter() {
    let result = this.data;
    if (this.query.category) {
      result = result.filter((event) => event.category === this.query.category);
    }
    this.data = result;
    return this;
  }

  sort() {
    const sortBy = (this.query.sort as keyof TEvent) || 'date';
    const order = this.query.sortOrder === 'asc' ? 1 : -1;

    this.data.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);

      if (sortBy === 'date' || sortBy === 'time') {
        return (dateA.getTime() - dateB.getTime()) * order;
      }

      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (
        aValue &&
        bValue &&
        typeof aValue === 'string' &&
        typeof bValue === 'string'
      ) {
        return aValue.localeCompare(bValue) * order;
      }

      return 0;
    });

    return this;
  }

  getResult() {
    return this.data;
  }
}

export default QueryBuilder;
