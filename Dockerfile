FROM mcr.microsoft.com/dotnet/aspnet:6.0 as final
WORKDIR /app
EXPOSE 6731

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY "TrinhTest.csproj" .
RUN dotnet restore "TrinhTest.csproj"
COPY . .
WORKDIR "/WebApi/."
RUN dotnet build "TrinhTest.csproj" -c Release -o /WebApi/build

FROM build AS publish
RUN dotnet publish "TrinhTest.csproj" -c Release -o /WebApi/publish

FROM base AS final
WORKDIR /WebApi
COPY --from=publish /WebApi/publish .
ENTRYPOINT ["dotnet", "TrinhTest.dll"]
