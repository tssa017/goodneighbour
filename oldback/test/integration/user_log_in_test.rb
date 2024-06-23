require 'test_helper'

class UserLogInTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one) 
    @user.update(password: 'password', password_confirmation: 'password') 
  end

  test "user can log in with valid credentials" do
    get new_user_session_path
    assert_response :success

    post user_session_path, params: { user: { email: @user.email, password: 'password' } }
    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_select "div", "Logged in successfully."
  end

  test "user cannot log in with invalid credentials" do
    get new_user_session_path
    assert_response :success

    post user_session_path, params: { user: { email: @user.email, password: 'invalid' } }
    assert_response :unprocessable_entity
  end
end
