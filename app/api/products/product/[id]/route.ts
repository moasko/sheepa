import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(req: Request,{params}:{params:{id:number}}) {
    try {

        const product = await prisma.product.findFirst({
            where: {
                id: Number(params.id)
            },
            include:{
                images:true
            }
        })

        return NextResponse.json({
            product
        })

    } catch (error) {
        console.log('[GET_PRODUCT_BY_ID]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}



export async function PUT(req: Request,{params}:{params:{id:number}}) {
    try {
      const body = await req.json();
      const productData = body;
  
      const product = await prisma.product.update({
        where: {
          id: Number(params.id)
        },
        data: {
          ...productData,
        },
        include: {
          images: true
        }
      })
      return NextResponse.json({
        message: 'Product updated successfully',
        product
      })
    } catch (error) {
      console.log('[PRODUCTS_UPDATE]', error);
      return new NextResponse('Internal error', { status: 500 });
    }
  }
  