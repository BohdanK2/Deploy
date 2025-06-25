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

    const res = await fetch("https://deploy-amaf-backend.onrender.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    console.log(data);
    alert(data.message || "Signup response logged");
  });
});
