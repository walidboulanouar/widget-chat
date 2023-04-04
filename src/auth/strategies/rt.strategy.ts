import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, 'jwt_refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //by default false
      secretOrKey: 'rt-secret key',
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      refreshToken,
    }; // under the hood; req.user=payload
  }
}
