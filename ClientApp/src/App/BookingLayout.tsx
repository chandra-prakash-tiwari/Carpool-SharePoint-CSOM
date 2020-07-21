import * as React from 'react';
import { Grid } from '@material-ui/core';
import BookaRide from '../components/User/Booking/BookaRide';

export default class BookingLayout extends React.Component {
    render() {
        return (
            <Grid container className='booking'>
                <Grid item md={4}>
                    <BookaRide />
                </Grid>
            </Grid>
        )
    }
}