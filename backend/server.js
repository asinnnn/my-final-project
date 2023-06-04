const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");
const { MongoClient, ObjectId, Binary, BinData } = require("mongodb");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

require("dotenv").config();

const PORT = 4000;
const app = express();

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const login = async (email, password, callback) => {
  try {
    const client = new MongoClient("mongodb://user:pass@localhost");
    await client.connect();

    const db = client.db("finalProject");
    const users = db.collection("users");

    const user = await users.findOne({ email: email });
    if (!user) {
      client.close();
      throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);
    client.close();

    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    callback(null, {
      user_id: user._id.toString(),
      nickname: user.nickname,
      email: user.email,
    });
  } catch (err) {
    callback(err);
  }
};

const dbConnection = async () => {
  const client = new MongoClient(process.env.MONGO_URI);

  await client.connect();
  try {
    const db = await client.db("finalProject");
    return db;
  } catch (err) {
    console.log("error:", err);
  }
};

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "16mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "16mb",
    extended: true,
    parameterLimit: 16000,
  })
);
// API ENDPOINTS

// HOMEPAGE
app.get("/index", async (req, res) => {
  // query
  const db = await dbConnection();

  try {
    const result = await db
      .collection("patternPost")
      .find()
      .sort({ _id: -1 })
      .toArray();
    // authentification checks and password checks
    if (result && result.length > 0) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Pattern posts accessed",
        data: result,
      });
    }
    return res.status(400).json({
      status: 400,
      success: false,
      message: "There are no posts here.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong, try again later.",
    });
  }
});

// UPLOAD PAGE
app.post("/post/upload", async (req, res) => {
  // query
  const db = await dbConnection();
  const {
    title,
    username,
    processFile,
    sourceLink,
    fitPic,
    garmentType,
    description,
  } = req.body;

  const fitPicBuffer = Buffer.from(fitPic, "base64");
  const fitPicBinary = new Binary(fitPicBuffer);

  const processBuffer = Buffer.from(processFile, "base64");
  const processBinary = new Binary(processBuffer);

  const o_id = new ObjectId();

  try {
    const result = await db.collection("patternPost").insertOne({
      _id: o_id,
      username,
      title,
      processFile: processBinary,
      sourceLink,
      fitPic: fitPicBinary,
      garmentType,
      description,
    });

    if (result.acknowledged) {
      console.log(result._id);
      return res
        .status(201)
        .json({ status: 201, success: true, message: "Post created." });
    }

    console.log(_id);
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Post not uploaded.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong, try again later.",
    });
  }
});

// USER PAGE
app.get("/users/:username", async (req, res) => {
  // query
  const { username } = req.params;
  const db = await dbConnection();

  console.log(username.toString());

  try {
    const result = await db
      .collection("patternUser")
      .find({ username: username })
      .toArray();

    if (result && result.length > 0) {
      return res.status(200).json({
        status: 201,
        success: true,
        message: "User found",
        data: result[0],
      });
    }
    return res.status(404).json({
      status: 404,
      success: false,
      message: "User not found.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong, try again later.",
    });
  }
});
// CREATE USER PAGE
app.post("/user/newuser", async (req, res) => {
  // query
  const db = await dbConnection();
  const { username, password, firstName, lastName, email, icon, bio, link } =
    req.body;

  const iconBuffer = Buffer.from(icon, "base64");
  const iconBinary = new Binary(iconBuffer);

  try {
    const result = await db
      .collection("patternUser")
      .insertOne({
        username,
        password,
        firstName,
        lastName,
        email,
        icon: iconBinary,
        bio,
        link,
      });

    // credential checks
    const validateUsername = (username) => {
      return username.length >= 5;
    };

    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // const isUsernameValid = await validateUsername(username);
    const isPasswordValid = await validatePassword(password);

    //if all checks are passed
    // const isAllValid = isUsernameValid;
    const isAllValid = isUsernameValid && isPasswordValid;
    if (result.acknowledged && isAllValid) {
      return res.status(201).json({
        status: 201,
        success: true,
        message: "User created.",
      });
    }
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Error creating new user.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Error creating new user.",
    });
  }
});
// POSTDETAILS PAGE
app.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const o_id = new ObjectId(postId);

  const db = await dbConnection();

  try {
    const result = await db
      .collection("patternPost")
      .find({ _id: o_id })
      .toArray();

    if (result && result.length > 0) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Pattern detail accessed",
        data: result,
      });
    }

    return res.status(404).json({
      status: 404,
      success: false,
      message: "There is no post found.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong, try again later.",
    });
  }
});

//LOGIN
app.get("/user/login", async (req, res) => {
  const { username, password } = req.query;

  try {
    const db = await dbConnection();
    const userCollection = await db.collection("loginUser");

    const result = await userCollection.findOne({ username });
    if (result) {
      bcrypt.compare(password, result.password, function (err, isValid) {
        if (err || !isValid) {
          res.status(401).json({ message: "Invalid login credentials" });
        } else {
          login(result.email, password, function (err, user) {
            if (err) {
              console.log("Error during authentication:", err);
              res.status(500).json({
                status: 500,
                success: false,
                message: "Something went wrong, try again later.",
              });
            } else {
              res.json({ message: "Login successful", user });
            }
          });
        }
      });
    } else {
      res.status(401).json({ message: "Invalid login credentials" });
    }
  } catch (err) {
    console.log("Error during authentication:", err);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong, try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});
