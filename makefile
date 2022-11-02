build:
	@yarn make ## need install dpkg

arch:
	@cp PKGBUILD out/make/deb/x64/; cd out/make/deb/x64/; makepkg  # local based arch

install:
	@cd out/make/deb/x64; sudo pacman -U *.zst

update:
	@make arch; make install
