using System.Web.Http;
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
        [Route("api/projectControl/getWorkOrder")]
        public IHttpActionResult GetWorkOrder()
        {
            var workOrders = _repository.GetWorkOrders();
            return Json(workOrders);
        }
        [HttpGet]
        [Route("api/projectControl/getProjectStatus")]
        public IHttpActionResult GetProjectStatus()
        {
            var projectStatus = _repository.GetProjectStatus();
            return Json(projectStatus);
        }
        [HttpGet]
        [Route("api/projectControl/getTypeRequest")]
        public IHttpActionResult GetTypeRequest()
        {
            var typeRequests = _repository.GetTypeRequest();
            return Json(typeRequests);
        }
    }
}