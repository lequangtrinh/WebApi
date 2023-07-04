using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace RabbitMQManageAPI
{
    public class FanoutExchangePublisher
    {
        public static void Publish(IModel channel)
        {
            var ttl = new Dictionary<string, object>
            {
                {"x-message-ttl", 30000 }
            };
            //channel.ExchangeDeclare("Trinh_User", ExchangeType.Fanout, durable: true,autoDelete:false, arguments: ttl);
            channel.ExchangeDeclare("Trinh_User", ExchangeType.Fanout);
            var message = new { Name = "T_RegisUser", Message = "trinh tét data" };
                var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));
                var properties = channel.CreateBasicProperties();
                properties.Headers = new Dictionary<string, object> { { "account", "update" } };
                channel.BasicPublish("Trinh_Test_User", "account.new", properties, body);
        }
    }
}
