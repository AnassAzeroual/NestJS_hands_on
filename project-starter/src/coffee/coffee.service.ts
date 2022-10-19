import { CreateCoffeeDto } from './../dto/create-coffee.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCoffeeDto } from 'src/dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from 'entities/coffee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeeService {

    constructor(
        @InjectRepository(Coffee) private coffeeRepo: Repository<Coffee>
    ) { }

    findAll() {
        return this.coffeeRepo.find({
            relations: ['flavors']
        })
    }

    async findOneByID(id: number) {
        const coffee = await this.coffeeRepo.findOne({
            where: { id },
            relations: ['flavors']
        })
        if (!coffee) {
            throw new NotFoundException(`Coffee ID #${id} not found`)
        }
        return coffee
    }

    create(createCoffee: CreateCoffeeDto) {
        const coffee = this.coffeeRepo.create(createCoffee);
        return this.coffeeRepo.save(coffee)
    }

    async update(id: number, createCoffee: UpdateCoffeeDto) {
        let coffeeTemp = await this.coffeeRepo.preload({
            id: +id,
            ...createCoffee
        })
        if (!coffeeTemp) {
            throw new NotFoundException(`Coffee ID #${id} not found`)
        }
        return this.coffeeRepo.save(coffeeTemp)
    }

    async delete(id: number) {
        const coffeeTemp = await this.findOneByID(id)
        return this.coffeeRepo.remove(coffeeTemp)
    }
}
