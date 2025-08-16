using Domain.DTOs;
using Domain.Models.Base;

namespace Domain.Models
{
    public class Payments : BaseEntity
    {
        public long Amount { get; set; }
        DateTime PaymentDate { get; set; }
        public string Note { get; set; }
        public TransactionType TransactionType { get; set; }

        //public string PaymentType { get; set; } // Withdrawal OR Deposit

        public long? ProductID { get; set; }
        public Product Product { get; set; }
    }
}
