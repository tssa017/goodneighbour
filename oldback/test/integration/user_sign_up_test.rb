require 'test_helper'

class UserSignUpTest < ActionDispatch::IntegrationTest
  test "user can sign up with valid details" do
    get new_user_registration_path
    assert_response :success

    assert_difference 'User.count', 1 do
      post user_registration_path, params: { user: { email: 'test@example.com', password: 'password', password_confirmation: 'password' } }
    end

    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_select "div", "Welcome! You have signed up successfully."
  end

  test "user cannot sign up with invalid details" do
    get new_user_registration_path
    assert_response :success

    assert_no_difference 'User.count' do
      post user_registration_path, params: { user: { email: 'invalid', password: 'password', password_confirmation: 'mismatch' } }
    end

    assert_response :unprocessable_entity
  end
end
