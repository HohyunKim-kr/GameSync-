const loginWithCredentials = async (credentials) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/auth/login",
      credentials
    );
    console.log(data.message);

    if (data.success) {
      document.cookie = `token=${data.token}; path=/; max-age=3600;`;
      // 1시간

      alert(data.message);
      window.location.href = "/";
    }
  } catch (e) {
    alert(e.response.data.message);
    console.error(e);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user_email = document.querySelector("#email").value;
    const user_pw = document.querySelector("#password").value;

    loginWithCredentials({ user_email, user_pw });
  });
});
