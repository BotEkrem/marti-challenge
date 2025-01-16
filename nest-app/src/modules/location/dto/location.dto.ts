import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
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
}
