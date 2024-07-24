import {
  IsString,
  IsOptional,
  IsUrl,
  IsDateString,
  IsBoolean,
} from 'class-validator';
class CreateFeedDto {
  @IsString()
  title!: string;

  @IsUrl()
  link!: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsDateString()
  datePublished!: Date;

  @IsOptional()
  @IsBoolean()
  scrapped?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}

class UpdateFeedDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsDateString()
  datePublished?: Date;
}

export { CreateFeedDto, UpdateFeedDto };
