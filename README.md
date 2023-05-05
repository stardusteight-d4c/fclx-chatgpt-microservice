** WSL (Subsistema do Windows para Linux)

wsl --install

** Node.js

sudo apt update
sudo apt install nodejs
node -v

** Node Version Manager (NVM)
sudo apt-get update
sudo apt-get install build-essential libssl-dev
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm --version

*** Commands
nvm ls-remote (list available versions)
nvm install <version> (install a specific version)
nvm alias default <version> (set as default)

** Update NPM 
npm install -g npm@9.6.6

** Golang
cd ~
wget https://golang.org/dl/go1.17.6.linux-amd64.tar.gz (download the latest version of the Go package from the official website)
sudo tar -C /usr/local -xzf go1.17.6.linux-amd64.tar.gz (extract the Go package)

*** Configure environment variables for Go:
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc 
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc
source ~/.bashrc
go version

** Go Version Manager (GVM)
sudo apt update
sudo apt install curl git mercurial make binutils bison gcc build-essential
curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer | bash
echo '[[ -s "$HOME/.gvm/scripts/gvm" ]] && source "$HOME/.gvm/scripts/gvm"' >> ~/.bashrc
gvm version

*** Commands
gvm listall (list available versions)
gvm install <version> (install a specific version)
gvm use <version> --default (set as default)
 
** Git (open source distributed version control system designed)
sudo apt update
sudo apt install git
git --version


-----


** Docker e Docker Compose

Docker e Docker-Compose são duas ferramentas diferentes, embora estejam relacionadas e sejam frequentemente usadas juntas.

Docker é uma plataforma de contêineres que permite empacotar aplicativos e suas dependências em contêineres leves e portáteis. Os contêineres fornecidos pelo Docker podem ser executados em qualquer lugar, independentemente do ambiente em que foram criados, desde que o Docker esteja instalado.

Já o Docker-Compose é uma ferramenta que permite definir e executar aplicativos Docker compostos de vários contêineres. Ele permite definir a configuração de vários contêineres em um único arquivo YAML (ou seja, docker-compose.yml), que pode ser facilmente compartilhado, versionado e mantido em controle de versão. Com o Docker-Compose, é possível configurar e executar múltiplos contêineres, criar e gerenciar redes e volumes de armazenamento, além de definir variáveis de ambiente e outras configurações.

Em resumo, enquanto o Docker é a plataforma de contêineres em si, o Docker-Compose é uma ferramenta que ajuda a definir, configurar e executar aplicativos Docker que envolvem vários contêineres.

** Docker
sudo apt-get update
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce
sudo usermod -aG docker $USER
* restart system

** Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

--- 

cd /mnt/c/Users/Dell/Documents/www

docker network ls (list networks)
docker network create <my-network> (create a network)
docker network inspect <my-network> (network info)

```
[
    {
        "Name": "fcexperience",
        "Id": "0a6aa238fde963148286a0b98aadf61f15a74c98f9c884864d30d82c5b8ffe93",
        "Created": "2023-05-04T10:50:55.907372607-03:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "18b2f982e6409d264b091dfb30889924eefec255ff77034802cccefa078cbb0f": {
                "Name": "chatservice_app",
                "EndpointID": "4a4a76c24089e677841c9c4a16ec570f3a5b2e147f0ab42dc106cff3ed6ed3df",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            },
            "a8ced43a5453767ddecda855f84f3baeaa26c03c5d93a509f3135620ea653176": {
                "Name": "mysql",
                "EndpointID": "3cd758da08149fe875fbe723ff749068b13acbc2f4c8049b4815c030a1c7f423",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
```

*** Set a network for container

```
version: '3'

services:
  app:
    build: .
    ports:
      - 3000:3000
    user: root
    volumes:
      - .:/home/node/app
    networks:
      - fcexperience

  db:
    image: mysql:8.0.30-debian
    ports:
      - 3307:3306
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=chat
    volumes:
      - .docker/dbdata:/var/lib/mysql
    networks:
      - fcexperience
      
networks:
  fcexperience:
    external: true
```


** Commands 
go mod tidy 

docker compose ps
docker compose up
docker ps
docker compose ps chat-service
dcoker compose ls

docker compose exec <service_name> bash

 go run cmd/chatservice/main.go



Erro ao inicializar os containers? Tenha certeza que instalou as dependencias com go mod tidy,
que haja as variaveis de ambientes corretamente configuradas em .env.

Depois tive o seguinte erro:

mysql  | 2023-05-04T18:28:09.899430Z 1 [ERROR] [MY-011087] [Server] Different lower_case_table_names settings for server ('0') and data dictionary ('2').
mysql  | 2023-05-04T18:28:09.899771Z 0 [ERROR] [MY-010020] [Server] Data Dictionary initialization failed.

deletei o diretório .docker com 'sudo rm -r .docker' e corrigiu :)




```
Error: 14 UNAVAILABLE: No connection established
    at callErrorFromStatus (webpack-internal:///(sc_server)/./node_modules/@grpc/grpc-js/build/src/call.js:31:19)
    at Object.onReceiveStatus (webpack-internal:///(sc_server)/./node_modules/@grpc/grpc-js/build/src/client.js:347:73)
    at Object.onReceiveStatus (webpack-internal:///(sc_server)/./node_modules/@grpc/grpc-js/build/src/client-interceptors.js:308:181)
    at eval (webpack-internal:///(sc_server)/./node_modules/@grpc/grpc-js/build/src/resolving-call.js:94:78)
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
for call at
    at ServiceClientImpl.makeServerStreamRequest (webpack-internal:///(sc_server)/./node_modules/@grpc/grpc-js/build/src/client.js:330:34)
    at ServiceClientImpl.eval (webpack-internal:///(sc_server)/./node_modules/@grpc/grpc-js/build/src/make-client.js:103:19)
    at ChatServiceClient.chatStream (webpack-internal:///(sc_server)/./src/grpc/chat-service-client.ts:18:40)
    at GET (webpack-internal:///(sc_server)/./src/app/api/messages/[messageId]/events/route.ts:55:32) {
  code: 14,
  details: 'No connection established',
  metadata: Metadata { internalRepr: Map(0) {}, options: {} }
}
```