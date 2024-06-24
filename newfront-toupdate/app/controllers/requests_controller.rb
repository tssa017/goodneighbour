class RequestsController < ApplicationController
  # before_action :authenticate_user!, except: [:index, :show]

  def index
    @requests = Request.all
    render json: @requests
  end

  def show
    @request = Request.find(params[:id])
  end

  # def show_user
  #   @request = Request.find(params[:user_id])
  # end

  def create
    @request = Request.new(request_params)

    if @request.save
      render json: @request, status: :created
    else
      Rails.logger.error("Request creation failed: #{@request.errors.full_messages}")
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  private

  def request_params
    params.require(:request).permit(
      :user_id,
      :title,
      :description,
      :request_type,
      :latitude,
      :longitude)
  end
end
