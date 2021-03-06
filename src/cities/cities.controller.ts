import { Get } from '@nestjs/common';
import { Controller, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
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
    const cityExistOnDb = await this.citiesService.getCityByName(
      cityNameNormalized,
    );

    if (!cityExistOnDb) {
      const {
        name,
        main: { temp },
      } = await this.openWheatherService.getForecastByCityName(
        cityNameNormalized,
      );

      const newCityCreated = await this.citiesService.createCity({
        cityName: this.citiesService.normalizeCityName(name),
        currentTemperature: temp,
      });
      return newCityCreated;
    } else if (dayjs(cityExistOnDb.updatedAt).diff(dayjs(), 'minutes') <= -10) {
      const {
        main: { temp },
      } = await this.openWheatherService.getForecastByCityName(
        cityNameNormalized,
      );

      const temperatureUpdate: UpdateCityInputDTO = {
        currentTemperature: temp,
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
