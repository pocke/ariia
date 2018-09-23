Rails.application.routes.draw do
  root 'root#index'

  namespace 'api' do
    resources :watched_repositories, only: %i[index]
    resource :access_token, only: %i[create show]
  end
end
