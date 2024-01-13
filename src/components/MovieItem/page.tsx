"use client";
import Link from "next/link";
import Image from "next/image";
import { Dot, ShoppingCartIcon, StarIcon } from "lucide-react";
import React, { useState } from "react";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {Movie} from "../../../interfaces";
import {useAppDispatch} from "../../../store/store";
import {increment} from "../../../store/Features/cardSlice";

interface Props {
    movie: Movie;
}

export default function MoviesItem({ movie }: Props) {
    const dispatch = useAppDispatch();
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleAddToCart = () => {
        dispatch(increment(movie));
    };

    // TO DO
    // Keep CSS classes in a separate file
    const modalContainerStyles = "fixed inset-0 flex items-center justify-center p-28 md:p-0";
    const modalContentStyles = "flex flex-col bg-[#1f2937] px-12 py-6 rounded-md relative items-center md:items-start";
    const closeButtonStyles = "absolute top-2 right-2 text-white";
    const imageStyles = "rounded shadow object-cover md:h-96 w-full sm:visible";
    const buttonStyles = "ml-4 sm:ml-0 mt-4 bg-[#ffd62c] text-[#373b42] p-3 sm:p-2 xl:p-3 rounded-md font-semibold text-xs lg:text-lg";

    return (
        <div className="mb-5 block rounded-t-sm shadow-md">
            <Link href={`/movie/${movie.id}`}>
                <Image
                    src={movie.image}
                    width={400}
                    height={400}
                    alt={movie.name}
                    className="rounded shadow object-cover h-96 w-full"
                />
            </Link>
            <div className="gap-2 flex flex-col p-5 bg-[#0a101c] hover:bg-[#1f2937] rounded-b-lg">
                <Link href={`/movie/${movie.id}`}>
                    <div className="text-sm xl:text-lg text-start">{movie.name}</div>
                </Link>
                <div className="flex flex-row font-semibold gap-1 text-[#707783]">
                    <p>{movie.genre}</p>
                    <Dot size={16} className="mt-1" />
                    <StarIcon size={16} className="mt-1" />
                    <p>{movie.rating}</p>
                    <Dot size={16} className="mt-1" />
                    <p>${movie.price}</p>
                </div>
                <div className="flex items-center justify-items-stretch xl:gap-4 gap-2">
                    <div className="flex flex-row gap-2 text-[#373b42] py-2 sm:py-1 px-4 xl:px-8 xl:py-3 rounded-lg font-semibold bg-[#ffd62c]">
                        <ShoppingCartIcon size={24} />
                        <button onClick={handleAddToCart}>Add</button>
                    </div>
                    <button
                        onClick={toggleModal}
                        className="border border-[#373b42] p-3 sm:p-2 xl:p-3 rounded-lg font-semibold text-xs lg:text-lg text-nowrap"
                    >
                        View Details
                    </button>
                </div>
            </div>
            {modal && (
                <div className={modalContainerStyles}>
                    <div className={modalContentStyles}>
                        <button onClick={toggleModal} className={closeButtonStyles}>
                            <CloseIcon />
                        </button>
                        <div className="flex flex-row gap-4">
                            <Link href={`/movie/${movie.id}`}>
                                <Image
                                    src={movie.image}
                                    width={400}
                                    height={400}
                                    alt={movie.name}
                                    className={imageStyles}
                                />
                            </Link>
                            <div className="flex flex-col">
                                <div className="text-sm xl:text-xl text-start font-semibold">{movie.name}</div>
                                <div className="flex flex-row font-semibold gap-1 text-[#707783]">
                                    <p>{movie.genre}</p>
                                    <Dot size={16} className="mt-1" />
                                    <StarIcon size={16} className="mt-1" />
                                    <p>{movie.rating}</p>
                                    <Dot size={16} className="mt-1" />
                                    <p>${movie.price}</p>
                                </div>
                                <p className="md:w-96 w-48 mt-4 text-[#707783] text-sm">{movie.description}</p>
                            </div>
                        </div>
                        <div>
                            <button className={buttonStyles}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
