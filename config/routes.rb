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

  scope '/contacts' do
    get :autocomplete, to: 'contacts#autocomplete', as: 'contacts_autocomplete'
  end

  resources :meetings, except: %w(new edit) do
    resources :action_items, shallow: true, only: %i[create update destroy] do
      member do
        post :assign
        post :unassign
      end
    end

    scope module: :meeting do
      resources :attendees, only: %i[create] do
        collection do
          delete :destroy
          post :email
        end
      end
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
end
