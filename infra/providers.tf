# -----------------------------------------------------------------------------
# Terraform & AWS Provider configuration
# -----------------------------------------------------------------------------

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # NOTE: For a team/enterprise workflow, replace local state with a remote
  # backend (S3 + DynamoDB locking) once the bootstrap resources exist.
  # backend "s3" {
  #   bucket         = "<your-terraform-state-bucket>"
  #   key            = "nextjs-cloud-catalog/terraform.tfstate"
  #   region         = "eu-central-1"
  #   dynamodb_table = "<your-lock-table>"
  # }
}

provider "aws" {
  region = var.aws_region
}
