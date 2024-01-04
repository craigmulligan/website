IMAGE=ghcr.io/getzola/zola:v0.15.1

.PHONY: build 
build:
	docker run -u "$$(id -u):$$(id -g)" -v ${PWD}:/app --workdir /app $(IMAGE) build

.PHONY: dev
dev:
	rm -rf public/*
	docker run -u "$$(id -u):$$(id -g)" -v ${PWD}:/app --workdir /app -p 8080:8080 -p 1024:1024 $(IMAGE) serve --interface 0.0.0.0 --port 8080 --base-url localhost -f

# Update the books.md page.
.PHONY: bookshelf  
bookshelf:
	python3 bookshelf.py
