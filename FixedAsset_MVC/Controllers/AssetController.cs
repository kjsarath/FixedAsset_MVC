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
        public JsonResult GetAssetById(string asset_id)
        {
            Asset asset = null;
            try
            {
                asset = assetService.GetAssetDetailsById(asset_id);
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

        [HttpPost]
        public JsonResult UpdateAsset(Asset asset)
        {
            Asset assetUpdated = null;
            try
            {
                assetUpdated = assetService.UpdateAsset(asset);
            }
            catch (Exception)
            {
            }
            return Json(assetUpdated, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetNextAssetNo()
        {
            string asset_no = string.Empty;
            try
            {
                asset_no = assetService.GetNextAssetNo();
            }
            catch (Exception)
            {
            }
            return Json(asset_no, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SearchAssets(string searchString)
        {
            List<Asset> filteredAssets = new List<Asset>();
            try
            {
                filteredAssets = assetService.GetAll().Where(asset => asset.asset_no.IndexOf(searchString, StringComparison.OrdinalIgnoreCase) >= 0 || asset.description.IndexOf(searchString, StringComparison.OrdinalIgnoreCase) >= 0).ToList();
            }
            catch (Exception)
            {
            }
            return Json(filteredAssets, JsonRequestBehavior.AllowGet);
        }
    }
}