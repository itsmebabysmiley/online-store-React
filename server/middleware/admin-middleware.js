const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.get("Cookie").split("token=")[1].trim();
    const user = jwt.verify(token, "SECRETKEY");
    console.log(user);
    if (user.loginStatus == true && user.role == "admin") {
      next();
    }else if(user.loginStatus == true && user.role == "user"){
      return res.status(201).render("login", {
        data: {
          err: true,
          msg: "You are not admin",
        },
      });
    } 
    else
      return res.status(201).render("login", {
        data: {
          err: true,
          msg: "please login first",
        },
      });
  } catch (error) {
    return res.status(201).render("login", {
      data: {
        err: true,
        msg: "please login first",
      },
    });
  }
};
