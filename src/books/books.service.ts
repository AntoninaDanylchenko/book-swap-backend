import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async getBooks() {}

  async getBookById() {}

  async createBook() {}

  async editBookById() {}

  async deleteBookById() {}
}
