class Api::WatchedRepositoriesController < ApplicationController
  def index
    client = OctokitFactory.new_client(access_token: session[:access_token])
    repos = client.watched.map(&:to_h).map do |repo|
      {
        owner: repo[:owner].slice(:id, :login, :avatar_url),
        extend: {
          subscribed: true,
          action: nil,
        },
        **repo.slice(:id, :name, :full_name, :private, :html_url)
      }
    end

    render json: repos
  end

  def create
    repo_id = params.require(:id).to_i
    client = OctokitFactory.new_client(access_token: session[:access_token])
    client.update_subscription(repo_id, subscribed: true)
    head :created
  end

  def destroy
    repo_id = params.require(:id).to_i
    client = OctokitFactory.new_client(access_token: session[:access_token])
    client.delete_subscription(repo_id)
    head :ok
  end
end
