import Colors from "../constants/Colors";
import { Container, Title } from "../styles/GenreScreenStyle"

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState, } from "react";

import { useMovies } from "../contexts/ContextMovies";
import {  useLocation, useNavigate,  } from "react-router-dom";


const YearsScreen = () => {

    const location = useLocation()
    const navigate = useNavigate()

    interface Year {
        year: string,
        grade: number,
        movies: Movie[]
    }

    interface Movie {
        name: string,
        overview: string,
        year: string,
        grade: number,
        genre: number[],
        poster: string
    }

    const moviesContext = useMovies();

    const [isLoading, setIsLoading] = useState<boolean>(true)


    const handle = async () => {
        setIsLoading(true);
        await moviesContext?.requestMoviesTopRatedApi();

        // espera até que genres realmente tenham sido preenchidos
        const checkIfLoaded = () => {
            if (moviesContext?.moviesYear.length != undefined) {

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
            <Title>Years</Title>
            <Grid container spacing={2}>

                {isLoading ? (
                    (
                        Array.from({ length: numberOfComponents }).map((_) => (
                            < Skeleton variant="rounded"
                                sx={{ bgcolor: `${Colors.cinzaMedio}` }}
                                width={180}
                                height={34}>
                                <div style={{ paddingTop: '57%', color: `${Colors.branco}` }}></div>
                            </Skeleton>))
                    )

                ) :
                    (
                        moviesContext?.moviesYear.map((y: Year) => {
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
                                        if (y.year) {
                                            navigate(`/ListMovies/Year/${y.year}`);
                                        }
                                    }}
                                >
                                    {y.year}
                                </Button>
                            )
                        })
                    )
                }

            </Grid>

        </Container >
    )
}

export default YearsScreen