import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { EventsModule } from './events/events.module.js';
import { ManagersModule } from './managers/managers.module.js';
import { TeamsModule } from './teams/teams.module.js';
import { TasksModule } from './tasks/tasks.module.js';
import { ExampleModule } from './example/example.module.js';
import { AdminModule } from './managers/manager.module.js';
import { StudentsModule } from './students/students.module.js';
import { TeamsModule } from './teams/teams.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite' as const,
        database: config.get<string>('DATABASE_PATH') ?? 'backend.sqlite',
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret && process.env.NODE_ENV === 'production') {
          throw new Error('JWT_SECRET must be configured in production.');
        }
        return {
          secret: secret ?? 'local-development-secret-change-me',
          signOptions: { expiresIn: '15m' },
        };
      },
    }),
    AuthModule,
    EventsModule,
    ManagersModule,
    TeamsModule,
    TasksModule,
    ExampleModule,
    AdminModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
