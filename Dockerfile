FROM mcr.microsoft.com/dotnet/core/aspnet:6.0-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:6.0-buster AS build
WORKDIR /src
COPY ["TrinhTest.sln", ""]
RUN dotnet restore "./TrinhTest.sln"
COPY . .
WORKDIR "/src/."
RUN dotnet build "TrinhTest.sln" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TrinhTest.sln" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TrinhTest.dll"]
