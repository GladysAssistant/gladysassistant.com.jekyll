FROM jekyll/jekyll as build-stage

WORKDIR /website

RUN npm install -g gulp 

COPY ./ /website/

RUN bundle install
RUN npm install
RUN gulp build

RUN mkdir _comments
RUN ls
RUN rake disquscomments

RUN chown -R jekyll:jekyll /website/
USER jekyll
RUN JEKYLL_ENV=production bundle exec jekyll build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /website/_site /usr/share/nginx/html