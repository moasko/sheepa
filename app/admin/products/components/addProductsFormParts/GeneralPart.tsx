import { Input } from '@nextui-org/react';
import React, { FC, ChangeEvent } from 'react';

interface GeneralPartProps {
    name?: string;
    handleInputChange?: (field: string, value: string) => void;
}

const GeneralPart: FC<GeneralPartProps> = ({ name, handleInputChange }) => {
    return (
        <div>
            <div className="mt-10 mb-10 p-5 rounded-lg bg-white border">
                {/* <AddProductImage
          fileList={exportFils}
          setFileList={setExportFils}
        /> */}
                <div></div>
            </div>

            <Input
                value={name}
                label="Nom"
                placeholder="Nom du 5produit"
                bordered
                width='100%'
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
    );
};

export default GeneralPart;
