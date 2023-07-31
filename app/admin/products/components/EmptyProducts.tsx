import React, { FC } from 'react';
import { Paragraph, Button, Spinner } from 'evergreen-ui';
import { ImFilesEmpty } from 'react-icons/im';

interface EmptyProductProps {
  setAddProductShown: (value: boolean) => void;
  isLoading?: boolean;
  error?: any;
  message?: string;
}

const EmptyProduct: FC<EmptyProductProps> = ({
  setAddProductShown,
  isLoading = false,
  error = null,
  message = "",
}) => {
  const handleAddProduct = () => {
    setAddProductShown(true);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isLoading ? (
        <Spinner size={32} />
      ) : (
        <div className="space-y-3 flex flex-col justify-center items-center">
          <div className="w-12 h-12 bg-orange-500/20 flex justify-center items-center rounded-full">
            <ImFilesEmpty size={20} color="orangered" />
          </div>
          <h1 className="text-lg text-center text-gray-700 font-semibold">
            {error ? "Erreur" : "Produit introuvable"}
          </h1>
          <Paragraph textAlign="center" width={450}>
            {error
              ? "Une erreur s'est produite lors du chargement des produits. Veuillez réessayer."
              : "Regroupez vos produits pour améliorer l'expérience utilisateur de vos clients et permettre une recherche de produits plus rapide."}
          </Paragraph>
          {!error && !isLoading && (
            <Button
              width={200}
              onClick={handleAddProduct}
              height={40}
              backgroundColor="black"
              color="white"
            >
              + Ajouter
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyProduct;
