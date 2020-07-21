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
var BookingService_1 = require("../../../Services/BookingService");
require("../../../css/my-bookings.css");
var Response_1 = require("../Response");
var Bookings = /** @class */ (function () {
    function Bookings() {
        this.bookings = [];
        this.serverError = false;
    }
    return Bookings;
}());
exports.Bookings = Bookings;
var MyBookings = /** @class */ (function (_super) {
    __extends(MyBookings, _super);
    function MyBookings(props) {
        var _this = _super.call(this, props) || this;
        _this.state = new Bookings();
        return _this;
    }
    MyBookings.prototype.componentDidMount = function () {
        var _this = this;
        BookingService_1.default.myBookings().then(function (response) {
            console.log(response);
            if (response === 'serverError') {
                _this.setState({ serverError: true });
            }
            if (response !== undefined && response !== 'serverError')
                _this.setState({ bookings: response });
        });
    };
    MyBookings.prototype.render = function () {
        var BookingsDetails = this.state.bookings.length > 0 ? (this.state.bookings.map(function (booking, i) { return (React.createElement("div", { key: i, style: { margin: '1rem 4rem' } },
            React.createElement(core_1.Card, { className: 'bookings' },
                React.createElement("div", { className: 'head' },
                    React.createElement(core_1.Grid, { item: true, md: 10 },
                        React.createElement("h4", null, " ")),
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
                        React.createElement("span", null, booking.travelDate.split('T')[1]))),
                React.createElement("div", { className: 'booking-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "Price"),
                        React.createElement("br", null),
                        React.createElement("span", null, booking.ratePerKM)))))); })) : (React.createElement("p", { className: 'no-bookings' }, "you have not booked any offer"));
        return (!this.state.serverError ?
            React.createElement("div", { className: 'my-bookings' },
                React.createElement("div", { className: 'head-card' },
                    React.createElement(core_1.Card, { className: 'header' }, "Booked rides")),
                React.createElement("div", { className: 'all-bookings' }, BookingsDetails)) : (React.createElement(Response_1.ServerError, null)));
    };
    return MyBookings;
}(React.Component));
exports.default = MyBookings;
//# sourceMappingURL=MyBooking.js.map