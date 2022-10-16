![image info](https://sethphat.com/wp-content/uploads/2020/04/063437b9ea.jpg)

# Main.ts

app.useGlobalPipes(new ValidationPipe());

## install

cmd : npm i class-validator class-transformer

## install packages types

cmd : npm i @nestjs/mapped-types

## add DTO (data transfer object)

cmd : nest g class dto/create-coffee.dto
cmd : nest g class dto/update-coffee.dto

## refacturing update coffee file (later)

import { CreateCoffeeDto } from './create-coffee.dto';
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) { }
