import { useSession } from 'next-auth/react'
import React from 'react'


interface AdminToolBarPropos { }

const AdminToolBar = (props: AdminToolBarPropos) => {

    const session = useSession()

    return (
        <div className='w-full bg-black'>
<div className='w-full p-3'></div>
        </div>
    )
}

export default AdminToolBar