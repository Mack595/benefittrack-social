# BenefitTrack house style (Instagram)

Every post must look like it came from the same studio as the launch posts in `templates/examples/`
and the films in `films/`. Copy their structure; do not invent a new look.

## Colour
| Token | Hex | Use |
|---|---|---|
| Obsidian | #0F1729 | ground, dark text on green |
| Snow White | #FAFAF7 | main text |
| Brand green | #48BE5C | every accent: highlighted word, buttons, check marks, pills |
| Glass blue | #4F86EB | card outline A |
| Glass teal | #2DBAC4 | card outline C |
| Sapphire | #1F58C1 | rarely, deep blue fills |
| Soft text | #C4D2E8 / #C7D6EE | secondary lines |
| Eyebrow | #9FB6DC | small caps labels, slide counters |

## Type
Geist only (files in `assets/fonts`). Black (900) for headlines, Bold (700) for card titles,
SemiBold (600) for pills, Medium (500) for body and the wordmark.
Headlines: 88 to 120 px on posts, letter-spacing about -2 to -3 px, line-height about 1.0.
Body: 40 to 46 px. Never below 30 px on a post.

## Logo and wordmark
Shield (`assets/img/shield.png`) plus "Benefit" (white) "Track" (green), always one word, one line, Geist Medium.

## Backgrounds
Blueprint: `assets/img/bp_post.jpg` (1080x1350), `bp_story.jpg` (1080x1920), `bp_square.jpg` (1080x1080).
In films the same blueprint is built in CSS (`W.ground()` in `shared.js`).

## Cards
Glass card: 30 px radius, 3 px outline in blue, green or teal (cycle in that order),
fill = the outline colour at about 18% alpha, soft glow (box-shadow 0 0 60px at about 30%).
Numbered steps use filled circles in the same three colours.

## Formats
| Post | Size | Notes |
|---|---|---|
| Carousel slide | 1080x1350 | 6 slides: cover, 4 content, CTA. Counter "02 / 06" top left on content slides |
| Still image | 1080x1350 | one idea, one headline, logo + BenefitTrack.ca at the bottom |
| Animated reel | 1080x1920 | 15 to 20 s, 4 to 6 scenes, ends on the logo card with BenefitTrack.ca |

Padding: 88 to 96 px on posts. Reels: keep all words between y = 250 and y = 1500 and left of x = 960
(Instagram's buttons and caption cover the rest).

## Motion and sound (reels)
Calm. Elements glide in and settle (ease-out, small overshoot at most). No bouncing, shaking, whooshes,
clicks or thuds. Headlines enter with `TextFx.fadeFromRight`. Camera: a slow 2 to 3% push, no tracking.
Sound: soft pad, light marimba pulse, and the house "ting" on key moments only (see `reel/music.py`).

## Voice
Plain, confident, short sentences. Speak to benefits brokers and advisors about their clients
and their clients' employees. One idea per post. Highlight one word per headline in green.
