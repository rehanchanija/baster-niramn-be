import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PanchayatService } from './panchayat.service';
import { PanchayatController } from './panchayat.controller';
import { Panchayat, PanchayatSchema } from './schemas/panchayat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Panchayat.name, schema: PanchayatSchema },
    ]),
  ],
  controllers: [PanchayatController],
  providers: [PanchayatService],
  exports: [PanchayatService],
})
export class PanchayatModule {}
