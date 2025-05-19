import axios from "axios";
import React, { createContext, useState, type ReactNode, useContext } from "react";

import { useMovies } from "../contexts/ContextMovies";



export interface Genre {
    name: string,
    id: number,
    media: number,
    qtdMovies: number,
    movies: Movie[],
}

interface IGenre {
    name: string,
    id: number
}

interface Movie {
    name: string,
    overview: string,
    year: string,
    grade: number,
    genre: number[],
    poster: string,
}

export interface GenreContextType {
    genres: Genre[]
    genersMedia(): Promise<void>
}

export const GenreContext = createContext<GenreContextType | undefined>(undefined);

interface GenreProviderProps {
    children: ReactNode;
}

export const GenreProvider: React.FC<GenreProviderProps> = ({ children }) => {
    const [genres, setGenre] = useState<Genre[]>([]);

    const movieContex = useMovies()

    const genersMedia = async () => {

        await (movieContex?.requestMoviesTopRatedApi())

        const resData: any[] = []

        resData.push(await (axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/genre/movie/list',
            params: {
                api_key: 'e5d15901d7682b4229433ec06707f1cd',
                language: 'en',
            }
        })).then((response) => {
            return response.data.genres
        }).catch((e) => {
            console.log("Houve um erro ao pegar os generos de filmes: " + e)
        })
        )

        const genresData: IGenre[] = []

        for (const gen of resData[0]) {
            console.log(gen)
            let g: IGenre = {
                name: gen.name,
                id: gen.id
            }

            genresData.push(g)
        }

        console.log(genresData)

        const genresMedia: Genre[] = []
        for (const gen of genresData) {
            let sum: number = 0;
            let qtdMovies: number = 0;
            let movies: Movie[] = []
            if (movieContex?.moviesTopRated) {
                for (let movie of movieContex?.moviesTopRated) {
                    if (movie.genre.includes(gen.id)) {
                        sum += movie.grade
                        qtdMovies++
                        movies.push(movie)
                    }
                }
            }

            const g: Genre = {
                name: gen.name,
                id: gen.id,
                media: qtdMovies !== 0 ? Math.round((sum / qtdMovies) * 10) / 10 : 0,
                qtdMovies: qtdMovies,
                movies: movies
            }

            genresMedia.push(g)

        }

        setGenre(genresMedia)
    }

    const value: GenreContextType = {
        genres,
        genersMedia,
    };


    return (
        <GenreContext.Provider value={value}>
            {children}
        </GenreContext.Provider>
    );
}


export const useGenres = () => {
    const context = useContext(GenreContext)

    return context
}
