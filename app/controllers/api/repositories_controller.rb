class Api::RepositoriesController < ApplicationController
  def index
    client = OctokitFactory.new_client(access_token: session[:access_token])
    user_or_org_name = params.require(:user_or_org_name)
    user = client.user(user_or_org_name)

    repositories = 
      case user.type
      when 'User'
        client.repositories(user_or_org_name)
      when 'Organization'
        client.organization_repositories(user_or_org_name)
      else
        raise "#{user.type} is unknown type. user: #{user}"
      end

    repositories = repositories.map { |repo| format_repository(repo, subscribed: false) }
    render json: repositories
  end
end
