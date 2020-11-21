import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {

  @Get() // http://localhost:300/
  getHello(): string {
    return 'Hello World!';
  }

  @Get('world') // http://localhost:300/world/
  getWorld(): string {
    return 'World!';
  }
}
