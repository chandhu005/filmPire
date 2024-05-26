import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import FeauturedMovie from "../FeauturedMovie/FeauturedMovie";

const Movie = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName ,searchQuery} = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center">
        <Typography variant="h4">
          No movies that matches that Name <br />
          Please search for something else
        </Typography>
      </Box>
    );
  }
  if (error) {
    return error.message;
  }
  return (
    <div>
    <FeauturedMovie movie={data.results[0]}/>
      <MovieList movies={data} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages}/>
    </div>
  );
};

export default Movie;
