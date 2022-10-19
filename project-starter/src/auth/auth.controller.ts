import { AuthDto } from './../dto/auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private srv: AuthService) { }
    @Post()
    login(@Body() body: AuthDto) {
        return this.srv.login(body)
    }
}
