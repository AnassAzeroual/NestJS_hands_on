import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from 'entities/coffee.entity';
import { Flavor } from 'entities/flavor.entity';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [CoffeeController],
  providers: [CoffeeService]
})
export class CoffeeModule { }
