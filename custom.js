document.addEventListener("DOMContentLoaded", () => {
  const tablinks = document.getElementsByClassName("tab-links");
  const tabcontents = document.getElementsByClassName("tab-contents");

  function opentab(event, tabname) {
    for (let tablink of tablinks) { 
      tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) { 
      tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
  }

  // Attach event listeners to tab links if not using inline onclick
  for (let tablink of tablinks) {
    tablink.addEventListener("click", (event) => {
      opentab(event, tablink.getAttribute("data-tab"));
    });
  }

  // Google Sheets form handling
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzWUaBh1gakReOxrX96qeTmznw44Uoif106HYIa0nanA4pwBA4yCyaUbtAesZcq5RZqqw/exec';
  const form = document.forms['submit-to-google-sheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Message Sent Successfully";
        setTimeout(() => {
          msg.innerHTML = "";
        }, 3000); 
        form.reset();
      })
      .catch(error => console.error('Error!', error.message));
  });
});
