using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using Codaxy.WkHtmlToPdf;
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
        public User GetUser(string logInUser)
        {
            return DbContext.Users.First(u => u.userName == logInUser);
        }
        public List<WorkOrder> GetWorkOrders()
        {
            return DbContext.WorkOrders.ToList();
        }
        public List<TypeRequest> GetTypeRequest()
        {
            return DbContext.TypeRequests.ToList();
        }
        public List<ProjectStatu> GetProjectStatus()
        {
            return DbContext.ProjectStatus.ToList();
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
                Assets = DbContext.vw_assets_project.Where(i=>i.idProjectDescription==projectDescriptionId).ToList()
            };
            return workOrder;
        }
        public PreferencesDetails GetPreferencesDetails(int userId)
        {
            var assets = DbContext.AssetsLists.ToList();
            var preferencesDetails = new PreferencesDetails
            {
                User = DbContext.Users.First(i=>i.uniqueId==userId),
                Requests = DbContext.TypeRequests.ToList(),
                Assets = assets
            };
            return preferencesDetails;
        }
        public MemoryStream PdfStream(string url)
        {
            var memory = new MemoryStream();
            var document = new PdfDocument() {Url = url};
            var output = new PdfOutput() {OutputStream = memory};

            PdfConvert.ConvertHtmlToPdf(document, output);
            memory.Position = 0;

            return memory;
        }
        public string[] InsertWorkOrder(int typeRequest, int userId)
        {
            var workOrder = new WorkOrder
            {
                idTypeRequest = typeRequest,
                secureCode = GenerateSecureCode(),
                idProjectStatus = 1,
                idUser = userId
            };
            DbContext.WorkOrders.Add(workOrder);
            DbContext.SaveChanges();
            return new[] {workOrder.uniqueId.ToString(), workOrder.secureCode};
        }
        public void UpdateAssets(IList<vw_assets_project> assetsProjects)
        {
            if (assetsProjects == null) return;
            foreach (var item in assetsProjects)
            {
                var original = DbContext.AssetProjects.Find(item.assetProjectId);
                if (original == null) continue;
                if (original.value == item.value) continue;
                original.value = item.value;
                DbContext.SaveChanges();
            }
        }
        public void UpdateWorkOrderDescription(WorkOrderDetails workOrderDetails)
        {
            if (workOrderDetails == null) return;
            var workOrder = new WorkOrder
            {
                uniqueId = workOrderDetails.WorkOrderDescription.uniqueId, // cannot change
                author = workOrderDetails.WorkOrderDescription.author,
                date = workOrderDetails.WorkOrderDescription.date,
                idTypeRequest = workOrderDetails.WorkOrderDescription.idTypeRequest, // cannot change
                projectName = workOrderDetails.WorkOrderDescription.projectName,
                referencePreviousJob = workOrderDetails.WorkOrderDescription.referencePreviousJob,
                agencyPM = workOrderDetails.WorkOrderDescription.agencyPM,
                agencyAccountDirector = workOrderDetails.WorkOrderDescription.agencyAccountDirector,
                brandManager = workOrderDetails.WorkOrderDescription.brandManager,
                prodigiousPM = workOrderDetails.WorkOrderDescription.prodigiousPM,
                secureCode = workOrderDetails.WorkOrderDescription.secureCode, // cannot change
                jiraParentUrl = workOrderDetails.WorkOrderDescription.jiraParentUrl, // not required yet
                idProjectStatus = workOrderDetails.WorkOrderDescription.idProjectStatus, // not required yet
                idProjectDescription = workOrderDetails.WorkOrderDescription.idProjectDescription // cannot change
            };
            UpdateWorkOrder(workOrder);

            var idProjectDescription = workOrderDetails.WorkOrderDescription.idProjectDescription ?? 0;
            var projectDescription = new ProjectDescription
            {
                uniqueId = idProjectDescription, // cannot change
                projectDescription1 = workOrderDetails.WorkOrderDescription.projectDescription,
                kickOffDate = workOrderDetails.WorkOrderDescription.kickOffDate,
                liveDate = workOrderDetails.WorkOrderDescription.liveDate,
                targetDevice = workOrderDetails.WorkOrderDescription.targetDevice, // not implemented yet
                platform = workOrderDetails.WorkOrderDescription.platform,
                seoAnalytics = workOrderDetails.WorkOrderDescription.seoAnalytics,
                additionalComments = workOrderDetails.WorkOrderDescription.additionalComments,
                idWorkOrder = workOrderDetails.WorkOrderDescription.uniqueId // cannot change
            };
            UpdateProjectDescription(projectDescription);
        }
        public void UpdateDomains(IList<Domain> domains, int idProjectDescription)
        {
            if (domains == null) return;
            foreach (var item in domains)
            {
                if (item.uniqueId == 0)
                {
                    InsertDomain(item.domain1, idProjectDescription);
                }
                else
                {
                    var original = DbContext.Domains.Find(item.uniqueId);
                    if (original == null) continue;
                    if (original.domain1 == item.domain1) continue;
                    original.domain1 = item.domain1;
                    DbContext.SaveChanges();
                }
            }
        }
        public void UpdateEffectedUrls(IList<EffectedURL> effectedUrls, int idProjectDescription)
        {
            if (effectedUrls == null) return;
            foreach (var item in effectedUrls)
            {
                if (item.uniqueId == 0)
                {
                    InsertEffectedUrl(item.url, idProjectDescription);
                }
                else
                {
                    var original = DbContext.EffectedURLs.Find(item.uniqueId);
                    if (original == null) continue;
                    if (original.url == item.url) continue;
                    original.url = item.url;
                    DbContext.SaveChanges();
                }
            }
        }
        public void UpdateThirdPartyCredential(IList<ThirdPartyCredential> thirdPartyCredentials, int idProjectDescription)
        {
            if (thirdPartyCredentials == null) return;
            foreach (var item in thirdPartyCredentials)
            {
                if (item.uniqueId == 0)
                {
                    InsertThirdPartyCredential(item, idProjectDescription);
                }
                else
                {
                    var original = DbContext.ThirdPartyCredentials.Find(item.uniqueId);
                    if (original == null) continue;
                    if (original.url == item.url && original.userName == item.userName &&
                        original.password == item.password) continue;
                    original.url = item.url;
                    original.userName = item.userName;
                    original.password = item.password;
                    DbContext.SaveChanges();
                }
            }
        }
        private void InsertDomain(string url, int idProjectDescription)
        {
            var domain = new Domain
            {
                domain1 = url,
                idProjectDescription = idProjectDescription
            };
            DbContext.Domains.Add(domain);
            DbContext.SaveChanges();
        }
        private void InsertEffectedUrl(string url, int idProjectDescription)
        {
            var effectedUrl = new EffectedURL
            {
                url = url,
                idProjectDescription = idProjectDescription
            };
            DbContext.EffectedURLs.Add(effectedUrl);
            DbContext.SaveChanges();
        }
        private void InsertThirdPartyCredential(ThirdPartyCredential item, int idProjectDescription)
        {
            var credenctial = new ThirdPartyCredential
            {
                url = item.url,
                userName = item.userName,
                password = item.password,
                idProjectDescription = idProjectDescription
            };
            DbContext.ThirdPartyCredentials.Add(credenctial);
            DbContext.SaveChanges();
        }
        private void UpdateWorkOrder(WorkOrder workOrder)
        {
            var original = DbContext.WorkOrders.Find(workOrder.uniqueId);

            if (original == null) return;
            if (original.author == workOrder.author && original.date == workOrder.date && original.projectName == workOrder.projectName &&
                original.referencePreviousJob == workOrder.referencePreviousJob && original.agencyPM == workOrder.agencyPM &&
                original.agencyAccountDirector == workOrder.agencyAccountDirector && original.brandManager == workOrder.brandManager &&
                original.prodigiousPM == workOrder.prodigiousPM && original.jiraParentUrl == workOrder.jiraParentUrl && original.idProjectStatus == workOrder.idProjectStatus)
                return;

            original.author = workOrder.author;
            original.date = workOrder.date;
            original.projectName = workOrder.projectName;
            original.referencePreviousJob = workOrder.referencePreviousJob;
            original.agencyPM = workOrder.agencyPM;
            original.agencyAccountDirector = workOrder.agencyAccountDirector;
            original.brandManager = workOrder.brandManager;
            original.prodigiousPM = workOrder.prodigiousPM;
            original.jiraParentUrl = workOrder.jiraParentUrl;
            original.idProjectStatus = workOrder.idProjectStatus;

            DbContext.SaveChanges();
        }
        private void UpdateProjectDescription(ProjectDescription projectDescription)
        {
            var original = DbContext.ProjectDescriptions.Find(projectDescription.uniqueId);

            if (original == null) return;
            if (original.projectDescription1 == projectDescription.projectDescription1 && 
                original.kickOffDate == projectDescription.kickOffDate && original.liveDate == projectDescription.liveDate && 
                original.targetDevice == projectDescription.targetDevice && original.platform == projectDescription.platform && 
                original.seoAnalytics == projectDescription.seoAnalytics && original.additionalComments == projectDescription.additionalComments)
                return;

            original.projectDescription1 = projectDescription.projectDescription1;
            original.kickOffDate = projectDescription.kickOffDate;
            original.liveDate = projectDescription.liveDate;
            original.targetDevice = projectDescription.targetDevice;
            original.platform = projectDescription.platform;
            original.seoAnalytics = projectDescription.seoAnalytics;
            original.additionalComments = projectDescription.additionalComments;

            DbContext.SaveChanges();
        }
        private string GenerateSecureCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, 25)
                .Select(s => s[_random.Next(s.Length)]).ToArray());
        }
    }
}