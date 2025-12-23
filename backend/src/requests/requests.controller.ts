import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { RequestsService, RequestState } from './requests.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly service: RequestsService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.service.updateStatus(id, dto.estado as RequestState);
  }
}