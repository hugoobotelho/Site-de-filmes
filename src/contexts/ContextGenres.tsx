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

        // await (movieContex?.requestMoviesTopRatedApi())
        const dados: any[] = []
        const moviesTop: Movie[] = []
        for (let i: number = 1; i < 14; i++) { //pega os 20 filmes de cada pagina e repete o processo 13 vezes para pegar o 260 filmes top rated, depois eh so tirar os 10 ultimos para ficar 250
            dados.push(await axios({
                method: 'get',
                url: 'https://api.themoviedb.org/3/movie/top_rated',
                params: {
                    api_key: 'e5d15901d7682b4229433ec06707f1cd',
                    language: 'pt-BR',
                    page: i
                }
            }).then(response => {

                return response.data.results

            }).catch(e => {
                console.log("Houve um erro: " + e)
            })
            )

        }

        for (const dado of dados) {
            for (const movie of dado) {
                let m: Movie = {
                    name: movie.title,
                    overview: movie.overview,
                    year: movie.release_date.slice(0, 4),
                    grade: movie.vote_average,
                    genre: movie.genre_ids,
                    poster: movie.poster_path
                }
                moviesTop.push(m)
            }
        }

        for (let i: number = 0; i < 10; i++) {
            moviesTop.pop()
        }

        moviesTop.sort((a: Movie, b: Movie) => (a.year.slice(0, 4) > b.year.slice(0, 4)) ? 1 : -1) //ordena os filmes com base no ano para ficar mais facil de listar os anos


        // setMoviesTopRated(moviesTop)


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
            if (moviesTop) {
                for (let movie of moviesTop) {
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
