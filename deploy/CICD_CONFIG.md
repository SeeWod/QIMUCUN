# 应用 CI/CD 配置字段（按架构文档约定）

基础（var/secrets 标注参见右侧注释）

```
APP_NAME=youngto                            # var 服务名；同时用作容器 DNS 名（${APP_NAME}_backend）
APP_SERVER_NAME=your.domain.com             # var Nginx 站点的 server_name
APP_PORT=80                                 # var 后端容器的 HTTP 端口（本镜像为 php:8.2-apache，默认80）
APP_DEPLOY_PATH=/var/www/apps/youngto       # var 应用在服务器上的部署目录
APP_NETWORK_NAME=youngto_net                # var 应用自身的网络名（bridge）
```

CI/CD 相关

```
ACR_PASSWORD=                               # secret 镜像仓库密码（阿里云或其他）
ACR_REGISTRY=registry.aliyuncs.com          # var 镜像仓库地址
ACR_USERNAME=                               # secret 镜像仓库用户名
IMAGE_PREFIX=your-namespace                 # var 镜像前缀/命名空间
```

远程登录相关

```
SSH_HOST=                                   # secret 远程服务器 IP/域名
SSH_PORT=22                                 # var SSH 端口
SSH_KEY=                                    # secret 用于登陆的私钥（OpenSSH 格式）
SSH_USER=                                    # var SSH 用户名
```

基础设施相关

```
INFRA_NETWORK_NAME=infra                    # var 基础设施的网络名（供 Nginx 与各应用互通）
INFRA_DEPLOY_PATH=/var/www/infra            # var 基础设施部署路径（含 nginx/conf.d 与 static）
```

后端所需的业务配置（示例）

```
DB_HOST=                                    # secret 数据库主机（如：mysql 或 IP）
DB_PORT=3306                                # var    数据库端口
DB_DATABASE=appdb                           # var    数据库名
DB_USERNAME=appuser                         # secret 数据库用户名
DB_PASSWORD=                                # secret 数据库密码
APP_ENV=production                          # var    应用运行环境
```

CD 行为约定（在工作流实现中完成）

- 渲染部署模板：将 deploy/nginx/app.conf.tpl 根据上述字段生成 <APP_NAME>.conf
- 将生成的 <APP_NAME>.conf 上传到 INFRA_DEPLOY_PATH/nginx/conf.d/ 下
- 将前端静态文件（如 frontend/dist/）解压后上传到 INFRA_DEPLOY_PATH/static/<APP_NAME>/ 下
- 在服务器上创建 APP_DEPLOY_PATH，将 .env 与 docker-compose.yml 上传到此目录
- 重载基础设施（优先容器化 Nginx reload；否则 systemctl reload nginx），再启动/更新本应用容器
