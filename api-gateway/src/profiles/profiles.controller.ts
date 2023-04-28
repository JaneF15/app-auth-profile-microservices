import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateProfileDto } from './dto/create-profile.dto';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-auth.guard';

@UsePipes(ValidationPipe)
@Controller()
export class ProfilesController {

  constructor(
    @Inject('PROFILE_SERVICE') private profileService: ClientProxy,
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    private jwtService: JwtService, 
  ) {}


  @Get('/profiles')
  getAll() {
    return this.profileService.send('get.all.profiles', '');
  }

  @Post('/registration')
  async registration(@Body() profileDto: CreateProfileDto) {
    
    const token = await firstValueFrom(this.authService.send('registration', profileDto));
    const user = this.jwtService.verify(token.token);
    return this.profileService.send('create.profile', {...profileDto, userId: user.id});
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('/profiles')
  update(@Body() profileDto: UpdateProfileDto) {
    return this.profileService.emit('update.profile', profileDto)
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('/profiles/:id')
  async delete(@Param('id') id: number) {
    const userId = await firstValueFrom(this.profileService.send('delete.profile', id)) ;
    return this.authService.emit('delete.user', userId);
  }
  
}

