import { RoleEntity } from './entities/role.entity';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  public async getAllUsers() {
    const res = await this.userRepository.find({
      relations: {
        roles: true,
      },
    });
    return res;
  }

  public async getAllRoles() {
    const res = await this.roleRepository.find();
    return res;
  }

  public async createUser(user: UserEntity) {
    const roles = await this.roleRepository.findBy({ id: In(user.roles) });
    user.roles = roles;
    const res = await this.userRepository.save(user);
    return res;
  }

  public async createRole(role: RoleEntity) {
    const res = await this.roleRepository.save(role);
    return res;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
