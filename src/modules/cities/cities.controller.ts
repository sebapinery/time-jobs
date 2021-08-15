import { Get } from '@nestjs/common';
import { Controller, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { NewCityInputDTO } from './dto/NewCity.dto';
import { UpdateCityInputDTO } from './dto/UpdateCity.dto';
import { OpenWeatherService } from './open-weather/open-weather.service';
import { City } from './schemas/city,schema';
import * as dayjs from 'dayjs';

@Controller('cities')
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly openWheatherService: OpenWeatherService,
  ) {}

  @Get()
  async getCityByName(@Query('cityName') cityName: string): Promise<City> {
    const cityExistOnDb = await this.citiesService.getCityByName(cityName);
    const now = dayjs();

    if (!cityExistOnDb) {
      const cityForecastAPI =
        await this.openWheatherService.getForecastByCityName(cityName);

      const newCity: NewCityInputDTO = {
        cityName: cityForecastAPI.name,
        currentTemperature: cityForecastAPI.main.temp,
      };

      const newCityCreated = await this.citiesService.createCity(newCity);
      return newCityCreated;
    } else if (dayjs(cityExistOnDb.updatedAt).diff(now, 'minutes') < -10) {
      const cityForecastAPI =
        await this.openWheatherService.getForecastByCityName(cityName);

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

  // @Get()
  // async getCities(): Promise<City[]> {
  //   return this.citiesService.getCities();
  // }

  // @Post()
  // async createCity(@Body() newCity: NewCityInputDTO): Promise<City> {
  //   return this.citiesService.createCity(newCity);
  // }
  // @Patch()
  // async updateCity(
  //   @Query('cityName') cityName: string,
  //   @Body() updateCity: UpdateCityInputDTO,
  // ): Promise<City> {
  //   return this.citiesService.updateCity(cityName, updateCity);
  // }
}
