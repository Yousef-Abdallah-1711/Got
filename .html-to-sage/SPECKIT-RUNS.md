# SPECKIT RUNS

Spec Kit is the required planning foundation. Do not fake Spec Kit artifacts.

- project: `C:\Users\yosea\Desktop\got ecommerce`
- integration: `claude`
- skills mode: `True`

## `specify --version`

- exit code: `0`

stdout:

```text
specify 0.15.2
```
## `specify integration list`

- exit code: `0`

stdout:

```text
Coding Agent Integrations                           
┌──────────────┬───────────────┬───────────────┬──────────────┬───────────────┐
│              │               │               │              │ Multi-install │
│ Key          │ Name          │ Status        │ CLI Required │ Safe          │
├──────────────┼───────────────┼───────────────┼──────────────┼───────────────┤
│ agy          │ Antigravity   │               │ yes          │ no            │
│ alquimia     │ Alquimia AI   │               │ yes          │ yes           │
│ amp          │ Amp           │               │ yes          │ no            │
│ auggie       │ Auggie CLI    │               │ yes          │ yes           │
│ bob          │ IBM Bob       │               │ no (IDE)     │ no            │
│ claude       │ Claude Code   │ installed     │ yes          │ yes           │
│              │               │ (default)     │              │               │
│ cline        │ Cline         │               │ no (IDE)     │ yes           │
│ codebuddy    │ CodeBuddy     │               │ yes          │ yes           │
│ codex        │ Codex CLI     │ installed     │ yes          │ yes           │
│ copilot      │ GitHub        │               │ no (IDE)     │ no            │
│              │ Copilot       │               │              │               │
│ cursor-agent │ Cursor        │               │ no (IDE)     │ yes           │
│ devin        │ Devin for     │               │ yes          │ no            │
│              │ Terminal      │               │              │               │
│ droid        │ Factory Droid │               │ yes          │ yes           │
│ firebender   │ Firebender    │               │ no (IDE)     │ yes           │
│ forge        │ Forge         │               │ yes          │ no            │
│ gemini       │ Gemini CLI    │               │ yes          │ yes           │
│ generic      │ Generic       │               │ no (IDE)     │ no            │
│              │ (bring your   │               │              │               │
│              │ own agent)    │               │              │               │
│ goose        │ Goose         │               │ yes          │ no            │
│ grok         │ Grok Build    │               │ yes          │ yes           │
│ hermes       │ Hermes Agent  │               │ yes          │ no            │
│ junie        │ Junie         │               │ yes          │ yes           │
│ kilocode     │ Kilo Code     │               │ no (IDE)     │ yes           │
│ kimi         │ Kimi Code     │ installed     │ yes          │ no            │
│ kiro-cli     │ Kiro CLI      │               │ yes          │ yes           │
│ lingma       │ Lingma        │               │ no (IDE)     │ yes           │
│ omp          │ Oh My Pi      │               │ yes          │ yes           │
│ opencode     │ opencode      │               │ yes          │ no            │
│ pi           │ Pi Coding     │               │ yes          │ yes           │
│              │ Agent         │               │              │               │
│ qodercli     │ Qoder CLI     │               │ yes          │ yes           │
│ qwen         │ Qwen Code     │               │ yes          │ yes           │
│ rovodev      │ RovoDev ACLI  │               │ yes          │ no            │
│ shai         │ SHAI          │               │ yes          │ yes           │
│ tabnine      │ Tabnine CLI   │               │ yes          │ yes           │
│ trae         │ Trae          │               │ no (IDE)     │ yes           │
│ vibe         │ Mistral Vibe  │               │ yes          │ no            │
│ zcode        │ ZCode         │               │ yes          │ yes           │
│ zed          │ Zed           │               │ no (IDE)     │ no            │
└──────────────┴───────────────┴───────────────┴──────────────┴───────────────┘

Default integration: claude
Installed integrations: claude, codex, kimi
```

## `specify init --here --force --integration claude --ignore-agent-tools --integration-options=--skills`

- exit code: `already-initialized`
- result: `.specify/` already exists; preserving existing Spec Kit project files.

## Agent Commands

After successful `specify init`, run the real agent commands/skills:

```text
/speckit.constitution or $speckit-constitution
/speckit.specify or $speckit-specify
/speckit.clarify or $speckit-clarify
/speckit.plan or $speckit-plan
/speckit.tasks or $speckit-tasks
/speckit.analyze or $speckit-analyze
```

Do not run `/speckit.implement` or `$speckit-implement` until the user explicitly approves implementation.
