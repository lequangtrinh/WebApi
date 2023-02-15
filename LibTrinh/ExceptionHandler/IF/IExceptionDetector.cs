using System;

namespace LibTrinh
{
    /// <summary>
    /// IExceptionDetector
    /// </summary>
    public interface IExceptionDetector
    {
        bool blnShouldRetryOn(Exception pEx);
    }
}
