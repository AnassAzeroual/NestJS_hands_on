import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "entities/auth.entity";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { jwtPayload } from "./jwt-payload-interface";

export class JwtStartegy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(Auth) private repoAuth: Repository<Auth>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'kksdnxjsqmsdkevvxxpmm%%SDECLDFQQSSDSAZZRRfr8rtf5z888'
        });
    }

    validate(payload: jwtPayload): Promise<Auth> {
        const { login } = payload;
        const user = this.repoAuth.findOne({ where: { login } })

        if (!user) throw new UnauthorizedException()
        return user
    }
} 