"use client"

import React from 'react';
import CategoriesHomePageList from '@/components/siteComponents/Listes/categorys/CategiresHommePageList';
import Navigation from '@/components/siteComponents/siteLayout/navigation';
import ProductsSection from '@/components/siteComponents/dynamicSections/ProductsSection';


const HomePage = () => {

  // const { data, isError, isLoading } = useQuery('products', async () => {
  //   const res = await fetch('http://localhost:3000/api/products');
  //   const data = await res.json();
  //   return data.products;
  // })


  return (
    <main className="main">

      <Navigation />
      <CategoriesHomePageList />
      {/* groupr */}


      <ProductsSection
        headerBgColor='red-700'
        showHeader={true}
        title={<h2 className='text-white'>Mode Homme | Ofre Speciel</h2>}
      />
        <ProductsSection
        headerBgColor='red-500'
        showHeader={true}
        category='montre'
        title={<h2 className='text-white'>Montres | Ofre Speciel</h2>}
      />
    </main>
  );
};

export default HomePage;
