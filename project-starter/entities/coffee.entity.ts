import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // create sql table name like the class name in lowercase
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column("json", { nullable: true })
    flavors: string[];
}