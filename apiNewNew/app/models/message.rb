class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :user

  validates :user_id, presence: { message: "User ID is required" }
  validates :chat_id, presence: { message: "Chat ID is required" }
  validates :content, presence: { message: "Content is required" }, length: { minimum: 2, message: "Content must be at least 2 characters long" }

  validate :log_validation_errors

  private

  def log_validation_errors
    if errors.any?
      Rails.logger.error "Validation failed for Message: #{errors.full_messages.join(', ')}"
    end
  end
end
