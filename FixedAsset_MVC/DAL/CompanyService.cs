using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FixedAsset_MVC.Models;
using MongoDB.Driver;

namespace FixedAsset_MVC.DAL
{
    public class CompanyService
    {
        public IMongoDatabase mDb;
        public IMongoCollection<Company> companies;
        public bool serverDown = false;
        public List<Company> allCompanies = new List<Company>();

        public CompanyService()
        {
            try
            {
                var mClient = new MongoClient(FixedAsset_MVC.Properties.Settings.Default.FixedAssetsConnectionString);
                mDb = mClient.GetDatabase("FIXED_ASSET");
                companies = mDb.GetCollection<Company>("company");
            }
            catch (Exception)
            {
                serverDown = true;
            }
        }
        public List<Company> getAll()
        {
            try
            {
                if (serverDown) return null;
                if (companies.CountDocuments(FilterDefinition<Company>.Empty)>0)
                {
                    allCompanies.Clear();
                    allCompanies.AddRange( companies.Find(FilterDefinition<Company>.Empty).ToList());
                }
                else
                {
                    allCompanies = null;
                }
                return allCompanies;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public Company getCompanyDetails(string code)
        {
            try
            {
                if (serverDown) return null;
                return companies.Find(Builders<Company>.Filter.Eq("code", code)).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}