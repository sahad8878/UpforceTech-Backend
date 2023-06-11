const path = require("path");

const User = require("../model/user");

// POST || postAddUserData

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

// GET || getUserData

const getUserData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const search = req.query.search || "";
    const query = {};
    if (search !== "") {
      query.$or = [
        { email: { $regex: new RegExp(`^${search}.*`, "i") } },
        { fName: { $regex: new RegExp(`^${search}.*`, "i") } },
        { lName: { $regex: new RegExp(`^${search}.*`, "i") } }
      ];
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

// GET || getEditUserData

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

// POST || postEditUserData

const postEditUserData = async (req, res) => {
  try {
    const { fName, lName, email, number, gender, status, location, userId } =
      req.body;
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

// DELETE || deleteUserData

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

// GET || getSingleUserDetails

const getSingleUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    if (user) {
      res.status(201).json({ user, success: true });
    } else {
      res.status(200).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `getSingleUserDetails  controller ${error.message}`,
    });
  }
};

// PATCH || pachActiveUserStatus

const pachActiveUserStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.query.id },
      {
        $set: {
          status: "Active",
        },
      },
      { new: true }
    );
    if (user) {
      res
        .status(201)
        .json({
          success: true,
          message: `${user.fName} status successfully activated`,
        });
    } else {
      res.status(200).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `pachActiveUserStatus  controller ${error.message}`,
    });
  }
};

// PATCH || pachInActiveUserStatus

const pachInActiveUserStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.query.id },
      {
        $set: {
          status: "InActive",
        },
      },
      { new: true }
    );
    if (user) {
      res
        .status(201)
        .json({
          success: true,
          message: `${user.fName} status successfully inactivated`,
        });
    } else {
      res.status(200).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `pachActiveUserStatus  controller ${error.message}`,
    });
  }
};

module.exports = {
  postAddUserData,
  getUserData,
  getEditUserData,
  postEditUserData,
  deleteUserData,
  getSingleUserDetails,
  pachActiveUserStatus,
  pachInActiveUserStatus,
};
