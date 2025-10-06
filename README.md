# Kasperjanowski.com - Portfolio

Nowoczesne portfolio stworzone z React, TypeScript, Tailwind CSS i Firebase/Firestore.

## 🚀 Technologie

- **React 18** - Biblioteka UI
- **TypeScript** - Typowanie statyczne
- **Vite** - Szybki bundler i dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase/Firestore** - Backend i baza danych
- **Dark Mode** - Tryb jasny/ciemny z zapisem preferencji

## 📁 Struktura projektu

```
src/
├── components/          # Komponenty React
│   ├── Hero/           # Sekcja główna strony
│   └── ThemeToggle/    # Przełącznik motywów
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Zarządzanie motywem
├── hooks/              # Custom hooks
│   └── useTheme.ts     # Hook do zarządzania motywem
├── types/              # TypeScript types/interfaces
│   └── index.ts
├── config/             # Konfiguracja
│   └── firebase.ts     # Konfiguracja Firebase
├── App.tsx             # Główny komponent aplikacji
├── main.tsx            # Punkt wejścia
└── index.css           # Style globalne
```

## 🎨 Paleta kolorów

Projekt używa minimalistycznej palety czerni, bieli i szarości:

- **Dark Mode**: Odcienie czerni (900-500)
- **Light Mode**: Odcienie bieli i szarości (100-500)

## ⚙️ Konfiguracja Firebase

1. Utwórz projekt w [Firebase Console](https://console.firebase.google.com/)
2. Dodaj aplikację webową
3. Skopiuj konfigurację Firebase
4. Wklej dane konfiguracji do `src/config/firebase.ts`

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};
```

## 🛠️ Instalacja i uruchomienie

```bash
# Uruchomienie serwera deweloperskiego
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu produkcyjnego
npm run preview
```

## 📝 Dostępne skrypty

- `npm run dev` - Uruchamia serwer deweloperski
- `npm run build` - Tworzy build produkcyjny
- `npm run preview` - Podgląd buildu produkcyjnego
- `npm run lint` - Sprawdza kod pod kątem błędów

## 🎯 Funkcjonalności

### ✅ Zrealizowane

- [x] Podstawowa struktura projektu
- [x] Konfiguracja TypeScript
- [x] Konfiguracja Tailwind CSS
- [x] Integracja Firebase/Firestore
- [x] Tryb jasny/ciemny z zapisem preferencji
- [x] Strona główna (Hero section)
- [x] Responsywny design

### 🔜 Planowane

- [ ] Nawigacja
- [ ] Sekcja projektów
- [ ] Sekcja umiejętności
- [ ] Formularz kontaktowy
- [ ] Animacje i przejścia
- [ ] SEO optimization
- [ ] Blog (opcjonalnie)

## 🌐 Deployment

Projekt można wdrożyć na:

- **Firebase Hosting**
- **Vercel**
- **Netlify**
- **GitHub Pages**

## 📄 Licencja

Ten projekt jest prywatnym portfolio.

---

Stworzone z ❤️ przez Kasper Janowski

```

```
