import React, { useState, FC, useEffect } from 'react';
import { Select } from "antd";
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/services/categories.services';
import { CategoryProps } from '@/lib/interfaces/modelsInterfaces';

interface TagsSelectProps {
  categories?: number[] | null;
  onChange?: (value: string) => void;
}

const TagsSelect: FC<TagsSelectProps> = ({ categories, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const { data, isLoading, error } = useQuery<CategoryProps[]>(["admsCategorySelect"], () =>
    getAllCategories()
  );

  let allOptions = data?.map((category: CategoryProps) => {
    return { label: category.name, value: category.id };
  }) || [];

  const handleCategoryChange = (options: number[]) => {
    setSelectedOptions(options);
    if (onChange) {
      onChange(options.join(','));
    }
  };

  return (
    <div className="App">
      <Select
        style={{ width: "100%" }}
        size="large"
        placeholder="Selectionner une catégorie"
        defaultValue={categories}
        mode="multiple"
        onChange={handleCategoryChange}
        options={allOptions}
      />
    </div>
  );
};

export default TagsSelect;
