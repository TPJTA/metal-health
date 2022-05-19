# 启动

## 常规启动

1. 在根目录创建 `.env` 文件

    ```bash
    # DATABASE
    TYPEORM_CONNECTION = mysql
    TYPEORM_HOST = localhost
    TYPEORM_DATABASE = meathhealth
    TYPEORM_USERNAME = <用户名>
    TYPEORM_PASSWORD = <密码>
    TYPEORM_PORT = 3306
    TYPEORM_ENTITIES = dist/**/*.entity.js
    TYPEORM_SYNCHRONIZE = true

    # SMTP config
    EMAIL_HOST = <smtp服务器地址>
    EMAIL_USERNAME = <smtp用户名>
    EMAIL_PASSWORD = <stmp密钥>
    ```

2. 在 `src/client` 创建 `.env`

    ```base
    # NEXT.JS
    NEXT_PUBLIC_ORIGIN = <地址>
    # 例如: NEXT_PUBLIC_ORIGIN = http://127.0.0.1:3012
    ```

3. 安装并启动

    ```bash
    yarn install

    yarn run build

    npm run prod
    ```

## docker-compose

1. 在根目录创建 `.env` 文件

    ```bash
    # SMTP config
    EMAIL_HOST = <smtp服务器地址>
    EMAIL_USERNAME = <smtp用户名>
    EMAIL_PASSWORD = <stmp密钥>
    ```

2. 在 `src/client` 创建 `.env`

    ```base
    # NEXT.JS
    NEXT_PUBLIC_ORIGIN = <地址>
    # 例如: NEXT_PUBLIC_ORIGIN = http://127.0.0.1:3012
    ```

3. 创建并启动contain

    ```base
    docker compose up -d
    ```
