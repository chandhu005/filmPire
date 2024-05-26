import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useStyles from "./styles";
import Movies from "./Movies/Movies";
import MovieInformation from "./MovieInformation/MovieInformation";
import Actors from "./Actors/Actors";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Navbar />
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieInformation />} />
              <Route path="/actors/:id" element={<Actors />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
};

export default App;
