# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_19_133647) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_items", force: :cascade do |t|
    t.string "title"
    t.bigint "meeting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.boolean "done", default: false
    t.index ["meeting_id"], name: "index_action_items_on_meeting_id"
  end

  create_table "action_items_contacts", force: :cascade do |t|
    t.bigint "action_item_id"
    t.bigint "contact_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["action_item_id"], name: "index_action_items_contacts_on_action_item_id"
    t.index ["contact_id", "action_item_id"], name: "index_action_items_contacts_on_contact_id_and_action_item_id", unique: true
    t.index ["contact_id"], name: "index_action_items_contacts_on_contact_id"
  end

  create_table "agendum_notes", force: :cascade do |t|
    t.bigint "agendum_id"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "meeting_id"
    t.index ["agendum_id"], name: "index_agendum_notes_on_agendum_id"
    t.index ["meeting_id"], name: "index_agendum_notes_on_meeting_id"
  end

  create_table "agendums", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.bigint "meeting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position"
    t.index ["meeting_id"], name: "index_agendums_on_meeting_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "email"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "user_id"], name: "index_contacts_on_email_and_user_id", unique: true
    t.index ["user_id"], name: "index_contacts_on_user_id"
  end

  create_table "google_accounts", force: :cascade do |t|
    t.bigint "user_id"
    t.string "email", null: false
    t.string "avatar_url"
    t.string "refresh_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_google_accounts_on_email", unique: true
    t.index ["user_id"], name: "index_google_accounts_on_user_id"
  end

  create_table "google_calendars", force: :cascade do |t|
    t.string "google_id"
    t.bigint "google_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["google_account_id"], name: "index_google_calendars_on_google_account_id"
    t.index ["google_id", "google_account_id"], name: "index_google_calendars_on_google_id_and_google_account_id", unique: true
    t.index ["google_id"], name: "index_google_calendars_on_google_id"
  end

  create_table "meeting_attendees", force: :cascade do |t|
    t.bigint "contact_id"
    t.bigint "meeting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "attended", default: true
    t.index ["contact_id", "meeting_id"], name: "index_meeting_attendees_on_contact_id_and_meeting_id", unique: true
    t.index ["contact_id"], name: "index_meeting_attendees_on_contact_id"
    t.index ["meeting_id"], name: "index_meeting_attendees_on_meeting_id"
  end

  create_table "meetings", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "start_date"
    t.datetime "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "google_event_id"
    t.index ["user_id"], name: "index_meetings_on_user_id"
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
    t.index ["user_id"], name: "index_pg_search_documents_on_user_id"
  end

  create_table "uploads", force: :cascade do |t|
    t.bigint "agendum_id"
    t.string "filename"
    t.string "content_type"
    t.integer "file_size"
    t.string "storage_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["agendum_id"], name: "index_uploads_on_agendum_id"
    t.index ["user_id"], name: "index_uploads_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "time_zone", default: "UTC", null: false
    t.string "provider"
    t.string "uid"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "action_items", "meetings"
  add_foreign_key "action_items_contacts", "action_items"
  add_foreign_key "action_items_contacts", "contacts"
  add_foreign_key "agendum_notes", "agendums"
  add_foreign_key "agendum_notes", "meetings"
  add_foreign_key "agendums", "meetings"
  add_foreign_key "contacts", "users"
  add_foreign_key "google_accounts", "users"
  add_foreign_key "google_calendars", "google_accounts"
  add_foreign_key "meeting_attendees", "contacts"
  add_foreign_key "meeting_attendees", "meetings"
  add_foreign_key "meetings", "users"
  add_foreign_key "uploads", "agendums"
  add_foreign_key "uploads", "users"
end
