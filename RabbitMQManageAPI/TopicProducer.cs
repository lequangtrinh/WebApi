using Newtonsoft.Json;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace RabbitMQManageAPI.Producer
{
    static class TopicExchangePublisher
    {
        private const string nameExchange = "demo-topic-exchange";
        public static void Publish<T>(IModel channel, T value)
        {

            var ttl = new Dictionary<string, object>
            {
                {"x-message-ttl", 30000 }
            };
            channel.ExchangeDeclare(nameExchange, ExchangeType.Topic, durable: true, autoDelete: false, arguments: ttl);
            var message = new { Name = "data", Message = value };
            var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

            channel.BasicPublish(nameExchange, "sql.elk", null, body);

        }
    }
}
