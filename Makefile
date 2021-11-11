.PHONY: install 
install:
	curl -L https://github.com/hobochild/lil-lil/releases/download/0.0.2-rc.0/lil-linux- > lil && chmod +x ./lil

.PHONY: build 
build:
	./lil

.PHONY: dev
dev:
	./lil --dev
