using Domain.Models;
using WebApi.DTOs.Base;

namespace Domain.DTOs
{

    public class PaymentsDto : BaseDto
    {
        public long Amount { get; set; }
        DateTime PaymentDate { get; set; }
        public string Note { get; set; }
        public TransactionType TransactionType { get; set; }

        public long? ProductID { get; set; }
    }

    public enum TransactionType
    {
        Sale,      // Money coming in from a customer
        Refund,    // Money going out to a customer
        Expense,   // Money spent on business costs (e.g., supplies)
        Deposit,   // General money in
        Withdrawal // General money out
    }
}
