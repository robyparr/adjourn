# Adjourn
<p align="center">
  <img src="artwork/icon_background.png" alt="Adjourn Icon" />
</div>

Adjourn is an app to simplify the planning, running, and follow-up of meetings.

## Getting Started

After cloning the repository, you can get up and running by following these steps:

1. **Install dependencies**

```
bundle install
yarn install
```

2. **Setup the database**

```
bundle exec rails db:create db:migrate
```

3. **Run the project**

```
foreman s -f Procfile.dev
```