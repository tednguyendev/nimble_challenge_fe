set :stage, :staging
set :branch, 'main'
set :deploy_user, 'ubuntu'
set(:deploy_to, '/home/ubuntu/www/nimble-challenge/react')

server '13.213.61.234', user: 'ubuntu', roles: %w{app db web}

set :react_app_env, 'staging'

set :nginx_roles, :all
set :nginx_application_name, "#{fetch(:application)}_#{fetch(:stage)}"
set :nginx_domains, '13.213.61.234'
set :nginx_template, "#{stage_config_path}/templates/nginx.conf.erb"
set :nginx_use_ssl, false
