using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;
using FixedAsset_MVC.Models;

namespace FixedAsset_MVC.DAL
{
    public class UserService
    {
        public IMongoDatabase mDb;
        public MongoDB.Driver.IMongoCollection<Users> user;
        public bool serverDown = false;
        public UserService()
        {
            //var mClient=new MongoClient(FixedAsset_MVC.)
        }
    }
}