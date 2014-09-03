module Builder
  class << self

    def parse_test(config = 'config.ru')
      parse(config, 'test')
    end

    def parse_development(config = 'config.ru')
      parse(config, 'development')
    end

    def parse_production(config = 'config.ru')
      parse(config, 'production')
    end

    def parse(config, environment)
      # Set the `RACK_ENV` variable.
      ENV['RACK_ENV'] = environment
      # Parse config file.
      require 'rack'
      Rack::Builder.parse_file(config)
    end

  end
end
