"use client"

import { useState, useEffect, Fragment, type FC } from 'react';
import { Button, Group, Pane, Text, Paragraph, SavedIcon, TextInputField, Textarea, Spinner, Heading, SideSheet } from 'evergreen-ui'
import notify from '@/lib/utils/notification';
import { Collapse } from "@nextui-org/react";
import { CategoryProps } from '@/lib/interfaces/modelsInterfaces';
import slugify from '@/lib/utils/slugify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCategory, getAllCategories } from '@/services/categories.services';
import { Select, Space } from 'antd';

interface AddCategorySideSheetProps {
    isShown: boolean;
    onClose: () => void;
}

const AddCategorySideSheet: FC<AddCategorySideSheetProps> = ({ isShown, onClose }) => {

    const initialState: CategoryProps = {
        name: "",
        slug: "",
        isEnabled: false,
        parentId: null,
        seoTitle: "",
        seoDescription: ""
    }


    const [categoryData, setCategoryData] = useState<CategoryProps>(initialState);
    const queryclient = useQueryClient()

    const handleInputChange = (label: keyof CategoryProps, value: any) => {
        setCategoryData((prevProductData) => ({
            ...prevProductData,
            [label]: value,
        }));
    };

    const { data, isLoading, error } = useQuery<CategoryProps[]>(["admsCategorySelect"], () =>
        getAllCategories()
    );

    let allOptions = data?.map((category: CategoryProps) => {
        return { label: category.name, value: category.id };
    }) || [];

    const categoryMutation = useMutation({
        mutationFn: createCategory,
        onSuccess() {
            queryclient.invalidateQueries({ queryKey: ['admCategories'] })
            onClose();
            notify({
                type: "success",
                title: "Categorie created successfully",
                message: "Categorie created successfully"
            })
        },
        onError: (error: any) => {
            console.log(error);
        }
    })

    useEffect(() => {
        setCategoryData(initialState);
    }, [isShown]);


    useEffect(() => {
        handleInputChange("slug", slugify(categoryData.name));
    }, [categoryData.name]);

    return (
        <Fragment>
            <SideSheet
                width={850}
                isShown={isShown}
                onCloseComplete={onClose}
                containerProps={{
                    display: "flex",
                    flex: "1",
                    flexDirection: "column",
                    height: "100%",
                    position: "relative"
                }}
            >
                <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
                    <Pane padding={16} borderBottom="muted">
                        <Heading size={700}>Nouvelle Categorie</Heading>
                        <Paragraph size={400} color="muted">
                            https://zangochap.com/{categoryData.slug}
                        </Paragraph>
                    </Pane>
                </Pane>

                <Pane marginTop={20}>
                    <Pane paddingX={20}>
                        <div>
                            <TextInputField
                                value={categoryData.name}
                                onChange={(text: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", text.target.value)}
                                label="Nom"
                                placeholder="Nom du produit"
                                inputHeight={40}
                            />
                        </div>
                    </Pane>

                    <Pane paddingX={20}>
                        <div>
                            <Select
                                size='large'
                                style={{ width: "100%" }}
                                placeholder="Selectioner une categorie"
                                defaultValue={1}
                                onChange={(options) => handleInputChange("parentId", options)}
                                options={allOptions}
                            />
                        </div>
                    </Pane>

                    <Collapse.Group splitted>


                        {/* <Collapse title={<h5>visibilité</h5>}>
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
                        // handleInputChange("isActive", text.target.value)
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
                        // handleInputChange("isFeatured", Boolean(text.target.value))
                      }
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Collapse> */}

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
                                                {categoryData.seoTitle}
                                            </h2>
                                            <p className=" text-green-600 text-sm">
                                                https://zangochap.com/montre
                                            </p>
                                            <p className="text-md">{categoryData.seoDescription}</p>
                                        </div>
                                    </div>
                                    {/* <div className="border rounded-lg overflow-hidden bg-slate-100">
              <Image height={ 200 } width={ 200 } alt="zee" src={ "https://ci.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/25/740241/1.jpg" } />
            </div> */}
                                </div>

                                <TextInputField
                                    value={categoryData?.seoTitle}
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
                                        value={categoryData?.seoDescription}
                                        onChange={(text: React.ChangeEvent<HTMLTextAreaElement>) =>
                                            handleInputChange("seoDescription", text.target.value)
                                        }
                                        aria-label="Description SEO"
                                        placeholder="Description SEO"
                                    ></Textarea>
                                </div>
                            </div>
                        </Collapse>



                    </Collapse.Group>
                </Pane>



                <div className="w-full absolute bottom-0 space-x-5 bg-white px-5 py-6 shadow-[0px_-9px_26px_0px_#e2e8f0] flex items-center justify-end">
                    <Button size="large">
                        Anuler
                    </Button>
                    <Button
                        size="large"
                        onClick={() => {
                            categoryMutation.mutate(categoryData)
                        }}
                        iconBefore={categoryMutation.isLoading ? <Spinner /> : <SavedIcon />}
                        appearance="minimal"
                        color="white"
                        backgroundColor="black"
                        disabled={categoryMutation.isLoading ? true : false}
                    >
                        Enregistrer
                    </Button>
                </div>

            </SideSheet>
        </Fragment>
    );
}
export default AddCategorySideSheet;