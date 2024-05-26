import React from 'react'
import {Box,Typography,Card,CardMedia, CardContent} from '@mui/material' ;
import { Link } from 'react-router-dom';
import useStyles from "./styles"
const FeauturedMovie = ({movie}) => {
  const classes = useStyles();
  if(!movie) return null;
  return (
    <Box  component={Link} to={`/movie/${movie.id}`} className={classes.featuredCardContainer}>
         <Card className={classes.card} classes={{root:classes.cardRoot}}>
             <CardMedia  media='picture' className={classes.cardMedia} image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie.title} title={movie.title}/>
               <Box padding='20px'>
                 <CardContent className={classes.cardContent} classes={{root:classes.cardContentRoot}}>
                  <Typography varient='h5' gutterBottom >
                     {movie.title}
                  </Typography>
                  <Typography varient='body2'  >
                     {movie.overview}
                  </Typography>
                 </CardContent>
               </Box>
         </Card>
    
    </Box>
  )
}

export default FeauturedMovie
