import UserService from './UserService';
import { CityService } from './CityService';

export const RideService = {
    allRides,
    addRides,
    updateRide,
    getRideById,
    getAllBookers,
    carAvailableForRide
}

function allRides() {
    return fetch(`/api/ride/getallrides?ownerId=${UserService.currentUser.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status === 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status === 401) {
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

function carAvailableForRide(date, time) {
    var carId = JSON.parse(sessionStorage.getItem('carDetails')).id;
    return fetch(`/api/ride/caravailable?carId=${carId}&time=${time}&date=${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status === 200)
            return Promise.resolve(await response.json())
    })
}

function addRides(viaPointProps) {
    var carDetails = JSON.parse(sessionStorage.getItem('carDetails'));
    var rideDetails = JSON.parse(sessionStorage.getItem('rideDetails'))
    if (carDetails === null || rideDetails === null)
        return;
    var ViaPoints = [];
    for (var i = 0; i < viaPointProps.cities.length + 2; i++) {
        if (i === 0) {
            ViaPoints.push(CityService.getCityDetails(rideDetails.from))
        }

        else if (i === viaPointProps.cities.length + 1) {
            ViaPoints.push(CityService.getCityDetails(rideDetails.to))
        }

        else {
            var city = CityService.getCityDetails(viaPointProps.cities[i - 1].city);
            if (city !== null)
            ViaPoints.push(city)
        }
    }

    for (let i = 0; i < ViaPoints.length - 1; i++) {
        for (let j = 1; j < ViaPoints.length; j++) {
            if (ViaPoints[i].city === ViaPoints[j].city) {
                if (i !== j) {
                    return new Promise(function (resolve, reject) {
                        resolve('duplicate');
                    });
                }
            }
        }
    }

    if (ViaPoints.length >= 2) {
        return fetch('/api/ride/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${UserService.currentUser.userToken}`,
            },
            body: JSON.stringify({
                From: rideDetails.from,
                To: rideDetails.to,
                TravelDate: rideDetails.date.toString(),
                AvailableSeats: parseInt(viaPointProps.availableSeats),
                RatePerKM: parseInt(viaPointProps.ratePerKM),
                ViaPoints: JSON.stringify(ViaPoints).toString(),
                OwnerId: carDetails.ownerId,
                CarId: carDetails.id,
                time: rideDetails.time
            }),
        }).then(async response => {
            if (response.status === 200) {
                sessionStorage.removeItem('carDetails');
                sessionStorage.removeItem('rideDetails');
                return Promise.resolve("Ok");
            }
            else if (response === 401) {
                UserService.sessionExpired();
                window.location.pathname = '/login';
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
    else {
        return new Promise(function (resolve, reject) {
            resolve('cityError');
        });
    }
}

function updateRide(viaPointProps) {
    var carDetails = JSON.parse(sessionStorage.getItem('carDetails'));
    var rideDetails = JSON.parse(sessionStorage.getItem('rideDetails'))
    var rideId = sessionStorage.getItem('rideId');
    if (carDetails === null || rideDetails === null)
        return;
    var ViaPoints = [];
    for (var i = 0; i < viaPointProps.cities.length + 2; i++) {
        if (i === 0) {
            ViaPoints.push(CityService.getCityDetails(rideDetails.from))
        }

        else if (i === viaPointProps.cities.length + 1) {

            ViaPoints.push(CityService.getCityDetails(rideDetails.to))
        }

        else {
            var city = CityService.getCityDetails(viaPointProps.cities[i - 1].city);
            if (city !== null)
                ViaPoints.push(city)
        }
    }
    return fetch(`/api/ride/update?rideId=${rideId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify({
            From: rideDetails.from,
            To: rideDetails.to,
            TravelDate: rideDetails.date.toString(),
            AvailableSeats: parseInt(viaPointProps.availableSeats),
            RatePerKM: parseInt(viaPointProps.ratePerKM),
            ViaPoints: JSON.stringify(ViaPoints).toString(),
            OwnerId: carDetails.ownerId,
            CarId: carDetails.id,
            time: rideDetails.time
        }),
    }).then(async response => {
        if (response.status === 200) {
            sessionStorage.removeItem('carDetails');
            sessionStorage.removeItem('rideDetails');
            return Promise.resolve("Ok");
        }
        else if (response === 401) {
            UserService.sessionExpired();
            window.location.pathname = '/login';
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

function getRideById(id) {
    return fetch(`/api/ride/getbyid?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        }
    }).then(async response => {
        if (response.status === 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
    }).catch(error => {
        return error;
    })
}

function getAllBookers(id) {
    return fetch(`/api/booking/getallbyrideid?rideId=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        }
    }).then(async response => {
        if (response.status === 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
    }).catch(error => {
        return error;
    })
}

export default RideService;