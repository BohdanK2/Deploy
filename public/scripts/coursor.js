const ring = document.createElement("div");
ring.classList.add("cursor-ring");
document.body.appendChild(ring);

document.addEventListener("mousemove", (e) => {
  ring.style.top = `${e.clientY}px`;
  ring.style.left = `${e.clientX}px`;
});

document.addEventListener("mouseover", (e) => {
  if (
    e.target.tagName === "A" ||
    e.target.tagName === "BUTTON" ||
    e.target.onclick ||
    e.target.classList.contains("btn")
  ) {
    ring.classList.add("active");
  } else {
    ring.classList.remove("active");
  }
});
document.addEventListener("click", function(e) {
  const flash = document.createElement("div");
  flash.className = "click-flash";
  flash.style.left = `${e.pageX}px`;
  flash.style.top = `${e.pageY}px`;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
});