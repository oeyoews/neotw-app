download-html = https://oeyoews.github.io/neotw
index = index.html
deb-dir = out/make/deb/x64
neotw-app-version = $(shell node -p "require('./package.json').version")

pre:
	sudo dpkg --add-architecture i386
	sudo apt update
	wget -qO- https://dl.winehq.org/wine-builds/winehq.key | sudo apt-key add -
	sudo apt install software-properties-common
	sudo apt-add-repository 'deb http://dl.winehq.org/wine-builds/ubuntu/ bionic main'
	wget -qO- https://download.opensuse.org/repositories/Emulators:/Wine:/Debian/xUbuntu_18.04/Release.key | sudo apt-key add -
	sudo sh -c 'echo "deb https://download.opensuse.org/repositories/Emulators:/Wine:/Debian/xUbuntu_18.04/ ./" > /etc/apt/sources.list.d/obs.list'
	sudo apt update
	sudo apt-get install --install-recommends wine64 wine32

dev:
	@yarn start

build:
	# @curl $(download-html)/$(index) -o src/$(index)
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
