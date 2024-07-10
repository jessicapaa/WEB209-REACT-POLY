import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IProduct } from "../interface/Product";

type Props = {
    productId: number;
    products: IProduct[];
    setProducts: (data: IProduct[]) => void;
    onCancel: () => void;
};

const UpdateProduct = ({
    productId,
    products,
    setProducts,
    onCancel,
}: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:3000/products/${productId}`
                );
                setValue("name", data.name);
                setValue("image", data.image);
                setValue("price", data.price);
                setValue("description", data.description);
                setValue("category", data.category);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [productId, setValue]);

    const onSubmit = async (formData: any) => {
        try {
            const { data } = await axios.put(
                `http://localhost:3000/products/${productId}`,
                formData
            );
            const updatedProducts = products.map((product) =>
                product.id === productId ? data : product
            );
            setProducts(updatedProducts);
            alert("Cập nhật sản phẩm thành công !");
            reset();
            onCancel();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Tên sản phẩm"
                />

                <input
                    type="number"
                    {...register("price")}
                    placeholder="Giá sản phẩm"
                />
                <input
                    type="text"
                    {...register("description")}
                    placeholder="Mô tả sản phẩm"
                />
                <input
                    type="text"
                    {...register("category")}
                    placeholder="Danh mục"
                />
                <input
                    type="text"
                    {...register("image")}
                    placeholder="Ảnh sản phẩm"
                />
                <button type="submit">Cập nhật</button>
                <button type="button" onClick={onCancel}>
                    Hủy
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
