function previewImage(input) {
    let preview = document.getElementById("thumbnailPreview");
    let file = input.files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
        preview.innerHTML =
            '<img src="' + reader.result + '" alt="썸네일 미리보기" />';
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = "";
    }
}
