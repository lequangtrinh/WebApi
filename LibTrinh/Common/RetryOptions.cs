namespace LibTrinh
{
    public class RetryOptions
    {
        public static RetryOptions Default { get; set; }

        static RetryOptions()
          => Default = new RetryOptions(1, 100, new SqlTransientExceptionDetector());

        public int MaxRetries { get; }
        public int WaitMillis { get; }
        public IExceptionDetector ExceptionDetector { get; set; }

        public RetryOptions(int pMaxRetries, int pWaitMillis, IExceptionDetector pExceptionDetector)
        {
            if (pMaxRetries < 1)
                throw new ArgumentOutOfRangeException(nameof(pMaxRetries), pMaxRetries, $"{nameof(pMaxRetries)} cannot be less than 1");
            if (pWaitMillis < 1)
                throw new ArgumentOutOfRangeException(nameof(pWaitMillis), pWaitMillis, $"{nameof(pWaitMillis)} cannot be less than 1");

            MaxRetries = pMaxRetries;
            WaitMillis = pWaitMillis;
            ExceptionDetector = pExceptionDetector;
        }

        public RetryOptions(int pMaxRetries, int pWaitMillis) : this(pMaxRetries, pWaitMillis, new SqlTransientExceptionDetector())
        {

        }
    }
}
