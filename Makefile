all: install package

install:
	yarn

build:
	yarn build

package: build
	cd dst/ && web-ext build --overwrite-dest
