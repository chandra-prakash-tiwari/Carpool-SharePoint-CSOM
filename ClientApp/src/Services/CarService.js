import UserService from './UserService'

export const CarService = {
    addNewCar,
    getCars,
    deleteCar,
    hasNumber
};

function addNewCar(carDetails) {
    return fetch(`/api/car/create?ownerid=${UserService.currentUser.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify({
            number: carDetails.number,
            model: carDetails.model,
            noofSeat: parseInt(carDetails.noofSeats)
        }),
    }).then(async response => {
        if (response.status === 200) {
            return Promise.resolve('Ok')
        }
        else if (response === 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }
        else if (response.status === 404) {
            return Promise.reject('not found');
        }
        else if (response.status === 500) {
            return Promise.reject('Server error');
        }
        else
            return Promise.reject();
    }).catch(error => {
        return error;
    })
}

function getCars() {
    return fetch(`/api/car/getbyownerid?ownerId=${UserService.currentUser.id}`, {
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

function deleteCar(id) {
    return fetch(`/api/car/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status === 200) {
            return Promise.resolve('ok');
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
        return ;
    })
}

function hasNumber(number) {
    return fetch(`/api/car/hasnumber?number=${number}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status === 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }
        else if (response.status === 500) {
            return Promise.reject('serverError');
        }
        return await response.json();
    })
}

export default CarService;