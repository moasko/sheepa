"use client";

import { CldUploadButton } from "next-cloudinary"; // Assurez-vous que les types de next-cloudinary sont correctement importés
import { useEffect, useState } from "react";

interface ImageInfo {
  url: string;
  // Ajoutez d'autres propriétés d'informations d'image si nécessaire
}

interface UploadButtonProps {
  value: (value: ImageInfo[]) => void;
}

export default function UploadButton({ value }: UploadButtonProps) {
  const [images, setImages] = useState<ImageInfo[]>([]);

  useEffect(() => {
    value(images);
  }, [images]);

  return (
    <div className="flex items-center space-x-4">
      <div className="w-[100px] h-[100px] border rounded border-dashed">
        <CldUploadButton
          onUpload={(result: any) => {
            const newImages = [...images, { url: result.info.secure_url }];
            setImages(newImages);
            value(newImages);
          }}
          uploadPreset="y4hxh3wh"
        >
          Upload Image
        </CldUploadButton>
      </div>
      <div className="flex space-x-4">
        {images.map((imageInfo, index) => (
          <div className="overflow-hidden rounded border" key={index}>
            <img
              width={"100px"}
              height={"100px"}
              src={imageInfo.url}
              alt={`Uploaded ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
