using System.Collections.Generic;
using ProjectControlPST.Models;

namespace ProjectControlPST.Repositories
{
    public interface IRepository
    {
        List<WorkOrder> GetWorkOrders();
        List<TypeRequest> GetTypeRequest();
        List<ProjectStatu> GetProjectStatus();
        WorkOrderDetails GetWorkOrder(int id);
        string[] InsertWorkOrder(int typeRequest);
        void UpdateAssets(IList<vw_assets_project> assetsProjects);
        void UpdateWorkOrderDescription(WorkOrderDetails workOrderDetails);
        void UpdateDomains(IList<Domain> domains, int idProjectDescription);
        void UpdateEffectedUrls(IList<EffectedURL> effectedUrls, int idProjectDescription);
        void UpdateThirdPartyCredential(IList<ThirdPartyCredential> thirdPartyCredentials, int idProjectDescription);
    }
}