const Url = require('../models/Url');
const { nanoid } = require('nanoid');

// POST → Create Short URL
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: 'URL is required' });
    }

    const shortCode = nanoid(6);

    const newUrl = await Url.create({
      originalUrl,
      shortCode
    });

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET → Redirect Short URL
exports.redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
