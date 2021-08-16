import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema({ timestamps: true })
export class City {
  @Prop()
  cityName: string;

  @Prop()
  currentTemperature: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
