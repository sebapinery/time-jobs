import { MockModel } from '../../../database/test/support/mock.model';
import { City } from '../../schemas/city.schema';
import { cityStub } from '../stubs/city.stub';

export class CityModel extends MockModel<City> {
  protected entityStub = cityStub();
}
