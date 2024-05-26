import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    flexGrow: 1,
    padding: '2em',
    marginLeft: '240px', // Adjust this value based on your sidebar width
    marginTop: '70px', // Adjust this value based on your navbar height
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: '70px', // Adjust for mobile layout if needed
    },
  },
}));
