class Request < ApplicationRecord
  belongs_to :user


  attribute :proposals_count, :integer, default: 0
  attribute :hidden, :boolean, default: false
  attribute :status, :string, default: "new"

  validates :user_id, presence: { message: "User ID is required" }
  validates :title, presence: { message: "Title is required" }
  validates :description, presence: { message: "Description is required" }
  validates :request_type, presence: { message: "Request type is required" }
  validates :latitude, presence: { message: "Latitude is required" }
  validates :longitude, presence: { message: "Longitude is required" }
end
