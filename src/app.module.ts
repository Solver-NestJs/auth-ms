import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [AuthModule, RolesModule, NatsModule],
})
export class AppModule {}
