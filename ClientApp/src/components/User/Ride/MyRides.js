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
require("../../../css/my-rides.css");
var RideService_1 = require("../../../Services/RideService");
var Response_1 = require("../Response");
var Rides = /** @class */ (function () {
    function Rides() {
        this.rides = [];
        this.noofSeat = 0;
        this.serverError = false;
    }
    return Rides;
}());
exports.Rides = Rides;
var Time;
(function (Time) {
    Time[Time["5am - 9am"] = 1] = "5am - 9am";
    Time[Time["9am - 12pm"] = 2] = "9am - 12pm";
    Time[Time["12pm - 3pm"] = 3] = "12pm - 3pm";
    Time[Time["3pm - 6pm"] = 4] = "3pm - 6pm";
    Time[Time["6pm - 9pm"] = 5] = "6pm - 9pm";
})(Time || (Time = {}));
var MyRides = /** @class */ (function (_super) {
    __extends(MyRides, _super);
    function MyRides(props) {
        var _this = _super.call(this, props) || this;
        _this.state = new Rides();
        return _this;
    }
    MyRides.prototype.componentDidMount = function () {
        var _this = this;
        RideService_1.default.allRides().then(function (response) {
            if (response !== undefined && response !== 'serverError') {
                _this.setState({ rides: response });
            }
            else if (response === 'serverError') {
                _this.setState({ serverError: true });
            }
        });
    };
    MyRides.prototype.render = function () {
        var RidesDetails = this.state.rides.length > 0 ? (this.state.rides.map(function (ride, i) { return (React.createElement("div", { key: i, style: { margin: '1rem 4rem' } },
            React.createElement(core_1.Card, { className: 'rides' },
                React.createElement("div", { className: 'head' },
                    React.createElement(core_1.Grid, { item: true, md: 10 },
                        React.createElement("h4", null, " ")),
                    React.createElement(core_1.Grid, { item: true, md: 2 },
                        React.createElement(core_1.Avatar, null))),
                React.createElement("div", { className: 'ride-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "From"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.from)),
                    React.createElement("div", { className: 'right' },
                        React.createElement("span", { className: 'label' }, "To"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.to))),
                React.createElement("div", { className: 'ride-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "Date"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.travelDate.split('T')[0])),
                    React.createElement("div", { className: 'right' },
                        React.createElement("span", { className: 'label' }, "Time"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.time))),
                React.createElement("div", { className: 'ride-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "Price(Per KM)"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.ratePerKM)),
                    React.createElement("div", { className: 'right' },
                        React.createElement("span", { className: 'label' }, "Available seats"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.availableSeats)))))); })) : (React.createElement("p", { className: 'no-bookings' }, "you have not created any ride offer"));
        return (!this.state.serverError ?
            React.createElement("div", { className: 'my-ride' },
                React.createElement("div", { className: 'head-card' },
                    React.createElement(core_1.Card, { className: 'header' }, "Offered rides")),
                React.createElement("div", { className: 'rides-cards' }, RidesDetails)) : React.createElement(Response_1.ServerError, null));
    };
    return MyRides;
}(React.Component));
exports.default = MyRides;
//# sourceMappingURL=MyRides.js.map