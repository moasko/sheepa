import { BASE_URL } from "@/lib/helpers/constants";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { number, z } from "zod";

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
  categories: z.string(),
  images: z.array(
    z.object({
      imageUrl: z.string(), 
    })
  ),
});

interface Category {
  id: number;
  name: string,
  slug: string,
  childCategories:any
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const productData = productSchema.parse(body);

    const formatCategories = productData.categories?.split(',').map((categoriId: string) => { return { id: Number(categoriId)} }, [])

    const product = await prisma.product.create({
      data: {
        ...productData,
        user: { 
          connect: {
            id: productData.user,
          },
        },
        categories: {
          connect: formatCategories
        },
        images: {
          create: productData.images.map(image => ({ imageUrl: image.imageUrl })),
        },
      },
      include:{
        images:true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url || '', BASE_URL);
    const searchParams = new URLSearchParams(url.search);

    const perPage = searchParams.get('perPage');
    const page = searchParams.get('page');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const tags = searchParams.get('tags');

    const pageNumber = page ? Number(page) : 1;
    const pageSize = perPage ? Number(perPage) : undefined;
    const skip = pageSize && pageNumber > 1 ? (pageNumber - 1) * pageSize : undefined;

    const where = {
      isActive: true,
      ...(category ? { categories: { some: { slug: category } } } : {}),
      ...(minPrice && maxPrice ? { price: { gte: Number(minPrice), lte: Number(maxPrice) } } : {}),
      ...(tags ? { tags: { hasSome: tags.split(',') } } : {}),
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
        categories: {
          select: {
            id: true,
            name: true,
            slug: true,
            childCategories:true
          },
        },
      },
    });

    const totalCount = await prisma.product.count({
      where,
    });

    const productCategories: Category[] = products.flatMap((product) => product.categories); 
    const uniqueCategories: number[] = [...new Set(productCategories.map((category) => category.id))];
    const pricesRangeBrut = products.flatMap((product)=>product.price)

    const categories = await prisma.category.findMany({
      where: {
        id: { in: uniqueCategories },
      },
    });


    return NextResponse.json({
      currentPage: pageNumber,
      pageSize,
      total: totalCount,
      products,
      categories,
      prices: {
        minPrice: Math.min(...pricesRangeBrut),
        maxPrice: Math.max(...pricesRangeBrut),
      }
    });
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url || '', BASE_URL);
    const searchParams = new URLSearchParams(url.search);

    const id = searchParams.get('id')
    const product = await prisma.product.delete({
      where: {
        id: Number(id)
      }
    })

    return NextResponse.json({
      message: 'Product deleted successfully',
      product
    })

  } catch (error) {
    console.log('[PRODUCTS_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
