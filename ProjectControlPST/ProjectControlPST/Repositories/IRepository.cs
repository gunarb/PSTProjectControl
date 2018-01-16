﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectControlPST.Models;

namespace ProjectControlPST.Repositories
{
    public interface IRepository
    {
        List<WorkOrder> GetWorkOrders();
        List<ProjectStatus> GetProjectStatus();
        List<TypeRequest> GetTypeRequest();
        WorkOrderDetails GetWorkOrder(int id);
        string[] InsertWorkOrder(int typeRequest);
    }
}