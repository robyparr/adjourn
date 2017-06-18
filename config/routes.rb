Rails.application.routes.draw do
  root to: 'meetings#index'
  
  resources :meetings do
    resources :agenda
  end
  
end
