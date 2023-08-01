"use client";

import type { FC } from 'react';
import { EditIcon, TrashIcon, Select, Text, SearchInput, Dialog, Button } from 'evergreen-ui';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CategoryProps } from '@/lib/interfaces/modelsInterfaces'
import { IoCloseCircle, IoCheckmarkCircle } from "react-icons/io5";
import AddCategorySideSheet from './AddCategorySideSheet';
import EditCategorySideSheet from './EditCategorySideSheet';
import { deleteCategory } from '@/services/categories.services';
import { useQueryClient } from '@tanstack/react-query';
import notify from '@/lib/utils/notification';


interface CategoriesTableProps {
    data: CategoryProps[]
}

const CategoriesTable: FC<CategoriesTableProps> = ({ data }) => {

    const [addOpened, setAddOpened] = useState(false)
    const [editOpen, setEditOpen] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined)

    const [toEditId, setToEditId] = useState<number | undefined>(undefined)

    const queryClient = useQueryClient()


    const onDeleteCategory = (productId: number | undefined) => {
        deleteCategory(Number(productId))
            .then(res => {
                queryClient.invalidateQueries(['admCategories']);
                notify({
                    title: 'categorie supprimé',
                    type: 'success',
                    message: res.message
                });
            })
            .catch(err => {
                notify({
                    title: 'Erreur lors de la suppression',
                    type: 'error',
                    message: err.message
                });
            });
    };
    return (
        <div>
            <div className="flex justify-between w-full py-7">
                <div>
                    <h1 className="text-2xl font-semibold">Categorie</h1>
                </div>
                <div className="flex space-x-5">
                    <Select
                        defaultValue="foo"
                        height={40}
                        onChange={(event) => alert(event.target.value)}
                    >
                        <option value="foo">Tous les statuts</option>
                        <option value="bar">Actif</option>
                        <option value="baz">En avant</option>
                        <option value="qux">Désactivé</option>
                    </Select>
                    <Select
                        defaultValue="foo"
                        height={40}
                        onChange={(event) => alert(event.target.value)}
                    >
                        <option value="foo">Produits en stock</option>
                        <option value="bar">En rupture</option>
                        <option value="baz">En avant</option>
                        <option value="qux">Désactivé</option>
                    </Select>
                    <Select
                        defaultValue="foo"
                        height={40}
                        onChange={(event) => alert(event.target.value)}
                    >
                        <option value="foo">Tous les statuts</option>
                        <option value="bar">Actif</option>
                        <option value="baz">En avant</option>
                        <option value="qux">Désactivé</option>
                    </Select>
                    <SearchInput
                        height={40}
                        placeholder="Chercher un produit"
                    />
                    <Button
                        onClick={() => setAddOpened(true)}
                        height={40}
                        backgroundColor="black"
                        color="white"
                        marginRight={16}
                    >
                        + Ajouter
                    </Button>
                </div>
            </div>

            <div className='shipa-table-container'>
                <div className='shipa-table'>
                    <table className='w-full caption-bottom'>
                        <thead className='border-b p-3'>
                            <tr role='row'>
                                <th
                                    className='unselectable text-left'
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    ID
                                </th>
                                <th
                                    className='unselectable text-left'
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    Nom
                                </th>

                                <th
                                    className='unselectable text-left'
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    Status
                                </th>

                                <th
                                    className='unselectable text-left'
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    Produits
                                </th>

                                <th
                                    className='unselectable text-left'
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((category: CategoryProps) => {
                                    return (
                                        <tr key={category.id} role='row' >
                                            <td>
                                                <Text>{category.id}</Text>
                                            </td>
                                            <td className='w-[50%]'>
                                                <div className='flex'>
                                                    <div className='flex justify-center items-center'>
                                                        <Link href='#'>
                                                            {category.name}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                {
                                                    category.isEnabled ? <IoCheckmarkCircle size={20} color='green' /> : <IoCloseCircle size={20} color='gray' />
                                                }
                                            </td>

                                            <td>
                                                {category?._count?.products} produits
                                            </td>
                                            <td className="pr-10">

                                                <div className="flex space-x-2 p-1 items-center">
                                                    <button onClick={()=>{
                                                         setEditOpen(true)
                                                         setToEditId(category?.id)
                                                    }} className="flex items-center space-x-2 py-1 px-2 rounded-lg bg-[#5c7cf9]">
                                                        <EditIcon color="white" size={14} />
                                                        <span className="text-sm text-white">
                                                            Editer
                                                        </span>
                                                    </button>
                                                    <button onClick={()=>{
                                                        setSelectedCategory(category?.id)
                                                        setShowDeleteDialog(true)
                                                    }} className="flex items-center space-x-2 p-[10px] hover:bg-red-200 hover:text-red-500 rounded-lg bg-slate-200">
                                                        <TrashIcon color="gray" size={14} />
                                                    </button>
                                                </div>


                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            <AddCategorySideSheet isShown={addOpened} onClose={() => setAddOpened(false)} />
            <EditCategorySideSheet isShown={editOpen} onClose={()=> setEditOpen(false)} categoryId={Number(toEditId)}/>
            <Dialog
                isShown={showDeleteDialog}
                title="Suppression de categorie"
                intent="danger"
                onCloseComplete={() => {
                    setSelectedCategory(undefined)
                    setShowDeleteDialog(false)
                }}
                confirmLabel="Supprimer"
                onConfirm={() => {
                    onDeleteCategory(selectedCategory)
                    setShowDeleteDialog(false);
                    setSelectedCategory(undefined)
                }}
                isConfirmLoading={false}
            >
                Êtes-vous sûr de vouloir supprimer cette categorie ?
            </Dialog>
        </div>

    );
}
export default CategoriesTable;
