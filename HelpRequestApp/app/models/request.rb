class Request < ApplicationRecord
  belongs_to :user
  has_many :messages

  attribute :proposals_count, :integer, default: 0
  attribute :hidden, :boolean, default: false
end
