source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '~> 2.7.1'

gem 'rails',              '~> 6.0', '>= 6.0.2.2'
gem 'puma',               '~> 3.7'
gem 'sass-rails',         '~> 5.0'
gem 'uglifier',           '>= 1.3.0'
gem 'webpacker',          '~> 4.0'
gem 'jbuilder',           '~> 2.5'
gem 'rubocop'
gem 'jquery-rails'
gem 'devise'
gem 'pg',                     '~> 0.21.0'
gem 'redcarpet',              '~> 3.3', '>= 3.3.4'
gem 'premailer-rails'
gem 'kaminari',               '~> 1.1', '>= 1.1.1'
gem 'pg_search',              '~> 2.1', '>= 2.1.1'
gem 'aws-sdk-s3',             '~> 1.8'
gem 'signet',                 '~> 0.8.1'
gem 'httparty',               '~> 0.16.2'
gem 'active_link_to',         '~> 1.0', '>= 1.0.5'
gem 'bootsnap',               '~> 1.3'
gem 'omniauth-google-oauth2', '~> 0.8.0'

group :production do
  gem 'scout_apm'
end

group :development, :test do
  gem 'dotenv-rails'
  gem 'byebug',             platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara',                   '~> 3.29'
  gem 'selenium-webdriver'
  gem 'webdrivers',                 '~> 4.1', '>= 4.1.3'
  gem 'test-prof',                  '~> 0.10.2'
  gem 'webmock',                    '~> 3.8', '>= 3.8.2'
  gem 'simplecov',                  '~> 0.18.5'
  gem 'rails-controller-testing'
  gem 'factory_bot_rails',          '~> 5.1', '>= 5.1.1'
  gem 'pry',                        '~> 0.12.2'
  gem 'pry-nav',                    '~> 0.3.0'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console',            '>= 3.3.0'
  gem 'listen',                 '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen',  '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
