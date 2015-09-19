FROM debian:latest
MAINTAINER Lingliang Zhang <lingliangz@gmail.com>

RUN apt-get update

RUN apt-get install -y curl git

# Install latest NodeJs
RUN curl https://deb.nodesource.com/setup_iojs_3.x | bash \
    && apt-get install -y iojs

# Install Flow
RUN apt-get install -y libelf-dev unzip \
    && curl http://flowtype.org/downloads/flow-linux64-latest.zip > /opt/flow.zip && unzip /opt/flow.zip -d /opt \
    && echo "\nPATH=\"\$PATH:/opt/flow/\"" >> ~/.bashrc

ADD . /srv/gazelle-front-end
WORKDIR /srv/gazelle-front-end

# Add node modules to the path
RUN echo "\nPATH=\"\$PATH:`npm bin`\"" >> ~/.bashrc

#RUN npm install

CMD bash
