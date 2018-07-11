using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FixedAsset_MVC.DAL;
using FixedAsset_MVC.Models;

namespace FixedAsset_MVC.Controllers
{
    public class LoginController : Controller
    {
        private UserService userRepo;

        public LoginController()
        {
            userRepo = new UserService();
        }
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            IEnumerable<User> allUsers = null;
            try
            {
                allUsers = userRepo.GetAll();
            }
            catch (Exception exception)
            {}
            return Json(allUsers.ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public bool IsValidUser(string username,string password)
        {
            try
            {
                return userRepo.IsValidUser(username, password);
            }
            catch (Exception)
            {
            }
            return false;
        }

        [HttpGet]
        public JsonResult GetUser(string username,string password)
        {
            var u = userRepo.GetAll().Where(user => user.username == username && user.password == password).FirstOrDefault();
            //if(u==null)
            //{
            //    throw new HttpException("Invalid user");
            //}
            //else
            //{
            //    return Json(u, JsonRequestBehavior.AllowGet);
            //}
            return Json(u, JsonRequestBehavior.AllowGet);
        }
    }
}