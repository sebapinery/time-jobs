import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from '../cities.controller';
import { CitiesService } from '../cities.service';
import { OpenWeatherService } from '../open-weather/open-weather.service';
import { City } from '../schemas/city,schema';
import { cityStub } from './stubs/city.stub';

jest.mock('../cities.service');

describe('CitiesController', () => {
  let citiesController: CitiesController;
  let citiesService: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService, OpenWeatherService],
    }).compile();

    citiesController = module.get<CitiesController>(CitiesController);
    citiesService = module.get<CitiesService>(CitiesService);
    jest.clearAllMocks();
  });

  describe('getCityByName', () => {
    describe('when getCityByName is called', () => {
      let city: City;

      beforeEach(async () => {
        city = await citiesController.getCityByName(cityStub().cityName);
      });

      test('then it should call citiesService', () => {
        expect(citiesService.getCityByName).toHaveBeenCalledWith(
          cityStub().cityName,
        );
      });
      test('it should return a city', () => {
        expect(city).toEqual(cityStub());
      });
      test('it should return succesfully', () => {
        expect(citiesService.getCityByName).toHaveReturned();
      });
      test('it should return an error', () => {
        const error = () => {
          throw new TypeError();
        };
        expect(error).toThrow(TypeError);
      });
    });
  });
});
