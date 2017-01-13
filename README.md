# LifeTrak

Allows you to track what you watch on various sites using Trakt.tv

LifeTrak is a tool that utilises the Trakt.tv API to track your watched videos around the internet.
This is the full server used for the site [LifeTrak][lt].

The user script for using this can be downloaded from [here][script].

## Hosting your own auth server?

- Clone the repository to your server using `git clone https://github.com/PXgamer/LifeTrak.git`
- Run `composer install` in the root directory
- Change the config variables in `application/config/config.php`

This is built on the [CodeIgniter framework][ci].

[lt]: https://lifetrak.pxgamer.xyz
[script]: https://github.com/PXgamer/LifeTrak/raw/master/dist/LifeTrak.user.js
[ci]: https://codeigniter.com
