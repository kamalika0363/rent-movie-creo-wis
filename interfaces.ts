export interface Movie {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    genre: string;
}

export interface CartItem {
    movie: Movie;
    quantity: number;
}
