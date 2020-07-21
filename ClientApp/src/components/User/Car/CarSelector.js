"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
require("../../../css/car-selector.css");
var Delete_1 = require("@material-ui/icons/Delete");
var CarService_1 = require("../../../Services/CarService");
var Response_1 = require("../Response");
var UserCar = /** @class */ (function () {
    function UserCar() {
        this.cars = [];
        this.serverError = true;
        this.deleteButton = true;
        this.deleteStatus = false;
    }
    return UserCar;
}());
exports.UserCar = UserCar;
var CarSelector = /** @class */ (function (_super) {
    __extends(CarSelector, _super);
    function CarSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.onSubmit = function (carRecord) {
            if (_this.state.deleteButton) {
                sessionStorage.setItem('carDetails', JSON.stringify(carRecord));
                window.location.pathname = '/createride';
            }
        };
        _this.state = new UserCar();
        return _this;
    }
    CarSelector.prototype.componentDidMount = function () {
        var _this = this;
        CarService_1.default.getCars().then(function (response) {
            console.log(response);
            if (response !== undefined && response === 'serverError') {
                _this.setState({ serverError: false });
            }
            else if (response !== undefined) {
                _this.setState({ cars: response });
            }
        });
    };
    CarSelector.prototype.onDelete = function (id) {
        var _this = this;
        CarService_1.default.deleteCar(id).then(function (response) {
            if (response === 'ok') {
                window.location.reload();
            }
            else {
                _this.setState({ deleteStatus: true });
            }
            _this.setState({ deleteButton: true });
        });
    };
    CarSelector.prototype.render = function () {
        var _this = this;
        var carDetails = this.state.cars.map(function (carRecord, i) { return (React.createElement(core_1.ButtonBase, { key: i, onClick: function () { return _this.onSubmit(carRecord); } },
            React.createElement(core_1.Card, { className: 'car-cards' },
                React.createElement("div", { className: 'delete', onClick: function () { return _this.onDelete(carRecord.id); } },
                    React.createElement(Delete_1.default, { style: { color: 'white', fontSize: '1.4rem' } })),
                React.createElement("p", { className: 'car-details' },
                    "Model : ",
                    carRecord.model),
                React.createElement("p", { className: 'car-details' },
                    "Car Number : ",
                    carRecord.number),
                React.createElement("p", { className: 'car-details' },
                    "MAX NUMBER OF SEAT: ",
                    carRecord.noofSeat)))); });
        return (this.state.serverError ?
            React.createElement("div", { className: 'car-selectors' },
                React.createElement("div", { className: 'header' },
                    React.createElement("p", { className: 'head' }, "Select a car for a ride or add new car")),
                this.state.deleteStatus ? React.createElement("p", { style: { fontSize: '1.4rem', margin: 'auto 1rem' } }, "sorry car is not deleted. car is booked for a ride") : null,
                React.createElement("div", { className: 'user-cars' }, carDetails),
                React.createElement(core_1.ButtonBase, { href: '/car/addnewcar' },
                    React.createElement(core_1.Card, { className: 'car-cards' },
                        React.createElement("div", { className: 'add-car' }, "+")))) : React.createElement(Response_1.ServerError, null));
    };
    return CarSelector;
}(React.Component));
exports.default = CarSelector;
//# sourceMappingURL=CarSelector.js.map