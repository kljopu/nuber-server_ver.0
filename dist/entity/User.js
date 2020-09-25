"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = require("bcrypt");
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var BCRYPT_ROUNDS = 10;
var User = /** @class */ (function () {
    function User() {
    }
    Object.defineProperty(User.prototype, "fullName", {
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.hashPassword = function (password) {
        return bcrypt_1.default.hash(password, BCRYPT_ROUNDS);
    };
    User.prototype.comparePassword = function (password) {
        return bcrypt_1.default.compare(password, this.password);
    };
    User.prototype.savePassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hashPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.password) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.hashPassword(this.password)];
                    case 1:
                        hashPassword = _a.sent();
                        this.password = hashPassword;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({
            type: "boolean",
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "verifiedEmail", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column({ type: "int" }),
        __metadata("design:type", Number)
    ], User.prototype, "age", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], User.prototype, "phoneNumber", void 0);
    __decorate([
        typeorm_1.Column({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "verifiedPhoneNumber", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], User.prototype, "profilePhoto", void 0);
    __decorate([
        typeorm_1.Column({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], User.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isDriving", void 0);
    __decorate([
        typeorm_1.Column({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isRiding", void 0);
    __decorate([
        typeorm_1.Column({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isTaken", void 0);
    __decorate([
        typeorm_1.Column({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], User.prototype, "lastLng", void 0);
    __decorate([
        typeorm_1.Column({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], User.prototype, "lastLat", void 0);
    __decorate([
        typeorm_1.Column({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], User.prototype, "lastOrientation", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "savePassword", null);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map