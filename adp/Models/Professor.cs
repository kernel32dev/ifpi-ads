using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace adp.Models
{
    public class Professor : Pessoa
    {
        public int Formacao {get; set;}
        public string Salario {get; set;}
    }
}