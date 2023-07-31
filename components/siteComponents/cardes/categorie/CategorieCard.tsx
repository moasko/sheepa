import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function CategorieCard({category_data}) {
    const {image,slug,category_name} =category_data
    return (
        <div className="col_4">
            <Link
             href={{
                pathname:`c/${encodeURIComponent(slug)}`,
            }}
             className="card xxj">
                <div style={{
                    position:"relative",
                    width:"120px",
                    height:"120px"
                }}>
                <Image src={image} fill sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" alt="image" />
                </div>
                <h3 className="xxjtext">{category_name}</h3>
            </Link>
        </div>
    )
}

export default CategorieCard;