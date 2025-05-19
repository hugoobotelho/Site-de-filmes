import Colors from "../constants/Colors";
import { Container, Title } from "../styles/GenreScreenStyle"

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { useGenres } from "../contexts/ContextGenres";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";


const GenresScreen = () => {

    const location = useLocation()
    const navigate = useNavigate()

    interface Genre {
        name: string,
        id: number,
        media: number,
        qtdMovies: number,
        movies: Movie[],
    }

    interface Movie {
        name: string,
        overview: string,
        year: string,
        grade: number,
        genre: number[],
        poster: string
    }

    const genresContex = useGenres();

    const [isLoading, setIsLoading] = useState<boolean>(true)


    const handle = async () => {
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

    useEffect(() => {
        handle();

    }, [location.pathname]);

    const numberOfComponents = 19;

    return (
        <Container>
            <Title>Genres</Title>
            <Grid container spacing={2}>

                {isLoading ? (
                    (
                        Array.from({ length: numberOfComponents }).map((_, index) => (
                            < Skeleton variant="rounded"
                                sx={{ bgcolor: `${Colors.cinzaMedio}` }}
                                width={180}
                                height={34}>
                                <div style={{ paddingTop: '57%', color: `${Colors.branco}` }}></div>
                            </Skeleton>))
                    )

                ) :
                    (
                        genresContex?.genres.map((g: Genre) => {
                            return (
                                <Button variant="outlined" sx={{
                                    borderRadius: "10px",
                                    height: "34px",
                                    width: "180px",
                                    padding: "20px",
                                    borderColor: `${Colors.cinzaClaro}`,
                                    color: `${Colors.branco}`,
                                    "&:hover": {
                                        borderColor: `${Colors.branco}`,
                                        backgroundColor: `${Colors.cinzaMedio}`
                                    }
                                }}
                                    onClick={() => {
                                        if (g.name) {
                                            navigate(`/ListMovies/Genres/${g.id}`);
                                        }
                                    }}
                                >
                                    {/* <Link to="/ListMovies" state={{movies: g.movies, name: g.name, media: g.media}}> */}
                                    {g.name}
                                    {/* </Link> */}
                                </Button>
                            )
                        })
                    )
                }

            </Grid>

        </Container >
    )
}

export default GenresScreen