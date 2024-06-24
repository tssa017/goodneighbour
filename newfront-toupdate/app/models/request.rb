class Request < ApplicationRecord
  belongs_to :user


  attribute :proposals_count, :integer, default: 0
  attribute :hidden, :boolean, default: false
  attribute :status, :string, default: "new"

  validates :user_id, presence: true
  validates :title, presence: true
  validates :description, presence: true
  validates :request_type, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
end
