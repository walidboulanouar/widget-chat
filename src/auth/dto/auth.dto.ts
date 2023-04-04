
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsPositive, IsIn } from 'class-validator';





export class AuthDtoSignUpDash {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;


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
    @IsEmail()
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}

export class AuthDtoSignIn {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

   

    @IsNotEmpty()
    @IsString()
    password: string;


}
