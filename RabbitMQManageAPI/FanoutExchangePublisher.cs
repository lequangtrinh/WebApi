using Newtonsoft.Json;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace RabbitMQManageAPI.Producer
{
    public static class FanoutExchangePublisher
    {
        public static void Publish<T>(IModel channel, T value)
        {
            var ttl = new Dictionary<string, object>
            {
                {"x-message-ttl", 30000 }
            };
            channel.ExchangeDeclare("demo-fanout-exchange"
                , ExchangeType.Fanout
                , durable: true// queue ko bi mất khi reset lại 
                , autoDelete: false
                , arguments: ttl);
            var message = new { Name = "Trinh2", Message = value };
            var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

            var properties = channel.CreateBasicProperties();
            properties.Persistent = true; // or props.DeliveryMode = 2;
            ///NoACK:(true)tự đông thực thi queue tiếp theo thi cusumer chạy xong or bị lỗi đang xử lý(load balan)
////persistent : được lưu queue  vào ổ đĩa hoặc cache nếu ổ đĩa có vấn đề sẽ lấy từ cache(ngược lại) để chạy liên tục
            properties.Headers = new Dictionary<string, object> { { "account", "update" } };

            channel.BasicPublish("demo-fanout-exchange", "account.new", properties, body);

        }
    }
}
