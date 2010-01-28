
$server = "new.jimeh.me"
$user = "jimeh"
$path = "#{$server}/public"

task :clean do
  system "rm -rf ./public"
  system "jekyll ./source ./public"
end

task :build do
  system "jekyll ./source ./public"
end

task :assets do
  rsync "assets/", "public/"
end

task :server do
  system "jekyll ./source ./public --server --auto"
end

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
  
  task :reset do
    rsync ["public/", "assets/"], "#{$user}@#{$server}:#{$path}", ["--delete"]
  end
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