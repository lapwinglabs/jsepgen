
test:
	@echo "running tests..."
	@./node_modules/.bin/mocha \
		--reporter spec

.PHONY: test
