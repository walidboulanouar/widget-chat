import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload ={
  sub: string;
  email: string;
};

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, 'jwt_access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //by default false
      secretOrKey: 'at-secret key',
    });
  }
  validate(payload: JwtPayload) {
    return payload; // under the hood; req.user=payload
  }
}
