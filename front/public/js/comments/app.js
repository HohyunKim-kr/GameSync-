import Component from "./core/component.js";
import Comment from "./src/components/comment.js";

class App extends Component {
  setup() {}
  template() {
    return `
        <div>
            <div data-conponent='comment'></div>
        </div>
    `;
  }
  mounted() {
    const commnetTarget = document.querySelector('[data-conponent="comment"]');
    new Comment(commnetTarget);
  }
  setEvent() {}
}

export default App;
