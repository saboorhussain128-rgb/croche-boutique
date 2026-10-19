/**
 * The Crochet Boutique - 3D Festive Animation Engine
 * Real-time 3D Perspective Projection Engine for HTML5 Canvas
 * Zero dependencies • 60 FPS • Interactive Parallax & Burst Effects
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

  // 3D Objects Pool
  const objects3D = [];
  const burstParticles = [];

  // Helper 3D Projection
  function project3D(x, y, z) {
    const scale = FOV / (FOV + z);
    const px = (width / 2) + (x - camX) * scale;
    const py = (height / 2) + (y - camY) * scale;
    return { px, py, scale };
  }

  // --- 3D OBJECT CLASSES ---

  /**
   * 1. 3D Snowflake (Christmas)
   * 6-fold geometric symmetry with sub-arms, tumbling with 3D pitch/yaw/roll
   */
  class Snowflake3D {
    constructor(randomZ = true) {
      this.reset(randomZ);
    }
    reset(randomZ = false) {
      this.x = (Math.random() - 0.5) * width * 1.8;
      this.y = -height * 0.7 - Math.random() * 200;
      this.z = randomZ ? Math.random() * 800 : Math.random() * 300 + 400;
      this.vy = 1.2 + Math.random() * 1.8;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vz = (Math.random() - 0.5) * 0.3;
      this.radius = 12 + Math.random() * 18;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.vRotX = (Math.random() - 0.5) * 0.02;
      this.vRotY = (Math.random() - 0.5) * 0.03;
      this.vRotZ = (Math.random() - 0.5) * 0.02;
      this.opacity = 0.5 + Math.random() * 0.45;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;
      this.rotX += this.vRotX;
      this.rotY += this.vRotY;
      this.rotZ += this.vRotZ;

      if (this.y > height * 0.9 || this.z < -100 || this.z > 1200) {
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
      // 3D rotation transform approximation
      ctx.rotate(this.rotZ);
      ctx.scale(Math.cos(this.rotY), Math.cos(this.rotX));

      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.lineWidth = Math.max(1, 1.8 * p.scale);
      ctx.shadowColor = "rgba(196, 30, 58, 0.4)";
      ctx.shadowBlur = 8 * p.scale;

      // Draw 6 symmetrical arms
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r);
        // Sub twigs
        ctx.moveTo(0, -r * 0.4);
        ctx.lineTo(-r * 0.22, -r * 0.58);
        ctx.moveTo(0, -r * 0.4);
        ctx.lineTo(r * 0.22, -r * 0.58);
        ctx.moveTo(0, -r * 0.7);
        ctx.lineTo(-r * 0.18, -r * 0.85);
        ctx.moveTo(0, -r * 0.7);
        ctx.lineTo(r * 0.18, -r * 0.85);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    }
  }

  /**
   * 2. 3D Christmas Bauble Ornament
   * Shaded 3D sphere with specular glint, metal cap & swaying physics
   */
  class ChristmasBauble3D {
    constructor(x, y, z, colorType = "ruby") {
      this.originX = x;
      this.originY = y;
      this.z = z;
      this.colorType = colorType; // 'ruby' or 'gold'
      this.radius = 28 + Math.random() * 16;
      this.angle = (Math.random() - 0.5) * 0.6;
      this.vAngle = (Math.random() - 0.5) * 0.015;
      this.stringLen = 100 + Math.random() * 80;
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

      // Hanging string
      ctx.beginPath();
      ctx.moveTo(0, -r - 15 * p.scale);
      ctx.lineTo(0, -r - 80 * p.scale);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Golden Cap
      ctx.fillStyle = "#D4AF37";
      ctx.fillRect(-6 * p.scale, -r - 8 * p.scale, 12 * p.scale, 8 * p.scale);

      // 3D Sphere with Specular Radial Gradient
      const grad = ctx.createRadialGradient(
        -r * 0.35, -r * 0.35, r * 0.1,
        0, 0, r
      );
      if (this.colorType === "ruby") {
        grad.addColorStop(0, "#FF8A9E");
        grad.addColorStop(0.3, "#C41E3A");
        grad.addColorStop(0.8, "#7E1022");
        grad.addColorStop(1, "#38040C");
      } else {
        grad.addColorStop(0, "#FFF9D2");
        grad.addColorStop(0.3, "#F4C430");
        grad.addColorStop(0.8, "#B8860B");
        grad.addColorStop(1, "#4A3600");
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
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * 3. 3D Glowing Diya (Diwali)
   * Terracotta clay oil lamp, glowing aura, and 3D flickering flame particles
   */
  class Diya3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = (Math.random() - 0.5) * height * 1.2;
      this.z = Math.random() * 600 + 200;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -0.3 - Math.random() * 0.5; // slow float upwards
      this.radius = 24 + Math.random() * 14;
      this.rotX = 0.35; // perspective tilt
      this.rotY = Math.random() * Math.PI * 2;
      this.vRotY = (Math.random() - 0.5) * 0.015;
      this.flameFlicker = Math.random() * 10;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotY += this.vRotY;
      this.flameFlicker += 0.25;

      if (this.y < -height * 0.8) {
        this.y = height * 0.7;
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

      // 1. Ambient Golden Halo
      const haloGrad = ctx.createRadialGradient(0, -r * 0.4, r * 0.2, 0, -r * 0.4, r * 2.2);
      haloGrad.addColorStop(0, "rgba(255, 200, 50, 0.4)");
      haloGrad.addColorStop(0.5, "rgba(255, 120, 0, 0.15)");
      haloGrad.addColorStop(1, "rgba(255, 120, 0, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(0, -r * 0.4, r * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Terracotta Clay Bowl
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.45, 0, 0, Math.PI);
      ctx.fillStyle = "#A8411D";
      ctx.fill();
      ctx.strokeStyle = "#F28C38";
      ctx.lineWidth = 1.5 * p.scale;
      ctx.stroke();

      // Inner clay rim
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.05, r * 0.9, r * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#6B230B";
      ctx.fill();

      // Ghee / Oil reservoir shimmer
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.02, r * 0.75, r * 0.25, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.fill();

      // 3. Flickering 3D Flame
      const fHeight = (r * 1.2) + Math.sin(this.flameFlicker) * (4 * p.scale);
      const fWidth = (r * 0.42) + Math.cos(this.flameFlicker * 1.5) * (2 * p.scale);

      ctx.save();
      ctx.translate(0, -r * 0.1);
      const flameGrad = ctx.createLinearGradient(0, -fHeight, 0, 0);
      flameGrad.addColorStop(0, "#FFF9E6");
      flameGrad.addColorStop(0.3, "#FFD700");
      flameGrad.addColorStop(0.7, "#FF5722");
      flameGrad.addColorStop(1, "#E65100");

      ctx.beginPath();
      ctx.moveTo(-fWidth, 0);
      ctx.quadraticCurveTo(-fWidth * 0.8, -fHeight * 0.6, 0, -fHeight);
      ctx.quadraticCurveTo(fWidth * 0.8, -fHeight * 0.6, fWidth, 0);
      ctx.closePath();
      ctx.fillStyle = flameGrad;
      ctx.shadowColor = "#FFD700";
      ctx.shadowBlur = 14 * p.scale;
      ctx.fill();
      ctx.restore();

      ctx.restore();
    }
  }

  /**
   * 4. 3D Tumbling Rangoli & Flower Petal (Diwali & Classic)
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
      this.vy = 1.0 + Math.random() * 1.5;
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

      if (this.y > height * 0.9) {
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

      // Front or Back side lighting
      const isFront = Math.cos(this.rotY) * Math.sin(this.rotX) >= 0;
      ctx.fillStyle = isFront ? this.colorFront : this.colorBack;
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 6 * p.scale;
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * 5. 3D Fireworks Rocket & Burst (New Year)
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
      this.targetY = -height * 0.2 - Math.random() * height * 0.3;
      this.vy = -7 - Math.random() * 5;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.particles = [];
      this.palette = [
        ["#FFDF00", "#FFB300", "#FFF9C4"],
        ["#00E5FF", "#1DE9B6", "#E0F7FA"],
        ["#FF1744", "#F50057", "#FF80AB"],
        ["#D4AF37", "#C5A059", "#FFFFFF"]
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
          pt.vy += 0.08; // gravity
          pt.life -= 0.018;
          if (pt.life > 0) alive = true;
        }
        if (!alive) this.reset();
      }
    }
    explode() {
      this.state = "exploding";
      const count = 48;
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const speed = 3.5 + Math.random() * 4;
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
   * 6. 3D Metallic Tumbling Confetti (New Year)
   */
  class Confetti3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = -height * 0.6 - Math.random() * 300;
      this.z = Math.random() * 600 + 100;
      this.vy = 2.0 + Math.random() * 2.5;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.width = 12 + Math.random() * 8;
      this.height = 16 + Math.random() * 12;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.vRotX = (Math.random() - 0.5) * 0.06;
      this.vRotY = (Math.random() - 0.5) * 0.08;
      this.vRotZ = (Math.random() - 0.5) * 0.05;
      this.color = ["#D4AF37", "#FFDF00", "#E0E0E0", "#C41E3A", "#00ACC1"][Math.floor(Math.random() * 5)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotX += this.vRotX;
      this.rotY += this.vRotY;
      this.rotZ += this.vRotZ;
      if (this.y > height * 0.9) this.reset();
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
      ctx.fillStyle = this.color;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
    }
  }

  /**
   * 7. 3D Gulal Color Powder Cloud (Holi)
   * Volumetric swirling pigments expanding in 3D perspective
   */
  class GulalCloud3D {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * width * 1.4;
      this.y = (Math.random() - 0.5) * height * 1.2;
      this.z = Math.random() * 600 + 150;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.vz = (Math.random() - 0.5) * 0.4;
      this.radius = 45 + Math.random() * 35;
      this.growth = 0.2;
      this.life = 0.2 + Math.random() * 0.8;
      this.vLife = -0.005 - Math.random() * 0.005;
      this.color = ["#E91E63", "#00ACC1", "#FF9800", "#76FF03", "#9C27B0"][Math.floor(Math.random() * 5)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;
      this.radius += this.growth;
      this.life += this.vLife;
      if (this.life <= 0 || this.radius > 120) {
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
   * 8. 3D Rotating Metallic Crescent Moon & Islamic Star (Eid-ul-Fitr & Eid-ul-Adha)
   */
  class CrescentMoon3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.radius = 42;
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

      // Golden Glow
      ctx.shadowColor = "#D4AF37";
      ctx.shadowBlur = 24 * p.scale;

      // 3D Crescent Geometry
      ctx.beginPath();
      ctx.arc(0, 0, r, Math.PI * 0.15, Math.PI * 1.85, false);
      ctx.bezierCurveTo(r * 0.5, -r * 0.8, r * 0.5, r * 0.8, Math.cos(Math.PI * 0.15) * r, Math.sin(Math.PI * 0.15) * r);
      ctx.closePath();

      const moonGrad = ctx.createLinearGradient(-r, -r, r, r);
      moonGrad.addColorStop(0, "#FFF7D6");
      moonGrad.addColorStop(0.4, "#D4AF37");
      moonGrad.addColorStop(0.8, "#AA820A");
      moonGrad.addColorStop(1, "#5E4600");

      ctx.fillStyle = moonGrad;
      ctx.fill();

      // Small 3D Star beside crescent
      ctx.save();
      ctx.translate(r * 0.85, -r * 0.15);
      ctx.rotate(this.rotY * 2);
      this.drawStar(ctx, 0, 0, 5, r * 0.32, r * 0.15);
      ctx.fillStyle = "#FFDF00";
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
   * 9. 3D Swaying Illuminated Arabic Lantern / Fanoos (Eid)
   */
  class EidLantern3D {
    constructor(x, y, z) {
      this.originX = x;
      this.originY = y;
      this.z = z;
      this.angle = (Math.random() - 0.5) * 0.4;
      this.vAngle = (Math.random() - 0.5) * 0.012;
      this.width = 30;
      this.height = 54;
      this.glowFlicker = Math.random() * 10;
    }
    update() {
      this.angle += this.vAngle;
      if (Math.abs(this.angle) > 0.28) this.vAngle *= -1;
      this.glowFlicker += 0.2;
      this.x = this.originX + Math.sin(this.angle) * 30;
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
      ctx.lineTo(0, -h * 1.8);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Warm Inner Lantern Glow
      const glowGrad = ctx.createRadialGradient(0, 0, w * 0.2, 0, 0, w * 2.5);
      glowGrad.addColorStop(0, "rgba(255, 223, 100, 0.65)");
      glowGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.25)");
      glowGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, w * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Top Dome
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, -h * 0.35);
      ctx.quadraticCurveTo(0, -h * 0.7, w * 0.5, -h * 0.35);
      ctx.fillStyle = "#AA820A";
      ctx.fill();

      // Glass Center Chamber
      ctx.fillStyle = "rgba(255, 235, 150, 0.5)";
      ctx.fillRect(-w * 0.45, -h * 0.35, w * 0.9, h * 0.7);

      // Intricate Brass Filigree Frame
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
      ctx.lineTo(w * 0.25, h * 0.6);
      ctx.lineTo(-w * 0.25, h * 0.6);
      ctx.closePath();
      ctx.fillStyle = "#8C6A0A";
      ctx.fill();

      ctx.restore();
    }
  }

  // --- ENGINE ORCHESTRATION ---

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

    // Mouse parallax tracking
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX - width / 2) * 0.15;
      mouseY = (e.clientY - height / 2) * 0.15;
      targetCamX = mouseX;
      targetCamY = mouseY;
    });

    // Interactive Click Burst
    window.addEventListener("click", (e) => {
      if (!isEnabled) return;
      triggerBurst(e.clientX, e.clientY);
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
    const factor = intensity === "subtle" ? 0.5 : (intensity === "grand" ? 1.5 : 1.0);

    if (themeId === "christmas") {
      // 3D Snowflakes
      const snowCount = Math.floor(40 * factor);
      for (let i = 0; i < snowCount; i++) {
        objects3D.push(new Snowflake3D(true));
      }
      // 3D Baubles
      objects3D.push(new ChristmasBauble3D(-width * 0.38, -height * 0.32, 250, "ruby"));
      objects3D.push(new ChristmasBauble3D(width * 0.38, -height * 0.28, 220, "gold"));
      objects3D.push(new ChristmasBauble3D(-width * 0.22, -height * 0.45, 380, "gold"));
      objects3D.push(new ChristmasBauble3D(width * 0.25, -height * 0.42, 350, "ruby"));
    } else if (themeId === "diwali") {
      // 3D Glowing Diyas
      const diyaCount = Math.floor(8 * factor);
      for (let i = 0; i < diyaCount; i++) {
        objects3D.push(new Diya3D());
      }
      // 3D Rangoli Petals
      const petalCount = Math.floor(32 * factor);
      for (let i = 0; i < petalCount; i++) {
        objects3D.push(new Petal3D("diwali"));
      }
    } else if (themeId === "newyear") {
      // 3D Fireworks
      const fwCount = Math.floor(4 * factor);
      for (let i = 0; i < fwCount; i++) {
        const fw = new Firework3D();
        fw.y = height * (0.2 + Math.random() * 0.5);
        objects3D.push(fw);
      }
      // 3D Confetti
      const confCount = Math.floor(45 * factor);
      for (let i = 0; i < confCount; i++) {
        objects3D.push(new Confetti3D());
      }
    } else if (themeId === "holi") {
      // 3D Gulal Clouds
      const cloudCount = Math.floor(22 * factor);
      for (let i = 0; i < cloudCount; i++) {
        objects3D.push(new GulalCloud3D());
      }
    } else if (themeId === "eid-fitr" || themeId === "eid-adha") {
      // 3D Crescent Moon
      objects3D.push(new CrescentMoon3D(width * 0.35, -height * 0.28, 250));
      // 3D Lanterns
      objects3D.push(new EidLantern3D(-width * 0.36, -height * 0.3, 200));
      objects3D.push(new EidLantern3D(width * 0.22, -height * 0.4, 380));
      objects3D.push(new EidLantern3D(-width * 0.18, -height * 0.45, 420));
      // Starlight particles
      const starCount = Math.floor(35 * factor);
      for (let i = 0; i < starCount; i++) {
        objects3D.push(new Snowflake3D(true)); // Clean sparkling geometry
      }
    } else {
      // Default: Soft artisan rose petals
      const petalCount = Math.floor(18 * factor);
      for (let i = 0; i < petalCount; i++) {
        objects3D.push(new Petal3D("classic"));
      }
    }
  }

  function triggerBurst(screenX, screenY) {
    const burstCount = 18;
    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      burstParticles.push({
        x: screenX,
        y: screenY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color: activeTheme === "christmas" ? "#C41E3A" :
               activeTheme === "diwali" ? "#FFB300" :
               activeTheme === "newyear" ? "#FFDF00" :
               activeTheme === "holi" ? ["#E91E63", "#00ACC1", "#FF9800"][Math.floor(Math.random() * 3)] :
               activeTheme === "eid-fitr" || activeTheme === "eid-adha" ? "#D4AF37" : "#C86D76",
        radius: 2 + Math.random() * 3
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
      // Depth Sort (Z-ordering) for correct 3D overlap
      objects3D.sort((a, b) => b.z - a.z);

      // Render 3D objects
      for (let i = 0; i < objects3D.length; i++) {
        objects3D[i].update();
        objects3D[i].draw(ctx);
      }

      // Render click/touch burst particles
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
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    animFrameId = requestAnimationFrame(renderLoop);
  }

  // --- PUBLIC API ---

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
