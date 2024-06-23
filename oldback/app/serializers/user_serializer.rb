class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :first_name, :last_name

  attribute :id_photo_url do |user|
    user.id_photo.url if user.id_photo.present?
  end
end
