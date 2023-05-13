import { Module } from '@nestjs/common';

import providers from '@/src/database/database.providers';

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule { }