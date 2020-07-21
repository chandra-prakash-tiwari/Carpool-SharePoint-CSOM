import UserService from './UserService'

export const BookingService = {
    searchRide,
    myBookings,
    addBookings,
    cancelBooking,
    bookingResponse,
    getByRideId
};

function addBookings(booking, noofSeats) {
    var bookingSearch = JSON.parse(sessionStorage.getItem('bookingSearch'));
    var data = {
        rideId: booking.id,
        from: bookingSearch.from,
        to: bookingSearch.to,
        travelDate: bookingSearch.date,
        bookingDate: bookingSearch.date,
        noofSeats: noofSeats,
        time: booking.time,
        status:3
    }
    return fetch(`/api/booking/create?bookerId=${UserService.currentUser.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify(data),
    }).then(async response => {
        if (response.status === 204) {
            return Promise.resolve("Ok");
        }
        else if (response.status === 500) {
            return Promise.reject("serverError");
        }
    }).catch(error => {
        return error;
    })
}

function getByRideId(rideId, bookerId) {
    return fetch(`/api/booking/getbookerbyrideid?rideId=${rideId}&bookerId=${bookerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status === 200) {
            var data = await response.json()
            return Promise.resolve(data);
        }

        return Promise.reject();
    })
}

function cancelBooking(id) {
    return fetch(`/api/booking/cancel?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status == 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status == 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }
        else if (response.status === 500) {
            return Promise.reject('serverError');
        }
        else
            return Promise.reject();
    }).catch(error => {
        return error;
    })
}

function searchRide(bookingSearch) {
    var data = {
        From: bookingSearch.from,
        To: bookingSearch.to,
        TravelDate: bookingSearch.date
    }
    return fetch('/api/ride/offers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify(data),
    }).then(async response => {

        if (response.status == 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status == 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }
        else if (response.status === 500) {
            return Promise.reject('serverError');
        }
        else
            return Promise.reject();
        }).catch(error => {
            return error;
        })
}

function myBookings() {
    return fetch(`/api/booking/getbyuserid?userid=${UserService.currentUser.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status == 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status == 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }
        else if (response.status === 500) {
            return Promise.reject('serverError');
        }
        return Promise.reject();
        
    }).catch(error => {
        return error;
    })
}

function bookingResponse(rideId, bookingId, status) {
    return fetch(`/api/ride/response?rideId=${rideId}&bookingId=${bookingId}&status=${parseInt(status)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {

        if (response) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status == 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }
        else if (response.status === 500) {
            return Promise.reject('serverError');
        }
        return Promise.reject();

    }).catch(error => {
        return error;
    })
}

export default BookingService;