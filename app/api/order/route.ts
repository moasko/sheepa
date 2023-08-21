import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  const newOrderBody = await req.json();

  try {
    const order = await prisma.order.create({
      data: {
        ...newOrderBody,
        items: {
          createMany: {
            data: [ ...newOrderBody.items]
          }
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

export async function GET() {
  try {
    const order = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                images:{
                  select:{
                    imageUrl:true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        id: "desc"
      }
    })
    return NextResponse.json(order)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error })
  }
}