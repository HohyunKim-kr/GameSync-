function validateOnInput() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("repeatPassword").value;
  const errorDiv = document.getElementById("error-message");

  if (password !== confirmPassword) {
    // 에러 메시지 표시
    errorDiv.innerHTML = "패스워드가 일치하지 않습니다.";
  } else {
    // 패스워드가 일치하면 에러 메시지 지우기
    errorDiv.innerHTML = "";
  }
}
