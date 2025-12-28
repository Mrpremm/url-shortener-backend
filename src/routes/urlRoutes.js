const express=require('express');
const router=express.Router();
const {
  createShorturl,
  redirectUrl
}=require('../controllers/urlController');
router.post('/shorten',createShorturl);
router.get('/:code',redirectUrl);
module.exports=router;
