![image info](https://sethphat.com/wp-content/uploads/2020/04/063437b9ea.jpg)

# entities 
create folder named entites in root project
## class
``TS``
export class Coffee {
    id: number;
    name: string;
    brand: string;
    flavors: flavors[]
}

export class flavors {
    flavor: 'chocolate' | 'vanilla';
}