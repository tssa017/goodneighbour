class RequestsController < ApplicationController
  # before_action :authenticate_user!, except: [:index, :show]

  def index
    @requests = Request.all
    render json: @requests
  end

  def show
    @request = Request.find(params[:id])
    render json: @request
  end

  def show_user
    @request = Request.where(user_id: params[:user_id])
    render json: @request
  end

  def create
    @request = Request.new(request_params)
    # Useful to avoid overlapping task and it is also privacy preserving
    @request.latitude += 2e-3 * Random.rand(-1.0...1.0)
    @request.longitude += 2e-3 * Random.rand(-1.0...1.0)

    if @request.save
      render json: @request, status: :created
    else
      Rails.logger.error("Request creation failed: #{@request.errors.full_messages}")
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  def answer_request
    request_id = params[:request_id]
    answerer_id = params[:answerer_id]
    requester_id = params[:requester_id]

    begin
      # Find request and perform basic check
      @request = Request.find(request_id)

      if @request.user_id != requester_id
        render json: { error: 'Requester ID does not match request user ID' }, status: :unprocessable_entity
        return
      end

      if @request.user_id == answerer_id
        render json: { error: 'User cannot answer their own request' }, status: :unprocessable_entity
        return
      end

      if @request.proposals_count >= 5
        render json: { error: 'Request has already been answered 5 times' }, status: :unprocessable_entity
        return
      end

      # Create new Chat between requester and answerer
      @chat = Chat.new(request_id: request_id, answerer_id: answerer_id, requester_id: requester_id)

      Rails.logger.error("Request proposal count: #{@request.proposals_count}")

      if @chat.save
        # Update proposals count
        @request.increment!(:proposals_count, 1)
        @request.status = "answered"
        @request.hidden = @request.proposals_count >= 5

        if @request.save
          Rails.logger.info("Request updated successfully: proposals_count = #{@request.proposals_count}, status = #{@request.status}, hidden = #{@request.hidden}")
          render json: @chat, status: :created
        else
          Rails.logger.error("Failed to answer request: #{@request.errors.full_messages.join(', ')}")
          render json: { error: 'Failed to answer request', details: @request.errors.full_messages }, status: :unprocessable_entity
        end
      else
        Rails.logger.error("Failed to create chat: #{@chat.errors.full_messages.join(', ')}")
        render json: { error: 'Failed to create chat', details: @chat.errors.full_messages }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error("Request not found: #{e.message}")
      render json: { error: 'Request not found', details: e.message }, status: :not_found
    rescue => e
      Rails.logger.error("An unexpected error occurred: #{e.message}")
      render json: { error: 'An unexpected error occurred', details: e.message }, status: :unprocessable_entity
    end
  end

  def close
    begin
      @request = Request.find(params[:id])
      @request.status = "closed"
      if @request.save
        Rails.logger.info("Request closed successfully, status = #{@request.status}, hidden = #{@request.hidden}")
        render json: @request, status: :created
      else
        Rails.logger.error("Failed to close the request: #{@request.errors.full_messages.join(', ')}")
        render json: { error: 'Failed to close the request', details: @request.errors.full_messages }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error("Request not found: #{e.message}")
      render json: { error: 'Request not found', details: e.message }, status: :not_found
    rescue => e
      Rails.logger.error("An unexpected error occurred: #{e.message}")
      render json: { error: 'An unexpected error occurred', details: e.message }, status: :unprocessable_entity
    end
  end

  def reopen
    begin
      @request = Request.find(params[:id])
      @request.status = "reopened"
      @request.proposals_count = 0
      @request.hidden = false
      if @request.save
        Rails.logger.info("Request re-opened successfully, status = #{@request.status}, hidden = #{@request.hidden}")
        render json: @request, status: :created
      else
        Rails.logger.error("Failed to re-open the request: #{@request.errors.full_messages.join(', ')}")
        render json: { error: 'Failed to re-open the request', details: @request.errors.full_messages }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error("Request not found: #{e.message}")
      render json: { error: 'Request not found', details: e.message }, status: :not_found
    rescue => e
      Rails.logger.error("An unexpected error occurred: #{e.message}")
      render json: { error: 'An unexpected error occurred', details: e.message }, status: :unprocessable_entity
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
