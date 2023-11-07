class BaseDTO {
  validate(props) {
    if (!props) throw new Error("Body 비어있음");
    if (typeof props !== "object") throw new Error("Body 타입이 객체가 아님");

    // for (const key in props) {
    //     if (!props[key]) {
    //         throw new Error(`${key} 속성 비어있음`);
    //     }
    // }
  }
  toDate(d) {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  }
}

module.exports = BaseDTO;
