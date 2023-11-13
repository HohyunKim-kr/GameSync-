const BaseDTO = require("../dto");

class CommentRequestDTO extends BaseDTO {
  content;
  userid;
  date;

  constructor(body) {
    super();
    this.content = body.content;
    this.userid = body.userid;
    this.date = body.date;
    this.validate(this);
  }
}

class CommentResponseDTO extends BaseDTO {
  id;
  content;
  userid;
  date;

  constructor(response) {
    super();
    this.id = response.id;
    this.content = response.content;
    this.userid = response.userid;
    this.date = this.toDate(response.date);
    this.validate(this);
  }
}

module.exports = {
  CommentRequestDTO,
  CommentResponseDTO,
};
