using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FixedAsset_MVC.Models
{
    public class Company
    {
        [BsonId]
        public MongoDB.Bson.ObjectId _id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
    }
}