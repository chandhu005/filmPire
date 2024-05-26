import React, { useEffect } from "react";
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
import { useGetGenresQuery } from "../../services/TMDB";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./style";
import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from '../../Features/currentGenreOrCategory';

const Categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "UpComing", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetGenresQuery();
  
  const theme = useTheme();
  const classes = useStyles();
  const redLogo = "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
  const blueLogo = "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
     useEffect(() =>{
      setMobileOpen(false)
     },[genreIdOrCategoryName])
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
        <ListSubheader>Categories</ListSubheader>
        {Categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} alt="logo" />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent='center'>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display='flex' justifyContent='center'>
            <p>Error loading genres</p>
          </Box>
        ) : (
          data?.genres?.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                <ListItemIcon>
                  <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} alt="logo" />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
