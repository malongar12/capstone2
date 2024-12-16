const router = require("express").Router();
const db = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleWare/auth");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("file");

//register route

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // check db to see if there already a user with the username
    const duplicateUser = await db.query(
      `SELECT username FROM users WHERE username = $1`,
      [username]
    );
    if (duplicateUser.rows[0]) {
      res.json({
        error:
          "username is already in use. Please choose a different username.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      await db.query(
        `INSERT into users(username, email, password)
          VALUES($1, $2, $3)`,
        [username, email, hashedPassword]
      );

      res.status(200).send("account created successfully");
    }
  } catch (error) {
    console.log(error);
  }
});

//login route

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username && !password) {
      res.send("input field are require");
    }

    const isValidUser = await db.query(
      `SELECT username, id, img, password FROM users WHERE username = $1`,
      [username]
    );
    const user = isValidUser.rows[0];

    const passwordCHeck = await bcrypt.compare(password, user.password);

    if (!isValidUser.rows[0]) {
      res.json({ error: "the username or password you enter is incorrect" });
    } else if (!passwordCHeck) {
      res.json({ error: "the username or password you enter is incorrect" });
    } else {
      const payload = {
        id: user.id,
        username: user.username,
      };

      jwt.sign(payload, "mySecret", (err, token) => {
        if (err) {
          res.send(err.message);
        }

        res.json({
          token,
          id: user.id,
          username: user.username,
          img: user.img,
        });
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});



//edit user route

router.patch("/edit/user", upload, verifyToken, async (req, res) => {
  const { username, email, passowrd } = req.body;
  const file = req.file.filename;
  const token = req.headers.authorization.split(" ")[1];
  const validToken = jwt.decode(token);

  if (!validToken) {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (!username && !email && !passowrd && !file) {
    res.json({ error: "At least one field must be provided to update" });
  }

  try {
    if (username) {
      let updateUser = await db.query(
        "UPDATE users SET username = $1 WHERE id = $2 RETURNING username",
        [username, validToken.id]
      );
      let updateUserName = updateUser.rows[0];

      res.send(`${updateUserName.username} updated successfully`);
    } else if (email) {
      let updateEmail = await db.query(
        "UPDATE users SET email = $1 WHERE id = $2 RETURNING email",
        [email, validToken.id]
      );
      res.send(`${updateEmail.rows[0].email} updated successfully`);
    } else if (passowrd) {
      const hashedPassword = await bcrypt.hash(passowrd, 12);

      await db.query("UPDATE users SET password = $1 WHERE id = $2", [
        hashedPassword,
        validToken,
      ]);
      res.send("password updated successfully");
    }
    if (file) {
      await db.query("UPDATE users SET img = $1 WHERE id = $2", [
        file,
        validToken.id,
      ]);
      res.send("image updated successfully")
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/user", verifyToken, async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodeToken = jwt.decode(token);
  try {
    if (decodeToken) {
      await db.query("DELETE FROM users WHERE id = $1", [decodeToken.id]);
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
