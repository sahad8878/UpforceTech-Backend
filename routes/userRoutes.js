const express = require("express");
const {upload} = require("../middlewares/multer")

const {
  postAddUserData,
  getUserData,
  getEditUserData,
  postEditUserData,
  deleteUserData,
  getSingleUserDetails
  } = require("../controller/userController");

  // router object
  const router = express.Router();

  router.post("/add-userData",upload.single("file") , postAddUserData)
  router.post("/edit-UserData",upload.single("file"),postEditUserData)

  router.get("/fech-userData",getUserData)
  router.get("/fech-editUserData",getEditUserData)
  router.get("/view-UserDetails",getSingleUserDetails)
  
  router.delete("/delet-UserData",deleteUserData)




  module.exports = router;