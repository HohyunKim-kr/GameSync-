import Component from "/js/comments/core/component.js";
class CommentForm extends Component {
  setup() {}
  template() {
    return `
    <h4>댓글쓰기 <span>${this.props.length}</span></h4>
    <form id="commentFrm" class="commentFrm">
      <span class="ps_box"><input type="text" name="content" id="content" placeholder="댓글내용 입력"/></span>
      <button type="submit" class="btn">등록</button>
    </form>
    `;
  }
  mounted() {
    // document.querySelector("#commentFrm").addEventListener("submit", (e) => {
    //   e.preventDefault;
    //   console.log("이벤트 등록이되나?");
    // });
  }

  handleSumbit(e) {
    e.preventDefault();
    console.log(e.target.content.value);
    // console.log("submit 발동");
    const { value: content } = e.target.content;
    this.props.insertItem(content);
  }

  setEvent() {
    const handleSumbit = this.handleSumbit.bind(this);
    this.addEvent("submit", "#commentFrm", handleSumbit);
  }
}

export default CommentForm;
