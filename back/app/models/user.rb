class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  mount_uploader :id_photo, IdPhotoUploader

  validates :first_name, presence: { message: "First name is required" }
  validates :last_name, presence: { message: "Last name is required" }
  validates :id_photo, presence:  { message: "ID photo is required" }
  validates :email, presence: { message: "E-mail is required" }, uniqueness: { message: "E-mail is already in use" }
  validates :password, presence: { message: "Password is required" }, length: { minimum: 6, message: "Password must be at least 6 characters long" }

  has_many :request
end
