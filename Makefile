.PHONY: install 
install:
	curl -L https://github.com/hobochild/lil/releases/download/0.0.11/lil-linux-amd64 > lil && chmod +x ./lil

.PHONY: build 
build:
	./lil

.PHONY: build 
dev:
	./lil -d
