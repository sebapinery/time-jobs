import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenWeatherService {
  async getForecastByCityName(cityName: string): Promise<any> {
    const apiKey = '9d572bdbde5fb9601ddb90ddc16a0053';
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`,
      { headers: { 'Content-Type': 'application/json' } },
    );
    return data;
  }
}
