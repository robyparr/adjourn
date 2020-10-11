# typed: strict
class ApplicationRecord < ActiveRecord::Base
  extend T::Sig

  self.abstract_class = true

  class << self
    extend T::Sig
  end
end
