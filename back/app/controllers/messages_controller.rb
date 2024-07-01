class MessagesController < ApplicationController

  # Fetch all messages with associated chat ID
  def index
    chat_id = params[:chat_id]

    # Query Message model to retrieve all messages where `chat_id` matches the provided `chat_id`
    chat_messages = Message.where(chat_id: chat_id)

    render json: {
      messages: chat_messages,
    }
  end

  def create
    # Init new message object
    @messsage = Message.new(messsage_params)

    # Save message
    if @messsage.save
      render json: @messsage, status: :created
    else
      Rails.logger.error("Messsage creation failed: #{@messsage.errors.full_messages}")
      render json: @messsage.errors, status: :unprocessable_entity
    end
  end

  def messsage_params
    # Specify which parameters are allowed when creating a message - great for privacy!
    params.require(:message).permit(
      :user_id,
      :chat_id,
      :content)
  end
end
