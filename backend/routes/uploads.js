const express = require("express");
const router = express.Router();
const multer = require("multer");
const { bucket } = require("../config/firebase");
const upload = multer({ storage: multer.memoryStorage() });

// Upload pliku
router.post("/file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("Brak pliku");

    const file = bucket.file(Date.now() + "_" + req.file.originalname);
    const stream = file.createWriteStream({
      metadata: { contentType: req.file.mimetype }
    });

    stream.on("error", (err) => res.status(500).send(err));
    stream.on("finish", async () => {
      await file.makePublic(); // udostępnia publicznie URL
      res.json({ url: file.publicUrl() });
    });

    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd uploadu");
  }
});

module.exports = router;
