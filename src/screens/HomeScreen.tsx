
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { useMovies } from "../contexts/ContextMovies";

import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Colors from "../constants/Colors";

import Button from '@mui/material/Button';
import ListMoviesScreen from "./ListMoviesScreen";

import { BarChart } from '@mui/x-charts/BarChart';
import { useGenres } from "../contexts/ContextGenres";
import { useLocation } from "react-router-dom";

interface Movie {
    name: string,
    overview: string,
    year: string,
    grade: number,
    genre: number[],
    poster: string
}

interface Year {
    year: string,
    grade: number,
    movies: Movie[]
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

const HomeScreen = () => {

    const location = useLocation()

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