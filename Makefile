.PHONY: install 
install:
	curl -L https://github.com/hobochild/fig/releases/download/0.0.6/fig-linux-amd64 > fig

.PHONY: build 
build:
	./fig

.PHONY: build 
dev:
	./fig --dev
