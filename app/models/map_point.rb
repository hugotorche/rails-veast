class MapPoint < ApplicationRecord
    belongs_to :user
    validates :country, presence: true
    validates :city, inclusion: { in: ->(record) { record.cities } }
    validates :city, presence: { if: ->(record) { record.cities.present? } }
    def countries
        CS.countries.with_indifferent_access
    end
    def test_text
        CS.cities('82', 'DK')[0]
    end
    def cities
        states = CS.states(country)
        all_cities = states.keys.flat_map { |state| CS.cities(state, country) }
        (all_cities || []).sort
    end
    def country_label
        if country.length == 2
            countries[country]
        else
            country
        end
    end
    def latitude
        result = Geocoder.search(city).first
        if result && result.coordinates
            result.coordinates[0]
        else
            ''
        end
    end
    def longitude
        result = Geocoder.search(city).first
        if result && result.coordinates
            result.coordinates[1]
        else
            ''
        end
    end
end
