//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProjectControlPST.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Domain
    {
        public int uniqueId { get; set; }
        public string domain1 { get; set; }
        public int idProjectDescription { get; set; }
    
        public virtual ProjectDescription ProjectDescription { get; set; }
    }
}
