import { Controller } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {

  constructor(private authService: AuthService) {}

  @MessagePattern('login')
  login(@Payload() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @MessagePattern('registration')
  registration(@Payload() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
