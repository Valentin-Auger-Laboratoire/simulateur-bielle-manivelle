# Simulateur bielle-manivelle

🇫🇷 [Français](#français) · 🇬🇧 [English](#english)

**Essayer l'outil :** https://valentin-auger-laboratoire.github.io/portfolio/outils/bielle-manivelle/

---

## Français

### Ce que fait l'outil
Simulateur web d'un système bielle-manivelle (moteurs, compresseurs, pompes), en HTML / CSS / JavaScript pur (animation et courbes en SVG, aucune bibliothèque).

On règle le rayon de manivelle r, la longueur de bielle L, l'excentration e et la vitesse de rotation. L'outil :
- **anime le mécanisme** (manivelle, bielle, piston, points morts haut et bas), avec un curseur pour choisir l'angle ;
- trace la **loi entrée-sortie** sur un tour : position, vitesse et accélération du piston selon l'angle de la manivelle (valeur au survol) ;
- donne la **course**, la **vitesse** et l'**accélération maximales**, et l'**angle maximal de la bielle** ;
- signale une bielle trop courte, un angle de bielle trop grand (effort latéral sur le piston), le **retour rapide** dû à l'excentration, ou un mécanisme qui se bloque.

### Formules
| Grandeur | Formule |
|---|---|
| Position du piston | x(θ) = r·cos θ + √(L² − (r·sin θ − e)²) |
| Vitesse, accélération | dérivées exactes de x(θ) à vitesse de rotation constante |
| Points morts | bielle et manivelle alignées : x = √((L ± r)² − e²) |
| Course | √((L + r)² − e²) − √((L − r)² − e²) |

### Fichiers
| Fichier | Rôle |
|---|---|
| `bielle.js` | Moteur de calcul (testable avec Node) |
| `index.html` | Interface, bilingue FR / EN |
| `tests/test.js` | Tests : course et points morts, accélération aux points morts, vitesse et accélération comparées à une dérivée numérique sur 2 000 cas aléatoires, excentration, blocage |

```bash
node tests/test.js
```

### Limites
Vitesse de rotation supposée constante ; pas de calcul des efforts (inertie, pression), ni des frottements.

---

## English

### What the tool does
Web simulator of a slider-crank mechanism (engines, compressors, pumps), in plain HTML / CSS / JavaScript (SVG animation and charts, no library).

Set the crank radius r, rod length L, offset e and rotation speed. The tool:
- **animates the mechanism** (crank, rod, piston, top and bottom dead centres), with a slider to pick the angle;
- plots the **input-output law** over one turn: piston position, velocity and acceleration versus crank angle (value on hover);
- gives the **stroke**, **maximum velocity** and **acceleration**, and **maximum rod angle**;
- flags a rod that is too short, a rod angle that is too large (piston side load), the **quick-return** effect of the offset, or a mechanism that locks.

### Formulas
See the table above: exact position law and its time derivatives at constant speed, dead centres when rod and crank are aligned.

### Files
| File | Purpose |
|---|---|
| `bielle.js` | Calculation engine (testable with Node) |
| `index.html` | User interface, bilingual FR / EN |
| `tests/test.js` | Tests: stroke and dead centres, acceleration at dead centres, velocity and acceleration against numerical differentiation on 2,000 random cases, offset, locking |

```bash
node tests/test.js
```

### Limitations
Constant rotation speed; no force calculation (inertia, pressure) and no friction.
