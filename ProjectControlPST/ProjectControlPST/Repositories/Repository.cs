using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProjectControlPST.Models;

namespace ProjectControlPST.Repositories
{
    public class Repository : IRepository
    {
        private PSTProjectControlEntities _dbContext;
        private readonly Random _random = new Random();
        public PSTProjectControlEntities DbContext
        {
            get
            {
                if (_dbContext == null)
                {
                    _dbContext = new PSTProjectControlEntities();
                    _dbContext.Configuration.ProxyCreationEnabled = false;
                    return _dbContext;
                }
                else
                {
                    return _dbContext;
                }
            }
        }
        public List<WorkOrder> GetWorkOrders()
        {
            return DbContext.WorkOrders.ToList();
        }
        public List<ProjectStatus> GetProjectStatus()
        {
            return DbContext.ProjectStatus1.ToList();
        }
        public List<TypeRequest> GetTypeRequest()
        {
            return DbContext.TypeRequests.ToList();
        }
        public WorkOrderDetails GetWorkOrder(int id)
        {
            var workOrderView = DbContext.vw_workOrder_description.First(a => a.uniqueId == id);
            var projectDescriptionId = workOrderView.idProjectDescription;
            var workOrder = new WorkOrderDetails
            {
                WorkOrderDescription = workOrderView,
                Domains = DbContext.Domains.Where(i => i.idProjectDescription == projectDescriptionId).ToList(),
                EffectedUrls = DbContext.EffectedURLs.Where(i => i.idProjectDescription == projectDescriptionId).ToList(),
                ThirdPartyCredential = DbContext.ThirdPartyCredentials.Where(i=>i.idProjectDescription==projectDescriptionId).ToList(),
                AssetProjects = DbContext.AssetProjects.Where(i => i.idProjectDescription == projectDescriptionId).ToList(),
                Assets = DbContext.AssetsLists.ToList()
            };
            return workOrder;
        }
        public string[] InsertWorkOrder(int typeRequest)
        {
            var context = DbContext;
            var workOrder = new WorkOrder
            {
                idTypeRequest = typeRequest,
                secureCode = GenerateSecureCode(),
                idProjectStatus = 1
            };
            context.WorkOrders.Add(workOrder);
            context.SaveChanges();
            return new[] {workOrder.uniqueId.ToString(), workOrder.secureCode};
        }
        private string GenerateSecureCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, 25)
                .Select(s => s[_random.Next(s.Length)]).ToArray());
        }
    }
}