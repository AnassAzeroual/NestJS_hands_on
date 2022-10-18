import { CreateCoffeeDto } from './../dto/create-coffee.dto';
import { Coffee } from './../../entities/coffee.entitie';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { UpdateCoffeeDto } from 'src/dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeeService {

    constructor(
        @InjectRepository(Coffee) private coffeeRepo: Repository<Coffee>
    ) { }

    findAll() {
        return this.coffeeRepo.find()
    }

    async findOneByID(id: number) {
        const coffee = await this.coffeeRepo.findOne({ where: { id: id } })
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} Not Found`)
        }
        return coffee
    }

    create(createCoffee: CreateCoffeeDto) {
        const coffee = this.coffeeRepo.create(createCoffee);
        return this.coffeeRepo.save(coffee)
    }

    async update(id: number, createCoffee: UpdateCoffeeDto) {
        let coffeeTemp = await this.coffeeRepo.preload({
            id: id,
            ...createCoffee
        });
        if (!coffeeTemp) {
            throw new NotFoundException(`Coffee #${id} Not Found`);
        }

        return this.coffeeRepo.save(coffeeTemp);
    }

    async delete(id: number) {
        const coffee = await this.findOneByID(id);
        return this.coffeeRepo.remove(coffee);
    }
}
