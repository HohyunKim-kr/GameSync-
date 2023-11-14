const { CommentRequestDTO, CommentResponseDTO } = require("./comment.dto");
const { comments } = require("../entity");
// const comments = [];

// exports.getAllComments = async () => {
//   return [...comments];
// };

exports.getAllComments = async () => {
  try {
    const result = await comments.findAll();
    return result;
  } catch (e) {
    throw new Error(`getAllComments err: ${e.message}`);
  }
};

exports.addComment = async (commentRequestDTO) => {
  try {
    if (!(commentRequestDTO instanceof CommentRequestDTO)) {
      throw new Error("에러");
    }
    console.log("hi");
    const { content, userid, date } = commentRequestDTO;

    const commentBoard = comments.build({
      content,
      userid,
      date,
    });
    console.log("bi");
    const response = await commentBoard.save();
    const result = new CommentRequestDTO(response);
    return result;
  } catch (e) {
    throw new Error(`SERVICE addComment ERR: ${e.message}`);
  }
};

// exports.addComment = async (content, userid, date) => {
//   console.log("hi?");
//   const id = comments.length !== 0 ? comments[comments.length - 1].id + 1 : 1;
//   const newComment = {
//     id,
//     userid,
//     content,
//     date,
//   };
//   comments.push(newComment);
//   return newComment;
// };

// exports.updateComment = async (id, content) => {
//   const index = comments.findIndex((v) => v.id === id);
//   if (index !== -1) {
//     comments[index].content = content;
//     return comments[index];
//   } else {
//     return null;
//   }
// };

exports.updateComment = async (id, commentRequestDTO) => {
  try {
    const result = await comments.update(
      {
        content: commentRequestDTO.content,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (e) {
    throw new Error(`SERVICE updateBoard ERROR: ${e.message}`);
  }
};

// exports.deleteComment = async (id) => {
//   const index = comments.findIndex((v) => v.id === id);
//   if (index !== -1) {
//     const deletedComment = comments.splice(index, 1)[0];
//     return deletedComment;
//   } else {
//     return null;
//   }
// };

exports.deleteComment = async (id) => {
  try {
    const result = await comments.destroy({
      where: {
        id: id,
      },
    });
    return result;
  } catch (e) {
    throw new Error(`SERVICE deleteComments ERROR: ${e.message}`);
  }
};
