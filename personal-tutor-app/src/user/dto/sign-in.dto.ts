import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import {
  PASSWORD_MESSAGE,
  PASSWORD_REGEX,
} from 'src/constants/main.constants';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, { message: PASSWORD_MESSAGE })
  password: string;
}
