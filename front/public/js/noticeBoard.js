const ideaBoardForm = document.querySelector("#noticeBoardForm");
ideaBoardForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e.target.title.value);
  console.log(`submit`);

  const formData = new FormData(e.target);
  console.log(formData);

  const tmp = {};

  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
    tmp[pair[0]] = pair[1];
  }

  tmp["date"] = Date.now();
  tmp["hit"] = 1;
  tmp["category"] = 1;
  tmp["img"] = "ASda";
  tmp["like"] = 1;
  tmp["createdAt"] = Date.now();
  tmp["updatedAt"] = Date.now();

  console.log(tmp);

  const { data } = await axios.post("http://localhost:4000/noticeBoards/", tmp);
  console.log(data);
});
