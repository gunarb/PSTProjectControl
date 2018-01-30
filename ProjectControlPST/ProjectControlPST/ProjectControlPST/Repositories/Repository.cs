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
            return DbContext.ProjectStatus.ToList();
        }
        public List<TypeRequest> GetTypeRequest()
        {
            return DbContext.TypeRequests.ToList();
        }
        public WorkOrder GetWorkOrder(int id)
        {
            var workOrder = DbContext.WorkOrders.First(a => a.uniqueId == id);
            return workOrder;
        }
        public string[] CreateWorkOrder(int typeRequest)
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