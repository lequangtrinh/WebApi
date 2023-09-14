﻿using AutoMapper.Configuration;
using LibTrinh;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TrinhTest.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IRedisCacheService _IRedisCache;
        /// <summary>
        /// Custrustor
        /// </summary>
        /// <param name="config"></param>
        public SettingsController(IConfiguration config, IRedisCacheService IRedisCache)
        {
            _config = config;
            _IRedisCache = IRedisCache;
        }
    }
}
