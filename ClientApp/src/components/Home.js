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
require("../css/home.css");
require("../css/add-new-car.css");
var UserService_1 = require("../Services/UserService");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return (React.createElement("div", { className: "home" },
            React.createElement("div", { className: 'welcome' },
                React.createElement("p", null,
                    "Hey ",
                    UserService_1.default.currentUser.name.split(' ')[0],
                    "!")),
            React.createElement("div", { className: 'cards' },
                React.createElement(core_1.ButtonBase, { href: '/booking' },
                    React.createElement(core_1.Card, { className: 'ride' },
                        React.createElement(core_1.CardContent, null,
                            React.createElement(core_1.Typography, { className: 'cards-element', component: 'h1', variant: 'h5' }, "Book a ride ")))),
                React.createElement(core_1.ButtonBase, { href: '/car' },
                    React.createElement(core_1.Card, { className: 'booking' },
                        React.createElement(core_1.CardContent, null,
                            React.createElement(core_1.Typography, { className: 'cards-element', component: 'h1', variant: 'h5' }, "Offer a ride ")))))));
    };
    return Home;
}(React.Component));
exports.default = Home;
//# sourceMappingURL=Home.js.map