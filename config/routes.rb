Rails.application.routes.draw do
  root to: 'meetings#index'
  
  # /meetings/[:id]
  resources :meetings do
    # /meetings/:meeting_id/agenda/[:id]
    resources :agenda, only: [:create, :update, :destroy] do
      # /meetings/:meeting_id/agenda/:agenda_id/notes/[:id]
      resources :agendum_notes, 
                path: 'notes', 
                only: [:create, :update, :destroy]
    end
  end
  
end
