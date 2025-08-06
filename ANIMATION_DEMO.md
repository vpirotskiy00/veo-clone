# 🎨 Animation System Demo

Профессиональная система анимаций с тремя уникальными вариантами для тестирования.

## 🚀 Быстрый старт

```bash
bun run dev
# или
npm run dev
```

Сервер запустится на `http://localhost:3000`

## 🎯 Демо страницы

### Индивидуальные варианты:
- **`/demo-quantum`** - Quantum Flow (жидкие морфинг эффекты)
- **`/demo-neural`** - Neural Pulse (нейронные сети и глитчи)
- **`/demo-aurora`** - Aurora Symphony (космическая аврора)

### Сравнение:
- **`/demo-compare`** - Все три варианта на одной странице

## 🎨 Варианты анимаций

### 1. Quantum Flow 🌊
**Философия:** Жидкие квантовые переходы
- Liquid morphing orbs с SVG фильтрами
- Particle stream следующий за курсором
- Wave propagation эффекты
- Liquid fill текстовые анимации

### 2. Neural Pulse ⚡
**Философия:** Нейронные связи и электрические импульсы
- Canvas-based neural network
- Electric pulses по связям
- Glitch эффекты на тексте
- Digital rain фон

### 3. Aurora Symphony 🌌
**Философия:** Космическая аврора и звездные поля
- SVG aurora waves
- 3D parallax star field
- Chromatic aberration
- Breathing анимации

## 🛠️ Архитектура

```
lib/animation-system/
├── core/
│   └── AnimationEngine.ts      # Центральный движок
├── hooks/
│   ├── useMousePhysics.ts     # Физика мыши
│   ├── useScrollVelocity.ts   # Скорость скролла
│   └── useReducedMotion.ts    # Accessibility
components/
├── hero-quantum/              # Вариант 1
├── hero-neural/               # Вариант 2
└── hero-aurora/               # Вариант 3
```

## ⚡ Производительность

### Оптимизации:
- **GPU Acceleration** - transform3d для всех движений
- **Frame Budget** - 16ms максимум на кадр
- **Object Pooling** - для частиц (макс 50-100)
- **Lazy Loading** - динамический импорт тяжелых эффектов
- **Auto Quality** - автоматическое снижение качества при низком FPS

### Целевые метрики:
- **Desktop:** 60 FPS стабильно
- **Mobile:** 30+ FPS
- **Memory:** < 50MB дополнительно
- **Lighthouse:** 95+ Performance score

## 🎛️ Контроль качества

Каждый вариант автоматически адаптируется:
- **FPS < 30** → Переход на Low качество
- **FPS < 45** → Medium качество  
- **FPS > 55** → High качество
- **prefers-reduced-motion** → Отключение анимаций

## 🔧 Технические особенности

### Quantum Flow:
- SVG фильтры для liquid морфинга
- RequestAnimationFrame для частиц
- Spring physics с Framer Motion
- Mouse parallax с инерцией

### Neural Pulse:
- Canvas API для нейронной сетки
- Clip-path для glitch эффектов
- Real-time электрические импульсы
- Dynamic node interactions

### Aurora Symphony:
- CSS mask-image для aurora
- 3D transform parallax
- Mix-blend-mode свечения
- Sine wave органичное движение

## 🎮 Навигация

На всех демо страницах доступна плавающая навигация (нижний левый угол) для быстрого переключения между вариантами.

## 📊 Мониторинг производительности

В правом верхнем углу страницы сравнения отображается:
- Текущий FPS
- Цветовой индикатор производительности
- Автоматическая оптимизация качества

## 🎯 Выбор варианта

После тестирования используйте кнопку "Choose This Variant" на странице `/demo-compare` для выбора предпочтительного варианта.

---

**Создано с использованием:**
- Next.js 15.4.5
- Framer Motion
- Canvas API
- SVG Animations
- CSS Custom Properties