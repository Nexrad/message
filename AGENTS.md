<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## App architecture
- Keep demo message state in a shared React provider backed by versioned localStorage; the assignment explicitly requires offline local-only persistence.
- Use distinct TanStack content routes for conversations, contacts, settings, message editing and message details; URLs and back navigation must remain predictable.
- Keep the phone shell and Samsung-specific styles in the global design system; never emulate Android system bars or request native permissions.
