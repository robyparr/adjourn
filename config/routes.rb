Rails.application.routes.draw do
  root to: 'meetings#index'

  devise_for :users
  
  resources :meetings do
    resources :action_items, shallow: true, only: [:create, :update, :destroy]

    resources :agenda, only: [:create, :update, :destroy] do
      resources :agendum_notes, 
                path: 'notes', 
                only: [:create, :update, :destroy]
    end
  end
  
end
