web: cd front && npm install && npm run build && cd .. && concurrently "cd back && bundle exec rails server -p $PORT -b '0.0.0.0'" "cd front && npm start"
