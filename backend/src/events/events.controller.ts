import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service.js';
import type { NewEvent } from './events.service.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  list() {
    return this.eventsService.list();
  }

  @Post()
  create(@Body() body: NewEvent) {
    return this.eventsService.create(body);
  }
}