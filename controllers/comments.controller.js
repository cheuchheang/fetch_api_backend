const db = require("./../models");
{
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                    Get all commments
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
}
const getComments = async (req, res) => {
  try {
    const response = await db.comments.find();
    res.status(200).send({
      message: "get comment success",
      data: response,
      count: response.length,
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: "Unsuccessful",
      error: error,
      statusCode: 500,
    });
    throw error;
  }
};
{
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                    Create a comment
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
}
const createComment = async (req, res) => {
  const body = req.body;
  if (Object.keys(body).length == 0) {
    return res.status(400).send({
      message: "create comment unsuccessful, plese add information",
      status: "400",
    });
  }
  const comment = new db.comments({
    comment: body.comment,
    idRoute: body.idRoute,
    userName: body.userName,
    userPhotoURL: body.userPhotoURL,
    starReview: body.starReview,
  });
  try {
    const response = await comment.save();
    res.status(200).send({
      message: "create comment successful",
      data: response,
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: "create comment unsuccessful",
      data: error,
      status: 500,
    });
  }
};
{
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                    Update a comment
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
}
const updateComment = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const response = await db.comments.findByIdAndUpdate(id, body);
    return res.status(200).send({
      message: `update comment successful id: ${id}`,
      data: response,
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "update comment unsuccessful",
      data: error,
      status: 500,
    });
  }
};
{
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                    Delete a comment
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
}
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db.comments.findByIdAndDelete(id);
    return res.status(200).send({
      message: `delete comment successful id: ${id}`,
      data: response,
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "delete comment unsuccessful",
      data: error,
      status: 500,
    });
  }
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
