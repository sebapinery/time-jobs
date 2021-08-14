import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:pass12345@mongodb:27017/clim-app?authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
