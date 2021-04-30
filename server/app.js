const express = require("express");
const app = express();
const bp = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const dbconnect = require("./models/dbconnect");
const authchecker = require("./middleware/auth-middleware");
const adminAuthChecker = require("./middleware/admin-middleware");
var cors = require("cors");
app.use("/", router);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));
app.use(cors());
router.use(cors());



router.get("/", (req, res) => {
  try {
    const token = req.get("Cookie").split("token=")[1].trim();
    const user = jwt.verify(token, "SECRETKEY");
    console.log(user);
    res.render("home", {
      data: {
        loginStatus: user.loginStatus,
      },
    });
  } catch (error) {
    res.render("home", { data: { err: false, msg: "", loginStatus: false } });
  }
});
router.get("/profile", authchecker, (req, res, next) => {
  res.render("profile", { data: { err: false, msg: "" } });
});

router.get("/getloginstatus", (req, res, next) => {
  // console.log("request login status");
  // console.log(req.get("Cookie"));
  console.log(req.url);
  try {
    const token = req.get("Cookie").split("token=")[1].trim();
    const user = jwt.verify(token, "SECRETKEY");
    if (user.loginStatus == true) {
      return res.send({
        data: {
          err: false,
          loginStatus: user.loginStatus,
          username: user.username,
          role: user.role,
        },
      });
    }
  } catch (error) {
    console.log("not login yet");
    return res.send({
      data: {
        err: true,
        loginStatus: false,
        msg: "please login first",
      },
    });
  }
});
router.get("/aboutus", (req, res) => {
  res.sendFile(__dirname + "/views/aboutus.html");
});
router.get("/login", (req, res) => {
  res.render("login", { data: { err: false, msg: "" } });
});
/**
 * reqest to login
 * if username and password are correct,
 * it will create token and then redirect to profile page.
 */
router.post("/postlogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username,password);
  if (!username || !password) {
    return res.send({
      data: { err: true, msg: "Invalid username or password" },
    });
  }
  dbconnect.query(
    "SELECT password,role FROM user WHERE username = ?",
    username,
    (error, result) => {
      if (error) throw error;
      // console.log(result);
      if (result.length == 0) {
        console.log("no user in database");
        return res.send({
          data: { err: true, msg: "username does not exit" },
        });
      } else {
        const role = result[0].role;
        bcrypt.compare(password, result[0].password).then((result) => {
          if (result) {
            const token = jwt.sign(
              { username: username, loginStatus: true, role: role },
              "SECRETKEY",
              { expiresIn: 60 * 1 }
            );
            res.setHeader("Set-Cookie", "token=" + token);
            return res.send({
              data: {
                err: false,
                msg: "correct username and password",
                token: token,
                role: role,
              },
            });
          } else {
            console.log("wrong password");
            return res.send({
              data: { err: true, msg: "Password was not correct" },
            });
          }
        });
      }
    }
  );
});
//for ejs lazy to change the structure of the ejs.files
router.post("/postlogin2", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username,password);
  if (!username || !password) {
    // return res.send({data : {err : true, msg : "Invalid username or password"}});
    return res.render("login", {
      data: { err: true, msg: "Invalid username or password" },
    });
  }
  dbconnect.query(
    "SELECT password,role FROM user WHERE username = ?",
    username,
    (error, result) => {
      if (error) throw error;
      if (result.length == 0) {
        console.log("no user in database");
        return res.render("login", {
          data: { err: true, msg: "username does not exit" },
        });
      } else {
        const role = result[0].role;
        bcrypt.compare(password, result[0].password).then((result) => {
          if (result) {
            const token = jwt.sign(
              { username: username, loginStatus: true, role: role },
              "SECRETKEY",
              { expiresIn: 60 * 1 }
            );
            res.setHeader("Set-Cookie", "token=" + token);
            res.redirect("profile");
          } else {
            console.log("wrong password");
            res.render("login", {
              data: { err: true, msg: "Password was not correct" },
            });
          }
        });
      }
    }
  );
});
router.get("/register", (req, res) => {
  res.render("register", { data: { err: false, msg: "" } });
});
router.post("/postregister", (req, res) => {
  console.log(req.body);
  const hash = bcrypt.hashSync(req.body.password, 12);
  let new_user = {
    ufname: req.body.ufname,
    ulname: req.body.ulname,
    username: req.body.username,
    password: hash,
    email: req.body.email,
    age: req.body.age,
    address: req.body.address,
    role: "user",
  };
  dbconnect.query("INSERT INTO user SET ?", new_user, (error, result) => {
    if (error) {
      if (error.errno == 1062) {
        return res.send({
          data: {
            err: true,
            msg: "This user name already used.",
          },
        });
      }
    } else {
      const token = jwt.sign(
        { username: new_user.username, loginStatus: true, role: new_user.role },
        "SECRETKEY",
        { expiresIn: 60 * 1 }
      );
      res.setHeader("Set-Cookie", "token=" + token);
      return res.send({
        data: {
          err: true,
          msg: "now you can visit <a href='/profile'>profile page</a>.",
        },
      });
    }
  });
});
//for ejs
router.post("/postregister2", (req, res) => {
  console.log(req.body);
  const hash = bcrypt.hashSync(req.body.password, 12);
  let new_user = {
    ufname: req.body.ufname,
    ulname: req.body.ulname,
    username: req.body.username,
    password: hash,
    email: req.body.email,
    age: req.body.age,
    address: req.body.address,
    role: "user",
  };
  dbconnect.query("INSERT INTO user SET ?", new_user, (error, result) => {
    if (error) {
      if (error.errno == 1062) {
        return res.render("register", {
          data: {
            err: true,
            msg: "This user name already used.",
          },
        });
      }
    } else {
      const token = jwt.sign(
        { username: new_user.username, loginStatus: true, role: new_user.role },
        "SECRETKEY",
        { expiresIn: 600 }
      );
      res.setHeader("Set-Cookie", "token=" + token);
      return res.render("register", {
        data: {
          err: true,
          msg: "now you can visit <a href='/profile'>profile page</a>.",
        },
      });
    }
  });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.get("/stock", adminAuthChecker, (req, res) => {
  return res.redirect("http://localhost:3000/stock");
  // return res.send({msg: 'Do I have to do stock page on phase2?'})
});
router.get("/usermanage", adminAuthChecker, (req, res) => {
  return res.redirect("http://localhost:3000/usermanage");
  // return res.send({msg: 'Do I have to do user manage page on phase2?'})
});

router.get("/search", (req, res) => {
  return res.sendFile(__dirname + "/views/search.html");
});
router.get("/result", (req, res) => {
  return res.sendFile(__dirname + "/views/result.html");
});

//user request to search information. I just forward to result page. Query data will perform in result page.
router.get("/searchinfo/:name/:sortByPrice/:type", (req, res) => {
  const name = req.params.name;
  const sortByPrice = req.params.sortByPrice;
  const type = req.params.type;
  console.log(name, sortByPrice, type);
  res.redirect(`/result?search=${name}&op1=${sortByPrice}&op2=${type}`);
});

//TASK2.2, 2.3
/***
 * request search product
 *  -if you want to search all, /results/none/none/none
 *  -if you want to search by name only, /results/{name}/none/none
 *  -if you want to search by name with sort by price, /results/{name}/{ASC or DESC}/none
 *  -if you want to search by name with sort by price and type, /results/{name}/{ASC or DESC}/{cassette or vinyl or film} ** you can select more than 1 type.
 */
/**
 * TEST CAST for SEARCH PRODUCT
 * METHOD GET
 *  -search all
 *    url : localhost:3001/results/none/none/none
 *  -search by name
 *    url : localhost:3001/results/kodak/none/none
 *  -search by name and sort low to high price.
 *    url : localhost:3001/results/fuji/asc/none
 *  -search by name and type
 *    url : localhost:3001/results/fuji/none/'film'
 */
router.get("/results/:name/:sortByPrice/:type", (req, res) => {
  var name = req.params.name === "none" ? "" : req.params.name;
  var sortByPrice =
    req.params.sortByPrice === "none" ? "" : req.params.sortByPrice;
  var type = req.params.type === "none" ? "" : req.params.type;
  console.log(name, sortByPrice, type);
  if (sortByPrice !== "") sortByPrice = `ORDER BY price ${sortByPrice}`;
  if (type !== "") type = `and type IN (${type})`;
  var sql = `SELECT * FROM shop_db.product WHERE pName LIKE '%${name}%' ${type} ${sortByPrice}`;
  console.log(sql);
  dbconnect.query(sql, (error, results, fields) => {
    if (error) {
      res.send({
        data: {
          err: true,
          msg: "Error occur",
        },
      });
      throw error;
    } else {
      console.log(results.length + " rows returned");
      // allow cors
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      return res.send({
        err: false,
        msg: `lists[${results.length} rows].`,
        data: results,
      });
    }
  });
});
/**
 * search by Id product
 */
router.get("/results/:id", (req, res) => {
  var pid = req.params.id;
  var sql = `SELECT * FROM shop_db.product WHERE pId = ${pid}`;
  console.log(sql);
  dbconnect.query(sql, (error, results, fields) => {
    if (error) {
      res.send({
        data: {
          err: true,
          msg: "Error occur",
        },
      });
      throw error;
    } else {
      console.log(results.length + " rows returned");
      // allow cors
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      return res.send({
        err: false,
        msg: `lists[${results.length} rows].`,
        data: results,
      });
    }
  });
});
/**
 * TEST CASE for INSERT PRODUCT
 * METHOD POST
 * url : localhost:3001/insertproducts
 * body : json
* {
      "pName" : "Hikari",
      "price" : "250",
      "detail" : "none",
      "Image" : "https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/Vinyl1.png?raw=true",
      "type" : "vinyl"
  } 
  {
    "pName" : "Leave the Door Open",
    "price" : "450",
    "detail" : "The official music video for Bruno Mars, Anderson .Paak, Silk Sonic's new single 'Leave the Door Open'",
    "Image" : "https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/Vinyl2.png?raw=true",
    "type" : "vinyl"
  }
 */
router.post("/insertproducts", (req, res) => {
  console.log(req.body);
  var products = req.body;
  if ((!products.pName, !products.price, !products.type)) {
    return res.send({
      err: true,
      msg: "Please insert all name, price ,and type",
    });
  }
  dbconnect.query(
    "INSERT INTO shop_db.product SET ?",
    products,
    (error, results, fields) => {
      if (error) {
        return res.send({ err: true, msg: "Error occur" });
      }
      return res.send({
        err: false,
        msg: `product ${products.pName} has been added`,
      });
    }
  );
});
/***
 * TEST CASE for DELETE PRODUCT
 * METHOD DELETE
 * url : localhost:3001/deleteproducts
 * body : json
 * {
    "pId" : "1"
    }
    {
    "pId" : "10"
    }
 */
//request delete product
router.delete("/deleteproducts", (req, res) => {
  var pId = req.body.pId;
  dbconnect.query(
    `DELETE FROM shop_db.product WHERE pId = ?`,
    [pId],
    (error, results) => {
      if (error) {
        return res.send({ err: true, msg: "Error occur" });
      }
      return res.send({ err: false, msg: `product ${pId} has been deleted` });
    }
  );
});
/***
 * TEST CASE for UPDATE PRODUCT
 * METHOD PUT
 * url : localhost:3001/updateproducts
 * body : json
 *  {
      "price" : "320",
      "pId" : "10"
    }
    {
    "price" : "450",
    "pId" : "1"
    }
 */
//request update product
router.put("/updateproducts", (req, res) => {
  var pId = req.body.pId;
  var price = req.body.price;
  var sql = `UPDATE shop_db.product SET price = ${price} WHERE pId = ${pId}`;
  dbconnect.query(sql, (error, results) => {
    console.log(results);
    if (error) {
      return res.send({ err: true, msg: "Error occur" });
    }
    return res.send({ err: false, msg: `Now product ${pId} is ${price} ` });
  });
});
/***
 * TEST CASE FOR SEARCH ALL USER
 * METHOD GET
 * url : localhost:3001/searchuserall
 */
//request search user
router.get("/searchuserall", (req, res) => {
  dbconnect.query("SELECT * FROM shop_db.user ", (error, results, fields) => {
    if (error) {
      res.send({
        data: {
          err: true,
          msg: "Error occur",
        },
      });
      throw error;
    }
    console.log(results.length + " rows returned");
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    return res.send({
      err: false,
      msg: `lists[${results.length} rows].`,
      data: results,
    });
  });
});
/***
 * TEST CASE FOR SEARCH by USERNAME
 * METHOD GET
 * url : localhost:3001/searchuser/baby/username
 * url : localhost:3001/searchuser/hot/email
 */
//request search user by username
router.get("/searchuser/:searchuser/:type", (req, res) => {
  var username = req.params.searchuser.trim();
  var type = req.params.type;
  console.log(username, type);
  var search = `SELECT * FROM shop_db.user WHERE ${type} LIKE "%${username}%"`;
  dbconnect.query(search, (error, results, fields) => {
    if (error) throw error;
    console.log(results.length + " rows returned");
    return res.send({
      err: false,
      msg: `lists[${results.length} rows].`,
      data: results,
    });
  });
});
/***
 * TEST CASE FOR INSERT USER
 * METHOD POST
 * url : localhost:3001/insertuser
 * body : json
 * {
    "ufname" : "Meow" ,
    "ulname" : "Dog",
    "username" : "meow",
    "password" : "meow",
    "email" : "none", 
    "age" : "2" ,
    "address" : "none",
    "role" : "admin"
  }
  {
    "ufname" : "John" ,
    "ulname" : "Smith",
    "username" : "john",
    "password" : "john1234",
    "email" : "john1234@ismyemail.com", 
    "age" : "33" ,
    "address" : "none",
    "role" : "user"
  }
 * 
 */
router.post("/insertuser", (req, res) => {
  console.log(req.body);
  const ufname = req.body.ufname;
  const ulname = req.body.ulname;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  if (!ufname || !ulname || !username || !password || !role) {
    return res.send({
      err: false,
      msg: "Please fill all firstname ,lastname, username, password, and role",
    });
  }
  const hash = bcrypt.hashSync(password, 12);
  let new_user = {
    ufname: req.body.ufname,
    ulname: req.body.ulname,
    username: req.body.username,
    password: hash,
    email: req.body.email,
    age: req.body.age,
    address: req.body.address,
    role: req.body.role,
  };
  dbconnect.query(
    "INSERT INTO shop_db.user SET ?",
    new_user,
    (error, result) => {
      if (error) {
        console.log(error);
        if (error.errno == 1062) {
          return res.send({
            err: false,
            msg: "This username is already in used",
          });
        }
      } else {
        return res.send({
          err: false,
          msg: `${username} has been added with ${role} role`,
        });
      }
    }
  );
});
/***
 * TEST CASE FOR UPDATE USER
 * METHOD PUT
 * url : localhost:3001/updateuser
 * {
    "username" : "john",
    "role" : "admin"
    }
    {
    "username" : "meow",
    "role" : "user"
    }
 */
router.put("/updateuser", (req, res) => {
  const username = req.body.username;
  const role = req.body.role;
  dbconnect.query(
    "UPDATE shop_db.user SET role = ? WHERE username = ?",
    [role, username],
    (error, results, fields) => {
      if (error) {
        res.send({
          data: {
            err: true,
            msg: "Error occur",
          },
        });
        throw error;
      }
      if (results.affectedRows == 0) {
        res.send({
          err: true,
          msg: `no user in database`,
        });
      } else {
        res.send({
          err: false,
          msg: `username: ${username} role change to ${role}`,
        });
      }
    }
  );
});
/***
 * TEST CASE FOR DELETE USER
 * METHOD DELETE
 * url : localhost:3001/deleteuser
 * {
    "username" : "meow"
    }
    {
    "username" : "misternobodyisnobydoyouknownobodyiswho"
    }
 */
router.delete("/deleteuser", (req, res) => {
  const username = req.body.username;
  console.log(username);
  dbconnect.query(
    `DELETE FROM shop_db.user WHERE username = ?`,
    username,
    (error, results) => {
      if (error) {
        return res.send({ err: true, msg: "Error occur" });
      }
      if (results.affectedRows == 0) {
        return res.send({
          err: true,
          msg: `No username ${username} in database `,
        });
      }
      return res.send({
        err: false,
        msg: `username ${username} has been deleted`,
      });
    }
  );
});

/**
 * for react application to check whether user login or not OR token already expired.
 */
router.post("/isUserAuth", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, "SECRETKEY", (err, result) => {
    if (err) {
      res.send({ err: true, msg: "Your token is suck", status: false });
    } else {
      res.send({ err: false, msg: "token is find", status: true });
    }
  });
});

router.get("/*", (req, res) => {
  res.send("Page not found");
});

app.listen(3001, () => console.log("now you can go to http://localhost:3001/"));
