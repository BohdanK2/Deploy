function openPopup(id) {
    document.getElementById("popup-overlay").classList.remove("hidden");
    document.getElementById(id).classList.remove("hidden");
  }
  
  function closePopup(id) {
    document.getElementById("popup-overlay").classList.add("hidden");
    document.getElementById(id).classList.add("hidden");
  }
  
  function switchPopup(closeId, openId) {
    closePopup(closeId);
    openPopup(openId);
  }
