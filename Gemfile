source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

group :development do
  gem 'capistrano'
  gem 'capistrano3-nginx', '~> 3.0', '>= 3.0.4'
  gem 'capistrano-nvm', require: false
  gem 'capistrano-yarn'
  gem 'net-ssh'
  gem 'ed25519'
  gem 'bcrypt_pbkdf'
end
