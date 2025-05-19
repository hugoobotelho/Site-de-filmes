
import { useContext, useEffect, useState } from "react";

import { useMovies } from "../contexts/ContextMovies";

import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Colors from "../constants/Colors";

import MovieCard from "../components/MovieCard";
import { useLocation, useParams } from "react-router-dom";

import { Container, Title } from "../styles/ListMoviesScreenStyle"
import { GenreContext, useGenres } from "../contexts/ContextGenres";

interface Movie {
    name: string,
    overview: string,
    year: string,
    grade: number,
    genre: number[],
    poster: string
}

interface Genre {
    name: string,
    id: number,
    media: number,
    qtdMovies: number,
    movies: Movie[],
}

interface Year {
    year: string,
    grade: number,
    movies: Movie[]
}

const ListMoviesScreen = () => {

    const location = useLocation()

    const { id } = useParams<{ id: string }>()
    const { year } = useParams<{ year: string }>()

    const [movies, setMovies] = useState<Movie[]>([])
    // const [genre, setGenre] = useState<Genre | undefined>()

    const movieContex = useMovies()

    const genresContex = useGenres()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [title, setTitle] = useState<string | undefined>("")
    const [nota, setNota] = useState<string | undefined>("")

    const handleTopRated = async () => {
        setIsLoading(true);

        await movieContex?.requestMoviesTopRatedApi()

        const checkIfLoaded = () => {
            if (movieContex?.moviesTopRated.length != undefined) {

                setIsLoading(false);
            } else {
                setTimeout(checkIfLoaded, 100); // tenta de novo em 100ms
            }
        };

        checkIfLoaded();
    }

    const handleTrending = async () => {
        setIsLoading(true);

        await movieContex?.requestMoviesTrendingApi()

        const checkIfLoaded = () => {
            if (movieContex?.moviesTrending.length != undefined) {

                setIsLoading(false);
            } else {
                setTimeout(checkIfLoaded, 100); // tenta de novo em 100ms
            }
        };

        checkIfLoaded();
    }

    const handleGenres = async () => {
        setIsLoading(true);
        await genresContex?.genersMedia();

        // espera até que genres realmente tenham sido preenchidos
        const checkIfLoaded = () => {
            if (genresContex?.genres.length != undefined) {

                setIsLoading(false);
            } else {
                setTimeout(checkIfLoaded, 100); // tenta de novo em 100ms
            }
        };

        checkIfLoaded();
    };

    const handleYear = async () => {
        setIsLoading(true);
        await movieContex?.requestMoviesTopRatedApi();

        // espera até que genres realmente tenham sido preenchidos
        const checkIfLoaded = () => {
            if (movieContex?.moviesYear.length != undefined) {

                setIsLoading(false);
            } else {
                setTimeout(checkIfLoaded, 100); // tenta de novo em 100ms
            }
        };

        checkIfLoaded();
    };


    useEffect(() => {
        setNota("")
        if (location.pathname.startsWith("/ListMovies/Genres") || location.pathname === "/home") {
            handleGenres()
            setTitle(`${(genresContex?.genres?.find((genre: Genre) => genre?.id.toString() === id))?.name}`)
            if (location.pathname.startsWith("/ListMovies/Genres")) {
                setNota(`${(genresContex?.genres?.find((genre: Genre) => genre?.id.toString() === id))?.media}`)
            }
        }

        if (location.pathname.startsWith("/ListMovies/Year")) {
            handleYear()
            setTitle(`${(movieContex?.moviesYear?.find((y: Year) => y?.year === year))?.year} Movies`)
            setNota(`${(movieContex?.moviesYear?.find((y: Year) => y?.year === year))?.grade.toFixed(1)}`)
        }

        setIsLoading(true)
        if (location.pathname === "/topRated" || location.pathname === "/home") {
            if (movieContex?.moviesTopRated.length === 0) {
                handleTopRated()
            }
            setTitle("Top Rated Movies")
        }
        else {
            if (location.pathname === "/trending") {
                if (movieContex?.moviesTrending.length === 0) {
                    handleTrending()
                }
                setTitle("Trending Movies")
            }
        }


        setTimeout(() => {
            setIsLoading(false)
        }, 1500);

    }, [location.pathname, location.state])

    const numberOfComponents = 19;

    return (
        <Container>

            <Title style={{ color: `${Colors.branco}`, fontSize: "28px", fontWeight: "600" }}>
                {title} {nota}
            </Title>

            <Grid container spacing={2}>

                {isLoading ? (
                    (
                        Array.from({ length: numberOfComponents }).map((_, index) => (
                            < Skeleton variant="rounded"
                                sx={{ bgcolor: `${Colors.cinzaMedio}` }}
                                width={188}
                                height={248}>
                                <div style={{ paddingTop: '57%', color: `${Colors.branco}` }}></div>
                            </Skeleton>))
                    )

                ) :
                    (
                        (
                            (location.pathname === "/topRated" || location.pathname === "/home") &&
                            movieContex?.moviesTopRated.map((m: Movie) => {
                                return (
                                    <MovieCard name={m.name} year={m.year} grade={m.grade} poster={m.poster} />
                                )
                            })
                        ) ||
                        (
                            location.pathname === "/trending" &&
                            movieContex?.moviesTrending.map((m: Movie) => {
                                return (
                                    <MovieCard name={m.name} year={m.year} grade={m.grade} poster={m.poster} />
                                )
                            })
                        ) ||
                        (
                            location.pathname.startsWith("/ListMovies/Genres") &&
                            (genresContex?.genres?.find((genre: Genre) => genre?.id.toString() === id))?.movies.map((m: Movie) => {
                                return (
                                    <MovieCard name={m.name} year={m.year} grade={m.grade} poster={m.poster} />
                                )
                            })
                        ) ||
                        (
                            location.pathname.startsWith("/ListMovies/Year") &&
                            (movieContex?.moviesYear?.find((movieY: Year) => movieY?.year === year))?.movies.map((m: Movie) => {
                                return (
                                    <MovieCard name={m.name} year={m.year} grade={m.grade} poster={m.poster} />
                                )
                            })
                        )
                    )
                }

            </Grid>
        </Container>
    )
}

export default ListMoviesScreen