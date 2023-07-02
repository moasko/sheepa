import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";


const productSchema = z.object({
  name: z.string().nonempty(),
  slug: z.string(),
  price: z.number(),
  reduction: z.number(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  quantity: z.number(),
  description: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  user: z.number(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const productData = productSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        ...productData,
        user: {
          connect: {
            id: productData.user,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url || '', 'http://localhost:3000');
    const searchParams = new URLSearchParams(url.search);

    const perPage = searchParams.get('perPage');
    const page = searchParams.get('page');
    const category = searchParams.get('category');

    const pageNumber = page ? Number(page) : 1;
    const pageSize = perPage ? Number(perPage) : undefined;
    const skip = pageSize && pageNumber > 1 ? (pageNumber - 1) * pageSize : undefined;

    const where = {
      isActive: true,
      ...(category ? { categories: { some: { slug: category } } } : {}),
    };

    const products = await prisma.product.findMany({
      orderBy: {
        id: 'desc',
      },
      take: pageSize,
      skip,
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        images: true,
        categories:{
            select:{
              id:true,
              name:true,
              slug:true
            }
        }
      },
    });

    const totalCount = await prisma.product.count({
      where,
    });

    return NextResponse.json({
      currentPage: pageNumber,
      pageSize,
      total: totalCount,
      products,
    });
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
