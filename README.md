![image info](https://miro.medium.com/max/879/1*zjbQKzeIt3UM1ezHkDvHNw.png)

# Install

cmd : npm i @nestjs/typeorm typeorm mysql mariadb

## Install Xampp for mysql

## App.Module.ts in imports

TypeOrmModule.forRoot({
type: 'mariadb',
host: 'localhost',
port: 3306,
username: 'root',
password: '',
database: 'nestDB',
autoLoadEntities: true,
synchronize: true
})
],
