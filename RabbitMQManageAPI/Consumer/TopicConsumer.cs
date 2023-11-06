using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RabbitMQManageAPI.Producer.Consumer
{
    public class TopicConsumer
    {
        private const string nameQueueSQL = "user-Sql-queue";
        private const string nameQueueELK = "user-ELK-queue";
        private const string nameExchange = "user-topic-exchange";
        public static void Consume(IModel channel)
        {
            GetQueueSQL(channel);
            GetQueueELK(channel);
        }
        public static void GetQueueSQL(IModel channel)
        {
            channel.ExchangeDeclare(nameExchange, ExchangeType.Topic, durable: true, autoDelete: false);

            channel.QueueDeclare(nameQueueSQL,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null);
            // *:phù hợp với bất kỳ tywf nào tương tự %like in sql
            // #:khớp với 1 or nhiều từ bất kì
            //channel.QueueBind(nameQueue, nameExchange, "sql.#");
            channel.QueueBind(nameQueueSQL, nameExchange, "sql.#");
            //channel.QueueBind("demo-topic-queue", "demo-topic-exchange", "*.update.*");
            channel.BasicQos(0, 10, false);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (sender, e) => {
                var body = e.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
            };

            channel.BasicConsume(nameQueueSQL, true, consumer);
            Console.WriteLine("Consumer started SQL");
        }
        public static void GetQueueELK(IModel channel)
        {
            channel.ExchangeDeclare(nameExchange, ExchangeType.Topic, durable: true);

            channel.QueueDeclare(nameQueueELK,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null);
            // *:phù hợp với bất kỳ tywf nào tương tự %like in sql
            // #:khớp với 1 or nhiều từ bất kì
            channel.QueueBind(nameQueueELK, nameExchange, "*.elk");
            channel.BasicQos(0, 10, false);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (sender, e) => {
                var body = e.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
            };
            channel.BasicConsume(nameQueueELK, true, consumer);
            Console.WriteLine("Consumer started ELK");
        }
    }
}
