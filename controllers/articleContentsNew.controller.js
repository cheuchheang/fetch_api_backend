const db = require("./../models");
// const { response } = require("express");

const getArticleContentsNew = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  // we can write const {title,page} = req.query;

  try {
    if (id) {
      const response = await db.articlesnew
        .find({ _id: `${id}` })
        .populate("contents");
      res.status(200).send({
        data: response,
        count: response.length,
        status: 200,
      });
    } else {
      const response = await db.articlesnew.find();
      res.status(200).send({
        data: response,
        count: response.length,
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "cannot get article",
      error: error,
      statusCode: 500,
    });
    throw error;
  }
};

const createArticleContentNew = async (req, res) => {
  const body = req.body;
  console.log(req);
  const articlenew = new db.articlesnew({
    title: body.title,
    text: body.text,
    authorName: body.authorName,
    image: body.image,
  });

  try {
    const response = await articlenew.save();
    res.status(200).send({
      message: " Creat Article successfully",
      data: response,
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: "Create article unsuccessfully",
      data: err,
      status: 500,
    });
  }
};

const updateArticleContentNew = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const response = await db.articlesnew.findByIdAndUpdate(id, body);
    return res.status(200).send({
      message: `Update article ${id} successfully`,
      data: response,
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      messge: "cannot update article",
      data: error,
      status: 500,
    });
  }
};

const deleteArticleContentNew = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db.articlesnew.findByIdAndDelete(id);
    return res.status(200).send({
      messgae: "successfully deleted article",
      data: response,
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      messge: "delete article unsuccessfully",
      data: error,
      status: 500,
    });
  }
};
module.exports = {
  getArticleContentsNew,
  createArticleContentNew,
  updateArticleContentNew,
  deleteArticleContentNew,
};

// const db = require(" ./../../models/articleContents.model");
// const { response } = require("express");

// const getArticleContents = async (req,res)=>{
//   try{
//   const response = await db.articles.find();
//   res.status(200).send({
//     message:"get article successfully",
//     data: response,
//     count:response.length,
//     status:200,
//   });
//   }
//   catch(err){
//     res.status(500).send({
//       message:"cannot get article",
//       error: error,
//       statusCode:500,
//     });
//     throw error;
//   }
// }

// const createArticleContent = async(req,res)=>{
//   const body = req.body;
//   const article = new db.articles({
//     datetime:body.datetime,
//     lowerContent:body.lowerContent,
//     upperContent:body.upperContent,
//     name:body.name,
//     title:body.title,
//     placeUrl:body.placeUrl,
//   })
//   try{
//     const response = await article.save();
//     res.status(200).send({
//        message:" Creat Article successfully",
//        data:response,
//        status:200,
//     })
//   }
//   catch(err){
//     res.status(500).send({
//       message:"Create article unsuccessfully",
//       data:error,
//       status:500,
//     })
//   }
// }

// const updateArticleContent= async(req,res)=>{
//   const {id}= req.params;
//   const body= req.body;
//   try{
//     const response = await db.articles.findByIdAndUpdate(id,body);
//     return res.status(200).send({
//       message:`Update article ${id} successfully`,
//       data: response,
//       status:200,
//     });
//   }
//   catch(error){
//     res.status(500).send({
//       messge:'cannot update article',
//       data:error,
//       status:500,
//     })
//   }
//  }

//  const deleteArticleContent = async(req,res)=>{
//   const {id} = req.params;
//   try{
//      const response = await db.articles.findByIdAndDelete(id);
//      return res.status(200).send({
//        messgae:"successfully deleted",
//        data:response,
//        status:200,
//      })
//    }
//    catch(error){
//       res.status(500).send({
//         messge:"delete article unsuccessfully",
//         data:error,
//         status:500,
//       })
//    }
//  }
//   module.exports = {
//   getArticleContents,
//   createArticleContent,
//   updateArticleContent,
//   deleteArticleContent,
// };
