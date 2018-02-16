using System;
using System.Web.Mvc;
using ProjectControlPST.Models;
using ProjectControlPST.Repositories;

namespace ProjectControlPST.Controllers
{
    public class PreferencesController : Controller
    {
        private readonly IRepository _repository;
        public PreferencesController() : this(new Repository()) { }
        public PreferencesController(IRepository repository)
        {
            _repository = repository;
        }
        // GET: Preferences
        [Route("preferences")]
        public ActionResult Index()
        {
            if (Session["UserID"] != null)
            {
                var preferences = _repository.GetPreferencesDetails((int)Session["UserID"]);
                return View(preferences);
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }
        [HttpPost]
        public ActionResult UpdatePreferences(PreferencesDetails details)
        {
            if (details.User.password != details.ConfirmPassword)
                return Content("Error the passwords do not match!");

            try
            {
                _repository.UpdateUsers(details.User);
                return Content("Saved!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Content("Not Updated " + e.Message);
            }
        }
    }
}