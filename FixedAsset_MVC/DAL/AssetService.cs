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
                assets = mDb.GetCollection<Asset>("Asset");

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
        public Asset GetAssetDetailsById(object _id)
        {
            try
            {
                return assets.Find(Builders<Asset>.Filter.Eq("_id", _id)).FirstOrDefault();
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
                                    .Set("", _asset.asset_life)
                                    .Set("", _asset.asset_no)
                                    .Set("", _asset.category)
                                    .Set("", _asset.created_by)
                                    .Set("", _asset.created_date)
                                    .Set("", _asset.depreciation_percent)
                                    .Set("", _asset.depreciation_type)
                                    .Set("", _asset.description)
                                    .Set("", _asset.group)
                                    .Set("", _asset.last_modified_by)
                                    .Set("", _asset.last_modified_date)
                                    .Set("", _asset.salvage_value)
                                    .Set("", _asset.sub_category);
                assets.UpdateOne(Builders<Asset>.Filter.Eq("_id", _asset._id), updateBuilder);
                return _asset;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}