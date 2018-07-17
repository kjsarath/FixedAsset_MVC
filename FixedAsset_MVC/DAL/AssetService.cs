using FixedAsset_MVC.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FixedAsset_MVC.DAL
{
    public class AssetService
    {
        public IMongoDatabase mDb;
        public IMongoCollection<Asset> assets;
        public bool serverDown = false;
        public List<Asset> allAssets = new List<Asset>();

        public AssetService()
        {
            try
            {
                var mClient = new MongoClient(FixedAsset_MVC.Properties.Settings.Default.FixedAssetsConnectionString);
                mDb = mClient.GetDatabase("FIXED_ASSET");
                assets = mDb.GetCollection<Asset>("asset");

            }
            catch(Exception)
            {
                serverDown = true;
            }
        }
        public List<Asset> GetAll()
        {
            try
            {
                if (serverDown) return null;
                if(assets.CountDocuments(FilterDefinition<Asset>.Empty)>0)
                {
                    allAssets.Clear();
                    allAssets.AddRange(assets.Find(FilterDefinition<Asset>.Empty).ToList());
                }
                else
                {
                    allAssets = null;
                }
                return allAssets;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public Asset GetAssetDetailsById(string asset_id)
        {
            try
            {
                var asset= assets.Find(Builders<Asset>.Filter.Eq("asset_id", asset_id)).FirstOrDefault();
                return asset;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public Asset AddAsset(Asset _asset)
        {
            try
            {
                if (serverDown) return null;
                if(string.IsNullOrEmpty(_asset.asset_id))
                {
                    _asset.asset_id = Guid.NewGuid().ToString();
                }
                _asset.created_date = (_asset.created_date == null ? DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc) : DateTime.SpecifyKind((DateTime)_asset.created_date, DateTimeKind.Utc));
                _asset.last_modified_date = (_asset.last_modified_date == null ? DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc) : DateTime.SpecifyKind((DateTime)_asset.last_modified_date, DateTimeKind.Utc));
                assets.InsertOne(_asset);
                return _asset;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public Asset UpdateAsset(Asset _asset)
        {
            try
            {
                if (serverDown) return null;
                var updateBuilder = Builders<Asset>.Update
                                    .Set("asset_life", _asset.asset_life)
                                    .Set("asset_no", _asset.asset_no)
                                    .Set("category", _asset.category)
                                    .Set("created_by", _asset.created_by)
                                    .Set("created_date", _asset.created_date)
                                    .Set("depreciation_percent", _asset.depreciation_percent)
                                    .Set("depreciation_type", _asset.depreciation_type)
                                    .Set("description", _asset.description)
                                    .Set("group", _asset.group)
                                    .Set("last_modified_by", _asset.last_modified_by)
                                    .Set("last_modified_date", DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc) )
                                    .Set("salvage_value", _asset.salvage_value)
                                    .Set("sub_category", _asset.sub_category);
                assets.UpdateOne(Builders<Asset>.Filter.Eq("asset_id", _asset.asset_id), updateBuilder);
                return _asset;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string GetNextAssetNo()
        {
            string next_asset_no = string.Empty;
            try
            {
                var x = GetAll().Select(asset => new { a_no = Convert.ToInt32(asset.asset_no) }).OrderByDescending(a=>a.a_no).ToList();
                if(x==null ||x.Count<=0)
                {
                    next_asset_no = string.Empty;
                }
                else
                {
                    next_asset_no = (x[0].a_no + 1).ToString();
                }
            }
            catch (Exception)
            {
                next_asset_no = string.Empty;
            }
            return next_asset_no;
        }
    }
}