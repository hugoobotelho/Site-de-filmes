
import { useEffect, useState } from "react";

import { useMovies } from "../contexts/ContextMovies";

import Skeleton from '@mui/material/Skeleton';
import Colors from "../constants/Colors";

import ListMoviesScreen from "./ListMoviesScreen";

import { BarChart } from '@mui/x-charts/BarChart';
import { useGenres } from "../contexts/ContextGenres";

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


const HomeScreen = () => {


    const movieContex = useMovies()
    const genresContex = useGenres()

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            await movieContex?.requestMoviesTopRatedApi();
            await genresContex?.genersMedia();              
            setIsLoading(false);                            
        };

        loadData();
    }, []);


    return (
        <div>
            {isLoading ? (
                <Skeleton variant="rectangular" height={400} />
            ) : (
                <BarChart
                    height={400}
                    series={[
                        {
                            data: genresContex?.genres.map((genre: Genre) => genre.qtdMovies),
                            id: 'Amount Movies',
                            color: Colors.vermelho,
                        },
                    ]}
                    xAxis={[
                        {
                            data: genresContex?.genres.map((genre: Genre) => genre.name),
                            tickLabelStyle: {
                                fill: Colors.branco,
                                fontSize: 8,
                            },
                        },
                    ]}
                    yAxis={[
                        {
                            tickLabelStyle: {
                                fill: Colors.branco,
                                fontSize: 14,
                            },
                        },
                    ]}
                />
            )}

            <ListMoviesScreen />
        </div>
    );

}

export default HomeScreen