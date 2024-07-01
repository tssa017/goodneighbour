# Inherits from Devise gem which I use for auth
class Users::SessionsController < Devise::SessionsController 
  # Configured to respond with JSON format by default (because it is an API!)
  respond_to :json
  private
  # Rendering the JSON representation of the user object from auth
  def respond_with(resource, _opts = {})
    render json: resource
  end
  def respond_to_on_destroy
    # Render JSON message when user logs out
    render json: { message: "Logged out." }
  end
end
