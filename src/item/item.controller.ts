import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create-item')
  @MessagePattern("createItem")// se comunica con la api por medio de message pattern
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }

  @Get('/find-all-items')
  @MessagePattern("findAllItems")
  findAll() {
    return this.itemService.findAllItems();
  }

  @Get('/find-one-item/:id') 
  @MessagePattern('findOneItem')
  findOne(id: string) {
    return this.itemService.findOneItem(id);
  }

  @Put('/update-item/:id')
  @MessagePattern('updateItem')
  update(payload) { 
    console.log(payload) 
    return this.itemService.updateItem(payload.id, payload.updateItemDto);
  }

  @Delete('/delete-item/:id')
  @MessagePattern('removeItem')
  remove(id: string) {
    return this.itemService.removeItem(id);
  }
}