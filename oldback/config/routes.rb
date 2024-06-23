Rails.application.routes.draw do
  # Devise routes with custom sessions controller
  devise_for :users, controllers: {
    sessions: 'users/sessions', # Use your custom sessions controller
    registrations: 'users/registrations' # If you have a custom registrations controller
  }
  
  # Requests routes
  resources :requests, only: [:index, :create, :show, :update] do
    member do
      post 'propose'
    end
  end
  
  # Messages routes
  resources :messages, only: [:create, :index]
  
  # Profile route
  devise_scope :user do
    get 'profile', to: 'users/sessions#profile', as: 'profile'
  end
end
