var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            TypeOrmModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    type: 'sqlite',
                    database: config.get('DATABASE_PATH') ?? 'backend.sqlite',
                    autoLoadEntities: true,
                    synchronize: config.get('NODE_ENV') !== 'production',
                }),
            }),
            JwtModule.registerAsync({
                global: true,
                inject: [ConfigService],
                useFactory: (config) => {
                    const secret = config.get('JWT_SECRET');
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
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map