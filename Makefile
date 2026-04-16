export VIRTUAL_IP := 10.10.20.10
export COMPOSE_PROJECT_NAME := iivineri

DOCKER_COMPOSE_FILE := .development/docker-compose.yml

PLATFORM := $(shell uname)
DC_ARGS = $(filter-out dc,$(MAKECMDGOALS))

# Make eats -d as its own debug flag; reclaim it for docker compose
ifneq (,$(findstring d,$(firstword -$(MAKEFLAGS))))
  DC_DETACH := -d
else
  DC_DETACH :=
endif

.DEFAULT_GOAL := help

help: ## Show this help
	@printf "\n\033[1mUsage:\033[0m make <target> [args]\n\n"
	@printf "\033[1mTargets:\033[0m\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'
	@printf "\n\033[1mExamples:\033[0m\n"
	@printf "  make dc up -d       Start containers in background\n"
	@printf "  make dc down        Stop containers\n"
	@printf "  make dc build       Build images\n"
	@printf "  make dc logs -f     Follow logs\n"
	@printf "  make dc ps          List containers\n"
	@printf "  make pc up          Start processes\n"
	@printf "  make pc down        Stop processes\n"
	@printf "\n"

dc: ## Docker Compose (pass subcommands/args)
	@if echo "$(DC_ARGS)" | grep -qw up; then \
		if ! ifconfig -a 2>/dev/null | grep -q $(VIRTUAL_IP); then \
			if uname -a | grep -qi darwin; then \
				echo "Adding $(VIRTUAL_IP) to lo0"; \
				sudo ifconfig lo0 alias $(VIRTUAL_IP); \
			else \
				echo "Creating virtual interface"; \
				CN=$$(echo $(VIRTUAL_IP) | cut -d . -f 4); \
				sudo ifconfig docker0:ng_$${CN} $(VIRTUAL_IP); \
			fi; \
		fi; \
	fi
	docker compose --env-file=.env  -f $(DOCKER_COMPOSE_FILE) $(DC_ARGS) $(DC_DETACH) $(if $(filter build,$(DC_ARGS)),--build-arg PLATFORM=$(PLATFORM))

%:
	@:

.PHONY: help dc
