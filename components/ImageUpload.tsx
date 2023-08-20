"use client";

import { CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";

interface UploadButtonProps {
  value: (value: string) => void;
}

export default function UploadButton({ value }: UploadButtonProps) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    value(images)
  }, [images])


  return (
    <div className="flex items-center space-x-4">
      <div className="w-[100px]  h-[100px] border rounded border-dashed">
        <CldUploadButton
          onUpload={(result) => {
            setImages([...images, result.info]);
            value(images)
          }}
          uploadPreset="y4hxh3wh"
        >
          Upload Image
        </CldUploadButton>

      </div>
      <div className="flex space-x-4">

        {images.map((imageUrl, index) => (
          <div className="overflow-hidden rounded border">
            <img width={"100px"} height={"100px"} key={index} src={imageUrl.url} alt={`Uploaded ${index}`} />
          </div>
        ))}

      </div>
    </div>
  );
}