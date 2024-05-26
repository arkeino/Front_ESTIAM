/* 
comment récupere les données et filter comme la page users.
*/

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import Button from '@mui/material/Button';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
    },
  },
}));


const appBarStyle = {
    backgroundColor: 'purple'
};


const SearchBar = (): JSX.Element =>{

  const appBarStyle = {
    backgroundColor: 'purple'
};
const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = async () => {
  await logout();
  navigate('/login');
};
  return (
    <AppBar 
        position="fixed"
        sx={appBarStyle}
    >
        <Container /*  maxWidth="x1" */>
            <Toolbar disableGutters>
            <Typography
               variant="h5"
               noWrap
               component="a"
               href="/"
               sx={{
                mr: 2,
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
               }}
            >
                TechCorp
            </Typography>
            <Search>
                <SearchIconWrapper>
                <SearchIcon  sx={{
                    color: 'black',
                }}/>
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Rechercher un nom"
                inputProps={{ 'aria-label': 'search' }}
                sx={{color: 'black'}}
                />
            </Search>
            <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
            </Toolbar>

        </Container>
      </AppBar>
  );
}

export default SearchBar;
