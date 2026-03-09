console.log("✅ Gmail spam scanner running");

async function checkEmails() {
  const emails = document.querySelectorAll("span.bog");

  console.log("Emails found:", emails.length);

  for (let email of emails) {
    const text = email.innerText;

    try {
      const res = await fetch("https://spam-detector-api-7s6b.onrender.com/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: text })
})
.then(res => res.json())
.then(data => {
  if (data.prediction === "Spam") {
    email.style.backgroundColor = "#ffcccc";
  } else {
    email.style.backgroundColor = "#ccffcc";
  }
});

setTimeout(checkEmails, 7000);


