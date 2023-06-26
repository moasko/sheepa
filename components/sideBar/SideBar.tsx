"use client";

import React, { FC, useMemo } from 'react'
import SidebarItem from './SidebarItem'

import { AiOutlineDashboard } from "react-icons/ai"
import { SlLayers } from "react-icons/sl"
import { AiOutlineShop } from 'react-icons/ai'
import { TbCategory, TbFolders } from "react-icons/tb"
import { HiOutlineUsers } from "react-icons/hi"
import { MdOutlineShoppingCartCheckout } from "react-icons/md"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideBar() {
    const pathname = usePathname()

    const routes = useMemo(() => [
        {
            url: "/admin",
            icon: AiOutlineDashboard,
            label: "Tableau de bord",
            active: pathname === "/admin"
        },
        {
            url: "/admin/products",
            icon: SlLayers,
            label: "Produits",
            active: pathname === "/admin/products"
        },
        {
            url: "/admin/orders",
            icon: MdOutlineShoppingCartCheckout ,
            label: "Commandes",
            active: pathname === "/admin/orders"
        },
        {
            url: "/admin/customers",
            icon: HiOutlineUsers,
            label: "Clients",
            active: pathname === "/admin/customers"
        },
        {
            url: "/admin/categorys",
            icon: TbCategory,
            label: "Categories",
            active: pathname === "/admin/categorys"
        },
        {
            url: "/admin/files-manager",
            icon: TbFolders,
            label: "Gestionnaire de fichiers",
            active: pathname === "/admin/files-manager"
        }
    ], [pathname])
    return (
        <div className='w-[68px] min-h-[calc(100vh_-_65px)] border-r flex justify-between items-center flex-col border-[#e8edf0] fixed'>
            <div className='w-full flex justify-center flex-col mt-5 space-y-5'>
                {routes.map(item => <SidebarItem key={item.label} {...item}/>)}
            </div>
            <Link href={"#"}>
                <div className='shadow-lg h-10 w-10 flex justify-center items-center bg-white rounded-md hover:bg-orange-200'>
                    <AiOutlineShop size={25} />
                </div>
            </Link>

        </div>
    )
}

export default SideBar