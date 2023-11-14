window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const successMessage = urlParams.get("success");

  if (successMessage === "true") {
    alert("회원가입이 성공했습니다");
  }
};
