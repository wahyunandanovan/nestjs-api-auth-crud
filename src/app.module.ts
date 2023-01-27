import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { ImageModule } from './modules/image/image.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { AppController } from './app.controller';
import { SalesModule } from './modules/sales/sales.module';
import { CategoryModule } from './modules/category/category.module';
import { SuppliersModule } from './modules/supplier/supplier.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    MulterModule.register({}),
    // ImageModule,
    UserModule,
    AuthModule,
    ProductsModule,
    PurchasesModule,
    SalesModule,
    CategoryModule,
    SuppliersModule,
    CustomersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
