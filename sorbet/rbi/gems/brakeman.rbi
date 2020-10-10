# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: strict
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/brakeman/all/brakeman.rbi
#
# brakeman-4.9.0

module Brakeman
  def self.add_external_checks(options); end
  def self.check_for_missing_checks(included_checks, excluded_checks, enabled_checks); end
  def self.compare(options); end
  def self.config_file(custom_location, app_path); end
  def self.debug(message); end
  def self.debug=(val); end
  def self.default_options; end
  def self.dump_config(options); end
  def self.ensure_latest; end
  def self.filter_warnings(tracker, options); end
  def self.get_formats_from_output_files(output_files); end
  def self.get_formats_from_output_format(output_format); end
  def self.get_github_url(options); end
  def self.get_output_formats(options); end
  def self.ignore_file_entries_with_empty_notes(file); end
  def self.list_checks(options); end
  def self.load_brakeman_dependency(name, allow_fail = nil); end
  def self.load_options(line_options); end
  def self.notify(message); end
  def self.quiet=(val); end
  def self.rescan(tracker, files, options = nil); end
  def self.run(options); end
  def self.scan(options); end
  def self.set_options(options); end
  def self.write_report_to_files(tracker, output_files); end
  def self.write_report_to_formats(tracker, output_formats); end
end
class Brakeman::DependencyError < RuntimeError
end
class Brakeman::NoBrakemanError < RuntimeError
end
class Brakeman::NoApplication < RuntimeError
end
class Brakeman::MissingChecksError < RuntimeError
end
