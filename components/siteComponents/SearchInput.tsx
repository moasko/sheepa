"use client";


import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { SelectProps } from 'antd/es/select';

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

const SearchInput: React.FC = () => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  return (
    <AutoComplete
    popupMatchSelectWidth={252}
      style={{ width: "100%",borderWidth:1,borderColor:"orangered", borderRadius:9}}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >

      <Input className='outline-none' style={{padding: 10,outline:"none"}} size="large" placeholder="Cherchez un produit, une marque ou une categorie" enterKeyHint="search" />
    </AutoComplete>
  );
};

export default SearchInput;