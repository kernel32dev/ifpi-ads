using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace adp.Models
{
    public class Pessoa
    {
        [Display(Name="Código")]
        public int Id {get; set;}
        [Display(Name="Nome")]
        public string Nome {get; set;}
    }
}