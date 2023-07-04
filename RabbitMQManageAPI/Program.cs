//using RabbitMQ.Client;
//using RabbitMQ.Client.Events;
//using RabbitMQManageAPI;
//using System.Text;
////Here we specify the Rabbit MQ Server. we use rabbitmq docker image and use it
//var factory = new ConnectionFactory
//{
//    UserName = "guest",
//    Password = "guest",
//    //HostName= "127.0.0.1",
//    HostName = "127.0.0.1",
//    VirtualHost = "/",
//    Port = 5672
//    //RequestedHeartbeat = baseOptions.RequestedHeartbeat,
//    //Ssl = new SslOption
//    //{
//    //    Enabled = baseOptions.Tls.Enabled,
//    //    ServerName = baseOptions.Host,
//    //    Version = baseOptions.Tls.Enabled ? baseOptions.Tls.Protocols : SslProtocols.None,
//    //    AcceptablePolicyErrors = baseOptions.Tls.AcceptablePolicyErrors,
//    //    CertificateValidationCallback = baseOptions.Tls.CertificateValidationCallback
//    //}
//};
////Create the RabbitMQ connection using connection factory details as i mentioned above
//var connection = factory.CreateConnection();
////Here we create channel with session and model
//using
//var channel = connection.CreateModel();
////// Đây là cổng trung gian tiếp nhận message từ Producer và gửi về Queue. Routing key: Một địa chỉ dành cho message. Binding: Đảm nhận nhiệm vụ liên kết giữa Exchange và Queue
//////Có 5 loại Exchange: direct, topic, fanout, headers,Dead Letter Exchange
////channel.ExchangeDeclare("T-Message", "Direct", durable: true,
////               autoDelete: false,
////               arguments: null);
////declare the queue after mentioning name and a few property related to that


////channel.QueueDeclare("T-Message", durable: true,//queue và message sẽ bị xoá khi RabbitMQ server stop, để giữ lại chúng ta cần set giá trị này là true.
////                exclusive: true,// tự động hàm đợi khi ko sub xóa thông qua exe 
////                autoDelete: false,
////                arguments: null);

////Set Event object which listen message from chanel which is sent by producer
////var consumer = new EventingBasicConsumer(channel);
////consumer.Received += (model, eventArgs) => {
////    var body = eventArgs.Body.ToArray();
////    var message = Encoding.UTF8.GetString(body);
////    Console.WriteLine($"T-Message message received: {message}");
////};
//////read the message
////channel.BasicConsume(queue: "T-Message", autoAck: true, consumer: consumer);
////Console.ReadKey();
///
using RabbitMQ.Client;
using RabbitMQManageAPI.Consumer;

namespace RabbitMQManageAPI
{
    static class Program
    {
        static void Main(string[] args)
        {
            var factory = new ConnectionFactory
            {
                Uri = new Uri("amqp://guest:guest@localhost:5672")
            };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();
            FanoutExchangePublisher.Publish(channel);
        }
    }
}
