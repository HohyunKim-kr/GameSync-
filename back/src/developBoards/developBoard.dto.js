const BaseDTO = require("../dto");

class DevelopBoardsRequestDTO extends BaseDTO {
  id;
  title;
  author;
  content;
  date;
  hit;
  category;
  img;
  likeCount;

  constructor(body) {
    super();
    this.id = body.id;
    this.title = body.title;
    this.author = body.author;
    this.content = body.content;
    this.date = body.date;
    this.hit = body.hit;
    this.category = body.category;
    this.img = body.img;
    this.likeCount = body.likeCount;
    this.validate(this);
  }
}
class DevelopBoardsResponseDTO extends BaseDTO {
  id;
  title;
  author;
  content;
  created_at;
  hit;
  category;
  img;
  likeCount;

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
    this.likeCount = response.likeCount;
    this.validate(this);
  }
}

module.exports = {
  DevelopBoardsRequestDTO,
  DevelopBoardsResponseDTO,
};
