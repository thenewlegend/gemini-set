#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

try {
  // When installed as dependency, npm sets INIT_CWD to the project root where npm was run.
  // Fall back to process.cwd() if not present.
  const projectRoot = process.env.INIT_CWD ? path.resolve(process.env.INIT_CWD) : process.cwd();
  const geminiDir = path.join(projectRoot, '.gemini');
  const settingsPath = path.join(geminiDir, 'settings.json');

  // The JSON you provided
  const settings = {
    "general": {
      "preferredEditor": "code",
      "vimMode": false,
      "enablePromptCompletion": true,
      "checkpointing": {
        "enabled": false
      },
      "sessionRetention": {
        "enabled": true,
        "maxAge": "30d",
        "maxCount": 50,
        "minRetention": "1d"
      }
    },
    "ui": {
      "theme": "GitHub",
      "useFullWidth": true,
      "showLineNumbers": true,
      "showMemoryUsage": true,
      "showCitations": true,
      "hideBanner": true,
      "hideTips": true,
      "customWittyPhrases": [
        "Hasta la vista policekara"
      ]
    },
    "model": {
      "name": "gemini-2.5-flash",
      "maxSessionTurns": 1000,
      "compressionThreshold": 0.2,
      "summarizeToolOutput": {
        "run_shell_command": {
          "tokenBudget": 100
        }
      }
    },
    "modelConfigs": {
      "aliases": {}
    },
    "context": {
      "fileName": [
        "GEMINI.md",
        "CONTEXT.md"
      ],
      "includeDirectories": [],
      "loadMemoryFromIncludeDirectories": false,
      "fileFiltering": {
        "respectGitIgnore": true,
        "respectGeminiIgnore": true,
        "enableRecursiveFileSearch": true,
        "disableFuzzySearch": false
      }
    },
    "tools": {},
    "privacy": {
      "usageStatisticsEnabled": false
    },
    "telemetry": {
      "enabled": false,
      "logPrompts": false
    },
    "advanced": {
      "excludedEnvVars": [
        "DEBUG",
        "DEBUG_MODE"
      ]
    },
    "experimental": {
      "extensionManagement": true,
      "extensionReloading": false,
      "useModelRouter": true,
      "codebaseInvestigatorSettings": {
        "enabled": true,
        "maxNumTurns": 10,
        "maxTimeMinutes": 3,
        "thinkingBudget": 8192,
        "model": "gemini-2.5-flash"
      }
    }
  };

  // Create the directory (recursive true is safe)
  if (!fs.existsSync(geminiDir)) {
    fs.mkdirSync(geminiDir, { recursive: true });
    console.log(`[gem-set] Created directory: ${geminiDir}`);
  } else {
    console.log(`[gem-set] Directory already exists: ${geminiDir}`);
  }

  // If settings.json exists, don't overwrite by default. Log and exit.
  if (fs.existsSync(settingsPath)) {
    console.log(`[gem-set] settings.json already exists at ${settingsPath}. Skipping write to avoid overwrite.`);
    process.exit(0);
  }

  // Write the file
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), { encoding: 'utf8', flag: 'w' });
  console.log(`[gem-set] Wrote settings.json to ${settingsPath}`);
} catch (err) {
  // Fail gracefully: log error but do not break install
  console.error('[gem-set] postinstall error:', err && err.message ? err.message : err);
  // don't throw to avoid causing npm install to fail
}
