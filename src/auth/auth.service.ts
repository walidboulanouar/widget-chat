import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import {  AuthDtoSignInDash, AuthDtoSignUpDash } from './dto';

import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

import { JwtService } from '@nestjs/jwt';
import { retry } from 'rxjs';

const nodemailer= require("nodemailer");
const sendEmail= (toEmail:string,subject:string,body:string)=>{
  return new Promise((resolve,reject)=>{
    var transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'developer@big-bang.ae',
        pass:'mwkdhqwjkwpopmjb', //wwvgbfmevevvyxjt
      }
    })
    const mail_configs={
      from:'developer@big-bang.ae',
      to:toEmail,
      subject:subject,
      text:body,
    }

    
    transporter.sendMail(mail_configs,function(err,info){
      if(err){
       
        return reject({message:"An error has occured DURING execution"})
      }
     
      return resolve({message:'Email sent Succefully'})
    })

  });
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  

  // HELPERS
  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }


  async getTokens(
    userId: number,
    email: string,
    phone_num: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      await this.jwtService.signAsync(
        {
          sub: userId,
          email,
          phone_num,
        },
        {
          secret: 'at-secret key',
          expiresIn: 60 * 50,
        },
      ),
      await this.jwtService.signAsync(
        {
          sub: userId,
          email,
          phone_num,
        },
        {
          secret: 'rt-secret key',

          expiresIn: '10d',
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
      customer_id: userId,
    };
  }

  async getToken(
    userId: number,
    email: string,
    
  ) {
    const at =await this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret key',
          expiresIn: 60 * 50*50,
        },
      
    );
    return [at,userId];
  }
  
  //we give it the userid that we want to give a new rt and it assign a new hashedrt

  


  //auth for Dashboard 
  async signupUser(dto:AuthDtoSignUpDash) {
    const hash = await this.hashData(dto.password);


    const ExistCustomer =
      (await this.prisma.client.findUnique({
        where: {
          phone_number: dto.phone_number,
        },
      }));

    if (ExistCustomer)
      throw new ForbiddenException('phone number already exist');
    const newUser = await this.prisma.client.create({
      data: {
        email:dto.email,
        password: hash,
        phone_number:dto.phone_number,
        class:dto.class,
        level:dto.level,
      }
    });
    

    const token= await this.getToken(
      newUser.id,
      newUser.phone_number
    );
    
    return token;
  }

  async userDetails(id:number){
    const user = await this.prisma.client.findUnique({
      where: {
        id: id,
      },
      include:{
        Chat:true,
      }
    });

    if (!user) throw new ForbiddenException('user not found');

    return user;
  }

  async signinUser(dto: AuthDtoSignInDash) {

   
    const user = await this.prisma.client.findUnique({
      where: {
        phone_number: dto.phone_number,
      },
    });

    if (!user) throw new ForbiddenException('user not found');

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!passwordMatches) throw new ForbiddenException("password dosn't match");

    const token = await this.getToken(
      user.id,
      user.phone_number,
      
    );
    
    return token;
  }


  findAll() {
    return `This action returns all auth`;
  }
}
