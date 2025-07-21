import { Query } from 'mongoose';
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

export class QueryBuilderForDatabase<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };
    const excludeFields = ['sort', 'sortOrder', 'limit', 'page', 'searchTerm'];
    excludeFields.forEach((element) => delete queryObject[element]);
    this.modelQuery = this.modelQuery.find(queryObject);
    return this;
  }
  sort() {
    const sortOrder = this?.query?.sortOrder === 'desc' ? '-' : '';
    const sortBy = this?.query?.sort;

    let sortFields = '';
    if (sortBy === 'date-time') {
      sortFields = sortOrder === '-' ? '-date -time' : 'date time';
    } else if (sortBy) {
      const customSort = (sortBy as string).split(',').join(' ');
      sortFields = sortOrder + customSort;
    } else {
      sortFields = 'date time';
    }
    this.modelQuery = this.modelQuery.sort(sortFields);
    return this;
  }

  paginateQuery() {
    const limit = Number(this?.query?.limit) || 0;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit || 0;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 20;
    const totalPage = Math.ceil(total / limit);
    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}
