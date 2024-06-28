class ChatsController < ApplicationController

  def index
    user_id = params[:user_id]
    chats_as_answerer = Chat.where(answerer_id: user_id).includes(:request, :requester)
    chats_as_requester = Chat.where(requester_id: user_id).includes(:request, :answerer)

    render json: {
      answerer: chats_as_answerer.as_json(include: { request: {}, requester: { only: [:first_name, :last_name, :id] } }),
      requester: chats_as_requester.as_json(include: { request: {}, answerer: { only: [:first_name, :last_name, :id] } })
    }
  end

  def chat
    user_id = params[:user_id]
    receiver_id = params[:receiver_id]
    request_id = params[:request_id]
    chats_user_to_receiver = Chat.where(requester_id: receiver_id, answerer_id: user_id,request_id:request_id ).includes(:request, :requester , :answerer).as_json(include: { request: {}, requester: { only: [:first_name, :last_name] }, answerer: { only: [:first_name, :last_name] }  })
    chats_receiver_to_user = Chat.where(requester_id: user_id, answerer_id: receiver_id, request_id:request_id).includes(:request, :requester, :answerer).as_json(include: { request: {}, requester: { only: [:first_name, :last_name] }, answerer: { only: [:first_name, :last_name] }  })

    render json: {
      chat: chats_user_to_receiver.presence || chats_receiver_to_user.presence
    }
  end

end
