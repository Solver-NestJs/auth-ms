import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsArray()
  @IsOptional()
  @Type(() => RoleUserDto)
  @ValidateNested({ each: true })
  roles: RoleUserDto[];
}

class RoleUserDto {
  @IsUUID()
  id: string;
}
