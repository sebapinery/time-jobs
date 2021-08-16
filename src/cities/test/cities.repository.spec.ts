import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { City } from '../schemas/city.schema';
import { CitiesRepository } from '../cities.repository';
import { cityStub } from './stubs/city.stub';
import { CityModel } from './support/city.model';

describe('citysRepository', () => {
  let citiesRepository: CitiesRepository;

  describe('find operations', () => {
    let cityModel: CityModel;
    let cityFilterQuery: FilterQuery<City>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          CitiesRepository,
          {
            provide: getModelToken(City.name),
            useClass: CityModel,
          },
        ],
      }).compile();

      citiesRepository = moduleRef.get<CitiesRepository>(CitiesRepository);
      cityModel = moduleRef.get<CityModel>(getModelToken(City.name));

      cityFilterQuery = {
        cityName: cityStub().cityName,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let city: City;

        beforeEach(async () => {
          jest.spyOn(cityModel, 'findOne');
          city = await citiesRepository.findOne(cityFilterQuery);
        });

        test('then it should call the cityModel', () => {
          expect(cityModel.findOne).toHaveBeenCalledWith(cityFilterQuery, {});
        });

        test('then it should return a city', () => {
          expect(city).toEqual(cityStub());
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let city: City;

        beforeEach(async () => {
          jest.spyOn(cityModel, 'findOneAndUpdate');
          city = await citiesRepository.findOneAndUpdate(
            cityFilterQuery,
            cityStub(),
          );
        });

        test('then it should call the cityModel', () => {
          expect(cityModel.findOneAndUpdate).toHaveBeenCalledWith(
            cityFilterQuery,
            cityStub(),
            { new: true },
          );
        });

        test('then it should return a city', () => {
          expect(city).toEqual(cityStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          CitiesRepository,
          {
            provide: getModelToken(City.name),
            useValue: CityModel,
          },
        ],
      }).compile();

      citiesRepository = moduleRef.get<CitiesRepository>(CitiesRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let city: City;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(CityModel.prototype, 'save');
          constructorSpy = jest.spyOn(CityModel.prototype, 'constructorSpy');
          city = await citiesRepository.create(cityStub());
        });

        test('then it should call the cityModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(cityStub());
        });

        test('then it should return a city', () => {
          expect(city).toEqual(cityStub());
        });
      });
    });
  });
});
