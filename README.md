# GoodNeighbour 💗

GoodNeighbour is a neighbourhood platform that facilitates exchanged acts of kindness.

I designed and built this full-stack application as project 8 for the OpenClassrooms Full Stack Developer path. For the back-end I use Ruby on Rails with PostgreSQL for the database. For the front-end I use React with Tailwind CSS.

## Features

-   **1**: Users can sign up and log in securely.
-   **2**: Users can upload ID images.
-   **3**: Users can submit aid requests in different categories.
-   **4**: Users can track the amount of aid requests made.
-   **5**: Users can communicate via a secure messaging portal.
-   **6**: Users can view and track aid requests using the Google Maps API.
-   **7**: Users can interact with accessible, responsive interface that conforms with current [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) criteria.

## Back-end requirements

-   Ruby version 3.2.2
-   [Rails version 7.1.3](https://guides.rubyonrails.org/v5.1/getting_started.html)
-   PostgreSQL database

## Front-end requirements

-   Node version 21.4.0
-   React version 18.3.1
-   `react-router-dom` version 6.23.0
-   Tailwind CSS version 3.4.3

## Installation

1. Clone and access the project using the following commands:

```bash
git clone git@github.com:tssa017/goodneighbour.git
```

2. Install back-end dependencies using the following command:

```bash
cd back
bundle install
```

3. Setup the database with the following commands:

```bash
rails db:create
rails db:migrate
```

4. Start the back-end server:

```bash
rails server
```

2. Install front-end dependencies with the following command:

```bash
cd front
npm i
```

4. Start the front-end server:

```bash
npm start
```

## Configuration

Ensure you have the following environment variables set in `config/.env` files in their respective repositories:

### Back .env

-   `TBD`

### Front .env

-   `REACT_APP_GOOGLE_MAPS_API_KEY`
-   `TBD`

## Models

-   **messages**: - represents
-   **requests**: - represents
-   **users**: - represents

## Database Schema

The application uses PostgreSQL as the development and production database. Below is the schema definition:

```ruby
ActiveRecord::Schema[7.1].define(version: 2024_06_11_164123) do
  create_table "messages", force: :cascade do |t|
    t.integer "sender_id", null: false
    t.integer "receiver_id", null: false
    t.integer "request_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id"], name: "index_messages_on_receiver_id"
    t.index ["request_id"], name: "index_messages_on_request_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "requests", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "title"
    t.text "description"
    t.string "request_type"
    t.float "latitude"
    t.float "longitude"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_requests_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "id_photo"
    t.string "first_name"
    t.string "last_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "messages", "receivers"
  add_foreign_key "messages", "requests"
  add_foreign_key "messages", "senders"
  add_foreign_key "requests", "users"
end
```

## Testing

### To run Rails tests, use the following command in your terminal:

```bash
rails test
```

### To run front tests, use the following command in your terminal:

```bash
npx jest
```

## Acknowledgments

I would like to acknowledge the following open-source projects for their contributions to this project:

### Icons

-   [Twemoji](https://github.com/twitter/twemoji): Utilized the bike emoji for the favicon.ico

### Google Maps

-   [@vis.gl/react-google-maps](https://www.npmjs.com/package/@vis.gl/react-google-maps): Utilized the open source Google Maps React API

## Resources

-   [Rails docs](https://guides.rubyonrails.org/)
-   [Project description](https://openclassrooms.com/en/paths/509/projects/242/assignment)
-   [WCAG2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/).

Enjoy the platform! 🚀
