using System.Web.Mvc;
using ProjectControlPST.Repositories;

namespace ProjectControlPST.Controllers
{
    public class WorkOrderController : Controller
    {
        private readonly IRepository _repository;
        public WorkOrderController() : this(new Repository()) { }
        public WorkOrderController(IRepository repository)
        {
            _repository = repository;
        }
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Home");
        }
        [Route("workorder/update/{id}/{secureCode}")]
        public ActionResult Update(int id, string secureCode)
        {
            var workOrder = _repository.GetWorkOrder(id);
            if (workOrder.WorkOrderDescription.secureCode == secureCode)
                return View(workOrder);
            return Content(
                $"Error! the secure code entered do no match to the secure code for project {workOrder.WorkOrderDescription.projectName}");
        }
        public ActionResult InsertWorkOrder(int typeRequest)
        {
            var newWorkOrder = _repository.InsertWorkOrder(typeRequest);
            var workOrderId = int.Parse(newWorkOrder[0]);
            var workOrderSecureCode = newWorkOrder[1];
            return RedirectToAction("Update", "WorkOrder", new { @id = workOrderId, @secureCode = workOrderSecureCode });
        }
    }
}