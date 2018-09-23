class Api::WatchedRepositoriesController < ApplicationController
  def index
    client = Octokit.new(access_token: session[:access_token])
    repos = client.watched
    render json: repos
  end
end
