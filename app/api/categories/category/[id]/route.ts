import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: number } }) {

    try {
        const category = await prisma.category.findFirst({
            where: {
                id: Number(params.id)
            },
            include:{
                parent:true
            }
        })

        return NextResponse.json(category)
    }
    catch (error) {
        console.log('[GET_CATEGORY_BY_ID]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}


export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    try {
        const deletedCategory = await prisma.category.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json({
            message: 'Product deleted successfully',
            deletedCategory
        })
    }
    catch (error) {
        console.log('[DELETE_CATEGORIE', error)
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
    const body = await req.json();
    const categoryData = body;

    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: Number(params.id)
            },
            data:{
                ...categoryData
            }
        })

        return NextResponse.json({
            message: 'Category updated successfully',
            updatedCategory
        })
    }
    catch (error) {
        console.log('[PUT_PRODUCT_BY_ID]', error);
    }
}