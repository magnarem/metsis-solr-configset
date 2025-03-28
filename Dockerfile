#
# This file is used by the .github/workflows/solr.yaml action to verify
# that the solr config can be used to create a solr core
#
FROM docker.io/library/solr:latest
WORKDIR /var/solr

# Install JTS Spatial library for spatial indexing and search
ENV JTS_SHA=6a783d8f9dba3d3cf7265435f134402f63c05838aa6cbcc4297ad3a5b2842baf
ENV JTS_VERSION=1.20.0

#Set solr specific environment variables
ENV SOLR_HEAP=8192m
ENV SOLR_MODULES=ltr,clustering,analysis-extras,prometheus-exporter,scripting,langid

USER root

RUN set -x \
    && curl -fSL -o /opt/solr/server/solr-webapp/webapp/WEB-INF/lib/jts-core-$JTS_VERSION.jar \
    https://github.com/locationtech/jts/releases/download/$JTS_VERSION/jts-core-$JTS_VERSION.jar \
    && echo $JTS_SHA /opt/solr/server/solr-webapp/webapp/WEB-INF/lib/jts-core-$JTS_VERSION.jar | sha256sum -c -

USER solr
# Copy the configset to temporary dir (moved to the right path in kubernetes
RUN mkdir -p /var/solr/data/configsets/adc
COPY . /var/solr/data/configsets/adc
