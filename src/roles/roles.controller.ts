import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleServices: RolesService) {}

  @MessagePattern('role.create')
  async createRole(@Payload() createRoleDto: CreateRoleDto) {
    return this.roleServices.createRole(createRoleDto);
  }

  @MessagePattern('role.update')
  async updateRole(@Payload() updateRoleDto: UpdateRoleDto) {
    return this.roleServices.updateRole(updateRoleDto);
  }

  @MessagePattern('role.delete')
  async deleteRole(@Payload('id') id: string) {
    return this.roleServices.deleteRole(id);
  }

  @MessagePattern('role.findOne')
  async findOne(@Payload('id') id: string) {
    return this.roleServices.findOne(id);
  }

  @MessagePattern('role.findAll')
  async findAll() {
    return this.roleServices.findAll();
  }
}
