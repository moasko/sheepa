import React, { useEffect, useState } from "react";
import {
  Button,
  Group,
  Heading,
  Pane,
  Paragraph,
  SavedIcon,
  SelectMenu,
  SideSheet,
  Spinner,
  Tab,
  Tablist,
  Text,
  TextInput,
  TextInputField,
  Textarea,
  toaster,
} from "evergreen-ui";
// import ProductDescriptionEditor from "@/components/ProductDescriptionEditor";
import slugify from "@/lib/utils/slugify";

// import CustomAttributes from "../../CustomAttributes";
// import AddProductImage from "../../AddProductImage";
// import TreeSelectCategory from "../../TreeSelectCategory";

interface ProductData {
  name: string;
  description: string;
  isFeatured: boolean;
  isActive: boolean;
  slug: string;
  sku: string;
  quantity: number;
  price: number;
  reduction: number;
  seoTitle: string;
  seoDescription: string;
  images: any[];
}

interface AddProductSlideSheetProps {
  isShown: boolean;
  onClose: () => void;
  refreshProducts: () => void;
}

function AddProductSlideSheet({
  isShown,
  onClose,
  refreshProducts,
}: AddProductSlideSheetProps) {
  const initialState: ProductData = {
    name: "",
    description: "",
    isFeatured: false,
    isActive: true,
    slug: "",
    sku: "",
    quantity: 1,
    price: 0,
    reduction: 0,
    seoTitle: "",
    seoDescription: "",
    images: [],
  };

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [addReduction, setAddReduction] = useState<boolean>(false);
  const [attr, setAttr] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [productData, setProductData] = useState<ProductData>(initialState);
  const [exportFils, setExportFils] = useState<any[]>([]);

  useEffect(() => {
    setProductData(initialState);
  }, [isShown]);

  const handleInputChange = (label: keyof ProductData, value: any) => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      [label]: value,
    }));
  };

  const formatProductImagesResponse = (response: any[]) => {
    return response.map((res) => {
      return {
        id: res.response.id,
        url: res.response.url,
      };
    });
  };

  const postProduct = async (pData: ProductData) => {
    const response = await fetch("/api/product/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pData),
    }).then((res) => res.json());
    return response;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const response = await postProduct(productData);

      if (response.success) {
        setProductData(initialState);
        refreshProducts();
        onClose();
        toaster.success("Produit créé avec succès", {
          duration: 10,
        });
      } else {
        console.log(response);
        console.log(productData);
        toaster.danger("Échec de la création du produit");
      }
    } catch (error) {
      console.error(error);
      //toaster.error("Une erreur s'est produite lors de la création du produit");
    } finally {
      setIsSubmitting(false);
    }
  };


  const tabs = [
    {
      tabName: "Informations générales",
      tabContent: (
        <div>
          <div className="mt-10 mb-10 p-5 rounded-lg bg-white border">
            {/* <AddProductImage
              fileList={exportFils}
              setFileList={setExportFils}
            /> */}
            <div></div>
          </div>

          <TextInputField
            value={productData.name}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", text.target.value)}
            label="Nom"
            placeholder="Nom du produit"
            inputHeight={40}
          />

          <div>
            <span className="text-sm font-semibold block mb-3">
              Description
            </span>
            {/* <ProductDescriptionEditor
              value={productData.description}
              onChange={(e) => {
                handleInputChange("description", e);
              }}
            /> */}
          </div>
        </div>
      ),
    },
    {
      tabName: "Tarification",
      tabContent: (
        <div>
          <span className="text-sm font-semibold block mb-3">Prix</span>
          <Group style={{ width: "100%" }} size="large">
            <TextInput
              defaultValue={productData.price}
              type="number"
              width={"100%"}
              onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("price", Number(text.target.value))
              }
              placeholder="Prix du produit"
            />
            <Button>FCFA</Button>
          </Group>
          <div className="flex w-full justify-between items-center mt-10">
            <div>
              <Text size={"large"}>Ajouter une réduction de prix</Text>
              <Paragraph>Définissez ici votre remise sur le produit.</Paragraph>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                checked={addReduction}
                onChange={(e) => setAddReduction(e.target.checked)}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          {addReduction && (
            <Group style={{ width: "100%" }} size="large">
              <TextInput
                value={productData.reduction}
                type="number"
                width={"100%"}
                onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("reduction", Number(text.target.value))
                }
                placeholder="Prix avant réduction"
              />
              <Button>%</Button>
            </Group>
          )}
        </div>
      ),
    },
    // {
    //   tabName: "Options",
    //   tabContent: (
    //     <div className="w-full">
    //       <CustomAttributes
    //         customAttribute={attr}
    //         setCustomAttribute={setAttr}
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   tabName: "Variation",
    //   tabContent: (
    //     <div>
    //       <TreeSelectCategory />
    //     </div>
    //   ),
    // },
    {
      tabName: "visibilité",
      tabContent: (
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
                onChange={(text:React.ChangeEvent<HTMLInputElement>) =>
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
                onChange={(text:React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("isFeatured", Boolean(text.target.value))
                }
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      ),
    },
    {
      tabName: "SEO",
      tabContent: (
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
            onChange={(text:React.ChangeEvent<HTMLInputElement>) =>
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
              onChange={(text:React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange("seoDescription", text.target.value)
              }
              aria-label="Description SEO"
              placeholder="Description SEO"
            ></Textarea>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    handleInputChange("slug", slugify(productData.name));
  }, [productData.name]);

  return (
    <React.Fragment>
      <SideSheet
        width={800}
        isShown={isShown}
        onCloseComplete={onClose}
        containerProps={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
        }}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16} borderBottom="muted">
            <Heading size={700}>Nouveau Produit</Heading>
            <Paragraph size={400} color="muted">
              https://zangochap.com/{productData.slug}
            </Paragraph>
          </Pane>
          <Pane display="flex" padding={8}>
            <Tablist>
              {tabs.map((tab, index) => (
                <Tab
                  key={tab.tabName}
                  isSelected={selectedIndex === index}
                  onSelect={() => setSelectedIndex(index)}
                >
                  {tab.tabName}
                </Tab>
              ))}
            </Tablist>
          </Pane>
        </Pane>

        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          {tabs.map((tab, index) => (
            <div className="">
    {tab.tabContent}
            </div>
          
          ))}
        </Pane>

        <div className="w-full space-x-5 bg-white px-5 py-6 shadow-[0px_-9px_26px_0px_#e2e8f0] flex items-center justify-end">
          <Button size="large">
            Anuler
          </Button>
          <Button
            size="large"
            onClick={() => handleSubmit()}
            iconBefore={isSubmitting ? <Spinner /> : <SavedIcon />}
            appearance="minimal"
            color="white"
            backgroundColor="black"
          >
            Enregistrer
          </Button>
        </div>
      </SideSheet>
    </React.Fragment>
  );
}

export default AddProductSlideSheet;
