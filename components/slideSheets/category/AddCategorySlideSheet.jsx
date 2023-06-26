import React, { useState, useEffect } from "react";
import {
  Button,
  Group,
  Heading,
  Pane,
  Paragraph,
  SavedIcon,
  SideSheet,
  Spinner,
  Tab,
  Tablist,
  Text,
  TextInput,
  TextInputField,
  Textarea,
  TextareaField,
  toaster,
} from "evergreen-ui";
import slugify from "@/lib/slugify";
import AddProductImage from "../../AddProductImage";

function AddCategorySlideSheet({ isShown, onClose, refreshProducts }) {
  const initialState = {
    name: "",
    description: "",
    position: 0,
    isActive: true,
    slug: "",
    seoTitle: "",
    seoDescription: "",
    images: [],
    childesCategories: [],
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [addReduction, setAddReduction] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryData, setCategoryData] = useState(initialState);
  const [exportFils, setExportFils] = useState([]);

  useEffect(() => {
    setCategoryData(initialState);
  }, [isShown]);

  const handleInputChange = (label, value) => {
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      [label]: value,
    }));
  };

  const formatProductImagesResponse = (response) => {
    return response.map((res) => {
      return {
        id: res.response.id,
        url: res.response.url,
      };
    });
  };


  const postCategory = async (cdata) => {
    // Code pour envoyer la catégorie au serveur et la sauvegarder
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const response = await postCategory(categoryData);

      if (response.success) {
        setCategoryData(initialState);
        refreshProducts();
        onClose();
        toaster.success("Catégorie créée avec succès", {
          duration: 10,
        });
      } else {
        console.log(response);
        console.log(categoryData);
        toaster.error("Échec de la création de la catégorie");
      }
    } catch (error) {
      console.error(error);
      toaster.error("Une erreur s'est produite lors de la création de la catégorie");
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
            <AddProductImage fileList={exportFils} setFileList={setExportFils} />
            <div></div>
          </div>

          <TextInputField
            value={categoryData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            label="Nom"
            placeholder="Nom de la catégorie"
            inputHeight={40}
          />

          <div>
            <span className="text-sm font-semibold block mb-3">Description</span>
            <TextareaField>

            </TextareaField>
          </div>
        </div>
      ),
    },

    {
      tabName: "Visibilité",
      tabContent: (
        <div>
          <div className="flex w-full justify-between items-center mt-10">
            <div>
              <Text fontWeight="500" size={"large"}>
                Publier
              </Text>
              <Paragraph>Texte de mise en publication de la catégorie.</Paragraph>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                defaultChecked
                value={categoryData.isActive}
                onChange={(e) => handleInputChange("isActive", e.target.checked)}
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
              <Paragraph>Texte de mise en avant de la catégorie.</Paragraph>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                value={categoryData.isFeatured}
                onChange={(e) => handleInputChange("isFeatured", e.target.checked)}
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
        tabName: "Détails",
        tabContent: (
          <div>
           
  
          </div>
        ),
      },
    {
      tabName: "SEO",
      tabContent: (
        <div>
          <div className="p-4 bg-slate-200 rounded text-gray-300  mb-14 font-bold">
            <Paragraph>
              - Utilisez des mots-clés pertinents et spécifiques pour votre catégorie.
            </Paragraph>
            <Paragraph>
              - Utilisez un titre clair, concis et attractif qui décrit votre catégorie.
            </Paragraph>
            <Paragraph>
              - Incluez une description détaillée de votre catégorie qui met en avant ses caractéristiques, avantages et fonctionnalités.
            </Paragraph>
          </div>

          <div className="bg-white p-3 mt-10 flex mb-10">
            <div>
              <div>
                <h2 className=" text-[#4b90ff] font-bold text-[20px]">{categoryData.seoTitle}</h2>
                <p className=" text-green-600 text-sm">
                  https://zangochap.com/c/{categoryData.slug}
                </p>
                <p className="text-md">{categoryData.seoDescription}</p>
              </div>
            </div>
          </div>

          <TextInputField
            value={categoryData.seoTitle}
            onChange={(e) => handleInputChange("seoTitle", e.target.value)}
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
              value={categoryData.seoDescription}
              onChange={(e) => handleInputChange("seoDescription", e.target.value)}
              aria-label="Description SEO"
              placeholder="Description SEO"
            ></Textarea>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    handleInputChange("slug", slugify(categoryData.name));
  }, [categoryData.name]);

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
            <Heading size={700}>Nouvelle Catégorie</Heading>
            <Paragraph size={400} color="muted">
              https://zangochap.com/{categoryData.slug}
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
              aria-labelledby={tab.tabName}
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
            Annuler
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

export default AddCategorySlideSheet;
