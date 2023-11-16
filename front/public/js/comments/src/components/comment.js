// import Component from "../../core/component.js";
// import CommentForm from "../contents/form.js";
// import CommentList from "../contents/item.js";

// class Comment extends Component {
//   setup() {
//     this.state = {
//       comments: [],
//     };
//   }
//   template() {
//     return `
//     <ul class="comment">
//         <li class="comment-form"></li>
//         <li class="comment-list"></li>
//     </ul>`;
//   }

//   insertItem(content) {
//     const { comments } = this.state;
//     const id = comments.length !== 0 ? comments[comments.length - 1].id + 1 : 1;

//     comments.push({
//       id,
//       userid: "kiamea",
//       content,
//       date: "20231120",
//     });
//     const newState = [...comments];
//     this.setState({ ...this.state, comments: [...newState] });
//   }

//   deleteItem(id) {
//     // id === 1
//     const { comments } = this.state;
//     const newState = comments.filter((v) => v.id !== id);
//     this.setState({ ...this.state, comments: [...newState] });
//   }

//   updateItem(id, content) {
//     const { comments } = this.state;
//     const newState = [...comments];

//     const index = newState.findIndex((v) => v.id === parseInt(id));
//     newState[index].content = content;
//     this.setState({ ...this.state, comments: [...newState] });
//   }

//   mounted() {
//     const { comments } = this.state;
//     const formTarget = document.querySelector(".comment-form");
//     const insertItem = this.insertItem.bind(this);
//     new CommentForm(formTarget, {
//       length: comments.length,
//       insertItem,
//     });

//     const listTarget = document.querySelector(".comment-list");
//     const deleteItem = this.deleteItem.bind(this);
//     const updateItem = this.updateItem.bind(this);
//     new CommentList(listTarget, { comments, deleteItem, updateItem });
//   }
//   setEvent() {}
// }

// export default Comment;

////////////////////////////////////////////

// components / comment.js;

// import axios from "axios";
import Component from "/js/comments/core/component.js";
import CommentForm from "/js/comments/src/contents/form.js";
import CommentList from "/js/comments/src/contents/item.js";

class Comment extends Component {
  async setup() {
    this.state = {
      comments: [],
    };
    await this.fetchComments();
  }

  template() {
    return `
    <ul class="comment">
        <li class="comment-form"></li>
        <li class="comment-list"></li>
    </ul>`;
  }

  async insertItem(content) {
    try {
      console.log("insert data", data.result);
      const response = await axios.post("http://localhost:4000/comments", {
        content,
        userid: data.result.id,
        date: "20231120",
      });

      console.log("comments 머가뜸?", response);
      if (response.data.success) {
        await this.fetchComments();
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  }

  async deleteItem(id) {
    try {
      const response = await axios.delete(
        `http://localhost:4000/comments/${id}`
      );
      // console.log(response.data.success);
      // if (response.data.success) {
      await this.fetchComments();
      // }
      return response;
    } catch (error) {
      console.error("Error deleting data on server:", error);
    }
  }

  async updateItem(id, content) {
    try {
      console.log("updateItem : ", id);
      console.log("updateItem : ", content);
      const response = await axios.put(`http://localhost:4000/comments/${id}`, {
        content,
      });
      await this.fetchComments();
      // if (response.data.success) {
      //   console.log("댓글대기중");
      //   await this.fetchComments();
      //   console.log("댓글 출력");
      // }
    } catch (error) {
      console.error("Error updating data on server:", error);
    }
  }

  async fetchComments() {
    try {
      const response = await axios.get("http://localhost:4000/comments");
      this.setState({ ...this.state, comments: response.data });
    } catch (error) {
      console.error("Error fetching comments from server:", error);
    }
  }

  mounted() {
    const { comments } = this.state;
    const formTarget = document.querySelector(".comment-form");
    const insertItem = this.insertItem.bind(this);
    new CommentForm(formTarget, {
      length: comments.length,
      insertItem,
    });

    const listTarget = document.querySelector(".comment-list");
    const deleteItem = this.deleteItem.bind(this);
    const updateItem = this.updateItem.bind(this);
    new CommentList(listTarget, { comments, deleteItem, updateItem });
  }

  setEvent() {}
}

export default Comment;
