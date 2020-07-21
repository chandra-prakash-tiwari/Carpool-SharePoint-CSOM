import * as React from 'react';
import { Grid } from '@material-ui/core';
import BookaRide from '../components/User/Booking/BookaRide';
import BookingSearch from '../components/User/Booking/BookingSearch';

export default class BookingSearchLayout extends React.Component {
    render() {
        return (
            <Grid container className='booking'>
                <Grid item md={4}>
                    <BookaRide />
                </Grid>
                <Grid item md={8}>
                    <BookingSearch />
                </Grid>
            </Grid>
        )
    }
}