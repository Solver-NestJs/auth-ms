import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;
}
