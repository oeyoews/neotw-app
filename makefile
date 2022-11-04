download-html = https://oeyoews.github.io/neotw
index = index.html
deb-dir = out/make/deb/x64

build:
	@curl $(download-html)/$(index) -o src/$(index)
	@yarn make ## need install dpkg

dev:
	@yarn start

arch:
	@cp PKGBUILD $(deb-dir); cd $(deb-dir); makepkg  # local based arch

install:
	@cd $(deb-dir); sudo pacman -U *.zst

update:
	@make arch; make install

win:
	# --arch=arm64 --out ./package
	@yarn electron-forge make --platform=win32
