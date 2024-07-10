/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/Product";

type Props = {
    title: string;
    products: IProduct[];
    setProducts: (data: IProduct[]) => void;
};

const AddProduct = ({ title, products, setProducts }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData: any) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/products",
                formData
            );
            setProducts([...products, data]);
            alert("Thêm sản phẩm thành công !");
            reset();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            {title}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Tên sản phẩm"
                />
                <input
                    type="text"
                    {...register("image")}
                    placeholder="Ảnh sản phẩm"
                />
                <input
                    type="number"
                    {...register("price")}
                    placeholder="Giá sản phẩm"
                />
                <input
                    type="text"
                    {...register("description")}
                    placeholder="Mô tả"
                />
                <input
                    type="text"
                    {...register("category")}
                    placeholder="Danh mục"
                />
                <button type="submit">Thêm mới</button>
            </form>
        </div>
    );
};

export default AddProduct;
