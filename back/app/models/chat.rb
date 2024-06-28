class Chat < ApplicationRecord
  belongs_to :request
  belongs_to :answerer, class_name: 'User'
  belongs_to :requester, class_name: 'User'

  validates :request_id, presence: { message: "Request ID is required" }
  validates :answerer_id, presence: { message: "Answerer ID is required" }
  validates :requester_id, presence: { message: "Requester ID is required" }
  validates :request_id, uniqueness: { scope: [:requester_id, :answerer_id], message: "Chat already exists for this requester and answerer" }

  validate :log_validation_errors

  private

  def log_validation_errors
    if errors.any?
      Rails.logger.error "Validation failed for Chat: #{errors.full_messages.join(', ')}"
    end
  end
end
