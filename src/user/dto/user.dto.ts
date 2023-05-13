import { IsString, IsNotEmpty, IsOptional } from 'class-validator';


export class UserDto {

  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}