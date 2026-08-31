# RuFlo Docker Agentic Workflow Mandate

You are connected to the live **RuFlo Docker MCP Bridge** (`http://localhost:3001`). 

You MUST use your native RuFlo MCP tools and hooks on EVERY task:

## 1. Recall (Pre-Task)
BEFORE touching any code or making architectural decisions:
- Call your native MCP tool `memory_search` with keywords from the user's prompt.
- Check for existing architectural invariants, past decisions, and patterns.

## 2. Orchestrate & Swarm
FOR multi-file edits, refactoring, or complex tasks:
- Call `swarm_init` (`topology: "hierarchical"`) and create subtasks with `task_create`.
- Dispatch specialized subagents with `agent_spawn` (`coder`, `reviewer`, `tester`, `security-auditor`).

## 3. Execute & Codemod Hooks
- For repetitive pattern transformations, execute deterministic AST codemods via `hooks_codemod`.
- Keep changes strictly bounded to the active task to prevent drift.

## 4. Persist (Post-Task)
BEFORE concluding any task:
- Call `memory_store` with `namespace: "decision-log"` to save:
  - Key architectural decisions and rationale.
  - Bug fixes, regression warnings, or schema updates.