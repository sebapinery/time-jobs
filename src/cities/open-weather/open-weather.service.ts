import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenWeatherService {
  async getForecastByCityName(cityName: string): Promise<any> {
    const apiKey = process.env.OPENWEATHER_KEY;
    const { data } = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`,
        { headers: { 'Content-Type': 'application/json' } },
      )
      .catch((err) => {
        throw new HttpException('City not found', 404);
      });

    return data;
  }
}
