let ensureAuthenticated =  function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/users/login');
}
let forwardAuthenticated =  function(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');      
}

module.exports = {ensureAuthenticated, forwardAuthenticated}