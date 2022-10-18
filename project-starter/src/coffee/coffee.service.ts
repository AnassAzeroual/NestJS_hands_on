import { CreateCoffeeDto } from './../dto/create-coffee.dto';
import { Coffee } from './../../entities/coffee.entitie';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CoffeeService {
    private coffeeData: CreateCoffeeDto[] = [
        {
            id: 1,
            name: "Shipwreck Roast",
            brand: "Buddy Brew",
            flavors: ["vanilla", "chocolate"]
        }
    ];

    findAll() {
        return this.coffeeData
    }

    findOneByID(id: number) {
        return this.coffeeData.find(c => c.id == id)
    }

    findOne(id: string) {
        return this.coffeeData.find(c => c.id == Number(id))
    }

    create(createCoffee: CreateCoffeeDto) {
        this.coffeeData.push(createCoffee);
        return this.coffeeData
    }

    update(id: number, createCoffee: Partial<Coffee>) {
        let coffeeTemp = this.coffeeData.find(v => v.id == id)
        if (coffeeTemp) {
            for (const coffee of this.coffeeData) {
                if (coffee.id == id) {
                    coffee.flavors = createCoffee.flavors
                    coffee.name = createCoffee.name
                    coffee.brand = createCoffee.brand
                }
            }
        } else {
            return new NotFoundException()
        }
        return this.coffeeData
    }

    delete(id: number) {
        this.coffeeData = this.coffeeData.filter(v => v.id !== Number(id))
        return this.coffeeData
    }
}
