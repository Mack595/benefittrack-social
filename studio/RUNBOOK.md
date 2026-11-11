# Weekly run: make and schedule BenefitTrack Instagram posts

Runs every Thursday as a scheduled task. Fully automatic: the owner approved scheduling without review.
Goal: one post at **12:15 pm America/Winnipeg every Monday to Friday**, mixing animated reels,
carousels and still images.

Read `STYLE.md`, `CONTENT.md`, `TOPICS.md` (in `studio/`) and `log.json` (repository root) before making anything. Run all commands from the repository root.

## Fixed IDs
- Buffer organization: `6af48f2bc62da7e8a979dddb` ("My organization")
- Instagram channel @joinbenefittrack: `6af48f9962b70b94b0f6de33`
- Media base URL: `https://raw.githubusercontent.com/Mack595/benefittrack-social/main/`

## 1. Find the open slots
1. `get_account` for the current time, UTC offset and `organizations[0].limits.scheduledPosts` (10 on the free plan).
2. `list_posts` with status `scheduled` for the channel.
3. Candidate slots: every Monday to Friday at 12:15 local, from tomorrow through the next 14 days.
   Remove dates that already have a scheduled post (any time that day).
4. Number to make = min(open slots, plan limit minus currently scheduled, 6). Take the earliest slots.
   If the number is 0, skip to step 6 and report why (usually the free plan's 10-post cap).

## 2. Plan the posts
- Mix: about 2 reels, 2 carousels, 1 still per 5 posts. Never the same format on two days in a row
  (check the posts already scheduled around each slot).
- Pick topics from `TOPICS.md` not used in the last 6 weeks (`log.json`). Seasonal topics near their date.
- Write every word from `CONTENT.md` facts only. No invented numbers, testimonials or people.

## 3. Make them
Work in `posts/<YYYY-MM-DD>-<slug>/` (the date is the posting date).

**Carousel or still:** write HTML files (`slide-1.html` to `slide-6.html`, or `post.html`) by copying the
closest file in `templates/examples/` and changing the words, icons and layout lightly. Keep the
`<meta name="size">` line and `ASSET:` paths. Render: `node studio/tools/render_png.js posts/<dir>/*.html`.
Fix anything the script reports as OVERFLOW or ERRORS.

**Animated reel:** make a film folder `posts/<dir>/film/` with `scenes.json`, `base.css`, `shared.js`,
`scene-<id>.js` per scene and `music.json`. Start from a copy of `films/how-it-works` or
`films/3200-sitting-there` (same runtime API: `kit.scene(id, {init(kit), render(t)})`,
`kit.h`, `seg`, `eo`, `eob`, `eio`, `lerp`, `TextFx.fadeFromRight`, `kit.breathe`, `kit.assets.url`).
4 to 6 scenes, 15 to 20 s total, last scene is the end card (shield, wordmark, one line, BenefitTrack.ca).
Render: `node studio/reel/render.js posts/<dir>/film posts/<dir>/reel.mp4 --still "2,posts/<dir>/check-1.png;..."`
taking one still per scene to check.

## 4. Check before uploading
- Look at every PNG and reel still (make a contact sheet and Read it). Text must be readable, inside the
  canvas, not overlapping, and for reels inside y 250 to 1500 and x below 960.
- `ffprobe` each reel: 1080x1920, H.264 + AAC, 15 to 20 s.
- Re-read each caption against `CONTENT.md`: facts only, hook first, one call to action, exactly 5 hashtags.
- If something can't be fixed, drop that post rather than schedule a broken one.

## 5. Upload and schedule
1. Copy the final files to `media/<YYYY-MM-DD>-<slug>/` (PNGs as `slide-N.png` / `post.png`, reels as `reel.mp4`).
   Don't commit check stills or temp files (`posts/**/check-*.png` are fine to delete).
2. Commit `media/`, `posts/` (sources) and `log.json`; push to `main`.
3. Check each media URL returns 200 (`curl -sI`).
4. `create_post` per post: `schedulingType: automatic`, `mode: customScheduled`,
   `dueAt: <date>T12:15:00<offset from get_account>`, caption as `text`, and
   - carousel / still: `assets` = images in order, each with `metadata.altText`; `metadata.instagram = {type: "post", shouldShareToFeed: true}`
   - reel: one video asset with `metadata.title` and `thumbnailOffset` (ms) at a frame where the headline shows;
     `metadata.instagram = {type: "reel", shouldShareToFeed: true}`
5. `list_posts` again and confirm each new post is `scheduled` with no error.

## 6. Log and report
- Append each post to `log.json`: `{date, slug, format, topic, caption, buffer_post_id}`. Commit and push.
- Send the owner one short message: the posts scheduled (date, format, headline), anything skipped and why.
  If nothing could be scheduled, say so plainly with the reason.
