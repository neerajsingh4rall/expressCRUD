const cors = (req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Method','GET POST DELETE PUT');
    res.header('Access-Control-Allow-Header','Content-Type');
    next();
}
module.exports = cors;