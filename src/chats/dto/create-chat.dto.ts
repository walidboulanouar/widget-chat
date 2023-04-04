import { Rate } from "@prisma/client";
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";

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

    @IsNotEmpty()
    @IsString()
    @IsIn(["Good","Bad","Normal"])
    rate:Rate;

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
