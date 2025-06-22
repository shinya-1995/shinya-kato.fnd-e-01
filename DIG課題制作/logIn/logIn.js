const form = document.querySelector("#signIn-form");
const errorDiv = document.querySelector("#js-errorsMessage");
const goToSignUp = document.querySelector(".go-signUp");

goToSignUp.addEventListener("click", function () {
  location.href = "../signUp/signUp.html";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const logInUsername = form["username"].value.trim();
  const password = form["password"].value;
  const registered = localStorage.getItem(logInUsername);
  const userPassword = JSON.parse(registered).password;

  const errors = [];
  if (!logInUsername) {
    errors.push("お名前が入力されていません");
  } else {
    if (!registered) {
      alert("アカウントが登録されていません\nサインアップしてください");
      return;
    }
  }

  if (!password) {
    errors.push("パスワード入力してください");
  } else if (userPassword !== password) {
    errors.push("パスワードが一致しません");
  }

  const errorMessages = errors.join("<br>");
  errorDiv.innerHTML = errorMessages;

  function deleteFrom() {
    form["username"].value = "";
    form["password"].value = "";
  }

  function logInStrage() {
    sessionStorage.setItem("logInUsername", logInUsername);
  }

  if (errorMessages.length === 0) {
    deleteFrom();
    logInStrage();

    alert("ログインが成功しました！");
    location.href = "../index.html";
  }
});
