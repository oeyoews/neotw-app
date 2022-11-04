# Maintainer: oeyoews <jyao4783@gmail.com>
pkgname=neotw-app
pkgver=VERSION
pkgrel=1
pkgdesc="neotw-app"
arch=('x86_64')
url=""
# license=('custom:neovim')
# conflicts=("neovim" "nvim")
filename="neotw-app_${pkgver}_amd64.deb"
source=("$filename")
md5sums=('SKIP')

package() {
	bsdtar -xf data.tar.*z -C "$pkgdir/"
}
