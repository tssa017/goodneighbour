# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :authenticate_user!, only: [:profile]
  respond_to :json

  # POST /resource/sign_in
  def create
    user = User.find_by(email: params[:email])

    if user && user.valid_password?(params[:password])
      sign_in(user)
      render json: {
        status: 'success',
        data: user
      }, status: :ok
    else
      render json: {
        status: 'error',
        message: 'Invalid email or password'
      }, status: :unauthorized
    end
  end

  # GET /profile

  def profile
    if current_user
      render json: UserSerializer.new(current_user).serializable_hash
    else
      render json: {
        error: 'User not authenticated'
      }, status: :unauthorized
    end
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    render json: {
      status: 200,
      message: 'Logged out successfully.'
    }, status: :ok
  end

  # protected
  private

  def respond_with(resource, _opts = {})
      render json: {
        status: {code: 200, message: "Signed up successfully."},
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    end
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: 'Couldn\'t find an active session.'
      }, status: :unauthorized
  end
end

# class Users::SessionsController < Devise::SessionsController
#   respond_to :json
#   private
#   def respond_with(resource, _opts = {})
#       render json: resource
#   end
#   def respond_to_on_destroy
#       render json: {
# message: 'Logged out successfully.'
#       }
#   end
# end
