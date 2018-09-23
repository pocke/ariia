class Api::WatchedRepositoriesController < ApplicationController
  def index
    client = Octokit::Client.new(access_token: session[:access_token])
    repos = client.watched.map(&:to_h).map do |repo|
      {
        owner: repo[:owner].slice(:id, :login),
        **repo.slice(:id, :name, :full_name, :private)
      }
    end

    render json: repos
  end
end
