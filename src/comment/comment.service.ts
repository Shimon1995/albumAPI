import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IComment } from './interface/comment.interface';
import { Result } from 'src/interfaces/result.interface';
import { LeaveCommentDTO } from './dto/leave-comment.dto';
import { RemoveCommentDTO } from './dto/remove-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { GetCommentsDTO } from './dto/get-comments.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<IComment>,
  ) {}

  getComments({ imageId }: GetCommentsDTO): Promise<IComment[]> {
    return this.commentModel.find({ iId: imageId }).exec();
  }

  leaveComment(
    leaveCommentDto: LeaveCommentDTO,
    userId: string,
  ): Promise<IComment> {
    const comment = new this.commentModel({
      content: leaveCommentDto.content,
      iId: leaveCommentDto.imageId,
      uId: userId,
    });
    return comment.save();
  }

  removeComment(
    { content, commentId }: RemoveCommentDTO,
    userId: string,
  ): Promise<Result> {
    return this.commentModel
      .remove({ _id: commentId, uId: userId, content })
      .exec();
  }

  updateComment(
    { newContent, oldContent, commentId }: UpdateCommentDTO,
    userId: string,
  ): Promise<Result> {
    return this.commentModel
      .updateOne(
        { _id: commentId, uId: userId, content: oldContent },
        { content: newContent },
      )
      .exec();
  }
}
