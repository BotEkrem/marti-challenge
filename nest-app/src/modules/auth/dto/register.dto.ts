import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from '@/src/misc/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @Match('password', { message: 'Passwords must be matched.' })
  @IsNotEmpty()
  confirmPassword: string;
}
