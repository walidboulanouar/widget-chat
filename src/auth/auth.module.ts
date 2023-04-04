import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtJwtStrategy, RtJwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),

  ],
  controllers: [AuthController],
  providers: [AuthService,AtJwtStrategy,RtJwtStrategy]
})
export class AuthModule {}
 