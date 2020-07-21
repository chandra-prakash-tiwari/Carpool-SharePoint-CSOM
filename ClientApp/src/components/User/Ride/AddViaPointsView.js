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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
require("../../../css/add-via-points.css");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var RideService_1 = require("../../../Services/RideService");
var Icon_1 = require("@material-ui/core/Icon");
var Delete_1 = require("@material-ui/icons/Delete");
var Pagination_1 = require("@material-ui/lab/Pagination");
var ToggleOn_1 = require("@material-ui/icons/ToggleOn");
var ToggleOff_1 = require("@material-ui/icons/ToggleOff");
var CityService_1 = require("../../../Services/CityService");
var Response_1 = require("../Response");
var ViaPointsDetails = /** @class */ (function () {
    function ViaPointsDetails() {
        this.cities = [new ViaCity()];
        this.availableSeats = 0;
        this.ratePerKM = 0;
        this.meta = new ViaCityMeta();
        this.carCapacity = 0;
        this.offerStatus = true;
        this.serverError = false;
        this.rideStatus = false;
    }
    return ViaPointsDetails;
}());
exports.ViaPointsDetails = ViaPointsDetails;
;
var ViaCity = /** @class */ (function () {
    function ViaCity() {
        this.city = '';
    }
    return ViaCity;
}());
exports.ViaCity = ViaCity;
var ViaCityMeta = /** @class */ (function () {
    function ViaCityMeta() {
        this.cityError = '';
        this.switch = true;
    }
    return ViaCityMeta;
}());
exports.ViaCityMeta = ViaCityMeta;
var AddViaPointsView = /** @class */ (function (_super) {
    __extends(AddViaPointsView, _super);
    function AddViaPointsView(props) {
        var _this = _super.call(this, props) || this;
        _this.addViaCities = function () {
            _this.setState({ cities: __spreadArrays(_this.state.cities, [{ city: '' }]) });
        };
        _this.editViaCities = function (value, index) {
            _this.state.cities[index].city = value;
            _this.setState({ cities: _this.state.cities });
        };
        _this.deleteViaCity = function (index) {
            var list = __spreadArrays(_this.state.cities);
            list.splice(index, 1);
            _this.setState({ cities: list });
        };
        _this.editNoofSeats = function (number) {
            _this.setState({ availableSeats: number });
        };
        _this.onChanges = function (event) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[event.target.name] = event.target.value, _a)));
        };
        _this.onSubmit = function (event) {
            var _a;
            event.preventDefault();
            _this.setState({ offerStatus: false });
            (_a = RideService_1.default.addRides(_this.state)) === null || _a === void 0 ? void 0 : _a.then(function (response) {
                if (response === 'Ok') {
                    _this.setState({ rideStatus: true });
                }
                else if (response === 'serverError') {
                    _this.setState({ serverError: true });
                }
            });
        };
        _this.state = new ViaPointsDetails();
        return _this;
    }
    AddViaPointsView.prototype.componentDidMount = function () {
        var list = __spreadArrays(this.state.cities);
        list.splice(0, 1);
        this.setState({ cities: list });
        var carDetailsStr = sessionStorage.getItem('carDetails');
        if (carDetailsStr != null) {
            var carDetails = JSON.parse(carDetailsStr);
            this.setState(__assign(__assign({}, this.state), { carCapacity: carDetails.noofSeat }));
        }
    };
    AddViaPointsView.prototype.isEmpty = function (value) {
        return !value || (value && value.trim().length === 0);
    };
    AddViaPointsView.prototype.isValidCity = function (value) {
        var isValid = CityService_1.CityService.getValidCity(value);
        return isValid.length == 0;
    };
    AddViaPointsView.prototype.isValidCityResponse = function (value, index) {
        var isEmpty = this.isEmpty(value);
        var isValid = this.isValidCity(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { cityError: isEmpty ? 'Please enter source city name' : (isValid ? 'Please enter valid city name' : '') }) });
        return isEmpty && !isValid;
    };
    AddViaPointsView.prototype.render = function () {
        var _this = this;
        return (this.state.offerStatus ?
            React.createElement(core_1.Grid, { className: 'add-viaPoints', item: true, md: 4, id: 'viapointdetails' },
                React.createElement("form", { className: 'form' },
                    React.createElement("div", { className: 'header' },
                        React.createElement("div", { className: 'head' },
                            React.createElement("h1", null, "Add Via Points"),
                            React.createElement(core_1.ButtonBase, { onClick: function () { _this.setState({ meta: __assign(__assign({}, _this.state.meta), { switch: !_this.state.meta.switch }) }); } }, this.state.meta.switch ? React.createElement(ToggleOn_1.default, { className: 'switch', style: { color: '#ac4fff' } }) : React.createElement(ToggleOff_1.default, { className: 'switch', style: { color: '#ffac19' } }))),
                        React.createElement("p", null, "add all new via points")),
                    this.state.cities.map(function (city, index) {
                        return (React.createElement("div", { key: index, className: 'input-via-points' },
                            React.createElement(Autocomplete_1.default, { freeSolo: true, options: CityService_1.CityService.getValidCity(city.city).map(function (option) { return option.city; }), onChange: function (event, newInputvalue) { _this.editViaCities(newInputvalue, index); }, renderInput: function (param) { return (React.createElement(core_1.TextField, __assign({}, param, { label: 'stop ' + (index + 1), style: { width: '70%', marginBottom: '6%' }, InputLabelProps: { shrink: true }, type: 'text', onChange: function (event) { _this.editViaCities(event.target.value, index); } }))); } }),
                            React.createElement(core_1.ButtonBase, { className: 'icon', onClick: function () { return _this.deleteViaCity(index); } },
                                React.createElement(Delete_1.default, null))));
                    }),
                    React.createElement(core_1.ButtonBase, { className: 'icon', onClick: this.addViaCities },
                        React.createElement(Icon_1.default, null, "add_circle")),
                    React.createElement("br", null),
                    React.createElement("div", null,
                        React.createElement("span", null, "Available seats"),
                        React.createElement(Pagination_1.default, { count: this.state.carCapacity, hideNextButton: true, hidePrevButton: true, onChange: function (event, number) { return _this.editNoofSeats(number); } })),
                    React.createElement(core_1.TextField, { label: 'Rate per km', style: { width: '70%', marginBottom: '6%' }, InputLabelProps: { shrink: true }, type: 'number', name: 'ratePerKM', value: this.state.ratePerKM, onChange: this.onChanges }),
                    React.createElement("button", { type: 'submit', className: 'submitButton', onClick: this.onSubmit },
                        React.createElement("span", null, "Submit ")))) : (React.createElement("div", null,
            React.createElement("div", null, this.state.rideStatus ? React.createElement(Response_1.RideConfirm, null) : ''),
            React.createElement("div", null, this.state.serverError ? React.createElement(Response_1.ServerError, null) : ''))));
    };
    return AddViaPointsView;
}(React.Component));
exports.default = AddViaPointsView;
//# sourceMappingURL=AddViaPointsView.js.map