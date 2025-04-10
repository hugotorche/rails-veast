class MapPoint < ApplicationRecord
    belongs_to :user
    validates :country, presence: true
    validates :city, inclusion: { in: ->(record) { record.cities } }
    validates :city, presence: { if: ->(record) { record.cities.present? } }
    def countries
        CS.countries.with_indifferent_access
    end
    def cities
        states = CS.states(country)
        all_cities = states.keys.flat_map { |state| CS.cities(state, country) }
        all_cities || []
    end
    def country_label
        if country.length == 2
            countries[country]
        else
            country
        end
    end
end
