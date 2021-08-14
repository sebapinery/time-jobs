import { Injectable } from '@nestjs/common';
import { CitiesRepository } from './cities.repository';
import { UpdateCityInputDTO } from './dto/UpdateCity.dto';
import { City } from './schemas/city,schema';

@Injectable()
export class CitiesService {
  constructor(private readonly citiesRepository: CitiesRepository) {}

  async getCityByName(cityName: string): Promise<City> {
    return this.citiesRepository.findOne({ cityName });
  }

  async getCities(): Promise<City[]> {
    return this.citiesRepository.find({});
  }

  async createCity(
    cityName: string,
    currentTemperature: number,
  ): Promise<City> {
    return this.citiesRepository.create({ cityName, currentTemperature });
  }

  async updateCity(
    cityName: string,
    cityUpdate: UpdateCityInputDTO,
  ): Promise<City> {
    return this.citiesRepository.findOneAndUpdate({ cityName }, cityUpdate);
  }
}
