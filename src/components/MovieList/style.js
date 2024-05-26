import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  moviesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '16px',
    position: 'relative',
    overflow: 'clip', // Ensure horizontal overflow is clipped
    marginTop: '100px',
    marginLeft: '250px',
    boxSizing: 'border-box',
    width: 'calc(100% - 250px)',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      justifyContent: 'center',
      width: '100%',
    },
  },
}));
