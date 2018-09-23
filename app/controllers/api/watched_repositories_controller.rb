class Api::WatchedRepositoriesController < ApplicationController
  def index
    client = OctokitFactory.new_client(access_token: session[:access_token])
    repos = client.watched.map(&:to_h).map do |repo|
      {
        owner: repo[:owner].slice(:id, :login),
        extend: {
          subscribed: true,
          action: nil,
        },
        **repo.slice(:id, :name, :full_name, :private)
      }
    end

    render json: repos
  end
end
