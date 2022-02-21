IMAGE=ghcr.io/getzola/zola:v0.15.1

.PHONY: build 
build: build_site minify

.PHONY: build_site 
build_site:
	docker run -u "$$(id -u):$$(id -g)" -v ${PWD}:/app --workdir /app $(IMAGE) build

.PHONY: minify 
minify:
	docker run -u "$$(id -u):$$(id -g)" -v ${PWD}:/app --workdir /app tdewolff/minify minify -r -v -a -o -r -a -o ./ public/

.PHONY: dev
dev:
	rm -rf public/*
	docker run -u "$$(id -u):$$(id -g)" -v ${PWD}:/app --workdir /app -p 8080:8080 -p 1024:1024 $(IMAGE) serve --interface 0.0.0.0 --port 8080 --base-url localhost -f
