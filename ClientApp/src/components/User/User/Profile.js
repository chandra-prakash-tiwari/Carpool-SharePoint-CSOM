"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Button_1 = require("@material-ui/core/Button");
var Menu_1 = require("@material-ui/core/Menu");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var UserService_1 = require("../../../Services/UserService");
var core_1 = require("@material-ui/core");
function Profile() {
    var _a = React.useState(null), close = _a[0], open = _a[1];
    var onClicked = function (event) {
        open(event.currentTarget);
    };
    var profile = function () {
        window.location.pathname = '/profile';
    };
    var myRides = function () {
        window.location.pathname = '/myride';
    };
    var logout = function () {
        UserService_1.default.logout();
        window.location.pathname = '/login';
    };
    var home = function () {
        window.location.pathname = '/home';
    };
    return (React.createElement("div", { className: 'Avatar' },
        React.createElement(Button_1.default, { "aria-controls": "menu", onClick: onClicked, style: { margin: "0px 4px" } },
            React.createElement("p", { style: { margin: '5px', fontFamily: 'Roboto', fontSize: '1.2rem', textTransform: "capitalize" } }, UserService_1.default.currentUser.name),
            React.createElement(core_1.Avatar, null)),
        React.createElement(Menu_1.default, { id: "menu", anchorEl: close, open: Boolean(close) },
            React.createElement(MenuItem_1.default, { onClick: profile }, "Profile"),
            React.createElement(MenuItem_1.default, { onClick: myRides }, "My Rides"),
            React.createElement(MenuItem_1.default, { onClick: logout }, "Logout")),
        React.createElement(core_1.ButtonBase, { style: { height: '2.8rem', width: '2rem' } },
            React.createElement(core_1.SvgIcon, { onClick: home },
                React.createElement("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" })))));
}
exports.default = Profile;
//# sourceMappingURL=Profile.js.map