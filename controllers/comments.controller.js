const db = require("./../models");
{
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                    Get all commments
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
}
const getComments = async (req, res) => {
  const { page } = req.query;
  let pages;
  let prevPage = null;
  let nextPage = null;
  let limit = 10;
  if (req.query.limit <= 0 || page <= 0) {
    res
      .status(400)
      .send({ message: "bad request or limit>0 or page >0", statusCode: 400 });
  }

  if (req.query.limit) {
    limit = req.query.limit;
  }
  try {
    const total = await db.comments.find().count();

    if (total % limit == 0) {
      pages = total / limit;
    } else {
      pages = parseInt(total / limit) + 1;
    }

    if (page) {
      const comments = await db.comments
        .find()
        .skip((page - 1) * limit)
        .limit(limit);

      if (page != 1) {
        prevPage = `http://localhost:${process.env.port}/place/comments?page=${
          Number(page) - 1
        }&limit=${limit}`;
      }

      if (page < pages) {
        nextPage = `http://localhost:${process.env.port}/place/comments?page=${
          Number(page) + 1
        }&limit=${limit}`;
      }
      res.status(200).send({
        message: "get comment success",
        data: comments,
        pages: pages,
        count: comments.length,
        total: total,
        firstPage: `http://localhost:${process.env.port}/place/comments?page=1&limit=${limit}`,
        prevPage: prevPage,
        nextPage: nextPage,
        lastPage: `http://localhost:${process.env.port}/place/comments?page=${pages}&limit=${limit}`,
      });
    } else {
      const comments = await db.comments.find();
      res
        .status(200)
        .send({ data: comments, count: comments.length, total: total });
    }
  } catch (err) {
    res.status(500).send({ statusCode: 500, message: err });
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
