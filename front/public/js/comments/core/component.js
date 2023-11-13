class Component {
  target;
  props;
  state = {};
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}
  template() {
    return "";
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  mounted() {}

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}
  addEvent(eventType, selector, callback) {
    this.target.addEventListener(eventType, (e) => {
      if (!e.target.closest(selector)) return false;
      callback(e);
    });
  }
}

export default Component;
