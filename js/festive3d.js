/**
 * The Crochet Boutique - Ultra-Premium 3D Festive Animation Engine
 * Real-time 3D Perspective Projection Engine for HTML5 Canvas
 * Strictly Confined to the Top Hero Section • Catalog & Products Remain 100% Clean & Clear
 * Zero dependencies • 60 FPS • Multi-Layered 3D Models • Interactive Magic Cursor Trail
 * Themes: Christmas, Diwali, New Year, Holi, Eid-ul-Fitr, Eid-ul-Adha, Classic
 */

(function () {
  "use strict";

  const FOV = 600; // 3D Camera Field of View
  let canvas, ctx;
  let width = window.innerWidth;
  let height = 650; // Confined to hero section height
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let activeTheme = "default";
  let isEnabled = true;
  let intensity = "normal"; // 'subtle', 'normal', 'grand'
  let animFrameId = null;

  // 3D Camera & Parallax state (local to hero)
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 0;
  let camX = 0;
  let camY = 0;

  // Interactive Cursor Trail Particles (in hero)
  const cursorTrail = [];
  let lastTrailTime = 0;

  // 3D Objects Pool
  const objects3D = [];
  const burstParticles = [];

  // 3D Perspective Projection Math
  function project3D(x, y, z) {
    const scale = FOV / (FOV + z);
    const px = (width / 2) + (x - camX) * scale;
    const py = (height / 2) + (y - camY) * scale;
    return { px, py, scale };
  }

  // ==========================================================================
  // 3D OBJECT CLASSES (Bounded strictly to Hero Top Section)
  // ==========================================================================

  /**
   * 1. 3D Dendrite Snowflake (Christmas)
   * Tumbling with 3D pitch/yaw/roll within the hero section
   */
  class Snowflake3D {
    constructor(randomZ = true) {
      this.reset(randomZ);
    }
    reset(randomZ = false) {
      this.x = (Math.random() - 0.5) * width * 1.6;
      this.y = -height * 0.55 - Math.random() * 80;
      this.z = randomZ ? Math.random() * 800 : Math.random() * 300 + 400;
      this.vy = 1.1 + Math.random() * 1.5;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vz = (Math.random() - 0.5) * 0.3;
      this.radius = 12 + Math.random() * 16;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.vRotX = (Math.random() - 0.5) * 0.02;
      this.vRotY = (Math.random() - 0.5) * 0.03;
      this.vRotZ = (Math.random() - 0.5) * 0.02;
      this.opacity = 0.55 + Math.random() * 0.4;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;
      this.rotX += this.vRotX;
      this.rotY += this.vRotY;
      this.rotZ += this.vRotZ;

      if (this.y > height * 0.55) {
        this.reset();
      }
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const r = this.radius * p.scale;
      if (r < 1.5) return;

      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.rotate(this.rotZ);
      ctx.scale(Math.cos(this.rotY), Math.cos(this.rotX));

      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.lineWidth = Math.max(1, 1.8 * p.scale);
      ctx.shadowColor = "rgba(196, 30, 58, 0.4)";
      ctx.shadowBlur = 8 * p.scale;

      // Draw 6 symmetrical arms with sub-branches
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        // Outer twigs
        ctx.moveTo(0, -r * 0.45);
        ctx.lineTo(-r * 0.22, -r * 0.62);
        ctx.moveTo(0, -r * 0.45);
        ctx.lineTo(r * 0.22, -r * 0.62);
        // Inner twigs
        ctx.moveTo(0, -r * 0.72);
        ctx.lineTo(-r * 0.18, -r * 0.88);
        ctx.moveTo(0, -r * 0.72);
        ctx.lineTo(r * 0.18, -r * 0.88);
        ctx.stroke();
        ctx.restore();
      }

      // Center crystalline core
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * 2. 3D Christmas Bauble Ornament
   * Shaded metallic sphere with specular gloss, gold cap & swaying pendulum physics in Hero
   */
  class ChristmasBauble3D {
    constructor(x, y, z, colorType = "ruby") {
      this.originX = x;
      this.originY = y;
      this.z = z;
      this.colorType = colorType; // 'ruby' or 'gold'
      this.radius = 30 + Math.random() * 14;
      this.angle = (Math.random() - 0.5) * 0.5;
      this.vAngle = (Math.random() - 0.5) * 0.015;
    }
    update() {
      this.angle += this.vAngle;
      if (Math.abs(this.angle) > 0.32) {
        this.vAngle *= -1;
      }
      this.x = this.originX + Math.sin(this.angle) * 30;
      this.y = this.originY + Math.cos(this.angle) * 12;
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const r = this.radius * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);

      // Hanging cord
      ctx.beginPath();
      ctx.moveTo(0, -r - 10 * p.scale);
      ctx.lineTo(0, -r - 120 * p.scale);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Golden Cap
      ctx.fillStyle = "#D4AF37";
      ctx.fillRect(-6 * p.scale, -r - 8 * p.scale, 12 * p.scale, 8 * p.scale);

      // Shaded 3D Sphere with Specular Radial Gradient
      const grad = ctx.createRadialGradient(
        -r * 0.35, -r * 0.35, r * 0.08,
        0, 0, r
      );
      if (this.colorType === "ruby") {
        grad.addColorStop(0, "#FFA3B3");
        grad.addColorStop(0.3, "#C41E3A");
        grad.addColorStop(0.75, "#800F21");
        grad.addColorStop(1, "#36020A");
      } else {
        grad.addColorStop(0, "#FFFBE0");
        grad.addColorStop(0.3, "#F4C430");
        grad.addColorStop(0.75, "#B8860B");
        grad.addColorStop(1, "#4E3800");
      }

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowColor = this.colorType === "ruby" ? "rgba(196, 30, 58, 0.5)" : "rgba(244, 196, 48, 0.5)";
      ctx.shadowBlur = 18 * p.scale;
      ctx.fill();

      // Specular highlight spot
      ctx.beginPath();
      ctx.arc(-r * 0.32, -r * 0.35, r * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * 3. 3D Golden Holiday Bell (Christmas)
   * Shaded brass holiday bell swinging in Hero top section
   */
  class HolidayBell3D {
    constructor(x, y, z) {
      this.originX = x;
      this.originY = y;
      this.z = z;
      this.angle = (Math.random() - 0.5) * 0.4;
      this.vAngle = (Math.random() - 0.5) * 0.016;
      this.size = 26;
    }
    update() {
      this.angle += this.vAngle;
      if (Math.abs(this.angle) > 0.35) this.vAngle *= -1;
      this.x = this.originX + Math.sin(this.angle) * 26;
      this.y = this.originY + Math.cos(this.angle) * 10;
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const s = this.size * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.rotate(this.angle);

      // Hanging red ribbon
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(0, -s * 2.5);
      ctx.strokeStyle = "#C41E3A";
      ctx.lineWidth = 2 * p.scale;
      ctx.stroke();

      // Bell Body
      ctx.beginPath();
      ctx.moveTo(-s * 0.2, -s * 0.7);
      ctx.quadraticCurveTo(-s * 0.25, -s * 0.2, -s * 0.8, s * 0.4);
      ctx.lineTo(s * 0.8, s * 0.4);
      ctx.quadraticCurveTo(s * 0.25, -s * 0.2, s * 0.2, -s * 0.7);
      ctx.closePath();

      const bellGrad = ctx.createLinearGradient(-s, -s, s, s);
      bellGrad.addColorStop(0, "#FFF7D1");
      bellGrad.addColorStop(0.35, "#FFD700");
      bellGrad.addColorStop(0.75, "#B8860B");
      bellGrad.addColorStop(1, "#594000");

      ctx.fillStyle = bellGrad;
      ctx.shadowColor = "rgba(255, 215, 0, 0.4)";
      ctx.shadowBlur = 12 * p.scale;
      ctx.fill();

      // Bell Lip Rim
      ctx.beginPath();
      ctx.ellipse(0, s * 0.4, s * 0.82, s * 0.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#FFDF00";
      ctx.fill();
      ctx.strokeStyle = "#8C6A0A";
      ctx.lineWidth = 1.5 * p.scale;
      ctx.stroke();

      // Clapper
      ctx.beginPath();
      ctx.arc(Math.sin(-this.angle) * (s * 0.28), s * 0.52, s * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = "#C41E3A";
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * 4. 3D Glowing Diya (Diwali)
   * Clay lamp with animated flickering flame floating gently within the Hero top section
   */
  class Diya3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 0.95;
      this.y = (Math.random() - 0.5) * height * 0.8;
      this.z = Math.random() * 550 + 200;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = -0.22 - Math.random() * 0.35;
      this.radius = 24 + Math.random() * 12;
      this.rotY = Math.random() * Math.PI * 2;
      this.vRotY = (Math.random() - 0.5) * 0.015;
      this.flameFlicker = Math.random() * 10;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotY += this.vRotY;
      this.flameFlicker += 0.28;

      if (this.y < -height * 0.48) {
        this.y = height * 0.48;
        this.x = (Math.random() - 0.5) * width * 0.95;
      }
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const r = this.radius * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.scale(Math.cos(this.rotY) * 0.3 + 0.85, 1);

      // 1. Ambient Golden Halo Glow
      const haloGrad = ctx.createRadialGradient(0, -r * 0.4, r * 0.2, 0, -r * 0.4, r * 2.4);
      haloGrad.addColorStop(0, "rgba(255, 215, 64, 0.42)");
      haloGrad.addColorStop(0.5, "rgba(255, 111, 0, 0.16)");
      haloGrad.addColorStop(1, "rgba(255, 111, 0, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(0, -r * 0.4, r * 2.4, 0, Math.PI * 2);
      ctx.fill();

      // 2. Terracotta Clay Bowl
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.48, 0, 0, Math.PI);
      ctx.fillStyle = "#A8411D";
      ctx.fill();
      ctx.strokeStyle = "#F28C38";
      ctx.lineWidth = 1.5 * p.scale;
      ctx.stroke();

      // Inner rim
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.05, r * 0.9, r * 0.36, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#6B230B";
      ctx.fill();

      // Ghee shimmer
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.02, r * 0.75, r * 0.26, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.fill();

      // 3. 2-Tone Flickering Flame
      const fHeight = (r * 1.3) + Math.sin(this.flameFlicker) * (4 * p.scale);
      const fWidth = (r * 0.42) + Math.cos(this.flameFlicker * 1.5) * (2 * p.scale);

      ctx.save();
      ctx.translate(0, -r * 0.12);
      const flameGrad = ctx.createLinearGradient(0, -fHeight, 0, 0);
      flameGrad.addColorStop(0, "#FFFFF0");
      flameGrad.addColorStop(0.3, "#FFD700");
      flameGrad.addColorStop(0.7, "#FF5722");
      flameGrad.addColorStop(1, "#D84315");

      ctx.beginPath();
      ctx.moveTo(-fWidth, 0);
      ctx.quadraticCurveTo(-fWidth * 0.8, -fHeight * 0.6, 0, -fHeight);
      ctx.quadraticCurveTo(fWidth * 0.8, -fHeight * 0.6, fWidth, 0);
      ctx.closePath();
      ctx.fillStyle = flameGrad;
      ctx.shadowColor = "#FFD700";
      ctx.shadowBlur = 16 * p.scale;
      ctx.fill();

      // Inner core
      ctx.beginPath();
      ctx.ellipse(0, -fHeight * 0.18, fWidth * 0.3, fHeight * 0.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(68, 138, 255, 0.65)";
      ctx.fill();
      ctx.restore();

      ctx.restore();
    }
  }

  /**
   * 5. 3D Akash Kandil / Sky Lantern (Diwali)
   * Floating inside Hero top section
   */
  class AkashKandil3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.vy = -0.5 - Math.random() * 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.size = 28 + Math.random() * 10;
      this.rotY = Math.random() * Math.PI * 2;
      this.vRotY = 0.012;
      this.flutter = Math.random() * 10;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotY += this.vRotY;
      this.flutter += 0.2;
      if (this.y < -height * 0.48) {
        this.y = height * 0.48;
        this.x = (Math.random() - 0.5) * width * 0.9;
      }
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const s = this.size * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.scale(Math.cos(this.rotY) * 0.3 + 0.85, 1);

      // Warm Inner Glow
      const glow = ctx.createRadialGradient(0, 0, s * 0.2, 0, 0, s * 2.2);
      glow.addColorStop(0, "rgba(255, 193, 7, 0.45)");
      glow.addColorStop(0.5, "rgba(255, 87, 34, 0.18)");
      glow.addColorStop(1, "rgba(255, 87, 34, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, s * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Diamond Body
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.8);
      ctx.lineTo(s * 0.7, 0);
      ctx.lineTo(0, s * 0.8);
      ctx.lineTo(-s * 0.7, 0);
      ctx.closePath();

      const kandilGrad = ctx.createLinearGradient(0, -s, 0, s);
      kandilGrad.addColorStop(0, "#FFD54F");
      kandilGrad.addColorStop(0.5, "#FF6F00");
      kandilGrad.addColorStop(1, "#880E4F");

      ctx.fillStyle = kandilGrad;
      ctx.shadowColor = "#FFD54F";
      ctx.shadowBlur = 14 * p.scale;
      ctx.fill();

      // Tassels
      for (let i = -2; i <= 2; i++) {
        const tx = (i * s * 0.2);
        const sway = Math.sin(this.flutter + i) * (4 * p.scale);
        ctx.beginPath();
        ctx.moveTo(tx, s * 0.7);
        ctx.quadraticCurveTo(tx + sway, s * 1.1, tx + sway * 1.4, s * 1.6);
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 1.5 * p.scale;
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  /**
   * 6. 3D Tumbling Rangoli & Flower Petals (Diwali & Classic)
   */
  class Petal3D {
    constructor(theme = "diwali") {
      this.theme = theme;
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = -height * 0.55 - Math.random() * 80;
      this.z = Math.random() * 650 + 100;
      this.vx = (Math.random() - 0.5) * 1.0;
      this.vy = 1.0 + Math.random() * 1.4;
      this.size = 14 + Math.random() * 12;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.vRotX = (Math.random() - 0.5) * 0.04;
      this.vRotY = (Math.random() - 0.5) * 0.05;
      this.vRotZ = (Math.random() - 0.5) * 0.03;

      if (this.theme === "diwali") {
        this.colorFront = Math.random() > 0.5 ? "#FFB300" : "#E65100";
        this.colorBack = "#880E4F";
      } else {
        this.colorFront = "#C86D76";
        this.colorBack = "#F7E4E6";
      }
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotX += this.vRotX;
      this.rotY += this.vRotY;
      this.rotZ += this.vRotZ;

      if (this.y > height * 0.55) {
        this.reset();
      }
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const s = this.size * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.rotate(this.rotZ);
      ctx.scale(Math.cos(this.rotY), Math.sin(this.rotX));

      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.8, -s * 0.5, s * 0.8, s * 0.5, 0, s);
      ctx.bezierCurveTo(-s * 0.8, s * 0.5, -s * 0.8, -s * 0.5, 0, -s);
      ctx.closePath();

      const isFront = Math.cos(this.rotY) * Math.sin(this.rotX) >= 0;
      ctx.fillStyle = isFront ? this.colorFront : this.colorBack;
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 5 * p.scale;
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * 7. 3D Aerial Fireworks Rocket & Starburst (New Year)
   * Rises from bottom of Hero and explodes into sparkling shell in upper Hero
   */
  class Firework3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.state = "rising";
      this.x = (Math.random() - 0.5) * width * 0.85;
      this.y = height * 0.42;
      this.z = Math.random() * 450 + 100;
      this.targetY = -height * 0.15 - Math.random() * height * 0.25;
      this.vy = -6.5 - Math.random() * 4.5;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.particles = [];
      this.palette = [
        ["#FFDF00", "#FFB300", "#FFF9C4", "#FFA000"],
        ["#00E5FF", "#1DE9B6", "#E0F7FA", "#00B0FF"],
        ["#FF1744", "#F50057", "#FF80AB", "#C51162"],
        ["#D4AF37", "#F5D061", "#FFFFFF", "#AA820A"]
      ][Math.floor(Math.random() * 4)];
    }
    update() {
      if (this.state === "rising") {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y <= this.targetY) {
          this.explode();
        }
      } else if (this.state === "exploding") {
        let alive = false;
        for (let pt of this.particles) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.z += pt.vz;
          pt.vy += 0.07;
          pt.life -= 0.016;
          if (pt.life > 0) alive = true;
        }
        if (!alive) this.reset();
      }
    }
    explode() {
      this.state = "exploding";
      const count = 46;
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const speed = 3.5 + Math.random() * 4.0;
        this.particles.push({
          x: this.x,
          y: this.y,
          z: this.z,
          vx: speed * Math.sin(phi) * Math.cos(theta),
          vy: speed * Math.sin(phi) * Math.sin(theta),
          vz: speed * Math.cos(phi),
          life: 1.0,
          color: this.palette[Math.floor(Math.random() * this.palette.length)],
          size: 2.5 + Math.random() * 2.5
        });
      }
    }
    draw(ctx) {
      if (this.state === "rising") {
        const p = project3D(this.x, this.y, this.z);
        if (p.scale <= 0) return;
        ctx.beginPath();
        ctx.arc(p.px, p.py, 3.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#FFDF00";
        ctx.shadowColor = "#FFDF00";
        ctx.shadowBlur = 12 * p.scale;
        ctx.fill();
      } else if (this.state === "exploding") {
        for (let pt of this.particles) {
          if (pt.life <= 0) continue;
          const p = project3D(pt.x, pt.y, pt.z);
          if (p.scale <= 0) continue;
          ctx.beginPath();
          ctx.arc(p.px, p.py, pt.size * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.life;
          ctx.shadowColor = pt.color;
          ctx.shadowBlur = 8 * p.scale;
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }
    }
  }

  /**
   * 8. 3D Metallic Foil Ribbon Confetti (New Year)
   * Confined to Hero section
   */
  class Confetti3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = -height * 0.55 - Math.random() * 100;
      this.z = Math.random() * 550 + 100;
      this.vy = 2.0 + Math.random() * 2.5;
      this.vx = (Math.random() - 0.5) * 1.4;
      this.width = 11 + Math.random() * 7;
      this.height = 16 + Math.random() * 12;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.vRotX = (Math.random() - 0.5) * 0.07;
      this.vRotY = (Math.random() - 0.5) * 0.09;
      this.vRotZ = (Math.random() - 0.5) * 0.05;
      this.colorFront = ["#D4AF37", "#FFDF00", "#F5D061"][Math.floor(Math.random() * 3)];
      this.colorBack = ["#FFFFFF", "#E0E0E0", "#CFD8DC"][Math.floor(Math.random() * 3)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotX += this.vRotX;
      this.rotY += this.vRotY;
      this.rotZ += this.vRotZ;
      if (this.y > height * 0.55) this.reset();
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;
      const w = this.width * p.scale;
      const h = this.height * p.scale;

      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.rotate(this.rotZ);
      ctx.scale(Math.cos(this.rotY), Math.sin(this.rotX));
      const isFront = Math.cos(this.rotY) * Math.sin(this.rotX) >= 0;
      ctx.fillStyle = isFront ? this.colorFront : this.colorBack;
      ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
      ctx.shadowBlur = 5 * p.scale;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
    }
  }

  /**
   * 9. 3D Volumetric Gulal Color Powder Cloud (Holi)
   * Swirls in Hero background
   */
  class GulalCloud3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 1.3;
      this.y = (Math.random() - 0.5) * height * 0.8;
      this.z = Math.random() * 550 + 150;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.vz = (Math.random() - 0.5) * 0.4;
      this.radius = 42 + Math.random() * 32;
      this.growth = 0.2;
      this.life = 0.25 + Math.random() * 0.75;
      this.vLife = -0.005 - Math.random() * 0.005;
      this.color = ["#E91E63", "#00ACC1", "#FF9800", "#76FF03", "#9C27B0"][Math.floor(Math.random() * 5)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;
      this.radius += this.growth;
      this.life += this.vLife;
      if (this.life <= 0 || this.radius > 110) {
        this.reset();
      }
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const r = this.radius * p.scale;
      ctx.save();
      const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r);
      grad.addColorStop(0, this.color);
      grad.addColorStop(0.5, this.color);
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.globalAlpha = Math.max(0, this.life * 0.45);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.restore();
    }
  }

  /**
   * 10. 3D Rotating Metallic Crescent Moon & Islamic Star (Eid-ul-Fitr & Eid-ul-Adha)
   */
  class CrescentMoon3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.radius = 42;
      this.rotY = 0;
      this.vRotY = 0.012;
    }
    update() {
      this.rotY += this.vRotY;
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const r = this.radius * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.scale(Math.cos(this.rotY), 1);

      ctx.shadowColor = "#D4AF37";
      ctx.shadowBlur = 25 * p.scale;

      ctx.beginPath();
      ctx.arc(0, 0, r, Math.PI * 0.15, Math.PI * 1.85, false);
      ctx.bezierCurveTo(r * 0.5, -r * 0.8, r * 0.5, r * 0.8, Math.cos(Math.PI * 0.15) * r, Math.sin(Math.PI * 0.15) * r);
      ctx.closePath();

      const moonGrad = ctx.createLinearGradient(-r, -r, r, r);
      moonGrad.addColorStop(0, "#FFF7D6");
      moonGrad.addColorStop(0.35, "#D4AF37");
      moonGrad.addColorStop(0.75, "#AA820A");
      moonGrad.addColorStop(1, "#5E4600");

      ctx.fillStyle = moonGrad;
      ctx.fill();

      // Star beside crescent
      ctx.save();
      ctx.translate(r * 0.85, -r * 0.15);
      ctx.rotate(this.rotY * 2.2);
      this.drawStar(ctx, 0, 0, 5, r * 0.32, r * 0.15);
      ctx.fillStyle = "#FFDF00";
      ctx.shadowColor = "#FFDF00";
      ctx.shadowBlur = 10 * p.scale;
      ctx.fill();
      ctx.restore();

      ctx.restore();
    }
    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        let x = cx + Math.cos(rot) * outerRadius;
        let y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    }
  }

  /**
   * 11. 3D Swaying Arabic Lantern / Fanoos (Eid-ul-Fitr & Eid-ul-Adha)
   */
  class EidLantern3D {
    constructor(x, y, z) {
      this.originX = x;
      this.originY = y;
      this.z = z;
      this.angle = (Math.random() - 0.5) * 0.35;
      this.vAngle = (Math.random() - 0.5) * 0.012;
      this.width = 28;
      this.height = 52;
    }
    update() {
      this.angle += this.vAngle;
      if (Math.abs(this.angle) > 0.26) this.vAngle *= -1;
      this.x = this.originX + Math.sin(this.angle) * 28;
      this.y = this.originY + Math.cos(this.angle) * 10;
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const w = this.width * p.scale;
      const h = this.height * p.scale;

      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.rotate(this.angle * 0.4);

      // Hanging Chain
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.7);
      ctx.lineTo(0, -h * 2.0);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner Glow
      const glowGrad = ctx.createRadialGradient(0, 0, w * 0.2, 0, 0, w * 2.6);
      glowGrad.addColorStop(0, "rgba(255, 223, 100, 0.65)");
      glowGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.28)");
      glowGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, w * 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Top Dome
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, -h * 0.35);
      ctx.quadraticCurveTo(0, -h * 0.7, w * 0.5, -h * 0.35);
      ctx.fillStyle = "#AA820A";
      ctx.fill();

      // Glass Center
      ctx.fillStyle = "rgba(255, 235, 150, 0.5)";
      ctx.fillRect(-w * 0.45, -h * 0.35, w * 0.9, h * 0.7);

      // Brass Filigree Frame
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 2 * p.scale;
      ctx.strokeRect(-w * 0.45, -h * 0.35, w * 0.9, h * 0.7);
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.35);
      ctx.lineTo(0, h * 0.35);
      ctx.stroke();

      // Base
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, h * 0.35);
      ctx.lineTo(w * 0.5, h * 0.35);
      ctx.lineTo(w * 0.25, h * 0.65);
      ctx.lineTo(-w * 0.25, h * 0.65);
      ctx.closePath();
      ctx.fillStyle = "#8C6A0A";
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * 12. 3D Rotating 8-Pointed Islamic Geometric Star (Eid-ul-Adha)
   */
  class RubElHizbStar3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = 32;
      this.rotY = 0;
      this.vRotY = 0.015;
    }
    update() {
      this.rotY += this.vRotY;
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const s = this.size * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.scale(Math.cos(this.rotY), 1);

      ctx.shadowColor = "#D4AF37";
      ctx.shadowBlur = 16 * p.scale;

      for (let sq = 0; sq < 2; sq++) {
        ctx.save();
        ctx.rotate((sq * Math.PI) / 4);
        const grad = ctx.createLinearGradient(-s, -s, s, s);
        grad.addColorStop(0, "#FFF8DC");
        grad.addColorStop(0.4, "#D4AF37");
        grad.addColorStop(0.8, "#B8860B");
        grad.addColorStop(1, "#4E3A02");

        ctx.fillStyle = grad;
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1 * p.scale;
        ctx.strokeRect(-s / 2, -s / 2, s, s);
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = "#153B64";
      ctx.fill();
      ctx.strokeStyle = "#FFDF00";
      ctx.lineWidth = 1.5 * p.scale;
      ctx.stroke();

      ctx.restore();
    }
  }

  // ==========================================================================
  // ENGINE ORCHESTRATION & CURSOR MAGIC TRAIL (STRICTLY IN HERO SECTION)
  // ==========================================================================

  function initCanvas() {
    canvas = document.getElementById("festive3dCanvas");
    const heroEl = document.querySelector(".hero");

    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "festive3dCanvas";
    }

    if (heroEl) {
      if (canvas.parentElement !== heroEl) {
        heroEl.prepend(canvas);
      }
      heroEl.style.setProperty("position", "relative", "important");
      heroEl.style.setProperty("overflow", "hidden", "important");
      heroEl.style.setProperty("contain", "paint", "important");
      heroEl.style.setProperty("transform", "translateZ(0)", "important");
      heroEl.style.setProperty("isolation", "isolate", "important");
    }

    canvas.style.setProperty("position", "absolute", "important");
    canvas.style.setProperty("top", "0px", "important");
    canvas.style.setProperty("left", "0px", "important");
    canvas.style.setProperty("width", "100%", "important");
    canvas.style.setProperty("height", "100%", "important");
    canvas.style.setProperty("pointer-events", "none", "important");
    canvas.style.setProperty("z-index", "1", "important");
    canvas.style.setProperty("display", "block", "important");

    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);

    // Mouse parallax & magic cursor trail strictly inside Hero section
    window.addEventListener("mousemove", (e) => {
      const heroEl = document.querySelector(".hero");
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      if (e.clientY <= rect.bottom + 50 && e.clientY >= rect.top - 50) {
        mouseX = (e.clientX - rect.left - width / 2) * 0.15;
        mouseY = (e.clientY - rect.top - height / 2) * 0.15;
        targetCamX = mouseX;
        targetCamY = mouseY;

        const now = performance.now();
        if (isEnabled && now - lastTrailTime > 25 && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          lastTrailTime = now;
          addCursorSparkle(e.clientX - rect.left, e.clientY - rect.top);
        }
      }
    });

    // Touch parallax strictly inside Hero
    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        const heroEl = document.querySelector(".hero");
        if (!heroEl) return;
        const rect = heroEl.getBoundingClientRect();
        const t = e.touches[0];
        if (t.clientY >= rect.top && t.clientY <= rect.bottom) {
          mouseX = (t.clientX - rect.left - width / 2) * 0.12;
          mouseY = (t.clientY - rect.top - height / 2) * 0.12;
          targetCamX = mouseX;
          targetCamY = mouseY;
          if (isEnabled) addCursorSparkle(t.clientX - rect.left, t.clientY - rect.top);
        }
      }
    }, { passive: true });

    // Interactive Click Burst strictly inside Hero
    window.addEventListener("click", (e) => {
      if (!isEnabled) return;
      const heroEl = document.querySelector(".hero");
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        triggerBurst(e.clientX - rect.left, e.clientY - rect.top);
      }
    });
  }

  function addCursorSparkle(x, y) {
    if (cursorTrail.length > 35) cursorTrail.shift();
    let col = "#D4AF37";
    if (activeTheme === "christmas") col = Math.random() > 0.5 ? "#FFF" : "#C41E3A";
    else if (activeTheme === "diwali") col = Math.random() > 0.5 ? "#FFB300" : "#E65100";
    else if (activeTheme === "newyear") col = Math.random() > 0.5 ? "#FFDF00" : "#FFFFFF";
    else if (activeTheme === "holi") col = ["#E91E63", "#00ACC1", "#FF9800", "#76FF03"][Math.floor(Math.random() * 4)];
    else if (activeTheme === "eid-fitr") col = Math.random() > 0.5 ? "#C59B27" : "#0D6938";
    else if (activeTheme === "eid-adha") col = Math.random() > 0.5 ? "#D4AF37" : "#153B64";
    else col = "#C86D76";

    cursorTrail.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.4,
      life: 1.0,
      color: col,
      size: 2.2 + Math.random() * 2.8
    });
  }

  function resize() {
    const heroEl = document.querySelector(".hero");
    if (heroEl) {
      const rect = heroEl.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 650;
    } else {
      width = window.innerWidth;
      height = 650;
    }
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      if (ctx) ctx.scale(dpr, dpr);
    }
  }

  function populateThemeObjects(themeId) {
    objects3D.length = 0;
    const factor = intensity === "subtle" ? 0.6 : (intensity === "grand" ? 1.5 : 1.0);

    if (themeId === "christmas") {
      const snowCount = Math.floor(40 * factor);
      for (let i = 0; i < snowCount; i++) {
        objects3D.push(new Snowflake3D(true));
      }
      objects3D.push(new ChristmasBauble3D(-width * 0.38, -height * 0.25, 240, "ruby"));
      objects3D.push(new ChristmasBauble3D(width * 0.38, -height * 0.2, 220, "gold"));
      objects3D.push(new ChristmasBauble3D(-width * 0.22, -height * 0.35, 360, "gold"));
      objects3D.push(new HolidayBell3D(-width * 0.32, -height * 0.15, 180));
      objects3D.push(new HolidayBell3D(width * 0.32, -height * 0.18, 200));

    } else if (themeId === "diwali") {
      const diyaCount = Math.floor(8 * factor);
      for (let i = 0; i < diyaCount; i++) {
        objects3D.push(new Diya3D());
      }
      objects3D.push(new AkashKandil3D(-width * 0.36, height * 0.1, 260));
      objects3D.push(new AkashKandil3D(width * 0.36, height * 0.05, 240));
      const petalCount = Math.floor(28 * factor);
      for (let i = 0; i < petalCount; i++) {
        objects3D.push(new Petal3D("diwali"));
      }

    } else if (themeId === "newyear") {
      const fwCount = Math.floor(4 * factor);
      for (let i = 0; i < fwCount; i++) {
        const fw = new Firework3D();
        fw.y = height * (0.15 + Math.random() * 0.35);
        objects3D.push(fw);
      }
      const confCount = Math.floor(40 * factor);
      for (let i = 0; i < confCount; i++) {
        objects3D.push(new Confetti3D());
      }

    } else if (themeId === "holi") {
      const cloudCount = Math.floor(20 * factor);
      for (let i = 0; i < cloudCount; i++) {
        objects3D.push(new GulalCloud3D());
      }

    } else if (themeId === "eid-fitr") {
      objects3D.push(new CrescentMoon3D(width * 0.36, -height * 0.2, 220));
      objects3D.push(new EidLantern3D(-width * 0.36, -height * 0.22, 200));
      objects3D.push(new EidLantern3D(width * 0.22, -height * 0.3, 350));
      const starCount = Math.floor(30 * factor);
      for (let i = 0; i < starCount; i++) {
        objects3D.push(new Snowflake3D(true));
      }

    } else if (themeId === "eid-adha") {
      objects3D.push(new CrescentMoon3D(width * 0.36, -height * 0.2, 220));
      objects3D.push(new RubElHizbStar3D(-width * 0.34, -height * 0.18, 220));
      objects3D.push(new EidLantern3D(-width * 0.2, -height * 0.3, 350));
      const starCount = Math.floor(30 * factor);
      for (let i = 0; i < starCount; i++) {
        objects3D.push(new Snowflake3D(true));
      }

    } else {
      const petalCount = Math.floor(18 * factor);
      for (let i = 0; i < petalCount; i++) {
        objects3D.push(new Petal3D("classic"));
      }
    }
  }

  function triggerBurst(screenX, screenY) {
    const burstCount = 20;
    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.0;
      burstParticles.push({
        x: screenX,
        y: screenY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color: activeTheme === "christmas" ? "#C41E3A" :
               activeTheme === "diwali" ? "#FFB300" :
               activeTheme === "newyear" ? "#FFDF00" :
               activeTheme === "holi" ? ["#E91E63", "#00ACC1", "#FF9800", "#76FF03"][Math.floor(Math.random() * 4)] :
               activeTheme === "eid-fitr" || activeTheme === "eid-adha" ? "#D4AF37" : "#C86D76",
        radius: 2 + Math.random() * 3.2
      });
    }
  }

  function renderLoop() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, width, height);

    const heroEl = document.querySelector(".hero");
    if (heroEl) {
      const rect = heroEl.getBoundingClientRect();
      // If hero top section is completely scrolled out of view, do NOT render any particles
      if (rect.bottom <= 0) {
        animFrameId = requestAnimationFrame(renderLoop);
        return;
      }
    }

    camX += (targetCamX - camX) * 0.05;
    camY += (targetCamY - camY) * 0.05;

    if (isEnabled) {
      objects3D.sort((a, b) => b.z - a.z);

      for (let i = 0; i < objects3D.length; i++) {
        objects3D[i].update();
        objects3D[i].draw(ctx);
      }

      for (let i = cursorTrail.length - 1; i >= 0; i--) {
        const pt = cursorTrail[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.035;

        if (pt.life <= 0) {
          cursorTrail.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.life;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const pt = burstParticles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.035;

        if (pt.life <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.life;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    animFrameId = requestAnimationFrame(renderLoop);
  }

  // ==========================================================================
  // PUBLIC API
  // ==========================================================================

  window.Festive3DEngine = {
    init: function () {
      initCanvas();
      const savedTheme = localStorage.getItem("crochet_active_theme") || "default";
      this.setTheme(savedTheme);
      renderLoop();
    },
    setTheme: function (themeId) {
      activeTheme = themeId || "default";
      resize();
      populateThemeObjects(activeTheme);
    },
    setEnabled: function (enabled) {
      isEnabled = !!enabled;
      if (canvas) canvas.style.opacity = isEnabled ? "1" : "0";
    },
    setIntensity: function (lvl) {
      intensity = lvl || "normal";
      populateThemeObjects(activeTheme);
    },
    triggerBurst: triggerBurst,
    getActiveTheme: function () {
      return activeTheme;
    }
  };
})();
