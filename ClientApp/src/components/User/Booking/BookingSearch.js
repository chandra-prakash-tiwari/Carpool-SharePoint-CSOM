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
var UserService_1 = require("../../../Services/UserService");
var core_2 = require("@material-ui/core");
var BookingService_1 = require("../../../Services/BookingService");
require("../../../css/booking-search.css");
var Response_1 = require("../Response");
require("../../../css/ride-details-dialog.css");
var RideService_1 = require("../../../Services/RideService");
var Bookings = /** @class */ (function () {
    function Bookings() {
        this.bookings = [];
        this.rides = null;
        this.bookingConfirm = false;
        this.serverError = false;
        this.noOffer = false;
        this.offer = true;
        this.requestSended = false;
        this.bookingDetailsDisplay = false;
        this.bookingDetails = null;
    }
    return Bookings;
}());
exports.Bookings = Bookings;
var BookingSearch = /** @class */ (function (_super) {
    __extends(BookingSearch, _super);
    function BookingSearch(props) {
        var _this = _super.call(this, props) || this;
        _this.timeEnum = { 1: '5am - 9am', 2: '9am - 12pm', 3: '12pm - 3pm', 4: '3pm - 6pm', 5: '6pm - 9pm' };
        _this.onSubmit = function (booking) {
            _this.setState({ bookingDetailsDisplay: true });
            RideService_1.default.getRideById(booking.id).then(function (response) {
                if (response !== undefined) {
                    _this.setState({ bookingDetailsDisplay: true });
                    _this.setState({ rides: response });
                }
            });
        };
        _this.onBookingConfirm = function () {
            _this.setState({ bookingDetailsDisplay: false });
            _this.setState({ offer: false });
            BookingService_1.default.addBookings(_this.state.rides).then(function (response) {
                if (response === 'Ok') {
                    _this.setState({ rides: null });
                    _this.setState({ requestSended: true });
                    localStorage.removeItem('bookingSearch');
                }
                else if (response === 'serverError') {
                    _this.setState({ serverError: true });
                }
            });
        };
        _this.onBookingCancel = function () {
            _this.setState({ bookingDetailsDisplay: false });
        };
        _this.state = new Bookings();
        return _this;
    }
    BookingSearch.prototype.componentDidMount = function () {
        var _this = this;
        var bookingSearch = localStorage.getItem('bookingSearch');
        if (bookingSearch === null)
            return;
        BookingService_1.default.searchRide(JSON.parse(bookingSearch)).then(function (searchBooking) {
            if (searchBooking !== undefined && searchBooking !== 'serverError')
                _this.setState({ bookings: searchBooking });
            else if (searchBooking === 'serverError') {
                _this.setState({ offer: false });
                _this.setState({ serverError: true });
            }
        });
    };
    BookingSearch.prototype.userDetails = function (id) {
        return UserService_1.default.getUser(id).then(function (user) { return user; });
    };
    BookingSearch.prototype.render = function () {
        var _this = this;
        var Bookings = this.state.bookings != null ?
            this.state.bookings.length > 0 ? (this.state.bookings.map(function (booking, i) { return (React.createElement(core_1.ButtonBase, { key: i, style: { margin: '1rem' }, onClick: function () { return _this.onSubmit(booking); } },
                React.createElement(core_1.Card, { className: 'bookings' },
                    React.createElement("div", { className: 'head' },
                        React.createElement(core_1.Grid, { item: true, md: 10 },
                            React.createElement("h1", null, " ")),
                        React.createElement(core_1.Grid, { item: true, md: 2 },
                            React.createElement(core_1.Avatar, null))),
                    React.createElement("div", { className: 'booking-line' },
                        React.createElement("div", { className: 'left' },
                            React.createElement("span", { className: 'label' }, "From"),
                            React.createElement("br", null),
                            React.createElement("span", null, booking.from)),
                        React.createElement("div", { className: 'right' },
                            React.createElement("span", { className: 'label' }, "To"),
                            React.createElement("br", null),
                            React.createElement("span", null, booking.to))),
                    React.createElement("div", { className: 'booking-line' },
                        React.createElement("div", { className: 'left' },
                            React.createElement("span", { className: 'label' }, "Date"),
                            React.createElement("br", null),
                            React.createElement("span", null, booking.travelDate.split('T')[0])),
                        React.createElement("div", { className: 'right' },
                            React.createElement("span", { className: 'label' }, "Time"),
                            React.createElement("br", null),
                            React.createElement("span", null, booking.time))),
                    React.createElement("div", { className: 'booking-line' },
                        React.createElement("div", { className: 'left' },
                            React.createElement("span", { className: 'label' }, "Price"),
                            React.createElement("br", null),
                            React.createElement("span", null, Math.round(booking.ratePerKM * booking.totalDistance))),
                        React.createElement("div", { className: 'right' },
                            React.createElement("span", { className: 'label' }, "Seat availabilty"),
                            React.createElement("br", null),
                            React.createElement("span", null, booking.availableSeats)))))); })) : (React.createElement("div", null,
                React.createElement("p", null, "Sorry no offer currently available "),
                React.createElement("p", null, "Better for next time"))) : null;
        var viaPoints = this.state.rides !== null ?
            ((JSON.parse(this.state.rides.viaPoints)).map(function (viacity, i) { return (React.createElement("p", { key: i, className: 'via-point' }, viacity.city)); })) : null;
        var dialog = (this.state.bookingDetailsDisplay && this.state.rides !== null) ? (React.createElement(core_2.Dialog, { fullScreen: true, open: this.state.bookingDetailsDisplay, className: 'dialog' },
            React.createElement("div", { className: 'content' },
                React.createElement("p", { className: 'left' }, "From"),
                React.createElement("p", { className: 'right' }, this.state.rides.from)),
            React.createElement("div", { className: 'content' },
                React.createElement("p", { className: 'left' }, "To"),
                React.createElement("p", { className: 'right' }, this.state.rides.to)),
            React.createElement("div", { className: 'content' },
                React.createElement("p", { className: 'left' }, "Date"),
                React.createElement("p", { className: 'right' }, this.state.rides.travelDate)),
            React.createElement("div", { className: 'content' },
                React.createElement("p", { className: 'left' }, "Available Seats "),
                React.createElement("p", { className: 'right' }, this.state.rides.availableSeats)),
            React.createElement("div", { className: 'content' },
                React.createElement("p", { className: 'left' }, "Time"),
                React.createElement("p", { className: 'right' }, this.state.rides.time)),
            React.createElement("div", { className: 'content' },
                React.createElement("p", { className: 'left' }, "Via Points"),
                viaPoints),
            React.createElement("div", null,
                React.createElement("button", { className: 'submit', onClick: this.onBookingConfirm }, "Submit"),
                React.createElement("button", { className: 'cancel', onClick: this.onBookingCancel }, "Cancel")))) : null;
        return (this.state.offer ?
            React.createElement("div", { className: 'bookingsearches' },
                React.createElement("div", { className: 'header' },
                    React.createElement("p", null, "Your Matches")),
                React.createElement("div", { className: 'booking-search' }, Bookings),
                dialog) :
            (React.createElement("div", null,
                React.createElement("div", null, this.state.serverError ? React.createElement(Response_1.ServerError, null) : ''),
                React.createElement("div", null, this.state.requestSended ? React.createElement(Response_1.BookingRequest, null) : ''))));
    };
    return BookingSearch;
}(React.Component));
exports.default = BookingSearch;
//# sourceMappingURL=BookingSearch.js.map