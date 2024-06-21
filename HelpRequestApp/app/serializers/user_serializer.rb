# app/serializers/user_serializer.rb
class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :id_photo_url

  def id_photo_url
    object.id_photo.url
  end
end
