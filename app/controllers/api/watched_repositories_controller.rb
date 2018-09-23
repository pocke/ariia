class Api::WatchedRepositoriesController < ApplicationController
  def index
    client = Octokit::Client.new(access_token: session[:access_token])
    repos = client.watched
    render json: repos.map(&:to_h)
  end
end
