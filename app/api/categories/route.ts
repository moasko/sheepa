import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await prisma.category.findMany({
            orderBy:{
                id:"desc"
            },
            include: {
                childCategories: true,
                _count: {
                    select: {
                        products: true
                    }
                }
            }
        });
        return NextResponse.json(data)
    }
    catch (error) {
        console.log('[GET_CATEGORIES', error)
        return new NextResponse('Internal error', { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const categoryData = body;
        const category = await prisma.category.create({
            data:{
                ...categoryData
            } 
        })
        return NextResponse.json(category);
    } catch (error) {
        console.log('[POST_CATEGORIES', error)
        return new NextResponse('Internal error', { status: 500 });
    }
}