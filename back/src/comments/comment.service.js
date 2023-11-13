const comments = [];

exports.getAllComments = async () => {
  return [...comments];
};

exports.addComment = async (content, userid, date) => {
  console.log("hi?");
  const id = comments.length !== 0 ? comments[comments.length - 1].id + 1 : 1;
  const newComment = {
    id,
    userid,
    content,
    date,
  };
  comments.push(newComment);
  return newComment;
};

exports.updateComment = async (id, content) => {
  const index = comments.findIndex((v) => v.id === id);
  if (index !== -1) {
    comments[index].content = content;
    return comments[index];
  } else {
    return null;
  }
};

exports.deleteComment = async (id) => {
  const index = comments.findIndex((v) => v.id === id);
  if (index !== -1) {
    const deletedComment = comments.splice(index, 1)[0];
    return deletedComment;
  } else {
    return null;
  }
};
