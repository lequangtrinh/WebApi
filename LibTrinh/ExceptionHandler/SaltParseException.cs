using System.Runtime.Serialization;

namespace LibTrinh.ExceptionHandler
{
    public class SaltParseException : ApplicationException
    {
        /// <summary>Default constructor. </summary>
        public SaltParseException()
        {
        }

        /// <summary>Initializes a new instance of <see cref="SaltParseException"/>.</summary>
        /// <param name="pMessage">The message.</param>
        public SaltParseException(string pMessage)
            : base(pMessage)
        {
        }

        /// <summary>Initializes a new instance of <see cref="SaltParseException"/>.</summary>
        /// <param name="pMessage">       The message.</param>
        /// <param name="pInnerException">The inner exception.</param>
        public SaltParseException(string pMessage, Exception pInnerException)
            : base(pMessage, pInnerException)
        {
        }

        /// <summary>Initializes a new instance of <see cref="SaltParseException"/>.</summary>
        /// <param name="pInfo">   The information.</param>
        /// <param name="pContext">The context.</param>
        protected SaltParseException(SerializationInfo pInfo, StreamingContext pContext)
            : base(pInfo, pContext)
        {
        }
    }

}
