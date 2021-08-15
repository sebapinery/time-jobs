import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CitiesModule } from './modules/cities/cities.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.ME_CONFIG_MONGODB_ADMINUSERNAME}:${process.env.ME_CONFIG_MONGODB_ADMINPASSWORD}@${process.env.ME_CONFIG_MONGODB_SERVER}:${process.env.ME_CONFIG_MONGODB_PORT}/${process.env.ME_CONFIG_MONGODB_NAME}?authSource=admin`,
      {
        useFindAndModify: false,
        useNewUrlParser: true,
      },
    ),
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
