import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto, FeedbackDto,PoolDto, ResponseDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Public } from 'src/common/decorators';

@Public()
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('create')
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get('findLast/:id')
  findLast(@Param('id') id: string) {
    return this.chatsService.finlast(+id);
  }

  @Post("create/poll")
  getpool(@Body() dto:PoolDto){
    return this.chatsService.pool(dto);
  }

  @Get('findAll/:userId')
  findAll(@Param('userId') id: string) {
    return this.chatsService.findAll(+id);
  }

  @Get("feedbacks")
  findAllFeedbacks(){
    return this.chatsService.getAllFeedbacks();
  }
  @Get('findone/chat/:id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @Get('findone/list/chat/:id')
  findOneList(@Param('id') id: string) {
    return this.chatsService.findOneByList(+id);
  }

  @Post('send')
  sendMessage(@Body() dto: ResponseDto) {
    return this.chatsService.getAnswer(dto);
  }

  @Post('create/feedback')
  getFeedback(@Body() dto: FeedbackDto) {
    return this.chatsService.feedback(dto);
  }

  @Get("feedback/findall/:id")
  getAllFeedbacks(@Param('id') id: string){
    return this.chatsService.findAllFeedbacks(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
