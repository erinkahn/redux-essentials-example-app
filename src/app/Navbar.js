import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Social App</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
