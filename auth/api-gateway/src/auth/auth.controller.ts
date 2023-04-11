import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller()
export class AuthController {

  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy, 
  ) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.send('login', userDto);
  }
}
