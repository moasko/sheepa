"use client";


import Image from 'next/image'
import React from 'react'
import { MdOutlineSupportAgent } from "react-icons/md"
import { HiPhone } from "react-icons/hi"
import { AiFillShop } from "react-icons/ai"
import { Carousel } from 'antd';

function Navigation() {
  return (
    <div className="row">
      <div className="col_16 flexer -rt">
        <div className="flex space-x-3 w-full">
          <div className="lg:w-9/12 w-full">
            <Carousel effect="fade" autoplay>
              <div className="flayer">
                <Image fill src="/p1.jpg" alt="image" />
              </div>
              <div className="flayer">
                <Image fill src="/p3.jpg" alt="image" />
              </div>
            </Carousel>

          </div>
          <div className="w-3/12 hidden lg:block">
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