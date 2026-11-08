# Shuttle Queue web version

`index.html` started from the Claude artifact export supplied on October 23, 2026. It is maintained alongside the iPad app. The dashboard adapts to phones with Courts / Queue tabs, keeps the queue beside courts on iPad mini, and expands the court grid on laptops. Playing courts retain the shuttlecock animation with independent rally paths and speeds; Reduce Motion hides it.

Open it in a browser to use the local web app. Outside Claude it saves in that browser's local storage; Claude's shared database is available only inside the artifact host. Copying this file does not transfer saved sessions or connect the iPad app to that database.

Keep `logo.png` and `app-icon.png` beside `index.html` when copying or hosting the web app. Both versions use the approved Hampashers Badminton logo; the square app icon has an opaque dark background.

Run its embedded checks with:

```sh
node tools/web-check.js web/index.html
```

The iPad and web versions now use Locked Teammates instead of the removed Increase Pairing % requests. Older artifact versions can still be checked with the existing tools' `--pairs` option; this export no longer supports it. Compare matching with `tools/web-sim.js --parity` and the iPad's `-parity`, optionally using `--locks` / `-locks`.

Players have seven fixed levels (Low beginner … Pro) set by the organiser; results never change them. Queue matching is Auto only for now: same or neighbouring level, then up to 2 levels, never wider (the court waits instead). Equal Skill and Balanced Skill are hidden from Session Settings, and live sessions saved in them load as Auto; their code stays.

To compare each mode through the existing deterministic replay, use `--queue-matching auto|equalSkill|balancedSkill` with `tools/web-sim.js --parity`, and the matching `-queue-matching` argument with the iPad's `-parity` launch.

Settings → Export Data Code / Import Data Code moves sessions between devices by copying and pasting the entire text code. No files are needed. Matching session IDs are replaced and other sessions are retained. The code uses the existing JSON export format and is compatible with the iPad and React webapp. Invalid or incomplete codes are rejected before saved sessions change.

Streaks are display-only: 🔥 after three wins and 🧊 after three losses. Matching uses the seven fixed levels, with no preferential hot/cold teaming. Rating dots keep their normal colors.
