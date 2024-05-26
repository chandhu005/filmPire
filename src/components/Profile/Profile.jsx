import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB';
import { userSelector } from '../../Features/auth';
import RatedCards from '../RatedCards/RatedCards';

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1
  });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, [refetchFavorites, refetchWatchlisted]);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout} startIcon={<ExitToApp />}>
          Logout
        </Button>
      </Box>
      {(!favoriteMovies?.results?.length && !watchlistMovies?.results?.length) ? (
        <Typography variant="h5">
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          {favoriteMovies?.results?.length > 0 && (
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
          )}
          {watchlistMovies?.results?.length > 0 && (
            <RatedCards title="Watchlist" data={watchlistMovies} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
