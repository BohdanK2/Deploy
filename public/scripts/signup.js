document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");

  if (!form) {
    console.warn("⚠️ signup-form не найден");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username")?.value;
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    const password2 = document.getElementById("password2")?.value;

    if (password !== password2) {
      alert("Паролі не співпадають!");
      return;
    }

    const res = await fetch("https://deploy-amaf.onrender.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    console.log(data);
    alert(data.message || "Signup response logged");
  });
});
