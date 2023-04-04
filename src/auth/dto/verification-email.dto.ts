import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerificationEmailDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

}