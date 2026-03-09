console.log("✅ Gmail spam scanner running");

async function checkEmails() {
  const emails = document.querySelectorAll("span.bog");

  console.log("Emails found:", emails.length);

  for (let email of emails) {
    const text = email.innerText;

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "message=" + encodeURIComponent(text)
      });

      const data = await res.json();

      if (data.prediction === "Spam") {
        email.style.backgroundColor = "#ffcccc";
      } else {
        email.style.backgroundColor = "#ccffcc";
      }

    } catch (err) {
      console.error("❌ API error:", err);
    }
  }
}

setTimeout(checkEmails, 7000);
