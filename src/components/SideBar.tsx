import { Link, useLocation } from "react-router-dom"
import { Container, ButtonRouter } from "../styles/SideBarStyle"
import { useEffect, useState } from "react"

import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import GradeIcon from '@mui/icons-material/Grade';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import Colors from "../constants/Colors";

const SideBar = () => {

    const location = useLocation()

    const [activePage, setActivePage] = useState(location.pathname)
    const handleItemClick = (path: string) => {
        setActivePage(path)
    }


    return (
        <Container>
            <ButtonRouter isActive={location.pathname.startsWith('/home')}>
                <HomeFilledIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/home" onClick={() => handleItemClick('/home')}>
                    {/* <DashboardIcon style={{ marginRight: '10px', width: '20px' }} />  */}
                    Home
                </Link>
            </ButtonRouter>
            <ButtonRouter isActive={location.pathname.startsWith('/topRated')}>
                <GradeIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/topRated" onClick={() => handleItemClick('/topRated')}>
                    {/* <DashboardIcon style={{ marginRight: '10px', width: '20px' }} />  */}
                    Top Rated
                </Link>
            </ButtonRouter>
            <ButtonRouter isActive={location.pathname.startsWith('/trending')}>
                <WhatshotIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/trending" onClick={() => handleItemClick('/trending')}>
                    {/* <DashboardIcon style={{ marginRight: '10px', width: '20px' }} />  */}
                    Trending
                </Link>
            </ButtonRouter>
            <ButtonRouter isActive={location.pathname.startsWith('/genres') || location.pathname.startsWith('/ListMovies/Genres')}>
                <MovieIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/genres" onClick={() => handleItemClick('/genres')}>
                    {/* <DashboardIcon style={{ marginRight: '10px', width: '20px' }} />  */}
                    Genres
                </Link>
            </ButtonRouter>
            <ButtonRouter isActive={location.pathname.startsWith('/years') || location.pathname.startsWith('/ListMovies/Year')}>
                <CalendarTodayIcon style={{ color: `${Colors.branco}` }} />
                <Link to="/years" onClick={() => handleItemClick('/years')}>
                    {/* <DashboardIcon style={{ marginRight: '10px', width: '20px' }} />  */}
                    Years
                </Link>
            </ButtonRouter>

        </Container>
    )
}

export default SideBar