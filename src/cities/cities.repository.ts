import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { City, CityDocument } from './schemas/city.schema';

@Injectable()
export class CitiesRepository extends EntityRepository<CityDocument> {
  constructor(@InjectModel(City.name) cityModel: Model<CityDocument>) {
    super(cityModel);
  }
}
