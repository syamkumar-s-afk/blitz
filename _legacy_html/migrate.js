const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const twMatch = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\})\s*<\/script>/);
let twConfig = twMatch ? twMatch[1] : '';

if (twConfig) {
    twConfig = twConfig.replace(/extend:/, 'content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],\n    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],\n    extend:');
    let twContent = `/** @type {import('tailwindcss').Config} */\nexport default ${twConfig};`;
    fs.writeFileSync('react-app/tailwind.config.js', twContent);
}

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
let styleContent = styleMatch ? styleMatch[1] : '';
let finalCss = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${styleContent}`;
fs.writeFileSync('react-app/src/index.css', finalCss);

const bodyMatch = html.match(/<nav[\s\S]*<\/footer>/);
let bodyContent = bodyMatch ? bodyMatch[0] : '';

bodyContent = bodyContent.replace(/class="/g, 'className="');
bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

bodyContent = bodyContent.replace(/<img([^>]*)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<img${p1}/>`;
});
bodyContent = bodyContent.replace(/<br([^>]*)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<br${p1}/>`;
});
bodyContent = bodyContent.replace(/<input([^>]*)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<input${p1}/>`;
});
bodyContent = bodyContent.replace(/<hr([^>]*)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<hr${p1}/>`;
});

bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, p1) => {
    let styleObj = {};
    p1.split(';').forEach(rule => {
        if (!rule.trim()) return;
        let [key, ...valParts] = rule.split(':');
        if (!key || valParts.length === 0) return;
        let value = valParts.join(':').trim();
        key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[key] = value;
    });
    return `style={${JSON.stringify(styleObj)}}`;
});

const restOfBody = bodyContent.substring(bodyContent.indexOf('<main>'));

let appJsx = "import { useState, useEffect } from 'react';\n";
appJsx += "import './index.css';\n\n";
appJsx += "export default function App() {\n";
appJsx += "  const [isMenuOpen, setIsMenuOpen] = useState(false);\n\n";
appJsx += "  const closeMenu = () => setIsMenuOpen(false);\n\n";
appJsx += "  useEffect(() => {\n";
appJsx += "    if (isMenuOpen) {\n";
appJsx += "      document.body.style.overflow = 'hidden';\n";
appJsx += "    } else {\n";
appJsx += "      document.body.style.overflow = '';\n";
appJsx += "    }\n";
appJsx += "    return () => { document.body.style.overflow = ''; };\n";
appJsx += "  }, [isMenuOpen]);\n\n";
appJsx += "  return (\n";
appJsx += '    <div className="bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container scroll-smooth">\n';
appJsx += "      <nav className={`fixed top-0 w-full z-50 transition-colors ${isMenuOpen ? 'bg-zinc-50 dark:bg-zinc-950' : 'bg-white/70 backdrop-blur-xl border-b border-black/10'}`}>\n";
appJsx += '        <div className="flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">\n';
appJsx += '          <a href="#home" className="text-2xl font-black tracking-tighter text-black uppercase">BLITZ</a>\n';
appJsx += '          <div className="hidden md:flex gap-8 items-center">\n';
appJsx += '            <a className="font-inter tracking-tighter font-bold uppercase text-zinc-500 hover:text-black transition-colors" href="#home">Home</a>\n';
appJsx += '            <a className="font-inter tracking-tighter font-bold uppercase text-zinc-500 hover:text-black transition-colors" href="#services">Services</a>\n';
appJsx += '            <a className="font-inter tracking-tighter font-bold uppercase text-zinc-500 hover:text-black transition-colors" href="#projects">Projects</a>\n';
appJsx += '            <a className="font-inter tracking-tighter font-bold uppercase text-black border-b-2 border-black pb-1" href="#about">About</a>\n';
appJsx += '          </div>\n';
appJsx += '          <button className="hidden md:block font-inter tracking-tighter font-bold uppercase px-6 py-2 bg-primary text-white rounded-full hover:opacity-80 transition-opacity active:scale-95 duration-200">\n';
appJsx += '            CONTACT US\n';
appJsx += '          </button>\n';
appJsx += '          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-black z-50 relative">\n';
appJsx += "            <span className=\"material-symbols-outlined text-3xl\">{isMenuOpen ? 'close' : 'menu'}</span>\n";
appJsx += '          </button>\n';
appJsx += '        </div>\n';
appJsx += '      </nav>\n';
appJsx += "\n";
appJsx += "      <div className={`fixed inset-0 z-40 bg-zinc-50/95 backdrop-blur-2xl flex flex-col justify-center px-12 transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-8'}`}>\n";
appJsx += '        <div className="flex flex-col gap-8 text-5xl font-black tracking-tighter uppercase mb-16 pt-20">\n';
appJsx += '          <a href="#home" onClick={closeMenu} className="text-zinc-400 hover:text-black transition-colors">Home</a>\n';
appJsx += '          <a href="#services" onClick={closeMenu} className="text-zinc-400 hover:text-black transition-colors">Services</a>\n';
appJsx += '          <a href="#projects" onClick={closeMenu} className="text-zinc-400 hover:text-black transition-colors">Projects</a>\n';
appJsx += '          <a href="#about" onClick={closeMenu} className="text-black hover:text-primary transition-colors">About</a>\n';
appJsx += '          <a href="#contact" onClick={closeMenu} className="text-zinc-400 hover:text-black transition-colors">Contact</a>\n';
appJsx += '        </div>\n';
appJsx += '        <div className="text-xs font-bold tracking-widest uppercase text-zinc-500">\n';
appJsx += '          Inquiries <br/>\n';
appJsx += '          <a href="mailto:hello@blitz.studio" className="text-black text-sm mt-2 block">hello@blitz.studio</a>\n';
appJsx += '        </div>\n';
appJsx += '      </div>\n';
appJsx += "\n";
appJsx += "      {/* The rest of the body */}\n";
appJsx += "      " + restOfBody + "\n";
appJsx += "    </div>\n";
appJsx += "  );\n";
appJsx += "}\n";

fs.writeFileSync('react-app/src/App.jsx', appJsx);

let reactIndex = fs.readFileSync('react-app/index.html', 'utf8');
const headLinks = `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />\n<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />`;
reactIndex = reactIndex.replace('</head>', headLinks + '\n</head>');
fs.writeFileSync('react-app/index.html', reactIndex);

console.log('Migration to React complete!');
