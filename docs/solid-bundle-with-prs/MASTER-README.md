# Master SOLID Upgrade Pack (Cursor-Ready)

Generated: **2025-09-05 14:42:45**

This pack unifies:
1) **High-level, phase-by-phase** refactor guidance, and
2) **File-by-file, line-precise** fix checklist

Follow this order:

1. Open `02-Refactor-Plan.md` (high-level phases).
2. For each phase, jump to `04-File-by-File-Checklist.md` (exact locations and tasks).
3. Use `11-Cursor-Tasks.md` as your running checklist to open/edit files and commit in small PRs.
4. Consult `06-Interfaces-Contracts.md`, `07-DI-Wiring.md`, and `05-Testing-Plan.md` as you implement.
5. Keep CI green with rules in `08-Coding-Standards.md`; use `09-Performance-Checklist.md` toward the end.
6. Perform release with `10-Migration-Checklist.md`.

## Contents

- **00-README.md** — quick overview of the high-level bundle
- **01-SOLID-Scorecard.md** — current score and risks
- **02-Refactor-Plan.md** — phases + acceptance criteria
- **03-Design-Patterns-Guide.md** — Strategy/Registry, Decorators, Template Method, Memento
- **04-File-by-File-Checklist.md** — exact problems (why/what/where/how/which)
- **05-Testing-Plan.md** — golden/property/perf tests + coverage gates
- **06-Interfaces-Contracts.md** — narrow interfaces and segregation map
- **07-DI-Wiring.md** — tiny DI container + composition root
- **08-Coding-Standards.md** — lint/format/complexity gates
- **09-Performance-Checklist.md** — hot-path tuning pointers
- **10-Migration-Checklist.md** — safe rollout/rollback
- **11-Cursor-Tasks.md** — to-do list for Cursor (one checkbox per edit)
- **analysis.json** — machine-readable per-file analysis

> Tip: Keep `11-Cursor-Tasks.md` open in one pane and check items off as you commit.
