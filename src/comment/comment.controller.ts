import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { GetCommentsDTO } from './dto/get-comments.dto';
import { IComment } from './interface/comment.interface';
import { LeaveCommentDTO } from './dto/leave-comment.dto';
import { User } from 'src/user/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { RemoveCommentDTO } from './dto/remove-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { Result } from 'src/interfaces/result.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('getComments')
  findComments(
    @Query(ValidationPipe) getCommentsDto: GetCommentsDTO,
  ): Promise<IComment[]> {
    return this.commentService.getComments(getCommentsDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Post('leaveComment')
  leaveCommnet(
    @Body(ValidationPipe) leaveCommentDto: LeaveCommentDTO,
    @User() user: IUser,
  ): Promise<IComment> {
    return this.commentService.leaveComment(leaveCommentDto, user._id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('removeComment')
  removeComment(
    @Body(ValidationPipe) removeCommentDto: RemoveCommentDTO,
    @User() user: IUser,
  ): Promise<Result> {
    return this.commentService.removeComment(removeCommentDto, user._id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('updateComment')
  updateComment(
    @Body(ValidationPipe) updateCommentDto: UpdateCommentDTO,
    @User() user: IUser,
  ): Promise<Result> {
    return this.commentService.updateComment(updateCommentDto, user._id);
  }
}
