var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArrayMaxSize, IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
export class CreateTeamDto {
    username;
    password;
    members;
}
__decorate([
    IsString(),
    MinLength(3),
    MaxLength(20),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "username", void 0);
__decorate([
    IsString(),
    MinLength(3),
    MaxLength(30),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "password", void 0);
__decorate([
    IsArray(),
    IsString({ each: true }),
    ArrayMaxSize(3, { message: 'Um time pode ter no máximo 3 membros' }),
    __metadata("design:type", Array)
], CreateTeamDto.prototype, "members", void 0);
//# sourceMappingURL=create-team.dto.js.map