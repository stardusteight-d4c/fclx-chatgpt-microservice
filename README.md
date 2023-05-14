<div align="center">
  <img src="logo.png" width="222" height="78" />
</div>

<h1 align="center">
   Full Cycle Learning Experience, ChatGPT Microservice
</h1>

The application was built in the Full Cycle Learning Experience (FCLX) week, we built a real-time chat application with OpenAI's artificial intelligence (ChatGPT) using the OpenAI API.

On the frontend, the application was developed in TypeScript with Next.js, a server-side rendering framework for React. Next Auth was used for user authentication and authorization, allowing only authenticated users to access the chat. API routes were created with API Routes, allowing for easy and secure integration between frontend and backend.

The SWR library was used to manage the state of the application on the frontend, supporting Stale While Revalidate (SWR) to improve performance and user experience. In addition, the application makes use of Protocol Buffers and gRPC for communication with the backend, which offers high performance and efficiency.

In the backend, the application was developed in GO. Protocol Buffers and gRPC were used to communicate with the frontend, ensuring fast and efficient communication between the two systems. Docker was used to ensure application portability and Docker Compose for managing multiple containers.

The application's architecture is based on Domain-Driven Design and Clean Architecture, ensuring that the application is easy to understand, modify and maintain. The MySQL database was used to store the chat data, with sqlc being used for SQL code generation.

In summary, the live chat application uses modern and efficient technologies to provide an enhanced and secure user experience. With the use of Protocol Buffers and gRPC, communication between the frontend and the backend is fast and efficient. The architecture based on Domain-Driven Design and Clean Architecture ensures that the application is easy to understand and maintain. With the use of Docker, the application is easily deployed and scalable.

## :hammer_and_wrench: Tools

### Frontend

* TypeScript
* Next.js
* Next Auth
* API Routes
* Prisma
* SWR (Stale While Revalidate)
* Protocol Buffers
* gRPC (Google Remote Procedure Call)
* Docker/Docker Compose

### Backend

* GO (Golang)
* Protocol Buffers
* gRPC (Google Remote Procedure Call)
* Docker/Docker Compose
* Makefile 
* Domain-Driven Design
* Clean Architecture
* MySQL
* OpenAI API
* sqlc: A SQL Compiler

## :mailbox_with_mail: Utilities

### <strong>WSL (Windows Subsystem for Linux)</strong>

Technology that allows you to run Linux distributions on a computer with the Windows operating system. WSL consists of a complete Linux kernel and an operating system compatibility layer that allows Linux applications to run on Windows without the need for virtualization.

With WSL, you can run native Linux applications such as the Bash shell, Linux commands and command line tools, and many other open source applications available on Linux. This allows developers, system administrators and others to work on Linux projects in a familiar environment, without the need to use a virtual machine or other emulation solution.

WSL is available as an optional feature on Windows 10 and Windows Server and supports many Linux distributions including Ubuntu, Debian, Fedora and others. WSL 2 is a newer version of WSL that provides better performance and supports an improved virtualization layer, allowing Linux applications to run with better performance and security.
 
#### Installation 

- `wsl --install`
 
### <strong>GO (Golang)</strong>

GO (also known as Golang) is a programming language created in 2007 by Google software engineers Robert Griesemer, Rob Pike and Ken Thompson. It is an open source and compiled programming language that stands out for its simplicity, efficiency, performance and code readability.

GO is a statically typed language, which means data types are checked at compile time. It is also a compiled programming language, which means that the code is translated into machine language before execution. This allows the GO code to be high performing and run quickly.

The GO language has a simple syntax, which resembles languages such as C and Java. However, GO was designed to be more efficient in terms of code writing and readability. Furthermore, the language offers features such as automatic memory management and garbage collector, making programming in GO easier for developers.

Another important feature of GO is that it is a compiled language, but it provides native support for building distributed and parallel applications. This allows developers to write concurrent, parallel code that runs on multiple CPUs and allows the application to take full advantage of available hardware.

GO is widely used in building back-end applications, infrastructure systems, command-line tools, networking programs and cloud services. Large companies such as Google, Uber, Dropbox and SoundCloud use GO in their daily software development operations.

#### Installation 
- `cd ~`
- `wget https://golang.org/dl/go1.17.6.linux-amd64.tar.gz` (download the latest version of the Go package from the official website)
- `sudo tar -C /usr/local -xzf go1.17.6.linux-amd64.tar.gz` (extract the Go package)

#### Configure environment variables for Go:

- `echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc`
- `echo 'export GOPATH=$HOME/go' >> ~/.bashrc`
- `echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc`
- `source ~/.bashrc`
- `go version`

#### Go Version Manager (GVM) 
- `sudo apt update`
- `sudo apt install curl git mercurial make binutils bison gcc build-essential`
- `curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer | bash`
- `echo '[[ -s "$HOME/.gvm/scripts/gvm" ]] && source "$HOME/.gvm/scripts/gvm"' >> ~/.bashrc`
- `gvm version`

### Docker and Docker Compose

Docker is a software container platform that lets you build, deploy, and run containerized applications. A container is an isolated unit of software that includes all the necessary dependencies for the application to run consistently, regardless of the environment in which it is running.

Docker Compose, in turn, is a tool for defining and running multi-container Docker applications. It allows you to define and configure multiple containers as a single application unit and run them all with a single command.

The main difference between Docker and Docker Compose is that Docker is used to build, deploy and run individual containers while Docker Compose is used to manage applications composed of multiple containers. With Docker, you can build and run a single container for each application, while with Docker Compose, you can define and run multiple containers together as a single application unit.

Furthermore, Docker Compose offers a convenient way to define the configuration of an application's development or production environment, with all its containers, volumes, environment variables and other necessary settings in a single YAML file. This allows you to easily configure and run a complete application in any environment, whether locally on your development machine or on a production server.

In short, Docker is a software container platform that lets you build and run individual containers, while Docker Compose is a tool for defining and running applications composed of multiple containers.

#### Docker Installation

- `sudo apt-get update`
- `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
- `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`
- `sudo apt-get update`
- `sudo apt-get install docker-ce`
- `sudo usermod -aG docker $USER` <br />
<i>restart system</i>

#### Docker Compose Installation

- `sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
- `sudo chmod +x /usr/local/bin/docker-compose`
- `docker-compose --version`

### gRPC (Google Remote Procedure Call)

RPC (Remote Procedure Call) is a network communication model that allows a program on one computer to call a function or method on another computer without needing to understand the details of the method's implementation or the underlying network communication. RPC was created to simplify the development of distributed systems by allowing different parts of the system to communicate transparently.

gRPC is a modern implementation of the RPC model that uses Protocol Buffers as the data serialization format and HTTP/2 as the transport protocol. gRPC uses a service definition and messaging system to define the service interface and automatically generate client and server code in various programming languages.

Protocol Buffers are used by gRPC to serialize the data into a language-agnostic, compact and efficient way. Using Protocol Buffers as the data format allows gRPC to be space and bandwidth efficient, which is especially important in distributed systems where efficiency is crucial.

Therefore, gRPC is a modern and efficient implementation of the RPC model that uses Protocol Buffers for data serialization and HTTP/2 as the transport protocol, making it ideal for building scalable and efficient distributed systems.

## :speech_balloon: Explanations

### <strong>Containerization - creating and using containers</strong>

Docker technology uses the Linux kernel and kernel features such as cGroups and namespaces to segregate processes. So they can run independently. The purpose of containers is to create independence: the ability to run multiple processes and apps separately to better utilize the infrastructure while maintaining the security you would have on separate systems.

Container tools, including Docker, include an image-based deployment model. This makes it easy to share an application or set of services, including all their dependencies, across multiple environments. Docker also automates the deployment of the application (or sets of processes that make up an app) within this containerized environment.

These tools based on Linux containers make Docker unique and easy to use. They also give users unprecedented access to apps and full control over versions and distribution, as well as the ability to deploy quickly.

You need to have a Dockerfile even if you are working with a docker-compose.yaml file. This is because docker-compose is a tool that allows you to define and run multi-container Docker applications, while the Dockerfile is a file that contains instructions for building a Docker image that will be used by containers.

docker-compose.yaml is used to configure settings for various containers and their relationships, as well as other settings such as volumes and networks. The Dockerfile file, in turn, is used to define how to build a specific Docker image, including the dependencies, configurations and other details needed to run a specific container.

In other words, the Dockerfile is used to create the Docker image that will be used by the containers, while the docker-compose.yaml is used to define and orchestrate various containers that use these images. Without a Dockerfile, there is no image for docker-compose.yaml to use, so both files are needed to work with multi-container Docker applications.

```dockerfile
# chat-service/Dockerfile
FROM ubuntu:latest
FROM golang:1.20.3

# Set environment variables
ENV PATH="/root/.cargo/bin:${PATH}"
ENV USER=root

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \ 
    && rustup default stable \ 
    && rustup target add x86_64-unknown-linux-gnu

WORKDIR /go/src
RUN ln -sf /bin/bash /bin/sh
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .

RUN cd /go/pkg/mod/github.com/j178/tiktoken-go@v0.2.1/tiktoken-cffi && \
    cargo build --release

RUN apt update && apt install -y protobuf-compiler && apt install -y protoc-gen-go
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2

CMD [ "tail", "-f", "/dev/null" ]
```

This Dockerfile file is responsible for defining the necessary instructions for creating a custom Docker image.

The Dockerfile starts by defining the base image that will be used as a starting point for building the custom image, in this case the latest Ubuntu and Golang version 1.20.3.

Then the file defines some environment variables that will be used during compilation and build.

Rust is installed in the container, as well as some necessary dependencies for building libraries and applications.

The file defines the working directory in which the build operations will be performed. The archive then copies the go.mod and go.sum files to the working directory and runs the command go mod download && go mod verify to download and verify the modules needed for the build.

It then copies the entire contents of the current source directory to the working directory in the container. After that, it runs a build script to compile the TikToken library.

Then install the necessary tools to compile Protocol Buffers and gRPC, as well as protoc-gen-go-grpc, a tool that generates Go code for gRPC interfaces.

Finally, the CMD command that will be executed when the container starts is defined. In this case, the command `tail -f /dev/null` is used to keep the container running since it doesn't have a specific application to run.

```yaml
version: '3'

services:
  chatservice:
    build: .
    container_name: chatservice_app
    volumes:
      - .:/go/src
    ports:
      - "8081:8080"
      - "50052:50051"
    networks:
      - fcexperience
      
  mysql:
    image: mysql:8
    container_name: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: chat_test
      MYSQL_PASSWORD: root
    ports:
      - 3306:3306  
    volumes:
      - .docker/mysql:/var/lib/mysql
    networks:
      - fcexperience

networks:
  fcexperience:
    external: true
```

This is a docker-compose YAML file that defines the configuration for two services: `chatservice` and `mysql`. The `chatservice` service is defined from an image built from the Dockerfile located in the current directory `.`, and will be named `chatservice_app` inside the Docker container. It also maps host ports 8081 and 50052 to ports within the container 8080 and 50051 respectively. The shared volume between the host and the container is specified for the current directory `.`. The `fcexperience` network is used to connect the containers.

The `mysql` service is defined as a pre-built MySQL version 8 image. It will be named mysql inside the Docker container. Environment variables are set to configure database access credentials. The shared volume is specified for the `.docker/mysql` directory. Host port 3306 is mapped to container port 3306. The `fcexperience` network is used to connect the containers.

This configuration file is run with the `docker compose up` command in the directory where it is located.

- `docker network ls (list networks)`
- `docker network create <my-network> (create a network)`
- `docker network inspect <my-network> (network info)`
- `docker compose up`
- `docker compose down`
- `docker compose ps`
- `docker compose ls`
- `docker compose exec <service_name> bash`

In the provided docker-compose example, the first port on each line represents the container port and the second port represents the host's external port. So, in the snippet:

```
ports:
  - "8081:8080"
  - "50052:50051"
```

- Port 8080 is the port exposed by the `chatservice` service container.
- Port 8081 is the host (external) port where external traffic will be received and redirected to port 8080 of the `chatservice` container.
- Port 50051 is the port exposed by the `chatservice` service container.
- Port 50052 is the host (external) port where external traffic will be received and redirected to port 50051 of the `chatservice` container.

### <strong>Internal networks of containers</strong>

The internal networks of containers in Docker are used to allow containers to communicate with each other, regardless of whether they are on different hosts. An internal network is a virtual network that is created by Docker that allows containers to communicate directly using their own IP addresses.

Internal networks can be created explicitly using the docker network create command, or they can be created automatically when a new container is created and no network name is specified. When a new container is created, it is automatically added to Docker's default internal network called "bridge".

Internal networks are useful for creating distributed applications that run in multiple containers, where each container runs a different part of the application. This architecture allows each part of the application to scale independently, which makes the solution more flexible and scalable.

In addition, internal networks are also used to isolate applications from each other, which increases security. By default, containers on an internal network can communicate with each other, but cannot communicate with containers on other internal networks or on the host's external network. This isolation approach can help reduce the risk of an application being compromised in the event of a security breach in another application on the same host.

- `docker network create fcexperience`
- `docker network inspect fcexperience`

```json
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

For the front-end to communicate with the gRPC server running locally inside a container, it was necessary to create an internal network, and thus obtain its address through the `"Gateway"` and the port on which the gRPC server was running defined in the file `docker-compose.yaml` and environment variables.

```ts
// nextjs/src/grpc/client.ts

import * as protoLoader from '@grpc/proto-loader'
import * as grpc from '@grpc/grpc-js'
import path from 'path'
import { ProtoGrpcType } from './rpc/chat'

const packageDefinition = protoLoader.loadSync(
  path.resolve(process.cwd(), 'proto', 'chat.proto')
)

const proto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType

export const chatClient = new proto.pb.ChatService(
  '172.18.0.1:50052',
  grpc.credentials.createInsecure()
)
```

> This code is creating a gRPC client instance for the chat service specified by the Protocol Buffers definition file in `proto.pb`, using IP address `172.18.0.1` and port `50052` to connect to the gRPC server .

> The second line `grpc.credentials.createInsecure()` creates an insecure communication channel to the gRPC server. This type of channel does not use SSL/TLS to encrypt communications, which means that information transmitted over it can be read and intercepted by third parties. However, in development or testing environments, it can be useful to use an unsecured channel to simplify infrastructure setup. In production environments, it is recommended to use a secure channel.</i>

### <strong>Common problems</strong>

#### Error initializing containers

- Make sure you installed the dependencies with `go mod tidy`;
- That there are environment variables correctly set in `.env`;
- Delete the `.docker` directory with the command `sudo rm -r .docker`.

#### Error with database

Useful commands for debugging (accessing the DB or getting service logs):

- `mysql -h localhost -P 3307 -u root -p`
- `docker exec -it nextjs-db-1 mysql -uroot -proot -h db`
- `docker logs nextjs-db-1`

It can also usually be a `migrate` issue, where you may have forgotten to generate the tables. In this application you can generate migrations in different ways:

##### Front-end

- `docker compose exec app bash`
- `npx prisma migrate dev`

##### Back-end

- `docker compose exec chatservice bash`
- `go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest`
- `make migrate`

<i>*don't forget to run the servers in their containers with `go run cmd/chatservice/main.go` and `npm run dev`</i>

### <strong>Backend architecture in Golang</strong>

In GO it is common to follow the "clean architecture" pattern, which emphasizes the separation of responsibilities and independence between the layers of the system. In this pattern, the business layer is kept at the center and is responsible for the business logic, while the outer layers like the UI and infrastructure layer are kept separate.

Another common pattern in Go is "dependency injection", which allows dependencies to be flexibly injected into a code structure without requiring the code to directly depend on a specific implementation. This makes the code more modular and testable.

There are basically two main directories in this `tree view`: `internal` and `cmd`. The `internal` directory contains code that is specific to the application and should not be exposed as an external API. The `cmd` directory contains the code for the application's main executables:

```
.
├── Dockerfile
├── Makefile
├── api
│   └── chat.http
├── cmd
│   └── chatservice
│       ├── configs
│       │   └── config.go
│       └── main.go
├── docker-compose.yaml
├── go.mod
├── go.sum
├── internal
│   ├── domain
│   │   ├── entity
│   │   │   ├── chat.go
│   │   │   ├── message.go
│   │   │   └── model.go
│   │   └── gateway
│   │       └── chat.go
│   ├── infra
│   │   ├── db
│   │   │   ├── db.go
│   │   │   ├── models.go
│   │   │   └── query.sql.go
│   │   ├── grpc
│   │   │   ├── pb
│   │   │   │   ├── chat.pb.go
│   │   │   │   └── chat_grpc.pb.go
│   │   │   ├── server
│   │   │   │   └── server.go
│   │   │   └── service
│   │   │       └── chat.go
│   │   ├── repository
│   │   │   └── chat.go
│   │   └── web
│   │       ├── chat_gpt_handler.go
│   │       └── webserver
│   │           └── webserver.go
│   └── usecases
│       ├── chatcompletion
│       │   └── completion.go
│       └── chatcompletionstream
│           └── completion.go
├── proto
│   └── chat.proto
├── sql
│   ├── migrations
│   │   ├── 000001_init.down.sql
│   │   └── 000001_init.up.sql
│   └── queries
│       └── query.sql
└── sqlc.yaml
```
#### Domain

In domain-oriented software architecture (DDD), the domain layer is responsible for encapsulating the business logic and rules that govern the core functionality of the system. It is the heart of the system, where knowledge about the domain is modeled, captured and expressed in code.

The domain layer in DDD is composed of classes and objects that represent domain concepts, such as entities, value objects and aggregates. These objects encapsulate domain state and behavior, implementing domain-specific business logic. They should not be responsible for infrastructure-related tasks such as database access or user interface interaction.

One of the main goals of the domain layer in DDD is to provide a ubiquitous language for all participants involved in the system design. The ubiquitous language is a shared vocabulary that describes domain concepts and business rules in a clear and precise manner. This language is used to model the system in code and to facilitate communication between business and technical team members.

The domain layer in DDD is also responsible for ensuring the integrity of system data and the consistency of operations performed by the system. Validation rules and business constraints are implemented at this layer to ensure that system data is always in a valid and consistent state.

In summary, the domain layer in DDD is one of the most important parts of the system, responsible for encapsulating the business logic and ensuring the consistency and integrity of the system's data. It is modeled using the ubiquitous language, which is shared by everyone involved in the system design.

```go
package entity

import (
  "errors"

  "github.com/google/uuid"
)

type ChatConfig struct {
  Model            *Model
  Temperature      float32
  TopP             float32
  N                int     
  Stop             []string 
  MaxTokens        int    
  PresencePenalty  float32 
  FrequencyPenalty float32 
}

type Chat struct {
  ID                   string
  UserID               string
  InitialSystemMessage *Message
  Messages             []*Message
  ErasedMessages       []*Message
  Status               string
  TokenUsage           int
  Config               *ChatConfig
}

func NewChat(userID string, initialSystemMessage *Message, chatConfig *ChatConfig) (*Chat, error) {
  chat := &Chat{
    ID:                   uuid.New().String(),
    UserID:               userID,
    InitialSystemMessage: initialSystemMessage,
    Status:               "active",
    Config:               chatConfig,
    TokenUsage:           0,
  }
  chat.AddMessage(initialSystemMessage)
  if err := chat.Validate(); err != nil {
   return nil, err
  }
  return chat, nil
}

func (c *Chat) Validate() error {
  if c.UserID == "" {
    return errors.New("user id is empty")
  }
  if c.Status != "active" && c.Status != "ended" {
   return errors.New("invalid status")
  }
  if c.Config.Temperature < 0 || c.Config.Temperature > 2 {
   return errors.New("invalid temperature")
  }
  return nil
}

func (c *Chat) AddMessage(m *Message) error {
  if c.Status == "ended" {
   return errors.New("chatis is ended. no more messages allowed")
  }
  for {
    if c.Config.Model.GetMaxTokens() >= m.GetQtdTokens()+c.TokenUsage {
      c.Messages = append(c.Messages, m)
      c.RefreshTokenUsage()
      break
    }
    c.ErasedMessages = append(c.ErasedMessages, c.Messages[0])
    c.Messages = c.Messages[1:]
    c.RefreshTokenUsage()
  }
  return nil
}

func (c *Chat) GetMessages() []*Message {
  return c.Messages
}

func (c *Chat) CountMessages() int {
  return len(c.Messages)
}

func (c *Chat) End() {
  c.Status = "ended"
}

func (c *Chat) RefreshTokenUsage() {
  c.TokenUsage = 0
  for m := range c.Messages {
    c.TokenUsage += c.Messages[m].GetQtdTokens()
  }
}
```

> Entities in DDD are implemented as objects in code that encapsulate their attributes and related behaviors. They usually have a unique identifier, which can be a value such as a number or a string, or even a combination of attributes that together form a unique key. Entities can also have methods that implement business logic related to them.

#### Gateway

The "gateway" directory is a common convention in many software projects that follow the hexagonal architectural pattern (also known as ports and adapters or clean architecture). This pattern aims to separate the system's core business logic from external dependencies such as the database, third-party services, and other systems.

The "gateway" package contains interfaces that define the contracts for accessing and interacting with these external system dependencies, such as the database or other services. The idea is that concrete implementations of these interfaces are provided via dependency injection, allowing the system's core business logic to be decoupled from external dependencies and tested in isolation.

In the code example you provided, the "gateway" package contains the definition of the ChatGateway interface, which defines the methods for creating, retrieving, and saving a chat. This interface is used by the system's core business logic, which can be found in other packages. Concrete implementations of these methods, which communicate with the database or other services, would be provided via dependency injection.

By using this approach, the core business logic of the system does not have to worry about external dependencies and can only focus on implementing the business logic. This makes the system more flexible and easier to maintain, as dependencies can be replaced or updated without affecting the system's core business logic.

We can draw a parallel between the concept of `repository` and the concept of `gateway`, since both serve as an abstraction for accessing data in a system.

In DDD, the repository is an interface that defines methods for creating, reading, updating, and deleting entities in a system. It is used to abstract the data persistence layer from the rest of the system, allowing the system's core business logic to work with the entities instead of being concerned with the underlying persistence layer. Repositories are usually implemented in a separate package (eg "repository") and are injected into other layers of the system to provide access to data.

The gateway, in turn, is an interface that defines methods for accessing external resources (such as a database, third-party services, etc.) on a system. Like the repository, the gateway serves as an abstraction layer between the system's core business logic and external dependencies, allowing the system to be more modular and flexible. Gateways are usually implemented in a separate package (eg "gateway") and are injected into other layers of the system to provide access to external resources.

In short, both the repository and the gateway are interfaces that abstract access to data within a system and help separate concerns from the system's core business logic and external dependencies. The difference is that the repository is usually associated with the data persistence layer, while the gateway can be used to access a variety of external resources.

```go
package gateway

import (
  "context"

  "github.com/stardusteight-d4c/fclx-chatgpt-microservice/chat-service/internal/domain/entity"
)

type ChatGateway interface {
  CreateChat(ctx context.Context, chat *entity.Chat) error
  FindChatByID(ctx context.Context, chatID string) (*entity.Chat, error)
  SaveChat(ctx context.Context, chat *entity.Chat) error
}
```


