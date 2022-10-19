import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from './coffee.entity';

@Entity() // create sql table name like the class name in lowercase
export class Flavor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @JoinTable()
    @ManyToMany(
        type => Coffee,
        coffee => coffee.flavors
    )
    coffees: Coffee[];
}