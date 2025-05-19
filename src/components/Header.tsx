import { Container, BackIcon } from "../styles/HeaderStyle"
import { useNavigate } from "react-router-dom";

import Colors from "../constants/Colors";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

import React from "react";



const Header: React.FC = () => {

    const navigator = useNavigate()

    const [movieName, setMovieName] = React.useState("");

    return (
        <Container>
            <BackIcon onClick={() => navigator(-1)}>
                <ArrowBackIosNewIcon style={{ color: `${Colors.branco}`, fontSize: '18px' }} />
            </BackIcon>
            <TextField
                label="Search"
                variant="outlined"
                value={movieName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMovieName(event.target.value)
                }}

                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search style={{ color: `${Colors.branco}` }} />
                        </InputAdornment>
                    )
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        height: "44px",
                        borderRadius: '16px',
                        color: `${Colors.branco}`,
                        fontWeight: "400",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: `${Colors.cinzaClaro}`,
                            borderWidth: "1px",
                        },
                        "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: `${Colors.branco}`,
                                borderWidth: "1px",
                            },
                        },
                        "&:hover:not(.Mui-focused)": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: `${Colors.branco}`,
                            },
                        },
                    },
                    "& .MuiInputLabel-outlined": {
                        color: `${Colors.cinzaClaro}`,
                        fontWeight: "400",
                        "&.Mui-focused": {
                            color: `${Colors.branco}`,
                            fontWeight: "400",
                        }
                    },
                }}
            />
        </Container>
    )
}

export default Header