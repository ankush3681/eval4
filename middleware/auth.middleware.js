const jwt = require("jsonwebtoken");

const auth = async(req,res,next) =>{
  const token = req.headers.authorization;
  if(token){
    const decoded = jwt.verify(token.split(" ")[1], 'eval-4');
    if(decoded){
        req.body.postId = decoded.postId;
        next();
    }else{
        res.status(200).send({"msg":"Login First"});
    }
  }else{
   res.status(200).send({"msg":"Login First"});
  }
}


module.exports = {
    auth
}