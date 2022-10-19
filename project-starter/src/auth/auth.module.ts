import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'entities/auth.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStartegy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "kksdnxjsqmsdkevvxxpmm%%SDECLDFQQSSDSAZZRRfr8rtf5z888",
      signOptions: {
        expiresIn: 100 // 10s 
      }
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStartegy,
  ],
  exports: [
    JwtStartegy,
    PassportModule
  ],
})
export class AuthModule { }
