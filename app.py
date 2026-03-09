from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)

# CORS allow all origins
CORS(app)

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route("/")
def home():
    return "Spam Detector API Running"

@app.route("/predict", methods=["POST"])
def predict():
    message = request.form.get("message")

    data = vectorizer.transform([message])
    result = model.predict(data)[0]
    prob = model.predict_proba(data)[0][1]

    return jsonify({
        "prediction": "Spam" if result == 1 else "Not Spam",
        "probability": round(prob * 100, 2)
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
