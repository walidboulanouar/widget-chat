import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateChatDto, ResponseDto, PoolDto, FeedbackDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Discussion } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}
  async create(createChatDto: CreateChatDto) {
    const newChat = await this.prisma.chat.create({
      data: {
        userId: createChatDto.userId,
      },
    });
    return newChat;
  }
  async findOneByList(id: number) {
    const chat = await this.prisma.discussion.findMany({
      where: {
        chatId: id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const discussions = this.discussionToList(chat);

    return discussions;
  }

  async getAnswer(dto: ResponseDto) {
    let customResponse = 'No response received';

    try {
      console.log("work for me")
      const response = await axios.post(
        'http://34.69.52.177:5005/webhooks/rest/webhook',
        {
          message: dto.message,
          sender: dto.userId,
        },
      );

      customResponse = response.data[0]?.text || 'No response received';
      console.log(customResponse);
    } catch (error) {
      console.error('Error while fetching response:', error.message);
      customResponse = 'Unable to reach the endpoint';
    }

    await this.prisma.discussion.create({
      data: {
        chatId: dto.chatId,
        message: dto.message,
        answer: customResponse,
      },
    });

    return { answer: customResponse };
  }
  async findAllFeedbacks(id:number){
    const allchat = await this.prisma.chat.findMany({
      where: {
        userId: id,
      },
      include: {
        discussions: true,
      },
    });
    let chats = [];
    allchat.forEach((chat) => {
      if(chat.answer1){
        const list=[chat.answer1,chat.answer2,chat.rate]
        chats.push(list);
      }
      
    });
    return chats;
  }
  async getAllFeedbacks(){
    const allchat = await this.prisma.chat.findMany({
      include: {
        discussions: true,
      },
    });
    let chats = [];
    allchat.forEach((chat) => {
      if(chat.answer1){
        const list=[chat.answer1,chat.answer2,chat.rate]
        chats.push(list);
      }
      
    });
    return chats;
  }

  async pool(dto:PoolDto){
    const check= await this.prisma.chat.findUnique({
      where:{
        id:dto.chatId,
      },
    } )
    if(!check) throw new ForbiddenException("Chat not found")
    const feedback=  await this.prisma.chat.update({
      where:{
        id:dto.chatId,
      },
      data:{
        answer1:dto.answer1,
        answer2:dto.answer2,
        rate:"Good",
      }
    })

    return feedback;
  }
  
  async feedback(dto: FeedbackDto) {
    const check = await this.prisma.chat.findUnique({
      where: {
        id: dto.chatId,
      },
    });
    if (!check) throw new ForbiddenException('Chat not found');
    const feedback = await this.prisma.chat.update({
      where: {
        id: dto.chatId,
      },
      data: {
        answer1: dto.answer1,
        answer2: dto.answer2,
        rate: dto.rate,
      },
    });

    return feedback;
  }

  discussionToList(chat: Discussion[]) {
    let discussion: string[] = [];
    for (let i = 0; i < chat.length; i++) {
      discussion.push(chat[i].message);
      discussion.push(chat[i].answer);
    }

    return discussion;
  }

  async finlast(id: number) {
    const chatId = await this.prisma.chat.findFirst({
      where: {
        userId: id,
      },
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });
    if (!chatId) {
      return { chatId: null };
    } else {
      if (chatId.answer1) {
        return { chatId: null };
      } else {
        return { chatId: chatId.id };
      }
    }
  }

  async findAll(id: number) {
    const allchat = await this.prisma.chat.findMany({
      where: {
        userId: id,
      },
      include: {
        discussions: true,
      },
    });
    let chats = [];
    allchat.forEach((chat) => {
      chats.push(this.discussionToList(chat.discussions));
    });
    return allchat;
  }

  async findOne(id: number) {
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: id,
      },
      include: {
        discussions: true,
        _count: true,
      },
    });
    if (!chat) throw new ForbiddenException("this chat dosn't exist");

    return chat;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
