import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { AuthService } from './auth.service';
import {  AuthDtoSignInDash, AuthDtoSignUpDash } from './dto/auth.dto';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // authService:AuthService constructor(authService: AuthService){ this.authService= authService}
  
  

  @Public()
  @Post("checkuser/:email")
  checkUser(@Param() email:string){

  }

  @Public()
  @Post("checkuser/:userid")
  checkUserById(){
    
  }

  // @Public()
  // @Post("SendEmail")
  // checkSend(@Body() verificationEmailDto:VerificationEmailDto ){
  //   return this.authService.sendEmail2(verificationEmailDto)
  // }





  




  //registre
  @Public()
  @Post('/user/register')
  @HttpCode(HttpStatus.CREATED)
  signupUser(@Body() dto: AuthDtoSignUpDash) {
    return this.authService.signupUser(dto);
  }

  

  //login
  

  @Public()
  @Post('/user/login')
  @HttpCode(HttpStatus.OK)
  signinUser(@Body() dto: AuthDtoSignInDash) {
    return this.authService.signinUser(dto);
  }

  @Public()
  @Get("user/details/:id")
  userDetails(@Param("id")  id:string){
    return this.authService.userDetails(+id)
  }


 
  
 
  // @Post('/user/logout')
  // @HttpCode(HttpStatus.OK)
  // logoutDash(@GetCurrentUserId() userId: number) {
  //   return this.authService.logoutDash(userId);
  // }


  // @Public()
  // @UseGuards(RtGuard)
  // @Post('/user/refresh')
  // @HttpCode(HttpStatus.OK)
  // refreshTokensDash(
  //   @GetCurrentUser('refreshToken') refreshToken: string,
  //   @GetCurrentUser('sub') Idcustomer: number,
  // ) {
  //   return this.authService.refreshTokensDash(Idcustomer, refreshToken);
  // }
}
