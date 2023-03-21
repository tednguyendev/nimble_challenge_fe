# config valid for current version and patch releases of Capistrano
lock '~> 3.14.1'

set :application, 'imble-challenge-fe'
set :repo_url, 'git@github.com:tednguyendev/nimble_challenge_fe.git'

append :linked_files, '.env'
append :linked_dirs, 'node_modules'

set :nvm_type, :user
set :nvm_node, 'v10.18.0'
set :nvm_map_bins, %w[node npm yarn]
set :yarn_flags, %w[--silent --no-progress]

namespace :deploy do
  task :yarn_deploy do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute fetch(:yarn_bin), 'build'
      end
    end
  end
  before 'symlink:release', :yarn_deploy
end

namespace :deploy_no_git do
  task :local_build do
    run_locally do
      execute %(REACT_APP_ENV=#{fetch(:react_app_env)} && yarn run build)
    end
  end

  task :sync do
    on roles(:all) do |host|
      run_locally do
        execute %(rsync -az build/ #{host.user}@#{host.hostname}:#{fetch(:deploy_to)}/current/build)
      end
    end
  end

  task :deploy do
    invoke :'deploy_no_git:local_build'
    invoke :'deploy_no_git:sync'
  end
end
