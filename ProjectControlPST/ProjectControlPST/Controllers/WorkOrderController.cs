using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Rotativa.MVC;
using ProjectControlPST.Models;
using ProjectControlPST.Extensions;
using ProjectControlPST.Repositories;
using static System.Web.HttpContext;

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
        [Route("workorder/view/{id}/{secureCode}")]
        public ActionResult Details(int id, string secureCode)
        {
            var workOrder = _repository.GetWorkOrder(id);
            if (workOrder.WorkOrderDescription.secureCode == secureCode)
                return View(workOrder);
            return Content(
                $"Error! the secure code entered do no match to the secure code for project {workOrder.WorkOrderDescription.projectName}");
        }
        public ActionResult InsertWorkOrder(int typeRequest)
        {
            var userId = (int) Session["UserId"];
            var newWorkOrder = _repository.InsertWorkOrder(typeRequest, userId);
            var workOrderId = int.Parse(newWorkOrder[0]);
            var workOrderSecureCode = newWorkOrder[1];
            return RedirectToAction("Update", "WorkOrder", new { @id = workOrderId, @secureCode = workOrderSecureCode });
        }
        [HttpPost]
        public JsonResult AutoComplete(string prefix)
        {
            var obj = _repository.GetReferenceJob();
            var job = (from n in obj
                where n.ProjectName.ToLower().StartsWith(prefix.ToLower())
                select new {n.ProjectName, n.UniqueId});
            return Json(job);
        }
        [HttpPost]
        public JsonResult GetProjectName(int id)
        {
            var obj = _repository.GetReferenceJob();
            var job = (from n in obj
                where n.UniqueId.Equals(id)
                select new {n.ProjectName});
            return Json(job);
        }
        [HttpPost]
        public ActionResult UpdateWorkOrderDescription(WorkOrderDetails workOrderDetails, string submitButton)
        {
            var idProjectDescription = workOrderDetails.WorkOrderDescription.idProjectDescription ?? 0;

            try
            {
                _repository.UpdateThirdPartyCredential(workOrderDetails.ThirdPartyCredential, idProjectDescription);
                _repository.UpdateEffectedUrls(workOrderDetails.EffectedUrls, idProjectDescription);
                _repository.UpdateDomains(workOrderDetails.Domains, idProjectDescription);
                _repository.UpdateWorkOrderDescription(workOrderDetails);
                _repository.UpdateAssets(workOrderDetails.Assets);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Content("Work Order NOT Updated! " + e.Message);
            }

            return submitButton == "ExportPdf" ? Content("Work Order Updated! Preparing PDF file to downloading...") : Content("Work Order Updated!");
        }
        [HttpPost]
        public ActionResult SendEmail(int idWorkOrder, string url)
        {
            var user = _repository.GetUserByWorkOrder(idWorkOrder);
            var urlView = url.Replace("update", "view");
            var pdfView = url.Replace("update", "generatepdf");
            var htmlMsg = "<p>Hi " + user.name + ",</p><p>Work order #" + idWorkOrder + " has been updated.</p>";
            htmlMsg += "<p>For more details go to <a href='" + urlView + "'>View Work Order #" + idWorkOrder + "</a><p>";
            htmlMsg += "<p>Or download the PDF at <a href='" + pdfView + "'>Work Order #" + idWorkOrder + "</a><p>";
            htmlMsg += "Have a nice day!";
            _repository.SendEmail(user.email, htmlMsg, idWorkOrder);
            return Content("Email send");
        }
        [Route("workorder/generatepdf/{id}/{secureCode}")]
        public ActionResult GeneratePdf(int id, string secureCode)
        {
            return new ActionAsPdf("Details", new { id = id, secureCode = secureCode });
        }
        public ActionResult GeneratePdf(string workOrderName)
        {
            if (Current.Request.UrlReferrer == null) return Content("URL do no exist!");

            var url = Current.Request.UrlReferrer.AbsoluteUri;
            if (url.IndexOf("update", StringComparison.Ordinal) >= 0)
                url = url.Replace("update", "detail");

            var fileName = workOrderName.ToHashtagUrl() + ".pdf";
            var memory = _repository.PdfStream(url);

            return File(memory, "application/pdf", Server.UrlEncode(fileName));
        }
    }
}