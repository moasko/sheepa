"use client";

import React, { useState } from 'react';
import {
    Button,
    Select,
    SearchInput,
    Dialog,
} from "evergreen-ui";

import AddProductSlideSheet from './AddProductSlideSheet';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ProductListItem from './ProductListItem';
import { ProductProps } from "@/lib/interfaces/modelsInterfaces";
import EmptyProduct from './EmptyProducts';
import notify from '@/lib/utils/notification';
import { getAllProducts, deleteProduct } from '@/services/products.sercices';
import EditProductSlideSheet from './EditProductSlideSheet';

const ProductTable: React.FC = () => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const queryClient = useQueryClient();
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<number | undefined>(undefined)
    const [toEditId, setToEditId] = useState<number | undefined>(undefined)

    const { data, isLoading, error } = useQuery(['admProducts'], getAllProducts);

    const onDeleteProduct = (productId: number | undefined) => {
        deleteProduct(Number(productId))
            .then(res => {
                queryClient.invalidateQueries(['admProducts']);
                notify({
                    title: 'Produit supprimé',
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
        <>

            <div>
                <div className="flex justify-between w-full py-7">
                    <div>
                        <h1 className="text-2xl font-semibold">Produits</h1>
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
                            onClick={() => setAddOpen(true)}
                            height={40}
                            backgroundColor="black"
                            color="white"
                            marginRight={16}
                        >
                            + Ajouter
                        </Button>
                    </div>
                </div>
                {isLoading ? (
                    <EmptyProduct
                        error={error}
                        setAddProductShown={() => setAddOpen(true)}
                        isLoading={isLoading}
                    />
                ) : (
                    <div className="shipa-table-container">
                        <div className="shipa-table">
                            <table className='w-full caption-bottom'>
                                <thead className='border-b p-3'>
                                    <tr role="row">
                                        <th
                                            role="columnheader"
                                            className="unselectable"
                                            style={{ whiteSpace: "nowrap" }}
                                        >
                                            ID
                                        </th>
                                        <th
                                            role="columnheader"
                                            className="unselectable"
                                            style={{ whiteSpace: "nowrap" }}
                                        >
                                            Produit
                                        </th>
                                        <th
                                            role="columnheader"
                                            className="unselectable"
                                            style={{ whiteSpace: "nowrap" }}
                                        >
                                            Status
                                        </th>
                                        <th
                                            role="columnheader"
                                            className="unselectable"
                                            style={{ whiteSpace: "nowrap" }}
                                        >
                                            Stock
                                        </th>
                                        <th
                                            role="columnheader"
                                            className="unselectable"
                                            style={{ whiteSpace: "nowrap" }}
                                        >
                                            Prix
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {data?.products?.map((product: ProductProps) => (
                                        <ProductListItem
                                            key={product.id}
                                            product={product}
                                            onDelete={() => {
                                                setSelectedProduct(product?.id)
                                                setShowDeleteDialog(true)
                                            }}
                                            onEdit={() => {
                                                setEditOpen(true)
                                                setToEditId(product?.id)
                                            }}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <AddProductSlideSheet
                                isShown={addOpen}
                                onClose={() => setAddOpen(false)}
                            />
                            <EditProductSlideSheet
                                productId={Number(toEditId)}
                                isShown={editOpen}
                                onClose={() => setEditOpen(false)}
                            />
                            <Dialog
                                isShown={showDeleteDialog}
                                title="Suppression de produit"
                                intent="danger"
                                onCloseComplete={() => {
                                    setSelectedProduct(undefined)
                                    setShowDeleteDialog(false)
                                }}
                                confirmLabel="Supprimer"
                                onConfirm={() => {
                                    onDeleteProduct(selectedProduct)
                                    setShowDeleteDialog(false);
                                    setSelectedProduct(undefined)
                                }}
                                isConfirmLoading={false}
                            >
                                Êtes-vous sûr de vouloir supprimer ce produit ?
                            </Dialog>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default ProductTable;
