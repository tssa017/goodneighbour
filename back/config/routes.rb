Rails.application.routes.draw do
  devise_for :users,
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
  resources :requests do
    post 'answer_request', on: :collection
    get 'show_user', on: :collection
    put 'close', on: :collection
    put 'reopen', on: :collection
  end
  resources :requests, only: [:index, :create, :show, :update]

  resources :chats, only: [:index]
  get "chats/chat"

  resources :messages, only: [:index, :create]

end
