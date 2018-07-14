using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FixedAsset_MVC.Models;
using FixedAsset_MVC.DAL;

namespace FixedAsset_MVC.Controllers
{
    public class CompanyController : Controller
    {
        CompanyService companyService = new CompanyService();
        // GET: Company
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllCompanies()
        {
            List<Company> allCompanies=new List<Models.Company>();
            try
            {
                allCompanies = companyService.getAll();
            }
            catch (Exception)
            {
            }
            return Json(allCompanies, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCompanyDetails(string code)
        {
            Company company=null;
            try
            {
                company = companyService.getCompanyDetails(code);
            }
            catch (Exception)
            {
            }
            return Json(company, JsonRequestBehavior.AllowGet);
        }
    }
}