using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace LibTrinh.Common
{
    public class RabitMQ : IRabitMQ
    {
        public void SendMessage<T>(T message)
        {
            var factory = new ConnectionFactory
            {
                HostName = "localhost"
            };
            //Create the RabbitMQ connection using connection factory details as i mentioned above
            var connection = factory.CreateConnection();
            using
            var channel = connection.CreateModel();
            //declare the queue after mentioning name and a few property related to that
            channel.QueueDeclare("TableChat", exclusive: false);
            //Serialize the message
            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);
            //put the data on to the TableChat queue
            channel.BasicPublish(exchange: "", routingKey: "TableChat", body: body);
        }
    }
}
