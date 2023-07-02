"use client";


import Image from 'next/image'
import React from 'react'
import { MdOutlineSupportAgent } from "react-icons/md"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { HiPhone } from "react-icons/hi"
import { AiFillShop } from "react-icons/ai"
function Navigation() {
  return (
    <div className="row">
      <div className="col_16 flexer -rt">
        <div className="row">
          <div className="col_12">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              animationHandler="fade"
              swipeable={false}
              showThumbs={false}
              className='w-full'>
              <div className="flayer">
                <Image fill src="/p1.jpg" alt="image" />
              </div>
              <div className="flayer">
                <Image fill src="/p3.jpg" alt="image" />
              </div>
            </Carousel>

          </div>
          <div className="col_4">
            <div className="asider">
              <div className="asidcardes asidinfo">
                <a href="#" className="asidItem">
                  <MdOutlineSupportAgent size={29} color="gray" />
                  <div className="texte">
                    <div className="as_t">Centre D assistance</div>
                    <div className="as_tx">Guide Client</div>
                  </div>
                </a>
                <a href="#" className="asidItem">
                  <HiPhone size={29} color="gray" />
                  <div className="texte">
                    <div className="as_t">Commandez par Appel</div>
                    <div className="as_tx">0574641453</div>
                  </div>
                </a>
                <a href="#" className="asidItem">
                  <AiFillShop size={29} color="gray" />
                  <div className="texte">
                    <div className="as_t">Devenez Partenaire</div>
                    <div className="as_tx">Ouvrez votre shop ici</div>
                  </div>
                </a>
              </div>
              <div className="asidcardes asiderDiapo">
                <Image sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" src="/annoce.gif" fill alt="image" />
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Navigation