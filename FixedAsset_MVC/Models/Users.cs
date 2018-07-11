using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson.Serialization.Attributes;

namespace FixedAsset_MVC.Models
{
    public class Users
    {
        [BsonId]
        public MongoDB.Bson.ObjectId _id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string role { get; set; }
        public bool active { get; set; }

    }
}