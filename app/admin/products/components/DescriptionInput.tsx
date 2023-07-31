import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

interface DescriptionInputProps {
  value: any;
  onChange: (value: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </>
  );
};

export default DescriptionInput;
