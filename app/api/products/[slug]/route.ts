import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const product = await prisma.product.findFirst({
            where: {
                slug: params.slug
            },
            include: {
                user: {
                    select:{
                        name: true,
                        phone:true,
                        email:true
                    }
                },
                images: true,
                ProductReview:true
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}