import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profiles.model';

@Injectable()
export class ProfilesService {

  constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
              ) {}

  async createProfile(profileDto: CreateProfileDto) {
    const profile = await this.profileRepository.create(profileDto);
    return profile;
  }

  async getAllProfiles() {
    const profile = await this.profileRepository.findAll({include: {all: true}});
    return profile;
  }

  async deleteProfile(id: number) {
    const profile = await this.profileRepository.findByPk(id);
    await this.profileRepository.destroy({where: {id}});
    return profile.userId;
  }

  async updateProfile(profileDto: UpdateProfileDto) {
    await this.profileRepository.update(profileDto, {where: {id: profileDto.id}});
  }

}
