import { City } from '../../schemas/city,schema';

export const cityStub = (): City => {
  return {
    cityName: 'Rosario',
    currentTemperature: 22.5,
  };
};
