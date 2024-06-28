class MessagesController < ApplicationController

  def index
    chat_id = params[:chat_id]
    chat_messages = Message.where(chat_id: chat_id)

    render json: {
      messages: chat_messages,
    }
  end

  def create
    @messsage = Message.new(messsage_params)

    if @messsage.save
      render json: @messsage, status: :created
    else
      Rails.logger.error("Messsage creation failed: #{@messsage.errors.full_messages}")
      render json: @messsage.errors, status: :unprocessable_entity
    end
  end

  def messsage_params
    params.require(:message).permit(
      :user_id,
      :chat_id,
      :content)
  end
end
