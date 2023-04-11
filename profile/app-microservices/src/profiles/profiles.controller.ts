import { Controller } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProfilesController {

  constructor(private profileService: ProfilesService) {}

  @MessagePattern('get.all.profiles')
  getAll() {
    return this.profileService.getAllProfiles();
  }

  @MessagePattern('create.profile')
  registration(@Payload() profileDto: CreateProfileDto) {
    return this.profileService.createProfile(profileDto);
  }

  @EventPattern('update.profile')
  update(@Payload() profileDto: UpdateProfileDto) {
    return this.profileService.updateProfile(profileDto);
    
  }

  @MessagePattern('delete.profile')
  delete(@Payload() id: number) {
    return this.profileService.deleteProfile(id);
  }
  
}
