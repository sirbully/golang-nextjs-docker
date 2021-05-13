FROM golang:latest

LABEL maintainer ="Krizza Bullecer <hello@krizzabullecer.dev>"

WORKDIR /usr/app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

EXPOSE 9090

RUN go build

CMD ["./golang-nextjs-docker"]
