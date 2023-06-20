using LibTrinh.Api;
using Microsoft.AspNetCore.Mvc;
using Moq;
using FluentAssertions;
using System.Threading.Tasks;
using TrinhTest.Controllers;
using Xunit;
using LibTrinh;
using Microsoft.Extensions.Configuration;
namespace TrinhXUT
{
    public class UnitTestBedService
    {
        [Fact]
        public async Task GetAllAsync_LoadComboboxRoom200()
        {
            /// Arrange
            var BedService = new Mock<IBed>();
            var IConfiguration = new Mock<IConfiguration>();
            var IRedisCacheService = new Mock<IRedisCacheService>();
            //IConfiguration config, IBed bed, IRedisCacheService IRedisCache
            BedService.Setup(_ => _.LoadComboboxRoom());
            var sut = new BedController(IConfiguration.Object,BedService.Object, IRedisCacheService.Object);
            /// Act
            var result = (OkObjectResult)await sut.LoadComboboxRoom();
            // /// Assert
            result.StatusCode.Should().Be(200);
        }
        [Fact]
        public async Task GetAllAsync_LoadBedAlotment200()
        {
            /// Arrange
            var BedService = new Mock<IBed>();
            var IConfiguration = new Mock<IConfiguration>();
            var IRedisCacheService = new Mock<IRedisCacheService>();
            BedService.Setup(_ => _.LoadBedAlotment());
            var sut = new BedController(IConfiguration.Object, BedService.Object, IRedisCacheService.Object);

            /// Act
            var result = (OkObjectResult)await sut.LoadBedAlotment();
            /// Assert
            result.StatusCode.Should().Be(200);
        }
        [Fact]
        public async Task GetAllAsync_LoadBed200()
        {
            /// Arrange
            var BedService = new Mock<IBed>();
            var IConfiguration = new Mock<IConfiguration>();
            var IRedisCacheService = new Mock<IRedisCacheService>();
            BedService.Setup(_ => _.LoadBed(1));
            var sut = new BedController(IConfiguration.Object, BedService.Object, IRedisCacheService.Object);

            /// Act
            var result = (OkObjectResult)await sut.LoadBed(1);
            /// Assert
            result.StatusCode.Should().Be(200);
        }
        [Fact]
        public async Task GetAllAsync_LoadBed204NoContentStatus()
        {
            /// Arrange
            var BedService = new Mock<IBed>();
            var IConfiguration = new Mock<IConfiguration>();
            var IRedisCacheService = new Mock<IRedisCacheService>();
            BedService.Setup(_ => _.LoadBed(0));
            var sut = new BedController(IConfiguration.Object, BedService.Object, IRedisCacheService.Object);

            /// Act
            var result = (NoContentResult)await sut.LoadBed(0);
            /// Assert
            Assert.IsType<NoContentResult>(result);
            /// Assert
            result.StatusCode.Should().Be(204);
            BedService.Verify(_ => _.LoadBed(0), Times.Exactly(1));
        }
    }
}