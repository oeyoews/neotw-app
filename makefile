download-html = https://oeyoews.github.io/neotw
index = index.html

build:
	@curl $(download-html)/$(index) -o src/$(index)
	@yarn make ## need install dpkg

dev:
	@yarn start

arch:
	@cp PKGBUILD out/make/deb/x64/; cd out/make/deb/x64/; makepkg  # local based arch

install:
	@cd out/make/deb/x64; sudo pacman -U *.zst

update:
	@make arch; make install