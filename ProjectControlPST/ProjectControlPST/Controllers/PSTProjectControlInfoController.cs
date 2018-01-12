using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProjectControlPST.Models;
using ProjectControlPST.Repositories;

namespace ProjectControlPST.Controllers
{
    public class PstProjectControlInfoController : ApiController
    {
        private readonly IRepository _repository;
        public PstProjectControlInfoController() : this(new Repository()) { }
        public PstProjectControlInfoController(IRepository repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public IHttpActionResult GetWorkOrder()
        {
            var workOrders = _repository.GetWorkOrders();
            return Json(workOrders);
        }
        [HttpGet]
        public IHttpActionResult GetProjectStatus()
        {
            var projectStatus = _repository.GetProjectStatus();
            return Json(projectStatus);
        }
        [HttpGet]
        public IHttpActionResult GetTypeRequest()
        {
            var typeRequests = _repository.GetTypeRequest();
            return Json(typeRequests);
        }
    }
}