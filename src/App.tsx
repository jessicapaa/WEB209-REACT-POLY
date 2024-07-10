import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AddProduct from "./components/addProduct";
import UpdateProduct from "./components/updateProduct";

interface IProduct {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

function App() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [editProductId, setEditProductId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("http://localhost:3000/products");
            setProducts(data);
        })();
    }, []);

    const onDelete = async (id: number) => {
        try {
            if (confirm("Are you sure you want to delete")) {
                await axios.delete(`http://localhost:3000/products/${id}`);
                alert("Xóa thành công");
                setProducts(
                    products.filter((product: IProduct) => product.id !== id)
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onEdit = (id: number) => {
        setEditProductId(id);
    };

    return (
        <>
            <AddProduct
                title="Add Product"
                products={products}
                setProducts={setProducts}
            />
            <div className="font-[sans-serif] overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 whitespace-nowrap">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                STT
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Product Name
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Product Price
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Product Description
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Product Categories
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Product Image
                            </th>
                            <th className="p-4 text-left text-sm font-medium text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap">
                        {products.map((product: IProduct, index) => (
                            <React.Fragment key={product.id}>
                                <tr className="even:bg-blue-50">
                                    <td className="p-4 text-sm text-black">
                                        {index + 1}
                                    </td>
                                    <td className="p-4 text-sm text-black">
                                        {product.name}
                                    </td>
                                    <td className="p-4 text-sm text-black">
                                        {product.price}
                                    </td>
                                    <td className="p-4 text-sm text-black text-wrap">
                                        {product.description}
                                    </td>
                                    <td className="p-4 text-sm text-black">
                                        {product.category}
                                    </td>
                                    <td className="p-4 text-sm text-black">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-10 h-10"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => onEdit(product.id)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => onDelete(product.id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                                {editProductId === product.id && (
                                    <tr>
                                        <td colSpan={7}>
                                            <UpdateProduct
                                                productId={product.id}
                                                products={products}
                                                setProducts={setProducts}
                                                onCancel={() =>
                                                    setEditProductId(null)
                                                }
                                            />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;
