import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateSettingsDto {
  @IsBoolean()
  @IsOptional()
  smsOn?: boolean;

  @IsBoolean()
  @IsOptional()
  notificationsOn?: boolean;
}
