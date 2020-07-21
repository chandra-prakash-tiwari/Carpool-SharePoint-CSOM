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
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
require("../../../css/book-a-ride.css");
var ToggleOn_1 = require("@material-ui/icons/ToggleOn");
var ToggleOff_1 = require("@material-ui/icons/ToggleOff");
var Booking_1 = require("../../../Classes/DataClasses/Booking");
var Booking_2 = require("../../../Classes/MetaClasses/Booking");
var CityService_1 = require("../../../Services/CityService");
var BookARideProps = /** @class */ (function () {
    function BookARideProps() {
        this.data = new Booking_1.Booking();
        this.meta = new Booking_2.BookARideMeta();
    }
    return BookARideProps;
}());
exports.BookARideProps = BookARideProps;
var BookaRide = /** @class */ (function (_super) {
    __extends(BookaRide, _super);
    function BookaRide(props) {
        var _this = _super.call(this, props) || this;
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
        _this.onSubmit = function (event) {
            event.preventDefault();
            if (!_this.isValidFromCityName(_this.state.data.from) && !_this.isValidToCityName(_this.state.data.to) && !_this.isValidDate(_this.state.data.date)) {
                console.log(_this.state.data);
                localStorage.setItem('bookingSearch', JSON.stringify(_this.state.data));
                window.location.pathname = '/booking/search';
            }
        };
        _this.state = new BookARideProps();
        return _this;
    }
    BookaRide.prototype.isEmpty = function (value) {
        return !value || (value && value.trim().length === 0);
    };
    BookaRide.prototype.isValidFromCityName = function (value) {
        var emptyStatus = this.isEmpty(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { fromError: emptyStatus ? 'Please enter source city name' : '' }) });
        return emptyStatus;
    };
    BookaRide.prototype.isValidToCityName = function (value) {
        var emptyStatus = this.isEmpty(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { fromError: emptyStatus ? 'Please enter destination city name' : '' }) });
        return emptyStatus;
    };
    BookaRide.prototype.isValidDate = function (value) {
        var emptyStatus = this.isEmpty(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { fromError: emptyStatus ? 'Please enter date' : '' }) });
        return emptyStatus;
    };
    BookaRide.prototype.render = function () {
        var _this = this;
        return (React.createElement(core_1.Grid, { md: 12, item: true, className: 'booking-a-ride' },
            React.createElement("form", { className: 'journey-details' },
                React.createElement("div", { className: 'header' },
                    React.createElement("div", { className: 'head' },
                        React.createElement("h1", null, "Book a Ride"),
                        React.createElement(core_1.ButtonBase, { onClick: function () { return _this.setState({ meta: __assign(__assign({}, _this.state.meta), { switch: !_this.state.meta.switch }) }); }, style: { marginLeft: '5rem' } }, this.state.meta.switch ? React.createElement(ToggleOn_1.default, { className: 'switch', style: { color: '#ac4fff' } }) : React.createElement(ToggleOff_1.default, { className: 'switch', style: { color: '#ffac19' } }))),
                    React.createElement("p", null, "we get you the matches asap!")),
                React.createElement(core_1.Tooltip, { title: this.state.meta.fromError, placement: 'right' },
                    React.createElement(Autocomplete_1.default, { options: CityService_1.CityService.getValidCity(this.state.data.from).map(function (option) { return option.city; }), onChange: function (event, newInputvalue) { _this.onSelect(newInputvalue, 'from'); }, renderInput: function (param) { return (React.createElement(core_1.TextField, __assign({}, param, { label: "From", style: { width: '85%', marginBottom: '6%' }, InputLabelProps: { shrink: true }, type: 'text', value: _this.state.data.from, onChange: function (event) { _this.onChanges(event); _this.isValidFromCityName(event.target.value); }, name: 'from', className: 'input' }))); } })),
                React.createElement(core_1.Tooltip, { title: this.state.meta.toError, placement: 'right' },
                    React.createElement(Autocomplete_1.default, { freeSolo: true, options: CityService_1.CityService.getValidCity(this.state.data.to).map(function (option) { return option.city; }), onChange: function (event, newInputvalue) { _this.onSelect(newInputvalue, 'to'); }, renderInput: function (param) { return (React.createElement(core_1.TextField, __assign({}, param, { label: "To", style: { width: '85%', marginBottom: '6%' }, InputLabelProps: { shrink: true }, type: 'text', value: _this.state.data.to, onChange: function (event) { _this.onChanges(event); _this.isValidToCityName(event.target.value); }, name: 'to', className: 'input ', helperText: _this.state.meta.toError }))); } })),
                React.createElement(core_1.TextField, { label: "Date", style: { width: '85%', marginBottom: '6%' }, InputLabelProps: { shrink: true }, type: 'date', value: this.state.data.date, onChange: function (event) { _this.onChanges(event); _this.isValidDate(event.target.value); }, name: 'date', className: 'input', helperText: this.state.meta.dateError }),
                React.createElement("div", { className: 'chips' },
                    React.createElement("div", { className: 'label' },
                        React.createElement("span", null, "Time")),
                    React.createElement(core_1.Chip, { label: "5am - 9am", clickable: true, className: 'chip' }),
                    React.createElement(core_1.Chip, { label: "9am - 12am", clickable: true, className: 'chip' }),
                    React.createElement(core_1.Chip, { label: "12pm - 3pm", clickable: true, className: 'chip' }),
                    React.createElement(core_1.Chip, { label: "3pm - 6pm", clickable: true, className: 'chip' }),
                    React.createElement(core_1.Chip, { label: "6pm - 9pm", clickable: true, className: 'chip' })),
                React.createElement("button", { type: 'submit', onClick: function (event) { return _this.onSubmit(event); }, className: 'submitButton' },
                    React.createElement("span", null, "Submit")))));
    };
    return BookaRide;
}(React.Component));
exports.default = BookaRide;
//# sourceMappingURL=BookaRide.js.map