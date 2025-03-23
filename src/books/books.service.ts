import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BookStatus,
  CreateBookDto,
  EditBookDto,
} from './dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BooksService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  getBooks() {
    return this.prisma.book.findMany();
  }

  getUserBooks(userId: string) {
    return this.prisma.book.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async getBookById(bookId: string) {
    return this.prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });
  }

  async createBook(
    userId: string,
    dto: CreateBookDto,
    file: Express.Multer.File,
  ) {
    let imageUrl = null;

    if (file) {
      imageUrl =
        await this.cloudinaryService.uploadImage(
          file,
        );
    }
    const newBook = await this.prisma.book.create(
      {
        data: {
          ownerId: userId,
          image: imageUrl,
          ...dto,
        },
      },
    );
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        books: {
          push: newBook.id,
        },
      },
    });

    return newBook;
  }

  async editBookById(
    userId: string,
    dto: EditBookDto,
    file: Express.Multer.File,
    bookId: string,
  ) {
    const book =
      await this.prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });
    if (!book || book.ownerId !== userId) {
      throw new ForbiddenException(
        'Access to resources denied',
      );
    }
    const imageUrl = file
      ? await this.cloudinaryService.uploadImage(
          file,
        )
      : book.image;

    const updateData: any = {
      ...dto,
      image: imageUrl,
    };

    if (dto.status) {
      updateData.status =
        dto.status as BookStatus;
    }

    return this.prisma.book.update({
      where: { id: bookId },
      data: updateData,
    });
  }

  async deleteBookById(
    userId: string,
    bookId: string,
  ) {
    const book =
      await this.prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });
    if (!book || book.ownerId !== userId) {
      throw new ForbiddenException(
        'Access to resources denied',
      );
    }
    const user =
      await this.prisma.user.findUnique({
        where: { id: userId },
        select: { books: true },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const updatedBooks = user.books.filter(
      (id) => id !== bookId,
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        books: { set: updatedBooks },
      },
    });

    await this.prisma.book.delete({
      where: {
        id: bookId,
      },
    });
    return {
      message: 'Book deleted successfully',
    };
  }
}
