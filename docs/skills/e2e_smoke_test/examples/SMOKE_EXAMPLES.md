# Smoke Test Examples (Multi-Platform)

## Web / Hybrid Mode (Browser Subagent)
Use this when the application is accessible via URL.
- **Task Template**: "Navigate to http://localhost:PORT. Perform [Action]. Verify that [Result] is visible."
- **Verification**: Check for DOM elements, console errors, and responsiveness.

## API Mode (Terminal)
Use this for backends or headless services.
- **Command**: `npx jest src/__tests__/integration` or `npm test`.
- **Manual Verification**: `curl -X GET http://localhost:PORT/api/health`.

## CLI Mode (Terminal)
Use this for command-line interfaces.
- **Command**: `./your-tool --help` or `node index.js --version`.
- **Verification**: Check if stdout contains specific keywords or if the exit code is 0.

## Native Mode (Terminal)
Use this for purely native mobile/desktop apps.
- **Command**: `npx detox test -c ios.sim.debug` or `xcodebuild test ...`.
- **Verification**: Analyze the test runner output for successful assertions.
