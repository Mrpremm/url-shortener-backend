const Url=require('../models/Url');
const {nanoid}=require('nanoid');

//Post

exports.createShortUrl=async(req,res)=>{
  try{
    const {originalUrl}=req.body;
    if(!originalUrl){
      return res.status(400).json({message: 'URL is required'});

    }
    const shortCode=nanoid(6);
    const newUrl =await Url.create({
      originalUrl,
      shortCode
    });
    res.status(201),json({
      shortUrl:`${process.env.BASE_URL}/${shortCode}`
    });
    
  }catch(err){
      res.status(500).json({error:error.message});
  }
}

//Get
exports.redirectUrl=async(req,res)=>{
  try{
    const {shortCode}=req.params;
    const url=await Url.findOne({shortCode});
    if(!url){
      return res.status(404).json({message:'Url not found'});

    }
    res.redirect(url.originalUrl);

  }catch(err){
    res.status(500),json({error:err.message});
  }
}