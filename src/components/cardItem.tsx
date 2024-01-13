import {CartItem, Movie} from "../../interfaces";
import Image from "next/image";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useAppDispatch} from "../../store/store";
import {decrement, increment} from "../../store/Features/cardSlice";
import React from "react";

interface Props {
    cartItem : CartItem;
    movie: Movie;
}

const CartItemCard = ({cartItem, movie}: Props) => {
    const dispatch = useAppDispatch();
    const handleRemove = () => {
        dispatch(increment(movie));
    };
    return (
        <div className="flex flex-row gap-2 text-[#373b42] py-2 sm:py-1 px-4 xl:px-8 xl:py-3 rounded-lg font-semibold">
            <Image src={cartItem.movie.image} alt={cartItem.movie.name} width={40} height={20} className="rounded-md" />
            <div className="flex flex-col gap-1">
                <p className="text-sm text-[#e6e8ea]">{cartItem.movie.name}</p>
                <p className="text-xs text-[#707783]">${cartItem.movie.price}</p>
            </div>
            <div className="ml-auto"><CloseIcon  /></div>
        </div>
    );
}
export default CartItemCard;