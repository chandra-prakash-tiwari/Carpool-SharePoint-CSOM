import CityRecord from '../CityData/CityRecord.json';

export const CityService = {
    getValidCity,
    getCityDetails
}

function getValidCity(value) {
    if(value!=null)
        return CityRecord.filter((city) => city.city.toLowerCase().includes(value.toLowerCase()));

    return CityRecord.filter((city) => city.city.includes(value));
}

function getCityDetails(value) {
    if (value === null||value==='')
        return null;

    var city = CityRecord.filter((city) => city.city.toLowerCase() === (value.toLowerCase()));
    return city[0];
}