
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsPositive, IsIn, IsOptional } from 'class-validator';





export class AuthDtoSignUpDash {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @IsOptional()
    @IsString()
    fullName:string;


    @IsNotEmpty()
    @IsString()
    class:string;


    @IsNotEmpty()
    @IsString()
    level:string;
    

    @IsNotEmpty()
    @IsString()
    password: string;


}

export class AuthDtoSignInDash {
    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}

export class AuthDtoSignIn {
    @IsNotEmpty()
    @IsString()
    email: string;

   

    @IsNotEmpty()
    @IsString()
    password: string;


}
