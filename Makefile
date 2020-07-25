.PHONY: install 
install:
	curl -L https://github.com/hobochild/fig/releases/download/0.0.1/fig > fig && chmod +x ./fig

.PHONY: build 
build:
	./fig

.PHONY: build 
dev:
	./fig --dev
