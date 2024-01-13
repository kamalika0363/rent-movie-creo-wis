"use client";
import Link from "next/link";
import { Bell, ShoppingCartIcon, User, Video } from "lucide-react";
import { useState } from "react";
import {useAppSelector} from "../../../store/store";
import {totalCartItemSelector, totalPriceSelector} from "../../../store/Features/cardSlice";
import CartItemCard from "@/components/cardItem";

export default function Navbar() {
    const cartItems = useAppSelector(
        (state) => state.cart.cartItems
    );
    // @ts-ignore
    const totalPrice = useAppSelector(totalPriceSelector)
    // @ts-ignore
    const totalItems = useAppSelector(totalCartItemSelector)
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div className="flex justify-between bg-[#111827] w-full md:px-8">
            <div className="flex gap-2 items-center h-12 px-4 shadow-md text-white">
                <Video size={24} color={'yellow'} />
                <Link href={"/"} className="text-lg md:text-xl font-bold">
                    CineFlix
                </Link>
            </div>
            <div className="py-3 relative px-4 flex flex-row gap-4 text-[#505765]">
                <Bell size={24} />
                <ShoppingCartIcon size={24} onClick={event => { toggleModal() }} />
                <div
                    key={totalItems}
                    className="top-1 right-11 bg-[#ffd62c] text-black text-sm rounded-full w-5 absolute flex justify-center items-center animate-pingOnce">{totalItems}</div>
                <User size={24} />
            </div>

            {modal && (
                <div className="fixed inset-0 flex items-end justify-end p-28 md:p-0">
                    <div onClick={toggleModal} className="flex flex-col gap-3 bg-[#1f2937] p-4 rounded-md absolute w-64 top-10 right-4">
                        {/*<button*/}
                        {/*    onClick={toggleModal}*/}
                        {/*    className="absolute top-2 right-2 text-white"*/}
                        {/*>*/}
                        {/*    <CloseIcon />*/}
                        {/*</button>*/}
                        <div className="flex flex-col gap-4">
                            {cartItems.map((item) => (
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-col gap-2">
                                        {cartItems.map(item => (
                                            <CartItemCard cartItem={item} movie={item.id} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="flex flex-row gap-2 bg-[#ffd62c] rounded-md p-2 text-[#1f2937] font-semibold text-center items-center justify-center">
                        <ShoppingCartIcon size={24} /> Checkout
                        </button>
                        <button className="flex flex-row gap-2 border border-[#c6c9cf] rounded-md p-2 text-[#c6c9cf] font-semibold text-center items-center justify-center">
                            <ShoppingCartIcon size={24} /> Continue Shopping
                        </button>
                        <div className="flex flex-row gap-8 items-center justify-center">
                            <div className="text-xs text-[#7f8693] font-semibold">Number of Movies <p className="text-sm font-bold">{totalItems}</p></div>
                            <div className="text-xs text-[#7f8693]  font-semibold">Total Price <p className="text-sm font-bold">$ {totalPrice}</p></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
