const db = require(" ./../../models/articleContents.model");
const { response } = require("express");

const getArticleContents = async (req,res)=>{
  try{
  const response = await db.articles.find();
  res.status(200).send({
    message:"get article successfully",
    data: response,
    count:response.length,
    status:200,
  });
  }
  catch(err){
    res.status(500).send({
      message:"cannot get article",
      error: error,
      statusCode:500,
    });
    throw error;
  }
}


const createArticleContent = async(req,res)=>{
  const body = req.body;
  const article = new db.articles({
    datetime:body.datetime,
    lowerContent:body.lowerContent,
    upperContent:body.upperContent,
    name:body.name,
    title:body.title,
    placeUrl:body.placeUrl,
  })
  try{
    const response = await article.save();
    res.status(200).send({
       message:" Creat Article successfully",
       data:response,
       status:200,
    })
  }
  catch(err){
    res.status(500).send({
      message:"Create article unsuccessfully",
      data:error,
      status:500,
    })
  }
}



const updateArticleContent= async(req,res)=>{
  const {id}= req.params;
  const body= req.body;
  try{
    const response = await db.articles.findByIdAndUpdate(id,body);
    return res.status(200).send({
      message:`Update article ${id} successfully`,
      data: response,
      status:200,
    });
  }
  catch(error){
    res.status(500).send({
      messge:'cannot update article',
      data:error,
      status:500,
    })
  }
 }



 const deleteArticleContent = async(req,res)=>{
  const {id} = req.params;
  try{
     const response = await db.articles.findByIdAndDelete(id);
     return res.status(200).send({
       messgae:"successfully deleted",
       data:response,
       status:200,
     })
   }
   catch(error){
      res.status(500).send({
        messge:"delete article unsuccessfully",
        data:error,
        status:500,
      })
   }
 }
  module.exports = {
  getArticleContents,
  createArticleContent,
  updateArticleContent,
  deleteArticleContent,
};
