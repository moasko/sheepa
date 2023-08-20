import prisma from "../prisma";


export const getSingleSeoProduct = (slug:string)=>{
    return prisma.product.findFirst({
        where: {
          slug: slug
        }
      })
    
    
}