import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  telephone?: string;

  @IsInt()
  age: number;
}
