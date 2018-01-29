using System.Collections.Generic;
using System.Web.Mvc;

namespace ProjectControlPST.Models
{
    public class PreferencesDetails
    {
        public User User { get; set; }
        public string ConfirmPassword { get; set; }

        public int TypeRequest { get; set; }
        public IList<TypeRequest> Requests { get; set; }

        public int[] SelectedIds { get; set; }
        public IEnumerable<AssetsList> Assets { get; set; }
    }
}