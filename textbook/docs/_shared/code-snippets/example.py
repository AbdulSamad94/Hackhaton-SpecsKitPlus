import rclpy
from rclpy.node import Node

class HumanoidNode(Node):
    def __init__(self):
        super().__init__('humanoid_node')
        self.get_logger().info('Humanoid Node Started')

def main(args=None):
    rclpy.init(args=args)
    node = HumanoidNode()
    rclpy.spin(node)
    rclpy.shutdown()

if __name__ == '__main__':
    main()