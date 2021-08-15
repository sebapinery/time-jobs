import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schemas/city,schema';
import { CitiesRepository } from './cities.repository';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { OpenWeatherService } from './open-weather/open-weather.service';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [CitiesRepository, CitiesService, OpenWeatherService],
  exports: [],
  controllers: [CitiesController],
})
export class CitiesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({});
    consumer
      .apply(ResponseTimeMiddleware)
      .forRoutes({ path: 'cities', method: RequestMethod.GET });
  }
}
