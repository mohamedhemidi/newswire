setup_docker:
	@make change_access
	@make build_docker
	@make up_docker
	@make run_worker
change_access:
	chmod 755 backend/docker/entrypoint.sh
build_docker:
	docker-compose build --no-cache
up_docker: 
	docker-compose up -d
run_worker:
	docker exec backend bash -c "php artisan schedule:work" 