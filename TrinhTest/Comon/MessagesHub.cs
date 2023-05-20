using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace TrinhTest
{
    /// <summary>
    /// MessagesHub
    /// </summary>
    public class MessagesHub: Hub
    {
        public async Task SendMessage(string user, string userTo, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, userTo, message);
        }

        public async Task SendToUser(string user, string receiverConnectionId, string message)
        {
            await Clients.Client(receiverConnectionId).SendAsync("ReceiveMessage", user, message);
        }
        public string GetConnectionId() => Context.ConnectionId;
    }
}
