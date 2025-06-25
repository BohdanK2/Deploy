document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail")?.value;
      const password = document.getElementById("loginPassword")?.value;

      try {
        const response = await fetch("https://deploy-amaf.onrender.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Вхід успішний!");
          localStorage.setItem("token", data.token);
          window.location.href = "account.html";
        } else {
          alert("Помилка: " + data.message);
        }
      } catch (error) {
        alert("Помилка підключення до сервера.");
      }
    });
  }
});
