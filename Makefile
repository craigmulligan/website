.PHONY: install 
install:
	curl -L https://github.com/hobochild/fig/releases/download/0.0.9/fig-linux-amd64 > fig && chmod +x ./fig

.PHONY: build 
build:
	./fig

.PHONY: build 
dev:
	./fig --d
