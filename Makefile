ps:
	docker-compose ps

up:
	docker-compose up -d --remove-orphans

upb:
	docker-compose up -d --build --remove-orphans

down:
	docker-compose down --remove-orphans

stop:
	docker-compose stop

migrate:
	docker-compose exec php php artisan migrate

fresh:
	docker-compose exec php php artisan migrate:fresh

fresh-seed:
	docker-compose exec php php artisan migrate:fresh --seed

seed:
	docker-compose exec php php artisan db:seed

tinker:
	docker-compose exec php php artisan tinker

setup:
	@make upb
	docker-compose exec php composer install --optimize-autoloader
	@make npm-install
	docker-compose exec php cp -n .env.example .env
	docker-compose exec php php artisan key:generate
	docker-compose exec php php artisan storage:link

#make rs name=php
rs:
	docker-compose restart $(name)
nrs:
	docker-compose restart nginx

restart:
	@make down
	@make up

#make exec name=php
exec:
	docker-compose exec $(name) bash || docker-compose exec $(name) sh

php:
	docker-compose exec php bash || docker-compose exec php sh

logs:
	docker-compose logs $(name)

npm-install:
	docker compose exec php npm install

watch:
	docker-compose exec php npm run watch
