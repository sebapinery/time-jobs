import { Injectable } from '@nestjs/common';
import { CitiesRepository } from './cities.repository';
import { NewCityInputDTO } from './dto/NewCity.dto';
import { UpdateCityInputDTO } from './dto/UpdateCity.dto';
import { City } from './schemas/city.schema';

@Injectable()
export class CitiesService {
  constructor(private readonly citiesRepository: CitiesRepository) {}

  async getCityByName(cityName: string): Promise<any> {
    return this.citiesRepository.findOne({ cityName });
  }

  async createCity(newCity: NewCityInputDTO): Promise<City> {
    return this.citiesRepository.create({
      cityName: newCity.cityName,
      currentTemperature: newCity.currentTemperature,
    });
  }

  async updateCity(_id: string, cityUpdate: UpdateCityInputDTO): Promise<City> {
    return this.citiesRepository.findOneAndUpdate({ _id }, cityUpdate);
  }

  normalizeCityName(cityName: string): string {
    return cityName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
