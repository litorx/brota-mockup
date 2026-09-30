# Screen 01 — Hook · iOS

| | |
|---|---|
| **Platform** | iOS 26 · Liquid Glass / HIG |
| **Status** | in production |
| **Prototype** | [`../01-hook.html`](../01-hook.html) |
| **State variants** | Default (no selection) · Selecionada ("Sim, sempre" active) |

> First onboarding screen. Full-screen dark cover presentation. The question that makes every user think "yes, that's me." Three Liquid Glass frosted options route to the next screen — no wrong answer.

## Content delivered (literal microcopy)

| Field | Exact text |
|---|---|
| Eyebrow | "Brota" |
| Question | "Você já se sentiu pior depois de abrir o Instagram?" |
| Option 1 | "Sim, sempre" |
| Option 2 | "Às vezes" |
| Option 3 | "Quero entender melhor" |
| Hint | "Toque para continuar" |

> "Instagram" displayed in *Instrument Serif italic* — same cross-platform treatment for emotional consistency.

## HIG structure

1. **fullScreenCover dark** — `.fullScreenCover(isPresented:)` with `.preferredColorScheme(.dark)`. No NavigationStack on this screen — pure full-screen presentation.
2. **4-dot block progress** — custom `HStack` at top. First dot expands to capsule (active block). No Brota-visible screen count — only block indicator.
3. **Question area** — SF Pro Display 34pt weight Regular (400). Lighter than `.bold` for conversational prompt feel.
4. **Three Liquid Glass options** — vertical stack of full-width rounded-rect buttons with `.glassEffect(.regular)` on iOS 26.
5. **Hint text** — `.caption` below options, fades out on selection.
6. **Static light orbs** — two `Color(.brandReal / .brandAi)` circles, blur 70pt, static position (HIG spec — no morph).

## Native components to use (SwiftUI HIG)

> No NavigationStack on this screen. Presented as `.fullScreenCover`. Edge-to-edge. Status bar: `.preferredColorScheme(.dark)` ensures white icons.

| Screen element | SwiftUI Component |
|---|---|
| Whole screen presentation | `.fullScreenCover(isPresented: $showOnboarding) { HookView() }` |
| Dark full-screen container | `ZStack { Color(hex: "0D0B09").ignoresSafeArea() ... }` |
| Static orbs (background) | `Circle().fill(Color.brandReal).frame(350, 350).blur(70).opacity(0.12).offset(x: 110, y: -110)` — NOT glassEffect (content layer) |
| Block progress | `HStack(spacing: 6) { ForEach(0..<4) { i in Capsule().fill(i==0 ? Color.brandReal : .white.opacity(0.2)).frame(width: i==0 ? 22 : 6, height: 6) } }` + `withAnimation(.timingCurve(0.32, 0.72, 0, 1, duration: 0.45)) { activeBlock = nextBlock }` |
| Eyebrow | `Text("Brota").font(.system(size: 11, weight: .semibold)).tracking(1.2).textCase(.uppercase).foregroundStyle(Color.brandReal.opacity(0.9))` |
| Question H1 | `Text(attributedQuestion).font(.system(size: 34, weight: .regular, design: .default)).tracking(-0.5).lineSpacing(4)` — see attributed string note below |
| "Instagram" accent | `AttributedString` with `InstrumentSerif` font applied to the word range: `var attr = AttributedString("Instagram?"); attr.font = Font.custom("InstrumentSerif-Italic", size: 34)` |
| Option (unselected) | `Button(action: { selectOption(i) }) { Text(option).frame(maxWidth: .infinity) }.buttonStyle(GlassOptionStyle(selected: false))` |
| Option (selected) | Same, `selected: true` → tinted glass fill |
| Hint | `Text("Toque para continuar").font(.caption).opacity(isSelected ? 0 : 0.3)` |

### Custom ButtonStyle: GlassOptionStyle

```swift
struct GlassOptionStyle: ButtonStyle {
    var selected: Bool
    var dimmed: Bool = false
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 17, weight: selected ? .medium : .regular))
            .foregroundStyle(.white.opacity(0.9))
            .padding(.vertical, 16)
            .padding(.horizontal, 22)
            .frame(maxWidth: .infinity)
            .background {
                RoundedRectangle(cornerRadius: 14)
                    .fill(selected ? Color.brandReal.opacity(0.26) : Color.white.opacity(0.08))
                    .glassEffect(.regular, in: RoundedRectangle(cornerRadius: 14)) // iOS 26+
            }
            .overlay {
                RoundedRectangle(cornerRadius: 14)
                    .strokeBorder(
                        selected ? Color.brandReal.opacity(0.46) : Color.white.opacity(0.18),
                        lineWidth: 0.5
                    )
            }
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
            .opacity(dimmed ? 0.28 : 1.0)
            .animation(.timingCurve(0.32, 0.72, 0, 1, duration: 0.35), value: selected)
            .animation(.timingCurve(0.32, 0.72, 0, 1, duration: 0.35), value: dimmed)
            .animation(.easeOut(duration: 0.13), value: configuration.isPressed)
    }
}
```

> ⚠️ `.glassEffect()` requires iOS 26+. Wrap in `#available(iOS 26.0, *) { ... } else { fallback }`.

## HIG tokens and styles

### Typography

- Eyebrow: SF Pro Text 11pt Semibold, `tracking: 1.2`, `textCase(.uppercase)`, color `BrandReal` opacity 0.9
- Question H1: SF Pro Display 34pt **Regular (400)** — deliberately not Bold; conversational prompt tone
- "Instagram" accent: Instrument Serif Italic 34pt — same visual weight, emotional marker
- Option label: SF Pro Text 17pt Regular → SF Pro Text 17pt Medium when selected
- Hint: SF Pro Text 12pt (`.caption`), opacity 0.3

### HIG canonical colors (dark override — this screen is always dark)

- Screen background: `Color(hex: "0D0B09")` — hardcoded, not `systemBackground` (intentional dark)
- Orb 1: `Color.brandReal` — `#C4734F` — 12% opacity, top-right
- Orb 2: `Color.brandAi` — `#7B6FA0` — 9% opacity, bottom-left
- Option selected glass tint: `Color.brandReal.opacity(0.26)` + border `brandReal.opacity(0.46)`
- Option unselected glass: `Color.white.opacity(0.08)` + border `white.opacity(0.18)`
- Block progress active: `Color.brandReal`
- Block progress inactive: `Color.white.opacity(0.2)`

### Radii

- Option buttons: `RoundedRectangle(cornerRadius: 14)` — HIG 14pt for interactive controls on dark bg
- Block progress active dot: `Capsule()` (22×6 expanded)
- Block progress inactive: `Capsule()` (6×6 circular)
- Orbs: `Circle()` (perfectly round, no radius needed)

### Animations

All iOS animations use HIG canonical bezier — **no overshoot**:

```swift
// State transitions (HIG canonical)
.animation(.timingCurve(0.32, 0.72, 0, 1, duration: 0.35), value: selectedOption)

// Press response (faster, ephemeral)
.animation(.easeOut(duration: 0.13), value: isPressed)

// Block dot expansion
.animation(.timingCurve(0.32, 0.72, 0, 1, duration: 0.45), value: activeBlock)

// Hint fade on selection
.animation(.easeOut(duration: 0.25), value: hasSelected)
```

### Entrance animation (staggered fade-up — Gentler Streak reference)

```swift
struct FadeUpModifier: ViewModifier {
    let delay: Double
    @State private var appeared = false
    func body(content: Content) -> some View {
        content
            .offset(y: appeared ? 0 : 16)
            .opacity(appeared ? 1 : 0)
            .onAppear {
                withAnimation(.timingCurve(0.32, 0.72, 0, 1, duration: 0.65).delay(delay)) {
                    appeared = true
                }
            }
    }
}
// Usage:
// questionView.modifier(FadeUpModifier(delay: 0.05))
// optionsView.modifier(FadeUpModifier(delay: 0.20))
// hintText.modifier(FadeUpModifier(delay: 0.36))
```

## SF Symbols used

| Symbol | Usage |
|---|---|
| None on this screen | Options are text-only full-width buttons — no icons needed |

## Liquid Glass — usage on this screen

| Element | Glass usage |
|---|---|
| ✅ Option buttons | `.glassEffect(.regular, in: RoundedRectangle(cornerRadius: 14))` on all 3 options |
| ✅ Selected option | `.glassEffect(.regular.tint(.brandReal), in: RoundedRectangle(cornerRadius: 14))` |
| ❌ Background orbs | Plain `Circle()` fill + blur — NOT glass (content layer, golden rule) |
| ❌ Question text | On solid dark background — NOT glass (text never directly on glass) |
| ❌ Block progress | Plain colored capsules — NOT glass (too small, would be visually noisy) |

**Background orbs spec (HIG — static, not morphing):**

| | Color | Size | Blur | Opacity | Position |
|---|---|---|---|---|---|
| Orb A | `BrandReal` `#C4734F` | 350×350pt | 70pt | 12% | top-right, offset +110, -110 |
| Orb B | `BrandAi` `#7B6FA0` | 270×270pt | 70pt | 9% | bottom-left, offset -90, +100 |

## Animations: prototype vs native

| What the prototype shows | How SwiftUI will differ |
|---|---|
| **Liquid Glass material** — `backdrop-filter: blur(20px) saturate(140%)` | iOS 26 Metal shader — true lensing refraction. Looks ~90% identical in static screenshots; real app has specular highlight that tracks device tilt (imperceptible in browser) |
| **HIG bezier** — `cubic-bezier(0.32, 0.72, 0, 1)` | `.timingCurve(0.32, 0.72, 0, 1)` — 100% identical math |
| **Staggered entrance** — CSS animation-delay | `FadeUpModifier` with `.delay()` — identical timing, smoother on first-frame render |
| **Block dot expansion** — CSS width transition | `withAnimation { activeBlock = n }` on `HStack` — SwiftUI layout engine handles smoothly |
| **Specular inset highlight** — `box-shadow inset` | Real device: gyro-driven highlight that rotates as user tilts phone (impressive, can't simulate in browser) |
| **Haptic on option tap** — NOT simulated | `.sensoryFeedback(.selection, trigger: selectedOption)` (iOS 17+) |
| **Hint opacity fade** — CSS opacity transition | `withAnimation(.easeOut(0.25)) { hasSelected = true }` |

## Reference apps

- **Gentler Streak** (2024 ADA Social Impact) — staggered fade-up, soft motion, shame-free UX tone
- **Apple Weather** (iOS 26) — Liquid Glass buttons over vivid/dark backgrounds
- **Finch** — full-screen dark onboarding, emotional question + character reveal sequence

## Accessibility

- Touch target: each option minimum 44×44pt (padding ensures this at 16pt vertical)
- VoiceOver: `.accessibilityLabel("\(optionText), opção \(i+1) de 3")`
- Hint VoiceOver: `.accessibilityHidden(true)` — decorative text
- Screen reader order: eyebrow → question → option 1 → option 2 → option 3 → hint
- Dynamic Type: SF Pro Display 34pt at 1.7× = ~58pt. Options stack may need increased padding. Use `minimumScaleFactor(0.8)` if needed.
- Reduce Motion: `@Environment(\.accessibilityReduceMotion) var reduceMotion` → disable entrance animation, set `appeared = true` immediately
- Reduce Transparency: `.glassEffect()` automatically degrades to opaque background when "Reduce Transparency" is on in iOS Settings

## Iteration history

### v1 — Base prototype (current)
Full-screen dark cover with SF Pro Display Regular question, 3 Liquid Glass frosted option buttons, static orbs, 4-dot block progress (first expanded), staggered fade-up entrance.

## Final state

`.fullScreenCover` with `.preferredColorScheme(.dark)`. Screen always dark (`Color(hex: "0D0B09")`). Static orbs: brand-real 12% top-right, brand-ai 9% bottom-left — HIG spec (not morphing). Block progress: 4 dots, first expands to 22×6pt brand-real capsule. Question: SF Pro Display 34pt Regular — conversational weight. "Instagram" in Instrument Serif italic. Options: Liquid Glass `.glassEffect(.regular)` with HIG canonical bezier (0.32, 0.72, 0, 1) — no overshoot. Selected: tinted glass `.tint(.brandReal)`. Entrance: staggered fade-up at 50ms/200ms/360ms — Gentler Streak soft motion reference.

## SwiftUI pending items

- Wrap `.glassEffect()` in `#available(iOS 26.0, *) { ... } else { .background(.regularMaterial) }` for backward compat
- Import Instrument Serif (bundle as custom font or use Google Fonts SDK) for "Instagram" accent
- Test `.preferredColorScheme(.dark)` on the `.fullScreenCover` — confirm it doesn't affect parent screen
- VoiceOver tests — verify option announcement and navigation order
- Dynamic Type 1.7× test — question text wrapping behavior
- Reduce Motion test — entrance animation should skip to final state instantly
- Reduce Transparency test — `.glassEffect()` should degrade gracefully

## Next screen (iOS)

Screen 02 — O2-Validation: "Você não está sozinha. 32% das mulheres sentem a mesma coisa. E isso tem solução."
