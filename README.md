![image info](https://miro.medium.com/max/879/1*zjbQKzeIt3UM1ezHkDvHNw.png)

## Create Coffee Entity

```ts
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
```

## CoffeeModule Declare TypeOrmModule

```ts
@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
```

## InjectRepository in CoffeeService

```ts
constructor(
        @InjectRepository(Coffee) private coffeeRepo: Repository<Coffee>
    ) { }
```
