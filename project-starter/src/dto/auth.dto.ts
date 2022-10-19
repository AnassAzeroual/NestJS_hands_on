import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @IsEmail()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
