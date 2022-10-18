import { UpdateCoffeeDto } from './../dto/update-coffee.dto';
import { CreateCoffeeDto } from './../dto/create-coffee.dto';
import { CoffeeService } from './coffee.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {
    constructor(private srv: CoffeeService) { }
    @Get()
    get() {
        return this.srv.findAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.srv.findOneByID(id);
    }

    @Post()
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
