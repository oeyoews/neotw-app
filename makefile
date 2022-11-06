download-html = https://oeyoews.github.io/neotw
index = index.html
deb-dir = out/make/deb/x64
neotw-app-version = $(shell node -p "require('./package.json').version")

dev:
	@yarn start

build:
	# @curl $(download-html)/$(index) -o src/$(index)
	@python scripts/request.py
	@yarn make ## need install dpkg
	@cp PKGBUILD $(deb-dir)/PKGBUILD;
	@make patch
	@cd $(deb-dir); makepkg  # local based arch

install:
	@cd $(deb-dir); sudo pacman -U *.zst

win:
	# --arch=arm64 --out ./package
	@yarn electron-forge make --platform=win32

patch:
	@sed -i "s#VERSION#$(neotw-app-version)#" $(deb-dir)/PKGBUILD
