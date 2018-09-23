class Api::AccessTokensController < ApplicationController
  def show
    token = session[:access_token]
    render json: {access_token: token}
  end

  def create
    token = params.require(:access_token)
    session[:access_token] = token
    head :ok
  end
end
