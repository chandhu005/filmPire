import React from 'react'
import { Grid } from '@mui/material';
import useStyles from "./style"
import Movie from '../Movie/Movie';
const MovieList = ({movies,excludeFirst}) => {
    const classes = useStyles();
    const startFrom=excludeFirst?1:0;
  return (
    <Grid container className={classes.moviesContainer}>
    
    {movies.results.map((movie,index)=>(
     <Movie key={index} movie={movie} />
    ))}</Grid>
  )
}

export default MovieList