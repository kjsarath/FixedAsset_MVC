using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FixedAsset_MVC.Models
{
    public class Company
    {
        [BsonId]
        public MongoDB.Bson.ObjectId _id { get; set; }

        [Required(ErrorMessage ="Company code is mandatory...!")]
        public string code { get; set; }

        [Required(ErrorMessage ="Company is exepcted to have some name.")]
        [MinLength(10,ErrorMessage ="Company name is valid only if it is atleast 10 character in length")]
        public string name { get; set; }
    }
}