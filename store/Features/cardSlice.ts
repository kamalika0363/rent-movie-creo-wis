import {CartItem, Movie} from "../../interfaces";
import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CartState{
    cart: any;
    cartItems: CartItem[];
}

const initialState: { cartItems: any[] } = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<Movie>) => {
            const item = state.cartItems.find((el) => el.movie.id === action.payload.id);
            if(item){
                item.quantity++;
            } else {
                state.cartItems.push({movie: action.payload, quantity: 1});
            }
        },
        decrement: (state, action: PayloadAction<Movie>) => {
            const item = state.cartItems.find((el) => el.movie.id === action.payload.id);
            if(item){
                item.quantity--;
                if(item.quantity === 0){
                    state.cartItems = state.cartItems.filter((el) => el.movie.id !== action.payload.id);
                }
            }
        },
    },
});

const cartItems = (state: CartState) => state.cart.cartItems;

export const totalCartItemSelector = createSelector([cartItems], (cartItems)=>
    cartItems.reduce((total: number, curr:CartItem) => (total += curr.quantity), 0)
);

export const totalCartPriceSelector = createSelector([cartItems], (cartItems)=>
    cartItems.reduce((total: number, curr:CartItem) => (total += curr.quantity * curr.movie.price), 0)
);

export const movieQtyInCartSelector = createSelector(
    [cartItems, (cartItems, movieId: number) => movieId],
    (cartItems, movieId) =>
        cartItems.find((el: { movie: { id: number; }; }) => {
            return el.movie.id === movieId;
        })?.quantity || 0
);

export const totalPriceSelector = createSelector([cartItems], (cartItems)=>
    cartItems.reduce((total: number, curr:CartItem) => (total += curr.quantity * curr.movie.price), 0)
);

export const {increment, decrement} = cartSlice.actions;
export default cartSlice.reducer;