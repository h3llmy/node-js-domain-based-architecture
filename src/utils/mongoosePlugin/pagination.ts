import { Schema, Document } from "mongoose";

interface IPaginationQuery {
  skip?: number;
  limit?: number;
}

interface IPaginationResult<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
}

export default function paginationPlugin(schema: Schema) {
  schema.statics.paginate = async function <T extends Document>(
    filter: any,
    query: IPaginationQuery
  ): Promise<IPaginationResult<T>> {
    const page = query.skip || 1;
    const limit = query.limit || 10;

    const skip = (page - 1) * limit;

    const countPromise = this.model.countDocuments(filter).exec();
    const documentsPromise = this.find(filter).skip(skip).limit(limit).exec();

    const [totalDocs, docs] = await Promise.all([
      countPromise,
      documentsPromise,
    ]);

    const totalPages = Math.ceil(totalDocs / limit);

    return {
      docs,
      totalDocs,
      totalPages,
      page,
      limit,
    };
  };
}
