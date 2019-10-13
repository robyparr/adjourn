Rails.application.routes.draw do
  root to: 'meetings#index'

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  get '/profile', to: 'profile#show'
  get '/search', to: 'meetings#search', as: 'search'

  resources :uploads, only: %i(index destroy) do
    member do
      get '/download', to: 'uploads#download'
    end
  end

  resources :google_accounts, only: %w(index new destroy) do
    collection do
      get '/callback', to: 'google_accounts#create'
    end
  end

  resources :google_calendars, only: %w(index create) do
    collection do
      delete '/', action: :destroy
    end
  end

  resources :calendar_events, only: %w(index create)

  scope '/attendees' do
    get 'autocomplete',
      to: 'attendees#autocomplete',
      as: 'attendee_autocomplete'
  end

  resources :meetings, except: %w(edit) do
    resources :action_items, shallow: true, only: [:create, :update, :destroy]

    member do
      scope '/attendees' do
        post '/attend', to: 'attendees#attend'
        delete '/unattend', to: 'attendees#remove'
      end
      post '/email_attendees', to: 'meetings#email_attendees'
    end

    resources :agenda, shallow: true, only: [:create, :update, :destroy] do
      member do
        scope '/uploads' do
          post '/', to: 'uploads#upload', as: :upload
          post '/presign', to: 'uploads#presigned_url'
        end
      end

      collection do
        patch '/update_sort', to: 'agenda#update_sort', as: :update_sort
      end

      resources :agendum_notes,
        shallow: true,
        path: 'notes',
        only: [:create, :update, :destroy]
    end
  end

  get '/components', to: 'application#components' if Rails.env.development?
end
