import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CitiesRepository } from '../cities.repository';
import { NewCityInputDTO } from '../dto/NewCity.dto';
import { City } from '../schemas/city.schema';
import { cityStub } from './stubs/city.stub';
import { CityModelMock } from '../__mocks__/city.model';

describe('CityRepository', () => {
  let citiesRepository: CitiesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesRepository,
        {
          provide: getModelToken('City'),
          useValue: CityModelMock,
        },
      ],
    }).compile();

    citiesRepository = module.get<CitiesRepository>(CitiesRepository);
    jest.clearAllMocks();
  });
  describe('findOne city', () => {
    let city: City;

    beforeEach(async () => {
      city = await citiesRepository.findOne(cityStub().cityName);
    });
    test('should return a equal cityName', () => {
      expect(city.cityName).toEqual(cityStub().cityName);
    });
  });
  describe('create City', () => {
    let city: City;
    let newCityInputDTO: NewCityInputDTO;

    beforeEach(async () => {
      newCityInputDTO = {
        cityName: cityStub().cityName,
        currentTemperature: cityStub().currentTemperature,
      };
      city = await citiesRepository.create(newCityInputDTO);
    });
    test('then it should return a city', () => {
      expect(city).toEqual(cityStub());
    });
  });
});
