const path = require("path");

const User = require("../model/user");

const postAddUserData = async (req, res) => {
  try {
    const { fName, lName, email, number, gender, status, location } = req.body;

    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      const fileName = req.file.filename;
      const filePath = `uploads/${fileName}`;
      const fileUrl = path.join(fileName);
      const newUser = new User({
        fName,
        lName,
        email,
        number,
        gender,
        status,
        location,
        profile: fileUrl,
      });
      await newUser.save().then((user) => {
        console.log(user, "new user");
        res
          .status(201)
          .json({ user, success: true, message: "User successfully added" });
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: `This ${email} allready exist ` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `postuserData  controller ${error.message}`,
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const search = req.query.search || "";
    console.log(page, limit, search, "search");
    const query = {};
    if (search !== "") {
      query.email = { $regex: new RegExp(`^${search}.*`, "i") };
    }
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(201).json({
      users,
      success: true,
      currentPage: page,
      totalPages: Math.ceil((await User.countDocuments(query)) / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `getUserData  controller ${error.message}`,
    });
  }
};

const getEditUserData = async (req, res) => {
  try {
    const userId = req.query.userId || "";

    const user = await User.findById(userId);
    if (user) {
      res.status(201).json({ user, success: true });
    } else {
      res.status(200).json({ success: false, message: "User not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `getEditUserData  controller ${error.message}`,
    });
  }
};

const postEditUserData = async (req, res) => {
  try {
    const { fName, lName, email, number, gender, status, location, userId } =
      req.body;
    console.log(
      fName,
      lName,
      email,
      number,
      gender,
      status,
      location,
      userId,
      "edit req.body"
    );
    console.log(req.file.filename);
    const fileName = req.file.filename;
    const filePath = `uploads/${fileName}`;
    const fileUrl = path.join(fileName);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          fName,
          lName,
          email,
          number,
          gender,
          status,
          location,
          profile: fileUrl,
        },
      },
      { new: true }
    );
    console.log(user, "user");
    if (user) {
      res
        .status(201)
        .json({ user, success: true, message: "User updated Successfully" });
    } else {
      res.status(200).json({ success: false, message: "User not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `postEditUserData  controller ${error.message}`,
    });
  }
};

const deleteUserData = async (req, res) => {
  try {
    let user = await User.findByIdAndRemove(req.query.id);

    if (user) {
      res
        .status(201)
        .json({ success: true, message: "User deleted Successfully" });
    } else {
      res.status(200).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `deleteuserdata  controller ${error.message}`,
    });
  }
};


const getSingleUserDetails = async (req, res) => {
  try{
const user = await User.findById(req.query.id)
if(user) {
  res
  .status(201)
  .json({user, success: true, });
}else {
  res.status(200).json({ success: false, message: "User not found" });
}

} catch (error) {
  console.log(error);
  res.status(500).json({
    success: false,
    message: `getSingleUserDetails  controller ${error.message}`,
  });
}
}

module.exports = {
  postAddUserData,
  getUserData,
  getEditUserData,
  postEditUserData,
  deleteUserData,
  getSingleUserDetails
};
