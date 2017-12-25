Rails.application.routes.draw do
  root to: 'meetings#index'

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  get '/profile', to: 'profile#show'
  
  scope '/attendees' do
    get 'autocomplete', 
      to: 'attendees#autocomplete', 
      as: 'attendee_autocomplete'
  end

  get '/search', to: 'meetings#search', as: 'search'
  resources :meetings do
    post '/email_attendees', to: 'meetings#email_attendees'

    post '/attendees/attend', to: 'attendees#attend'
    delete '/attendees', to: 'attendees#remove'
    
    resources :action_items, shallow: true, only: [:create, :update, :destroy]

    resources :agenda, only: [:create, :update, :destroy] do
      post '/uploads', to: 'uploads#upload'

      # Allow filename.ext in the URL:
      # https://github.com/rails/rails/issues/28901#issuecomment-297747521
      post '/uploads/presign', to: 'uploads#presigned_url'
      get '/uploads/:id/download', to: 'uploads#download'

      resources :agendum_notes, 
                path: 'notes', 
                only: [:create, :update, :destroy]
    end
  end
  
end
