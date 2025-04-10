class MapPoint < ApplicationRecord
    belongs_to :user
    validates :country, presence: true
    validates :city, presence: true
    def countries
        CS.countries.with_indifferent_access
    end
    def cities
        CS.cities(country) || []
    end
    def country_label
        countries[country]
    end
end
