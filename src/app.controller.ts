import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  async getAllUsers() {
    return await this.appService.getAllUsers();
  }
  @Get('role')
  async getAllRoles() {
    return await this.appService.getAllRoles();
  }

  @Post('user')
  public async createUser(@Body() user: UserEntity) {
    const res = await this.appService.createUser(user);
    return { message: 'O fdp foi criado com sucesso!', user: res };
  }

  @Post('role')
  public async createRole(@Body() role: RoleEntity) {
    const res = await this.appService.createRole(role);
    return { message: 'Dale Role!', role: res };
  }
}
