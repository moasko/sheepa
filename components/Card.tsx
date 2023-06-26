import React, { ReactNode } from 'react';

interface CardProps {
  headerContent?: ReactNode;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ headerContent, children }) => {
  return (
    <div className='shadow-sm bg-white rounded-md'>
      {/* card title */}
      {headerContent !== undefined ? (
        <div className='p-4'>{headerContent}</div>
      ) : null}

      {/* card content */}
      <div className='px-4'>{children}</div>
    </div>
  );
};

export default Card;
