const BaseDTO = require("../dto");

class IdeaBoardsRequestDTO extends BaseDTO {
    title;
    author;
    content;
    category;
    image;
    original_filename;

    constructor(body) {
        super();
        this.title = body.title;
        this.author = body.author;
        this.content = body.content;
        this.category = body.category;
        this.image = body.image;
        this.original_filename = body.original_filename;
        this.validate(this);
    }
}
class IdeaBoardsResponseDTO extends BaseDTO {
    id;
    title;
    author;
    content;
    created_at;
    hit;
    category;
    image;
    original_filename;
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
        this.image = response.image;
        this.original_filename = response.original_filename;
        this.like = response.like;
        this.validate(this);
    }
}

module.exports = {
    IdeaBoardsRequestDTO,
    IdeaBoardsResponseDTO,
};
