import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/api/login')
  login(@Body() body) {
    console.log(body.username, body.password);

    return this.authService.login(body.username, body.password);
  }
}
