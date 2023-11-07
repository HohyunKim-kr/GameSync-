// const ideaBoardForm = document.querySelector("#ideaBoardForm");
// ideaBoardForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     console.log(e.target.title.value);
//     // console.log(e.target.category);
//     // console.log(e.target.content);
//     // console.log(e.target.upload);
//     console.log(`submit`);

//     const formData = new FormData(e.target);
//     console.log(formData);

//     const { data } = await axios.post(
//         "http://localhost:4000/ideaBoards/",
//         formData
//     );
//     console.log(data);

//     const dataImg = document.querySelector("dataimg");
//     dataImg.src = data.imageUrl;
// });
