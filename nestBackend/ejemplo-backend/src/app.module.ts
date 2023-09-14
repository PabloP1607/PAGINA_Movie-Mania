import { Module } from '@nestjs/common';

import { ClientModule } from './client/client.module';
import { ClientService } from './client/client.service';

@Module({
  imports: [ClientModule],
  controllers: [],
  providers: [ClientService],
})
export class AppModule {}
