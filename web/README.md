# Shuttle Queue web version

`index.html` started from the Claude artifact export supplied on October 23, 2026. It is maintained alongside the iPad app. The dashboard adapts to phones with Courts / Queue tabs, keeps the queue beside courts on iPad mini, and expands the court grid on laptops. Playing courts retain the shuttlecock animation with independent rally paths and speeds; Reduce Motion hides it.

Open it in a browser to use the local web app. Outside Claude it saves in that browser's local storage; Claude's shared database is available only inside the artifact host. Copying this file does not transfer saved sessions or connect the iPad app to that database.

Keep `logo.png` and `app-icon.png` beside `index.html` when copying or hosting the web app. Both versions use the approved Hampashers Badminton logo; the square app icon has an opaque dark background.

Run its embedded checks with:

```sh
node tools/web-check.js web/index.html
```

The iPad and web versions now use Locked Teammates instead of the removed Increase Pairing % requests. Older artifact versions can still be checked with the existing tools' `--pairs` option; this export no longer supports it. Compare matching with `tools/web-sim.js --parity` and the iPad's `-parity`, optionally using `--locks` / `-locks`.

Session Settings → Queue matching offers Auto (the existing stages, also used for older saves), Equal Skill (within 1.0 matching rating point; use saved rating when a losing-streak penalty prevents any compatible active group), and Balanced Skill (queue turns with mixed balanced teams). Equal Skill may leave courts waiting. Copied sessions retain their choice.

To compare each mode through the existing deterministic replay, use `--queue-matching auto|equalSkill|balancedSkill` with `tools/web-sim.js --parity`, and the matching `-queue-matching` argument with the iPad's `-parity` launch.
