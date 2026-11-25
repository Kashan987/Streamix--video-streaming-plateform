# Streamix – Video Streaming Website

Simple static video streaming site (HTML + CSS + JS). Koi install ya build nahi chahiye.

## VS Code me run karna
1. Folder VS Code me kholo
2. Extension **Live Server** install karo
3. `index.html` par right-click → **Open with Live Server**

## GitHub par daalna
```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/streamix.git
git push -u origin main
```

## Vercel par deploy
1. vercel.com → **Add New → Project**
2. GitHub repo import karo
3. Framework: **Other**, settings default rehne do → **Deploy**

## Apne videos kaise jodein
- `js/store.js` me `VIDEOS` list me naya object add karo (title, category, src, thumb).
- `src` me .mp4 ka direct link do. Badi files ke liye Cloudinary / Bunny / Cloudflare Stream use karo.
- Ya site par **+ Add video** button se link daalo (sirf aapke browser me save hota hai).
- Chhoti files (<20MB) ko `videos/` folder me rakh ke `src: "videos/naam.mp4"` bhi likh sakte ho.
# Streamix--video-streaming-plateform
