import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { City, CityDocument } from './schemas/city,schema';

@Injectable()
export class CitiesRepository {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async findOne(cityFilterQuery: FilterQuery<City>): Promise<City> {
    return this.cityModel.findOne(cityFilterQuery, {}, { timestamps: true });
  }

  async create(city: City): Promise<City> {
    const newCity = new this.cityModel(city);
    return newCity.save();
  }

  async findOneAndUpdate(
    cityFilterQuery: FilterQuery<City>,
    city: Partial<City>,
  ): Promise<City> {
    return this.cityModel.findByIdAndUpdate(cityFilterQuery, city, {
      new: true,
    });
  }
}
