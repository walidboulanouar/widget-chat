import { Injectable ,ForbiddenException} from '@nestjs/common';
import { CreateChatDto, FeedbackDto, ResponseDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Discussion } from '@prisma/client';


@Injectable()
export class ChatsService {
  constructor(private prisma:PrismaService){

  }
  async create(createChatDto: CreateChatDto) {
    const newChat= await this.prisma.chat.create({
      data:{
        userId:createChatDto.userId,
      }
    })
    return newChat;
  }
  async findOneByList(id: number) {
    const chat= await this.prisma.discussion.findMany({
      where:{
        chatId:id,
      },
      orderBy:{
        createdAt:"asc"
      }
    })

    const discussions=this.discussionToList(chat);

    return discussions;
  }

  async getAnswer(dto:ResponseDto){
    await this.prisma.discussion.create({
      data:{
        chatId:dto.chatId,
        message:dto.message,
        answer:"we will impliment this part, don't worry, we will analyse your data ana depend on it we will send the response"
      }
    })
    return {answer:"we will impliment this part, don't worry, we will analyse your data ana depend on it we will send the response"};
  }

  async feedback(dto:FeedbackDto){
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
        rate:dto.rate,
      }
    })

    return feedback;
  }

  discussionToList(chat:Discussion[]){
    let discussion:string[]=[]
    for (let i = 0; i < chat.length; i++){
      discussion.push(chat[i].message);
      discussion.push(chat[i].answer);
    }

    return discussion;
  }

  async finlast(id:number){
    const chatId= await this.prisma.chat.findFirst({
      where:{
        userId:id,
      },
      orderBy:{
        id:"desc"
      },
      take:1
    })
    if(!chatId ) {
      return {chatId:null}
    }else{
      if(chatId.answer1){
        return {chatId:null}
      }else{
        return {chatId:chatId.id}
      }
    }
  }

  async findAll(id:number) {
    const allchat= await this.prisma.chat.findMany({
      where:{
        userId:id,
        
      },
      include:{
        discussions:true,
      }
    });
    let chats= []
    allchat.forEach((chat)=>{
      chats.push(this.discussionToList(chat.discussions))
    })
    return allchat;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}