const db = require("./../models");

const getContents = async (req, res) => {
  const { id } = req.query;
  console.log(id);

  try {
    if (id) {
      const response = await db.contents.find({ _id: `${id}` });

      res.status(200).send({
        data: response,
        count: response.length,
        status: 200,
      });
    } else {
      const response = await db.contents.find();
      res.status(200).send({
        data: response,
        count: response.length,
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "cannot get article",
      error: error,
      statusCode: 500,
    });
    throw error;
  }
};
const createContent = async (req, res) => {
  const { id } = req.query;
  const body = req.body;
  console.log(id);

  const content = new db.contents({
    title: body.title,
    text: body.text,
    authorName: body.authorName,
    image: body.image,
  });

  try {
    if (id) {
      await content.save();
      const response = await db.articlesnew.findByIdAndUpdate(id, {
        $push: { contents: content._id },
      });

      res.status(200).send({
        message: " Creat content successfully",
        data: content,
        status: 200,
      });
    } else {
      const response = await content.save();
      res.status(200).send({
        message: " Creat content successfully",
        data: response,
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Create content unsuccessfully",
      data: err,
      status: 500,
    });
  }
};

const updateContent = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const response = await db.contents.findByIdAndUpdate(id, body);
    return res.status(200).send({
      message: `Update content ${id} successfully`,
      data: response,
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      messge: "cannot update content",
      data: error,
      status: 500,
    });
  }
};
const deleteContent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const response = await db.contents.findByIdAndDelete(`${id}`);
    return res.status(200).send({
      messgae: "successfully deleted content",
      data: response,
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      messge: "delete content unsuccessfully",
      data: error,
      status: 500,
    });
  }
};
module.exports = {
  getContents,
  createContent,
  updateContent,
  deleteContent,
};
