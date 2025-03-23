import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookStatus } from './book-status.enum';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  // @IsString()
  // @IsNotEmpty()
  // image: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsEnum(BookStatus)
  @IsString()
  status: BookStatus;
}
