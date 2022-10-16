import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env.dev' }), CoffeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
