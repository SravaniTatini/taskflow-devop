resource "aws_instance" "jenkins" {

  ami           = "ami-02dfbd4ff395f2a1b"
  instance_type = var.instance_type

  key_name = var.key_name

  security_groups = [
    aws_security_group.jenkins_sg.name
  ]

  tags = {
    Name = "taskflow-jenkins"
  }

}