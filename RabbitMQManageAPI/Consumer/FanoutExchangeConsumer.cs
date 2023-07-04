using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace RabbitMQManageAPI.Consumer
{
    public class FanoutExchangeConsumer
    {
        public static void Consume(IModel channel)
        {
            channel.ExchangeDeclare("Trinh_Test_User1", ExchangeType.Fanout);
            channel.QueueDeclare("T_User",
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null);


            channel.QueueBind("T_User", "Trinh_Test_User1", string.Empty);
            channel.BasicQos(0, 10, false);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (sender, e) => {
                var body = e.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                writeLog("data Read1 - ");
                writeLog("data Read1 - " + message + " : " + body);
            };

            channel.BasicConsume("T_User", true, consumer);
            Console.WriteLine("Consumer started");
            Console.ReadLine();
        }

        public static void writeLog(string strValue)
        {
            try
            {
                //Logfile
                string path = "C:\\New folder\\rabbitmq-demo\\RabbitMQ.Consumer\\ImageTrack.log";
                StreamWriter sw;
                if (!File.Exists(path))
                { sw = File.CreateText(path); }
                else
                { sw = File.AppendText(path); }

                LogWrite(strValue, sw);

                sw.Flush();
                sw.Close();
            }
            catch (Exception ex)
            {

            }
        }

        private static void LogWrite(string logMessage, StreamWriter w)
        {
            w.WriteLine("{0}", logMessage);
            w.WriteLine("----------------------------------------");
        }
    }
}
