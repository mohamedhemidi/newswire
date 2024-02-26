setup_docker:
	@make build_docker
	@make up_docker
	@make migrate_docker
build_docker:
	docker-compose build
up_docker: 
	docker-compose up -d
migrate_docker:
	docker exec backend bash -c "php artisan migrate" 
	docker exec backend bash -c "php artisan schedule:work" 