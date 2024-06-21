class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.references :sender, null: false, foreign_key: true
      t.references :receiver, null: false, foreign_key: true
      t.references :request, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
