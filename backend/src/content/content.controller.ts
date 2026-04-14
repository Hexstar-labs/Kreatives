import { Controller, Get, Param, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get('creator/:creator')
  async getCreatorContent(@Param('creator') creator: string) {
    return this.contentService.getCreatorContent(creator);
  }

  @Get(':id/access')
  async getContentAccess(@Param('id') id: string, @Query('fan') fan: string) {
    return this.contentService.getContentAccess(id, fan);
  }
}
