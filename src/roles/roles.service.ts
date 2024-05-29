import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { RpcException } from '@nestjs/microservices';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('RoleServices');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database SqlServer');
  }

  async findAll() {
    return await this.role.findMany();
  }

  async findOne(id: string) {
    const role = await this.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Role already exists',
      });
    }
    return role;
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.role.findUnique({
      where: { name: createRoleDto.name },
    });
    if (role) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Role already exists',
      });
    }
    return await this.role.create({ data: createRoleDto });
  }

  async updateRole(updateRoleDto: UpdateRoleDto) {
    const { id, name } = updateRoleDto;
    await this.findOne(id);
    return await this.role.update({ where: { id }, data: { name } });
  }

  async deleteRole(id: string) {
    await this.findOne(id);
    return await this.role.delete({ where: { id } });
  }
}
