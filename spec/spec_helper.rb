# Parse the `config.ru` file to load dependencies.
require File.expand_path('../../config/builder', __FILE__)
Builder::parse_test File.expand_path('../../config.ru', __FILE__)
