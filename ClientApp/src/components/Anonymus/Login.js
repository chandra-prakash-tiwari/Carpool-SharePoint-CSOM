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
var TextField_1 = require("@material-ui/core/TextField");
var Link_1 = require("@material-ui/core/Link");
var Grid_1 = require("@material-ui/core/Grid");
var Typography_1 = require("@material-ui/core/Typography");
require("../../css/login-form.css");
var UserService_1 = require("../../Services/UserService");
var Visibility_1 = require("@material-ui/icons/Visibility");
var core_1 = require("@material-ui/core");
var VisibilityOff_1 = require("@material-ui/icons/VisibilityOff");
var User_1 = require("../../Classes/DataClasses/User");
var User_2 = require("../../Classes/MetaClasses/User");
var Response_1 = require("../User/Response");
var LoginProps = /** @class */ (function () {
    function LoginProps() {
        this.credentials = new User_1.LoginRequest();
        this.meta = new User_2.LoginMeta();
    }
    return LoginProps;
}());
exports.LoginProps = LoginProps;
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.onChanges = function (event) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), { credentials: __assign(__assign({}, _this.state.credentials), (_a = {}, _a[event.target.name] = event.target.value, _a)) }));
        };
        _this.onSubmit = function (event) {
            event.preventDefault();
            var isValid = _this.isValidUserName(_this.state.credentials.userName);
            isValid = isValid && _this.isValidPassword(_this.state.credentials.password);
            _this.setState(__assign(__assign({}, _this.state), { meta: __assign(__assign({}, _this.state.meta), { displaySpan: '' }) }));
            if (!isValid) {
                UserService_1.default.login(_this.state.credentials).then(function (value) {
                    if (value === 'ok')
                        window.location.pathname = '/home';
                    else if (value === 'wrong') {
                        _this.setState(__assign(__assign({}, _this.state), { meta: __assign(__assign({}, _this.state.meta), { wrongPasswordError: true }) }));
                    }
                    else if (value === 'servererror') {
                        _this.setState(__assign(__assign({}, _this.state), { meta: __assign(__assign({}, _this.state.meta), { serverError: true }) }));
                    }
                });
            }
        };
        _this.onChangePasswordType = function () {
            _this.state.meta.passwordType = !_this.state.meta.passwordType;
            _this.setState({ meta: _this.state.meta });
        };
        _this.state = new LoginProps();
        return _this;
    }
    Login.prototype.isEmpty = function (value) {
        return !value || (value && value.trim().length === 0);
    };
    Login.prototype.isValidUserName = function (value) {
        var emptyStatus = this.isEmpty(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { userNameError: emptyStatus ? "Please enter username or email address" : "" }) });
        return emptyStatus;
    };
    Login.prototype.isValidPassword = function (value) {
        var emptyStatus = this.isEmpty(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { passwordError: emptyStatus ? "Please enter password" : "" }) });
        this.setState({});
        return emptyStatus;
    };
    Login.prototype.render = function () {
        var _this = this;
        return (React.createElement(Grid_1.default, { item: true, xs: 12, sm: 8, md: 4 },
            React.createElement("div", { className: 'login' },
                React.createElement("div", { className: 'header' },
                    React.createElement(Typography_1.default, { component: "h1", variant: "h5", className: 'head' }, "Log In"),
                    React.createElement("div", { className: 'header-underline' })),
                React.createElement("form", { className: 'form' },
                    React.createElement(core_1.Tooltip, { title: this.state.meta.userNameError, placement: 'left' },
                        React.createElement(TextField_1.default, { variant: "filled", className: 'input', value: this.state.credentials.userName, onChange: function (event) { _this.onChanges(event); _this.isValidUserName(event.target.value); }, name: "userName", type: 'text', label: "Enter Email or UserName Id " })),
                    React.createElement("span", { style: { display: this.state.meta.displaySpan } }, this.state.meta.userNameError),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.passwordError, placement: 'left' },
                        React.createElement(TextField_1.default, { variant: "filled", className: 'input', value: this.state.credentials.password, onChange: function (event) { _this.onChanges(event); _this.isValidPassword(event.target.value); }, name: "password", type: this.state.meta.passwordType ? 'password' : 'text', label: "Enter Password", InputProps: {
                                endAdornment: (React.createElement(core_1.InputAdornment, { position: 'end', onClick: this.onChangePasswordType }, this.state.meta.passwordType ? React.createElement(Visibility_1.default, null) : React.createElement(VisibilityOff_1.default, null)))
                            } })),
                    React.createElement("span", { style: { display: this.state.meta.displaySpan } }, this.state.meta.passwordError),
                    this.state.meta.wrongPasswordError ? React.createElement(Response_1.WrongPassword, null) : '',
                    this.state.meta.serverError ? React.createElement(Response_1.ServerError, null) : '',
                    React.createElement("div", { className: 'submit' },
                        React.createElement("button", { type: "submit", onClick: this.onSubmit },
                            React.createElement("span", null, " Submit ")))),
                React.createElement("div", { className: 'footer' },
                    React.createElement("p", null, "Not a member yet ? "),
                    React.createElement("div", { className: 'link' },
                        React.createElement(Link_1.default, { href: "/signup" }, " SIGN UP"),
                        React.createElement("div", { className: 'footer-underline' }))))));
    };
    return Login;
}(React.Component));
exports.default = Login;
//# sourceMappingURL=Login.js.map