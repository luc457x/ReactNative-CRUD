# Commit Command Examples (Cross-Platform)

## Standard (Linux, macOS, PowerShell 7+)
Use the `&&` operator to chain commands. This ensures the second command only runs if the first one succeeds.
```bash
git add . && git commit -m "feat: your message"
```

## Legacy PowerShell Workaround (PowerShell < 7)
Use the `;` separator. Note that the second command will run even if the first one fails.
```powershell
git add . ; git commit -m "feat: your message"
```

## Session Tagging Example
Note: Only the **final commit** of a session should receive a tag.
```bash
# Final commit of the session:
git add . && git commit -m "session 13: final cleanup" && git tag session-13
```
