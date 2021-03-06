# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: strict
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/pry-nav/all/pry-nav.rbi
#
# pry-nav-0.3.0

module PryNav
  def check_file_context(target); end
  def current_remote_server; end
  def current_remote_server=(arg0); end
  extend PryNav
end
class PryNav::Tracer
  def initialize(pry_start_options = nil, &block); end
  def process_command(command = nil); end
  def run(&block); end
  def start; end
  def stop; end
  def tracer(event, file, line, id, binding, klass); end
end
class Pry
  def self.start_with_pry_nav(target = nil, options = nil); end
  def self.start_without_pry_nav(target = nil, options = nil); end
end
