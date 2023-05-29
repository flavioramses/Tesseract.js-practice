const Tesseract = require("tesseract.js");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();

const upload = multer({ dest: "uploads/" }); // Set up Multer for file uploads

// GET | Page route
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// POST | Handle Tesseract image processing
app.post("/upload", upload.single("image"), (req, res) => {
  const imagePath = req.file.path; // Get the path of the uploaded image
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    // Use Tesseract to recognize text from the image
    Tesseract.recognize(data, "eng", { logger: (m) => console.log(m) }).then(
      ({ data: { text } }) => {
        res.send(text); // Send the recognized text as the response
      }
    );
  });
});

// Start the server and listen on port 3020
app.listen(3020, () => {
  console.log("====================================");
  console.log("Running on port 3020");
  console.log("====================================");
});
