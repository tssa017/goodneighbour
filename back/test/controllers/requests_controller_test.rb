require "test_helper"

class RequestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @request = requests(:one)
  end

  test "should get index" do
    get requests_url
    assert_response :success
    assert_not_nil assigns(:requests)
  end

  test "should create request" do
    sign_in @user
    assert_difference('Request.count') do
      post requests_url, params: { request: { title: 'Test Request', description: 'This is a test description', request_type: 'type', latitude: 0.0, longitude: 0.0 } }
    end
    assert_response :created
  end

  test "should not create request without authentication" do
    assert_no_difference('Request.count') do
      post requests_url, params: { request: { title: 'Test Request', description: 'This is a test description', request_type: 'type', latitude: 0.0, longitude: 0.0 } }
    end
    assert_response :unauthorized
  end

  test "should propose request" do
    sign_in @user
    assert_difference('@request.proposals.count') do
      post propose_request_url(@request)
    end
    assert_response :no_content
  end

  test "should not propose request if max proposals reached" do
    sign_in @user
    5.times { @request.proposals.create(user: users(:two)) }

    assert_no_difference('@request.proposals.count') do
      post propose_request_url(@request)
    end
    assert_response :unprocessable_entity
  end
end
