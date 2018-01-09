using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectControlPST.Models;

namespace ProjectControlPST.Controllers
{
    public class PstProjectControlInfoController : ApiController
    {
        private PSTProjectControlEntities _dbContext;
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

        [HttpGet]
        public IHttpActionResult GetWorkOrder()
        {
            var context = DbContext;
            return Json(context.WorkOrders.ToList());
        }
        [HttpGet]
        public IHttpActionResult GetProjectDescription()
        {
            var context = DbContext;
            return Json(context.ProjectDescriptions.ToList());
        }
        [HttpGet]
        public IHttpActionResult GetProjectStatus()
        {
            var context = DbContext;
            return Json(context.ProjectStatus.ToList());
        }
        [HttpGet]
        public IHttpActionResult GetTypeRequest()
        {
            var context = DbContext;
            return Json(context.TypeRequests.ToList());
        }
    }
}