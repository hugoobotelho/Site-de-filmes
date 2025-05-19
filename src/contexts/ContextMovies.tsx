import axios from "axios";
import React, { createContext, type Dispatch, type SetStateAction, useState, type ReactNode, useContext } from "react";

interface Movie {
    name: string,
    overview: string,
    year: string,
    grade: number,
    genre: number[],
    poster: string,
}

interface Year {
    year: string,
    grade: number,
    movies: Movie[]
}


export interface MovieContextType {
    moviesTopRated: Movie[]
    setMoviesTopRated: Dispatch<SetStateAction<Movie[]>>
    moviesTrending: Movie[]
    setMoviesTrending: Dispatch<SetStateAction<Movie[]>>
    moviesYear: Year[]
    requestMoviesTopRatedApi(): Promise<void>
    requestMoviesTrendingApi(): Promise<void>
}

export const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
    children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [moviesTopRated, setMoviesTopRated] = useState<Movie[]>([]);
    const [moviesTrending, setMoviesTrending] = useState<Movie[]>([]);
    const [moviesYear, setMoviesYear] = useState<Year[]>([]);

    const requestMoviesTopRatedApi = async () => {
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


        setMoviesTopRated(moviesTop)

        const years: Year[] = []
        let contYears: number = 0
        let sumRate: number = 0
        let media: number = 0
        let aux: string = moviesTop[0].year
        let movies: Movie[] = []

        for (let movieYear of moviesTop) {
            const y = movieYear.year
            
            if (aux == y) {
                contYears += 1
                sumRate += movieYear.grade
                movies.push(movieYear)
            }
            else {
                media = sumRate / contYears

                let pushYear: Year = {
                    year: movies[0].year,
                    grade: media,
                    movies: movies
                }

                years.push(pushYear)

                contYears = 1
                sumRate = movieYear.grade
                movies = [movieYear]

            }
            aux = y
        }
        
        setMoviesYear(years)

    }

    const requestMoviesTrendingApi = async () => {
        const dados: any[] = []
        const moviesTrend: Movie[] = []
        for (let i: number = 1; i <= 20; i++) { //percorre as 20 paginas
            dados.push(await axios({
                method: 'get',
                url: 'https://api.themoviedb.org/3/trending/movie/week',
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
                    year: movie.release_date,
                    grade: movie.vote_average,
                    genre: movie.genre_ids,
                    poster: movie.poster_path,
                }
                moviesTrend.push(m)
            }
        }

        moviesTrend.sort((a: Movie, b: Movie) => (a.year.slice(0, 4) > b.year.slice(0, 4)) ? 1 : -1) //ordena os filmes com base no ano para ficar mais facil de listar os anos


        setMoviesTrending(moviesTrend)

    }


    const value: MovieContextType = {
        moviesTopRated,
        setMoviesTopRated,
        moviesTrending,
        setMoviesTrending,
        moviesYear,
        requestMoviesTopRatedApi,
        requestMoviesTrendingApi
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}


export const useMovies = () => {
    const context = useContext(MovieContext)

    return context
}
