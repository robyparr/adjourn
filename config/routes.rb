Rails.application.routes.draw do
  root to: 'meetings#index'
  
  resources :meetings
end
