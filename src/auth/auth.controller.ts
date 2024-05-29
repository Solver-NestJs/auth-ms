import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from 'src/auth/dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('user.login')
  login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('user.register')
  register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern('user.verify')
  verify(@Payload('token') token: string) {
    return this.authService.verify(token);
  }
}
