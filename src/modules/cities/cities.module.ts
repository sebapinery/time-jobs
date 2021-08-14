import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schemas/city,schema';
import { CitiesRepository } from './cities.repository';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { OpenWeatherService } from './open-weather/open-weather.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [CitiesRepository, CitiesService, OpenWeatherService],
  exports: [],
  controllers: [CitiesController],
})
export class CitiesModule {}
