# Screen 01 — Hook · Android

| | |
|---|---|
| **Platform** | Android · Material 3 Expressive |
| **Status** | in production |
| **Prototype** | [`../01-hook.html`](../01-hook.html) |
| **State variants** | Default (no selection) · Selecionada ("Sim, sempre" active) |

> First onboarding screen. Full-screen dark experience. The question that makes every user think "yes, that's me." Three tap options route directly to the next screen (O2-Validation) based on any selection — no wrong answer.

## Content delivered (literal microcopy)

| Field | Exact text |
|---|---|
| Eyebrow | "Brota" |
| Question | "Você já se sentiu pior depois de abrir o Instagram?" |
| Option 1 | "Sim, sempre" |
| Option 2 | "Às vezes" |
| Option 3 | "Quero entender melhor" |
| Hint | "Escolha uma opção para continuar" |

> "Instagram" is displayed in *Instrument Serif italic* to emotionally differentiate the trigger word.

## M3E structure

1. **Full-screen dark Scaffold** — no Top App Bar, no Navigation Bar. Onboarding screens suppress navigation chrome.
2. **4-segment block progress** — horizontal strip at top, 3dp height, 1st segment `brand-real`, 3 others `onSurface` 12%. Communicates "which block" without showing how many total screens remain.
3. **Question area** — centered vertically in the remaining space. Eyebrow (Brota) + H1 question.
4. **Three answer options** — full-width pill buttons stacked vertically. Each is a `FilledTonalButton` variant on dark surface.
5. **Hint text** — small caption below options, disappears after selection.
6. **Background blob** — morphing brand-real blob, 8% opacity, 90px blur, 18s loop.

## Native components to use (Compose Material 3)

> All onboarding screens: `WindowCompat.setDecorFitsSystemWindows(window, false)` for edge-to-edge. Status bar icons: `WindowInsetsControllerCompat(window).isAppearanceLightStatusBars = false` (white icons on dark bg).

| Screen element | Compose Component |
|---|---|
| Whole screen | `Scaffold(modifier = Modifier.fillMaxSize()) { padding -> Box(Modifier.fillMaxSize().background(Color(0xFF0F0C0A))) { ... } }` |
| Block progress | Custom `Row` with 4 `Box(Modifier.height(3.dp).weight(1f).clip(RoundedCornerShape(999.dp)).background(if(i==0) BrandReal else OnSurface.copy(0.12f)))` |
| Question text | `Text(text = buildAnnotatedString { append("Você já se sentiu pior depois de abrir o "); withStyle(SpanStyle(fontFamily = InstrumentSerif, fontStyle = FontStyle.Italic)) { append("Instagram?") } }, style = TextStyle(fontFamily = RobotoFlex, fontSize = 35.sp, fontVariationSettings = FontVariationSettings(FontVariation.width(108f), FontVariation.weight(430f), FontVariation.opticalSizing(36f))))` |
| Eyebrow | `Text("Brota", style = TextStyle(fontSize = 11.sp, letterSpacing = 0.18.em, color = BrandReal, fontVariationSettings = FontVariationSettings(FontVariation.width(105f), FontVariation.weight(500f))))` |
| Answer option (unselected) | `Button(onClick = { onSelect(index) }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(999.dp), colors = ButtonDefaults.buttonColors(containerColor = Color.White.copy(0.05f), contentColor = Color.White.copy(0.88f))) { Text(option, ...) }` |
| Answer option (selected) | Same button, `containerColor = BrandReal`, `contentColor = Color.White` + `Modifier.scale(1.02f)` |
| Background blob | `Box(Modifier.size(520.dp).offset(-220.dp, -200.dp).blur(90.dp).graphicsLayer { alpha = 0.08f }.background(BrandReal, RoundedCornerShape(60, 40, 55, 45)))` + infinite `rememberInfiniteTransition()` for border-radius morph |

## M3E tokens and styles

### Typography

- Eyebrow: Roboto Flex 11sp `wdth 105, wght 500, opsz 11` · `letterSpacing 0.18em` · color `BrandReal`
- Question H1: Roboto Flex 35sp `wdth 108, wght 430, opsz 36` · `lineHeight 1.18` · color `White.copy(0.95f)`
- "Instagram" accent: Instrument Serif italic 35sp
- Option label: Roboto Flex 15sp `wdth 105, wght 500, opsz 16` · center-aligned
- Hint: Roboto Flex 12sp `wdth 100, wght 400` · `White.copy(0.28f)`

### Colors

- Screen background: `Color(0xFF0F0C0A)` — hardcoded, always dark (not Material surface token)
- Option unselected bg: `Color.White.copy(0.05f)`
- Option unselected border: `Color.White.copy(0.13f)` (1.5dp)
- Option selected: `BrandReal` fill + `White` text
- Option dimmed: `alpha = 0.28f`
- Blob: `BrandReal` at `alpha = 0.08f`
- Progress active segment: `BrandReal`
- Progress inactive: `Color.White.copy(0.12f)`

### Radii

- Option buttons: `RoundedCornerShape(999.dp)` — M3E shape-full (pill)
- Background blob: animating between 60/40/55/45 and 45/55/60/40 percent (soft organic morph)

### Animations — M3E spring with overshoot

```kotlin
// Option button hover/select — M3E signature spring (overshoot)
val scaleSelected by animateFloatAsState(
    targetValue = if (selected) 1.02f else if (isDimmed) 0.98f else 1f,
    animationSpec = spring(dampingRatio = 0.6f, stiffness = 380f)
)

// Background blob morphing
val transition = rememberInfiniteTransition()
val blobAngle by transition.animateFloat(
    0f, 8f,
    animationSpec = infiniteRepeatable(tween(18000, easing = FastOutSlowInEasing), RepeatMode.Reverse)
)
```

Canonical M3E easing CSS equivalent: `cubic-bezier(0.34, 1.56, 0.64, 1)` (soft overshoot).

### State layer

- Unselected option on press: `Indication = rememberRipple(color = Color.White.copy(0.1f))`
- No hover state on mobile (handled by pressed ripple)

## Background blob spec

| Property | Value |
|---|---|
| Color | `BrandReal` `#C4734F` |
| Opacity | 8% |
| Blur | 90dp |
| Size | ~520dp × 520dp |
| Position | top-left, offset -220dp / -200dp (partially out of frame) |
| Animation | border-radius morph 60/40/55/45 → 45/55/60/40, 18s infinite ease-in-out + 8deg rotation |
| Reference | Fitbit 2025 redesign blob hero motion |

## Animations: prototype vs native

| What the prototype shows | How Compose will differ |
|---|---|
| **M3E spring overshoot** — `cubic-bezier(0.34, 1.56, 0.64, 1)` | `spring(dampingRatio = 0.6f, stiffness = 380f)` — 97% identical visual; real spring reacts to interrupted gestures |
| **Staggered entrance** — CSS animation-delay cascade | `LaunchedEffect` + `delay(180L)` between composables — identical timing, smoother on Compose recompose |
| **Background blob morph** — keyframed border-radius | `rememberInfiniteTransition()` with `animateFloat` on corner percentages — same visual |
| **Hint fade** — CSS opacity fade | `AnimatedVisibility(visible = !isSelected, enter = fadeIn(), exit = fadeOut())` |
| **Haptic on option tap** — NOT simulated | `LocalHapticFeedback.current.performHapticFeedback(HapticFeedbackType.LongPress)` |
| **Ripple on press** | `Indication = rememberRipple()` — more polished than CSS :active overlay |
| **System status bar icons** | `WindowInsetsControllerCompat.isAppearanceLightStatusBars = false` (white icons) |

## Reference apps

- **Gentler Streak** (2024 ADA Social Impact) — staggered fade-up entrance, soft spring motion vocabulary
- **Fitbit 2025 redesign** — blob morphing hero background at low opacity
- **Pixel Studio 2.0** — M3E spring overshoot on button interactions

## Accessibility

- Touch target: each option button minimum 48×48dp (padding handles this at 17dp vertical)
- TalkBack: `Modifier.semantics { contentDescription = "${optionText}, opção ${index+1} de 3" }`
- No autofocus on hint text (it's decorative, `aria-hidden` equivalent)
- Screen reader announces: "Brota. Você já se sentiu pior depois de abrir o Instagram? [options listed]"
- Font Scale: question text at 35sp — at 1.7× = ~60sp. Reduce `maxLines` if needed, or use `AutoSizeText`
- Reduce Motion: detect `LocalAccessibilityManager.current.isReduceMotionEnabled` → set blob animation duration to 0 and entrance to instant

## Iteration history

### v1 — Base prototype (current)
Full-screen dark hook with Roboto Flex variable question, 3 M3E spring pill options, morphing blob, 4-segment block progress, staggered fade-up entrance.

## Final state

Full-screen dark Scaffold (no AppBar, no NavigationBar). Onboarding block progress at top (4 segments, 1st brand-real). Question in Roboto Flex 35sp wdth 108 wght 430 — deliberately lighter than Bold for conversational tone. "Instagram" in Instrument Serif italic for emotional differentiation. Three full-width pill options with M3E spring cubic-bezier(0.34, 1.56, 0.64, 1) — soft overshoot on select. Brand-real fill on selected, others dimmed to 28%. Background blob: brand-real 8% opacity, 90px blur, 18s morph. Staggered entrance references Gentler Streak soft motion.

## Compose pending items

- Implement `FontVariation.width()` / `FontVariation.weight()` / `FontVariation.opticalSizing()` for Roboto Flex question text
- Import Instrument Serif (Google Fonts via Coil or bundled) for "Instagram" accent
- Test `WindowCompat.setDecorFitsSystemWindows(false)` + white status bar icons (`isAppearanceLightStatusBars = false`)
- TalkBack tests — verify option announcement order and hint text suppression
- Font Scale 1.7× — test question text wrapping and option button height adjustment
- Verify blob animation pauses on `reduceMotion` detection

## Next screen (Android)

Screen 02 — O2-Validation: "Você não está sozinha. 32% das mulheres sentem a mesma coisa. E isso tem solução."
