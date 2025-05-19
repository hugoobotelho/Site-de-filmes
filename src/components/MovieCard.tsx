import { Container, Image, Info, Nota } from "../styles/MovieCardStyle"
import StarIcon from '@mui/icons-material/Star';
import Colors from "../constants/Colors";

const MovieCard = (props: {name: string, year: string, grade: number, poster: string}) => {
    return (
        <Container>
            <Image src={`https://image.tmdb.org/t/p/w185/${props.poster}`}/>
            <Info>
                <Nota>
                    <StarIcon sx={{ color: `${Colors.amarelo}` }} />
                    <span style={{color: `${Colors.cinzaClaro}`}}>{props.grade.toFixed(1)}</span>
                </Nota>

                <span style={{color: `${Colors.branco}`, fontSize: "14px", fontWeight: "600"}}>{props.name} <span style={{color: `${Colors.cinzaClaro}`, fontWeight: "400"}}>({props.year.slice(0, 4)})</span></span>
            </Info>
        </Container>
    )
}

export default MovieCard