# Daily run: keep the Buffer queue topped up with BenefitTrack reels

Runs every weekday at 1:23 pm Winnipeg as a scheduled task, just after that day's 12:15 post goes out and frees
a slot in Buffer. Fully automatic: the owner approved scheduling without review.
Goal: one post at **12:15 pm America/Winnipeg every Monday to Friday**. New posts are **animated reels**
(owner's request, 2026-11-24), made to the hook rules in `STYLE.md`. Posts already in the queue stay as they are.

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
   If the number is 0 (the queue is full), stop here: change nothing, commit nothing and send no message.

## 1b. Owner-filmed videos go first
`studio/FILMED.json` lists talking-head reels the owner filmed (owner's request, 2026-11-27). Before making
any animated reel, fill the earliest open slots with videos whose `status` is `waiting`, in list order, one per slot.
- Post the file exactly as it is (never re-edit, trim or re-render it). It is already in `media/filmed/`.
- These are **employee-directed**: use the stored `caption` as written (it speaks to employees, not brokers).
- Check the media URL returns 200, then `create_post` as a reel (section 5, step 4) with the stored `title`
  and `thumbnailOffset`.
- Set the entry's `status` to `scheduled`, fill `date` and `buffer_post_id`, and append it to `log.json`
  with `format: "reel (talking head, owner-filmed)"`. Commit and push.
- Only the slots left over after this get new animated reels (sections 2 to 5).

## 2. Plan the posts
- Format: every new post is an animated reel (no people on camera). Vary the look from reel to reel
  (chips, cards, email mock-up, booklet, big number, checklist) so consecutive reels don't look alike.
- Pick topics from `TOPICS.md` not used in the last 6 weeks (`log.json`). Seasonal topics near their date.
  A topic marked C or S can still be made as a reel. If every topic was used in the last 6 weeks, take the
  least recently used one with a clearly different hook, or add a new topic to `TOPICS.md` built only from
  `CONTENT.md` facts. Never reuse a hook line that is already in `log.json`.
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
3 to 4 scenes, 7 to 10 s total, last scene is the end card (shield, wordmark, one line, BenefitTrack.ca), at most 2 s.
Follow "The hook" in `STYLE.md`: the hook headline is fully visible at frame 0 and something changes by 0.5 s.
Always take a still at 0 s and at 0.5 s and check the hook is readable in both.
Render: `node studio/reel/render.js posts/<dir>/film posts/<dir>/reel.mp4 --still "2,posts/<dir>/check-1.png;..."`
taking one still per scene to check.

## 4. Check before uploading
- Look at every PNG and reel still (make a contact sheet and Read it). Text must be readable, inside the
  canvas, not overlapping, and for reels inside y 250 to 1500 and x below 960.
- `ffprobe` each reel: 1080x1920, H.264 + AAC, 7 to 10 s.
- Reel hook check: the 0 s still shows the full hook headline (not a blank or fading frame). If not, fix it or drop the reel.
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
   - reel: one video asset with `metadata.title` and `thumbnailOffset` (ms) inside the first 1.5 s, where the hook headline shows;
     `metadata.instagram = {type: "reel", shouldShareToFeed: true}`
5. `list_posts` again and confirm each new post is `scheduled` with no error.

## 6. Log and report
- Append each post to `log.json`: `{date, slug, format, topic, caption, buffer_post_id}`. Commit and push.
- If at least one post was scheduled, or something failed, send the owner one short message: the posts (including any owner-filmed videos)
  scheduled (date, format, headline), anything skipped and why. If the queue was simply full, send nothing.
