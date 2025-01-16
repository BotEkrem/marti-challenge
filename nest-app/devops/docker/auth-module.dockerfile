FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

# Deleting all modules
COPY . .
RUN rm -rf ./src/modules

# Create new modules folder
RUN mkdir ./src/modules
COPY ./src/modules/auth ./src/modules/auth

# Modify app.module

RUN echo "import { Module } from '@nestjs/common'; \\n\
          import { AppController } from './app.controller'; \\n\
          import { AppService } from './app.service'; \\n\
          import { ConfigModule, ConfigService } from '@nestjs/config'; \\n\
          import { AuthModule } from './modules/auth/auth.module'; \\n\
          import { TypeOrmModule } from '@nestjs/typeorm'; \\n\
\\n\
          @Module({ \\n\
            imports: [ \\n\
              ConfigModule.forRoot({ isGlobal: true }),\\n\
              TypeOrmModule.forRootAsync({\\n\
                imports: [ConfigModule],\\n\
                useFactory: async (configService) => ({\\n\
                  type: 'postgres',\\n\
                  host: configService.get('DB_HOST'),\\n\
                  port: configService.get('DB_PORT'),\\n\
                  username: configService.get('DB_USERNAME'),\\n\
                  password: configService.get('DB_PASSWORD'),\\n\
                  database: configService.get('DB_NAME'),\\n\
                  synchronize: true,\\n\
                  logging: true,\\n\
                  entities: ['dist/**/*.entity.js'],\\n\
                }),\\n\
                inject: [ConfigService],\\n\
              }),\\n\
\\n\
              AuthModule,\\n\
            ],\\n\
            controllers: [AppController],\\n\
            providers: [AppService],\\n\
          })\\n\
          export class AppModule {}" > ./src/app.module.ts

RUN npm run build

CMD ["node", "dist/main.js"]

EXPOSE 3002