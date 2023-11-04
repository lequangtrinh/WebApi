using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
//Here we specify the Rabbit MQ Server. we use rabbitmq docker image and use it
var factory = new ConnectionFactory
{
    Uri = new Uri("amqp://guest:guest@localhost:5672")
};
//Create the RabbitMQ connection using connection factory details as i mentioned above
var connection = factory.CreateConnection();
//Here we create channel with session and model
using
var channel = connection.CreateModel();
//// Đây là cổng trung gian tiếp nhận message từ Producer và gửi về Queue. Routing key: Một địa chỉ dành cho message. Binding: Đảm nhận nhiệm vụ liên kết giữa Exchange và Queue
////Có 5 loại Exchange: direct, topic, fanout, headers,Dead Letter Exchange
//channel.ExchangeDeclare("T-Message", "Direct", durable: true,
//               autoDelete: false,
//               arguments: null);
//declare the queue after mentioning name and a few property related to that

channel.QueueDeclare("T-Message", durable: true,// queue ko bi mất khi reset lại 
                exclusive: true,// tự động hàm đợi khi ko sub xóa thông qua exe 
                autoDelete: false,
                arguments: null);
//Set Event object which listen message from chanel which is sent by producer

var consumer = new EventingBasicConsumer(channel);
consumer.Received += (model, eventArgs) => {
    var body = eventArgs.Body.ToArray();
    var message = Encoding.UTF8.GetString(body);
    Console.WriteLine($"T-Message message received: {message}");
};
var props = channel.CreateBasicProperties();
props.Persistent = true; // or props.DeliveryMode = 2;
//NoACK:(true)tự đông thực thi queue tiếp theo thi cusumer chạy xong or bị lỗi đang xử lý(load balan)
//persistent : được lưu queue  vào ổ đĩa hoặc cache nếu ổ đĩa có vấn đề sẽ lấy từ cache(ngược lại) để chạy liên tục
//read the message
channel.BasicConsume(queue: "T-Message", autoAck: true, consumer: consumer);
Console.ReadKey();