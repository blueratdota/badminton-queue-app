# Shuttle Queue web version

`index.html` started from the Claude artifact export supplied on October 23, 2026. It is maintained alongside the iPad app. The dashboard adapts to phones with Courts / Queue tabs, keeps the queue beside courts on iPad mini, and expands the court grid on laptops. Playing courts retain the shuttlecock animation with independent rally paths and speeds; Reduce Motion hides it.

Open it in a browser to use the local web app. Outside Claude it saves in that browser's local storage; Claude's shared database is available only inside the artifact host. Copying this file does not transfer saved sessions or connect the iPad app to that database.

Keep `logo.png` and `app-icon.png` beside `index.html` when copying or hosting the web app. Both versions use the approved Hampashers Badminton logo; the square app icon has an opaque dark background.

Run its embedded checks with:

```sh
node tools/web-check.js web/index.html
```

The iPad and web versions now use Locked Teammates instead of the removed Increase Pairing % requests. Older artifact versions can still be checked with the existing tools' `--pairs` option; this export no longer supports it. Compare matching with `tools/web-sim.js --parity` and the iPad's `-parity`, optionally using `--locks` / `-locks`.

Session Settings → Queue matching offers Auto (the existing stages, also used for older saves), Equal Skill (within 1.5 below eight active doubles-eligible players per doubles court, otherwise 1.0; singles stay at 1.0), and Balanced Skill (queue turns with mixed balanced teams). Equal Skill may leave courts waiting. Copied sessions retain their choice.

To compare each mode through the existing deterministic replay, use `--queue-matching auto|equalSkill|balancedSkill` with `tools/web-sim.js --parity`, and the matching `-queue-matching` argument with the iPad's `-parity` launch.

Settings → Export Data Code / Import Data Code moves sessions between devices by copying and pasting the entire text code. No files are needed. Matching session IDs are replaced and other sessions are retained. The code uses the existing JSON export format and is compatible with the iPad and React webapp. Invalid or incomplete codes are rejected before saved sessions change.

Streaks are display-only: 🔥 after three wins and 🧊 after three losses. Matching uses saved ratings capped at 5.0, with no preferential hot/cold teaming. Rating dots keep their normal colors.
