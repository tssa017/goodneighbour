class RequestsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @requests = Request.all
    render json: @requests
  end

  def create
    @request = current_user.requests.build(request_params)
    if @request.save
      render json: @request, status: :created
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  def propose
    @request = Request.find(params[:id])
    if @request.proposals.count < 5
      @request.proposals.create(user: current_user)
      head :no_content
    else
      render json: { error: 'Maximum proposals reached' }, status: :unprocessable_entity
    end
  end

  private

  def request_params
    params.require(:request).permit(:title, :description, :request_type, :latitude, :longitude)
  end
end
