import {data} from "@/utils/data";
import MoviesItem from "@/components/MovieItem/page";
import React from "react";
export default function Home() {
  const {movies} = data;
  return (
      <div>
            <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-12 py-8 sm:py-14">
              {movies.map(movie => (
                  <MoviesItem key={movie.id} movie={
                      {
                          description: movie.description,
                          genre: movie.genre,
                          id: movie.id,
                          image: movie.image,
                          name: movie.name,
                          price: movie.price,
                          rating: movie.rating,
                      }
                  }/>
              ))}
            </div>
      </div>
  );

}