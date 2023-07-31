import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        const order = await prisma.order.findMany({
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true,
                        phone:true
                    }
                },
                products:{
                 include:{
                    images:true
                 }
                }
            }
        })
        return NextResponse.json(order)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })
    }
}