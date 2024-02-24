setup:
	@make build
	@make up
	@make migrate
build:
	docker-compose build
up: 
	docker-compose up
migrate:
	docker exec backend bash -c "php artisan migrate" 
	docker exec backend bash -c "php artisan schedule:work" 