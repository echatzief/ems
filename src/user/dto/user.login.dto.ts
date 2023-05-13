import { IsString, IsNotEmpty, IsOptional } from 'class-validator';


export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}