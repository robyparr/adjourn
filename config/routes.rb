Rails.application.routes.draw do
  root to: 'meetings#index'

  devise_for :users
  
  scope '/attendees' do
    get 'autocomplete', 
      to: 'attendees#autocomplete', 
      as: 'attendee_autocomplete'
  end

  resources :meetings do
    post '/attendees/attend', to: 'attendees#attend'
    delete '/attendees', to: 'attendees#remove'
    
    resources :action_items, shallow: true, only: [:create, :update, :destroy]

    resources :agenda, only: [:create, :update, :destroy] do
      resources :agendum_notes, 
                path: 'notes', 
                only: [:create, :update, :destroy]
    end
  end
  
end
