import { Flavor } from './../../entities/flavor.entity';
import { IsString } from "class-validator";

export class CreateCoffeeDto {
    @IsString()
    name: string;

    @IsString()
    brand: string;

    @IsString({ each: true })
    flavors: string[];
}
