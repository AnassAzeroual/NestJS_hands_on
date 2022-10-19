![image info](https://miro.medium.com/max/879/1*zjbQKzeIt3UM1ezHkDvHNw.png)

## Install commands
```ts
npm i @nestjs/jwt @nestjs/passport passport passport-jwt
```
## Module Auth imports add
```ts
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "kksdnxjsqmsdkevvxxpmm%%SDECLDFQQSSDSAZZRRfr8rtf5z888",
      signOptions: {
        expiresIn: 3600
      }
    })
```

## Module Auth provides
```ts
  providers: [
    AuthService,
    JwtStartegy,
  ],
  exports: [
    JwtStartegy,
    PassportModule
  ],
```

## add file name jwt-payload-interface.ts in Auth folder
```ts
export interface jwtPayload {
    login: string,
    password: string
}
```

## add file name jwt.strategy.ts in Auth folder
```ts
export class JwtStartegy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(Auth) private repoAuth: Repository<Auth>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'kksdnxjsqmsdkevvxxpmm%%SDECLDFQQSSDSAZZRRfr8rtf5z888'
        });
    }

    validate(payload: jwtPayload): Promise<Auth> {
        const { login, password } = payload;
        const user = this.repoAuth.findOne({ where: { login, password } })

        if (!user) throw new UnauthorizedException()
        return user
    }
} 
```

## create auth service

```ts
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
```

## create auth controller
```ts
@Controller('auth')
export class AuthController {
    constructor(private srv: AuthService) { }
    @Post()
    login(@Body() body: AuthDto) {
        return this.srv.login(body)
    }
}
```

## add guard in controller
```ts
@Get()
    @UseGuards(AuthGuard())
    get() {
        return this.srv.findAll();
    }
```
