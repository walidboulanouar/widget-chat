import { ChatType, Rate } from "@prisma/client";
import {  IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateChatDto {
    @IsNotEmpty()
    @IsNumber()
    userId:number;
}

export class FeedbackDto {
    
    @IsNotEmpty()
    @IsNumber()
    chatId:number;


    @IsNotEmpty()
    @IsString()
    answer1:string;


    @IsNotEmpty()
    @IsString()
    answer2:string;

    @IsString()
    @IsOptional()
    answer3:string;


    @IsString()
    @IsOptional()
    answer4:string;


    @IsString()
    @IsOptional()
    answer5:string;

    @IsString()
    @IsOptional()
    answer6:string;
    @IsString()
    @IsOptional()
    answer7:string;
    
    
    @IsString()
    @IsOptional()
    answer8:string;

    @IsString()
    @IsOptional()
    answer9:string;

    @IsString()
    @IsOptional()
    answer10:string;


    @IsString()
    @IsOptional()
    answer11:string;

    @IsString()
    @IsOptional()
    answer12:string;

    @IsString()
    @IsOptional()
    answer13:string;



    @IsString()
    @IsOptional()
    answer14:string;



    @IsString()
    @IsOptional()
    answer15:string;
    @IsString()
    @IsOptional()
    answer16:string;

    @IsString()
    @IsOptional()
    answer17:string;

    @IsString()
    @IsOptional()
    answer18:string;


    
    @IsString()
    @IsOptional()
    answer19:string;

    @IsString()
    @IsOptional()
    answer20:string;

    @IsString()
    @IsOptional()
    answer21:string;


    @IsString()
    @IsOptional()
    answer22:string;

    @IsNotEmpty()
    @IsString()
    @IsIn(["Good","Bad","Normal"])
    rate:Rate;


    @IsOptional()
    @IsString()
    @IsIn(["Custom","Both","Menu"])
    chatType:ChatType;

}

export class PoolDto {
    @IsNotEmpty()
    @IsNumber()
    chatId:number;


    @IsNotEmpty()
    @IsString()
    answer1:string;


    @IsNotEmpty()
    @IsString()
    answer2:string;

    @IsString()
    @IsOptional()
    answer3:string;


    @IsString()
    @IsOptional()
    answer4:string;


    @IsString()
    @IsOptional()
    answer5:string;

    @IsString()
    @IsOptional()
    answer6:string;
    @IsString()
    @IsOptional()
    answer7:string;
    
    
    @IsString()
    @IsOptional()
    answer8:string;

    @IsString()
    @IsOptional()
    answer9:string;

    @IsString()
    @IsOptional()
    answer10:string;


    @IsString()
    @IsOptional()
    answer11:string;

    @IsString()
    @IsOptional()
    answer12:string;

    @IsString()
    @IsOptional()
    answer13:string;



    @IsString()
    @IsOptional()
    answer14:string;



    @IsString()
    @IsOptional()
    answer15:string;
    @IsString()
    @IsOptional()
    answer16:string;

    @IsString()
    @IsOptional()
    answer17:string;

    @IsString()
    @IsOptional()
    answer18:string;


    
    @IsString()
    @IsOptional()
    answer19:string;

    @IsString()
    @IsOptional()
    answer20:string;

    @IsString()
    @IsOptional()
    answer21:string;


    @IsString()
    @IsOptional()
    answer22:string;

}

export class ResponseDto {
    @IsNotEmpty()
    @IsNumber()
    userId:number;

    @IsNotEmpty()
    @IsNumber()
    chatId:number;

    @IsNotEmpty()
    @IsString()
    message:string;
}


