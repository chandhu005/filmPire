import React from 'react'
import { Typography, Button } from '@mui/material'
import useStyles from "./styles"

const Pagination = ({ currentPage, totalPages, setPage }) => {
    const classes = useStyles();
    if (totalPages === 0) return null;

    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    return (
        <div className={classes.container}>
            <Button className={classes.button} variant='contained' color='primary' type='button' onClick={handlePrev}>
                Prev
            </Button>
            <Typography variant='h4' className={classes.pageNumber}>
                {currentPage}
            </Typography>
            <Button className={classes.button} variant='contained' color='primary' type='button' onClick={handleNext}>
                Next
            </Button>
        </div>
    );
}

export default Pagination
