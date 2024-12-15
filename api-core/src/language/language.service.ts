import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/mutation';
import { DatabaseService } from 'src/database/database.service';
import { GetLanguageDto } from './dto';

@Injectable()
export class LanguageService {

  constructor(private readonly database: DatabaseService) { }
  async create(createLanguageDto: CreateLanguageDto): Promise<GetLanguageDto> {
    try {
      return await this.database.language.create({
        data: {
          name: createLanguageDto.name,
        },

      });
    } catch (error) {
      throw new Error('Cannot create this language');
    }
  }

  async findOne(id: string) {
    try {
      const language = await this.database.language.findUnique({
        where: {
          id: id.toString(),
        },
      })
      if (!language) {
        throw new Error("Cannot find this language")
      }
      return language
    }
    catch (error) {
      throw new Error("Cannot find this language")
    }
  }
}
