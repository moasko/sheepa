"use client"

import React from 'react';
import CategoriesHomePageList from '@/components/siteComponents/Listes/categorys/CategiresHommePageList';
import Navigation from '@/components/siteComponents/siteLayout/navigation';
import ProductsSection from '@/components/siteComponents/dynamicSections/ProductsSection';


const HomePage = () => {

  return (
    <main>

      <Navigation />
      <CategoriesHomePageList />
      {/* groupr */}

      <ProductsSection
        showHeader={true}
        title={"Mode Homme | Ofre Speciel"}
        limit={12}
      />

      <ProductsSection
        showHeader={true}
        category='boutique'
        title={"Montres | Ofre Speciel"}
        limit={12}
      />
    </main>
  );
};

export default HomePage;
