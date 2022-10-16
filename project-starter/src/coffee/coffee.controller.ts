import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {
    @Get()
    get(@Res() response)
    {
        response.status(200).send("Hello world")
    }
    
    @Get("flavors")
    @HttpCode(HttpStatus.OK)
    getFlavors()
    {
        return "flavors"
    }
}
