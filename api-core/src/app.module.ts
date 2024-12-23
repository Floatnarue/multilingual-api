import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { LanguageModule } from './language/language.module';


@Module({
  imports: [DatabaseModule.forRoot(), ProductModule, LanguageModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
