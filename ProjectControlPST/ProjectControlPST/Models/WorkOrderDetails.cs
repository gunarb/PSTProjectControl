using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectControlPST.Models
{
    public class WorkOrderDetails
    {
        public vw_workOrder_description WorkOrderDescription { get; set; }
        public IList<Domain> Domains { get; set; }
        public IList<EffectedURL> EffectedUrls { get; set; }
        public IList<ThirdPartyCredential> ThirdPartyCredential { get; set; }
        public IList<AssetProject> AssetProjects { get; set; }
        public List<AssetsList> Assets { get; set; }
    }
}