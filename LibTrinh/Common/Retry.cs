using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibTrinh.Common
{
    public static class Retry
    {
        private static Task HandleExceptionAsync(RetryOptions pRetryOptions, Exception pEx, int pRetryCount)
        {
            if (!pRetryOptions.ExceptionDetector.blnShouldRetryOn(pEx) || pRetryCount >= pRetryOptions.MaxRetries)
                throw pEx;

            var sleepTime = TimeSpan.FromMilliseconds(Math.Pow(pRetryOptions.WaitMillis, pRetryCount));
            return Task.Delay(sleepTime);
        }

        public static T Do<T>(Func<T> pFunc, RetryOptions pRetryOptions)
        {
            CheckNullFunc(pFunc);

            if (pRetryOptions?.ExceptionDetector == null)
                return pFunc();

            var retryCount = 1;
            while (retryCount <= pRetryOptions.MaxRetries)
            {
                try
                {
                    return pFunc();
                }
                catch (Exception ex)
                {
                    Task.Run(() => HandleExceptionAsync(pRetryOptions, ex, retryCount)).Wait();
                }

                retryCount++;
            }

            return default;
        }

        private static void CheckNullFunc<T>(Func<T> pFunc)
        {
            if (pFunc == null)
                throw new ArgumentNullException(nameof(pFunc));
        }

        public static async Task<T> DoAsync<T>(Func<Task<T>> pFunc, RetryOptions pRetryOptions)
        {
            CheckNullAsyncFunc(pFunc);

            if (pRetryOptions?.ExceptionDetector == null)
                return await pFunc();

            var retryCount = 1;
            while (retryCount <= pRetryOptions.MaxRetries)
            {
                try
                {
                    return await pFunc();
                }
                catch (Exception ex)
                {
                    await HandleExceptionAsync(pRetryOptions, ex, retryCount);
                }

                retryCount++;
            }

            return default;
        }

        private static void CheckNullAsyncFunc<T>(Func<Task<T>> pFunc)
        {
            if (pFunc == null)
                throw new ArgumentNullException(nameof(pFunc));
        }

        public static void Do(Action pAction, RetryOptions pRetryOptions)
            => Do(() =>
            {
                pAction();
                return true;
            }, pRetryOptions);

        public static async Task DoAsync(Func<Task> pAction, RetryOptions pRetryOptions)
            => await DoAsync(async () =>
            {
                await pAction();
                return true;
            }, pRetryOptions);
    }

}
