import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateChatDto, ResponseDto, FeedbackDto, PoolDto } from './dto/create-chat.dto';
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
        answerp1:dto.answer1,
        answerp2:dto.answer2,
        answerp3: dto.answer3,
        answerp4: dto.answer4,
        answerp5: dto.answer5,
        answerp6: dto.answer6,
        answerp7: dto.answer7,
        answerp8: dto.answer8,
        answerp9: dto.answer9,
        answerp10: dto.answer10,
        answerp11: dto.answer11,
        answerp12: dto.answer12,
        answerp13: dto.answer13,
        answerp14: dto.answer14,
        answerp15: dto.answer15,
        answerp16: dto.answer16,
        answerp17: dto.answer17,
        answerp18: dto.answer18,
        answerp19: dto.answer19,
        answerp20: dto.answer20,
        answerp21: dto.answer21,
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
        answer3: dto.answer3,
        answer4: dto.answer4,
        answer5: dto.answer5,
        answer6: dto.answer6,
        answer7: dto.answer7,
        answer8: dto.answer8,
        answer9: dto.answer9,
        answer10: dto.answer10,
        answer11: dto.answer11,
        answer12: dto.answer12,
        answer13: dto.answer13,
        answer14: dto.answer14,
        answer15: dto.answer15,
        answer16: dto.answer16,
        answer17: dto.answer17,
        answer18: dto.answer18,
        answer19: dto.answer19,
        answer20: dto.answer20,
        answer21: dto.answer21,
        chatType:dto.chatType,
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
