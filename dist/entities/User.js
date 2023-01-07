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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Profile_1 = require("./Profile");
const Projects_1 = require("./Projects");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "text" }),
    __metadata("design:type", Date)
], User.prototype, "passwordResetExpires", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "emailResetToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "text" }),
    __metadata("design:type", Date)
], User.prototype, "emailResetExpires", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], User.prototype, "email_verificad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], User.prototype, "phone_verificad", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Profile_1.Profile, { eager: true, cascade: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Profile_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Projects_1.Projects, (project) => project.user),
    __metadata("design:type", Array)
], User.prototype, "projects", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
exports.User = User;
