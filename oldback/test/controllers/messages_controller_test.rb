require "test_helper"

class MessagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one) 
    @request = requests(:one) 
    @message = messages(:one) 
  end

  test "should get index" do
    sign_in @user
    get request_messages_url(@request)
    assert_response :success
    assert_not_nil assigns(:messages)
  end

  test "should create message" do
    sign_in @user
    assert_difference('Message.count') do
      post request_messages_url(@request), params: { message: { content: 'This is a test message' } }
    end
    assert_response :created
  end

  test "should not create message without content" do
    sign_in @user
    assert_no_difference('Message.count') do
      post request_messages_url(@request), params: { message: { content: '' } }
    end
    assert_response :unprocessable_entity
  end
end

