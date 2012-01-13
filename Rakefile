$: << File.expand_path(File.join(File.dirname(__FILE__), "lib"))

require 'fileutils'

#
# Config
#

SERVER = "jimeh.me"
USER   = "jimeh"

REMOTE_PATH  = "jimeh.me/www"
RSYNC_TARGET = "#{USER}@#{SERVER}:#{REMOTE_PATH}"

TAGS_DIR = "source/blog/tag"

SITE_SRC  = "source/site"
SITE_DEST = "public"

BLOG_SRC  = "source/blog"
BLOG_DEST = "public/blog"

#
# Jekyll init
#

namespace :jekyll do
  task :initialize do
    gem "jekyll"
    require "jekyll"
    require "jekyll/tags/post"
    require "jekyll/tags/related"
    @options = Jekyll.configuration("auto" => false, "source" => BLOG_SRC, "destination" => BLOG_DEST)
    @blog = Jekyll::Site.new(@options)
    @blog.read_posts("")
  end
end

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
  task :default => ["jekyll:initialize", "build:tags"] do
    system "jekyll ./source/site ./public"
    @blog.process
  end

  desc "Build tags"
  task :tags => "jekyll:initialize" do
    FileUtils.rm_rf(TAGS_DIR)
    FileUtils.mkdir_p(TAGS_DIR)
    tags = @blog.categories
    tags.each do |tag, posts|
      FileUtils.mkdir_p(File.join(TAGS_DIR, tag))
      File.open(File.join(TAGS_DIR, tag, "index.html"), "w") do |file|
        generate_index posts, file, "title" => "#{tag}"
      end
    end
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
task :server do
  system "jekyll source/site public --server --auto"
end

#
# Auto-rebuild tasks
#

desc "Auto-rebuild site when files are changed."
task :auto => "auto:site"

namespace :auto do
  task :site do # default
    system "jekyll source/site public --auto"
  end
  desc "Auto-rebuild blog when files are changed."
  task :blog => "build" do
    require 'directory_watcher'

    puts "Auto-regenerating enabled: #{BLOG_SRC} -> #{BLOG_DEST}"

    dw = DirectoryWatcher.new(BLOG_SRC)
    dw.interval = 1
    dw.glob = globs(BLOG_SRC)

    dw.add_observer do |*args|
      t = Time.now.strftime("%Y-%m-%d %H:%M:%S")
      puts "[#{t}] regeneration: #{args.size} files changed"
      Rake::Task['build'].invoke
      @blog.process
    end

    dw.start

    loop { sleep 500 }
  end
end


#
# Deploy tasks
#

desc "Deploy public folder to remote server via rsync."
task :deploy => "deploy:default"

namespace :deploy do
  task :default do
    rsync "public/", RSYNC_TARGET
  end
  desc "Deploy assets folder to remote server."
  task :assets do
    rsync "assets/", RSYNC_TARGET
  end
  desc "Deploy both public and assets folders to remote server."
  task :all => "build:all" do
    rsync ["public/", "assets/"], RSYNC_TARGET
  end
  desc "Deploy all via rsync removing remote files that don't exist locally."
  task :clean => "build:all" do
    rsync ["public/", "assets/"], RSYNC_TARGET, ["--delete"]
  end
  desc "Reset remote files completely via 'rm -rf' and redeploy everything via rsync."
  task :reset => "build:all" do
    system "ssh #{USER}@#{SERVER} 'cd \"#{REMOTE_PATH}\" && rm -rf ./* && rm -rf ./.*'"
    rsync ["public/", "assets/"], RSYNC_TARGET
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

def generate_index(posts, file, options = {})
  file.puts YAML.dump(options.merge({"layout" => "tag-page", "robots" => "noindex"}))
  file.puts "---"
  posts = posts.sort{|x, y| x.date <=> y.date }.reverse!
  output = posts.collect do |post|
    %{{% post #{post.url} %}}
  end.join("\n")
  file.puts(output)
end

def globs(source)
  Dir.chdir(source) do
    dirs = Dir['*'].select { |x| File.directory?(x) }
    dirs -= ['_site']
    dirs = dirs.map { |x| "#{x}/**/*" }
    dirs += ['*']
  end
end
