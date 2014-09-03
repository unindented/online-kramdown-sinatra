module OnlineKramdown
  class App < Sinatra::Base

    # Configure reloading.
    configure do
      register Sinatra::Reloader if development?
    end

    # Configure logging.
    configure do
      STDOUT.sync = true
      enable :logging unless test?
    end

    # Enable static serving.
    configure do
      set :public_folder, 'public'
      enable :static
    end

    get '/' do
      erb :index
    end

    post '/transform' do
      source  = params[:source]  || ''
      options = params[:options] || {}
      options = process_options(options)
      logger.info options
      Kramdown::Document.new(source, options).to_html
    end

    private

    def process_options(opts)
      Hash[opts.map {|k, v| [k.to_sym, v === 'true' ? true : v === 'false' ? false : v]}]
    end

  end
end
