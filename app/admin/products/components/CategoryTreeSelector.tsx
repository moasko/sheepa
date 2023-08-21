"use client";

import React, { FC, useEffect, useState } from 'react';
import { useQuery} from '@tanstack/react-query';
import { getAllCategories } from '@/services/categories.services';
import { CategoryProps } from '@/lib/interfaces/modelsInterfaces';

interface CategoryTreeSelectorProps {
    categories?: number | null
    onChange?: (value: number) => void
}

const CategoryTreeSelector: FC<CategoryTreeSelectorProps> = ({ categories, onChange }) => {

    const { data, isLoading, error } = useQuery<CategoryProps[]>(["admCategorySelect"], () =>
        getAllCategories()
    );

    const [selectedCategory, setSelectedCategory] = useState(categories);

    useEffect(() => {
        console.log(error);
    }, [error]);

    const handleCategoryChange = (value: number) => {
        setSelectedCategory(value);
        if (onChange) {
            onChange(value);
        }
    };

    let categoryItem = data?.map((category: CategoryProps) => {
        return { label: category.name, value: category.id }
    }, [])

    return (
        <div>
            {
                isLoading ? "loading..." : <div>
                    <label htmlFor='categoryselect' className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                    <select
                        value={String(selectedCategory)}
                        className='class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
                        id='categoryselect'
                        onChange={(e) => handleCategoryChange(Number(e.target.value))}
                    >
                        {
                            categoryItem?.map((items) => {
                                return <option value={items.value}>{items.label}</option>
                            })
                        }
                    </select>
                </div>
            }
        </div>


    );
};

export default CategoryTreeSelector;
