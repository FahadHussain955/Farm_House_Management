import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CleaningChecklistService } from './cleaning-checklist.service';
import { CreateCleaningChecklistDto, UpdateCleaningChecklistDto } from './dto/create-clean-check.dto';

@Controller('cleaning-checklist')
export class CleaningChecklistController {
  constructor(private readonly cleaningChecklistService: CleaningChecklistService) {}

  @Get()
  findAll() {
    return this.cleaningChecklistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cleaningChecklistService.findOne(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createCleaningChecklistDto: CreateCleaningChecklistDto) {
    return this.cleaningChecklistService.create(createCleaningChecklistDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateCleaningChecklistDto) {
    return this.cleaningChecklistService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cleaningChecklistService.remove(+id);
  }
}