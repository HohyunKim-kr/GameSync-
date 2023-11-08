const BaseDTO = require("../dto");

class NoticeBoardRequestDTO extends BaseDTO {
  // id;
  title;
  author;
  content;
  // date;
  // hit;
  // category;
  // img;
  // like;

  constructor(body) {
    super();
    // this.id = body.id;
    this.title = body.title;
    this.author = body.author;
    this.content = body.content;
    // this.date = body.date;
    // this.hit = body.hit;
    // this.category = body.category;
    // this.img = body.img;
    // this.like = body.like;
    this.validate(this);
  }
}

class NoticeBoardResponseDTO extends BaseDTO {
  id;
  title;
  author;
  content;
  created_at;
  hit;
  category;
  img;
  like;

  constructor(response) {
    super();
    this.id = response.id;
    this.title = response.title;
    this.author = response.author;
    this.content = response.content;
    this.created_at = this.toDate(response.createdAt);
    this.hit = response.hit;
    this.category = response.category;
    this.img = response.img;
    this.like = response.like;
    this.validate(this);
  }
}

module.exports = {
  NoticeBoardRequestDTO,
  NoticeBoardResponseDTO,
};
