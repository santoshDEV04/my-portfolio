import { useEffect, useRef, useCallback } from "react";

export const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef();
  const lastSpawnTime = useRef(0);
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Enhanced Particle class (same as your original)
  class Particle {
    constructor(canvas, x, y, options = {}) {
      this.canvas = canvas;
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.originalX = this.x;
      this.originalY = this.y;

      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;

      this.opacity = Math.random() * 0.6 + 0.4;
      this.originalOpacity = this.opacity;
      this.maxOpacity = 1;

      this.size = Math.random() * 2 + 2;
      this.originalSize = this.size;
      this.maxSize = this.size * 8;

      this.life = 1;
      this.maxLife = options.temporary ? 100 + Math.random() * 100 : Infinity;
      this.isTemporary = options.temporary || false;

      this.hue = Math.random() * 60 + 200; // Blue to purple range
      this.color = `hsl(${this.hue}, 70%, 60%)`;

      this.magneticForce = 0;
      this.repulsionForce = 0;
      this.trail = [];
      this.maxTrailLength = 8;

      // Floating motion
      this.angle = Math.random() * Math.PI * 2;
      this.floatSpeed = 0.02 + Math.random() * 0.2;
      this.floatRadius = 0.5 + Math.random() * 1;
    }

    update(mouse, mouseVel) {
      // Calculate mouse interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Different interaction zones
      const attractionRadius = 300;
      const repulsionRadius = 30;
      const explosionRadius = 30;

      let forceX = 0;
      let forceY = 0;

      if (distance < attractionRadius && distance > repulsionRadius) {
        // Attraction zone
        if (distance < 20) {
          const stickStrength = 0.15;
          this.vx += dx * stickStrength;
          this.vy += dy * stickStrength;
        }

        // Orbiting effect
        if (distance < 70) {
          const orbitStrength = ((60 - distance) / 60) * 1;
          const angle = Math.atan2(dy, dx);
          this.vx += -Math.sin(angle) * orbitStrength;
          this.vy += Math.cos(angle) * orbitStrength;
        }

        const attractionForce =
          ((attractionRadius - distance) / attractionRadius) * 0.01;
        const angle = Math.atan2(dy, dx);
        forceX += Math.cos(angle) * attractionForce;
        forceY += Math.sin(angle) * attractionForce;
        this.magneticForce = attractionForce;

        // Visual feedback
        this.size = this.originalSize + attractionForce * 20;
        this.opacity = Math.min(
          this.maxOpacity,
          this.originalOpacity + attractionForce * 3
        );
      } else if (distance < repulsionRadius) {
        // Repulsion zone
        const repulsionForce =
          ((repulsionRadius - distance) / repulsionRadius) * 3;
        const angle = Math.atan2(dy, dx);
        forceX -= Math.cos(angle) * repulsionForce;
        forceY -= Math.sin(angle) * repulsionForce;
        this.repulsionForce = repulsionForce;

        // Dramatic visual
        this.size = this.originalSize + repulsionForce * 40;
        this.opacity = Math.min(
          this.maxOpacity,
          this.originalOpacity + repulsionForce * 3
        );
        this.hue = (this.hue + repulsionForce * 50) % 360;

        if (distance < explosionRadius) {
          // Explosion effect
          const explosionForce =
            ((explosionRadius - distance) / explosionRadius) * 0.2;
          forceX -= Math.cos(angle) * explosionForce;
          forceY -= Math.sin(angle) * explosionForce;
          this.size = Math.min(
            this.maxSize,
            this.originalSize + explosionForce * 80
          );
          this.opacity = this.maxOpacity;
        }
      } else {
        // Return to normal
        this.size += (this.originalSize - this.size) * 0.1;
        this.opacity += (this.originalOpacity - this.opacity) * 0.1;
        this.magneticForce *= 0.95;
        this.repulsionForce *= 0.95;
      }

      // Apply mouse velocity influence
      const velocityInfluence = Math.min(
        1,
        Math.sqrt(mouseVel.x * mouseVel.x + mouseVel.y * mouseVel.y) / 20
      );
      if (distance < 100) {
        forceX += mouseVel.x * 0.001 * velocityInfluence;
        forceY += mouseVel.y * 0.001 * velocityInfluence;
      }

      // Apply forces
      this.vx += forceX;
      this.vy += forceY;

      // Floating motion
      this.angle += this.floatSpeed;
      this.vx += Math.cos(this.angle) * 0.001;
      this.vy += Math.sin(this.angle) * 0.001;

      // Update position
      this.x += this.vx;
      this.y += this.vy;

      // Add to trail
      this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
      if (this.trail.length > this.maxTrailLength) {
        this.trail.shift();
      }

      // Apply friction
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Boundary handling with wrapping
      if (this.x < -10) this.x = this.canvas.width + 10;
      if (this.x > this.canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = this.canvas.height + 10;
      if (this.y > this.canvas.height + 10) this.y = -10;

      // Handle temporary particles
      if (this.isTemporary) {
        this.life--;
        if (this.life <= 0) {
          return false; // Mark for removal
        }
        if (this.life < 30) {
          this.opacity *= 0.95; // Fade out
        }
      }

      return true; // Keep particle
    }

    draw(ctx) {
      // Draw trail
      this.trail.forEach((point, index) => {
        const trailOpacity = point.opacity * (index / this.trail.length) * 0.3;
        if (trailOpacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, this.originalSize * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Draw main particle
      ctx.save();
      ctx.globalAlpha = this.opacity;

      // Create dynamic gradient based on forces
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size * 2
      );

      // Color based on interaction
      let color1 = `hsl(${this.hue}, 80%, 70%)`;
      let color2 = `hsl(${(this.hue + 30) % 360}, 60%, 50%)`;

      if (this.repulsionForce > 0.1) {
        color1 = `hsl(${(this.hue + 180) % 360}, 100%, 80%)`;
        color2 = `hsl(${(this.hue + 210) % 360}, 80%, 60%)`;
      } else if (this.magneticForce > 0.001) {
        color1 = `hsl(${this.hue}, 90%, 80%)`;
        color2 = `hsl(${(this.hue + 60) % 360}, 70%, 60%)`;
      }

      gradient.addColorStop(0, color1);
      gradient.addColorStop(0.4, color2);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Add glow effect for high-energy particles
      if (this.repulsionForce > 0.05 || this.magneticForce > 0.005) {
        ctx.shadowBlur = this.size * 10;
        ctx.shadowColor = color1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Auto-spawn particles based on mouse movement
  const spawnParticles = useCallback((mouse, mouseVel, currentTime) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const speed = Math.sqrt(mouseVel.x * mouseVel.x + mouseVel.y * mouseVel.y);
    const shouldSpawn = speed > 2 && currentTime - lastSpawnTime.current > 50;

    if (shouldSpawn) {
      // Spawn particles around mouse cursor
      const numParticles = Math.min(3, Math.floor(speed / 5));
      for (let i = 0; i < numParticles; i++) {
        const angle = (Math.PI * 2 * i) / numParticles + Math.random() * 0.5;
        const distance = 20 + Math.random() * 30;
        const x = mouse.x + Math.cos(angle) * distance;
        const y = mouse.y + Math.sin(angle) * distance;

        particlesRef.current.push(
          new Particle(canvas, x, y, { temporary: true })
        );
      }
      lastSpawnTime.current = currentTime;
    }

    // Maintain particle count by adding new permanent particles
    const permanentParticles = particlesRef.current.filter(
      (p) => !p.isTemporary
    );
    const targetCount = Math.min(
      120,
      Math.floor((canvas.width * canvas.height) / 10000)
    );

    if (permanentParticles.length < targetCount) {
      particlesRef.current.push(new Particle(canvas));
    }
  }, []);

  // Initialize particles
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particleCount = Math.min(
      150,
      Math.floor((canvas.width * canvas.height) / 8000)
    );
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas));
    }
  }, []);

  // Enhanced animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const currentTime = Date.now();

    // Calculate mouse velocity
    const mouseVel = {
      x: mouseRef.current.x - lastMousePos.current.x,
      y: mouseRef.current.y - lastMousePos.current.y,
    };
    mouseVelocity.current = mouseVel;
    lastMousePos.current = { ...mouseRef.current };

    // Clear canvas with subtle fade effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn new particles
    spawnParticles(mouseRef.current, mouseVel, currentTime);

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((particle) => {
      const shouldKeep = particle.update(mouseRef.current, mouseVel);
      if (shouldKeep) {
        particle.draw(ctx);
      }
      return shouldKeep;
    });

    // Draw enhanced
    particlesRef.current.forEach((particle, i) => {
      particlesRef.current.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 120;

        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance;
          const opacity = strength * 0.4;

          // Dynamic connection color based on particle energy
          const avgHue = (particle.hue + otherParticle.hue) / 2;
          const connectionColor = `hsl(${avgHue}, 70%, 60%)`;

          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = connectionColor;
          ctx.lineWidth = strength * 2;

          // Add glow to connections
          if (strength > 0.7) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = connectionColor;
          }

          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [spawnParticles]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = Math.max(
      document.documentElement.scrollHeight,
      window.innerHeight
    ); // Ensure it covers viewport at minimum
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to cover entire document
    canvas.width = window.innerWidth;
    canvas.height = Math.max(
      document.documentElement.scrollHeight,
      window.innerHeight
    );

    // Initialize particles
    initParticles();

    // Start animation
    animate();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Enhanced mouse tracking - IMPORTANT: No longer using pointer-events: none
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    // Click to create particle burst
    const handleClick = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const numParticles = 8;
      for (let i = 0; i < numParticles; i++) {
        const angle = (Math.PI * 2 * i) / numParticles;
        const distance = 30 + Math.random() * 50;
        const x = e.clientX + Math.cos(angle) * distance;
        const y = e.clientY + window.scrollY + Math.sin(angle) * distance;

        particlesRef.current.push(
          new Particle(canvas, x, y, { temporary: true })
        );
      }
    };

    // Handle scroll to update mouse position and canvas height
    const handleScroll = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Update canvas height if document height changed
      const newHeight = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      if (canvas.height !== newHeight) {
        canvas.height = newHeight;
      }
    };

    // Use document for global mouse tracking
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, handleResize, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        background: '#000000'
      }}
    />
  );
};