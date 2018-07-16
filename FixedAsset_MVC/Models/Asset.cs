using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FixedAsset_MVC.Models
{
    public class Asset
    {
        [BsonId]
        public MongoDB.Bson.ObjectId _id { get; set; }

        [Required(ErrorMessage ="Cannot keep an asset without a number")]
        public string asset_no { get; set; }

        [Required(ErrorMessage ="Asset is expected to have a name/description")]
        [MinLength(10,ErrorMessage ="Asset description is valid only if it is atleast 5 characters in length.")]
        public string description { get; set; }

        [Required(ErrorMessage ="Please enter/select a group for this asset.")]
        public string group { get; set; }

        [Required(ErrorMessage = "Please enter/select a category for this asset.")]
        public string category { get; set; }

        [Required(ErrorMessage = "Please enter/select a sub-category for this asset.")]
        public string sub_category { get; set; }

        [Required(ErrorMessage = "Asset life is mandatory.")]
        public decimal asset_life { get; set; }

        [Required(ErrorMessage = "Please enter/select a depreciation type for this asset.")]
        public string depreciation_type { get; set; }

        [BsonDefaultValue(0)]
        public decimal depreciation_percent { get; set; }

        [BsonDefaultValue(0)]
        public decimal salvage_value { get; set; }

        public MongoDB.Bson.ObjectId created_by { get; set; }
        public DateTime created_date { get; set; }
        public MongoDB.Bson.ObjectId last_modified_by { get; set; }
        public DateTime  last_modified_date{ get; set; }

    }
}