import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { CardEntity } from './card.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { readJsonSync } from 'fs-extra';

@Controller()
export class AppController {
  constructor(private dbService: InMemoryDBService<any>) {
    const data = readJsonSync('./db/db.json');
    this.dbService.createMany(data);
  }

  @Get()
  getAll(): CardEntity[] {
    return this.dbService.getAll();
  }

  @Post('seed')
  seed(): CardEntity[] {
    this.dbService.seed(
      (idx: number) => ({
        id: String(idx + 1),
        title: `Card-${idx + 1}`,
        description: `Description-${idx + 1}`,
      }),
      5,
    );

    return this.dbService.getAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.dbService.delete(id);
  }
}
