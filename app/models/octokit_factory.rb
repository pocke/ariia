module OctokitFactory
  def self.new_client(access_token:)
    cache_path = Rails.root.join('tmp/cache/octokit/', OpenSSL::Digest::SHA256.hexdigest(access_token))
    cache_store = ActiveSupport::Cache::FileStore.new(cache_path)
    stack = Faraday::RackBuilder.new do |builder|
      builder.use :http_cache, store: cache_store, serializer: Marshal, logger: Rails.logger, shared_cache: false
      builder.use Octokit::Middleware::FollowRedirects
      builder.use Octokit::Response::RaiseError
      builder.use Octokit::Response::FeedParser
      builder.response(:logger, Rails.logger) do |logger|
        logger.filter(/token .{40}/, 'token [FILTERED]')
      end
      builder.adapter Faraday.default_adapter
    end

    Octokit::Client.new(access_token: access_token).tap do |client|
      client.middleware = stack
      client.auto_paginate = true
      client.per_page = 100
    end
  end
end
