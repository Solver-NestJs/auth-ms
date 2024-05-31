import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { LoginDto, RegisterDto } from 'src/auth/dto';
import { RolesEnum } from './enum/roles-enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config/envs';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtServices: JwtService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const userFound = await this.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!userFound) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Cedentials are invalid',
      });
    }

    if (!userFound.isActive) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User is not active',
      });
    }

    const equalsPassword = bcrypt.compareSync(password, userFound.password);
    if (!equalsPassword) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Cedentials are invalid',
      });
    }
    const token = await this.jwtServices.sign({
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    });

    delete userFound.password;
    delete userFound.updateAt;
    delete userFound.createAt;

    return {
      token,
      user: userFound,
    };
  }

  async register(registerDto: RegisterDto) {
    const { name, email, password, roles } = registerDto;

    const userFound = await this.user.findUnique({
      where: { email },
    });

    if (userFound) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
      });
    }

    if (roles && roles.length === 0) {
      const defaultRole = await this.getRoleByName(RolesEnum.USER);
      roles.push({ id: defaultRole.id });
    }

    const user = await this.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        userRoles: {
          createMany: {
            data: roles.map((role) => ({ roleId: role.id })),
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        userRoles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  async verify(token: string) {
    const payload = await this.jwtServices.verify(token, {
      secret: envs.jwtSecret,
    });

    const { iat, exp, ...user } = payload;

    const userFound = await this.user.findUnique({
      where: { id: user.id },
    });

    if (!userFound.isActive) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User is not active',
      });
    }

    return {
      user,
      token: await this.jwtServices.sign(user),
    };
  }

  async getRoleByName(name: string) {
    const defaultRole = this.role.findFirst({
      where: {
        name,
      },
    });

    return defaultRole;
  }
}
