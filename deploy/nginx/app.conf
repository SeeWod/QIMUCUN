server {
  listen 80;
  server_name __APP_SERVER_NAME__;

  root __INFRA_DEPLOY_PATH__/static/__APP_NAME__;
  index index.html index.htm;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://__APP_NAME___backend:__APP_PORT__/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Connection "";
    proxy_buffering on;
  }

  location ~* \.(?:css|js|jpg|jpeg|png|gif|ico|svg|webp)$ {
    expires 7d;
    access_log off;
    add_header Cache-Control "public";
  }

  location ~ /\. {
    deny all;
  }
}
