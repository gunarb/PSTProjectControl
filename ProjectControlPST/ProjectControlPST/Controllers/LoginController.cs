using System.Web.Mvc;
using ProjectControlPST.Models;
using ProjectControlPST.Repositories;

namespace ProjectControlPST.Controllers
{
    public class LoginController : Controller
    {
        private readonly IRepository _repository;
        public LoginController() : this(new Repository()) { }
        public LoginController(IRepository repository)
        {
            _repository = repository;
        }
        // GET: Login
        [Route("login")]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogIn(string userName, string password)
        {
            var user = _repository.GetUser(userName);
            if (user == null) return Content("User not register");
            if (user.password != password) return Content("Password do not match for user: " + userName);
            Session["UserId"] = user.userName;
            Session["UserName"] = user.name;
            return RedirectToAction("Index", "Home");
        }
        public ActionResult LogOut()
        {
            Session["UserId"] = null;
            Session["UserName"] = null;
            return RedirectToAction("Index", "Login");
        }
    }
}