import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoomStatusService } from './roomStatus.service';
import {
  CreateRoomStatusDto,
  UpdateRoomStatusDto,
} from './dto/create-roomStatus.dto';

@Controller('room-status')
export class RoomStatusController {
  constructor(private readonly roomStatusService: RoomStatusService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createRoomStatusDto: CreateRoomStatusDto) {
    return this.roomStatusService.create(createRoomStatusDto);
  }

  @Get()
  findAll() {
    return this.roomStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomStatusService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateRoomStatusDto: UpdateRoomStatusDto,
  ) {
    return this.roomStatusService.update(+id, updateRoomStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomStatusService.remove(+id);
  }
}
