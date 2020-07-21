"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginMeta = /** @class */ (function () {
    function LoginMeta() {
        this.userNameError = 'Required';
        this.passwordError = 'Required';
        this.displaySpan = 'none';
        this.passwordType = true;
        this.errorDisaplyOnSubmit = true;
        this.wrongPasswordError = false;
        this.serverError = false;
    }
    return LoginMeta;
}());
exports.LoginMeta = LoginMeta;
var SignUpMeta = /** @class */ (function () {
    function SignUpMeta() {
        this.nameError = '';
        this.mobileError = '';
        this.userNameError = '';
        this.addressError = '';
        this.drivingLicenceError = '';
        this.emailError = '';
        this.passwordError = '';
        this.passwordMatchError = '';
        this.passwordType = true;
    }
    return SignUpMeta;
}());
exports.SignUpMeta = SignUpMeta;
//# sourceMappingURL=User.js.map