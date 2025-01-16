import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(0)
  radius: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
}
