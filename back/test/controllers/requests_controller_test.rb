require 'test_helper'

class RequestsControllerTest < ActionDispatch::IntegrationTest
  include FactoryBot::Syntax::Methods

  setup do
    @request = create(:request)
  end

  test "should get index" do
    get requests_url, as: :json
    assert_response :success

    response_data = JSON.parse(response.body)
    assert_equal Request.count, response_data.length
  end

  test "should show request" do
    get request_url(@request), as: :json
    assert_response :success

    response_data = JSON.parse(response.body)
    assert_equal @request.id, response_data['id']
  end

  test "should get user requests" do
    get user_request_url(@request.user_id), as: :json
    assert_response :success

    response_data = JSON.parse(response.body)
    assert_equal 1, response_data.length
  end

  test "should create request" do
    request_params = attributes_for(:request)

    post requests_url, params: { request: request_params }, as: :json
    assert_response :created

    assert_difference('Request.count', 1) do
      post requests_url, params: { request: request_params }, as: :json
    end

    assert_equal request_params[:title], Request.last.title
  end

  test "should answer request" do
    answerer = create(:user)
    requester = @request.user

    post answer_request_url(@request), params: { request_id: @request.id, answerer_id: answerer.id, requester_id: requester.id }, as: :json
    assert_response :created

    assert_equal "answered", Request.last.status
    assert_equal false, Request.last.hidden
  end

  test "should not answer request with invalid parameters" do
    invalid_params = { request_id: @request.id, answerer_id: @request.user_id, requester_id: @request.user_id }

    post answer_request_url(@request), params: invalid_params, as: :json
    assert_response :unprocessable_entity

    assert_includes response.body, "User cannot answer their own request"
    # Add more assertions based on your expected error responses
  end

  test "should close request" do
    patch close_request_url(@request), params: { id: @request.id }, as: :json
    assert_response :created

    assert_equal "closed", Request.last.status
    assert_equal true, Request.last.hidden
  end

  test "should reopen request" do
    patch reopen_request_url(@request), params: { id: @request.id }, as: :json
    assert_response :created

    assert_equal "reopened", Request.last.status
    assert_equal false, Request.last.hidden
    assert_equal 0, Request.last.proposals_count
  end
end

