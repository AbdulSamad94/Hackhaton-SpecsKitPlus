import type { ReactNode } from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import Heading from "@theme/Heading"
import styles from "./index.module.css"


// Hero Section
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>
            {siteConfig.tagline}
          </p>
          <div className={styles.heroButtons}>
            <Link className={clsx("button button--primary", styles.buttonLarge)} to="/docs/intro">
              Start Learning
            </Link>
            <Link className={clsx("button button--secondary", styles.buttonLarge)} to="/docs/modules/module1-ros2/chapter1">
              View Modules
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

// Quick Stats Section
function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>4</div>
            <div className={styles.statLabel}>Core Modules</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>5+</div>
            <div className={styles.statLabel}>Hands-on Labs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>1</div>
            <div className={styles.statLabel}>Capstone Project</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Open Source</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section
function Feature({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  )
}

function HomepageFeatures() {
  const features = [
    {
      title: "ROS 2 Humble",
      description:
        "Master the industry-standard middleware. Learn nodes, topics, actions, and lifecycle management for robust robot control.",
      icon: "🤖",
    },
    {
      title: "Simulation First",
      description:
        "Test safely in Gazebo Fortress and Unity. Bridge the Sim-to-Real gap with high-fidelity physics and rendering.",
      icon: "🎮",
    },
    {
      title: "NVIDIA Isaac Ecosystem",
      description:
        "Leverage Isaac Sim for photorealistic environments and Isaac Gym for massively parallel reinforcement learning.",
      icon: "🚀",
    },
    {
      title: "Vision-Language-Action",
      description: "Integrate VLA models like RT-2 and PaLM-E. Give your robot the ability to understand natural language and reason.",
      icon: "🧠",
    },
    {
      title: "Real Hardware",
      description:
        "Deploy to NVIDIA Jetson Orin. Work with RealSense cameras, LiDARs, and IMUs on physical humanoid platforms.",
      icon: "🔌",
    },
    {
      title: "Capstone Project",
      description: "Build a complete Autonomous Humanoid with Conversational AI. From URDF to Navigation to Chat Interface.",
      icon: "🎓",
    },
  ]

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Why This Course?</Heading>
          <p>The comprehensive path to becoming a Physical AI Engineer</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Learning Path Section
function LearningPath() {
  const paths = [
    {
      level: "Module 1: Foundations",
      topics: ["ROS 2 Basics", "Nodes & Topics", "Launch Files", "URDF Description"]

    },
    {
      level: "Module 2 & 3: Simulation",
      topics: ["Gazebo Fortress", "Unity HRI", "Isaac Sim", "Visual SLAM"]
      
    },
    {
      level: "Module 4: Intelligence",
      topics: ["VLA Models", "Whisper Integration", "Cognitive Planning", "Sim-to-Real"]
      
    }
  ]

  return (
    <section className={styles.pathSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Your Learning Journey</Heading>
          <p>Structured modules to take you from Zero to Hero</p>
        </div>
        <div className={styles.pathGrid}>
          {paths.map((path, idx) => (
            <div key={idx} className={styles.pathCard}>
              <Heading as="h3">{path.level}</Heading>
              <ul className={styles.pathTopics}>
                {path.topics.map((topic, tidx) => (
                  <li key={tidx}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2">Ready to Build the Future?</Heading>
          <p>Join the revolution of Embodied Intelligence. Start building your autonomous humanoid today.</p>
          <Link className={clsx("button button--primary", styles.buttonLarge)} to="/docs/intro">
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="The complete guide to Physical AI & Humanoid Robotics."
    >
      <HomepageHeader />
      <StatsSection />
      <HomepageFeatures />
      <LearningPath />
      <CallToAction />
    </Layout>
  )
}
