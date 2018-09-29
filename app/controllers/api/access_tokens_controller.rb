class Api::AccessTokensController < ApplicationController
  def show
    token = session[:access_token]
    render json: {access_token: token}
  end

  def create
    token = params.require(:access_token)
    client = OctokitFactory.new_client(access_token: token)
    client.user # Validate token
    session[:access_token] = token
    head :ok
  end

  def destroy
    session[:access_token] = nil
    head :ok
  end
end
