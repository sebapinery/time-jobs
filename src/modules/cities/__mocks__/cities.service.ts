import { cityStub } from '../test/stubs/city.stub';

export const CitiesService = jest.fn().mockReturnValue({
  getCityByName: jest.fn().mockReturnValue(cityStub()),
  createCity: jest.fn().mockReturnValue(cityStub()),
  updateCity: jest.fn().mockReturnValue(cityStub()),
});
