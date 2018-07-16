using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FixedAsset_MVC.DAL;
using FixedAsset_MVC.Models;

namespace FixedAsset_MVC.Controllers
{
    public class AssetController : Controller
    {
        AssetService assetService=new AssetService();
        
        // GET: Asset
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            List<Asset> allAssets = new List<Models.Asset>();
            try
            {
                allAssets = assetService.GetAll();
            }
            catch (Exception)
            {
            }
            return Json(allAssets, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAssetById(object _id)
        {
            Asset asset = null;
            try
            {
                asset = assetService.GetAssetDetailsById(_id);
            }
            catch (Exception)
            {
            }
            return Json(asset, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddNewAsset(Asset asset)
        {
            Asset assetAdded = null;
            try
            {
                assetAdded = assetService.AddAsset(asset);
            }
            catch (Exception)
            {
            }
            return Json(assetAdded, JsonRequestBehavior.AllowGet);
        }
    }
}