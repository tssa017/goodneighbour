Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  resources :requests, only: [:index, :create, :show, :update] do
    member do
      post 'propose'
    end
  end
  resources :messages, only: [:create, :index]
end

