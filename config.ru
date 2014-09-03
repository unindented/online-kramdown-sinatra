require 'rubygems'
require 'bundler'

Bundler.require(:default, ENV['RACK_ENV'].to_sym)

require File.expand_path('../app/app', __FILE__)
run OnlineKramdown::App
