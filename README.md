# gem-set
## Uniform Gemini CLI settings with ease

`gem-set` is an installation-time configurator for projects. When installed, it automatically creates a `.gemini` directory in the consuming project and writes a `settings.json` file populated with a predefined configuration. This package is intended for developers who want a repeatable, standardized Gemini CLI configuration across multiple projects with zero manual setup.

---

## Features

- Creates `.gemini/` in the root of the consuming project at install-time.
- Writes a populated `settings.json` with opinionated defaults.
- Does **not** overwrite an existing `settings.json` (safe-by-default).
- Works during `npm install`, including when installed as a dependency.
- Uses `INIT_CWD` to ensure files are written to the correct project root.

---

## Installation

Install from npm:

```bash
npm install gem-set
```

After installation, your project will contain:

```
.gemini/
└── settings.json
```

If `.gemini/settings.json` already exists, the installer logs a notice and skips writing to avoid overwriting user-modified configuration.

---

## What the package writes

The installer creates `.gemini/settings.json` containing the full configuration below:

```json
{
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
}
```


## Overwriting existing settings

By default, the installer **does not** overwrite an existing settings file.  
If you want an overwrite or merge mode, you can modify the `postinstall.js` script to fit your use case.

If you want optional `--force` or `--merge` modes, open an issue or submit a PR.

---

## License

MIT. See the `LICENSE` file for details.
