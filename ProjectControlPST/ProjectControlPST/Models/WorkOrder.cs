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
    
    public partial class WorkOrder
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WorkOrder()
        {
            this.ProjectDescriptions = new HashSet<ProjectDescription>();
            this.Users = new HashSet<User>();
        }
    
        public int uniqueId { get; set; }
        public string author { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public int idTypeRequest { get; set; }
        public string projectName { get; set; }
        public Nullable<int> referencePreviousJob { get; set; }
        public string agencyPM { get; set; }
        public string agencyAccountDirector { get; set; }
        public string brandManager { get; set; }
        public string prodigiousPM { get; set; }
        public string jiraParentUrl { get; set; }
        public int idProjectStatus { get; set; }
        public Nullable<int> idProjectDescription { get; set; }
        public string secureCode { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProjectDescription> ProjectDescriptions { get; set; }
        public virtual ProjectDescription ProjectDescription { get; set; }
        public virtual ProjectStatus ProjectStatu { get; set; }
        public virtual TypeRequest TypeRequest { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> Users { get; set; }
    }
}
