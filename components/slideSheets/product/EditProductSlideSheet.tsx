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
import ProductDescriptionEditor from "@/components/ProductDescriptionEditor";
import React, { useEffect, useState } from "react";
import slugify from "@/lib/slugify";
import CustomAttributes from "../../CustomAttributes";
import AddProductImage from "../../AddProductImage";
import { useSelector } from "react-redux";
import fetcher from "@/backend/fatcher";

function EditProductSlideSheet({
  isShown,
  onClose,
  productId,
  productsGettedToEdit,
  refreshProducts,
}) {
  const { productData } = useSelector((state) => state.edit);
  const {
    name,
    description,
    isFeatured,
    isActive,
    slug,
    sku,
    quantity,
    price,
    reduction,
    seoTitle,
    seoDescription,
    images,
  } = productData;
  const initialState = {
    name: name,
    description: description,
    isFeatured: isFeatured,
    isActive: isActive,
    slug: slug,
    sku: sku,
    quantity: quantity,
    price: price,
    reduction: reduction,
    seoTitle: seoTitle,
    seoDescription: seoDescription,
    // images: images
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [addReduction, setAddReduction] = useState(false);
  const [attr, setAttr] = useState([]);
  const [selected, setSelected] = React.useState(null);
  const [filter, setFilter] = React.useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productsGetted, setProductsGetted] = useState(initialState);
  const [exportFils, setExportFils] = useState([]);

  useEffect(() => {
    setProductsGetted(initialState);
  }, [isShown]);

  const handleInputChange = (label, value) => {
    setProductsGetted((prevproductsGetted) => ({
      ...prevproductsGetted,
      [label]: value,
    }));
  };

  const formatProductImagesResponse = (response) => {
    // return response.map((res) => {
    //   return {
    //     id: res.response.id,
    //     url: res.response.url,
    //   };
    // });
  };

  const updateProduct = async (pData) => {
    const response = await fetcher(`product/edite?id=${productId}`, {
      method: "PUT",
      data: pData,
    });
    return response;
  };

  const handleSubmite = async () => {
    try {
      setIsSubmitting(true);

      await updateProduct(productsGetted).then((res) => {
        if (res.data.success) {
          setProductsGetted(initialState);
          refreshProducts();
          toaster.success("Produit mis a jours avec succès", {
            duration: 10,
          });
        } else {
          console.log(response);
          console.log(productsGetted);
          toaster.error("Échec de la mise a jours du produit");
        }
      });
    } catch (error) {
      console.error(error);
      // toaster.error("Une erreur s'est produite lors de la mise a jours du produit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    {
      tabName: "Informations générales",
      tabContent: (
        <div>
          <TextInputField
            value={productsGetted.name}
            onChange={(text) => handleInputChange("name", text.target.value)}
            label="nom"
            placeholder="Nom du produit"
            inputHeight={40}
          />
          <div>
            <span className="text-sm font-semibold block mb-3">
              Description
            </span>
            <ProductDescriptionEditor
              value={productsGetted.description}
              onChange={(e) => {
                handleInputChange("description", e);
              }}
            />
          </div>
          <div className="mt-5">
            <h1 className="text-sm font-semibold block mb-3">
              Images du produit
            </h1>
            <AddProductImage
              fileList={exportFils}
              setFileList={setExportFils}
            />
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
              value={productsGetted.price}
              type="number"
              width={"100%"}
              onChange={(text) =>
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
                value={productsGetted.reduction}
                type="number"
                width={"100%"}
                onChange={(text) =>
                  handleInputChange("reduction", text.target.value)
                }
                placeholder="porcentage de reduction"
              />
              <Button>%</Button>
            </Group>
          )}
        </div>
      ),
    },
    {
      tabName: "Produit",
      tabContent: (
        <div className="w-full">
          <div className="mb-10">
            <Text fontWeight="500" size={"large"}>
              Category du produit
            </Text>
          </div>
          <Group width={"100%"} marginBottom={30}>
            <Pane className="w-full relative">
              <Pane marginBottom={8}>
                <Text>Selectioner la categorie</Text>
              </Pane>
              <SelectMenu
                title="Select name"
                onFilterChange={(filter) => setFilter(filter)}
                options={[
                  "Apple",
                  "Apricot",
                  "Banana",
                  "Cherry",
                  "Cucumber",
                ].map((label) => ({ label, value: label }))}
                selected={selected}
                onSelect={(item) => setSelected(item.value)}
                width={300}
              >
                <Button className="w-full">{selected || "Categorie"}</Button>
              </SelectMenu>
            </Pane>

            <Pane className="w-full relative">
              <Pane marginBottom={8}>
                <Text>Selectioner la sous categorie</Text>
              </Pane>
              <SelectMenu
                title="Select name"
                onFilterChange={(filter) => setFilter(filter)}
                options={[
                  "Apple",
                  "Apricot",
                  "Banana",
                  "Cherry",
                  "Cucumber",
                ].map((label) => ({ label, value: label }))}
                selected={selected}
                onSelect={(item) => setSelected(item.value)}
                width={300}
              >
                <Button className="w-full">
                  {selected || "Select name..."}
                </Button>
              </SelectMenu>
            </Pane>
          </Group>

          <CustomAttributes
            customAttribute={attr}
            setCustomAttribute={setAttr}
          />
        </div>
      ),
    },
    {
      tabName: "Variation",
      tabContent: <div></div>,
    },
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
                checked={productsGetted.isActive}
                onChange={(text) =>
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
                checked={productsGetted.isFeatured}
                onChange={(text) =>
                  handleInputChange("isFeatured", text.target.value)
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
          <TextInputField
            value={productsGetted.seoTitle}
            onChange={(text) =>
              handleInputChange("seoTitle", text.target.value)
            }
            label="Titre SEO"
            placeholder="Titre SEO"
            inputHeight={40}
          />

          <div>
            <div>
              <Text fontWeight="500" size={"large"}>
                Description SEO
              </Text>
            </div>
            <Textarea
              value={productsGetted.seoDescription}
              onChange={(text) =>
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
    handleInputChange("slug", slugify(productsGetted.name));
  }, [productsGetted.name]);

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
              {productId} https://zangochap.com/{productsGetted.slug}
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
            <Pane
              aria-labelledby={tab.tabContent}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? "block" : "none"}
              key={tab.tabName}
              role="tabpanel"
            >
              {tab.tabContent}
            </Pane>
          ))}
        </Pane>

        <div className="w-full space-x-5 bg-white px-5 py-6 shadow-[0px_-9px_26px_0px_#e2e8f0] flex items-center justify-end">
          <Button size="large" type="">
            Anuler
          </Button>
          <Button
            size="large"
            onClick={() => handleSubmite()}
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

export default EditProductSlideSheet;
