class AddIdPhotoToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :id_photo, :string
  end
end
