class AddUniqueConstraintToChats < ActiveRecord::Migration[7.1]
  def change
    add_index :chats, [:request_id, :requester_id, :answerer_id], unique: true, name: 'unique_requester_answerer'
  end
end
