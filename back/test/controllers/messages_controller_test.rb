require 'test_helper'

class MessagesControllerTest < ActionDispatch::IntegrationTest
  include FactoryBot::Syntax::Methods

  # setup do
  #   @user = create(:user)
  #   @chat = create(:chat)
  #   @messages = create_list(:message, 3, chat: @chat)
  # end

  # test "should get index" do
  #   get messages_url(chat_id: @chat.id), as: :json
  #   assert_response :success

  #   response_data = JSON.parse(response.body)
  #   assert_equal @messages.count, response_data['messages'].length
  # end

  # test "should create message" do
  #   message_params = { message: { user_id: @user.id, chat_id: @chat.id, content: "Hello, World!" } }

  #   post messages_url, params: message_params, as: :json
  #   assert_response :created

  #   assert_difference('Message.count', 1) do
  #     post messages_url, params: message_params, as: :json
  #   end

  #   assert_equal "Hello, World!", Message.last.content
  #   # Add more assertions based on your expected JSON structure and data
  # end

  # test "should not create message with invalid params" do
  #   invalid_params = { message: { user_id: @user.id, chat_id: @chat.id, content: nil } }

  #   post messages_url, params: invalid_params, as: :json
  #   assert_response :unprocessable_entity

  #   assert_no_difference('Message.count') do
  #     post messages_url, params: invalid_params, as: :json
  #   end

  #   assert_includes response.body, "Content can't be blank"
  # end
end
