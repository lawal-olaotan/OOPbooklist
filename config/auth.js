module.exports = {

    ensureAuthenicated:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','please login to add books');
        res.redirect('https://bk-keeper.herokuapp.com/users/login');
    },

    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('https://bk-keeper.herokuapp.com/dashboard/books');      
    }

}