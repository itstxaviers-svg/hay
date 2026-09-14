# Codex instruction: 3 quick games for “I’m + emotion”

Create one small classroom web app with **3 separate games** for practising the structure **“I’m + emotion”**. The target vocabulary is:

- I’m hungry.
- I’m tired.
- I’m cold.
- I’m sad.
- I’m happy.
- I’m great.
- I’m good.
- I’m OK.

The app is for teacher-led classroom use on a laptop/projector. **Children must not type or write anything.** Their response is oral, by pointing, acting, or choosing physically. The teacher controls the game from the computer.

## Tech

Use:

- Vite
- React
- TypeScript
- plain CSS or CSS Modules
- no backend
- no database
- no authentication
- no heavy UI framework
- no external API required
- `localStorage` only for volume/settings/high score if useful

The project must run with:

```bash
npm install
npm run dev
npm run build
```

Keep the code simple, modular, and easy to extend with more vocabulary later.

## Assets

Primary visual assets are the user’s monkey emotion pictures. Prepare support for these filenames in:

```text
/public/assets/emotions/
  hungry.png
  tired.png
  cold.png
  sad.png
  happy.png
  great.png
  good.png
  ok.png
```

If the exact PNG files are not present yet, create attractive placeholder cards/SVG illustrations so the app works immediately, but keep the asset paths above so the user can replace them without changing code. Do not require PDF rendering in the browser and do not add PDF.js just to display the source PDF.

Create a single data source such as `src/data/emotions.ts`:

```ts
export type EmotionId =
  | 'hungry'
  | 'tired'
  | 'cold'
  | 'sad'
  | 'happy'
  | 'great'
  | 'good'
  | 'ok';

export interface Emotion {
  id: EmotionId;
  label: string;
  phrase: string;
  image: string;
  clueIcon?: string;
}
```

Every game must use this shared data instead of duplicating vocabulary.

# Visual style

Make the app bright, clean, playful, and suitable for primary-school children without looking babyish.

Style direction: **Banana Arcade / friendly classroom game**.

Use:

- light warm background
- banana-yellow as the main accent
- sky-blue and coral secondary accents
- white/cream cards
- large rounded cards
- soft shadows
- big readable text
- large touch-friendly buttons
- smooth 150–250 ms transitions
- small celebratory animations: stars, banana pop, confetti, bounce
- no dark theme
- no visual clutter
- no tiny text
- no long instructions on the game screen

Desktop/projector first, target 16:9, but remain usable on tablets.

Use a rounded system font stack such as:

```css
font-family: ui-rounded, "Arial Rounded MT Bold", "Trebuchet MS", system-ui, sans-serif;
```

Do not depend on Google Fonts.

# Main menu

Create a simple home screen with title:

**HOW ARE YOU?**

and three large game cards:

1. **Mood Snap**
2. **What’s Missing?**
3. **Monkey Rescue**

Each card has a short subtitle and a large PLAY button.

Add a small Settings button for:

- sound on/off
- round length: 5 / 10 / 15
- team mode on/off

When team mode is enabled, use two teams by default:

- Team Banana
- Team Coconut

Allow the teacher to award a point to either team with large buttons or keyboard shortcuts `1` and `2`.

Add keyboard controls that work across games:

- `Space` = reveal/check/continue depending on current stage
- `N` = next round
- `R` = replay/reveal when relevant
- `1` = point to Team Banana
- `2` = point to Team Coconut
- `Esc` = back to menu

Do not let accidental repeated keypresses skip two rounds.

# GAME 1 — Mood Snap

## Goal

Train **visual recognition → immediate oral production** of the full phrase **“I’m + emotion.”**

This must be fast and energetic.

## Flow

1. Show a 3-2-1 countdown.
2. Show ONE large monkey emotion picture in the centre.
3. Do **not** show the emotion word yet.
4. Children must say the whole phrase aloud, for example:
   - “I’m hungry.”
   - “I’m cold.”
5. Teacher presses `Space` or the REVEAL button.
6. Reveal the phrase under the picture in very large text.
7. Optionally play the phrase using browser `speechSynthesis` if sound is enabled.
8. Show a quick reward animation.
9. Continue automatically after about 1.2 seconds, or let the teacher press NEXT.

## Rules

- Randomise emotions.
- Avoid showing the same emotion twice in a row.
- Within one 8-round cycle, show every emotion once before reshuffling.
- The phrase is hidden until reveal.
- No multiple-choice answers.
- No typing.

## Optional challenge mode

After a few rounds, randomly add one oral-performance badge in the corner:

- WHISPER
- ROBOT
- SUPER HAPPY
- VERY SLOW
- VERY FAST

This affects how children say the phrase but never changes the target grammar.

# GAME 2 — What’s Missing?

## Goal

Train **memory + retrieval + full spoken phrase**, not simple recognition.

## Flow

1. Show 4 emotion cards in a 2×2 grid for about 4 seconds.
2. No words under the pictures.
3. Display “LOOK!” with a short countdown bar.
4. Cover the cards briefly with a playful curtain/cloud animation.
5. Remove ONE card.
6. Show the remaining three cards.
7. Ask visually: **WHAT’S MISSING?**
8. Children must say the missing phrase aloud, e.g. “I’m tired.”
9. Teacher presses `Space` / REVEAL.
10. The missing monkey pops back into the empty slot and the correct phrase appears.
11. Award points if team mode is active.

## Difficulty progression

Rounds 1–3:
- 3 cards shown, 1 missing.

Rounds 4–7:
- 4 cards shown, 1 missing.

Rounds 8+:
- 5 cards shown, 1 missing.

Optional hard toggle in Settings:
- sometimes replace one card with a different emotion instead of simply removing it.
- prompt becomes **WHAT CHANGED?**
- children say the new/correct phrase.

## Rules

- No written answer buttons.
- Do not display vocabulary labels before reveal.
- Do not repeat the same missing emotion in consecutive rounds.
- Randomise positions every round.

# GAME 3 — Monkey Rescue

## Goal

Train the **meaning** of the emotion vocabulary through simple situations, then require the child to produce the full sentence **“I’m + emotion.”**

## Core idea

A monkey appears in a tiny situation. The child must work out how the monkey feels and say the sentence aloud. This is not a spelling or reading task.

## Situational clues

Create simple scene overlays using CSS/SVG/icons around the monkey. The clue should be visually obvious.

Suggested mappings:

- hungry → empty plate / banana thought bubble
- tired → pillow / moon / ZZZ
- cold → snowflakes / blue scarf / shivering lines
- sad → broken toy / rain cloud / tears
- happy → gift / sunshine / bouncing stars
- great → trophy / fireworks / big star
- good → thumbs-up / completed simple challenge
- OK → OK hand / calm neutral scene

Use the user’s monkey pictures as the central character where possible; the scene decoration can be generated with CSS/SVG.

## Flow

1. Show a short “HELP THE MONKEY!” intro.
2. Display one monkey + one situation clue.
3. Do not show the target word.
4. Children have about 5 seconds to say the full sentence.
5. Teacher presses REVEAL.
6. Show the correct phrase in large text.
7. If sound is enabled, play the sentence with `speechSynthesis`.
8. Show a rescue reward:
   - banana flies to the monkey,
   - star appears,
   - small confetti burst.
9. Continue to the next situation.

## Variation

Occasionally show **two monkeys** with different emotions and a scene clue above only one of them. Ask:

**WHO IS IT?**

Children point to the correct monkey and say the matching full phrase.

Keep this variation to about 25% of rounds so the game remains fast.

# Speech and audio

Use the Web Speech API only as an optional enhancement. The game must work perfectly with sound disabled.

Create a helper such as:

```ts
speakPhrase("I'm hungry.");
```

Prefer an English voice if available, but never fail if a specific voice is unavailable.

Do not use speech recognition. Children do not need microphones.

# Scoring

The app should not judge children automatically. The teacher controls scoring.

In team mode:

- large Team Banana and Team Coconut score areas stay in the top corners
- pressing `1` adds 1 point to Team Banana
- pressing `2` adds 1 point to Team Coconut
- clicking a score also adds a point
- provide a small undo button

At the end of the selected number of rounds, show:

- winner or tie
- both team scores
- celebratory animation
- PLAY AGAIN
- MAIN MENU

If team mode is off, simply show progress like `4 / 10` and a streak counter.

# UX details

- Every important button must be large enough for quick teacher use.
- Never require the teacher to aim at tiny controls during a lesson.
- The current monkey/image should dominate the screen.
- Keep instructions to one short line.
- Use animation to support attention, not slow the lesson down.
- Any transition longer than ~600 ms should be skippable.
- Prevent duplicate/random immediate repeats.
- Preload all emotion images when the app starts.
- If an image file is missing, show a polished placeholder card with the emotion ID rather than a broken image icon.

# Suggested project structure

```text
src/
  App.tsx
  main.tsx
  data/
    emotions.ts
  components/
    AppShell.tsx
    EmotionCard.tsx
    ScoreBoard.tsx
    RoundHeader.tsx
    Celebration.tsx
  games/
    MoodSnap.tsx
    WhatsMissing.tsx
    MonkeyRescue.tsx
  hooks/
    useKeyboardControls.ts
    useRoundDeck.ts
  utils/
    speech.ts
    shuffle.ts
  styles/
    global.css
    app.css
public/
  assets/
    emotions/
      hungry.png
      tired.png
      cold.png
      sad.png
      happy.png
      great.png
      good.png
      ok.png
```

# Implementation requirements

- Build all 3 games completely, not mockups.
- Keep logic deterministic enough to test.
- Use Fisher–Yates shuffle or equivalent.
- Use a deck/bag system so all 8 emotions appear before repetition where appropriate.
- No same emotion twice in a row.
- Use semantic buttons and visible focus states.
- Add `prefers-reduced-motion` support.
- No console errors.
- No broken image placeholders from the browser.
- No unnecessary dependencies.
- Run `npm run build` and fix all TypeScript/build errors before finishing.

# Acceptance checklist

The task is complete only if:

1. The home screen opens and all three games are playable.
2. Children never need to type or write.
3. Every game repeatedly practises the full structure **“I’m + emotion.”**
4. All 8 target emotions are included.
5. The monkey images can be swapped by replacing files in `/public/assets/emotions/`.
6. Team scoring works with mouse and keyboard.
7. Sound can be toggled off.
8. Games work without microphone access.
9. The design is bright, projector-friendly, and not visually cluttered.
10. `npm run build` finishes successfully.

# GitHub repository and mandatory deployment

After all three games are implemented, tested, and the production build succeeds, **the task is not finished yet**. The complete project must be uploaded to the following GitHub repository and hosted as a working public website:

```text
https://github.com/itstxaviers-svg/hay
```

Repository:

```text
itstxaviers-svg/hay
```

Default branch:

```text
main
```

## Repository requirements

- Put the actual Vite project in the repository root, not inside an unnecessary extra nested folder.
- Include all source files, `public` assets, `package.json`, `package-lock.json`, TypeScript/Vite config, and deployment workflow.
- Do not commit `node_modules`, `dist`, OS files, editor caches, or secrets.
- Add a correct `.gitignore`.
- Before pushing, run:

```bash
npm install
npm run build
```

- Fix every build/TypeScript error before deployment.
- Commit the finished version to `main` and push it to `https://github.com/itstxaviers-svg/hay`.
- If the repository is initially empty, initialize/use it as the project repository rather than creating another repository.

Suggested Git commands if needed:

```bash
git init
git branch -M main
git remote add origin https://github.com/itstxaviers-svg/hay.git
git add .
git commit -m "Build classroom emotions games"
git push -u origin main
```

If a Git remote already exists, inspect it first and do not blindly add a duplicate `origin`.

# GitHub Pages hosting

Host the finished app with **GitHub Pages using GitHub Actions**.

The expected public URL is:

```text
https://itstxaviers-svg.github.io/hay/
```

## Important Vite base-path requirement

Because the app is hosted from the `/hay/` repository subpath, configure Vite correctly. In `vite.config.ts`, use:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hay/',
});
```

Do not leave the production `base` as `/` for GitHub Pages.

Also make all public asset references compatible with the repository base path. Do **not** hardcode asset URLs in a way that assumes the domain root, such as:

```text
/assets/emotions/hungry.png
```

Prefer a base-aware helper, for example:

```ts
const emotionAsset = (file: string) =>
  `${import.meta.env.BASE_URL}assets/emotions/${file}`;
```

or another Vite-safe approach that works both in local development and at:

```text
https://itstxaviers-svg.github.io/hay/
```

Verify specifically that all monkey emotion images load after deployment.

## GitHub Actions deployment workflow

Create:

```text
.github/workflows/deploy.yml
```

Use a GitHub Pages workflow suitable for a Vite app. It should:

1. Trigger on pushes to `main` and allow `workflow_dispatch`.
2. Check out the repository.
3. Set up a current LTS Node.js version.
4. Run `npm ci`.
5. Run `npm run build`.
6. Configure GitHub Pages.
7. Upload the `dist` directory as the Pages artifact.
8. Deploy that artifact to GitHub Pages.

Use the official GitHub Pages Actions, including the current compatible versions of:

```text
actions/checkout
actions/setup-node
actions/configure-pages
actions/upload-pages-artifact
actions/deploy-pages
```

The workflow must have the required permissions for Pages deployment, including:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Add an appropriate Pages deployment environment and concurrency configuration so duplicate deployments do not conflict.

If GitHub Pages is not yet enabled for the repository, configure the repository to use **GitHub Actions** as the Pages source.

# Final deployment verification

After pushing and deploying, do not stop at “the workflow started”. Verify the finished hosted application.

Check all of the following on the real GitHub Pages URL:

- the page opens without a 404;
- the main **HOW ARE YOU?** menu appears;
- all three games open;
- Mood Snap works through multiple rounds;
- What’s Missing? correctly removes and reveals cards;
- Monkey Rescue works;
- all 8 emotion images load;
- there are no broken asset URLs;
- Team Banana / Team Coconut scoring works;
- keyboard shortcuts work;
- sound toggle does not crash the app;
- refresh works on the published page;
- there are no console errors caused by wrong production paths;
- the layout is usable on a classroom projector.

If deployment fails, inspect the GitHub Actions logs, fix the underlying issue, push the correction, and verify deployment again.

# Definition of done

The entire task is complete only when **all** of the following are true:

1. All three games are fully implemented.
2. `npm run build` passes locally.
3. The complete source code is committed and pushed to `itstxaviers-svg/hay` on `main`.
4. GitHub Pages deployment succeeds.
5. The public site is available at `https://itstxaviers-svg.github.io/hay/`.
6. The deployed version has been opened and checked, not merely built.
7. All monkey emotion assets work on the hosted URL.
8. No production console errors or broken paths remain.

**Do not consider the assignment finished after generating local files. Uploading to the specified repository and delivering a verified hosted version are mandatory parts of the task.**
