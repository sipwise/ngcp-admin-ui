# DOCKER_NAME=ngcp-admin-ui-bullseye
FROM docker.mgm.sipwise.com/sipwise-bullseye:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2022-10-04

ENV NODE_PATH=/usr/lib/nodejs:/usr/share/nodejs

# files that get-code generates
COPY t/sources.list.d/builddeps.list /etc/apt/sources.list.d/
COPY t/sources.list.d/preferences /etc/apt/preferences.d/

RUN apt-get update && \
    apt-get install --assume-yes --no-install-recommends \
        g++ \
        make \
        nodejs \
        python3 \
        yarnpkg \
        && \
    apt-get clean

ADD package.json /tmp/
ADD yarn.lock /tmp/
WORKDIR /tmp
RUN yarnpkg install

RUN echo "cd /code && t/run_admin_ui <ip-or-fqdn-of-your-installation>" > /root/.bash_history

WORKDIR /code

################################################################################
# Instructions for usage
# ----------------------
#
# Use the existing docker image:
# % docker pull docker.mgm.sipwise.com/ngcp-admin-ui-bullseye:latest
# NOTE: run the following command from root folder of git repository:
# % docker run --rm -p 8080:8080 -i -t -v $(pwd):/code:rw docker.mgm.sipwise.com/ngcp-admin-ui-bullseye:latest t/run_admin_ui <ip-or-fqdn-of-your-installation>
#
# You can also run shell inside the Docker container if strictly necessary
# % docker run --rm -p 8080:8080 -i -t -v $(pwd):/code:rw docker.mgm.sipwise.com/ngcp-admin-ui-bullseye:latest bash
# Inside docker: press UP and follow the command on the screen
#
# ==============================================================================
#
# When you want to build the base image from scratch
# you need to put the proper NGCP sources at t/sources.list.d/builddeps.list
# for instance, trunk:
# echo "deb https://deb.sipwise.com/autobuild/ release-trunk-bullseye main" > t/sources.list.d/builddeps.list
#
# NOTE: run the following command from root folder of git repository:
# % docker build --no-cache --tag="ngcp-admin-ui-bullseye" -f t/Dockerfile .
# % docker run --rm -p 8080:8080 -i -t -v $(pwd):/code:rw ngcp-admin-ui-bullseye:latest bash
# Inside docker: press UP and follow the command on the screen
#
################################################################################
