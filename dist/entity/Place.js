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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Place = /** @class */ (function (_super) {
    __extends(Place, _super);
    function Place() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Place.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Place.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], Place.prototype, "lat", void 0);
    __decorate([
        typeorm_1.Column({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], Place.prototype, "lng", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Place.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], Place.prototype, "isFavorite", void 0);
    __decorate([
        typeorm_1.Column({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Place.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Place.prototype, "updatedAt", void 0);
    Place = __decorate([
        typeorm_1.Entity()
    ], Place);
    return Place;
}(typeorm_1.BaseEntity));
exports.default = Place;
//# sourceMappingURL=Place.js.map