document.getElementById("check").addEventListener("click", async () => {
  const message = document.getElementById("msg").value;

  const res = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "message=" + encodeURIComponent(message)
  });

  const data = await res.json();

  document.getElementById("result").innerText =
    data.prediction + " (" + data.probability + "%)";
});
