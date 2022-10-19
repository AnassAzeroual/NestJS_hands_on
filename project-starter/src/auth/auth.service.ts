import { AuthDto } from './../dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'entities/auth.entity';
import { Repository } from 'typeorm';
import { jwtPayload } from './jwt-payload-interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth) private authRepo: Repository<Auth>,
        private srvJWT: JwtService
    ) { }

    async login(body: AuthDto) {
        const check = await this.authRepo.count({ where: { login: body.login, password: body.password } });
        if (check != 1) {
            throw new UnauthorizedException('Invalid Credentials!')
        }
        const payload: jwtPayload = { login: body.login, password: body.password }
        const accessToken = await this.srvJWT.sign(payload)
        return { accessToken }
    }
}
