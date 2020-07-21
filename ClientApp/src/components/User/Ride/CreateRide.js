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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
var AddViaPointsView_1 = require("./AddViaPointsView");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
require("../../../css/create-ride.css");
var ToggleOn_1 = require("@material-ui/icons/ToggleOn");
var ToggleOff_1 = require("@material-ui/icons/ToggleOff");
var CityService_1 = require("../../../Services/CityService");
var Ride_1 = require("../../../Classes/DataClasses/Ride");
var Ride_2 = require("../../../Classes/MetaClasses/Ride");
var RideDetails = /** @class */ (function () {
    function RideDetails() {
        this.data = new Ride_1.Ride();
        this.meta = new Ride_2.CreateRideMeta();
    }
    return RideDetails;
}());
exports.RideDetails = RideDetails;
var CreateRide = /** @class */ (function (_super) {
    __extends(CreateRide, _super);
    function CreateRide(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            if (sessionStorage.getItem('carDetails') === null) {
                window.location.pathname = '/car';
            }
        };
        _this.onChanges = function (event) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), { data: __assign(__assign({}, _this.state.data), (_a = {}, _a[event.target.name] = event.target.value, _a)) }));
        };
        _this.onSelect = function (value, name) {
            var _a;
            _this.setState({
                data: __assign(__assign({}, _this.state.data), (_a = {}, _a[name] = value, _a))
            });
        };
        _this.editTime = function (number) {
            _this.setState({
                data: __assign(__assign({}, _this.state.data), { time: number })
            });
        };
        _this.onSubmit = function (event) {
            event.preventDefault();
            if (!_this.isValidFrom(_this.state.data.from) && !_this.isValidTo(_this.state.data.to) && !_this.isValidDate(_this.state.data.date)) {
                sessionStorage.setItem('rideDetails', JSON.stringify(_this.state.data));
                _this.setState({ meta: __assign(__assign({}, _this.state.meta), { viaPointComponent: true }) });
            }
        };
        _this.state = new RideDetails();
        return _this;
    }
    CreateRide.prototype.isEmpty = function (value) {
        return !value || (value && value.trim().length === 0);
    };
    CreateRide.prototype.isValidCity = function (value) {
        var isValid = CityService_1.CityService.getValidCity(value);
        return isValid.length == 0;
    };
    CreateRide.prototype.isValidFrom = function (value) {
        var isEmpty = this.isEmpty(value);
        var isValid = this.isValidCity(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { fromError: isEmpty ? 'Please enter source city name' : (isValid ? 'Please enter valid city name' : '') }) });
        return isEmpty && !isValid;
    };
    CreateRide.prototype.isValidTo = function (value) {
        var isEmpty = this.isEmpty(value);
        var isValid = this.isValidCity(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { fromError: isEmpty ? 'Please enter destination city name' : (isValid ? 'Please enter valid city name' : '') }) });
        return isEmpty && !isValid;
    };
    CreateRide.prototype.isValidDate = function (value) {
        var isEmpty = this.isEmpty(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { fromError: isEmpty ? 'Please enter date' : '' }) });
        return isEmpty;
    };
    CreateRide.prototype.render = function () {
        var _this = this;
        return (React.createElement(core_1.Grid, { item: true, md: 12, container: true },
            React.createElement(core_1.Grid, { className: 'create-ride', item: true, md: 4 },
                React.createElement("form", { className: 'ride-details' },
                    React.createElement("div", { className: 'header' },
                        React.createElement("div", { className: 'head' },
                            React.createElement("h1", null, "Create Ride"),
                            React.createElement(core_1.ButtonBase, { onClick: function () { return _this.setState({ meta: __assign(__assign({}, _this.state.meta), { switch: !_this.state.meta.switch }) }); }, style: { marginLeft: '2rem' } }, this.state.meta.switch ? React.createElement(ToggleOn_1.default, { className: 'switch', style: { color: '#ac4fff' } }) : React.createElement(ToggleOff_1.default, { className: 'switch', style: { color: '#ffac19' } }))),
                        React.createElement("p", null, "we get you the matches asap!")),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.fromError, placement: 'left' },
                        React.createElement(Autocomplete_1.default, { freeSolo: true, options: CityService_1.CityService.getValidCity(this.state.data.from).map(function (option) { return option.city; }), onChange: function (event, newInputvalue) { _this.onSelect(newInputvalue, 'from'); }, renderInput: function (param) { return (React.createElement(core_1.TextField, __assign({}, param, { label: "From", style: { width: '85%', marginBottom: '6%' }, InputLabelProps: { shrink: true }, value: _this.state.data.from, type: 'text', onChange: _this.onChanges, name: 'from', className: 'input' }))); } })),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.toError, placement: 'left' },
                        React.createElement(Autocomplete_1.default, { freeSolo: true, options: CityService_1.CityService.getValidCity(this.state.data.to).map(function (option) { return option.city; }), onChange: function (event, newInputvalue) { _this.onSelect(newInputvalue, 'to'); }, renderInput: function (param) { return (React.createElement(core_1.TextField, __assign({}, param, { label: "To", style: { width: '85%', marginBottom: '6%' }, InputLabelProps: { shrink: true }, value: _this.state.data.to, onChange: _this.onChanges, type: 'text', name: 'to', className: 'input' }))); } })),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.dateError, placement: 'left' },
                        React.createElement(core_1.TextField, { label: "Date", style: { width: '85%', marginBottom: '6%' }, InputLabelProps: { shrink: true }, type: 'date', value: this.state.data.date, onChange: function (event) { _this.onChanges(event); _this.isValidDate(event.target.value); }, name: 'date', className: 'input' })),
                    React.createElement("div", { className: 'chips' },
                        React.createElement("div", { className: 'label' },
                            React.createElement("span", null, "Time")),
                        React.createElement(core_1.Chip, { label: "5am - 9am", clickable: true, className: 'chip', onClick: function () { return _this.editTime(1); } }),
                        React.createElement(core_1.Chip, { label: "9am - 12am", clickable: true, className: 'chip', onClick: function () { return _this.editTime(2); } }),
                        React.createElement(core_1.Chip, { label: "12pm - 3pm", clickable: true, className: 'chip', onClick: function () { return _this.editTime(3); } }),
                        React.createElement(core_1.Chip, { label: "3pm - 6pm", clickable: true, className: 'chip', onClick: function () { return _this.editTime(4); } }),
                        React.createElement(core_1.Chip, { label: "6pm - 9pm", clickable: true, className: 'chip', onClick: function () { return _this.editTime(5); } })),
                    React.createElement("div", { className: 'nextButton' },
                        React.createElement(core_1.ButtonBase, { onClick: this.onSubmit }, "Next>>>")))),
            this.state.meta.viaPointComponent ?
                React.createElement(AddViaPointsView_1.default, null) :
                null));
    };
    return CreateRide;
}(React.Component));
exports.default = CreateRide;
//# sourceMappingURL=CreateRide.js.map