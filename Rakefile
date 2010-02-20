
#
# Config
#

$server = "jimeh.me"
$user = "jimeh"
$path = "jimeh.me/www"


#
# Build tasks
#

task :reset do
  system "rm -rf ./public"
  build
  build_js
end

task :clean => :reset

task :build => "build:default"

namespace :build do
  task :default do
    build
  end
  task :js do
    build_js
  end
  task :all => ["build", "build:js"]
end

task :assets do
  rsync "assets/", "public/"
end


#
# Server tasks
#

task :server => "server:default"

namespace :server do
  task :default do
    system "jekyll source/site public --server --auto"
  end
  task :blog do
    system "jekyll source/blog public/blog --server --auto"
  end
end


#
# Deploy tasks
#

task :deploy => "deploy:default"

namespace :deploy do
  task :default => "build:all" do
    rsync "public/", "#{$user}@#{$server}:#{$path}"
  end
  task :assets do
    rsync "assets/", "#{$user}@#{$server}:#{$path}"
  end
  task :all => "build:all" do
    rsync ["public/", "assets/"], "#{$user}@#{$server}:#{$path}"
  end
  task :clean => "build:all" do
    rsync ["public/", "assets/"], "#{$user}@#{$server}:#{$path}", ["--delete"]
  end
  task :reset => "build:all" do
    system "ssh #{$user}@#{$server} 'cd \"#{$path}\" && rm -rf ./* && rm -rf ./.*'"
    rsync ["public/", "assets/"], "#{$user}@#{$server}:#{$path}"
  end
end


#
# Helper methods
#

def build
  system "jekyll ./source/site ./public"
  system "jekyll ./source/blog ./public/blog"
end

def build_js
  system "jim compress"
end

def rsync(source, dest, options = [])
  if source.is_a?(Array)
    source.map! { |dir, i| "\"#{dir}\"" }
    source = source.join(" ")
  end
  options << "--exclude='.DS_Store'"
  options << "--exclude='.git*'"
  system "rsync -vr #{options.join(" ")} #{source} #{dest}"
end

