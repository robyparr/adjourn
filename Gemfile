source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '~> 2.4.1'

gem 'rails',            '~> 5.1.1'
gem 'puma',             '~> 3.7'
gem 'sass-rails',       '~> 5.0'
gem 'uglifier',         '>= 1.3.0'
gem 'webpacker'
gem 'turbolinks',       '~> 5'
gem 'jbuilder',         '~> 2.5'
gem 'rubocop'
gem 'materialize-sass', '~> 0.98.2'
gem 'jquery-rails'
gem 'devise'
gem 'pg'

group :development, :test do
  gem 'byebug',             platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara',           '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console',            '>= 3.3.0'
  gem 'listen',                 '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen',  '~> 2.0.0'
end

group :test do
  gem 'minitest-reporters'
  gem 'rails-controller-testing'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
