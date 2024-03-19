const checkLogin = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const ValidateRequest = require("../../middlewares/validate-request.middleware");
const userCtrl = require("./user.controller");
const { editProfileSchema } = require("./user.validator");

const userRouter = require("express").Router();

// directory setup middleware for file upload distination(will use later in uploader midd.)
const dirSetup = (req, res, next) => {
  const uploadDir = "./public/uploads/user";
  req.uploadDir = uploadDir;
  next();
};

// read
userRouter.get("/:id", checkLogin, userCtrl.getUser);
userRouter.get("/:id/followers", checkLogin, userCtrl.getUserFollowers);
userRouter.get("/:id/following", checkLogin, userCtrl.getUserFollowing);

// update
userRouter.patch(
  "/:id/editProfile",
  checkLogin,
  dirSetup,
  uploader.single('picturePath'),
  ValidateRequest(editProfileSchema),
  userCtrl.editProfile
);
userRouter.patch("/:id/:followingId", checkLogin, userCtrl.addRemoveFollowing);

module.exports = userRouter;
