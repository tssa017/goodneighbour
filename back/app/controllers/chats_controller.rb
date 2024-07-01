class ChatsController < ApplicationController

  # Retrieves chats related to a specific user (`user_id`)
  def index
    user_id = params[:user_id]
    # Finds chats where the current user is the answerer
    chats_as_answerer = Chat.where(answerer_id: user_id).includes(:request, :requester)
    # Finds chats where the current user is the requester
    chats_as_requester = Chat.where(requester_id: user_id).includes(:request, :answerer)

    # Render as JSON object
    render json: {
      answerer: chats_as_answerer.as_json(include: { request: {}, requester: { only: [:first_name, :last_name, :id] } }),
      requester: chats_as_requester.as_json(include: { request: {}, answerer: { only: [:first_name, :last_name, :id] } })
    }
  end

  # Retrieves specific chat details between two users for a specific request
  def chat
    # Declare variables to store the result of following DB queries
    user_id = params[:user_id]
    receiver_id = params[:receiver_id]
    request_id = params[:request_id]

    # DB queries
    chats_user_to_receiver = Chat.where(requester_id: receiver_id, answerer_id: user_id,request_id:request_id ).includes(:request, :requester , :answerer).as_json(include: { request: {}, requester: { only: [:first_name, :last_name] }, answerer: { only: [:first_name, :last_name] }  })
    chats_receiver_to_user = Chat.where(requester_id: user_id, answerer_id: receiver_id, request_id:request_id).includes(:request, :requester, :answerer).as_json(include: { request: {}, requester: { only: [:first_name, :last_name] }, answerer: { only: [:first_name, :last_name] }  })

    render json: {
      chat: chats_user_to_receiver.presence || chats_receiver_to_user.presence
    }
  end

end
