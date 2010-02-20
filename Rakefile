
#
# Config
#

$server = "jimeh.me"
$user = "jimeh"
$path = "jimeh.me/www"


#
# Build tasks
#

desc "Reset public folder."
task :reset => ["clean", "build:all"]

desc "Remove public folder."
task :clean do
  system "rm -rf ./public"
end

desc "Build site, excluding JavaScript libs."
task :build => "build:default"

namespace :build do
  task :default do
    system "jekyll ./source/site ./public"
    system "jekyll ./source/blog ./public/blog"
  end
  desc "Compress JavaScript libs specified in the Jimfile."
  task :js do
    system "jim compress"
  end
  desc "Build site and compress JavaScript libs"
  task :all => ["build", "build:js"]
end

desc "Sync assets into public folder for local testing."
task :assets do
  rsync "assets/", "public/"
end


#
# Server tasks
#

desc "Start jekyll server."
task :server => "server:default" do
  system "jekyll source/site public --server --auto"
end

#
# Auto-rebuild tasks
#

desc "Auto-rebuild site when files are changed."
task :auto => "auto:default"

namespace :auto do
  task :default do
    system "jekyll source/site public --auto"
  end
  desc "Auto-rebuild blog when files are changed."
  task :blog do
    system "jekyll source/blog public/blog --auto"
  end
end


#
# Deploy tasks
#

desc "Deploy public folder to remote server via rsync."
task :deploy => "deploy:default"

namespace :deploy do
  task :default do
    rsync "public/", "#{$user}@#{$server}:#{$path}"
  end
  desc "Deploy assets folder to remote server."
  task :assets do
    rsync "assets/", "#{$user}@#{$server}:#{$path}"
  end
  desc "Deploy both public and assets folders to remote server."
  task :all => "build:all" do
    rsync ["public/", "assets/"], "#{$user}@#{$server}:#{$path}"
  end
  desc "Deploy all via rsync removing remote files that don't exist locally."
  task :clean => "build:all" do
    rsync ["public/", "assets/"], "#{$user}@#{$server}:#{$path}", ["--delete"]
  end
  desc "Reset remote files completely via 'rm -rf' and redeploy everything via rsync."
  task :reset => "build:all" do
    system "ssh #{$user}@#{$server} 'cd \"#{$path}\" && rm -rf ./* && rm -rf ./.*'"
    rsync ["public/", "assets/"], "#{$user}@#{$server}:#{$path}"
  end
end


#
# Helper methods
#

def rsync(source, dest, options = [])
  if source.is_a?(Array)
    source.map! { |dir, i| "\"#{dir}\"" }
    source = source.join(" ")
  end
  options << "--exclude='.DS_Store'"
  options << "--exclude='.git*'"
  system "rsync -vr #{options.join(" ")} #{source} #{dest}"
end

