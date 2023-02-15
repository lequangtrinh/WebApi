using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace LibTrinh.Common
{
    public interface IBaseDbContext
    {
        IUnitOfWork Create(bool pTransactional = false, IsolationLevel pIsolationLevel = IsolationLevel.ReadCommitted, RetryOptions pRetryOptions = null);
        Task<IUnitOfWork> CreateAsync(bool pTransactional = false, IsolationLevel pIsolationLevel = IsolationLevel.ReadCommitted, RetryOptions pRetryOptions = null, CancellationToken pCancellationToken = default);
    }
}
