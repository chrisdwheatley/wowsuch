# Wow Such

A Dogecoin price calculator, written in [dogescript][1] - [wowsuch.io][2].

### Development

Clone the project:

`$ git clone git@github.com:swirlycheetah/wowsuch.git`

Install the required development modules:

`$ npm install`

The main application logic can be found in `src/such.djs` / `src/such.js`.

If you're feeling brave and want to write some dogescript run `grunt watch` and edit `src/such.djs`, which will compile to javascript on save. Otherwise feel free to edit `src/such.js` and I'll pick up the dogescript side of things on pull request.

Run `grunt build` to test the project builds without fail, the built project will be in the `build` folder.

### Caveats

The project is currently in it's very early stages and is therefore likely to change significantly as features are added and issues raised.

Use [this tool][3] for writing/editing dogescript.

### Changelog

#### v0.4.2
##### 11/01/2014

* Added navigation to homepage
* Various style amendments

#### v0.4.1
##### 10/01/2014

* Navigation tweaks
* Sitemap amendments
* Roadmap tweaks

#### v0.4.0
##### 10/01/2014

* Embeddable widgets
* Embeddable widgets example page

#### v0.3.0
##### 31/12/2013

* Display USD conversion price

#### v0.2.0
##### 30/12/2013

* Allow Bitcoin to Dogecoin value calculations
* SEO amendments and implemented sitemap

#### v0.1.0
##### 26/12/2013

* Initial release

### Roadmap

* More reliable data
* Pull data from more than one source
* Tests
* Other currencies comparison

### License

Released under the MIT license: [opensource.org/licenses/MIT][4]

  [1]: https://github.com/remixz/dogescript
  [2]: http://wowsuch.io
  [3]: http://zachbruggeman.me/dogescript/
  [4]: http://opensource.org/licenses/MIT