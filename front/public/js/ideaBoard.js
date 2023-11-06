const ideaBoardForm = document.querySelector("#ideaBoardForm");
ideaBoardForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    // console.log(e.target.category);
    // console.log(e.target.content);
    // console.log(e.target.upload);
    console.log(`submit`);

    const formData = new FormData(e.target);
    console.log(formData);

    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]); // pair[0]은 필드 이름, pair[1]은 해당 값
    }

    const { data } = await axios.post(
        "http://localhost:4000/ideaBoards/",
        formData
    );
    console.log(data);
});
