# Portfolio Build Plan

## Goal
Create a reusable, responsive personal portfolio at `/` inspired by the supplied portfolio reference: a clean editorial layout with animated meteors, a polished loading intro, theme switching, and scroll-led section transitions.

## Experience
- Add a short branded loader before revealing the portfolio.
- Build a sticky, compact navigation with section links and a light/dark theme control.
- Create a hero with editable identity copy, role line, portrait treatment, and primary contact/resume actions.
- Add About, Work Experience, Technologies & Skills, Projects, Hackathons, Awards, and contact/footer sections with reusable data arrays so content can be swapped later.
- Use project cards, an experience timeline, hackathon updates, and award cards with restrained motion and clear touch targets.
- Add a responsive mobile navigation and preserve readable spacing at narrow widths.

## Visual Direction
- Bright paper-like daytime mode and an ink-dark night mode.
- Sparse diagonal meteor streaks as a background layer, with small mint/cyan accents and warm yellow highlights.
- Bold black display headings, neutral body copy, thin borders, compact pill labels, and soft elevated project media frames.
- Motion is purposeful: loader progress, section reveal, hover lift, card tilt/shine, and theme transition; respect reduced-motion preferences.

## Technical Details
- Keep the existing TanStack Start route structure and rewrite `src/routes/index.tsx`.
- Define all colors, typography, shadows, radii, and animation tokens in `src/styles.css`.
- Use Lucide icons already available through the existing dependency set; use semantic buttons and accessible labels.
- Avoid backend work; all portfolio content is local, organized in editable arrays near the page component.
- Add route-specific metadata for the portfolio page and update root metadata away from template placeholders.
- Verify the finished page at desktop and mobile widths and check console/build output.
