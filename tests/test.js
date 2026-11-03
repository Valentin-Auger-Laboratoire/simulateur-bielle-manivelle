// Tests du moteur bielle-manivelle : node tests/test.js
const assert = require('assert');
const B = require('../bielle.js');
const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), msg + ' : ' + a + ' au lieu de ' + b);

// 1. Sans excentration : course = 2r, PMH à x = L + r, PMB à x = L − r
const p = { r: 50, L: 200, e: 0, rpm: 3000 };
const dc = B.deadCenters(p);
near(dc.stroke, 100, 1e-12, 'course');
near(B.state(p, 0).x, 250, 1e-12, 'PMH');
near(B.state(p, Math.PI).x, 150, 1e-12, 'PMB');
near(dc.goDeg, 180, 1e-9, 'aller = retour sans excentration');

// 2. Accélération au PMH : a = − r·ω²·(1 + r/L) (dirigée vers la manivelle)
const w = (3000 * 2 * Math.PI) / 60;
near(B.state(p, 0).a, -(0.05 * w * w * (1 + 50 / 200)), 1e-9, 'accélération au PMH');
// au PMB : a = r·ω²·(1 − r/L)
near(B.state(p, Math.PI).a, 0.05 * w * w * (1 - 50 / 200), 1e-9, 'accélération au PMB');

// 3. Vitesse et accélération = dérivées numériques de la position, sur 2 000 cas aléatoires
for (let k = 0; k < 2000; k++) {
  const q = { r: 20 + Math.random() * 60, L: 0, e: Math.random() * 40 - 20, rpm: 100 + Math.random() * 5000 };
  q.L = q.r + Math.abs(q.e) + 10 + Math.random() * 200;
  const th = Math.random() * 2 * Math.PI, h = 1e-5, wq = (q.rpm * 2 * Math.PI) / 60;
  const vNum = ((B.state(q, th + h).x - B.state(q, th - h).x) / (2 * h)) * wq;
  const aNum = (((B.state(q, th + h).v - B.state(q, th - h).v) / (2 * h)) * wq) / 1000;
  near(B.state(q, th).v, vNum, 1e-5, 'vitesse');
  near(B.state(q, th).a, aNum, 1e-5, 'accélération');
}

// 4. Avec excentration : aller et retour ne durent plus le même temps
const ex = B.analyse({ r: 40, L: 110, e: 30, rpm: 60 });
assert.ok(ex.ok);
assert.ok(ex.dc.goDeg > 180, 'retour rapide');
near(ex.dc.goDeg + ex.dc.backDeg, 360, 1e-9, 'aller + retour = 360°');

// 5. Bielle trop courte : mécanisme bloqué
const bad = B.analyse({ r: 50, L: 60, e: 20, rpm: 100 });
assert.ok(!bad.ok && bad.issues.some((i) => i.code === 'lock'));

console.log('OK : tous les tests passent');
