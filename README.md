# installation
- npx create react app
-  npm install @alan-ai/alan-sdk-web @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/styles @reduxjs/toolkit @react-router-dom axios --force

# Browser route
- import { BrowserRoute } from "react-router-dom";
- in index .js ReactDOM.render(<BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById("root")); need to wrap up all the things in Browser routes to create an pages

# App.js
- import {Route,Swtich} from "react-router-dom";
- Switch is is used to route different Routes ;
- we need to wrap the app in Router
-import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
-    
<Router>
    <Routes>
       <Route path="">
       <Home/>
     </ROute>
     </Routes>
</Router>

# App formattting (Folder strcuture)
- need to create an folder and inside it we need to create an component 

# create an Style component for each component for materail UI

- in styles.js
-` import { makeStyles } from "@mui/styles";

export default makeStyles(()=>({
      root:{
        display: 'flex',
        height: '100%',
      },
      toolbar:{
        height:'70px'
      },
      content:{
        flexGrow:'1',
        padding:'2em'
      },
}));`

- import useStyles from "./styles";
- import React from 'react';
import { useEffect } from 'react';
import { Divider,List,ListItem,ListItemText,ListSubheader,ListItemIcon,Box,CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import useStyles from './style';
const Sidebar = ({setMobileOpen}) => {
    const theme=useTheme();
    const classes=useStyles();
  return (
    <>
    
      <Link to="/" className={classes.imageLink}></Link>
    </>
  )
}

export default Sidebar;

# Redux Tool Kit
- in index.js import {Provider} from "redux-toolkit"
- create an APP folder in side we create an STORE.js 
   { first we create an store import { configureStore } from "@reduxjs/toolkit";


export default configureStore({
    reducer: {
        
    },
    
})}
- create an Services folder for the TMDB services.
-{ import React from 'react'
import { CreateApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const tmdbApi=CreateApi({
    reducerPath:'tmdbApi',
    baseQuery:fetchBaseQuery({baseUrl:""})
});
}
 we create an api for TMDB for search Query and Optimization 
 # create an Store 
 import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { tmdbApi } from "../services/TMDB";

const store = configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
});

setupListeners(store.dispatch);

export default store;
# create an search Query 
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;
//const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    //get  movies by Type
    getMovies: builder.query({
      query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
# Display the store 
import React from "react";
import { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { useGetGenresQuery,useGetMoviesQuery } from "../../services/TMDB";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./style";
import { Label } from "@mui/icons-material";
import genreIcons from "../../assets/genres"
const Categories = [{ label: "Popular", value: "popular" },
{ label: "Top Rated", value: "top_rated" },
{ label: "UpComing", value: "upcoming" },

];
const demoCategories = [{ label: "Comedy", value: "comdey" },
{ label: "Horror", value: "horror" },
{ label: "Action", value: "action" },
{ label: "Animation", value: "animation" },

];
const Sidebar = ({ setMobileOpen }) => {
  const {data,isFetching}=useGetGenresQuery();
 
    const theme = useTheme();
  const classes = useStyles();
  const redLogo =
    "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
  const blueLogo =
    "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories
        </ListSubheader>
        {Categories.map(({label,value}) =>(
           <Link key={value} className={classes.links} to="/">
                <ListItem onClick={()=>{}} button>
                <ListItemIcon>
                    <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} alt="logo"/>
                </ListItemIcon>
                <ListItemText primary={label}/>
                </ListItem>
           </Link>
        ))}
      </List>
      <Divider/>
      <List>
        <ListSubheader>Genres
        </ListSubheader>
        { isFetching?(<Box display='flex' justifyContent='center'>
  <CircularProgress />
    </Box>):data.genres.map(({name,id}) =>(
           <Link key={name} className={classes.links} to="/">
                <ListItem onClick={()=>{}} button>
                <ListItemIcon>
                    <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} alt="logo"/>
                </ListItemIcon>
                <ListItemText primary={name}/>
                </ListItem>
           </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;

# Create an slice for fetching 

