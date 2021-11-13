LIL_VERSION=0.0.3-rc.4

.PHONY: install 
install:
	curl -L https://github.com/hobochild/lil/releases/download/$(LIL_VERSION)/lil-x86_64-unknown-linux-gnu > lil && chmod +x lil

.PHONY: build 
build:
	./lil

.PHONY: dev
dev:
	./lil --dev
