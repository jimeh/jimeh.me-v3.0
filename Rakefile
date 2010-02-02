
#
# Config
#

$server = "new.jimeh.me"
$user = "jimeh"
$path = "jimeh.me/new"


#
# Build tasks
#

task :reset do
  system "rm -rf ./public"
  build
end

task :clean => :reset

task :build do
  build
end

task :assets do
  rsync "assets/", "public/"
end


#
# Server tasks
#

task :server => "server:site"

namespace :server do
  task :site do
    system "jekyll source/site public --server --auto"
  end
  task :blog do
    system "jekyll source/blog public/blog --server --auto"
  end
end


#
# Deploy tasks
#

task :deploy => "deploy:site"

namespace :deploy do
  task :site do
    rsync "public/", "#{$user}@#{$server}:#{$path}"
  end
  task :assets do
    rsync "assets/", "#{$user}@#{$server}:#{$path}"
  end
  task :all do
    rsync ["public/", "assets/"], "#{$user}@#{$server}:#{$path}"
  end
  task :clean do
    rsync ["public/", "assets/"], "#{$user}@#{$server}:#{$path}", ["--delete"]
  end
  task :reset do
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

def rsync(source, dest, options = [])
  if source.is_a?(Array)
    source.map! { |dir, i| "\"#{dir}\"" }
    source = source.join(" ")
  end
  options << "--exclude='.DS_Store'"
  options << "--exclude='.git*'"
  system "rsync -vr #{options.join(" ")} #{source} #{dest}"
end

