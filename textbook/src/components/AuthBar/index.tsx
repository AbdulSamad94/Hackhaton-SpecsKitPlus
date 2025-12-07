"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./user-profile-dropdown.module.css"

interface User {
  id: string
  name: string
  email: string
  image?: string
}

export default function UserProfileDropdown() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    // Fetch session from Next.js API
    fetch("/api/auth/session", { credentials: "include", signal })
      .then((res) => res.json())
      .then((data) => {
        if (!signal.aborted && data.session && data.user) {
          setUser(data.user)
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err)
        }
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDropdownOpen) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isDropdownOpen])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        credentials: "include",
      })
      setUser(null)
      setIsDropdownOpen(false)
      window.location.reload()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton} />
      </div>
    )
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <a href="/login" className={styles.loginButton}>
          Login
        </a>
      </div>
    )
  }

  return (
    <div className={styles.profileWrapper}>
      <button
        ref={triggerRef}
        className={styles.profileTrigger}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label="User profile menu"
        aria-expanded={isDropdownOpen}
      >
        {user.image ? (
          <img src={user.image || "/placeholder.svg"} alt={user.name} className={styles.profileImage} />
        ) : (
          <div className={styles.profileAvatar}>
            {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </button>

      <div ref={dropdownRef} className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.isOpen : ""}`} role="menu">
        <div className={styles.dropdownHeader}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user.name || "User"}</div>
            <div className={styles.userEmail}>{user.email}</div>
          </div>
          <button className={styles.closeButton} onClick={() => setIsDropdownOpen(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            </svg>
          </button>
        </div>

        <div className={styles.dropdownDivider} />

        <div className={styles.dropdownContent} role="menuitem">
          <a href="/profile" className={styles.menuLink}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span>My Profile</span>
          </a>
          <button className={styles.menuLink} onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {isDropdownOpen && (
        <div className={styles.backdrop} onClick={() => setIsDropdownOpen(false)} aria-hidden="true" />
      )}
    </div>
  )
}
