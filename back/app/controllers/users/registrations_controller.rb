class Users::RegistrationsController < Devise::RegistrationsController
  # Respond with JSON format by default (because this is an API)
  respond_to :json
  
  # Ensures that configure_sign_up_params method is called before the create action is executed, but only if the controller is handling a Devise action
  # This allows additional params to be added on sign up: first, last name + ID photo
  before_action :configure_sign_up_params, only: [:create], if: :devise_controller?

  def create
    build_resource(sign_up_params)
    resource.save
    sign_in(resource_name, resource)
    render json: resource
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :id_photo])
  end

  # Define all oparams necessary for sign up
  private
  def sign_up_params
    params.require(:user).permit(:first_name, :last_name, :id_photo, :email, :password, :password_confirmation)
  end

end

