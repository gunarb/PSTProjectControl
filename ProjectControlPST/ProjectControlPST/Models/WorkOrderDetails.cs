using System.Collections.Generic;

namespace ProjectControlPST.Models
{
    public class WorkOrderDetails
    {
        public vw_workOrder_description WorkOrderDescription { get; set; }
        public IList<Domain> Domains { get; set; }
        public IList<EffectedURL> EffectedUrls { get; set; }
        public IList<ThirdPartyCredential> ThirdPartyCredential { get; set; }
        public IList<vw_assets_project> Assets { get; set; }
    }
}