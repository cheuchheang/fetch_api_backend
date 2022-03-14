const { json } = require('express/lib/response');
const db = require('./../models');

const createNavigation = async (req, res) =>{
  const body = req.body;
  if (Object.keys(body).length == 0) {
    return res.status(400).send({
      message: "create comment unsuccessful, plese add information",
      status: "400",
    });
  }
  const navigation = new db.navigations({
    id: body.id,
    title: body.title,
    path: body.path,
    type: body.type,
  })
  try{
    const response = await navigation.save()
    res.status(200).send({
      data: response
    })
  }catch(error){
    res.status(500).send({
      error: error,
      message: "ERROR"
    })
    throw error
  }
}

const getNavigations = async (res, req) =>{
  try{
    const response = await db.navigations.find()
    res.status(200).send({
      data: response,
      message: "Success"
    })
  }catch(error){
    res.status(500).send({
      error: error,
      message: "ERROR"
  })
}}

const updateNavigation = async (res, req) =>{
  const id = req.params.id;
  const body = req.body
  try{
    const response = await db.navigations.findByIdAndUpdate(id, body);
    if(!response) return res.status(404).send({
      message: `${id} is not found`,
      statusCode: 404,
    })
    return res.status(200).send({
      data: response,
      message: "Success"
    })
  }catch(error){
    res.status(500).send({
      error: error,
      message: "ERROR"
  })
}}

const deleteNavigation = async (res, req) =>{
  const id = req.params.id;
  try{
    const response = await db.navigations.findByIdAndDelete(id);
    if(!response) return res.status(404).send({
      message: `${id} is not found`,
      statusCode: 404,
    })
    return res.status(200).send({
      data: response,
      message: "Success"
    })
  }catch(error){
    res.status(500).send({
      error: error,
      message: "ERROR"
  })
}}
module.exports = {
  getNavigations,
  createNavigation,
  updateNavigation,
  deleteNavigation,
};
