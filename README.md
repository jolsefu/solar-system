# A-Frame Solar System Experience

An immersive journey through our solar system, bringing space exploration to your browser through interactive 3D environments and educational content.

## Creator

**Jules Leo Reserva** - *Solo Developer*

## Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- Modern web browser with WebGL support (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jolsefu/solar-system.git
   cd solar-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or another port if 5173 is in use)

## Project Story

This project was born from a vision to make space education accessible and engaging for everyone. Traditional astronomy education often relies on static images and textbooks, creating a disconnect between learners and the cosmic wonders they're studying.

**The Problem:** Space is vast, three-dimensional, and dynamic—but most educational materials present it in flat, lifeless formats. Students struggle to grasp planetary scales, orbital mechanics, and the unique characteristics of each celestial body.

**The Solution:** A fully interactive 3D solar system that you can explore from any device (mainly PC) with a web browser. No expensive equipment, no downloads—just point, click, and start your journey through space.

### Project Vision

- **Democratizes space education** by making it freely accessible to anyone with internet
- **Brings planets to life** through immersive VR environments that simulate actual planetary atmospheres
- **Engages multiple learning styles** with visual exploration, audio narration, and interactive controls
- **Inspires curiosity** about our cosmic neighborhood

### What Makes This Special

Unlike traditional planetarium software or static educational websites, our Solar System VR Experience:
- Runs entirely in the browser with no plugins or installations required
- Provides **planet-specific environments** where you can "stand" on Mercury's cratered surface, float through Jupiter's gaseous atmosphere, or experience Venus's thick toxic clouds
- Combines **accurate astronomical data** with artistic interpretation to create both educational and beautiful experiences
- Features **voice narration** for each planet, making it accessible to visual and audio learners

## Concept & Features

### Core Experience
- **Interactive Solar System View**: Explore all 8 planets orbiting the Sun with realistic relative positioning
- **Immersive Planet Environments**: Visit each planet through dedicated VR environments that simulate:
  - Rocky planetary surfaces (Mercury, Venus, Earth, Mars)
  - Gas giant atmospheres (Jupiter, Saturn)
  - Ice giant environments (Uranus, Neptune)
- **Educational Audio**: Voice-over narration for each planet explaining fascinating facts
- **Dynamic Camera System**: Multiple viewing angles and planet tracking

##  Development Stack

### Frontend Framework
- **A-Frame 1.7.1**: WebVR framework built on Three.js for creating immersive 3D/VR experiences
- **Three.js**: 3D graphics library (via A-Frame)
- **Vite 7.1.9**: Fast build tool and development server with ES module support
- **GSAP 3.13.0**: Animation library for smooth camera transitions

### UI & Styling
- **NES.css**: Retro NES-style CSS framework for the nostalgic 8-bit aesthetic
- **Custom CSS**: Planet-specific styling and responsive layouts

### A-Frame Components & Plugins

#### Custom & Modified
- **aframe-star-system-component**: Particle-based star field generator (converted to ES module, fixed Three.js deprecations)
- **aframe-html-shader**: HTML content rendering in VR (forked patch for THREE.MathUtils compatibility)

#### Community Components
- **aframe-atoll-terrain**: Procedural terrain generation for planetary surfaces
- **aframe-simple-sun-sky**: Dynamic sky and sun rendering with atmospheric effects
- **aframe-fix-fog**: Fog rendering fixes for better atmospheric effects

### Audio
- Planet voiceover narrations (MP3 format)

## Acknowledgments

- **Background music**: "Outer Space Church on Space" by Jon Gegelman
- **NASA**: Planetary texture maps and reference materials
- **A-Frame Community**: Excellent VR framework and ecosystem
- **Component Authors**:
  - Doug Reeder (aframe-atoll-terrain, aframe-simple-sun-sky)
  - handeyeco (aframe-star-system-component)
- **Educational Resources**: Various astronomy resources for accurate planetary descriptions
