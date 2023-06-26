import React from "react";

import { BiBoltCircle } from "react-icons/bi";
import { Avatar, Button, Pane, Popover } from "evergreen-ui";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineSetting, AiOutlineShop } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";

import Link from "next/link";

import { signOut, useSession } from "next-auth/react";

function UserMenu() {

  const { data } = useSession();
  const user = data?.user

  return (
    <Popover
      statelessProps={{
        style: {
          marginTop: "12px",
          minWidth: "260px",
        },
      }}
      content={
        <Pane>
          <div className="p-3 flex flex-col">
            <div className="flex space-x-3 items-center p-2 rounded-md hover:bg-slate-200">
              <BiBoltCircle color="#555d67" size={20} />
              <span className="text-[#555d67]">Dashboard</span>
            </div>
            <Link
              target={"_blank"}
              href={"http://localhost:3002"}
              className="flex space-x-3 items-center p-2 rounded-md hover:bg-slate-200"
            >
              <AiOutlineShop color="#555d67" size={20} />
              <span className="text-[#555d67]">Boutique</span>
            </Link>

            <div className="flex space-x-3 items-center p-2 rounded-md hover:bg-slate-200">
              <BsCodeSlash color="#555d67" size={20} />
              <span className="text-[#555d67]">Développeur</span>
            </div>
            <div className="flex space-x-3 items-center p-2 rounded-md hover:bg-slate-200">
              <AiOutlineSetting color="#555d67" size={20} />
              <span className="text-[#555d67]">Paramètres</span>
            </div>
          </div>
          <div className="border-t">
            <button  className="p-2 border-none w-full hover:bg-red-200" onClick={() => signOut()}>
              <div className="flex space-x-3 items-center p-2">
                <MdOutlineLogout color="#555d67" size={20} />
                <span className="text-[#555d67] text-md">Déconnexion</span>
              </div>
            </button>
          </div>
        </Pane>
      }
    >
      <div className="flex items-center space-x-2 cursor-pointer">
        <Avatar size={25} color={"orange"} name={user?.name} />
        <h2 className="font-semibold">{user?.name}</h2>
        <FiChevronDown color="#555d67" />
      </div>
    </Popover>
  );
}

export default UserMenu;
