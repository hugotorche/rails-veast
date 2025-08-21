# lib/cs_patch.rb

require 'city-state'

CITY_STATE_DB_PATH = File.expand_path(
  File.join(__dir__, '..', 'app', 'data', 'city_state_db')
)

module CityState
  class Database
    private

    def load(name)
      puts ">>> CityState patch in effect, loading: #{name}"
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
