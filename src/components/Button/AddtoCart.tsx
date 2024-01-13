"use client";
import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {Movie} from "../../../interfaces";
import {increment, movieQtyInCartSelector} from "../../../store/Features/cardSlice";

interface Props {
    movie: Movie;
}

const AddToCart = (props: Props) => {
    // @ts-ignore
    const qty = useAppSelector((state) => movieQtyInCartSelector(state, props.movie.id));
    const dispatch = useAppDispatch();

    if (!qty) {
        return (
            <div className="flex flex-row gap-2 text-[#373b42] py-2 sm:py-1 px-4 xl:px-8 xl:py-3 rounded-lg font-semibold bg-[#ffd62c]">
                <ShoppingCartIcon size={24} />
                <button onClick={() => dispatch(increment(props.movie))}>Add</button>
            </div>
        );
    } else {
        return (
            <div className="flex flex-row gap-2 text-[#373b42] py-2 sm:py-1 px-4 xl:px-8 xl:py-3 rounded-lg font-semibold bg-[#ffd62c]">
                <ShoppingCartIcon size={24} />
                <button>Add</button>
            </div>
        );
    }
};

export default AddToCart;
