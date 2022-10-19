import { GetUser } from './../auth/get-user.decorator';
import { UpdateCoffeeDto } from './../dto/update-coffee.dto';
import { CreateCoffeeDto } from './../dto/create-coffee.dto';
import { CoffeeService } from './coffee.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('coffee')
export class CoffeeController {
    constructor(private srv: CoffeeService) { }
    @Get()
    @UseGuards(AuthGuard())
    get(@GetUser() user) {
        console.log(user)
        return this.srv.findAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.srv.findOneByID(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }))
    create(@Body() body: CreateCoffeeDto) {
        return this.srv.create(body)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: UpdateCoffeeDto) {
        return this.srv.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.srv.delete(id)
    }
}
