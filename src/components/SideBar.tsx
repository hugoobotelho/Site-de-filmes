import { Link, useLocation } from "react-router-dom"
import { Container, ButtonRouter } from "../styles/SideBarStyle"

import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import GradeIcon from '@mui/icons-material/Grade';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import Colors from "../constants/Colors";

const SideBar = () => {

    const location = useLocation()


    return (
        <Container>
            <ButtonRouter isActive={location.pathname.startsWith('/home')}>
                <HomeFilledIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/home">
                    Home
                </Link>
            </ButtonRouter>
            <ButtonRouter isActive={location.pathname.startsWith('/topRated')}>
                <GradeIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/topRated">
                    Top Rated
                </Link>
            </ButtonRouter>
            <ButtonRouter isActive={location.pathname.startsWith('/trending')}>
                <WhatshotIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/trending">
                    Trending
                </Link>
            </ButtonRouter>
            <ButtonRouter isActive={location.pathname.startsWith('/genres') || location.pathname.startsWith('/ListMovies/Genres')}>
                <MovieIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/genres">
                    Genres
                </Link>
            </ButtonRouter>
            <ButtonRouter isActive={location.pathname.startsWith('/years') || location.pathname.startsWith('/ListMovies/Year')}>
                <CalendarTodayIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/years">
                    Years
                </Link>
            </ButtonRouter>

        </Container>
    )
}

export default SideBar