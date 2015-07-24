# Online Kramdown Editor [![Build Status](https://img.shields.io/travis/unindented/online-kramdown-sinatra.svg)](http://travis-ci.org/unindented/online-kramdown-sinatra) [![Dependency Status](https://img.shields.io/gemnasium/unindented/online-kramdown-sinatra.svg)](https://gemnasium.com/unindented/online-kramdown-sinatra)

Quick and dirty implementation of an online [Kramdown](http://kramdown.gettalong.org/) editor.


## Installing

If you have `bundler` installed, just run:

```sh
bundle install
```


## Testing

To run the tests, run the default `rake` task:

```sh
rake
```


## Running locally

To run the app locally, just execute:

```sh
foreman start
```


## Deploying to Heroku

To deploy to Heroku, first create an app:

```sh
heroku create --stack cedar <app name>
```

Then push the code:

```sh
git push heroku master
```

And the app will be ready to go!


## Meta

* Code: `git clone git://github.com/unindented/online-kramdown-sinatra.git`
* Home: <https://github.com/unindented/online-kramdown-sinatra/>

## Contributors

Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))

## License

Copyright (c) 2014 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
