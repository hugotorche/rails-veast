# config/initializers/city_state_patch.rb

require 'city-state'

CITY_STATE_DB_PATH = Rails.root.join('app', 'data', 'city_state_db').to_s

module CityState
    class Database
      private
  
      def load(name)
        Rails.logger.info ">>> CityState patch in effect, loading: #{name}"
        dbfile = File.join(CITY_STATE_DB_PATH, name)
        case File.extname(name)
        when '.yaml'
          YAML.safe_load(File.read(dbfile))
        else
          File.read(dbfile)
        end
      end
    end
  end  
