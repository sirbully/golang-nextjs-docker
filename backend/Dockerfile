FROM golang:latest

LABEL maintainer ="Krizza Bullecer <hello@krizzabullecer.dev>"

WORKDIR /usr/app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build

EXPOSE 9090

CMD ["./golang-nextjs-docker"]
