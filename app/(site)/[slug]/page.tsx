"use client";

import ProductsSection from '@/components/siteComponents/dynamicSections/ProductsSection';
import { getProduct } from '@/services/products.sercices';
import Image from 'next/image';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import {Image as Img} from "antd"
import { ProductProps } from "@/lib/interfaces/modelsInterfaces"
import { useRouter, useParams } from 'next/navigation';
import { priceFormatter } from '@/lib/helpers/priceFormatter';
import { Rate } from 'antd';
import Head from 'next/head';
import SingleProductLoading from '@/components/siteComponents/dynamicSections/loaders/SingleProductLoading';


interface ProductDetailsProps { }

const ProductDetails: FC<ProductDetailsProps> = () => {

  const params = useParams()
  const { slug } = params

  const { data, isLoading, refetch } = useQuery(['singleproduct', slug], () => getProduct(slug), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const product: ProductProps | undefined = data?.data;

  useEffect(() => {
    refetch()
  }, [slug])




  return (
    <>
      <Head>
        <title>
          iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple
        </title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
          key="desc"
        />
      </Head>
      {
        isLoading ? <SingleProductLoading /> :
          <section className='row'>

            <div className="relative mx-auto max-w-screen-xl card  py-8">
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                  <div className='flex'>

                    <div className="h-full flex flex-col space-y-2 mr-2">
                      {
                        product?.images.map(image=>{
                          return   <Image
                          key={image.id}
                          width={110}
                          height={110}
                          alt=""
                          src={image.imageUrl}
                          className="aspect-square rounded object-cover"
                        />
                        })
                      }
                    
                    </div>

                    <img
                      alt="Les Paul"
                      src={product?.images.length == 0 ? '/product_placeholder.png' : `${product?.images[0].imageUrl}`}
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                  </div>



                </div>

                <div className="sticky top-0">
                  <div className='flex space-x-3'>
                    <strong
                      className="rounded border border-orange-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-orange-600"
                    >
                      -50%
                    </strong>
                    <strong
                      className="rounded border border-red-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-red-600"
                    >
                      En rupture
                    </strong>
                  </div>


                  <div className="mt-8">
                    <div className="max-w-full space-y-2">
                      <h1 className="text-xl sm:text-2xl">
                        {product?.name}
                      </h1>
                      <p className="text-3xl pt-3 pb-3 font-bold">{priceFormatter.format(Number(product?.price))}</p>

                    </div>
                    <Rate disabled value={4} count={5} />
                    <p className="text-xs">{"(12 Avis vérifiés)"}</p>
                  </div>

                  <div className="mt-4">
                    <div className="prose max-w-none">
                      <p>
                        {product?.description}
                      </p>
                    </div>

                    <button className="mt-2 text-sm font-medium underline">Read More</button>
                  </div>

                  <form className="mt-8">
                    <fieldset>
                      <legend className="mb-1 text-sm font-medium">Color</legend>

                      <div className="flex flex-wrap gap-1">
                        <label htmlFor="color_tt" className="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            id="color_tt"
                            className="peer sr-only"
                          />
                          <div className='flex space-x-2 items-center rounded-md border px-3 py-1 peer-checked:bg-black peer-checked:text-white'>
                            <div className='w-4 h-4 rounded-md bg-red-500'></div>
                            <span className=" text-xs font-medium ">
                              Rouge
                            </span>
                          </div>

                        </label>

                        <label htmlFor="color_fr" className="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            id="color_fr"
                            className="peer sr-only"
                          />

                          <span
                            className="group inline-block  rounded-md border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                          >
                            Fiesta Red
                          </span>
                        </label>

                        <label htmlFor="color_cb" className="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            id="color_cb"
                            className="peer sr-only"
                          />

                          <span
                            className="group inline-block  rounded-md border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                          >
                            Cobalt Blue
                          </span>
                        </label>
                      </div>
                    </fieldset>

                    <fieldset className="mt-4">
                      <legend className="mb-1 text-sm font-medium">Size</legend>

                      <div className="flex flex-wrap gap-1">
                        <label htmlFor="size_xs" className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            id="size_xs"
                            className="peer sr-only"
                          />

                          <span
                            className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                          >
                            XS
                          </span>
                        </label>

                        <label htmlFor="size_s" className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            id="size_s"
                            className="peer sr-only"
                          />

                          <span
                            className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                          >
                            S
                          </span>
                        </label>

                        <label htmlFor="size_m" className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            id="size_m"
                            className="peer sr-only"
                          />

                          <span
                            className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                          >
                            M
                          </span>
                        </label>

                        <label htmlFor="size_l" className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            id="size_l"
                            className="peer sr-only"
                          />

                          <span
                            className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                          >
                            L
                          </span>
                        </label>

                        <label htmlFor="size_xl" className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            id="size_xl"
                            className="peer sr-only"
                          />

                          <span
                            className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                          >
                            XL
                          </span>
                        </label>
                      </div>
                    </fieldset>

                    <div className="mt-8 flex gap-4">
                      <div>
                        <label htmlFor="quantity" className="sr-only">Qty</label>

                        <input
                          type="number"
                          id="quantity"
                          min="1"
                          value="1"
                          className="w-12 rounded border border-gray-200 py-3 px-3 text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="block rounded w-full bg-orange-600  py-3  font-medium text-white hover:bg-orange-500"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='card'>
                <div className='p-3'>
                  {product?.description}
                  <p>Le boîtier en acier inoxydable plaqué or confère à cette montre un éclat remarquable et une allure luxueuse. Son design intemporel est rehaussé par un cadran analogique parfaitement proportionné, doté d'index lumineux et de trois aiguilles précises pour indiquer les heures, les minutes et les secondes. L'aiguille des secondes se déplace sans heurt, témoignant de la qualité du mouvement à quartz de cette montre.</p>
                  <p>La fonction lumineuse de cette montre-bracelet est un véritable atout pour les hommes actifs et soucieux de leur emploi du temps, leur permettant de lire l'heure même dans l'obscurité. Les index lumineux et les aiguilles brillent avec une lueur subtile, offrant une visibilité claire même dans les environnements les plus sombres.</p>
                  <p>Le bracelet en acier inoxydable assorti à la couleur du boîtier est à la fois robuste et élégant. Il s'adapte confortablement à votre poignet, offrant une sensation agréable au toucher et une durabilité exceptionnelle. La fermeture à boucle déployante assure un ajustement sécurisé et facilite le retrait et la mise en place de la montre.</p>
                  <p>Cette montre-bracelet pour hommes est étanche jusqu'à une certaine profondeur, ce qui la rend adaptée à un usage quotidien, que ce soit pour le travail, les activités de plein air ou les événements formels. Cependant, il est important de noter que cette montre n'est pas conçue pour être portée lors de la baignade ou de la plongée en apnée.</p>
                  <p>La Montre-bracelet Pour Hommes Montre De Mode De Luxe à Quartz Analogique Lumineuse - Or est bien plus qu'un simple accessoire de mode. C'est un symbole de réussite, de sophistication et de bon goût. Que vous la portiez lors de réunions d'affaires, de soirées mondaines ou de moments de détente, cette montre ajoutera une touche de classe et d'élégance à votre poignet.</p>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='card'></div>
            </div>
            <ProductsSection />
          </section>
      }
    </>


  );
}

export default ProductDetails;
