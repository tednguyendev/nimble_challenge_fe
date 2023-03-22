# config valid for current version and patch releases of Capistrano
lock '~> 3.17.2'

set :application, 'nimble-challenge-fe'
set :repo_url, 'git@github.com:tednguyendev/nimble_challenge_fe.git'

# append :linked_files, '.env'
set :linked_files, %w{.env app.json}
append :linked_dirs, 'node_modules'

set :nvm_type, :user
set :nvm_node, 'v14.17.3'
set :nvm_map_bins, %w[node npm yarn pm2]
set :yarn_flags, %w[--silent --no-progress]

namespace :pm2 do
  task :start do
    on roles(:app) do
      within current_path do
        execute :npm, 'run build'
      end

      within shared_path do
        execute :pm2, 'start app.json'
      end
    end
  end

  task :restart do
    on roles(:app) do
      within current_path do
        execute :npm, 'run build'
      end

      within shared_path do
        execute :pm2, 'reload app.json'
      end
    end
  end

  task :stop do
    on roles(:app) do
      within shared_path do
        execute :pm2, 'stop app.json'
      end
    end
  end
end

namespace :deploy do
  after 'deploy:publishing', 'deploy:yarn_install'
  after 'deploy:publishing', 'deploy:restart'

  task :yarn_install do
    on roles(:app) do
      within current_path do
        execute :yarn, 'install'
      end
    end
  end

  task :restart do
    invoke 'pm2:restart'
  end

  task :start do
    invoke 'pm2:start'
  end

  task :stop do
    invoke 'pm2:stop'
  end
end