class Api::AccessTokensController < ApplicationController
  def create
    token = params.require(:access_token)
    session[:access_token] = token
    head :ok
  end
end
