# DOCKER_NAME=ngcp-admin-ui-buster
FROM docker.mgm.sipwise.com/sipwise-buster:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2020-06-24

# files that get-code generates
COPY t/sources.list.d/builddeps.list /etc/apt/sources.list.d/
COPY t/sources.list.d/preferences /etc/apt/preferences.d/

RUN apt-get update && \
    apt-get install --assume-yes \
        yarnpkg \
        nodejs \
        && \
    apt-get clean

RUN echo "cd /code && t/run_admin_ui <ip-or-fqdn-of-your-installation>" > /root/.bash_history

WORKDIR /code

################################################################################
# Instructions for usage
# ----------------------
#
# Use the existing docker image:
# % docker pull docker.mgm.sipwise.com/ngcp-admin-ui-buster
# NOTE: run the following command from root folder of git repository:
# % docker run --rm -p 8080:8080 -i -t -v $(pwd):/code:rw docker.mgm.sipwise.com/ngcp-admin-ui-buster:latest t/run_admin_ui <ip-or-fqdn-of-your-installation>
#
# You can also run shell inside the Docker container if strictly necessary
# % docker run --rm -p 8080:8080 -i -t -v $(pwd):/code:rw docker.mgm.sipwise.com/ngcp-admin-ui-buster:latest bash
# Inside docker: press UP and follow the command on the screen
#
# ==============================================================================
#
# When you want to build the base image from scratch
# you need to put the proper NGCP sources at t/sources.list.d/builddeps.list
# for instance, trunk:
# echo "deb https://deb.sipwise.com/autobuild/ release-trunk-buster main" > t/sources.list.d/builddeps.list
#
# NOTE: run the following command from root folder of git repository:
# % docker build --no-cache --tag="ngcp-admin-ui-buster" -f t/Dockerfile .
# % docker run --rm -p 8080:8080 -i -t -v $(pwd):/code:rw ngcp-admin-ui-buster:latest bash
# Inside docker: press UP and follow the command on the screen
#
################################################################################