# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 0) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", id: :serial, force: :cascade do |t|
    t.integer "sender_id", null: false
    t.integer "receiver_id", null: false
    t.integer "request_id", null: false
    t.text "content"
    t.datetime "created_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["receiver_id"], name: "index_messages_on_receiver_id"
    t.index ["request_id"], name: "index_messages_on_request_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "requests", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "title", limit: 255
    t.text "description"
    t.string "request_type", limit: 255
    t.float "latitude"
    t.float "longitude"
    t.string "status", limit: 255
    t.datetime "created_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["user_id"], name: "index_requests_on_user_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email", limit: 255, null: false
    t.string "encrypted_password", limit: 255, null: false
    t.string "reset_password_token", limit: 255
    t.datetime "reset_password_sent_at", precision: nil
    t.datetime "remember_created_at", precision: nil
    t.datetime "created_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.string "id_photo", limit: 255
    t.string "first_name", limit: 255
    t.string "last_name", limit: 255
    t.index ["email"], name: "index_users_on_email"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token"
    t.unique_constraint ["email"], name: "users_email_key"
    t.unique_constraint ["reset_password_token"], name: "users_reset_password_token_key"
  end

  add_foreign_key "messages", "requests", name: "messages_request_id_fkey"
  add_foreign_key "messages", "users", column: "receiver_id", name: "messages_receiver_id_fkey"
  add_foreign_key "messages", "users", column: "sender_id", name: "messages_sender_id_fkey"
  add_foreign_key "requests", "users", name: "requests_user_id_fkey"
end
