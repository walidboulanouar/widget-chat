import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerificationEmailDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    @IsString()
    @IsNumber()
    code: number;
}