const form = document.querySelector("#signIn-form");
const errorDiv = document.querySelector("#js-errorsMessage");
const goToLogIn = document.querySelector(".go-logIn");

goToLogIn.addEventListener("click", function () {
  location.href = "../logIn/logIn.html";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // const formButton = document.querySelector(".submit-button");

  const username = form["username"].value.trim();
  const password = form["password"].value;
  const retypePass = form["retype-password"].value;

  const errors = [];
  if (!username) {
    errors.push("お名前が入力されていません");
  } else if (!username.match(/^[A-Za-z0-9]*$/)) {
    errors.push("半角英数字のみで入力してください");
  }

  if (!password) {
    errors.push("パスワードが入力されていません");
  } else if (password.length < 8) {
    errors.push("パスワードは8文字以上入力してください");
  }

  if (!retypePass) {
    errors.push("パスワードが再入力されていません");
  } else if (retypePass !== password) {
    errors.push("入力していただいたパスワードが一致しません");
  }

  const errorMessages = errors.join("<br>");
  errorDiv.innerHTML = errorMessages;
  errorDiv.style.color = "red";
  errorDiv.style.fontWeight = "Bold";

  function setStorage() {
    const user = {
      username,
      password,
      retypePass,
    };
    localStorage.setItem(username, JSON.stringify(user));
  }

  function deleteFrom() {
    form["username"].value = "";
    form["password"].value = "";
    form["retype-password"].value = "";
  }

  if (errorMessages.length === 0) {
    const registered = localStorage.getItem(username);
    if (registered) {
      alert("すでにサインアップ済みのアカウント名です");
      deleteFrom();
      return;
    } else {
      setStorage();
    }
    deleteFrom();
    alert("サインアップ成功しました！\nログインをお願いします！");
    location.href = "../logIn/logIn.html";
  }
});
