# This is an autogenerated file for dynamic methods in Agendum
# Please rerun bundle exec rake rails_rbi:models[Agendum] to regenerate.

# typed: strong
module Agendum::ActiveRelation_WhereNot
  sig { params(opts: T.untyped, rest: T.untyped).returns(T.self_type) }
  def not(opts, *rest); end
end

module Agendum::GeneratedAttributeMethods
  sig { returns(ActiveSupport::TimeWithZone) }
  def created_at; end

  sig { params(value: T.any(Date, Time, ActiveSupport::TimeWithZone)).void }
  def created_at=(value); end

  sig { returns(T::Boolean) }
  def created_at?; end

  sig { returns(T.nilable(String)) }
  def description; end

  sig { params(value: T.nilable(T.any(String, Symbol))).void }
  def description=(value); end

  sig { returns(T::Boolean) }
  def description?; end

  sig { returns(Integer) }
  def id; end

  sig { params(value: T.any(Numeric, ActiveSupport::Duration)).void }
  def id=(value); end

  sig { returns(T::Boolean) }
  def id?; end

  sig { returns(T.nilable(Integer)) }
  def meeting_id; end

  sig { params(value: T.nilable(T.any(Numeric, ActiveSupport::Duration))).void }
  def meeting_id=(value); end

  sig { returns(T::Boolean) }
  def meeting_id?; end

  sig { returns(T.nilable(Integer)) }
  def position; end

  sig { params(value: T.nilable(T.any(Numeric, ActiveSupport::Duration))).void }
  def position=(value); end

  sig { returns(T::Boolean) }
  def position?; end

  sig { returns(String) }
  def title; end

  sig { params(value: T.any(String, Symbol)).void }
  def title=(value); end

  sig { returns(T::Boolean) }
  def title?; end

  sig { returns(ActiveSupport::TimeWithZone) }
  def updated_at; end

  sig { params(value: T.any(Date, Time, ActiveSupport::TimeWithZone)).void }
  def updated_at=(value); end

  sig { returns(T::Boolean) }
  def updated_at?; end
end

module Agendum::GeneratedAssociationMethods
  sig { returns(::Meeting) }
  def meeting; end

  sig { params(args: T.untyped, block: T.nilable(T.proc.params(object: ::Meeting).void)).returns(::Meeting) }
  def build_meeting(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.params(object: ::Meeting).void)).returns(::Meeting) }
  def create_meeting(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.params(object: ::Meeting).void)).returns(::Meeting) }
  def create_meeting!(*args, &block); end

  sig { params(value: ::Meeting).void }
  def meeting=(value); end

  sig { returns(::AgendumNote::ActiveRecord_Associations_CollectionProxy) }
  def notes; end

  sig { returns(T::Array[Integer]) }
  def note_ids; end

  sig { params(value: T::Enumerable[::AgendumNote]).void }
  def notes=(value); end

  sig { returns(T.nilable(T.untyped)) }
  def pg_search_document; end

  sig { params(args: T.untyped, block: T.nilable(T.proc.params(object: T.untyped).void)).returns(T.untyped) }
  def build_pg_search_document(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.params(object: T.untyped).void)).returns(T.untyped) }
  def create_pg_search_document(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.params(object: T.untyped).void)).returns(T.untyped) }
  def create_pg_search_document!(*args, &block); end

  sig { params(value: T.nilable(T.untyped)).void }
  def pg_search_document=(value); end

  sig { returns(::Upload::ActiveRecord_Associations_CollectionProxy) }
  def uploads; end

  sig { returns(T::Array[Integer]) }
  def upload_ids; end

  sig { params(value: T::Enumerable[::Upload]).void }
  def uploads=(value); end

  sig { returns(T.nilable(::User)) }
  def user; end

  sig { params(args: T.untyped, block: T.nilable(T.proc.params(object: ::User).void)).returns(::User) }
  def build_user(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.params(object: ::User).void)).returns(::User) }
  def create_user(*args, &block); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.params(object: ::User).void)).returns(::User) }
  def create_user!(*args, &block); end

  sig { params(value: T.nilable(::User)).void }
  def user=(value); end
end

module Agendum::CustomFinderMethods
  sig { params(limit: Integer).returns(T::Array[Agendum]) }
  def first_n(limit); end

  sig { params(limit: Integer).returns(T::Array[Agendum]) }
  def last_n(limit); end

  sig { params(args: T::Array[T.any(Integer, String)]).returns(T::Array[Agendum]) }
  def find_n(*args); end

  sig { params(id: Integer).returns(T.nilable(Agendum)) }
  def find_by_id(id); end

  sig { params(id: Integer).returns(Agendum) }
  def find_by_id!(id); end
end

class Agendum < ApplicationRecord
  include Agendum::GeneratedAttributeMethods
  include Agendum::GeneratedAssociationMethods
  extend Agendum::CustomFinderMethods
  extend Agendum::QueryMethodsReturningRelation
  RelationType = T.type_alias { T.any(Agendum::ActiveRecord_Relation, Agendum::ActiveRecord_Associations_CollectionProxy, Agendum::ActiveRecord_AssociationRelation) }
end

module Agendum::QueryMethodsReturningRelation
  sig { returns(Agendum::ActiveRecord_Relation) }
  def all; end

  sig { params(block: T.nilable(T.proc.void)).returns(Agendum::ActiveRecord_Relation) }
  def unscoped(&block); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def select(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def reselect(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def order(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def reorder(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def group(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def limit(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def offset(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def joins(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def left_joins(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def left_outer_joins(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def where(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def rewhere(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def preload(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def extract_associated(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def eager_load(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def includes(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def from(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def lock(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def readonly(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def or(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def having(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def create_with(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def distinct(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def references(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def none(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def unscope(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def optimizer_hints(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def merge(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def except(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_Relation) }
  def only(*args); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).returns(Agendum::ActiveRecord_Relation) }
  def extending(*args, &block); end

  sig do
    params(
      of: T.nilable(Integer),
      start: T.nilable(Integer),
      finish: T.nilable(Integer),
      load: T.nilable(T::Boolean),
      error_on_ignore: T.nilable(T::Boolean),
      block: T.nilable(T.proc.params(e: Agendum::ActiveRecord_Relation).void)
    ).returns(ActiveRecord::Batches::BatchEnumerator)
  end
  def in_batches(of: 1000, start: nil, finish: nil, load: false, error_on_ignore: nil, &block); end
end

module Agendum::QueryMethodsReturningAssociationRelation
  sig { returns(Agendum::ActiveRecord_AssociationRelation) }
  def all; end

  sig { params(block: T.nilable(T.proc.void)).returns(Agendum::ActiveRecord_Relation) }
  def unscoped(&block); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def select(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def reselect(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def order(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def reorder(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def group(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def limit(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def offset(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def joins(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def left_joins(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def left_outer_joins(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def where(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def rewhere(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def preload(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def extract_associated(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def eager_load(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def includes(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def from(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def lock(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def readonly(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def or(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def having(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def create_with(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def distinct(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def references(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def none(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def unscope(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def optimizer_hints(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def merge(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def except(*args); end

  sig { params(args: T.untyped).returns(Agendum::ActiveRecord_AssociationRelation) }
  def only(*args); end

  sig { params(args: T.untyped, block: T.nilable(T.proc.void)).returns(Agendum::ActiveRecord_AssociationRelation) }
  def extending(*args, &block); end

  sig do
    params(
      of: T.nilable(Integer),
      start: T.nilable(Integer),
      finish: T.nilable(Integer),
      load: T.nilable(T::Boolean),
      error_on_ignore: T.nilable(T::Boolean),
      block: T.nilable(T.proc.params(e: Agendum::ActiveRecord_AssociationRelation).void)
    ).returns(ActiveRecord::Batches::BatchEnumerator)
  end
  def in_batches(of: 1000, start: nil, finish: nil, load: false, error_on_ignore: nil, &block); end
end

class Agendum::ActiveRecord_Relation < ActiveRecord::Relation
  include Agendum::ActiveRelation_WhereNot
  include Agendum::CustomFinderMethods
  include Agendum::QueryMethodsReturningRelation
  Elem = type_member(fixed: Agendum)
end

class Agendum::ActiveRecord_AssociationRelation < ActiveRecord::AssociationRelation
  include Agendum::ActiveRelation_WhereNot
  include Agendum::CustomFinderMethods
  include Agendum::QueryMethodsReturningAssociationRelation
  Elem = type_member(fixed: Agendum)
end

class Agendum::ActiveRecord_Associations_CollectionProxy < ActiveRecord::Associations::CollectionProxy
  include Agendum::CustomFinderMethods
  include Agendum::QueryMethodsReturningAssociationRelation
  Elem = type_member(fixed: Agendum)

  sig { params(records: T.any(Agendum, T::Array[Agendum])).returns(T.self_type) }
  def <<(*records); end

  sig { params(records: T.any(Agendum, T::Array[Agendum])).returns(T.self_type) }
  def append(*records); end

  sig { params(records: T.any(Agendum, T::Array[Agendum])).returns(T.self_type) }
  def push(*records); end

  sig { params(records: T.any(Agendum, T::Array[Agendum])).returns(T.self_type) }
  def concat(*records); end
end
