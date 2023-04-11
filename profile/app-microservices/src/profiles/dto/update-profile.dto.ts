import { IsOptional, IsString, Length } from "class-validator";

export class UpdateProfileDto {
  readonly id: number;

  @IsString({message: 'Должно быть строкой'})
  @IsOptional()
  readonly firstName?: string;
  
  @IsString({message: 'Должно быть строкой'})
  @IsOptional()
  readonly lastName?: string;

  @IsString({message: 'Должно быть строкой'})
  @IsOptional()
  @Length(11, 12, {message: 'Длина должна быть не меньше 11 и не больше 12 символов'})
  readonly phoneNumber?: string;
}