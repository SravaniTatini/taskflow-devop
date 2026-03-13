variable "instance_type" {
  default = "t3.medium"
}

variable "key_name" {
  description = "AWS key pair"
}

variable "region" {
  default = "us-east-1"
}