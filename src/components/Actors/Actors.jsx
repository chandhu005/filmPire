import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useGetActorsDetailsQuery ,useGetMoviesByActorIdQuery} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList"

//https://www.imdb.com/name/nm0000151/
import useStyles from "./styles";
const Actors = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  
  const [page,setPage] = useState(1);
  const { data, isFetching, error } = useGetActorsDetailsQuery(id); // Assuming you need to pass id to the query
  const { data: movies } = useGetMoviesByActorIdQuery({id,page}); // Assuming you need to pass id to the query

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt={data?.name}
            className={classes.image}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {" "}
            Born:{new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            {" "}
            {data?.biography || "Sorry no Bio graphy"}
          </Typography>

          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
            > Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
        Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12}/>}
        <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages}/>
      </Box>
    </>
  );
};

export default Actors;
