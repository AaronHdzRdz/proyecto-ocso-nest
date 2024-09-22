import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("signup")
  signup(@Body() CreateUserDto: CreateUserDto){
    return this.authService.registerUser(CreateUserDto)
  }
  @Post('login')
  login(@Body() CreateUserDto: CreateUserDto){
    return this.authService.loginUser(CreateUserDto)
  }

}
