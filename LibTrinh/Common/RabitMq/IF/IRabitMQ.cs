namespace LibTrinh.Common
{
    /// <summary>
    /// IRabitMQ
    /// </summary>
    public interface IRabitMQ
    {
        /// <summary>
        /// SendMessage
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="message"></param>
        public void SendMessage<T>(T message);
    }
}
