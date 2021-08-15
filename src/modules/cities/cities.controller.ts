import { Get } from '@nestjs/common';
import { Controller, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { NewCityInputDTO } from './dto/NewCity.dto';
import { UpdateCityInputDTO } from './dto/UpdateCity.dto';
import { OpenWeatherService } from './open-weather/open-weather.service';
import { City } from './schemas/city.schema';
import * as dayjs from 'dayjs';

@Controller('cities')
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly openWheatherService: OpenWeatherService,
  ) {}

  @Get()
  async getCityByName(@Query('cityName') cityName: string): Promise<City> {
    const cityNameNormalized = this.citiesService.normalizeCityName(cityName);
    // const cityNameNormalized = cityName
    //   .normalize('NFD')
    //   .replace(/[\u0300-\u036f]/g, '');
    const cityExistOnDb = await this.citiesService.getCityByName(
      cityNameNormalized,
    );
    const now = dayjs();

    if (!cityExistOnDb) {
      const cityForecastAPI =
        await this.openWheatherService.getForecastByCityName(
          cityNameNormalized,
        );

      const newCity: NewCityInputDTO = {
        cityName: this.citiesService.normalizeCityName(cityForecastAPI.name),
        currentTemperature: cityForecastAPI.main.temp,
      };

      const newCityCreated = await this.citiesService.createCity(newCity);
      return newCityCreated;
    } else if (dayjs(cityExistOnDb.updatedAt).diff(now, 'minutes') < -10) {
      const cityForecastAPI =
        await this.openWheatherService.getForecastByCityName(
          cityNameNormalized,
        );

      const temperatureUpdate: UpdateCityInputDTO = {
        currentTemperature: cityForecastAPI.main.temp,
      };
      return await this.citiesService.updateCity(
        cityExistOnDb._id,
        temperatureUpdate,
      );
    } else {
      return cityExistOnDb;
    }
  }
}
