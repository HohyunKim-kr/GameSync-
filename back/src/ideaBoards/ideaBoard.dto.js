const BaseDTO = require("../dto");

class IdeaBoardsRequestDTO extends BaseDTO {
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
class IdeaBoardsResponseDTO extends BaseDTO {
    constructor(response) {
        super();
    }
}

module.exports = {
    IdeaBoardsRequestDTO,
    IdeaBoardsResponseDTO,
};
