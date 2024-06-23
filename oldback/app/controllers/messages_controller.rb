class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_request, only: [:create]

  # GET /requests/:request_id/messages
  def index
    @messages = @request.messages
    render json: @messages
  end

  # POST /requests/:request_id/messages
  def create
    @message = @request.messages.build(message_params)
    @message.user = current_user

    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_content
    end
  end

  private

  def set_request
    @request = Request.find(params[:request_id])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
