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
        public MongoDB.Driver.IMongoCollection<User> users;
        public bool serverDown = false;
        public List<User> allUsers = new List<User>();
        public UserService()
        {
            try
            {
                var mClient = new MongoClient(FixedAsset_MVC.Properties.Settings.Default.FixedAssetsConnectionString);
                mDb = mClient.GetDatabase("FIXED_ASSET");
                users = mDb.GetCollection<User>("users");
            }
            catch (Exception)
            {
                serverDown = true;
            }
        }
        public List<User> GetAll()
        {
            if (serverDown) return allUsers = null;
            if(users.CountDocuments(FilterDefinition<User>.Empty)>0)
            {
                allUsers.Clear();
                var userList = users.Find(FilterDefinition<User>.Empty).ToList();
                allUsers.AddRange(userList);
            }
            else
            {
                allUsers = null;
            }
            return allUsers;
        }
        public bool IsValidUser(string username, string password)
        {
            if (users.Find(Builders<User>.Filter.Eq("username", username) & Builders<User>.Filter.Eq("password", password)).CountDocuments()==1m)
                return true;
            return false;
        }
    }
}