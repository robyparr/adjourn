class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Relationships
  has_many :meetings, dependent: :destroy
  has_many :agenda, through: :meetings, dependent: :destroy
  has_many :attendees, dependent: :destroy
  has_many :uploads, through: :agenda
  has_many :notes, class_name: 'AgendumNote', through: :meetings
  has_many :google_accounts, dependent: :destroy
end
