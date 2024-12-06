'use strict';

const Comment = require('../models/comment.model');
const { convertToObjectIdMongodb } = require('./../utils');
const {
  findProduct,
} = require('../models/repositoies/product.repo');

/**
 * key features: CommentService
 * + add comment [User | Shop]
 * + get list of commnets [User | Shop]
 * + delete a comment [User | Shop | Admin]
 */
class CommentService {
  static async createComment({ productId, userId, content, parentCommentId }) {
    const comment = new Comment({
      comment_productId: productId,
      comment_userId: userId,
      comment_content: content,
      comment_parent: parentCommentId,
    });

    let rightValue;

    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        throw new Error('Parent comment not found');
      }
      rightValue = parentComment.comment_right;
      // updateMany comment
      await Comment.updateMany(
        {
          comment_productId: convertToObjectIdMongodb(productId),
          comment_right: { $gte: rightValue },
        },
        { $inc: { comment_right: 2 } },
      );

      await Comment.updateMany(
        {
          comment_productId: convertToObjectIdMongodb(productId),
          comment_left: { $gt: rightValue },
        },
        { $inc: { comment_left: 2 } },
      );
    } else {
      const maxRightValue = await Comment.findOne(
        {
          comment_productId: convertToObjectIdMongodb(productId),
        },
        'comment_right',
        { sort: { comment_right: -1 } },
      );

      rightValue = maxRightValue ? maxRightValue.comment_right + 1 : 1;
    }

    // insert to comment
    comment.comment_left = rightValue;
    comment.comment_right = rightValue + 1;

    await comment.save();
    return comment;
  }

  static async getCommentsByParentId({
    productId,
    parentCommentId = null,
    limit = 50,
    offset = 0
  }) {
    if (parentCommentId) {
      const parent = await Comment.findById(parentCommentId);
      if (!parent) {
        throw new Error('Parent comment not found');
      }

      const comments = await Comment.find({
        comment_productId: convertToObjectIdMongodb(productId),
        comment_left: { $gt: parent.comment_left },
        comment_right: { $lt: parent.comment_right },
      })
        .select({
          comment_content: 1,
          comment_left: 1,
          comment_right: 1,
          comment_parent: 1,
        })
        .skip(offset)
        .limit(limit)
        .sort({ comment_left: 1 });

      return comments;
    }

    const comments = await Comment.find({
      comment_productId: convertToObjectIdMongodb(productId),
      comment_parent: parentCommentId,
    })
      .select({
        comment_content: 1,
        comment_left: 1,
        comment_right: 1,
        comment_parent: 1,
      })
      .skip(offset)
      .limit(limit)
      .sort({ comment_left: 1 });

    return comments;
  }

  static async deleteComment({ commentId, productId }) {
    // check the product exist in the database
    const foundProduct = await findProduct({ product_id: productId });
    console.log(foundProduct)
    if (!foundProduct) {
      throw new Error('Product not found');
    }

    // 1. xac dinh gia tri left va right cua comment
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error('Comment not found');
    }

    const leftValue = comment.comment_left;
    const rightValue = comment.comment_right;

    // 2. tinh width cua comment
    const width = rightValue - leftValue + 1;
    // 3. xoa comment
    await Comment.deleteMany({
      comment_productId: convertToObjectIdMongodb(productId),
      comment_left: { $gte: leftValue },
      comment_right: { $lte: rightValue },
    });

    // 4. updateMany comment
    await Comment.updateMany(
      {
        comment_productId: convertToObjectIdMongodb(productId),
        comment_left: { $gt: rightValue },
      },
      { $inc: { comment_left: -width } },
    );

    await Comment.updateMany(
      {
        comment_productId: convertToObjectIdMongodb(productId),
        comment_right: { $gt: rightValue },
      },
      { $inc: { comment_right: -width } },
    );

    return true;
  }
}

module.exports = CommentService;
