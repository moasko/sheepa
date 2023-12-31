import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  }
  const userProducts = await prisma.product.findMany({
    where: { userId: +params.id },
    include:{
        user:true
    }
  });

  return new Response(JSON.stringify(userProducts));
}