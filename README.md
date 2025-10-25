# 🖥️ Portfolio PC sur Mesure

Portfolio moderne et professionnel pour présenter mes services de montage PC et mes réalisations.

## 🌟 Fonctionnalités

- ✨ Design moderne avec animations fluides
- 📱 Responsive (mobile, tablette, desktop)
- 🎨 Effets visuels au scroll
- 💼 Galerie de réalisations interactive
- 📬 Formulaire de contact
- ⚡ Performance optimisée

## 🚀 Technologies utilisées

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (Vanilla)
- GitHub Pages pour l'hébergement

## 📂 Structure du projet

```
montage-pc/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── script.js           # Interactivité JavaScript
├── images/             # Dossier des images
│   ├── setup1.jpg
│   ├── setup2.jpg
│   └── ...
└── README.md           # Documentation
```

## 🛠️ Installation locale

1. Cloner le repository
```bash
git clone https://github.com/djaxxx/montage-pc.git
cd montage-pc
```

2. Ouvrir le fichier `index.html` dans votre navigateur
   - Double-clic sur le fichier
   - Ou utiliser un serveur local :
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server
```

3. Visiter `http://localhost:8000`

## 📝 Personnalisation

### Modifier les informations de contact

Dans `index.html`, section `#contact` :
```html
<a href="mailto:votre@email.com">votre@email.com</a>
<p>VotreDiscord#1234</p>
<a href="tel:+33612345678">06 12 34 56 78</a>
```

### Changer les couleurs

Dans `style.css`, modifier les variables :
```css
:root {
    --primary: #00d4ff;        /* Couleur principale */
    --secondary: #ff006e;      /* Couleur secondaire */
    --accent: #8b5cf6;         /* Couleur accent */
    --dark: #0a0e27;           /* Fond sombre */
}
```

### Ajouter des réalisations

1. Ajouter l'image dans le dossier `images/`
2. Dupliquer un bloc `.gallery-item` dans `index.html`
3. Modifier le titre, la description et le chemin de l'image

```html
<div class="gallery-item">
    <div class="gallery-image">
        <img src="images/votre-setup.jpg" alt="Description">
    </div>
    <div class="gallery-overlay">
        <h3>Titre du Setup</h3>
        <p>Composants principaux</p>
    </div>
</div>
```

## 🎨 Optimisation des images

**Avant d'ajouter des images :**
1. Redimensionner à 1920x1440px max
2. Compresser avec [TinyPNG](https://tinypng.com)
3. Viser < 500 Ko par image
4. Utiliser le format WebP si possible

## 🚢 Déploiement sur GitHub Pages

1. Pousser le code sur GitHub
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

2. Activer GitHub Pages
   - Aller dans `Settings` > `Pages`
   - Source : `main` branch
   - Sauvegarder

3. Votre site sera accessible à : `https://votre-username.github.io/montage-pc/`

## 📱 Compatibilité

- ✅ Chrome / Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (iOS 12+)
- ✅ Mobile responsive
- ✅ Tablette responsive

## 🔧 Améliorations futures possibles

- [ ] Système de filtre pour la galerie (Gaming, Workstation, Custom)
- [ ] Mode sombre/clair
- [ ] Intégration d'un vrai formulaire de contact (EmailJS, Formspree)
- [ ] Blog ou section actualités
- [ ] Témoignages clients
- [ ] Calculateur de budget PC
- [ ] Lightbox pour agrandir les images
- [ ] Animations plus poussées (Three.js pour un fond 3D)
- [ ] Section "Process" avec timeline
- [ ] Comparateur de configurations

## 📄 Licence

Ce projet est libre d'utilisation pour un usage personnel.

## 👤 Contact

- **Site web** : [https://djaxxx.github.io/montage-pc/](https://djaxxx.github.io/montage-pc/)
- **GitHub** : [@djaxxx](https://github.com/djaxxx)

---

Fait avec ❤️ et beaucoup de RGB