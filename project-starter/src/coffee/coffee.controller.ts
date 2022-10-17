import { UpdateCoffeeDto } from './../dto/update-coffee.dto';
import { CreateCoffeeDto } from './../dto/create-coffee.dto';
import { Coffee } from './../../entities/coffee.entitie';
import { CoffeeService } from './coffee.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {
    constructor(private srv: CoffeeService) { }
    @Get()
    get() {
        return this.srv.findAll();
    }

    @Post()
    create(@Body() body: CreateCoffeeDto) {
        return this.srv.create(body)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: UpdateCoffeeDto) {
        console.log(typeof id);

        return body
    }

    @Delete(':id')
    delete(@Param('id') id) {
        return this.srv.delete(id)
    }
}
