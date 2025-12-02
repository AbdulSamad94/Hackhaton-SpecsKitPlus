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
            Master Next.js
          </Heading>
          <p className={styles.heroSubtitle}>
            The complete guide to building modern, production-ready applications with React and Next.js. Learn from zero
            to hero with comprehensive tutorials, best practices, and real-world examples.
          </p>
          <div className={styles.heroButtons}>
            <Link className={clsx("button button--primary", styles.buttonLarge)} to="/docs/introduction/what-is-nextjs">
              Start Learning
            </Link>
            <Link className={clsx("button button--secondary", styles.buttonLarge)} to="/docs">
              View All Docs
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
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Comprehensive Chapters</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>200+</div>
            <div className={styles.statLabel}>Code Examples</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Open Source</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>Latest</div>
            <div className={styles.statLabel}>Next.js 15 Ready</div>
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
      title: "From Zero to Hero",
      description:
        "Start with the fundamentals and progress through advanced concepts. Perfect for beginners and intermediate developers alike.",
      icon: "🚀",
    },
    {
      title: "Modern Stack",
      description:
        "Learn the latest Next.js features: App Router, Server Components, Edge Functions, and optimized performance patterns.",
      icon: "⚡",
    },
    {
      title: "Production Ready",
      description:
        "Real-world best practices for performance, SEO, security, and deployment to Vercel and other platforms.",
      icon: "🎯",
    },
    {
      title: "Hands-On Examples",
      description: "Build real projects: authentication systems, e-commerce sites, AI apps, databases, and more.",
      icon: "💻",
    },
    {
      title: "Community Driven",
      description:
        "Join thousands of developers learning Next.js. Share your progress and help others in the community.",
      icon: "👥",
    },
    {
      title: "Always Updated",
      description: "Keep up with the latest Next.js releases and best practices. New content added regularly.",
      icon: "📚",
    },
  ]

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Why Learn with This Guide?</Heading>
          <p>Everything you need to become a Next.js expert</p>
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
      level: "Beginner",
      topics: ["What is Next.js?", "Installation & Setup", "Pages & Routing", "Basic Components"],

    },
    {
      level: "Intermediate",
      topics: ["App Router", "Server Components", "Data Fetching", "Styling & CSS"],
      
    },
    {
      level: "Advanced",
      topics: ["Performance Optimization", "Edge Functions", "API Routes", "Deployment"],
      
    },
  ]

  return (
    <section className={styles.pathSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Your Learning Journey</Heading>
          <p>Progress through structured levels at your own pace</p>
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
          <Heading as="h2">Ready to Master Next.js?</Heading>
          <p>Join developers worldwide who are building amazing applications with Next.js. Start your journey today.</p>
          <Link className={clsx("button button--primary", styles.buttonLarge)} to="/docs/introduction/what-is-nextjs">
            Begin Your Learning Journey
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
      title="Master Next.js - Complete Learning Guide"
      description="The complete guide to mastering Next.js. Learn from basics to production-ready applications."
    >
      <HomepageHeader />
      <StatsSection />
      <HomepageFeatures />
      <LearningPath />
      <CallToAction />
    </Layout>
  )
}
