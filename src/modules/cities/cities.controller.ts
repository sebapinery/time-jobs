import { Body, Get, Patch } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { NewCityInputDTO } from './dto/NewCity.dto';
import { UpdateCityInputDTO } from './dto/UpdateCity.dto';
import { City } from './schemas/city,schema';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async getCityByName(@Query('cityName') cityName: string): Promise<City> {
    console.log(cityName);
    return this.citiesService.getCityByName(cityName);
  }

  @Get()
  async getCities(): Promise<City[]> {
    return this.citiesService.getCities();
  }

  @Post()
  async createCity(@Body() newCity: NewCityInputDTO): Promise<City> {
    return this.citiesService.createCity(
      newCity.cityName,
      newCity.currentTemperature,
    );
  }
  @Patch()
  async updateCity(
    @Query('cityName') cityName: string,
    @Body() updateCity: UpdateCityInputDTO,
  ): Promise<City> {
    return this.citiesService.updateCity(cityName, updateCity);
  }
}
