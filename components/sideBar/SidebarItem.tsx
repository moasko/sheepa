import { Tooltip } from 'evergreen-ui'
import Link from 'next/link'
import React, { FC } from 'react'
import { IconType } from 'react-icons'

interface SideBarItemProps {
    icon: IconType;
    url: string;
    label?: string;
    active?: boolean;
}

const SidebarItem: FC<SideBarItemProps> = ({
    icon: Icon,
    url,
    label,
    active
}) => {
    return (
        <Tooltip id={label} isShown={label != "" ? undefined : false} position='right' content={label}>
            <div className={`w-full flex justify-center`}>
                <Link href={url} className={`w-[35px] h-[35px] flex justify-center items-center hover:bg-slate-200 rounded-md ${active && "bg-blue-200"}`}>
                    <Icon size={20} color={active?"blue":"black"} />
                </Link>
            </div>
        </Tooltip>

    )
}

export default SidebarItem