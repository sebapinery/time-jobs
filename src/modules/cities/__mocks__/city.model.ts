import { cityStub } from '../test/stubs/city.stub';

export class CityModelMock {
  constructor(private data) {}
  save = jest.fn().mockReturnValue(this.data);
  static findOne = jest.fn().mockReturnValue(cityStub());
  static create = jest.fn().mockReturnValue(cityStub());
}
