using System;
using System.Web.Mvc;
using ProjectControlPST.Models;
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
            return Content(workOrder.secureCode == secureCode
                ? $"workOrderId={workOrder.uniqueId} ProjectName={workOrder.projectName}"
                : $"Error! the secure code entered do no match to the secure code for project {workOrder.projectName}");
            
            //return View(workOrder);
        }
        public ActionResult CreateWorkOrder(int typeRequest)
        {
            var newWorkOrder = _repository.CreateWorkOrder(typeRequest);
            var workOrderId = int.Parse(newWorkOrder[0]);
            var workOrderSecureCode = newWorkOrder[1];
            return RedirectToAction("Update", "WorkOrder", new { @id = workOrderId, @secureCode = workOrderSecureCode });
        }
    }
}