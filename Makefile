.PHONY: install 
install:
	curl -L https://github.com/hobochild/lil/releases/download/0.0.2/lil-x86_64-unknown-linux-gnu > lil && chmod +x lil

.PHONY: build 
build:
	./lil

.PHONY: dev
dev:
	./lil --dev
