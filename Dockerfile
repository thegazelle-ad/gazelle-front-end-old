FROM debian:latest
MAINTAINER Lingliang Zhang <lingliangz@gmail.com>

RUN apt-get update

RUN apt-get install -y curl git

# Install latest NodeJs
RUN curl https://deb.nodesource.com/setup_5.x | bash \
    && apt-get install -y nodejs

ADD . /srv/gazelle-front-end
WORKDIR /srv/gazelle-front-end

# Add node modules to the path
RUN echo "\nPATH=\"\$PATH:`npm bin`\"" >> ~/.bashrc

CMD bash
