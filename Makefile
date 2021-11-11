.PHONY: install 
install:
	curl -L https://github.com/hobochild/lil/releases/download/0.0.2-rc.1/lil-x86_64-unknown-linux-gnu > lil

.PHONY: build 
build:
	./lil

.PHONY: dev
dev:
	./lil --dev
