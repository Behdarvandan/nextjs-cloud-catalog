# -----------------------------------------------------------------------------
# Input variables
# -----------------------------------------------------------------------------

variable "aws_region" {
  description = "AWS region where all resources are provisioned"
  type        = string
  default     = "eu-central-1"
}

variable "project_name" {
  description = "Project name used for resource naming and tagging"
  type        = string
  default     = "nextjs-cloud-catalog"
}

variable "container_port" {
  description = "Port the Next.js container listens on"
  type        = number
  default     = 3000
}

variable "container_image" {
  description = "ECR image URI for the Next.js application"
  type        = string
  default     = "675134942906.dkr.ecr.eu-central-1.amazonaws.com/nextjs-cloud-catalog:latest"
}

variable "fargate_cpu" {
  description = "CPU units allocated to each Fargate task (1024 = 1 vCPU)"
  type        = string
  default     = "512"
}

variable "fargate_memory" {
  description = "Memory (MiB) allocated to each Fargate task"
  type        = string
  default     = "1024"
}

variable "desired_count" {
  description = "Number of Fargate tasks to keep running"
  type        = number
  default     = 1
}

variable "availability_zones" {
  description = "Availability zones for the public subnets"
  type        = list(string)
  default     = ["eu-central-1a", "eu-central-1b"]
}

variable "vpc_cidr_block" {
  description = "CIDR block for the application VPC"
  type        = string
  default     = "10.0.0.0/16"
}
