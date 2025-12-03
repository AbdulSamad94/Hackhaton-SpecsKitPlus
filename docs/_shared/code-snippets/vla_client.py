import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import openai


class VLAClient(Node):
    def __init__(self):
        super().__init__("vla_client")
        self.publisher_ = self.create_publisher(String, "robot_command", 10)
        openai.api_key = os.getenv("OPENAI_API_KEY")

    def chat(self, user_input):
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are a robot. Output only commands: MOVE_FORWARD, TURN_LEFT, STOP.",
                },
                {"role": "user", "content": user_input},
            ],
        )
        command = response.choices[0].message.content
        self.get_logger().info(f"Command: {command}")
        self.publisher_.publish(String(data=command))


def main():
    rclpy.init()
    node = VLAClient()
    node.chat("Go forward")
    rclpy.shutdown()
