import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../prisma';


const paginator = (defaultOptions: { page?: number; perPage?: number }) => {
  return async (
    model: any,
    args: { where?: any } = { where: undefined },
    options?: { page?: number; perPage?: number }
  ) => {
    const page = Number(options?.page || defaultOptions?.page) || 1;
    const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;

    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  };
};

export const paginate = paginator({ page: 1, perPage: 10 });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, perPage } = req.query;

  const paginatedResult = await paginate(prisma.product, undefined, {
    page: Number(page),
    perPage: Number(perPage),
  });

  res.json(paginatedResult);
}
