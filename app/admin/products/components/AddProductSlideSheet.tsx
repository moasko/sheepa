"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Group,
  Heading,
  Pane,
  Paragraph,
  SavedIcon,
  SideSheet,
  Spinner,
  Text,
  TextInputField,
  Textarea,
} from "evergreen-ui";
import slugify from "@/lib/utils/slugify";
import { Collapse } from "@nextui-org/react";
import DescriptionInput from "./DescriptionInput";
import { ProductProps, CategoryProps } from "@/lib/interfaces/modelsInterfaces";
import { createProduct } from "@/services/products.sercices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notify from "@/lib/utils/notification";
import TagsSelect from "@/components/TagsSelect";


interface AddProductSlideSheetProps {
  isShown: boolean;
  onClose: () => void;
}

function AddProductSlideSheet({
  isShown,
  onClose,
}: AddProductSlideSheetProps) {
  const initialState: ProductProps = {
    name: "",
    description: "",
    isFeatured: false,
    isActive: true,
    slug: "",
    sku: "",
    quantity: 1,
    price: undefined,
    reduction: undefined,
    seoTitle: "",
    seoDescription: "",
    user: 1,
    categories: ""
  };


  const [productData, setProductData] = useState<ProductProps>(initialState);
  const queryClient = useQueryClient()


  useEffect(() => {
    setProductData(initialState);
  }, [isShown]);

  const handleInputChange = (label: keyof ProductProps, value: any) => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      [label]: value,
    }));
  };



  const productMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admProducts'] })
      onClose();
      notify({
        type: "success",
        title: "Product created successfully",
        message: "Product created successfully"
      })
    },
    onError: (error: any) => {
      console.log(error);
    }
  });


  useEffect(() => {
    handleInputChange("slug", slugify(productData.name));
  }, [productData.name]);

  return (
    <React.Fragment>
      <SideSheet
        width={850}
        isShown={isShown}
        onCloseComplete={onClose}
        containerProps={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          height: "100%"
        }}
      >
        {
          productMutation.isError ? <div className="w-full transition-all  bg-red-600 text-white">{JSON.stringify(productMutation.error)}</div> : null
        }

        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16} borderBottom="muted">
            <Heading size={700}>Nouveau Produit</Heading>
            <Paragraph size={400} color="muted">
              https://zangochap.com/{productData.slug}
            </Paragraph>
          </Pane>
        </Pane>

        <Pane>
          <Collapse.Group splitted>
            <Collapse title={<h5>Medias</h5>}>
              <div className="mt-10 mb-10 p-5 rounded-lg bg-white border">
                upload image place
              </div>
            </Collapse>

            <Collapse bordered title={<h5>Informations générales</h5>}>
              <div>
                <TextInputField
                  value={productData.name}
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", text.target.value)}
                  label="Nom"
                  placeholder="Nom du produit"
                  inputHeight={40}
                />

                <div className="w-full flex space-x-2">
                  <Group className="w-[50%] flex items-center" size="large">
                    <TextInputField
                      value={productData.price}
                      onChange={(text: React.ChangeEvent<HTMLInputElement>) => handleInputChange("price", Number(text.target.value))}
                      type="number"
                      label="Prix"
                      placeholder="prix"
                      width={"100%"}
                      inputHeight={40}
                    />
                    <Button>FCFA</Button>
                  </Group>

                  <Group className="w-[50%] flex items-center" size="large">
                    <TextInputField
                      value={productData.reduction}
                      onChange={(text: React.ChangeEvent<HTMLInputElement>) => handleInputChange("reduction", Number(text.target.value))}
                      type="number"
                      label="reduction"
                      placeholder="reduction"
                      width={"100%"}
                      inputHeight={40}
                    />
                    <Button>%</Button>
                  </Group>

                  <TextInputField
                    value={productData.sku}
                    onChange={(text: React.ChangeEvent<HTMLInputElement>) => handleInputChange("sku", text.target.value)}
                    label="SKU"
                    placeholder="SKU"
                    width={"50%"}
                    inputHeight={40}
                  />
                </div>

                {/* <div>
                  <CategoryTreeSelector onChange={(value) => {
                    console.log(value)
                  }} />
                </div> */}
                <div className="my-5">
                  <TagsSelect onChange={(e) => {
                    handleInputChange("categories", e)
                  }} />
                </div>
                <div>
                  <span className="text-sm font-semibold block mb-3">
                    Description
                  </span>
                  <DescriptionInput
                    value={productData.description}
                    onChange={(e) => { handleInputChange("description", e); }}
                  />
                </div>
              </div>
            </Collapse>

            <Collapse title={<h5>visibilité</h5>}>
              <div>
                <div className="flex w-full justify-between items-center mt-10">
                  <div>
                    <Text fontWeight="500" size={"large"}>
                      Publier
                    </Text>
                    <Paragraph>Text de mise en publier du produit.</Paragraph>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      defaultChecked
                      onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("isActive", text.target.value)
                      }
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex w-full justify-between items-center mt-10">
                  <div>
                    <Text fontWeight="500" size={"large"}>
                      Mise en avant
                    </Text>
                    <Paragraph>Text de mise en avant du produit.</Paragraph>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("isFeatured", Boolean(text.target.value))
                      }
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Collapse>

            <Collapse title={<h5>SEO</h5>}>
              <div>
                <div className="p-4 bg-slate-200 rounded text-gray-300  mb-14 font-bold">
                  <Paragraph>
                    - Utilisez des mots-clés pertinents et spécifiques pour votre
                    produit.
                  </Paragraph>
                  <Paragraph>
                    - Utilisez un titre clair, concis et attractif qui décrit votre
                    produit.
                  </Paragraph>
                  <Paragraph>
                    - Incluez une description détaillée de votre produit qui met en
                    avant ses caractéristiques, avantages et fonctionnalités.
                  </Paragraph>
                </div>

                <div className="bg-white p-3 mt-10 flex mb-10">
                  <div>
                    <div>
                      <h2 className=" text-[#4b90ff] font-bold text-[20px]">
                        {productData.seoTitle}
                      </h2>
                      <p className=" text-green-600 text-sm">
                        https://zangochap.com/{productData.slug}
                      </p>
                      <p className="text-md">{productData.seoDescription}</p>
                    </div>
                  </div>
                  {/* <div className="border rounded-lg overflow-hidden bg-slate-100">
              <Image height={ 200 } width={ 200 } alt="zee" src={ "https://ci.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/25/740241/1.jpg" } />
            </div> */}
                </div>

                <TextInputField
                  value={productData.seoTitle}
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("seoTitle", text.target.value)
                  }
                  label="Titre SEO"
                  placeholder="Titre SEO"
                  inputHeight={40}
                />

                <div>
                  <div className="flex w-full justify-between mb-2">
                    <Text fontWeight="500" size={"large"}>
                      Description SEO
                    </Text>
                    <Text className="mr-5">160</Text>
                  </div>
                  <Textarea
                    maxLength={160}
                    value={productData.seoDescription}
                    onChange={(text: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleInputChange("seoDescription", text.target.value)
                    }
                    aria-label="Description SEO"
                    placeholder="Description SEO"
                  ></Textarea>
                </div>
              </div>
            </Collapse>

            <Collapse title={<h5>Variantes</h5>}>
            </Collapse>

          </Collapse.Group>
        </Pane>


        <div className="w-full sticky bottom-0 space-x-5 bg-white px-5 py-6 shadow-[0px_-9px_26px_0px_#e2e8f0] flex items-center justify-end">
          <Button size="large">
            Anuler
          </Button>
          <Button
            size="large"
            onClick={() => {
              console.log(productData)
              productMutation.mutate(productData)
            }}
            iconBefore={productMutation.isLoading ? <Spinner /> : <SavedIcon />}
            appearance="minimal"
            color="white"
            backgroundColor="black"
            disabled={productMutation.isLoading ? true : false}
          >
            Enregistrer
          </Button>
        </div>
      </SideSheet>
    </React.Fragment>
  );
}

export default AddProductSlideSheet;
