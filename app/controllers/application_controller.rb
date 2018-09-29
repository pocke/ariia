class ApplicationController < ActionController::Base

  private

  def format_repository(repo, subscribed:)
    repo.to_hash.yield_self do |r|
      {
        owner: r[:owner].slice(:id, :login, :avatar_url),
        extend: {
          subscribed: subscribed,
          action: nil,
        },
        **r.slice(:id, :name, :full_name, :private, :fork, :html_url)
      }
    end
  end
end
