"use client";

import React, { useEffect } from 'react'
import CategoriesTable from './components/CategoriesTable';
import { getAllCategories } from '@/services/categories.services';
import { useQuery } from '@tanstack/react-query';
 

interface Props { }

const CategoriesPage = (props: Props) => {

  const { data, isLoading, error } = useQuery(['admCategories'], getAllCategories);


  return (
    <div>
      <CategoriesTable data={data} />
    </div>
  )
}

export default CategoriesPage