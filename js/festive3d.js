/**
 * The Crochet Boutique - Ultra-Premium 3D Festive Animation Engine
 * Real-time 3D Perspective Projection Engine for HTML5 Canvas
 * Zero dependencies • 60 FPS • Multi-Layered 3D Models • Interactive Magic Cursor Trail
 * Themes: Christmas, Diwali, New Year, Holi, Eid-ul-Fitr, Eid-ul-Adha, Classic
 */

(function () {
  "use strict";

  const FOV = 600; // 3D Camera Field of View
  let canvas, ctx;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let activeTheme = "default";
  let isEnabled = true;
  let intensity = "normal"; // 'subtle', 'normal', 'grand'
  let animFrameId = null;

  // 3D Camera & Parallax state
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 0;
  let camX = 0;
  let camY = 0;

  // Interactive Cursor Trail Particles
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
  // 3D OBJECT CLASSES
  // ==========================================================================

  /**
   * 1. 3D Dendrite Snowflake (Christmas)
   * Intricate 6-fold symmetry with branching twigs, tumbling with 3D pitch/yaw/roll
   */
  class Snowflake3D {
    constructor(randomZ = true) {
      this.reset(randomZ);
    }
    reset(randomZ = false) {
      this.x = (Math.random() - 0.5) * width * 1.8;
      this.y = -height * 0.7 - Math.random() * 250;
      this.z = randomZ ? Math.random() * 850 : Math.random() * 300 + 450;
      this.vy = 1.2 + Math.random() * 1.8;
      this.vx = (Math.random() - 0.5) * 0.9;
      this.vz = (Math.random() - 0.5) * 0.3;
      this.radius = 14 + Math.random() * 18;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.vRotX = (Math.random() - 0.5) * 0.022;
      this.vRotY = (Math.random() - 0.5) * 0.032;
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

      if (this.y > height * 0.95 || this.z < -100 || this.z > 1200) {
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
      ctx.shadowColor = "rgba(196, 30, 58, 0.45)";
      ctx.shadowBlur = 9 * p.scale;

      // Draw 6 symmetrical arms with sub-branches
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        // Outer twigs
        ctx.moveTo(0, -r * 0.45);
        ctx.lineTo(-r * 0.25, -r * 0.65);
        ctx.moveTo(0, -r * 0.45);
        ctx.lineTo(r * 0.25, -r * 0.65);
        // Inner twigs
        ctx.moveTo(0, -r * 0.75);
        ctx.lineTo(-r * 0.2, -r * 0.9);
        ctx.moveTo(0, -r * 0.75);
        ctx.lineTo(r * 0.2, -r * 0.9);
        ctx.stroke();
        ctx.restore();
      }

      // Center crystalline core
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * 2. 3D Christmas Bauble Ornament
   * Shaded metallic sphere with specular gloss, gold cap & swaying pendulum physics
   */
  class ChristmasBauble3D {
    constructor(x, y, z, colorType = "ruby") {
      this.originX = x;
      this.originY = y;
      this.z = z;
      this.colorType = colorType; // 'ruby' or 'gold'
      this.radius = 32 + Math.random() * 16;
      this.angle = (Math.random() - 0.5) * 0.6;
      this.vAngle = (Math.random() - 0.5) * 0.015;
    }
    update() {
      this.angle += this.vAngle;
      if (Math.abs(this.angle) > 0.35) {
        this.vAngle *= -1;
      }
      this.x = this.originX + Math.sin(this.angle) * 35;
      this.y = this.originY + Math.cos(this.angle) * 15;
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const r = this.radius * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);

      // Hanging cord
      ctx.beginPath();
      ctx.moveTo(0, -r - 12 * p.scale);
      ctx.lineTo(0, -r - 100 * p.scale);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Golden Cap
      ctx.fillStyle = "#D4AF37";
      ctx.fillRect(-7 * p.scale, -r - 9 * p.scale, 14 * p.scale, 9 * p.scale);

      // 3D Shaded Sphere with Specular Radial Gradient
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
      ctx.shadowColor = this.colorType === "ruby" ? "rgba(196, 30, 58, 0.55)" : "rgba(244, 196, 48, 0.55)";
      ctx.shadowBlur = 20 * p.scale;
      ctx.fill();

      // Primary Specular highlight
      ctx.beginPath();
      ctx.arc(-r * 0.32, -r * 0.35, r * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.fill();

      // Secondary soft rim light
      ctx.beginPath();
      ctx.arc(r * 0.4, r * 0.4, r * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * 3. 3D Golden Holiday Bell (Christmas)
   * Shaded brass holiday bell swinging in 3D perspective with clapper
   */
  class HolidayBell3D {
    constructor(x, y, z) {
      this.originX = x;
      this.originY = y;
      this.z = z;
      this.angle = (Math.random() - 0.5) * 0.45;
      this.vAngle = (Math.random() - 0.5) * 0.016;
      this.size = 28;
    }
    update() {
      this.angle += this.vAngle;
      if (Math.abs(this.angle) > 0.38) this.vAngle *= -1;
      this.x = this.originX + Math.sin(this.angle) * 30;
      this.y = this.originY + Math.cos(this.angle) * 12;
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
      ctx.lineTo(0, -s * 2.2);
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
      ctx.shadowColor = "rgba(255, 215, 0, 0.45)";
      ctx.shadowBlur = 12 * p.scale;
      ctx.fill();

      // Bell Bottom Lip Rim
      ctx.beginPath();
      ctx.ellipse(0, s * 0.4, s * 0.82, s * 0.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#FFDF00";
      ctx.fill();
      ctx.strokeStyle = "#8C6A0A";
      ctx.lineWidth = 1.5 * p.scale;
      ctx.stroke();

      // Clapper
      ctx.beginPath();
      ctx.arc(Math.sin(-this.angle) * (s * 0.3), s * 0.52, s * 0.16, 0, Math.PI * 2);
      ctx.fillStyle = "#C41E3A";
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * 4. 3D Glowing Diya (Diwali)
   * Terracotta oil lamp, warm golden aura, ghee pool, and animated 3D flickering flame
   */
  class Diya3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = (Math.random() - 0.5) * height * 1.3;
      this.z = Math.random() * 600 + 180;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = -0.35 - Math.random() * 0.55; // gentle upward float
      this.radius = 26 + Math.random() * 14;
      this.rotY = Math.random() * Math.PI * 2;
      this.vRotY = (Math.random() - 0.5) * 0.015;
      this.flameFlicker = Math.random() * 10;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotY += this.vRotY;
      this.flameFlicker += 0.28;

      if (this.y < -height * 0.8) {
        this.y = height * 0.75;
        this.x = (Math.random() - 0.5) * width * 1.5;
      }
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const r = this.radius * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.scale(Math.cos(this.rotY) * 0.3 + 0.85, 1);

      // 1. Ambient Candlelight Halo Glow
      const haloGrad = ctx.createRadialGradient(0, -r * 0.4, r * 0.2, 0, -r * 0.4, r * 2.5);
      haloGrad.addColorStop(0, "rgba(255, 215, 64, 0.45)");
      haloGrad.addColorStop(0.5, "rgba(255, 111, 0, 0.18)");
      haloGrad.addColorStop(1, "rgba(255, 111, 0, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(0, -r * 0.4, r * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // 2. Terracotta Clay Bowl Outer Profile
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.48, 0, 0, Math.PI);
      ctx.fillStyle = "#A8411D";
      ctx.fill();
      ctx.strokeStyle = "#F28C38";
      ctx.lineWidth = 1.5 * p.scale;
      ctx.stroke();

      // Inner clay rim
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.05, r * 0.9, r * 0.36, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#6B230B";
      ctx.fill();

      // Ghee / Pure Oil Reservoir Shimmer
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.02, r * 0.75, r * 0.26, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.fill();

      // 3. Living 2-Tone Flickering Flame
      const fHeight = (r * 1.35) + Math.sin(this.flameFlicker) * (4.5 * p.scale);
      const fWidth = (r * 0.44) + Math.cos(this.flameFlicker * 1.5) * (2.2 * p.scale);

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
      ctx.shadowBlur = 18 * p.scale;
      ctx.fill();

      // Inner Blue Flame Core
      ctx.beginPath();
      ctx.ellipse(0, -fHeight * 0.18, fWidth * 0.32, fHeight * 0.22, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(68, 138, 255, 0.65)";
      ctx.fill();
      ctx.restore();

      ctx.restore();
    }
  }

  /**
   * 5. 3D Akash Kandil / Diwali Sky Lantern
   * Glowing traditional Indian paper lantern floating upwards with fluttering tassels
   */
  class AkashKandil3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.vy = -0.8 - Math.random() * 0.7;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.size = 32 + Math.random() * 12;
      this.rotY = Math.random() * Math.PI * 2;
      this.vRotY = 0.012;
      this.flutter = Math.random() * 10;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotY += this.vRotY;
      this.flutter += 0.2;
      if (this.y < -height * 0.85) {
        this.y = height * 0.85;
        this.x = (Math.random() - 0.5) * width * 1.4;
      }
    }
    draw(ctx) {
      const p = project3D(this.x, this.y, this.z);
      if (p.scale <= 0) return;

      const s = this.size * p.scale;
      ctx.save();
      ctx.translate(p.px, p.py);
      ctx.scale(Math.cos(this.rotY) * 0.3 + 0.85, 1);

      // Ambient Warm Inner Lantern Glow
      const glow = ctx.createRadialGradient(0, 0, s * 0.2, 0, 0, s * 2.2);
      glow.addColorStop(0, "rgba(255, 193, 7, 0.5)");
      glow.addColorStop(0.5, "rgba(255, 87, 34, 0.2)");
      glow.addColorStop(1, "rgba(255, 87, 34, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, s * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Diamond Geometric Body
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
      ctx.shadowBlur = 16 * p.scale;
      ctx.fill();

      // Hanging Golden Tassels
      for (let i = -2; i <= 2; i++) {
        const tx = (i * s * 0.22);
        const sway = Math.sin(this.flutter + i) * (5 * p.scale);
        ctx.beginPath();
        ctx.moveTo(tx, s * 0.7);
        ctx.quadraticCurveTo(tx + sway, s * 1.2, tx + sway * 1.5, s * 1.8);
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
      this.x = (Math.random() - 0.5) * width * 1.6;
      this.y = -height * 0.7 - Math.random() * 200;
      this.z = Math.random() * 700 + 100;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = 1.1 + Math.random() * 1.6;
      this.size = 15 + Math.random() * 14;
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
        // Classic rose petals
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

      if (this.y > height * 0.95) {
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
      ctx.shadowBlur = 6 * p.scale;
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * 7. 3D Aerial Fireworks Rocket & Spherical Starburst Shell (New Year)
   */
  class Firework3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.state = "rising"; // 'rising', 'exploding', 'dead'
      this.x = (Math.random() - 0.5) * width * 0.9;
      this.y = height * 0.6;
      this.z = Math.random() * 500 + 100;
      this.targetY = -height * 0.15 - Math.random() * height * 0.35;
      this.vy = -7.5 - Math.random() * 5.5;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.particles = [];
      this.palette = [
        ["#FFDF00", "#FFB300", "#FFF9C4", "#FFA000"], // 24K Gold
        ["#00E5FF", "#1DE9B6", "#E0F7FA", "#00B0FF"], // Cyan Diamond
        ["#FF1744", "#F50057", "#FF80AB", "#C51162"], // Ruby Celebration
        ["#D4AF37", "#F5D061", "#FFFFFF", "#AA820A"]  // Champagne Starlight
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
          pt.vy += 0.075; // gravity
          pt.life -= 0.016;
          if (pt.life > 0) alive = true;
        }
        if (!alive) this.reset();
      }
    }
    explode() {
      this.state = "exploding";
      const count = 52;
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const speed = 4 + Math.random() * 4.5;
        this.particles.push({
          x: this.x,
          y: this.y,
          z: this.z,
          vx: speed * Math.sin(phi) * Math.cos(theta),
          vy: speed * Math.sin(phi) * Math.sin(theta),
          vz: speed * Math.cos(phi),
          life: 1.0,
          color: this.palette[Math.floor(Math.random() * this.palette.length)],
          size: 2.5 + Math.random() * 2.8
        });
      }
    }
    draw(ctx) {
      if (this.state === "rising") {
        const p = project3D(this.x, this.y, this.z);
        if (p.scale <= 0) return;
        ctx.beginPath();
        ctx.arc(p.px, p.py, 3.8 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#FFDF00";
        ctx.shadowColor = "#FFDF00";
        ctx.shadowBlur = 14 * p.scale;
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
          ctx.shadowBlur = 9 * p.scale;
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }
    }
  }

  /**
   * 8. 3D Metallic Foil Ribbon Confetti (New Year)
   * Dual-sided tumbling ribbons twisting in 3D pitch/yaw/roll
   */
  class Confetti3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = -height * 0.6 - Math.random() * 300;
      this.z = Math.random() * 600 + 100;
      this.vy = 2.2 + Math.random() * 2.8;
      this.vx = (Math.random() - 0.5) * 1.6;
      this.width = 12 + Math.random() * 8;
      this.height = 18 + Math.random() * 14;
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
      if (this.y > height * 0.95) this.reset();
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
      ctx.shadowBlur = 6 * p.scale;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
    }
  }

  /**
   * 9. 3D Volumetric Gulal Color Powder Cloud (Holi)
   * Billowing swirling pigments expanding in 3D perspective
   */
  class GulalCloud3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 1.4;
      this.y = (Math.random() - 0.5) * height * 1.2;
      this.z = Math.random() * 600 + 150;
      this.vx = (Math.random() - 0.5) * 0.9;
      this.vy = (Math.random() - 0.5) * 0.9;
      this.vz = (Math.random() - 0.5) * 0.4;
      this.radius = 48 + Math.random() * 38;
      this.growth = 0.22;
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
      if (this.life <= 0 || this.radius > 130) {
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

      ctx.globalAlpha = Math.max(0, this.life * 0.48);
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
      this.radius = 46;
      this.rotY = 0;
      this.vRotY = 0.012;
      this.rotX = 0.15;
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

      // Golden Moon Aura
      ctx.shadowColor = "#D4AF37";
      ctx.shadowBlur = 28 * p.scale;

      // 3D Crescent Geometry
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

      // Small 3D Star beside crescent
      ctx.save();
      ctx.translate(r * 0.88, -r * 0.15);
      ctx.rotate(this.rotY * 2.2);
      this.drawStar(ctx, 0, 0, 5, r * 0.35, r * 0.16);
      ctx.fillStyle = "#FFDF00";
      ctx.shadowColor = "#FFDF00";
      ctx.shadowBlur = 12 * p.scale;
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
   * 11. 3D Swaying Illuminated Arabic Lantern / Fanoos (Eid-ul-Fitr & Eid-ul-Adha)
   */
  class EidLantern3D {
    constructor(x, y, z) {
      this.originX = x;
      this.originY = y;
      this.z = z;
      this.angle = (Math.random() - 0.5) * 0.4;
      this.vAngle = (Math.random() - 0.5) * 0.012;
      this.width = 32;
      this.height = 58;
    }
    update() {
      this.angle += this.vAngle;
      if (Math.abs(this.angle) > 0.28) this.vAngle *= -1;
      this.x = this.originX + Math.sin(this.angle) * 32;
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
      ctx.lineTo(0, -h * 2.2);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Warm Inner Lantern Glow
      const glowGrad = ctx.createRadialGradient(0, 0, w * 0.2, 0, 0, w * 2.8);
      glowGrad.addColorStop(0, "rgba(255, 223, 100, 0.7)");
      glowGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.3)");
      glowGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, w * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Top Dome
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, -h * 0.35);
      ctx.quadraticCurveTo(0, -h * 0.75, w * 0.5, -h * 0.35);
      ctx.fillStyle = "#AA820A";
      ctx.fill();

      // Glass Center Chamber
      ctx.fillStyle = "rgba(255, 235, 150, 0.55)";
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
   * 12. 3D Rotating 8-Pointed Islamic Geometric Star Polyhedron (Eid-ul-Adha)
   */
  class RubElHizbStar3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = 36;
      this.rotX = 0.2;
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
      ctx.shadowBlur = 18 * p.scale;

      // Draw two interlocking squares (8-pointed star)
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

      // Center sapphire jewel
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = "#153B64";
      ctx.fill();
      ctx.strokeStyle = "#FFDF00";
      ctx.lineWidth = 1.5 * p.scale;
      ctx.stroke();

      ctx.restore();
    }
  }

  // ==========================================================================
  // ENGINE ORCHESTRATION & CURSOR MAGIC TRAIL
  // ==========================================================================

  function initCanvas() {
    canvas = document.getElementById("festive3dCanvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "festive3dCanvas";
      document.body.prepend(canvas);
    }
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);

    // Mouse parallax & magic cursor trail
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX - width / 2) * 0.15;
      mouseY = (e.clientY - height / 2) * 0.15;
      targetCamX = mouseX;
      targetCamY = mouseY;

      const now = performance.now();
      if (isEnabled && now - lastTrailTime > 25) {
        lastTrailTime = now;
        addCursorSparkle(e.clientX, e.clientY);
      }
    });

    // Touch parallax
    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseX = (t.clientX - width / 2) * 0.12;
        mouseY = (t.clientY - height / 2) * 0.12;
        targetCamX = mouseX;
        targetCamY = mouseY;
        if (isEnabled) addCursorSparkle(t.clientX, t.clientY);
      }
    }, { passive: true });

    // Interactive Click Burst
    window.addEventListener("click", (e) => {
      if (!isEnabled) return;
      triggerBurst(e.clientX, e.clientY);
    });
  }

  function addCursorSparkle(x, y) {
    if (cursorTrail.length > 40) cursorTrail.shift();
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
      vy: (Math.random() - 0.5) * 1.5 - 0.5,
      life: 1.0,
      color: col,
      size: 2.5 + Math.random() * 3
    });
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
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
    const factor = intensity === "subtle" ? 0.6 : (intensity === "grand" ? 1.6 : 1.0);

    if (themeId === "christmas") {
      // 3D Snowflakes
      const snowCount = Math.floor(45 * factor);
      for (let i = 0; i < snowCount; i++) {
        objects3D.push(new Snowflake3D(true));
      }
      // 3D Baubles
      objects3D.push(new ChristmasBauble3D(-width * 0.38, -height * 0.32, 250, "ruby"));
      objects3D.push(new ChristmasBauble3D(width * 0.38, -height * 0.28, 220, "gold"));
      objects3D.push(new ChristmasBauble3D(-width * 0.22, -height * 0.45, 380, "gold"));
      objects3D.push(new ChristmasBauble3D(width * 0.25, -height * 0.42, 350, "ruby"));
      // 3D Bells
      objects3D.push(new HolidayBell3D(-width * 0.32, -height * 0.2, 180));
      objects3D.push(new HolidayBell3D(width * 0.32, -height * 0.22, 200));

    } else if (themeId === "diwali") {
      // 3D Glowing Diyas
      const diyaCount = Math.floor(9 * factor);
      for (let i = 0; i < diyaCount; i++) {
        objects3D.push(new Diya3D());
      }
      // 3D Akash Kandil Sky Lanterns
      objects3D.push(new AkashKandil3D(-width * 0.35, height * 0.2, 280));
      objects3D.push(new AkashKandil3D(width * 0.35, height * 0.1, 260));
      objects3D.push(new AkashKandil3D(0, height * 0.5, 420));
      // 3D Rangoli Petals
      const petalCount = Math.floor(34 * factor);
      for (let i = 0; i < petalCount; i++) {
        objects3D.push(new Petal3D("diwali"));
      }

    } else if (themeId === "newyear") {
      // 3D Fireworks
      const fwCount = Math.floor(5 * factor);
      for (let i = 0; i < fwCount; i++) {
        const fw = new Firework3D();
        fw.y = height * (0.15 + Math.random() * 0.55);
        objects3D.push(fw);
      }
      // 3D Metallic Foil Confetti
      const confCount = Math.floor(48 * factor);
      for (let i = 0; i < confCount; i++) {
        objects3D.push(new Confetti3D());
      }

    } else if (themeId === "holi") {
      // 3D Gulal Clouds
      const cloudCount = Math.floor(24 * factor);
      for (let i = 0; i < cloudCount; i++) {
        objects3D.push(new GulalCloud3D());
      }

    } else if (themeId === "eid-fitr") {
      // 3D Crescent Moon
      objects3D.push(new CrescentMoon3D(width * 0.35, -height * 0.28, 250));
      // 3D Lanterns (Fanoos)
      objects3D.push(new EidLantern3D(-width * 0.36, -height * 0.3, 200));
      objects3D.push(new EidLantern3D(width * 0.22, -height * 0.4, 380));
      objects3D.push(new EidLantern3D(-width * 0.18, -height * 0.45, 420));
      // Starlight particles
      const starCount = Math.floor(36 * factor);
      for (let i = 0; i < starCount; i++) {
        objects3D.push(new Snowflake3D(true));
      }

    } else if (themeId === "eid-adha") {
      // 3D Crescent Moon & 8-Pointed Rub-el-Hizb Stars
      objects3D.push(new CrescentMoon3D(width * 0.35, -height * 0.28, 250));
      objects3D.push(new RubElHizbStar3D(-width * 0.32, -height * 0.25, 220));
      objects3D.push(new RubElHizbStar3D(width * 0.25, -height * 0.38, 360));
      // 3D Lanterns
      objects3D.push(new EidLantern3D(-width * 0.36, -height * 0.3, 200));
      objects3D.push(new EidLantern3D(width * 0.22, -height * 0.4, 380));
      // Sacred Bokeh Stars
      const starCount = Math.floor(36 * factor);
      for (let i = 0; i < starCount; i++) {
        objects3D.push(new Snowflake3D(true));
      }

    } else {
      // Default: Soft artisan rose petals
      const petalCount = Math.floor(20 * factor);
      for (let i = 0; i < petalCount; i++) {
        objects3D.push(new Petal3D("classic"));
      }
    }
  }

  function triggerBurst(screenX, screenY) {
    const burstCount = 22;
    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.5;
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
        radius: 2 + Math.random() * 3.5
      });
    }
  }

  function renderLoop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // Easing camera towards target parallax
    camX += (targetCamX - camX) * 0.05;
    camY += (targetCamY - camY) * 0.05;

    if (isEnabled) {
      // Depth Sort (Z-ordering) for correct 3D perspective overlap
      objects3D.sort((a, b) => b.z - a.z);

      // Render 3D objects
      for (let i = 0; i < objects3D.length; i++) {
        objects3D[i].update();
        objects3D[i].draw(ctx);
      }

      // Render Interactive Cursor Magic Trail
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

      // Render Click/Touch Burst Particles
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
