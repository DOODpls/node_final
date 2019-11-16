module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  },
  forwardAuthenticated: function(req, res, next) { //this is also from traversy where it checks if the password matches or not, itll redirect to its appropriate path
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/profile');      
  }
};
